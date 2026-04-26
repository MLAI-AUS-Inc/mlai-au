import { createApiClient, shouldUseDevBackendFallback, shouldUseDevBackendStub } from "~/lib/api";
import type {
  VibeMarketingBootstrap,
  VibeMarketingGuidedStep,
  VibeMarketingPublishEvidence,
  VibeMarketingRunSummary,
  VibeMarketingStepState,
  VibeMarketingStartupProfile,
  VibeMarketingWebsiteBaseline,
  VibeMarketingGoogleBaselineConnection,
  VibeMarketingTopicCandidate,
} from "~/types/vibe-marketing";

const BASE_PATH = "/api/v1/vibe-marketing";

function asNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeStep(raw: unknown): VibeMarketingStepState {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    key: asNullableString(payload.key) ?? asNullableString(payload.stepKey) ?? "step",
    name: asNullableString(payload.name) ?? asNullableString(payload.key) ?? "Step",
    required: Boolean(payload.required ?? true),
    status: asNullableString(payload.status) ?? "pending",
    attempts: Number(payload.attempts ?? 0) || 0,
    message: asNullableString(payload.message) ?? undefined,
    error: asNullableString(payload.error) ?? undefined,
    artifacts: Array.isArray(payload.artifacts) ? payload.artifacts : [],
    startedAt: asNullableString(payload.startedAt),
    completedAt: asNullableString(payload.completedAt),
  };
}

export function normalizeMarketingRun(raw: unknown): VibeMarketingRunSummary {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    runId: asNullableString(payload.runId) ?? asNullableString(payload.run_id) ?? "",
    workflow: asNullableString(payload.workflow) ?? "",
    domain: asNullableString(payload.domain) ?? "",
    githubRepo: asNullableString(payload.githubRepo) ?? asNullableString(payload.github_repo),
    status: asNullableString(payload.status) ?? "queued",
    currentStep: asNullableString(payload.currentStep) ?? asNullableString(payload.current_step),
    approvalState: asNullableString(payload.approvalState) ?? asNullableString(payload.approval_state),
    resumeAvailable: Boolean(payload.resumeAvailable ?? payload.resume_available),
    createdAt: asNullableString(payload.createdAt) ?? asNullableString(payload.created_at) ?? undefined,
    updatedAt: asNullableString(payload.updatedAt) ?? asNullableString(payload.updated_at) ?? undefined,
    stepOrder: Array.isArray(payload.stepOrder) ? payload.stepOrder.map(String) : [],
    steps: Array.isArray(payload.steps) ? payload.steps.map(normalizeStep) : [],
    warnings: asStringList(payload.warnings),
    errors: asStringList(payload.errors),
    artifacts: Array.isArray(payload.artifacts) ? payload.artifacts : [],
    previewUrl: asNullableString(payload.previewUrl) ?? asNullableString(payload.preview_url),
    prUrl: asNullableString(payload.prUrl) ?? asNullableString(payload.pr_url),
    routePath: asNullableString(payload.routePath) ?? asNullableString(payload.route_path),
    diagnostics:
      payload.diagnostics && typeof payload.diagnostics === "object"
        ? (payload.diagnostics as Record<string, unknown>)
        : {},
    result:
      payload.result && typeof payload.result === "object"
        ? (payload.result as Record<string, unknown>)
        : {},
  };
}

function normalizeBootstrap(raw: unknown): VibeMarketingBootstrap {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const organization = (payload.organization && typeof payload.organization === "object"
    ? payload.organization
    : {}) as Record<string, unknown>;
  const company = (payload.company && typeof payload.company === "object"
    ? payload.company
    : {}) as Record<string, unknown>;
  const settings = (payload.settings && typeof payload.settings === "object"
    ? payload.settings
    : {}) as Record<string, unknown>;
  const startupProfile = (payload.startupProfile && typeof payload.startupProfile === "object"
    ? payload.startupProfile
    : payload.startup_profile && typeof payload.startup_profile === "object"
      ? payload.startup_profile
      : {}) as Record<string, unknown>;
  const latestRuns = Array.isArray(payload.latestRuns)
    ? payload.latestRuns.map(normalizeMarketingRun)
    : [];
  const rawLatestRunsByWorkflow =
    payload.latestRunsByWorkflow && typeof payload.latestRunsByWorkflow === "object"
      ? (payload.latestRunsByWorkflow as Record<string, unknown>)
      : {};
  const latestRunsByWorkflow: Record<string, VibeMarketingRunSummary> = {};
  for (const [key, value] of Object.entries(rawLatestRunsByWorkflow)) {
    latestRunsByWorkflow[key] = normalizeMarketingRun(value);
  }

  return {
    company: {
      id: String(company.id ?? ""),
      name: asNullableString(company.name) ?? "Company",
      domain: asNullableString(company.domain),
      companyLinkedInUrl: asNullableString(company.companyLinkedInUrl) ?? asNullableString(company.company_linkedin_url),
      location: asNullableString(company.location),
      abn: asNullableString(company.abn),
      organizationId: Number(company.organizationId ?? company.organization_id ?? 0) || null,
    },
    organization: {
      id: Number(organization.id ?? 0) || null,
      name: asNullableString(organization.name) ?? asNullableString(company.name) ?? "Company",
      domain: asNullableString(organization.domain) ?? asNullableString(company.domain) ?? "",
      companyLinkedInUrl:
        asNullableString(organization.companyLinkedInUrl) ??
        asNullableString(organization.company_linkedin_url) ??
        asNullableString(company.companyLinkedInUrl) ??
        asNullableString(company.company_linkedin_url),
      competitors: asStringList(organization.competitors),
      seedKeywords: asStringList(organization.seedKeywords ?? organization.seed_keywords),
    },
    settings: {
      brandName: asNullableString(settings.brandName) ?? asNullableString(settings.brand_name),
      companyContext: asNullableString(settings.companyContext) ?? asNullableString(settings.company_context),
      articleDeliveryMode:
        asNullableString(settings.articleDeliveryMode) ??
        asNullableString(settings.article_delivery_mode) ??
        "publish_code",
      githubRepo: asNullableString(settings.githubRepo) ?? asNullableString(settings.github_repo),
      dailyDiscoveryEnabled: Boolean(settings.dailyDiscoveryEnabled ?? settings.daily_discovery_enabled),
      dailyDiscoveryPriority: Number(settings.dailyDiscoveryPriority ?? 0) || 0,
      defaultTimezone: asNullableString(settings.defaultTimezone) ?? asNullableString(settings.default_timezone),
      githubConnectionState:
        asNullableString(settings.githubConnectionState) ??
        asNullableString(settings.github_connection_state),
    },
    startupProfile: normalizeStartupProfile(startupProfile),
    websiteBaseline: normalizeWebsiteBaseline(payload.websiteBaseline ?? payload.website_baseline),
    googleBaselineConnection: normalizeGoogleBaselineConnection(
      payload.googleBaselineConnection ?? payload.google_baseline_connection,
    ),
    checks:
      payload.checks && typeof payload.checks === "object"
        ? (payload.checks as VibeMarketingBootstrap["checks"])
        : {},
    latestRuns,
    latestRunsByWorkflow,
    topicCandidates: Array.isArray(payload.topicCandidates)
      ? payload.topicCandidates.map(normalizeTopicCandidate)
      : [],
    publishEvidence: normalizePublishEvidence(payload.publishEvidence),
    guidedSteps: Array.isArray(payload.guidedSteps)
      ? payload.guidedSteps.map(normalizeGuidedStep)
      : [],
    currentGuidedStep:
      asNullableString(payload.currentGuidedStep) ??
      asNullableString(payload.current_guided_step),
    recommendedNextAction:
      payload.recommendedNextAction && typeof payload.recommendedNextAction === "object"
        ? (payload.recommendedNextAction as VibeMarketingBootstrap["recommendedNextAction"])
        : undefined,
  };
}

function normalizeStartupProfile(payload: Record<string, unknown>): VibeMarketingStartupProfile {
  return {
    founderNames: asStringList(payload.founderNames ?? payload.founder_names),
    stage: asNullableString(payload.stage),
    notes: asNullableString(payload.notes),
    companyAliases: asStringList(payload.companyAliases ?? payload.company_aliases),
    domainAliases: asStringList(payload.domainAliases ?? payload.domain_aliases),
    competitorDomains: asStringList(payload.competitorDomains ?? payload.competitor_domains),
    positiveKeywords: asStringList(payload.positiveKeywords ?? payload.positive_keywords),
  };
}

function normalizeTopicCandidate(raw: unknown): VibeMarketingTopicCandidate {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const keyword = asNullableString(payload.keyword) ?? asNullableString(payload.target_keyword) ?? "Topic";
  return {
    id: String(payload.id ?? keyword),
    keyword,
    title: asNullableString(payload.title) ?? asNullableString(payload.angle) ?? keyword,
    reason: asNullableString(payload.reason),
    source: asNullableString(payload.source),
    intent: payload.intent,
    difficulty: payload.difficulty,
    opportunityScore: payload.opportunityScore ?? payload.opportunity_score,
    volume: payload.volume,
  };
}

function normalizePublishEvidence(raw: unknown): VibeMarketingPublishEvidence {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    runId: asNullableString(payload.runId) ?? asNullableString(payload.run_id),
    status: asNullableString(payload.status),
    approvalState: asNullableString(payload.approvalState) ?? asNullableString(payload.approval_state),
    previewUrl: asNullableString(payload.previewUrl) ?? asNullableString(payload.preview_url),
    prUrl: asNullableString(payload.prUrl) ?? asNullableString(payload.pr_url),
    routePath: asNullableString(payload.routePath) ?? asNullableString(payload.route_path),
    screenshots: Array.isArray(payload.screenshots) ? payload.screenshots : [],
    changedFiles: Array.isArray(payload.changedFiles) ? payload.changedFiles : [],
    warnings: asStringList(payload.warnings),
    diagnostics:
      payload.diagnostics && typeof payload.diagnostics === "object"
        ? (payload.diagnostics as Record<string, unknown>)
        : {},
  };
}

function normalizeGuidedStep(raw: unknown): VibeMarketingGuidedStep {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    key: asNullableString(payload.key) ?? "startupDetails",
    label: asNullableString(payload.label) ?? "Step",
    status: asNullableString(payload.status) ?? "pending",
    passed: Boolean(payload.passed),
    href: asNullableString(payload.href) ?? undefined,
  };
}

function normalizeWebsiteBaseline(raw: unknown): VibeMarketingWebsiteBaseline {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const summary = payload.summary;
  return {
    id: Number(payload.id ?? 0) || null,
    runId: asNullableString(payload.runId) ?? asNullableString(payload.run_id),
    domain: asNullableString(payload.domain),
    status: asNullableString(payload.status) ?? "missing",
    passed: Boolean(payload.passed),
    stale: Boolean(payload.stale),
    skipped: Boolean(payload.skipped),
    skippedAt: asNullableString(payload.skippedAt) ?? asNullableString(payload.skipped_at),
    skipReason: asNullableString(payload.skipReason) ?? asNullableString(payload.skip_reason),
    collectedAt: asNullableString(payload.collectedAt) ?? asNullableString(payload.collected_at),
    overallScore:
      typeof payload.overallScore === "number"
        ? payload.overallScore
        : typeof payload.overall_score === "number"
          ? payload.overall_score
          : null,
    summary:
      typeof summary === "string" || (summary && typeof summary === "object")
        ? (summary as VibeMarketingWebsiteBaseline["summary"])
        : null,
    metrics:
      payload.metrics && typeof payload.metrics === "object"
        ? (payload.metrics as VibeMarketingWebsiteBaseline["metrics"])
        : {},
    sourceStatus:
      payload.sourceStatus && typeof payload.sourceStatus === "object"
        ? (payload.sourceStatus as Record<string, string>)
        : payload.source_status && typeof payload.source_status === "object"
          ? (payload.source_status as Record<string, string>)
          : {},
    recommendations: Array.isArray(payload.recommendations)
      ? (payload.recommendations as Array<Record<string, unknown>>)
      : [],
  };
}

function normalizeGoogleBaselineConnection(raw: unknown): VibeMarketingGoogleBaselineConnection {
  const payload = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    connected: Boolean(payload.connected),
    hasBaselineScopes: Boolean(payload.hasBaselineScopes ?? payload.has_baseline_scopes),
    email: asNullableString(payload.email),
    status: asNullableString(payload.status),
    connectUrl: asNullableString(payload.connectUrl) ?? asNullableString(payload.connect_url),
  };
}

const DEV_BOOTSTRAP: VibeMarketingBootstrap = {
  company: {
    id: "dev-company",
    name: "",
    domain: "",
    companyLinkedInUrl: null,
    organizationId: 1,
  },
  organization: {
    id: 1,
    name: "",
    domain: "",
    companyLinkedInUrl: null,
    competitors: [],
    seedKeywords: [],
  },
  settings: {
    brandName: null,
    companyContext: null,
    articleDeliveryMode: "publish_code",
    githubRepo: null,
    dailyDiscoveryEnabled: false,
    githubConnectionState: null,
  },
  startupProfile: {
    founderNames: [],
    stage: null,
    notes: null,
  },
  websiteBaseline: {
    status: "missing",
    passed: false,
    domain: "",
    collectedAt: null,
    overallScore: null,
    summary: { text: "Run a baseline to capture website performance before generating articles." },
    sourceStatus: {},
    metrics: {},
    recommendations: [],
  },
  googleBaselineConnection: {
    connected: false,
    hasBaselineScopes: false,
    status: "needs_connection",
    connectUrl: "http://localhost:8000/integrations/connect/google?scope=website_baseline&next=/founder-tools/marketing/create?step=baseline",
  },
  checks: {},
  latestRuns: [],
  latestRunsByWorkflow: {},
  topicCandidates: [],
  publishEvidence: {},
  guidedSteps: [],
  currentGuidedStep: "startupDetails",
  recommendedNextAction: { key: "startupDetails", label: "Add startup details" },
};

const DEV_RUN_SNAPSHOTS = new Map<string, Record<string, unknown>>();

function primaryBodyString(body: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = asNullableString(body[key]);
    if (value) return value;
  }
  return "";
}

function existingFieldFromBody(body: Record<string, unknown>, key: string): unknown {
  const existingFields =
    body.existingFields && typeof body.existingFields === "object"
      ? (body.existingFields as Record<string, unknown>)
      : {};
  return existingFields[key] ?? body[key];
}

function publicUrlForDomain(domain: string) {
  if (!domain) return null;
  return domain.startsWith("http://") || domain.startsWith("https://") ? domain : `https://${domain}`;
}

function devAutofillResultFromSnapshot(runId: string, snapshot: Record<string, unknown> = {}) {
  const companyName = primaryBodyString(snapshot, "companyName", "company_name");
  const domain = primaryBodyString(snapshot, "domain");
  const brandName = primaryBodyString(snapshot, "brandName", "brand_name") || companyName || null;
  const companyLinkedInUrl =
    primaryBodyString(snapshot, "companyLinkedInUrl", "company_linkedin_url") ||
    asNullableString(existingFieldFromBody(snapshot, "companyLinkedInUrl")) ||
    null;
  const companyContext = asNullableString(existingFieldFromBody(snapshot, "companyContext"));
  const competitors = asStringList(existingFieldFromBody(snapshot, "competitors"));
  const seedKeywords = asStringList(existingFieldFromBody(snapshot, "seedKeywords"));
  const websiteUrl = publicUrlForDomain(domain);
  const sources = [
    websiteUrl ? { url: websiteUrl, title: domain || companyName || "Company website", type: "website" } : null,
    companyLinkedInUrl ? { url: companyLinkedInUrl, title: "LinkedIn company profile", type: "linkedin" } : null,
  ].filter(Boolean);
  const warnings = [
    "Local stub only: no live website crawl, public web search, or LinkedIn similarity research was performed.",
    !companyContext ? "No company context suggestion was generated because the local stub only echoes submitted form context." : null,
    competitors.length === 0 ? "No competitor suggestions were generated in local stub mode." : null,
    seedKeywords.length === 0 ? "No seed keyword suggestions were generated in local stub mode." : null,
  ].filter(Boolean);

  return normalizeMarketingRun({
    runId,
    workflow: "startup_autofill",
    domain,
    status: "completed",
    currentStep: "finalize",
    stepOrder: [
      "resolve_company_identity",
      "crawl_owned_web",
      "research_public_web",
      "research_linkedin_public",
      "discover_competitor_candidates",
      "rank_competitors",
      "generate_keyword_landscape",
      "synthesize_company_profile",
      "finalize",
    ],
    steps: [
      { key: "resolve_company_identity", status: "completed", attempts: 1, artifacts: [] },
      { key: "crawl_owned_web", status: "completed", attempts: 1, artifacts: [] },
      { key: "research_public_web", status: "completed", attempts: 1, artifacts: [] },
      { key: "research_linkedin_public", status: "completed", attempts: 1, artifacts: [] },
      { key: "discover_competitor_candidates", status: "completed", attempts: 1, artifacts: [] },
      { key: "rank_competitors", status: "completed", attempts: 1, artifacts: [] },
      { key: "generate_keyword_landscape", status: "completed", attempts: 1, artifacts: [] },
      { key: "synthesize_company_profile", status: "completed", attempts: 1, artifacts: [] },
      { key: "finalize", status: "completed", attempts: 1, artifacts: [] },
    ],
    result: {
      autofill: {
        brandName,
        companyLinkedInUrl,
        companyContext,
        directCompetitors: competitors.map((competitor) => ({
          name: competitor,
          domain: competitor,
          type: "direct",
          reason: "Submitted in the current form before local stub research started.",
          evidence: ["Submitted form value"],
          confidence: "user_provided",
        })),
        seoCompetitors: [],
        adjacentOrganizations: [],
        competitors,
        competitorGroups: {
          directCompetitors: competitors.map((competitor) => ({
            name: competitor,
            domain: competitor,
            type: "direct",
            reason: "Submitted in the current form before local stub research started.",
            evidence: ["Submitted form value"],
            confidence: "user_provided",
          })),
          seoCompetitors: [],
          adjacentOrganizations: [],
        },
        seedKeywords,
        keywordGroups: seedKeywords.length
          ? [{ group: "Submitted seed keywords", intent: "user_provided", keywords: seedKeywords }]
          : [],
        sources,
        linkedinProfile: companyLinkedInUrl
          ? {
              url: companyLinkedInUrl,
              title: companyName || brandName || "LinkedIn company profile",
              vanityName: companyLinkedInUrl.split("/company/")[1]?.replace(/\/$/, ""),
            }
          : null,
        linkedinSimilarSignals: [],
        sourceCount: sources.length,
        competitorCount: competitors.length,
        seedKeywordCount: seedKeywords.length,
        researchSummary: companyName || domain
          ? `Local stub research used the submitted form identity for ${companyName || domain}.`
          : "Local stub research started without a submitted company identity.",
        researchDepth: {
          ownedPagesCrawled: 0,
          publicSourcesReviewed: sources.length,
          linkedinPublicSignals: companyLinkedInUrl ? 1 : 0,
          linkedinSimilarSignals: 0,
          competitorCandidatesEvaluated: competitors.length,
          competitorsReturned: competitors.length,
          seedKeywordsGenerated: seedKeywords.length,
        },
        researchQuality: {
          status: "local_stub",
          researchMode: "stub",
          liveResearchAttempted: false,
          gptSynthesisCompleted: false,
          providerAttempts: {
            websiteCrawl: false,
            publicWebSearch: false,
            gptSynthesis: false,
          },
        },
        modelTrace: [],
        queryLog: [],
        evidenceMap: {
          sourcesByType: {
            ownedWebsite: 0,
            publicWeb: sources.length,
            linkedinPublic: companyLinkedInUrl ? 1 : 0,
            linkedinSimilar: 0,
          },
        },
        stepDurations: {},
        minimumsMet: {
          companyContext: Boolean(companyContext),
          directCompetitors: competitors.length >= 5,
          seedKeywords: seedKeywords.length >= 20,
        },
        warnings,
      },
    },
  });
}

export async function getVibeMarketingBootstrap(env: Env, request: Request, companyId?: string | null) {
  if (shouldUseDevBackendStub()) return DEV_BOOTSTRAP;
  try {
    const client = createApiClient(env, request);
    const query = companyId ? `?company_id=${encodeURIComponent(companyId)}` : "";
    const response = await client.get(`${BASE_PATH}/bootstrap/${query}`);
    return normalizeBootstrap(response.data);
  } catch (error) {
    if (shouldUseDevBackendFallback(error)) return DEV_BOOTSTRAP;
    throw error;
  }
}

export async function saveVibeMarketingSettings(env: Env, request: Request, body: Record<string, unknown>) {
  const client = createApiClient(env, request);
  const response = await client.put(`${BASE_PATH}/settings`, body);
  return normalizeBootstrap(response.data);
}

export async function connectVibeMarketingGithub(env: Env, request: Request, body: Record<string, unknown>) {
  const client = createApiClient(env, request);
  const response = await client.post(`${BASE_PATH}/github/connect`, body);
  return response.data as {
    auth_url?: string;
    authUrl?: string;
    status?: string;
    connection_state?: string;
    connectionState?: string;
    github_repo?: string;
    githubRepo?: string;
    detail?: string;
    error?: string;
  };
}

async function startMarketingRun(env: Env, request: Request, path: string, body: Record<string, unknown>) {
  if (shouldUseDevBackendStub()) {
    const runId = `dev-${path.replace(/[^a-z0-9]+/gi, "-")}-${Date.now().toString(36)}`;
    DEV_RUN_SNAPSHOTS.set(runId, { ...body });
    return { runId, status: "queued" };
  }
  const client = createApiClient(env, request);
  const response = await client.post(`${BASE_PATH}/${path}`, body);
  const runId = asNullableString(response.data?.runId) ?? asNullableString(response.data?.run_id);
  return { runId, status: asNullableString(response.data?.status) ?? "queued" };
}

export function startVibeMarketingScan(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "scan", body);
}

export function startVibeMarketingDiscovery(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "discovery", body);
}

export function startVibeMarketingArticle(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "article", body);
}

export function startVibeMarketingAutofill(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "autofill", body);
}

export function startVibeMarketingBaseline(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "baseline", body);
}

export async function skipVibeMarketingBaseline(env: Env, request: Request, body: Record<string, unknown>) {
  const client = createApiClient(env, request);
  const response = await client.post(`${BASE_PATH}/baseline/skip`, body);
  return normalizeBootstrap(response.data);
}

export async function refreshVibeMarketingBaselineGoogle(env: Env, request: Request, body: Record<string, unknown>) {
  const client = createApiClient(env, request);
  const response = await client.post(`${BASE_PATH}/baseline/google-refresh`, body);
  return normalizeWebsiteBaseline(response.data?.websiteBaseline ?? response.data?.website_baseline);
}

export function replayVibeMarketingDaily(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "daily/replay", body);
}

export async function getVibeMarketingRun(env: Env, request: Request, runId: string, companyId?: string | null) {
  if (shouldUseDevBackendStub()) {
    if (runId.includes("autofill")) {
      return devAutofillResultFromSnapshot(runId, DEV_RUN_SNAPSHOTS.get(runId));
    }
    return normalizeMarketingRun({
      runId,
      workflow: runId.includes("baseline") ? "website_baseline" : "article_generation",
      domain: DEV_BOOTSTRAP.organization.domain,
      status: "completed",
      currentStep: "finalize",
      stepOrder: runId.includes("baseline")
        ? ["crawl_technical_health", "measure_lighthouse", "measure_search_visibility", "finalize"]
        : ["queued", "finalize"],
      steps: runId.includes("baseline")
        ? [
            { key: "crawl_technical_health", status: "completed", attempts: 1, artifacts: [] },
            { key: "measure_lighthouse", status: "completed", attempts: 1, artifacts: [] },
            { key: "measure_search_visibility", status: "completed", attempts: 1, artifacts: [] },
            { key: "finalize", status: "completed", attempts: 1, artifacts: [] },
          ]
        : [],
      result: runId.includes("baseline") ? { baseline: DEV_BOOTSTRAP.websiteBaseline } : {},
    });
  }
  const client = createApiClient(env, request);
  const query = companyId ? `?company_id=${encodeURIComponent(companyId)}` : "";
  const response = await client.get(`${BASE_PATH}/runs/${encodeURIComponent(runId)}${query}`);
  return normalizeMarketingRun(response.data);
}

export async function controlVibeMarketingRun(
  env: Env,
  request: Request,
  runId: string,
  action: string,
  body: Record<string, unknown> = {},
) {
  const client = createApiClient(env, request);
  const response = await client.post(`${BASE_PATH}/runs/${encodeURIComponent(runId)}/${action}`, body);
  return normalizeMarketingRun(response.data);
}

export async function reviseVibeMarketingRun(
  env: Env,
  request: Request,
  runId: string,
  body: Record<string, unknown>,
) {
  return controlVibeMarketingRun(env, request, runId, "revise", body);
}
