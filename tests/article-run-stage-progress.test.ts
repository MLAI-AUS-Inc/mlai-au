import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import ArticleRunStageProgress, {
  articleRunFailureSummary,
  articleRunVisibleError,
  deriveArticleProgressStages,
} from "../app/components/ArticleRunStageProgress";
import { summarizeRunError } from "../app/lib/vibe-marketing-run-failures";
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

describe("article run failure display", () => {
  const comparisonError = Array.from({ length: 10 }, (_, index) =>
    `candidate_fit: matched/incomplete: Batch ${index + 1} found a usable task, but the body cites no current primary-source citations.`,
  ).join(" ");

  function failedComparisonRun(overrides: Partial<VibeMarketingRunSummary> = {}) {
    return repairingArticle({
      status: "failed",
      currentStep: "assemble_article",
      errorCode: null,
      preconditionStatus: null,
      repairStatus: null,
      requiresUserAction: false,
      stepOrder: ["load_context", "assemble_article"],
      steps: [{
        key: "assemble_article",
        name: "Assemble article",
        required: true,
        status: "failed",
        attempts: 2,
        error: comparisonError,
        artifacts: [],
      }],
      errors: [comparisonError],
      ...overrides,
    });
  }

  test("shows a short actionable comparison summary with one expandable copy of the diagnostics", () => {
    const run = failedComparisonRun();
    const markup = renderToStaticMarkup(createElement(ArticleRunStageProgress, { run, variant: "embedded" }));

    expect(articleRunFailureSummary(run)).toBe(
      "Draft review could not verify current primary-source citations. Review the source findings before resuming.",
    );
    expect(markup).toContain("View full failure details");
    expect(markup).toContain("<details");
    expect((markup.match(/candidate_fit: matched\/incomplete:/g) ?? []).length).toBe(10);
    expect(markup.indexOf("Draft review could not verify")).toBeLessThan(markup.indexOf("<details"));
  });

  test("keeps step-only failure diagnostics available", () => {
    const run = failedComparisonRun({ errors: [] });
    const markup = renderToStaticMarkup(createElement(ArticleRunStageProgress, { run }));

    expect(markup).toContain("Draft review could not verify");
    expect(markup).toContain("View full failure details");
    expect((markup.match(/candidate_fit: matched\/incomplete:/g) ?? []).length).toBe(10);
  });

  test("bounds other long failures and preserves short messages", () => {
    const longError = `The preview could not be rendered because ${"a technical issue ".repeat(30)}contact support.`;
    const summary = summarizeRunError(longError);

    expect(summary.length).toBeLessThanOrEqual(210);
    expect(summary).toEndWith("…");
    expect(summary).not.toContain("contact support");
    expect(summarizeRunError("Approve the generated article setup before continuing.")).toBe(
      "Approve the generated article setup before continuing.",
    );
  });
});
