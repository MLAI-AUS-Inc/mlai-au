import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CombatMatch, emptyInput } from "../app/games/team-arcade/core/combat";
import { FIGHTERS, FIGHTER_IDS, type FighterId } from "../app/games/team-arcade/roster";
import { SPECIAL_MOVES } from "../app/games/team-arcade/specials";

const root = new URL("../", import.meta.url);
const expectedRoster = [
  ["sam", "Sam Donegan"], ["sonia", "Sonia Kaurah"], ["ryan", "Ryan Mouritz"],
  ["pegah", "Pegah Khaleghi"], ["yana", "Yana Lin"], ["anjali", "Anjali Singh"],
  ["anu", "Dr Anu Ganugapati"], ["daniel", "Daniel Malkinson"], ["jun", "Jun Kai Chang"],
  ["alisa", "Alisa Belova"], ["shan", "Shan Yang"], ["kang", "Kang Tan"],
  ["juan", "Juan Bernal"], ["alan", "Alan Philip"], ["callum", "Callum Holt"],
] as const;

/** Read both extended and lossless WebP canvas headers without an image package. */
function webpDimensions(bytes: Buffer): [number, number] {
  expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
  expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
  expect(bytes.readUInt32LE(4) + 8).toBe(bytes.length);
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const kind = bytes.toString("ascii", offset, offset + 4), length = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    expect(data + length).toBeLessThanOrEqual(bytes.length);
    if (kind === "VP8X") return [1 + bytes.readUIntLE(data + 4, 3), 1 + bytes.readUIntLE(data + 7, 3)];
    if (kind === "VP8L") {
      expect(bytes[data]).toBe(0x2f);
      const bits = bytes.readUInt32LE(data + 1);
      return [1 + (bits & 0x3fff), 1 + ((bits >>> 14) & 0x3fff)];
    }
    if (kind === "VP8 ") return [bytes.readUInt16LE(data + 6) & 0x3fff, bytes.readUInt16LE(data + 8) & 0x3fff];
    offset = data + length + (length % 2);
  }
  throw new Error("WebP has no supported canvas chunk");
}
const asset = (path: string) => readFileSync(fileURLToPath(new URL(`public${path}`, root)));

describe("complete team arcade roster", () => {
  test("all fifteen homepage profiles map to the right fighter and portrait", () => {
    expect(FIGHTER_IDS).toEqual(expectedRoster.map(([id]) => id));
    const source = readFileSync(new URL("app/components/team.tsx", root), "utf8");
    const profiles = [...source.matchAll(/fighterId: "([^"]+)"[^,]*,\s*name: "([^"]+)",\s*role: "([^"]+)",\s*imageUrl: "([^"]+)"/g)];
    expect(profiles).toHaveLength(15);
    for (const [id, name] of expectedRoster) {
      const fighter = FIGHTERS[id], profile = profiles.find((entry) => entry[2] === name);
      expect(profile).toBeDefined();
      expect(fighter.id).toBe(id);
      expect(fighter.name).toBe(name);
      expect(profile![1]).toBe(id);
      expect(fighter.role).toBe(profile![3]);
      expect(fighter.portrait).toBe(profile![4].replace("/press-kit/", "/press-kit/thumbnails/").replace(/\.[^.]+$/, ".webp"));
      expect(asset(fighter.portrait).length).toBeGreaterThan(1000);
      expect(fighter.speed).toBeGreaterThan(0);
      expect(fighter.reach).toBeGreaterThan(0);
    }
  });

  test("every fighter has a distinct 1024px atlas and a small selection portrait", () => {
    const sheetHashes = new Set<string>(), portraitHashes = new Set<string>();
    for (const id of FIGHTER_IDS) {
      const sheet = asset(FIGHTERS[id].sheet), portrait = asset(FIGHTERS[id].portrait);
      expect(FIGHTERS[id].sheet).toBe(`/games/team-arcade/${id === "sam" || id === "sonia" ? "v1" : "v2"}/${id}.webp`);
      // A four by four atlas of 256px frames is required by every action animation.
      expect(webpDimensions(sheet)).toEqual([1024, 1024]);
      expect(sheet.length).toBeGreaterThan(20_000);
      expect(sheet.length).toBeLessThan(2_000_000);
      const dimensions = webpDimensions(portrait);
      expect(Math.max(...dimensions)).toBe(192);
      expect(Math.min(...dimensions)).toBeGreaterThan(64);
      expect(portrait.length).toBeLessThan(100_000);
      sheetHashes.add(createHash("sha256").update(sheet).digest("hex"));
      portraitHashes.add(createHash("sha256").update(portrait).digest("hex"));
    }
    // Adding the rest of the team must not relabel or duplicate an existing fighter sheet.
    expect(sheetHashes.size).toBe(15);
    expect(portraitHashes.size).toBe(15);
  });

  test("all fifteen specials describe distinct playable mechanics and counterplay", () => {
    expect(Object.keys(SPECIAL_MOVES)).toEqual(FIGHTER_IDS);
    expect(new Set(FIGHTER_IDS.map((id) => SPECIAL_MOVES[id].name)).size).toBe(15);
    expect(new Set(FIGHTER_IDS.map((id) => SPECIAL_MOVES[id].description)).size).toBe(15);
    expect(new Set(FIGHTER_IDS.map((id) => SPECIAL_MOVES[id].kind)).size).toBe(15);
    for (const id of FIGHTER_IDS) {
      const move = SPECIAL_MOVES[id];
      expect(FIGHTERS[id].special).toBe(move.name);
      expect(move.description.length).toBeGreaterThan(35);
      expect(move.startup).toBeGreaterThan(0);
      expect(move.recovery).toBeGreaterThan(0);
      expect(move.damage).toBeGreaterThan(0);
      expect(move.cpuRange[1]).toBeGreaterThan(move.cpuRange[0]);
    }
  });

  test.each(FIGHTER_IDS.flatMap((player) => FIGHTER_IDS.map((opponent) => [player, opponent] as const)))(
    "%s versus %s stays deterministic through specials, movement and CPU decisions",
    (player: FighterId, opponent: FighterId) => {
      const run = () => {
        const game = new CombatMatch({ player, opponent, difficulty: "normal", seed: 421 });
        for (let i = 0; i < 105; i++) game.step(emptyInput(), emptyInput());
        game.fighters[0].meter = game.fighters[1].meter = 100;
        game.fighters[0].x = 380;
        game.fighters[1].x = 560;
        for (let tick = 0; tick < 720; tick++) {
          const [human, cpu] = game.fighters, approaching = Math.abs(cpu.x - human.x) > 85;
          game.step({
            ...emptyInput(),
            left: approaching && cpu.x < human.x,
            right: approaching && cpu.x > human.x,
            light: tick % 29 === 0,
            heavy: tick % 61 === 0,
            special: tick % 97 === 0,
            jump: tick % 173 === 0,
            guard: tick % 90 < 8,
          });
        }
        for (const fighter of game.fighters) {
          expect(Number.isFinite(fighter.x)).toBe(true);
          expect(Number.isFinite(fighter.y)).toBe(true);
          expect(fighter.health).toBeGreaterThanOrEqual(0);
          expect(fighter.health).toBeLessThanOrEqual(100);
          expect(fighter.meter).toBeGreaterThanOrEqual(0);
          expect(fighter.meter).toBeLessThanOrEqual(100);
        }
        return { snapshot: game.snapshot(), projectiles: game.projectiles };
      };
      expect(run()).toEqual(run());
    },
  );
});
