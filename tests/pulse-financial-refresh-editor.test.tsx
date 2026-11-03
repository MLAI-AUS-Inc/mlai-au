import { expect, test } from "bun:test";
import { Window } from "happy-dom";
import { useState } from "react";
import { useFinancialRefresh } from "../app/hooks/useFinancialRefresh";
import { financialRefreshCandidateId } from "../app/lib/pulse-financial-refresh";

function snapshot(shareAmounts: boolean) {
  return { schemaVersion: 1, reportingMonth: "2026-08-01", rangeStart: "2026-03-01", rangeEnd: "2026-08-31", cutoff: "2026-08-31",
    capturedAt: "2026-11-03T01:00:00Z", shareAmounts, currency: shareAmounts ? "AUD" : null,
    points: [3, 4, 5, 6, 7, 8].map(month => ({ month: `2026-0${month}-01`, revenue: shareAmounts ? 43210 : 100, costs: shareAmounts ? 21605 : 50,
      partial: false, periodEnd: new Date(Date.UTC(2026, month, 0)).toISOString().slice(0, 10) })) };
}
function completedJob() {
  return { refreshId: "job-1", status: "ready", targetMonth: "2026-08-01", sources: [{ provider: "xero", status: "ready" }],
    candidate: { id: "candidate-1", ownerPreview: snapshot(true), audiencePreview: snapshot(false), expiresAt: "2099-01-01T00:00:00Z" } };
}
function Harness() {
  const [writing, setWriting] = useState("Original writing");
  const [revision, setRevision] = useState(11);
  const { state, refresh } = useFinancialRefresh("https://api.example.test", { founderId: "founder-1", companyId: "company-1", updateId: "42",
    expectedRevision: revision, targetMonth: "2026-08-01", inputSources: ["xero"] });
  return <><textarea aria-label="Story" value={writing} onInput={event => setWriting(event.currentTarget.value)} />
    <button id="refresh" onClick={() => void refresh()}>Refresh</button><button id="save" onClick={() => setRevision(value => value + 1)}>Save</button>
    <output>{financialRefreshCandidateId(state) || "No candidate"}</output><p>{state.error}</p></>;
}

// Exercise the hook with real React updates: typing rerenders must not restart its request.
test("financial refresh preserves text typed before and during the request; saving invalidates a late result", async () => {
  const browser = new Window({ url: "https://mlai.au/founder-tools/updates/create?edit=42" });
  const originals = new Map<string, PropertyDescriptor | undefined>();
  for (const key of ["window", "document", "navigator", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "Event", "MouseEvent"] as const) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { value: key === "window" ? browser : (browser as any)[key], configurable: true, writable: true });
  }
  const originalFetch = globalThis.fetch;
  let requests = 0;
  let complete!: (response: Response) => void;
  globalThis.fetch = (async () => { requests++; return new Promise<Response>(resolve => { complete = resolve; }); }) as typeof fetch;
  const { createRoot } = await import("react-dom/client");
  const { act } = await import("react");
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  const container = browser.document.createElement("div"); browser.document.body.append(container);
  const root = createRoot(container as any);
  const type = async (text: string) => {
    const field = container.querySelector("textarea")!;
    await act(async () => { field.value = text; field.dispatchEvent(new browser.Event("input", { bubbles: true })); });
  };
  const click = async (id: string) => { await act(async () => { container.querySelector<HTMLButtonElement>(`#${id}`)!.click(); }); };
  try {
    await act(async () => { root.render(<Harness />); });
    await type("My edited story before refresh"); await click("refresh");
    await type("My edited story while refresh runs");
    expect(requests).toBe(1);
    await act(async () => { complete(Response.json(completedJob())); });
    expect(container.querySelector("textarea")!.value).toBe("My edited story while refresh runs");
    expect(container.querySelector("output")!.textContent).toBe("candidate-1");
    await click("refresh"); await type("More writing before saving"); await click("save");
    await act(async () => { complete(Response.json(completedJob())); });
    expect(container.querySelector("textarea")!.value).toBe("More writing before saving");
    expect(container.querySelector("output")!.textContent).toBe("No candidate");
    expect(requests).toBe(2);
  } finally {
    await act(async () => root.unmount());
    globalThis.fetch = originalFetch;
    delete (globalThis as any).IS_REACT_ACT_ENVIRONMENT;
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete (globalThis as any)[key];
    }
    await browser.happyDOM.close();
  }
});
