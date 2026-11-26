/** The cartridge state machine for the team console. Pure: no DOM, no timers. */

export type CartState = "seated" | "ejecting" | "out" | "inserting" | "booting";
/** ATTRACT is the 3D console pulling its own cartridge once, to show itself off.
 *  RESET puts the cartridge straight back, for when the 3D console is lost. */
export type CartEvent = "EJECT" | "INSERT" | "TOGGLE" | "TIMER" | "ATTRACT" | "RESET";

export interface CartContext {
  /** The arcade dialog (or its loading screen) is open. */
  arcadeOpen: boolean;
  /** The visitor asked for reduced motion: skip the travel and boot states. */
  reducedMotion: boolean;
}

/** How long each moving state lasts before a TIMER event ends it. */
export const CART_TIMINGS: Record<CartState, number> = {
  seated: 0,
  ejecting: 900,
  out: 0,
  inserting: 520,
  booting: 1050,
};

export function cartReducer(state: CartState, event: CartEvent, context: CartContext): CartState {
  if (event === "RESET") return "seated";
  if (event === "ATTRACT") return state === "seated" && !context.arcadeOpen && !context.reducedMotion ? "ejecting" : state;
  if (event === "TOGGLE") {
    if (state === "seated") event = "EJECT";
    else if (state === "out") event = "INSERT";
    else return state;
  }
  if (event === "EJECT") {
    if (state !== "seated" || context.arcadeOpen) return state;
    return context.reducedMotion ? "out" : "ejecting";
  }
  if (event === "INSERT") {
    if (state !== "out") return state;
    return context.reducedMotion ? "seated" : "inserting";
  }
  if (state === "ejecting") return "out";
  if (state === "inserting") return "booting";
  if (state === "booting") return "seated";
  return state;
}

/** The game can only be started with the cartridge fully seated. */
export const canStart = (state: CartState) => state === "seated";

/** What the screen shows. */
export function screenMode(state: CartState): "live" | "off" | "boot" {
  if (state === "seated") return "live";
  return state === "booting" ? "boot" : "off";
}

/** True while the cartridge is travelling and presses are ignored. */
export const cartBusy = (state: CartState) => state === "ejecting" || state === "inserting" || state === "booting";

/** The cartridge button's accessible name: the action it will perform. */
export const cartLabel = (state: CartState) =>
  state === "out" || state === "ejecting" ? "Insert cartridge" : "Eject cartridge";

/** Announcement for the status region once a state settles; empty while moving. */
export function cartAnnouncement(state: CartState): string {
  if (state === "out") return "Cartridge out. Insert it to see the team and play.";
  if (state === "seated") return "Cartridge in. Community Clash is ready.";
  return "";
}

/** The 3D console only mounts for a wide screen with a mouse and no motion or data limits. */
export function canUse3D(env: { wide: boolean; finePointer: boolean; reducedMotion: boolean; saveData: boolean }): boolean {
  return env.wide && env.finePointer && !env.reducedMotion && !env.saveData;
}
