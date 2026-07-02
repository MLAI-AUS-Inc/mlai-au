import type { Route } from "./+types/founder-tools.switch-company";
import { redirect } from "react-router";

import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder, setVibeRaisingActiveCompany } from "~/lib/vibe-raising";

/**
 * Map the page a switch was initiated from to somewhere safe to land after the
 * active company changes. List/dashboard pages re-render with the new
 * company's data in place; pages pinned to a specific record of the OLD
 * company (a run, an update, a mid-flight wizard) fall back to their section
 * root instead of erroring.
 */
export function safeCompanySwitchPath(pathname: string): string {
  if (!pathname.startsWith("/founder-tools")) return "/founder-tools";
  const sectionRoots: Array<[RegExp, string]> = [
    [/^\/founder-tools\/updates\/.+/, "/founder-tools/updates"],
    [/^\/founder-tools\/drafts\/.+/, "/founder-tools/drafts"],
    [/^\/founder-tools\/marketing\/(runs|run-status|autofill-runs|github-connect|create)(\/.*)?$/, "/founder-tools/marketing"],
    [/^\/founder-tools\/company-setup(\/.*)?$/, "/founder-tools/companies"],
  ];
  for (const [pattern, root] of sectionRoots) {
    if (pattern.test(pathname)) return root;
  }
  return pathname;
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const formData = await request.formData();
  const companyId = String(formData.get("companyId") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "");

  if (companyId && appUser.companies.some((company) => company.id === companyId) && companyId !== appUser.activeCompanyId) {
    await setVibeRaisingActiveCompany(env, request, companyId);
  }

  throw redirect(safeCompanySwitchPath(returnTo));
}

export async function loader() {
  // Resource route: nothing to render on GET.
  throw redirect("/founder-tools/companies");
}
