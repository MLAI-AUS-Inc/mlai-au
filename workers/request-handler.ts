import { PUBLIC_DOCUMENTS, documentAssetPath } from "~/lib/public-documents";
import { retiredAppResponse } from "./retired-apps";
import { normalizedPublicRequestUrl } from "~/lib/url-normalization";
import { HOMEPAGE_CACHE_CONTROL, isAnonymousHomepageRequest, isCacheableHomepageResponse } from "~/lib/homepage-cache-policy";
import { applyResponseIndexingPolicy } from "~/lib/response-indexing-policy";

type RenderRequest = (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;
// Cloudflare's Cache type differs from lib.dom.Cache; only these methods are needed.
export interface HomepageCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}

export function createWebsiteWorker(render: RenderRequest, getCache: () => HomepageCache, revision = "v1") {
  return {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/__pages/")) return new Response(null, { status: 404 });
      const handoff = retiredAppResponse(request);
      if (handoff) return handoff;
      if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
        return applyResponseIndexingPolicy(request, new Response("Not Found", { status: 404 }));
      }
      const normalized = normalizedPublicRequestUrl(request);
      if (normalized) return Response.redirect(normalized.href, 301);

      const route = url.pathname + url.search;
      if (env.ASSETS && (request.method === "GET" || request.method === "HEAD")
        && !url.hostname.startsWith("esafety.") && PUBLIC_DOCUMENTS.has(route)) {
        const asset = await env.ASSETS.fetch(new Request(new URL(documentAssetPath(route), url.origin), { method: request.method }));
        if (asset.status === 200) {
          const headers = new Headers({ "Content-Type": "text/html; charset=utf-8", "X-MLAI-Document-Render": "complete", "X-MLAI-Revision": revision });
          return new Response(request.method === "HEAD" ? null : asset.body, { headers });
        }
      }
      if (!isAnonymousHomepageRequest(request, url)) {
        return applyResponseIndexingPolicy(request, await render(request, env, ctx));
      }
      const cache = getCache();
      // Scope complete HTML and its asset references to the exact built revision.
      const cacheKey = new Request(`${url.origin}/?__mlai_complete_homepage=${encodeURIComponent(revision)}`, { method: "GET" });
      const cached = await cache.match(cacheKey);
      if (cached && isCacheableHomepageResponse(cached)) {
        const headers = new Headers(cached.headers);
        headers.set("X-MLAI-Homepage-Cache", "HIT");
        return new Response(request.method === "HEAD" ? null : cached.body, {
          headers, status: cached.status, statusText: cached.statusText,
        });
      }

      const response = applyResponseIndexingPolicy(request, await render(request, env, ctx));
      if (request.method !== "GET" || !isCacheableHomepageResponse(response)) return response;
      const headers = new Headers(response.headers);
      if (!headers.has("Cache-Control")) headers.set("Cache-Control", HOMEPAGE_CACHE_CONTROL);
      headers.set("X-MLAI-Homepage-Cache", "MISS");
      const cacheable = new Response(response.body, { headers, status: response.status, statusText: response.statusText });
      ctx.waitUntil(cache.put(cacheKey, cacheable.clone()));
      return cacheable;
    },
  } satisfies ExportedHandler<Env>;
}
