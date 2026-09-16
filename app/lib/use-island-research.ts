import { useEffect, useRef, useState } from "react";
import { createVibeMarketingClientRequestId } from "~/lib/vibe-marketing-billing";
import { EMPTY_ISLAND_BRIEF, researchIsTerminal } from "~/lib/custom-content-island";
import type { CustomIslandBrief } from "~/lib/custom-content-island";
import type { VibeMarketingRunSummary, VibeMarketingTopicPillar } from "~/types/vibe-marketing";

export interface IslandSelectionPreview {
  groups: { name: string; proposal_ids: string[]; metrics: { keyword_count: number; total_volume: number } }[];
  already_added: string[];
}

const endpoint = "/founder-tools/marketing/island-research";

export function useIslandResearch(companyId: string, onAdded: (island: VibeMarketingTopicPillar) => void) {
  const [brief, setBrief] = useState<CustomIslandBrief>(EMPTY_ISLAND_BRIEF);
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState<string | null>(null);
  const [run, setRun] = useState<VibeMarketingRunSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [busy, setBusy] = useState(false);
  const [adding, setAdding] = useState(false);
  const [saved, setSaved] = useState<VibeMarketingTopicPillar[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [preview, setPreview] = useState<IslandSelectionPreview | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const requestId = useRef(createVibeMarketingClientRequestId("island-research"));
  const mounted = useRef(true);
  const posting = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const storageKey = `island-research:v2:${companyId}`;
  const terminal = researchIsTerminal(run?.status);

  useEffect(() => {
    mounted.current = true;
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (stored?.brief && typeof stored.brief.subject === "string") {
        setBrief({ ...EMPTY_ISLAND_BRIEF, ...stored.brief });
        setStep(Math.max(0, Math.min(2, Number(stored.step) || 0)));
        if (typeof stored.runId === "string") setRunId(stored.runId);
        if (Array.isArray(stored.selected)) setSelected(stored.selected.filter((id: unknown) => typeof id === "string"));
        if (typeof stored.requestId === "string") requestId.current = stored.requestId;
      }
    } catch { /* Session storage can be unavailable. The in-page draft still works. */ }
    setHydrated(true);
    return () => { mounted.current = false; abort.current?.abort(); };
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify({ brief, step, runId, selected, requestId: requestId.current })); } catch { /* Optional persistence. */ }
  }, [brief, step, runId, selected, hydrated, storageKey]);

  useEffect(() => {
    if (!runId || terminal) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    async function poll() {
      try {
        const response = await fetch(`${endpoint}?${new URLSearchParams({ runId: runId!, companyId })}`, { signal: controller.signal });
        const data = await response.json() as VibeMarketingRunSummary;
        if (stopped) return;
        if (response.status === 404) {
          setRun({ runId: runId!, status: "not_found" } as VibeMarketingRunSummary);
          setError("This research is no longer available. Your topic brief is still here.");
          return;
        }
        if (!response.ok || !data.runId) throw new Error("We’re having trouble getting a progress update. We’ll keep checking; you won’t be charged again.");
        setRun(data);
        setError(null);
        if (researchIsTerminal(data.status)) return;
      } catch (failure) {
        if (stopped) return;
        setError(failure instanceof Error ? failure.message : "Progress updates are temporarily unavailable.");
      }
      if (!stopped) timer = setTimeout(poll, 4000);
    }
    void poll();
    return () => { stopped = true; clearTimeout(timer); controller.abort(); };
  }, [runId, companyId, terminal]);

  async function post(body: Record<string, unknown>) {
    abort.current = new AbortController();
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, companyId }), signal: abort.current.signal });
    const data = await response.json() as { runId?: string; islands?: VibeMarketingTopicPillar[]; groups?: IslandSelectionPreview["groups"]; already_added?: string[]; error?: string; paymentRequired?: boolean };
    if (!mounted.current) return null;
    if (!response.ok && !data.runId) {
      setPaymentRequired(Boolean(data.paymentRequired));
      throw new Error(data.error || "We couldn’t complete this request. Your brief is saved; please try again.");
    }
    return data;
  }

  async function research() {
    if (posting.current || runId) return;
    posting.current = true;
    setBusy(true); setError(null); setPaymentRequired(false);
    try {
      const data = await post({ action: "research", ...brief, clientRequestId: requestId.current });
      if (data?.runId) { setRun(null); setRunId(data.runId); }
      else if (data) throw new Error("Research could not be confirmed. Try again to check the same request.");
    } catch (failure) {
      if (mounted.current) setError(failure instanceof Error ? failure.message : "Research could not start. Please try again.");
    } finally { posting.current = false; if (mounted.current) setBusy(false); }
  }

  function select(ids: string[]) { setSelected(ids); setPreview(null); setError(null); }

  async function reviewSelection() {
    if (posting.current || !runId || !selected.length) return;
    posting.current = true; setAdding(true); setError(null);
    try {
      const data = await post({ action: "preview", runId, proposalIds: selected });
      if (data?.groups) setPreview({ groups: data.groups, already_added: data.already_added || [] });
    } catch (failure) {
      if (mounted.current) setError(failure instanceof Error ? failure.message : "Your selection could not be reviewed. Please try again.");
    } finally { posting.current = false; if (mounted.current) setAdding(false); }
  }

  async function adopt() {
    if (posting.current || !runId || !selected.length || !preview) return;
    posting.current = true; setAdding(true); setError(null);
    try {
      const data = await post({ action: "adopt", runId, proposalIds: selected });
      if (data?.islands?.length) {
        setSaved(data.islands); onAdded(data.islands[0]);
        setRun(current => current ? { ...current, result: { ...current.result,
          adopted_proposal_ids: [...new Set([...(Array.isArray(current.result?.adopted_proposal_ids) ? current.result.adopted_proposal_ids as string[] : []), ...selected])] } } : current);
        setSelected([]); setPreview(null);
      }
    } catch (failure) {
      if (mounted.current) setError(failure instanceof Error ? failure.message : "The islands could not be added. Please try again.");
    } finally { posting.current = false; if (mounted.current) setAdding(false); }
  }

  function refine() {
    if (!terminal) return;
    requestId.current = createVibeMarketingClientRequestId("island-research");
    setRunId(null); setRun(null); setSaved(null); setSelected([]); setPreview(null); setError(null); setStep(0);
  }
  return { brief, setBrief, step, setStep, runId, run, error, paymentRequired, busy, adding, saved, terminal, research, adopt, refine, selected, select, preview, setPreview, reviewSelection, setSaved };
}
