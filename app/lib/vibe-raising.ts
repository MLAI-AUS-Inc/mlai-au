import { redirect } from "react-router";
import type { User } from "~/types/user";
import { createApiClient } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import type {
  VibeRaisingAppUser,
  VibeRaisingCompany,
  VibeRaisingDraftedContent,
  VibeRaisingProfile,
  VibeRaisingRole,
  VibeRaisingStartupUpdateBootstrapResponse,
  VibeRaisingStartupUpdateRunSummary,
  VibeRaisingStartupUpdateState,
  VibeRaisingStartupUpdateStatusResponse,
} from "~/types/vibe-raising";

const PROFILE_PATH = "/api/v1/vibe-raising/profile/";
const COMPANIES_PATH = "/api/v1/vibe-raising/companies/";
const ACTIVE_COMPANY_PATH = "/api/v1/vibe-raising/active-company/";
const STARTUP_UPDATE_BOOTSTRAP_PATH = "/api/v1/vibe-raising/startup-update/bootstrap/";
const STARTUP_UPDATE_RUN_PATH = "/api/v1/vibe-raising/startup-update/run/";
const STARTUP_UPDATE_STATUS_PATH = "/api/v1/vibe-raising/startup-update/status/";

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
    createdAt:
      asNullableString(payload.createdAt) ??
      asNullableString(payload.created_at) ??
      undefined,
    updatedAt:
      asNullableString(payload.updatedAt) ??
      asNullableString(payload.updated_at) ??
      undefined,
  };
}

function normalizeStartupUpdateState(value: unknown): VibeRaisingStartupUpdateState {
  switch (value) {
    case "needs_domain":
    case "needs_google_auth":
    case "processing":
    case "ready":
    case "failed":
      return value;
    default:
      return "failed";
  }
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
  return {
    state: normalizeStartupUpdateState(payload.state),
    googleConnected: Boolean(
      payload.googleConnected ?? payload.google_connected,
    ),
    company: payload.company ? normalizeCompany(payload.company) : null,
    run: normalizeStartupUpdateRun(payload.run),
    draft: normalizeDraftedContent(payload.draft),
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
    binding:
      response.binding && typeof response.binding === "object"
        ? {
            organizationId: Number(
              (response.binding as Record<string, unknown>).organizationId ??
                (response.binding as Record<string, unknown>).organization_id ??
                0,
            ),
            organizationDomain:
              asNullableString(
                (response.binding as Record<string, unknown>).organizationDomain,
              ) ??
              asNullableString(
                (response.binding as Record<string, unknown>).organization_domain,
              ) ??
              "",
            isDefaultForGmail: Boolean(
              (response.binding as Record<string, unknown>).isDefaultForGmail ??
                (response.binding as Record<string, unknown>).is_default_for_gmail,
            ),
          }
        : null,
    oauthUrl: asNullableString(response.oauthUrl) ?? "",
  };
}

export async function runVibeRaisingStartupUpdate(
  backendBaseUrl: string,
): Promise<VibeRaisingStartupUpdateStatusResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    STARTUP_UPDATE_RUN_PATH,
    { method: "POST" },
  );
  return normalizeStartupUpdateStatus(response);
}

export async function getVibeRaisingStartupUpdateStatus(
  backendBaseUrl: string,
): Promise<VibeRaisingStartupUpdateStatusResponse> {
  const response = await requestBrowserJson<Record<string, unknown>>(
    backendBaseUrl,
    STARTUP_UPDATE_STATUS_PATH,
    { method: "GET" },
  );
  return normalizeStartupUpdateStatus(response);
}
