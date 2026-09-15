// Isolated process: mock only the router tree, not the actual entry handler or
// React stream. No remote requests, credentials, worker or database are used.
import { mock } from "bun:test";
import React, { Suspense, lazy } from "react";
let tree: React.ReactNode;
mock.module("react-router", () => ({ ServerRouter: () => tree }));
const { default: handleRequest } = await import("../../app/entry.server");
const ordinaryUa = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const cases = [
  ["/articles", true], ["/articles/", true], ["/articles/featured/example", true],
  ["/articles/featured/example?event_format=online", true], ["/events", true],
  ["/events/?event_format=melbourne", true], ["/articles-about", false],
  ["/events-admin", false], ["/founder-tools/marketing", false],
  ["/articles/../founder-tools", false], ["/dashboard", true, "Googlebot"],
  ["/dashboard", true, ordinaryUa, true],
] as const;
const records = [];
for (const [path, complete, userAgent = ordinaryUa, isSpaMode = false] of cases) {
  let release!: (value: { default: React.ComponentType }) => void;
  const gate = new Promise<{ default: React.ComponentType }>(resolve => { release = resolve; });
  const Article = lazy(() => gate);
  tree = <html><head /><body><Suspense fallback={<p>Pending reader body</p>}><Article /></Suspense></body></html>;
  const pending = handleRequest(new Request("https://mlai.au" + path, { headers: { "User-Agent": userAgent } }), 200, new Headers(), { isSpaMode } as any, {} as any);
  const beforeRelease = await Promise.race([pending.then(() => "returned"), Bun.sleep(30).then(() => "pending")]);
  // Real articles exceed React's default progressive chunk budget. A tiny tree
  // misses completed boundaries being outlined into script-revealed containers.
  release({ default: () => <main><h1>Resolved reader document</h1><p>Visible useful content</p><p>{"Long-form reader evidence. ".repeat(2500)}</p></main> });
  const response = await pending;
  const html = await response.text();
  const record = { path, complete, beforeRelease, renderMode: response.headers.get("X-MLAI-Document-Render"), status: response.status, containsBody: html.includes("Visible useful content"), containsFallback: html.includes("Pending reader body"), hiddenStreamContainer: /hidden id="S:/.test(html) };
  if (record.beforeRelease !== (complete ? "pending" : "returned") || record.renderMode !== (complete ? "complete" : "streaming") || record.status !== 200 || !record.containsBody || (complete && (record.containsFallback || record.hiddenStreamContainer))) throw new Error(JSON.stringify(record));
  records.push(record);
}
console.log(JSON.stringify(records));
