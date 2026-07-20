import { describe, expect, test } from "bun:test";

const LEADERBOARD_ROUTE = "app/routes/hospital.app.leaderboard.tsx";

describe("HealthHack leaderboard", () => {
  test("shows the hidden-leaderboard message without loading standings", async () => {
    const source = await Bun.file(LEADERBOARD_ROUTE).text();

    expect(source).toContain("Thanks for submitting. The top 2 teams");
    expect(source).toContain("HealthHack grand final");
    expect(source).toContain("Stay tuned!");
    expect(source).not.toContain("getHospitalLeaderboard");
    expect(source).not.toContain("leaderboard.map");
    expect(source).not.toContain("Live Leaderboard");
  });
});
