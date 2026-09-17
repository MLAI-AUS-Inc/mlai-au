import { describe, expect, test } from "bun:test";

import { isDashboardGithubConnected, shouldShowVibeMarketingTopicPicker } from "../app/lib/vibe-marketing-landing";
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
  test("reads the GitHub badge from bootstrap without requiring a repository list", () => {
    for (const state of ["connected", "already_connected", " Connected "]) {
      expect(isDashboardGithubConnected({ settings: { githubConnectionState: state, dailyDiscoveryEnabled: false }, checks: {} })).toBe(true);
    }
    expect(isDashboardGithubConnected({ settings: { githubRepo: "org/site", dailyDiscoveryEnabled: false }, checks: { github: { passed: true } } })).toBe(true);
    for (const state of [undefined, "auth_required", "disconnected"]) {
      expect(isDashboardGithubConnected({ settings: { githubConnectionState: state, githubRepo: "org/site", dailyDiscoveryEnabled: false }, checks: {} })).toBe(false);
    }
  });

  test("keeps first-time users on setup", () => {
    expect(shouldShowVibeMarketingTopicPicker(bootstrapFixture())).toBe(false);
  });

  test("keeps blocked setup on setup", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: false, setupBlocked: true } },
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

  test("shows topic picker when generation ready overrides stale setup blockers", () => {
    expect(
      shouldShowVibeMarketingTopicPicker(
        bootstrapFixture({
          checks: { scaffold: { passed: false, setupBlocked: true, generationReady: true } },
          articleSetupState: { setupBlocked: true, generationReady: true },
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
