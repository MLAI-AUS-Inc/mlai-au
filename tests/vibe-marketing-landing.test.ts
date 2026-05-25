import { describe, expect, test } from "bun:test";

import { shouldShowVibeMarketingTopicPicker } from "../app/lib/vibe-marketing-landing";
import type { VibeMarketingBootstrap } from "../app/types/vibe-marketing";

function bootstrapFixture(
  overrides: Partial<Pick<VibeMarketingBootstrap, "articleSetupState" | "checks" | "hasCompletedArticleFlow" | "startPageMode">> = {},
) {
  return {
    checks: { scaffold: { passed: false } },
    articleSetupState: null,
    hasCompletedArticleFlow: false,
    startPageMode: "first_article_setup",
    ...overrides,
  } as Pick<VibeMarketingBootstrap, "articleSetupState" | "checks" | "hasCompletedArticleFlow" | "startPageMode">;
}

describe("vibe marketing landing", () => {
  test("keeps first-time users on setup", () => {
    expect(shouldShowVibeMarketingTopicPicker(bootstrapFixture())).toBe(false);
  });

  test("keeps blocked setup on setup", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: false, setupBlocked: true, setupMerged: true } },
          articleSetupState: { setupMerged: true },
          startPageMode: "topic_picker",
        }),
      ),
    ).toBe(false);
  });

  test("shows topic picker after setup merge", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: false, setupBlocked: false, setupMerged: true } },
        }),
      ),
    ).toBe(true);
  });

  test("shows topic picker after scaffold is published or passed", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: false, published: true } },
        }),
      ),
    ).toBe(true);
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: true } },
        }),
      ),
    ).toBe(true);
  });

  test("shows topic picker after first article generation", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          hasCompletedArticleFlow: true,
        }),
      ),
    ).toBe(true);
  });
});
