// Real RR serialization and SSR. A controlled clock executes the real
// serialization/abort callbacks in deadline order without external traffic.
import { Suspense } from "react";
import { Await, createRequestHandler, Scripts, useLoaderData, type ServerBuild } from "react-router";
import * as entry from "../../app/entry.server";
import { fetchSubstackPosts } from "../../app/lib/substack";
const mode = process.argv[2] || "default";
const originalTimeout = globalThis.setTimeout;
const serializedBudgets: number[] = [];
const feedBudgets: number[] = [];
const timers: { at: number; callback: () => void }[] = [];
(globalThis as any).setTimeout = (callback: any, delay: number, ...args: any[]) => {
  if (delay === 4950 || delay === entry.streamTimeout) {
    serializedBudgets.push(delay);
    timers.push({ at: delay, callback: () => callback(...args) });
    return { ref() {}, unref() {} };
  }
  return originalTimeout(callback, delay, ...args);
};
AbortSignal.timeout = milliseconds => {
  feedBudgets.push(milliseconds);
  const controller = new AbortController();
  timers.push({ at: milliseconds, callback: () => controller.abort(new DOMException("Fixture feed timeout", "TimeoutError")) });
  return controller.signal;
};
let aborted = false;
let loggedFailure = false;
console.error = () => { loggedFailure = true; };
globalThis.fetch = async (_input, options) => new Promise<Response>((_resolve, reject) => {
  options!.signal!.addEventListener("abort", () => { aborted = true; reject(options!.signal!.reason); }, { once: true });
});
function Home() {
  const { posts } = useLoaderData() as { posts: Promise<unknown[]> };
  return <html><head /><body><Suspense fallback={<p>Feed pending</p>}>
    <Await resolve={posts} errorElement={<p>Hydration feed failed</p>}>{data => <main><h1>Public homepage</h1><p>{data.length ? "Updates available" : "Feed empty or unavailable"}</p></main>}</Await>
  </Suspense><Scripts /></body></html>;
}
const module = { default: Home, loader: () => ({ posts: fetchSubstackPosts(73) }) };
const build: ServerBuild = {
  entry: { module: { ...entry, ...(mode === "default" ? { streamTimeout: undefined } : {}), handleError() {} } },
  routes: { root: { id: "root", path: "", module } },
  assets: { entry: { module: "/fixture-entry.js", imports: [] }, routes: { root: { id: "root", path: "", module: "/fixture-root.js", imports: [], hasLoader: true, hasClientLoader: false, hasAction: false, hasClientAction: false, hasErrorBoundary: false } }, url: "/fixture-manifest.js", version: "budget-fixture" },
  publicPath: "/", assetsBuildDirectory: "fixture", basename: "/", future: { unstable_subResourceIntegrity: false, unstable_trailingSlashAwareDataRequests: false, v8_middleware: false }, ssr: true, isSpaMode: false, prerender: [], routeDiscovery: { mode: "initial", manifestPath: "/__manifest" },
};
const request = new Request("https://mlai.au/");
const pendingResponse = createRequestHandler(build, "production")(request, {} as any);
// Wait for the real handler to register both independent deadlines, then let
// promise/stream reactions settle between clock advances. A late feed's 8-second
// failure must not be defeated by the framework's earlier serialization abort.
for (let i = 0; i < 1000 && (!serializedBudgets.length || !feedBudgets.length); i++) await Bun.sleep(1);
if (!serializedBudgets.length || !feedBudgets.length) throw new Error("The real handler did not schedule its deferred feed and stream deadlines");
while (timers.length) {
  timers.sort((a, b) => a.at - b.at);
  timers.shift()!.callback();
  await Bun.sleep(10);
}
const response = await pendingResponse;
const html = await response.text();
console.log(JSON.stringify({ mode, status: response.status, renderMode: response.headers.get("X-MLAI-Document-Render"), serializedBudgets, feedBudgets, aborted, loggedFailure, hasResolvedFallback: html.includes("Feed empty or unavailable"), hasSuspenseFallback: html.includes("Feed pending"), hasSerializationFailure: html.includes("SanitizedError") || html.includes("Unexpected Server Error") || html.includes("Server Timeout") }));
