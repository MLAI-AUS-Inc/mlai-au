import type { FighterId } from "./roster";

export type SpecialKind =
  | "wave"
  | "double-burst"
  | "uppercut"
  | "trap"
  | "lob"
  | "rush"
  | "pulse"
  | "tether"
  | "sky-kick"
  | "ring"
  | "blink"
  | "counter"
  | "cascade"
  | "dash"
  | "tracking-orb";
export interface SpecialMove {
  name: string;
  description: string;
  kind: SpecialKind;
  color: number;
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  guard: "mid" | "low" | "high";
  stun: number;
  push: number;
  cpuRange: readonly [number, number];
}
/** Shared selection, simulation and rendering metadata. Timings are simulation ticks. */
export const SPECIAL_MOVES: Record<FighterId, SpecialMove> = {
  sam: {
    name: "Community Wave",
    description:
      "A broad, steady wave controls the ground. Jump over it or guard.",
    kind: "wave",
    color: 0x00e5ff,
    startup: 18,
    active: 2,
    recovery: 30,
    damage: 16,
    guard: "mid",
    stun: 27,
    push: 36,
    cpuRange: [145, 620],
  },
  sonia: {
    name: "Neural Spark",
    description:
      "Two quick sparks arrive separately. Hold guard through both bursts.",
    kind: "double-burst",
    color: 0xff5a94,
    startup: 14,
    active: 13,
    recovery: 26,
    damage: 8,
    guard: "mid",
    stun: 16,
    push: 13,
    cpuRange: [115, 470],
  },
  ryan: {
    name: "Summit Breaker",
    description:
      "A rising uppercut launches close opponents. Its landing is vulnerable.",
    kind: "uppercut",
    color: 0xffb347,
    startup: 11,
    active: 13,
    recovery: 32,
    damage: 18,
    guard: "mid",
    stun: 30,
    push: 16,
    cpuRange: [54, 135],
  },
  pegah: {
    name: "Ledger Lock",
    description:
      "Sets a delayed ground snare ahead. Crouch guard or jump to escape it.",
    kind: "trap",
    color: 0xbda3ff,
    startup: 22,
    active: 2,
    recovery: 26,
    damage: 12,
    guard: "low",
    stun: 40,
    push: 0,
    cpuRange: [100, 240],
  },
  yana: {
    name: "Signal Boost",
    description:
      "Lobs a high arc over the arena. Move beneath it or stand guard.",
    kind: "lob",
    color: 0x85e28b,
    startup: 20,
    active: 2,
    recovery: 25,
    damage: 17,
    guard: "high",
    stun: 27,
    push: 22,
    cpuRange: [170, 490],
  },
  anjali: {
    name: "Spotlight Rush",
    description:
      "Three advancing strikes apply pressure. Guard the string, then punish.",
    kind: "rush",
    color: 0xff8bd4,
    startup: 16,
    active: 25,
    recovery: 30,
    damage: 6,
    guard: "mid",
    stun: 16,
    push: 7,
    cpuRange: [60, 230],
  },
  anu: {
    name: "Vital Pulse",
    description: "A close pulse restores 6 health only if it lands unblocked.",
    kind: "pulse",
    color: 0x5df0bb,
    startup: 23,
    active: 5,
    recovery: 28,
    damage: 12,
    guard: "mid",
    stun: 24,
    push: 34,
    cpuRange: [54, 155],
  },
  daniel: {
    name: "Partner Pull",
    description:
      "A thin tether draws a hit opponent closer. Guard or jump the line.",
    kind: "tether",
    color: 0x77b9ff,
    startup: 19,
    active: 2,
    recovery: 27,
    damage: 10,
    guard: "mid",
    stun: 31,
    push: 0,
    cpuRange: [170, 500],
  },
  jun: {
    name: "Sky Bridge",
    description:
      "A diagonal flying kick travels upward and forward. Guard its high arc.",
    kind: "sky-kick",
    color: 0xffdc6a,
    startup: 13,
    active: 18,
    recovery: 28,
    damage: 17,
    guard: "high",
    stun: 27,
    push: 26,
    cpuRange: [90, 260],
  },
  alisa: {
    name: "Welcome Ring",
    description:
      "A ring grows outward from a fixed point. Back away beyond its reach.",
    kind: "ring",
    color: 0xff83ab,
    startup: 25,
    active: 2,
    recovery: 28,
    damage: 15,
    guard: "mid",
    stun: 25,
    push: 30,
    cpuRange: [54, 205],
  },
  shan: {
    name: "Quantum Step",
    description:
      "Blinks to a marked position before striking. Guard the tell, punish recovery.",
    kind: "blink",
    color: 0x9ca1ff,
    startup: 27,
    active: 4,
    recovery: 35,
    damage: 17,
    guard: "mid",
    stun: 27,
    push: 26,
    cpuRange: [165, 530],
  },
  kang: {
    name: "Iron Guard",
    description:
      "A brief counter stance reverses one incoming hit. Wait it out to punish.",
    kind: "counter",
    color: 0xff7257,
    startup: 9,
    active: 25,
    recovery: 34,
    damage: 20,
    guard: "mid",
    stun: 32,
    push: 38,
    cpuRange: [54, 150],
  },
  juan: {
    name: "Code Cascade",
    description:
      "Three marked code bolts fall in sequence. Move clear of the floor markers.",
    kind: "cascade",
    color: 0x83f0d5,
    startup: 25,
    active: 2,
    recovery: 34,
    damage: 6,
    guard: "high",
    stun: 17,
    push: 5,
    cpuRange: [130, 570],
  },
  alan: {
    name: "Vector Drive",
    description:
      "A long committed dash cuts across the floor. Jump or guard, then retaliate.",
    kind: "dash",
    color: 0xffc76b,
    startup: 21,
    active: 22,
    recovery: 38,
    damage: 18,
    guard: "mid",
    stun: 29,
    push: 42,
    cpuRange: [125, 390],
  },
  callum: {
    name: "Compile Storm",
    description:
      "A slow orb follows the opponent's height. Outrun it, jump past it or guard.",
    kind: "tracking-orb",
    color: 0x9ae4ff,
    startup: 29,
    active: 2,
    recovery: 30,
    damage: 15,
    guard: "mid",
    stun: 28,
    push: 27,
    cpuRange: [210, 650],
  },
};
