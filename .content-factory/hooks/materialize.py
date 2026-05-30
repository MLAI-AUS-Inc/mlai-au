import json
import os
import re
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


def _slug_text(value: object, fallback: str = "") -> str:
    text = str(value or fallback or "").strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or fallback


def _jsx_string(value: object) -> str:
    return json.dumps(str(value or ""), ensure_ascii=False)


def _paragraphs(markdown: object) -> list[str]:
    text = str(markdown or "").replace("\r\n", "\n")
    blocks = []
    current = []
    for raw_line in text.split("\n"):
        line = raw_line.strip()
        if not line:
            if current:
                blocks.append(" ".join(current).strip())
                current = []
            continue
        if line.startswith("#"):
            if current:
                blocks.append(" ".join(current).strip())
                current = []
            heading = line.lstrip("#").strip()
            if heading:
                blocks.append(heading)
            continue
        current.append(line)
    if current:
        blocks.append(" ".join(current).strip())
    return [block for block in blocks if block][:24]


def _react_component_source(payload: dict[str, object], bootstrap: dict[str, object], route_path: str) -> str:
    title = str(payload.get("title") or payload.get("meta_title") or "Generated Article")
    description = str(payload.get("meta_description") or "")
    category = str(payload.get("category") or "featured")
    slug = str(payload.get("slug") or _slug_text(title, "article"))
    published = str(payload.get("published_date") or payload.get("date") or "")
    modified = str(payload.get("modified_date") or published)
    hero = payload.get("hero_image") if isinstance(payload.get("hero_image"), dict) else {}
    image = str(hero.get("url") or payload.get("hero_image_url") or "")
    image_alt = str(hero.get("alt") or payload.get("hero_image_alt") or title)
    body_blocks = _paragraphs(payload.get("article_markdown"))
    if not body_blocks:
        body_blocks = [description or title]
    body_json = json.dumps(body_blocks, ensure_ascii=False, indent=2)
    return f'''export const useCustomHeader = false

export const faqItems = []

export const articleMeta = {{
  title: {_jsx_string(title)},
  topic: {_jsx_string(title)},
  category: {_jsx_string(category)},
  slug: {_jsx_string(slug)},
  description: {_jsx_string(description)},
  datePublished: {_jsx_string(published)},
  dateModified: {_jsx_string(modified)},
  author: {_jsx_string(str(payload.get("author") or payload.get("author_name") or "Content Team"))},
  image: {_jsx_string(image)},
  imageAlt: {_jsx_string(image_alt)},
  canonicalPath: {_jsx_string(route_path)},
}}

const bodyBlocks = {body_json}

export default function GeneratedArticleContent() {{
  return (
    <article className="prose prose-lg prose-zinc dark:prose-invert mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{{articleMeta.category}}</p>
        <h1>{{articleMeta.title}}</h1>
        {{articleMeta.description ? <p className="lead">{{articleMeta.description}}</p> : null}}
      </header>
      <div className="space-y-5">
        {{bodyBlocks.map((paragraph, index) => (
          <p key={{index}} data-cf-component-id={{`section:${{index + 1}}`}}>{{paragraph}}</p>
        ))}}
      </div>
    </article>
  )
}}
'''


def _registry_record(payload: dict[str, object], route_path: str, registry_slug: str) -> str:
    title = str(payload.get("title") or payload.get("meta_title") or "Generated Article")
    description = str(payload.get("meta_description") or "")
    hero = payload.get("hero_image") if isinstance(payload.get("hero_image"), dict) else {}
    image = str(hero.get("url") or payload.get("hero_image_url") or "")
    image_alt = str(hero.get("alt") or payload.get("hero_image_alt") or title)
    date = str(payload.get("published_date") or payload.get("date") or "")
    author = str(payload.get("author") or payload.get("author_name") or "Content Team")
    return (
        f"  {json.dumps(registry_slug)}: {{\n"
        f"    title: {json.dumps(title)},\n"
        f"    date: {json.dumps(date)},\n"
        f"    description: {json.dumps(description)},\n"
        f"    author: {json.dumps(author)},\n"
        f"    slug: {json.dumps(registry_slug)},\n"
        f"    image: {json.dumps(image)},\n"
        f"    imageAlt: {json.dumps(image_alt)},\n"
        f"    hasContent: true,\n"
        f"  }},\n"
    )


def _patch_registry(workspace: Path, registry_path: str, payload: dict[str, object], route_path: str, registry_slug: str) -> str:
    path = workspace / registry_path
    try:
        source = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        source = "export const ARTICLE_REGISTRY = {\n}\n"
    if json.dumps(registry_slug) in source or f"'{registry_slug}'" in source:
        return source
    record = _registry_record(payload, route_path, registry_slug)
    marker = "ARTICLE_REGISTRY"
    index = source.find(marker)
    brace = source.find("{", index if index >= 0 else 0)
    if brace < 0:
        return source.rstrip() + "\n\nexport const ARTICLE_REGISTRY = {\n" + record + "}\n"
    return source[: brace + 1] + "\n" + record + source[brace + 1 :]


def main() -> int:
    bundle_path = os.environ.get("CF_ARTICLE_BUNDLE", "").strip()
    output_path = os.environ.get("CF_MATERIALIZATION_OUTPUT", "").strip()
    workspace_root = Path(os.environ.get("CF_WORKSPACE_ROOT", "") or ".").resolve()
    if not bundle_path or not output_path:
        raise RuntimeError("CF_ARTICLE_BUNDLE and CF_MATERIALIZATION_OUTPUT are required")

    payload = json.loads(Path(bundle_path).read_text(encoding="utf-8"))
    bootstrap = payload.get("bootstrap_materialization") or {}
    strategy = str(bootstrap.get("strategy") or "").strip()
    target_path = str(bootstrap.get("target_path") or "").strip()
    route_path = str(bootstrap.get("route_path") or "").strip()
    support_files = bootstrap.get("support_files") or {}
    metadata = bootstrap.get("metadata_strategy") or {}
    if not target_path:
        raise RuntimeError("Bootstrap materialization target_path is required")

    if strategy == "frontmatter":
        frontmatter = {
            str(metadata.get("title_key") or "title"): payload.get("title") or payload.get("meta_title") or "",
            str(metadata.get("description_key") or "description"): payload.get("meta_description") or "",
            str(metadata.get("date_key") or "date"): payload.get("published_date") or "",
            str(metadata.get("slug_key") or "slug"): payload.get("slug") or "",
            str(metadata.get("category_key") or "category"): payload.get("category") or "",
            str(metadata.get("permalink_key") or "permalink"): route_path,
        }
        document = _serialize_frontmatter(frontmatter, str(payload.get("article_markdown") or ""))
    elif strategy == "react_component":
        document = _react_component_source(payload, bootstrap, route_path)
    else:
        raise RuntimeError("Unsupported bootstrap materialization strategy")

    file_overrides = {target_path: document}
    if strategy == "react_component":
        registry_path = str(bootstrap.get("registry_path") or "").strip()
        registry_slug = str(bootstrap.get("registry_slug") or "").strip()
        if registry_path and registry_slug:
            file_overrides[registry_path] = _patch_registry(
                workspace_root,
                registry_path,
                payload,
                route_path,
                registry_slug,
            )
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
        "notes": "Managed Content Factory hook materialized the article bundle into the repository target path.",
    }
    Path(output_path).write_text(json.dumps(materialized, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise
