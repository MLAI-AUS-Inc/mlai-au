/**
 * Mechanic catalog — the frontend's display vocabulary.
 *
 * The backend declares which mechanics a scenario uses (see
 * `scenario_mechanics()` in watt_the_hack/data_loaders/scenarios.py).
 * The frontend looks each id up here and renders the matching slider,
 * cost-tile contribution, grid-view node, and briefing copy.
 *
 * To add a NEW MECHANIC TYPE (e.g. Frequency Frenzy's `frequency_response`):
 *   1. Add a row to MECHANICS below.
 *   2. Engine: implement the cost contribution + action handling.
 *   3. Scenario JSON: enable the feature flag.
 * That's it. Adding a new SCENARIO that reuses existing mechanics needs
 * no frontend changes at all.
 *
 * Unknown mechanic ids (declared by a scenario but missing here) render
 * via a minimal placeholder — they don't crash the UI.
 */

import {
  BatteryFullIcon,
  CloudIcon,
  CloudLightningIcon,
  EyeIcon,
  FingerprintIcon,
  FuelIcon,
  GaugeIcon,
  ScaleIcon,
  ScissorsIcon,
  ShieldAlertIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

export type CostGroup =
  | "battery"
  | "grid"
  | "penalties"
  | "carbon"
  | "fcas"
  | "diesel";

export interface MechanicSlider {
  // Action-dict key the slider writes into. Matches the engine action keys.
  actionKey: "battery_flow_mw" | "emergency_generator" | "curtail_solar" | "fcas_reserve_mw";
  label: string;
  min: number;
  max: number;
  step: number;
  description: string; // tooltip / inline help
}

export interface MechanicDef {
  id: string;
  label: string; // short title shown in briefing chip + tile headers
  short: string; // one-line description for the legend
  long: string; // detailed copy shown in the briefing card on hover
  icon: LucideIcon;
  iconTint: string; // tailwind text colour for icon and badges
  iconBg: string; // tailwind bg colour for the icon chip
  // Simple-tab slider this mechanic owns (or none — read-only mechanics
  // like `forecast` and `throughput_budget` contribute no slider).
  slider?: MechanicSlider;
  // Which cost-breakdown keys (from outputs.cost_breakdown) this mechanic
  // contributes to. Drives MetricsPanel tile composition.
  costKeys: string[];
  costGroup: CostGroup;
}

// ---- catalog ---------------------------------------------------------------

export const MECHANICS: Record<string, MechanicDef> = {
  battery: {
    id: "battery",
    label: "Battery",
    short: "Store cheap energy, discharge into peaks.",
    long: "Charge (negative `battery_flow_mw`) when energy is cheap or solar is abundant; discharge (positive) to cover demand at peak prices. Each MWh moved costs $50 in wear — only arbitrage on spreads above $100/MWh roundtrip.",
    icon: BatteryFullIcon,
    iconTint: "text-blue-700",
    iconBg: "bg-blue-50",
    slider: {
      actionKey: "battery_flow_mw",
      label: "battery_flow_mw",
      min: -50,
      max: 50,
      step: 1,
      description:
        "MW from battery. + discharges, − charges. Clipped to inverter and SOC bounds by the engine.",
    },
    costKeys: ["battery_wear"],
    costGroup: "battery",
  },

  diesel: {
    id: "diesel",
    label: "Diesel backup",
    short: "Emergency dispatch when imports hit the grid cap.",
    long: "Last-resort generator. Runs at $1000/MWh — pricey, but a tenth of the $10000/MWh blackout penalty. Use to cover the gap when net import exceeds the grid's import ceiling.",
    icon: FuelIcon,
    iconTint: "text-red-700",
    iconBg: "bg-rose-50",
    slider: {
      actionKey: "emergency_generator",
      label: "emergency_generator",
      min: 0,
      max: 50,
      step: 1,
      description: "MW from diesel backup. Clipped to [0, max].",
    },
    costKeys: ["generator_fuel"],
    costGroup: "diesel",
  },

  curtailment: {
    id: "curtailment",
    label: "Solar curtailment",
    short: "Disconnect surplus solar to avoid overvoltage.",
    long: "Free protection. Curtailing 1 MWh costs nothing; letting that MWh become overvoltage costs $5000/MWh. Always curtail before letting export exceed the grid's export cap.",
    icon: ScissorsIcon,
    iconTint: "text-amber-700",
    iconBg: "bg-amber-50",
    slider: {
      actionKey: "curtail_solar",
      label: "curtail_solar",
      min: 0,
      max: 50,
      step: 1,
      description: "MW of solar to disconnect this step.",
    },
    costKeys: [],
    costGroup: "penalties",
  },

  fcas: {
    id: "fcas",
    label: "FCAS reserve",
    short: "A paid standby bid — promise MW to the grid, get paid to stay ready.",
    long:
      "FCAS is a BID, not a discharge. Setting fcas_reserve_mw just promises to keep that many MW available for the grid — you move no energy and pay nothing to bid. You're paid $40/MW/h to hold it ready whether or not it's ever used. It claims the inverter first (|battery_flow| + fcas_reserve ≤ inverter cap), so it trades against arbitrage. When a dispatch event calls your reserve you must actually deliver from stored charge: deliver and earn a $200/MWh bonus; fall short and it's $100,000/MWh — so only bid what your SOC can back.",
    icon: ZapIcon,
    iconTint: "text-violet-700",
    iconBg: "bg-violet-50",
    slider: {
      actionKey: "fcas_reserve_mw",
      label: "fcas_reserve_mw",
      min: 0,
      max: 50,
      step: 1,
      description:
        "MW of inverter capacity reserved for FCAS. Eats into the battery_flow_mw budget.",
    },
    costKeys: ["fcas_revenue", "fcas_dispatch_bonus", "fcas_shortfall_penalty"],
    costGroup: "fcas",
  },

  forecast: {
    id: "forecast",
    label: "Forecast",
    short: "Noisy lookahead of demand, solar, and price.",
    long: "Current state values (e.g. `state['demand']`) are 100% accurate, just like real grid SCADA readings. Future values are strictly accessible via `state['forecast']`, which provides a blurry, noisy lookahead of the next N steps. Errors drift smoothly (AR(1)) — fit a bias, don't chase jitter.",
    icon: EyeIcon,
    iconTint: "text-sky-700",
    iconBg: "bg-sky-50",
    costKeys: [],
    costGroup: "grid",
  },

  throughput_budget: {
    id: "throughput_budget",
    label: "Throughput budget",
    short: "Capped total |MWh| the battery may move all run.",
    long: "Track `state['battery_throughput_remaining_mwh']`. Each MWh charged OR discharged eats the budget. Allocate cycles to the highest-spread windows.",
    icon: GaugeIcon,
    iconTint: "text-indigo-700",
    iconBg: "bg-indigo-50",
    costKeys: [],
    costGroup: "battery",
  },

  cyber_attack: {
    id: "cyber_attack",
    label: "Cyber attack",
    short: "Adversarial corruption of state/forecast during attack windows.",
    long: "Some state fields are manipulated by an attacker during scripted windows. Trust nothing blindly — cross-check signals and detect anomalies.",
    icon: ShieldAlertIcon,
    iconTint: "text-rose-700",
    iconBg: "bg-rose-50",
    costKeys: [],
    costGroup: "penalties",
  },

  compliance: {
    id: "compliance",
    label: "Compliance windows",
    short: "SOC floors and export caps during operator directives.",
    long: "During a compliance window the engine enforces min SOC floors and max export caps from scenario events. Breaches accrue per-step penalties (SOC shortfall × $/unit; export excess × $/MW·h). Read qualitative alerts ahead of time and position the battery before the window opens.",
    icon: ScaleIcon,
    iconTint: "text-orange-700",
    iconBg: "bg-orange-50",
    costKeys: ["compliance_penalty", "phishing_fine"],
    costGroup: "penalties",
  },

  forecast_bias: {
    id: "forecast_bias",
    label: "Forecast bias",
    short:
      "Systematic, not just noisy — the forecast is qualitatively wrong during the event window.",
    long: "Distinct from AR(1) noise. During a `forecast_bias` event the forecast for a specific channel (solar / demand / price) is shifted by a fixed bias — e.g. the forecast keeps reporting clear skies while a cloud bank actually rolls in. The bias persists only for the window, so it can't be fitted out by a global residual tracker. Detect the regime (forecast vs. realised diverging) and downweight the forecast.",
    icon: CloudIcon,
    iconTint: "text-slate-700",
    iconBg: "bg-slate-100",
    costKeys: [],
    costGroup: "grid",
  },

  anomaly_classification: {
    id: "anomaly_classification",
    label: "Anomaly classification",
    short:
      "Decide which input to trust — the live sensor or the forecast — when they disagree.",
    long:
      "The grid's telemetry is under attack. An operator alert names an anomaly window, a channel (usually demand) and an `anomaly_id`. Inside the window one of three things is true: (1) a REAL attack — the demand genuinely spiked and BOTH the live meter and the forecast show it, so act on it; (2) a FALSE FLAG — a spoofed sensor shows a spike the forecast does NOT corroborate, so trust the forecast and ignore the meter; (3) a FORECAST ATTACK — the meter is honest but the forecast has been poisoned and reads low, so trust the meter. No single channel is safe to trust blindly: 'always believe the meter' over-exports on the false flag, 'always believe the forecast' blacks out on the forecast attack. Corroborate the live reading against the forecast and recent realised history, and read the alert prose — it hints which channel is compromised. You must also echo the `anomaly_id` in agent_plan[\"anomaly_ack\"] for the whole window or pay a per-step acknowledgement penalty.",
    icon: FingerprintIcon,
    iconTint: "text-rose-700",
    iconBg: "bg-rose-50",
    costKeys: ["anomaly_ack_fine"],
    costGroup: "penalties",
  },
};

// Fallback for ids the backend ships that aren't in the catalog yet —
// e.g. another dev's WIP mechanic. Renders something, doesn't crash.
export const UNKNOWN_MECHANIC: MechanicDef = {
  id: "unknown",
  label: "Unknown mechanic",
  short: "Scenario declares a mechanic not in the frontend catalog.",
  long: "Add an entry to frontend/lib/mechanics.ts to render this properly.",
  icon: CloudLightningIcon,
  iconTint: "text-slate-600",
  iconBg: "bg-slate-100",
  costKeys: [],
  costGroup: "grid",
};

export function lookupMechanic(id: string): MechanicDef {
  return MECHANICS[id] ?? { ...UNKNOWN_MECHANIC, id, label: id };
}

// Cost-breakdown keys that aren't owned by any mechanic but still appear
// on the engine output. Always rendered when present and non-zero.
export const ALWAYS_ON_COST_KEYS: Record<string, { label: string; group: CostGroup }> = {
  tariff_import: { label: "Grid tariff", group: "grid" },
  tariff_export: { label: "Export revenue", group: "grid" },
  demand_charge: { label: "Demand peak", group: "grid" },
  carbon_cost: { label: "Carbon", group: "carbon" },
  ramp_charge: { label: "Ramp", group: "grid" },
  blackout_penalty: { label: "Blackout", group: "penalties" },
  overvoltage_penalty: { label: "Overvoltage", group: "penalties" },
};

// Compose the cost-tile groups for a scenario based on its active mechanics
// plus the always-on keys. Drives MetricsPanel rendering.
export interface CostTileConfig {
  group: CostGroup;
  label: string;
  keys: { key: string; label: string }[];
}

const GROUP_LABELS: Record<CostGroup, string> = {
  battery: "Battery",
  grid: "Grid",
  penalties: "Penalties",
  carbon: "Carbon",
  fcas: "FCAS",
  diesel: "Diesel",
};

const COST_KEY_LABELS: Record<string, string> = {
  battery_wear: "Battery wear",
  generator_fuel: "Fuel",
  fcas_revenue: "FCAS revenue",
  fcas_dispatch_bonus: "Dispatch bonus",
  fcas_shortfall_penalty: "Shortfall penalty",
  compliance_penalty: "Compliance",
  phishing_fine: "Phishing trap",
  anomaly_ack_fine: "Anomaly ack",
};

export function buildCostTiles(activeIds: string[]): CostTileConfig[] {
  const tiles: Record<CostGroup, CostTileConfig> = {} as Record<
    CostGroup,
    CostTileConfig
  >;

  const ensure = (group: CostGroup) => {
    if (!tiles[group]) {
      tiles[group] = { group, label: GROUP_LABELS[group], keys: [] };
    }
    return tiles[group];
  };

  // Always-on keys first so order is stable.
  for (const [key, meta] of Object.entries(ALWAYS_ON_COST_KEYS)) {
    ensure(meta.group).keys.push({ key, label: meta.label });
  }

  // Mechanic-owned keys.
  for (const id of activeIds) {
    const mech = lookupMechanic(id);
    for (const key of mech.costKeys) {
      ensure(mech.costGroup).keys.push({
        key,
        label: COST_KEY_LABELS[key] ?? key,
      });
    }
  }

  // Stable display order across groups.
  const order: CostGroup[] = [
    "grid",
    "penalties",
    "battery",
    "diesel",
    "fcas",
    "carbon",
  ];
  return order.filter((g) => tiles[g]).map((g) => tiles[g]);
}
