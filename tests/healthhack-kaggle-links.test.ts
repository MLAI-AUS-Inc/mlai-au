import { describe, expect, test } from "bun:test";

import { HEALTHHACK_BRAND } from "../app/lib/healthhack-brand";

const HEALTHHACK_ROUTES = [
  "app/routes/hospital.app.coding.tsx",
  "app/routes/hospital.app.pitching.tsx",
];

describe("HealthHack Kaggle links", () => {
  test("uses the new Sydney competition and its dataset page", () => {
    expect(HEALTHHACK_BRAND.kaggle.competition).toBe(
      "https://www.kaggle.com/competitions/health-hack-sydney",
    );
    expect(HEALTHHACK_BRAND.kaggle.data).toBe(
      "https://www.kaggle.com/competitions/health-hack-sydney/data",
    );
  });

  test("does not expose the retired competition or dataset links", async () => {
    for (const path of HEALTHHACK_ROUTES) {
      const source = await Bun.file(path).text();

      expect(source).toContain("HEALTHHACK_BRAND.kaggle");
      expect(source).not.toContain("competitions/medhack-frontiers");
      expect(source).not.toMatch(/kaggle\.com\/datasets\/[a-f0-9]{64}/);
    }
  });
});
