import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

// The optional negative control restores the old memoization in memory only;
// no source files, browser profile, credentials or production state are changed.
const oldMemoization = process.argv.includes("--negative-control");
const helper = new URL("../app/lib/document-metadata.tsx", import.meta.url).pathname;
const result = await Bun.build({
  entrypoints: ["tests/fixtures/document-metadata-lazy-client.tsx"], target: "browser",
  plugins: oldMemoization ? [{ name: "old-memoized-registry-control", setup(build) {
    build.onLoad({ filter: /document-metadata\.tsx$/ }, () => ({ loader: "tsx", contents: readFileSync(helper, "utf8")
      .replace('import { useContext } from "react";', 'import { useContext, useMemo } from "react";')
      .replace('const routeModules = Object.fromEntries(', 'const routeModules = useMemo(() => Object.fromEntries(')
      .replace(') as UNSAFE_RouteModules;', ') as UNSAFE_RouteModules, [framework.routeModules]);') }));
  } }] : [],
});
assert.equal(result.success, true, JSON.stringify(result.logs));
const bundle = result.outputs[0];
const server = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch(request) {
  return new URL(request.url).pathname === "/fixture.js"
    ? new Response(bundle, { headers: { "Content-Type": "text/javascript" } })
    : new Response('<!doctype html><html><head></head><body><div id="fixture"></div><script type="module" src="/fixture.js"></script></body></html>', { headers: { "Content-Type": "text/html" } });
} });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.port}/`);
  await page.waitForFunction(() => document.title === "Home | MLAI");
  const snapshot = () => page.evaluate(() => ({
    title: document.title,
    canonical: [...document.head.querySelectorAll('link[rel="canonical"]')].map(link => link.getAttribute("href")),
    robots: [...document.head.querySelectorAll('meta[name="robots"]')].map(meta => meta.getAttribute("content")),
    registryStable: (window as any).metadataFixture.registryIdentityStable(),
    loadedModules: (window as any).metadataFixture.moduleIds(),
  }));
  const initial = await snapshot();
  assert.deepEqual(initial.loadedModules.sort(), ["home", "root"]);
  await page.locator("#login-link").click();
  await page.getByText("Lazy login content", { exact: true }).waitFor();
  const login = await snapshot();
  await page.locator("#directory-link").click();
  await page.getByText("Lazy article directory", { exact: true }).waitFor();
  const directory = await snapshot();
  if (oldMemoization) {
    assert.equal(login.title, "MLAI");
    assert.deepEqual(directory.canonical, ["https://mlai.au/articles"]);
  } else {
    assert.equal(login.title, "Sign In to the MLAI Platform | MLAI");
    assert.deepEqual(login.robots, ["noindex, nofollow"]);
    assert.deepEqual(login.canonical, []);
    assert.equal(directory.title, "Articles – Page 2 | MLAI");
    assert.deepEqual(directory.canonical, ["https://mlai.au/articles?page=2"]);
    assert.deepEqual(directory.robots, ["index, follow"]);
  }
  for (const row of [initial, login, directory]) assert.equal(row.registryStable, true);
  assert.deepEqual(directory.loadedModules.sort(), ["directory", "home", "login", "root"]);
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ oldMemoization, initial, login, directory, errors }));
} finally {
  await browser.close();
  server.stop(true);
}
