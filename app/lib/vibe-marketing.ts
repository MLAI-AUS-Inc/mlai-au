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
      location: asNullableString(company.location),
      abn: asNullableString(company.abn),
      organizationId: Number(company.organizationId ?? company.organization_id ?? 0) || null,
    },
    organization: {
      id: Number(organization.id ?? 0) || null,
      name: asNullableString(organization.name) ?? asNullableString(company.name) ?? "Company",
      domain: asNullableString(organization.domain) ?? asNullableString(company.domain) ?? "",
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
    name: "Dev Startup",
    domain: "devstartup.com",
    organizationId: 1,
  },
  organization: {
    id: 1,
    name: "Dev Startup",
    domain: "devstartup.com",
    competitors: ["example.com"],
    seedKeywords: ["startup investor updates"],
  },
  settings: {
    brandName: "Dev Startup",
    companyContext: "AI workflow automation for founders.",
    articleDeliveryMode: "publish_code",
    githubRepo: "samdonegan/devstartup",
    dailyDiscoveryEnabled: false,
    githubConnectionState: "connected",
  },
  startupProfile: {
    founderNames: ["Sam Founder"],
    stage: "Seed",
    notes: "Uses AI workflow automation to help founders ship faster.",
  },
  websiteBaseline: {
    status: "completed",
    passed: true,
    domain: "devstartup.com",
    collectedAt: new Date().toISOString(),
    overallScore: 76,
    summary: { text: "Website baseline is workable." },
    sourceStatus: {
      technicalHealth: "measured",
      lighthouse: "measured",
      authority: "unavailable",
      organicSearch: "unavailable",
      aiVisibility: "unavailable",
      traffic: "needs_connection",
    },
    metrics: {
      technicalHealth: { status: "measured", score: 84, pagesCrawled: 8 },
      lighthouse: { status: "measured", score: 68 },
      authority: { status: "unavailable", score: null },
      organicSearch: { status: "unavailable", score: null },
      aiVisibility: { status: "unavailable", score: null },
      traffic: { status: "needs_connection", score: null },
    },
    recommendations: [{ priority: "medium", title: "Connect Google", source: "traffic" }],
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
  currentGuidedStep: "scan",
  recommendedNextAction: { key: "scan", label: "Scan repository" },
};

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
  return response.data as { auth_url?: string; authUrl?: string };
}

async function startMarketingRun(env: Env, request: Request, path: string, body: Record<string, unknown>) {
  if (shouldUseDevBackendStub()) {
    return { runId: `dev-${path.replace(/[^a-z0-9]+/gi, "-")}-run`, status: "queued" };
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
    return normalizeMarketingRun({
      runId,
      workflow: runId.includes("autofill")
        ? "startup_autofill"
        : runId.includes("baseline")
          ? "website_baseline"
          : "article_generation",
      domain: DEV_BOOTSTRAP.organization.domain,
      status: "completed",
      currentStep: "finalize",
      stepOrder: runId.includes("autofill")
        ? [
            "resolve_company_identity",
            "crawl_owned_web",
            "research_public_web",
            "research_linkedin_public",
            "discover_competitor_candidates",
            "rank_competitors",
            "generate_keyword_landscape",
            "synthesize_company_profile",
            "finalize",
          ]
        : runId.includes("baseline")
          ? ["crawl_technical_health", "measure_lighthouse", "measure_search_visibility", "finalize"]
        : ["queued", "finalize"],
      steps: runId.includes("autofill")
        ? [
            { key: "resolve_company_identity", status: "completed", attempts: 1, artifacts: [] },
            { key: "crawl_owned_web", status: "completed", attempts: 1, artifacts: [] },
            { key: "research_public_web", status: "completed", attempts: 1, artifacts: [] },
            { key: "research_linkedin_public", status: "completed", attempts: 1, artifacts: [] },
            { key: "discover_competitor_candidates", status: "completed", attempts: 1, artifacts: [] },
            { key: "rank_competitors", status: "completed", attempts: 1, artifacts: [] },
            { key: "generate_keyword_landscape", status: "completed", attempts: 1, artifacts: [] },
            { key: "synthesize_company_profile", status: "completed", attempts: 1, artifacts: [] },
            { key: "finalize", status: "completed", attempts: 1, artifacts: [] },
          ]
        : runId.includes("baseline")
          ? [
              { key: "crawl_technical_health", status: "completed", attempts: 1, artifacts: [] },
              { key: "measure_lighthouse", status: "completed", attempts: 1, artifacts: [] },
              { key: "measure_search_visibility", status: "completed", attempts: 1, artifacts: [] },
              { key: "finalize", status: "completed", attempts: 1, artifacts: [] },
            ]
        : [],
      result: runId.includes("autofill")
        ? {
            autofill: {
              brandName: "Dev Startup",
              companyContext:
                "## Positioning\nDev Startup builds AI workflow automation for founders, helping teams turn company context into investor updates, content operations, and repeatable growth workflows.\n\n## Audience\nEarly-stage founders and lean startup teams who need operating leverage without hiring a large ops function.",
              directCompetitors: [
                { name: "Build Club", domain: "buildclub.ai", linkedinUrl: "https://www.linkedin.com/company/build-club-ai", type: "direct", score: 0.93, reason: "Australian AI builder community with founder event and education overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                { name: "Aussie Founders Club", domain: "aussiefoundersclub.com", linkedinUrl: "https://www.linkedin.com/company/aussie-founders-club", type: "direct", score: 0.9, reason: "Local founder community with audience and event overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                { name: "Startup Victoria", domain: "startupvictoria.com.au", type: "direct", score: 0.76, reason: "Melbourne startup community and founder programming.", evidence: ["Public search snippet"], confidence: "medium" },
                { name: "Fishburners", domain: "fishburners.org", type: "direct", score: 0.7, reason: "Australian founder community and startup support programs.", evidence: ["Public search snippet"], confidence: "medium" },
                { name: "The Commons Startup Events", domain: "thecommons.com.au", type: "direct", score: 0.62, reason: "Local startup and operator events reaching a similar founder audience.", evidence: ["Public search snippet"], confidence: "medium" },
              ],
              seoCompetitors: [
                { name: "Copy.ai", domain: "copy.ai", type: "seo", score: 0.42, reason: "Competes for broad AI workflow search demand, but is not a local founder community.", evidence: ["Public search snippet"], confidence: "medium" },
                { name: "Jasper", domain: "jasper.ai", type: "seo", score: 0.38, reason: "Competes for broad AI marketing content searches.", evidence: ["Public search snippet"], confidence: "medium" },
              ],
              adjacentOrganizations: [
                { name: "LaunchVic", domain: "launchvic.org", type: "adjacent", score: 0.52, reason: "Victorian startup ecosystem context.", evidence: ["Public search snippet"], confidence: "medium" },
              ],
              competitors: [
                { name: "Build Club", domain: "buildclub.ai", linkedinUrl: "https://www.linkedin.com/company/build-club-ai", type: "direct", score: 0.93, reason: "Australian AI builder community with founder event and education overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                { name: "Aussie Founders Club", domain: "aussiefoundersclub.com", linkedinUrl: "https://www.linkedin.com/company/aussie-founders-club", type: "direct", score: 0.9, reason: "Local founder community with audience and event overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                { name: "Startup Victoria", domain: "startupvictoria.com.au", type: "direct", score: 0.76, reason: "Melbourne startup community and founder programming.", evidence: ["Public search snippet"], confidence: "medium" },
                { name: "Fishburners", domain: "fishburners.org", type: "direct", score: 0.7, reason: "Australian founder community and startup support programs.", evidence: ["Public search snippet"], confidence: "medium" },
                { name: "The Commons Startup Events", domain: "thecommons.com.au", type: "direct", score: 0.62, reason: "Local startup and operator events reaching a similar founder audience.", evidence: ["Public search snippet"], confidence: "medium" },
              ],
              competitorGroups: {
                directCompetitors: [
                  { name: "Build Club", domain: "buildclub.ai", linkedinUrl: "https://www.linkedin.com/company/build-club-ai", type: "direct", score: 0.93, reason: "Australian AI builder community with founder event and education overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                  { name: "Aussie Founders Club", domain: "aussiefoundersclub.com", linkedinUrl: "https://www.linkedin.com/company/aussie-founders-club", type: "direct", score: 0.9, reason: "Local founder community with audience and event overlap.", evidence: ["Public website", "LinkedIn public snippet"], confidence: "high" },
                ],
                seoCompetitors: [
                  { name: "Copy.ai", domain: "copy.ai", type: "seo", score: 0.42, reason: "Competes for broad AI workflow search demand, but is not a local founder community.", evidence: ["Public search snippet"], confidence: "medium" },
                  { name: "Jasper", domain: "jasper.ai", type: "seo", score: 0.38, reason: "Competes for broad AI marketing content searches.", evidence: ["Public search snippet"], confidence: "medium" },
                ],
                adjacentOrganizations: [
                  { name: "LaunchVic", domain: "launchvic.org", type: "adjacent", score: 0.52, reason: "Victorian startup ecosystem context.", evidence: ["Public search snippet"], confidence: "medium" },
                ],
              },
              seedKeywords: [
                "ai workflow automation",
                "founder marketing automation",
                "startup update software",
                "investor update automation",
                "startup operations automation",
                "ai tools for startup founders",
                "founder productivity software",
                "automated founder reports",
                "startup content automation",
                "ai marketing workflows",
                "lean startup operations tools",
                "startup growth workflow software",
                "founder weekly update tool",
                "automate startup marketing",
                "ai startup operating system",
                "startup reporting automation",
                "founder ai assistant",
                "investor relations automation",
                "startup data workflow tools",
                "daily founder workflow automation",
              ],
              sources: [
                { url: "https://devstartup.com", title: "Home", type: "website" },
                { url: "https://devstartup.com/about", title: "About", type: "website" },
                { url: "https://www.linkedin.com/company/devstartup", title: "LinkedIn", type: "linkedin", query: "Dev Startup LinkedIn" },
                { url: "https://www.buildclub.ai", title: "Build Club", type: "comparison", query: "Dev Startup competitors Melbourne" },
              ],
              linkedinProfile: {
                url: "https://www.linkedin.com/company/devstartup",
                title: "Dev Startup",
                vanityName: "devstartup",
                description: "Public LinkedIn profile snippet for an AI workflow automation company.",
              },
              linkedinSimilarSignals: [
                {
                  url: "https://www.linkedin.com/company/build-club-ai",
                  title: "Build Club",
                  type: "linkedin_similar",
                  description: "Visible public LinkedIn similar-page signal.",
                },
                {
                  url: "https://www.linkedin.com/company/aussie-founders-club",
                  title: "Aussie Founders Club",
                  type: "linkedin_similar",
                  description: "Visible public LinkedIn people-also-viewed signal.",
                },
              ],
              sourceCount: 16,
              competitorCount: 8,
              seedKeywordCount: 20,
              researchSummary: "Public research found local founder-community and AI-event overlap, so local direct competitors rank above generic global AI tools.",
              researchDepth: {
                ownedPagesCrawled: 8,
                publicSourcesReviewed: 16,
                linkedinPublicSignals: 3,
                linkedinSimilarSignals: 2,
                competitorCandidatesEvaluated: 14,
                competitorsReturned: 8,
                seedKeywordsGenerated: 20,
              },
              minimumsMet: { companyContext: true, directCompetitors: true, seedKeywords: true },
              warnings: ["Competitors are inferred from category signals and should be reviewed."],
            },
          }
        : runId.includes("baseline")
          ? { baseline: DEV_BOOTSTRAP.websiteBaseline }
        : {},
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
