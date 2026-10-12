// Isolate the router render stub; exercise the actual production Worker wrapper,
// session refresher, Roo capability exception, cache and security header layer.
import { mock } from "bun:test";
let renders = 0;
let renderedCookie = "";
let renderedUrl = "";
mock.module("react-router", () => ({ createRequestHandler: () => async (request: Request) => {
  renders++;
  renderedCookie = request.headers.get("Cookie") || "";
  renderedUrl = request.url;
  return new Response("<html><body>Production render fixture</body></html>", {
    headers: { "Content-Type": "text/html", "X-MLAI-Document-Render": "complete", ...(request.url.includes("link-roo") ? { "Referrer-Policy": "no-referrer" } : {}) },
  });
} }));
const entries = new Map<string, Response>();
(globalThis as any).caches = { default: {
  async match(request: Request) { return entries.get(request.url)?.clone(); },
  async put(request: Request, response: Response) { entries.set(request.url, response); },
} };
let refreshCalls = 0;
const token = "fixture." + Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 86400 })).toString("base64url") + ".signature";
globalThis.fetch = async () => {
  refreshCalls++;
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("Set-Cookie", `access_token=${token}; Path=/; Domain=.mlai.au; Secure; HttpOnly; SameSite=None`);
  headers.append("Set-Cookie", "refresh_token=fresh-fixture; Path=/; Domain=.mlai.au; Secure; HttpOnly; SameSite=None");
  return new Response(JSON.stringify({ refreshed: true }), { headers });
};
const { default: worker } = await import("../../workers/app");
const pending: Promise<unknown>[] = [];
const ctx = { waitUntil(promise: Promise<unknown>) { pending.push(promise); } } as any;
const env = { BACKEND_BASE_URL: "https://backend-fixture.invalid" } as any;
const first = await worker.fetch(new Request("https://mlai.au/"), env, ctx);
await first.text(); await Promise.all(pending);
const hit = await worker.fetch(new Request("https://mlai.au/"), env, ctx);
await hit.text();
const anonymousRenders = renders;
const privateResponse = await worker.fetch(new Request("https://mlai.au/hospital/app", { headers: { Cookie: "refresh_token=fixture" } }), env, ctx);
const privateEvidence = { status: privateResponse.status, noindex: privateResponse.headers.get("X-Robots-Tag"), noStore: privateResponse.headers.get("Cache-Control"), cookies: privateResponse.headers.getSetCookie().length, refreshedRender: renderedCookie.includes("access_token="), security: privateResponse.headers.get("X-Content-Type-Options") };
await privateResponse.text();
const capability = await worker.fetch(new Request("https://mlai.au/founder-tools/link-roo?token=synthetic-private&utmcampaign=retained"), env, ctx);
const capabilityEvidence = { status: capability.status, location: capability.headers.get("Location"), retainedToken: new URL(renderedUrl).searchParams.get("token") === "synthetic-private", referrer: capability.headers.get("Referrer-Policy"), noindex: capability.headers.get("X-Robots-Tag") };
await capability.text();
const rejection = await worker.fetch(new Request("https://www.mlai.au/founder-tools/link-roo?token=synthetic-private"), env, ctx);
console.log(JSON.stringify({ anonymousRenders, firstCache: first.headers.get("X-MLAI-Homepage-Cache"), hitCache: hit.headers.get("X-MLAI-Homepage-Cache"), hitSecurity: hit.headers.get("X-Content-Type-Options"), refreshCalls, privateEvidence, capabilityEvidence, rejection: { status: rejection.status, location: rejection.headers.get("Location"), referrer: rejection.headers.get("Referrer-Policy") } }));
