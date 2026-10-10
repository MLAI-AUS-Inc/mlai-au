import { describe, expect, test } from "bun:test";
import { teamRoster, resolveTeamMember, adjacentFighterId } from "../app/data/team-roster";
import { fighterConfigs, pilotStrategy } from "../app/lib/arcade/contracts";

describe("stable team selections", () => {
  test("all 15 members have distinct permanent identities", () => {
    expect(teamRoster).toHaveLength(15);
    expect(new Set(teamRoster.map(member => member.id)).size).toBe(15);
    for (const member of teamRoster) expect(resolveTeamMember(member.id)).toBe(member);
  });
  test("invalid and retired selections safely use Callum", () => {
    for (const id of [undefined, null, {}, 14, "", "retired-person"])
      expect(resolveTeamMember(id).id).toBe("callum-holt");
  });
  test("reordering preserves identity and default", () => {
    const reordered = [...teamRoster].reverse();
    expect(resolveTeamMember("sam-donegan", reordered).name).toBe("Sam Donegan");
    expect(resolveTeamMember(null, reordered).id).toBe("callum-holt");
    expect(adjacentFighterId("callum-holt", 1, reordered)).toBe("alan-philip");
  });
  test("navigation wraps in both directions", () => {
    expect(adjacentFighterId("callum-holt", 1)).toBe("sam-donegan");
    expect(adjacentFighterId("sam-donegan", -1)).toBe("callum-holt");
    expect(adjacentFighterId("stale", 1)).toBe("sam-donegan");
  });
  test("custom roster fallback and empty roster are explicit", () => {
    expect(resolveTeamMember(null, [teamRoster[0]]).id).toBe("sam-donegan");
    expect(() => resolveTeamMember(null, [])).toThrow();
  });
  test("every fighter has an honest placeholder mapping", () => {
    expect(fighterConfigs.map(config => config.fighterId)).toEqual(teamRoster.map(member => member.id));
    for (const config of fighterConfigs) {
      expect(config.assets.status).toBe("placeholder");
      expect(config.assets.animations).toEqual({});
    }
    expect(pilotStrategy.fighterIds).toHaveLength(0);
    expect(pilotStrategy.fallbackApproval).toBe("pending");
  });
});
