import { describe, expect, test } from "bun:test";

import {
  articlePreconditionRepairStateForRun,
  articleReviewApproveIntentForRun,
  articleReviewApproveLabelForRun,
  articleRunPathAfterStart,
  articleWorkflowProgressForRunPage,
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

  test("keeps a newly-running article on Generate despite stale publish progress", () => {
    const run = articleRun({
      status: "running",
      currentStep: "fetch_org_config",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      livePreview: null,
      workflowProgress: {
        currentStepId: "publish",
        steps: [
          { id: "generate", label: "Generate", phase: "article", status: "complete", href: "/generate" },
          { id: "review", label: "Review", phase: "article", status: "complete", href: "/review" },
          { id: "publish", label: "Publish", phase: "article", status: "ready", href: "/publish" },
        ],
      },
      result: {},
    });

    expect(hasPublishHandoffEvidence(run)).toBe(false);
    expect(viewedWorkflowStepIdForRun(run, null, null, "publish")).toBe("generate");
    expect(articleWorkflowProgressForRunPage(run, null)).toMatchObject({
      currentStepId: "generate",
      steps: [
        { id: "generate", status: "running" },
        { id: "review", status: "locked" },
        { id: "publish", status: "locked" },
      ],
    });
  });

  test("shows an automatic setup repair as Generate and keeps polling on the article run", () => {
    const run = articleRun({
      status: "blocked",
      currentStep: "blocked",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      contentPackage: null,
      livePreview: null,
      errorCode: "ARTICLE_SYSTEM_SETUP_REQUIRED",
      preconditionStatus: "precondition_failed",
      repairStatus: "queued",
      repairRunId: "scan-repair-1",
      requiresUserAction: false,
      result: {
        precondition_status: "precondition_failed",
        repair_status: "queued",
        repair_run_id: "scan-repair-1",
        requires_user_action: false,
      },
    });

    expect(articlePreconditionRepairStateForRun(run)).toMatchObject({
      isPrecondition: true,
      autoRecovering: true,
      requiresUserAction: false,
      repairRunId: "scan-repair-1",
    });
    expect(viewedWorkflowStepIdForRun(run)).toBe("generate");
  });

  test("links genuine setup blockers to their repair run", () => {
    const run = articleRun({
      status: "blocked",
      currentStep: "blocked",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      contentPackage: null,
      livePreview: null,
      errorCode: "ARTICLE_SYSTEM_SETUP_REQUIRED",
      preconditionStatus: "precondition_failed",
      repairStatus: "awaiting_approval",
      setupRunId: "setup-review-1",
      nextAction: "approve_scaffold",
      requiresUserAction: true,
      result: {},
    });

    expect(articlePreconditionRepairStateForRun(run)).toMatchObject({
      isPrecondition: true,
      autoRecovering: false,
      requiresUserAction: true,
      actionHref: "/founder-tools/marketing/runs/setup-review-1",
      actionLabel: "Review article setup",
    });
    expect(viewedWorkflowStepIdForRun(run)).toBe("generate");
    expect(articleWorkflowProgressForRunPage(run, null)?.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "generate", status: "needs_action" }),
        expect.objectContaining({ id: "publish", status: "locked" }),
      ]),
    );
  });

  test("turns a queued setup child into an actionable link instead of an endless repair spinner", () => {
    const run = articleRun({
      status: "blocked",
      currentStep: "blocked",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      contentPackage: null,
      livePreview: null,
      errorCode: "ARTICLE_SYSTEM_SETUP_REQUIRED",
      preconditionStatus: "precondition_failed",
      repairStatus: "setup_queued",
      repairRunId: "setup-preview-queued-1",
      setupRunId: "setup-preview-queued-1",
      nextAction: "review_setup",
      requiresUserAction: true,
      result: {
        precondition_status: "precondition_failed",
        repair_status: "setup_queued",
        repair_run_id: "setup-preview-queued-1",
        setup_run_id: "setup-preview-queued-1",
        next_action: "review_setup",
        requires_user_action: true,
      },
    });

    expect(articlePreconditionRepairStateForRun(run)).toMatchObject({
      isPrecondition: true,
      autoRecovering: false,
      requiresUserAction: true,
      repairRunId: "setup-preview-queued-1",
      actionHref: "/founder-tools/marketing/runs/setup-preview-queued-1",
      actionLabel: "Review article setup",
    });
  });

  test("keeps every accepted article start on its durable run URL", () => {
    expect(articleRunPathAfterStart({ runId: "queued-article" })).toBe(
      "/founder-tools/marketing/runs/queued-article",
    );
    expect(articleRunPathAfterStart({ runId: "repairing article" })).toBe(
      "/founder-tools/marketing/runs/repairing%20article",
    );
    expect(articleRunPathAfterStart({ runId: null })).toBeNull();
  });

  test("turns an exhausted automatic resume into an actionable article retry", () => {
    const run = articleRun({
      status: "blocked",
      currentStep: "blocked",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      contentPackage: null,
      livePreview: null,
      errorCode: "ARTICLE_SYSTEM_SETUP_REQUIRED",
      preconditionStatus: "precondition_failed",
      repairStatus: "resume_failed",
      nextAction: "resume_article",
      requiresUserAction: true,
      result: {},
    });

    expect(articlePreconditionRepairStateForRun(run)).toMatchObject({
      isPrecondition: true,
      autoRecovering: false,
      requiresUserAction: true,
      actionLabel: "Resume article",
    });
  });
});
