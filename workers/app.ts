import { createRequestHandler } from "react-router";
import { applySecurityHeaders } from "./security-headers";
import { createWebsiteWorker } from "./request-handler";
import { applyResponseIndexingPolicy } from "~/lib/response-indexing-policy";
import {
  rejectedRooAccountLinkCapabilityResponse,
  rooAccountLinkCapabilityDisposition,
} from "~/lib/roo-account-link-url";
import { withSessionRefresh } from "./session-refresh";

declare const __MLAI_BUILD_REVISION__: string;

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

function defaultCache(): Cache {
  return (caches as unknown as { default: Cache }).default;
}

async function renderWithReactRouter(request: Request, env: Env, ctx: ExecutionContext) {
  // Every render goes through the session refresher: it renews an expiring access
  // token from the long-lived refresh cookie and relays the new cookies to the
  // browser, so a returning user is never bounced to the magic-link screen while
  // their refresh token is still valid. Anonymous requests pass straight through.
  return withSessionRefresh(request, env, (refreshedRequest) =>
    requestHandler(refreshedRequest, {
      cloudflare: { env, ctx },
    }),
  );
}

const websiteWorker = createWebsiteWorker(
  renderWithReactRouter, defaultCache,
  typeof __MLAI_BUILD_REVISION__ === "string" ? __MLAI_BUILD_REVISION__ : undefined,
);

async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);

  // Capability URLs must reach the route that immediately scrubs the token.
  // Never let them pass through generic permanent redirects.
  const rooLinkDisposition = rooAccountLinkCapabilityDisposition(url);
  if (rooLinkDisposition === "reject") {
    return rejectedRooAccountLinkCapabilityResponse();
  }
  if (rooLinkDisposition === "route") {
    return applyResponseIndexingPolicy(request, await renderWithReactRouter(request, env, ctx));
  }

  return websiteWorker.fetch(request, env, ctx);
}

export default {
  async fetch(request, env, ctx) {
    const response = await handleRequest(request, env, ctx);
    return applySecurityHeaders(response, new URL(request.url));
  },
} satisfies ExportedHandler<Env>;
