import { describe, expect, test } from "bun:test";

import {
  VIBE_MARKETING_ARTICLE_JOB_COST_POINTS,
  VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS,
  clearContentIslandResearchRequestId,
  contentIslandResearchRequestId,
  createVibeMarketingClientRequestId,
  vibeMarketingArticleCostPoints,
  vibeMarketingContentIslandTopicCostPoints,
} from "../app/lib/vibe-marketing-billing";

describe("vibe marketing billing", () => {
  test("exposes current Roo point costs", () => {
    expect(VIBE_MARKETING_ARTICLE_JOB_COST_POINTS).toBe(6);
    expect(VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS).toBe(1);
  });

  test("displays the backend's free mlai.au pricing only for the mlai.au domain", () => {
    for (const domain of ["mlai.au", "https://www.mlai.au/articles", "MLAI.AU."]) {
      expect(vibeMarketingArticleCostPoints(domain)).toBe(0);
      expect(vibeMarketingContentIslandTopicCostPoints(domain)).toBe(0);
    }
    for (const domain of ["another.au", "sub.mlai.au", "fake-mlai.au", ""]) {
      expect(vibeMarketingArticleCostPoints(domain)).toBe(6);
      expect(vibeMarketingContentIslandTopicCostPoints(domain)).toBe(1);
    }
  });

  test("creates scoped client request ids for paid actions", () => {
    const id = createVibeMarketingClientRequestId("vibe-content-island-topics", "ai-growth");

    expect(id.startsWith("vibe-content-island-topics:ai-growth:")).toBe(true);
  });

  test("reuses the same request id after a lost response and rotates it after acceptance", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
      removeItem: (key: string) => { values.delete(key); },
    } as Storage;
    const first = contentIslandResearchRequestId(storage, "company-1", "ai-small-business");
    expect(first.startsWith("vibe-content-island-topics:")).toBe(true);
    expect(first.length).toBeLessThanOrEqual(100);
    expect(contentIslandResearchRequestId(storage, "company-1", "ai-small-business")).toBe(first);
    const otherIsland = contentIslandResearchRequestId(storage, "company-1", "funding");
    expect(otherIsland).not.toBe(first);
    expect(contentIslandResearchRequestId(storage, "company-1", "funding")).toBe(otherIsland);
    expect(contentIslandResearchRequestId(storage, "company-2", "ai-small-business")).not.toBe(first);
    clearContentIslandResearchRequestId(storage, "company-1", "ai-small-business");
    expect(contentIslandResearchRequestId(storage, "company-1", "ai-small-business")).not.toBe(first);
  });
});
