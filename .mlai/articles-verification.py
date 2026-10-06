"""Reviewed customer-CI native verifier. Python stdlib + Playwright 1.58.0.

Repository commands receive only explicitly named environment values. Provider
credentials belong to the separate seal step, which never executes repository code.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import platform
import re
from importlib.metadata import version as package_version
import signal
import subprocess
import sys
import tempfile
import time
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

CHECK_NAME = "MLAI articles native adapter verification"


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":")).encode()


def sha256(value):
    return hashlib.sha256(value).hexdigest()


def git(*args):
    return subprocess.check_output(["git", *args], text=True).strip()


def child_environment(config):
    required = config["contract"].get("environment_names", [])
    if any(not os.environ.get(name) for name in required):
        raise ValueError("Declared build environment values are missing")
    return {"PATH": os.environ["PATH"], "HOME": str(Path.home()), "CI": "true",
            "PORT": str(config["port"]), "HOST": "127.0.0.1",
            **{name: os.environ[name] for name in required}}


def run(command, cwd, env):
    if not command:
        raise ValueError("An explicit command is required")
    subprocess.run(command, cwd=cwd, env=env, check=True, timeout=900)


def lockfiles(root, contract):
    return {name: sha256((root / name).read_bytes()) for name in contract.get("lockfiles", [])}


def build(root, config, env):
    contract = config["contract"]
    before = lockfiles(root, contract)
    cwd = root / contract.get("app_root", ".")
    if contract.get("install_command"):
        run(contract["install_command"], cwd, env)
    run(contract["build_command"], cwd, env)
    if lockfiles(root, contract) != before:
        raise ValueError("Frozen dependency inputs changed during verification")
    return before


def browser_proof(base, config):
    from playwright.sync_api import sync_playwright
    contract = config["contract"]
    listing = contract["listing_route"]
    detail = contract["route_template"].replace("{slug}", config["seed_slug"])
    if "{" in detail:
        raise ValueError("Every route placeholder needs a concrete reviewed value")
    errors, assets = [], []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("response", lambda response: assets.append(response.url) if response.status >= 400 and response.request.resource_type in {"script", "stylesheet", "image", "font"} else None)
        for width in (1440, 390):
            page.set_viewport_size({"width": width, "height": 900})
            for route in (listing, detail):
                response = page.goto(base + route, wait_until="networkidle", timeout=60000)
                if response is None or response.status != 200:
                    raise ValueError("An article route did not return HTTP 200")
                if not page.locator("h1").count():
                    raise ValueError("An article route has no heading")
                if config["expected_h1"] not in page.locator("body").inner_text():
                    raise ValueError("The listing/detail did not load the seeded article")
                if route == detail and config["expected_h1"] not in page.locator("h1").first.inner_text():
                    raise ValueError("The detail route did not render the seeded heading")
                canonical_url = page.locator('link[rel="canonical"]').first.get_attribute("href") if page.locator('link[rel="canonical"]').count() else None
                if not canonical_url or urlsplit(canonical_url).path.rstrip("/") != route.rstrip("/"):
                    raise ValueError("Canonical route differs from the rendered article")
                marker = page.locator('meta[name="mlai-artifact-digest"]')
                if config.get("artifact_digest") and (not marker.count() or marker.first.get_attribute("content") != config["artifact_digest"]):
                    raise ValueError("The rendered artifact differs from the reviewed integration")
                if not page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 2"):
                    raise ValueError("Article layout overflows its viewport")
                if route == listing and not page.locator(f'a[href="{detail}"],a[href$="{detail}"]').count():
                    raise ValueError("The listing does not link to the seeded detail")
        missing = contract["route_template"].replace("{slug}", "mlai-nonexistent-" + (config.get("artifact_digest") or config["identity"]["contract_digest"])[:12])
        if page.request.get(base + missing).status != 404:
            raise ValueError("An unknown article slug does not return HTTP 404")
        browser.close()
    if errors or assets:
        raise ValueError("Browser errors or required asset failures occurred")
    return {**{key: True for key in ("content_loading", "listing", "detail", "unknown_slug_404", "canonical", "assets", "browser", "narrow_layout", "wide_layout")},
            "verified_routes": {"listing": listing, "detail": detail, "unknown_slug": missing}}


def verify(config, output):
    if os.environ.get("MLAI_SEAL_TOKEN") or os.environ.get("GITHUB_TOKEN"):
        raise ValueError("Provider credentials must be confined to the separate sealing step")
    root = Path.cwd()
    source = git("rev-parse", "HEAD")
    tree = git("rev-parse", "HEAD^{tree}")
    if git("status", "--porcelain"):
        raise ValueError("Verification requires the exact clean repository source")
    identity = config["identity"]
    if identity.get("adapter_id") == "custom_contract_v1" and sha256(canonical(config["contract"])) != identity.get("contract_digest"):
        raise ValueError("CI commands differ from the reviewed canonical custom contract")
    if identity.get("adapter_id") == "custom_contract_v1" and (config.get("artifact_digest") or None) != config["contract"].get("artifact_digest"):
        raise ValueError("Custom live marker differs from the reviewed canonical contract")
    if os.environ.get("GITHUB_REPOSITORY", identity["github_repo"]) != identity["github_repo"]:
        raise ValueError("CI repository differs from the reviewed binding")
    if int(os.environ.get("GITHUB_REPOSITORY_ID", identity["repository_id"])) != identity["repository_id"]:
        raise ValueError("CI repository identity differs from the reviewed binding")
    env = child_environment(config)
    with tempfile.TemporaryDirectory(prefix="mlai-baseline-") as temporary:
        baseline = Path(temporary) / "source"
        subprocess.run(["git", "worktree", "add", "--detach", str(baseline), config["baseline_sha"]], check=True)
        try:
            build(baseline, config, env)
        finally:
            subprocess.run(["git", "worktree", "remove", "--force", str(baseline)], check=True)
    locks = build(root, config, env)
    preview = config["contract"]["preview_command"]
    process = subprocess.Popen(preview, cwd=root / config["contract"].get("app_root", "."), env=env, start_new_session=True,
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    base = "http://127.0.0.1:" + str(config["port"])
    try:
        for _ in range(60):
            if process.poll() is not None:
                raise ValueError("The declared preview command exited before verification")
            try:
                with urlopen(base + config["contract"]["listing_route"], timeout=1):
                    break
            except OSError:
                time.sleep(1)
        else:
            raise ValueError("The preview did not become ready")
        checks = browser_proof(base, config)
    finally:
        if process.poll() is None:
            os.killpg(process.pid, signal.SIGTERM)
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGKILL)
            process.wait()
    if git("diff", "--name-only", "HEAD"):
        raise ValueError("Repository commands changed tracked source")
    runtime = config["contract"]["runtime_family"]
    command = {"node": ["node", "--version"], "python": [sys.executable, "--version"], "ruby": ["ruby", "--version"], "php": ["php", "--version"], "go": ["go", "version"]}.get(runtime)
    runtime_output = subprocess.check_output(command, text=True).strip() if command else platform.python_version()
    runtime_match = re.search(r"(?:^|[^0-9])(\d+\.\d+(?:\.\d+)?)", runtime_output)
    declared = config["contract"]["runtime_version"].removeprefix("v")
    if command and (not runtime_match or not (runtime_match[1] == declared or runtime_match[1].startswith(declared + "."))):
        raise ValueError("Observed runtime differs from the reviewed version constraint")
    playwright_version = package_version("playwright")
    if playwright_version != "1.58.0":
        raise ValueError("Install the reviewed Playwright 1.58.0 verifier dependency")
    manager = config["contract"].get("package_manager") or ""
    manager_output = ""
    if runtime == "node" and manager:
        manager_name, _, expected_manager_version = manager.partition("@")
        manager_output = subprocess.check_output([manager_name, "--version"], text=True).strip()
        if expected_manager_version and manager_output != expected_manager_version:
            raise ValueError("Observed dependency manager differs from the reviewed exact version")
    environment = {"platform": platform.platform(), "runtime": runtime_output, "dependency_manager": manager_output, "python": platform.python_version(), "playwright": playwright_version}
    proof = {"schema_version": 2, **identity, "source_sha": source, "source_tree_sha": tree,
             "environment_fingerprint": sha256(canonical(environment)), "lockfile_digests": locks, "artifact_digest": config.get("artifact_digest") or None,
             "baseline_build": "passed", "patched_build": "passed", **checks}
    proof["evidence_digest"] = sha256(canonical(proof))
    Path(output).write_bytes(canonical(proof))


def seal(path):
    proof = json.loads(Path(path).read_text())
    expected = proof.pop("evidence_digest")
    if sha256(canonical(proof)) != expected:
        raise ValueError("Verifier receipt checksum differs")
    proof["evidence_digest"] = expected
    if proof["github_repo"] != os.environ["GITHUB_REPOSITORY"]:
        raise ValueError("Provider repository differs from verifier receipt")
    payload = {"name": CHECK_NAME, "head_sha": proof["source_sha"], "status": "completed", "conclusion": "success",
               "output": {"title": CHECK_NAME, "summary": "MLAI_ARTICLES_ATTESTATION:" + base64.b64encode(canonical(proof)).decode()}}
    request = Request("https://api.github.com/repos/" + proof["github_repo"] + "/check-runs", data=canonical(payload), method="POST",
                      headers={"Authorization": "Bearer " + os.environ["MLAI_SEAL_TOKEN"], "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"})
    with urlopen(request, timeout=30) as response:
        receipt = json.load(response)
    Path("mlai-provider-receipt.json").write_bytes(canonical({"check_run_id": receipt["id"], "source_sha": proof["source_sha"], "evidence_digest": expected}))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["verify", "seal"])
    parser.add_argument("--config", default=".mlai/articles-verification.json")
    parser.add_argument("--evidence", default="mlai-native-evidence.json")
    args = parser.parse_args()
    if args.action == "verify":
        verify(json.loads(Path(args.config).read_text()), args.evidence)
    else:
        seal(args.evidence)
