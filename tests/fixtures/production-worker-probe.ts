// Isolate the router render stub; exercise the actual production Worker wrapper,
// public homepage cache, legacy login handoff and security header layer.
import { mock } from "bun:test";
let renders = 0;
mock.module("react-router", () => ({ createRequestHandler: () => async () => {
  renders++;
  return new Response("<html><body>Production render fixture</body></html>", {
    headers: { "Content-Type": "text/html", "X-MLAI-Document-Render": "complete" },
  });
} }));
const entries = new Map<string, Response>();
(globalThis as any).caches = { default: {
  async match(request: Request) { return entries.get(request.url)?.clone(); },
  async put(request: Request, response: Response) { entries.set(request.url, response); },
} };
let networkCalls = 0;
globalThis.fetch = async () => { networkCalls++; throw Error("Unexpected backend request"); };
const { default: worker } = await import("../../workers/app");
const pending: Promise<unknown>[] = [];
const ctx = { waitUntil(promise: Promise<unknown>) { pending.push(promise); } } as any;
const env = { BACKEND_BASE_URL: "https://backend-fixture.invalid" } as any;
const first = await worker.fetch(new Request("https://mlai.au/"), env, ctx);
await first.text(); await Promise.all(pending);
const hit = await worker.fetch(new Request("https://mlai.au/"), env, ctx);
await hit.text();
const anonymousRenders = renders;
const handoff = await worker.fetch(new Request("https://mlai.au/platform/login?app=founder-tools&next=/founder-tools", { headers: { Cookie: "refresh_token=fixture" } }), env, ctx);
console.log(JSON.stringify({ anonymousRenders, renders, networkCalls, firstCache: first.headers.get("X-MLAI-Homepage-Cache"), hitCache: hit.headers.get("X-MLAI-Homepage-Cache"), hitSecurity: hit.headers.get("X-Content-Type-Options"), handoff: { status: handoff.status, location: handoff.headers.get("Location"), referrer: handoff.headers.get("Referrer-Policy"), cookies: handoff.headers.getSetCookie() } }));
