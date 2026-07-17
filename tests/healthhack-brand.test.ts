import { describe, expect, test } from "bun:test";

import { HEALTHHACK_BRAND } from "../app/lib/healthhack-brand";

const PUBLIC_BRAND_FILES = [
  "public/healthhack/brand/healthhack-mark.png",
  "public/healthhack/brand/healthhack-wordmark.png",
  "public/healthhack/brand/unsw-ncs.png",
];

const USER_FACING_SOURCES = [
  "app/routes/hackathons.tsx",
  "app/routes/healthhack.tsx",
  "app/routes/hospital.app.dashboard.tsx",
  "app/routes/hospital.app.coding.tsx",
  "app/routes/hospital.app.pitching.tsx",
  "app/routes/hospital.app.leaderboard.tsx",
  "app/routes/hospital.app.resources.tsx",
  "app/routes/platform.login.tsx",
  "app/components/HospitalAppLayout.tsx",
  "app/components/hospital/SlackChat.tsx",
  "app/components/medhack/MedhackAbout.tsx",
  "app/components/medhack/MedhackHero.tsx",
  "app/data/medhack-frontiers.ts",
];

describe("HealthHack brand contract", () => {
  test("uses the canonical product and organiser names", () => {
    expect(HEALTHHACK_BRAND.name).toBe("HealthHack");
    expect(HEALTHHACK_BRAND.organizerLine).toContain("UNSW No Code Society");
    expect(HEALTHHACK_BRAND.routes.app).toBe("/hospital/app");
    expect(HEALTHHACK_BRAND.routes.infoPack).toBe("/healthhack");
  });

  test("ships every local brand asset", async () => {
    for (const path of PUBLIC_BRAND_FILES) {
      expect(await Bun.file(path).exists()).toBe(true);
      expect(Bun.file(path).size).toBeGreaterThan(1_000);
    }
  });

  test("does not expose the retired product or organiser names", async () => {
    for (const path of USER_FACING_SOURCES) {
      const source = await Bun.file(path).text();
      expect(source).not.toMatch(/MedHack:\s*Frontiers|Medhack:\s*Frontiers|\bMYMI\b/);
    }
  });
});
