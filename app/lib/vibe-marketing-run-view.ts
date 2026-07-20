import type { VibeMarketingRunSummary, VibeMarketingWorkflowProgress } from "~/types/vibe-marketing";

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
const ARTICLE_CREATION_WORKFLOWS = new Set([
  "article_generation",
  "content_factory_article",
  "direct_generate",
  "confirmed_topic",
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
const ACTIVE_ARTICLE_STATUSES = new Set([
  "queued",
  "pending",
  "starting",
  "processing",
  "running",
  "in_progress",
  "preview_building",
  "preview_verifying",
  "repair_preview_building",
]);
const ACTIVE_REPAIR_STATUSES = new Set([
  "queued",
  "pending",
  "starting",
  "processing",
  "running",
  "in_progress",
  "scanning",
  "rescanning",
  "completed",
  "ready",
  "verified",
  "repaired",
]);
const USER_ACTION_REPAIR_STATUSES = new Set([
  "awaiting_approval",
  "awaiting_confirmation",
  "awaiting_merge",
  "auth_required",
  "not_started",
  "failed",
  "blocked",
  "resume_failed",
]);
const POST_GENERATE_STEP_IDS = new Set(["review", "revise", "package", "publish", "automation"]);

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

function objectResultValue(run: VibeMarketingRunSummary, ...keys: string[]) {
  for (const key of keys) {
    const values = [
      run.result?.[key],
      run.result?.["result"] && typeof run.result["result"] === "object"
        ? (run.result["result"] as Record<string, unknown>)[key]
        : undefined,
      run.result?.["latest_control_response"] && typeof run.result["latest_control_response"] === "object"
        ? (run.result["latest_control_response"] as Record<string, unknown>)[key]
        : undefined,
    ];
    for (const value of values) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value as Record<string, unknown>;
      }
    }
  }
  return {} as Record<string, unknown>;
}

function optionalBoolResultValue(run: VibeMarketingRunSummary, ...keys: string[]): boolean | null {
  for (const key of keys) {
    const values = [
      run.result?.[key],
      run.result?.["result"] && typeof run.result["result"] === "object"
        ? (run.result["result"] as Record<string, unknown>)[key]
        : undefined,
      run.result?.["latest_control_response"] && typeof run.result["latest_control_response"] === "object"
        ? (run.result["latest_control_response"] as Record<string, unknown>)[key]
        : undefined,
    ];
    for (const value of values) {
      if (typeof value === "boolean") return value;
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") {
        const normalizedValue = normalized(value);
        if (["true", "1", "yes", "on"].includes(normalizedValue)) return true;
        if (["false", "0", "no", "off"].includes(normalizedValue)) return false;
      }
    }
  }
  return null;
}

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export interface ArticlePreconditionRepairState {
  isPrecondition: boolean;
  autoRecovering: boolean;
  requiresUserAction: boolean;
  repairStatus: string;
  repairRunId: string;
  nextAction: string;
  message: string;
  actionHref: string;
  actionLabel: string;
}

export interface ArticlePreviewQualityState {
  status: string;
  checking: boolean;
  blocksApproval: boolean;
  advisory: boolean;
  canRetry: boolean;
  message: string;
  findings: string[];
  repairInstructions: string[];
  mismatchSummaries: string[];
}

export function articlePreviewQualityStateForRun(run: VibeMarketingRunSummary): ArticlePreviewQualityState {
  const quality = objectResultValue(run, "article_preview_quality", "articlePreviewQuality");
  const blocker = objectResultValue(run, "approval_blocker", "approvalBlocker");
  const status = normalized(typeof quality.status === "string" ? quality.status : "");
  const findings = Array.isArray(quality.findings)
    ? quality.findings.map((item) => String(item ?? "").trim()).filter(Boolean)
    : [];
  const repairInstructions = Array.isArray(quality.repair_instructions)
    ? quality.repair_instructions.map((item) => String(item ?? "").trim()).filter(Boolean)
    : Array.isArray(quality.repairInstructions)
      ? quality.repairInstructions.map((item) => String(item ?? "").trim()).filter(Boolean)
      : [];
  const style = quality.style && typeof quality.style === "object"
    ? (quality.style as Record<string, unknown>)
    : {};
  const mismatchSummaries = Array.isArray(style.mismatches)
    ? style.mismatches
        .map((item) =>
          item && typeof item === "object"
            ? String((item as Record<string, unknown>).summary ?? "").trim()
            : String(item ?? "").trim(),
        )
        .filter(Boolean)
    : [];
  const checking = status === "queued" || status === "running" || status === "transient_findings";
  const blocksApproval = checking || status === "blocking_findings";
  const advisory = status === "advisory_findings";
  const editorialScoreMissing = findings.includes("editorial:score_missing");
  const blockerMessage = String(blocker.message ?? blocker.detail ?? "").trim();
  const message = blockerMessage || (checking
    ? "The hosted article quality check is running. Publishing will unlock automatically when it finishes."
    : editorialScoreMissing
      ? "The editorial reviewer did not return the required score. The article content rendered successfully; retry this quality check without regenerating the draft."
      : status === "blocking_findings"
        ? "The hosted preview has a blocking quality finding that must be resolved before publishing."
        : advisory
          ? "The preview passed its publishing gate with advisory style feedback. You can publish it as-is or send a revision comment."
          : "");
  return {
    status,
    checking,
    blocksApproval,
    advisory,
    canRetry: Boolean(
      !checking &&
        (editorialScoreMissing || status === "review_error" || status === "queue_failed"),
    ),
    message,
    findings,
    repairInstructions,
    mismatchSummaries,
  };
}

export function isArticleGenerationActivelyRunning(run: VibeMarketingRunSummary) {
  return Boolean(
    ARTICLE_CREATION_WORKFLOWS.has(String(run.workflow ?? "")) &&
      ACTIVE_ARTICLE_STATUSES.has(normalized(run.status)),
  );
}

export function articlePreconditionRepairStateForRun(run: VibeMarketingRunSummary): ArticlePreconditionRepairState {
  const repairStatus = normalized(
    run.repairStatus || stringResultValue(run, "repair_status", "repairStatus"),
  );
  const preconditionStatus = normalized(
    run.preconditionStatus ||
      stringResultValue(run, "precondition_status", "preconditionStatus", "status", "final_status", "finalStatus"),
  );
  const errorCode = normalized(run.errorCode || stringResultValue(run, "error_code", "errorCode"));
  const currentStep = normalized(run.currentStep);
  const articleWorkHasStarted = [
    "load_context",
    "research",
    "source_bundle",
    "topic_explanation",
    "plan_article",
    "title_policy",
    "draft_section",
    "ground_section",
    "assemble_article",
    "generate_content_images",
    "package_content_delivery",
    "package_publish_bundle",
    "render_article",
    "validate_render",
    "publish_preview",
    "await_review",
    "await_publish_approval",
    "finalize",
  ].some((marker) => currentStep.includes(marker));
  const hasResolvedArticlePreview = Boolean(
    run.componentManifest && run.livePreview?.available && String(run.livePreview.previewUrl ?? "").trim(),
  );
  const rawPrecondition = Boolean(
    ARTICLE_CREATION_WORKFLOWS.has(String(run.workflow ?? "")) &&
      (normalized(run.status) === "precondition_failed" ||
        preconditionStatus === "precondition_failed" ||
        errorCode === "article_system_setup_required"),
  );
  const isPrecondition =
    rawPrecondition && normalized(run.status) !== "completed" && !hasResolvedArticlePreview && !articleWorkHasStarted;
  const activeArticle = isArticleGenerationActivelyRunning(run);
  const explicitRequiresUserAction =
    run.requiresUserAction ?? optionalBoolResultValue(run, "requires_user_action", "requiresUserAction");
  const repairIsActive = ACTIVE_REPAIR_STATUSES.has(repairStatus);
  const repairNeedsUser = USER_ACTION_REPAIR_STATUSES.has(repairStatus);
  const autoRecovering = Boolean(
    isPrecondition &&
      (activeArticle || (!repairNeedsUser && explicitRequiresUserAction !== true && repairIsActive)),
  );
  const requiresUserAction = Boolean(
    isPrecondition &&
      !activeArticle &&
      (explicitRequiresUserAction === true || repairNeedsUser || !repairIsActive),
  );
  const repairRunId =
    run.setupRunId?.trim() ||
    run.repairRunId?.trim() ||
    stringResultValue(
      run,
      "setup_run_id",
      "setupRunId",
      "repair_run_id",
      "repairRunId",
      "scan_run_id",
      "scanRunId",
      "pending_setup_run_id",
    );
  const nextAction = normalized(run.nextAction || stringResultValue(run, "next_action", "nextAction"));
  const message =
    stringResultValue(run, "repair_error", "message", "error", "hint") ||
    run.blockingReason ||
    run.errors[0] ||
    "The website's article setup must be checked before research can continue.";
  const actionHref = repairRunId && repairRunId !== run.runId
    ? `/founder-tools/marketing/runs/${encodeURIComponent(repairRunId)}`
    : "/founder-tools/marketing/create?step=articleSystem";
  const actionLabel =
    nextAction === "resume_article"
      ? "Resume article"
      : nextAction === "reconnect_github" || repairStatus === "auth_required"
      ? "Reconnect GitHub"
      : nextAction === "merge_scaffold_pr" || repairStatus === "awaiting_merge"
        ? "Publish article setup"
        : "Review article setup";

  return {
    isPrecondition,
    autoRecovering,
    requiresUserAction,
    repairStatus,
    repairRunId,
    nextAction,
    message,
    actionHref,
    actionLabel,
  };
}

export function articleRunPathAfterStart(result: { runId?: string | null }) {
  const runId = String(result.runId ?? "").trim();
  return runId ? `/founder-tools/marketing/runs/${encodeURIComponent(runId)}` : null;
}

export function articleWorkflowProgressForRunPage(
  run: VibeMarketingRunSummary,
  fallbackProgress: VibeMarketingWorkflowProgress | null | undefined,
): VibeMarketingWorkflowProgress | null {
  const progress = run.workflowProgress ?? fallbackProgress ?? null;
  if (!progress || !ARTICLE_CREATION_WORKFLOWS.has(String(run.workflow ?? ""))) return progress;

  const repair = articlePreconditionRepairStateForRun(run);
  const forceGenerate = isArticleGenerationActivelyRunning(run) || repair.isPrecondition;
  if (!forceGenerate) return progress;

  const normalizedSteps = progress.steps.map((step) => {
    if (step.id === "generate") {
      return {
        ...step,
        href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}?articleStep=generate`,
        status: repair.requiresUserAction ? "needs_action" : "running",
        summary: repair.autoRecovering
          ? "Checking the website article setup before research starts automatically."
          : repair.requiresUserAction
            ? "Finish the required article setup before research can continue."
            : "Researching, drafting, and preparing this article for review.",
        primaryAction: null,
      };
    }
    if (POST_GENERATE_STEP_IDS.has(step.id)) {
      return { ...step, status: "locked", primaryAction: null };
    }
    return step;
  });
  if (!normalizedSteps.some((step) => step.id === "generate")) {
    const insertAt = normalizedSteps.findIndex((step) => POST_GENERATE_STEP_IDS.has(step.id));
    const generateStep = {
      id: "generate",
      label: "Generate article",
      phase: "article",
      status: repair.requiresUserAction ? "needs_action" : "running",
      href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}?articleStep=generate`,
      summary: repair.autoRecovering
        ? "Checking the website article setup before research starts automatically."
        : repair.requiresUserAction
          ? "Finish the required article setup before research can continue."
          : "Researching, drafting, and preparing this article for review.",
      primaryAction: null,
    };
    normalizedSteps.splice(insertAt >= 0 ? insertAt : normalizedSteps.length, 0, generateStep);
  }

  return {
    ...progress,
    currentStepId: "generate",
    nextStepId: repair.requiresUserAction ? null : "review",
    steps: normalizedSteps,
  };
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
  const repair = articlePreconditionRepairStateForRun(run);
  if (isArticleGenerationActivelyRunning(run) || repair.autoRecovering) return false;
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
  if (ARTICLE_CREATION_WORKFLOWS.has(workflow)) {
    const repair = articlePreconditionRepairStateForRun(run);
    // A newly-started or self-healing article always belongs on Generate. The
    // organisation-level workflow progress can still point at the previous
    // article's Review/Publish step while this run is only checking its repo.
    if (isArticleGenerationActivelyRunning(run) || repair.isPrecondition) return "generate";
  }
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
