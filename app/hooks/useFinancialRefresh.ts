import { useEffect, useRef, useState } from "react";
import { createFinancialRefreshSession, emptyFinancialRefresh, financialRefreshScopeKey, financialRefreshTransport,
  type FinancialRefreshRecovery, type FinancialRefreshScope, type FinancialRefreshState } from "~/lib/pulse-financial-refresh";

/** Financial refresh has its own state; it cannot replace writing or save a revision. */
export function useFinancialRefresh(backendBaseUrl: string, scope: FinancialRefreshScope) {
  const scopeKey = financialRefreshScopeKey(scope);
  const [observed, setObserved] = useState<{ scope: string; state: FinancialRefreshState }>({ scope: scopeKey, state: emptyFinancialRefresh });
  const sessionRef = useRef<ReturnType<typeof createFinancialRefreshSession> | null>(null);
  const storageKey = `mlai:financial-refresh:v1:${scopeKey}`;
  useEffect(() => {
    let recovery: FinancialRefreshRecovery | null = null;
    try {
      const stored = JSON.parse(window.localStorage.getItem(storageKey) || "null");
      if (stored && typeof stored === "object") recovery = {
        ...(typeof stored.refreshId === "string" ? { refreshId: stored.refreshId } : {}),
        ...(typeof stored.lastReadyRefreshId === "string" ? { lastReadyRefreshId: stored.lastReadyRefreshId } : {}),
        ...(typeof stored.requestId === "string" ? { requestId: stored.requestId } : {}),
      };
    } catch { /* Local recovery is optional; authenticated refresh still works. */ }
    setObserved({ scope: scopeKey, state: emptyFinancialRefresh });
    const session = createFinancialRefreshSession({
      transport: financialRefreshTransport(backendBaseUrl, scope), recovery,
      onChange: state => setObserved({ scope: scopeKey, state }),
      persist: value => { try { window.localStorage.setItem(storageKey, JSON.stringify(value)); } catch { /* Keep the editor usable when storage is unavailable. */ } },
    });
    sessionRef.current = session;
    void session.recover();
    return () => { session.stop(); if (sessionRef.current === session) sessionRef.current = null; };
    // scopeKey contains all request inputs. Object identity must not restart polling while typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendBaseUrl, scopeKey, storageKey]);
  return { state: observed.scope === scopeKey ? observed.state : emptyFinancialRefresh, refresh: () => sessionRef.current?.refresh() };
}
