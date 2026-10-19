import { describe, expect, test } from "bun:test";
import {
  ARENA_WIDTH,
  CombatMatch,
  emptyInput,
  type InputFrame,
  type Side,
} from "../app/games/team-arcade/core/combat";
import { FIGHTER_IDS, type FighterId } from "../app/games/team-arcade/roster";
import { InputController } from "../app/games/team-arcade/core/input";

const input = (patch: Partial<InputFrame> = {}): InputFrame => ({
  ...emptyInput(),
  ...patch,
});
function setup(id: FighterId = "sam", direction = 1, jumper: Side = 0) {
  const match = new CombatMatch({
    player: id,
    opponent: id,
    difficulty: "easy",
    seed: 123,
  });
  match.phase = "fight";
  match.fighters[jumper].x = direction === 1 ? 400 : 540;
  match.fighters[jumper === 0 ? 1 : 0].x = 470;
  match.fighters[jumper].facing = direction === 1 ? 1 : -1;
  match.fighters[jumper === 0 ? 1 : 0].facing = direction === 1 ? -1 : 1;
  return match;
}
function ticks(match: CombatMatch, count: number, a = input(), b = input()) {
  for (let t = 0; t < count; t++) match.step(a, b);
}
function stepFor(match: CombatMatch, side: Side, controls: InputFrame) {
  match.step(side === 0 ? controls : input(), side === 1 ? controls : input());
}
const directions = [-1, 1] as const;

describe("jumping past an opponent", () => {
  test.each(
    FIGHTER_IDS.flatMap((id) =>
      directions.map((direction) => [id, direction] as const),
    ),
  )(
    "%s can tap neutral Up to hop over a close opponent in direction %s",
    (id, direction) => {
      const match = setup(id, direction);
      stepFor(match, 0, input({ jump: true }));
      const launchCarry = match.fighters[0].jumpCarry;
      expect(Math.sign(launchCarry)).toBe(direction);
      let crossedInAir = false;
      for (let tick = 0; tick < 60; tick++) {
        match.step(input(), input());
        const [jumper, opponent] = match.fighters;
        if ((jumper.x - opponent.x) * direction > 0 && jumper.y > 0) {
          crossedInAir = true;
          expect(jumper.facing).toBe(-direction);
          expect(opponent.facing).toBe(direction);
          expect(Math.sign(jumper.jumpCarry)).toBe(direction);
        }
        expect(jumper.x).toBeGreaterThanOrEqual(45);
        expect(jumper.x).toBeLessThanOrEqual(ARENA_WIDTH - 45);
      }
      expect(crossedInAir).toBe(true);
      expect(
        (match.fighters[0].x - match.fighters[1].x) * direction,
      ).toBeGreaterThanOrEqual(54);
      expect(match.fighters[0].y).toBe(0);
      expect(match.fighters[0].vy).toBe(0);
      expect(match.fighters[0].jumpCarry).toBe(0);
      expect(match.fighters.map((fighter) => fighter.health)).toEqual([
        100, 100,
      ]);
    },
  );
  test.each(
    FIGHTER_IDS.flatMap((id) =>
      directions.map((direction) => [id, direction] as const),
    ),
  )(
    "%s's directional jump can cross in direction %s using ordinary air steering",
    (id, direction) => {
      const match = setup(id, direction);
      const steer = direction === 1 ? { right: true } : { left: true };
      stepFor(match, 0, input({ jump: true, ...steer }));
      expect(match.fighters[0].jumpCarry).toBe(0);
      let crossedInAir = false;
      for (let tick = 0; tick < 45; tick++) {
        stepFor(match, 0, input(steer));
        if (
          (match.fighters[0].x - match.fighters[1].x) * direction > 0 &&
          match.fighters[0].y > 0
        )
          crossedInAir = true;
      }
      expect(crossedInAir).toBe(true);
      expect(
        (match.fighters[0].x - match.fighters[1].x) * direction,
      ).toBeGreaterThanOrEqual(54);
    },
  );
  test.each(directions)(
    "the CPU-controlled side follows the same close-hop rules in direction %s",
    (direction) => {
      const match = setup("sonia", direction, 1);
      stepFor(match, 1, input({ jump: true }));
      for (let tick = 0; tick < 60; tick++) stepFor(match, 1, input());
      expect(
        (match.fighters[1].x - match.fighters[0].x) * direction,
      ).toBeGreaterThanOrEqual(54);
      expect(match.fighters[1].y).toBe(0);
      expect(match.fighters[1].facing).toBe(-direction);
      expect(match.fighters[0].facing).toBe(direction);
    },
  );
  test("neutral Up further away stays vertical and does not home toward the opponent", () => {
    const match = setup();
    match.fighters[1].x = 700;
    match.step(input({ jump: true }), input());
    ticks(match, 60);
    expect(match.fighters[0].x).toBe(400);
    expect(match.fighters[0].jumpCarry).toBe(0);
    expect(match.fighters[0].y).toBe(0);
  });
  test("midair left/right takes over a neutral hop rather than fighting its carried direction", () => {
    const match = setup();
    match.step(input({ jump: true }), input());
    ticks(match, 14);
    const before = match.fighters[0].x;
    match.step(input({ left: true }), input());
    expect(match.fighters[0].x).toBeLessThan(before);
    expect(match.fighters[0].jumpCarry).toBe(0);
    const steered = match.fighters[0].x;
    ticks(match, 3);
    expect(match.fighters[0].x).toBe(steered);
  });
  test.each(directions)(
    "grounded movement cannot walk through a fighter in direction %s",
    (direction) => {
      const match = setup("kang", direction);
      for (let tick = 0; tick < 300; tick++) {
        match.step(
          input(direction === 1 ? { right: true } : { left: true }),
          input(),
        );
        expect(
          (match.fighters[1].x - match.fighters[0].x) * direction,
        ).toBeGreaterThanOrEqual(54 - 0.000001);
        expect(
          match.fighters.every(
            (fighter) =>
              fighter.y === 0 &&
              fighter.x >= 45 &&
              fighter.x <= ARENA_WIDTH - 45,
          ),
        ).toBe(true);
      }
    },
  );
  test.each(directions)(
    "landing overlap separates on the crossed side in direction %s",
    (direction) => {
      const match = setup("sam", direction);
      match.fighters[0].x = 470 + direction * 5;
      match.fighters[0].y = 10;
      match.fighters[0].vy = -15;
      match.fighters[0].facing = direction === 1 ? -1 : 1;
      match.step(input(), input());
      expect(match.fighters[0].y).toBe(0);
      expect(
        (match.fighters[0].x - match.fighters[1].x) * direction,
      ).toBeGreaterThanOrEqual(54);
      expect(match.fighters[0].facing).toBe(-direction);
      expect(match.fighters[1].facing).toBe(direction);
    },
  );
  test("an exact overlap on landing preserves the last crossed side", () => {
    const match = setup();
    // Record the actual airborne order even while an attack still faces its
    // original direction, then land at an exact horizontal tie.
    match.fighters[0].x = 480;
    match.fighters[0].y = 100;
    match.fighters[0].move = "air";
    match.fighters[0].moveTick = 0;
    match.fighters[0].facing = 1;
    match.step(input(), input());
    expect(match.fighters[0].facing).toBe(1);
    match.fighters[0].x = 470;
    match.fighters[0].y = 10;
    match.fighters[0].vy = -15;
    match.step(input(), input());
    expect(match.fighters[0].x - match.fighters[1].x).toBe(54);
  });
  test.each(directions)(
    "a hop into the stage edge lands with two legal separated positions in direction %s",
    (direction) => {
      const match = setup("sam", direction);
      match.fighters[0].x = direction === 1 ? 845 : 115;
      match.fighters[1].x = direction === 1 ? 915 : 45;
      match.step(input({ jump: true }), input());
      ticks(match, 60);
      expect(match.fighters[0].y).toBe(0);
      expect(
        match.fighters.every(
          (fighter) => fighter.x >= 45 && fighter.x <= ARENA_WIDTH - 45,
        ),
      ).toBe(true);
      expect(
        Math.abs(match.fighters[1].x - match.fighters[0].x),
      ).toBeGreaterThanOrEqual(54);
    },
  );
  test("same-height mirror jumps still have body collision and never merge", () => {
    const match = setup();
    match.step(input({ jump: true }), input({ jump: true }));
    for (let tick = 0; tick < 60; tick++) {
      match.step(input(), input());
      expect(match.fighters[1].x - match.fighters[0].x).toBeGreaterThanOrEqual(
        54 - 0.000001,
      );
    }
  });
  test("carried jumps continue through an air attack without reversing its locked attack direction", () => {
    const match = setup();
    match.step(input({ jump: true }), input());
    ticks(match, 8);
    match.step(input({ light: true }), input());
    expect(match.fighters[0].move).toBe("air");
    let crossedDuringAttack = false;
    for (let tick = 0; tick < 40; tick++) {
      match.step(input(), input());
      if (match.fighters[0].move && match.fighters[0].x > match.fighters[1].x) {
        crossedDuringAttack = true;
        expect(match.fighters[0].facing).toBe(1);
      }
    }
    expect(crossedDuringAttack).toBe(true);
    expect(match.fighters[0].facing).toBe(-1);
    expect(match.fighters[1].facing).toBe(1);
  });
  test("jump crossover is identical at 30, 60, 120 and 144 rendered frames per second", () => {
    const snapshots = [30, 60, 120, 144].map((fps) => {
      const match = setup();
      const controls = new InputController();
      controls.set("jump", true);
      controls.set("jump", false);
      for (let frame = 0; frame < fps; frame++) {
        const before = match.tick;
        match.advance(1000 / fps, controls.sample(), input());
        if (match.tick !== before) controls.consumed();
      }
      return match.snapshot();
    });
    for (const snapshot of snapshots) expect(snapshot).toEqual(snapshots[0]);
  });
  test("a crossed defender turns and can guard a follow-up instead of retaining its old side", () => {
    const match = setup();
    match.step(input({ jump: true }), input({ guard: true }));
    ticks(match, 42, input(), input({ guard: true }));
    expect(match.fighters[0].facing).toBe(-1);
    expect(match.fighters[1].facing).toBe(1);
    // Step back into punching reach on the new side.
    while (match.fighters[0].x - match.fighters[1].x > 75)
      match.step(input({ left: true }), input({ guard: true }));
    ticks(match, 30, input({ light: true }), input({ guard: true }));
    expect(match.fighters[1].health).toBe(100);
    expect(match.events.some((event) => event.type === "block")).toBe(true);
  });
});
