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
      <select
        id="scenario-picker"
        value={scenarioId ?? ""}
        onChange={(e) => setScenarioId(e.target.value || null)}
        disabled={available.length === 0}
        className="rounded-md border border-line bg-surface px-2 py-1 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-60"
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
      {error ? (
        <p className="mt-1 text-[11px] text-warning">
          Could not load scenarios: {error}
        </p>
      ) : null}
    </div>
  );
}
