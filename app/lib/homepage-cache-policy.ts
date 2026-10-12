export const HOMEPAGE_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=3600";

export function isAnonymousHomepageRequest(request: Request, url: URL): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (url.pathname !== "/" || url.search) return false;
  if (request.headers.has("Cookie") || request.headers.has("Authorization")) return false;
  return true;
}

/** URL-only caching is safe only for one complete, non-personalized document. */
export function isCacheableHomepageResponse(response: Response): boolean {
  if (response.status !== 200) return false;
  if (!response.headers.get("Content-Type")?.toLowerCase().includes("text/html")) return false;
  if (response.headers.get("X-MLAI-Document-Render") !== "complete") return false;
  if (response.headers.has("Set-Cookie")) return false;
  const control = response.headers.get("Cache-Control") || "";
  if (/(?:^|,)\s*(?:private|no-store|no-cache)\b/i.test(control)) return false;
  if (/(?:^|,)\s*(?:s-maxage|max-age)\s*=\s*"?0"?\s*(?:,|$)/i.test(control)) return false;
  const varies = (response.headers.get("Vary") || "").split(",").map(value => value.trim().toLowerCase()).filter(Boolean);
  if (varies.some(value => value !== "accept-encoding")) return false;
  if (/\bnoindex\b/i.test(response.headers.get("X-Robots-Tag") || "")) return false;
  return true;
}
