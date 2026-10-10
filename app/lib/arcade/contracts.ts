import { teamRoster, type FighterId } from "../../data/team-roster";

// Existing directory artwork only; no combat sprite or approval is implied.
export const DIRECTORY_PLACEHOLDER_ART = "/arcade/fighter-placeholder.gif";
export type InputAction = "moveLeft" | "moveRight" | "jump" | "attack" | "block" | "pause";
export const KEYBOARD_ACTIONS = {
  ArrowLeft: "moveLeft", KeyA: "moveLeft", ArrowRight: "moveRight", KeyD: "moveRight",
  ArrowUp: "jump", KeyW: "jump", Space: "attack", KeyJ: "attack", KeyK: "block", Escape: "pause",
} as const satisfies Record<string, InputAction>;
export type AnimationAction = "idle" | "walk" | "jump" | "attack" | "block" | "hurt" | "defeat";
export interface FighterAssets {
  status: "placeholder" | "approved";
  previewUrl: string;
  animations: Partial<Record<AnimationAction, string>>;
}
export interface CombatConfig {
  maxHealth: number;
  moveSpeed: number;
  attackDamage: number;
  attackCooldownMs: number;
}
export interface FighterConfig {
  fighterId: FighterId;
  assets: FighterAssets;
  combat: CombatConfig;
}
// Illustrative prototype defaults, not final balance or approved artwork.
export const fighterConfigs: readonly FighterConfig[] = teamRoster.map(member => ({
  fighterId: member.id,
  assets: { status: "placeholder", previewUrl: DIRECTORY_PLACEHOLDER_ART, animations: {} },
  combat: { maxHealth: 100, moveSpeed: 180, attackDamage: 10, attackCooldownMs: 500 },
}));
export const pilotStrategy = {
  fighterIds: [] as readonly FighterId[],
  targetCount: 2,
  fallbackApproval: "pending",
} as const;
export interface FighterState {
  fighterId: FighterId;
  x: number;
  y: number;
  health: number;
  facing: "left" | "right";
  animation: AnimationAction;
}
export interface GameState {
  phase: "ready" | "playing" | "paused" | "finished";
  fighters: readonly [FighterState, FighterState];
  winner: FighterId | null;
}
export interface InputEvent {
  player: 0 | 1;
  action: InputAction;
  pressed: boolean;
}
/** Simulation owns rules and state; shell owns rendering, events, audio and lifecycle.
 * deltaMs is elapsed milliseconds; inputs carry press AND release events.
 * No implementation or engine is introduced by this contract.
 */
export interface ArcadeSimulation {
  step(state: GameState, inputs: readonly InputEvent[], deltaMs: number): GameState;
}
