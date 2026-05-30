"use client";

import { create } from "zustand";

import { fetchInit, fetchRun, fetchStep, fetchScenarios } from "./api";
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
  controllerSource: string;
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
  setControllerSource: (source: string) => void;
  setScenarioId: (id: string | null) => Promise<void>;
}

const DEFAULT_PARAMS: SimpleControllerParams = {
  battery_flow_mw: 0.0,
  emergency_generator: 0.0,
  curtail_solar: 0.0,
  fcas_reserve_mw: 0.0,
};

let runToken = 0;

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
  controllerError: null,
  loading: false,
  running: false,
  error: null,
  scenarioId: null,
  scenario: null,

  init: async () => {
    set({ loading: true, error: null });
    try {
      let { scenarioId } = get();

      // If no scenarioId is selected, try to load the first available scenario
      if (!scenarioId) {
        const scenarios = await fetchScenarios();
        if (scenarios.length > 0) {
          scenarioId = scenarios[0].id;
          set({ scenarioId });
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
    set({ scenarioId: id, running: false });
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
  setControllerSource: (source) => set({ controllerSource: source }),
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
