import { describe, expect, test } from "bun:test";

import {
  VIBE_MARKETING_ARTICLE_JOB_COST_POINTS,
  VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS,
  createVibeMarketingClientRequestId,
} from "../app/lib/vibe-marketing-billing";

describe("vibe marketing billing", () => {
  test("exposes current Roo point costs", () => {
    expect(VIBE_MARKETING_ARTICLE_JOB_COST_POINTS).toBe(6);
    expect(VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS).toBe(1);
  });

  test("creates scoped client request ids for paid actions", () => {
    const id = createVibeMarketingClientRequestId("vibe-content-island-topics", "ai-growth");

    expect(id.startsWith("vibe-content-island-topics:ai-growth:")).toBe(true);
  });
});
