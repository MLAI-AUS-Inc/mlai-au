import { createApiClient, shouldUseDevBackendFallback, shouldUseDevBackendStub } from "~/lib/api";
import type {
  VibeMarketingBootstrap,
  VibeMarketingRunSummary,
  VibeMarketingStepState,
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

  return {
    company: {
      id: String(company.id ?? ""),
      name: asNullableString(company.name) ?? "Company",
      domain: asNullableString(company.domain),
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
    checks:
      payload.checks && typeof payload.checks === "object"
        ? (payload.checks as VibeMarketingBootstrap["checks"])
        : {},
    latestRuns: Array.isArray(payload.latestRuns)
      ? payload.latestRuns.map(normalizeMarketingRun)
      : [],
    recommendedNextAction:
      payload.recommendedNextAction && typeof payload.recommendedNextAction === "object"
        ? (payload.recommendedNextAction as VibeMarketingBootstrap["recommendedNextAction"])
        : undefined,
  };
}

const DEV_BOOTSTRAP: VibeMarketingBootstrap = {
  company: { id: "dev-company", name: "Dev Startup", domain: "devstartup.com", organizationId: 1 },
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
  checks: {},
  latestRuns: [],
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

export function replayVibeMarketingDaily(env: Env, request: Request, body: Record<string, unknown>) {
  return startMarketingRun(env, request, "daily/replay", body);
}

export async function getVibeMarketingRun(env: Env, request: Request, runId: string, companyId?: string | null) {
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
