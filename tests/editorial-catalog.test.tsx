import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import EditorialBriefFields from "../app/components/EditorialBriefFields";
import { approvalFromForm, briefFromForm, catalogEditFromForm, compatibleEditorialOffers, parseEditorialCatalog, safeEditorialDestination, type EditorialCatalog } from "../app/lib/editorial-catalog";

export function fixtureCatalog(): EditorialCatalog {
  const approval = { status: "approved" as const, approved_by: "fixture-owner", approved_at: "2026-09-10T00:00:00Z", version: 1 };
  return { editorial_catalog_version: 4,
    audience_options: [{ ...approval, id: "SMB", reader_task: "Choose a bounded workflow pilot", constraints: ["Needs implementation help"], exclusions: ["No guaranteed savings"], allow_no_offer: true }, { ...approval, id: "OUTSIDE", reader_task: "Learn without an offer", constraints: [], exclusions: [], allow_no_offer: true }],
    cta_options: [{ ...approval, id: "pilot", title: "Describe the workflow", body: "Share the task and constraints for review.", button_text: "Start a brief", button_href: "/fixture-intake", audience: "general", use_when: "After a scoped decision", cta_component: "ArticleCompanyCTA", image_url: null, secondary_button_text: null, secondary_button_href: null, audience_ids: ["SMB"], countries: ["AU"] }],
    review_entries: [{ kind: "audience", id: "SMB", version: 1, content_sha256: "a".repeat(64) }, { kind: "audience", id: "OUTSIDE", version: 1, content_sha256: "b".repeat(64) }, { kind: "offer", id: "pilot", version: 1, content_sha256: "c".repeat(64) }] };
}
function form(values: Record<string, string>): FormData { const result = new FormData(); for (const [k, v] of Object.entries(values)) result.set(k, v); return result; }
function briefForm() { return form({ editorialCompanyId: "fixture-company", editorialCatalogVersion: "4", editorialAudienceId: "SMB", editorialAudienceVersion: "1", editorialCountry: "AU", editorialIntent: "offer", editorialOfferId: "pilot", editorialOfferVersion: "1", editorialReaderTask: "Compare two workflows", editorialContribution: "A labelled worked cost comparison", editorialCriteria: "Preserve full costs\nDistinguish assumptions from measured outcomes" }); }
function audienceForm() { return form({ intent: "save-entry", kind: "audience", entryId: "SMB", entryVersion: "1", expectedEditorialCatalogVersion: "4", readerTask: "A revised reader task", constraints: "No coding required", exclusions: "No guaranteed margin change", invalidateDependentOffers: "on" }); }

describe("catalogue and exact brief contract", () => {
  test("requires a complete versioned owner response, including exact review identities", () => {
    expect(parseEditorialCatalog(fixtureCatalog())).toEqual(fixtureCatalog());
    for (const value of [null, {}, { audience_options: null }, { ...fixtureCatalog(), editorial_catalog_version: "4" }, { ...fixtureCatalog(), review_entries: [] }]) expect(() => parseEditorialCatalog(value)).toThrow();
    const duplicate = fixtureCatalog(); duplicate.audience_options.push(duplicate.audience_options[0]); expect(() => parseEditorialCatalog(duplicate)).toThrow("Duplicate");
    const missing = fixtureCatalog(); missing.cta_options[0].approved_by = null; expect(() => parseEditorialCatalog(missing)).toThrow("approval");
  });
  test.each(["#", "javascript:alert(1)", "//untrusted.example", "https://user:password@example.com", "/bad\\path", "/two words", "data:text/html,test"])("rejects unsafe destination %s", value => expect(() => safeEditorialDestination(value)).toThrow());
  test.each(["/events", "/studio#apply", "https://example.com/brief?source=article", "http://localhost:8080/brief"])("accepts explicit destination %s", value => expect(safeEditorialDestination(value)).toBe(value));
  test("serializes one exact brief with genuine criteria and no fabricated offer", () => {
    expect(briefFromForm(briefForm(), fixtureCatalog(), "fixture-company")).toEqual({ audience_id: "SMB", audience_version: 1, conversion_intent: "offer", offer_id: "pilot", offer_version: 1, no_offer_reason: null, country: "AU", reader_task: "Compare two workflows", distinct_contribution: "A labelled worked cost comparison", acceptance_criteria: ["Preserve full costs", "Distinguish assumptions from measured outcomes"] });
    expect(compatibleEditorialOffers(fixtureCatalog(), "SMB", "NZ")).toEqual([]);
    expect(compatibleEditorialOffers(fixtureCatalog(), "OUTSIDE", "AU")).toEqual([]);
  });
  test.each([
    ["editorialCompanyId", "other-company"], ["editorialCatalogVersion", "3"], ["editorialCatalogVersion", ""], ["editorialCatalogVersion", "4.0"], ["editorialAudienceVersion", "2"], ["editorialOfferVersion", "2"], ["editorialAudienceId", ""], ["editorialOfferId", "unknown"], ["editorialCountry", "NZ"], ["editorialCountry", "au"], ["editorialIntent", ""], ["editorialReaderTask", " "], ["editorialContribution", ""], ["editorialCriteria", "\n "], ["editorialNoOfferReason", "conflicts with offer"],
  ])("rejects invalid or stale %s", (field, value) => { const input = briefForm(); input.set(field, value); expect(() => briefFromForm(input, fixtureCatalog(), "fixture-company")).toThrow(); });
  test("does not use draft or retired definitions or accept ambiguous form fields", () => {
    for (const kind of ["audience_options", "cta_options"] as const) for (const status of ["draft", "retired"] as const) { const catalog = fixtureCatalog(); catalog[kind][0].status = status; expect(() => briefFromForm(briefForm(), catalog, "fixture-company")).toThrow(); }
    const input = briefForm(); input.append("editorialAudienceId", "OUTSIDE"); expect(() => briefFromForm(input, fixtureCatalog(), "fixture-company")).toThrow();
  });
  test("no-offer needs permission, a reason and no offer IDs, including OUTSIDE", () => {
    const input = briefForm(); input.set("editorialIntent", "none"); input.delete("editorialOfferId"); input.delete("editorialOfferVersion"); input.set("editorialNoOfferReason", "Intentional education, no implementation offer");
    expect(briefFromForm(input, fixtureCatalog(), "fixture-company").offer_id).toBeNull();
    input.set("editorialAudienceId", "OUTSIDE"); expect(briefFromForm(input, fixtureCatalog(), "fixture-company").conversion_intent).toBe("none");
    const catalog = fixtureCatalog(); catalog.audience_options[1].allow_no_offer = false; expect(() => briefFromForm(input, catalog, "fixture-company")).toThrow();
    input.set("editorialOfferId", "pilot"); expect(() => briefFromForm(input, fixtureCatalog(), "fixture-company")).toThrow();
  });
});

describe("draft edits and explicit approval", () => {
  test("revising an audience clears its approval and explicitly invalidates dependent offers", () => {
    const catalog = fixtureCatalog(); const original = structuredClone(catalog);
    const updated = catalogEditFromForm(audienceForm(), catalog);
    expect(updated.audience_options[0]).toMatchObject({ status: "draft", version: 2, approved_by: null, approved_at: null, reader_task: "A revised reader task" });
    expect(updated.cta_options[0]).toMatchObject({ status: "draft", version: 2, approved_by: null, approved_at: null });
    expect(updated.audience_options[1]).toEqual(original.audience_options[1]); expect(catalog).toEqual(original);
    const noConsent = audienceForm(); noConsent.delete("invalidateDependentOffers"); expect(() => catalogEditFromForm(noConsent, catalog)).toThrow("Confirm");
  });
  test("new entries are unapproved and existing IDs cannot be recreated at version zero", () => {
    const input = audienceForm(); input.set("entryId", "NEW"); input.set("entryVersion", "0");
    const updated = catalogEditFromForm(input, fixtureCatalog()); expect(updated.audience_options.at(-1)).toMatchObject({ id: "NEW", status: "draft", version: 1, approved_by: null }); expect(updated.cta_options[0].status).toBe("approved");
    input.set("entryId", "SMB"); expect(() => catalogEditFromForm(input, fixtureCatalog())).toThrow("ID or entry version");
  });
  test("retirement preserves definitions and IDs but invalidates approval", () => {
    const input = audienceForm(); input.set("intent", "retire-entry"); input.delete("readerTask");
    const updated = catalogEditFromForm(input, fixtureCatalog()); expect(updated.audience_options[0]).toMatchObject({ id: "SMB", reader_task: fixtureCatalog().audience_options[0].reader_task, status: "retired", version: 2 }); expect(updated.cta_options[0].status).toBe("draft");
  });
  test("offer edits preserve presentation fields, reject invalid destinations and never copy approvals", () => {
    const input = form({ intent: "save-entry", expectedEditorialCatalogVersion: "4", kind: "offer", entryId: "pilot", entryVersion: "1", title: "Pilot", body: "Review a workflow", buttonText: "Start", buttonHref: "/new-intake", countries: "AU, NZ", legacyAudience: "owners", useWhen: "After the example", ctaComponent: "ArticleCompanyCTA", imageUrl: "/example.png", secondaryButtonText: "Events", secondaryButtonHref: "/events" }); input.append("audienceIds", "SMB");
    const offer = catalogEditFromForm(input, fixtureCatalog()).cta_options[0]; expect(offer).toMatchObject({ version: 2, status: "draft", approved_by: null, countries: ["AU", "NZ"], audience_ids: ["SMB"], image_url: "/example.png", secondary_button_href: "/events" });
    input.set("buttonHref", "#"); expect(() => catalogEditFromForm(input, fixtureCatalog())).toThrow();
  });
  test("approval forwards exact reviewed hashes and versions without a client approver", () => {
    const input = form({ confirmApproval: "on", expectedEditorialCatalogVersion: "4" }); input.append("reviewEntry", JSON.stringify(fixtureCatalog().review_entries[0]));
    expect(approvalFromForm(input, fixtureCatalog())).toEqual({ expected_editorial_catalog_version: 4, entries: [fixtureCatalog().review_entries[0]] });
    input.set("reviewEntry", JSON.stringify({ ...fixtureCatalog().review_entries[0], content_sha256: "d".repeat(64) })); expect(() => approvalFromForm(input, fixtureCatalog())).toThrow("changed");
    input.delete("confirmApproval"); expect(() => approvalFromForm(input, fixtureCatalog())).toThrow("Confirm");
  });
  test("a stale editor cannot silently rebase a save or approval", () => {
    const current = fixtureCatalog(); current.editorial_catalog_version += 1;
    expect(() => catalogEditFromForm(audienceForm(), current)).toThrow("catalogue changed");
    expect(() => approvalFromForm(form({ confirmApproval: "on", expectedEditorialCatalogVersion: "4" }), current)).toThrow("catalogue changed");
  });
  test("entry and dependent offer versions cannot overflow the exact integer contract", () => {
    const entry = fixtureCatalog(); entry.audience_options[0].version = Number.MAX_SAFE_INTEGER;
    const input = audienceForm(); input.set("entryVersion", String(Number.MAX_SAFE_INTEGER));
    expect(() => catalogEditFromForm(input, entry)).toThrow("version");
    const dependent = fixtureCatalog(); dependent.cta_options[0].version = Number.MAX_SAFE_INTEGER;
    expect(() => catalogEditFromForm(audienceForm(), dependent)).toThrow("version");
  });
});

test("brief SSR requires explicit choices and distinguishes unavailability from an empty catalogue", () => {
  const html = renderToStaticMarkup(<RouterProvider router={createMemoryRouter([{path: "/", element: <EditorialBriefFields companyId="fixture-company" state={{ catalog: fixtureCatalog(), error: null }} />}])} />);
  expect(html).toContain('value="" selected=""'); expect(html).toContain('name="editorialReaderTask" required=""'); expect(html).not.toContain('name="editorialOfferId"');
  const unavailable = renderToStaticMarkup(<RouterProvider router={createMemoryRouter([{path: "/", element: <EditorialBriefFields companyId="fixture-company" state={{ catalog: null, error: "Unavailable fixture" }} />}])} />);
  expect(unavailable).toContain("No article can start"); expect(unavailable).not.toContain('name="editorialCatalogVersion"');
});

test("all three article-start routes await a fresh brief before dispatch and render the selector", () => {
  for (const route of ["founder-tools.marketing", "founder-tools.marketing.create", "founder-tools.marketing.run"]) {
    const source = readFileSync(`app/routes/${route}.tsx`, "utf8");
    expect(source).toMatch(/const editorialBrief = await articleBriefFromRequest[\s\S]*?startVibeMarketingArticle\(env, request, \{\s*editorialBrief,/);
    expect(source).toContain("<EditorialBriefFields"); expect(source).toContain("loadEditorialCatalog");
    expect(source).toContain("onAvailabilityChange={setEditorialAvailable}");
    expect(source).toContain("!editorialAvailable");
  }
});
