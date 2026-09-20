/** Owner catalogue contract. Approval is issued by the backend, never this UI. */
export type EditorialStatus = "draft" | "approved" | "retired";
type VersionedEntry = { id: string; status: EditorialStatus; version: number; approved_by: string | null; approved_at: string | null };
export type EditorialAudience = VersionedEntry & {
  reader_task: string; constraints: string[]; exclusions: string[]; allow_no_offer: boolean;
  catalog_schema_version?: 2; name?: string; description?: string; pain_points?: string[];
  desired_outcomes?: string[]; knowledge_level?: "beginner" | "intermediate" | "specialist" | "unspecified";
};
export type EditorialOffer = VersionedEntry & {
  title: string; body: string; button_text: string; button_href: string;
  audience: string; use_when: string; cta_component: string; image_url: string | null;
  secondary_button_text: string | null; secondary_button_href: string | null;
  audience_ids: string[]; countries: string[];
  catalog_schema_version?: 2; action_type?: string; action_description?: string;
};
export type EditorialReviewEntry = { kind: "audience" | "offer"; id: string; version: number; content_sha256: string };
export type EditorialCatalog = {
  audience_options: EditorialAudience[]; cta_options: EditorialOffer[];
  editorial_catalog_version: number; review_entries: EditorialReviewEntry[];
};
export type EditorialCatalogState = { catalog: EditorialCatalog; error: null } | { catalog: null; error: string };
export type ArticleEditorialBrief = {
  audience_id: string; audience_version: number; conversion_intent: "offer" | "none";
  offer_id: string | null; offer_version: number | null; no_offer_reason: string | null;
  country: string; reader_task: string; distinct_contribution: string; acceptance_criteria: string[];
};

function fail(message: string): never { throw new Error(message); }
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : fail("Invalid catalogue response. Reload before continuing.");
}
function text(value: unknown, field: string, allowEmpty = false): string {
  return typeof value === "string" && (allowEmpty || value.trim()) ? value : fail(`Missing or invalid ${field}.`);
}
function integer(value: unknown, minimum = 0): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= minimum ? value : fail("Invalid catalogue version.");
}
function nextVersion(value: number) { return integer(value + 1, 1); }
function strings(value: unknown): string[] {
  return Array.isArray(value) && value.every(v => typeof v === "string") ? value : fail("Invalid catalogue list.");
}
function nullableText(value: unknown): string | null { return value === null ? null : text(value, "catalogue text", true); }
function boolean(value: unknown): boolean { return typeof value === "boolean" ? value : fail("Invalid audience permission."); }
function unique<T extends { id: string }>(rows: T[]): T[] {
  if (new Set(rows.map(r => r.id)).size !== rows.length) fail("Duplicate catalogue identifiers.");
  return rows;
}
function versioned(raw: Record<string, unknown>): VersionedEntry {
  if (!["draft", "approved", "retired"].includes(String(raw.status))) fail("Invalid catalogue status.");
  const result = { id: text(raw.id, "entry ID"), status: raw.status as EditorialStatus, version: integer(raw.version, 1), approved_by: nullableText(raw.approved_by), approved_at: nullableText(raw.approved_at) };
  if (result.status === "approved" && (!result.approved_by?.trim() || !result.approved_at?.trim())) fail("Catalogue approval is incomplete. Ask the owner to review it.");
  return result;
}
export function safeEditorialDestination(value: string): string {
  if (!value || /[\s\\\u0000-\u001f]/.test(value)) fail("Use a site-relative path or HTTP(S) destination without spaces.");
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (["http:", "https:"].includes(url.protocol) && url.hostname && !url.username && !url.password) return value;
  } catch { /* Report one actionable error below. */ }
  return fail("Use a site-relative path or HTTP(S) destination, not # or an executable URL.");
}
export const actionTypes = ["book_demo", "start_trial", "sign_up", "contact", "buy", "download", "attend", "apply", "custom"] as const;
export const knowledgeLevels = ["unspecified", "beginner", "intermediate", "specialist"] as const;
function schema(raw: Record<string, unknown>) {
  if (raw.catalog_schema_version !== undefined && raw.catalog_schema_version !== 1 && raw.catalog_schema_version !== 2) fail("Unsupported customer profile version.");
  return raw.catalog_schema_version === 2;
}
function audienceDetails(raw: Record<string, unknown>): Partial<EditorialAudience> {
  if (!schema(raw)) return {};
  const knowledge = raw.knowledge_level ?? "unspecified";
  if (!knowledgeLevels.includes(knowledge as never)) fail("Invalid subject familiarity.");
  return { catalog_schema_version: 2, name: text(raw.name, "profile name"), description: text(raw.description, "profile description"), pain_points: strings(raw.pain_points ?? []), desired_outcomes: strings(raw.desired_outcomes ?? []), knowledge_level: knowledge as EditorialAudience["knowledge_level"] };
}
function actionDetails(raw: Record<string, unknown>): Partial<EditorialOffer> {
  if (!schema(raw)) return {};
  const kind = raw.action_type ?? "custom";
  if (!actionTypes.includes(kind as never)) fail("Invalid desired action.");
  return { catalog_schema_version: 2, action_type: String(kind), action_description: text(raw.action_description ?? "", "desired action", true) };
}
export function audienceLabel(audience: EditorialAudience) { return audience.name || audience.id; }
export function parseEditorialCatalog(value: unknown): EditorialCatalog {
  const raw = object(value);
  if (!Array.isArray(raw.audience_options) || !Array.isArray(raw.cta_options) || !Array.isArray(raw.review_entries)) fail("Catalogue is unavailable or incompatible. Generation remains paused.");
  const audiences = unique(raw.audience_options.map(value => {
    const item = object(value);
    return { ...versioned(item), ...audienceDetails(item), reader_task: text(item.reader_task, "audience task"), constraints: strings(item.constraints), exclusions: strings(item.exclusions), allow_no_offer: boolean(item.allow_no_offer) };
  }));
  const offers = unique(raw.cta_options.map(value => {
    const item = object(value);
    return { ...versioned(item), ...actionDetails(item), title: text(item.title, "offer title"), body: text(item.body, "offer body"), button_text: text(item.button_text, "button text"), button_href: safeEditorialDestination(text(item.button_href, "destination")),
      audience: text(item.audience, "legacy audience", true), use_when: text(item.use_when, "offer context", true), cta_component: text(item.cta_component, "CTA component"), image_url: nullableText(item.image_url), secondary_button_text: nullableText(item.secondary_button_text), secondary_button_href: item.secondary_button_href === null ? null : safeEditorialDestination(text(item.secondary_button_href, "secondary destination")), audience_ids: strings(item.audience_ids), countries: strings(item.countries) };
  }));
  const reviewEntries = raw.review_entries.map(value => {
    const entry = object(value);
    if (entry.kind !== "audience" && entry.kind !== "offer") fail("Invalid review entry.");
    const receipt = { kind: entry.kind, id: text(entry.id, "review ID"), version: integer(entry.version, 1), content_sha256: text(entry.content_sha256, "review hash") } as EditorialReviewEntry;
    const subject = (receipt.kind === "audience" ? audiences : offers).find(r => r.id === receipt.id);
    if (!subject || subject.version !== receipt.version || !/^[a-f0-9]{64}$/.test(receipt.content_sha256)) fail("Review identity does not match the catalogue.");
    return receipt;
  });
  if (reviewEntries.length !== audiences.length + offers.length || new Set(reviewEntries.map(r => `${r.kind}:${r.id}`)).size !== reviewEntries.length) fail("Incomplete catalogue review identities.");
  return { audience_options: audiences, cta_options: offers, editorial_catalog_version: integer(raw.editorial_catalog_version), review_entries: reviewEntries };
}
export function formText(form: FormData, key: string): string {
  const values = form.getAll(key);
  if (values.length > 1 || (values.length === 1 && typeof values[0] !== "string")) fail(`Invalid ${key}.`);
  return String(values[0] ?? "").trim();
}
export function formVersion(form: FormData, key: string): number {
  const value = formText(form, key);
  if (!/^(0|[1-9]\d*)$/.test(value)) fail("The catalogue version is missing. Reload and review your selections.");
  return integer(Number(value));
}
export function assertCatalogVersion(catalog: EditorialCatalog, expected: number) {
  if (expected !== catalog.editorial_catalog_version) fail("The catalogue changed. Your input is retained; reload the current catalogue and review before submitting again.");
}
export function lines(value: string): string[] { return value.split(/\r?\n/).map(v => v.trim()).filter(Boolean); }
export function compatibleEditorialOffers(catalog: EditorialCatalog, audienceId: string, country: string) {
  return catalog.cta_options.filter(offer => offer.status === "approved" && offer.audience_ids.includes(audienceId) && offer.countries.includes(country));
}

export function briefFromForm(form: FormData, catalog: EditorialCatalog, companyId: string): ArticleEditorialBrief {
  if (formText(form, "editorialCompanyId") !== companyId) fail("The selected company changed. Reload this page before generating an article.");
  assertCatalogVersion(catalog, formVersion(form, "editorialCatalogVersion"));
  const audience = catalog.audience_options.find(a => a.id === formText(form, "editorialAudienceId"));
  if (!audience || audience.status !== "approved") fail("Select an approved audience before generating an article.");
  if (formVersion(form, "editorialAudienceVersion") !== audience.version) fail("The selected audience version changed. Review it again.");
  const country = formText(form, "editorialCountry");
  if (!/^[A-Z]{2}$/.test(country)) fail("Enter a two-letter country code, for example AU.");
  const intent = formText(form, "editorialIntent");
  if (intent !== "offer" && intent !== "none") fail("Choose an offer or an explicit no-offer decision.");
  const readerTask = formText(form, "editorialReaderTask");
  const contribution = formText(form, "editorialContribution");
  const criteria = lines(formText(form, "editorialCriteria"));
  if (!readerTask || !contribution || !criteria.length) fail("Describe the reader task, distinctive contribution and at least one acceptance criterion.");
  let offer: EditorialOffer | undefined;
  const reason = formText(form, "editorialNoOfferReason");
  if (intent === "none") {
    if (!audience.allow_no_offer || !reason) fail("This audience needs no-offer permission and an explicit editorial reason.");
    if (formText(form, "editorialOfferId") || formText(form, "editorialOfferVersion")) fail("A no-offer brief must not select an offer.");
  } else {
    if (audience.id === "OUTSIDE") fail("OUTSIDE articles require a no-offer decision.");
    offer = compatibleEditorialOffers(catalog, audience.id, country).find(o => o.id === formText(form, "editorialOfferId"));
    if (!offer || reason) fail("Select an approved offer for this audience and country.");
    if (formVersion(form, "editorialOfferVersion") !== offer.version) fail("The selected offer version changed. Review it again.");
  }
  return { audience_id: audience.id, audience_version: audience.version, conversion_intent: intent, offer_id: offer?.id ?? null, offer_version: offer?.version ?? null, no_offer_reason: intent === "none" ? reason : null, country, reader_task: readerTask, distinct_contribution: contribution, acceptance_criteria: criteria };
}

export function dependentApprovedOffers(catalog: EditorialCatalog, audienceId: string) {
  return catalog.cta_options.filter(o => o.status === "approved" && o.audience_ids.includes(audienceId));
}
/** Build an atomic draft/retirement edit; never copy approval into a new version. */
export function catalogEditFromForm(form: FormData, catalog: EditorialCatalog) {
  const expected = formVersion(form, "expectedEditorialCatalogVersion");
  assertCatalogVersion(catalog, expected);
  const kind = formText(form, "kind");
  if (kind !== "audience" && kind !== "offer") fail("Choose an audience or offer.");
  const id = formText(form, "entryId");
  if (!id || (kind === "offer" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))) fail("Use a stable ID; offer IDs must use lowercase words separated by hyphens.");
  const entries = kind === "audience" ? catalog.audience_options : catalog.cta_options;
  const previous = entries.find(e => e.id === id);
  const originalVersion = formVersion(form, "entryVersion");
  if ((previous?.version ?? 0) !== originalVersion) fail("This ID or entry version changed. Reload before saving.");
  const retire = formText(form, "intent") === "retire-entry";
  if (retire && !previous) fail("Only an existing entry can be retired.");
  const version: VersionedEntry = { id, version: nextVersion(previous?.version ?? 0), status: retire ? "retired" : "draft", approved_by: null, approved_at: null };
  const audiences = catalog.audience_options.slice();
  let offers = catalog.cta_options.slice();
  if (kind === "audience") {
    const dependencies = dependentApprovedOffers(catalog, id);
    if (dependencies.length && formText(form, "invalidateDependentOffers") !== "on") fail("Confirm that the listed dependent offers will return to draft for review.");
    const readerTask = formText(form, "readerTask");
    if (!retire && !readerTask) fail("Describe this audience's reader task.");
    const entry: EditorialAudience = retire ? { ...previous as EditorialAudience, ...version } : { ...version, ...(form.has("profileName") ? audienceDetails({catalog_schema_version: 2, name: formText(form, "profileName"), description: formText(form, "profileDescription"), pain_points: lines(formText(form, "painPoints")), desired_outcomes: lines(formText(form, "desiredOutcomes")), knowledge_level: formText(form, "knowledgeLevel") || "unspecified"}) : audienceDetails(previous as Record<string, unknown> || {})), reader_task: readerTask, constraints: lines(formText(form, "constraints")), exclusions: lines(formText(form, "exclusions")), allow_no_offer: formText(form, "allowNoOffer") === "on" };
    const index = audiences.findIndex(a => a.id === id);
    if (index < 0) audiences.push(entry); else audiences[index] = entry;
    offers = offers.map(o => dependencies.some(d => d.id === o.id) ? { ...o, version: nextVersion(o.version), status: "draft", approved_by: null, approved_at: null } : o);
  } else {
    const required = (key: string) => formText(form, key) || fail(`Complete ${key} before saving.`);
    const audienceIds = form.getAll("audienceIds");
    if (audienceIds.some(v => typeof v !== "string" || !audiences.some(a => a.id === v))) fail("Choose known audiences for this offer.");
    const countries = formText(form, "countries").split(/[\s,]+/).filter(Boolean);
    if (countries.some(c => !/^[A-Z]{2}$/.test(c)) || new Set(countries).size !== countries.length) fail("Countries must be unique uppercase two-letter codes, for example AU, NZ.");
    const secondaryHref = formText(form, "secondaryButtonHref");
    const entry: EditorialOffer = retire ? { ...previous as EditorialOffer, ...version } : { ...version, ...(form.has("actionType") ? actionDetails({catalog_schema_version: 2, action_type: formText(form, "actionType"), action_description: formText(form, "actionDescription")}) : actionDetails(previous as Record<string, unknown> || {})), title: required("title"), body: required("body"), button_text: required("buttonText"), button_href: safeEditorialDestination(required("buttonHref")), audience: formText(form, "legacyAudience") || "general", use_when: formText(form, "useWhen"), cta_component: formText(form, "ctaComponent") || "ArticleCompanyCTA", image_url: formText(form, "imageUrl") || null, secondary_button_text: formText(form, "secondaryButtonText") || null, secondary_button_href: secondaryHref ? safeEditorialDestination(secondaryHref) : null, audience_ids: [...new Set(audienceIds as string[])], countries };
    const index = offers.findIndex(o => o.id === id);
    if (index < 0) offers.push(entry); else offers[index] = entry;
  }
  return { expected_editorial_catalog_version: expected, audience_options: audiences, cta_options: offers };
}

export function approvalFromForm(form: FormData, catalog: EditorialCatalog) {
  const expected = formVersion(form, "expectedEditorialCatalogVersion");
  assertCatalogVersion(catalog, expected);
  if (formText(form, "confirmApproval") !== "on") fail("Confirm you reviewed these exact definitions, countries and promises.");
  const entries = form.getAll("reviewEntry").map(value => {
    if (typeof value !== "string") fail("Invalid review selection.");
    let raw: Record<string, unknown>;
    try { raw = object(JSON.parse(value)); } catch { return fail("Invalid review selection."); }
    const exact = catalog.review_entries.find(e => e.kind === raw.kind && e.id === raw.id && e.version === raw.version && e.content_sha256 === raw.content_sha256);
    if (!exact) fail("The reviewed content changed. Review the current version before approving.");
    return exact;
  });
  if (!entries.length || new Set(entries.map(e => `${e.kind}:${e.id}`)).size !== entries.length) fail("Select one or more unique entries to approve.");
  return { expected_editorial_catalog_version: expected, entries };
}
