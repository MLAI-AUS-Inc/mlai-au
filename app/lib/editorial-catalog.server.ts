import { parseCustomerSuggestions } from "./customer-profile-suggestions";
import { createApiClient } from "~/lib/api";
import { readableBackendError } from "~/lib/backend-error";
import { briefFromForm, parseEditorialCatalog, type EditorialCatalogState } from "./editorial-catalog";

function path(companyId: string, approve = false) {
  if (!companyId) throw new Error("Choose a company before editing audiences or generating articles.");
  return `/api/v1/vibe-marketing/editorial-catalog/${approve ? "approve/" : ""}?${new URLSearchParams({ company_id: companyId })}`;
}
export async function getEditorialCatalog(env: Env, request: Request, companyId: string) {
  const response = await createApiClient(env, request).get(path(companyId));
  return parseEditorialCatalog(response.data);
}
export async function loadEditorialCatalog(env: Env, request: Request, companyId: string | null): Promise<EditorialCatalogState> {
  if (!companyId) return { catalog: null, error: "Create or select a company before defining an article audience." };
  try { return { catalog: await getEditorialCatalog(env, request, companyId), error: null }; }
  catch (error) { return { catalog: null, error: readableBackendError(error, { fallback: "The audience and offer catalogue could not be loaded. Generation is paused; reload or contact the site administrator." }) }; }
}
export async function saveEditorialCatalog(env: Env, request: Request, companyId: string, payload: Record<string, unknown>, approve = false) {
  const client = createApiClient(env, request);
  const response = approve ? await client.post(path(companyId, true), payload) : await client.put(path(companyId), payload);
  const catalog = parseEditorialCatalog(response.data);
  const expected = payload.expected_editorial_catalog_version;
  if (typeof expected !== "number" || ![expected, expected + 1].includes(catalog.editorial_catalog_version)) throw new Error("The saved catalogue revision could not be confirmed.");
  if (!approve) {
    const canonical = (entries: unknown) => JSON.stringify((entries as Record<string, unknown>[]).map(entry => Object.fromEntries(Object.entries(entry).sort(([a], [b]) => a.localeCompare(b)))));
    for (const field of ["audience_options", "cta_options"] as const) {
      if (payload[field] !== undefined && (!Array.isArray(payload[field]) || canonical(payload[field]) !== canonical(catalog[field]))) throw new Error("The returned catalogue does not match the requested draft edit.");
    }
  } else {
    if (!Array.isArray(payload.entries) || !payload.entries.length) throw new Error("No reviewed versions were supplied.");
    for (const receipt of payload.entries) {
      const current = catalog.review_entries.find(e => e.kind === receipt.kind && e.id === receipt.id && e.version === receipt.version && e.content_sha256 === receipt.content_sha256);
      const subject = (receipt.kind === "audience" ? catalog.audience_options : catalog.cta_options).find(e => e.id === receipt.id);
      if (!current || subject?.status !== "approved") throw new Error("Approval of the exact reviewed versions could not be confirmed.");
    }
  }
  return catalog;
}
export async function articleBriefFromRequest(env: Env, request: Request, form: FormData, companyId: string | null) {
  if (!companyId) throw new Error("Choose a company before generating an article.");
  // Fresh owner-scoped read, not the page's snapshot. The backend revalidates
  // again at dispatch and the worker checks the current catalogue downstream.
  return briefFromForm(form, await getEditorialCatalog(env, request, companyId), companyId);
}

export async function loadEditorialSettings(env: Env, request: Request, companyId: string) {
  try {
    const response = await createApiClient(env, request).get(path(companyId) + "&include_suggestions=1");
    return {state: {catalog: parseEditorialCatalog(response.data), error: null} as EditorialCatalogState, suggestions: parseCustomerSuggestions(response.data.research_suggestions)};
  } catch (error) {
    return {state: {catalog: null, error: readableBackendError(error, {fallback: "Customer profiles could not be loaded. Please retry."})} as EditorialCatalogState, suggestions: null};
  }
}
