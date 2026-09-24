import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import ArticleRunStageProgress, {
  articleRunFailureSummary,
  articleRunVisibleError,
  deriveArticleProgressStages,
  stageForStep,
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

describe("article revision stage progress", () => {
  test("does not show inherited preview checks as complete while planning a revision", () => {
    const run = repairingArticle({
      runId: "component-revision-1",
      workflow: "article_revision",
      status: "running",
      currentStep: "plan_article",
      errorCode: null,
      preconditionStatus: null,
      repairStatus: null,
      stepOrder: ["load_revision_context", "plan_article", "review_preview_quality"],
      steps: [
        { key: "load_revision_context", status: "completed" },
        { key: "plan_article", status: "running" },
        { key: "review_preview_quality", status: "completed" },
      ] as VibeMarketingRunSummary["steps"],
    });
    const stages = deriveArticleProgressStages(run);

    expect(stages.find((stage) => stage.id === "planning")?.status).toBe("running");
    expect(stages.find((stage) => stage.id === "preview")?.status).toBe("up_next");
  });

  test("shows comment application as revising even when the last recorded step is planning", () => {
    const run = repairingArticle({
      runId: "component-revision-6", workflow: "article_revision", status: "running",
      currentStep: "apply_component_feedback", errorCode: null, preconditionStatus: null, repairStatus: null,
      stepOrder: ["load_revision_context", "plan_article"],
      steps: [
        { key: "load_revision_context", status: "completed" },
        { key: "plan_article", status: "completed" },
      ] as VibeMarketingRunSummary["steps"],
    });
    const drafting = deriveArticleProgressStages(run).find((stage) => stage.id === "drafting");
    expect(drafting).toMatchObject({ label: "Revising draft", status: "running",
      detail: "Applying your comments to the article draft and delivery files." });
    expect(renderToStaticMarkup(createElement(ArticleRunStageProgress, { run }))).toContain("Revising draft");
  });
});

describe("article generation asset stage", () => {
  const completedStep = (key: string) => ({
    key,
    name: key,
    required: true,
    status: "completed",
    attempts: 1,
    artifacts: [],
  });

  test.each(["plan_resource_asset", "generate_resource_pdf"])(
    "shows %s as preparing images and assets after article assembly",
    (currentStep) => {
      // The live run has many section steps, so the old index fallback mapped
      // these late resource steps to startup context instead of assets.
      const run = repairingArticle({
        status: "running",
        currentStep,
        errorCode: null,
        preconditionStatus: null,
        repairStatus: null,
        requiresUserAction: false,
        stepOrder: Array.from({ length: 32 }, (_, index) => `step-${index}`),
        steps: [
          ...Array.from({ length: 10 }, (_, index) => completedStep(index === 9 ? "assemble_article" : `completed-${index}`)),
          { key: currentStep, name: currentStep, required: true, status: "running", attempts: 1, artifacts: [] },
        ],
      });
      const stages = deriveArticleProgressStages(run);
      const markup = renderToStaticMarkup(createElement(ArticleRunStageProgress, { run, variant: "embedded" }));

      expect(stageForStep(currentStep, 10, 32)).toBe("assets");
      expect(stages.find((stage) => stage.id === "assets")?.status).toBe("running");
      expect(markup).toContain("Step 8 of 10");
      expect(markup).toContain("Preparing images and assets");
      expect(markup).not.toContain("Loading startup context</h2>");
    },
  );
});

describe("hosted article preview progress", () => {
  test("shows a revision building its hosted preview after every recorded step completes", () => {
    const stepOrder = ["load_revision_context", "plan_article", "render_article", "finalize"];
    const run = repairingArticle({
      workflow: "article_revision",
      status: "processing",
      currentStep: "start_hosted_preview",
      errorCode: null,
      preconditionStatus: null,
      repairStatus: null,
      stepOrder,
      // Replayed work can append an early step after finalize in the API order.
      steps: ["load_revision_context", "render_article", "finalize", "plan_article"].map((key) => ({
        key,
        name: key,
        required: true,
        status: "completed",
        attempts: 1,
        artifacts: [],
      })),
    });
    const stages = deriveArticleProgressStages(run);
    const markup = renderToStaticMarkup(createElement(ArticleRunStageProgress, { run, variant: "embedded" }));

    expect(stages.find((stage) => stage.id === "planning")?.status).toBe("complete");
    expect(stages.find((stage) => stage.id === "preview")).toMatchObject({
      label: "Building hosted preview",
      status: "running",
    });
    expect(markup).toContain("Step 9 of 10");
    expect(markup).toContain("Building hosted preview</h2>");
    expect(markup).not.toContain("Planning article</h2>");
  });

  test("attributes a post-generation preview build failure to preview verification", () => {
    const stepOrder = [
      "fetch_org_config",
      "load_context",
      "discover_research_landscape",
      "plan_article",
      "draft_section:intro",
      "assemble_article",
      "generate_content_images",
      "package_content_delivery",
      "render_article",
      "validate_render_dependencies",
      "verify_static",
      "finalize",
    ];
    const run = repairingArticle({
      status: "blocked",
      currentStep: "preview_failed",
      errorCode: null,
      preconditionStatus: null,
      repairStatus: null,
      requiresUserAction: false,
      stepOrder,
      // The API can return every recorded check as complete. Hosted preview
      // failure is a later outcome and does not create a failed step entry.
      steps: [...stepOrder.filter((key) => key !== "draft_section:intro"), "draft_section:intro"].map((key) => ({
        key,
        name: key,
        required: true,
        status: "completed",
        attempts: 1,
        artifacts: [],
      })),
      errors: ["Hosted preview build failed. Inspect the build logs for details."],
    });

    const stages = deriveArticleProgressStages(run);
    const markup = renderToStaticMarkup(createElement(ArticleRunStageProgress, { run, variant: "embedded" }));

    expect(stages.find((stage) => stage.id === "drafting")?.status).toBe("complete");
    expect(stages.find((stage) => stage.id === "assets")?.status).toBe("complete");
    expect(stages.find((stage) => stage.id === "preview")?.status).toBe("attention");
    expect(stages.find((stage) => stage.id === "review")?.status).toBe("up_next");
    expect(stages.filter((stage) => stage.status === "attention")).toHaveLength(1);
    expect(markup).toContain("Step 9 of 10");
    expect(markup).toContain("Verifying preview");
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
