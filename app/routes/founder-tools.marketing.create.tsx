import type { Route } from "./+types/founder-tools.marketing.create";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useNavigation } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import FounderStartupDetailsStep, {
  type StartupDetailsField,
  type StartupDetailsFormValues,
} from "~/components/FounderStartupDetailsStep";
import MarketingEvidencePanel from "~/components/MarketingEvidencePanel";
import VibeMarketingStepper, { type VibeMarketingStepKey } from "~/components/VibeMarketingStepper";
import { getEnv } from "~/lib/env.server";
import {
  connectVibeMarketingGithub,
  getVibeMarketingBootstrap,
  replayVibeMarketingDaily,
  saveVibeMarketingSettings,
  skipVibeMarketingBaseline,
  startVibeMarketingArticle,
  startVibeMarketingAutofill,
  startVibeMarketingBaseline,
  startVibeMarketingDiscovery,
  startVibeMarketingScan,
} from "~/lib/vibe-marketing";
import type {
  VibeMarketingAutofillCompetitor,
  VibeMarketingAutofillResult,
  VibeMarketingBootstrap,
  VibeMarketingRunSummary,
  VibeMarketingWebsiteBaseline,
  VibeMarketingWebsiteBaselineMetric,
} from "~/types/vibe-marketing";
import {
  getActiveVibeRaisingCompany,
  requireVibeRaisingFounder,
  saveVibeRaisingCompany,
  setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";

const STEP_KEYS: VibeMarketingStepKey[] = [
  "startupDetails",
  "baseline",
  "github",
  "scan",
  "articleSystem",
  "research",
  "chooseArticle",
  "writeCheck",
  "editArticle",
  "reviewPublish",
  "dailyAutomation",
];

function listFromForm(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function normalizeStep(value: string | null | undefined, fallback: string | null | undefined): VibeMarketingStepKey {
  const candidate = value && STEP_KEYS.includes(value as VibeMarketingStepKey) ? value : fallback;
  return STEP_KEYS.includes(candidate as VibeMarketingStepKey) ? (candidate as VibeMarketingStepKey) : "startupDetails";
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const bootstrap = await getVibeMarketingBootstrap(env, request);
  const url = new URL(request.url);
  const activeStep = normalizeStep(url.searchParams.get("step"), bootstrap.currentGuidedStep);
  return { bootstrap, activeStep };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const activeCompany = getActiveVibeRaisingCompany(appUser);
  const formData = await request.formData();
  const intent = stringFromForm(formData, "intent");

  try {
    if (intent === "save-startup-details") {
      const companyId = await saveVibeRaisingCompany(env, request, {
        companyId: activeCompany?.id ?? null,
        name: stringFromForm(formData, "companyName"),
        domain: stringFromForm(formData, "domain"),
        companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        location: stringFromForm(formData, "location"),
        abn: stringFromForm(formData, "abn"),
        brandName: stringFromForm(formData, "brandName"),
        companyContext: stringFromForm(formData, "companyContext"),
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
        founderNames: listFromForm(formData.get("founderNames")),
        stage: stringFromForm(formData, "stage"),
        notes: stringFromForm(formData, "notes"),
        registered: true,
      });
      if (companyId) {
        await setVibeRaisingActiveCompany(env, request, companyId);
      }
      return redirect("/founder-tools/marketing/create?step=baseline");
    }

    if (intent === "start-autofill") {
      const result = await startVibeMarketingAutofill(env, request, {
        companyName: stringFromForm(formData, "companyName"),
        company_name: stringFromForm(formData, "companyName"),
        domain: stringFromForm(formData, "domain"),
        companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        company_linkedin_url: stringFromForm(formData, "companyLinkedInUrl"),
        location: stringFromForm(formData, "location"),
        abn: stringFromForm(formData, "abn"),
        brandName: stringFromForm(formData, "brandName"),
        brand_name: stringFromForm(formData, "brandName"),
        existingFields: {
          companyContext: stringFromForm(formData, "companyContext"),
          competitors: listFromForm(formData.get("competitors")),
          seedKeywords: listFromForm(formData.get("seedKeywords")),
          companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        },
        companyContext: stringFromForm(formData, "companyContext"),
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
      });
      return { autofillRunId: result.runId, status: result.status };
    }

    if (intent === "start-baseline") {
      const result = await startVibeMarketingBaseline(env, request, {});
      return { baselineRunId: result.runId, status: result.status };
    }

    if (intent === "skip-baseline") {
      await skipVibeMarketingBaseline(env, request, {
        reason: stringFromForm(formData, "reason") || "Skipped during onboarding",
      });
      return redirect("/founder-tools/marketing/create?step=github");
    }

    if (intent === "connect-github") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      await saveVibeMarketingSettings(env, request, {
        githubRepo,
        github_repo: githubRepo,
      });
      const response = await connectVibeMarketingGithub(env, request, { githubRepo, github_repo: githubRepo });
      const authUrl = response.auth_url ?? response.authUrl;
      if (authUrl) throw redirect(authUrl);
      return redirect("/founder-tools/marketing/create?step=scan");
    }

    if (intent === "start-scan") {
      const result = await startVibeMarketingScan(env, request, {
        githubRepo: stringFromForm(formData, "githubRepo"),
      });
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=scan");
    }

    if (intent === "start-discovery") {
      const result = await startVibeMarketingDiscovery(env, request, {});
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=research");
    }

    if (intent === "start-article") {
      const topic = stringFromForm(formData, "topic");
      const result = await startVibeMarketingArticle(env, request, {
        topic,
        targetKeyword: stringFromForm(formData, "targetKeyword") || topic,
        titleAngle: stringFromForm(formData, "titleAngle"),
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: stringFromForm(formData, "deliveryMode"),
        deliveryModeConfirmed: true,
        sourceDiscoveryRunId: stringFromForm(formData, "sourceDiscoveryRunId"),
      });
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return redirect("/founder-tools/marketing/create?step=writeCheck");
    }

    if (intent === "save-daily") {
      await saveVibeMarketingSettings(env, request, {
        dailyDiscoveryEnabled: formData.get("dailyDiscoveryEnabled") === "on",
        defaultTimezone: stringFromForm(formData, "defaultTimezone"),
      });
      return redirect("/founder-tools/marketing/create?step=dailyAutomation");
    }

    if (intent === "daily-replay") {
      const result = await replayVibeMarketingDaily(env, request, {});
      if (result.runId) return redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    return {
      error:
        error?.data?.detail ??
        error?.data?.error ??
        error?.response?.data?.detail ??
        error?.message ??
        "That action could not be completed.",
    };
  }

  return null;
}

function StatusBadge({ passed }: { passed: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        passed ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
      )}
    >
      {passed ? "Ready" : "Needs setup"}
    </span>
  );
}

function PanelHeader({ title, description, passed }: { title: string; description: string; passed: boolean }) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-gray-950">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{description}</p>
      </div>
      <StatusBadge passed={passed} />
    </div>
  );
}

function startupDefaultsFromBootstrap(bootstrap: VibeMarketingBootstrap): StartupDetailsFormValues {
  return {
    companyName: bootstrap.company.name ?? "",
    domain: bootstrap.company.domain ?? bootstrap.organization.domain ?? "",
    companyLinkedInUrl: bootstrap.organization.companyLinkedInUrl ?? bootstrap.company.companyLinkedInUrl ?? "",
    location: bootstrap.company.location ?? "",
    abn: bootstrap.company.abn ?? "",
    brandName: bootstrap.settings.brandName ?? bootstrap.organization.name ?? bootstrap.company.name ?? "",
    companyContext: bootstrap.settings.companyContext ?? "",
    competitors: (bootstrap.organization.competitors ?? []).join("\n"),
    seedKeywords: (bootstrap.organization.seedKeywords ?? []).join("\n"),
    founderNames: (bootstrap.startupProfile.founderNames ?? []).join(", "),
    stage: bootstrap.startupProfile.stage ?? "",
    notes: bootstrap.startupProfile.notes ?? "",
  };
}

function isBlank(value: string | null | undefined) {
  return !String(value ?? "").trim();
}

function startupValuesAreEqual(left: StartupDetailsFormValues | null | undefined, right: StartupDetailsFormValues | null | undefined) {
  if (!left || !right) return false;
  return (Object.keys(left) as StartupDetailsField[]).every((field) => String(left[field] ?? "") === String(right[field] ?? ""));
}

function listTextIsBlank(value: string | null | undefined) {
  return listFromForm(String(value ?? "")).length === 0;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function numericValue(value: unknown): number | undefined {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function competitorSuggestion(value: unknown): VibeMarketingAutofillCompetitor | null {
  if (!value || typeof value !== "object") return null;
  const payload = value as Record<string, unknown>;
  const name = String(payload.name ?? payload.company ?? payload.title ?? "").trim();
  const domain = String(payload.domain ?? "").trim();
  if (!name && !domain) return null;
  const rawScore = typeof payload.score === "number" ? payload.score : Number(payload.score);
  return {
    name: name || domain,
    domain,
    linkedinUrl: payload.linkedinUrl ? String(payload.linkedinUrl) : payload.linkedin_url ? String(payload.linkedin_url) : undefined,
    type: payload.type ? String(payload.type) : undefined,
    score: Number.isFinite(rawScore) ? rawScore : undefined,
    reason: payload.reason ? String(payload.reason) : undefined,
    source: payload.source ? String(payload.source) : undefined,
    evidence: Array.isArray(payload.evidence) ? payload.evidence.map(String).filter(Boolean) : undefined,
    confidence: payload.confidence ? String(payload.confidence) : undefined,
  };
}

function isCompetitorSuggestion(value: VibeMarketingAutofillCompetitor | null): value is VibeMarketingAutofillCompetitor {
  return Boolean(value);
}

function competitorText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  const suggestion = competitorSuggestion(value);
  return suggestion?.domain || suggestion?.name || "";
}

function keywordGroups(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((group): group is Record<string, unknown> => Boolean(group && typeof group === "object"))
    .map((group) => ({
      group: group.group ? String(group.group) : group.name ? String(group.name) : undefined,
      intent: group.intent ? String(group.intent) : undefined,
      keywords: stringList(group.keywords),
    }))
    .filter((group) => group.keywords.length);
}

function competitorList(value: unknown): VibeMarketingAutofillCompetitor[] {
  if (!Array.isArray(value)) return [];
  return value.map(competitorSuggestion).filter(isCompetitorSuggestion);
}

function researchDepth(value: unknown): Record<string, number> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const result: Record<string, number> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    const numberValue = numericValue(rawValue);
    if (typeof numberValue === "number") result[key] = numberValue;
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

function minimumsMet(value: unknown): Record<string, boolean> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const result: Record<string, boolean> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    if (typeof rawValue === "boolean") result[key] = rawValue;
  }
  return Object.keys(result).length ? result : undefined;
}

function plainObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function objectArray(value: unknown): Record<string, unknown>[] | undefined {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object" && !Array.isArray(item))) : undefined;
}

function extractAutofill(run: VibeMarketingRunSummary | null | undefined): VibeMarketingAutofillResult | null {
  const raw = run?.result?.autofill;
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const competitorGroupsPayload = payload.competitorGroups && typeof payload.competitorGroups === "object" ? (payload.competitorGroups as Record<string, unknown>) : {};
  const directCompetitors = competitorList(payload.directCompetitors ?? payload.direct_competitors ?? competitorGroupsPayload.directCompetitors);
  const seoCompetitors = competitorList(payload.seoCompetitors ?? payload.seo_competitors ?? competitorGroupsPayload.seoCompetitors);
  const adjacentOrganizations = competitorList(payload.adjacentOrganizations ?? payload.adjacent_organizations ?? competitorGroupsPayload.adjacentOrganizations);
  const competitorCandidates = Array.isArray(payload.competitors)
    ? payload.competitors
    : Array.isArray(payload.competitorCandidates)
      ? payload.competitorCandidates
      : [];
  const competitorSuggestions = [
    ...directCompetitors,
    ...seoCompetitors,
    ...adjacentOrganizations,
    ...competitorCandidates.map(competitorSuggestion).filter(isCompetitorSuggestion),
  ];
  const competitorStrings = [
    ...directCompetitors.map((competitor) => competitor.domain || competitor.name),
    ...competitorCandidates.map(competitorText),
    ...stringList(payload.competitorDomains),
    ...stringList(payload.competitorStrings),
  ].filter(Boolean);
  const seenCompetitors = new Set<string>();
  const competitors = competitorStrings.filter((competitor) => {
    const key = competitor.toLowerCase();
    if (seenCompetitors.has(key)) return false;
    seenCompetitors.add(key);
    return true;
  });
  const groups = keywordGroups(payload.keywordGroups ?? payload.keyword_groups);
  const seedKeywords = [
    ...stringList(payload.seedKeywords),
    ...stringList(payload.seed_keywords),
    ...groups.flatMap((group) => group.keywords),
  ];
  const seenKeywords = new Set<string>();
  return {
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
          : null,
    competitors,
    competitorSuggestions,
    directCompetitors,
    seoCompetitors,
    adjacentOrganizations,
    competitorGroups: {
      directCompetitors,
      seoCompetitors,
      adjacentOrganizations,
    },
    seedKeywords: seedKeywords.filter((keyword) => {
      const key = keyword.toLowerCase();
      if (seenKeywords.has(key)) return false;
      seenKeywords.add(key);
      return true;
    }),
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
    sourceCount: numericValue(payload.sourceCount ?? payload.source_count),
    competitorCount: numericValue(payload.competitorCount ?? payload.competitor_count),
    seedKeywordCount: numericValue(payload.seedKeywordCount ?? payload.seed_keyword_count),
    researchSummary: typeof payload.researchSummary === "string" ? payload.researchSummary : typeof payload.research_summary === "string" ? payload.research_summary : null,
    researchDepth: researchDepth(payload.researchDepth ?? payload.research_depth),
    researchQuality: plainObject(payload.researchQuality ?? payload.research_quality),
    modelTrace: objectArray(payload.modelTrace ?? payload.model_trace),
    queryLog: objectArray(payload.queryLog ?? payload.query_log),
    evidenceMap: plainObject(payload.evidenceMap ?? payload.evidence_map),
    stepDurations: researchDepth(payload.stepDurations ?? payload.step_durations),
    minimumsMet: minimumsMet(payload.minimumsMet ?? payload.minimums_met),
    warnings: Array.isArray(payload.warnings) ? payload.warnings.map(String).filter(Boolean) : [],
  };
}

function autofillStepLabel(step?: string | null) {
  const labels: Record<string, string> = {
    resolve_company_identity: "Resolving company identity",
    crawl_owned_web: "Crawling owned website",
    crawl_website: "Crawling website",
    scrape_website: "Crawling website",
    research_public_web: "Researching public web",
    research_linkedin_public: "Checking public LinkedIn signals",
    discover_competitor_candidates: "Finding competitor candidates",
    rank_competitors: "Ranking competitors",
    generate_keyword_landscape: "Generating keywords",
    synthesize_company_profile: "Writing company profile",
    synthesize_company_context: "Writing company context",
    generate_company_context: "Writing company context",
    identify_competitors: "Finding competitors",
    generate_seed_keywords: "Generating keywords",
    generate_marketing_seeds: "Generating keywords",
    finalize: "Ready to review",
  };
  return step ? labels[step] ?? step.replace(/_/g, " ") : "Researching company profile";
}

function AutofillStatusCard({
  run,
  runId,
  pending,
}: {
  run?: VibeMarketingRunSummary | null;
  runId?: string | null;
  pending: boolean;
}) {
  if (!runId && !pending) return null;
  const autofill = extractAutofill(run);
  const isFailed = run?.status === "failed" || run?.status === "blocked";
  const label = pending
    ? "Starting profile research"
    : run?.status === "completed"
      ? "Ready to review"
      : isFailed
        ? "Research needs attention"
        : autofillStepLabel(run?.currentStep);
  const sourceCount = autofill?.sourceCount ?? autofill?.sources?.length ?? 0;
  const competitorCount = autofill?.competitorCount ?? autofill?.competitorSuggestions?.length ?? autofill?.competitors?.length ?? 0;
  const seedKeywordCount = autofill?.seedKeywordCount ?? autofill?.seedKeywords?.length ?? 0;
  const linkedinSimilarCount = autofill?.researchDepth?.linkedinSimilarSignals ?? autofill?.linkedinSimilarSignals?.length ?? 0;
  const modelTrace = autofill?.modelTrace ?? [];
  const completedModelTrace = modelTrace.filter((entry) => entry.status === "completed");
  const lastModel = [...modelTrace].reverse().find((entry) => typeof entry.model === "string")?.model;
  const quality = autofill?.researchQuality ?? {};
  const liveResearchAttempted = Boolean(quality.liveResearchAttempted || completedModelTrace.length);
  const localStub = Boolean(quality.status === "local_stub" || autofill?.warnings?.some((warning) => warning.toLowerCase().includes("local stub")));
  const completedWithoutTrace = run?.status === "completed" && !localStub && !liveResearchAttempted && sourceCount === 0;
  return (
    <div
      className={clsx(
        "rounded-xl border px-4 py-3 text-sm",
        isFailed ? "border-red-200 bg-red-50 text-red-800" : "border-violet-100 bg-violet-50 text-violet-900",
      )}
    >
      <div className="flex items-center gap-2 font-bold">
        {pending || (!run || ["queued", "running"].includes(run.status)) ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
        <span>{label}</span>
      </div>
      {run?.errors?.length ? <p className="mt-2 font-semibold text-red-700">{run.errors[0]}</p> : null}
      {autofill ? (
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-violet-800">
          <span>{localStub ? "Local stub preview" : liveResearchAttempted ? "Live deep research" : "Research evidence pending"}</span>
          <span>{sourceCount} sources reviewed</span>
          <span>{competitorCount} competitors found</span>
          <span>{seedKeywordCount} seed keywords generated</span>
          {lastModel ? <span>Model: {String(lastModel)}</span> : null}
          {linkedinSimilarCount ? <span>{linkedinSimilarCount} LinkedIn similar signals</span> : null}
        </div>
      ) : null}
      {completedWithoutTrace ? (
        <p className="mt-2 text-xs font-semibold text-amber-700">
          This run completed without model or source evidence. Check that live content-factory research is connected instead of a fallback path.
        </p>
      ) : null}
      {autofill?.sources?.length ? (
        <p className="mt-2 text-xs font-semibold text-violet-700">
          Sources: {autofill.sources.slice(0, 3).map((source) => source.title || source.url).join(", ")}
        </p>
      ) : null}
      {autofill?.warnings?.length ? (
        <p className="mt-2 text-xs font-semibold text-amber-700">{autofill.warnings[0]}</p>
      ) : null}
    </div>
  );
}

type AutofillApplyField = "brandName" | "companyContext" | "competitors" | "seedKeywords";
type AutofillApplyMode = "replace" | "append" | "keep";

function ReviewActionButtons({
  field,
  replaceLabel,
  onApplyField,
}: {
  field: AutofillApplyField;
  replaceLabel: string;
  onApplyField?: (field: AutofillApplyField, mode: AutofillApplyMode) => void;
}) {
  if (!onApplyField) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <button type="button" onClick={() => onApplyField(field, "replace")} className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black text-white shadow-sm transition hover:bg-violet-700">
        {replaceLabel}
      </button>
      <button type="button" onClick={() => onApplyField(field, "append")} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-black text-gray-700 transition hover:bg-gray-50">
        Append
      </button>
      <button type="button" onClick={() => onApplyField(field, "keep")} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-black text-gray-500 transition hover:bg-gray-50">
        Keep current
      </button>
    </div>
  );
}

function AutofillReviewPanel({
  run,
  values,
  autofilledFields,
  onApplyField,
}: {
  run?: VibeMarketingRunSummary | null;
  values: StartupDetailsFormValues;
  autofilledFields: StartupDetailsField[];
  onApplyField?: (field: AutofillApplyField, mode: AutofillApplyMode) => void;
}) {
  if (run?.status !== "completed") return null;
  const autofill = extractAutofill(run);
  if (!autofill) return null;
  const preservedFields = [
    !autofilledFields.includes("brandName") && !isBlank(values.brandName) && autofill.brandName ? "brand name" : null,
    !autofilledFields.includes("companyContext") && !isBlank(values.companyContext) && autofill.companyContext ? "company context" : null,
    !autofilledFields.includes("competitors") && !listTextIsBlank(values.competitors) && autofill.competitors?.length ? "competitors" : null,
    !autofilledFields.includes("seedKeywords") && !listTextIsBlank(values.seedKeywords) && autofill.seedKeywords?.length ? "seed keywords" : null,
  ].filter(Boolean);
  const competitorSuggestions: VibeMarketingAutofillCompetitor[] = autofill.competitorSuggestions?.length
    ? autofill.competitorSuggestions
    : (autofill.competitors ?? []).map((competitor) => ({ name: competitor, domain: competitor }));
  const directCompetitors = autofill.directCompetitors?.length ? autofill.directCompetitors : competitorSuggestions.filter((competitor) => competitor.type === "direct").slice(0, 8);
  const seoCompetitors = autofill.seoCompetitors ?? [];
  const adjacentOrganizations = autofill.adjacentOrganizations ?? [];
  const sourceCount = autofill.sourceCount ?? autofill.sources?.length ?? 0;
  const competitorCount = autofill.competitorCount ?? competitorSuggestions.length;
  const seedKeywordCount = autofill.seedKeywordCount ?? autofill.seedKeywords?.length ?? 0;
  const depth = autofill.researchDepth ?? {};
  const modelTrace = autofill.modelTrace ?? [];
  const lastModel = [...modelTrace].reverse().find((entry) => typeof entry.model === "string")?.model;
  const completedModelCalls = modelTrace.filter((entry) => entry.status === "completed").length;
  const quality = autofill.researchQuality ?? {};

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-black text-gray-950">Research suggestions</p>
          <p className="mt-1 text-gray-600">
            {sourceCount} sources reviewed, {competitorCount} competitors found, {seedKeywordCount} seed keywords generated.
          </p>
          {lastModel ? (
            <p className="mt-1 text-xs font-bold text-violet-700">
              {completedModelCalls} GPT research pass{completedModelCalls === 1 ? "" : "es"} completed with {String(lastModel)}.
            </p>
          ) : quality.status === "local_stub" ? (
            <p className="mt-1 text-xs font-bold text-amber-700">Local stub preview: no live crawl, search, or GPT synthesis ran.</p>
          ) : null}
        </div>
      </div>
      {Object.keys(depth).length ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Owned pages", depth.ownedPagesCrawled],
            ["Public sources", depth.publicSourcesReviewed],
            ["LinkedIn signals", depth.linkedinPublicSignals],
            ["LinkedIn similar", depth.linkedinSimilarSignals],
            ["Candidates evaluated", depth.competitorCandidatesEvaluated],
            ["Keywords", depth.seedKeywordsGenerated],
          ]
            .filter(([, value]) => typeof value === "number")
            .map(([label, value]) => (
              <div key={String(label)} className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">{label}</p>
                <p className="mt-1 text-base font-black text-gray-950">{value}</p>
              </div>
            ))}
        </div>
      ) : null}
      {autofill.researchSummary ? (
        <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-800">{autofill.researchSummary}</p>
      ) : null}
      {autofill.linkedinProfile?.url || autofill.linkedinSimilarSignals?.length ? (
        <div className="mt-4 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <p className="text-xs font-black uppercase tracking-wide text-violet-500">LinkedIn public signals</p>
          {autofill.linkedinProfile?.url ? (
            <p className="mt-1 truncate text-xs font-bold text-violet-900">
              Profile: {autofill.linkedinProfile.title || autofill.linkedinProfile.url}
            </p>
          ) : null}
          {autofill.linkedinProfile?.description ? (
            <p className="mt-1 line-clamp-2 text-xs font-semibold text-violet-800">{autofill.linkedinProfile.description}</p>
          ) : null}
          {autofill.linkedinSimilarSignals?.length ? (
            <p className="mt-2 text-xs font-semibold text-violet-800">
              Similar/co-mention signals: {autofill.linkedinSimilarSignals.slice(0, 4).map((signal) => signal.title || signal.url).join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}
      {preservedFields.length ? (
        <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
          Existing {preservedFields.join(", ")} were kept. Use the actions below to replace, append, or keep each field before saving.
        </div>
      ) : null}
      {!autofilledFields.includes("brandName") && !isBlank(values.brandName) && autofill.brandName ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs font-black uppercase tracking-wide text-gray-500">Researched brand name</p>
          <p className="mt-1 font-bold text-gray-950">{autofill.brandName}</p>
          <ReviewActionButtons field="brandName" replaceLabel="Use researched brand" onApplyField={onApplyField} />
        </div>
      ) : null}
      {!autofilledFields.includes("companyContext") && !isBlank(values.companyContext) && autofill.companyContext ? (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs font-black uppercase tracking-wide text-gray-500">Researched company context</p>
          <p className="mt-1 line-clamp-5 whitespace-pre-line text-sm text-gray-700">{autofill.companyContext}</p>
          <ReviewActionButtons field="companyContext" replaceLabel="Use researched context" onApplyField={onApplyField} />
        </div>
      ) : null}
      {directCompetitors.length ? (
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-gray-500">Direct competitors</p>
            {!autofilledFields.includes("competitors") && !listTextIsBlank(values.competitors) ? (
              <ReviewActionButtons field="competitors" replaceLabel="Use researched list" onApplyField={onApplyField} />
            ) : null}
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {directCompetitors.slice(0, 6).map((competitor) => (
              <div key={`${competitor.domain || competitor.name}`} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-gray-950">{competitor.name}</p>
                  {typeof competitor.score === "number" ? <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700">{Math.round(competitor.score * 100)}</span> : null}
                </div>
                {competitor.domain ? <p className="text-xs font-semibold text-gray-600">{competitor.domain}</p> : null}
                {competitor.reason ? <p className="mt-1 line-clamp-2 text-xs text-gray-600">{competitor.reason}</p> : null}
                {competitor.linkedinUrl ? <p className="mt-1 truncate text-[11px] font-semibold text-violet-700">LinkedIn: {competitor.linkedinUrl}</p> : null}
                {competitor.evidence?.length ? <p className="mt-1 line-clamp-2 text-[11px] font-semibold text-gray-500">Evidence: {competitor.evidence.slice(0, 2).join(" | ")}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {seoCompetitors.length || adjacentOrganizations.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {seoCompetitors.length ? (
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-gray-500">SEO competitors</p>
              <div className="mt-2 space-y-2">
                {seoCompetitors.slice(0, 4).map((competitor) => (
                  <div key={`${competitor.domain || competitor.name}`} className="rounded-lg bg-gray-50 px-3 py-2">
                    <p className="text-sm font-bold text-gray-950">{competitor.name}</p>
                    {competitor.reason ? <p className="mt-1 line-clamp-2 text-xs text-gray-600">{competitor.reason}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {adjacentOrganizations.length ? (
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-gray-500">Adjacent organizations</p>
              <div className="mt-2 space-y-2">
                {adjacentOrganizations.slice(0, 4).map((competitor) => (
                  <div key={`${competitor.domain || competitor.name}`} className="rounded-lg bg-gray-50 px-3 py-2">
                    <p className="text-sm font-bold text-gray-950">{competitor.name}</p>
                    {competitor.reason ? <p className="mt-1 line-clamp-2 text-xs text-gray-600">{competitor.reason}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {autofill.seedKeywords?.length ? (
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-gray-500">Seed keywords</p>
            {!autofilledFields.includes("seedKeywords") && !listTextIsBlank(values.seedKeywords) ? (
              <ReviewActionButtons field="seedKeywords" replaceLabel="Use researched keywords" onApplyField={onApplyField} />
            ) : null}
          </div>
          {autofill.keywordGroups?.length ? (
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {autofill.keywordGroups.slice(0, 4).map((group) => (
                <div key={`${group.group ?? "group"}-${group.keywords[0]}`} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-xs font-black text-gray-700">{group.group ?? "Keyword group"}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">{group.keywords.slice(0, 5).join(", ")}</p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-2">
            {autofill.seedKeywords.slice(0, 20).map((keyword) => (
              <span key={keyword} className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {autofill.sources?.length ? (
        <div className="mt-4">
          <p className="text-xs font-black uppercase tracking-wide text-gray-500">Evidence</p>
          <div className="mt-2 space-y-1">
            {autofill.sources.slice(0, 4).map((source) => (
              <p key={source.url} className="truncate text-xs font-semibold text-gray-600">
                {source.type ? `${source.type}: ` : ""}
                {source.title || source.url}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      {autofill.warnings?.length ? (
        <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
          {autofill.warnings.slice(0, 2).join(" ")}
        </div>
      ) : null}
    </div>
  );
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
    collectedAt: typeof payload.collectedAt === "string" ? payload.collectedAt : typeof payload.collected_at === "string" ? payload.collected_at : run?.updatedAt,
    overallScore: typeof payload.overallScore === "number" ? payload.overallScore : typeof payload.overall_score === "number" ? payload.overall_score : null,
    summary: typeof payload.summary === "string" || (payload.summary && typeof payload.summary === "object") ? (payload.summary as VibeMarketingWebsiteBaseline["summary"]) : null,
    metrics: payload.metrics && typeof payload.metrics === "object" ? (payload.metrics as VibeMarketingWebsiteBaseline["metrics"]) : {},
    sourceStatus: payload.sourceStatus && typeof payload.sourceStatus === "object" ? (payload.sourceStatus as Record<string, string>) : {},
    recommendations: Array.isArray(payload.recommendations) ? (payload.recommendations as Array<Record<string, unknown>>) : [],
  };
}

function baselineSummaryText(summary: VibeMarketingWebsiteBaseline["summary"]) {
  if (typeof summary === "string") return summary;
  if (summary && typeof summary === "object" && typeof summary.text === "string") return summary.text;
  return "Run a baseline to capture website performance before generating articles.";
}

function metricScore(metric?: VibeMarketingWebsiteBaselineMetric) {
  return typeof metric?.score === "number" ? Math.round(metric.score) : null;
}

function sourceStatusLabel(status?: string | null) {
  if (status === "measured") return "Verified";
  if (status === "needs_connection") return "Needs connection";
  if (status === "error") return "Error";
  return "Unavailable";
}

function SourceStatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-black",
        status === "measured" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
        status === "needs_connection" && "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
        status === "error" && "bg-red-50 text-red-700 ring-1 ring-red-100",
        !["measured", "needs_connection", "error"].includes(String(status)) && "bg-gray-50 text-gray-600 ring-1 ring-gray-100",
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
  const score = metricScore(metric);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black text-gray-950">{label}</p>
        <SourceStatusBadge status={metric?.status} />
      </div>
      <p className="mt-3 text-2xl font-black text-gray-950">{score === null ? "—" : score}</p>
      {typeof metric?.message === "string" ? <p className="mt-2 text-xs font-semibold text-gray-500">{metric.message}</p> : null}
    </div>
  );
}

export default function FounderToolsMarketingCreate() {
  const { bootstrap, activeStep } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const autofillStartFetcher = useFetcher<{ autofillRunId?: string | null; status?: string; error?: string }>();
  const autofillRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const baselineStartFetcher = useFetcher<{ baselineRunId?: string | null; status?: string; error?: string }>();
  const baselineRunFetcher = useFetcher<VibeMarketingRunSummary>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const startupDefaults = useMemo(() => startupDefaultsFromBootstrap(bootstrap), [bootstrap]);
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
  const [startupValues, setStartupValues] = useState<StartupDetailsFormValues>(startupDefaults);
  const [autofillRunId, setAutofillRunId] = useState<string | null>(null);
  const [autofillRequestSnapshot, setAutofillRequestSnapshot] = useState<StartupDetailsFormValues | null>(null);
  const [baselineRunId, setBaselineRunId] = useState<string | null>(null);
  const [appliedAutofillRunId, setAppliedAutofillRunId] = useState<string | null>(null);
  const [autofilledFields, setAutofilledFields] = useState<StartupDetailsField[]>([]);
  const completedSteps = bootstrap.guidedSteps.filter((step) => step.passed).map((step) => step.key);
  const latestScan = bootstrap.latestRuns.find((run) => ["repo_scan", "content_factory_scan"].includes(run.workflow));
  const latestDiscovery = bootstrap.latestRuns.find((run) => ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(run.workflow));
  const latestArticle = bootstrap.latestRuns.find((run) => ["article_generation", "content_factory_article"].includes(run.workflow));
  const latestBaselineRun = bootstrap.latestRuns.find((run) => run.workflow === "website_baseline");
  const autofillStartData = autofillStartFetcher.data;
  const autofillRun = autofillRunFetcher.data as VibeMarketingRunSummary | undefined;
  const baselineStartData = baselineStartFetcher.data;
  const baselineRun = baselineRunFetcher.data as VibeMarketingRunSummary | undefined;
  const autofillPending = autofillStartFetcher.state !== "idle";
  const baselinePending = baselineStartFetcher.state !== "idle";
  const autofillPolling = Boolean(autofillRunId && (!autofillRun || ["queued", "running"].includes(autofillRun.status)));
  const baselinePolling = Boolean(baselineRunId && (!baselineRun || ["queued", "running"].includes(baselineRun.status)));
  const canStartAutofill = Boolean(startupValues.companyName.trim() && startupValues.domain.trim()) && !autofillPending && !autofillPolling;
  const effectiveBaseline = baselineFromRun(baselineRun) ?? bootstrap.websiteBaseline;
  const baselineMetrics = effectiveBaseline.metrics ?? {};
  const canStartBaseline = Boolean(bootstrap.organization.domain || startupValues.domain.trim()) && !baselinePending && !baselinePolling;
  const startAutofill = () => {
    const snapshot = { ...startupValues };
    setAutofillRequestSnapshot(snapshot);
    const formData = new FormData();
    formData.set("intent", "start-autofill");
    for (const [field, value] of Object.entries(snapshot)) {
      formData.set(field, value);
    }
    autofillStartFetcher.submit(formData, { method: "POST" });
  };
  const startBaseline = () => {
    const formData = new FormData();
    formData.set("intent", "start-baseline");
    baselineStartFetcher.submit(formData, { method: "POST" });
  };
  const applyAutofillField = (field: AutofillApplyField, mode: AutofillApplyMode) => {
    if (mode === "keep") return;
    const autofill = extractAutofill(autofillRun);
    if (!autofill) return;
    const researchedValues: Record<AutofillApplyField, string> = {
      brandName: autofill.brandName ?? "",
      companyContext: autofill.companyContext ?? "",
      competitors: (autofill.directCompetitors?.length ? autofill.directCompetitors : autofill.competitorSuggestions ?? [])
        .map((competitor) => competitor.domain || competitor.name)
        .filter(Boolean)
        .join("\n"),
      seedKeywords: (autofill.seedKeywords ?? []).join("\n"),
    };
    const suggestion = researchedValues[field]?.trim();
    if (!suggestion) return;
    setStartupValues((current) => {
      if (mode === "replace") {
        return { ...current, [field]: suggestion };
      }
      const existing = String(current[field] ?? "").trim();
      if (!existing) return { ...current, [field]: suggestion };
      if (existing.toLowerCase().includes(suggestion.toLowerCase())) return current;
      const separator = field === "companyContext" ? "\n\n" : "\n";
      return { ...current, [field]: `${existing}${separator}${suggestion}` };
    });
    setAutofilledFields((current) => (current.includes(field) ? current : [...current, field]));
  };

  useEffect(() => {
    if (activeCompanyKeyRef.current === activeCompanyKey) return;
    activeCompanyKeyRef.current = activeCompanyKey;
    setStartupValues(startupDefaults);
    setAutofillRequestSnapshot(null);
    setAutofilledFields([]);
    setAutofillRunId(null);
    setBaselineRunId(null);
    setAppliedAutofillRunId(null);
  }, [activeCompanyKey, startupDefaults, startupDefaultsSignature]);

  useEffect(() => {
    if (autofillStartData?.autofillRunId) {
      setAutofillRunId(autofillStartData.autofillRunId);
      setAppliedAutofillRunId(null);
      setAutofilledFields([]);
    }
  }, [autofillStartData?.autofillRunId]);

  useEffect(() => {
    if (baselineStartData?.baselineRunId) {
      setBaselineRunId(baselineStartData.baselineRunId);
    }
  }, [baselineStartData?.baselineRunId]);

  useEffect(() => {
    if (!autofillRunId) return;
    if (autofillRun && !["queued", "running"].includes(autofillRun.status)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(autofillRunId)}`;
    autofillRunFetcher.load(href);
    const timer = window.setInterval(() => {
      autofillRunFetcher.load(href);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [autofillRunId, autofillRun?.status]);

  useEffect(() => {
    if (!baselineRunId) return;
    if (baselineRun && !["queued", "running"].includes(baselineRun.status)) return;
    const href = `/founder-tools/marketing/autofill-runs/${encodeURIComponent(baselineRunId)}`;
    baselineRunFetcher.load(href);
    const timer = window.setInterval(() => {
      baselineRunFetcher.load(href);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [baselineRunId, baselineRun?.status]);

  useEffect(() => {
    if (!autofillRunId || appliedAutofillRunId === autofillRunId || autofillRun?.status !== "completed") return;
    const autofill = extractAutofill(autofillRun);
    if (!autofill) return;
    if (autofillRequestSnapshot && !startupValuesAreEqual(startupValues, autofillRequestSnapshot)) {
      setAutofilledFields([]);
      setAppliedAutofillRunId(autofillRunId);
      return;
    }

    setStartupValues((current) => {
      const updates: Partial<StartupDetailsFormValues> = {};
      const applied: StartupDetailsField[] = [];
      if (isBlank(current.brandName) && autofill.brandName) {
        updates.brandName = autofill.brandName;
        applied.push("brandName");
      }
      if (isBlank(current.companyContext) && autofill.companyContext) {
        updates.companyContext = autofill.companyContext;
        applied.push("companyContext");
      }
      if (listTextIsBlank(current.competitors) && autofill.competitors?.length) {
        updates.competitors = autofill.competitors.join("\n");
        applied.push("competitors");
      }
      if (listTextIsBlank(current.seedKeywords) && autofill.seedKeywords?.length) {
        updates.seedKeywords = autofill.seedKeywords.join("\n");
        applied.push("seedKeywords");
      }
      setAutofilledFields(applied);
      return Object.keys(updates).length ? { ...current, ...updates } : current;
    });
    setAppliedAutofillRunId(autofillRunId);
  }, [appliedAutofillRunId, autofillRequestSnapshot, autofillRun, autofillRunId, startupValues]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <VibeMarketingStepper activeStep={activeStep} completedSteps={completedSteps} />

      {actionData?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <main className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          {activeStep === "startupDetails" ? (
            <>
              <PanelHeader
                title="Startup details"
                description="This is the shared company profile used by Vibe Raising monthly updates and Vibe Marketing article generation."
                passed={Boolean(bootstrap.checks.websiteProfile?.passed)}
              />
              <Form method="POST" className="space-y-6">
                <FounderStartupDetailsStep
                  defaults={{
                    companyName: bootstrap.company.name,
                    domain: bootstrap.company.domain ?? bootstrap.organization.domain,
                    companyLinkedInUrl: bootstrap.organization.companyLinkedInUrl ?? bootstrap.company.companyLinkedInUrl,
                    location: bootstrap.company.location,
                    abn: bootstrap.company.abn,
                    brandName: bootstrap.settings.brandName ?? bootstrap.organization.name,
                    companyContext: bootstrap.settings.companyContext,
                    competitors: bootstrap.organization.competitors,
                    seedKeywords: bootstrap.organization.seedKeywords,
                    founderNames: bootstrap.startupProfile.founderNames,
                    stage: bootstrap.startupProfile.stage,
                    notes: bootstrap.startupProfile.notes,
                  }}
                  values={startupValues}
                  onValueChange={(field, value) => setStartupValues((current) => ({ ...current, [field]: value }))}
                  autofilledFields={autofilledFields}
                  afterBrandName={
                    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-black text-gray-950">Company profile research</p>
                          <p className="mt-1 text-sm text-gray-600">Crawl the public website and search results to fill blank marketing fields.</p>
                        </div>
                        <button
                          type="button"
                          onClick={startAutofill}
                          disabled={!canStartAutofill}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-bold text-violet-700 shadow-sm transition hover:bg-violet-50 disabled:opacity-50"
                        >
                          {autofillPending || autofillPolling ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <SparklesIcon className="h-4 w-4" />}
                          Research company profile
                        </button>
                      </div>
                      {autofillStartData?.error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                          {autofillStartData.error}
                        </div>
                      ) : null}
                      <AutofillStatusCard run={autofillRun} runId={autofillRunId} pending={autofillPending} />
                      <AutofillReviewPanel run={autofillRun} values={startupValues} autofilledFields={autofilledFields} onApplyField={applyAutofillField} />
                    </div>
                  }
                />
                <button type="submit" name="intent" value="save-startup-details" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                  Save and continue
                </button>
              </Form>
            </>
          ) : null}

          {activeStep === "baseline" ? (
            <>
              <PanelHeader
                title="Website baseline"
                description="Capture the current website health, performance, search visibility, authority, AI visibility, and traffic data before article generation starts."
                passed={Boolean(bootstrap.checks.baseline?.passed || effectiveBaseline.passed)}
              />

              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-white p-2 text-violet-700 ring-1 ring-gray-200">
                        <GlobeAltIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-950">{bootstrap.organization.domain || startupValues.domain || "No domain saved"}</p>
                        <p className="mt-1 text-sm text-gray-600">{baselineSummaryText(effectiveBaseline.summary)}</p>
                        {effectiveBaseline.collectedAt ? (
                          <p className="mt-1 text-xs font-semibold text-gray-500">
                            Collected {new Date(effectiveBaseline.collectedAt).toLocaleDateString()}
                            {effectiveBaseline.stale ? " · stale" : ""}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={startBaseline}
                        disabled={!canStartBaseline}
                        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                      >
                        {baselinePending || baselinePolling ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <ChartBarIcon className="h-4 w-4" />}
                        {effectiveBaseline.overallScore === null || effectiveBaseline.status === "missing" ? "Run baseline" : "Rerun baseline"}
                      </button>
                      <Form method="POST">
                        <input type="hidden" name="intent" value="skip-baseline" />
                        <input type="hidden" name="reason" value="Skipped during onboarding" />
                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50">
                          Skip for now
                        </button>
                      </Form>
                    </div>
                  </div>
                  {baselineStartData?.error ? (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {baselineStartData.error}
                    </div>
                  ) : null}
                  {baselineRunId ? (
                    <div className="mt-3 rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm text-violet-900">
                      <div className="flex items-center gap-2 font-bold">
                        {baselinePending || baselinePolling ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                        <span>
                          {baselineRun?.status === "completed"
                            ? "Baseline ready"
                            : baselineRun?.status === "failed" || baselineRun?.status === "blocked"
                              ? "Baseline needs attention"
                              : "Collecting baseline"}
                        </span>
                      </div>
                      {baselineRun?.errors?.length ? <p className="mt-2 font-semibold text-red-700">{baselineRun.errors[0]}</p> : null}
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-black text-gray-950">Overall</p>
                      <SourceStatusBadge status={effectiveBaseline.status === "completed" ? "measured" : effectiveBaseline.status} />
                    </div>
                    <p className="mt-3 text-3xl font-black text-gray-950">{typeof effectiveBaseline.overallScore === "number" ? effectiveBaseline.overallScore : "—"}</p>
                  </div>
                  <BaselineMetricCard label="Technical health" metric={baselineMetrics.technicalHealth} />
                  <BaselineMetricCard label="Lighthouse" metric={baselineMetrics.lighthouse} />
                  <BaselineMetricCard label="Organic search" metric={baselineMetrics.organicSearch} />
                  <BaselineMetricCard label="AI visibility" metric={baselineMetrics.aiVisibility} />
                  <BaselineMetricCard label="Authority" metric={baselineMetrics.authority} />
                  <BaselineMetricCard label="Traffic/users" metric={baselineMetrics.traffic} />
                </div>

                {bootstrap.googleBaselineConnection?.hasBaselineScopes ? null : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-none text-amber-600" />
                      <div>
                        <p className="font-black">Verified traffic needs Google</p>
                        <p className="mt-1 font-semibold">Connect Search Console or GA4 to add clicks, impressions, average position, and active users.</p>
                        {bootstrap.googleBaselineConnection?.connectUrl ? (
                          <a href={bootstrap.googleBaselineConnection.connectUrl} className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200">
                            Connect Google
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}

                {effectiveBaseline.recommendations?.length ? (
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <p className="text-sm font-black text-gray-950">Recommended fixes</p>
                    <div className="mt-3 space-y-2">
                      {effectiveBaseline.recommendations.slice(0, 4).map((recommendation, index) => (
                        <div key={`${recommendation.title ?? recommendation.source ?? index}`} className="rounded-lg bg-gray-50 px-3 py-2">
                          <p className="text-sm font-bold text-gray-950">{String(recommendation.title ?? "Review baseline recommendation")}</p>
                          {recommendation.detail ? <p className="mt-1 text-xs font-semibold text-gray-600">{String(recommendation.detail)}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <Link to="/founder-tools/marketing/create?step=github" className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black">
                  Continue to GitHub
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : null}

          {activeStep === "github" ? (
            <>
              <PanelHeader
                title="Connect GitHub"
                description="Vibe Marketing needs repository access to detect your article system and open previewable article PRs."
                passed={Boolean(bootstrap.checks.github?.passed)}
              />
              <Form method="POST" className="space-y-5">
                <input type="hidden" name="intent" value="connect-github" />
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Repository</span>
                  <input
                    name="githubRepo"
                    defaultValue={bootstrap.settings.githubRepo ?? ""}
                    placeholder="owner/repo"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </label>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CodeBracketIcon className="h-4 w-4" />}
                  Connect GitHub
                </button>
              </Form>
            </>
          ) : null}

          {activeStep === "scan" || activeStep === "articleSystem" ? (
            <>
              <PanelHeader
                title={activeStep === "scan" ? "Scan repository" : "Prepare article system"}
                description="The scan detects your framework, build commands, article directories, registries, components, and safe publish targets."
                passed={activeStep === "scan" ? Boolean(bootstrap.checks.scan?.passed) : Boolean(bootstrap.checks.scaffold?.passed)}
              />
              {latestScan ? (
                <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-sm font-black text-gray-950">Latest scan: {latestScan.status.replace(/_/g, " ")}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">{latestScan.currentStep ?? latestScan.runId}</p>
                  <Link to={`/founder-tools/marketing/runs/${latestScan.runId}`} className="mt-3 inline-flex text-sm font-bold text-violet-700 hover:text-violet-900">
                    View scan run
                  </Link>
                </div>
              ) : null}
              <Form method="POST">
                <input type="hidden" name="intent" value="start-scan" />
                <input type="hidden" name="githubRepo" value={bootstrap.settings.githubRepo ?? ""} />
                <button type="submit" disabled={isSubmitting || !bootstrap.settings.githubRepo} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                  Run repository scan
                </button>
              </Form>
            </>
          ) : null}

          {activeStep === "research" ? (
            <>
              <PanelHeader
                title="Research topics"
                description="Discovery uses your company context, competitors, and seed keywords to find article candidates."
                passed={Boolean(bootstrap.checks.research?.passed)}
              />
              <div className="mb-5 grid gap-3 lg:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Seed keywords</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">{bootstrap.organization.seedKeywords.join(", ") || "None saved yet"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Competitors</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">{bootstrap.organization.competitors.join(", ") || "None saved yet"}</p>
                </div>
              </div>
              <Form method="POST">
                <input type="hidden" name="intent" value="start-discovery" />
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <MagnifyingGlassIcon className="h-4 w-4" />}
                  Start topic research
                </button>
              </Form>
              {latestDiscovery ? <Link to={`/founder-tools/marketing/runs/${latestDiscovery.runId}`} className="mt-4 inline-flex text-sm font-bold text-violet-700">View latest research run</Link> : null}
            </>
          ) : null}

          {activeStep === "chooseArticle" ? (
            <>
              <PanelHeader
                title="Choose article"
                description="Pick a discovered topic or enter a known keyword and title angle."
                passed={Boolean(latestArticle)}
              />
              {!bootstrap.checks.baseline?.passed ? (
                <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  Run or skip the website baseline before generating an article.
                  <Link to="/founder-tools/marketing/create?step=baseline" className="ml-2 font-black text-amber-900 underline">
                    Open baseline
                  </Link>
                </div>
              ) : null}
              <Form method="POST" className="space-y-5">
                <input type="hidden" name="intent" value="start-article" />
                <input type="hidden" name="sourceDiscoveryRunId" value={latestDiscovery?.runId ?? ""} />
                <div className="grid gap-3">
                  {bootstrap.topicCandidates.slice(0, 5).map((candidate, index) => (
                    <label key={candidate.id} className="flex cursor-pointer gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-violet-50/60">
                      <input type="radio" name="topic" value={candidate.keyword} defaultChecked={index === 0} className="mt-1 h-4 w-4 text-violet-600" />
                      <span>
                        <span className="block text-sm font-black text-gray-950">{candidate.title}</span>
                        <span className="mt-1 block text-xs font-semibold text-gray-500">{candidate.keyword}</span>
                        {candidate.reason ? <span className="mt-2 block text-sm text-gray-600">{candidate.reason}</span> : null}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-gray-700">Custom keyword</span>
                    <input name="targetKeyword" placeholder="Optional keyword override" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-gray-700">Delivery mode</span>
                    <select name="deliveryMode" defaultValue={bootstrap.settings.articleDeliveryMode ?? "publish_code"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
                      <option value="publish_code">Publish code</option>
                      <option value="content_only">Content only</option>
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Article context</span>
                  <textarea name="articleContext" rows={4} placeholder="Add any angle, product detail, proof point, or audience note." className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                </label>
                <button type="submit" disabled={isSubmitting || !bootstrap.checks.baseline?.passed} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <RocketLaunchIcon className="h-4 w-4" />}
                  Generate article
                </button>
              </Form>
            </>
          ) : null}

          {["writeCheck", "editArticle", "reviewPublish"].includes(activeStep) ? (
            <>
              <PanelHeader
                title={activeStep === "editArticle" ? "Edit article" : activeStep === "reviewPublish" ? "Review publish" : "Write and check"}
                description="The run workspace shows generation status, verification evidence, revision controls, preview links, PR links, and publish approval."
                passed={activeStep === "reviewPublish" ? Boolean(bootstrap.checks.publish?.passed) : Boolean(bootstrap.checks.write?.passed)}
              />
              {latestArticle ? (
                <Link to={`/founder-tools/marketing/runs/${latestArticle.runId}`} className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black">
                  Open article run
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/founder-tools/marketing/create?step=chooseArticle" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700">
                  Choose an article first
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              )}
            </>
          ) : null}

          {activeStep === "dailyAutomation" ? (
            <>
              <PanelHeader
                title="Daily automation"
                description="Daily generation creates candidates and keeps human approval before final publish by default."
                passed={Boolean(bootstrap.checks.dailyAutomation?.passed)}
              />
              <Form method="POST" className="space-y-5">
                <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                  <input name="dailyDiscoveryEnabled" type="checkbox" defaultChecked={bootstrap.settings.dailyDiscoveryEnabled} className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600" />
                  <span>
                    <span className="block text-sm font-black text-gray-950">Enable daily candidate generation</span>
                    <span className="mt-1 block text-sm text-gray-600">Articles still require review and approval before publish.</span>
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-gray-700">Timezone</span>
                  <input name="defaultTimezone" defaultValue={bootstrap.settings.defaultTimezone ?? "Australia/Melbourne"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" name="intent" value="save-daily" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
                    Save daily settings
                  </button>
                  <button type="submit" name="intent" value="daily-replay" disabled={isSubmitting || !bootstrap.checks.dailyAutomation?.passed} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60">
                    Run today now
                  </button>
                </div>
              </Form>
            </>
          ) : null}
        </main>

        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Current company</p>
            <p className="mt-2 text-lg font-black text-gray-950">{bootstrap.company.name}</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">{bootstrap.organization.domain || "No domain saved"}</p>
            <div className="mt-4 space-y-2">
              {Object.entries(bootstrap.checks).map(([key, check]) => (
                <div key={key} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-gray-600">{key.replace(/[A-Z]/g, " $&")}</span>
                  <span className={clsx("h-2.5 w-2.5 rounded-full", check.passed ? "bg-emerald-500" : "bg-gray-300")} />
                </div>
              ))}
            </div>
          </div>
          <MarketingEvidencePanel run={latestArticle ?? latestScan ?? null} evidence={bootstrap.publishEvidence} />
        </div>
      </div>
    </div>
  );
}
