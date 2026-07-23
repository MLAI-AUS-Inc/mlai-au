import type { VibeRaisingAppUser, VibeRaisingCompany } from "~/types/vibe-raising";

export type MonthlyUpdateReminderCompanyResolution =
  | { status: "none" }
  | { status: "invalid" }
  | { status: "valid"; company: VibeRaisingCompany; needsSwitch: boolean };

/**
 * Treat the emailed company id as untrusted input. Only companies returned in
 * the signed-in founder's profile may change active-company state.
 */
export function resolveMonthlyUpdateReminderCompany(
  user: Pick<VibeRaisingAppUser, "companies" | "activeCompanyId">,
  requestedCompanyId: string | null,
): MonthlyUpdateReminderCompanyResolution {
  const companyId = (requestedCompanyId || "").trim();
  if (!companyId) return { status: "none" };

  const company = user.companies.find((candidate) => candidate.id === companyId);
  if (!company) return { status: "invalid" };

  return {
    status: "valid",
    company,
    needsSwitch: user.activeCompanyId !== company.id,
  };
}

export function getMonthlyUpdateReminderCompanyId(url: URL): string | null {
  if (url.searchParams.get("source") !== "monthly-update-reminder") return null;
  return url.searchParams.get("companyId");
}

export function removeReminderCompanySelector(url: URL): string {
  url.searchParams.delete("companyId");
  return `${url.pathname}${url.search}${url.hash}`;
}
