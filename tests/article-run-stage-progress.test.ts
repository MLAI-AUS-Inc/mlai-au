import { describe, expect, test } from "bun:test";

import {
  articleRunVisibleError,
  deriveArticleProgressStages,
} from "../app/components/ArticleRunStageProgress";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function repairingArticle(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "article-repair-1",
    workflow: "confirmed_topic",
    domain: "example.com",
    status: "blocked",
    currentStep: "blocked",
    stepOrder: ["fetch_org_config", "scan_repository", "load_context", "discover_research"],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    errorCode: "ARTICLE_SYSTEM_SETUP_REQUIRED",
    preconditionStatus: "precondition_failed",
    repairStatus: "queued",
    requiresUserAction: false,
    result: {},
    ...overrides,
  };
}

describe("article generation stage progress during setup repair", () => {
  test("shows automatic repair as an in-progress article-system check", () => {
    const run = repairingArticle({
      errors: [
        "The existing article scaffold only proves a listing page. Content Factory must repair it before generation.",
      ],
    });
    const stages = deriveArticleProgressStages(run);

    expect(stages.find((stage) => stage.id === "article_system")).toMatchObject({
      status: "running",
      detail: "Refreshing the repository article setup before topic research starts automatically.",
    });
    expect(stages.some((stage) => stage.status === "attention")).toBe(false);
    expect(articleRunVisibleError(run)).toBe("");
  });

  test("shows a genuine setup blocker as needing attention", () => {
    const run = repairingArticle({
      repairStatus: "awaiting_approval",
      requiresUserAction: true,
      errors: ["Approve the generated article setup before continuing."],
      result: { message: "Approve the generated article setup before continuing." },
    });
    const stages = deriveArticleProgressStages(run);

    expect(stages.find((stage) => stage.id === "article_system")).toMatchObject({
      status: "attention",
      detail: "Approve the generated article setup before continuing.",
    });
    expect(articleRunVisibleError(run)).toBe("Approve the generated article setup before continuing.");
  });
});
