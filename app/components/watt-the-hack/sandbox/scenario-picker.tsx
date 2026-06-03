"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchScenarios } from "~/lib/watt-the-hack-sandbox/api";
import { invalidateProgression } from "~/lib/watt-the-hack-sandbox/scenario-progression";
import { useSimStore } from "~/lib/watt-the-hack-sandbox/sim-store";
import type { ScenarioSummary } from "~/lib/watt-the-hack-sandbox/types";

export function ScenarioPicker() {
  const scenarioId = useSimStore((s) => s.scenarioId);
  const setScenarioId = useSimStore((s) => s.setScenarioId);
  const [available, setAvailable] = useState<ScenarioSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    fetchScenarios()
      .then((list) => {
        setAvailable(list);
        setError(null);
        // Reset the progression cache so the briefing's locked-mechanic
        // chips reflect the new scenario list immediately.
        invalidateProgression();
      })
      .catch((err) => setError(err.message ?? String(err)));
  }, []);

  useEffect(() => {
    refresh();
    // Re-pull when the tab regains focus — catches admin unlocks while
    // the user was away without needing a manual reload.
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [refresh]);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="scenario-picker"
        className="text-[10px] font-semibold uppercase tracking-wider text-muted"
      >
        Scenario
      </label>
      <div className="relative w-full">
        <select
          id="scenario-picker"
          value={scenarioId ?? ""}
          onChange={(e) => setScenarioId(e.target.value || null)}
          disabled={available.length === 0}
          className="w-full appearance-none rounded-md border border-[#7cffc3]/30 bg-[#0d211d] py-1.5 pl-3 pr-8 text-sm font-medium text-[#7cffc3] shadow-sm outline-none transition focus:border-[#7cffc3] focus:ring-1 focus:ring-[#7cffc3] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {available.length === 0 ? (
            <option value="">No scenarios unlocked</option>
          ) : null}
          {available.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} ({s.pool})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#7cffc3]/70">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error ? (
        <p className="mt-1 text-[11px] text-warning">
          Could not load scenarios: {error}
        </p>
      ) : null}
    </div>
  );
}
