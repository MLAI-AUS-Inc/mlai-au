import { describe, expect, test } from "bun:test";

import {
  articleReviewApproveIntentForRun,
  articleReviewApproveLabelForRun,
  hasPublishHandoffEvidence,
  isArticleReviewPreviewReady,
  isPublishApprovalGate,
  publishPreviewUrlForRun,
  viewedWorkflowStepIdForRun,
} from "../app/lib/vibe-marketing-run-view";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function articleRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "article-review-source",
    workflow: "article_generation",
    domain: "mlai.au",
    status: "approval_required",
    currentStep: "await_review",
    approvalState: "approval_required",
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    previewUrl: "https://preview.example/articles/generated",
    componentManifest: {
      components: [{ id: "title", type: "title", label: "Title" }],
    },
    contentPackage: { title: "Generated article", contentPackaged: true },
    livePreview: {
      available: true,
      status: "ready",
      previewUrl: "https://preview.example/articles/generated",
      exactRender: true,
    },
    workflowProgress: {
      currentStepId: "publish",
      steps: [
        { id: "review", label: "Generate, review & revise", phase: "article", status: "ready", href: "/review" },
        {
          id: "publish",
          label: "Publish & automate",
          phase: "article",
          status: "ready",
          href: "/publish",
          primaryAction: { label: "Publish to website", intent: "promote-bundle" },
        },
      ],
    },
    result: {
      status: "preview_ready",
      review_surface_kind: "component_live_preview",
      preview_url: "https://preview.example/articles/generated",
      promote_bundle_url: "/api/runs/article-review-source/promote-bundle",
    },
    ...overrides,
  };
}

describe("vibe marketing run view state", () => {
  test("keeps approval-ready article previews on the review step", () => {
    const run = articleRun();

    expect(isArticleReviewPreviewReady(run)).toBe(true);
    expect(hasPublishHandoffEvidence(run)).toBe(false);
    expect(viewedWorkflowStepIdForRun(run)).toBe("review");
    expect(publishPreviewUrlForRun(run)).toBe("");
    expect(isPublishApprovalGate(run)).toBe(false);
  });

  test("uses semantic approve for the iframe approval button", () => {
    const run = articleRun();

    expect(articleReviewApproveIntentForRun(run, "promote-bundle")).toBe("approve");
    expect(articleReviewApproveLabelForRun(run)).toEqual({
      idle: "Approve article and create PR",
      pending: "Approving...",
    });
  });

  test("moves to publish only after publish child or PR evidence exists", () => {
    expect(
      viewedWorkflowStepIdForRun(
        articleRun({
          result: {
            status: "preview_ready",
            review_surface_kind: "component_live_preview",
            preview_url: "https://preview.example/articles/generated",
            publish_child_run_id: "article-publish-child",
          },
        }),
      ),
    ).toBe("publish");

    expect(
      viewedWorkflowStepIdForRun(
        articleRun({
          prUrl: "https://github.com/MLAI-AUS-Inc/mlai-au/pull/123",
          result: {
            status: "preview_ready",
            review_surface_kind: "component_live_preview",
            preview_url: "https://preview.example/articles/generated",
          },
        }),
      ),
    ).toBe("publish");
  });
});
