import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";

export const STARTUP_STAGE_OPTIONS = [
  "",
  "Idea",
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Growth",
  "Bootstrapped",
  "Not fundraising",
  "Other",
];

export const ORGANIZATION_KIND_OPTIONS = ["", "For-profit", "Not-for-profit"];

export type StartupSetupField =
  | "companyName"
  | "domain"
  | "companyLinkedInUrl"
  | "location"
  | "abn"
  | "shortDescription"
  | "problemSolved"
  | "targetAudience"
  | "competitors"
  | "seedKeywords"
  | "founderNames"
  | "stage"
  | "organizationKind";

export type StartupSetupValues = Record<StartupSetupField, string>;

export function combineCompanyContext({
  shortDescription,
  problemSolved,
  targetAudience,
}: {
  shortDescription: string;
  problemSolved: string;
  targetAudience: string;
}) {
  return [
    shortDescription,
    problemSolved ? `Problem solved: ${problemSolved}` : "",
    targetAudience ? `Target audience: ${targetAudience}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function splitCompanyContext(context: string | null | undefined, fallbackTargetAudience: string | null | undefined) {
  const raw = String(context ?? "").trim();
  if (!raw) {
    return { shortDescription: "", problemSolved: "", targetAudience: String(fallbackTargetAudience ?? "").trim() };
  }

  const problemMatch = raw.match(/(?:^|\n+)Problem solved:\s*([\s\S]*?)(?=\n+Target audience:|$)/i);
  const audienceMatch = raw.match(/(?:^|\n+)Target audience:\s*([\s\S]*?)$/i);
  const shortDescription = raw
    .replace(/(?:^|\n+)Problem solved:\s*[\s\S]*?(?=\n+Target audience:|$)/i, "")
    .replace(/(?:^|\n+)Target audience:\s*[\s\S]*$/i, "")
    .trim();

  return {
    shortDescription: shortDescription || raw,
    problemSolved: problemMatch?.[1]?.trim() ?? "",
    targetAudience: audienceMatch?.[1]?.trim() || String(fallbackTargetAudience ?? "").trim(),
  };
}

export function startupSetupDefaultsFromBootstrap(bootstrap: VibeMarketingBootstrap): StartupSetupValues {
  const splitContext = splitCompanyContext(bootstrap.settings.companyContext, bootstrap.startupProfile.notes);
  const companyName = bootstrap.company.name === "Company" ? "" : bootstrap.company.name ?? "";
  return {
    companyName,
    domain: bootstrap.company.domain ?? bootstrap.organization.domain ?? "",
    companyLinkedInUrl: bootstrap.organization.companyLinkedInUrl ?? bootstrap.company.companyLinkedInUrl ?? "",
    location: bootstrap.company.location ?? "",
    abn: bootstrap.company.abn ?? "",
    shortDescription: splitContext.shortDescription,
    problemSolved: splitContext.problemSolved,
    targetAudience: splitContext.targetAudience,
    competitors: (bootstrap.organization.competitors ?? []).join("\n"),
    seedKeywords: (bootstrap.organization.seedKeywords ?? []).join(", "),
    founderNames: (bootstrap.startupProfile.founderNames ?? []).join(", "),
    stage: bootstrap.startupProfile.stage ?? "",
    organizationKind: bootstrap.startupProfile.organizationKind ?? "",
  };
}

export function companyContextFromSetup(values: StartupSetupValues) {
  return combineCompanyContext({
    shortDescription: values.shortDescription,
    problemSolved: values.problemSolved,
    targetAudience: values.targetAudience,
  });
}
