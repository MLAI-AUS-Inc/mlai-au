import { Form, Link, useFetcher, useNavigation } from "react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeInfo,
  BarChart3,
  Building2,
  CheckCircle2,
  ExternalLink,
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
  Tags,
  TrendingUp,
  Users,
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

const RESEARCH_RUNNING_STATUSES = new Set(["queued", "running"]);
const RESEARCH_FAILED_STATUSES = new Set(["failed", "blocked", "cancelled", "denied"]);
const RESEARCH_DONE_STATUSES = new Set(["completed", ...RESEARCH_FAILED_STATUSES]);

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
};

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
    founderNames: profileFieldText(payload, "founderNames", "founder_names"),
    abn: profileFieldText(payload, "abn"),
    companyContext: profileFieldText(payload, "companyContext", "company_context"),
    fieldConfidence: confidence
      ? Object.fromEntries(Object.entries(confidence).map(([key, item]) => [key, String(item ?? "")]).filter(([, item]) => item))
      : undefined,
    reviewNotes: listFromUnknown(payload.reviewNotes ?? payload.review_notes),
  };
}

function extractAutofill(run: VibeMarketingRunSummary | null | undefined): VibeMarketingAutofillResult | null {
  const raw = run?.result?.autofill;
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
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
  const seedKeywords = explicitSeedKeywords.length ? explicitSeedKeywords : groups.flatMap((group) => group.keywords);
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

function competitorStringsFromAutofill(autofill: VibeMarketingAutofillResult) {
  const directCandidates = (autofill.directCompetitors ?? []).map((competitor) => competitor.domain || competitor.name);
  const candidates = directCandidates.length ? directCandidates : (autofill.competitors ?? []);
  const seen = new Set<string>();
  return candidates
    .map((competitor) => String(competitor ?? "").trim())
    .filter((competitor) => {
      if (!competitor) return false;
      const key = competitor.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function splitCompanyContext(context: string | null | undefined, fallbackTargetAudience: string | null | undefined) {
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

function metricMessage(label: string, metric?: VibeMarketingWebsiteBaselineMetric) {
  const message = typeof metric?.message === "string" ? metric.message : null;
  if (label === "Lighthouse" && message && /429|too many requests|googleapis|pagespeedonline|runpagespeed/i.test(message)) {
    return "PageSpeed Insights is temporarily rate limited. Try again later.";
  }
  return message;
}

function sourceStatusLabel(status?: string | null) {
  if (status === "measured") return "Verified";
  if (status === "needs_connection") return "Needs connection";
  if (status === "error") return "Error";
  return "Unavailable";
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
}: {
  label: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-gray-700">{label}</span>
      {help ? <span className="mb-2 block text-sm font-semibold text-gray-500">{help}</span> : null}
      {children}
    </label>
  );
}

function ControlIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-gray-400">
      <Icon className="h-5 w-5" />
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

function BaselineMetricCard({
  label,
  metric,
}: {
  label: string;
  metric?: VibeMarketingWebsiteBaselineMetric;
}) {
  const status = metricStatus(label, metric);
  const score = metricScore(metric, status);
  const message = metricMessage(label, metric);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black text-gray-950">{label}</p>
        <SourceStatusBadge status={status} />
      </div>
      <p className="mt-3 text-2xl font-black text-gray-950">{score === null ? "-" : score}</p>
      {message ? <p className="mt-2 line-clamp-4 break-words text-xs font-semibold text-gray-500">{message}</p> : null}
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
  const partial = Boolean(autofill?.partial);
  const effectiveStatus = run?.status ?? startStatus ?? (pending ? "queued" : null);
  const active = pending || (!isResearchTerminalStatus(effectiveStatus) && (!run || isResearchRunningStatus(run.status)));
  const failed = isResearchFailedStatus(effectiveStatus) || unavailable;
  const completedSteps = completedResearchStepCount(run, pending);
  const totalSteps = PROFILE_RESEARCH_STEPS.length;
  const progressLabel = `${Math.min(completedSteps, totalSteps)} of ${totalSteps} steps`;
  const label = pending
    ? "Starting AI fill"
    : run?.status === "completed"
      ? "AI suggestions added"
      : failed
        ? partial
          ? "AI filled what it could"
          : "AI fill needs attention"
        : autofillStepLabel(run?.currentStep);
  const sourceCount = autofill?.sourceCount ?? autofill?.sources?.length ?? 0;
  const competitorCount = autofill?.competitorCount ?? autofill?.competitorSuggestions?.length ?? autofill?.competitors?.length ?? 0;
  const seedKeywordCount = autofill?.seedKeywordCount ?? autofill?.seedKeywords?.length ?? 0;
  const errorMessage =
    partial
      ? "AI filled what it could. Please review the company description before continuing."
      : startError ||
        run?.errors?.[0] ||
        (failed ? "AI fill is unavailable. Check the Content Factory backend and try again." : null);
  const notice = unavailable
    ? "We have not received a fresh status update for more than 2 minutes. You can retry now, or keep this page open while polling continues."
    : stalled
      ? "This is taking longer than expected. We will keep checking for progress in the background."
      : null;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border p-5 text-sm shadow-sm",
        failed
          ? partial
            ? "border-amber-200 bg-amber-50 text-amber-950"
            : "border-rose-200 bg-rose-50 text-rose-900"
          : "border-purple-100 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-violet-950",
      )}
    >
      <div
        className={clsx(
          "absolute right-0 top-0 -mr-10 -mt-10 h-36 w-36 rounded-full blur-3xl",
          failed ? (partial ? "bg-amber-200/30" : "bg-rose-200/30") : "bg-purple-200/30",
        )}
      />
      <div className="relative z-10 flex gap-4">
        <div className={clsx("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", failed ? (partial ? "bg-amber-100" : "bg-rose-100") : "bg-purple-100")}>
          {failed ? (
            <AlertTriangle className={clsx("h-6 w-6", partial ? "text-amber-600" : "text-rose-600")} />
          ) : run?.status === "completed" ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          ) : (
            <Sparkles className="h-6 w-6 text-purple-600" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-base font-black text-gray-950">{label}</p>
            <span className={clsx("rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide", failed ? (partial ? "bg-white/80 text-amber-700" : "bg-white/80 text-rose-700") : "bg-white/80 text-purple-700")}>
              {failed ? (partial ? "Review needed" : "Retry available") : progressLabel}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            {pending ? "Contacting the AI fill service" : run?.status === "completed" || partial ? "AI suggestions have been applied to the form." : autofillStepLabel(run?.currentStep)}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-500">
            {active ? "Usually takes 1-3 minutes. Refreshing the page is safe." : failed ? (partial ? "The form is unlocked so you can review, edit, or retry." : "The form is unlocked so you can retry or fill the fields manually.") : "Review the populated fields before continuing."}
          </p>

          {!failed ? (
            <div className="mt-4 space-y-2">
              <ProfileResearchSegments completedSteps={completedSteps} totalSteps={totalSteps} failed={false} />
              <p className="text-xs font-semibold text-gray-500">We will keep checking until the fields below are ready to review.</p>
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
                Retry AI fill
              </button>
            </div>
          )}

          {notice && !failed ? (
            <p className="mt-3 rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-700">{notice}</p>
          ) : null}

          {autofill ? (
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-violet-800">
              <span>{sourceCount} sources reviewed</span>
              <span>{competitorCount} competitors found</span>
              <span>{seedKeywordCount} keywords generated</span>
            </div>
          ) : null}
          {autofill?.warnings?.length ? <p className="mt-2 text-xs font-semibold text-amber-700">{autofill.warnings[0]}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function VibeMarketingStartupBaselineSetup({
  bootstrap,
  error,
  variant = "landing",
  focusSection = "profile",
  autoRefreshGoogleBaseline = false,
  includeBaseline = true,
  setupEyebrow = "Step 1 of 5",
  setupTitle = "Tell us about your startup",
  setupDescription = "This helps us understand your business, audience, and what makes you unique.",
  guidanceTitle = "Why we ask this",
  guidanceBody = "The more details you provide, the better we can research and write high-performing articles that rank and convert.",
  guidanceTips = ["Be specific about what you do", "Focus on the value you deliver", "Think about your ideal customer", "You can always update this later"],
  primaryActionLabel,
  showSecondaryAction,
  advancedOpenByDefault = false,
}: VibeMarketingStartupBaselineSetupProps) {
  const navigation = useNavigation();
  const autofillStartFetcher = useFetcher<{
    intent?: string;
    autofillRunId?: string | null;
    status?: string;
    error?: string;
    errors?: string[];
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
  const [autofillRunId, setAutofillRunId] = useState<string | null>(null);
  const [appliedAutofillRunId, setAppliedAutofillRunId] = useState<string | null>(null);
  const [baselineRunId, setBaselineRunId] = useState<string | null>(null);
  const [googleBaseline, setGoogleBaseline] = useState<VibeMarketingWebsiteBaseline | null>(null);
  const [autofillStartedAt, setAutofillStartedAt] = useState<number | null>(null);
  const [autofillLastProgressAt, setAutofillLastProgressAt] = useState<number | null>(null);
  const [autofillLastPollAt, setAutofillLastPollAt] = useState<number | null>(null);
  const [autofillProgressSignature, setAutofillProgressSignature] = useState("");
  const [autofillClock, setAutofillClock] = useState(() => Date.now());

  const autofillStartData = autofillStartFetcher.data;
  const autofillRun = autofillRunFetcher.data as VibeMarketingRunSummary | undefined;
  const autofillStartStatus =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartData.status
      : null;
  const autofillStartError =
    autofillStartData?.autofillRunId && autofillStartData.autofillRunId === autofillRunId
      ? autofillStartData.error ?? autofillStartData.errors?.[0] ?? null
      : null;
  const baselineStartData = baselineStartFetcher.data;
  const baselineRun = baselineRunFetcher.data as VibeMarketingRunSummary | undefined;
  const latestBaselineRun = bootstrap.latestRuns.find((run) => run.workflow === "website_baseline");
  const effectiveBaseline = googleBaseline ?? baselineFromRun(baselineRun) ?? baselineFromRun(latestBaselineRun) ?? bootstrap.websiteBaseline;
  const baselineMetrics = effectiveBaseline.metrics ?? {};
  const trafficMetric = baselineMetrics.traffic;
  const trafficStatus = metricStatus("Traffic/users", trafficMetric);
  const hasGoogleBaselineScopes = Boolean(bootstrap.googleBaselineConnection?.hasBaselineScopes);
  const isSubmitting = navigation.state === "submitting";
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
  const autofillStalled = Boolean(autofillPolling && autofillProgressAgeMs > 60_000);
  const autofillUnavailable = Boolean(autofillPolling && (autofillStatusAgeMs > 120_000 || autofillProgressAgeMs > 120_000));
  const researchLocked = autofillPending || (autofillPolling && !autofillUnavailable);
  const canStartAutofill =
    Boolean(startupValues.companyName.trim() && startupValues.domain.trim()) &&
    !autofillPending &&
    (!autofillPolling || autofillUnavailable);
  const canRetryAutofill = Boolean(startupValues.companyName.trim() && startupValues.domain.trim()) && !autofillPending;
  const canStartBaseline = Boolean((bootstrap.organization.domain || bootstrap.company.domain || startupValues.domain).trim()) && !baselinePending && !baselinePolling;
  const canRefreshGoogleBaseline = hasGoogleBaselineScopes && effectiveBaseline.status !== "missing" && !googleBaselinePending;
  const companyContext = companyContextFromSetup(startupValues);
  const compactCompanyName = startupValues.companyName.replace(/[^a-z0-9]/gi, "");
  const showLinkedInDisambiguationHint = Boolean(
    compactCompanyName.length >= 2 &&
      compactCompanyName.length <= 8 &&
      compactCompanyName === compactCompanyName.toUpperCase() &&
      !startupValues.companyLinkedInUrl.trim(),
  );
  const searchConsole = plainObject(trafficMetric?.googleSearchConsole);
  const searchConsoleSummary = plainObject(searchConsole?.last28Days);
  const embedded = variant === "workflow";
  const shouldShowSecondaryAction = showSecondaryAction ?? !embedded;

  const inputClass =
    "w-full rounded-xl border border-gray-200 py-3 pr-4 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const inputWithIconClass = `${inputClass} pl-11`;
  const textareaClass =
    "w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const textareaWithIconClass =
    "w-full resize-y rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm font-medium leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";

  const updateValue = (field: StartupSetupField, value: string) => {
    setStartupValues((current) => ({ ...current, [field]: value }));
  };

  const startAutofill = () => {
    const snapshot = { ...startupValues };
    const now = Date.now();
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
    for (const [field, value] of Object.entries(snapshot)) {
      formData.set(field, value);
    }
    autofillStartFetcher.submit(formData, { method: "POST" });
  };

  const startBaseline = () => {
    setGoogleBaseline(null);
    const formData = new FormData();
    formData.set("intent", "start-baseline");
    baselineStartFetcher.submit(formData, { method: "POST" });
  };

  const refreshGoogleBaseline = () => {
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
    setAutofillRunId(null);
    setBaselineRunId(null);
    setGoogleBaseline(null);
    setAppliedAutofillRunId(null);
    setAutofillStartedAt(null);
    setAutofillLastProgressAt(null);
    setAutofillLastPollAt(null);
    setAutofillProgressSignature("");
    googleAutoRefreshSubmittedRef.current = false;
  }, [activeCompanyKey, startupDefaults, startupDefaultsSignature]);

  useEffect(() => {
    if (focusSection !== "baseline") return;
    window.setTimeout(() => baselineRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }), 100);
  }, [focusSection]);

  useEffect(() => {
    if (!autoRefreshGoogleBaseline || googleAutoRefreshSubmittedRef.current) return;
    if (focusSection !== "baseline" || !hasGoogleBaselineScopes || googleBaselinePending) return;
    googleAutoRefreshSubmittedRef.current = true;
    refreshGoogleBaseline();
  }, [autoRefreshGoogleBaseline, focusSection, googleBaselinePending, hasGoogleBaselineScopes]);

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
    if (!autofill || (autofillRun?.status !== "completed" && !autofill.partial)) return;
    const profileFields = autofill.profileFields;
    const splitContext = splitCompanyContext(profileFields?.companyContext || autofill.companyContext, startupValues.targetAudience);
    const competitors = competitorStringsFromAutofill(autofill);

    setStartupValues((current) => ({
      ...current,
      companyLinkedInUrl: autofill.companyLinkedInUrl || current.companyLinkedInUrl,
      shortDescription: profileFields?.shortDescription || splitContext.shortDescription || current.shortDescription,
      problemSolved: profileFields?.problemSolved || splitContext.problemSolved || current.problemSolved,
      targetAudience: profileFields?.targetAudience || splitContext.targetAudience || current.targetAudience,
      location: profileFields?.location || current.location,
      abn: profileFields?.abn || current.abn,
      founderNames: profileFields?.founderNames || current.founderNames,
      stage: profileFields?.stage || current.stage,
      organizationKind: profileFields?.organizationKind || current.organizationKind,
      competitors: competitors.length ? competitors.join("\n") : current.competitors,
      seedKeywords: autofill.seedKeywords?.length ? autofill.seedKeywords.join(", ") : current.seedKeywords,
    }));
    setAppliedAutofillRunId(autofillRunId);
  }, [appliedAutofillRunId, autofillRun, autofillRunId, startupValues.targetAudience]);

  const form = (
    <Form
      method="POST"
      className={clsx(
        "bg-white",
        embedded ? "space-y-0" : "mt-10 overflow-hidden rounded-2xl border border-gray-200 shadow-sm",
      )}
    >
      <input type="hidden" name="intent" value="save-startup-details" />
      <input type="hidden" name="companyContext" value={companyContext} />
      {error ? (
        <div className="border-b border-rose-100 bg-rose-50 px-6 py-4 text-sm font-bold text-rose-700">{error}</div>
      ) : null}

      <div className={clsx("grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-12", embedded ? "" : "p-6 lg:p-8")}>
        <div>
          <p className="text-sm font-black text-violet-700">{setupEyebrow}</p>
          <h2 className="mt-3 text-2xl font-black tracking-normal text-gray-950">{setupTitle}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            {setupDescription}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <FormField label="Company name" help="This will be used as the author for your articles.">
              <div className="relative">
                <ControlIcon icon={Building2} />
                <input
                  name="companyName"
                  value={startupValues.companyName}
                  onChange={(event) => updateValue("companyName", event.target.value)}
                  disabled={researchLocked}
                  required
                  autoComplete="organization"
                  placeholder="Acme AI"
                  className={inputWithIconClass}
                />
              </div>
            </FormField>

            <FormField label="Website domain" help="Connect this company to its website and article system.">
              <div className="relative">
                <ControlIcon icon={Globe2} />
                <input
                  name="domain"
                  value={startupValues.domain}
                  onChange={(event) => updateValue("domain", event.target.value)}
                  disabled={researchLocked}
                  required
                  autoComplete="url"
                  placeholder="example.com"
                  className={inputWithIconClass}
                />
              </div>
            </FormField>
          </div>

          <div className="mt-7 space-y-3 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 shadow-sm shadow-violet-100/60">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-gray-950">Fill in with AI</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
                  Use the website and public company info to fill the profile fields below.
                </p>
              </div>
              <button
                type="button"
                onClick={startAutofill}
                disabled={!canStartAutofill}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {autofillPending || autofillPolling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {autofillPending || autofillPolling ? "Generating..." : "Generate with AI"}
              </button>
            </div>
            <div className="rounded-xl border border-violet-100 bg-white/70 p-4">
              <FormField label="Company LinkedIn URL (optional)" help="Helps AI identify the right company and competitors.">
                <div className="relative">
                  <ControlIcon icon={Link2} />
                  <input
                    name="companyLinkedInUrl"
                    value={startupValues.companyLinkedInUrl}
                    onChange={(event) => updateValue("companyLinkedInUrl", event.target.value)}
                    disabled={researchLocked}
                    placeholder="https://www.linkedin.com/company/acme"
                    className={inputWithIconClass}
                  />
                </div>
              </FormField>
              {showLinkedInDisambiguationHint ? (
                <p className="mt-2 text-xs font-bold text-amber-700">
                  A LinkedIn company URL helps us disambiguate names like {startupValues.companyName.trim()}.
                </p>
              ) : null}
            </div>
            {!canStartAutofill && !autofillPending && !autofillPolling ? (
              <p className="text-xs font-bold text-gray-500">Add a company name and website domain before generating with AI.</p>
            ) : null}
            {autofillStartData?.error && !autofillStartData?.autofillRunId ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{autofillStartData.error}</div>
            ) : null}
            <ProfileResearchProgressCard
              run={autofillRun}
              runId={autofillRunId}
              pending={autofillPending}
              startStatus={autofillStartStatus}
              startError={autofillStartError}
              stalled={autofillStalled}
              unavailable={autofillUnavailable}
              onRetry={startAutofill}
              retryDisabled={!canRetryAutofill}
            />
          </div>

          <div className={clsx("mt-8 rounded-2xl border border-gray-200 bg-white p-5", researchLocked && "bg-gray-50/80")}>
            <div className="grid gap-5 lg:grid-cols-2">
              <FormField label="Short description" help="In 1-2 sentences, what does your startup do?">
                <textarea
                  name="shortDescription"
                  value={startupValues.shortDescription}
                  onChange={(event) => updateValue("shortDescription", event.target.value)}
                  disabled={researchLocked}
                  placeholder="e.g. We help SaaS companies automate customer onboarding..."
                  rows={5}
                  maxLength={600}
                  className={textareaClass}
                />
              </FormField>

              <FormField label="What problem do you solve?" help="What's the main problem you help your customers solve?">
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

              <FormField label="Who is your target audience?" help="Who do you serve?">
                <div className="relative">
                  <ControlIcon icon={Users} />
                  <input
                    name="targetAudience"
                    value={startupValues.targetAudience}
                    onChange={(event) => updateValue("targetAudience", event.target.value)}
                    disabled={researchLocked}
                    placeholder="e.g. SaaS founders, marketing teams, eCommerce brands"
                    className={inputWithIconClass}
                  />
                </div>
              </FormField>
            </div>
          </div>

          <details className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-5" open={advancedOpenByDefault || Boolean(startupValues.location || startupValues.abn || startupValues.founderNames || startupValues.stage || startupValues.organizationKind)}>
            <summary className="cursor-pointer text-sm font-black text-gray-950">Advanced startup details</summary>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
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
              <FormField label="ABN">
                <div className="relative">
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
          </details>
        </div>

        <aside className="self-start rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="flex items-center gap-2 text-sm font-black text-gray-950">
            {guidanceTitle} <CheckCircle2 className="h-4 w-4 text-gray-400" />
          </h3>
          <p className="mt-5 text-sm font-semibold leading-7 text-gray-600">
            {guidanceBody}
          </p>
          <p className="mt-7 text-sm font-black text-gray-950">Tips</p>
          <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-600">
            {guidanceTips.map((tip) => (
              <li key={tip} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 space-y-6 border-t border-gray-100 pt-6">
            <FormField label="Seed keywords" help="Optional starting keywords, separated by commas.">
              <div className="relative">
                <ControlIcon icon={Tags} />
                <textarea
                  name="seedKeywords"
                  value={startupValues.seedKeywords}
                  onChange={(event) => updateValue("seedKeywords", event.target.value)}
                  disabled={researchLocked}
                  rows={4}
                  placeholder="onboarding automation, product analytics"
                  className={textareaWithIconClass}
                />
              </div>
            </FormField>

            <FormField label="Competitors" help="One competitor domain or company per line.">
              <div className="relative">
                <ControlIcon icon={Users} />
                <textarea
                  name="competitors"
                  value={startupValues.competitors}
                  onChange={(event) => updateValue("competitors", event.target.value)}
                  disabled={researchLocked}
                  rows={5}
                  placeholder="competitor.com&#10;another competitor"
                  className={textareaWithIconClass}
                />
              </div>
            </FormField>
          </div>
        </aside>
      </div>

      {includeBaseline ? (
        <section
          ref={baselineRef}
          className={clsx(
            "border-t border-gray-100 bg-white py-8",
            embedded ? "" : "px-6 lg:px-8",
            focusSection === "baseline" && "scroll-mt-6",
          )}
        >
          <div>
            <p className="text-sm font-black text-violet-700">Optional baseline</p>
            <h2 className="mt-3 text-2xl font-black tracking-normal text-gray-950">Measure where the website starts</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-600">
              Connect Google Search Console first if you want search traffic included. Then generate a baseline snapshot for technical health, SEO,
              authority, AI visibility, and traffic before the first article goes live.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-violet-700 shadow-sm ring-1 ring-violet-100">1</span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-950">Connect Google Search Console</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
                    Optional. Connect it to include clicks, impressions, and search query data in the baseline.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {hasGoogleBaselineScopes ? (
                  <>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Search Console connected
                    </span>
                    <button
                      type="button"
                      onClick={refreshGoogleBaseline}
                      disabled={!canRefreshGoogleBaseline}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-800 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {googleBaselinePending ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                      {trafficStatus === "measured" ? "Refresh Search Console" : "Load Search Console"}
                    </button>
                  </>
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
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-violet-700 shadow-sm ring-1 ring-violet-100">2</span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-950">Generate baseline snapshot</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
                    This can run without Search Console. Use it to compare future article growth against today&apos;s website state.
                  </p>
                  <p className="mt-3 text-sm font-black text-gray-950">{effectiveBaseline.domain || startupValues.domain || "No domain saved yet"}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-600">{baselineSummaryText(effectiveBaseline.summary)}</p>
                  {effectiveBaseline.collectedAt ? (
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      Collected {new Date(effectiveBaseline.collectedAt).toLocaleDateString()}
                      {effectiveBaseline.stale ? " · stale" : ""}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={startBaseline}
                  disabled={!canStartBaseline}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>

          {baselineStartData?.error || googleBaselineFetcher.data?.error || skipBaselineFetcher.data?.error ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {baselineStartData?.error ?? googleBaselineFetcher.data?.error ?? skipBaselineFetcher.data?.error}
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

          <div className="mt-5 grid gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black text-gray-950">Overall</p>
                <SourceStatusBadge status={effectiveBaseline.status === "completed" ? "measured" : effectiveBaseline.status} />
              </div>
              <p className="mt-3 text-3xl font-black text-gray-950">
                {typeof effectiveBaseline.overallScore === "number" ? effectiveBaseline.overallScore : "-"}
              </p>
            </div>
            <BaselineMetricCard label="Technical health" metric={baselineMetrics.technicalHealth} />
            <BaselineMetricCard label="Lighthouse" metric={baselineMetrics.lighthouse} />
            <BaselineMetricCard label="Organic search" metric={baselineMetrics.organicSearch} />
            <BaselineMetricCard label="AI visibility" metric={baselineMetrics.aiVisibility} />
            <BaselineMetricCard label="Authority" metric={baselineMetrics.authority} />
            <BaselineMetricCard label="Traffic/users" metric={trafficMetric} />
            {searchConsole?.status === "measured" && searchConsoleSummary ? (
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black text-gray-950">Search Console</p>
                  <GoogleIcon />
                </div>
                <p className="mt-3 text-2xl font-black text-gray-950">
                  {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.clicks) ?? 0))}
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  clicks from {new Intl.NumberFormat("en-AU").format(Math.round(numericValue(searchConsoleSummary.impressions) ?? 0))} impressions
                </p>
              </div>
            ) : null}
          </div>

          {effectiveBaseline.recommendations?.length ? (
            <div className="mt-5 rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-sm font-black text-gray-950">Recommended fixes</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {effectiveBaseline.recommendations.slice(0, 4).map((recommendation, index) => (
                  <div key={`${recommendation.title ?? recommendation.source ?? index}`} className="rounded-xl bg-gray-50 px-4 py-3">
                    <p className="text-sm font-black text-gray-950">{String(recommendation.title ?? "Review baseline recommendation")}</p>
                    {recommendation.detail ? <p className="mt-1 text-xs font-semibold text-gray-600">{String(recommendation.detail)}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className={clsx("flex flex-col gap-4 border-t border-gray-100 bg-gray-50/70 py-5 sm:flex-row sm:items-center sm:justify-between", embedded ? "" : "px-6 lg:px-8")}>
        <p className="flex items-center gap-3 text-sm font-bold text-gray-500">
          <ShieldCheck className="h-5 w-5 text-gray-400" />
          Your data is secure and never shared.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {includeBaseline && embedded && focusSection === "baseline" ? (
            <Link
              to="/founder-tools/marketing/create?step=github"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Continue to GitHub
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
          {shouldShowSecondaryAction ? (
            <button
              type="submit"
              name="nextAction"
              value="save-exit"
              disabled={isSubmitting || researchLocked}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save and exit
            </button>
          ) : null}
          <button
            type="submit"
            name="nextAction"
            value="continue"
            disabled={isSubmitting || researchLocked}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {primaryActionLabel ?? (embedded ? (focusSection === "baseline" ? "Save startup profile" : "Save and continue") : "Continue to website")}
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
