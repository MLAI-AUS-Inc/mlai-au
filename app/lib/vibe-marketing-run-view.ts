import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

const ARTICLE_WORKFLOWS = new Set([
  "article_generation",
  "content_factory_article",
  "direct_generate",
  "confirmed_topic",
  "article_revision",
]);
const ARTICLE_GENERATION_WORKFLOWS = new Set([
  "article_generation",
  "content_factory_article",
  "direct_generate",
  "confirmed_topic",
  "article_revision",
]);
const DISCOVERY_WORKFLOWS = new Set(["auto_discovery", "content_factory_discovery", "daily_discovery"]);
const SCAN_WORKFLOWS = new Set(["repo_scan", "content_factory_scan"]);
const POLLING_STATUSES = new Set([
  "queued",
  "pending",
  "starting",
  "processing",
  "running",
  "in_progress",
  "preview_building",
  "preview_verifying",
  "repair_preview_building",
  "awaiting_confirmation",
  "awaiting_delivery_mode",
  "awaiting_approval",
  "approval_required",
]);
const APPROVAL_GATE_STATUSES = new Set(["awaiting_approval", "approval_required"]);

export type ArticleSetupStepViewForRun = "generate" | "review" | "publish";
export type ArticleStepViewForRun = "generate" | "review" | "publish";

function isArticleWorkflow(workflow: string | null | undefined) {
  return ARTICLE_WORKFLOWS.has(String(workflow ?? ""));
}

function stringResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  for (const key of keys) {
    const value = run.result?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    const nestedResult = run.result?.["result"];
    if (nestedResult && typeof nestedResult === "object") {
      const nestedValue = (nestedResult as Record<string, unknown>)[key];
      if (typeof nestedValue === "string" && nestedValue.trim()) return nestedValue.trim();
    }
    const latestControl = run.result?.["latest_control_response"];
    if (latestControl && typeof latestControl === "object") {
      const latestValue = (latestControl as Record<string, unknown>)[key];
      if (typeof latestValue === "string" && latestValue.trim()) return latestValue.trim();
    }
  }
  return "";
}

function boolResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  for (const key of keys) {
    const value = run.result?.[key];
    if (typeof value === "boolean") return value;
    const nestedResult = run.result?.["result"];
    if (nestedResult && typeof nestedResult === "object") {
      const nestedValue = (nestedResult as Record<string, unknown>)[key];
      if (typeof nestedValue === "boolean") return nestedValue;
    }
    const latestControl = run.result?.["latest_control_response"];
    if (latestControl && typeof latestControl === "object") {
      const latestValue = (latestControl as Record<string, unknown>)[key];
      if (typeof latestValue === "boolean") return latestValue;
    }
  }
  return false;
}

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export function publishPrUrlForRun(run: VibeMarketingRunSummary) {
  return run.prUrl?.trim() || stringResultValue(run, "pr_url", "prUrl", "pull_request_url", "pullRequestUrl", "draft_pr_url", "draftPrUrl");
}

function rawPreviewUrlForRun(run: VibeMarketingRunSummary) {
  return run.previewUrl?.trim() || stringResultValue(run, "preview_url", "previewUrl", "article_url", "articleUrl", "url");
}

function isRunApprovalRequired(run: VibeMarketingRunSummary) {
  return run.approvalState === "approval_required" || APPROVAL_GATE_STATUSES.has(run.status);
}

function hasPublishChildReference(run: VibeMarketingRunSummary) {
  return Boolean(
    stringResultValue(run, "publish_child_run_id", "promoted_publish_job_id", "promote_bundle_requested_at") ||
      boolResultValue(run, "publish_handoff_pending"),
  );
}

function hasArticleReviewPreviewMarker(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow)) return false;
  const reviewSurfaceKind = normalized(stringResultValue(run, "review_surface_kind", "reviewSurfaceKind"));
  const resultStatus = normalized(stringResultValue(run, "status", "final_status", "finalStatus"));
  return (
    reviewSurfaceKind === "component_live_preview" ||
    resultStatus === "preview_ready" ||
    normalized(run.currentStep) === "await_review" ||
    normalized(run.currentStep) === "await_publish_approval"
  );
}

export function articleReviewPreviewUrlForRun(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow)) return "";
  const livePreviewUrl = String(run.livePreview?.previewUrl ?? "").trim();
  if (run.livePreview?.available && livePreviewUrl) return livePreviewUrl;
  if (hasArticleReviewPreviewMarker(run) || isRunApprovalRequired(run)) return rawPreviewUrlForRun(run);
  return "";
}

export function isArticleReviewPreviewReady(run: VibeMarketingRunSummary) {
  return Boolean(
    isArticleWorkflow(run.workflow) &&
      run.componentManifest &&
      articleReviewPreviewUrlForRun(run) &&
      !publishPrUrlForRun(run) &&
      !hasPublishChildReference(run) &&
      (hasArticleReviewPreviewMarker(run) || isRunApprovalRequired(run)),
  );
}

export function publishPreviewUrlForRun(run: VibeMarketingRunSummary) {
  const previewUrl = rawPreviewUrlForRun(run);
  if (!previewUrl) return "";
  if (hasArticleReviewPreviewMarker(run)) return "";
  return previewUrl;
}

export function hasPublishHandoffEvidence(run: VibeMarketingRunSummary) {
  if (isArticleReviewPreviewReady(run)) return false;
  return Boolean(
    publishPrUrlForRun(run) ||
      publishPreviewUrlForRun(run) ||
      hasPublishChildReference(run) ||
      run.workflowProgress?.currentStepId === "publish" ||
      run.workflowProgress?.currentStepId === "automation",
  );
}

export function isPublishFlowSettled(run: VibeMarketingRunSummary) {
  if (normalized(stringResultValue(run, "merge_status", "mergeStatus")) === "merged") return true;
  if (publishPrUrlForRun(run)) return false;
  const childStatus =
    normalized(run.publishChildStatus ?? "") || normalized(stringResultValue(run, "publish_child_status", "publishChildStatus"));
  const previewEvidence =
    publishPreviewUrlForRun(run) || stringResultValue(run, "publish_child_preview_url", "publishChildPreviewUrl");
  return childStatus === "completed" && Boolean(previewEvidence);
}

export function isPublishApprovalGate(run: VibeMarketingRunSummary) {
  return Boolean(
    isArticleWorkflow(run.workflow) &&
      isRunApprovalRequired(run) &&
      !isArticleReviewPreviewReady(run) &&
      (publishPreviewUrlForRun(run) || publishPrUrlForRun(run)),
  );
}

export function articleReviewApproveIntentForRun(run: VibeMarketingRunSummary, fallbackIntent: string | null | undefined) {
  return isArticleReviewPreviewReady(run) && isRunApprovalRequired(run) ? "approve" : fallbackIntent || "promote-bundle";
}

export function articleReviewApproveLabelForRun(run: VibeMarketingRunSummary) {
  return isArticleReviewPreviewReady(run) && isRunApprovalRequired(run)
    ? { idle: "Approve article and create PR", pending: "Approving..." }
    : { idle: "Accept article and continue", pending: "Continuing..." };
}

export function viewedWorkflowStepIdForRun(
  run: VibeMarketingRunSummary,
  requestedSetupStep?: ArticleSetupStepViewForRun | null,
  setupWorkflowStepId?: string | null,
  requestedArticleStep?: ArticleStepViewForRun | null,
) {
  const workflow = String(run.workflow ?? "");
  if (DISCOVERY_WORKFLOWS.has(workflow)) {
    return run.status === "awaiting_confirmation" ? "choose_topic" : "research";
  }
  if (SCAN_WORKFLOWS.has(workflow)) return "article_system";
  if (workflow === "article_system_setup") return requestedSetupStep ?? setupWorkflowStepId ?? "generate";
  if (workflow === "website_baseline") return "baseline";
  // Explicit user override (e.g. ?articleStep=review) lets the user jump back to
  // the article preview at any point, even after the run has moved to publish.
  if (requestedArticleStep && ARTICLE_GENERATION_WORKFLOWS.has(workflow)) return requestedArticleStep;
  if (workflow === "article_revision") return hasPublishHandoffEvidence(run) ? "publish" : "revise";
  if (ARTICLE_GENERATION_WORKFLOWS.has(workflow)) {
    if (isArticleReviewPreviewReady(run)) return "review";
    if (hasPublishHandoffEvidence(run)) return "publish";
    if (POLLING_STATUSES.has(run.status)) return "generate";
    if (run.componentManifest) return "review";
    if (run.contentPackage?.contentPackaged) return "package";
    return "generate";
  }
  return run.workflowProgress?.currentStepId ?? null;
}
