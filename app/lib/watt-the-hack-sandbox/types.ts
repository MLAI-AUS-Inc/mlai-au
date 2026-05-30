// Single-Node MVP: the entire city is one unified entity.
// State and outputs are flat — no node IDs, no edges.

export interface SimulationState {
  time: number;
  demand: number; // City demand in MW
  solar: number; // Solar generation in MW
  soc: number; // Battery state of charge (0–1)
  price?: number; // Current import tariff ($/MWh), mirrored from price_profile
  price_profile?: number[];
  [key: string]: unknown;
}

export interface SimulationOutputs {
  net_grid_power: number; // + = import from grid, − = export
  unmet_demand: number; // MW the grid couldn't supply (blackout)
  overvoltage_mw: number; // MW of export beyond the grid's absorb limit
  battery_dispatch: number; // MW the battery actually moved (+ discharge / − charge)
  emergency_generator: number; // MW the diesel generator actually ran
  curtailed_solar: number; // MW of solar disconnected this step
  fcas_reserve: number; // MW of inverter capacity held for FCAS this step (engine key: `fcas_reserve`)
  fcas_dispatch_required?: number;
  fcas_dispatch_delivered?: number;
  import_price: number; // $/MWh paid to import
  export_price: number; // $/MWh received when exporting
  step_cost: number; // $ this timestep (negative = revenue)
  cost_breakdown?: Record<string, number>;
  [key: string]: unknown;
}

export interface MetricsSummary {
  renewable_ratio: number;
  grid_stability: number;
  cost: number;
  unmet_demand_total: number;
  final_score: number;
}

export type ControllerKind = "simple" | "code";

// Simple-tab params map 1:1 to the engine's action dict — direct dev knobs.
export interface SimpleControllerParams {
  battery_flow_mw: number; // MW, + discharge / - charge
  emergency_generator: number; // MW, clipped to [0, 50]
  curtail_solar: number; // MW of solar to disconnect
  fcas_reserve_mw: number; // MW of inverter capacity reserved for FCAS revenue
}

export type ControllerSpec =
  | { kind: "simple"; params: SimpleControllerParams }
  | { kind: "code"; source: string };

export interface ScenarioSummary {
  id: string;
  title: string;
  pool: string;
  archetype: string;
  one_liner: string;
  path: string;
  // Mechanic ids active in this scenario — used to derive the
  // "unlocked in X" progression without per-scenario init calls.
  mechanics: string[];
}

export type ScenarioEventType =
  | "demand_spike"
  | "price_peak"
  | "weather"
  | "weather_anomaly" // raises forecast sigma during the window
  | "curtailment"
  | "forecast_error" // legacy alias for weather_anomaly
  | "forecast_bias" // deterministic, systematic forecast shift (channel + bias)
  | "other";

export type ScenarioEventSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

// Pure descriptive metadata for the spectator UI / broadcast view.
// NOT visible to the controller — events are ground truth, would be cheating.
export interface ScenarioEvent {
  id: string;
  type: ScenarioEventType;
  severity: ScenarioEventSeverity;
  at_step: number; // first step the event is active
  end_step: number; // last step (== at_step for point events)
  title: string; // banner headline
  description: string; // longer body for tooltips / debrief
  icon?: string; // optional — frontend maps to its icon set (e.g. lucide names)
}

export interface ScenarioMeta {
  id: string;
  title: string;
  archetype?: string;
  pool?: string;
  narrative?: {
    one_liner?: string;
    teaching_moment?: string;
    real_event?: string;
    // Long-form context shown in the briefing — what's being simulated and
    // what the player is trying to achieve. Reduces mentor load on new
    // participants.
    context?: string;
    // Optional Loom (or any video) URL — surfaced as a "Watch explainer"
    // button. Keep clips ~20–30s.
    explainer_url?: string;
  };
  events?: ScenarioEvent[];
  forecast?: {
    horizon_steps?: number;
  };

  // Backend-declared, frontend-driving — see watt_the_hack/data_loaders/scenarios.py.
  // Adding a new scenario or changing a scenario's mechanics requires zero
  // frontend changes; new mechanic *types* need one entry in lib/mechanics.ts.
  mechanics?: MechanicRef[];
  // Optional gate on which controller kinds the scenario expects. Used by
  // the tutorial scenarios to separate "feel the knobs" (simple) from
  // "write a controller" (code). When absent, both modes are allowed.
  controller_modes?: ControllerKind[];
  duration_steps?: number; // total timesteps in the run
  start_hour?: number; // wall-clock hour that t=0 represents (0..24)
  dt_hours?: number; // hours per timestep (0.25 for 15-min, 1 for hourly, ...)
  limits?: ScenarioLimits;
  penalties?: ScenarioPenalties;

  // Per CLAUDE.md: leaderboard sorts on raw cost. Baselines/weights/
  // breakdowns from the backend payload are deliberately unused in the UI.
}

// What the scenario declares is active. Frontend looks up `id` in the
// catalog (lib/mechanics.ts) to render. `config` is mechanic-specific
// detail (e.g. throughput-budget MWh, forecast horizon).
export interface MechanicRef {
  id: string;
  config?: Record<string, unknown>;
}

export interface ScenarioLimits {
  battery_capacity_mwh: number;
  max_inverter_mw: number;
  grid_max_import_mw: number;
  grid_max_export_mw: number;
  max_emergency_generator_mw: number;
}

export interface ScenarioPenalties {
  blackout_per_mwh: number;
  overvoltage_per_mwh: number;
  diesel_per_mwh: number;
  battery_wear_per_mwh: number;
  demand_charge_per_mw: number;
  export_tariff_per_mwh: number;
  fcas_revenue_per_kw_per_hour: number;
}

export interface InitResponse {
  state: SimulationState;
  steps: number;
  scenario?: ScenarioMeta | null;
}

export interface StepResponse {
  state: SimulationState;
  outputs: SimulationOutputs;
  controller_error: string | null;
}

export interface RunResponse {
  final_state: SimulationState;
  states: SimulationState[];
  outputs: SimulationOutputs[];
  metrics: MetricsSummary;
  controller_error: string | null;
}
