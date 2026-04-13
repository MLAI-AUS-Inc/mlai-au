import { redirect } from "react-router";
import type { User } from "~/types/user";
import { createApiClient } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import type {
  VibeRaisingDraftResultsResponse,
  VibeRaisingAppUser,
  VibeRaisingCompany,
  VibeRaisingDraftedContent,
  VibeRaisingEmailDraftMonth,
  VibeRaisingMonthlyUpdate,
  VibeRaisingProfile,
  VibeRaisingRole,
  VibeRaisingStartupUpdateBootstrapResponse,
  VibeRaisingStartupUpdateBindingSummary,
  VibeRaisingStartupUpdateCancelResponse,
  VibeRaisingStartupUpdateRunProgress,
  VibeRaisingStartupUpdateRunSummary,
  VibeRaisingStartupUpdateStepState,
  VibeRaisingStartupUpdateState,
  VibeRaisingStartupUpdateStatusResponse,
} from "~/types/vibe-raising";

const PROFILE_PATH = "/api/v1/vibe-raising/profile/";
const COMPANIES_PATH = "/api/v1/vibe-raising/companies/";
const ACTIVE_COMPANY_PATH = "/api/v1/vibe-raising/active-company/";
const UPDATES_PATH = "/api/v1/vibe-raising/updates/";
const STARTUP_UPDATE_BOOTSTRAP_PATH = "/api/v1/vibe-raising/startup-update/bootstrap/";
const EMAIL_DRAFT_START_PATH = "/api/v1/vibe-raising/email-draft/start/";
const EMAIL_DRAFT_STATUS_PATH = "/api/v1/vibe-raising/email-draft/status/";
const EMAIL_DRAFT_ACTIVE_RUN_PATH = "/api/v1/vibe-raising/email-draft/active-run/";
const EMAIL_DRAFT_DRAFT_RESULTS_PATH = "/api/v1/vibe-raising/email-draft/draft-results/";
const EMAIL_DRAFT_CANCEL_RUNS_PATH = "/api/v1/vibe-raising/email-draft/runs/";
const VIBE_RAISING_UNLOCK_COOKIE_NAME = "vibe_raising_unlock";
const VIBE_RAISING_UNLOCK_MESSAGE = "vibe-raising-unlocked:v1";
const textEncoder = new TextEncoder();

type OptionalContext = {
  authUser: User | null;
  profile: VibeRaisingProfile | null;
  appUser: VibeRaisingAppUser | null;
};

export function isVibeRaisingProfileComplete(profile: VibeRaisingProfile): boolean {
  if (profile.role === "investor") {
    return Boolean(profile.organizationName);
  }

  return profile.companies.length > 0;
}

function unwrapPayload<T>(payload: T): any {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (record.profile) return record.profile;
    if (record.data) return record.data;
  }

  return payload;
}

function asNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeRole(value: unknown): VibeRaisingRole {
  return value === "investor" ? "investor" : "founder";
}

function normalizeCompany(raw: unknown): VibeRaisingCompany {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const id =
    payload.id ??
    payload.companyId ??
    payload.company_id ??
    payload.slug ??
    payload.name ??
    payload.company_name ??
    "company";
  const name =
    asNullableString(payload.name) ??
    asNullableString(payload.companyName) ??
    asNullableString(payload.company_name) ??
    asNullableString(payload.organizationName) ??
    asNullableString(payload.organization_name) ??
    "Company";
  const domain =
    asNullableString(payload.domain) ??
    asNullableString(payload.website) ??
    asNullableString(payload.url) ??
    asNullableString(payload.companyDomain) ??
    asNullableString(payload.company_domain);
  const abn =
    asNullableString(payload.abn) ??
    asNullableString(payload.companyAbn) ??
    asNullableString(payload.company_abn);
  const registered = Boolean(
    payload.registered ??
      payload.isRegistered ??
      payload.is_registered ??
      payload.companyRegistered ??
      payload.company_registered,
  );

  return {
    id: String(id),
    name,
    domain,
    abn,
    registered,
  };
}

function normalizeProfile(raw: unknown): VibeRaisingProfile {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const topLevelCompanyName =
    asNullableString(payload.companyName) ??
    asNullableString(payload.company_name) ??
    asNullableString(payload.organizationName) ??
    asNullableString(payload.organization_name);
  const companiesSource =
    payload.companies ??
    payload.companyProfiles ??
    payload.company_profiles ??
    payload.startups ??
    payload.startup_profiles;

  let companies = Array.isArray(companiesSource)
    ? companiesSource.map(normalizeCompany)
    : [];

  if (companies.length === 0 && topLevelCompanyName) {
    companies = [
      normalizeCompany({
        id:
          payload.activeCompanyId ??
          payload.active_company_id ??
          payload.companyId ??
          payload.company_id ??
          topLevelCompanyName,
        name: topLevelCompanyName,
        domain: payload.domain ?? payload.company_domain,
        abn: payload.abn ?? payload.company_abn,
        registered:
          payload.companyRegistered ??
          payload.company_registered ??
          payload.registered,
      }),
    ];
  }

  const activeCompanyId =
    asNullableString(payload.activeCompanyId) ??
    asNullableString(payload.active_company_id) ??
    (companies[0]?.id ?? null);
  const organizationName =
    asNullableString(payload.organizationName) ??
    asNullableString(payload.organization_name) ??
    asNullableString(payload.firmName) ??
    asNullableString(payload.firm_name);

  return {
    role: normalizeRole(payload.role),
    organizationName,
    companies,
    activeCompanyId,
  };
}

function getCompanyIdFromPayload(raw: unknown): string | null {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  return (
    asNullableString(payload.id) ??
    asNullableString(payload.companyId) ??
    asNullableString(payload.company_id)
  );
}

function normalizeMetrics(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object") return {};

  const metrics: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (value === null || value === undefined) continue;
    const text = String(value).trim();
    if (!text) continue;
    metrics[key] = text;
  }
  return metrics;
}

function normalizePastMonthSummary(raw: unknown) {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  return {
    month: asNullableString(payload.month) ?? "Unknown",
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    metrics: normalizeMetrics(payload.metrics),
  };
}

function normalizeDraftedContent(raw: unknown): VibeRaisingDraftedContent | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const rawYear = payload.year;
  let yearValue: number | undefined;
  if (typeof rawYear === "number" && Number.isFinite(rawYear)) {
    yearValue = rawYear;
  } else if (typeof rawYear === "string") {
    const parsedYear = Number(rawYear.trim());
    if (Number.isFinite(parsedYear)) {
      yearValue = parsedYear;
    }
  }

  return {
    month: asNullableString(payload.month) ?? undefined,
    year: yearValue,
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    metrics: normalizeMetrics(payload.metrics),
    pastMonths: Array.isArray(payload.pastMonths)
      ? payload.pastMonths.map(normalizePastMonthSummary)
      : [],
  };
}

function normalizeStepStates(raw: unknown): Record<string, VibeRaisingStartupUpdateStepState> {
  if (!raw || typeof raw !== "object") return {};

  const normalized: Record<string, VibeRaisingStartupUpdateStepState> = {};
  for (const [stepKey, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const payload = value as Record<string, unknown>;
    normalized[stepKey] = {
      name: asNullableString(payload.name) ?? stepKey,
      required: Boolean(payload.required),
      status: asNullableString(payload.status) ?? "",
      attempts:
        typeof payload.attempts === "number" && Number.isFinite(payload.attempts)
          ? payload.attempts
          : Number(payload.attempts ?? 0) || 0,
      message: asNullableString(payload.message),
      startedAt:
        asNullableString(payload.startedAt) ??
        asNullableString(payload.started_at),
      completedAt:
        asNullableString(payload.completedAt) ??
        asNullableString(payload.completed_at),
      error: asNullableString(payload.error),
      artifacts: Array.isArray(payload.artifacts) ? payload.artifacts : [],
    };
  }

  return normalized;
}

function normalizeEmailDraftMonth(raw: unknown): VibeRaisingEmailDraftMonth | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const month = asNullableString(payload.month);
  if (!month) return null;

  const rawDraftId = payload.draftId ?? payload.draft_id;
  const draftId =
    typeof rawDraftId === "number" && Number.isFinite(rawDraftId)
      ? rawDraftId
      : typeof rawDraftId === "string" && rawDraftId.trim()
        ? Number(rawDraftId)
        : undefined;
  const rawYear = payload.year;
  const year =
    typeof rawYear === "number" && Number.isFinite(rawYear)
      ? rawYear
      : typeof rawYear === "string" && rawYear.trim()
        ? Number(rawYear)
        : undefined;

  return {
    draftId: typeof draftId === "number" && Number.isFinite(draftId) ? draftId : undefined,
    isoMonth:
      asNullableString(payload.isoMonth) ??
      asNullableString(payload.iso_month) ??
      undefined,
    month,
    year: typeof year === "number" && Number.isFinite(year) ? year : undefined,
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    metrics: normalizeMetrics(payload.metrics),
  };
}

function normalizeMonthlyUpdate(raw: unknown): VibeRaisingMonthlyUpdate | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const rawYear = payload.year;
  let yearValue: number | undefined;
  if (typeof rawYear === "number" && Number.isFinite(rawYear)) {
    yearValue = rawYear;
  } else if (typeof rawYear === "string") {
    const parsedYear = Number(rawYear.trim());
    if (Number.isFinite(parsedYear)) {
      yearValue = parsedYear;
    }
  }

  const monthName =
    asNullableString(payload.monthName) ??
    asNullableString(payload.month_name);
  const monthLabel =
    asNullableString(payload.month) ??
    (monthName && yearValue ? `${monthName} ${yearValue}` : monthName) ??
    "Update";
  const id =
    asNullableString(payload.id) ??
    asNullableString(payload.updateId) ??
    asNullableString(payload.update_id) ??
    monthLabel;

  return {
    id,
    isoMonth:
      asNullableString(payload.isoMonth) ??
      asNullableString(payload.iso_month),
    month: monthLabel,
    monthName,
    year: yearValue,
    date:
      asNullableString(payload.date) ??
      asNullableString(payload.updatedAt) ??
      asNullableString(payload.updated_at) ??
      new Date().toISOString(),
    status: asNullableString(payload.status),
    metrics: normalizeMetrics(payload.metrics),
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
  };
}
function normalizeStartupUpdateRun(raw: unknown): VibeRaisingStartupUpdateRunSummary | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const runId =
    asNullableString(payload.runId) ??
    asNullableString(payload.run_id);
  const workflow =
    asNullableString(payload.workflow) ?? "";
  const domain =
    asNullableString(payload.domain) ?? "";

  if (!runId || !workflow || !domain) {
    return null;
  }

  return {
    runId,
    workflow,
    domain,
    status: asNullableString(payload.status) ?? "",
    currentStep:
      asNullableString(payload.currentStep) ??
      asNullableString(payload.current_step),
    stepOrder: Array.isArray(payload.stepOrder ?? payload.step_order)
      ? ((payload.stepOrder ?? payload.step_order) as unknown[]).map((item: unknown) => String(item))
      : [],
    createdAt:
      asNullableString(payload.createdAt) ??
      asNullableString(payload.created_at) ??
      undefined,
    updatedAt:
      asNullableString(payload.updatedAt) ??
      asNullableString(payload.updated_at) ??
      undefined,
    stepStates: normalizeStepStates(
      payload.stepStates ??
        payload.step_states,
    ),
  };
}

function normalizeStartupUpdateState(value: unknown): VibeRaisingStartupUpdateState {
  switch (value) {
    case "needs_domain":
      return "needs_domain";
    case "auth_required":
    case "needs_google_auth":
      return "auth_required";
    case "queued":
      return "queued";
    case "running":
    case "processing":
      return "running";
    case "completed":
    case "ready":
      return "completed";
    case "cancelled":
      return "cancelled";
    case "failed":
      return "failed";
    default:
      return "failed";
  }
}

function normalizeStartupUpdateCancelResponse(
  raw: unknown,
): VibeRaisingStartupUpdateCancelResponse {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const runId =
    asNullableString(payload.runId) ??
    asNullableString(payload.run_id) ??
    "";
  const cleanupPayload = (payload.cleanup ?? {}) as Record<string, unknown>;

  return {
    runId,
    status: asNullableString(payload.status) ?? "",
    terminalState:
      asNullableString(payload.terminalState) ??
      asNullableString(payload.terminal_state),
    cancelApplied: Boolean(
      payload.cancelApplied ??
      payload.cancel_applied,
    ),
    cleanup: {
      draftsDeleted:
        typeof cleanupPayload.draftsDeleted === "number" && Number.isFinite(cleanupPayload.draftsDeleted)
          ? cleanupPayload.draftsDeleted
          : Number(cleanupPayload.draftsDeleted ?? cleanupPayload.drafts_deleted ?? 0) || 0,
      eventsDeleted:
        typeof cleanupPayload.eventsDeleted === "number" && Number.isFinite(cleanupPayload.eventsDeleted)
          ? cleanupPayload.eventsDeleted
          : Number(cleanupPayload.eventsDeleted ?? cleanupPayload.events_deleted ?? 0) || 0,
      metricsDeleted:
        typeof cleanupPayload.metricsDeleted === "number" && Number.isFinite(cleanupPayload.metricsDeleted)
          ? cleanupPayload.metricsDeleted
          : Number(cleanupPayload.metricsDeleted ?? cleanupPayload.metrics_deleted ?? 0) || 0,
    },
    revokeRequested: Boolean(
      payload.revokeRequested ??
      payload.revoke_requested,
    ),
    revokeSucceeded: Boolean(
      payload.revokeSucceeded ??
      payload.revoke_succeeded,
    ),
    revokedJobIds: normalizeGeneratedDraftMonths(
      payload.revokedJobIds ??
      payload.revoked_job_ids,
    ),
    missingJobIds: normalizeGeneratedDraftMonths(
      payload.missingJobIds ??
      payload.missing_job_ids,
    ),
  };
}

function normalizeBindingSummary(raw: unknown): VibeRaisingStartupUpdateBindingSummary | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = raw as Record<string, unknown>;
  const organizationId = Number(
    payload.organizationId ??
      payload.organization_id ??
      0,
  );
  const organizationDomain =
    asNullableString(payload.organizationDomain) ??
    asNullableString(payload.organization_domain) ??
    "";

  if (!organizationId || !organizationDomain) {
    return null;
  }

  const rawBindingId = payload.id ?? payload.bindingId ?? payload.binding_id;
  const bindingId =
    typeof rawBindingId === "number" && Number.isFinite(rawBindingId)
      ? rawBindingId
      : typeof rawBindingId === "string" && rawBindingId.trim()
        ? Number(rawBindingId)
        : undefined;
  const rawGoogleConnectionId =
    payload.googleConnectionId ??
    payload.google_connection_id;
  const googleConnectionId =
    typeof rawGoogleConnectionId === "number" && Number.isFinite(rawGoogleConnectionId)
      ? rawGoogleConnectionId
      : typeof rawGoogleConnectionId === "string" && rawGoogleConnectionId.trim()
        ? Number(rawGoogleConnectionId)
        : undefined;

  return {
    id: typeof bindingId === "number" && Number.isFinite(bindingId) ? bindingId : undefined,
    organizationId,
    organizationDomain,
    googleConnectionId:
      typeof googleConnectionId === "number" && Number.isFinite(googleConnectionId)
        ? googleConnectionId
        : null,
    isDefaultForGmail: Boolean(
      payload.isDefaultForGmail ??
        payload.is_default_for_gmail,
    ),
  };
}

function normalizeGeneratedDraftMonths(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => String(item ?? "").trim())
    .filter((value) => value.length > 0);
}

function normalizeStartupUpdateProgress(
  raw: unknown,
  run: VibeRaisingStartupUpdateRunSummary | null,
): VibeRaisingStartupUpdateRunProgress | null {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const runId =
    asNullableString(payload.runId) ??
    asNullableString(payload.run_id) ??
    run?.runId ??
    null;
  const statusText =
    asNullableString(payload.status) ??
    run?.status ??
    null;
  const displayStage =
    asNullableString(payload.displayStage) ??
    asNullableString(payload.display_stage);

  if (!runId || !statusText || !displayStage) {
    return null;
  }

  return {
    runId,
    status: statusText,
    currentStep:
      asNullableString(payload.currentStep) ??
      asNullableString(payload.current_step) ??
      run?.currentStep ??
      null,
    completedSteps:
      typeof payload.completedSteps === "number" && Number.isFinite(payload.completedSteps)
        ? payload.completedSteps
        : Number(payload.completedSteps ?? payload.completed_steps ?? 0) || 0,
    totalSteps:
      typeof payload.totalSteps === "number" && Number.isFinite(payload.totalSteps)
        ? payload.totalSteps
        : Number(payload.totalSteps ?? payload.total_steps ?? 0) || 0,
    displayStage,
    lastHeartbeatAt:
      asNullableString(payload.lastHeartbeatAt) ??
      asNullableString(payload.last_heartbeat_at),
    canRetry: Boolean(payload.canRetry ?? payload.can_retry),
    terminalState:
      asNullableString(payload.terminalState) ??
      asNullableString(payload.terminal_state),
    generatedDraftMonths: normalizeGeneratedDraftMonths(
      payload.generatedDraftMonths ??
        payload.generated_draft_months,
    ),
  };
}

function getBrowserCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const name = "csrftoken=";
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(name)) {
      return decodeURIComponent(trimmed.slice(name.length));
    }
  }
  return null;
}

function buildAbsoluteBackendUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(path.replace(/^\//, ""), normalizedBase).toString();
}

async function requestBrowserJson<T>(
  backendBaseUrl: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers);
  const csrfToken = getBrowserCsrfToken();
  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildAbsoluteBackendUrl(backendBaseUrl, path), {
    ...init,
    headers,
    credentials: "include",
  });

  const text = await response.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const error: any = new Error(
      data?.error ??
        data?.detail ??
        (typeof data === "string" && data) ??
        `Request failed with status ${response.status}`,
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data as T;
}

function normalizeStartupUpdateStatus(
  raw: unknown,
): VibeRaisingStartupUpdateStatusResponse {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const currentMonth =
    normalizeEmailDraftMonth(payload.currentMonth) ??
    normalizeEmailDraftMonth(payload.current_month);
  const rawPastMonths = payload.pastMonths ?? payload.past_months;
  const pastMonths = Array.isArray(rawPastMonths)
    ? rawPastMonths
        .map(normalizeEmailDraftMonth)
        .filter((value): value is VibeRaisingEmailDraftMonth => value !== null)
    : [];
  const run = normalizeStartupUpdateRun(payload.run ?? payload);
  const progress = normalizeStartupUpdateProgress(
    payload.progress ?? payload,
    run,
  );
  const draft =
    normalizeDraftedContent(payload.draft) ??
    normalizeDraftedContent({
      ...(currentMonth ?? {}),
      pastMonths,
    });
  const topLevelStepStates = normalizeStepStates(
    payload.stepStates ??
      payload.step_states,
  );
  return {
    state: normalizeStartupUpdateState(payload.state),
    gmailConnected: Boolean(
      payload.gmailConnected ??
        payload.gmail_connected ??
        payload.googleConnected ??
        payload.google_connected,
    ),
    authUrl:
      asNullableString(payload.authUrl) ??
      asNullableString(payload.auth_url),
    company: payload.company ? normalizeCompany(payload.company) : null,
    binding: normalizeBindingSummary(payload.binding),
    run,
    progress,
    draft,
    runId:
      asNullableString(payload.runId) ??
      asNullableString(payload.run_id) ??
      run?.runId ??
      null,
    status:
      asNullableString(payload.status) ??
      run?.status ??
      null,
    currentStep:
      asNullableString(payload.currentStep) ??
      asNullableString(payload.current_step) ??
      run?.currentStep ??
      null,
    stepStates:
      Object.keys(topLevelStepStates).length > 0
        ? topLevelStepStates
        : (run?.stepStates ?? {}),
    completedSteps:
      typeof payload.completedSteps === "number" && Number.isFinite(payload.completedSteps)
        ? payload.completedSteps
        : Number(payload.completedSteps ?? payload.completed_steps ?? progress?.completedSteps ?? 0) || 0,
    totalSteps:
      typeof payload.totalSteps === "number" && Number.isFinite(payload.totalSteps)
        ? payload.totalSteps
        : Number(payload.totalSteps ?? payload.total_steps ?? progress?.totalSteps ?? 0) || 0,
    displayStage:
      asNullableString(payload.displayStage) ??
      asNullableString(payload.display_stage) ??
      progress?.displayStage ??
      null,
    lastHeartbeatAt:
      asNullableString(payload.lastHeartbeatAt) ??
      asNullableString(payload.last_heartbeat_at) ??
      progress?.lastHeartbeatAt ??
      null,
    canRetry:
      Boolean(payload.canRetry ?? payload.can_retry) ||
      Boolean(progress?.canRetry),
    terminalState:
      asNullableString(payload.terminalState) ??
      asNullableString(payload.terminal_state) ??
      progress?.terminalState ??
      null,
    generatedDraftMonths: normalizeGeneratedDraftMonths(
      payload.generatedDraftMonths ??
        payload.generated_draft_months ??
        progress?.generatedDraftMonths ??
        [],
    ),
    reusedExistingRun: Boolean(
      payload.reusedExistingRun ??
        payload.reused_existing_run,
    ),
    currentMonth,
    pastMonths,
    error:
      asNullableString(payload.error) ??
      asNullableString(payload.detail),
  };
}

export function getActiveVibeRaisingCompany(
  profile: VibeRaisingProfile | VibeRaisingAppUser,
): VibeRaisingCompany | null {
  if (!profile.companies.length) return null;

  const activeCompany =
    profile.companies.find((company) => company.id === profile.activeCompanyId) ??
    profile.companies[0];

  return activeCompany ?? null;
}

export function buildVibeRaisingAppUser(
  authUser: User,
  profile: VibeRaisingProfile,
): VibeRaisingAppUser {
  const activeCompany = getActiveVibeRaisingCompany(profile);

  return {
    authUser,
    profile,
    fullName: authUser.full_name,
    email: authUser.email,
    role: profile.role,
    organizationName: profile.organizationName,
    companies: profile.companies,
    activeCompanyId: profile.activeCompanyId,
    companyName: activeCompany?.name ?? "",
    domain: activeCompany?.domain ?? null,
    abn: activeCompany?.abn ?? null,
    companyRegistered: activeCompany?.registered ?? false,
  };
}

export function getVibeRaisingLoginHref(
  request: Request,
  nextOverride?: string,
): string {
  const url = new URL(request.url);
  const next = nextOverride ?? `${url.pathname}${url.search}`;
  const params = new URLSearchParams({
    app: "vibe-raising",
    next,
  });

  return `/platform/login?${params.toString()}`;
}

function getCookieValue(
  cookieHeader: string | null | undefined,
  name: string,
): string | null {
  const prefix = `${name}=`;
  for (const cookie of String(cookieHeader || "").split(";")) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(prefix)) {
      return trimmed.slice(prefix.length) || null;
    }
  }
  return null;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function getVibeRaisingUnlockSecret(env: Env): string {
  const secret = (env as unknown as Record<string, unknown>).VIBE_RAISING_UNLOCK_SECRET;
  return typeof secret === "string" ? secret.trim() : "";
}

async function signVibeRaisingUnlockValue(env: Env): Promise<string> {
  const secret = getVibeRaisingUnlockSecret(env);
  if (!secret) {
    throw new Error(
      "VIBE_RAISING_UNLOCK_SECRET is not configured. Set it as a frontend worker secret before deploying Vibe Raising.",
    );
  }

  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(VIBE_RAISING_UNLOCK_MESSAGE),
  );

  return `v1.${toBase64Url(new Uint8Array(signature))}`;
}

export async function hasVibeRaisingUnlock(env: Env, request: Request): Promise<boolean> {
  const provided = getCookieValue(
    request.headers.get("Cookie"),
    VIBE_RAISING_UNLOCK_COOKIE_NAME,
  );
  if (!provided) return false;

  try {
    return provided === await signVibeRaisingUnlockValue(env);
  } catch (error) {
    console.error("Failed to verify Vibe Raising unlock cookie:", error);
    return false;
  }
}

export async function createVibeRaisingUnlockCookie(env: Env): Promise<string> {
  const value = await signVibeRaisingUnlockValue(env);
  return `${VIBE_RAISING_UNLOCK_COOKIE_NAME}=${value}; Path=/; SameSite=Lax; HttpOnly`;
}

export function clearVibeRaisingUnlockCookie(): string {
  return `${VIBE_RAISING_UNLOCK_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; HttpOnly`;
}

export async function requireVibeRaisingUnlock(env: Env, request: Request): Promise<void> {
  if (await hasVibeRaisingUnlock(env, request)) {
    return;
  }

  throw redirect(getVibeRaisingLoginHref(request));
}

export function getVibeRaisingSubmittedCookieName(companyId: string): string {
  return `vibe_submitted_${companyId}`;
}

export function createVibeRaisingSubmittedCookie(companyId: string): string {
  return `${getVibeRaisingSubmittedCookieName(companyId)}=true; Path=/; Max-Age=3600; SameSite=Lax`;
}

export function clearVibeRaisingSubmittedCookie(companyId: string): string {
  return `${getVibeRaisingSubmittedCookieName(companyId)}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function hasSubmittedVibeRaisingUpdate(
  request: Request,
  companyId: string | null | undefined,
): boolean {
  if (!companyId) return false;

  const cookieHeader = request.headers.get("Cookie") ?? "";
  return cookieHeader.includes(`${getVibeRaisingSubmittedCookieName(companyId)}=true`);
}

export async function getVibeRaisingProfile(
  env: Env,
  request: Request,
): Promise<VibeRaisingProfile | null> {
  try {
    const client = createApiClient(env, request);
    const response = await client.get(PROFILE_PATH);
    return normalizeProfile(response.data);
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 404 || status === 204) {
      return null;
    }

    if (status === 401) {
      return null;
    }

    throw error;
  }
}

export async function getOptionalVibeRaisingContext(
  env: Env,
  request: Request,
): Promise<OptionalContext> {
  const authUser = (await getCurrentUser(env, request)) as User | null;
  if (!authUser) {
    return { authUser: null, profile: null, appUser: null };
  }

  const profile = await getVibeRaisingProfile(env, request);
  if (!profile) {
    return { authUser, profile: null, appUser: null };
  }

  if (!isVibeRaisingProfileComplete(profile)) {
    return { authUser, profile, appUser: null };
  }

  return {
    authUser,
    profile,
    appUser: buildVibeRaisingAppUser(authUser, profile),
  };
}

export async function requireVibeRaisingProfile(
  env: Env,
  request: Request,
): Promise<{ authUser: User; profile: VibeRaisingProfile; appUser: VibeRaisingAppUser }> {
  const context = await getOptionalVibeRaisingContext(env, request);

  if (!context.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  await requireVibeRaisingUnlock(env, request);

  if (!context.profile || !context.appUser) {
    throw redirect("/vibe-raising");
  }

  return {
    authUser: context.authUser,
    profile: context.profile,
    appUser: context.appUser,
  };
}

export async function requireVibeRaisingFounder(
  env: Env,
  request: Request,
): Promise<{ authUser: User; profile: VibeRaisingProfile; appUser: VibeRaisingAppUser }> {
  const context = await requireVibeRaisingProfile(env, request);

  if (context.appUser.role !== "founder") {
    throw redirect("/vibe-raising");
  }

  return context;
}

export async function saveVibeRaisingProfile(
  env: Env,
  request: Request,
  body: {
    role: VibeRaisingRole;
    organizationName?: string | null;
  },
): Promise<VibeRaisingProfile> {
  const client = createApiClient(env, request);

  try {
    const response = await client.post(PROFILE_PATH, body);
    return normalizeProfile(response.data);
  } catch (error: any) {
    if (error.response?.status !== 405) {
      throw error;
    }

    const response = await client.put(PROFILE_PATH, body);
    return normalizeProfile(response.data);
  }
}

export async function saveVibeRaisingCompany(
  env: Env,
  request: Request,
  body: {
    companyId?: string | null;
    name: string;
    domain?: string | null;
    abn?: string | null;
    registered?: boolean;
  },
): Promise<string | null> {
  const client = createApiClient(env, request);
  const response = await client.post(COMPANIES_PATH, body);
  return getCompanyIdFromPayload(response.data);
}

export async function setVibeRaisingActiveCompany(
  env: Env,
  request: Request,
  companyId: string,
): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(ACTIVE_COMPANY_PATH, { companyId });
}

export async function getVibeRaisingMonthlyUpdates(
  env: Env,
  request: Request,
): Promise<VibeRaisingMonthlyUpdate[]> {
  const client = createApiClient(env, request);

  try {
    const response = await client.get(UPDATES_PATH);
    const updates: unknown[] = Array.isArray(response.data?.updates) ? response.data.updates : [];
    return updates
      .map(normalizeMonthlyUpdate)
      .filter((value): value is VibeRaisingMonthlyUpdate => value !== null);
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function saveVibeRaisingMonthlyUpdate(
  env: Env,
  request: Request,
  body: {
    month: string;
    year: number;
    highlights: string;
    challenges: string;
    asks: string;
    metrics: Record<string, string>;
  },
): Promise<VibeRaisingMonthlyUpdate | null> {
  const client = createApiClient(env, request);
  const response = await client.post(UPDATES_PATH, body);
  return normalizeMonthlyUpdate(response.data?.update ?? response.data);
}

export async function bootstrapVibeRaisingStartupUpdate(
  backendBaseUrl: string,
): Promise<VibeRaisingStartupUpdateBootstrapResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    STARTUP_UPDATE_BOOTSTRAP_PATH,
    { method: "POST" },
  );

  return {
    googleConnected: Boolean(
      response.googleConnected ?? response.google_connected,
    ),
    company: response.company ? normalizeCompany(response.company) : null,
    binding: normalizeBindingSummary(response.binding),
    oauthUrl:
      asNullableString(response.oauthUrl) ??
      asNullableString(response.oauth_url) ??
      "",
  };
}

export async function runVibeRaisingStartupUpdate(
  backendBaseUrl: string,
  options?: { forceRegenerate?: boolean },
): Promise<VibeRaisingStartupUpdateStatusResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    EMAIL_DRAFT_START_PATH,
    {
      method: "POST",
      body: options?.forceRegenerate ? JSON.stringify({ forceRegenerate: true }) : undefined,
    },
  );
  return normalizeStartupUpdateStatus(response);
}

export async function getVibeRaisingStartupUpdateStatus(
  backendBaseUrl: string,
  runId?: string | null,
): Promise<VibeRaisingStartupUpdateStatusResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    runId
      ? `/api/v1/vibe-raising/email-draft/runs/${encodeURIComponent(runId)}/status/`
      : EMAIL_DRAFT_STATUS_PATH,
    { method: "GET" },
  );
  return normalizeStartupUpdateStatus(response);
}

export async function getVibeRaisingStartupUpdateActiveRun(
  backendBaseUrl: string,
): Promise<VibeRaisingStartupUpdateStatusResponse | null> {
  const response = await requestBrowserJson<unknown>(
    backendBaseUrl,
    EMAIL_DRAFT_ACTIVE_RUN_PATH,
    { method: "GET" },
  );
  if (!response) return null;
  return normalizeStartupUpdateStatus(response);
}

export async function getVibeRaisingStartupUpdateDraftResults(
  backendBaseUrl: string,
  runId?: string | null,
): Promise<VibeRaisingDraftResultsResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    runId
      ? `/api/v1/vibe-raising/email-draft/runs/${encodeURIComponent(runId)}/draft-results/`
      : EMAIL_DRAFT_DRAFT_RESULTS_PATH,
    { method: "GET" },
  );
  const normalized = normalizeStartupUpdateStatus(response);
  const rawMonths = response.months;
  const months = Array.isArray(rawMonths)
    ? rawMonths
        .map(normalizeEmailDraftMonth)
        .filter((value): value is VibeRaisingEmailDraftMonth => value !== null)
    : [
        ...normalized.pastMonths,
        ...(normalized.currentMonth ? [normalized.currentMonth] : []),
      ];

  return {
    runId: normalized.runId ?? null,
    draft: normalized.draft,
    currentMonth: normalized.currentMonth,
    pastMonths: normalized.pastMonths,
    months,
  };
}

export async function cancelVibeRaisingStartupUpdate(
  backendBaseUrl: string,
  runId: string,
): Promise<VibeRaisingStartupUpdateCancelResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    `${EMAIL_DRAFT_CANCEL_RUNS_PATH}${encodeURIComponent(runId)}/cancel/`,
    { method: "POST" },
  );
  return normalizeStartupUpdateCancelResponse(response);
}
