import { afterEach, beforeEach, expect, test } from "bun:test";
import type { EditorialCatalog } from "../app/lib/editorial-catalog";

// Global Bun module mocks in other route suites must not replace these real HTTP clients.
if (process.env.EDITORIAL_CATALOG_CHILD !== "1") {
  test("editorial-catalog-api.test.ts passes its isolated HTTP cases", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(),
      env: { ...process.env, EDITORIAL_CATALOG_CHILD: "1", VITE_STUB_BACKEND: "false", VITE_DEV_AUTH_BYPASS: "false" },
      stdout: "pipe", stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
const { action, loader } = await import("../app/routes/founder-tools.marketing.editorial");
const { articleBriefFromRequest, loadEditorialCatalog, saveEditorialCatalog } = await import("../app/lib/editorial-catalog.server");

let server: ReturnType<typeof Bun.serve>;
let calls: { path: string; method: string; cookie: string | null; origin: string | null; body: any }[];
let catalog: EditorialCatalog;
let role = "founder";
let catalogStatus = 200;
let writeStatus = 200;
let writeError = "Catalogue changed on the backend";
let loggedIn = true;
let malformedWrite = false;
let unchangedWrite = false;
beforeEach(() => {
  calls = []; role = "founder"; loggedIn = true; catalogStatus = 200; writeStatus = 200; writeError = "Catalogue changed on the backend"; malformedWrite = false; unchangedWrite = false;
  catalog = { editorial_catalog_version: 0, audience_options: [], cta_options: [], review_entries: [] };
  server = Bun.serve({ hostname: "127.0.0.1", port: 0, async fetch(request) {
    const url = new URL(request.url);
    const body = request.method === "GET" ? null : await request.json();
    calls.push({ path: url.pathname + url.search, method: request.method, cookie: request.headers.get("Cookie"), origin: request.headers.get("Origin"), body });
    if (url.pathname === "/api/v1/auth/me/") return Response.json(loggedIn ? { id: 99, email: "fixture@example.test", full_name: "Fixture owner" } : { detail: "Sign in" }, { status: loggedIn ? 200 : 401 });
    if (url.pathname === "/api/v1/founder-tools/profile/") return Response.json({ role, activeCompanyId: "owned", companies: [{ id: "owned", name: "Fixture company", domain: "example.test" }] });
    if (!url.pathname.startsWith("/api/v1/vibe-marketing/editorial-catalog/") || url.searchParams.get("company_id") !== "owned") return Response.json({ detail: "Unexpected fixture request" }, { status: 404 });
    if (request.method === "GET") return Response.json(catalogStatus === 200 ? catalog : { detail: "Catalogue unavailable" }, { status: catalogStatus });
    if (writeStatus !== 200) return Response.json({ error: writeError }, { status: writeStatus });
    if (malformedWrite) return Response.json({ accepted: true });
    if (!unchangedWrite) {
      if (request.method === "PUT") {
        catalog.audience_options = body.audience_options ?? catalog.audience_options;
        catalog.cta_options = body.cta_options ?? catalog.cta_options;
        catalog.review_entries = [...catalog.audience_options.map(a => ({ kind: "audience" as const, id: a.id, version: a.version, content_sha256: "a".repeat(64) })), ...catalog.cta_options.map(o => ({ kind: "offer" as const, id: o.id, version: o.version, content_sha256: "b".repeat(64) }))];
      } else {
        for (const receipt of body.entries) { const entry = (receipt.kind === "audience" ? catalog.audience_options : catalog.cta_options).find(e => e.id === receipt.id)!; entry.status = "approved"; entry.approved_by = "fixture-owner"; entry.approved_at = "2026-09-10T00:00:00Z"; }
      }
      catalog.editorial_catalog_version += 1;
    }
    return Response.json(catalog);
  } });
});
afterEach(() => server.stop(true));
const env = () => ({ BACKEND_BASE_URL: server.url.origin }) as Env;
const request = (body?: FormData, company = "owned", includeOrigin = true) => new Request(`https://mlai.au/founder-tools/marketing/editorial?companyId=${company}`, { method: body ? "POST" : "GET", headers: { Cookie: "access_token=unit-fixture-only", ...(includeOrigin ? { Origin: "https://mlai.au" } : {}) }, body });
const args = (request: Request) => ({ request, params: {}, context: { cloudflare: { env: env() } } }) as never;
function newAudience() { const form = new FormData(); for (const [key, value] of Object.entries({ companyId: "owned", intent: "save-entry", kind: "audience", entryId: "SMB", entryVersion: "0", expectedEditorialCatalogVersion: "0", readerTask: "Choose a workflow" })) form.set(key, value); return form; }

test("actual owner loader scopes its read and keeps empty distinct from unavailable", async () => {
  const result = await loader(args(request())); expect(result.companyId).toBe("owned"); expect(result.state.catalog?.editorial_catalog_version).toBe(0);
  expect(calls.at(-1)?.path).toBe("/api/v1/vibe-marketing/editorial-catalog/?company_id=owned&include_suggestions=1");
  catalogStatus = 503; const unavailable = await loadEditorialCatalog(env(), request(), "owned"); expect(unavailable.catalog).toBeNull(); expect(unavailable.error).toContain("unavailable");
});
test("actual action sends an unapproved draft with the original cookie and Origin", async () => {
  const result = await action(args(request(newAudience()))); expect(result).toMatchObject({ ok: true });
  const write = calls.find(c => c.method === "PUT")!;
  expect(write.path).toBe("/api/v1/vibe-marketing/editorial-catalog/?company_id=owned"); expect(write.cookie).toBe("access_token=unit-fixture-only"); expect(write.origin).toBe("https://mlai.au");
  expect(write.body).toMatchObject({ expected_editorial_catalog_version: 0, audience_options: [{ id: "SMB", status: "draft", version: 1, approved_by: null, approved_at: null }] });
});
test("foreign or conflicting company selection makes no catalogue mutation", async () => {
  await expect(loader(args(request(undefined, "foreign")))).rejects.toMatchObject({ status: 404 });
  const form = newAudience(); form.set("companyId", "foreign"); const result = await action(args(request(form))); expect(result).toMatchObject({ data: { ok: false } });
  expect(calls.filter(c => c.method !== "GET")).toEqual([]);
});
test("unauthenticated and non-founder callers do not reach catalogue writes", async () => {
  loggedIn = false; await expect(action(args(request(newAudience())))).rejects.toMatchObject({ status: 302 });
  loggedIn = true; role = "investor"; await expect(action(args(request(newAudience())))).rejects.toMatchObject({ status: 302 });
  expect(calls.filter(c => c.path.includes("editorial-catalog"))).toEqual([]);
});
test("stale editor is rejected before PUT; backend conflicts are not retried", async () => {
  catalog.editorial_catalog_version = 2; const stale = await action(args(request(newAudience()))); expect(stale).toMatchObject({ data: { ok: false } }); expect(calls.some(c => c.method === "PUT")).toBe(false);
  catalog.editorial_catalog_version = 0; writeStatus = 409; const conflict = await action(args(request(newAudience()))); expect(conflict).toMatchObject({ init: { status: 409 }, data: { ok: false } }); expect(calls.filter(c => c.method === "PUT")).toHaveLength(1);
});
test("approval sends exact reviewed content and no caller approval identity", async () => {
  catalog.audience_options = [{ id: "SMB", reader_task: "Choose a task", constraints: [], exclusions: [], allow_no_offer: false, status: "draft", version: 1, approved_by: null, approved_at: null }]; catalog.review_entries = [{ kind: "audience", id: "SMB", version: 1, content_sha256: "a".repeat(64) }];
  const form = new FormData(); form.set("intent", "approve-entries"); form.set("companyId", "owned"); form.set("expectedEditorialCatalogVersion", "0"); form.set("confirmApproval", "on"); form.set("reviewEntry", JSON.stringify(catalog.review_entries[0]));
  expect(await action(args(request(form)))).toMatchObject({ ok: true });
  const post = calls.find(c => c.method === "POST")!; expect(post.path).toBe("/api/v1/vibe-marketing/editorial-catalog/approve/?company_id=owned"); expect(post.body).toEqual({ expected_editorial_catalog_version: 0, entries: catalog.review_entries });
});
for (const approving of [false, true]) {
  for (const rejection of [
    { status: 403, message: "Only company founders can review this catalog" },
    { status: 404, message: "Company configuration not found" },
    { status: 409, message: "Company configuration changed; reload the catalog before saving or approving" },
  ]) {
    test(`${approving ? "approval" : "draft save"} preserves backend ownership rejection ${rejection.status} without retry`, async () => {
      let form = newAudience();
      if (approving) {
        catalog.audience_options = [{ id: "SMB", reader_task: "Choose a task", constraints: [], exclusions: [], allow_no_offer: false, status: "draft", version: 1, approved_by: null, approved_at: null }];
        catalog.review_entries = [{ kind: "audience", id: "SMB", version: 1, content_sha256: "a".repeat(64) }];
        form = new FormData();
        for (const [key, value] of Object.entries({ intent: "approve-entries", companyId: "owned", expectedEditorialCatalogVersion: "0", confirmApproval: "on", reviewEntry: JSON.stringify(catalog.review_entries[0]) })) form.set(key, value);
      }
      const original = structuredClone(catalog);
      // Initial user/company/catalogue reads still succeed. The real action
      // then receives the changed-authority response at its mutation boundary.
      writeStatus = rejection.status; writeError = rejection.message;
      const result = await action(args(request(form)));
      expect(result).toMatchObject({ init: { status: rejection.status }, data: { ok: false } });
      expect((result as { data: { error: string } }).data.error).toContain(rejection.message);
      expect((result as { data: { error: string } }).data.error).toContain("No automatic retry was made");
      const writes = calls.filter(c => c.method !== "GET");
      expect(writes).toHaveLength(1);
      expect(writes[0].method).toBe(approving ? "POST" : "PUT");
      expect(writes[0].path).toBe(`/api/v1/vibe-marketing/editorial-catalog/${approving ? "approve/" : ""}?company_id=owned`);
      expect(catalog).toEqual(original);
    });
  }
}
test("an uncertain or incompatible write response is not reported as confirmed or retried", async () => {
  malformedWrite = true; const result = await action(args(request(newAudience()))); expect(result).toMatchObject({ data: { ok: false } }); expect(calls.filter(c => c.method === "PUT")).toHaveLength(1);
});
test("HTTP 200 with the old catalogue is not treated as a successful edit", async () => {
  unchangedWrite = true; const result = await action(args(request(newAudience()))); expect(result).toMatchObject({ data: { ok: false } }); expect(calls.filter(c => c.method === "PUT")).toHaveLength(1);
});
test("API does not invent an Origin or fall back to an empty catalogue for article generation", async () => {
  await saveEditorialCatalog(env(), request(newAudience(), "owned", false), "owned", { expected_editorial_catalog_version: 0, audience_options: [] }); expect(calls.at(-1)?.origin).toBeNull();
  const form = new FormData(); form.set("editorialCompanyId", "owned"); form.set("editorialCatalogVersion", String(catalog.editorial_catalog_version));
  await expect(articleBriefFromRequest(env(), request(), form, "owned")).rejects.toThrow("approved audience");
  catalogStatus = 503; await expect(articleBriefFromRequest(env(), request(), form, "owned")).rejects.toThrow();
  expect(calls.some(c => c.path.includes("/article"))).toBe(false);
});
}
