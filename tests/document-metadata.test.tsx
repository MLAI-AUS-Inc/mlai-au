import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import {
  createMemoryRouter,
  createStaticHandler,
  createStaticRouter,
  Outlet,
  RouterProvider,
  StaticRouterProvider,
  UNSAFE_FrameworkContext,
  type MetaDescriptor,
  type RouteObject,
} from "react-router";
import { applyDocumentMetadataPolicy, DocumentMeta } from "../app/lib/document-metadata";

function HeadFixture() {
  return <html><head><DocumentMeta /></head><body><Outlet /></body></html>;
}

const routeModules = {
  root: { default: HeadFixture, meta: () => [{ title: "MLAI" }] },
  public: { default: () => <main>Public page</main>, meta: () => [
    { title: "Public article | MLAI" },
    { name: "description", content: "Original route description" },
    { property: "og:title", content: "Original social title" },
    { property: "og:image", content: "https://mlai.au/article.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { "script:ld+json": { "@type": "Article", headline: "Owned schema" } },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/public" },
    { name: "robots", content: "index, follow, max-image-preview:large" },
  ] },
  plain: { default: () => <main>Plain page</main> },
  empty: { default: () => <main>Empty metadata</main>, meta: () => [] },
  private: { default: () => <main>Authenticated fixture</main> },
  login: { default: () => <main>Login</main>, meta: () => [
    { title: "Sign In | MLAI" },
    { name: "robots", content: "noindex, nofollow" },
  ] },
  notice: { default: () => <main>Withheld review notice</main>, meta: () => [
    { title: "Article Under Review | MLAI" },
    { name: "robots", content: "noindex, follow" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/notice" },
  ] },
  directory: { default: () => <main>Article directory</main>, meta: () => [
    { title: "Articles | MLAI" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/articles?page=2" },
  ] },
  missing: { default: () => <main>Unexpected</main>, meta: () => [
    { title: "Stale article" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/missing" },
    { "script:ld+json": { "@type": "Article", headline: "Stale schema" } },
  ] },
};

const framework = {
  routeModules,
  isSpaMode: false,
  manifest: { routes: {} },
  future: {},
  ssr: true,
  routeDiscovery: { mode: "initial" },
} as unknown as NonNullable<React.ContextType<typeof UNSAFE_FrameworkContext>>;

const routes: RouteObject[] = [{
  id: "root", path: "/", Component: HeadFixture,
  ErrorBoundary: HeadFixture,
  children: [
    ...["public", "plain", "empty", "notice"].map(id => ({ id, path: id, Component: routeModules[id as keyof typeof routeModules].default })),
    { id: "private", path: "hospital/app", Component: routeModules.private.default },
    { id: "login", path: "platform/login", Component: routeModules.login.default },
    { id: "directory", path: "articles", Component: routeModules.directory.default },
    { id: "missing", path: "missing", Component: routeModules.missing.default, loader: () => { throw new Response("Not Found", { status: 404 }); } },
  ],
}];

async function renderRequest(path: string) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`https://mlai.au${path}`));
  if (context instanceof Response) throw new Error("Unexpected fixture redirect");
  const router = createStaticRouter(handler.dataRoutes, context);
  return {
    status: context.statusCode,
    html: renderToStaticMarkup(
      <UNSAFE_FrameworkContext.Provider value={framework}>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </UNSAFE_FrameworkContext.Provider>,
    ),
  };
}

function tags(html: string) {
  return {
    robots: [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map(match => match[1]),
    canonicals: [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(match => match[1].replaceAll("&amp;", "&")),
  };
}

describe("active route metadata through React Router's Meta renderer", () => {
  test("owns one canonical and robots tag and preserves route social/schema data", async () => {
    const { html, status } = await renderRequest("/public?utm_source=search");
    expect(status).toBe(200);
    expect(tags(html)).toEqual({ canonicals: ["https://mlai.au/public"], robots: ["index, follow, max-image-preview:large"] });
    expect(html).toContain("<title>Public article | MLAI</title>");
    expect(html).toContain('content="Original route description"');
    expect(html).toContain('content="Original social title"');
    expect(html).toContain('content="https://mlai.au/article.jpg"');
    expect(html).not.toContain('property="og:image:width"');
    expect(html.match(/type="application\/ld\+json"/g)).toHaveLength(1);
    expect(html).toContain("Owned schema");
  });

  test("supplies tracking-free fallback for routes with absent or explicitly empty metadata", async () => {
    for (const path of ["/plain?utm_source=search", "/empty?session=example"]) {
      const { html } = await renderRequest(path);
      expect(tags(html)).toEqual({ canonicals: [`https://mlai.au${path.split("?")[0]}`], robots: ["index, follow"] });
      expect(html).not.toContain("Public article");
    }
  });

  test("private/login documents exclude indexing without inherited canonical", async () => {
    for (const path of ["/hospital/app", "/platform/login?app=hospital&next=/hospital/app"]) {
      const { html } = await renderRequest(path);
      expect(tags(html)).toEqual({ canonicals: [], robots: ["noindex, nofollow"] });
      expect(html).not.toContain('property="og:url"');
    }
  });

  test("keeps explicit public review exclusion and route-owned pagination canonical", async () => {
    expect(tags((await renderRequest("/notice")).html)).toEqual({ canonicals: ["https://mlai.au/notice"], robots: ["noindex, follow"] });
    expect(tags((await renderRequest("/articles?page=2&utm_source=search")).html)).toEqual({ canonicals: ["https://mlai.au/articles?page=2"], robots: ["index, follow"] });
  });

  test("actual router 404s retain error status and exclude misleading canonical/schema", async () => {
    for (const path of ["/missing", "/unknown-route"]) {
      const { html, status } = await renderRequest(path);
      expect(status).toBe(404);
      expect(tags(html)).toEqual({ canonicals: [], robots: ["noindex, nofollow"] });
      expect(html).toContain("Page Not Found | MLAI");
      expect(html).not.toContain("Stale schema");
    }
  });

  test("navigation recalculates policy without changing original route modules", async () => {
    const originalFunctions = Object.values(routeModules).map(module => "meta" in module ? module.meta : undefined);
    const router = createMemoryRouter(routes, { initialEntries: ["/public"] });
    const render = () => renderToStaticMarkup(<UNSAFE_FrameworkContext.Provider value={framework}><RouterProvider router={router} /></UNSAFE_FrameworkContext.Provider>);
    expect(tags(render()).canonicals).toEqual(["https://mlai.au/public"]);
    await router.navigate("/platform/login");
    expect(tags(render())).toEqual({ canonicals: [], robots: ["noindex, nofollow"] });
    await router.navigate("/plain?utm_source=client");
    expect(tags(render())).toEqual({ canonicals: ["https://mlai.au/plain"], robots: ["index, follow"] });
    await router.navigate("/missing");
    expect(tags(render())).toEqual({ canonicals: [], robots: ["noindex, nofollow"] });
    await router.navigate("/public");
    expect(tags(render())).toEqual({ canonicals: ["https://mlai.au/public"], robots: ["index, follow, max-image-preview:large"] });
    expect(Object.values(routeModules).map(module => "meta" in module ? module.meta : undefined)).toEqual(originalFunctions);
    expect("meta" in routeModules.plain).toBe(false);
    router.dispose();
  });
});

test("all private policy classes remain excluded, including checkout and session URLs", () => {
  for (const pathname of ["/hospital/app/submit", "/platform/dashboard", "/esafety/team", "/founder-tools", "/founder-tools/marketing", "/founder-tools/upgrade", "/valley", "/roo/topup/session-example", "/vibe-raising/updates", "/verify-email", "/agent-test"]) {
    const metadata = applyDocumentMetadataPolicy([{ title: "Private" }], { pathname });
    expect(metadata.find(row => row.name === "robots")?.content, pathname).toBe("noindex, nofollow");
    expect(metadata.filter(row => row.rel === "canonical"), pathname).toEqual([]);
  }
  for (const pathname of ["/founder-tools/start", "/founder-tools/start/", "/vibe-raising", "/vibe-raising/", "/healthhack", "/roo"]) {
    const metadata = applyDocumentMetadataPolicy([], { pathname });
    expect(metadata.find(row => row.name === "robots")?.content, pathname).toBe("index, follow");
    expect(metadata.filter(row => row.rel === "canonical"), pathname).toHaveLength(1);
  }
});

test("conflicting declarations collapse to the more restrictive single robots directive", () => {
  const metadata = applyDocumentMetadataPolicy([
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/old" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/review" },
  ], { pathname: "/review" });
  expect(metadata.filter(row => row.name === "robots")).toEqual([{ name: "robots", content: "max-image-preview:large, noindex, nofollow" }]);
  expect(metadata.filter(row => row.rel === "canonical")).toEqual([{ tagName: "link", rel: "canonical", href: "https://mlai.au/review" }]);
});

// Implement the standard longest-match/allow-wins rule against the shipped file,
// so slash/query variants cannot accidentally broaden the Hospital exception.
function robotsAllows(url: string) {
  const candidate = new URL(url, "https://mlai.au");
  const path = candidate.pathname + candidate.search;
  const matched = readFileSync("public/robots.txt", "utf8").split("\n").flatMap(line => {
    const row = line.split("#")[0].trim().match(/^(Allow|Disallow):\s*(.+)$/i);
    if (!row) return [];
    const pattern = row[2];
    const anchored = pattern.endsWith("$");
    const body = anchored ? pattern.slice(0, -1) : pattern;
    const expression = "^" + body.split("*").map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + (anchored ? "$" : "");
    return new RegExp(expression).test(path) ? [{ allow: row[1].toLowerCase() === "allow", specificity: body.replaceAll("*", "").length }] : [];
  });
  matched.sort((a, b) => b.specificity - a.specificity || Number(b.allow) - Number(a.allow));
  return matched[0]?.allow ?? true;
}

test("robots allows the indexed Hospital entry and login but preserves narrow private/resource blocks", () => {
  for (const path of ["/hospital/app", "/hospital/app/", "/hospital/app?utm_source=search", "/hospital/app/?utm_source=search", "/platform/login?app=hospital", "/founder-tools/start"]) {
    expect(robotsAllows(path), path).toBe(true);
  }
  for (const path of ["/hospital/app/team", "/hospital/app/team?next=1", "/hospital/application", "/hospital/app//", "/hospital/app/dashboard", "/hospital/app/submit", "/platform/dashboard", "/esafety/team", "/verify-email?token=example", "/__manifest?version=example"]) {
    expect(robotsAllows(path), path).toBe(false);
  }
});

test("actual Hospital loaders retain authentication and normalize the login return destination", async () => {
  const process = Bun.spawn([Bun.which("bun")!, "tests/fixtures/hospital-indexing-probe.tsx"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(process.stdout).text(), new Response(process.stderr).text(), process.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  const evidence = JSON.parse(stdout);
  expect(evidence.anonymous).toHaveLength(2);
  for (const result of evidence.anonymous) {
    expect(result.status).toBe(302);
    expect(result.location).toBe("/platform/login?app=hospital&next=/hospital/app");
    expect(result.contentReads).toBe(0);
  }
  expect(evidence.authenticated).toHaveLength(2);
  for (const result of evidence.authenticated) {
    expect(result.user.email).toBe("private-fixture@example.test");
    expect(result.meta.filter((row: MetaDescriptor) => row.name === "robots")).toEqual([{ name: "robots", content: "noindex, nofollow" }]);
  }
  expect(evidence.authenticationFailurePropagated).toBe(true);
  expect(evidence.alias).toBe("/hospital/app");
  expect(evidence.closed).toEqual({ status: 302, location: "/platform/login?app=hospital&next=/hospital/app&error=healthhack_closed", contentReads: 0 });
});

test("the real root Layout and entry handler render complete heads for ordinary, private and 404 documents", async () => {
  const process = Bun.spawn([Bun.which("bun")!, "tests/fixtures/root-document-probe.tsx"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(process.stdout).text(), new Response(process.stderr).text(), process.exited]);
  expect(exit).toBe(0);
  expect(stderr.trim()).toBe('No routes matched location "/never-existed"');
  const records = JSON.parse(stdout);
  expect(records).toHaveLength(6);
  for (const row of records) {
    expect(row.htmlDocument, row.path).toBe(true);
    expect(row.headCount, row.path).toBe(1);
    expect(row.robots, row.path).toHaveLength(1);
  }
  expect(records[0].status).toBe(200);
  expect(records[0].canonicals).toEqual(["https://mlai.au/contact"]);
  expect(records[0].title).toContain("Contact MLAI");
  for (const row of records.slice(1, 3)) {
    expect(row.status).toBe(200);
    expect(row.robots).toEqual(["noindex, nofollow"]);
    expect(row.canonicals).toEqual([]);
  }
  for (const row of records.slice(3, 5)) {
    expect(row.status).toBe(404);
    expect(row.robots).toEqual(["noindex, nofollow"]);
    expect(row.canonicals).toEqual([]);
    expect(row.title).toBe("Page Not Found | MLAI");
    expect(row.missingBody).toBe(true);
  }
  expect(records[5].status).toBe(503);
  expect(records[5].robots).toEqual(["noindex, nofollow"]);
  expect(records[5].canonicals).toEqual([]);
  expect(records[5].title).toBe("Page Error | MLAI");
}, 15_000);
