// Per-scenario controller code persistence.
//
// The sandbox keeps a separate code "entry" for every scenario so switching
// scenarios in the picker never loses what you wrote. Each entry has two
// slices:
//   - `applied`: the source the simulation actually runs (set by "Apply").
//   - `draft`:   the live editor content (may differ from `applied` until you
//                Apply it).
//
// Both slices are persisted to localStorage so a refresh — or coming back to a
// scenario days later — restores exactly what you had, including unsaved edits.
//
// Everything here is pure (no React, no localStorage, no zustand) so it can be
// unit-tested in isolation. The store owns the I/O; this module owns the logic.

export interface ScenarioControllerEntry {
  /** Source the simulation runs (last "Apply"ed). */
  applied: string;
  /** Live editor content; equals `applied` when there are no unsaved edits. */
  draft: string;
}

export interface ControllerWorkspace {
  byScenario: Record<string, ScenarioControllerEntry>;
}

const STORAGE_VERSION = 1;

export function emptyWorkspace(): ControllerWorkspace {
  return { byScenario: {} };
}

/**
 * The entry for a scenario, or a fresh one seeded with `fallback` for both
 * slices when the scenario has never been touched. Always returns a copy, so
 * callers can't mutate stored state by accident.
 */
export function entryFor(
  ws: ControllerWorkspace,
  scenarioId: string,
  fallback: string,
): ScenarioControllerEntry {
  const existing = ws.byScenario[scenarioId];
  if (existing) return { applied: existing.applied, draft: existing.draft };
  return { applied: fallback, draft: fallback };
}

/** Set the live draft for a scenario, preserving its applied source. */
export function setDraft(
  ws: ControllerWorkspace,
  scenarioId: string,
  draft: string,
  fallback: string,
): ControllerWorkspace {
  const entry = entryFor(ws, scenarioId, fallback);
  return {
    byScenario: {
      ...ws.byScenario,
      [scenarioId]: { applied: entry.applied, draft },
    },
  };
}

/**
 * Set the applied source for a scenario (what the sim runs), preserving the
 * draft. After an Apply the caller passes the current draft here, leaving
 * draft === applied (a clean, non-dirty state).
 */
export function setApplied(
  ws: ControllerWorkspace,
  scenarioId: string,
  applied: string,
  fallback: string,
): ControllerWorkspace {
  const entry = entryFor(ws, scenarioId, fallback);
  return {
    byScenario: {
      ...ws.byScenario,
      [scenarioId]: { applied, draft: entry.draft },
    },
  };
}

/** True when the draft has edits that haven't been Applied to the sim. */
export function isDirty(entry: ScenarioControllerEntry): boolean {
  return entry.draft !== entry.applied;
}

/**
 * Whether replacing the current draft (load template / reset / revert) would
 * throw away genuinely hand-written work and therefore warrants a confirm.
 *
 * No confirm when:
 *   - the draft is already applied (nothing unsaved to lose), or
 *   - the draft is a verbatim known source (an unmodified template/default),
 *     so swapping between starting points stays frictionless.
 * Confirm only when the draft is dirty AND custom.
 */
export function draftNeedsConfirm(
  draft: string,
  applied: string,
  knownSources: readonly string[],
): boolean {
  if (draft === applied) return false;
  if (knownSources.includes(draft)) return false;
  return true;
}

export function serializeWorkspace(ws: ControllerWorkspace): string {
  return JSON.stringify({ v: STORAGE_VERSION, byScenario: ws.byScenario });
}

/**
 * Parse a persisted workspace, tolerating any malformation — a corrupt or
 * stale localStorage payload must never break the editor, only reset it.
 */
export function parseWorkspace(raw: string): ControllerWorkspace {
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return emptyWorkspace();
    const bag = (data as { byScenario?: unknown }).byScenario;
    if (!bag || typeof bag !== "object") return emptyWorkspace();

    const byScenario: Record<string, ScenarioControllerEntry> = {};
    for (const [id, entry] of Object.entries(bag as Record<string, unknown>)) {
      if (
        entry &&
        typeof entry === "object" &&
        typeof (entry as ScenarioControllerEntry).applied === "string" &&
        typeof (entry as ScenarioControllerEntry).draft === "string"
      ) {
        const e = entry as ScenarioControllerEntry;
        byScenario[id] = { applied: e.applied, draft: e.draft };
      }
    }
    return { byScenario };
  } catch {
    return emptyWorkspace();
  }
}
