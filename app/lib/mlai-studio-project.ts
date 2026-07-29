import type { ArticleConversionAttribution } from "~/lib/article-conversions";

export type StudioProjectBrief = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  outcome: string;
  currentWorkflow: string;
  systemsAndData: string;
  privacyAndSecurity: string;
  previousAttempts: string;
  successMeasure: string;
  timeline: string;
  budget: string;
  consent: boolean;
  website: string;
};

export const EMPTY_STUDIO_PROJECT_BRIEF: StudioProjectBrief = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  outcome: "",
  currentWorkflow: "",
  systemsAndData: "",
  privacyAndSecurity: "",
  previousAttempts: "",
  successMeasure: "",
  timeline: "",
  budget: "",
  consent: false,
  website: "",
};

export function createStudioProjectReference() {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
  return `project_${randomPart}`;
}

export function serialiseStudioProjectBrief(
  brief: StudioProjectBrief,
  attribution?: ArticleConversionAttribution,
) {
  return [
    "MLAI Studio client project brief",
    `Organisation: ${brief.organisation || "Not provided"}`,
    `Current workflow: ${brief.currentWorkflow}`,
    `Systems and data: ${brief.systemsAndData}`,
    `Privacy and security: ${brief.privacyAndSecurity}`,
    `Previous attempts: ${brief.previousAttempts || "None provided"}`,
    `Success measure: ${brief.successMeasure}`,
    `Timeline: ${brief.timeline}`,
    `Budget range: ${brief.budget}`,
    `Article source: ${attribution?.articleSlug ?? "Direct"}`,
    `CTA type: ${attribution?.ctaType ?? "Direct"}`,
  ].join("\n\n");
}

export function buildStudioProjectPayload(
  brief: StudioProjectBrief,
  options?: {
    clientRef?: string;
    attribution?: ArticleConversionAttribution;
  },
) {
  return {
    client_ref: options?.clientRef ?? createStudioProjectReference(),
    stage: "complete" as const,
    full_name: brief.fullName.trim(),
    email: brief.email.trim(),
    phone: brief.phone.trim(),
    location: brief.organisation.trim(),
    legal_work: "",
    visa: "",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: [] as string[],
    skills_other: [] as string[],
    ai_tools: [] as string[],
    ai_tools_other: [] as string[],
    interests: ["Client project brief"],
    interests_other: [] as string[],
    availability: brief.timeline,
    availability_other: "",
    start_date: brief.timeline,
    start_date_other: "",
    rate: brief.budget,
    projects: brief.outcome.trim(),
    anything_else: serialiseStudioProjectBrief(brief, options?.attribution),
    consent: brief.consent,
  };
}
