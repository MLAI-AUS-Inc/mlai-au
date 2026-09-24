import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import { LiveArticlePreviewPanel, PublishAndAutomateDetail } from "../app/routes/founder-tools.marketing.run";

import {
  articlePreconditionRepairStateForRun,
  articlePublishQualityGateForRun,
  articlePreviewQualityStateForRun,
  articleReviewApprovalTargetForRun,
  articleReviewApproveIntentForRun,
  articleReviewApproveLabelForRun,
  articleRunPathAfterStart,
  articleWorkflowProgressForRunPage,
  hasRecordedArticlePublishApprovalOrHandoff,
  hasPublishHandoffEvidence,
  isArticleReviewPreviewReady,
  isPublishApprovalGate,
  publishPreviewUrlForRun,
  viewedWorkflowStepIdForRun,
} from "../app/lib/vibe-marketing-run-view";
import type { VibeMarketingBootstrap, VibeMarketingRunSummary } from "../app/types/vibe-marketing";

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
      commitSha: "preview-commit-3",
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

  test("targets the visible latest revision even when the page URL names an older source", () => {
    const latest = articleRun({ runId: "revision-3", workflow: "article_revision" });
    expect(articleReviewApprovalTargetForRun(latest, "revision-3", "https://preview.example/articles/generated", "preview-commit-3")).toBe("revision-3");
  });

  test("submits the preview identity actually shown on a stale source URL", () => {
    const latest = articleRun({ runId: "revision-3", workflow: "article_revision" });
    const router = createMemoryRouter([{
      path: "/founder-tools/marketing/runs/:runId",
      element: createElement(LiveArticlePreviewPanel, {
        run: latest,
        selectedComponent: null,
        onSelectComponent: () => {},
        isSubmitting: false,
        initiallyExpanded: true,
      }),
    }], { initialEntries: ["/founder-tools/marketing/runs/source-1"] });
    try {
      const markup = renderToStaticMarkup(createElement(RouterProvider, { router }));
      expect(markup).toContain('name="reviewedRunId" value="revision-3"');
      expect(markup).toContain('name="reviewedPreviewUrl" value="https://preview.example/articles/generated"');
      expect(markup).toContain('name="reviewedPreviewRevision" value="preview-commit-3"');
      expect(markup).toContain("Approve article and create PR");
      expect(markup).not.toContain('name="reviewedRunId" value="source-1"');
    } finally {
      router.dispose();
    }
  });

  test("fails closed when the draft identity changes after the approval form was rendered", () => {
    const latest = articleRun({ runId: "revision-3", workflow: "article_revision" });
    expect(articleReviewApprovalTargetForRun(latest, "", "https://preview.example/articles/generated", "preview-commit-3")).toBe("");
    expect(articleReviewApprovalTargetForRun(latest, "revision-2", "https://preview.example/articles/generated", "preview-commit-3")).toBe("");
    expect(articleReviewApprovalTargetForRun(latest, "revision-3", "https://preview.example/articles/older", "preview-commit-3")).toBe("");
    expect(articleReviewApprovalTargetForRun(latest, "revision-3", "https://preview.example/articles/generated", "preview-commit-2")).toBe("");
    expect(articleReviewApprovalTargetForRun({ ...latest, status: "failed", approvalState: null }, "revision-3", "https://preview.example/articles/generated", "preview-commit-3")).toBe("");
    expect(articleReviewApprovalTargetForRun({ ...latest, sectionIssues: [{ id: "issue", sectionId: "section:intro", claimId: "claim", claimExcerpt: "Claim", reason: "Missing source", sourceHint: "", state: "needs_review" }] }, "revision-3", "https://preview.example/articles/generated", "preview-commit-3")).toBe("");
    expect(articleReviewApprovalTargetForRun({ ...latest, result: { ...latest.result, article_preview_quality: { status: "blocking_findings" } } }, "revision-3", "https://preview.example/articles/generated", "preview-commit-3")).toBe("");
  });

  test("a forced Publish view waits for review but keeps recorded publish recovery", () => {
    const renderPublish = (run: VibeMarketingRunSummary) => {
      const router = createMemoryRouter([{
        path: "/founder-tools/marketing/runs/:runId",
        element: createElement(PublishAndAutomateDetail, {
          run,
          bootstrap: { checks: {}, settings: { dailyDiscoveryEnabled: false } } as unknown as VibeMarketingBootstrap,
          isSubmitting: false,
        }),
      }], { initialEntries: ["/founder-tools/marketing/runs/source-1?articleStep=publish"] });
      try { return renderToStaticMarkup(createElement(RouterProvider, { router })); }
      finally { router.dispose(); }
    };
    const unapproved = articleRun({ runId: "revision-3", workflow: "article_revision" });
    expect(viewedWorkflowStepIdForRun(unapproved, null, null, "publish")).toBe("publish");
    expect(hasRecordedArticlePublishApprovalOrHandoff(unapproved)).toBe(false);
    expect(hasRecordedArticlePublishApprovalOrHandoff({ ...unapproved, result: {
      ...unapproved.result, latest_control_response: { publish_child_run_id: "old-child" },
    } })).toBe(false);
    const blockedMarkup = renderPublish(unapproved);
    expect(blockedMarkup).toContain("Review and approve the latest article draft before publishing.");
    expect(blockedMarkup).not.toContain('value="promote-bundle"');

    const recovering = articleRun({
      runId: "revision-3", workflow: "article_revision", publishChildRecoverable: true,
      result: { ...unapproved.result, publish_child_run_id: "existing-publish-child", publish_child_recoverable: true },
    });
    expect(hasRecordedArticlePublishApprovalOrHandoff(recovering)).toBe(true);
    const recoveryMarkup = renderPublish(recovering);
    expect(recoveryMarkup).toContain('value="promote-bundle"');
    expect(recoveryMarkup).toContain("Resume publishing");
  });

  test("blocks approval while required editorial quality evidence is missing", () => {
    const run = articleRun({
      result: {
        status: "preview_ready",
        review_surface_kind: "component_live_preview",
        preview_url: "https://preview.example/articles/generated",
        approval_blocker: {
          message: "The editorial reviewer did not produce the required score.",
        },
        article_preview_quality: {
          status: "blocking_findings",
          findings: ["editorial:score_missing", "style:1_mismatches"],
          repair_instructions: ["Use the captured heading font."],
          style: {
            mismatches: [{ summary: "Heading font does not match the captured baseline." }],
          },
        },
      },
    });

    expect(articlePreviewQualityStateForRun(run)).toMatchObject({
      status: "blocking_findings",
      blocksApproval: true,
      canRetry: true,
      message: "The editorial reviewer did not produce the required score.",
      repairInstructions: ["Use the captured heading font."],
      mismatchSummaries: ["Heading font does not match the captured baseline."],
    });
  });

  test("treats style-only findings as advisory and keeps publishing available", () => {
    const run = articleRun({
      result: {
        status: "preview_ready",
        article_preview_quality: {
          status: "advisory_findings",
          findings: ["style:1_mismatches"],
        },
      },
    });

    expect(articlePreviewQualityStateForRun(run)).toMatchObject({
      status: "advisory_findings",
      blocksApproval: false,
      advisory: true,
      canRetry: false,
    });
  });

  test("the publish card follows the draft quality gate until a publish handoff exists", () => {
    const draftWithQuality = (status: string) => articleRun({
      result: {
        status: "preview_ready",
        review_surface_kind: "component_live_preview",
        preview_url: "https://preview.example/articles/generated",
        article_preview_quality: { status },
      },
    });

    expect(articlePublishQualityGateForRun(draftWithQuality("blocking_findings"))).toBe("blocked");
    expect(articlePublishQualityGateForRun(draftWithQuality("queued"))).toBe("running");
    expect(articlePublishQualityGateForRun(draftWithQuality("running"))).toBe("running");
    expect(articlePublishQualityGateForRun(draftWithQuality("passed"))).toBeNull();
    expect(articlePublishQualityGateForRun(draftWithQuality("advisory_findings"))).toBeNull();
    expect(articlePublishQualityGateForRun(articleRun({
      result: {
        ...draftWithQuality("blocking_findings").result,
        publish_child_run_id: "publish-article-1",
      },
    }))).toBeNull();
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

  test("keeps a failed article without a review preview on blocked Generate despite stale organisation progress", () => {
    const run = articleRun({
      status: "failed",
      currentStep: "verify_static",
      approvalState: null,
      previewUrl: null,
      componentManifest: null,
      livePreview: null,
      workflowProgress: null,
      result: {},
    });
    const staleProgress = {
      currentStepId: "profile",
      nextStepId: "publish",
      steps: [
        { id: "profile", label: "Startup profile", phase: "setup", status: "needs_action", href: "/profile" },
        { id: "generate", label: "Generate article", phase: "article", status: "complete", href: "/generate" },
        { id: "review", label: "Review article", phase: "article", status: "ready", href: "/review" },
        { id: "package", label: "Package", phase: "article", status: "ready", href: "/package" },
        { id: "publish", label: "Publish", phase: "article", status: "ready", href: "/publish" },
      ],
    };

    expect(viewedWorkflowStepIdForRun(run, null, null, "publish")).toBe("generate");
    expect(articleWorkflowProgressForRunPage(run, staleProgress)).toMatchObject({
      currentStepId: "generate",
      nextStepId: null,
      steps: [
        { id: "profile", status: "needs_action" },
        { id: "generate", status: "blocked", primaryAction: null },
        { id: "review", status: "locked", primaryAction: null },
        { id: "package", status: "locked", primaryAction: null },
        { id: "publish", status: "locked", primaryAction: null },
      ],
    });
    const staleRunProgress = articleRun({ ...run, workflowProgress: { ...staleProgress, currentStepId: "publish" } });
    expect(hasPublishHandoffEvidence(staleRunProgress)).toBe(false);
    const recoveredProgress = articleWorkflowProgressForRunPage(staleRunProgress, null);
    expect(recoveredProgress?.currentStepId).toBe("generate");
    expect(recoveredProgress?.steps.find((step) => step.id === "generate")?.status).toBe("blocked");
    expect(recoveredProgress?.steps.find((step) => step.id === "publish")?.status).toBe("locked");
  });

  test("does not move a failed publish handoff back to Generate", () => {
    const run = articleRun({
      status: "failed",
      currentStep: "create_pull_request",
      approvalState: null,
      prUrl: "https://github.com/MLAI-AUS-Inc/mlai-au/pull/123",
      previewUrl: null,
      componentManifest: null,
      livePreview: null,
      result: {},
    });

    expect(viewedWorkflowStepIdForRun(run)).toBe("publish");
    expect(articleWorkflowProgressForRunPage(run, null)).toBe(run.workflowProgress);
  });

  test("keeps a failed run with an actual review preview on Review", () => {
    const run = articleRun({ status: "failed", currentStep: "verify_browser", approvalState: null });

    expect(viewedWorkflowStepIdForRun(run)).toBe("review");
    expect(articleWorkflowProgressForRunPage(run, null)).toBe(run.workflowProgress);
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
