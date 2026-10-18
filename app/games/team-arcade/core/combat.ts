import {
  FIGHTERS,
  type Difficulty,
  type FighterId,
  type MatchConfig,
} from "../roster";
import { SPECIAL_MOVES, type SpecialKind } from "../specials";

export const TICK_RATE = 60;
export const STEP_MS = 1000 / TICK_RATE;
export const ARENA_WIDTH = 960;
export const FLOOR_Y = 440;
export const ROUND_TICKS = 60 * TICK_RATE;
export const PULSE_RADIUS = 137;
export type Side = 0 | 1;
export type MoveId = "light" | "heavy" | "low" | "air" | "special";
export type FighterState =
  | "idle"
  | "walk"
  | "crouch"
  | "jump"
  | "attack"
  | "guard"
  | "hurt"
  | "defeated"
  | "victory";
export type Phase = "intro" | "fight" | "round-end" | "match-end";
export interface InputFrame {
  left: boolean;
  right: boolean;
  jump: boolean;
  crouch: boolean;
  guard: boolean;
  light: boolean;
  heavy: boolean;
  special: boolean;
}
export const emptyInput = (): InputFrame => ({
  left: false,
  right: false,
  jump: false,
  crouch: false,
  guard: false,
  light: false,
  heavy: false,
  special: false,
});
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Move {
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  reach: number;
  top: number;
  bottom: number;
  guard: "mid" | "low" | "high";
  stun: number;
  push: number;
}
export const MOVES: Record<MoveId, Move> = {
  light: {
    startup: 6,
    active: 3,
    recovery: 12,
    damage: 6,
    reach: 89,
    top: 116,
    bottom: 50,
    guard: "mid",
    stun: 16,
    push: 15,
  },
  heavy: {
    startup: 12,
    active: 4,
    recovery: 24,
    damage: 12,
    reach: 132,
    top: 127,
    bottom: 52,
    guard: "mid",
    stun: 25,
    push: 30,
  },
  low: {
    startup: 8,
    active: 4,
    recovery: 18,
    damage: 7,
    reach: 100,
    top: 52,
    bottom: 8,
    guard: "low",
    stun: 19,
    push: 18,
  },
  air: {
    startup: 8,
    active: 6,
    recovery: 14,
    damage: 8,
    reach: 104,
    top: 90,
    bottom: 8,
    guard: "high",
    stun: 20,
    push: 23,
  },
  special: {
    startup: 18,
    active: 2,
    recovery: 30,
    damage: 16,
    reach: 0,
    top: 100,
    bottom: 46,
    guard: "mid",
    stun: 27,
    push: 36,
  },
};
export interface Fighter {
  id: FighterId;
  side: Side;
  x: number;
  y: number;
  vy: number;
  facing: 1 | -1;
  health: number;
  meter: number;
  state: FighterState;
  stateTick: number;
  move: MoveId | null;
  moveTick: number;
  connected: boolean;
  hit: boolean;
  stun: number;
  guarding: boolean;
  lowGuard: boolean;
  wins: number;
  buffer: { move: MoveId; until: number } | null;
  previous: InputFrame;
  specialOriginX: number;
  specialTargetX: number;
  specialPulse: number;
}
export interface Projectile {
  id: number;
  owner: Side;
  x: number;
  y: number;
  facing: 1 | -1;
  age: number;
  fighter: FighterId;
  kind: SpecialKind;
  vx: number;
  vy: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
}
export interface CombatEvent {
  type: "hit" | "block" | "special" | "round" | "fight";
  side?: Side;
  fighter?: FighterId;
  x?: number;
  y?: number;
}
export interface MatchSnapshot {
  phase: Phase;
  phaseTick: number;
  tick: number;
  seconds: number;
  round: number;
  fighters: [Fighter, Fighter];
  winner: Side | null;
  roundWinner: Side | null;
  announcement: string;
  paused: boolean;
}

export const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
export const moveTiming = (f: Fighter) =>
  f.move === "special" ? SPECIAL_MOVES[f.id] : MOVES[f.move ?? "light"];
export const moveLength = (id: MoveId, fighter?: FighterId) => {
  const move = id === "special" && fighter ? SPECIAL_MOVES[fighter] : MOVES[id];
  return move.startup + move.active + move.recovery;
};
export function hurtbox(f: Fighter): Box {
  const height =
    f.state === "crouch" || (f.guarding && f.lowGuard) || f.move === "low"
      ? 76
      : 140;
  return { x: f.x - 25, y: FLOOR_Y - f.y - height, w: 50, h: height };
}
export function hitbox(f: Fighter): Box | null {
  if (!f.move || f.hit) return null;
  if (f.move === "special") return specialHitbox(f);
  const m = MOVES[f.move];
  if (f.moveTick < m.startup || f.moveTick >= m.startup + m.active) return null;
  const reach = m.reach * FIGHTERS[f.id].reach;
  return {
    x: f.facing === 1 ? f.x + 15 : f.x - reach,
    y: FLOOR_Y - f.y - m.top,
    w: reach - 15,
    h: m.top - m.bottom,
  };
}
export function specialHitbox(f: Fighter): Box | null {
  const special = SPECIAL_MOVES[f.id];
  const t = f.moveTick - special.startup;
  if (f.move !== "special" || f.hit || t < 0 || t >= special.active)
    return null;
  let reach = 0,
    top = 125,
    bottom = 25;
  switch (special.kind) {
    case "uppercut":
      reach = 104;
      top = 156;
      bottom = 10;
      break;
    case "rush":
      if (t % 9 > 2) return null;
      reach = 107;
      break;
    case "pulse":
      return {
        x: f.x - PULSE_RADIUS,
        y: FLOOR_Y - f.y - 75 - PULSE_RADIUS,
        w: PULSE_RADIUS * 2,
        h: PULSE_RADIUS * 2,
      };
    case "sky-kick":
      reach = 116;
      top = 94;
      bottom = 10;
      break;
    case "blink":
      reach = 112;
      break;
    case "dash":
      reach = 98;
      top = 110;
      bottom = 18;
      break;
    default:
      return null;
  }
  return {
    x: f.facing === 1 ? f.x + 12 : f.x - reach,
    y: FLOOR_Y - f.y - top,
    w: reach - 12,
    h: top - bottom,
  };
}
export const ringRadius = (age: number) => Math.min(185, 25 + age * 5);
export function circleOverlapsBox(
  x: number,
  y: number,
  radius: number,
  box: Box,
) {
  const dx = x - clamp(x, box.x, box.x + box.w),
    dy = y - clamp(y, box.y, box.y + box.h);
  return dx * dx + dy * dy <= radius * radius;
}
/** For stationary effects, guard and knockback follow the actual impact side. */
function radialDirection(
  sourceX: number,
  targetX: number,
  fallback: 1 | -1,
): 1 | -1 {
  return targetX === sourceX ? fallback : targetX > sourceX ? 1 : -1;
}
export function projectileBox(p: Projectile): Box {
  const radius = p.kind === "ring" ? ringRadius(p.age) : 0;
  return radius
    ? { x: p.x - radius, y: p.y - radius, w: radius * 2, h: radius * 2 }
    : { x: p.x - p.width / 2, y: p.y - p.height / 2, w: p.width, h: p.height };
}
function createFighter(id: FighterId, side: Side, wins = 0): Fighter {
  return {
    id,
    side,
    x: side === 0 ? 310 : 650,
    y: 0,
    vy: 0,
    facing: side === 0 ? 1 : -1,
    health: 100,
    meter: 0,
    state: "idle",
    stateTick: 0,
    move: null,
    moveTick: 0,
    connected: false,
    hit: false,
    stun: 0,
    guarding: false,
    lowGuard: false,
    wins,
    buffer: null,
    previous: emptyInput(),
    specialOriginX: 0,
    specialTargetX: 0,
    specialPulse: -1,
  };
}
interface Observation {
  tick: number;
  selfX: number;
  opponentX: number;
  opponentY: number;
  opponentAttacking: boolean;
  opponentRecovery: boolean;
  projectile: boolean;
  meter: number;
}
const CPU_SETTINGS: Record<
  Difficulty,
  { reaction: number; decision: number; block: number; attack: number }
> = {
  easy: { reaction: 25, decision: 20, block: 0.26, attack: 0.62 },
  normal: { reaction: 15, decision: 12, block: 0.58, attack: 0.82 },
  hard: { reaction: 9, decision: 8, block: 0.8, attack: 0.94 },
};

/** Only delayed, public observations enter the CPU policy. It never reads player input. */
export class CpuController {
  private history: Observation[] = [];
  private nextDecision = 0;
  private last = emptyInput();
  private seed: number;
  constructor(
    readonly difficulty: Difficulty,
    seed = 1729,
  ) {
    this.seed = seed >>> 0;
  }
  private random() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  reset() {
    this.history = [];
    this.nextDecision = 0;
    this.last = emptyInput();
  }
  decide(match: CombatMatch): InputFrame {
    const [op, self] = match.fighters;
    const settings = CPU_SETTINGS[this.difficulty];
    this.history.push({
      tick: match.tick,
      selfX: self.x,
      opponentX: op.x,
      opponentY: op.y,
      opponentAttacking: !!op.move,
      opponentRecovery:
        !!op.move &&
        op.moveTick >= moveTiming(op).startup + moveTiming(op).active,
      projectile: match.projectiles.some(
        (p) => p.owner === 0 && Math.abs(p.x - self.x) < 230,
      ),
      meter: self.meter,
    });
    const observed = [...this.history]
      .reverse()
      .find((o) => o.tick <= match.tick - settings.reaction);
    this.history = this.history.filter(
      (o) => o.tick >= match.tick - settings.reaction - 2,
    );
    // Attack buttons are pulses; held movement/guard lasts until the next decision.
    const result = {
      ...this.last,
      light: false,
      heavy: false,
      special: false,
      jump: false,
    };
    if (!observed || match.tick < this.nextDecision) return result;
    this.nextDecision = match.tick + settings.decision;
    const input = emptyInput();
    const distance = Math.abs(observed.selfX - observed.opponentX);
    const toward = observed.opponentX > observed.selfX ? "right" : "left";
    const away = toward === "right" ? "left" : "right";
    const special = SPECIAL_MOVES[self.id];
    const specialInRange =
      observed.meter >= 50 &&
      distance >= special.cpuRange[0] &&
      distance <= special.cpuRange[1];
    if (
      special.kind === "counter" &&
      specialInRange &&
      observed.opponentAttacking &&
      this.random() < 0.45
    ) {
      input.special = true;
    } else if (
      ((observed.opponentAttacking && distance < 165) || observed.projectile) &&
      this.random() < settings.block
    ) {
      input.guard = true;
      input.crouch = this.random() < 0.22;
    } else if (distance > 115) {
      input[toward] = true;
      if (specialInRange && special.kind !== "counter" && this.random() < 0.42)
        input.special = true;
      if (this.random() < 0.06) input.jump = true;
    } else if (this.random() < settings.attack || observed.opponentRecovery) {
      if (distance > 82) input.heavy = true;
      else if (this.random() < 0.27) {
        input.crouch = true;
        input.light = true;
      } else input.light = true;
      if (specialInRange && special.kind !== "counter" && this.random() < 0.2) {
        input.special = true;
        input.light = false;
        input.heavy = false;
      }
    } else if (this.random() < 0.5) input[away] = true;
    else input.guard = true;
    this.last = input;
    return input;
  }
}

export class CombatMatch {
  fighters: [Fighter, Fighter];
  phase: Phase = "intro";
  phaseTick = 0;
  tick = 0;
  remaining = ROUND_TICKS;
  round = 1;
  draws = 0;
  winner: Side | null = null;
  roundWinner: Side | null = null;
  paused = false;
  hitStop = 0;
  projectiles: Projectile[] = [];
  events: CombatEvent[] = [];
  readonly cpu: CpuController;
  private projectileId = 0;
  private accumulator = 0;
  private pendingHealing: [number, number] = [0, 0];
  private pendingPulls: [number | null, number | null] = [null, null];
  constructor(readonly config: MatchConfig) {
    this.fighters = [
      createFighter(config.player, 0),
      createFighter(config.opponent, 1),
    ];
    this.cpu = new CpuController(config.difficulty, config.seed);
  }
  snapshot(): MatchSnapshot {
    return {
      phase: this.phase,
      phaseTick: this.phaseTick,
      tick: this.tick,
      seconds: Math.ceil(this.remaining / TICK_RATE),
      round: this.round,
      fighters: this.fighters.map((f) => ({ ...f })) as [Fighter, Fighter],
      winner: this.winner,
      roundWinner: this.roundWinner,
      announcement: this.announcement(),
      paused: this.paused,
    };
  }
  announcement() {
    if (this.phase === "intro")
      return this.phaseTick < 65 ? `ROUND ${this.round}` : "FIGHT!";
    if (this.phase === "round-end")
      return this.roundWinner === null
        ? "DRAW ROUND"
        : this.fighters.some((f) => f.health === 0)
          ? "K.O."
          : "TIME UP";
    if (this.phase === "match-end")
      return this.winner === null
        ? "MATCH DRAW"
        : `${FIGHTERS[this.fighters[this.winner].id].shortName} WINS`;
    return "";
  }
  setPaused(paused: boolean) {
    this.paused = paused;
    this.accumulator = 0;
    this.fighters.forEach((f) => {
      f.previous = emptyInput();
      f.buffer = null;
    });
  }
  /** One clock: render frequency cannot alter attack timing or round duration. */
  advance(deltaMs: number, input: InputFrame, opponent?: InputFrame) {
    if (this.paused) return;
    this.accumulator += Math.min(Math.max(deltaMs, 0), 150);
    let steps = 0;
    while (this.accumulator + 0.00001 >= STEP_MS && steps++ < 9) {
      this.step(input, opponent);
      this.accumulator -= STEP_MS;
    }
  }
  step(input: InputFrame = emptyInput(), opponent?: InputFrame) {
    if (this.paused || this.phase === "match-end") return;
    this.tick++;
    if (this.phase !== "fight") {
      this.phaseTick++;
      this.fighters.forEach((f) => {
        f.stateTick++;
        if (f.y > 0) {
          f.y = Math.max(0, f.y + f.vy);
          f.vy -= 0.65;
          if (f.y === 0) f.vy = 0;
        }
      });
      if (this.phase === "intro" && this.phaseTick >= 105) {
        this.phase = "fight";
        this.phaseTick = 0;
        this.events.push({ type: "fight" });
      } else if (this.phase === "round-end" && this.phaseTick >= 150)
        this.nextRound();
      return;
    }
    const cpu = opponent ?? this.cpu.decide(this);
    this.capture(this.fighters[0], input);
    this.capture(this.fighters[1], cpu);
    if (this.hitStop > 0) {
      this.hitStop--;
      // Input buffers use actionable combat time, just like move recovery.
      for (const fighter of this.fighters)
        if (fighter.buffer) fighter.buffer.until++;
      return;
    }
    this.remaining--;
    this.pendingHealing = [0, 0];
    this.pendingPulls = [null, null];
    this.fighters.forEach((f, i) =>
      this.updateFighter(
        f,
        i === 0 ? input : cpu,
        this.fighters[i === 0 ? 1 : 0],
      ),
    );
    this.separateBodies();
    const contactOrigins = this.fighters.map((f) => f.x);
    // Determine both contacts before applying either hit (fair simultaneous trades).
    const contacts = this.fighters
      .map((f, i) => {
        const box = hitbox(f),
          target = this.fighters[i === 0 ? 1 : 0];
        if (!box || !overlaps(box, hurtbox(target))) return null;
        const radial =
          f.move === "special" && SPECIAL_MOVES[f.id].kind === "pulse";
        if (
          radial &&
          !circleOverlapsBox(
            f.x,
            FLOOR_Y - f.y - 75,
            PULSE_RADIUS,
            hurtbox(target),
          )
        )
          return null;
        return {
          attacker: f.side,
          move: f.move!,
          facing: radial ? radialDirection(f.x, target.x, f.facing) : f.facing,
        };
      })
      .filter((v) => v !== null);
    for (const c of contacts) {
      this.fighters[c.attacker].hit = true;
      this.resolveHit(c.attacker, c.move, c.facing, contactOrigins[c.attacker]);
    }
    // Projectile contacts are collected first as well: mirror volleys trade fairly.
    const projectileContacts: { projectile: Projectile; direction: 1 | -1 }[] =
      [];
    this.projectiles = this.projectiles.filter((p) => {
      p.age++;
      if (p.age <= p.delay) return true;
      const target = this.fighters[p.owner === 0 ? 1 : 0];
      if (p.kind === "tracking-orb") {
        p.vx = clamp(p.vx + Math.sign(target.x - p.x) * 0.12, -3.6, 3.6);
        p.vy = clamp((FLOOR_Y - target.y - 75 - p.y) * 0.035, -2.8, 2.8);
      } else if (p.kind === "lob") p.vy += 0.3;
      p.x += p.vx;
      p.y += p.vy;
      if (
        p.x < -80 ||
        p.x > ARENA_WIDTH + 80 ||
        p.y > FLOOR_Y + 80 ||
        p.age > p.duration
      )
        return false;
      const targetBox = hurtbox(target);
      const contact =
        p.kind === "ring"
          ? circleOverlapsBox(p.x, p.y, ringRadius(p.age), targetBox)
          : overlaps(projectileBox(p), targetBox);
      if (contact) {
        const fallback = radialDirection(
          contactOrigins[p.owner],
          target.x,
          p.facing,
        );
        const direction: 1 | -1 =
          Math.abs(p.vx) > 0.001
            ? p.vx > 0
              ? 1
              : -1
            : radialDirection(p.x, target.x, fallback);
        projectileContacts.push({ projectile: p, direction });
        return false;
      }
      return true;
    });
    for (const { projectile: p, direction } of projectileContacts)
      this.resolveHit(p.owner, "special", direction, contactOrigins[p.owner]);
    // Apply restorative/displacement effects after both contacts. A simultaneous
    // Vital Pulse trade must not favour the side whose capped heal runs last.
    this.fighters.forEach((f, i) => {
      if (f.health > 0)
        f.health = Math.min(100, f.health + this.pendingHealing[i]);
      if (this.pendingPulls[i] !== null)
        f.x = clamp(this.pendingPulls[i]!, 45, ARENA_WIDTH - 45);
    });
    if (this.pendingPulls.some((x) => x !== null)) {
      const [a, b] = this.fighters,
        order = contactOrigins[1] >= contactOrigins[0] ? 1 : -1;
      if ((b.x - a.x) * order < 54) {
        const midpoint = clamp((a.x + b.x) / 2, 72, ARENA_WIDTH - 72);
        a.x = midpoint - order * 27;
        b.x = midpoint + order * 27;
      }
    }
    if (this.fighters.some((f) => f.health <= 0) || this.remaining <= 0)
      this.finishRound();
  }
  private capture(f: Fighter, input: InputFrame) {
    let move: MoveId | null = null;
    if (input.special && !f.previous.special) move = "special";
    else if (input.heavy && !f.previous.heavy) move = f.y > 0 ? "air" : "heavy";
    else if (input.light && !f.previous.light)
      move = f.y > 0 ? "air" : input.crouch ? "low" : "light";
    if (move) f.buffer = { move, until: this.tick + 6 };
    f.previous = { ...input };
  }
  private startMove(f: Fighter, id: MoveId, opponent: Fighter) {
    if (id === "special" && (f.meter < 50 || f.y > 0)) return false;
    if (id === "special") f.meter -= 50;
    f.move = id;
    f.moveTick = 0;
    f.hit = false;
    f.connected = false;
    f.specialOriginX = f.x;
    f.specialTargetX = opponent.x;
    f.specialPulse = -1;
    f.state = "attack";
    f.stateTick = 0;
    f.guarding = false;
    f.buffer = null;
    return true;
  }
  private updateFighter(f: Fighter, input: InputFrame, opponent: Fighter) {
    f.stateTick++;
    if (f.y > 0 || f.vy > 0) {
      f.y += f.vy;
      f.vy -= 0.65;
      if (f.y <= 0) {
        f.y = 0;
        f.vy = 0;
      }
    }
    if (f.health <= 0) {
      f.state = "defeated";
      return;
    }
    if (f.stun > 0) {
      f.stun--;
      return;
    }
    if (f.buffer && f.buffer.until < this.tick) f.buffer = null;
    if (f.move) {
      f.moveTick++;
      if (f.move === "special") this.updateSpecial(f, opponent);
      if (
        f.move === "light" &&
        f.connected &&
        f.moveTick >= 9 &&
        f.moveTick < 17 &&
        f.buffer?.move === "heavy"
      )
        this.startMove(f, "heavy", opponent);
      if (f.moveTick < moveLength(f.move, f.id)) return;
      f.move = null;
    }
    f.facing = opponent.x >= f.x ? 1 : -1;
    const away = f.facing === 1 ? input.left : input.right;
    f.guarding = f.y === 0 && (input.guard || away);
    f.lowGuard = input.crouch;
    if (
      f.buffer &&
      (!f.guarding || !input.guard) &&
      this.startMove(f, f.buffer.move, opponent)
    )
      return;
    if (input.jump && f.y === 0 && !input.guard) {
      f.vy = 12;
      f.y = 1;
      f.guarding = false;
    }
    const direction = Number(input.right) - Number(input.left);
    if (direction && !input.guard && !input.crouch)
      f.x += direction * FIGHTERS[f.id].speed * (f.y > 0 ? 0.8 : 1);
    f.x = clamp(f.x, 45, ARENA_WIDTH - 45);
    f.state =
      f.y > 0
        ? "jump"
        : f.guarding
          ? "guard"
          : input.crouch
            ? "crouch"
            : direction
              ? "walk"
              : "idle";
  }
  private spawnProjectile(f: Fighter, patch: Partial<Projectile> = {}) {
    const special = SPECIAL_MOVES[f.id];
    this.projectiles.push({
      id: ++this.projectileId,
      owner: f.side,
      fighter: f.id,
      kind: special.kind,
      x: f.x + f.facing * 45,
      y: FLOOR_Y - 78,
      facing: f.facing,
      age: 0,
      vx: f.facing * 8,
      vy: 0,
      width: 36,
      height: 36,
      delay: 0,
      duration: 150,
      ...patch,
    });
  }
  private updateSpecial(f: Fighter, opponent: Fighter) {
    const special = SPECIAL_MOVES[f.id],
      t = f.moveTick - special.startup;
    if (t === 0) {
      this.events.push({ type: "special", side: f.side, fighter: f.id });
      switch (special.kind) {
        case "wave":
          this.spawnProjectile(f, { width: 56, height: 62 });
          break;
        case "double-burst":
          this.spawnProjectile(f, { vx: f.facing * 10, width: 27, height: 27 });
          break;
        case "trap":
          this.spawnProjectile(f, {
            x: clamp(f.x + f.facing * 155, 45, 915),
            y: FLOOR_Y - 22,
            vx: 0,
            width: 74,
            height: 44,
            delay: 18,
            duration: 110,
          });
          break;
        case "lob":
          this.spawnProjectile(f, {
            y: FLOOR_Y - 115,
            vx: f.facing * 5.1,
            vy: -8,
            width: 44,
            height: 44,
            duration: 100,
          });
          break;
        case "tether":
          this.spawnProjectile(f, {
            vx: f.facing * 11,
            width: 54,
            height: 18,
            duration: 65,
          });
          break;
        case "ring":
          this.spawnProjectile(f, {
            x: f.x,
            y: FLOOR_Y - 65,
            vx: 0,
            width: 40,
            height: 40,
            duration: 33,
          });
          break;
        case "tracking-orb":
          this.spawnProjectile(f, {
            vx: f.facing * 2.2,
            width: 48,
            height: 48,
            duration: 145,
          });
          break;
        case "cascade":
          for (let n = 0; n < 3; n++)
            this.spawnProjectile(f, {
              x: clamp(f.specialTargetX + (n - 1) * 68, 45, 915),
              y: 140,
              vx: 0,
              vy: 13,
              width: 38,
              height: 68,
              delay: 18 + n * 8,
              duration: 65 + n * 8,
            });
          break;
        case "uppercut":
          f.vy = 10;
          f.y = 1;
          break;
        case "sky-kick":
          f.vy = 8.5;
          f.y = 1;
          break;
        case "blink":
          // Never cross through the defender: the locked marker can be escaped,
          // and the defender's held guard remains a valid response.
          f.x = clamp(f.specialTargetX - f.facing * 78, 45, 915);
          if ((opponent.x - f.x) * f.facing < 54)
            f.x = clamp(opponent.x - f.facing * 78, 45, 915);
          break;
      }
    }
    if (special.kind === "double-burst" && t === 12)
      this.spawnProjectile(f, { vx: f.facing * 10, width: 27, height: 27 });
    if (t < 0 || t >= special.active) return;
    if (special.kind === "rush") {
      const pulse = Math.floor(t / 9);
      if (pulse !== f.specialPulse) {
        f.hit = false;
        f.specialPulse = pulse;
      }
      f.x += f.facing * 3.2;
    } else if (special.kind === "uppercut") f.x += f.facing * 1.2;
    else if (special.kind === "sky-kick") f.x += f.facing * 5.5;
    else if (special.kind === "dash") f.x += f.facing * 11;
    f.x = clamp(f.x, 45, 915);
  }
  private separateBodies() {
    const [a, b] = this.fighters;
    if (Math.abs(a.y - b.y) > 115) return;
    const distance = b.x - a.x;
    if (Math.abs(distance) >= 54) return;
    const direction = distance >= 0 ? 1 : -1;
    const correction = (54 - Math.abs(distance)) / 2;
    a.x = clamp(a.x - correction * direction, 45, ARENA_WIDTH - 45);
    b.x = clamp(b.x + correction * direction, 45, ARENA_WIDTH - 45);
    if (Math.abs(b.x - a.x) < 54) {
      if (a.x === 45 || a.x === ARENA_WIDTH - 45) b.x = a.x + direction * 54;
      else a.x = b.x - direction * 54;
    }
  }
  private resolveHit(
    side: Side,
    id: MoveId,
    direction: 1 | -1,
    sourceX = this.fighters[side].x,
  ) {
    const attacker = this.fighters[side],
      target = this.fighters[side === 0 ? 1 : 0],
      move = id === "special" ? SPECIAL_MOVES[attacker.id] : MOVES[id];
    if (target.health <= 0) return;
    // A counter has a readable startup and finite active window; it offers no
    // immunity before/after that window, and can only reverse one contact.
    const counter = SPECIAL_MOVES[target.id];
    if (
      target.move === "special" &&
      counter.kind === "counter" &&
      !target.hit &&
      target.moveTick >= counter.startup &&
      target.moveTick < counter.startup + counter.active
    ) {
      target.hit = true;
      target.connected = true;
      target.moveTick = counter.startup + counter.active;
      this.events.push({
        type: "special",
        side: target.side,
        fighter: target.id,
      });
      // A projectile can be countered, but the retaliation has close range.
      if (Math.abs(target.x - attacker.x) <= 160)
        this.resolveHit(target.side, "special", target.facing);
      else
        this.events.push({
          type: "block",
          side: target.side,
          x: target.x,
          y: FLOOR_Y - target.y - 95,
        });
      return;
    }
    const correctHeight =
      move.guard === "mid" ||
      (move.guard === "low" ? target.lowGuard : !target.lowGuard);
    const blocked =
      target.guarding &&
      target.y === 0 &&
      target.facing === -direction &&
      correctHeight;
    if (blocked) {
      target.stun = 10;
      target.state = "guard";
      target.stateTick = 0;
      target.x = clamp(target.x + direction * 8, 45, ARENA_WIDTH - 45);
      if (id === "special") target.health = Math.max(1, target.health - 2);
      else attacker.meter = clamp(attacker.meter + 4, 0, 100);
    } else {
      target.health = Math.max(0, target.health - move.damage);
      target.meter = clamp(target.meter + 5, 0, 100);
      if (id !== "special") attacker.meter = clamp(attacker.meter + 10, 0, 100);
      target.move = null;
      target.buffer = null;
      target.guarding = false;
      target.stun = move.stun;
      target.state = "hurt";
      target.stateTick = 0;
      target.x = clamp(target.x + direction * move.push, 45, ARENA_WIDTH - 45);
      attacker.connected = true;
      if (id === "special") {
        const kind = SPECIAL_MOVES[attacker.id].kind;
        if (kind === "pulse") this.pendingHealing[side] += 6;
        if (kind === "tether")
          this.pendingPulls[target.side] = sourceX + direction * 95;
        if (kind === "uppercut") {
          target.y = Math.max(1, target.y);
          target.vy = 9;
        }
      }
    }
    this.hitStop = Math.max(
      this.hitStop,
      blocked ? 3 : id === "heavy" || id === "special" ? 7 : 4,
    );
    this.events.push({
      type: blocked ? "block" : "hit",
      side: target.side,
      x: target.x,
      y: FLOOR_Y - target.y - (move.guard === "low" ? 40 : 95),
    });
  }
  private finishRound() {
    const [a, b] = this.fighters;
    this.roundWinner =
      a.health === b.health ? null : a.health > b.health ? 0 : 1;
    if (this.roundWinner === null) this.draws++;
    else this.fighters[this.roundWinner].wins++;
    this.fighters.forEach((f) => {
      f.buffer = null;
      f.move = null;
      f.guarding = false;
      f.state =
        f.health === 0
          ? "defeated"
          : f.side === this.roundWinner
            ? "victory"
            : "idle";
      f.stateTick = 0;
    });
    this.phase = "round-end";
    this.phaseTick = 0;
    this.projectiles = [];
    this.events.push({ type: "round" });
  }
  private nextRound() {
    const winner = this.fighters.find((f) => f.wins >= 2);
    if (winner || this.draws >= 3) {
      this.phase = "match-end";
      this.winner = winner?.side ?? null;
      this.phaseTick = 0;
      return;
    }
    this.fighters = [
      createFighter(this.config.player, 0, this.fighters[0].wins),
      createFighter(this.config.opponent, 1, this.fighters[1].wins),
    ];
    this.round++;
    this.remaining = ROUND_TICKS;
    this.phase = "intro";
    this.phaseTick = 0;
    this.hitStop = 0;
    this.cpu.reset();
  }
}
