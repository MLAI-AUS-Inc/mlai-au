import { describe, expect, test } from "bun:test";
import {
  CombatMatch,
  emptyInput,
  hitbox,
  hurtbox,
  overlaps,
  ROUND_TICKS,
  STEP_MS,
  type InputFrame,
} from "../app/games/team-arcade/core/combat";
import { FIGHTER_IDS, type FighterId } from "../app/games/team-arcade/roster";
import { InputController } from "../app/games/team-arcade/core/input";

const input = (patch: Partial<InputFrame> = {}): InputFrame => ({
  ...emptyInput(),
  ...patch,
});
function match(player: FighterId = "sam", opponent: FighterId = "sonia") {
  const game = new CombatMatch({
    player,
    opponent,
    difficulty: "normal",
    seed: 123,
  });
  for (let i = 0; i < 105; i++) game.step();
  game.fighters[0].x = 400;
  game.fighters[1].x = 470;
  return game;
}
function ticks(game: CombatMatch, count: number, a = input(), b = input()) {
  for (let i = 0; i < count; i++) game.step(a, b);
}

describe("team arcade combat", () => {
  test("a fast key tap is retained until the simulation consumes it", () => {
    const controls = new InputController();
    controls.set("light", true);
    controls.set("light", false);
    expect(controls.sample().light).toBe(true);
    const game = match();
    game.advance(STEP_MS, controls.sample(), input());
    controls.consumed();
    expect(game.fighters[0].move).toBe("light");
    expect(controls.sample().light).toBe(false);
    controls.set("right", true);
    controls.set("jump", true);
    controls.clear();
    expect(controls.sample()).toEqual(input());
  });
  test("intro ends before controls and damage become active", () => {
    const game = new CombatMatch({
      player: "sam",
      opponent: "sonia",
      difficulty: "normal",
    });
    ticks(game, 100, input({ light: true, right: true }));
    expect(game.phase).toBe("intro");
    expect(game.remaining).toBe(ROUND_TICKS);
    expect(game.fighters[0].x).toBe(310);
    ticks(game, 5);
    expect(game.phase).toBe("fight");
  });
  test("startup is vulnerable time, active overlap hits once, a held key does not repeat", () => {
    const game = match();
    ticks(game, 6, input({ light: true }));
    expect(game.fighters[1].health).toBe(100);
    ticks(game, 1, input({ light: true }));
    expect(game.fighters[1].health).toBe(94);
    ticks(game, 70, input({ light: true }));
    expect(game.fighters[1].health).toBe(94);
    expect(game.fighters[0].meter).toBe(10);
    expect(game.fighters[1].meter).toBe(5);
  });
  test("out-of-range attacks miss and cannot create meter", () => {
    const game = match();
    game.fighters[1].x = 700;
    ticks(game, 45, input({ heavy: true }));
    expect(game.fighters[1].health).toBe(100);
    expect(game.fighters[0].meter).toBe(0);
  });
  test("a combo command buffered on impact survives hit-stop", () => {
    const game = match();
    ticks(game, 6, input({ light: true }));
    game.step(input({ heavy: true }), input());
    expect(game.hitStop).toBeGreaterThan(0);
    ticks(game, 7);
    expect(game.fighters[0].move).toBe("heavy");
  });
  test("mirrored facing puts attack boxes in front of either fighter", () => {
    const game = match();
    game.fighters[0].x = 500;
    game.fighters[1].x = 430;
    ticks(game, 7, input({ light: true }));
    expect(game.fighters[0].facing).toBe(-1);
    expect(game.fighters[1].health).toBe(94);
  });
  test("standing and crouching guard distinguish low attacks", () => {
    const high = match();
    ticks(
      high,
      12,
      input({ crouch: true, light: true }),
      input({ guard: true }),
    );
    expect(high.fighters[1].health).toBe(93);
    const low = match();
    ticks(
      low,
      12,
      input({ crouch: true, light: true }),
      input({ guard: true, crouch: true }),
    );
    expect(low.fighters[1].health).toBe(100);
    expect(low.fighters[0].meter).toBe(4);
  });
  test("held guard survives consecutive contacts during blockstun", () => {
    const game = match();
    ticks(game, 7, input({ light: true }), input({ guard: true }));
    expect(game.fighters[1].guarding).toBe(true);
    game.fighters[0].move = "light";
    game.fighters[0].moveTick = 5;
    game.fighters[0].hit = false;
    game.hitStop = 0;
    ticks(game, 1, input(), input({ guard: true }));
    expect(game.fighters[1].health).toBe(100);
    expect(game.fighters[1].stun).toBe(10);
  });
  test("recovery and hitstun reject illegal new attacks", () => {
    const game = match();
    ticks(game, 2, input({ heavy: true }));
    ticks(game, 1, input());
    ticks(game, 1, input({ light: true }));
    expect(game.fighters[0].move).toBe("heavy");
    game.fighters[0].move = null;
    game.fighters[0].buffer = null;
    game.fighters[0].stun = 18;
    game.fighters[0].state = "hurt";
    ticks(game, 1, input({ special: true }));
    expect(game.fighters[0].move).toBeNull();
  });
  test("simultaneous attacks trade rather than favouring player update order", () => {
    const game = match();
    ticks(game, 7, input({ light: true }), input({ light: true }));
    expect(game.fighters.map((f) => f.health)).toEqual([94, 94]);
  });
  test("specials require meter, spend exactly once, and projectiles hit once", () => {
    const game = match();
    game.fighters[1].x = 640;
    ticks(game, 60, input({ special: true }));
    expect(game.projectiles).toHaveLength(0);
    expect(game.fighters[1].health).toBe(100);
    ticks(game, 1);
    game.fighters[0].meter = 50;
    ticks(game, 70, input({ special: true }));
    expect(game.fighters[0].meter).toBe(0);
    expect(game.fighters[1].health).toBe(84);
    expect(game.projectiles).toHaveLength(0);
  });
  test("a blocked special chips but cannot cause a KO", () => {
    const game = match();
    game.fighters[0].meter = 50;
    game.fighters[1].health = 1;
    ticks(game, 60, input({ special: true }), input({ guard: true }));
    expect(game.fighters[1].health).toBe(1);
    expect(game.phase).toBe("fight");
  });
  test("jump clears low attacks and lands back inside the arena", () => {
    const game = match();
    ticks(
      game,
      12,
      input({ crouch: true, light: true }),
      input({ jump: true }),
    );
    expect(game.fighters[1].health).toBe(100);
    expect(game.fighters[1].y).toBeGreaterThan(0);
    ticks(game, 60, input(), input());
    expect(game.fighters[1].y).toBe(0);
    expect(game.fighters[1].vy).toBe(0);
  });
  test("bodies separate at corners and movement cannot escape the arena", () => {
    const game = match();
    game.fighters[0].x = 45;
    game.fighters[1].x = 65;
    ticks(game, 80, input({ left: true }), input({ left: true }));
    expect(game.fighters[0].x).toBeGreaterThanOrEqual(45);
    expect(
      Math.abs(game.fighters[1].x - game.fighters[0].x),
    ).toBeGreaterThanOrEqual(54);
  });
  test("pause freezes the simulation, timer and hitstop, discarding accumulated wall time", () => {
    const game = match();
    const before = game.snapshot();
    game.setPaused(true);
    game.advance(100000, input({ right: true }));
    expect(game.tick).toBe(before.tick);
    expect(game.remaining).toBe(ROUND_TICKS);
    game.setPaused(false);
    game.advance(STEP_MS, input(), input());
    expect(game.tick).toBe(before.tick + 1);
  });
  test("two round wins produce results; health, input and meter reset between rounds", () => {
    const game = match();
    for (let round = 0; round < 2; round++) {
      game.fighters[0].x = 400;
      game.fighters[1].x = 470;
      game.fighters[1].health = 6;
      ticks(game, 7, input({ light: true }));
      expect(game.phase).toBe("round-end");
      ticks(game, 150);
      if (round === 0) {
        expect(game.phase).toBe("intro");
        expect(game.fighters[0].wins).toBe(1);
        expect(game.fighters[1].health).toBe(100);
        expect(game.fighters[0].meter).toBe(0);
        ticks(game, 105);
      }
    }
    expect(game.phase).toBe("match-end");
    expect(game.winner).toBe(0);
    expect(game.fighters[0].wins).toBe(2);
  });
  test("timeout awards the higher health, while three tied rounds end as a draw", () => {
    const game = match();
    game.remaining = 1;
    game.fighters[0].health = 90;
    ticks(game, 1);
    expect(game.roundWinner).toBe(1);
    const draw = match();
    for (let i = 0; i < 3; i++) {
      draw.remaining = 1;
      ticks(draw, 1);
      expect(draw.roundWinner).toBeNull();
      ticks(draw, 150);
      if (i < 2) ticks(draw, 105);
    }
    expect(draw.phase).toBe("match-end");
    expect(draw.winner).toBeNull();
  });
  test("double KO is resolved as a draw", () => {
    const game = match();
    game.fighters.forEach((f) => (f.health = 6));
    ticks(game, 7, input({ light: true }), input({ light: true }));
    expect(game.fighters.map((f) => f.health)).toEqual([0, 0]);
    expect(game.roundWinner).toBeNull();
  });
  test("the same timed inputs have identical outcomes at 30, 60, 120 and 144 rendered fps", () => {
    const snapshots = [30, 60, 120, 144].map((fps) => {
      const game = match();
      for (let frame = 0; frame < fps * 4; frame++)
        game.advance(1000 / fps, input({ right: true }), input());
      return {
        tick: game.tick,
        remaining: game.remaining,
        x: game.fighters.map((f) => f.x),
      };
    });
    expect(
      snapshots.every(
        (s) => JSON.stringify(s) === JSON.stringify(snapshots[0]),
      ),
    ).toBe(true);
  });
  test.each(
    FIGHTER_IDS.flatMap((a) => FIGHTER_IDS.map((b) => [a, b] as const)),
  )("%s versus %s can finish a seeded CPU match", (player, opponent) => {
    const game = new CombatMatch({
      player,
      opponent,
      difficulty: "easy",
      seed: 181,
    });
    for (let t = 0; t < 24000 && game.phase !== "match-end"; t++) game.step();
    expect(game.phase).toBe("match-end");
    expect(game.winner).toBe(1);
  });
  test("difficulty reaction delays are actual observation delays", () => {
    for (const [difficulty, delay] of [
      ["hard", 9],
      ["normal", 15],
      ["easy", 25],
    ] as const) {
      const game = match();
      const cpu = new (game.cpu
        .constructor as typeof import("../app/games/team-arcade/core/combat").CpuController)(
        difficulty,
        123,
      );
      for (let i = 0; i < delay; i++) {
        game.tick = i;
        expect(cpu.decide(game)).toEqual(emptyInput());
      }
      game.tick = delay;
      expect(cpu.decide(game).left).toBe(false); // Already in range: a legal attack/guard decision, never teleported movement.
    }
  });
  test("collision geometry excludes defeated and inactive attacks", () => {
    const game = match();
    expect(hitbox(game.fighters[0])).toBeNull();
    expect(overlaps(hurtbox(game.fighters[0]), hurtbox(game.fighters[1]))).toBe(
      false,
    );
  });
});
