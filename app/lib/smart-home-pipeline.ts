/**
 * Watt Smart Home — "pipeline" spec (Path A).
 *
 * The drag-and-drop controller is a SENSE -> THINK -> ACT pipeline (Inputs -> Schedule ->
 * Brain -> Actions -> Outputs, + optional Safety). It's a presentation layer: on Deploy the
 * frontend COMPILES the filled slots into the existing backend device `block_id` list and
 * posts to /api/v1/hackathons/watt/smart-home/deploy. No backend change required.
 *
 * In v1 the Brain / Inputs / Safety are required *scaffolding* (they gate Deploy and teach the
 * loop) — only Outputs x Actions x Schedule produce device commands. This data model is
 * forward-compatible with "Path B", where the Brain becomes a real server-side policy that
 * consumes the Inputs live.
 */

export type SlotType = "input" | "schedule" | "brain" | "action" | "output" | "safety";
export type SlotShape = "plug" | "gem" | "square" | "bolt" | "node" | "shield";

export interface SlotDef {
  type: SlotType;
  label: string;
  hint: string;
  min: number; // required minimum to deploy (0 => optional)
  max: number; // capacity (single-capacity slots SWAP on a new drop)
  shape: SlotShape;
  accent: string; // hex accent for the slot/blocks
}

/** The controller skeleton, left-to-right, matching the draft. */
export const PIPELINE: SlotDef[] = [
  { type: "input", label: "Inputs", hint: "Add one or more", min: 1, max: 3, shape: "plug", accent: "#2f6f2c" },
  { type: "schedule", label: "Schedule", hint: "Add one", min: 1, max: 1, shape: "gem", accent: "#2f6fae" },
  { type: "brain", label: "Brain", hint: "Add one", min: 1, max: 1, shape: "square", accent: "#7c5cd6" },
  { type: "action", label: "Actions", hint: "Add one or more", min: 1, max: 3, shape: "bolt", accent: "#caa207" },
  { type: "output", label: "Outputs", hint: "Add one or more", min: 1, max: 3, shape: "node", accent: "#0e8f99" },
  { type: "safety", label: "Safety & Override", hint: "Optional", min: 0, max: 1, shape: "shield", accent: "#64705f" },
];

export const PIPELINE_BY_TYPE: Record<SlotType, SlotDef> = Object.fromEntries(
  PIPELINE.map((slot) => [slot.type, slot]),
) as Record<SlotType, SlotDef>;

export type DeviceKey = "smart_plugs" | "battery" | "ev";
export type ActionIntent = "shift_load" | "reduce_usage" | "charge_battery";
export type TimingKey = "time_of_day" | "day_of_week" | "price_signal";

export interface BlockDef {
  id: string;
  type: SlotType;
  label: string;
  blurb: string;
  device?: DeviceKey; // outputs only
  intent?: ActionIntent; // actions only
  timing?: TimingKey; // schedule only
}

/** Palette blocks, mirroring the draft UI. (Catalog will move server-side later.) */
export const PALETTE: BlockDef[] = [
  // Inputs (sensors the controller reads)
  { id: "in_smart_meter", type: "input", label: "Smart Meter", blurb: "Live household power draw." },
  { id: "in_temp", type: "input", label: "Temperature Sensor", blurb: "Indoor & outdoor temperature." },
  { id: "in_weather", type: "input", label: "Weather Forecast", blurb: "Sun & temperature outlook." },
  // Schedule (the trigger / timing)
  { id: "sc_time", type: "schedule", label: "Time of Day", blurb: "Act against the clock (off-peak).", timing: "time_of_day" },
  { id: "sc_day", type: "schedule", label: "Day of Week", blurb: "Weekday vs weekend patterns.", timing: "day_of_week" },
  { id: "sc_price", type: "schedule", label: "Price Signal", blurb: "React to cheap/expensive power.", timing: "price_signal" },
  // Brain (the policy engine — one only)
  { id: "br_chatgpt", type: "brain", label: "ChatGPT", blurb: "OpenAI policy brain." },
  { id: "br_claude", type: "brain", label: "Claude", blurb: "Anthropic policy brain." },
  { id: "br_gemini", type: "brain", label: "Gemini", blurb: "Google policy brain." },
  // Actions (strategy verbs)
  { id: "ac_shift", type: "action", label: "Shift Load", blurb: "Move usage to cheaper/greener times.", intent: "shift_load" },
  { id: "ac_reduce", type: "action", label: "Reduce Usage", blurb: "Cut consumption where comfort allows.", intent: "reduce_usage" },
  { id: "ac_charge", type: "action", label: "Charge Battery", blurb: "Store cheap / solar energy.", intent: "charge_battery" },
  // Outputs (target devices)
  { id: "ou_plugs", type: "output", label: "Smart Plugs", blurb: "Appliances & lights.", device: "smart_plugs" },
  { id: "ou_battery", type: "output", label: "Battery System", blurb: "Home battery dispatch.", device: "battery" },
  { id: "ou_ev", type: "output", label: "EV Charger", blurb: "Electric-vehicle charging.", device: "ev" },
  // Safety (guardrails)
  { id: "sa_manual", type: "safety", label: "Manual Override", blurb: "You can always take control." },
  { id: "sa_budget", type: "safety", label: "Max Budget Guard", blurb: "Never exceed a daily spend." },
];

export const PALETTE_BY_ID: Record<string, BlockDef> = Object.fromEntries(
  PALETTE.map((block) => [block.id, block]),
);

/**
 * The core Path A mapping: (output device x action intent) -> backend block_id(s).
 * Schedule refines below. Missing cells are intentionally incompatible (puzzle feedback).
 * Backend block_ids are the 11 already live on main (#391).
 */
const COMMAND_MAP: Record<DeviceKey, Partial<Record<ActionIntent, string[]>>> = {
  smart_plugs: {
    shift_load: ["dishwasher_offpeak", "washer_offpeak"],
    reduce_usage: ["lights_auto_off", "thermostat_eco", "dryer_hang_dry"],
    // charge_battery: incompatible with plugs
  },
  battery: {
    shift_load: ["battery_store_solar"],
    charge_battery: ["battery_store_solar"],
    reduce_usage: ["battery_discharge_peak"],
  },
  ev: {
    shift_load: ["ev_overnight_80"],
    charge_battery: ["ev_overnight_80"],
    reduce_usage: ["ev_pause"],
  },
};

export type PlacedPipeline = Record<SlotType, BlockDef[]>;

export interface CompileResult {
  blockIds: string[];
  incompatible: Array<{ device: string; action: string }>;
}

/** Compile the placed pipeline into the flat backend block_id list. Pure. */
export function compilePipeline(placed: PlacedPipeline): CompileResult {
  const priceAware = placed.schedule.some((b) => b.timing === "price_signal");
  const blockIds = new Set<string>();
  const incompatible: Array<{ device: string; action: string }> = [];

  for (const output of placed.output) {
    if (!output.device) continue;
    for (const action of placed.action) {
      if (!action.intent) continue;
      let ids = COMMAND_MAP[output.device][action.intent];
      if (!ids || ids.length === 0) {
        incompatible.push({ device: output.label, action: action.label });
        continue;
      }
      // Schedule refinement: a price-aware battery becomes smart auto peak-shaving.
      if (output.device === "battery" && priceAware) ids = ["battery_smart"];
      ids.forEach((id) => blockIds.add(id));
    }
  }
  return { blockIds: [...blockIds], incompatible };
}

/** Deploy is allowed only when every required slot meets its minimum. */
export function isComplete(placed: PlacedPipeline): boolean {
  return PIPELINE.every((slot) => placed[slot.type].length >= slot.min);
}

export function emptyPipeline(): PlacedPipeline {
  return Object.fromEntries(PIPELINE.map((slot) => [slot.type, [] as BlockDef[]])) as PlacedPipeline;
}
