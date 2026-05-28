import json
import os
import sys
from pathlib import Path


def _serialize_frontmatter(frontmatter: dict[str, object], body: str) -> str:
    lines = ["---"]
    for key, value in frontmatter.items():
        if value in (None, ""):
            continue
        text = str(value).replace('"', '\"')
        lines.append(f'{key}: "{text}"')
    lines.append("---")
    lines.append("")
    lines.append(body.rstrip())
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    bundle_path = os.environ.get("CF_ARTICLE_BUNDLE", "").strip()
    output_path = os.environ.get("CF_MATERIALIZATION_OUTPUT", "").strip()
    if not bundle_path or not output_path:
        raise RuntimeError("CF_ARTICLE_BUNDLE and CF_MATERIALIZATION_OUTPUT are required")

    payload = json.loads(Path(bundle_path).read_text(encoding="utf-8"))
    bootstrap = payload.get("bootstrap_materialization") or {}
    target_path = str(bootstrap.get("target_path") or "").strip()
    route_path = str(bootstrap.get("route_path") or "").strip()
    support_files = bootstrap.get("support_files") or {}
    metadata = bootstrap.get("metadata_strategy") or {}
    if bootstrap.get("strategy") != "frontmatter" or not target_path:
        raise RuntimeError("Unsupported bootstrap materialization strategy")

    frontmatter = {
        str(metadata.get("title_key") or "title"): payload.get("title") or payload.get("meta_title") or "",
        str(metadata.get("description_key") or "description"): payload.get("meta_description") or "",
        str(metadata.get("date_key") or "date"): payload.get("published_date") or "",
        str(metadata.get("slug_key") or "slug"): payload.get("slug") or "",
        str(metadata.get("category_key") or "category"): payload.get("category") or "",
        str(metadata.get("permalink_key") or "permalink"): route_path,
    }
    document = _serialize_frontmatter(frontmatter, str(payload.get("article_markdown") or ""))

    file_overrides = {target_path: document}
    for path, content in support_files.items():
        normalized_path = str(path).strip()
        if normalized_path:
            file_overrides[normalized_path] = str(content)

    materialized = {
        "file_overrides": file_overrides,
        "primary_artifact_path": target_path,
        "primary_article_path": target_path,
        "route_path": route_path,
        "target_kind": "hook_publish_target",
        "delivery_adapter": "hook_bundle",
        "article_path": target_path,
        "notes": "Bootstrap hook materialized a frontmatter article into the repository target path.",
    }
    Path(output_path).write_text(json.dumps(materialized, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise
