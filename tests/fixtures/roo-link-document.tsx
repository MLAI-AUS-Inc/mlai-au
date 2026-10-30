// Isolated process: exercise the actual route, root and React Router document
// handler without credentials or a live backend. Also serves the browser test.
import { mock } from "bun:test";
import { createRequestHandler, type ServerBuild } from "react-router";
import handleRequest from "../../app/entry.server";

const TOKEN = "A".repeat(43);
const calls: { path: string; token: string; origin: string | null; cookie: string | null }[] = [];
const realApi = { ...await import("../../app/lib/api") };
const realAuth = { ...await import("../../app/lib/auth") };
mock.module("../../app/lib/auth", () => ({
  ...realAuth,
  getCurrentUser: async (_env: unknown, request: Request) =>
    request.headers.get("Cookie")?.includes("access_token=fixture")
      ? { email: "founder@example.com" } : null,
}));
mock.module("../../app/lib/api", () => ({
  ...realApi,
  createApiClient: (_env: unknown, request: Request) => ({
    post: async (path: string, body: { token: string }) => {
      calls.push({ path, token: body.token, origin: request.headers.get("Origin"), cookie: request.headers.get("Cookie") });
      const cookie = request.headers.get("Cookie") ?? "";
      if (cookie.includes("fixture_mode=expired")) throw { response: { data: { code: "expired_token" } } };
      if (cookie.includes("fixture_mode=used")) throw { response: { data: { code: "token_already_used", connection_matches_requesting_user: true } } };
      return { data: path.endsWith("/preview/")
        ? { status: "ready", slack_display_name: "Slack Founder", expires_at: "2099-01-01T00:00:00Z" }
        : { status: "linked" } };
    },
  }),
}));
const root = await import("../../app/root");
const route = await import("../../app/routes/founder-tools.link-roo");
const routes: ServerBuild["routes"] = {
  root: { id: "root", path: "", module: root },
  link: { id: "link", parentId: "root", path: "founder-tools/link-roo", module: route },
};
const assets = Object.fromEntries(Object.values(routes).map(item => [item.id, {
  id: item.id, parentId: item.parentId, path: item.path, module: `/fixture-${item.id}.js`, imports: [],
  hasLoader: Boolean(item.module.loader), hasAction: Boolean(item.module.action),
  hasClientLoader: false, hasClientAction: false, hasErrorBoundary: Boolean(item.module.ErrorBoundary),
}]));
const build: ServerBuild = {
  entry: { module: { default: handleRequest, handleError() {}, streamTimeout: 25 } }, routes,
  assets: { entry: { module: "/fixture-entry.js", imports: [] }, routes: assets, url: "/fixture-manifest.js", version: "roo-link-fixture" },
  publicPath: "/", assetsBuildDirectory: "fixture", basename: "/",
  future: { unstable_subResourceIntegrity: false, unstable_trailingSlashAwareDataRequests: false, v8_middleware: false },
  ssr: true, isSpaMode: false, prerender: [], routeDiscovery: { mode: "initial", manifestPath: "/__manifest" },
};
const handler = createRequestHandler(build, "production");
function handle(request: Request) {
  return handler(request, { cloudflare: { env: { VITE_SITE_URL: new URL(request.url).origin } } } as any);
}

if (process.argv.includes("--serve")) {
  const server = Bun.serve({ hostname: "127.0.0.1", port: Number(process.env.ROO_LINK_TEST_PORT || 0), fetch: handle });
  console.log(server.url.origin);
} else {
  const base = "https://mlai.au";
  const cleanPath = "/founder-tools/link-roo";
  const cookie = `access_token=fixture; roo_founder_link_token=${TOKEN}`;
  const records = [];
  async function record(name: string, path = cleanPath, init: RequestInit = {}) {
    calls.length = 0;
    const response = await handle(new Request(base + path, { headers: { Cookie: cookie }, ...init }));
    records.push({ name, status: response.status, headers: Object.fromEntries(response.headers), body: await response.text(), calls: [...calls] });
  }
  await record("capture", `${cleanPath}?token=${TOKEN}&utm_source=slack`);
  await record("invalid-token", `${cleanPath}?token=invalid`);
  await record("confirmation");
  await record("signed-out", cleanPath, { headers: { Cookie: `roo_founder_link_token=${TOKEN}` } });
  await record("expired-preview", cleanPath, { headers: { Cookie: `${cookie}; fixture_mode=expired` } });
  for (const [name, origin] of [["same-origin", base], ["null-origin", "null"], ["external-origin", "https://evil.example"], ["missing-origin", null]] as const) {
    const headers = new Headers({ Cookie: cookie, Host: "mlai.au", "Content-Type": "application/x-www-form-urlencoded" });
    if (origin !== null) headers.set("Origin", origin);
    await record(name, cleanPath, { method: "POST", headers, body: "" });
  }
  for (const [name, extraCookie] of [["expired-submit", "; fixture_mode=expired"], ["repeat-submit", "; fixture_mode=used"]]) {
    await record(name, cleanPath, { method: "POST", headers: { Cookie: cookie + extraCookie, Origin: base, Host: "mlai.au" } });
  }
  await record("signed-out-submit", cleanPath, { method: "POST", headers: { Cookie: `roo_founder_link_token=${TOKEN}`, Origin: base, Host: "mlai.au" } });
  await record("back-after-cleared-cookie", cleanPath, { headers: { Cookie: "access_token=fixture" } });
  await record("repeat-after-cleared-cookie", cleanPath, { method: "POST", headers: { Cookie: "access_token=fixture", Origin: base, Host: "mlai.au" } });
  console.log(JSON.stringify(records));
}
