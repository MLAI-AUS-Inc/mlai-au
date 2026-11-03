import { normalizeFinancialHistory, type FinancialHistory } from "./pulse-financial-history";
import { requestBrowserJson } from "./vibe-raising";

export type FinancialProvider = "xero" | "stripe";
export interface FinancialRefreshScope {
  founderId: string;
  companyId: string;
  targetMonth: string;
  updateId?: string | null;
  creationKey?: string | null;
  expectedRevision?: number | null;
  inputSources: FinancialProvider[];
}
export interface FinancialRefreshCandidate {
  id: string;
  ownerPreview: FinancialHistory;
  audiencePreview: FinancialHistory;
  expiresAt: string;
}
export interface FinancialRefreshJob {
  refreshId: string;
  status: "queued" | "running" | "ready" | "partial" | "failed";
  targetMonth: string;
  sources: Array<{ provider: FinancialProvider; status: "pending" | "refreshing" | "ready" | "failed" | "reconnect_required"; lastRefreshedAt?: string; detail?: string }>;
  candidate: FinancialRefreshCandidate | null;
  detail?: string;
  retryAfterSeconds?: number;
}
export interface FinancialRefreshState {
  starting: boolean;
  paused: boolean;
  job: FinancialRefreshJob | null;
  candidate: FinancialRefreshCandidate | null;
  error: string | null;
}
export interface FinancialRefreshRecovery {
  requestId?: string;
  refreshId?: string;
  lastReadyRefreshId?: string;
}
export const emptyFinancialRefresh: FinancialRefreshState = { starting: false, paused: false, job: null, candidate: null, error: null };

/** Include every input which can make an in-flight financial result stale. */
export function financialRefreshScopeKey(scope: FinancialRefreshScope): string {
  return JSON.stringify([scope.founderId, scope.companyId, scope.updateId || null, scope.creationKey || null,
    scope.targetMonth, scope.expectedRevision || null, [...scope.inputSources].sort()]);
}
export function financialRefreshBusy(state: FinancialRefreshState): boolean {
  return state.starting || (!state.paused && (state.job?.status === "queued" || state.job?.status === "running"));
}
/** Keep even an expired token attached: the server must reject, never silently save older figures. */
export function financialRefreshCandidateId(state: FinancialRefreshState): string | undefined {
  return state.candidate?.id;
}
export function financialRefreshCandidateExpired(state: FinancialRefreshState, now = Date.now()): boolean {
  return Boolean(state.candidate && Date.parse(state.candidate.expiresAt) <= now);
}

/** Reject a malformed result before any private values reach the chart. */
export function parseFinancialRefreshJob(raw: unknown, targetMonth: string): FinancialRefreshJob {
  if (!raw || typeof raw !== "object") throw new Error("The financial refresh returned an invalid result.");
  const value = raw as Record<string, any>;
  if (typeof value.refreshId !== "string" || !value.refreshId || value.targetMonth !== targetMonth
    || !["queued", "running", "ready", "partial", "failed"].includes(value.status) || !Array.isArray(value.sources)) {
    throw new Error("The financial refresh does not match this update. Refresh again.");
  }
  const sources = value.sources.map((source: Record<string, any>) => {
    if (!source || !["xero", "stripe"].includes(source.provider)
      || !["pending", "refreshing", "ready", "failed", "reconnect_required"].includes(source.status)) throw new Error("The financial source status is invalid.");
    return { provider: source.provider as FinancialProvider, status: source.status as FinancialRefreshJob["sources"][number]["status"],
      ...(typeof source.lastRefreshedAt === "string" ? { lastRefreshedAt: source.lastRefreshedAt } : {}),
      ...(typeof source.detail === "string" ? { detail: source.detail } : {}) };
  });
  let candidate: FinancialRefreshCandidate | null = null;
  if (value.candidate != null) {
    const item = value.candidate;
    const ownerPreview = normalizeFinancialHistory(item.ownerPreview);
    const audiencePreview = normalizeFinancialHistory(item.audiencePreview);
    if (typeof item.id !== "string" || !item.id || !ownerPreview?.shareAmounts || !audiencePreview || audiencePreview.shareAmounts
      || ownerPreview.reportingMonth !== targetMonth || audiencePreview.reportingMonth !== targetMonth
      || ownerPreview.capturedAt !== audiencePreview.capturedAt || ownerPreview.cutoff !== audiencePreview.cutoff
      || typeof item.expiresAt !== "string" || !Number.isFinite(Date.parse(item.expiresAt))) {
      throw new Error("The refreshed chart could not be verified. Your previous figures are still here.");
    }
    candidate = { id: item.id, ownerPreview, audiencePreview, expiresAt: item.expiresAt };
  }
  if (["ready", "partial"].includes(value.status) && !candidate) throw new Error("No financial chart was returned. Your previous figures are still here.");
  return { refreshId: value.refreshId, status: value.status, targetMonth, sources, candidate,
    ...(typeof value.detail === "string" ? { detail: value.detail } : {}),
    ...(typeof value.retryAfterSeconds === "number" ? { retryAfterSeconds: value.retryAfterSeconds } : {}) };
}

export function financialRefreshTransport(backendBaseUrl: string, scope: FinancialRefreshScope) {
  const query = `?company_id=${encodeURIComponent(scope.companyId)}`;
  return {
    async start(requestId: string, signal: AbortSignal) {
      const raw = await requestBrowserJson(backendBaseUrl, `/api/v1/vibe-raising/financial-refresh/${query}`, {
        method: "POST", signal,
        body: JSON.stringify({ requestId, targetMonth: scope.targetMonth, expectedRevision: scope.expectedRevision || null,
          ...(scope.updateId ? { updateId: Number(scope.updateId) } : { creationKey: scope.creationKey }), inputSources: scope.inputSources }),
      });
      return parseFinancialRefreshJob(raw, scope.targetMonth);
    },
    async load(refreshId: string, signal: AbortSignal) {
      const raw = await requestBrowserJson(backendBaseUrl, `/api/v1/vibe-raising/financial-refresh/${encodeURIComponent(refreshId)}/${query}`, { method: "GET", signal });
      const job = parseFinancialRefreshJob(raw, scope.targetMonth);
      if (job.refreshId !== refreshId) throw new Error("The financial refresh does not match this request.");
      return job;
    },
  };
}

/** One scoped observer; disposal prevents late results and never mutates the draft. */
export function createFinancialRefreshSession(options: {
  transport: ReturnType<typeof financialRefreshTransport>;
  recovery?: FinancialRefreshRecovery | null;
  onChange: (state: FinancialRefreshState) => void;
  persist: (recovery: FinancialRefreshRecovery) => void;
  newRequestId?: () => string;
  clock?: { setTimeout: (callback: () => void, milliseconds: number) => unknown; clearTimeout: (id: any) => void };
}) {
  let state = { ...emptyFinancialRefresh };
  let recovery = { ...options.recovery };
  let disposed = false;
  let busy = false;
  let timer: unknown;
  const controller = new AbortController();
  const clock: { setTimeout: (callback: () => void, milliseconds: number) => unknown; clearTimeout: (id: any) => void } = options.clock || { setTimeout, clearTimeout };
  const emit = (patch: Partial<FinancialRefreshState>) => {
    if (disposed) return;
    state = { ...state, ...patch };
    options.onChange(state);
  };
  const persist = () => { if (!disposed) options.persist(recovery); };
  const accept = (job: FinancialRefreshJob) => {
    if (disposed) return;
    recovery.refreshId = job.refreshId;
    if (job.candidate) recovery.lastReadyRefreshId = job.refreshId;
    if (job.status !== "queued" && job.status !== "running") delete recovery.requestId;
    persist();
    emit({ job, starting: false, paused: false, error: job.status === "failed" ? job.detail || "Financial refresh failed. Your previous figures are still here." : null,
      ...(job.candidate ? { candidate: job.candidate } : {}) });
    if (job.status === "queued" || job.status === "running") {
      timer = clock.setTimeout(() => { void load(job.refreshId); }, Math.max(1000, Math.min(60_000, (job.retryAfterSeconds || 3) * 1000)));
    }
  };
  const failure = (error: unknown) => emit({ starting: false, paused: true, error: error instanceof Error ? error.message : "We couldn’t refresh your financials. Your previous figures are still here." });
  async function load(refreshId: string) {
    if (disposed || busy) return;
    busy = true;
    try { accept(await options.transport.load(refreshId, controller.signal)); }
    catch (error) {
      const status = (error as { status?: number } | null)?.status;
      if ([400, 404, 409, 410, 422].includes(status || 0)) {
        // A removed/stale job cannot be resumed. The next click starts a fresh request.
        delete recovery.refreshId;
        delete recovery.requestId;
        persist();
        emit({ job: null });
      }
      failure(error);
    }
    finally { busy = false; }
  }
  return {
    async recover() {
      if (disposed || busy) return;
      if (recovery.refreshId || recovery.lastReadyRefreshId) emit({ starting: true });
      // Recover only IDs; private values are fetched again from the authenticated server.
      if (recovery.lastReadyRefreshId && recovery.lastReadyRefreshId !== recovery.refreshId) {
        busy = true;
        try {
          const previous = await options.transport.load(recovery.lastReadyRefreshId, controller.signal);
          if (previous.candidate) emit({ candidate: previous.candidate });
        } catch { /* A deleted or expired candidate does not prevent recovery of the active request. */ }
        finally { busy = false; }
      }
      if (recovery.refreshId) await load(recovery.refreshId);
      else emit({ starting: false });
    },
    async refresh() {
      if (disposed || busy || financialRefreshBusy(state)) return;
      if (timer !== undefined) clock.clearTimeout(timer);
      if (state.paused && recovery.refreshId && (state.job?.status === "queued" || state.job?.status === "running" || !state.job)) {
        emit({ paused: false, error: null });
        await load(recovery.refreshId);
        return;
      }
      busy = true;
      recovery.requestId ||= (options.newRequestId || (() => crypto.randomUUID()))();
      delete recovery.refreshId;
      persist();
      emit({ starting: true, paused: false, error: null });
      try { accept(await options.transport.start(recovery.requestId, controller.signal)); }
      catch (error) { failure(error); }
      finally { busy = false; }
    },
    stop() { disposed = true; controller.abort(); if (timer !== undefined) clock.clearTimeout(timer); },
  };
}
