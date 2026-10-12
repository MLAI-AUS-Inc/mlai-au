// Exercise the real root Layout, error boundary, route metadata and entry handler
// without a build, external API requests, or browser credentials.
import { createRequestHandler, type ServerBuild } from "react-router";
import * as root from "../../app/root";
import * as contact from "../../app/routes/contact";
import { meta as loginMeta } from "../../app/routes/platform.login";
import { meta as checkoutMeta } from "../../app/routes/roo.topup.$purchaseId";
import handleRequest from "../../app/entry.server";

const routes: ServerBuild["routes"] = {
  root: { id: "root", path: "", module: root },
  contact: { id: "contact", parentId: "root", path: "contact", module: contact },
  login: { id: "login", parentId: "root", path: "platform/login", module: { default: () => <main>Login fixture</main>, meta: loginMeta } },
  checkout: { id: "checkout", parentId: "root", path: "roo/topup/:purchaseId", module: { default: () => <main>Checkout fixture</main>, meta: checkoutMeta } },
  missing: { id: "missing", parentId: "root", path: "missing", module: { default: () => <main>Unexpected fixture</main>, loader: () => { throw new Response("Not Found", { status: 404 }); } } },
  unavailable: { id: "unavailable", parentId: "root", path: "server-error", module: { default: () => <main>Unexpected fixture</main>, loader: () => { throw new Response("Unavailable", { status: 503 }); } } },
};
const assets = Object.fromEntries(Object.values(routes).map(route => [route.id, {
  id: route.id, parentId: route.parentId, path: route.path,
  module: `/fixture-${route.id}.js`, imports: [], hasLoader: Boolean(route.module.loader),
  hasClientLoader: false, hasAction: false, hasClientAction: false,
  hasErrorBoundary: Boolean(route.module.ErrorBoundary),
}]));
const build: ServerBuild = {
  entry: { module: { default: handleRequest, handleError() {}, streamTimeout: 25 } },
  routes,
  assets: { entry: { module: "/fixture-entry.js", imports: [] }, routes: assets, url: "/fixture-manifest.js", version: "metadata-fixture" },
  publicPath: "/", assetsBuildDirectory: "fixture", basename: "/",
  future: { unstable_subResourceIntegrity: false, unstable_trailingSlashAwareDataRequests: false, v8_middleware: false },
  ssr: true, isSpaMode: false, prerender: [],
  routeDiscovery: { mode: "initial", manifestPath: "/__manifest" },
};
const handler = createRequestHandler(build, "production");
const records = [];
for (const path of ["/contact?utm_source=search", "/platform/login?app=hospital", "/roo/topup/session-fixture", "/missing", "/never-existed", "/server-error"]) {
  const response = await handler(new Request(`https://mlai.au${path}`), { cloudflare: { env: {} } } as any);
  const html = await response.text();
  records.push({
    path, status: response.status, htmlDocument: html.startsWith("<!DOCTYPE html><html"),
    headCount: (html.match(/<head>/g) ?? []).length,
    robots: [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map(row => row[1]),
    canonicals: [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(row => row[1]),
    title: html.match(/<title>([^<]*)<\/title>/)?.[1],
    missingBody: html.includes("The requested page could not be found."),
  });
}
console.log(JSON.stringify(records));
