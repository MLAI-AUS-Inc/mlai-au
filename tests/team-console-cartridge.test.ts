import { describe, expect, test } from "bun:test";
import { CART_TIMINGS, canStart, canUse3D, cartAnnouncement, cartBusy, cartLabel, cartReducer, screenMode, type CartEvent, type CartState } from "../app/components/team-console/cartridge";

const idle = { arcadeOpen: false, reducedMotion: false };
const STATES: CartState[] = ["seated", "ejecting", "out", "inserting", "booting"];

describe("team console cartridge", () => {
  test("a full eject and insert passes through every state in order", () => {
    let state: CartState = "seated";
    const seen: CartState[] = [state];
    for (const event of ["EJECT", "TIMER", "INSERT", "TIMER", "TIMER"] as CartEvent[]) {
      state = cartReducer(state, event, idle);
      seen.push(state);
    }
    expect(seen).toEqual(["seated", "ejecting", "out", "inserting", "booting", "seated"]);
  });

  test("toggle ejects when seated, inserts when out and is ignored while moving", () => {
    expect(cartReducer("seated", "TOGGLE", idle)).toBe("ejecting");
    expect(cartReducer("out", "TOGGLE", idle)).toBe("inserting");
    for (const state of ["ejecting", "inserting", "booting"] as CartState[]) expect(cartReducer(state, "TOGGLE", idle)).toBe(state);
  });

  test("presses that do not apply leave the state alone", () => {
    for (const state of STATES) {
      if (state !== "seated") expect(cartReducer(state, "EJECT", idle)).toBe(state);
      if (state !== "out") expect(cartReducer(state, "INSERT", idle)).toBe(state);
    }
    expect(cartReducer("seated", "TIMER", idle)).toBe("seated");
    expect(cartReducer("out", "TIMER", idle)).toBe("out");
  });

  test("the cartridge cannot be pulled while the arcade is open", () => {
    expect(cartReducer("seated", "EJECT", { arcadeOpen: true, reducedMotion: false })).toBe("seated");
    expect(cartReducer("seated", "TOGGLE", { arcadeOpen: true, reducedMotion: true })).toBe("seated");
  });

  test("reduced motion skips the travel and the boot card", () => {
    const calm = { arcadeOpen: false, reducedMotion: true };
    expect(cartReducer("seated", "EJECT", calm)).toBe("out");
    expect(cartReducer("out", "INSERT", calm)).toBe("seated");
  });

  test("only a seated cartridge can start the game and show the live screen", () => {
    for (const state of STATES) {
      expect(canStart(state)).toBe(state === "seated");
      expect(screenMode(state)).toBe(state === "seated" ? "live" : state === "booting" ? "boot" : "off");
      expect(cartBusy(state)).toBe(state !== "seated" && state !== "out");
      expect(CART_TIMINGS[state] > 0).toBe(cartBusy(state));
    }
  });

  test("the button is named for what it will do, and settled states are announced", () => {
    expect(cartLabel("seated")).toBe("Eject cartridge");
    expect(cartLabel("out")).toBe("Insert cartridge");
    expect(cartAnnouncement("out")).toContain("Insert");
    expect(cartAnnouncement("seated")).toContain("ready");
    expect(cartAnnouncement("ejecting")).toBe("");
  });

  test("the 3D console needs a wide screen, a mouse and no motion or data limits", () => {
    const yes = { wide: true, finePointer: true, reducedMotion: false, saveData: false };
    expect(canUse3D(yes)).toBe(true);
    expect(canUse3D({ ...yes, wide: false })).toBe(false);
    expect(canUse3D({ ...yes, finePointer: false })).toBe(false);
    expect(canUse3D({ ...yes, reducedMotion: true })).toBe(false);
    expect(canUse3D({ ...yes, saveData: true })).toBe(false);
  });
});
