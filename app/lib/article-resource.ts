/** Reject known placeholder/page destinations, not certify an asset's contents.
 * Publication review must still open the resource and verify its advertised task.
 */
export function isUsableArticleResourceHref(href: unknown): href is string {
  if (typeof href !== "string") return false;
  const value = href.trim();
  if (!value || value.startsWith("#")) return false;
  try {
    const url = new URL(value, "https://mlai.au");
    if (!["https:", "http:"].includes(url.protocol)) return false;
    if (["mlai.au", "www.mlai.au"].includes(url.hostname)) {
      const pathname = url.pathname.replace(/\/+$/, "") || "/";
      if (["/", "/articles", "/resources", "/contact", "/events"].includes(pathname)) return false;
      // An article page is not the download promised by this component.
      if (pathname.startsWith("/articles/")) return false;
    }
    return true;
  } catch {
    return false;
  }
}
