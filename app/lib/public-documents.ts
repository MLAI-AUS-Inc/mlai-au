import { ARTICLE_REGISTRY, getArticlesSortedNewestFirst, resolveArticleRouteSlug } from "../articles/registry";
import { ARTICLE_PAGE_SIZE } from "./article-pagination";
import { PUBLIC_INDEXABLE_PAGES } from "./public-pages";

// Share the build/runtime allowlist. Query-specific or noncanonical requests go
// through the router's own validation; arbitrary paths never select an asset.
export const PUBLIC_DOCUMENTS = new Set<string>([
  ...PUBLIC_INDEXABLE_PAGES, "/displaylink", "/roo/topup",
  ...Object.values(ARTICLE_REGISTRY).map(article => "/articles/" + resolveArticleRouteSlug(article.slug)),
  ...Array.from({ length: Math.ceil(getArticlesSortedNewestFirst().length / ARTICLE_PAGE_SIZE) - 1 }, (_, i) => "/articles?page=" + (i + 2)),
]);
export function documentAssetPath(path: string): string {
  return "/__pages" + (path === "/" ? "/index" : path.replace("?page=", "/page-")) + ".snapshot";
}
