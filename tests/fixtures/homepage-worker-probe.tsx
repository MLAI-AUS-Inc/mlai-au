// Exercise the real React stream and Worker fetch/cache with only the router
// tree replaced. Runs in its own process to keep the mock out of other tests.
import { mock } from "bun:test";
import React, { lazy, Suspense } from "react";
import { createWebsiteWorker, type HomepageCache } from "../../workers/request-handler";
let tree: React.ReactNode;
mock.module("react-router", () => ({ ServerRouter: () => tree }));
const { default: handleRequest } = await import("../../app/entry.server");
const human = "Mozilla/5.0 Chrome/140.0.0.0 Safari/537.36";
const bot = "Googlebot";
const results = [];
for (const order of [[human, bot], [bot, human]]) {
  const entries = new Map<string, Response>();
  const cache: HomepageCache = {
    async match(request) { return entries.get(request.url)?.clone(); },
    async put(request, response) { entries.set(request.url, response); },
  };
  const pending: Promise<unknown>[] = [];
  const context = { waitUntil(promise: Promise<unknown>) { pending.push(promise); } } as ExecutionContext;
  let renderCount = 0;
  const worker = createWebsiteWorker(async request => {
    renderCount++;
    const Content = lazy(async () => {
      await Bun.sleep(20);
      return { default: () => <main><h1>MLAI community homepage</h1><p>Useful events and community articles</p><p>{"Visible long-form homepage content. ".repeat(2500)}</p></main> };
    });
    tree = <html><head /><body><Suspense fallback={<p>Feed pending</p>}><Content /></Suspense></body></html>;
    return handleRequest(request, 200, new Headers(), { isSpaMode: false } as any, {} as any);
  }, () => cache);
  const html: string[] = [];
  const modes = [];
  const caches = [];
  for (const userAgent of order) {
    const response = await worker.fetch(new Request("https://mlai.au/", { headers: { "User-Agent": userAgent } }), {} as Env, context);
    modes.push(response.headers.get("X-MLAI-Document-Render"));
    caches.push(response.headers.get("X-MLAI-Homepage-Cache"));
    html.push(await response.text());
    await Promise.all(pending);
  }
  results.push({ order, renderCount, modes, cache: caches, sameHtml: html[0] === html[1], visibleContent: html.every(value => value.includes("Useful events and community articles")), hasHiddenStream: html.some(value => /hidden id="S:/.test(value)), hasFallback: html.some(value => value.includes("Feed pending")) });
}
console.log(JSON.stringify(results));
