import { createApiClient } from "~/lib/api";
import { data, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/founder-tools.marketing.editorial";
import EditorialCatalogEditor, { type CatalogActionResult } from "~/components/EditorialCatalogEditor";
import { editorialCatalogHref } from "~/components/EditorialBriefFields";
import { approvalFromForm, catalogEditFromForm, formText } from "~/lib/editorial-catalog";
import { getEditorialCatalog, loadEditorialSettings, saveEditorialCatalog } from "~/lib/editorial-catalog.server";
import { readableBackendError } from "~/lib/backend-error";
import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder, resolveActiveCompanyId } from "~/lib/vibe-raising";

async function ownedCompany(env: Env, request: Request) {
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const ids = new URL(request.url).searchParams.getAll("companyId");
  if (!ids.length && request.method === "GET") {
    const active = resolveActiveCompanyId(appUser);
    if (!active) throw redirect("/founder-tools/marketing");
    throw redirect(editorialCatalogHref(active));
  }
  const company = ids.length === 1 ? appUser.companies.find(c => c.id === ids[0]) : null;
  if (!company) throw new Response("Company not found", { status: 404 });
  return company;
}
export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const company = await ownedCompany(env, request);
  return { companyId: company.id, companyName: company.name, ...await loadEditorialSettings(env, request, company.id) };
}
// A rejected save may mean another editor changed the catalogue. Refresh server
// data even after a 4xx; the component preserves its unsaved local draft.
export function shouldRevalidate() { return true; }
export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const company = await ownedCompany(env, request);
  try {
    const form = await request.formData();
    if (formText(form, "companyId") !== company.id) throw new Error("The company selection changed. Reload before saving.");
    const intent = formText(form, "intent");
    if (intent === "suggest-brief") {
      const response = await createApiClient(env, request).post(`/api/v1/vibe-marketing/editorial-catalog/suggest-brief/?${new URLSearchParams({company_id: company.id})}`, {
        topic: formText(form, "topic"), country: formText(form, "country"), audience_id: formText(form, "audienceId") || null,
        expected_editorial_catalog_version: Number(formText(form, "catalogVersion")),
      }, {timeout: 110000});
      return {suggestion: response.data};
    }
    if (!["save-entry", "retire-entry", "approve-entries"].includes(intent)) throw new Error("Unknown catalogue action.");
    const current = await getEditorialCatalog(env, request, company.id);
    const approval = intent === "approve-entries";
    const payload: Record<string, unknown> = approval ? approvalFromForm(form, current) : catalogEditFromForm(form, current);
    if (intent === "save-entry" && formText(form, "researchRunId")) {
      const kind = formText(form, "kind");
      const entries = payload[kind === "audience" ? "audience_options" : "cta_options"] as {id: string; version: number}[];
      const entry = entries.find(e => e.id === formText(form, "entryId"));
      payload.suggestion_reference = {research_run_id: formText(form, "researchRunId"), suggestion_id: formText(form, "suggestionId"), kind, entry_id: entry?.id, entry_version: entry?.version};
    }
    const catalog = await saveEditorialCatalog(env, request, company.id, payload, approval);
    return { ok: true, catalog, message: approval ? "Selected versions approved by the server. Reload article creation to select them." : "Saved. New and changed definitions remain unapproved until reviewed." } satisfies CatalogActionResult;
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    return data({ ok: false, error: `${readableBackendError(error, { fallback: "The catalogue action could not be confirmed." })} No automatic retry was made. Reload the current catalogue before retrying an uncertain save.` } satisfies CatalogActionResult, { status: status && [400, 403, 404, 409].includes(status) ? status : 400 });
  }
}
export default function EditorialSettings() { return <EditorialCatalogEditor {...useLoaderData<typeof loader>()} />; }
