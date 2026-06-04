import { describe, expect, mock, test } from "bun:test";

import { DEFAULT_CONTROLLER_SOURCE } from "../app/lib/watt-the-hack-sandbox/default-controller";

// In-memory localStorage shim so the store's persistence path runs under bun
// (no DOM). The store guards on `typeof window`, so defining it activates the
// real read/write code.
const ls = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => (ls.has(k) ? (ls.get(k) as string) : null),
    setItem: (k: string, v: string) => {
      ls.set(k, v);
    },
    removeItem: (k: string) => {
      ls.delete(k);
    },
  },
};

// Replace the network layer with deterministic stubs. Mocking the whole module
// also avoids loading axios / Vite-only imports it pulls in transitively.
mock.module("../app/lib/watt-the-hack-sandbox/api", () => ({
  fetchScenarios: async () => [
    { id: "duck_curve", title: "Duck Curve", pool: "sandbox" },
    { id: "frequency_frenzy", title: "Frequency Frenzy", pool: "sandbox" },
  ],
  fetchInit: async (_steps?: number, scenarioId?: string | null) => ({
    state: { time: 0 },
    steps: 10,
    scenario: { id: scenarioId ?? "duck_curve", dt_hours: 0.25 },
  }),
  fetchStep: async () => ({
    state: { time: 1 },
    outputs: {},
    controller_error: null,
  }),
  fetchRun: async () => ({
    final_state: { time: 10 },
    states: [],
    outputs: [],
    controller_error: null,
  }),
}));

// Import the store AFTER the mock is registered so it binds to the stubs.
const { useSimStore } = await import(
  "../app/lib/watt-the-hack-sandbox/sim-store"
);

const store = () => useSimStore.getState();

describe("sim-store per-scenario code persistence", () => {
  test("keeps each scenario's code separate across switches and refresh", async () => {
    // Initial load resolves the first scenario with a default controller.
    await store().init();
    expect(store().scenarioId).toBe("duck_curve");
    expect(store().controllerDraft).toBe(DEFAULT_CONTROLLER_SOURCE);
    expect(store().controllerSource).toBe(DEFAULT_CONTROLLER_SOURCE);

    // Write + Apply custom code on Duck Curve.
    store().setControllerDraft("CODE_A");
    expect(store().controllerDraft).toBe("CODE_A");
    // Editing alone doesn't change what the sim runs until Apply.
    expect(store().controllerSource).toBe(DEFAULT_CONTROLLER_SOURCE);
    store().applyController();
    expect(store().controllerSource).toBe("CODE_A");

    // Switch to Frequency Frenzy — a fresh, untouched scenario.
    await store().setScenarioId("frequency_frenzy");
    expect(store().scenarioId).toBe("frequency_frenzy");
    expect(store().controllerDraft).toBe(DEFAULT_CONTROLLER_SOURCE);
    expect(store().controllerSource).toBe(DEFAULT_CONTROLLER_SOURCE);

    // Type code here but DON'T apply it.
    store().setControllerDraft("CODE_B_UNAPPLIED");

    // Back to Duck Curve — applied code returns intact.
    await store().setScenarioId("duck_curve");
    expect(store().controllerDraft).toBe("CODE_A");
    expect(store().controllerSource).toBe("CODE_A");

    // Forward to Frequency Frenzy again — the UNAPPLIED draft survived the
    // round-trip (this is the bug the user reported: losing in-progress code).
    await store().setScenarioId("frequency_frenzy");
    expect(store().controllerDraft).toBe("CODE_B_UNAPPLIED");
    expect(store().controllerSource).toBe(DEFAULT_CONTROLLER_SOURCE);

    // Apply checkpoints flush to localStorage immediately. Simulate a refresh
    // by parsing what was persisted and confirming Duck Curve's applied code.
    const raw = ls.get("wth:controller-workspace:v1");
    expect(raw).toBeTruthy();
    const persisted = JSON.parse(raw as string);
    expect(persisted.byScenario.duck_curve.applied).toBe("CODE_A");
  });
});
