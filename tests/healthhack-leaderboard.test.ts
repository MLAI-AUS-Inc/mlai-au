import { describe, expect, test } from "bun:test";

const LEADERBOARD_ROUTE = "app/routes/hospital.app.leaderboard.tsx";

describe("HealthHack leaderboard", () => {
  test("loads and renders active leaderboard data instead of the hidden message", async () => {
    const source = await Bun.file(LEADERBOARD_ROUTE).text();

    expect(source).toContain("getHospitalLeaderboard(env, request)");
    expect(source).toContain("Live Leaderboard");
    expect(source).toContain("leaderboard.map");
    expect(source).not.toContain("Thanks for submitting. The top 2 teams");
  });

  test("explains the best-submission ranking and empty state", async () => {
    const source = await Bun.file(LEADERBOARD_ROUTE).text();

    expect(source).toContain("Only each team&apos;s highest-scoring submission is shown.");
    expect(source).toContain("No submissions yet");
  });
});
