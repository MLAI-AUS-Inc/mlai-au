import { useEffect, useState, useCallback } from "react";

export type MetricKey = "revenue" | "customers" | "runway";

export type DataSource = "stripe" | "google-analytics";

export type ValleyUpdate = {
  id: string;
  month: string; // e.g. "2026-04"
  metrics: {
    revenueMrr: number;
    revenueArr: number;
    customers: number;
    runwayMonths: number;
  };
  memo: {
    highlights: string;
    challenges: string;
    ask: string;
  };
  publishedAt: string; // ISO
  source: "stripe" | "ga" | "manual";
};

export type ValleyDraft = {
  month: string;
  metrics: ValleyUpdate["metrics"];
  memo: ValleyUpdate["memo"];
};

export type ValleyState = {
  founder: {
    name: string;
    title: string;
    company: string;
    domain: string;
    location: string;
    stage: string;
    orgType: string;
    abn: string;
    bio: string;
    whatYouDo: string;
  };
  connectedSources: DataSource[];
  drafts: ValleyDraft | null;
  published: ValleyUpdate[];
};

const STORAGE_KEY = "valley.state.v1";

const SEED_STATE: ValleyState = {
  founder: {
    name: "Mira Halvorsen",
    title: "Co-founder & CEO",
    company: "Loamly",
    domain: "loamly.com.au",
    location: "Melbourne, VIC",
    stage: "Pre-seed",
    orgType: "Pty Ltd",
    abn: "82 614 209 538",
    bio: "Soil-health analytics for regenerative growers. Ex-CSIRO, second-time founder.",
    whatYouDo:
      "Loamly turns a $40 soil probe + satellite data into a paddock-by-paddock regen plan that pays for itself in one season.",
  },
  connectedSources: [],
  drafts: null,
  published: [
    {
      id: "u-feb",
      month: "2026-02",
      metrics: { revenueMrr: 3400, revenueArr: 40800, customers: 7, runwayMonths: 14 },
      memo: {
        highlights:
          "Signed first two paying broadacre customers (NSW + WA). Soil-probe ingest pipeline is live.",
        challenges:
          "Onboarding takes 6 hours per farm — need to compress this before scaling sales.",
        ask: "Intros to ag-tech operators who've shipped hardware+SaaS bundles.",
      },
      publishedAt: "2026-03-04T22:00:00.000Z",
      source: "manual",
    },
  ],
};

function safeParse(raw: string | null): ValleyState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ValleyState;
    if (!parsed.founder || !Array.isArray(parsed.published)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readState(): ValleyState {
  if (typeof window === "undefined") return SEED_STATE;
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
  return parsed ?? SEED_STATE;
}

function writeState(state: ValleyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("valley:state"));
}

export function resetValleyState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("valley:state"));
}

export function useValleyState() {
  const [state, setState] = useState<ValleyState>(SEED_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
    const onChange = () => setState(readState());
    window.addEventListener("valley:state", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("valley:state", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = useCallback((patch: Partial<ValleyState> | ((s: ValleyState) => ValleyState)) => {
    setState((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      writeState(next);
      return next;
    });
  }, []);

  return { state, update, hydrated };
}

// "Live" mocked feed for connected sources.
export function liveMetricsFor(month: string, connected: DataSource[]) {
  // Slight month-over-month deltas so each update feels real.
  const monthIndex = Number(month.split("-")[1] ?? "1");
  const base = {
    revenueMrr: 3400 + monthIndex * 1100,
    customers: 7 + monthIndex,
    runwayMonths: 14 - Math.floor(monthIndex / 2),
  };
  return {
    revenueMrr: connected.includes("stripe") ? base.revenueMrr : 0,
    revenueArr: connected.includes("stripe") ? base.revenueMrr * 12 : 0,
    customers: connected.includes("google-analytics") ? base.customers : 0,
    runwayMonths: base.runwayMonths,
  };
}

export function verifiedStatus(state: ValleyState) {
  const publishedCount = state.published.length;
  const hasSource = state.connectedSources.length > 0;
  const setupComplete = Boolean(state.founder.abn && state.founder.company);
  const verified = publishedCount >= 3 && hasSource && setupComplete;
  return { publishedCount, hasSource, setupComplete, verified };
}

export function formatMonth(month: string) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, (m ?? 1) - 1, 1);
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function nextMonth(state: ValleyState): string {
  if (state.published.length === 0) return "2026-03";
  const last = state.published
    .map((u) => u.month)
    .sort()
    .at(-1)!;
  const [y, m] = last.split("-").map(Number);
  const d = new Date(y, m, 1); // month is 1-based, so this is next month
  const ny = d.getFullYear();
  const nm = String(d.getMonth() + 1).padStart(2, "0");
  return `${ny}-${nm}`;
}
