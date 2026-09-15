import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { getArticlesSortedNewestFirst } from "../app/articles/registry";

// This covers local /downloads links rendered by published article bodies.
// Remote resources, browser Blob downloads and actual HTTP delivery need other checks.
export function downloadPaths(html: string): string[] {
  const paths = new Set<string>();
  for (const match of html.matchAll(/\bhref=["'](\/downloads\/[^"']*)["']/g)) {
    const raw = match[1].split(/[?#]/)[0];
    const decoded = decodeURIComponent(raw);
    const segments = decoded.split("/");
    if (segments.some(segment => segment === "." || segment === "..") || decoded.includes("\\") || decoded.includes("\0")) {
      throw new Error("Unsafe download path: " + raw);
    }
    paths.add(decoded);
  }
  return [...paths].sort();
}

export function assertDownloadBytes(source: Uint8Array, built?: Uint8Array): void {
  if (!source.byteLength) throw new Error("Download is empty");
  if (built && (source.byteLength !== built.byteLength || source.some((byte, index) => byte !== built[index]))) {
    throw new Error("Built download differs from the source asset");
  }
}

export async function checkArticleDownloads(builtRoot?: string) {
  const assets = new Map<string, string[]>();
  const root = process.cwd();
  for (const article of getArticlesSortedNewestFirst()) {
    const { default: Article } = await import("../app/articles/content/" + article.slug + ".tsx");
    const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
    for (const url of downloadPaths(html)) {
      assets.set(url, [...(assets.get(url) ?? []), article.slug]);
    }
  }
  for (const [url, articles] of assets) {
    const sourcePath = path.join(root, "public", url);
    try {
      if (!statSync(sourcePath).isFile()) throw new Error("Not a regular file");
      const source = readFileSync(sourcePath);
      let built: Buffer | undefined;
      if (builtRoot) {
        const builtPath = path.join(builtRoot, url);
        if (!statSync(builtPath).isFile()) throw new Error("Built asset is not a regular file");
        built = readFileSync(builtPath);
      }
      assertDownloadBytes(source, built);
    } catch (error) {
      throw new Error(`${url} linked from ${articles.join(", ")}: ${String(error)}`);
    }
  }
  return assets;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 1 || args[0] !== "--built")) throw new Error("Usage: bun scripts/check-article-downloads.tsx [--built]");
  const assets = await checkArticleDownloads(args[0] === "--built" ? path.join(process.cwd(), "build/client") : undefined);
  console.log(`Verified ${assets.size} published article download assets${args[0] ? " against production build bytes" : " in public source"}.`);
}
