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

/** Legacy paths that should 301-redirect to a new location */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/codeofconduct": "/terms",
  "/support": "/contact",
  "/Support": "/contact",
};

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

    // 4. Block internal React Router routes from crawlers
    if (url.pathname === "/__manifest") {
      return new Response("Not Found", {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      });
    }

    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
