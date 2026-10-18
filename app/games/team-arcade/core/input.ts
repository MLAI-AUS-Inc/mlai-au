import { emptyInput, type InputFrame } from "./combat";

const PULSES = new Set<keyof InputFrame>(["light", "heavy", "special", "jump"]);

/** Retain short taps that begin and end between two rendered frames. */
export class InputController {
  private held = emptyInput();
  private pending = new Set<keyof InputFrame>();

  set(action: keyof InputFrame, value: boolean) {
    if (value && !this.held[action] && PULSES.has(action))
      this.pending.add(action);
    this.held[action] = value;
  }

  sample(): InputFrame {
    const frame = { ...this.held };
    for (const action of this.pending) frame[action] = true;
    return frame;
  }

  consumed() {
    this.pending.clear();
  }
  clear() {
    this.held = emptyInput();
    this.pending.clear();
  }
}
