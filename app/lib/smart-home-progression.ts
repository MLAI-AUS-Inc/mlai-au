/**
 * Day-gated capability progression for the Smart Home controller.
 *
 * The controller starts as a simple light switch (stage 1) and reveals the SENSE->THINK->ACT
 * pipeline as the campaign progresses: Actions+Outputs (stage 2) -> Schedule (stage 3) ->
 * Brain+Inputs, the full board (stage 4). The in-game day is a deterministic function of
 * wall-clock time (Unity CampaignClock), so the unlocked stage is shared + resume-safe.
 *
 * Mirror of generic_hackathons/smart_home_progression.py on the backend — keep in sync.
 */
import { PALETTE, type SlotType } from "~/lib/smart-home-pipeline";

/** Total in-game days (mirrors Unity ScoreConstants.CAMPAIGN_LENGTH_DAYS = 46). */
export const CAMPAIGN_DAYS = 46;

// Stage thresholds (in-game day). The main pacing lever; mirror the backend constants.
export const STAGE2_DAY = 6; // pipeline introduced: Actions + Outputs
export const STAGE3_DAY = 16; // + Schedule
export const STAGE4_DAY = 26; // + Brain + Inputs (the full board)

export type SwitchGroup = "Lights" | "Climate & energy" | "Appliances";

export interface SwitchDevice {
  id: string;
  label: string;
  hint: string;
  group: SwitchGroup;
  defaultOn: boolean;
}

/** Group render order for the switchboard. */
export const SWITCH_GROUPS: SwitchGroup[] = ["Lights", "Climate & energy", "Appliances"];

/**
 * Stage-1 devices the player can switch on/off directly. On Deploy the page posts
 * `{ switches: {id: on} }` -> backend `SWITCH_DEVICE_COMMANDS` -> the matching device command
 * (set_lights / set_thermostat_setpoint / set_ev_charging / run_appliance / ...). The ids here
 * MUST mirror the backend map (generic_hackathons/smart_home_progression.py).
 */
export const SWITCH_DEVICES: SwitchDevice[] = [
  // Lights — the house leaves some on; spotting one to switch off is the natural first move.
  { id: "bathroom", label: "Bathroom Light", hint: "The one that always gets left on.", group: "Lights", defaultOn: true },
  { id: "living", label: "Living Room Lights", hint: "Where everyone hangs out.", group: "Lights", defaultOn: true },
  { id: "kitchen", label: "Kitchen Lights", hint: "Bright while someone's cooking.", group: "Lights", defaultOn: true },
  { id: "bedroom", label: "Main Bedroom Light", hint: "Usually off through the day.", group: "Lights", defaultOn: false },
  { id: "child_bedroom", label: "Child's Bedroom Light", hint: "On around bedtime.", group: "Lights", defaultOn: false },
  { id: "office", label: "Office Light", hint: "On while working from home.", group: "Lights", defaultOn: false },
  // Climate & energy.
  { id: "thermostat", label: "Thermostat", hint: "Comfort (22°) vs eco setback (18°).", group: "Climate & energy", defaultOn: true },
  { id: "hot_water", label: "Hot Water", hint: "Heat-pump water for showers & taps.", group: "Climate & energy", defaultOn: true },
  { id: "ev", label: "EV Charger", hint: "Charge the electric car.", group: "Climate & energy", defaultOn: true },
  { id: "battery", label: "Home Battery", hint: "Store & dispatch cheap / solar power.", group: "Climate & energy", defaultOn: true },
  // Appliances — run a cycle now, or hold it for cheaper off-peak power.
  { id: "dishwasher", label: "Dishwasher", hint: "Run a wash now, or hold for off-peak.", group: "Appliances", defaultOn: false },
  { id: "washer", label: "Washing Machine", hint: "Run a load now, or hold for off-peak.", group: "Appliances", defaultOn: false },
  { id: "dryer", label: "Dryer", hint: "Tumble dry now, or hold for off-peak.", group: "Appliances", defaultOn: false },
];

const SLOTS_BY_STAGE: Record<number, SlotType[]> = {
  1: [],
  2: ["action", "output"],
  3: ["action", "output", "schedule"],
  4: ["input", "schedule", "brain", "action", "output", "safety"],
};

/** The day each slot first unlocks (for "🔒 unlocks day N" teasers). */
export const SLOT_UNLOCK_DAY: Partial<Record<SlotType, number>> = {
  action: STAGE2_DAY,
  output: STAGE2_DAY,
  schedule: STAGE3_DAY,
  input: STAGE4_DAY,
  brain: STAGE4_DAY,
  safety: STAGE4_DAY,
};

export interface Upcoming {
  label: string;
  day: number;
}

export interface Progression {
  stage: number; // 1..4
  switchboard: boolean; // stage 1 = the simple light switch
  unlockedSlots: Set<SlotType>; // pipeline slots active at this stage (stage >= 2)
  unlockedBlockIds: Set<string>; // palette blocks that are draggable
  upcoming: Upcoming[]; // locked capabilities + the day they unlock
}

export function stageForDay(day: number | null | undefined): number {
  const d = typeof day === "number" && Number.isFinite(day) ? Math.floor(day) : 1;
  if (d >= STAGE4_DAY) return 4;
  if (d >= STAGE3_DAY) return 3;
  if (d >= STAGE2_DAY) return 2;
  return 1;
}

export function progressionForDay(day: number | null | undefined): Progression {
  const stage = stageForDay(day);
  const unlockedSlots = new Set<SlotType>(SLOTS_BY_STAGE[stage] ?? []);
  const unlockedBlockIds = new Set(PALETTE.filter((b) => unlockedSlots.has(b.type)).map((b) => b.id));
  const upcoming: Upcoming[] = [];
  if (stage < 3) upcoming.push({ label: "Schedule", day: STAGE3_DAY });
  if (stage < 4) upcoming.push({ label: "AI Brain + Sensors", day: STAGE4_DAY });
  return { stage, switchboard: stage === 1, unlockedSlots, unlockedBlockIds, upcoming };
}
