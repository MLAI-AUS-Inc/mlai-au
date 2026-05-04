import { redirect } from "react-router";
import type { User } from "~/types/user";
import { createApiClient, shouldUseDevAuthBypass, shouldUseDevBackendFallback, shouldUseDevBackendStub } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import type {
  VibeRaisingDraftResultsResponse,
  VibeRaisingAppUser,
  VibeRaisingBankFeedAccount,
  VibeRaisingBankFeedPreview,
  VibeRaisingBankFeedTransaction,
  VibeRaisingCompany,
  VibeRaisingDraftedContent,
  VibeRaisingEmailDraftMonth,
  VibeRaisingFinancialSyncResponse,
  VibeRaisingFinancialSyncRun,
  VibeRaisingGmailDisconnectResponse,
  VibeRaisingGmailMessagePreview,
  VibeRaisingGmailPreview,
  VibeRaisingInputSourceKey,
  VibeRaisingInputSourceStatus,
  VibeRaisingInputSourceSummary,
  VibeRaisingInputSourcesStatusResponse,
  VibeRaisingLinearIssuePreview,
  VibeRaisingLinearPreview,
  VibeRaisingLinearProject,
  VibeRaisingLinearProjectPreview,
  VibeRaisingLinearProjectsResponse,
  VibeRaisingLinearProjectUpdatePreview,
  VibeRaisingMetricSuggestion,
  VibeRaisingMonthlyUpdate,
  VibeRaisingProfile,
  VibeRaisingRole,
  VibeRaisingSlackChannel,
  VibeRaisingSlackChannelsResponse,
  VibeRaisingSlackMessagePreview,
  VibeRaisingSlackPreview,
  VibeRaisingStartupUpdateBootstrapResponse,
  VibeRaisingStartupUpdateBindingSummary,
  VibeRaisingStartupUpdateCancelResponse,
  VibeRaisingStartupUpdateRunProgress,
  VibeRaisingStartupUpdateRunSummary,
  VibeRaisingStartupUpdateStepState,
  VibeRaisingStartupUpdateState,
  VibeRaisingStartupUpdateStatusResponse,
  VibeRaisingVideoCompressionMetadata,
  VibeRaisingVideoUploadResponse,
  VibeRaisingVideoUploadSessionResponse,
  VibeRaisingXeroPreview,
  VibeRaisingXeroRecord,
} from "~/types/vibe-raising";

const PROFILE_PATH = "/api/v1/founder-tools/profile/";
const COMPANIES_PATH = "/api/v1/founder-tools/companies/";
const ACTIVE_COMPANY_PATH = "/api/v1/founder-tools/active-company/";
const UPDATES_PATH = "/api/v1/vibe-raising/updates/";
const VIDEO_UPLOAD_SESSION_PATH = "/api/v1/vibe-raising/uploads/video/session/";
const VIDEO_UPLOAD_COMPLETE_PATH = "/api/v1/vibe-raising/uploads/video/complete/";
const STARTUP_UPDATE_BOOTSTRAP_PATH = "/api/v1/vibe-raising/startup-update/bootstrap/";
const EMAIL_DRAFT_START_PATH = "/api/v1/vibe-raising/email-draft/start/";
const EMAIL_DRAFT_STATUS_PATH = "/api/v1/vibe-raising/email-draft/status/";
const EMAIL_DRAFT_ACTIVE_RUN_PATH = "/api/v1/vibe-raising/email-draft/active-run/";
const EMAIL_DRAFT_DRAFT_RESULTS_PATH = "/api/v1/vibe-raising/email-draft/draft-results/";
const EMAIL_DRAFT_CANCEL_RUNS_PATH = "/api/v1/vibe-raising/email-draft/runs/";
const INPUT_SOURCES_STATUS_PATH = "/api/v1/integrations/sources/status";
const FINANCIAL_STATUS_PATH = "/api/v1/integrations/financial/status";
const FINANCIAL_SYNC_PATH = "/api/v1/integrations/financial/sync";
const BANK_FEED_ACCOUNTS_PATH = "/api/v1/integrations/financial/bank-feed/accounts";
const BANK_FEED_TRANSACTIONS_PATH = "/api/v1/integrations/financial/bank-feed/transactions";
const XERO_PREVIEW_PATH = "/api/v1/integrations/financial/xero/preview";
const GMAIL_PREVIEW_PATH = "/api/v1/integrations/gmail/preview";
const GMAIL_CONNECTION_PATH = "/api/v1/integrations/gmail/connection";
const INPUT_SOURCES_SYNC_PATH = "/api/v1/integrations/sources/sync";
const SLACK_CHANNELS_PATH = "/api/v1/integrations/slack/channels";
const SLACK_CHANNEL_SELECTIONS_PATH = "/api/v1/integrations/slack/channel-selections";
const SLACK_PREVIEW_PATH = "/api/v1/integrations/slack/preview";
const LINEAR_PROJECTS_PATH = "/api/v1/integrations/linear/projects";
const LINEAR_PROJECT_SELECTIONS_PATH = "/api/v1/integrations/linear/project-selections";
const LINEAR_PREVIEW_PATH = "/api/v1/integrations/linear/preview";

const INPUT_SOURCE_DEFINITIONS: Record<VibeRaisingInputSourceKey, Omit<VibeRaisingInputSourceSummary, "selected" | "status">> = {
  gmail: {
    key: "gmail",
    label: "Gmail",
    capabilities: ["context"],
  },
  stripe: {
    key: "stripe",
    label: "Stripe",
    capabilities: ["metrics"],
  },
  xero: {
    key: "xero",
    label: "Xero",
    capabilities: ["metrics"],
  },
  bank_feed: {
    key: "bank_feed",
    label: "Bank Feed",
    capabilities: ["cash_validation"],
  },
  notion: {
    key: "notion",
    label: "Notion",
    capabilities: ["docs", "context"],
  },
  google_drive: {
    key: "google_drive",
    label: "Google Drive",
    capabilities: ["docs", "context"],
  },
  slack: {
    key: "slack",
    label: "Slack",
    capabilities: ["context"],
  },
  linear: {
    key: "linear",
    label: "Linear",
    capabilities: ["context"],
  },
};

type OptionalContext = {
  authUser: User | null;
  profile: VibeRaisingProfile | null;
  appUser: VibeRaisingAppUser | null;
};

export function isVibeRaisingProfileComplete(profile: VibeRaisingProfile): boolean {
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

function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return ["true", "1", "yes"].includes(value.trim().toLowerCase());
  }
  return false;
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
  const companyLinkedInUrl =
    asNullableString(payload.companyLinkedInUrl) ??
    asNullableString(payload.company_linkedin_url);
  const location =
    asNullableString(payload.location) ??
    asNullableString(payload.companyLocation) ??
    asNullableString(payload.company_location) ??
    asNullableString(payload.region);
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
    companyLinkedInUrl,
    abn,
    location,
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
        location: payload.location ?? payload.company_location,
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

function normalizeMetricSuggestions(raw: unknown): VibeRaisingMetricSuggestion[] {
  if (!Array.isArray(raw)) return [];

  const suggestions: VibeRaisingMetricSuggestion[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const payload = item as Record<string, unknown>;
    const metricKey =
      asNullableString(payload.metricKey) ??
      asNullableString(payload.metric_key);
    if (!metricKey || seen.has(metricKey)) continue;
    seen.add(metricKey);
    suggestions.push({
      metricKey,
      label: asNullableString(payload.label) ?? metricKey,
      reason: asNullableString(payload.reason) ?? undefined,
    });
  }
  return suggestions;
}

function asNullableNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.trim());
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizePastMonthSummary(raw: unknown) {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  return {
    month: asNullableString(payload.month) ?? "Unknown",
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    learnings: asNullableString(payload.learnings) ?? "",
    next30Days:
      asNullableString(payload.next30Days) ??
      asNullableString(payload.next_30_days) ??
      "",
    metrics: normalizeMetrics(payload.metrics),
    metricSuggestions: normalizeMetricSuggestions(
      payload.metricSuggestions ?? payload.metric_suggestions,
    ),
  };
}

function normalizeDraftedContent(raw: unknown): VibeRaisingDraftedContent | null {
  if (!raw || typeof raw !== "object") return null;

  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const structuredMemo =
    payload.structuredMemo && typeof payload.structuredMemo === "object"
      ? (payload.structuredMemo as Record<string, unknown>)
      : payload.structured_memo && typeof payload.structured_memo === "object"
        ? (payload.structured_memo as Record<string, unknown>)
        : {};
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
    summary:
      asNullableString(payload.summary) ??
      asNullableString(payload.topline) ??
      asNullableString(structuredMemo.topline) ??
      undefined,
    sourceUrl:
      asNullableString(payload.sourceUrl) ??
      asNullableString(payload.source_url) ??
      undefined,
    videoUrl:
      asNullableString(payload.videoUrl) ??
      asNullableString(payload.video_url) ??
      undefined,
    videoStoragePath:
      asNullableString(payload.videoStoragePath) ??
      asNullableString(payload.video_storage_path) ??
      undefined,
    videoContentType:
      asNullableString(payload.videoContentType) ??
      asNullableString(payload.video_content_type) ??
      undefined,
    videoFileSizeBytes:
      asNullableNumber(payload.videoFileSizeBytes ?? payload.video_file_size_bytes),
    videoOriginalFilename:
      asNullableString(payload.videoOriginalFilename) ??
      asNullableString(payload.video_original_filename) ??
      undefined,
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    learnings: asNullableString(payload.learnings) ?? "",
    next30Days:
      asNullableString(payload.next30Days) ??
      asNullableString(payload.next_30_days) ??
      "",
    metrics: normalizeMetrics(payload.metrics),
    metricSuggestions: normalizeMetricSuggestions(
      payload.metricSuggestions ?? payload.metric_suggestions,
    ),
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
    summary:
      asNullableString(payload.summary) ??
      asNullableString(payload.topline) ??
      undefined,
    sourceUrl:
      asNullableString(payload.sourceUrl) ??
      asNullableString(payload.source_url) ??
      undefined,
    videoUrl:
      asNullableString(payload.videoUrl) ??
      asNullableString(payload.video_url) ??
      undefined,
    videoStoragePath:
      asNullableString(payload.videoStoragePath) ??
      asNullableString(payload.video_storage_path) ??
      undefined,
    videoContentType:
      asNullableString(payload.videoContentType) ??
      asNullableString(payload.video_content_type) ??
      undefined,
    videoFileSizeBytes:
      asNullableNumber(payload.videoFileSizeBytes ?? payload.video_file_size_bytes),
    videoOriginalFilename:
      asNullableString(payload.videoOriginalFilename) ??
      asNullableString(payload.video_original_filename) ??
      undefined,
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    learnings: asNullableString(payload.learnings) ?? "",
    next30Days:
      asNullableString(payload.next30Days) ??
      asNullableString(payload.next_30_days) ??
      "",
    metrics: normalizeMetrics(payload.metrics),
    metricSuggestions: normalizeMetricSuggestions(
      payload.metricSuggestions ?? payload.metric_suggestions,
    ),
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
    summary: asNullableString(payload.summary),
    sourceUrl:
      asNullableString(payload.sourceUrl) ??
      asNullableString(payload.source_url),
    videoUrl:
      asNullableString(payload.videoUrl) ??
      asNullableString(payload.video_url),
    videoStoragePath:
      asNullableString(payload.videoStoragePath) ??
      asNullableString(payload.video_storage_path),
    videoContentType:
      asNullableString(payload.videoContentType) ??
      asNullableString(payload.video_content_type),
    videoFileSizeBytes:
      asNullableNumber(payload.videoFileSizeBytes ?? payload.video_file_size_bytes),
    videoOriginalFilename:
      asNullableString(payload.videoOriginalFilename) ??
      asNullableString(payload.video_original_filename),
    metrics: normalizeMetrics(payload.metrics),
    metricSuggestions: normalizeMetricSuggestions(
      payload.metricSuggestions ?? payload.metric_suggestions,
    ),
    highlights: asNullableString(payload.highlights) ?? "",
    challenges: asNullableString(payload.challenges) ?? "",
    asks: asNullableString(payload.asks) ?? "",
    learnings: asNullableString(payload.learnings) ?? "",
    next30Days:
      asNullableString(payload.next30Days) ??
      asNullableString(payload.next_30_days) ??
      "",
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
    targetMonth:
      asNullableString(payload.targetMonth) ??
      asNullableString(payload.target_month) ??
      null,
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
    targetMonth:
      asNullableString(payload.targetMonth) ??
      asNullableString(payload.target_month) ??
      run?.targetMonth ??
      null,
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

function createBrowserRequestId(): string {
  const randomId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `mlai-vibe-${randomId}`;
}

function readableBrowserError(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const payload = data as Record<string, unknown>;
    const message =
      asNullableString(payload.error) ??
      asNullableString(payload.detail) ??
      asNullableString(payload.message);
    if (message) return message;
  }

  if (typeof data === "string") {
    const trimmed = data.trim();
    const looksLikeHtml = /^<!doctype\s+html/i.test(trimmed) || /^<html[\s>]/i.test(trimmed) || /<title>.*<\/title>/i.test(trimmed);
    if (looksLikeHtml) {
      return `Request failed with status ${status}. Check backend logs.`;
    }
    return trimmed.length > 240 ? `${trimmed.slice(0, 237)}...` : trimmed;
  }

  return `Request failed with status ${status}`;
}

async function requestBrowserJson<T>(
  backendBaseUrl: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers);
  const requestId = headers.get("X-Request-ID") || createBrowserRequestId();
  headers.set("X-Request-ID", requestId);

  const csrfToken = getBrowserCsrfToken();
  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  const isFormDataBody = typeof FormData !== "undefined" && init?.body instanceof FormData;
  if (init?.body && !headers.has("Content-Type") && !isFormDataBody) {
    headers.set("Content-Type", "application/json");
  }

  const targetUrl = buildAbsoluteBackendUrl(backendBaseUrl, path);
  let response: Response;
  try {
    response = await fetch(targetUrl, {
      ...init,
      headers,
      credentials: "include",
    });
  } catch (error: any) {
    error.message = `Could not reach backend at ${targetUrl}. Check that your local backend is running and that BACKEND_BASE_URL and VITE_API_URL point to the right port.`;
    error.requestId = requestId;
    error.requestPath = path;
    throw error;
  }

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
    const error: any = new Error(readableBrowserError(data, response.status));
    error.status = response.status;
    error.data = data;
    error.requestId = response.headers.get("X-Request-ID") || requestId;
    error.requestPath = path;
    throw error;
  }

  return data as T;
}

function createInputSourceSummary(
  key: VibeRaisingInputSourceKey,
  status: VibeRaisingInputSourceStatus,
  overrides?: Partial<VibeRaisingInputSourceSummary>,
): VibeRaisingInputSourceSummary {
  const base = INPUT_SOURCE_DEFINITIONS[key];
  return {
    ...base,
    selected: status === "connected" || status === "syncing",
    status,
    ...overrides,
  };
}

function normalizeInputSourceStatus(value: unknown): VibeRaisingInputSourceStatus {
  const normalized = String(value || "").trim().toLowerCase();
  if (["connected", "active", "ok", "ready", "valid"].includes(normalized)) return "connected";
  if (["syncing", "running", "queued", "pending"].includes(normalized)) return "syncing";
  if (["error", "failed", "revoked", "expired", "needs_reconnect", "reauth_required"].includes(normalized)) return "error";
  if (["coming_soon", "coming-soon"].includes(normalized)) return "coming_soon";
  if (["unavailable", "not_available", "not-available", "not_configured", "not-configured"].includes(normalized)) return "unavailable";
  return "not_connected";
}

function normalizeInputSourceProvider(value: unknown): VibeRaisingInputSourceKey | null {
  const normalized = String(value || "").trim().toLowerCase().replace(/[-\s]+/g, "_");
  if (normalized === "stripe") return "stripe";
  if (normalized === "xero") return "xero";
  if (normalized === "gmail" || normalized === "google" || normalized === "google_gmail") return "gmail";
  if (normalized === "bank_feed" || normalized === "basiq") return "bank_feed";
  if (normalized === "notion") return "notion";
  if (normalized === "google_drive" || normalized === "drive") return "google_drive";
  if (normalized === "slack") return "slack";
  if (normalized === "linear") return "linear";
  return null;
}

function collectRawFinancialConnections(payload: Record<string, unknown>): unknown[] {
  const candidates = [
    payload.sources,
    payload.connections,
    payload.financialConnections,
    payload.financial_connections,
    payload.providers,
    payload.data,
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      if (Array.isArray(nested.connections)) return nested.connections;
      if (Array.isArray(nested.sources)) return nested.sources;
      if (Array.isArray(nested.financial_connections)) return nested.financial_connections;
      if (Array.isArray(nested.providers)) return nested.providers;
    }
  }
  return [];
}

function normalizeFinancialSourceSummaries(raw: unknown): Partial<Record<"stripe" | "xero" | "bank_feed", VibeRaisingInputSourceSummary>> {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const summaries: Partial<Record<"stripe" | "xero" | "bank_feed", VibeRaisingInputSourceSummary>> = {};
  const connections = collectRawFinancialConnections(payload);

  for (const rawConnection of connections) {
    if (!rawConnection || typeof rawConnection !== "object") continue;
    const connection = rawConnection as Record<string, unknown>;
    const provider = normalizeInputSourceProvider(connection.provider ?? connection.key ?? connection.source);
    if (provider !== "stripe" && provider !== "xero" && provider !== "bank_feed") continue;

    const status = normalizeInputSourceStatus(
      connection.status ??
        connection.connectionStatus ??
        connection.connection_status ??
        connection.state,
    );
    const accountLabel =
      asNullableString(connection.accountLabel) ??
      asNullableString(connection.account_label) ??
      asNullableString(connection.externalAccountName) ??
      asNullableString(connection.external_account_name) ??
      asNullableString(connection.externalAccountId) ??
      asNullableString(connection.external_account_id) ??
      asNullableString(connection.tenantName) ??
      asNullableString(connection.tenant_name) ??
      asNullableString(connection.name);
    const lastSyncedAt =
      asNullableString(connection.lastSyncedAt) ??
      asNullableString(connection.last_synced_at) ??
      asNullableString(connection.lastSyncAt) ??
      asNullableString(connection.last_sync_at);
    const warning =
      asNullableString(connection.warning) ??
      asNullableString(connection.lastError) ??
      asNullableString(connection.last_error) ??
      asNullableString(connection.error);
    const rawRequiredReportScopes = connection.requiredReportScopes ?? connection.required_report_scopes;
    const requiredReportScopes = Array.isArray(rawRequiredReportScopes)
      ? rawRequiredReportScopes.map((item) => String(item || "").trim()).filter(Boolean)
      : [];

    summaries[provider] = createInputSourceSummary(provider, status, {
      accountLabel,
      lastSyncedAt,
      warning,
      hasReportScope: asBoolean(connection.hasReportScope ?? connection.has_report_scope),
      needsReportReconnect: asBoolean(connection.needsReportReconnect ?? connection.needs_report_reconnect),
      canRequestReportScopes: asBoolean(connection.canRequestReportScopes ?? connection.can_request_report_scopes),
      needsReportScopeConfiguration: asBoolean(
        connection.needsReportScopeConfiguration ?? connection.needs_report_scope_configuration,
      ),
      requiredReportScopes,
    });
  }

  return summaries;
}

function normalizeInputSourceSummaries(raw: unknown): Partial<Record<VibeRaisingInputSourceKey, VibeRaisingInputSourceSummary>> {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const summaries: Partial<Record<VibeRaisingInputSourceKey, VibeRaisingInputSourceSummary>> = {};
  const connections = collectRawFinancialConnections(payload);

  for (const rawConnection of connections) {
    if (!rawConnection || typeof rawConnection !== "object") continue;
    const connection = rawConnection as Record<string, unknown>;
    const provider = normalizeInputSourceProvider(connection.provider ?? connection.key ?? connection.source);
    if (!provider) continue;

    const status = normalizeInputSourceStatus(
      connection.status ??
        connection.connectionStatus ??
        connection.connection_status ??
        connection.state,
    );
    const accountLabel =
      asNullableString(connection.accountLabel) ??
      asNullableString(connection.account_label) ??
      asNullableString(connection.externalAccountName) ??
      asNullableString(connection.external_account_name) ??
      asNullableString(connection.externalAccountId) ??
      asNullableString(connection.external_account_id) ??
      asNullableString(connection.tenantName) ??
      asNullableString(connection.tenant_name) ??
      asNullableString(connection.name);
    const lastSyncedAt =
      asNullableString(connection.lastSyncedAt) ??
      asNullableString(connection.last_synced_at) ??
      asNullableString(connection.lastSyncAt) ??
      asNullableString(connection.last_sync_at);
    const warning =
      asNullableString(connection.warning) ??
      asNullableString(connection.lastError) ??
      asNullableString(connection.last_error) ??
      asNullableString(connection.error);
    const selected =
      typeof connection.selected === "boolean"
        ? connection.selected
        : status === "connected" || status === "syncing";
    const selectedChannelCount =
      typeof connection.selectedChannelCount === "number" && Number.isFinite(connection.selectedChannelCount)
        ? connection.selectedChannelCount
        : Number(connection.selectedChannelCount ?? connection.selected_channel_count ?? 0) || 0;
    const selectedProjectCount =
      typeof connection.selectedProjectCount === "number" && Number.isFinite(connection.selectedProjectCount)
        ? connection.selectedProjectCount
        : Number(connection.selectedProjectCount ?? connection.selected_project_count ?? 0) || 0;
    const rawRequiredReportScopes = connection.requiredReportScopes ?? connection.required_report_scopes;
    const requiredReportScopes = Array.isArray(rawRequiredReportScopes)
      ? rawRequiredReportScopes.map((item) => String(item || "").trim()).filter(Boolean)
      : [];

    summaries[provider] = createInputSourceSummary(provider, status, {
      connectionId: (connection.connectionId ?? connection.connection_id) as number | string | null | undefined,
      accountLabel,
      lastSyncedAt,
      warning,
      selected,
      canDisconnect: asBoolean(connection.canDisconnect ?? connection.can_disconnect),
      canDeleteData: asBoolean(connection.canDeleteData ?? connection.can_delete_data),
      googlePermissionsUrl:
        asNullableString(connection.googlePermissionsUrl) ??
        asNullableString(connection.google_permissions_url),
      selectedChannelCount,
      selectedProjectCount,
      hasReportScope: asBoolean(connection.hasReportScope ?? connection.has_report_scope),
      needsReportReconnect: asBoolean(connection.needsReportReconnect ?? connection.needs_report_reconnect),
      canRequestReportScopes: asBoolean(connection.canRequestReportScopes ?? connection.can_request_report_scopes),
      needsReportScopeConfiguration: asBoolean(
        connection.needsReportScopeConfiguration ?? connection.needs_report_scope_configuration,
      ),
      requiredReportScopes,
    });
  }

  return summaries;
}

function buildConnectorReturnPath(nextUrl?: string) {
  if (nextUrl?.startsWith("/founder-tools/data-sources")) {
    try {
      const parsed = new URL(nextUrl, "https://mlai.local");
      const nestedNext = parsed.searchParams.get("next") || "/founder-tools/updates/create";
      const sanitizedNestedNext = nestedNext.startsWith("/founder-tools/updates/create")
        ? nestedNext
        : "/founder-tools/updates/create";
      return `/founder-tools/data-sources?next=${encodeURIComponent(sanitizedNestedNext)}`;
    } catch {
      return "/founder-tools/data-sources?next=%2Ffounder-tools%2Fupdates%2Fcreate";
    }
  }

  const sanitizedNext =
    nextUrl && nextUrl.startsWith("/founder-tools/updates/create")
      ? nextUrl
      : "/founder-tools/updates/create";
  return `/founder-tools/data-sources?next=${encodeURIComponent(sanitizedNext)}`;
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
    targetMonth:
      asNullableString(payload.targetMonth) ??
      asNullableString(payload.target_month) ??
      progress?.targetMonth ??
      run?.targetMonth ??
      null,
    requestedTargetMonth:
      asNullableString(payload.requestedTargetMonth) ??
      asNullableString(payload.requested_target_month) ??
      null,
    activeTargetMonth:
      asNullableString(payload.activeTargetMonth) ??
      asNullableString(payload.active_target_month) ??
      null,
    targetMonthConflict: Boolean(
      payload.targetMonthConflict ??
        payload.target_month_conflict,
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
    location: activeCompany?.location ?? null,
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
    app: "founder-tools",
    next,
  });

  return `/platform/login?${params.toString()}`;
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

// Local dev only: fake founder profile with one company lets Vibe Raising
// render without hitting api.mlai.au.
const DEV_VIBE_PROFILE_STUB: VibeRaisingProfile | null = {
  role: "founder",
  organizationName: null,
  companies: [
    {
      id: "dev-company",
      name: "Shan AI",
      domain: "shan.ai",
      abn: null,
      location: "Melbourne, Australia",
      registered: true,
    },
  ],
  activeCompanyId: "dev-company",
};

export async function getVibeRaisingProfile(
  env: Env,
  request: Request,
): Promise<VibeRaisingProfile | null> {
  if (shouldUseDevBackendStub()) {
    return DEV_VIBE_PROFILE_STUB;
  }
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
      if (shouldUseDevAuthBypass()) {
        console.warn("No backend Vibe Raising profile session in local dev; using profile stub.");
        return DEV_VIBE_PROFILE_STUB;
      }
      return null;
    }

    if (shouldUseDevAuthBypass() && !error.response) {
      console.warn("Backend Vibe Raising profile lookup failed before returning a response in local dev; using profile stub.");
      return DEV_VIBE_PROFILE_STUB;
    }

    if (shouldUseDevBackendFallback(error)) {
      console.warn("Backend unavailable in local dev; using Vibe Raising profile stub for preview.");
      return DEV_VIBE_PROFILE_STUB;
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

  if (!context.profile || !context.appUser) {
    throw redirect("/founder-tools/updates");
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
    throw redirect("/founder-tools/updates");
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
    companyLinkedInUrl?: string | null;
    abn?: string | null;
    location?: string | null;
    registered?: boolean;
    brandName?: string | null;
    companyContext?: string | null;
    competitors?: string[];
    seedKeywords?: string[];
    founderNames?: string[];
    stage?: string | null;
    organizationKind?: string | null;
    notes?: string | null;
    githubRepo?: string | null;
    articleDeliveryMode?: string | null;
    dailyDiscoveryEnabled?: boolean;
    defaultTimezone?: string | null;
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

// Local dev only: seeded monthly updates so the founder's "My Updates" page
// shows realistic content without the backend.
const DEV_MONTHLY_UPDATES_STUB: VibeRaisingMonthlyUpdate[] = [
  {
    id: "update-2026-04",
    isoMonth: "2026-04",
    month: "April 2026",
    monthName: "April",
    year: 2026,
    date: "2026-04-01T00:00:00.000Z",
    status: "draft",
    summary: "AI workflow automation for mid-market teams, with enterprise pilots converting into paid deployments.",
    sourceUrl: "https://example.com/dev-update-april",
    metrics: {
      revenue: "$62,400 MRR",
      growth: "+18% MoM",
      users: "2,140 active",
      runway: "11 months",
    },
    highlights:
      "Closed three enterprise pilots with Melbourne-based firms. Shipped a redesigned onboarding that lifted activation from 41% to 58%.",
    challenges:
      "Sales cycle for enterprise is running 6-8 weeks longer than forecast. Hiring a second AE has stalled after two declined offers.",
    asks:
      "Intros to Sydney-based CTOs evaluating internal tooling, and warm leads to senior AEs open to pre-Series A equity.",
    learnings:
      "The strongest activation lift came from guided onboarding, not additional dashboard depth.",
    next30Days:
      "Convert two enterprise pilots to paid annual agreements. Restart AE hiring with a narrower candidate profile.",
  },
  {
    id: "update-2026-03",
    isoMonth: "2026-03",
    month: "March 2026",
    monthName: "March",
    year: 2026,
    date: "2026-03-01T00:00:00.000Z",
    status: "sent",
    summary: "Analytics v2 increased engagement while the team tested pricing and retention improvements.",
    metrics: {
      revenue: "$52,900 MRR",
      growth: "+12% MoM",
      users: "1,820 active",
      runway: "12 months",
    },
    highlights:
      "Launched the v2 analytics dashboard. Early data shows users spending 2.3x longer in-app per session.",
    challenges:
      "Churn ticked up to 4.1% as a large cohort from the Q4 promo ended their trial without converting.",
    asks:
      "Feedback on our pricing experiment - considering a usage-based tier for teams under 20 seats.",
    learnings:
      "Self-serve teams need clearer usage limits before pricing conversations become productive.",
    next30Days:
      "Finish pricing interviews and ship the retention prompts for the Q4 promo cohort.",
  },
  {
    id: "update-2026-02",
    isoMonth: "2026-02",
    month: "February 2026",
    monthName: "February",
    year: 2026,
    date: "2026-02-01T00:00:00.000Z",
    status: "sent",
    summary: "Healthcare design partnership and engineering hires moved the product toward a vertical AI wedge.",
    metrics: {
      revenue: "$47,200 MRR",
      growth: "+9% MoM",
      users: "1,620 active",
      runway: "13 months",
    },
    highlights:
      "Signed our first design partner in healthcare. Team grew from 6 to 8 with two senior engineers joining.",
    challenges:
      "Infra costs rose 22% as we scaled the ML inference layer - investigating GPU spot instances.",
    asks: "Intros to AI infra investors who have conviction on vertical SaaS.",
    learnings:
      "Healthcare design partners want workflow ownership more than generic model accuracy claims.",
    next30Days:
      "Complete the healthcare workflow prototype and benchmark GPU spot savings.",
  },
];

export async function getVibeRaisingMonthlyUpdates(
  env: Env,
  request: Request,
): Promise<VibeRaisingMonthlyUpdate[]> {
  if (shouldUseDevBackendStub()) {
    return DEV_MONTHLY_UPDATES_STUB;
  }
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

    if (error.response?.status === 401 && shouldUseDevAuthBypass()) {
      console.warn("No backend monthly update session in local dev; using update stubs.");
      return DEV_MONTHLY_UPDATES_STUB;
    }

    if (shouldUseDevAuthBypass() && !error.response) {
      console.warn("Backend monthly update lookup failed before returning a response in local dev; using update stubs.");
      return DEV_MONTHLY_UPDATES_STUB;
    }

    if (shouldUseDevBackendFallback(error)) {
      console.warn("Backend unavailable in local dev; using Vibe Raising monthly update stubs for preview.");
      return DEV_MONTHLY_UPDATES_STUB;
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
    learnings: string;
    next30Days: string;
    metrics: Record<string, string>;
    metricSuggestions?: VibeRaisingMetricSuggestion[];
    summary?: string | null;
    sourceUrl?: string | null;
    videoUrl?: string | null;
    videoStoragePath?: string | null;
    videoContentType?: string | null;
    videoFileSizeBytes?: number | null;
    videoOriginalFilename?: string | null;
  },
): Promise<VibeRaisingMonthlyUpdate | null> {
  const buildDevSavedUpdate = () => {
    const month = body.month || "Update";
    const year = body.year || new Date().getFullYear();
    return normalizeMonthlyUpdate({
      ...body,
      id: `dev-update-${year}-${month.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      month,
      monthName: month,
      year,
      date: new Date(year, 0, 1).toISOString(),
      status: "sent",
    });
  };

  if (shouldUseDevBackendStub()) {
    return buildDevSavedUpdate();
  }

  const client = createApiClient(env, request);
  try {
    const response = await client.post(UPDATES_PATH, body);
    return normalizeMonthlyUpdate(response.data?.update ?? response.data);
  } catch (error: any) {
    if (error.response?.status === 401 && shouldUseDevAuthBypass()) {
      console.warn("No backend save session in local dev; returning a saved update stub.");
      return buildDevSavedUpdate();
    }

    if (shouldUseDevAuthBypass() && !error.response) {
      console.warn("Backend save failed before returning a response in local dev; returning a saved update stub.");
      return buildDevSavedUpdate();
    }

    const status = error.response?.status;
    const hasOptionalFields = Boolean(
      body.summary ||
        body.sourceUrl ||
        body.videoUrl ||
        body.learnings ||
        body.next30Days ||
        (body.metricSuggestions || []).length > 0,
    );
    if (!hasOptionalFields || (status !== 400 && status !== 422)) {
      if (shouldUseDevBackendFallback(error)) {
        console.warn("Backend unavailable in local dev; returning a saved update stub.");
        return buildDevSavedUpdate();
      }
      throw error;
    }

    try {
      const response = await client.post(UPDATES_PATH, {
        month: body.month,
        year: body.year,
        highlights: body.highlights,
        challenges: body.challenges,
        asks: body.asks,
        learnings: body.learnings,
        next30Days: body.next30Days,
        metrics: body.metrics,
      });
      return normalizeMonthlyUpdate(response.data?.update ?? response.data);
    } catch (fallbackError: any) {
      if (fallbackError.response?.status === 401 && shouldUseDevAuthBypass()) {
        console.warn("No backend save session in local dev; returning a saved update stub.");
        return buildDevSavedUpdate();
      }
      if (shouldUseDevAuthBypass() && !fallbackError.response) {
        console.warn("Backend save failed before returning a response in local dev; returning a saved update stub.");
        return buildDevSavedUpdate();
      }
      if (shouldUseDevBackendFallback(fallbackError)) {
        console.warn("Backend unavailable in local dev; returning a saved update stub.");
        return buildDevSavedUpdate();
      }
      throw fallbackError;
    }
  }
}

export async function uploadVibeRaisingUpdateVideo(
  backendBaseUrl: string,
  file: File,
  signal?: AbortSignal,
  compression?: VibeRaisingVideoCompressionMetadata,
  onPhase?: (phase: "creating_session" | "uploading" | "finalizing") => void,
): Promise<VibeRaisingVideoUploadResponse> {
  onPhase?.("creating_session");
  const session = await requestBrowserJson<VibeRaisingVideoUploadSessionResponse>(
    backendBaseUrl,
    VIDEO_UPLOAD_SESSION_PATH,
    {
      method: "POST",
      body: JSON.stringify({
        originalFilename: file.name,
        contentType: file.type,
        fileSizeBytes: file.size,
      }),
      signal,
    },
  );

  const uploadHeaders = new Headers(session.requiredHeaders || {});
  if (!uploadHeaders.has("Content-Type")) {
    uploadHeaders.set("Content-Type", session.contentType || file.type || "application/octet-stream");
  }

  onPhase?.("uploading");
  let uploadResponse: Response;
  try {
    uploadResponse = await fetch(session.uploadUrl, {
      method: "PUT",
      headers: uploadHeaders,
      body: file,
      signal,
    });
  } catch (error: any) {
    error.requestPath = "signed-storage-upload";
    error.message = "Storage upload failed before the file reached Firebase. Check Firebase Storage CORS and try again.";
    throw error;
  }

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text().catch(() => "");
    const error: any = new Error(
      uploadResponse.status === 403
        ? "The video upload session expired. Please select the video again."
        : errorText || `Storage upload failed with status ${uploadResponse.status}`,
    );
    error.status = uploadResponse.status;
    error.data = errorText;
    error.requestPath = "signed-storage-upload";
    throw error;
  }

  onPhase?.("finalizing");
  return requestBrowserJson<VibeRaisingVideoUploadResponse>(
    backendBaseUrl,
    VIDEO_UPLOAD_COMPLETE_PATH,
    {
      method: "POST",
      body: JSON.stringify({
        storagePath: session.storagePath,
        originalFilename: file.name,
        contentType: session.contentType || file.type,
        fileSizeBytes: file.size,
        compression,
      }),
      signal,
    },
  );
}

export async function bootstrapVibeRaisingStartupUpdate(
  backendBaseUrl: string,
  options?: { next?: string },
): Promise<VibeRaisingStartupUpdateBootstrapResponse> {
  const path = options?.next
    ? `${STARTUP_UPDATE_BOOTSTRAP_PATH}?next=${encodeURIComponent(options.next)}`
    : STARTUP_UPDATE_BOOTSTRAP_PATH;
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    path,
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

export async function getVibeRaisingInputSourcesStatus(
  backendBaseUrl: string,
): Promise<VibeRaisingInputSourcesStatusResponse> {
  try {
    const response = await requestBrowserJson<Record<string, unknown>>(
      backendBaseUrl,
      INPUT_SOURCES_STATUS_PATH,
      { method: "GET" },
    );
    const summaries = normalizeInputSourceSummaries(response);
    const sources = (Object.keys(INPUT_SOURCE_DEFINITIONS) as VibeRaisingInputSourceKey[]).map((key) => (
      summaries[key] ?? createInputSourceSummary(key, "not_connected")
    ));
    return {
      sources,
      financeUnavailable: Boolean(response.financeUnavailable ?? response.finance_unavailable),
    };
  } catch (error: any) {
    if (error?.status && error.status !== 404 && error.status !== 405) {
      throw error;
    }
  }

  const [gmailResult, financeResult] = await Promise.allSettled([
    requestBrowserJson<Record<string, unknown>>(
      backendBaseUrl,
      STARTUP_UPDATE_BOOTSTRAP_PATH,
      { method: "POST" },
    ),
    requestBrowserJson<Record<string, unknown>>(
      backendBaseUrl,
      FINANCIAL_STATUS_PATH,
      { method: "GET" },
    ),
  ]);

  const sources: VibeRaisingInputSourceSummary[] = [];

  if (gmailResult.status === "fulfilled") {
    sources.push(createInputSourceSummary(
      "gmail",
      Boolean(gmailResult.value.googleConnected ?? gmailResult.value.google_connected)
        ? "connected"
        : "not_connected",
      {
        accountLabel:
          asNullableString(gmailResult.value.googleEmail) ??
          asNullableString(gmailResult.value.google_email) ??
          asNullableString(gmailResult.value.email),
      },
    ));
  } else {
    sources.push(createInputSourceSummary("gmail", "error", {
      warning:
        (gmailResult.reason as { data?: { error?: string; detail?: string }; message?: string })?.data?.error ??
        (gmailResult.reason as { data?: { error?: string; detail?: string }; message?: string })?.data?.detail ??
        (gmailResult.reason instanceof Error ? gmailResult.reason.message : "Gmail status is unavailable."),
    }));
  }

  let financeUnavailable = false;
  let financialSummaries: Partial<Record<"stripe" | "xero" | "bank_feed", VibeRaisingInputSourceSummary>> = {};
  if (financeResult.status === "fulfilled") {
    financialSummaries = normalizeFinancialSourceSummaries(financeResult.value);
  } else {
    financeUnavailable = true;
  }

  for (const key of ["stripe", "xero", "bank_feed"] as const) {
    sources.push(
      financialSummaries[key] ??
        createInputSourceSummary(key, financeUnavailable ? "unavailable" : "not_connected", {
          warning: financeUnavailable ? "Financial connector status is not available on this backend yet." : null,
        }),
    );
  }

  for (const key of ["notion", "google_drive", "slack", "linear"] as const) {
    sources.push(createInputSourceSummary(key, "unavailable", {
      selected: false,
      warning: "This connector is not available on this backend yet.",
    }));
  }

  return { sources, financeUnavailable };
}

const CONNECTOR_PROVIDER_SLUGS: Record<Exclude<VibeRaisingInputSourceKey, "gmail">, string> = {
  stripe: "stripe",
  xero: "xero",
  bank_feed: "bank-feed",
  notion: "notion",
  google_drive: "google-drive",
  slack: "slack",
  linear: "linear",
};

export function connectVibeRaisingInputSource(
  backendBaseUrl: string,
  provider: Exclude<VibeRaisingInputSourceKey, "gmail">,
  nextUrl?: string,
): string {
  const normalizedBase = backendBaseUrl.endsWith("/") ? backendBaseUrl : `${backendBaseUrl}/`;
  const url = new URL(`integrations/connect/${CONNECTOR_PROVIDER_SLUGS[provider]}`, normalizedBase);
  url.searchParams.set("next", buildConnectorReturnPath(nextUrl));
  return url.toString();
}

export async function syncVibeRaisingFinancialSources(
  backendBaseUrl: string,
  providers?: Array<Extract<VibeRaisingInputSourceKey, "stripe" | "xero" | "bank_feed">>,
): Promise<VibeRaisingFinancialSyncResponse> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    FINANCIAL_SYNC_PATH,
    {
      method: "POST",
      body: providers?.length ? JSON.stringify({ providers }) : undefined,
    },
  );
  const runs = collectRawList(payload, ["syncRuns", "sync_runs"])
    .map(normalizeFinancialSyncRun)
    .filter((run): run is VibeRaisingFinancialSyncRun => run !== null);
  return {
    status: asNullableString(payload.status) ?? "queued",
    syncRuns: runs,
  };
}

function normalizeFinancialSyncRun(raw: unknown): VibeRaisingFinancialSyncRun | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const rawWarnings = payload.metricWarnings ?? payload.metric_warnings;
  const rawMetricsPublishedCount = payload.metricsPublishedCount ?? payload.metrics_published_count;
  const metricsPublishedCount =
    typeof rawMetricsPublishedCount === "number" && Number.isFinite(rawMetricsPublishedCount)
      ? rawMetricsPublishedCount
      : Number(rawMetricsPublishedCount ?? 0) || 0;
  return {
    provider:
      asNullableString(payload.provider) ??
      asNullableString(payload.source) ??
      "unknown",
    status: asNullableString(payload.status) ?? "queued",
    error:
      asNullableString(payload.error) ??
      asNullableString(payload.detail),
    hasReportScope: asBoolean(payload.hasReportScope ?? payload.has_report_scope),
    needsReportReconnect: asBoolean(payload.needsReportReconnect ?? payload.needs_report_reconnect),
    canRequestReportScopes: asBoolean(payload.canRequestReportScopes ?? payload.can_request_report_scopes),
    needsReportScopeConfiguration: asBoolean(
      payload.needsReportScopeConfiguration ?? payload.needs_report_scope_configuration,
    ),
    metricsPublishedCount,
    metricWarnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

export async function syncVibeRaisingInputSources(
  backendBaseUrl: string,
  providers?: VibeRaisingInputSourceKey[],
): Promise<Record<string, unknown>> {
  return requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    INPUT_SOURCES_SYNC_PATH,
    {
      method: "POST",
      body: providers?.length ? JSON.stringify({ providers }) : undefined,
    },
  );
}

function normalizeBankFeedAccount(raw: unknown): VibeRaisingBankFeedAccount | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.accountId ?? payload.account_id ?? payload.externalAccountId ?? payload.external_account_id;
  const externalAccountId =
    asNullableString(payload.externalAccountId) ??
    asNullableString(payload.external_account_id) ??
    asNullableString(payload.accountId) ??
    asNullableString(payload.account_id) ??
    String(id ?? "");
  if (!externalAccountId) return null;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : externalAccountId,
    connectionId: (payload.connectionId ?? payload.connection_id) as number | string | null | undefined,
    externalAccountId,
    institutionName:
      asNullableString(payload.institutionName) ??
      asNullableString(payload.institution_name),
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label) ??
      asNullableString(payload.name) ??
      externalAccountId,
    accountType:
      asNullableString(payload.accountType) ??
      asNullableString(payload.account_type) ??
      asNullableString(payload.type),
    status: asNullableString(payload.status),
    currency: asNullableString(payload.currency),
    balance: asNullableString(payload.balance),
    availableFunds:
      asNullableString(payload.availableFunds) ??
      asNullableString(payload.available_funds),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
  };
}

function normalizeBankFeedTransaction(raw: unknown): VibeRaisingBankFeedTransaction | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.transactionId ?? payload.transaction_id ?? payload.externalTransactionId ?? payload.external_transaction_id;
  const externalTransactionId =
    asNullableString(payload.externalTransactionId) ??
    asNullableString(payload.external_transaction_id) ??
    asNullableString(payload.transactionId) ??
    asNullableString(payload.transaction_id) ??
    String(id ?? "");
  const externalAccountId =
    asNullableString(payload.externalAccountId) ??
    asNullableString(payload.external_account_id) ??
    asNullableString(payload.accountExternalId) ??
    asNullableString(payload.account_external_id) ??
    "";
  if (!externalTransactionId || !externalAccountId) return null;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : externalTransactionId,
    connectionId: (payload.connectionId ?? payload.connection_id) as number | string | null | undefined,
    accountId: (payload.accountId ?? payload.account_id) as number | string | null | undefined,
    externalAccountId,
    externalTransactionId,
    amount: asNullableString(payload.amount),
    currency: asNullableString(payload.currency),
    direction: asNullableString(payload.direction),
    status: asNullableString(payload.status),
    postedAt:
      asNullableString(payload.postedAt) ??
      asNullableString(payload.posted_at),
    transactionDate:
      asNullableString(payload.transactionDate) ??
      asNullableString(payload.transaction_date),
    description: asNullableString(payload.description),
    merchantName:
      asNullableString(payload.merchantName) ??
      asNullableString(payload.merchant_name),
    category: asNullableString(payload.category),
    className:
      asNullableString(payload.className) ??
      asNullableString(payload.class_name),
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
  };
}

function collectRawList(payload: Record<string, unknown>, keys: string[]): unknown[] {
  for (const key of keys) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
  }
  const data = payload.data;
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const key of keys) {
      const value = (data as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value;
    }
  }
  return [];
}

export async function getVibeRaisingBankFeedPreview(
  backendBaseUrl: string,
): Promise<VibeRaisingBankFeedPreview> {
  const [accountsPayload, transactionsPayload] = await Promise.all([
    requestBrowserJson<Record<string, unknown>>(
      backendBaseUrl,
      BANK_FEED_ACCOUNTS_PATH,
      { method: "GET" },
    ),
    requestBrowserJson<Record<string, unknown>>(
      backendBaseUrl,
      `${BANK_FEED_TRANSACTIONS_PATH}?limit=5`,
      { method: "GET" },
    ),
  ]);

  return {
    accounts: collectRawList(accountsPayload, ["accounts"])
      .map(normalizeBankFeedAccount)
      .filter((value): value is VibeRaisingBankFeedAccount => value !== null),
    transactions: collectRawList(transactionsPayload, ["transactions"])
      .map(normalizeBankFeedTransaction)
      .filter((value): value is VibeRaisingBankFeedTransaction => value !== null),
  };
}

function normalizeGmailMessagePreview(raw: unknown): VibeRaisingGmailMessagePreview | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.gmailMessageId ?? payload.gmail_message_id;
  const gmailMessageId =
    asNullableString(payload.gmailMessageId) ??
    asNullableString(payload.gmail_message_id) ??
    String(id ?? "");
  if (!gmailMessageId) return null;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : gmailMessageId,
    gmailMessageId,
    gmailThreadId:
      asNullableString(payload.gmailThreadId) ??
      asNullableString(payload.gmail_thread_id),
    subject: asNullableString(payload.subject) || "(No subject)",
    fromAddress:
      asNullableString(payload.fromAddress) ??
      asNullableString(payload.from_address),
    date:
      asNullableString(payload.date) ??
      asNullableString(payload.internalDate) ??
      asNullableString(payload.internal_date),
    internalDate:
      asNullableString(payload.internalDate) ??
      asNullableString(payload.internal_date),
    snippet: asNullableString(payload.snippet),
    relevanceLabel:
      asNullableString(payload.relevanceLabel) ??
      asNullableString(payload.relevance_label),
    hasAttachments: asBoolean(payload.hasAttachments ?? payload.has_attachments),
  };
}

export async function getVibeRaisingGmailPreview(
  backendBaseUrl: string,
  limit = 5,
): Promise<VibeRaisingGmailPreview> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    `${GMAIL_PREVIEW_PATH}?limit=${encodeURIComponent(String(limit))}`,
    { method: "GET" },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
    totalCachedMessages:
      Number(payload.totalCachedMessages ?? payload.total_cached_messages ?? 0) || 0,
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    messages: collectRawList(payload, ["messages"])
      .map(normalizeGmailMessagePreview)
      .filter((value): value is VibeRaisingGmailMessagePreview => value !== null),
  };
}

function normalizeGmailDisconnectResponse(raw: unknown): VibeRaisingGmailDisconnectResponse {
  const payload = unwrapPayload(raw) as Record<string, unknown>;
  const revocation = (payload.googleRevocation ?? payload.google_revocation ?? {}) as Record<string, unknown>;
  const deleted = (payload.deleted ?? {}) as Record<string, unknown>;
  const deletedCount = (camelKey: string, snakeKey: string) => Number(deleted[camelKey] ?? deleted[snakeKey] ?? 0) || 0;
  return {
    status: asNullableString(payload.status) || "disconnected",
    googleAccount:
      asNullableString(payload.googleAccount) ??
      asNullableString(payload.google_account),
    googleRevocation: {
      requested: asBoolean(revocation.requested),
      succeeded: asBoolean(revocation.succeeded),
      warning: asNullableString(revocation.warning),
    },
    deleted: {
      gmailMessages: deletedCount("gmailMessages", "gmail_messages"),
      gmailThreads: deletedCount("gmailThreads", "gmail_threads"),
      gmailAttachments: deletedCount("gmailAttachments", "gmail_attachments"),
      gmailCursors: deletedCount("gmailCursors", "gmail_cursors"),
      startupEvents: deletedCount("startupEvents", "startup_events"),
      startupMetrics: deletedCount("startupMetrics", "startup_metrics"),
      monthlyDrafts: deletedCount("monthlyDrafts", "monthly_drafts"),
    },
    cancelledRuns: Array.isArray(payload.cancelledRuns)
      ? payload.cancelledRuns.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
      : Array.isArray(payload.cancelled_runs)
        ? payload.cancelled_runs.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
        : [],
    googlePermissionsUrl:
      asNullableString(payload.googlePermissionsUrl) ??
      asNullableString(payload.google_permissions_url) ??
      "https://myaccount.google.com/permissions",
  };
}

export async function disconnectVibeRaisingGmail(
  backendBaseUrl: string,
  options?: { deleteDerivedData?: boolean; reason?: string },
): Promise<VibeRaisingGmailDisconnectResponse> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    GMAIL_CONNECTION_PATH,
    {
      method: "DELETE",
      body: JSON.stringify({
        deleteDerivedData: Boolean(options?.deleteDerivedData),
        reason: options?.reason || "user_request",
      }),
    },
  );
  return normalizeGmailDisconnectResponse(payload);
}

function normalizeSlackChannel(raw: unknown): VibeRaisingSlackChannel | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.channelId ?? payload.channel_id;
  const channelId =
    asNullableString(payload.channelId) ??
    asNullableString(payload.channel_id) ??
    asNullableString(payload.id);
  if (!channelId) return null;
  const channelName =
    asNullableString(payload.channelName) ??
    asNullableString(payload.channel_name) ??
    asNullableString(payload.name) ??
    channelId;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : channelId,
    channelId,
    channelName,
    name: asNullableString(payload.name) ?? channelName,
    isPrivate: asBoolean(payload.isPrivate ?? payload.is_private),
    selected: asBoolean(payload.selected),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
  };
}

export async function getVibeRaisingSlackChannels(
  backendBaseUrl: string,
  options: { cursor?: string | null; limit?: number } = {},
): Promise<VibeRaisingSlackChannelsResponse> {
  const searchParams = new URLSearchParams();
  if (options.cursor) searchParams.set("cursor", options.cursor);
  if (typeof options.limit === "number") searchParams.set("limit", String(options.limit));
  const path = searchParams.toString() ? `${SLACK_CHANNELS_PATH}?${searchParams.toString()}` : SLACK_CHANNELS_PATH;
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    path,
    { method: "GET" },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    teamId:
      asNullableString(payload.teamId) ??
      asNullableString(payload.team_id),
    channels: collectRawList(payload, ["channels"])
      .map(normalizeSlackChannel)
      .filter((value): value is VibeRaisingSlackChannel => value !== null),
    nextCursor:
      asNullableString(payload.nextCursor) ??
      asNullableString(payload.next_cursor),
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

export async function saveVibeRaisingSlackChannelSelections(
  backendBaseUrl: string,
  channelIds: string[],
): Promise<VibeRaisingSlackChannelsResponse> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    SLACK_CHANNEL_SELECTIONS_PATH,
    {
      method: "POST",
      body: JSON.stringify({ channelIds }),
    },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    teamId:
      asNullableString(payload.teamId) ??
      asNullableString(payload.team_id),
    channels: collectRawList(payload, ["selectedChannels", "selected_channels", "channels"])
      .map(normalizeSlackChannel)
      .filter((value): value is VibeRaisingSlackChannel => value !== null),
    nextCursor: null,
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

function normalizeSlackMessagePreview(raw: unknown): VibeRaisingSlackMessagePreview | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const channelId =
    asNullableString(payload.channelId) ??
    asNullableString(payload.channel_id);
  const messageTs =
    asNullableString(payload.messageTs) ??
    asNullableString(payload.message_ts);
  const text = asNullableString(payload.text) ?? "";
  if (!channelId || !messageTs) return null;
  return {
    channelId,
    channelName:
      asNullableString(payload.channelName) ??
      asNullableString(payload.channel_name),
    messageTs,
    threadTs:
      asNullableString(payload.threadTs) ??
      asNullableString(payload.thread_ts),
    authorLabel:
      asNullableString(payload.authorLabel) ??
      asNullableString(payload.author_label),
    postedAt:
      asNullableString(payload.postedAt) ??
      asNullableString(payload.posted_at),
    text,
    relevanceLabel:
      asNullableString(payload.relevanceLabel) ??
      asNullableString(payload.relevance_label),
  };
}

export async function getVibeRaisingSlackPreview(
  backendBaseUrl: string,
  limit = 5,
): Promise<VibeRaisingSlackPreview> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    `${SLACK_PREVIEW_PATH}?limit=${encodeURIComponent(String(limit))}`,
    { method: "GET" },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    teamId:
      asNullableString(payload.teamId) ??
      asNullableString(payload.team_id),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
    selectedChannels: collectRawList(payload, ["selectedChannels", "selected_channels"])
      .map(normalizeSlackChannel)
      .filter((value): value is VibeRaisingSlackChannel => value !== null),
    totalCachedMessages:
      Number(payload.totalCachedMessages ?? payload.total_cached_messages ?? 0) || 0,
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    messages: collectRawList(payload, ["messages"])
      .map(normalizeSlackMessagePreview)
      .filter((value): value is VibeRaisingSlackMessagePreview => value !== null),
  };
}

function normalizeLinearProject(raw: unknown): VibeRaisingLinearProject | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.projectId ?? payload.project_id ?? payload.linearProjectId ?? payload.linear_project_id;
  const projectId =
    asNullableString(payload.projectId) ??
    asNullableString(payload.project_id) ??
    asNullableString(payload.linearProjectId) ??
    asNullableString(payload.linear_project_id) ??
    asNullableString(payload.id);
  if (!projectId) return null;
  const projectName =
    asNullableString(payload.projectName) ??
    asNullableString(payload.project_name) ??
    asNullableString(payload.name) ??
    projectId;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : projectId,
    projectId,
    linearProjectId: projectId,
    projectName,
    name: asNullableString(payload.name) ?? projectName,
    status: asNullableString(payload.status) ?? asNullableString(payload.projectStatus) ?? asNullableString(payload.project_status),
    health: asNullableString(payload.health) ?? asNullableString(payload.projectHealth) ?? asNullableString(payload.project_health),
    selected: asBoolean(payload.selected),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
  };
}

export async function getVibeRaisingLinearProjects(
  backendBaseUrl: string,
  options: { cursor?: string | null; limit?: number } = {},
): Promise<VibeRaisingLinearProjectsResponse> {
  const searchParams = new URLSearchParams();
  if (options.cursor) searchParams.set("cursor", options.cursor);
  if (typeof options.limit === "number") searchParams.set("limit", String(options.limit));
  const path = searchParams.toString() ? `${LINEAR_PROJECTS_PATH}?${searchParams.toString()}` : LINEAR_PROJECTS_PATH;
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    path,
    { method: "GET" },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    workspaceId:
      asNullableString(payload.workspaceId) ??
      asNullableString(payload.workspace_id),
    projects: collectRawList(payload, ["projects"])
      .map(normalizeLinearProject)
      .filter((value): value is VibeRaisingLinearProject => value !== null),
    nextCursor:
      asNullableString(payload.nextCursor) ??
      asNullableString(payload.next_cursor),
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

export async function saveVibeRaisingLinearProjectSelections(
  backendBaseUrl: string,
  projectIds: string[],
): Promise<VibeRaisingLinearProjectsResponse> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    LINEAR_PROJECT_SELECTIONS_PATH,
    {
      method: "POST",
      body: JSON.stringify({ projectIds }),
    },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    workspaceId:
      asNullableString(payload.workspaceId) ??
      asNullableString(payload.workspace_id),
    projects: collectRawList(payload, ["selectedProjects", "selected_projects", "projects"])
      .map(normalizeLinearProject)
      .filter((value): value is VibeRaisingLinearProject => value !== null),
    nextCursor: null,
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

function normalizeLinearProjectPreview(raw: unknown): VibeRaisingLinearProjectPreview | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const projectId =
    asNullableString(payload.projectId) ??
    asNullableString(payload.project_id);
  if (!projectId) return null;
  const id = payload.id ?? projectId;
  const rawTeamNames = payload.teamNames ?? payload.team_names;
  const teamNames = Array.isArray(rawTeamNames)
    ? rawTeamNames.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : projectId,
    projectId,
    name: asNullableString(payload.name) ?? projectId,
    description: asNullableString(payload.description),
    statusName:
      asNullableString(payload.statusName) ??
      asNullableString(payload.status_name),
    statusType:
      asNullableString(payload.statusType) ??
      asNullableString(payload.status_type),
    health: asNullableString(payload.health),
    progress: asNullableNumber(payload.progress),
    scope: asNullableNumber(payload.scope),
    priority: asNullableNumber(payload.priority),
    leadName:
      asNullableString(payload.leadName) ??
      asNullableString(payload.lead_name),
    teamNames,
    targetDate:
      asNullableString(payload.targetDate) ??
      asNullableString(payload.target_date),
    url: asNullableString(payload.url),
    issueCount: Number(payload.issueCount ?? payload.issue_count ?? 0) || 0,
    updateCount: Number(payload.updateCount ?? payload.update_count ?? 0) || 0,
  };
}

function normalizeLinearProjectUpdatePreview(raw: unknown): VibeRaisingLinearProjectUpdatePreview | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = asNullableString(payload.id);
  if (!id) return null;
  return {
    id,
    projectId:
      asNullableString(payload.projectId) ??
      asNullableString(payload.project_id),
    projectName:
      asNullableString(payload.projectName) ??
      asNullableString(payload.project_name),
    body: asNullableString(payload.body) ?? "",
    health: asNullableString(payload.health),
    authorName:
      asNullableString(payload.authorName) ??
      asNullableString(payload.author_name),
    updatedAt:
      asNullableString(payload.updatedAt) ??
      asNullableString(payload.updated_at),
    url: asNullableString(payload.url),
  };
}

function normalizeLinearIssuePreview(raw: unknown): VibeRaisingLinearIssuePreview | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = asNullableString(payload.id);
  if (!id) return null;
  return {
    id,
    identifier: asNullableString(payload.identifier),
    projectId:
      asNullableString(payload.projectId) ??
      asNullableString(payload.project_id),
    projectName:
      asNullableString(payload.projectName) ??
      asNullableString(payload.project_name),
    title: asNullableString(payload.title) ?? "Linear issue",
    stateName:
      asNullableString(payload.stateName) ??
      asNullableString(payload.state_name),
    stateType:
      asNullableString(payload.stateType) ??
      asNullableString(payload.state_type),
    priorityLabel:
      asNullableString(payload.priorityLabel) ??
      asNullableString(payload.priority_label),
    assigneeName:
      asNullableString(payload.assigneeName) ??
      asNullableString(payload.assignee_name),
    updatedAt:
      asNullableString(payload.updatedAt) ??
      asNullableString(payload.updated_at),
    url: asNullableString(payload.url),
  };
}

export async function getVibeRaisingLinearPreview(
  backendBaseUrl: string,
  limit = 5,
): Promise<VibeRaisingLinearPreview> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    `${LINEAR_PREVIEW_PATH}?limit=${encodeURIComponent(String(limit))}`,
    { method: "GET" },
  );
  const rawWarnings = payload.warnings;
  return {
    accountLabel:
      asNullableString(payload.accountLabel) ??
      asNullableString(payload.account_label),
    workspaceId:
      asNullableString(payload.workspaceId) ??
      asNullableString(payload.workspace_id),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
    selectedProjects: collectRawList(payload, ["selectedProjects", "selected_projects"])
      .map(normalizeLinearProject)
      .filter((value): value is VibeRaisingLinearProject => value !== null),
    projects: collectRawList(payload, ["projects"])
      .map(normalizeLinearProjectPreview)
      .filter((value): value is VibeRaisingLinearProjectPreview => value !== null),
    projectUpdates: collectRawList(payload, ["projectUpdates", "project_updates"])
      .map(normalizeLinearProjectUpdatePreview)
      .filter((value): value is VibeRaisingLinearProjectUpdatePreview => value !== null),
    issues: collectRawList(payload, ["issues"])
      .map(normalizeLinearIssuePreview)
      .filter((value): value is VibeRaisingLinearIssuePreview => value !== null),
    totalCachedProjects:
      Number(payload.totalCachedProjects ?? payload.total_cached_projects ?? 0) || 0,
    totalCachedIssues:
      Number(payload.totalCachedIssues ?? payload.total_cached_issues ?? 0) || 0,
    totalCachedUpdates:
      Number(payload.totalCachedUpdates ?? payload.total_cached_updates ?? 0) || 0,
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
  };
}

function normalizeXeroRecord(raw: unknown): VibeRaisingXeroRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const payload = raw as Record<string, unknown>;
  const id = payload.id ?? payload.externalRecordId ?? payload.external_record_id;
  const externalRecordId =
    asNullableString(payload.externalRecordId) ??
    asNullableString(payload.external_record_id) ??
    String(id ?? "");
  if (!externalRecordId) return null;
  return {
    id: (typeof id === "number" || typeof id === "string") ? id : externalRecordId,
    connectionId: (payload.connectionId ?? payload.connection_id) as number | string | null | undefined,
    recordType:
      asNullableString(payload.recordType) ??
      asNullableString(payload.record_type) ??
      "xero_invoice",
    externalRecordId,
    externalTenantId:
      asNullableString(payload.externalTenantId) ??
      asNullableString(payload.external_tenant_id),
    invoiceNumber:
      asNullableString(payload.invoiceNumber) ??
      asNullableString(payload.invoice_number),
    amount: asNullableString(payload.amount),
    currency: asNullableString(payload.currency),
    direction: asNullableString(payload.direction),
    status: asNullableString(payload.status),
    postedAt:
      asNullableString(payload.postedAt) ??
      asNullableString(payload.posted_at),
    transactionDate:
      asNullableString(payload.transactionDate) ??
      asNullableString(payload.transaction_date),
    description: asNullableString(payload.description),
    contactName:
      asNullableString(payload.contactName) ??
      asNullableString(payload.contact_name),
    category: asNullableString(payload.category),
    className:
      asNullableString(payload.className) ??
      asNullableString(payload.class_name),
  };
}

export async function getVibeRaisingXeroPreview(
  backendBaseUrl: string,
): Promise<VibeRaisingXeroPreview> {
  const payload = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    XERO_PREVIEW_PATH,
    { method: "GET" },
  );
  const recurringInvoices = collectRawList(payload, ["recurringInvoices", "recurring_invoices"])
    .map(normalizeXeroRecord)
    .filter((value): value is VibeRaisingXeroRecord => value !== null);
  const recentInvoices = collectRawList(payload, ["recentInvoices", "recent_invoices"])
    .map(normalizeXeroRecord)
    .filter((value): value is VibeRaisingXeroRecord => value !== null);
  const rawCurrencies = payload.currencies;
  const rawWarnings = payload.warnings;
  const rawRequiredReportScopes = payload.requiredReportScopes ?? payload.required_report_scopes;
  return {
    tenantLabel:
      asNullableString(payload.tenantLabel) ??
      asNullableString(payload.tenant_label),
    tenantId:
      asNullableString(payload.tenantId) ??
      asNullableString(payload.tenant_id),
    lastSyncedAt:
      asNullableString(payload.lastSyncedAt) ??
      asNullableString(payload.last_synced_at),
    monthlyRecurringRevenue:
      asNullableString(payload.monthlyRecurringRevenue) ??
      asNullableString(payload.monthly_recurring_revenue),
    revenue:
      asNullableString(payload.revenue),
    revenueGrowthRate:
      asNullableString(payload.revenueGrowthRate) ??
      asNullableString(payload.revenue_growth_rate),
    burnRate:
      asNullableString(payload.burnRate) ??
      asNullableString(payload.burn_rate),
    runway:
      asNullableString(payload.runway),
    monthlyCosts:
      asNullableString(payload.monthlyCosts) ??
      asNullableString(payload.monthly_costs),
    operatingExpenses:
      asNullableString(payload.operatingExpenses) ??
      asNullableString(payload.operating_expenses),
    costOfSales:
      asNullableString(payload.costOfSales) ??
      asNullableString(payload.cost_of_sales),
    invoiceRevenue:
      asNullableString(payload.invoiceRevenue) ??
      asNullableString(payload.invoice_revenue),
    invoiceCount:
      asNullableString(payload.invoiceCount) ??
      asNullableString(payload.invoice_count),
    customerCount:
      asNullableString(payload.customerCount) ??
      asNullableString(payload.customer_count),
    recurringInvoiceCount:
      asNullableString(payload.recurringInvoiceCount) ??
      asNullableString(payload.recurring_invoice_count),
    cashCollected:
      asNullableString(payload.cashCollected) ??
      asNullableString(payload.cash_collected),
    currencies: Array.isArray(rawCurrencies)
      ? rawCurrencies.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    warnings: Array.isArray(rawWarnings)
      ? rawWarnings.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    hasReportScope: asBoolean(payload.hasReportScope ?? payload.has_report_scope),
    needsReportReconnect: asBoolean(payload.needsReportReconnect ?? payload.needs_report_reconnect),
    canRequestReportScopes: asBoolean(payload.canRequestReportScopes ?? payload.can_request_report_scopes),
    needsReportScopeConfiguration: asBoolean(
      payload.needsReportScopeConfiguration ?? payload.needs_report_scope_configuration,
    ),
    requiredReportScopes: Array.isArray(rawRequiredReportScopes)
      ? rawRequiredReportScopes.map((item) => String(item || "").trim()).filter(Boolean)
      : [],
    recurringInvoices,
    recentInvoices,
  };
}

export async function runVibeRaisingStartupUpdate(
  backendBaseUrl: string,
  options?: {
    forceRegenerate?: boolean;
    inputSources?: VibeRaisingInputSourceKey[];
    targetMonth?: string | null;
  },
): Promise<VibeRaisingStartupUpdateStatusResponse> {
  const body: Record<string, unknown> = {};
  if (options?.forceRegenerate) {
    body.forceRegenerate = true;
  }
  const targetMonth = String(options?.targetMonth || "").trim();
  if (targetMonth) {
    body.targetMonth = targetMonth;
    body.target_month = targetMonth;
  }
  const inputSources = Array.from(new Set(options?.inputSources ?? []));
  if (inputSources.length > 0) {
    body.inputSources = inputSources;
    body.input_sources = inputSources;
  }

  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    EMAIL_DRAFT_START_PATH,
    {
      method: "POST",
      body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
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
