import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { action as dashboardAction } from "../app/routes/founder-tools.marketing";
import { action as createAction } from "../app/routes/founder-tools.marketing.create";
import { action as researchAction } from "../app/routes/founder-tools.marketing.run";
import type { EditorialCatalog } from "../app/lib/editorial-catalog";

// Real route actions, auth/profile adapters, bootstrap normalizer, catalogue
// validation and article API client. Only the HTTP backend is a fixture: no SQL,
// real JWT, business approval, worker dispatch, billing or model generation.
const routes = [
  { name: "dashboard", path: "/founder-tools/marketing", action: dashboardAction },
  { name: "create", path: "/founder-tools/marketing/create", action: createAction },
  { name: "research confirmation", path: "/founder-tools/marketing/runs/discovery-fixture", action: researchAction },
];
type Call = { path: string; method: string; cookie: string | null; origin: string | null; body: any };
let server: ReturnType<typeof Bun.serve>;
let calls: Call[];
let catalog: EditorialCatalog;
let catalogStatus: number;
let catalogMalformed: boolean;
let articleStatus: number;
let articleResponse: unknown;
let loggedIn: boolean;
let role: string;
let activeCompany: string;
let candidatePlacement: "list" | "pillar";
let originalFetch: typeof fetch;
let blockedExternal: string[];

function approvedCatalog(): EditorialCatalog {
  const approval = { version: 1, status: "approved" as const, approved_by: "fixture-owner", approved_at: "2026-09-10T00:00:00Z" };
  const audience_options = ["SMB", "BUILDER", "FOUNDER_BUILDER", "COMMUNITY", "OUTSIDE"].map(id => ({
    ...approval, id, reader_task: `The ${id} reader's approved task`, constraints: [], exclusions: [], allow_no_offer: true,
  }));
  const cta_options = [
    { id: "pilot", audience_ids: ["SMB"] },
    { id: "build", audience_ids: ["BUILDER", "FOUNDER_BUILDER"] },
    { id: "events", audience_ids: ["COMMUNITY"] },
  ].map(entry => ({
    ...approval, ...entry, title: "Fixture offer", body: "A bounded action for this reader", button_text: "Continue",
    button_href: `/fixture/${entry.id}`, audience: "general", use_when: "After the useful output", cta_component: "ArticleCompanyCTA",
    image_url: null, secondary_button_text: null, secondary_button_href: null, countries: ["AU"],
  }));
  return { editorial_catalog_version: 4, audience_options, cta_options, review_entries: [
    ...audience_options.map(a => ({ kind: "audience" as const, id: a.id, version: a.version, content_sha256: "a".repeat(64) })),
    ...cta_options.map(o => ({ kind: "offer" as const, id: o.id, version: o.version, content_sha256: "b".repeat(64) })),
  ] };
}

beforeEach(() => {
  calls = []; blockedExternal = []; catalog = approvedCatalog(); catalogStatus = 200; catalogMalformed = false;
  articleStatus = 200; articleResponse = { runId: "article-fixture", status: "queued" };
  loggedIn = true; role = "founder"; activeCompany = "owned"; candidatePlacement = "list";
  server = Bun.serve({ hostname: "127.0.0.1", port: 0, async fetch(request) {
    const url = new URL(request.url);
    const body = request.method === "GET" ? null : await request.json();
    calls.push({ path: url.pathname + url.search, method: request.method, cookie: request.headers.get("Cookie"), origin: request.headers.get("Origin"), body });
    if (url.pathname === "/api/v1/auth/me/") return Response.json(loggedIn ? { id: 99, email: "dispatch@example.test", full_name: "Fixture owner" } : { detail: "Sign in" }, { status: loggedIn ? 200 : 401 });
    if (url.pathname === "/api/v1/founder-tools/profile/") return Response.json({ role, activeCompanyId: activeCompany, companies: [
      { id: "owned", name: "Fixture company", domain: "example.test" }, { id: "second", name: "Second fixture", domain: "second.example.test" },
    ] });
    if (url.pathname === "/api/v1/vibe-marketing/bootstrap/" && request.method === "GET") {
      const candidate = { id: "topic:fixture", title: "A researched workflow decision", keyword: "reviewed workflow", sourceRunId: "discovery-fixture" };
      return Response.json({ company: { id: url.searchParams.get("company_id"), name: "Fixture company" }, checks: {}, settings: {},
        topicCandidates: candidatePlacement === "list" ? [candidate] : [],
        topicPillars: candidatePlacement === "pillar" ? [{ slug: "operations", name: "Operations", topicCandidates: [candidate] }] : [],
      });
    }
    if (url.pathname === "/api/v1/vibe-marketing/editorial-catalog/" && request.method === "GET") {
      return Response.json(catalogStatus !== 200 ? { detail: "Catalogue unavailable" } : catalogMalformed ? { status: "ok" } : catalog, { status: catalogStatus });
    }
    if (url.pathname === "/api/v1/vibe-marketing/article" && request.method === "POST") return Response.json(articleResponse, { status: articleStatus });
    return Response.json({ detail: "Unexpected dispatch fixture request" }, { status: 404 });
  } });
  originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
    const url = input instanceof Request ? input.url : String(input);
    if (new URL(url).origin !== server.url.origin) {
      blockedExternal.push(url);
      throw new Error("Non-fixture HTTP is prohibited in editorial dispatch tests");
    }
    return originalFetch(input, init);
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  server.stop(true);
  expect(blockedExternal).toEqual([]);
});

function briefForm(audienceId = "SMB", noOffer = audienceId === "OUTSIDE") {
  const offer = audienceId === "SMB" ? "pilot" : audienceId === "COMMUNITY" ? "events" : "build";
  const input = new FormData();
  for (const [key, value] of Object.entries({
    intent: "start-article", topicCandidateId: "__custom__", customTitle: "A distinct reader decision", targetKeyword: "workflow decision",
    articleContext: "Use a labelled example, not claimed client results", clientRequestId: "dispatch-fixture-idempotency-key",
    editorialCompanyId: "owned", editorialCatalogVersion: "4", editorialAudienceId: audienceId, editorialAudienceVersion: "1",
    editorialCountry: "AU", editorialIntent: noOffer ? "none" : "offer", editorialReaderTask: "Compare two candidate workflows",
    editorialContribution: "A transparent worked comparison with a stop decision",
    editorialCriteria: "Include setup and ongoing costs\nLabel assumptions and untested outcomes",
    ...(noOffer ? { editorialNoOfferReason: "Intentional reader education without an offer" } : { editorialOfferId: offer, editorialOfferVersion: "1" }),
  })) input.set(key, value);
  return input;
}
async function submit(route: typeof routes[number], form = briefForm(), includeOrigin = true) {
  const request = new Request(`https://mlai.au${route.path}`, { method: "POST", body: form, headers: {
    Cookie: "access_token=dispatch-fixture-only", ...(includeOrigin ? { Origin: "https://mlai.au" } : {}),
  } });
  try {
    return await route.action({ request, params: { runId: "discovery-fixture" }, context: { cloudflare: { env: { BACKEND_BASE_URL: server.url.origin } } } } as never);
  } catch (error) { if (error instanceof Response) return error; throw error; }
}
const generations = () => calls.filter(c => c.path === "/api/v1/vibe-marketing/article");
function errorResult(result: unknown) {
  expect(result).not.toBeInstanceOf(Response);
  expect(result).toMatchObject({ intent: "start-article" });
  expect(typeof (result as { error: unknown }).error).toBe("string");
  expect((result as { error: string }).error.trim().length).toBeGreaterThan(0);
}

for (const route of routes) describe(`actual ${route.name} article dispatch`, () => {
  for (const audience of ["SMB", "BUILDER", "FOUNDER_BUILDER", "COMMUNITY", "OUTSIDE"]) {
    test(`carries the exact ${audience} brief once, with scoped company and original request headers`, async () => {
      const form = briefForm(audience);
      const result = await submit(route, form);
      expect(result).toBeInstanceOf(Response);
      expect((result as Response).headers.get("Location")).toBe("/founder-tools/marketing/runs/article-fixture");
      expect(generations()).toHaveLength(1);
      const sent = generations()[0];
      expect(sent.cookie).toBe("access_token=dispatch-fixture-only"); expect(sent.origin).toBe("https://mlai.au");
      expect(sent.body).toMatchObject({ companyId: "owned", topic: "A distinct reader decision", targetKeyword: "workflow decision",
        clientRequestId: "dispatch-fixture-idempotency-key", client_request_id: "dispatch-fixture-idempotency-key" });
      expect(sent.body.editorialBrief).toEqual({ audience_id: audience, audience_version: 1, conversion_intent: audience === "OUTSIDE" ? "none" : "offer",
        offer_id: form.get("editorialOfferId"), offer_version: audience === "OUTSIDE" ? null : 1,
        no_offer_reason: form.get("editorialNoOfferReason"), country: "AU", reader_task: "Compare two candidate workflows",
        distinct_contribution: "A transparent worked comparison with a stop decision",
        acceptance_criteria: ["Include setup and ongoing costs", "Label assumptions and untested outcomes"] });
      expect(calls.map(c => c.path)).toEqual(["/api/v1/auth/me/", "/api/v1/founder-tools/profile/", "/api/v1/vibe-marketing/bootstrap/?company_id=owned",
        "/api/v1/vibe-marketing/editorial-catalog/?company_id=owned", "/api/v1/vibe-marketing/article"]);
    });
  }
  test("permits an explicitly approved no-offer purpose for a commercial audience", async () => {
    expect(await submit(route, briefForm("SMB", true))).toBeInstanceOf(Response);
    expect(generations()[0].body.editorialBrief).toMatchObject({ audience_id: "SMB", conversion_intent: "none", offer_id: null, offer_version: null });
  });
  test("preserves the approved brief when starting a selected researched topic", async () => {
    const form = briefForm(); form.set("topicCandidateId", "topic:fixture"); form.delete("customTitle"); form.delete("targetKeyword");
    expect(await submit(route, form)).toBeInstanceOf(Response);
    expect(generations()).toHaveLength(1);
    expect(generations()[0].body).toMatchObject({ topicCandidateId: "topic:fixture", topic: "A researched workflow decision",
      targetKeyword: "reviewed workflow", selectedTitle: "A researched workflow decision", sourceRunId: "discovery-fixture",
      editorialBrief: { audience_id: "SMB", offer_id: "pilot", audience_version: 1, offer_version: 1 } });
  });
  test.each([
    ["editorialCompanyId", "second"], ["editorialCatalogVersion", "3"], ["editorialCatalogVersion", ""],
    ["editorialAudienceVersion", "2"], ["editorialAudienceId", "unknown"], ["editorialOfferVersion", "2"],
    ["editorialOfferId", "events"], ["editorialCountry", "NZ"], ["editorialCountry", "au"], ["editorialIntent", ""],
    ["editorialReaderTask", ""], ["editorialContribution", " "], ["editorialCriteria", "\n "], ["editorialNoOfferReason", "Conflicting intent"],
  ])("rejects invalid %s before any generation request", async (field, value) => {
    const form = briefForm(); form.set(field, value);
    errorResult(await submit(route, form)); expect(generations()).toHaveLength(0);
  });
  test("rejects duplicate editorial fields and a completely absent brief", async () => {
    const form = briefForm(); form.append("editorialAudienceId", "COMMUNITY");
    errorResult(await submit(route, form));
    for (const key of [...form.keys()]) if (key.startsWith("editorial")) form.delete(key);
    errorResult(await submit(route, form)); expect(generations()).toHaveLength(0);
  });
  for (const kind of ["audience_options", "cta_options"] as const) for (const status of ["draft", "retired"] as const) {
    test(`rejects ${status} ${kind} from a fresh catalogue read`, async () => {
      catalog[kind][0].status = status;
      errorResult(await submit(route)); expect(generations()).toHaveLength(0);
    });
  }
  test("rejects missing no-offer permission, missing reason and conflicting offer identity", async () => {
    catalog.audience_options[0].allow_no_offer = false;
    errorResult(await submit(route, briefForm("SMB", true)));
    catalog.audience_options[0].allow_no_offer = true;
    const form = briefForm("SMB", true); form.delete("editorialNoOfferReason"); errorResult(await submit(route, form));
    form.set("editorialNoOfferReason", "Deliberate education"); form.set("editorialOfferId", "pilot"); errorResult(await submit(route, form));
    expect(generations()).toHaveLength(0);
  });
  test("does not substitute defaults for an unavailable or malformed catalogue", async () => {
    catalogStatus = 503; errorResult(await submit(route));
    catalogStatus = 200; catalogMalformed = true; errorResult(await submit(route));
    expect(generations()).toHaveLength(0);
  });
  test("an active-company change rejects the old page rather than dispatching for another company", async () => {
    activeCompany = "second"; errorResult(await submit(route)); expect(generations()).toHaveLength(0);
    expect(calls.some(c => c.path.includes("company_id=owned"))).toBe(false);
  });
  test("authentication and founder-role failures cannot reach the generation endpoint", async () => {
    loggedIn = false; expect(await submit(route)).toBeInstanceOf(Response);
    loggedIn = true; role = "investor"; expect(await submit(route)).toBeInstanceOf(Response);
    expect(calls.some(c => c.path.startsWith("/api/v1/vibe-marketing"))).toBe(false);
  });
  test("preserves a backend dispatch rejection and makes no automatic retry", async () => {
    articleStatus = 409; articleResponse = { detail: "The selected offer was revoked before dispatch" };
    const result = await submit(route); errorResult(result);
    expect((result as { error: string }).error).toContain("revoked"); expect(generations()).toHaveLength(1);
  });
  test("does not invent an Origin when the original request has none", async () => {
    await submit(route, briefForm(), false); expect(generations()).toHaveLength(1); expect(generations()[0].origin).toBeNull();
  });
  test.each([{}, { runId: "   ", status: "queued" }, { status: "failed", detail: "Editorial brief rejected by the receiver" }])("does not redirect or claim success without a confirmed run: %j", async response => {
    articleResponse = response;
    const result = await submit(route); errorResult(result); expect(generations()).toHaveLength(1);
    const message = (result as { error: string }).error;
    expect(message).toContain("detail" in response ? response.detail : "Check existing article runs before retrying");
  });
  test("accepts the supported snake-case run identity", async () => {
    articleResponse = { run_id: "article-fixture", status: "queued" };
    const result = await submit(route);
    expect((result as Response).headers.get("Location")).toBe("/founder-tools/marketing/runs/article-fixture");
    expect(generations()).toHaveLength(1);
  });
});

test("dashboard content-island topic carries the same exact reader brief", async () => {
  candidatePlacement = "pillar";
  const form = briefForm(); form.set("topicCandidateId", "topic:fixture"); form.delete("customTitle"); form.delete("targetKeyword");
  expect(await submit(routes[0], form)).toBeInstanceOf(Response);
  expect(generations()).toHaveLength(1);
  expect(generations()[0].body).toMatchObject({ topic: "A researched workflow decision", sourceRunId: "discovery-fixture", editorialBrief: { audience_id: "SMB", offer_id: "pilot" } });
});

test("research-run topic absent from the dashboard list still requires and carries an approved brief", async () => {
  const form = briefForm("BUILDER"); form.set("topicCandidateId", "run-only-fixture"); form.delete("customTitle"); form.delete("targetKeyword");
  form.set("candidateTitle", "Run-local delivery task"); form.set("candidateKeyword", "delivery evidence"); form.set("sourceRunId", "discovery-fixture");
  expect(await submit(routes[2], form)).toBeInstanceOf(Response);
  expect(generations()).toHaveLength(1);
  expect(generations()[0].body).toMatchObject({ topic: "Run-local delivery task", sourceRunId: "discovery-fixture", editorialBrief: { audience_id: "BUILDER", offer_id: "build" } });
  form.set("editorialOfferId", "pilot"); errorResult(await submit(routes[2], form)); expect(generations()).toHaveLength(1);
});
