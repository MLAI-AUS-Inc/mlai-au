import { describe, expect, test } from "bun:test";
import {
  CombatMatch,
  CpuController,
  emptyInput,
  FLOOR_Y,
  projectileBox,
  type InputFrame,
} from "../app/games/team-arcade/core/combat";
import { FIGHTER_IDS, type FighterId } from "../app/games/team-arcade/roster";
import { SPECIAL_MOVES } from "../app/games/team-arcade/specials";

const input = (patch: Partial<InputFrame> = {}): InputFrame => ({
  ...emptyInput(),
  ...patch,
});
function setup(id: FighterId, x = 400, opponent: FighterId = "sam") {
  const match = new CombatMatch({
    player: id,
    opponent,
    difficulty: "normal",
    seed: 123,
  });
  match.phase = "fight";
  match.fighters[0].x = 300;
  match.fighters[1].x = x;
  match.fighters[0].meter = 50;
  return match;
}
function ticks(match: CombatMatch, count: number, a = input(), b = input()) {
  for (let i = 0; i < count; i++) match.step(a, b);
}
function cast(match: CombatMatch) {
  match.step(input({ special: true }), input());
}
function nextEmission(match: CombatMatch) {
  for (let i = 0; i < 80 && !match.projectiles.length; i++)
    match.step(input(), input());
  expect(match.projectiles.length).toBeGreaterThan(0);
}
const targetX: Record<FighterId, number> = {
  sam: 560,
  sonia: 540,
  ryan: 400,
  pegah: 455,
  yana: 590,
  anjali: 400,
  anu: 400,
  daniel: 570,
  jun: 400,
  alisa: 400,
  shan: 620,
  kang: 400,
  juan: 580,
  alan: 550,
  callum: 590,
};

describe("all team fighters have playable, distinct specials", () => {
  test.each(FIGHTER_IDS)(
    "%s spends exactly 50 meter once and rejects an underfunded/airborne cast",
    (id) => {
      const paid = setup(id, targetX[id]);
      cast(paid);
      expect(paid.fighters[0].meter).toBe(0);
      ticks(paid, 220, input({ special: true }));
      expect(paid.fighters[0].meter).toBe(0);
      const poor = setup(id);
      poor.fighters[0].meter = 49;
      cast(poor);
      expect(poor.fighters[0].move).toBeNull();
      expect(poor.fighters[0].meter).toBe(49);
      const airborne = setup(id);
      airborne.fighters[0].y = 25;
      cast(airborne);
      expect(airborne.fighters[0].move).toBeNull();
      expect(airborne.fighters[0].meter).toBe(50);
    },
  );
  test.each(FIGHTER_IDS.filter((id) => id !== "kang"))(
    "%s's special can land, and correct guard prevents lethal chip",
    (id) => {
      const landed = setup(id, targetX[id]);
      cast(landed);
      ticks(landed, 220);
      expect(landed.fighters[1].health).toBeLessThan(100);
      const guarded = setup(id, targetX[id]);
      guarded.fighters[1].health = 1;
      ticks(
        guarded,
        220,
        input({ special: true }),
        input({ guard: true, crouch: SPECIAL_MOVES[id].guard === "low" }),
      );
      expect(guarded.fighters[1].health).toBe(1);
      expect(guarded.phase).toBe("fight");
    },
  );
  test("Sam emits one broad linear wave, while Sonia emits two independent small bursts", () => {
    const sam = setup("sam", 850);
    cast(sam);
    nextEmission(sam);
    expect(sam.projectiles[0].width).toBe(56);
    expect(sam.projectiles[0].height).toBe(62);
    expect(sam.projectiles[0].vy).toBe(0);
    const sonia = setup("sonia", 850);
    cast(sonia);
    nextEmission(sonia);
    expect(sonia.projectiles).toHaveLength(1);
    ticks(sonia, 12);
    expect(sonia.projectiles).toHaveLength(2);
    expect(sonia.projectiles[0].width).toBeLessThan(sam.projectiles[0].width);
    const landed = setup("sonia", 540);
    cast(landed);
    ticks(landed, 150);
    expect(
      landed.events.filter((e) => e.type === "hit" && e.side === 1),
    ).toHaveLength(2);
    expect(landed.fighters[1].health).toBe(84);
  });
  test("Ryan's uppercut rises and launches the opponent; a whiff has long punishable recovery", () => {
    const match = setup("ryan");
    cast(match);
    ticks(match, 13);
    expect(match.fighters[0].y).toBeGreaterThan(0);
    expect(match.fighters[1].vy).toBeGreaterThan(0);
    expect(match.fighters[1].health).toBe(82);
    const whiff = setup("ryan", 850);
    cast(whiff);
    ticks(whiff, 30);
    expect(whiff.fighters[0].move).toBe("special");
    expect(whiff.fighters[1].health).toBe(100);
  });
  test("Pegah's ground snare has a delay, stays fixed, demands low guard and can be jumped", () => {
    const match = setup("pegah", 455);
    cast(match);
    nextEmission(match);
    const trap = match.projectiles[0];
    expect(trap.delay).toBe(18);
    expect(trap.vx).toBe(0);
    expect(projectileBox(trap).y).toBe(FLOOR_Y - 44);
    ticks(match, 16);
    expect(match.fighters[1].health).toBe(100);
    ticks(match, 3);
    expect(match.fighters[1].health).toBe(88);
    expect(match.fighters[1].stun).toBeGreaterThan(30);
    const standing = setup("pegah", 455);
    ticks(standing, 100, input({ special: true }), input({ guard: true }));
    expect(standing.fighters[1].health).toBe(88);
    const jumping = setup("pegah", 455);
    cast(jumping);
    nextEmission(jumping);
    ticks(jumping, 19, input(), input({ jump: true }));
    expect(jumping.fighters[1].health).toBe(100);
  });
  test("Yana's lob follows a gravity arc instead of the ground-wave path", () => {
    const match = setup("yana", 850);
    cast(match);
    nextEmission(match);
    const lob = match.projectiles[0];
    const launchY = lob.y,
      launchX = lob.x;
    expect(lob.vy).toBeLessThan(0);
    ticks(match, 15);
    expect(lob.y).toBeLessThan(launchY);
    ticks(match, 20);
    expect(lob.vy).toBeGreaterThan(0);
    expect(lob.x).toBeGreaterThan(launchX + 150);
  });
  test("Anjali advances through three distinct contacts while a held button does not recast", () => {
    const match = setup("anjali");
    ticks(match, 170, input({ special: true }));
    expect(
      match.events.filter((e) => e.type === "hit" && e.side === 1),
    ).toHaveLength(3);
    expect(match.fighters[1].health).toBe(82);
    expect(match.fighters[0].x).toBeGreaterThan(365);
    expect(match.fighters[0].meter).toBe(0);
  });
  test("Anu restores 6 health on a landed pulse, capped at 100, never on block or whiff", () => {
    for (const [health, expected] of [
      [60, 66],
      [98, 100],
    ]) {
      const match = setup("anu");
      match.fighters[0].health = health;
      cast(match);
      ticks(match, 100);
      expect(match.fighters[0].health).toBe(expected);
    }
    for (const blocked of [false, true]) {
      const match = setup("anu", blocked ? 400 : 850);
      match.fighters[0].health = 60;
      ticks(match, 100, input({ special: true }), input({ guard: blocked }));
      expect(match.fighters[0].health).toBe(60);
    }
  });
  test("Daniel's tether pulls on hit and leaves a guarding opponent at range", () => {
    const match = setup("daniel", 570);
    cast(match);
    ticks(match, 100);
    expect(match.fighters[1].x - match.fighters[0].x).toBe(95);
    const blocked = setup("daniel", 570);
    ticks(blocked, 100, input({ special: true }), input({ guard: true }));
    expect(blocked.fighters[1].x - blocked.fighters[0].x).toBeGreaterThan(250);
  });
  test("Jun travels diagonally into the air, hits high and lands safely inside the arena", () => {
    const match = setup("jun");
    cast(match);
    ticks(match, 32);
    expect(match.fighters[0].x).toBeGreaterThan(320);
    expect(match.fighters[0].y).toBeGreaterThan(20);
    ticks(match, 120);
    expect(match.fighters[0].y).toBe(0);
    expect(match.fighters[1].health).toBe(83);
    const crouching = setup("jun");
    ticks(
      crouching,
      120,
      input({ special: true }),
      input({ guard: true, crouch: true }),
    );
    expect(crouching.fighters[1].health).toBe(83);
  });
  test("Alisa's fixed ring expands, hits once and expires before reaching a distant opponent", () => {
    const match = setup("alisa", 850);
    cast(match);
    nextEmission(match);
    const ring = match.projectiles[0],
      before = projectileBox(ring).w,
      origin = ring.x;
    ticks(match, 10);
    expect(projectileBox(ring).w).toBeGreaterThan(before);
    expect(ring.x).toBe(origin);
    ticks(match, 50);
    expect(match.projectiles).toHaveLength(0);
    expect(match.fighters[1].health).toBe(100);
  });
  test("Shan's blink has a locked marker, cannot cross guard and is punishable after its hit window", () => {
    const match = setup("shan", 620);
    cast(match);
    ticks(match, 20);
    expect(match.fighters[0].x).toBe(300);
    expect(match.fighters[0].specialTargetX).toBe(620);
    ticks(match, 7);
    expect(match.fighters[0].x).toBe(542);
    expect(match.fighters[0].x).toBeLessThan(match.fighters[1].x);
    ticks(match, 12);
    expect(match.fighters[0].move).toBe("special");
    expect(match.fighters[0].moveTick).toBeGreaterThanOrEqual(
      SPECIAL_MOVES.shan.startup + SPECIAL_MOVES.shan.active,
    );
  });
  test("Kang reverses one close hit only during the counter window; waiting and startup attacks beat it", () => {
    const counter = setup("kang", 370);
    cast(counter);
    ticks(counter, 10);
    ticks(counter, 35, input(), input({ light: true }));
    expect(counter.fighters[0].health).toBe(100);
    expect(counter.fighters[1].health).toBe(80);
    const wait = setup("kang", 370);
    cast(wait);
    ticks(wait, 35);
    ticks(wait, 15, input(), input({ light: true }));
    expect(wait.fighters[0].health).toBe(94);
    expect(wait.fighters[1].health).toBe(100);
    const startup = setup("kang", 370);
    ticks(startup, 8, input({ special: true }), input({ light: true }));
    expect(startup.fighters[0].health).toBe(94);
    expect(startup.fighters[0].move).toBeNull();
  });
  test("Juan marks three fixed columns and drops bolts only after a visible warning", () => {
    const match = setup("juan", 580);
    cast(match);
    nextEmission(match);
    expect(match.projectiles).toHaveLength(3);
    expect(match.projectiles.map((p) => p.x)).toEqual([512, 580, 648]);
    expect(match.projectiles.map((p) => p.delay)).toEqual([18, 26, 34]);
    const initialY = match.projectiles[0].y;
    ticks(match, 15);
    expect(match.projectiles[0].y).toBe(initialY);
    ticks(match, 4);
    expect(match.projectiles[0].y).toBeGreaterThan(initialY);
    const evade = setup("juan", 580);
    cast(evade);
    nextEmission(evade);
    ticks(evade, 80, input(), input({ right: true }));
    expect(evade.fighters[1].health).toBe(100);
  });
  test("Alan's floor dash commits to a long travel and recovery without bypassing pushboxes", () => {
    const match = setup("alan", 550);
    cast(match);
    ticks(match, 21);
    expect(match.fighters[0].x).toBe(311);
    ticks(match, 75);
    expect(match.fighters[0].x).toBeGreaterThan(520);
    expect(match.fighters[1].health).toBe(82);
    expect(
      Math.abs(match.fighters[1].x - match.fighters[0].x),
    ).toBeGreaterThanOrEqual(54);
    const whiff = setup("alan", 850);
    cast(whiff);
    ticks(whiff, 60);
    expect(whiff.fighters[0].move).toBe("special");
  });
  test("Callum's slow orb follows public position with bounded speed and a finite lifetime", () => {
    const match = setup("callum", 850);
    cast(match);
    nextEmission(match);
    const orb = match.projectiles[0];
    match.fighters[1].y = 100;
    ticks(match, 8);
    expect(orb.vy).toBeLessThan(0);
    expect(Math.abs(orb.vx)).toBeLessThanOrEqual(3.6);
    expect(Math.abs(orb.vy)).toBeLessThanOrEqual(2.8);
    ticks(match, 160);
    expect(match.projectiles).toHaveLength(0);
  });
  test.each(FIGHTER_IDS)(
    "%s's CPU can select its special from delayed public observations at its intended range",
    (id) => {
      const match = setup("sam", 600, id),
        cpu = new CpuController("normal", 123);
      const range = SPECIAL_MOVES[id].cpuRange;
      match.fighters[0].x = 300;
      match.fighters[1].x = 300 + (range[0] + range[1]) / 2;
      match.fighters[1].meter = 50;
      match.fighters[0].move = "heavy";
      match.fighters[0].moveTick = 0;
      let selected = false;
      for (let t = 0; t < 500; t++) {
        match.tick = t;
        selected ||= cpu.decide(match).special;
      }
      expect(selected).toBe(true);
    },
  );
  test("a tracking orb that turns back uses its incoming direction for guard and knockback", () => {
    for (const guard of [false, true]) {
      const match = setup("callum", 850);
      match.fighters[0].x = 400;
      cast(match);
      nextEmission(match);
      expect(match.projectiles[0].facing).toBe(1);
      match.fighters[1].x = 240;
      for (let tick = 0; tick < 150 && match.fighters[1].health === 100; tick++)
        match.step(input(), input({ guard }));
      expect(match.fighters[1].facing).toBe(1);
      expect(match.fighters[1].health).toBe(guard ? 98 : 85);
      expect(match.fighters[1].x).toBeLessThan(240);
      expect(
        match.events.filter(
          (event) =>
            event.side === 1 && event.type === (guard ? "block" : "hit"),
        ),
      ).toHaveLength(1);
    }
  });
  test("Welcome Ring contacts its visible circle rather than the square's distant airborne corners", () => {
    for (const [age, expectedHealth] of [
      [10, 100],
      [15, 85],
    ] as const) {
      const match = setup("alisa", 390);
      match.fighters[1].y = 140;
      match.projectiles.push({
        id: 1,
        owner: 0,
        fighter: "alisa",
        kind: "ring",
        x: 300,
        y: 375,
        facing: 1,
        age,
        vx: 0,
        vy: 0,
        width: 40,
        height: 40,
        delay: 0,
        duration: 33,
      });
      match.step(input(), input());
      expect(match.fighters[1].health).toBe(expectedHealth);
      expect(match.projectiles).toHaveLength(expectedHealth === 100 ? 1 : 0);
    }
  });
  test("stationary rings push and block according to their centre, even after their owner moves", () => {
    const match = setup("alisa", 430);
    match.fighters[0].x = 600;
    match.projectiles.push({
      id: 1,
      owner: 0,
      fighter: "alisa",
      kind: "ring",
      x: 500,
      y: 375,
      facing: 1,
      age: 15,
      vx: 0,
      vy: 0,
      width: 40,
      height: 40,
      delay: 0,
      duration: 33,
    });
    match.step(input(), input({ guard: true }));
    expect(match.fighters[1].facing).toBe(1);
    expect(match.fighters[1].health).toBe(98);
    expect(match.fighters[1].x).toBe(422);
    expect(match.events.some((event) => event.type === "block")).toBe(true);
  });
  test("Vital Pulse shares its circular visible/contact area and guards on either side of the caster", () => {
    const corner = setup("anu", 440);
    corner.fighters[0].move = "special";
    corner.fighters[0].moveTick = SPECIAL_MOVES.anu.startup - 1;
    corner.fighters[1].y = 190;
    corner.step(input(), input());
    expect(corner.fighters[1].health).toBe(100);
    const left = setup("anu", 220);
    left.fighters[0].health = 60;
    left.fighters[0].move = "special";
    left.fighters[0].moveTick = SPECIAL_MOVES.anu.startup - 1;
    left.step(input(), input({ guard: true }));
    expect(left.fighters[1].health).toBe(98);
    expect(left.fighters[1].x).toBe(212);
    expect(left.fighters[0].health).toBe(60);
  });
  test("Kang counters a distant projectile without a remote hit, and a close projectile with one retaliation", () => {
    for (const [opponentX, castTick, health, opponentHealth] of [
      [600, 20, 100, 100],
      [420, 0, 100, 80],
      [600, 0, 84, 100],
    ] as const) {
      const match = setup("kang", opponentX, "sam");
      match.fighters[1].meter = 50;
      for (let t = 0; t < 130; t++)
        match.step(
          input({ special: t === castTick }),
          input({ special: t === 0 }),
        );
      expect(match.fighters[0].health).toBe(health);
      expect(match.fighters[1].health).toBe(opponentHealth);
      expect(match.projectiles).toHaveLength(0);
    }
  });
  test("a countered Vital Pulse grants no healing", () => {
    const match = setup("anu", 400, "kang");
    match.fighters[0].health = 60;
    match.fighters[1].meter = 50;
    ticks(match, 100, input({ special: true }), input({ special: true }));
    expect(match.fighters[0].health).toBe(40);
    expect(match.fighters[1].health).toBe(100);
  });
  test("Quantum Step's locked destination can be escaped by retreat and never crosses the defender", () => {
    const match = setup("shan", 620);
    ticks(match, 100, input({ special: true }), input({ right: true }));
    expect(match.fighters[1].health).toBe(100);
    expect(match.fighters[0].x).toBe(542);
    expect(match.fighters[0].x).toBeLessThan(match.fighters[1].x);
    expect(match.fighters[1].facing).toBe(-1);
  });
  test.each([
    "sam",
    "sonia",
    "pegah",
    "yana",
    "daniel",
    "alisa",
    "juan",
    "callum",
  ] as const)(
    "%s hazards freeze during pause and disappear at a round transition",
    (id) => {
      const match = setup(id, 850);
      cast(match);
      nextEmission(match);
      const before = JSON.stringify(match.projectiles);
      match.setPaused(true);
      ticks(match, 200);
      expect(JSON.stringify(match.projectiles)).toBe(before);
      match.setPaused(false);
      match.fighters[1].health = 0;
      ticks(match, 1);
      expect(match.phase).toBe("round-end");
      expect(match.projectiles).toHaveLength(0);
      ticks(match, 150);
      expect(match.phase).toBe("intro");
      expect(match.projectiles).toHaveLength(0);
      expect(
        match.fighters.every(
          (fighter) => fighter.health === 100 && fighter.meter === 0,
        ),
      ).toBe(true);
    },
  );
  test.each(FIGHTER_IDS)(
    "%s mirror specials have symmetric health and preserve fighter ordering",
    (id) => {
      const match = setup(id, targetX[id], id);
      match.fighters[1].meter = 50;
      ticks(match, 220, input({ special: true }), input({ special: true }));
      expect(match.fighters[0].health).toBe(match.fighters[1].health);
      expect(match.fighters[0].x).toBeLessThan(match.fighters[1].x);
    },
  );
  test("special mirror volleys trade simultaneously and all hazards clear between rounds", () => {
    const match = setup("sam", 640, "sam");
    match.fighters[1].meter = 50;
    match.fighters[0].health = 16;
    match.fighters[1].health = 16;
    ticks(match, 100, input({ special: true }), input({ special: true }));
    expect(match.fighters.map((f) => f.health)).toEqual([0, 0]);
    expect(match.roundWinner).toBeNull();
    expect(match.projectiles).toHaveLength(0);
  });
});
