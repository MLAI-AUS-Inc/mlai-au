import { describe, expect, test } from "bun:test";
import { createWebsiteWorker, type HomepageCache } from "../workers/request-handler";
import { isPrivateSearchPath } from "../app/lib/response-indexing-policy";
import { loader as loadLegacyArticleRedirect } from "../app/routes/article-link-cleanups";

class MemoryCache implements HomepageCache {
  readonly entries = new Map<string, Response>();
  matches = 0;
  writes = 0;
  async match(request: Request) { this.matches++; return this.entries.get(request.url)?.clone(); }
  async put(request: Request, response: Response) { this.writes++; this.entries.set(request.url, response); }
}

function harness(render: (request: Request) => Response | Promise<Response> = () => completeHtml()) {
  const cache = new MemoryCache();
  let renders = 0;
  const work: Promise<unknown>[] = [];
  const worker = createWebsiteWorker(async request => { renders++; return render(request); }, () => cache);
  const fetch = (path = "/", init?: RequestInit) => worker.fetch(new Request(new URL(path, "https://mlai.au"), init), {} as Env, { waitUntil: promise => { work.push(promise); } } as ExecutionContext);
  return { cache, fetch, renders: () => renders, settled: () => Promise.all(work) };
}

function completeHtml(headers?: HeadersInit, status = 200) {
  return new Response("<html><body><h1>MLAI public homepage</h1></body></html>", {
    status, headers: { "Content-Type": "text/html; charset=utf-8", "X-MLAI-Document-Render": "complete", ...Object.fromEntries(new Headers(headers)) },
  });
}

describe("single-step known URL normalization", () => {
  test("combines HTTP, www, tracking and a meaningful article migration", async () => {
    const h = harness();
    const response = await h.fetch("http://www.mlai.au/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2?utm_source=slack&event_format=online");
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe("https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2?event_format=online");
    expect(h.renders()).toBe(0);
    const final = await h.fetch(response.headers.get("Location")!);
    expect(final.status).toBe(200);
    expect(final.headers.has("Location")).toBe(false);
  });

  test("keeps auth return values and OAuth fields while dropping only tracking", async () => {
    const h = harness();
    const original = new URL("http://www.mlai.au/platform/login?app=hospital&next=%2Fhospital%2Fapp%3Ftab%3Dteam&code=oauth-code&state=opaque-state&utm_campaign=healthhack");
    const response = await h.fetch(original.href);
    const target = new URL(response.headers.get("Location")!);
    expect(target.origin).toBe("https://mlai.au");
    expect(target.searchParams.get("app")).toBe("hospital");
    expect(target.searchParams.get("next")).toBe("/hospital/app?tab=team");
    expect(target.searchParams.get("code")).toBe("oauth-code");
    expect(target.searchParams.get("state")).toBe("opaque-state");
    expect(target.searchParams.has("utm_campaign")).toBe(false);
  });

  test("preserves exact cleanup aliases and healthy functional queries", async () => {
    const h = harness();
    for (const [path, target] of [["/hackathons):", "/hackathons"], ["/$", "/"], ["/articles/*", "/articles"], ["/medhack", "/healthhack"], ["/vibe-raising/", "/vibe-raising"], ["/how-to-pitch-your-idea", "/articles/featured/how-to-pitch-your-idea"]]) {
      expect((await h.fetch(path)).headers.get("Location")).toBe(`https://mlai.au${target}`);
    }
    expect((await h.fetch("/platform/login?next=/hospital/app")).status).toBe(200);
    expect((await h.fetch("/articles?page=2")).status).toBe(200);
    expect((await h.fetch("http://localhost:5173/events")).status).toBe(200);
  });

  test("does not invent punctuation or missing-article redirects or rewrite action bodies", async () => {
    const h = harness(request => request.method === "POST" ? Response.json({ body: "received" }) : new Response("Not found", { status: 404 }));
    for (const path of ["/hackathons);", "/articles/featured/missing-article", "/members"]) {
      const response = await h.fetch(path);
      expect(response.status).toBe(404);
      expect(response.headers.has("Location")).toBe(false);
    }
    expect((await h.fetch("/platform/login?utm_source=slack", { method: "POST", body: "action=login" })).status).toBe(200);
  });

  test("router fallback shares the final article destination and preserves reader preferences", () => {
    const response = loadLegacyArticleRedirect({ request: new Request("https://mlai.au/articles/featured/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2?event_format=online") } as any);
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe("/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2?event_format=online");
    try {
      loadLegacyArticleRedirect({ request: new Request("https://mlai.au/articles/featured/genuinely-missing") } as any);
      throw new Error("Unknown slug should remain a 404");
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });
});

describe("homepage public cache eligibility", () => {
  test("cache hits retain complete HTML and HEAD uses the same cached representation without a body", async () => {
    const h = harness();
    const first = await h.fetch();
    expect(first.headers.get("X-MLAI-Homepage-Cache")).toBe("MISS");
    expect(first.headers.get("Cache-Control")).toBe("public, max-age=300, stale-while-revalidate=3600");
    const body = await first.text();
    await h.settled();
    const hit = await h.fetch();
    expect(hit.headers.get("X-MLAI-Homepage-Cache")).toBe("HIT");
    expect(await hit.text()).toBe(body);
    const head = await h.fetch("/", { method: "HEAD" });
    expect(head.headers.get("X-MLAI-Homepage-Cache")).toBe("HIT");
    expect(await head.text()).toBe("");
    expect(h.renders()).toBe(1);
    expect(h.cache.writes).toBe(1);
  });

  test("cookie, authorization, non-GET, and functional-query requests bypass both cache read and write", async () => {
    const h = harness(request => completeHtml({ "X-Request-Variant": request.headers.get("Cookie") || request.headers.get("Authorization") || request.method }));
    for (const [path, init] of [["/", { headers: { Cookie: "session=private" } }], ["/", { headers: { Authorization: "Bearer private" } }], ["/", { method: "POST", body: "action=private" }], ["/?event_format=online", {}]] as const) {
      const response = await h.fetch(path, init);
      expect(response.headers.has("X-MLAI-Homepage-Cache")).toBe(false);
    }
    await h.settled();
    expect(h.cache.matches).toBe(0);
    expect(h.cache.writes).toBe(0);
    expect(h.renders()).toBe(4);
  });

  test("Set-Cookie, nonpublic cache controls and personalized Vary responses never enter public cache", async () => {
    for (const headers of [{ "Set-Cookie": "session=personal; HttpOnly" }, { "Cache-Control": "private, max-age=300" }, { "Cache-Control": "no-store" }, { "Cache-Control": "no-cache" }, { "Cache-Control": "public, max-age=0" }, { "Vary": "Cookie" }, { "Vary": "Authorization" }, { "Vary": "User-Agent" }, { "Vary": "*" }, { "X-Robots-Tag": "noindex" }]) {
      const h = harness(() => completeHtml(headers));
      for (let index = 0; index < 2; index++) expect((await h.fetch()).headers.has("X-MLAI-Homepage-Cache")).toBe(false);
      await h.settled();
      expect(h.cache.writes).toBe(0);
      expect(h.renders()).toBe(2);
    }
  });

  test("honors existing public cache lifetime and encoding negotiation", async () => {
    const h = harness(() => completeHtml({ "Cache-Control": "public, max-age=60", Vary: "Accept-Encoding" }));
    expect((await h.fetch()).headers.get("Cache-Control")).toBe("public, max-age=60");
    await h.settled();
    expect(h.cache.writes).toBe(1);
  });

  test("rejects streaming, non-HTML, failed and stale unsafe cache objects", async () => {
    for (const render of [() => completeHtml({ "X-MLAI-Document-Render": "streaming" }), () => Response.json({ value: "not HTML" }), () => completeHtml(undefined, 500)]) {
      const h = harness(render);
      await h.fetch();
      await h.settled();
      expect(h.cache.writes).toBe(0);
    }
    const h = harness();
    h.cache.entries.set("https://mlai.au/?__mlai_complete_homepage=v1", completeHtml({ "Set-Cookie": "session=private" }));
    expect((await h.fetch()).headers.get("X-MLAI-Homepage-Cache")).toBe("MISS");
    expect(h.renders()).toBe(1);
  });

  test("a new revision cannot reuse complete HTML or asset URLs from the previous deployment", async () => {
    const cache = new MemoryCache();
    const pending: Promise<unknown>[] = [];
    const ctx = { waitUntil: (work: Promise<unknown>) => pending.push(work) } as unknown as ExecutionContext;
    const renders = { a: 0, b: 0 };
    const worker = (revision: "a" | "b") => createWebsiteWorker(async () => {
      renders[revision]++;
      return new Response(`<html><body>Revision ${revision}<script src="/assets/${revision}.js"></script></body></html>`, {
        headers: { "Content-Type": "text/html", "X-MLAI-Document-Render": "complete", "X-MLAI-Revision": revision },
      });
    }, () => cache, revision);
    const a = worker("a");
    const b = worker("b");
    for (const [current, revision, expectedCache] of [[a, "a", "MISS"], [b, "b", "MISS"], [a, "a", "HIT"], [b, "b", "HIT"]] as const) {
      const response = await current.fetch(new Request("https://mlai.au/"), {} as Env, ctx);
      expect(response.headers.get("X-MLAI-Homepage-Cache")).toBe(expectedCache);
      expect(response.headers.get("X-MLAI-Revision")).toBe(revision);
      expect(await response.text()).toBe(`<html><body>Revision ${revision}<script src="/assets/${revision}.js"></script></body></html>`);
      await Promise.all(pending);
    }
    expect(renders).toEqual({ a: 1, b: 1 });
    expect(cache.writes).toBe(2);
    expect(cache.entries.size).toBe(2);
  });

  test("a cold HEAD request does not populate the public cache", async () => {
    const h = harness();
    await h.fetch("/", { method: "HEAD" });
    await h.settled();
    expect(h.cache.writes).toBe(0);
  });
});

describe("response exclusions preserve application behavior", () => {
  test("private HTML is excluded and no-store without changing content or status", async () => {
    const h = harness(() => completeHtml({ "X-Robots-Tag": "index, nofollow, nosnippet" }));
    for (const path of ["/hospital/app", "/hospital/app/team", "/platform/login", "/founder-tools", "/founder-tools/marketing", "/roo/topup/purchase-id", "/verify-email", "/valley"]) {
      const response = await h.fetch(path);
      expect(response.status).toBe(200);
      expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, nosnippet");
      expect(response.headers.get("Cache-Control")).toBe("private, no-store");
      expect(await response.text()).toContain("MLAI public homepage");
    }
    for (const path of ["/founder-tools/start", "/founder-tools/start/", "/vibe-raising", "/healthhack", "/community", "/articles/featured/example"]) expect(isPrivateSearchPath(path)).toBe(false);
  });

  test("manifest remains the same router resource and only the legacy worksheet download is excluded", async () => {
    const h = harness(request => new URL(request.url).pathname === "/__manifest" ? new Response(null, { status: 204, headers: { "X-Manifest-Route": "retained" } }) : new Response("# Worksheet", { headers: { "Content-Type": "text/markdown" } }));
    const manifest = await h.fetch("/__manifest?paths=%2Fevents&version=build-hash");
    expect(manifest.status).toBe(204);
    expect(manifest.headers.get("X-Manifest-Route")).toBe("retained");
    expect(manifest.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
    expect((await h.fetch("/downloads/accelerator-fit-worksheet.md")).headers.get("X-Robots-Tag")).toBe("noindex");
    expect((await h.fetch("/downloads/accelerator-program-evidence.md")).headers.has("X-Robots-Tag")).toBe(false);
  });

  test("disabled Watt endpoints and real error statuses remain excluded", async () => {
    const h = harness(() => new Response("Unavailable", { status: 503 }));
    for (const path of ["/api/v1/hackathons/watt/team", "/api/v1/hackathons/watt-the-hack/submissions"]) {
      const response = await h.fetch(path);
      expect(response.status).toBe(404);
      expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
    }
    expect(h.renders()).toBe(0);
    const error = await h.fetch("/events");
    expect(error.status).toBe(503);
    expect(error.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
  });
});

test("real React SSR renders complete cached homepage HTML in both human/crawler request orders", async () => {
  const child = Bun.spawn([process.execPath, "tests/fixtures/homepage-worker-probe.tsx"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  const results = JSON.parse(stdout);
  expect(results).toHaveLength(2);
  for (const record of results) {
    expect(record.renderCount).toBe(1);
    expect(record.modes).toEqual(["complete", "complete"]);
    expect(record.cache).toEqual(["MISS", "HIT"]);
    expect(record.sameHtml).toBe(true);
    expect(record.visibleContent).toBe(true);
    expect(record.hasHiddenStream).toBe(false);
    expect(record.hasFallback).toBe(false);
  }
});
