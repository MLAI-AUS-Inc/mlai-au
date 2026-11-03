import { afterEach, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import PulseFinancialRefreshCard from "../app/components/vibe-raising/PulseFinancialRefreshCard";
import UpdateArticle from "../app/components/vibe-raising/UpdateArticle";
import { renderUpdateEditor } from "./helpers/update-editor-render";
import { createFinancialRefreshSession, emptyFinancialRefresh, financialRefreshCandidateExpired, financialRefreshCandidateId, financialRefreshScopeKey,
  financialRefreshTransport, parseFinancialRefreshJob, type FinancialRefreshJob, type FinancialRefreshRecovery,
  type FinancialRefreshScope, type FinancialRefreshState } from "../app/lib/pulse-financial-refresh";
import { normalizeFinancialHistoryPreview, type FinancialHistory } from "../app/lib/pulse-financial-history";

const scope: FinancialRefreshScope = { founderId: "founder-1", companyId: "startup-1", updateId: "42", expectedRevision: 11,
  targetMonth: "2026-08-01", inputSources: ["xero", "stripe"] };
function history(shareAmounts: boolean): FinancialHistory {
  return { schemaVersion: 1, reportingMonth: "2026-08-01", rangeStart: "2026-03-01", rangeEnd: "2026-08-31",
    cutoff: "2026-08-31", capturedAt: "2026-11-03T01:00:00Z", shareAmounts, currency: shareAmounts ? "AUD" : null,
    points: [3, 4, 5, 6, 7, 8].map(month => ({ month: `2026-0${month}-01`, revenue: shareAmounts ? 43210 : 100,
      costs: shareAmounts ? 21605 : 50, partial: false, periodEnd: new Date(Date.UTC(2026, month, 0)).toISOString().slice(0, 10) })) };
}
function job(status: FinancialRefreshJob["status"] = "ready", refreshId = "refresh-1"): FinancialRefreshJob {
  return { refreshId, status, targetMonth: scope.targetMonth, sources: [{ provider: "xero", status: "ready" }, { provider: "stripe", status: status === "partial" ? "failed" : "ready" }],
    candidate: status === "ready" || status === "partial" ? { id: `candidate-${refreshId}`, ownerPreview: history(true), audiencePreview: history(false), expiresAt: "2099-01-01T00:00:00Z" } : null };
}
function deferred<T>() { let resolve!: (value: T) => void; const promise = new Promise<T>(yes => { resolve = yes; }); return { promise, resolve }; }
async function settle() { for (let i = 0; i < 12; i++) await Promise.resolve(); }
function harness(overrides: Partial<Parameters<typeof createFinancialRefreshSession>[0]> = {}) {
  let state = emptyFinancialRefresh;
  let stored: FinancialRefreshRecovery = {};
  let timeout: (() => void) | undefined;
  let starts = 0;
  let loads = 0;
  const session = createFinancialRefreshSession({
    transport: { start: async () => { starts++; return job("queued"); }, load: async () => { loads++; return job(); } },
    onChange: value => { state = value; }, persist: value => { stored = { ...value }; }, newRequestId: () => "request-1",
    clock: { setTimeout: callback => { timeout = callback; return 1; }, clearTimeout: () => { timeout = undefined; } }, ...overrides,
  });
  return { session, state: () => state, stored: () => stored, starts: () => starts, loads: () => loads,
    tick: async () => { const callback = timeout; timeout = undefined; callback?.(); await settle(); } };
}

test("repeated clicks enqueue once and completion only supplies a financial candidate", async () => {
  const wait = deferred<FinancialRefreshJob>();
  let starts = 0;
  const h = harness({ transport: { start: async () => { starts++; return wait.promise; }, load: async () => job() } });
  const first = h.session.refresh();
  await h.session.refresh();
  expect(starts).toBe(1);
  expect(h.state().starting).toBe(true);
  wait.resolve(job("queued")); await first;
  await h.session.refresh(); expect(starts).toBe(1);
  await h.tick();
  expect(financialRefreshCandidateId(h.state())).toBe("candidate-refresh-1");
  expect(h.state()).not.toHaveProperty("summary");
  expect(h.stored()).toEqual({ refreshId: "refresh-1", lastReadyRefreshId: "refresh-1" });
  h.session.stop();
});

test("saving or switching scope disposes the observer and rejects late completion", async () => {
  const wait = deferred<FinancialRefreshJob>();
  const observed: FinancialRefreshState[] = [];
  const h = harness({ transport: { start: async () => wait.promise, load: async () => job() }, onChange: state => observed.push(state) });
  const pending = h.session.refresh();
  h.session.stop();
  wait.resolve(job()); await pending;
  expect(observed).toHaveLength(1);
  expect(observed[0].candidate).toBeNull();
  for (const change of [{ founderId: "other" }, { companyId: "other" }, { updateId: "43" }, { targetMonth: "2026-09-01" }, { expectedRevision: 12 }, { inputSources: ["xero"] as const }]) {
    expect(financialRefreshScopeKey({ ...scope, ...change } as FinancialRefreshScope)).not.toBe(financialRefreshScopeKey(scope));
  }
  expect(financialRefreshScopeKey({ ...scope, inputSources: ["stripe", "xero"] })).toBe(financialRefreshScopeKey(scope));
});

test("failure keeps the previous chart and a partial response shows source-specific status", async () => {
  let result = job();
  const h = harness({ transport: { start: async () => result, load: async () => result } });
  await h.session.refresh(); const previous = h.state().candidate;
  result = { ...job("failed", "refresh-2"), detail: "Xero needs reconnection." };
  await h.session.refresh();
  expect(h.state().candidate).toBe(previous);
  expect(h.state().error).toBe("Xero needs reconnection.");
  expect(h.stored().lastReadyRefreshId).toBe("refresh-1");
  result = job("partial", "refresh-3"); await h.session.refresh();
  expect(h.state().candidate?.id).toBe("candidate-refresh-3");
  expect(h.state().job?.sources[1].status).toBe("failed");
  h.session.stop();
});

test("recovery reloads IDs from the authenticated API and preserves an earlier candidate during failed retry", async () => {
  const loaded: string[] = [];
  const h = harness({ recovery: { refreshId: "refresh-2", lastReadyRefreshId: "refresh-1" },
    transport: { start: async () => job(), load: async id => { loaded.push(id); return job(id === "refresh-1" ? "ready" : "failed", id); } } });
  await h.session.recover();
  expect(loaded).toEqual(["refresh-1", "refresh-2"]);
  expect(h.state().candidate?.id).toBe("candidate-refresh-1");
  expect(h.state().job?.status).toBe("failed");
  h.session.stop();
});

test("uncertain start retries use the same idempotency key and polling errors resume the existing job", async () => {
  const requests: string[] = [];
  let unavailable = true;
  const h = harness({ transport: { start: async id => { requests.push(id); if (unavailable) throw new Error("Offline"); return job("running"); },
    load: async () => { if (unavailable) throw new Error("Offline"); return job(); } } });
  await h.session.refresh(); unavailable = false; await h.session.refresh();
  expect(requests).toEqual(["request-1", "request-1"]);
  unavailable = true; await h.tick(); expect(h.state().paused).toBe(true);
  unavailable = false; await h.session.refresh();
  expect(requests).toHaveLength(2);
  expect(h.state().job?.status).toBe("ready");
  h.session.stop();
});

test("job parsing rejects mismatched periods and dollar values in audience-relative previews", () => {
  expect(parseFinancialRefreshJob(job(), scope.targetMonth).candidate?.ownerPreview.shareAmounts).toBe(true);
  expect(() => parseFinancialRefreshJob(job(), "2026-09-01")).toThrow();
  const invalid = job(); invalid.candidate!.audiencePreview = history(true);
  expect(() => parseFinancialRefreshJob(invalid, scope.targetMonth)).toThrow();
  const expired = { ...emptyFinancialRefresh, candidate: { ...job().candidate!, expiresAt: "2020-01-01T00:00:00Z" } };
  expect(financialRefreshCandidateExpired(expired)).toBe(true);
  expect(financialRefreshCandidateId(expired)).toBe("candidate-refresh-1");
});

afterEach(() => { globalThis.fetch = originalFetch; });
const originalFetch = globalThis.fetch;
test("transport pins company, update, period and revision and never starts narrative generation", async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    requests.push({ url: String(url), init }); return Response.json(job());
  }) as typeof fetch;
  const transport = financialRefreshTransport("https://api.example.test", scope);
  await transport.start("request-id", new AbortController().signal);
  await transport.load("refresh-1", new AbortController().signal);
  expect(requests[0].url).toBe("https://api.example.test/api/v1/vibe-raising/financial-refresh/?company_id=startup-1");
  expect(JSON.parse(String(requests[0].init?.body))).toEqual({ requestId: "request-id", targetMonth: "2026-08-01", expectedRevision: 11, updateId: 42, inputSources: ["xero", "stripe"] });
  expect(requests[0].init?.credentials).toBe("include");
  expect(requests[1].url).toContain("financial-refresh/refresh-1/?company_id=startup-1");
});

test("private card displays owner dollars while sharing stays opt-in and published article stays relative", () => {
  const state = { ...emptyFinancialRefresh, job: job(), candidate: job().candidate };
  const html = renderToStaticMarkup(<MemoryRouter><PulseFinancialRefreshCard state={state} reportingMonth={scope.targetMonth}
    sources={["xero", "stripe"]} connectionsHref="/connections" onRefresh={() => {}} onChange={() => {}} /></MemoryRouter>);
  expect(html).toContain("$43,210.00");
  expect(html).toContain("Refresh financials");
  expect(html).not.toContain("checked=");
  expect(html).not.toContain("Use latest source figures");
  const article = renderToStaticMarkup(<MemoryRouter><UpdateArticle companyName="Example" update={{ id: "42", month: "August", year: 2026,
    date: "2026-08-31", highlights: "My writing", challenges: "", asks: "", learnings: "", next30Days: "", metrics: {},
    financialHistory: history(false), financialHistoryOwnerPreview: history(true) }} /></MemoryRouter>);
  expect(article).not.toContain("43,210");
  expect(article).toContain("Relative scale");
});


test("saved owner and audience previews fail closed if disclosure modes are swapped", () => {
  expect(normalizeFinancialHistoryPreview(history(true), true)).not.toBeNull();
  expect(normalizeFinancialHistoryPreview(history(false), false)).not.toBeNull();
  expect(normalizeFinancialHistoryPreview(history(true), false)).toBeNull();
  expect(normalizeFinancialHistoryPreview(history(false), true)).toBeNull();
});

test("the accounting chart requires selected and connected Xero, and failed refresh keeps its old chart", () => {
  const render = (sources: Array<"xero" | "stripe">, connectedSources: string[]) => renderToStaticMarkup(<MemoryRouter>
    <PulseFinancialRefreshCard state={{ ...emptyFinancialRefresh, job: job("failed"), candidate: job().candidate, error: "Xero could not refresh." }}
      reportingMonth={scope.targetMonth} sources={sources} connectedSources={connectedSources} connectionsHref="/connections" onRefresh={() => {}} onChange={() => {}} />
  </MemoryRouter>);
  const deselected = render(["stripe"], ["xero", "stripe"]);
  expect(deselected).toContain('disabled=""');
  expect(deselected).toContain("Select Xero above");
  expect(deselected).toContain("$43,210.00");
  expect(deselected).toContain("Xero could not refresh.");
  const disconnected = render(["xero", "stripe"], ["stripe"]);
  expect(disconnected).toContain('disabled=""');
  expect(disconnected).toContain("Connect Xero");
  expect(disconnected).toContain("Xero accrual");
});


test("a removed recovery job allows a fresh refresh instead of retrying its missing ID forever", async () => {
  let starts = 0;
  const h = harness({ recovery: { refreshId: "deleted-job" }, transport: {
    load: async () => { throw Object.assign(new Error("Refresh no longer available"), { status: 404 }); },
    start: async () => { starts++; return job(); },
  } });
  await h.session.recover();
  expect(h.state().error).toBe("Refresh no longer available");
  expect(h.stored().refreshId).toBeUndefined();
  await h.session.refresh();
  expect(starts).toBe(1);
  expect(h.state().candidate?.id).toBe("candidate-refresh-1");
  h.session.stop();
});


test("ordinary saves do not submit still-hydrating source choices without a financial candidate", () => {
  const html = renderUpdateEditor({}, false, { selectedInputSources: ["xero", "stripe"] });
  expect(html).not.toContain('name="financialCandidateId"');
  expect(html).not.toContain('name="inputSources"');
});
