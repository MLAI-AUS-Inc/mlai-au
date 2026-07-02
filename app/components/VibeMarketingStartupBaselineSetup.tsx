import { Form, Link, useFetcher, useLocation, useNavigation } from "react-router";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type RefObject } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeInfo,
  BarChart3,
  Building2,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe2,
  Link2,
  Loader2,
  MapPin,
  PenLine,
  Rocket,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";

import {
  companyContextFromSetup,
  ORGANIZATION_KIND_OPTIONS,
  STARTUP_STAGE_OPTIONS,
  startupSetupDefaultsFromBootstrap,
  type StartupSetupField,
  type StartupSetupValues,
} from "~/lib/vibe-marketing-startup-setup";
import {
  autofillProgressState,
  autofillStartErrorsForDisplay,
  isAutofillStatusPollFailure,
} from "~/lib/vibe-marketing-autofill-state";
import { useMarketingActionPending } from "~/lib/vibe-marketing-pending-actions";
import { domainConflictFromActionData, type CompanyDomainConflict } from "~/lib/vibe-raising";
import AbnAutocomplete from "~/components/AbnAutocomplete";
import type {
  VibeMarketingAutofillCompetitor,
  VibeMarketingAutofillResult,
  VibeMarketingBootstrap,
  VibeMarketingRunSummary,
  VibeMarketingWebsiteBaseline,
  VibeMarketingWebsiteBaselineMetric,
} from "~/types/vibe-marketing";

const FLOW_STEPS = [
  { label: "You tell us about your startup", icon: Users },
  { label: "We research your market", icon: Search },
  { label: "We write your SEO article", icon: PenLine },
  { label: "You review & publish", icon: Send },
  { label: "Drive more traffic & grow", icon: BarChart3 },
] as const;

const RESEARCH_RUNNING_STATUSES = new Set(["queued", "running", "processing", "in_progress"]);
const RESEARCH_FAILED_STATUSES = new Set(["failed", "blocked", "blocked_verification", "precondition_failed", "cancelled", "canceled", "denied", "error"]);
const RESEARCH_DONE_STATUSES = new Set(["completed", ...RESEARCH_FAILED_STATUSES]);
const MOBILE_STARTUP_SETUP_TUTORIAL_STORAGE_KEY = "vibe_marketing_startup_setup_mobile_tour_seen_v1";
const MELBOURNE_LOCATION = "Melbourne, Victoria, Australia";
const POPULAR_STARTUP_LOCATIONS = [
  MELBOURNE_LOCATION,
  "Sydney, New South Wales, Australia",
  "Brisbane, Queensland, Australia",
  "Perth, Western Australia, Australia",
  "Adelaide, South Australia, Australia",
  "Canberra, Australian Capital Territory, Australia",
  "Gold Coast, Queensland, Australia",
  "Newcastle, New South Wales, Australia",
  "Geelong, Victoria, Australia",
  "Hobart, Tasmania, Australia",
  "Darwin, Northern Territory, Australia",
  "Wollongong, New South Wales, Australia",
  "Auckland, New Zealand",
  "Singapore",
  "San Francisco, California, USA",
  "London, United Kingdom",
] as const;
const COMPANY_SETUP_STAGE_OPTIONS = STARTUP_STAGE_OPTIONS.filter((option) => !["Growth", "Not fundraising"].includes(option));
const REVENUE_STATUS_OPTIONS = ["", "Yes", "No"] as const;

const stableDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatStableDate(value: string | null | undefined, fallback = "recently") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return stableDateFormatter.format(date);
}

const PROFILE_RESEARCH_STEPS = [
  { id: "identity", label: "Resolving company identity", keys: ["queued", "resolve_company_identity", "profile_resolution"] },
  { id: "website", label: "Crawling owned website", keys: ["crawl_owned_web", "crawl_website", "scrape_website"] },
  { id: "public_web", label: "Researching public web", keys: ["research_public_web"] },
  { id: "linkedin", label: "Checking public LinkedIn signals", keys: ["research_linkedin_public"] },
  { id: "competitors", label: "Finding competitors", keys: ["discover_competitor_candidates", "identify_competitors", "rank_competitors"] },
  { id: "keywords", label: "Generating keywords", keys: ["generate_keyword_landscape", "generate_seed_keywords"] },
  { id: "profile", label: "Writing company profile", keys: ["synthesize_company_profile", "synthesize_company_context"] },
  { id: "finalize", label: "Applying research results", keys: ["finalize"] },
] as const;

type SetupVariant = "landing" | "workflow";

type VibeMarketingStartupBaselineSetupProps = {
  bootstrap: VibeMarketingBootstrap;
  error?: string | null;
  domainConflict?: CompanyDomainConflict | null;
  variant?: SetupVariant;
  focusSection?: "profile" | "baseline";
  autoRefreshGoogleBaseline?: boolean;
  includeBaseline?: boolean;
  setupEyebrow?: string;
  setupTitle?: string;
  setupDescription?: string;
  guidanceTitle?: string;
  guidanceBody?: string;
  guidanceTips?: string[];
  primaryActionLabel?: string;
  showSecondaryAction?: boolean;
  advancedOpenByDefault?: boolean;
  setupProgressPercent?: number | null;
  setupProgressLabel?: string;
  showSetupProgress?: boolean;
  collapseCompletedSectionsByDefault?: boolean;
  companySetupExtraFields?: ReactNode;
};

type MobileTutorialStep = {
  key: string;
  title: string;
  body: string;
  targetRef: RefObject<Element | null>;
};

function MobileStartupSetupTutorial({
  open,
  stepIndex,
  steps,
  onClose,
  onBack,
  onNext,
}: {
  open: boolean;
  stepIndex: number;
  steps: MobileTutorialStep[];
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const titleId = useId();
  const step = steps[stepIndex];
  const [targetRect, setTargetRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    if (!open || !step) {
      setTargetRect(null);
      return;
    }

    const updateTargetRect = () => {
      const node = step.targetRef.current;
      if (!node) {
        setTargetRect(null);
        return;
      }

      const rect = node.getBoundingClientRect();
      setTargetRect({
        top: Math.max(rect.top - 8, 12),
        left: Math.max(rect.left - 8, 12),
        width: Math.min(rect.width + 16, window.innerWidth - 24),
        height: rect.height + 16,
      });
    };

    const handleViewportChange = () => {
      window.requestAnimationFrame(updateTargetRect);
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open, step]);

  if (!open || !step) return null;

  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[140] sm:hidden" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/55"
        onClick={onClose}
        aria-label="Close startup setup tour"
      />

      {targetRect ? (
        <>
          <div
            className="pointer-events-none absolute rounded-[28px] border-2 border-[var(--vr-color-primary)] bg-transparent shadow-[0_0_0_9999px_rgba(15,23,42,0.58)] transition-all duration-200"
            style={targetRect}
          />
          <div
            className="pointer-events-none absolute rounded-full bg-[var(--vr-color-primary)] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg"
            style={{ left: targetRect.left, top: Math.max(targetRect.top - 34, 10) }}
          >
            Step {stepIndex + 1}
          </div>
        </>
      ) : null}

      <section className="absolute inset-x-4 bottom-4 rounded-[28px] bg-white p-5 shadow-2xl shadow-black/20">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--vr-color-primary)]">
          Quick mobile tour
        </p>
        <h2 id={titleId} className="mt-2 text-xl font-black text-gray-950">
          {step.title}
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          {step.body}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Skip
          </button>

          <div className="flex items-center gap-2">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-4 py-2 text-sm font-black text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)]"
            >
              {isLastStep ? "Got it" : "Next"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function listFromText(value: unknown): string[] {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function numericValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function plainObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function objectArray(value: unknown): Record<string, unknown>[] | undefined {
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object" && !Array.isArray(item)))
    : undefined;
}

function listFromUnknown(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  if (typeof value === "string") return listFromText(value);
  return [];
}

function competitorSuggestion(value: unknown): VibeMarketingAutofillCompetitor | null {
  if (!value || typeof value !== "object") {
    const text = String(value ?? "").trim();
    return text ? { name: text, domain: text } : null;
  }
  const payload = value as Record<string, unknown>;
  const name = String(payload.name ?? payload.company ?? payload.title ?? "").trim();
  const domain = String(payload.domain ?? "").trim();
  if (!name && !domain) return null;
  return {
    name: name || domain,
    domain,
    linkedinUrl: payload.linkedinUrl ? String(payload.linkedinUrl) : payload.linkedin_url ? String(payload.linkedin_url) : undefined,
    type: payload.type ? String(payload.type) : undefined,
    score: numericValue(payload.score),
    reason: payload.reason ? String(payload.reason) : undefined,
    source: payload.source ? String(payload.source) : undefined,
    evidence: Array.isArray(payload.evidence) ? payload.evidence.map(String).filter(Boolean) : undefined,
    confidence: payload.confidence ? String(payload.confidence) : undefined,
  };
}

function competitorList(value: unknown): VibeMarketingAutofillCompetitor[] {
  if (!Array.isArray(value)) return [];
  return value.map(competitorSuggestion).filter((competitor): competitor is VibeMarketingAutofillCompetitor => Boolean(competitor));
}

function keywordGroups(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((group): group is Record<string, unknown> => Boolean(group && typeof group === "object"))
    .map((group) => ({
      group: group.group ? String(group.group) : group.name ? String(group.name) : undefined,
      intent: group.intent ? String(group.intent) : undefined,
      keywords: listFromUnknown(group.keywords),
    }))
    .filter((group) => group.keywords.length);
}

function researchDepth(value: unknown): Record<string, number> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const result: Record<string, number> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    const numberValue = numericValue(rawValue);
    if (numberValue !== null) result[key] = numberValue;
  }
  return Object.keys(result).length ? result : undefined;
}

function autofillSources(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((source): source is Record<string, unknown> => Boolean(source && typeof source === "object"))
    .map((source) => ({
      url: String(source.url ?? ""),
      title: source.title ? String(source.title) : undefined,
      type: source.type ? String(source.type) : undefined,
      query: source.query ? String(source.query) : undefined,
      description: source.description ? String(source.description) : undefined,
      source: source.source ? String(source.source) : undefined,
    }))
    .filter((source) => source.url);
}

function profileFieldText(payload: Record<string, unknown>, camelKey: string, snakeKey?: string) {
  const value = payload[camelKey] ?? (snakeKey ? payload[snakeKey] : undefined);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function autofillProfileFields(value: unknown) {
  const payload = plainObject(value);
  if (!payload) return undefined;
  const confidence = plainObject(payload.fieldConfidence ?? payload.field_confidence);
  return {
    shortDescription: profileFieldText(payload, "shortDescription", "short_description"),
    problemSolved: profileFieldText(payload, "problemSolved", "problem_solved"),
    targetAudience: profileFieldText(payload, "targetAudience", "target_audience"),
    location: profileFieldText(payload, "location"),
    organizationKind: profileFieldText(payload, "organizationKind", "organization_kind"),
    stage: profileFieldText(payload, "stage"),
    hasRevenue: profileFieldText(payload, "hasRevenue", "has_revenue"),
    founderNames: profileFieldText(payload, "founderNames", "founder_names"),
    abn: profileFieldText(payload, "abn"),
    companyContext: profileFieldText(payload, "companyContext", "company_context"),
    fieldConfidence: confidence
      ? Object.fromEntries(Object.entries(confidence).map(([key, item]) => [key, String(item ?? "")]).filter(([, item]) => item))
      : undefined,
    reviewNotes: listFromUnknown(payload.reviewNotes ?? payload.review_notes),
  };
}

function resultLooksLikeAutofillPayload(payload: Record<string, unknown>) {
  return Boolean(
    payload.profileFields ||
      payload.profile_fields ||
      payload.companyContext ||
      payload.company_context ||
      payload.companyLinkedInUrl ||
      payload.company_linkedin_url ||
      payload.directCompetitors ||
      payload.direct_competitors ||
      payload.competitors ||
      payload.seedKeywords ||
      payload.seed_keywords,
  );
}

function extractAutofill(run: VibeMarketingRunSummary | null | undefined): VibeMarketingAutofillResult | null {
  const resultPayload = plainObject(run?.result);
  const payload = plainObject(resultPayload?.autofill) ?? (resultPayload && resultLooksLikeAutofillPayload(resultPayload) ? resultPayload : undefined);
  if (!payload) return null;
  const groupsPayload = plainObject(payload.competitorGroups) ?? {};
  const directCompetitors = competitorList(payload.directCompetitors ?? payload.direct_competitors ?? groupsPayload.directCompetitors);
  const seoCompetitors = competitorList(payload.seoCompetitors ?? payload.seo_competitors ?? groupsPayload.seoCompetitors);
  const adjacentOrganizations = competitorList(
    payload.adjacentOrganizations ?? payload.adjacent_organizations ?? groupsPayload.adjacentOrganizations,
  );
  const competitorCandidates = Array.isArray(payload.competitors)
    ? payload.competitors
    : Array.isArray(payload.competitorCandidates)
      ? payload.competitorCandidates
      : [];
  const legacyDirectCompetitors = directCompetitors.length
    ? []
    : competitorCandidates
        .map((competitor) => competitorSuggestion(competitor))
        .filter(
          (competitor): competitor is VibeMarketingAutofillCompetitor =>
            competitor !== null && (!competitor.type || competitor.type === "direct"),
        );
  const competitorSuggestions = [
    ...directCompetitors,
    ...seoCompetitors,
    ...adjacentOrganizations,
    ...competitorCandidates.map(competitorSuggestion).filter((item): item is VibeMarketingAutofillCompetitor => Boolean(item)),
  ];
  const competitorStrings = [
    ...directCompetitors.map((competitor) => competitor.domain || competitor.name),
    ...legacyDirectCompetitors.map((competitor) => competitor.domain || competitor.name),
  ].filter(Boolean);
  const groups = keywordGroups(payload.keywordGroups ?? payload.keyword_groups);
  const explicitSeedKeywords = [
    ...listFromUnknown(payload.seedKeywords),
    ...listFromUnknown(payload.seed_keywords),
  ];
  const seedKeywords = explicitSeedKeywords;
  const profileFields = autofillProfileFields(payload.profileFields ?? payload.profile_fields);
  return {
    partial: Boolean(payload.partial),
    brandName: typeof payload.brandName === "string" ? payload.brandName : typeof payload.brand_name === "string" ? payload.brand_name : null,
    companyLinkedInUrl:
      typeof payload.companyLinkedInUrl === "string"
        ? payload.companyLinkedInUrl
        : typeof payload.company_linkedin_url === "string"
          ? payload.company_linkedin_url
          : null,
    companyContext:
      typeof payload.companyContext === "string"
        ? payload.companyContext
        : typeof payload.company_context === "string"
          ? payload.company_context
          : profileFields?.companyContext ?? null,
    profileFields,
    offeringProfile: plainObject(payload.offeringProfile ?? payload.offering_profile),
    competitors: Array.from(new Set(competitorStrings.map((competitor) => competitor.trim()).filter(Boolean))),
    competitorSuggestions,
    directCompetitors,
    seoCompetitors,
    adjacentOrganizations,
    competitorGroups: { directCompetitors, seoCompetitors, adjacentOrganizations },
    seedKeywords: Array.from(new Set(seedKeywords.map((keyword) => keyword.trim()).filter(Boolean))),
    keywordCandidates: objectArray(payload.keywordCandidates ?? payload.keyword_candidates),
    keywordGroups: groups,
    sources: autofillSources(payload.sources),
    linkedinProfile:
      payload.linkedinProfile && typeof payload.linkedinProfile === "object"
        ? {
            url: String((payload.linkedinProfile as Record<string, unknown>).url ?? ""),
            title: (payload.linkedinProfile as Record<string, unknown>).title
              ? String((payload.linkedinProfile as Record<string, unknown>).title)
              : undefined,
            description: (payload.linkedinProfile as Record<string, unknown>).description
              ? String((payload.linkedinProfile as Record<string, unknown>).description)
              : undefined,
            vanityName: (payload.linkedinProfile as Record<string, unknown>).vanityName
              ? String((payload.linkedinProfile as Record<string, unknown>).vanityName)
              : undefined,
            blocked: Boolean((payload.linkedinProfile as Record<string, unknown>).blocked),
          }
        : undefined,
    linkedinSimilarSignals: autofillSources(payload.linkedinSimilarSignals ?? payload.linkedin_similar_signals),
    sourceCount: numericValue(payload.sourceCount ?? payload.source_count) ?? undefined,
    competitorCount: numericValue(payload.competitorCount ?? payload.competitor_count) ?? undefined,
    seedKeywordCount: numericValue(payload.seedKeywordCount ?? payload.seed_keyword_count) ?? undefined,
    researchSummary:
      typeof payload.researchSummary === "string"
        ? payload.researchSummary
        : typeof payload.research_summary === "string"
          ? payload.research_summary
          : null,
    researchDepth: researchDepth(payload.researchDepth ?? payload.research_depth),
    researchQuality: plainObject(payload.researchQuality ?? payload.research_quality),
    modelTrace: objectArray(payload.modelTrace ?? payload.model_trace),
    queryLog: objectArray(payload.queryLog ?? payload.query_log),
    evidenceMap: plainObject(payload.evidenceMap ?? payload.evidence_map),
    stepDurations: researchDepth(payload.stepDurations ?? payload.step_durations),
    warnings: listFromUnknown(payload.warnings),
  };
}

function hasAutofillSuggestions(autofill: VibeMarketingAutofillResult | null | undefined) {
  if (!autofill) return false;
  const fields = autofill.profileFields;
  const profileFieldValues = [
    fields?.shortDescription,
    fields?.problemSolved,
    fields?.targetAudience,
    fields?.location,
    fields?.organizationKind,
    fields?.stage,
    fields?.founderNames,
    fields?.abn,
  ];
  return Boolean(
    profileFieldValues.some((value) => String(value ?? "").trim()) ||
      String(autofill.companyLinkedInUrl ?? "").trim() ||
      (autofill.competitors?.length ?? 0) > 0 ||
      (autofill.seedKeywords?.length ?? 0) > 0,
  );
}

function normalizeResearchStepKey(step?: string | null) {
  return String(step ?? "").trim().toLowerCase();
}

function isResearchFailedStatus(status?: string | null) {
  return RESEARCH_FAILED_STATUSES.has(normalizeResearchStepKey(status));
}

function isResearchTerminalStatus(status?: string | null) {
  return RESEARCH_DONE_STATUSES.has(normalizeResearchStepKey(status));
}

function isResearchRunningStatus(status?: string | null) {
  return RESEARCH_RUNNING_STATUSES.has(normalizeResearchStepKey(status));
}

function researchStepIndex(step?: string | null) {
  const stepKey = normalizeResearchStepKey(step);
  return PROFILE_RESEARCH_STEPS.findIndex((item) => item.keys.some((key) => key === stepKey));
}

function autofillStepLabel(step?: string | null) {
  const stepKey = normalizeResearchStepKey(step);
  const configuredStep = PROFILE_RESEARCH_STEPS.find((item) => item.keys.some((key) => key === stepKey));
  if (configuredStep) return configuredStep.label;
  return stepKey ? stepKey.replace(/_/g, " ") : "Filling profile with AI";
}

function completedResearchStepCount(run?: VibeMarketingRunSummary | null, pending = false) {
  const totalSteps = PROFILE_RESEARCH_STEPS.length;
  if (pending || !run) return 0;
  if (run.status === "completed") return totalSteps;

  const stepStates = Array.isArray(run.steps) ? run.steps : [];
  if (stepStates.length) {
    return Math.min(
      totalSteps,
      stepStates.filter((step) => ["completed", "skipped"].includes(normalizeResearchStepKey(step.status))).length,
    );
  }

  const index = researchStepIndex(run.currentStep);
  if (index >= 0) return Math.min(index, totalSteps);
  return 0;
}

function researchProgressSignature(run?: VibeMarketingRunSummary | null) {
  if (!run) return "no-run";
  const steps = (run.steps ?? [])
    .map((step) => `${step.key}:${step.status}:${step.completedAt ?? ""}:${step.error ?? ""}`)
    .join("|");
  return [run.status, run.currentStep ?? "", run.updatedAt ?? "", run.errors?.join("|") ?? "", steps].join("::");
}

function baselineFromRun(run: VibeMarketingRunSummary | null | undefined): VibeMarketingWebsiteBaseline | null {
  const raw = run?.result?.baseline;
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  return {
    runId: run?.runId,
    domain: typeof payload.domain === "string" ? payload.domain : run?.domain,
    status: typeof payload.status === "string" ? payload.status : run?.status,
    passed: run?.status === "completed",
    collectedAt:
      typeof payload.collectedAt === "string"
        ? payload.collectedAt
        : typeof payload.collected_at === "string"
          ? payload.collected_at
          : run?.updatedAt,
    overallScore:
      typeof payload.overallScore === "number"
        ? payload.overallScore
        : typeof payload.overall_score === "number"
          ? payload.overall_score
          : null,
    summary:
      typeof payload.summary === "string" || (payload.summary && typeof payload.summary === "object")
        ? (payload.summary as VibeMarketingWebsiteBaseline["summary"])
        : null,
    metrics: payload.metrics && typeof payload.metrics === "object" ? (payload.metrics as VibeMarketingWebsiteBaseline["metrics"]) : {},
    sourceStatus: payload.sourceStatus && typeof payload.sourceStatus === "object" ? (payload.sourceStatus as Record<string, string>) : {},
    recommendations: Array.isArray(payload.recommendations) ? (payload.recommendations as Array<Record<string, unknown>>) : [],
  };
}

function baselineSummaryText(summary: VibeMarketingWebsiteBaseline["summary"]) {
  if (typeof summary === "string") return summary;
  if (summary && typeof summary === "object" && typeof summary.text === "string") return summary.text;
  return "Run a baseline to capture website health, search visibility, authority, AI visibility, and traffic before article generation starts.";
}

function metricStatus(label: string, metric?: VibeMarketingWebsiteBaselineMetric) {
  const message = typeof metric?.message === "string" ? metric.message : "";
  if (label === "Lighthouse" && /429|too many requests|googleapis|pagespeedonline|runpagespeed/i.test(message)) {
    return "unavailable";
  }
  return metric?.status;
}

function metricScore(metric: VibeMarketingWebsiteBaselineMetric | undefined, status?: string | null) {
  return status === "measured" && typeof metric?.score === "number" ? Math.round(metric.score) : null;
}

function looksLikeTechnicalBaselineMessage(message: string | null | undefined) {
  if (!message) return false;
  return /https?:\/\/|httperror|googleapis|traceback|exception|accessnotconfigured|api has not been used|quota|pagespeed|details:/i.test(message);
}

function metricMessage(label: string, metric?: VibeMarketingWebsiteBaselineMetric) {
  const message = typeof metric?.message === "string" ? metric.message : null;
  if (label === "Lighthouse" && metric?.reasonCode === "rate_limited") {
    return "PageSpeed Insights could not load right now. You can keep going and retry later.";
  }
  if (label === "Lighthouse" && looksLikeTechnicalBaselineMessage(message)) {
    return "PageSpeed Insights could not load right now. You can keep going and retry later.";
  }
  if (label === "Traffic/users" && looksLikeTechnicalBaselineMessage(message)) {
    return "Search Console traffic lookup failed. You can keep going and retry it later.";
  }
  if (looksLikeTechnicalBaselineMessage(message)) {
    return "This baseline source failed to load. You can keep going and retry later.";
  }
  return message;
}

function metricHelpText(label: string) {
  switch (label) {
    case "Baseline scorecard":
      return "A single summary score from the baseline metrics we could measure before your articles go live.";
    case "Technical health":
      return "Checks whether search engines can crawl, index, and understand the main pages on your site.";
    case "AI visibility":
      return "Shows whether your brand or domain appears in AI-style search results and AI overview queries.";
    case "Organic search":
      return "Measures your current non-paid search visibility from keyword ranking signals.";
    case "Authority":
      return "Estimates trust from backlink and referring-domain signals.";
    case "Traffic/users":
      return "Verified Search Console and analytics traffic, including clicks, impressions, CTR, position, and users when connected.";
    case "Lighthouse":
      return "PageSpeed Insights lab checks for performance, accessibility, best practices, and SEO.";
    case "Core Web Vitals":
      return "Loading, interaction, and layout stability signals derived from PageSpeed data when available.";
    case "Top recommended fixes":
      return "The highest-value next actions from the baseline sources that need attention.";
    default:
      return "This explains what this baseline metric means.";
  }
}

function sourceStatusLabel(status?: string | null) {
  if (status === "measured") return "Verified";
  if (status === "needs_connection") return "Needs connection";
  if (status === "error") return "Error";
  return "Unavailable";
}

type BaselineTone = "violet" | "emerald" | "amber" | "rose" | "sky" | "slate";
type BaselineTrendShape = "rise" | "steady" | "flat";

const baselineToneClasses: Record<
  BaselineTone,
  {
    accent: string;
    icon: string;
    iconText: string;
    line: string;
  }
> = {
  violet: { accent: "#6d28d9", icon: "bg-violet-100", iconText: "text-violet-700", line: "stroke-violet-600" },
  emerald: { accent: "#16a34a", icon: "bg-emerald-100", iconText: "text-emerald-700", line: "stroke-emerald-600" },
  amber: { accent: "#f97316", icon: "bg-orange-100", iconText: "text-orange-600", line: "stroke-orange-500" },
  rose: { accent: "#e11d48", icon: "bg-rose-100", iconText: "text-rose-700", line: "stroke-rose-600" },
  sky: { accent: "#0284c7", icon: "bg-sky-100", iconText: "text-sky-700", line: "stroke-sky-600" },
  slate: { accent: "#64748b", icon: "bg-slate-100", iconText: "text-slate-600", line: "stroke-slate-500" },
};

function clampScore(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(100, Math.max(0, Math.round(value))) : null;
}

function baselineScoreBand(score: number | null) {
  if (score === null) {
    return { label: "Not collected", tone: "slate" as BaselineTone, description: "Run a baseline to see the starting score." };
  }
  if (score >= 80) return { label: "Strong", tone: "emerald" as BaselineTone, description: "You're well positioned to rank." };
  if (score >= 50) return { label: "Fair", tone: "amber" as BaselineTone, description: "You're on the right track with room to grow." };
  return { label: "Needs work", tone: "rose" as BaselineTone, description: "Important areas need attention." };
}

function baselineStatusLabel(baseline: VibeMarketingWebsiteBaseline, active: boolean) {
  if (active) return "Collecting baseline";
  if (baseline.skipped) return "Skipped";
  if (baseline.stale) return "Baseline stale";
  if (baseline.passed || baseline.status === "completed" || typeof baseline.overallScore === "number") return "Baseline ready";
  return "Baseline needed";
}

function baselineStatusTone(baseline: VibeMarketingWebsiteBaseline, active: boolean): BaselineTone {
  if (active) return "violet";
  if (baseline.skipped || baseline.stale) return "amber";
  if (baseline.passed || baseline.status === "completed" || typeof baseline.overallScore === "number") return "emerald";
  return "slate";
}

function numberListFromUnknown(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "number") return item;
      if (typeof item === "string") return Number(item);
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const payload = item as Record<string, unknown>;
        return (
          numericValue(payload.score) ??
          numericValue(payload.value) ??
          numericValue(payload.count) ??
          numericValue(payload.clicks) ??
          numericValue(payload.impressions)
        );
      }
      return null;
    })
    .filter((item): item is number => typeof item === "number" && Number.isFinite(item));
}

function fallbackTrendValues(score: number | null, shape: BaselineTrendShape) {
  if (score === null) return [];
  if (shape === "flat") return Array.from({ length: 9 }, () => score);
  const start = shape === "rise" ? Math.max(0, score - 15) : Math.max(0, score - 5);
  const end = shape === "rise" ? score : Math.min(100, score + 3);
  return Array.from({ length: 9 }, (_, index) => {
    const progress = index / 8;
    const wave = shape === "rise" ? Math.sin(index * 1.15) * 3 : Math.sin(index * 1.7) * 2;
    return Math.min(100, Math.max(0, start + (end - start) * progress + wave));
  });
}

function trendValuesFromMetric(metric: VibeMarketingWebsiteBaselineMetric | undefined, fallbackScore: number | null, shape: BaselineTrendShape) {
  const directKeys = ["trend", "series", "history", "values", "daily", "dailyScores", "data", "points"];
  for (const key of directKeys) {
    const values = numberListFromUnknown(metric?.[key]);
    if (values.length >= 2) return values;
  }
  const searchConsole = plainObject(metric?.googleSearchConsole);
  const searchConsoleDaily = numberListFromUnknown(searchConsole?.daily);
  if (searchConsoleDaily.length >= 2) return searchConsoleDaily;
  return fallbackTrendValues(fallbackScore, shape);
}

function sparklinePoints(values: number[], width = 240, height = 74) {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 12) - 6;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const AI_VISIBILITY_PLATFORMS = [
  { key: "chatgpt", label: "ChatGPT", short: "GPT", badge: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
  { key: "claude", label: "Claude", short: "CL", badge: "bg-orange-50 text-orange-700 ring-orange-100" },
  { key: "gemini", label: "Gemini", short: "GE", badge: "bg-violet-50 text-violet-700 ring-violet-100" },
  { key: "perplexity", label: "Perplexity", short: "PX", badge: "bg-sky-50 text-sky-700 ring-sky-100" },
] as const;

function normalizeAiPlatformKey(value: unknown) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scoreFromAiPlatformPayload(value: unknown) {
  const payload = plainObject(value);
  const rawScore = payload
    ? numericValue(payload.score) ??
      numericValue(payload.visibilityScore) ??
      numericValue(payload.visibility_score) ??
      numericValue(payload.visibility) ??
      numericValue(payload.value) ??
      numericValue(payload.rate) ??
      numericValue(payload.mentionRate) ??
      numericValue(payload.mention_rate)
    : numericValue(value);
  if (rawScore === null) return null;
  return Math.round(Math.max(0, Math.min(100, rawScore <= 1 ? rawScore * 100 : rawScore)));
}

function findAiPlatformPayload(metric: VibeMarketingWebsiteBaselineMetric | undefined, platformKey: string, platformLabel: string) {
  const targetKeys = new Set([normalizeAiPlatformKey(platformKey), normalizeAiPlatformKey(platformLabel)]);
  const containerKeys = ["platforms", "providers", "engines", "aiTools", "tools", "visibilityByPlatform", "platformScores", "providerScores"];

  for (const key of containerKeys) {
    const value = metric?.[key];
    const rows = objectArray(value);
    if (rows?.length) {
      for (const row of rows) {
        const rowKey = normalizeAiPlatformKey(row.key ?? row.id ?? row.label ?? row.name ?? row.platform ?? row.provider ?? row.engine ?? row.tool);
        if (targetKeys.has(rowKey)) {
          return row;
        }
      }
    }

    const record = plainObject(value);
    if (record) {
      for (const [recordKey, recordValue] of Object.entries(record)) {
        if (targetKeys.has(normalizeAiPlatformKey(recordKey))) {
          return recordValue;
        }
      }
    }
  }

  return null;
}

function aiVisibilityPlatformRows(metric: VibeMarketingWebsiteBaselineMetric | undefined) {
  return AI_VISIBILITY_PLATFORMS.map((platform) => ({
    ...platform,
    payload: findAiPlatformPayload(metric, platform.key, platform.label),
  })).map((row) => {
    const payload = plainObject(row.payload);
    const status = String(payload?.status ?? "").toLowerCase();
    const score = scoreFromAiPlatformPayload(row.payload);
    return {
      ...row,
      hasData: Boolean(row.payload),
      score: status === "unavailable" || status === "error" ? null : score,
      status,
    };
  });
}

function averageFromStrategies(strategies: Record<string, unknown> | undefined, key: string) {
  const values = Object.values(strategies ?? {})
    .map((strategy) => (strategy && typeof strategy === "object" && !Array.isArray(strategy) ? numericValue((strategy as Record<string, unknown>)[key]) : null))
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function vitalDisplayScore(metric: "lcp" | "cls" | "tbt", value: number | null) {
  if (value === null) return null;
  if (metric === "lcp") return value <= 2500 ? 100 : value <= 4000 ? 65 : 30;
  if (metric === "cls") return value <= 0.1 ? 100 : value <= 0.25 ? 65 : 30;
  return value <= 200 ? 100 : value <= 600 ? 65 : 30;
}

function deriveCoreWebVitalsMetric(metrics: Record<string, VibeMarketingWebsiteBaselineMetric> | undefined) {
  const direct = metrics?.coreWebVitals ?? metrics?.coreWebVitalsMetric ?? metrics?.webVitals;
  if (direct) return direct;
  const lighthouse = metrics?.lighthouse;
  const strategies = plainObject(lighthouse?.strategies);
  if (!strategies) {
    return undefined;
  }
  const lcp = averageFromStrategies(strategies, "largestContentfulPaintMs");
  const cls = averageFromStrategies(strategies, "cumulativeLayoutShift");
  const tbt = averageFromStrategies(strategies, "totalBlockingTimeMs");
  const scores = [vitalDisplayScore("lcp", lcp), vitalDisplayScore("cls", cls), vitalDisplayScore("tbt", tbt)].filter(
    (value): value is number => typeof value === "number",
  );
  if (!scores.length) return undefined;
  return {
    status: "measured",
    score: Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length),
    largestContentfulPaintMs: lcp === null ? null : Math.round(lcp),
    cumulativeLayoutShift: cls === null ? null : Number(cls.toFixed(3)),
    totalBlockingTimeMs: tbt === null ? null : Math.round(tbt),
    message: "Core Web Vitals are estimated from PageSpeed lab metrics.",
  };
}

function MetricInfoTooltip({ label, body }: { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex shrink-0">
      <button
        type="button"
        aria-label={`${label} explanation`}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400 outline-none transition hover:text-violet-700 focus:text-violet-700 focus:ring-2 focus:ring-violet-500/30"
      >
        <BadgeInfo className="h-4 w-4" />
      </button>
      <span
        id={id}
        role="tooltip"
        className={clsx(
          "absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-xs font-semibold leading-5 text-gray-600 shadow-lg transition",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {body}
      </span>
    </span>
  );
}

function FirstArticleProgressPanel() {
  return (
    <div className="min-w-0 rounded-2xl border border-violet-100 bg-violet-50/70 px-5 py-6 shadow-sm shadow-violet-100/60 lg:px-8">
      <p className="text-center text-sm font-black text-slate-600">What happens next?</p>
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative flex flex-col items-center gap-3 text-center">
              <div
                className={clsx(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  index === 0 ? "bg-violet-200 text-violet-700" : "bg-white/70 text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="max-w-[120px] text-xs font-black leading-5 text-slate-900">{step.label}</p>
              {index < FLOW_STEPS.length - 1 ? (
                <ArrowRight className="absolute right-[-18px] top-4 hidden h-4 w-4 text-slate-400 lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormField({
  label,
  help,
  children,
  badge,
  className,
}: {
  label: string;
  help?: string;
  children: ReactNode;
  badge?: ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700">
        <span>{label}</span>
        {badge}
      </span>
      {help ? <span className="mb-2 block text-sm font-semibold text-gray-500">{help}</span> : null}
      {children}
    </label>
  );
}

function RequiredPill() {
  return <span className="text-sm font-black leading-none text-red-500" aria-label="required">*</span>;
}

function CompletePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Complete
    </span>
  );
}

function StepNumberBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-700 text-xl font-black text-white shadow-sm shadow-violet-200">
      {children}
    </span>
  );
}

function LocationCombobox({
  value,
  onChange,
  disabled,
  required,
  inputClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  inputClassName: string;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const query = value.trim().toLowerCase();
  const filteredLocations = useMemo(() => {
    const matches = query
      ? POPULAR_STARTUP_LOCATIONS.filter((location) => location.toLowerCase().includes(query))
      : [...POPULAR_STARTUP_LOCATIONS];

    return matches.sort((a, b) => {
      if (a === MELBOURNE_LOCATION) return -1;
      if (b === MELBOURNE_LOCATION) return 1;
      return 0;
    });
  }, [query]);

  return (
    <div className="relative">
      <ControlIcon icon={MapPin} />
      <input
        name="location"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        disabled={disabled}
        required={required}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder="Start typing a city"
        className={inputClassName}
      />
      {open && !disabled ? (
        <div
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-violet-100 bg-white py-2 shadow-xl shadow-violet-950/10"
        >
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                key={location}
                type="button"
                role="option"
                aria-selected={value === location}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(location);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-800"
              >
                <span>{location}</span>
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm font-semibold text-gray-500">
              No popular matches. You can keep your custom location.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function hasSetupText(value: string | null | undefined) {
  return Boolean(String(value ?? "").trim());
}

function isBasicsComplete(values: StartupSetupValues) {
  return hasSetupText(values.companyName) && hasSetupText(values.domain);
}

function isCompanySetupRequiredComplete(values: StartupSetupValues) {
  // ABN is intentionally NOT required — it verifies the company and unlocks perks, but
  // must never block the founder from completing setup.
  return (
    isBasicsComplete(values) &&
    hasSetupText(values.location) &&
    hasSetupText(values.stage) &&
    hasSetupText(values.organizationKind) &&
    hasSetupText(values.hasRevenue) &&
    hasSetupText(values.shortDescription)
  );
}

function isCompanyDetailsComplete(values: StartupSetupValues) {
  return hasSetupText(values.shortDescription) && (hasSetupText(values.targetAudience) || hasSetupText(values.problemSolved));
}

function isStartupProfileComplete(values: StartupSetupValues) {
  return isBasicsComplete(values) && isCompanyDetailsComplete(values);
}

function applyAutofillToEmptyStartupFields(values: StartupSetupValues, autofill: VibeMarketingAutofillResult): StartupSetupValues {
  const profileFields = autofill.profileFields;
  const updates: Partial<StartupSetupValues> = {
    companyLinkedInUrl: autofill.companyLinkedInUrl ?? undefined,
    location: profileFields?.location ?? undefined,
    abn: profileFields?.abn ?? undefined,
    shortDescription: profileFields?.shortDescription ?? undefined,
    problemSolved: profileFields?.problemSolved ?? undefined,
    targetAudience: profileFields?.targetAudience ?? undefined,
    founderNames: profileFields?.founderNames ?? undefined,
    stage: profileFields?.stage ?? undefined,
    organizationKind: profileFields?.organizationKind ?? undefined,
    hasRevenue: profileFields?.hasRevenue ?? undefined,
    competitors: autofill.competitors?.join("\n"),
    seedKeywords: autofill.seedKeywords?.join(", "),
  };

  return Object.entries(updates).reduce<StartupSetupValues>((nextValues, [field, value]) => {
    const nextValue = String(value ?? "").trim();
    if (!nextValue || nextValues[field as StartupSetupField].trim()) return nextValues;
    return { ...nextValues, [field]: nextValue };
  }, values);
}

function defaultSectionExpanded(values: StartupSetupValues, complete: (values: StartupSetupValues) => boolean, collapseCompletedSectionsByDefault: boolean) {
  return !collapseCompletedSectionsByDefault || !complete(values);
}

function basicsSummary(values: StartupSetupValues) {
  return [values.companyName.trim(), values.domain.trim(), values.companyLinkedInUrl.trim() ? "LinkedIn added" : ""].filter(Boolean).join(" • ");
}

function savedCompanyDetailLabels(values: StartupSetupValues) {
  return [
    hasSetupText(values.shortDescription) ? "description" : "",
    hasSetupText(values.problemSolved) ? "what you do" : "",
    hasSetupText(values.targetAudience) ? "audience" : "",
    hasSetupText(values.location) ? "location" : "",
    hasSetupText(values.founderNames) ? "founders" : "",
    hasSetupText(values.stage) ? "stage" : "",
    hasSetupText(values.organizationKind) ? "organization type" : "",
    hasSetupText(values.hasRevenue) ? "revenue status" : "",
    hasSetupText(values.seedKeywords) ? "keywords" : "",
    hasSetupText(values.competitors) ? "competitors" : "",
  ].filter(Boolean);
}

function companyDetailsSummary(values: StartupSetupValues) {
  const labels = savedCompanyDetailLabels(values);
  if (!labels.length) return "No company details saved yet.";
  if (labels.length === 1) return `${labels[0]} saved.`;
  if (labels.length === 2) return `${labels[0]} and ${labels[1]} saved.`;
  return `${labels[0]}, ${labels[1]}, and ${labels.length - 2} more saved.`;
}

function startupProfileSummary(values: StartupSetupValues) {
  return [basicsSummary(values), companyDetailsSummary(values)].filter(Boolean).join(" • ");
}

function CompanyDetailsPanel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700 ring-1 ring-violet-100">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-base font-black text-gray-950">{title}</p>
      </div>
      {children}
    </div>
  );
}

function ControlIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function uniqueChipValues(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function serializeChips(values: string[], separator: "comma" | "newline") {
  return values.join(separator === "newline" ? "\n" : ", ");
}

function ChipListInput({
  name,
  value,
  onChange,
  disabled,
  placeholder,
  separator = "comma",
}: {
  name: StartupSetupField;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder: string;
  separator?: "comma" | "newline";
}) {
  const [draft, setDraft] = useState("");
  const chips = useMemo(() => uniqueChipValues(listFromText(value)), [value]);

  const updateChips = (nextChips: string[]) => {
    onChange(serializeChips(uniqueChipValues(nextChips), separator));
  };

  const commitDraft = (rawDraft = draft) => {
    const nextValues = uniqueChipValues([...chips, ...listFromText(rawDraft)]);
    if (nextValues.length !== chips.length || rawDraft.trim()) {
      updateChips(nextValues);
    }
    setDraft("");
  };

  const removeChip = (chipToRemove: string) => {
    updateChips(chips.filter((chip) => chip.toLowerCase() !== chipToRemove.toLowerCase()));
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitDraft();
      return;
    }
    if (event.key === "Backspace" && !draft && chips.length) {
      event.preventDefault();
      updateChips(chips.slice(0, -1));
    }
  };

  const hiddenValue = serializeChips(chips, separator);

  return (
    <div
      className={clsx(
        "min-h-[118px] rounded-lg border border-gray-200 bg-white px-3 py-3 outline-none transition focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10",
        disabled && "bg-gray-50",
      )}
    >
      <input type="hidden" name={name} value={hiddenValue} />
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-black text-violet-700 ring-1 ring-violet-100"
          >
            <span className="truncate">{chip}</span>
            <button
              type="button"
              onClick={() => removeChip(chip)}
              disabled={disabled}
              aria-label={`Remove ${chip}`}
              className="rounded-full p-0.5 text-violet-500 transition hover:bg-violet-100 hover:text-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {!disabled ? (
          <input
            value={draft}
            onChange={(event) => {
              const nextValue = event.target.value;
              if (/[,\n]/.test(nextValue)) {
                commitDraft(nextValue);
              } else {
                setDraft(nextValue);
              }
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => commitDraft()}
            placeholder={chips.length ? "" : placeholder}
            className="min-w-[180px] flex-1 border-0 bg-transparent px-1 py-1.5 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
          />
        ) : null}
      </div>
      {disabled && !chips.length ? <p className="px-1 py-1.5 text-sm font-medium text-gray-400">{placeholder}</p> : null}
    </div>
  );
}

function SetupDocumentMockups() {
  return (
    <div className="hidden min-w-[390px] items-center justify-end gap-6 lg:flex">
      <div className="h-20 w-36 rounded-lg border border-gray-200 bg-white/75 p-3 opacity-70 shadow-sm">
        <div className="h-2 w-16 rounded-full bg-gray-100" />
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-24 rounded-full bg-gray-200" />
          <div className="h-1.5 w-20 rounded-full bg-gray-200" />
          <div className="h-1.5 w-28 rounded-full bg-gray-200" />
          <div className="h-1.5 w-16 rounded-full bg-gray-100" />
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400" />
      <div className="relative h-20 w-36 rounded-lg border border-violet-300 bg-white p-3 shadow-sm shadow-violet-100">
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
        <div className="h-2 w-16 rounded-full bg-gray-100" />
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-24 rounded-full bg-gray-200" />
          <div className="h-1.5 w-28 rounded-full bg-gray-200" />
          <div className="h-1.5 w-20 rounded-full bg-gray-200" />
          <div className="h-1.5 w-10 rounded-full bg-emerald-100" />
        </div>
      </div>
    </div>
  );
}

function StartupProfileAiHelperBanner() {
  return (
    <section className="overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-violet-50/70 p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-700 text-white shadow-lg shadow-violet-200">
            <Sparkles className="h-7 w-7" />
          </span>
          <div>
            <h3 className="text-xl font-black tracking-normal text-violet-800">Let AI do the heavy lifting</h3>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-700">
              <span className="sm:hidden">Fill the basics, then let AI prep company context from public sources.</span>
              <span className="hidden sm:inline">Add or review your details below, then AI can scan public sources and prepare article-generation context from your answers.</span>
              <span className="ml-2 inline-flex items-center gap-1 font-black text-violet-700">
                Learn how it works <ArrowRight className="h-4 w-4" />
              </span>
            </p>
          </div>
        </div>
        <SetupDocumentMockups />
      </div>
    </section>
  );
}

function NextStepItem({
  icon: Icon,
  title,
  body,
  last = false,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {!last ? <span className="absolute left-5 top-11 h-10 border-l border-dashed border-violet-200" /> : null}
      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700 ring-1 ring-violet-200">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-black text-gray-950">{title}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">{body}</p>
      </div>
    </div>
  );
}

function SourceStatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-black",
        status === "measured" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
        status === "needs_connection" && "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
        status === "error" && "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
        !["measured", "needs_connection", "error"].includes(String(status)) && "bg-slate-50 text-slate-600 ring-1 ring-slate-100",
      )}
    >
      {sourceStatusLabel(status)}
    </span>
  );
}

function BaselineStatusPill({
  baseline,
  active,
}: {
  baseline: VibeMarketingWebsiteBaseline;
  active: boolean;
}) {
  const tone = baselineStatusTone(baseline, active);
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black",
        tone === "emerald" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
        tone === "amber" && "bg-orange-50 text-orange-700 ring-1 ring-orange-100",
        tone === "violet" && "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
        tone === "slate" && "bg-slate-50 text-slate-600 ring-1 ring-slate-100",
      )}
    >
      {active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
      {baselineStatusLabel(baseline, active)}
    </span>
  );
}

function BaselineScoreRing({ score, tone }: { score: number | null; tone: BaselineTone }) {
  const safeScore = score ?? 0;
  return (
    <div
      className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
      style={{ background: `conic-gradient(${baselineToneClasses[tone].accent} ${safeScore * 3.6}deg, #ede9fe 0deg)` }}
      aria-hidden="true"
    >
      <div className="h-[72px] w-[72px] rounded-full bg-white" />
    </div>
  );
}

function MiniSparkline({ values, tone }: { values: number[]; tone: BaselineTone }) {
  const points = sparklinePoints(values);
  if (!points) return <div className="mt-5 h-[74px] rounded-xl bg-slate-50" aria-hidden="true" />;
  const pointList = points.split(" ");
  return (
    <svg viewBox="0 0 240 74" className="mt-5 h-[74px] w-full overflow-visible" role="img" aria-label="Metric trend">
      <polyline points={points} fill="none" className={clsx("stroke-[3]", baselineToneClasses[tone].line)} strokeLinecap="round" strokeLinejoin="round" />
      {pointList
        .filter((_, index) => index % 2 === 0 || index === pointList.length - 1)
        .map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="2.4" className={clsx("fill-white stroke-2", baselineToneClasses[tone].line)} />;
        })}
    </svg>
  );
}

function BaselineComparisonChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex gap-1.5 border-b border-gray-100 pb-2">
        <span className="h-2 w-2 rounded-full bg-violet-200" />
        <span className="h-2 w-2 rounded-full bg-violet-200" />
        <span className="h-2 w-2 rounded-full bg-violet-200" />
      </div>
      <svg viewBox="0 0 260 108" className="mt-2 h-28 w-full" role="img" aria-label="Baseline comparison illustration">
        <line x1="125" y1="0" x2="125" y2="108" stroke="#c4b5fd" strokeDasharray="5 5" strokeWidth="2" />
        <polyline
          points="12,66 48,56 84,66 122,58 154,46 184,50 218,38 248,18"
          fill="none"
          stroke="#5b21b6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <circle cx="48" cy="56" r="4" fill="#6d28d9" />
        <circle cx="122" cy="58" r="4" fill="#6d28d9" />
        <circle cx="248" cy="18" r="4" fill="#6d28d9" />
        <text x="12" y="90" fill="#111827" fontSize="12" fontWeight="800">Before</text>
        <text x="12" y="104" fill="#64748b" fontSize="11" fontWeight="700">(Baseline)</text>
        <text x="172" y="90" fill="#111827" fontSize="12" fontWeight="800">After</text>
        <text x="172" y="104" fill="#64748b" fontSize="11" fontWeight="700">(Growth)</text>
      </svg>
    </div>
  );
}

function MetricVisual({
  metric,
  score,
  status,
  tone,
  visual,
  trendShape = "rise",
}: {
  metric?: VibeMarketingWebsiteBaselineMetric;
  score: number | null;
  status?: string | null;
  tone: BaselineTone;
  visual: "sparkline" | "ai-sources" | "none";
  trendShape?: BaselineTrendShape;
}) {
  if (visual === "ai-sources") {
    const rows = aiVisibilityPlatformRows(metric);
    if (!rows.some((row) => row.hasData)) {
      return (
        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold leading-5 text-slate-500">
          {status === "measured" ? "AI platform detail was not collected for this baseline." : "AI visibility detail is unavailable right now."}
        </div>
      );
    }
    return (
      <div className="mt-5 grid gap-2 rounded-xl bg-slate-50/70 p-3">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-100">
            <span className="flex min-w-0 items-center gap-3">
              <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-black ring-1", row.badge)}>
                {row.short}
              </span>
              <span className="truncate text-sm font-black text-slate-800">{row.label}</span>
            </span>
            {row.score === null ? (
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">Unavailable</span>
            ) : (
              <span className="shrink-0 text-lg font-black text-slate-950">{row.score}</span>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (visual === "none") return null;
  return <MiniSparkline values={trendValuesFromMetric(metric, score, trendShape)} tone={tone} />;
}

function BaselineMetricCard({
  label,
  metric,
  icon: Icon,
  tone,
  description,
  visual = "sparkline",
  trendShape,
  action,
  compact = false,
}: {
  label: string;
  metric?: VibeMarketingWebsiteBaselineMetric;
  icon: LucideIcon;
  tone: BaselineTone;
  description: string;
  visual?: "sparkline" | "ai-sources" | "none";
  trendShape?: BaselineTrendShape;
  action?: ReactNode;
  compact?: boolean;
}) {
  const status = metricStatus(label, metric);
  const score = metricScore(metric, status);
  const message = metricMessage(label, metric);
  const classes = baselineToneClasses[tone];
  return (
    <div className={clsx("min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm", compact ? "min-h-[190px]" : "min-h-[238px]")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", classes.icon, classes.iconText)}>
            <Icon className="h-5 w-5" />
          </span>
          <p className="min-w-0 text-sm font-black text-gray-950">{label}</p>
          <MetricInfoTooltip label={label} body={metricHelpText(label)} />
        </div>
        <SourceStatusBadge status={status} />
      </div>
      <div className="mt-4 flex items-end gap-1">
        <span className="text-3xl font-black text-gray-950">{score === null ? "-" : score}</span>
        {score !== null ? <span className="pb-1 text-sm font-black text-gray-500">/100</span> : null}
      </div>
      <p className={clsx("mt-2 text-sm font-semibold leading-6 text-gray-600", !compact && "line-clamp-3")}>{message ?? description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
      {!compact ? <MetricVisual metric={metric} score={score} status={status} tone={tone} visual={visual} trendShape={trendShape} /> : null}
    </div>
  );
}

function RecommendationCard({
  recommendation,
  index,
}: {
  recommendation: Record<string, unknown>;
  index: number;
}) {
  const title = String(recommendation.title ?? "Review baseline recommendation");
  const detail = recommendation.detail ? String(recommendation.detail) : "Review this improvement before publishing more content.";
  const tones: BaselineTone[] = ["violet", "amber", "emerald", "sky"];
  const tone = tones[index % tones.length];
  const Icon = index % 3 === 0 ? Sparkles : index % 3 === 1 ? Link2 : TrendingUp;
  const classes = baselineToneClasses[tone];
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
      <span className={clsx("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", classes.icon, classes.iconText)}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-gray-950">{title}</p>
        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-gray-600">{detail}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-gray-500" />
    </div>
  );
}

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ProfileResearchSegments({
  completedSteps,
  totalSteps,
  failed,
  failedTone = "rose",
}: {
  completedSteps: number;
  totalSteps: number;
  failed: boolean;
  failedTone?: "rose" | "amber";
}) {
  const segmentCount = Math.max(totalSteps, 1);
  const safeCompleted = Math.min(Math.max(completedSteps, 0), segmentCount);

  return (
    <div className="grid grid-cols-8 gap-2">
      {Array.from({ length: segmentCount }).map((_, index) => {
        const isComplete = index < safeCompleted;
        const isActive = !failed && index === safeCompleted && safeCompleted < segmentCount;
        return (
          <div
            key={index}
            className={clsx(
              "h-2 rounded-full transition-all",
              failed && (failedTone === "amber" ? "bg-amber-200" : "bg-rose-200"),
              !failed && isComplete && "bg-purple-500",
              !failed && isActive && "animate-pulse bg-purple-300",
              !failed && !isComplete && !isActive && "bg-white/75",
            )}
          />
        );
      })}
    </div>
  );
}

function ProfileResearchProgressCard({
  run,
  runId,
  pending,
  startStatus,
  startError,
  stalled,
  unavailable,
  onRetry,
  retryDisabled,
}: {
  run?: VibeMarketingRunSummary | null;
  runId?: string | null;
  pending: boolean;
  startStatus?: string | null;
  startError?: string | null;
  stalled: boolean;
  unavailable: boolean;
  onRetry: () => void;
  retryDisabled: boolean;
}) {
  if (!runId && !pending) return null;
  const autofill = extractAutofill(run);
  const hasSuggestions = hasAutofillSuggestions(autofill);
  const partial = Boolean(autofill?.partial);
  const effectiveStatus = run?.status ?? startStatus ?? (pending ? "queued" : null);
  const active = pending || (!isResearchTerminalStatus(effectiveStatus) && (!run || isResearchRunningStatus(run.status)));
  const failed = isResearchFailedStatus(effectiveStatus) || unavailable;
  const needsReview = failed || partial;
  const completed = run?.status === "completed" && !needsReview;
  const completedSteps = completedResearchStepCount(run, pending);
  const totalSteps = PROFILE_RESEARCH_STEPS.length;
  const progressLabel = `${Math.min(completedSteps, totalSteps)} of ${totalSteps} steps`;
  const label = pending
    ? "Starting AI research"
    : partial
      ? "AI context partially ready"
      : completed
        ? hasSuggestions
          ? "Startup profile suggestions ready"
          : "Research complete"
        : failed
          ? "AI research needs attention"
          : autofillStepLabel(run?.currentStep);
  const sourceCount = autofill?.sourceCount ?? autofill?.sources?.length ?? 0;
  const competitorCount = autofill?.competitorCount ?? autofill?.competitorSuggestions?.length ?? autofill?.competitors?.length ?? 0;
  const seedKeywordCount = autofill?.seedKeywordCount ?? autofill?.seedKeywords?.length ?? 0;
  const errorMessage =
    partial
      ? "AI prepared partial suggestions. Review the filled fields and retry if you need a stronger result."
      : startError ||
        run?.errors?.[0] ||
        (failed ? "AI research is unavailable. Check the Content Factory backend and try again." : null);
  const notice = unavailable
    ? "We have not received a fresh status update for more than 10 minutes. You can retry now, or keep this page open while polling continues."
    : stalled
      ? "This is taking longer than expected. We will keep checking for progress in the background."
      : null;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border p-5 text-sm shadow-sm",
        needsReview
          ? partial
            ? "border-amber-200 bg-amber-50 text-amber-950"
            : "border-rose-200 bg-rose-50 text-rose-900"
          : completed
            ? hasSuggestions
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-amber-200 bg-amber-50 text-amber-950"
            : "border-purple-100 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-violet-950",
      )}
    >
      <div
        className={clsx(
          "absolute right-0 top-0 -mr-10 -mt-10 h-36 w-36 rounded-full blur-3xl",
          needsReview
            ? partial
              ? "bg-amber-200/30"
              : "bg-rose-200/30"
            : completed
              ? hasSuggestions
                ? "bg-emerald-200/40"
                : "bg-amber-200/30"
              : "bg-purple-200/30",
        )}
      />
      <div className="relative z-10 flex gap-4">
        <div
          className={clsx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            needsReview
              ? partial
                ? "bg-amber-100"
                : "bg-rose-100"
              : completed
                ? hasSuggestions
                  ? "bg-emerald-100"
                  : "bg-amber-100"
                : "bg-purple-100",
          )}
        >
          {needsReview ? (
            <AlertTriangle className={clsx("h-6 w-6", partial ? "text-amber-600" : "text-rose-600")} />
          ) : completed ? (
            <CheckCircle2 className={clsx("h-6 w-6", hasSuggestions ? "text-emerald-600" : "text-amber-600")} />
          ) : (
            <Sparkles className="h-6 w-6 text-purple-600" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-base font-black text-gray-950">{label}</p>
            <span
              className={clsx(
                "rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide",
                needsReview
                  ? partial
                    ? "bg-white/80 text-amber-700"
                    : "bg-white/80 text-rose-700"
                  : completed
                    ? hasSuggestions
                      ? "bg-white/80 text-emerald-700"
                      : "bg-white/80 text-amber-700"
                    : "bg-white/80 text-purple-700",
              )}
            >
              {needsReview ? (partial ? "Review needed" : "Retry available") : completed ? (hasSuggestions ? "Complete" : "Suggestions unavailable") : progressLabel}
            </span>
          </div>

          {!completed ? (
            <>
              <p className="mt-1 text-sm font-semibold text-gray-700">
                {pending ? "Contacting the AI research service" : partial ? "AI prepared partial startup profile suggestions." : autofillStepLabel(run?.currentStep)}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {active ? "Deep research can take several minutes. Refreshing the page is safe." : needsReview ? "The form is unlocked so you can edit your details or retry." : "Startup profile suggestions are ready."}
              </p>
            </>
          ) : null}

          {!needsReview && !completed ? (
            <div className="mt-4 space-y-2">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed={false} />
              <p className="text-xs font-semibold text-gray-500">We will keep checking until startup profile suggestions are ready.</p>
            </div>
          ) : completed ? (
            <div className="mt-4 space-y-3">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed={false} />
              {hasSuggestions ? (
                <p className="rounded-xl border border-emerald-200 bg-white/80 px-4 py-3 text-sm font-semibold text-emerald-700">
                  AI filled empty startup profile fields where it found confident suggestions. Details you already entered were preserved.
                </p>
              ) : (
                <p className="rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-700">
                  Research finished, but profile suggestions were not included in this status update. Refresh in a moment, or run research again if fields stay empty.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed failedTone={partial ? "amber" : "rose"} />
              <p className={clsx("rounded-xl border bg-white/80 px-4 py-3 text-sm font-semibold", partial ? "border-amber-200 text-amber-700" : "border-rose-200 text-rose-700")}>{errorMessage}</p>
              <button
                type="button"
                onClick={onRetry}
                disabled={retryDisabled}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60",
                  partial ? "border-amber-200 text-amber-700 hover:bg-amber-50" : "border-rose-200 text-rose-700 hover:bg-rose-50",
                )}
              >
                <Sparkles className="h-4 w-4" />
                Retry AI research
              </button>
            </div>
          )}

          {notice && !needsReview ? (
            <p className="mt-3 rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-700">{notice}</p>
          ) : null}

          {autofill ? (
            <div className={clsx("mt-4 flex flex-wrap gap-2 text-xs font-black", needsReview ? (partial ? "text-amber-800" : "text-rose-800") : completed ? "text-emerald-800" : "text-violet-800")}>
              <span>{sourceCount} sources reviewed</span>
              <span>{competitorCount} competitors found</span>
              <span>{seedKeywordCount} high-fit keywords selected</span>
            </div>
          ) : null}
          {autofill?.warnings?.length && !completed ? <p className="mt-2 text-xs font-semibold text-amber-700">{autofill.warnings[0]}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function VibeMarketingStartupBaselineSetup({
  bootstrap,
  error,
  domainConflict = null,
  variant = "landing",
  focusSection = "profile",
  autoRefreshGoogleBaseline = false,
  includeBaseline = true,
  setupEyebrow = "Step 1 of 5",
  setupTitle = "Tell us about your startup",
  setupDescription = "Share the basics so we can tailor research and setup to your business.",
  primaryActionLabel,
  showSecondaryAction,
  advancedOpenByDefault = false,
  setupProgressPercent = 20,
  setupProgressLabel = "20% complete",
  showSetupProgress = true,
  collapseCompletedSectionsByDefault = true,
  companySetupExtraFields,
}: VibeMarketingStartupBaselineSetupProps) {
  const navigation = useNavigation();
  const location = useLocation();
  const autofillStartFetcher = useFetcher<{
    intent?: string;
    autofillRunId?: string | null;
    status?: string;
    error?: string;
    errors?: string[];
    domainConflict?: CompanyDomainConflict | null;
  }>();
  const autofillRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const baselineStartFetcher = useFetcher<{ intent?: string; baselineRunId?: string | null; status?: string; error?: string }>();
  const baselineRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const googleBaselineFetcher = useFetcher<{ intent?: string; websiteBaseline?: VibeMarketingWebsiteBaseline; error?: string }>();
  const skipBaselineFetcher = useFetcher<{ intent?: string; error?: string }>();
  const baselineRef = useRef<HTMLElement | null>(null);
  const googleAutoRefreshSubmittedRef = useRef(false);
  const startupDefaults = useMemo(() => startupSetupDefaultsFromBootstrap(bootstrap), [bootstrap]);
  const startupDefaultsSignature = useMemo(() => JSON.stringify(startupDefaults), [startupDefaults]);
  const mobileIntroRef = useRef<HTMLDivElement | null>(null);
  const mobileResearchButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNextStepsRef = useRef<HTMLElement | null>(null);
  const activeCompanyKey = String(
    bootstrap.company.id ||
      bootstrap.company.organizationId ||
      bootstrap.organization.id ||
      bootstrap.organization.domain ||
      bootstrap.company.domain ||
      "no-company",
  );
  const activeCompanyKeyRef = useRef(activeCompanyKey);
  const autofillPollStateRef = useRef(autofillRunFetcher.state);
  const baselinePollStateRef = useRef(baselineRunFetcher.state);
  const [startupValues, setStartupValues] = useState<StartupSetupValues>(startupDefaults);
  const [profileExpanded, setProfileExpanded] = useState(() => advancedOpenByDefault || defaultSectionExpanded(startupDefaults, isStartupProfileComplete, collapseCompletedSectionsByDefault));
  const [optionalStartupDetailsExpanded, setOptionalStartupDetailsExpanded] = useState(false);
  const [generatedCompanyContext, setGeneratedCompanyContext] = useState(() => String(bootstrap.settings.companyContext ?? ""));
  const [autofillRunId, setAutofillRunId] = useState<string | null>(null);
  const [appliedAutofillRunId, setAppliedAutofillRunId] = useState<string | null>(null);
  const [baselineRunId, setBaselineRunId] = useState<string | null>(null);
  const [googleBaseline, setGoogleBaseline] = useState<VibeMarketingWebsiteBaseline | null>(null);
  const [autofillStartedAt, setAutofillStartedAt] = useState<number | null>(null);
  const [autofillLastProgressAt, setAutofillLastProgressAt] = useState<number | null>(null);
  const [autofillLastPollAt, setAutofillLastPollAt] = useState<number | null>(null);
  const [autofillProgressSignature, setAutofillProgressSignature] = useState("");
  const [autofillClock, setAutofillClock] = useState(() => Date.now());
  const [isMobileTutorialViewport, setIsMobileTutorialViewport] = useState(false);
  const [mobileTutorialOpen, setMobileTutorialOpen] = useState(false);
  const [mobileTutorialStepIndex, setMobileTutorialStepIndex] = useState(0);
  const [mobileTutorialChecked, setMobileTutorialChecked] = useState(false);

  const autofillStartData = autofillStartFetcher.data;
  const activeDomainConflict =
    domainConflictFromActionData(autofillStartFetcher.data) ?? domainConflict ?? null;
  const autofillRun = autofillRunFetcher.data as VibeMarketingRunSummary | undefined;
  const autofillStartStatus =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartData.status
      : null;
  const autofillStartDisplayErrors =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartErrorsForDisplay({
          runId: autofillStartData.autofillRunId,
          status: autofillStartStatus,
          error: autofillStartData.error,
          errors: autofillStartData.errors,
        })
      : [];
  const autofillStartError =
    autofillStartDisplayErrors[0] ?? null;
  const baselineStartData = baselineStartFetcher.data;
  const baselineRun = baselineRunFetcher.data as VibeMarketingRunSummary | undefined;
  const latestBaselineRun = bootstrap.latestRuns.find((run) => run.workflow === "website_baseline");
  const effectiveBaseline = googleBaseline ?? baselineFromRun(baselineRun) ?? baselineFromRun(latestBaselineRun) ?? bootstrap.websiteBaseline;
  const baselineMetrics = effectiveBaseline.metrics ?? {};
  const trafficMetric = baselineMetrics.traffic;
  const trafficStatus = metricStatus("Traffic/users", trafficMetric);
  const hasGoogleBaselineScopes = Boolean(bootstrap.googleBaselineConnection?.hasBaselineScopes);
  const baselineHasSnapshot = Boolean(
    effectiveBaseline.status !== "missing" &&
      (effectiveBaseline.passed || effectiveBaseline.status === "completed" || typeof effectiveBaseline.overallScore === "number"),
  );
  const autofillPending = autofillStartFetcher.state !== "idle";
  const baselinePending = baselineStartFetcher.state !== "idle";
  const googleBaselinePending = googleBaselineFetcher.state !== "idle";
  const skipBaselinePending = skipBaselineFetcher.state !== "idle";
  const autofillPolling = Boolean(
    autofillRunId &&
      !isResearchTerminalStatus(autofillStartStatus) &&
      (!autofillRun || isResearchRunningStatus(autofillRun.status)),
  );
  const baselinePolling = Boolean(baselineRunId && (!baselineRun || ["queued", "running"].includes(baselineRun.status)));
  const autofillStatusAgeMs = autofillStartedAt ? autofillClock - (autofillLastPollAt ?? autofillStartedAt) : 0;
  const autofillProgressAgeMs = autofillStartedAt ? autofillClock - (autofillLastProgressAt ?? autofillStartedAt) : 0;
  const { stalled: autofillStalled, unavailable: autofillUnavailable } = autofillProgressState({
    polling: autofillPolling,
    statusAgeMs: autofillStatusAgeMs,
    progressAgeMs: autofillProgressAgeMs,
  });
  const embedded = variant === "workflow";
  const companySetupWorkflow = embedded && !includeBaseline;
  const hasAutofillMinimumFields = companySetupWorkflow ? isCompanySetupRequiredComplete(startupValues) : isBasicsComplete(startupValues);
  const researchLocked = autofillPending || (autofillPolling && !autofillUnavailable);
  const canStartAutofill =
    hasAutofillMinimumFields &&
    !autofillPending &&
    (!autofillPolling || autofillUnavailable);
  const canRetryAutofill = hasAutofillMinimumFields && !autofillPending;
  const canStartBaseline = Boolean((bootstrap.organization.domain || bootstrap.company.domain || startupValues.domain).trim()) && !baselinePending && !baselinePolling;
  const canRefreshGoogleBaseline = hasGoogleBaselineScopes && baselineHasSnapshot && !googleBaselinePending;
  const manualCompanyContext = companyContextFromSetup(startupValues);
  const companyContext = generatedCompanyContext.trim() || manualCompanyContext;
  const compactCompanyName = startupValues.companyName.replace(/[^a-z0-9]/gi, "");
  const showLinkedInDisambiguationHint = Boolean(
    compactCompanyName.length >= 2 &&
      compactCompanyName.length <= 8 &&
      compactCompanyName === compactCompanyName.toUpperCase() &&
      !startupValues.companyLinkedInUrl.trim(),
  );
  const savePending = useMarketingActionPending({
    navigationState: navigation.state,
    navigationFormData: navigation.formData,
    clearSignal: `${location.pathname}${location.search}:${activeCompanyKey}:${startupDefaultsSignature}`,
    errorKey: error ? "save-startup-details" : null,
  });
  const saveExitPending = savePending.isPending("save-startup-details:save-exit");
  const continuePending = savePending.isPending("save-startup-details:continue");
  const saveActionPending = savePending.isAnyPending;
  const searchConsole = plainObject(trafficMetric?.googleSearchConsole);
  const searchConsoleSummary = plainObject(searchConsole?.last28Days);
  const trafficMetricMessage = metricMessage("Traffic/users", trafficMetric);
  const googleTrafficMessage = googleBaselinePending
    ? "Loading verified Search Console traffic..."
    : trafficStatus === "measured"
      ? "Verified Search Console traffic is loaded."
      : hasGoogleBaselineScopes
        ? baselineHasSnapshot
          ? trafficMetricMessage ?? "Search Console is connected. Traffic data will load automatically."
          : "Search Console is connected. Run a baseline snapshot first, then traffic can load."
        : trafficMetricMessage ?? "Connect Search Console to include verified traffic data.";
  const trafficDisplayMetric: VibeMarketingWebsiteBaselineMetric = {
    ...(trafficMetric ?? {}),
    status: trafficStatus ?? trafficMetric?.status,
    message: googleTrafficMessage,
  };
  const shouldShowSecondaryAction = showSecondaryAction ?? true;
  const defaultPrimaryActionLabel = includeBaseline ? "Continue to GitHub setup" : embedded ? "Save and continue" : "Continue";
  const baselineActive = baselinePending || baselinePolling;
  const baselineDomain = effectiveBaseline.domain || startupValues.domain || bootstrap.organization.domain || bootstrap.company.domain || "No domain saved yet";
  const baselineScore = clampScore(effectiveBaseline.overallScore);
  const baselineBand = baselineScoreBand(baselineScore);
  const baselineCollectedLabel = effectiveBaseline.collectedAt ? formatStableDate(effectiveBaseline.collectedAt) : "Not collected yet";
  const coreWebVitalsMetric = deriveCoreWebVitalsMetric(baselineMetrics);
  const baselineActionError = baselineStartData?.error ?? googleBaselineFetcher.data?.error ?? skipBaselineFetcher.data?.error ?? null;
  const baselineActionErrorMessage = baselineActionError
    ? looksLikeTechnicalBaselineMessage(baselineActionError)
      ? "Baseline action failed. You can keep going, retry, or reconnect the data source later."
      : baselineActionError
    : null;
  const autofillStartHasImmediateError = Boolean(autofillStartData?.error && !autofillStartData?.autofillRunId);
  const autofillRunFailed = Boolean(autofillRun && isResearchFailedStatus(autofillRun.status));
  const profileResearchRequiresExpandedSections = Boolean(
    autofillPending || autofillPolling || autofillStalled || autofillUnavailable || autofillStartHasImmediateError || autofillStartError || autofillRunFailed,
  );
  const startupProfileComplete = companySetupWorkflow ? isCompanySetupRequiredComplete(startupValues) : isStartupProfileComplete(startupValues);
  const profileContentExpanded =
    companySetupWorkflow ||
    !collapseCompletedSectionsByDefault ||
    !startupProfileComplete ||
    profileExpanded ||
    profileResearchRequiresExpandedSections;
  const normalizedSetupProgress =
    typeof setupProgressPercent === "number" && Number.isFinite(setupProgressPercent)
      ? Math.max(0, Math.min(100, setupProgressPercent))
      : null;
  const mobileTutorialSteps = useMemo<MobileTutorialStep[]>(
    () => [
      {
        key: "profile",
        title: "Start with the basics",
        body: companySetupWorkflow
          ? "Add the required company details first. Extra details can be refined later."
          : "Add your company name and website first. The rest can be refined after the essentials are in.",
        targetRef: mobileIntroRef,
      },
      {
        key: "research",
        title: "Let AI prep the heavy lifting",
        body: "Once the basics are filled in, run AI research to prepare company context from public sources without overwriting your profile.",
        targetRef: mobileResearchButtonRef,
      },
      {
        key: "next",
        title: "You stay in control",
        body: "This panel shows what happens next: we prepare context, then you review and approve the output yourself.",
        targetRef: mobileNextStepsRef,
      },
    ],
    [companySetupWorkflow],
  );

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white py-3 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const inputWithIconClass = `${inputClass} pl-11`;
  const textareaClass =
    "w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const textareaWithIconClass =
    "w-full resize-y rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-medium leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

  const updateValue = (field: StartupSetupField, value: string) => {
    setStartupValues((current) => ({ ...current, [field]: value }));
    setGeneratedCompanyContext("");
  };

  const startAutofill = (domainDecision?: "create-new" | "update-existing") => {
    const snapshot = { ...startupValues };
    const now = Date.now();
    setGeneratedCompanyContext("");
    setAutofillRunId(null);
    setAppliedAutofillRunId(null);
    setAutofillStartedAt(now);
    setAutofillLastProgressAt(now);
    setAutofillLastPollAt(null);
    setAutofillProgressSignature("");
    setAutofillClock(now);
    const formData = new FormData();
    formData.set("intent", "start-autofill");
    formData.set("companyContext", companyContextFromSetup(snapshot));
    formData.set("notes", snapshot.targetAudience);
    if (domainDecision) formData.set("domainDecision", domainDecision);
    for (const [field, value] of Object.entries(snapshot)) {
      formData.set(field, value);
    }
    autofillStartFetcher.submit(formData, { method: "POST" });
  };

  const startBaseline = () => {
    setGoogleBaseline(null);
    googleAutoRefreshSubmittedRef.current = false;
    const formData = new FormData();
    formData.set("intent", "start-baseline");
    baselineStartFetcher.submit(formData, { method: "POST" });
  };

  const refreshGoogleBaseline = () => {
    googleAutoRefreshSubmittedRef.current = true;
    const formData = new FormData();
    formData.set("intent", "refresh-baseline-google");
    googleBaselineFetcher.submit(formData, { method: "POST" });
  };

  const skipBaseline = () => {
    const formData = new FormData();
    formData.set("intent", "skip-baseline");
    formData.set("reason", "Skipped during marketing setup");
    skipBaselineFetcher.submit(formData, { method: "POST" });
  };

  useEffect(() => {
    autofillPollStateRef.current = autofillRunFetcher.state;
  }, [autofillRunFetcher.state]);

  useEffect(() => {
    baselinePollStateRef.current = baselineRunFetcher.state;
  }, [baselineRunFetcher.state]);

  useEffect(() => {
    if (activeCompanyKeyRef.current === activeCompanyKey) return;
    activeCompanyKeyRef.current = activeCompanyKey;
    setStartupValues(startupDefaults);
    setProfileExpanded(advancedOpenByDefault || defaultSectionExpanded(startupDefaults, isStartupProfileComplete, collapseCompletedSectionsByDefault));
    setOptionalStartupDetailsExpanded(false);
    setGeneratedCompanyContext(String(bootstrap.settings.companyContext ?? ""));
    setAutofillRunId(null);
    setBaselineRunId(null);
    setGoogleBaseline(null);
    setAppliedAutofillRunId(null);
    setAutofillStartedAt(null);
    setAutofillLastProgressAt(null);
    setAutofillLastPollAt(null);
    setAutofillProgressSignature("");
    googleAutoRefreshSubmittedRef.current = false;
  }, [activeCompanyKey, advancedOpenByDefault, bootstrap.settings.companyContext, collapseCompletedSectionsByDefault, startupDefaults, startupDefaultsSignature]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncViewport = () => setIsMobileTutorialViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (mobileTutorialChecked || !isMobileTutorialViewport) return;
    setMobileTutorialChecked(true);

    if (startupProfileComplete) return;

    try {
      if (window.localStorage.getItem(MOBILE_STARTUP_SETUP_TUTORIAL_STORAGE_KEY) === "1") return;
    } catch {
      // Fall back to showing the tour if storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      setMobileTutorialStepIndex(0);
      setMobileTutorialOpen(true);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [isMobileTutorialViewport, mobileTutorialChecked, startupProfileComplete]);

  useEffect(() => {
    if (focusSection !== "baseline") return;
    window.setTimeout(() => baselineRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }), 100);
  }, [focusSection]);

  const closeMobileTutorial = () => {
    setMobileTutorialOpen(false);
    try {
      window.localStorage.setItem(MOBILE_STARTUP_SETUP_TUTORIAL_STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures; the tour can still be dismissed for this session.
    }
  };

  const openMobileTutorial = () => {
    setMobileTutorialStepIndex(0);
    setMobileTutorialOpen(true);
  };

  const goToNextMobileTutorialStep = () => {
    if (mobileTutorialStepIndex >= mobileTutorialSteps.length - 1) {
      closeMobileTutorial();
      return;
    }
    setMobileTutorialStepIndex((current) => current + 1);
  };

  const goToPreviousMobileTutorialStep = () => {
    setMobileTutorialStepIndex((current) => Math.max(0, current - 1));
  };

  useEffect(() => {
    if (googleAutoRefreshSubmittedRef.current) return;
    if (!hasGoogleBaselineScopes || googleBaselinePending || baselineActive) return;
    const redirectedFromGoogleConnect = autoRefreshGoogleBaseline && focusSection === "baseline" && baselineHasSnapshot;
    const connectedSnapshotNeedsTraffic = baselineHasSnapshot && trafficStatus !== "measured";
    if (!redirectedFromGoogleConnect && !connectedSnapshotNeedsTraffic) return;
    refreshGoogleBaseline();
  }, [
    autoRefreshGoogleBaseline,
    baselineActive,
    baselineHasSnapshot,
    focusSection,
    googleBaselinePending,
    hasGoogleBaselineScopes,
    trafficStatus,
  ]);

  useEffect(() => {
    if (autofillStartData?.autofillRunId) {
      const now = Date.now();
      setAutofillRunId(autofillStartData.autofillRunId);
      setAppliedAutofillRunId(null);
      setAutofillStartedAt((current) => current ?? now);
      setAutofillLastProgressAt((current) => current ?? now);
      setAutofillClock(now);
    }
  }, [autofillStartData?.autofillRunId]);

  useEffect(() => {
    if (baselineStartData?.baselineRunId) {
      setBaselineRunId(baselineStartData.baselineRunId);
      setGoogleBaseline(null);
      googleAutoRefreshSubmittedRef.current = false;
    }
  }, [baselineStartData?.baselineRunId]);

  useEffect(() => {
    if (googleBaselineFetcher.data?.websiteBaseline) {
      setGoogleBaseline(googleBaselineFetcher.data.websiteBaseline);
    }
  }, [googleBaselineFetcher.data?.websiteBaseline]);

  useEffect(() => {
    if (!autofillPending && !autofillPolling) return;
    setAutofillClock(Date.now());
    const timer = window.setInterval(() => {
      setAutofillClock(Date.now());
    }, 5000);
    return () => window.clearInterval(timer);
  }, [autofillPending, autofillPolling]);

  useEffect(() => {
    if (!autofillRunId || !autofillRun) return;
    if (isAutofillStatusPollFailure(autofillRun)) return;
    const now = Date.now();
    const signature = researchProgressSignature(autofillRun);
    setAutofillLastPollAt(now);
    if (signature !== autofillProgressSignature) {
      setAutofillProgressSignature(signature);
      setAutofillLastProgressAt(now);
    }
  }, [autofillProgressSignature, autofillRun, autofillRunId]);

  useEffect(() => {
    if (!autofillRunId) return;
    if (autofillRun && !isResearchRunningStatus(autofillRun.status)) return;
    if (isResearchTerminalStatus(autofillStartStatus)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(autofillRunId)}`;
    const loadIfIdle = () => {
      if (autofillPollStateRef.current !== "idle") return;
      autofillPollStateRef.current = "loading";
      autofillRunFetcher.load(href);
    };
    loadIfIdle();
    const timer = window.setInterval(loadIfIdle, 2500);
    return () => window.clearInterval(timer);
  }, [autofillRunId, autofillRun?.status, autofillStartStatus]);

  useEffect(() => {
    if (!baselineRunId) return;
    if (baselineRun && !["queued", "running"].includes(baselineRun.status)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(baselineRunId)}`;
    const loadIfIdle = () => {
      if (baselinePollStateRef.current !== "idle") return;
      baselinePollStateRef.current = "loading";
      baselineRunFetcher.load(href);
    };
    loadIfIdle();
    const timer = window.setInterval(loadIfIdle, 2500);
    return () => window.clearInterval(timer);
  }, [baselineRunId, baselineRun?.status]);

  useEffect(() => {
    if (!autofillRunId || appliedAutofillRunId === autofillRunId) return;
    const autofill = extractAutofill(autofillRun);
    if (!autofill || (autofillRun?.status !== "completed" && !autofill.partial) || !hasAutofillSuggestions(autofill)) return;
    const profileFields = autofill.profileFields;
    setGeneratedCompanyContext(String(profileFields?.companyContext || autofill.companyContext || "").trim());
    setStartupValues((current) => applyAutofillToEmptyStartupFields(current, autofill));
    setAppliedAutofillRunId(autofillRunId);
  }, [appliedAutofillRunId, autofillRun, autofillRunId]);

  const form = (
    <Form
      method="POST"
      className={clsx(
        "overflow-hidden border border-gray-200 bg-white shadow-sm",
        embedded ? "rounded-[1.75rem]" : "rounded-2xl",
        embedded ? "" : "mt-10",
      )}
    >
      <input type="hidden" name="intent" value="save-startup-details" />
      <input type="hidden" name="companyContext" value={companyContext} />
      {activeDomainConflict ? (
        <div className="border-b border-amber-200 bg-amber-50 px-6 py-4">
          {activeDomainConflict.kind === "moves_data" ? (
            <p className="text-sm font-bold leading-6 text-amber-900">
              {activeDomainConflict.detail ||
                `Moving ${activeDomainConflict.activeCompanyName || "your current company"} from ${activeDomainConflict.activeCompanyDomain} to ${activeDomainConflict.submittedDomain} disconnects its existing integrations, article runs and updates.`}
            </p>
          ) : (
            <p className="text-sm font-bold leading-6 text-amber-900">
              This looks like a different company.{" "}
              <span className="font-black">{activeDomainConflict.activeCompanyName || "Your current company"}</span> is set
              up on <span className="font-black">{activeDomainConflict.activeCompanyDomain}</span>, but these details are
              for <span className="font-black">{activeDomainConflict.submittedDomain}</span>. Adding it as a new company
              keeps each startup's articles, updates and integrations separate.
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {activeDomainConflict.sourceIntent === "start-autofill" ? (
              <>
                <button
                  type="button"
                  onClick={() => startAutofill("create-new")}
                  className="rounded-lg bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-black"
                >
                  Add as a new company
                </button>
                <button
                  type="button"
                  onClick={() => startAutofill("update-existing")}
                  className="rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-black text-amber-900 transition hover:bg-amber-100"
                >
                  {activeDomainConflict.kind === "moves_data"
                    ? `Move ${activeDomainConflict.activeCompanyName || "the existing company"} to this domain anyway`
                    : `Update ${activeDomainConflict.activeCompanyName || "the existing company"} to this domain`}
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  name="domainDecision"
                  value="create-new"
                  className="rounded-lg bg-gray-950 px-4 py-2 text-sm font-black text-white transition hover:bg-black"
                >
                  Add as a new company
                </button>
                <button
                  type="submit"
                  name="domainDecision"
                  value="update-existing"
                  className="rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-black text-amber-900 transition hover:bg-amber-100"
                >
                  {activeDomainConflict.kind === "moves_data"
                    ? `Move ${activeDomainConflict.activeCompanyName || "the existing company"} to this domain anyway`
                    : `Update ${activeDomainConflict.activeCompanyName || "the existing company"} to this domain`}
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
      {error && !activeDomainConflict ? (
        <div className="border-b border-rose-100 bg-rose-50 px-6 py-4 text-sm font-bold text-rose-700">{error}</div>
      ) : null}

      <div className={clsx("space-y-6", embedded ? "p-6 sm:p-8 lg:p-11" : "p-5 sm:p-6 lg:p-8")}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,520px)] lg:items-start">
          <div ref={mobileIntroRef}>
            {setupEyebrow ? <p className="text-sm font-black uppercase tracking-[0.08em] text-violet-700">{setupEyebrow}</p> : null}
            <h2 className={clsx(setupEyebrow && "mt-3", "font-black tracking-normal text-gray-950", embedded ? "text-4xl leading-tight sm:text-5xl" : "text-3xl")}>{setupTitle}</h2>
            <p className={clsx("mt-4 max-w-3xl font-semibold text-gray-600", embedded ? "text-lg leading-8" : "text-sm leading-6")}>{setupDescription}</p>
            {bootstrap.company.id && bootstrap.company.name ? (
              <p className="mt-3 text-sm font-semibold text-gray-500">
                You're editing <span className="font-black text-gray-800">{bootstrap.company.name}</span>. Setting up a
                different startup?{" "}
                <Link to="/founder-tools/company-setup?new=true" className="font-black text-violet-700 underline underline-offset-2">
                  Register a new company
                </Link>
              </p>
            ) : null}
            <button
              type="button"
              onClick={openMobileTutorial}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,128,128,0.18)] bg-[rgba(0,255,215,0.08)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--vr-color-primary)] sm:hidden"
            >
              Quick tour
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {showSetupProgress && normalizedSetupProgress !== null ? (
            <div className="pt-2 lg:pt-10">
              <div className="flex items-center gap-4">
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-violet-700" style={{ width: `${normalizedSetupProgress}%` }} />
                </div>
                <span className="shrink-0 text-sm font-black text-gray-600">{setupProgressLabel}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className={clsx("grid gap-8", profileContentExpanded && "xl:grid-cols-[minmax(0,1fr)_390px]")}>
          <section className={clsx(
            embedded
              ? "min-w-0"
              : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7",
            researchLocked && (embedded ? "opacity-90" : "bg-gray-50/80"),
          )}>
            {!companySetupWorkflow ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-5">
                  <StepNumberBadge>1</StepNumberBadge>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-black tracking-normal text-gray-950">Startup profile</h3>
                      {startupProfileComplete ? <CompletePill /> : null}
                    </div>
                    <p className="mt-2 text-base font-semibold leading-7 text-gray-600">
                      <span className="sm:hidden">Add your core details once. AI uses them as source-of-truth without changing them.</span>
                      <span className="hidden sm:inline">Add your company identity and business details once. AI research uses these answers without overwriting them.</span>
                    </p>
                  </div>
                </div>
                {startupProfileComplete ? (
                  <button
                    type="button"
                    onClick={() => setProfileExpanded((current) => !current)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                    aria-expanded={profileContentExpanded}
                  >
                    {profileContentExpanded ? "Collapse" : "Edit"}
                    <ChevronDown className={clsx("h-4 w-4 transition", profileContentExpanded && "rotate-180")} />
                  </button>
                ) : null}
              </div>
            ) : null}

            {!companySetupWorkflow && !profileContentExpanded ? <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">{startupProfileSummary(startupValues)}</p> : null}

            <div className={clsx(!companySetupWorkflow && "mt-7 border-t border-gray-200 pt-7", !profileContentExpanded && "hidden")}>
              <section className="overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-violet-50/70 p-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700 ring-1 ring-violet-200">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black tracking-normal text-violet-800">Let AI help with setup</h3>
                      <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-700">
                        <span className="sm:hidden">Fill the basics, then let AI prep company context from public sources.</span>
                        <span className="hidden sm:inline">Complete the basics, then AI can research trusted public sources and prepare article context from your answers.</span>
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-violet-700">
                    Learn how it works <ArrowRight className="h-4 w-4" />
                  </span>
                  {!embedded ? <SetupDocumentMockups /> : null}
                </div>
              </section>

              <div className={clsx("mt-7", companySetupWorkflow ? "space-y-5" : "grid gap-5 lg:grid-cols-2")}>
                {companySetupWorkflow ? (
                  <FormField
                    label="ABN"
                    help="Optional. Search your ABN or business name to find your registered company and auto-fill your details — it unlocks perks like the coworking discount. You can continue without it."
                  >
                    <AbnAutocomplete
                      value={startupValues.abn}
                      onChange={(abn) => updateValue("abn", abn)}
                      onSelect={(suggestion) => {
                        const name = suggestion.entityName || suggestion.businessName;
                        if (name) updateValue("companyName", name);
                      }}
                      disabled={researchLocked}
                      inputClassName={inputWithIconClass}
                      leadingIcon={<ControlIcon icon={BadgeInfo} />}
                    />
                  </FormField>
                ) : null}

                <FormField label="Company name" badge={<RequiredPill />} className={companySetupWorkflow ? "" : "lg:col-span-2"}>
                  <div className="relative">
                    <ControlIcon icon={Building2} />
                    <input
                      name="companyName"
                      value={startupValues.companyName}
                      onChange={(event) => updateValue("companyName", event.target.value)}
                      disabled={researchLocked}
                      required
                      autoComplete="organization"
                      placeholder={companySetupWorkflow ? "Enter your company name" : "e.g. Acme Inc."}
                      className={inputWithIconClass}
                    />
                  </div>
                </FormField>

                <FormField label={companySetupWorkflow ? "Website" : "Website domain"} badge={<RequiredPill />}>
                  <div className="relative">
                    <ControlIcon icon={Globe2} />
                    <input
                      name="domain"
                      value={startupValues.domain}
                      onChange={(event) => updateValue("domain", event.target.value)}
                      disabled={researchLocked}
                      required
                      autoComplete="url"
                      placeholder={companySetupWorkflow ? "https://yourcompany.com" : "e.g. acme.com"}
                      className={inputWithIconClass}
                    />
                  </div>
                </FormField>

                {companySetupWorkflow ? (
                  <>
                    <FormField label="Startup location" badge={<RequiredPill />}>
                      <LocationCombobox
                        value={startupValues.location}
                        onChange={(nextLocation) => updateValue("location", nextLocation)}
                        disabled={researchLocked}
                        required
                        inputClassName={inputWithIconClass}
                      />
                    </FormField>

                    <FormField label="Do you have revenue?" badge={<RequiredPill />}>
                      <select
                        name="hasRevenue"
                        value={startupValues.hasRevenue}
                        onChange={(event) => updateValue("hasRevenue", event.target.value)}
                        disabled={researchLocked}
                        required
                        className={`${inputClass} px-4`}
                      >
                        {REVENUE_STATUS_OPTIONS.map((option) => (
                          <option key={option || "blank"} value={option}>
                            {option || "Select answer"}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField label="Stage" badge={<RequiredPill />}>
                        <select
                          name="stage"
                          value={startupValues.stage}
                          onChange={(event) => updateValue("stage", event.target.value)}
                          disabled={researchLocked}
                          required
                          className={`${inputClass} px-4`}
                        >
                          {COMPANY_SETUP_STAGE_OPTIONS.map((option) => (
                            <option key={option || "blank"} value={option}>
                              {option || "Select stage"}
                            </option>
                          ))}
                        </select>
                      </FormField>
                      <FormField label="Organization type" badge={<RequiredPill />}>
                        <select
                          name="organizationKind"
                          value={startupValues.organizationKind}
                          onChange={(event) => updateValue("organizationKind", event.target.value)}
                          disabled={researchLocked}
                          required
                          className={`${inputClass} px-4`}
                        >
                          {ORGANIZATION_KIND_OPTIONS.map((option) => (
                            <option key={option || "blank"} value={option}>
                              {option || "Select type"}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Short description" badge={<RequiredPill />}>
                      <textarea
                        name="shortDescription"
                        value={startupValues.shortDescription}
                        onChange={(event) => updateValue("shortDescription", event.target.value)}
                        disabled={researchLocked}
                        required
                        placeholder="In 1-2 sentences, what does your startup do?"
                        rows={4}
                        maxLength={600}
                        className={textareaClass}
                      />
                    </FormField>

                    {companySetupExtraFields}
                  </>
                ) : (
                  <FormField label="LinkedIn company page" badge={<span className="text-xs font-bold text-gray-500">(optional)</span>}>
                    <div className="relative">
                      <ControlIcon icon={Link2} />
                      <input
                        name="companyLinkedInUrl"
                        value={startupValues.companyLinkedInUrl}
                        onChange={(event) => updateValue("companyLinkedInUrl", event.target.value)}
                        disabled={researchLocked}
                        placeholder="e.g. linkedin.com/company/acme-inc"
                        className={inputWithIconClass}
                      />
                    </div>
                    {showLinkedInDisambiguationHint ? (
                      <p className="mt-2 text-xs font-bold text-amber-700">
                        A LinkedIn company URL helps us disambiguate names like {startupValues.companyName.trim()}.
                      </p>
                    ) : null}
                  </FormField>
                )}
              </div>

              {companySetupWorkflow ? (
                <button
                  type="button"
                  onClick={() => setOptionalStartupDetailsExpanded((current) => !current)}
                  className="mt-6 flex w-full items-center justify-between gap-4 rounded-xl border border-violet-200 bg-white px-4 py-3 text-left text-sm font-black text-violet-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 sm:text-base"
                  aria-expanded={optionalStartupDetailsExpanded}
                >
                  <span>
                    {optionalStartupDetailsExpanded ? "Hide extra profile details" : "Add optional profile details"}
                  </span>
                  <ChevronDown className={clsx("h-5 w-5 shrink-0 transition", optionalStartupDetailsExpanded && "rotate-180")} />
                </button>
              ) : null}

              <div className={clsx(companySetupWorkflow && !optionalStartupDetailsExpanded && "hidden")}>
                {companySetupWorkflow ? (
                  <div className="mt-7">
                    <FormField label="Company LinkedIn" badge={<span className="text-xs font-bold text-gray-500">(optional)</span>}>
                      <div className="relative">
                        <ControlIcon icon={Link2} />
                        <input
                          name="companyLinkedInUrl"
                          value={startupValues.companyLinkedInUrl}
                          onChange={(event) => updateValue("companyLinkedInUrl", event.target.value)}
                          disabled={researchLocked}
                          placeholder="https://www.linkedin.com/company/yourcompany"
                          className={inputWithIconClass}
                        />
                      </div>
                    </FormField>
                  </div>
                ) : null}

                {companySetupWorkflow ? (
                  <div className="mt-7 space-y-5">
                    <FormField label="Founder names">
                      <input
                        name="founderNames"
                        value={startupValues.founderNames}
                        onChange={(event) => updateValue("founderNames", event.target.value)}
                        disabled={researchLocked}
                        placeholder="Sam Donegan, Alex Founder"
                        className={`${inputClass} px-4`}
                      />
                    </FormField>
                  </div>
                ) : (
                  <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <FormField label="Startup location">
                      <div className="relative">
                        <ControlIcon icon={MapPin} />
                        <input
                          name="location"
                          value={startupValues.location}
                          onChange={(event) => updateValue("location", event.target.value)}
                          disabled={researchLocked}
                          placeholder="Melbourne, Australia"
                          className={inputWithIconClass}
                        />
                      </div>
                    </FormField>
                    <FormField label="Founder names">
                      <input
                        name="founderNames"
                        value={startupValues.founderNames}
                        onChange={(event) => updateValue("founderNames", event.target.value)}
                        disabled={researchLocked}
                        placeholder="Sam Donegan, Alex Founder"
                        className={`${inputClass} px-4`}
                      />
                    </FormField>
                    <FormField label="Stage">
                      <select
                        name="stage"
                        value={startupValues.stage}
                        onChange={(event) => updateValue("stage", event.target.value)}
                        disabled={researchLocked}
                        className={`${inputClass} px-4`}
                      >
                        {STARTUP_STAGE_OPTIONS.map((option) => (
                          <option key={option || "blank"} value={option}>
                            {option || "Select stage"}
                          </option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Organization type">
                      <select
                        name="organizationKind"
                        value={startupValues.organizationKind}
                        onChange={(event) => updateValue("organizationKind", event.target.value)}
                        disabled={researchLocked}
                        className={`${inputClass} px-4`}
                      >
                        {ORGANIZATION_KIND_OPTIONS.map((option) => (
                          <option key={option || "blank"} value={option}>
                            {option || "Select type"}
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>
                )}

                {companySetupWorkflow ? (
                  <div className="mt-7 space-y-6">
                    <FormField label="Target audience">
                      <div className="relative">
                        <ControlIcon icon={Users} />
                        <textarea
                          name="targetAudience"
                          value={startupValues.targetAudience}
                          onChange={(event) => updateValue("targetAudience", event.target.value)}
                          disabled={researchLocked}
                          placeholder="e.g. SaaS founders, marketing teams, eCommerce brands"
                          rows={3}
                          className={textareaWithIconClass}
                        />
                      </div>
                    </FormField>

                    <div>
                      <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700">Seed keywords</span>
                      <ChipListInput
                        name="seedKeywords"
                        value={startupValues.seedKeywords}
                        onChange={(value) => updateValue("seedKeywords", value)}
                        disabled={researchLocked}
                        placeholder="Add a keyword, then press Enter"
                      />
                    </div>

                    <div>
                      <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700">Competitors</span>
                      <ChipListInput
                        name="competitors"
                        value={startupValues.competitors}
                        onChange={(value) => updateValue("competitors", value)}
                        disabled={researchLocked}
                        placeholder="Add a competitor, then press Enter"
                        separator="newline"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-7 grid gap-6 xl:grid-cols-2">
                    <CompanyDetailsPanel title="About your business" icon={FileText}>
                      <div className="space-y-6">
                        <FormField label="Short description">
                          <textarea
                            name="shortDescription"
                            value={startupValues.shortDescription}
                            onChange={(event) => updateValue("shortDescription", event.target.value)}
                            disabled={researchLocked}
                            placeholder="e.g. We help SaaS companies automate customer onboarding..."
                            rows={6}
                            maxLength={600}
                            className={textareaClass}
                          />
                        </FormField>

                        <div className="border-t border-gray-100 pt-6">
                          <FormField label="What you do">
                            <textarea
                              name="problemSolved"
                              value={startupValues.problemSolved}
                              onChange={(event) => updateValue("problemSolved", event.target.value)}
                              disabled={researchLocked}
                              placeholder="e.g. SaaS teams waste time on manual processes..."
                              rows={5}
                              maxLength={400}
                              className={textareaClass}
                            />
                          </FormField>
                        </div>
                      </div>
                    </CompanyDetailsPanel>

                    <CompanyDetailsPanel title="Key details" icon={Users}>
                      <div className="space-y-6">
                        <FormField label="Target audience">
                          <div className="relative">
                            <ControlIcon icon={Users} />
                            <textarea
                              name="targetAudience"
                              value={startupValues.targetAudience}
                              onChange={(event) => updateValue("targetAudience", event.target.value)}
                              disabled={researchLocked}
                              placeholder="e.g. SaaS founders, marketing teams, eCommerce brands"
                              rows={3}
                              className={textareaWithIconClass}
                            />
                          </div>
                        </FormField>

                        <FormField label="ABN">
                          <div className="relative max-w-md">
                            <ControlIcon icon={BadgeInfo} />
                            <input
                              name="abn"
                              value={startupValues.abn}
                              onChange={(event) => updateValue("abn", event.target.value)}
                              disabled={researchLocked}
                              placeholder="Search ABN or business name"
                              className={inputWithIconClass}
                            />
                          </div>
                        </FormField>

                        <div>
                          <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700">Seed keywords</span>
                          <ChipListInput
                            name="seedKeywords"
                            value={startupValues.seedKeywords}
                            onChange={(value) => updateValue("seedKeywords", value)}
                            disabled={researchLocked}
                            placeholder="Add a keyword, then press Enter"
                          />
                        </div>

                        <div>
                          <span className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold text-gray-700">Competitors</span>
                          <ChipListInput
                            name="competitors"
                            value={startupValues.competitors}
                            onChange={(value) => updateValue("competitors", value)}
                            disabled={researchLocked}
                            placeholder="Add a competitor, then press Enter"
                            separator="newline"
                          />
                        </div>
                      </div>
                    </CompanyDetailsPanel>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => startAutofill()}
                disabled={!canStartAutofill}
                ref={mobileResearchButtonRef}
                className="mt-7 flex w-full items-center justify-between gap-4 rounded-xl bg-[var(--vr-color-primary)] px-6 py-5 text-left text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex min-w-0 items-center gap-4">
                  {autofillPending || autofillPolling ? <Loader2 className="h-7 w-7 shrink-0 animate-spin" /> : <Sparkles className="h-7 w-7 shrink-0" />}
                  <span className="min-w-0">
                    <span className="block text-lg font-black">Research my company context</span>
                    <span className="mt-1 block text-sm font-semibold text-white/80">AI will use these answers to prepare article context and SEO inputs</span>
                  </span>
                </span>
                <ArrowRight className="h-6 w-6 shrink-0" />
              </button>

              {!canStartAutofill && !autofillPending && !autofillPolling ? (
                <p className="mt-3 text-xs font-bold text-gray-500">
                  {companySetupWorkflow
                    ? "Add all required company details before researching with AI."
                    : "Add a company name and website domain before researching with AI."}
                </p>
              ) : null}
              <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                Scan results prepare hidden article context; your visible profile fields stay as you entered them.
              </p>
              {autofillStartData?.error && !autofillStartData?.autofillRunId ? (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{autofillStartData.error}</div>
              ) : null}
              <div className="mt-4">
                <ProfileResearchProgressCard
                  run={autofillRun}
                  runId={autofillRunId}
                  pending={autofillPending}
                  startStatus={autofillStartStatus}
                  startError={autofillStartError}
                  stalled={autofillStalled}
                  unavailable={autofillUnavailable}
                  onRetry={() => startAutofill()}
                  retryDisabled={!canRetryAutofill}
                />
              </div>
            </div>
          </section>

          <aside ref={mobileNextStepsRef} className={clsx("self-start rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8", !profileContentExpanded && "hidden")}>
            <h3 className="text-xl font-black text-gray-950">What happens next?</h3>
            <div className="mt-7 space-y-6">
              <NextStepItem icon={Search} title="We research your company" body="AI reviews your site, LinkedIn page, and trusted public sources using your answers as ground truth." />
              <NextStepItem icon={PenLine} title="We prepare article context" body="Generated context is stored separately for future articles and is not written back into this form." />
              <NextStepItem icon={CheckCircle2} title="You stay in control" body="Edit your startup profile any time; scan results will not replace your details." last />
            </div>
            <div className="mt-7 border-t border-gray-200 pt-7">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-700" />
                <div>
                  <p className="text-sm font-black text-gray-950">Publishing stays manual</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">We&apos;ll never publish or make changes unless you specifically approve.</p>
                </div>
              </div>
            </div>
            </div>
          </aside>
        </div>
      </div>

      <MobileStartupSetupTutorial
        open={mobileTutorialOpen}
        stepIndex={mobileTutorialStepIndex}
        steps={mobileTutorialSteps}
        onClose={closeMobileTutorial}
        onBack={goToPreviousMobileTutorialStep}
        onNext={goToNextMobileTutorialStep}
      />

      {includeBaseline ? (
        <section
          ref={baselineRef}
          className={clsx(
            "border-t border-gray-100 bg-white px-6 py-8 lg:px-8",
            focusSection === "baseline" && "scroll-mt-28",
          )}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_344px] lg:items-start">
            <div>
              <h2 className="text-2xl font-black tracking-normal text-gray-950 sm:text-3xl">Your website baseline</h2>
              <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-gray-600">
                This snapshot shows your site&apos;s current SEO and visibility before we publish your first article.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold text-gray-600">
                <span className="inline-flex min-w-0 items-center gap-2">
                  <Globe2 className="h-4 w-4 shrink-0 text-violet-600" />
                  <span className="truncate text-gray-950">{baselineDomain}</span>
                </span>
                <span className="hidden h-4 w-px bg-gray-200 sm:block" />
                <span>{baselineCollectedLabel === "Not collected yet" ? baselineCollectedLabel : `Collected ${baselineCollectedLabel}`}</span>
                <BaselineStatusPill baseline={effectiveBaseline} active={baselineActive} />
              </div>
            </div>

            <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-950">Why a baseline?</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                    A baseline lets us show real growth after your articles go live. You can always re-run it later.
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-black text-violet-700">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.08fr_1.08fr_.92fr]">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <StepNumberBadge>1</StepNumberBadge>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-gray-950">Connect Google Search Console</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                      Get the most accurate baseline by connecting your Search Console account.
                    </p>
                  </div>
                </div>
                {hasGoogleBaselineScopes ? (
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Connected
                  </span>
                ) : null}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {hasGoogleBaselineScopes ? (
                  <button
                    type="button"
                    onClick={refreshGoogleBaseline}
                    disabled={!canRefreshGoogleBaseline}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {googleBaselinePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                    {trafficStatus === "measured" ? "Refresh Search Console" : "Load Search Console"}
                  </button>
                ) : bootstrap.googleBaselineConnection?.connectUrl ? (
                  <a
                    href={bootstrap.googleBaselineConnection.connectUrl}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-800 shadow-sm transition hover:bg-gray-50"
                  >
                    <GoogleIcon />
                    Connect Google Search Console
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-gray-500 ring-1 ring-gray-200">
                    Search Console can be skipped
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs font-bold leading-5 text-gray-500">{googleTrafficMessage}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <StepNumberBadge>2</StepNumberBadge>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-gray-950">Generate baseline snapshot</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                    We&apos;ll collect the latest data and calculate your starting metrics across SEO, visibility, and traffic.
                  </p>
                  <p className="mt-4 text-sm font-black text-gray-950">{baselineDomain}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-600">{baselineSummaryText(effectiveBaseline.summary)}</p>
                  <p className="mt-2 text-xs font-semibold text-gray-500">
                    Last updated: {baselineCollectedLabel}
                    {effectiveBaseline.stale ? " · stale" : ""}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startBaseline}
                  disabled={!canStartBaseline}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-[rgba(0,128,128,0.16)] transition hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {baselinePending || baselinePolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
                  {effectiveBaseline.overallScore === null || effectiveBaseline.status === "missing" ? "Generate baseline" : "Rerun baseline"}
                </button>
                <button
                  type="button"
                  onClick={skipBaseline}
                  disabled={skipBaselinePending}
                  className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-transparent px-4 py-2.5 text-sm font-black text-gray-600 transition hover:bg-white disabled:opacity-50"
                >
                  Skip for now
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <BaselineComparisonChart />
              <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">We compare future results to this baseline.</p>
            </div>
          </div>

          {baselineActionErrorMessage ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {baselineActionErrorMessage}
            </div>
          ) : null}

          {baselineRunId ? (
            <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-900">
              <div className="flex items-center gap-2 font-black">
                {baselinePending || baselinePolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                <span>
                  {baselineRun?.status === "completed"
                    ? "Baseline ready"
                    : baselineRun?.status === "failed" || baselineRun?.status === "blocked"
                      ? "Baseline needs attention"
                      : "Collecting baseline"}
                </span>
              </div>
              {baselineRun?.errors?.length ? <p className="mt-2 font-semibold text-rose-700">{baselineRun.errors[0]}</p> : null}
            </div>
          ) : null}

          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm" id="baseline-scorecard">
            <div className="flex items-center gap-2">
              <p className="text-sm font-black text-gray-950">Baseline scorecard</p>
              <MetricInfoTooltip label="Baseline scorecard" body={metricHelpText("Baseline scorecard")} />
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_1fr_1.5fr] lg:items-center">
              <div className="flex items-center gap-5">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Overall baseline score</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-black text-gray-950">{baselineScore === null ? "-" : baselineScore}</span>
                    <span className="pb-2 text-sm font-black text-gray-500">out of 100</span>
                  </div>
                </div>
                <BaselineScoreRing score={baselineScore} tone={baselineBand.tone} />
              </div>

              <div className="border-gray-100 lg:border-l lg:pl-6">
                <p className={clsx("text-2xl font-black", baselineBand.tone === "amber" ? "text-orange-600" : baselineBand.tone === "emerald" ? "text-emerald-600" : baselineBand.tone === "rose" ? "text-rose-600" : "text-slate-600")}>{baselineBand.label}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">{baselineBand.description}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-black text-violet-700">
                  How scores are calculated <ArrowRight className="h-4 w-4" />
                </p>
              </div>

              <div className="space-y-4 border-gray-100 lg:border-l lg:pl-6">
                {[
                  { color: "bg-emerald-500", range: "80-100", label: "Strong", detail: "You're well positioned to rank." },
                  { color: "bg-orange-500", range: "50-79", label: "Fair", detail: "You're on the right track with room to grow." },
                  { color: "bg-rose-500", range: "0-49", label: "Needs work", detail: "Important areas need attention." },
                ].map((item) => (
                  <div key={item.range} className="grid grid-cols-[18px_70px_88px_minmax(0,1fr)] items-center gap-3 text-sm">
                    <span className={clsx("h-3 w-3 rounded-full", item.color)} />
                    <span className="font-semibold text-gray-700">{item.range}</span>
                    <span className="font-black text-gray-950">{item.label}</span>
                    <span className="min-w-0 text-xs font-semibold text-gray-500">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <BaselineMetricCard
              label="Technical health"
              metric={baselineMetrics.technicalHealth}
              icon={Search}
              tone="violet"
              description="How healthy and easy your site is for search engines to crawl."
            />
            <BaselineMetricCard
              label="AI visibility"
              metric={baselineMetrics.aiVisibility}
              icon={Sparkles}
              tone="sky"
              description="How often AI platforms reference your website as a source."
              visual="ai-sources"
            />
            <BaselineMetricCard
              label="Organic search"
              metric={baselineMetrics.organicSearch}
              icon={TrendingUp}
              tone="emerald"
              description="How your site performs in organic search results."
            />
            <BaselineMetricCard
              label="Authority"
              metric={baselineMetrics.authority}
              icon={Link2}
              tone="amber"
              description="How trusted your site is based on backlinks and brand signals."
              trendShape="flat"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <BaselineMetricCard
              label="Traffic/users"
              metric={trafficDisplayMetric}
              icon={Users}
              tone="violet"
              description="Connect Search Console to see clicks, impressions, and user metrics."
              visual="none"
              compact
              action={
                trafficStatus !== "measured" && !hasGoogleBaselineScopes && bootstrap.googleBaselineConnection?.connectUrl ? (
                  <a
                    href={bootstrap.googleBaselineConnection.connectUrl}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-800 shadow-sm transition hover:bg-gray-50"
                  >
                    <GoogleIcon />
                    Connect Search Console
                  </a>
                ) : undefined
              }
            />
            <BaselineMetricCard
              label="Lighthouse"
              metric={baselineMetrics.lighthouse}
              icon={BarChart3}
              tone="sky"
              description="PageSpeed Insights performance data for the site."
              visual="none"
              compact
            />
            <BaselineMetricCard
              label="Core Web Vitals"
              metric={coreWebVitalsMetric}
              icon={TrendingUp}
              tone="violet"
              description="Core Web Vitals data is unavailable right now."
              visual="none"
              compact
            />
            <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-orange-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-black text-gray-950">What&apos;s next?</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">We&apos;ll track these metrics over time and show the impact of each article you publish.</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-xs font-bold text-gray-600">
                {["Publish your first article", "We'll track changes automatically", "See your growth over time"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {searchConsole?.status === "measured" && searchConsoleSummary ? (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <GoogleIcon className="h-5 w-5" />
                  <p className="text-sm font-black text-gray-950">Search Console traffic snapshot</p>
                </div>
                <SourceStatusBadge status="measured" />
              </div>
              <p className="mt-3 text-3xl font-black text-gray-950">
                {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.clicks) ?? 0))}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-500">
                clicks from {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.impressions) ?? 0))} impressions
              </p>
            </div>
          ) : null}

          {effectiveBaseline.recommendations?.length ? (
            <div id="baseline-recommendations" className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-gray-950">Top recommended fixes</p>
                  <MetricInfoTooltip label="Top recommended fixes" body={metricHelpText("Top recommended fixes")} />
                </div>
                <p className="inline-flex items-center gap-2 text-sm font-black text-violet-700">
                  View all recommendations <ArrowRight className="h-4 w-4" />
                </p>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {effectiveBaseline.recommendations.slice(0, 4).map((recommendation, index) => (
                  <RecommendationCard key={`${recommendation.title ?? recommendation.source ?? index}`} recommendation={recommendation} index={index} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className={clsx(
        "flex flex-col gap-4 border-t border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8",
        companySetupWorkflow ? "justify-end bg-white sm:justify-end" : "bg-gray-50/70",
      )}>
        {!companySetupWorkflow ? (
          <p className="flex items-center gap-3 text-sm font-bold text-gray-500">
            <ShieldCheck className="h-5 w-5 text-gray-400" />
            Your data is secure and never shared.
          </p>
        ) : null}
        <div className={clsx("flex flex-col gap-3 sm:flex-row", companySetupWorkflow ? "w-auto self-end" : "w-full sm:w-auto")}>
          {shouldShowSecondaryAction ? (
            <button
              type="submit"
              name="nextAction"
              value="save-exit"
              disabled={saveActionPending || researchLocked}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
            >
              {saveExitPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saveExitPending ? "Saving..." : "Save and exit"}
            </button>
          ) : null}
          <button
            type="submit"
            name="nextAction"
            value="continue"
            disabled={saveActionPending || researchLocked}
            className={clsx(
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 sm:px-7",
              companySetupWorkflow
                ? "bg-violet-700 shadow-violet-200 hover:bg-violet-800"
                : "bg-[var(--vr-color-primary)] shadow-[rgba(0,128,128,0.16)] hover:bg-[var(--vr-palette-black)]",
            )}
          >
            {continuePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {continuePending ? "Continuing..." : primaryActionLabel ?? defaultPrimaryActionLabel}
          </button>
        </div>
      </div>
    </Form>
  );

  if (embedded) return form;

  return (
    <div className="mx-auto max-w-[1580px] px-4 py-8 sm:px-6 lg:px-10">
      <Link to="/founder-tools/updates" className="inline-flex items-center gap-2 text-xs font-bold text-violet-300">
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        Back to home
      </Link>

      <div className="mt-8 grid gap-8 2xl:grid-cols-[minmax(0,0.85fr)_minmax(520px,1.15fr)] 2xl:items-start">
        <div>
          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-5xl">
            Let&apos;s create your{" "}
            <span className="bg-gradient-to-r from-violet-700 to-blue-500 bg-clip-text text-transparent">
              first SEO article
            </span>{" "}
            <Rocket className="inline h-9 w-9 translate-y-1 text-orange-500" />
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-gray-600">
            We just need a bit of info about your startup and website to get started.
          </p>
        </div>

        <FirstArticleProgressPanel />
      </div>

      {form}
    </div>
  );
}
