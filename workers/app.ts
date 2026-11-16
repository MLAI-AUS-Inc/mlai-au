import { createRequestHandler } from "react-router";
import { applySecurityHeaders } from "./security-headers";
import { createWebsiteWorker } from "./request-handler";
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
  return requestHandler(request, { cloudflare: { env, ctx } });
}

const websiteWorker = createWebsiteWorker(
  renderWithReactRouter, defaultCache,
  typeof __MLAI_BUILD_REVISION__ === "string" ? __MLAI_BUILD_REVISION__ : undefined,
);

export default {
  async fetch(request, env, ctx) {
    const response = await websiteWorker.fetch(request, env, ctx);
    return applySecurityHeaders(response, new URL(request.url));
  },
} satisfies ExportedHandler<Env>;
