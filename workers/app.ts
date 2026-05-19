import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

/** Query parameters that are tracking-only and should be stripped for SEO */
const TRACKING_PARAMS = ["trk", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const HOMEPAGE_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=3600";

/** Legacy paths that should 301-redirect to a new location */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/codeofconduct": "/terms",
  "/support": "/contact",
  "/Support": "/contact",
};

function defaultCache(): Cache {
  return (caches as unknown as { default: Cache }).default;
}

function isAnonymousHomepageRequest(request: Request, url: URL): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (url.pathname !== "/" || url.search) return false;
  if (request.headers.has("Cookie") || request.headers.has("Authorization")) return false;
  return true;
}

function isCacheableHomepageResponse(response: Response): boolean {
  const contentType = response.headers.get("Content-Type") || "";
  return response.status === 200 && contentType.toLowerCase().includes("text/html");
}

async function renderWithReactRouter(request: Request, env: Env, ctx: ExecutionContext) {
  return requestHandler(request, {
    cloudflare: { env, ctx },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Redirect www → non-www (301)
    if (url.hostname === "www.mlai.au") {
      url.hostname = "mlai.au";
      return Response.redirect(url.toString(), 301);
    }

    // 2. Redirect legacy paths (301)
    const legacyTarget = LEGACY_REDIRECTS[url.pathname];
    if (legacyTarget) {
      url.pathname = legacyTarget;
      url.search = "";
      return Response.redirect(url.toString(), 301);
    }

    // 3. Strip tracking query parameters (301)
    let hasTrackingParams = false;
    for (const param of TRACKING_PARAMS) {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        hasTrackingParams = true;
      }
    }
    if (hasTrackingParams) {
      return Response.redirect(url.toString(), 301);
    }

    // 4. Let React Router handle /__manifest (needed for client-side navigation)
    //    but add noindex header to keep it out of search engines
    if (url.pathname === "/__manifest") {
      const response = await renderWithReactRouter(request, env, ctx);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }

    if (isAnonymousHomepageRequest(request, url)) {
      const cache = defaultCache();
      const cacheKey = new Request(`${url.origin}/`, { method: "GET" });
      const cached = await cache.match(cacheKey);

      if (cached) {
        const headers = new Headers(cached.headers);
        headers.set("X-MLAI-Homepage-Cache", "HIT");
        return new Response(request.method === "HEAD" ? null : cached.body, {
          headers,
          status: cached.status,
          statusText: cached.statusText,
        });
      }

      const response = await renderWithReactRouter(request, env, ctx);
      if (request.method === "GET" && isCacheableHomepageResponse(response)) {
        const headers = new Headers(response.headers);
        headers.set("Cache-Control", HOMEPAGE_CACHE_CONTROL);
        headers.set("X-MLAI-Homepage-Cache", "MISS");
        const cacheableResponse = new Response(response.body, {
          headers,
          status: response.status,
          statusText: response.statusText,
        });
        ctx.waitUntil(cache.put(cacheKey, cacheableResponse.clone()));
        return cacheableResponse;
      }

      return response;
    }

    return renderWithReactRouter(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
