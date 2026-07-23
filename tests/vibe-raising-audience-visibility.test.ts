import { describe, expect, test } from "bun:test";

import {
  normalizeVibeRaisingAudienceVisibility,
  parseVibeRaisingAudienceVisibility,
  toggleVibeRaisingAudienceVisibility,
} from "../app/lib/vibe-raising-audience-visibility";
import { normalizeMonthlyUpdate } from "../app/lib/vibe-raising";

describe("Vibe Raising audience visibility", () => {
  test("preserves both public audiences in canonical order", () => {
    expect(normalizeVibeRaisingAudienceVisibility(["investor", "community"])).toEqual([
      "community",
      "investors",
    ]);
  });

  test("continues to accept legacy scalar responses", () => {
    expect(parseVibeRaisingAudienceVisibility("investor")).toEqual(["investors"]);
    expect(parseVibeRaisingAudienceVisibility("private")).toEqual(["just_me"]);
  });

  test("keeps private visibility exclusive while allowing both public audiences", () => {
    const community = toggleVibeRaisingAudienceVisibility(["just_me"], "community");
    const both = toggleVibeRaisingAudienceVisibility(community, "investors");

    expect(community).toEqual(["community"]);
    expect(both).toEqual(["community", "investors"]);
    expect(toggleVibeRaisingAudienceVisibility(both, "just_me")).toEqual(["just_me"]);
  });

  test("normalizes numeric backend draft IDs without replacing them with the month", () => {
    const update = normalizeMonthlyUpdate({
      id: 517,
      month: "July 2026",
      audienceVisibility: ["community", "investors"],
      metrics: {},
      highlights: "",
      challenges: "",
      asks: "",
      learnings: "",
      next30Days: "",
    });

    expect(update?.id).toBe("517");
    expect(update?.audienceVisibility).toEqual(["community", "investors"]);
  });
});
