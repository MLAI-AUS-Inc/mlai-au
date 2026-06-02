/**
 * Scenario progression: which scenario first introduces each mechanic.
 *
 * Derived at app load by reading the scenario list (one round-trip;
 * /sim/scenarios now includes per-scenario mechanic ids). No manual
 * ordering table to maintain — filesystem-sorted /sim/scenarios is the
 * source of truth.
 *
 * Powers the "Unlocked in <scenario>" labels on the briefing card's
 * locked-mechanic strip.
 */

"use client";

import { useEffect, useState } from "react";

import { fetchScenarios } from "./api";

export interface ProgressionEntry {
  scenarioId: string;
  scenarioTitle: string;
  scenarioIndex: number; // 0-based, in display order
}

export type Progression = Record<string, ProgressionEntry>;

let _cache: Promise<Progression> | null = null;
const _subscribers = new Set<() => void>();

async function deriveProgression(): Promise<Progression> {
  const scenarios = await fetchScenarios();
  const result: Progression = {};

  for (let i = 0; i < scenarios.length; i++) {
    const s = scenarios[i];
    for (const mid of s.mechanics ?? []) {
      if (!result[mid]) {
        result[mid] = {
          scenarioId: s.id,
          scenarioTitle: s.title,
          scenarioIndex: i,
        };
      }
    }
  }
  return result;
}

export function getProgression(): Promise<Progression> {
  if (!_cache) _cache = deriveProgression();
  return _cache;
}

/**
 * Drop the cached scenario list so the next read fetches fresh data.
 * Called by `useProgression` whenever the page is re-shown (the admin
 * may have unlocked a new scenario in the meantime) and exposed for
 * the scenario picker to invoke after it refetches the list itself.
 */
export function invalidateProgression(): void {
  _cache = null;
  for (const notify of _subscribers) notify();
}

export function useProgression(): Progression {
  const [data, setData] = useState<Progression>({});
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getProgression().then((p) => {
        if (!cancelled) setData(p);
      });
    };
    load();
    // Re-read whenever the cache is invalidated elsewhere (e.g. the
    // picker pulled a fresh scenario list after admin unlock).
    const onInvalidate = () => {
      if (cancelled) return;
      load();
    };
    _subscribers.add(onInvalidate);
    // Refresh when the tab comes back to the foreground — cheap way to
    // catch admin-side unlocks without polling.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        invalidateProgression();
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", onVisibility);
    }
    return () => {
      cancelled = true;
      _subscribers.delete(onInvalidate);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibility);
      }
    };
  }, []);
  return data;
}
