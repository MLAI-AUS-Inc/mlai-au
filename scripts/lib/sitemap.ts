import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ARTICLE_REGISTRY, isArticleIndexable, resolveArticleRouteSlug, type ArticleWithSlug } from "../../app/articles/registry";
import { PUBLIC_INDEXABLE_PAGES } from "../../app/lib/public-pages";
import { collectRegisteredRoutePaths } from "./route-inventory";

export type SitemapEntry = { path: string; lastmod?: string };
export const PRODUCTION_SITE_ORIGIN = "https://mlai.au";

export function resolveSitemapOrigin(value = PRODUCTION_SITE_ORIGIN) {
  const url = new URL(value);
  if (url.origin !== PRODUCTION_SITE_ORIGIN || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("The public sitemap origin must be https://mlai.au");
  }
  return url.origin;
}

export function normalizeLastmod(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error(`Invalid article update date: ${value}`);
  return date.toISOString().slice(0, 10);
}

export function validatePublishedModules(articles: readonly ArticleWithSlug[], root = process.cwd()) {
  for (const article of articles) {
    if (!isArticleIndexable(article)) continue;
    const module = path.join(root, "app/articles/content", article.slug + ".tsx");
    if (!existsSync(module)) throw new Error(`Published article has no content module: ${article.slug}`);
    const source = readFileSync(module, "utf8");
    if (!/export\s+default\b/.test(source)) throw new Error(`Published article has no default content export: ${article.slug}`);
    if (source.trim().length < 500) throw new Error(`Published article content module is unexpectedly empty: ${article.slug}`);
  }
}

export function getSitemapEntries(root = process.cwd()): SitemapEntry[] {
  const articles = Object.values(ARTICLE_REGISTRY);
  validatePublishedModules(articles, root);
  const declaredRoutes = collectRegisteredRoutePaths(readFileSync(path.join(root, "app/routes.ts"), "utf8"));
  for (const route of PUBLIC_INDEXABLE_PAGES) {
    if (!declaredRoutes.has(route)) throw new Error(`Public sitemap route is not registered: ${route}`);
  }
  const entries: SitemapEntry[] = [
    ...PUBLIC_INDEXABLE_PAGES.map(route => ({ path: route })),
    ...articles.filter(isArticleIndexable).map(article => ({
      path: `/articles/${resolveArticleRouteSlug(article.slug)}`,
      lastmod: normalizeLastmod(article.dateModified || article.lastUpdated || article.date),
    })),
  ];
  if (new Set(entries.map(entry => entry.path)).size !== entries.length) throw new Error("Duplicate canonical sitemap URL");
  return entries;
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function renderSitemap(entries: readonly SitemapEntry[], origin = PRODUCTION_SITE_ORIGIN) {
  const site = resolveSitemapOrigin(origin);
  const urls = entries.map(entry => ` <url>\n  <loc>${escapeXml(new URL(entry.path, site).href)}</loc>${entry.lastmod ? `\n  <lastmod>${entry.lastmod}</lastmod>` : ""}\n </url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join("\n");
}
