"use client";

import { create } from "zustand";

import { fetchInit, fetchRun, fetchStep, fetchScenarios } from "./api";
import {
  emptyWorkspace,
  entryFor,
  parseWorkspace,
  serializeWorkspace,
  setApplied,
  setDraft,
  type ControllerWorkspace,
} from "./controller-drafts";
import { DEFAULT_CONTROLLER_SOURCE } from "./default-controller";
import {
  DT_HOURS,
  createMetrics,
  summariseMetrics,
  updateMetrics,
} from "./metrics";
import type {
  ControllerKind,
  ControllerSpec,
  MetricsSummary,
  ScenarioMeta,
  SimpleControllerParams,
  SimulationOutputs,
  SimulationState,
} from "./types";

// Sim duration is scenario-driven — backend returns the authoritative step
// count in InitResponse.steps. This default is only used before any
// scenario has loaded (initial empty state).
const DEFAULT_STEPS = 96;
const STEP_INTERVAL_MS = 80;

interface SimStoreState {
  steps: number;
  initialState: SimulationState | null;
  state: SimulationState | null;
  outputsHistory: SimulationOutputs[];
  statesHistory: SimulationState[];
  metricsSummary: MetricsSummary;
  metricsAccumulator: ReturnType<typeof createMetrics>;
  controllerKind: ControllerKind;
  simpleParams: SimpleControllerParams;
  // `controllerSource` is the ACTIVE scenario's applied source (what the sim
  // runs); `controllerDraft` is its live editor content. Both are mirrored
  // per-scenario in `workspace` and persisted to localStorage, so switching
  // scenarios in the picker never loses code.
  controllerSource: string;
  controllerDraft: string;
  workspace: ControllerWorkspace;
  controllerError: string | null;
  loading: boolean;
  running: boolean;
  error: string | null;
  scenarioId: string | null;
  scenario: ScenarioMeta | null;

  init: () => Promise<void>;
  step: () => Promise<void>;
  runAll: () => Promise<void>;
  fastForward: () => Promise<void>;
  pause: () => void;
  reset: () => Promise<void>;
  setControllerKind: (kind: ControllerKind) => void;
  setSimpleParams: (params: Partial<SimpleControllerParams>) => void;
  setControllerDraft: (draft: string) => void;
  applyController: () => void;
  setScenarioId: (id: string | null) => Promise<void>;
}

const DEFAULT_PARAMS: SimpleControllerParams = {
  battery_flow_mw: 0.0,
  emergency_generator: 0.0,
  curtail_solar: 0.0,
  fcas_reserve_mw: 0.0,
};

let runToken = 0;

// ---- Per-scenario draft persistence (localStorage) --------------------------
// Bump the key suffix if the persisted shape ever changes.
const WORKSPACE_STORAGE_KEY = "wth:controller-workspace:v1";
let workspaceHydrated = false;
let persistTimer: ReturnType<typeof setTimeout> | null = null;

function readPersistedWorkspace(): ControllerWorkspace | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
    return raw ? parseWorkspace(raw) : null;
  } catch {
    return null;
  }
}

// Keystrokes debounce (so we don't hit localStorage on every character);
// checkpoints like Apply / scenario-switch flush immediately.
function persistWorkspace(ws: ControllerWorkspace, immediate = false): void {
  if (typeof window === "undefined") return;
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  const write = () => {
    try {
      window.localStorage.setItem(WORKSPACE_STORAGE_KEY, serializeWorkspace(ws));
    } catch {
      // Quota exceeded or storage disabled — drafts just won't survive reload.
    }
  };
  if (immediate) write();
  else persistTimer = setTimeout(write, 500);
}

const buildControllerSpec = (
  kind: ControllerKind,
  simpleParams: SimpleControllerParams,
  controllerSource: string,
): ControllerSpec =>
  kind === "simple"
    ? { kind: "simple", params: simpleParams }
    : { kind: "code", source: controllerSource };

export const useSimStore = create<SimStoreState>((set, get) => ({
  steps: DEFAULT_STEPS,
  initialState: null,
  state: null,
  outputsHistory: [],
  statesHistory: [],
  metricsSummary: {
    renewable_ratio: 0,
    grid_stability: 0,
    cost: 0,
    unmet_demand_total: 0,
    final_score: 0,
  },
  metricsAccumulator: createMetrics(),
  controllerKind: "simple",
  simpleParams: { ...DEFAULT_PARAMS },
  controllerSource: DEFAULT_CONTROLLER_SOURCE,
  controllerDraft: DEFAULT_CONTROLLER_SOURCE,
  workspace: emptyWorkspace(),
  controllerError: null,
  loading: false,
  running: false,
  error: null,
  scenarioId: null,
  scenario: null,

  init: async () => {
    // Restore per-scenario drafts from localStorage once per session, before
    // we resolve which scenario to show.
    if (!workspaceHydrated) {
      workspaceHydrated = true;
      const restored = readPersistedWorkspace();
      if (restored) set({ workspace: restored });
    }

    set({ loading: true, error: null });
    try {
      let { scenarioId } = get();

      // If no scenarioId is selected, try to load the first available scenario
      if (!scenarioId) {
        const scenarios = await fetchScenarios();
        if (scenarios.length > 0) {
          scenarioId = scenarios[0].id;
          // Activate this scenario's saved code (or seed a fresh default).
          const entry = entryFor(
            get().workspace,
            scenarioId,
            DEFAULT_CONTROLLER_SOURCE,
          );
          set({
            scenarioId,
            controllerSource: entry.applied,
            controllerDraft: entry.draft,
          });
        } else {
          throw new Error(
            "No scenarios are currently available. Please wait for the admin to unlock a scenario.",
          );
        }
      }

      // Don't send a step count — backend uses the scenario's profile length.
      const data = await fetchInit(undefined, scenarioId);
      const dt = data.scenario?.dt_hours ?? DT_HOURS;
      set({
        initialState: data.state,
        state: data.state,
        steps: data.steps,
        outputsHistory: [],
        statesHistory: [],
        metricsSummary: {
          renewable_ratio: 0,
          grid_stability: 0,
          cost: 0,
          unmet_demand_total: 0,
          final_score: 0,
        },
        metricsAccumulator: createMetrics(dt),
        controllerError: null,
        scenario: data.scenario ?? null,
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: humanError(err) });
    }
  },

  setScenarioId: async (id) => {
    runToken += 1;
    if (id) {
      // The outgoing scenario's draft + applied source are already mirrored in
      // `workspace` (kept in sync on every edit/apply), so switching only needs
      // to load the incoming scenario's saved code — or seed a fresh default.
      const entry = entryFor(get().workspace, id, DEFAULT_CONTROLLER_SOURCE);
      set({
        scenarioId: id,
        controllerSource: entry.applied,
        controllerDraft: entry.draft,
        running: false,
      });
    } else {
      set({ scenarioId: id, running: false });
    }
    await get().init();
  },

  step: async () => {
    const {
      state,
      controllerKind,
      simpleParams,
      controllerSource,
      statesHistory,
      steps,
    } = get();
    if (!state || statesHistory.length >= steps) return;

    // Token snapshot: if a reset / scenario-change fires while we await,
    // discard this result instead of writing stale rows into the new run.
    const myToken = runToken;

    const spec = buildControllerSpec(
      controllerKind,
      simpleParams,
      controllerSource,
    );

    try {
      const data = await fetchStep(state, spec);
      if (runToken !== myToken) return;

      // Re-read the latest histories AFTER the await — they're the only
      // values that could have shifted, and we need to append to them.
      const current = get();
      const nextAcc = updateMetrics(
        current.metricsAccumulator,
        state,
        data.outputs,
      );
      set({
        state: data.state,
        outputsHistory: [...current.outputsHistory, data.outputs],
        statesHistory: [...current.statesHistory, data.state],
        metricsAccumulator: nextAcc,
        metricsSummary: summariseMetrics(nextAcc),
        controllerError: data.controller_error,
      });
    } catch (err) {
      if (runToken !== myToken) return;
      set({ error: humanError(err) });
    }
  },

  runAll: async () => {
    const { running } = get();
    if (running) return;
    runToken += 1;
    const myToken = runToken;
    set({ running: true, error: null });

    while (true) {
      const { running: stillRunning, statesHistory, steps } = get();
      if (!stillRunning || runToken !== myToken) break;
      if (statesHistory.length >= steps) break;

      await get().step();
      await sleep(STEP_INTERVAL_MS);
    }
    set({ running: false });
  },

  fastForward: async () => {
    const {
      state,
      controllerKind,
      simpleParams,
      controllerSource,
      outputsHistory,
      statesHistory,
      metricsAccumulator,
      steps,
    } = get();
    if (!state || statesHistory.length >= steps) return;

    // Cancel any in-flight runAll loop and lock the controls.
    runToken += 1;
    const myToken = runToken;
    set({ running: false, loading: true, error: null });

    const remaining = steps - statesHistory.length;
    const spec = buildControllerSpec(
      controllerKind,
      simpleParams,
      controllerSource,
    );

    try {
      const data = await fetchRun(state, spec, remaining);
      // Bail if a reset / scenario change happened while we were waiting.
      if (runToken !== myToken) return;

      // Replay metrics locally so breakdownTotals lines up with the per-step UI.
      let acc = metricsAccumulator;
      let prev: SimulationState = state;
      for (let i = 0; i < data.outputs.length; i++) {
        acc = updateMetrics(acc, prev, data.outputs[i]);
        prev = data.states[i];
      }

      set({
        state: data.final_state,
        outputsHistory: [...outputsHistory, ...data.outputs],
        statesHistory: [...statesHistory, ...data.states],
        metricsAccumulator: acc,
        metricsSummary: summariseMetrics(acc),
        controllerError: data.controller_error,
        loading: false,
      });
    } catch (err) {
      set({ loading: false, error: humanError(err) });
    }
  },

  pause: () => {
    runToken += 1;
    set({ running: false });
  },

  reset: async () => {
    runToken += 1;
    set({ running: false });
    await get().init();
  },

  setControllerKind: (kind) => set({ controllerKind: kind }),
  setSimpleParams: (params) =>
    set((s) => ({ simpleParams: { ...s.simpleParams, ...params } })),

  // Live editor edits: mirror into the active scenario's workspace entry and
  // debounce-persist so a refresh restores unsaved work.
  setControllerDraft: (draft) =>
    set((s) => {
      if (!s.scenarioId) return { controllerDraft: draft };
      const workspace = setDraft(
        s.workspace,
        s.scenarioId,
        draft,
        DEFAULT_CONTROLLER_SOURCE,
      );
      persistWorkspace(workspace);
      return { controllerDraft: draft, workspace };
    }),

  // "Apply": promote the current draft to the source the sim runs. Leaves
  // draft === applied (a clean state) and flushes to storage immediately.
  applyController: () =>
    set((s) => {
      const draft = s.controllerDraft;
      if (!s.scenarioId) return { controllerSource: draft };
      // Sync the draft first, then mark it applied, so the stored entry is
      // exactly { applied: draft, draft } regardless of prior state.
      const synced = setDraft(
        s.workspace,
        s.scenarioId,
        draft,
        DEFAULT_CONTROLLER_SOURCE,
      );
      const workspace = setApplied(
        synced,
        s.scenarioId,
        draft,
        DEFAULT_CONTROLLER_SOURCE,
      );
      persistWorkspace(workspace, true);
      return { controllerSource: draft, workspace };
    }),
}));

export function selectStepIndex(s: SimStoreState): number {
  return s.statesHistory.length;
}

export function selectBreakdownTotals(
  s: SimStoreState,
): Record<string, number> {
  return s.metricsAccumulator.breakdownTotals;
}

export function selectLatestOutputs(
  s: SimStoreState,
): SimulationOutputs | null {
  return s.outputsHistory.length > 0
    ? s.outputsHistory[s.outputsHistory.length - 1]
    : null;
}

// Align the state snapshot with selectLatestOutputs() so UI elements that show
// both state and outputs reference the same simulation timestep.
export function selectStateForLatestOutputs(
  s: SimStoreState,
): SimulationState | null {
  if (s.outputsHistory.length === 0) return s.state;
  if (s.statesHistory.length >= 2)
    return s.statesHistory[s.statesHistory.length - 2];
  return s.initialState ?? s.state;
}

function humanError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
