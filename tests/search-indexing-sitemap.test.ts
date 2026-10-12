import { expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ARTICLE_REGISTRY, isArticleIndexable } from "../app/articles/registry";
import { PUBLIC_INDEXABLE_PAGES } from "../app/lib/public-pages";
import { getSitemapEntries, normalizeLastmod, renderSitemap, resolveSitemapOrigin, validatePublishedModules } from "../scripts/lib/sitemap";
import { collectRegisteredRoutePaths } from "../scripts/lib/route-inventory";

test("recovered canonical inventory preserves all 76 production URLs without redirects or notices", () => {
  const baseline = JSON.parse(readFileSync("tests/fixtures/search-indexing/live-http-sitemap.json", "utf8"));
  const expected = baseline.responses.filter((r: any) => r.in_current_production_sitemap).map((r: any) => r.requested_url).sort();
  expect(expected).toHaveLength(76);
  const entries = getSitemapEntries();
  expect(entries.map(entry => "https://mlai.au" + entry.path).sort()).toEqual(expected);
  expect(new Set(entries.map(entry => entry.path)).size).toBe(76);
  expect(entries.some(entry => entry.path === "/medhack")).toBe(false);
  for (const article of Object.values(ARTICLE_REGISTRY).filter(a => !isArticleIndexable(a))) {
    expect(entries.some(entry => entry.path === "/articles/" + article.slug), article.slug).toBe(false);
  }
  expect(entries.filter(entry => entry.path.startsWith("/articles/"))).toHaveLength(58);
});

test("canonical sitemap host and actual dates cannot drift to preview/www/query origins", () => {
  expect(resolveSitemapOrigin()).toBe("https://mlai.au");
  expect(resolveSitemapOrigin("https://mlai.au/")).toBe("https://mlai.au");
  for (const origin of ["http://mlai.au", "https://www.mlai.au", "https://preview.example", "https://mlai.au/path", "https://mlai.au/?test=1"]) expect(() => resolveSitemapOrigin(origin)).toThrow();
  expect(normalizeLastmod("2026-09-25")).toBe("2026-09-25");
  expect(normalizeLastmod()).toBeUndefined();
  expect(() => normalizeLastmod("not a date")).toThrow();
  const xml = renderSitemap([{ path: "/articles?page=2&test=1", lastmod: "2026-09-25" }]);
  expect(xml).toContain("page=2&amp;test=1");
  expect(xml).toContain("<lastmod>2026-09-25</lastmod>");
  expect(xml).not.toContain("<priority>");
});

test("missing, empty or unexported published modules fail the release gate while notices are withheld", () => {
  const root = mkdtempSync(path.join(tmpdir(), "mlai-sitemap-"));
  const published = { ...Object.values(ARTICLE_REGISTRY).find(isArticleIndexable)!, slug: "featured/fixture" };
  try {
    expect(() => validatePublishedModules([published], root)).toThrow("no content module");
    mkdirSync(path.join(root, "app/articles/content/featured"), { recursive: true });
    const file = path.join(root, "app/articles/content/featured/fixture.tsx");
    writeFileSync(file, "export const title = 'Missing body';");
    expect(() => validatePublishedModules([published], root)).toThrow("no default content export");
    writeFileSync(file, "export default function Empty() { return null; }");
    expect(() => validatePublishedModules([published], root)).toThrow("unexpectedly empty");
    expect(() => validatePublishedModules([{ ...published, publicationStatus: "under-review", indexing: "noindex" }], root)).not.toThrow();
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("route inventory follows nested routes rather than a drifting manual whitelist", () => {
  const paths = collectRegisteredRoutePaths('export default [index("home"), route("/articles", "directory", [index("list"), route("*", "body")]), route("/hospital/app", "shell", [route("team", "team")])];');
  expect([...paths].sort()).toEqual(["/", "/articles", "/articles/*", "/hospital/app", "/hospital/app/team"]);
  const actual = collectRegisteredRoutePaths(readFileSync("app/routes.ts", "utf8"));
  for (const page of PUBLIC_INDEXABLE_PAGES) expect(actual.has(page), page).toBe(true);
});
