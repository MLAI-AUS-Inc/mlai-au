import { describe, expect, test } from "bun:test";

import {
  VIBE_MARKETING_ARTICLE_JOB_COST_POINTS,
  VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS,
  clearContentIslandResearchRequestId,
  contentIslandResearchRequestId,
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

  test("reuses the same request id after a lost response and rotates it after acceptance", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
      removeItem: (key: string) => { values.delete(key); },
    } as Storage;
    expect(contentIslandResearchRequestId(storage, "company-1", "ai-small-business", "first-id")).toBe("first-id");
    expect(contentIslandResearchRequestId(storage, "company-1", "ai-small-business", "new-loader-id")).toBe("first-id");
    expect(contentIslandResearchRequestId(storage, "company-2", "ai-small-business", "other-company-id")).toBe("other-company-id");
    clearContentIslandResearchRequestId(storage, "company-1", "ai-small-business");
    expect(contentIslandResearchRequestId(storage, "company-1", "ai-small-business", "after-acceptance-id")).toBe("after-acceptance-id");
  });
});
