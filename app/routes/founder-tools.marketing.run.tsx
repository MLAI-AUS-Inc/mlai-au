import type { Route } from "./+types/founder-tools.marketing.run";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useLocation, useNavigation, useRevalidator, type ShouldRevalidateFunctionArgs } from "react-router";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  PlayIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import ArticleRunStageProgress from "~/components/ArticleRunStageProgress";
import DailyReminderChannels from "~/components/DailyReminderChannels";
import ArticlesSetupProgressCard from "~/components/ArticlesSetupProgressCard";
import ArticleSystemConnectionPanel from "~/components/ArticleSystemConnectionPanel";
import CancelSetupBuildButton, { CANCEL_SETUP_BUILD_INTENT, canCancelSetupBuild } from "~/components/CancelSetupBuildButton";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import { RooPointCost } from "~/components/RooPointCost";
import { TopicDecisionCard } from "~/components/TopicDecisionCard";
import { isApiNotFoundError } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import {
  VIBE_MARKETING_ARTICLE_JOB_COST_POINTS,
  createVibeMarketingClientRequestId,
} from "~/lib/vibe-marketing-billing";
import { useMarketingActionPending } from "~/lib/vibe-marketing-pending-actions";
import {
  articleReviewApproveIntentForRun,
  articleReviewApproveLabelForRun,
  hasPublishHandoffEvidence,
  isArticleReviewPreviewReady,
  isPublishApprovalGate,
  isPublishFlowSettled,
  publishPreviewUrlForRun,
  publishPrUrlForRun,
  viewedWorkflowStepIdForRun,
} from "~/lib/vibe-marketing-run-view";
import { shouldSkipVibeMarketingRunRevalidation } from "~/lib/vibe-marketing-step-revalidation";
import {
  connectVibeMarketingGithub,
  controlVibeMarketingRun,
  acceptVibeMarketingComponentRevision,
  addVibeMarketingComponentComment,
  createNotificationChannel,
  deleteVibeMarketingComponentComment,
  getVibeMarketingBootstrap,
  getVibeMarketingGithubRepos,
  getVibeMarketingRun,
  removeNotificationChannel,
  replayVibeMarketingDaily,
  resendNotificationChannelCode,
  submitVibeMarketingArticleSystemComments,
  submitVibeMarketingComponentComments,
  startVibeMarketingScan,
  startVibeMarketingLivePreview,
  startVibeMarketingArticle,
  updateVibeMarketingComponentComment,
  verifyNotificationChannelOtp,
  canonicalizeTopicCandidates,
} from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder, resolveActiveCompanyId, setVibeRaisingActiveCompany } from "~/lib/vibe-raising";
import type {
  VibeMarketingComponentManifestItem,
  VibeMarketingComponentCommentAnchor,
  VibeMarketingComponentCommentContext,
  VibeMarketingComponentFeedbackComment,
  VibeMarketingNotificationChannel,
  VibeMarketingBootstrap,
  VibeMarketingGithubReposResponse,
  VibeMarketingRunSummary,
  VibeMarketingTopicCandidate,
  VibeMarketingWorkflowProgress,
} from "~/types/vibe-marketing";

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
const LIVE_PREVIEW_ACTIVE_STATUSES = new Set(["queued", "pending", "preparing", "starting", "building", "running", "preview_verifying", "repair_preview_building"]);
const LIVE_PREVIEW_FAILURE_STATUSES = new Set(["failed", "blocked", "expired", "cancelled", "canceled", "timeout", "timed_out"]);
const ARTICLE_SETUP_ACTIVE_STATUSES = new Set(["queued", "pending", "processing", "running", "in_progress", "preview_building", "preview_verifying", "repair_preview_building"]);
const ARTICLE_SETUP_FAILED_STATUSES = new Set(["failed", "blocked", "preview_failed"]);
const ARTICLE_SETUP_FALLBACK_STATUSES = new Set(["fallback_ready"]);
const ARTICLE_SETUP_PUBLISH_STATUSES = new Set(["pr_created", "setup_pr_created", "manual_merge_required", "merged", "merged_verifying", "verifying"]);
const ARTICLE_SETUP_MERGED_STATUSES = new Set(["merged", "merged_verifying", "verifying", "published", "verified"]);
const SETUP_STEP_VIEW_VALUES = new Set(["generate", "review", "publish"]);

type ArticleSetupStepView = "generate" | "review" | "publish";

const DISCOVERY_WORKFLOWS = new Set(["auto_discovery", "content_factory_discovery", "daily_discovery"]);
const SCAN_WORKFLOWS = new Set(["repo_scan", "content_factory_scan"]);
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
const RESUMABLE_ATTENTION_STATUSES = new Set(["blocked", "blocked_verification", "failed"]);
const APPROVAL_GATE_STATUSES = new Set(["awaiting_approval", "approval_required"]);

function isArticleWorkflow(workflow: string | null | undefined) {
  return ARTICLE_WORKFLOWS.has(String(workflow ?? ""));
}

function isArticleGenerationWorkflow(workflow: string | null | undefined) {
  return ARTICLE_GENERATION_WORKFLOWS.has(String(workflow ?? ""));
}

function isGithubPublishingReady(bootstrap: VibeMarketingBootstrap) {
  return Boolean(bootstrap.checks.github?.passed && bootstrap.settings.githubRepo);
}

function isArticleSystemSetupBlocked(bootstrap: VibeMarketingBootstrap) {
  return Boolean(
    bootstrap.checks.scaffold?.setupBlocked &&
      !bootstrap.hasCompletedArticleFlow &&
      !bootstrap.checks.scaffold?.generationReady &&
      !bootstrap.checks.scaffold?.setupMerged &&
      !bootstrap.articleSetupState?.generationReady &&
      !bootstrap.articleSetupState?.setupMerged,
  );
}

type ArticleDeliveryMode = "review_draft" | "publish_code" | "content_only";

function effectiveArticleDeliveryMode(bootstrap: VibeMarketingBootstrap): ArticleDeliveryMode {
  const effective = bootstrap.settings.articleDeliveryModeEffective;
  if (effective === "review_draft" || effective === "publish_code" || effective === "content_only") {
    return effective;
  }
  const configured = bootstrap.settings.articleDeliveryMode;
  if (configured === "review_draft" || configured === "publish_code") {
    return configured;
  }
  if (configured === "content_only" && !isGithubPublishingReady(bootstrap)) {
    return "content_only";
  }
  return isGithubPublishingReady(bootstrap) ? "review_draft" : "content_only";
}

function hasReadyArticlePreview(run: VibeMarketingRunSummary) {
  return Boolean(
    isArticleWorkflow(run.workflow) &&
      run.componentManifest &&
      run.livePreview?.available &&
      run.livePreview.previewUrl,
  );
}

function isFailedArticlePreview(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  const platformStatus = String(preview?.platformStatus ?? "").trim().toLowerCase();
  if (LIVE_PREVIEW_ACTIVE_STATUSES.has(previewStatus) || LIVE_PREVIEW_ACTIVE_STATUSES.has(platformStatus)) return false;
  return Boolean(preview?.error || LIVE_PREVIEW_FAILURE_STATUSES.has(previewStatus) || LIVE_PREVIEW_FAILURE_STATUSES.has(platformStatus));
}

function previewUnavailableReason(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const proof = preview?.proof && typeof preview.proof === "object" ? (preview.proof as Record<string, unknown>) : {};
  return String(
    preview?.previewUnavailableReason ??
      proof.previewUnavailableReason ??
      proof.preview_unavailable_reason ??
      "",
  )
    .trim()
    .toLowerCase();
}

function isContentOnlyNoRenderPreview(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  return previewUnavailableReason(preview) === "content_only_no_render_artifact";
}

function hasActiveLivePreview(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  const platformStatus = String(preview?.platformStatus ?? "").trim().toLowerCase();
  return LIVE_PREVIEW_ACTIVE_STATUSES.has(previewStatus) || LIVE_PREVIEW_ACTIVE_STATUSES.has(platformStatus);
}

function exactLivePreviewUrl(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const previewUrl = String(preview?.previewUrl ?? "").trim();
  return preview?.available && preview.exactRender === true && previewUrl ? previewUrl : "";
}

function fallbackLivePreviewUrl(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const explicitFallbackUrl = String(preview?.fallbackPreviewUrl ?? "").trim();
  if (explicitFallbackUrl) return explicitFallbackUrl;

  const previewUrl = String(preview?.previewUrl ?? "").trim();
  if (!previewUrl || preview?.exactRender === true) return "";
  const previewMode = String(preview?.previewMode ?? "").trim().toLowerCase();
  const renderConfidence = String(preview?.renderConfidence ?? "").trim().toLowerCase();
  return preview?.fullSiteBuildSkipped ||
    previewMode === "route_scoped_next_preview" ||
    renderConfidence === "fallback" ||
    Boolean(preview?.fallbackReason)
    ? previewUrl
    : "";
}

function articleSystemSetupExactPreviewUrl(
  run: VibeMarketingRunSummary,
  sourceRun?: VibeMarketingRunSummary | null,
) {
  const livePreviewUrl = exactLivePreviewUrl(run.livePreview);
  if (livePreviewUrl) return livePreviewUrl;

  const runPreviewUrl =
    run.previewUrl ||
    stringResultValue(run, "preview_url", "previewUrl") ||
    (sourceRun ? stringResultValue(sourceRun, "preview_url", "previewUrl") : "");
  return runPreviewUrl && (!run.livePreview || run.livePreview.exactRender === true) ? runPreviewUrl : "";
}

function articleSystemSetupFallbackPreviewUrl(
  run: VibeMarketingRunSummary,
  sourceRun?: VibeMarketingRunSummary | null,
) {
  const setup = articleSystemSetupPayload(run);
  const sourceSetup = sourceRun ? articleSystemSetupPayload(sourceRun) : {};
  return (
    fallbackLivePreviewUrl(run.livePreview) ||
    String(setup.fallback_preview_url ?? setup.fallbackPreviewUrl ?? "").trim() ||
    (sourceRun ? fallbackLivePreviewUrl(sourceRun.livePreview) : "") ||
    String(sourceSetup.fallback_preview_url ?? sourceSetup.fallbackPreviewUrl ?? "").trim()
  );
}

function articleSystemSetupFailedPreviewUrl(
  run: VibeMarketingRunSummary,
  sourceRun?: VibeMarketingRunSummary | null,
) {
  const setup = articleSystemSetupPayload(run);
  const sourceSetup = sourceRun ? articleSystemSetupPayload(sourceRun) : {};
  return (
    String(run.livePreview?.failedPreviewUrl ?? "").trim() ||
    String(setup.failed_preview_url ?? setup.failedPreviewUrl ?? "").trim() ||
    stringResultValue(run, "failed_preview_url", "failedPreviewUrl") ||
    (sourceRun ? String(sourceRun.livePreview?.failedPreviewUrl ?? "").trim() : "") ||
    String(sourceSetup.failed_preview_url ?? sourceSetup.failedPreviewUrl ?? "").trim() ||
    (sourceRun ? stringResultValue(sourceRun, "failed_preview_url", "failedPreviewUrl") : "")
  );
}

function isTerminalAttentionStatus(status: string | null | undefined) {
  return RESUMABLE_ATTENTION_STATUSES.has(String(status ?? "").trim().toLowerCase());
}

function hasPendingArticlePreview(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow) || !run.componentManifest || hasReadyArticlePreview(run)) {
    return false;
  }
  const preview = run.livePreview;
  if (isContentOnlyNoRenderPreview(preview)) {
    return false;
  }
  if (isFailedArticlePreview(preview)) {
    return false;
  }
  return run.status === "completed" || hasActiveLivePreview(preview);
}

function statusPollNeedsFullRefresh(run: VibeMarketingRunSummary) {
  if (run.workflow === "article_system_setup" && isActiveArticleSystemSetupRun(run)) {
    return false;
  }
  if (run.status === "awaiting_confirmation" || run.status === "awaiting_approval" || run.status === "approval_required") {
    return true;
  }
  if (["completed", "failed", "blocked", "denied", "cancelled"].includes(run.status)) {
    return true;
  }
  if (run.previewUrl || run.prUrl || run.livePreview?.previewUrl || run.livePreview?.error) {
    return true;
  }
  return false;
}

function booleanFromUnknown(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "1", "yes"].includes(normalized)) return true;
    if (["false", "0", "no"].includes(normalized)) return false;
  }
  return null;
}

function accountEmailVerifiedFromAuthUser(authUser: Record<string, unknown>) {
  const explicitVerified =
    booleanFromUnknown(authUser.emailVerified) ??
    booleanFromUnknown(authUser.email_verified) ??
    booleanFromUnknown(authUser.isEmailVerified) ??
    booleanFromUnknown(authUser.is_email_verified) ??
    booleanFromUnknown(authUser.verifiedEmail) ??
    booleanFromUnknown(authUser.verified_email);

  if (explicitVerified !== null) return explicitVerified;

  return booleanFromUnknown(authUser.isActive) ?? booleanFromUnknown(authUser.is_active) ?? true;
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { authUser, appUser } = await requireVibeRaisingFounder(env, request);
  const companyId = resolveActiveCompanyId(appUser);
  const runId = params.runId ?? "";
  const bootstrap = await getVibeMarketingBootstrap(env, request, companyId, "summary");
  const run = await getVibeMarketingRun(env, request, runId, companyId).catch(async (error: unknown) => {
    if (isApiNotFoundError(error)) {
      // Daily-reminder links carry no company hint, so a run belonging to one
      // of the founder's OTHER companies 404s under the active one. Find the
      // owner, switch to it, and re-enter the page instead of dropping the
      // deep link.
      for (const company of appUser.companies ?? []) {
        if (!company.id || company.id === companyId) continue;
        const found = await getVibeMarketingRun(env, request, runId, company.id, "status").catch(() => null);
        if (found) {
          await setVibeRaisingActiveCompany(env, request, company.id);
          throw redirect(new URL(request.url).pathname + new URL(request.url).search);
        }
      }
      // A deleted/reset run (e.g. after an article-setup teardown) 404s here while a stale
      // wizard session still links to it. Redirect to the wizard instead of letting the 404
      // throw and SSR-500 the marketing page. (run-status.tsx handles the status-poll path.)
      throw redirect("/founder-tools/marketing");
    }
    throw error;
  });
  let githubRepos: VibeMarketingGithubReposResponse = { status: "unavailable", repos: [], repositories: [] };
  const shouldLoadGithubRepos = ["repo_scan", "content_factory_scan"].includes(run.workflow) && !setupRunIdForRun(run);
  if (shouldLoadGithubRepos) {
    try {
      githubRepos = await getVibeMarketingGithubRepos(env, request);
    } catch {
      githubRepos = { status: "unavailable", repos: [], repositories: [], error: "Repository list is unavailable." };
    }
  }
  const setupRunId = setupRunIdForRun(run);
  let setupRun: VibeMarketingRunSummary | null = null;
  if (setupRunId && setupRunId !== run.runId) {
    try {
      setupRun = await getVibeMarketingRun(env, request, setupRunId, companyId);
    } catch {
      setupRun = null;
    }
  }
  return {
    run,
    bootstrap,
    setupRun,
    githubRepos,
    accountEmail: appUser.email || authUser.email || null,
    accountEmailVerified: accountEmailVerifiedFromAuthUser(authUser as unknown as Record<string, unknown>),
    billingRequestIds: {
      articleJob: createVibeMarketingClientRequestId("vibe-article-job", runId),
    },
  };
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  // Switching the run-page sub-view (?setupStep=...) on the same run renders from
  // data the loader already returned. Skipping revalidation there avoids re-running
  // the heavy loader (bootstrap + full run + setup run + repos). Poll-driven
  // revalidator.revalidate() and post-action revalidations are NOT skipped.
  if (shouldSkipVibeMarketingRunRevalidation(args)) {
    return false;
  }
  return args.defaultShouldRevalidate;
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const companyId = resolveActiveCompanyId(appUser);
  const runId = params.runId ?? "";
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  try {
    if (intent === "connect-github") {
      const githubRepo = stringFromForm(formData, "githubRepo");
      const forceReconnect = stringFromForm(formData, "forceReconnect") === "true";
      const response = await connectVibeMarketingGithub(
        env,
        request,
        {
          ...(githubRepo && !forceReconnect ? { githubRepo, github_repo: githubRepo } : {}),
          ...(forceReconnect ? { forceReconnect: true, force_reconnect: true } : {}),
        },
      );
      const authUrl = response.auth_url ?? response.authUrl;
      if (authUrl) throw redirect(authUrl);
      if (forceReconnect) {
        return {
          intent,
          error:
            response.detail ??
            response.error ??
            "GitHub is connected, but we could not open the GitHub access settings. Use the repository dropdown if the repo is already listed.",
        };
      }
      throw redirect("/founder-tools/marketing/create?step=articleSystem");
    } else if (intent === "add-component-comment") {
      const targetRunId = stringFromForm(formData, "targetRunId") || runId;
      const comment = await addVibeMarketingComponentComment(env, request, targetRunId, componentCommentPayloadFromForm(formData));
      return { ok: true, comment };
    } else if (intent === "update-component-comment") {
      const commentId = stringFromForm(formData, "commentId");
      if (!commentId) return { intent, error: "Comment id is required." };
      const targetRunId = stringFromForm(formData, "targetRunId") || runId;
      const comment = await updateVibeMarketingComponentComment(env, request, targetRunId, commentId, componentCommentPayloadFromForm(formData));
      return { ok: true, comment };
    } else if (intent === "delete-component-comment") {
      const commentId = stringFromForm(formData, "commentId");
      if (!commentId) return { intent, error: "Comment id is required." };
      const targetRunId = stringFromForm(formData, "targetRunId") || runId;
      const componentFeedback = await deleteVibeMarketingComponentComment(env, request, targetRunId, commentId);
      return { ok: true, componentFeedback };
    } else if (intent === "submit-component-comments") {
      const result = await submitVibeMarketingComponentComments(env, request, runId);
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "submit-article-system-comments") {
      const setupRunId = stringFromForm(formData, "setupRunId") || runId;
      const result = await submitVibeMarketingArticleSystemComments(env, request, setupRunId, {
        body: stringFromForm(formData, "reviewComment"),
        feedbackBatchId: stringFromForm(formData, "feedbackBatchId"),
      });
      if (result.runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "accept-component-revision") {
      const sourceRunId = stringFromForm(formData, "sourceRunId");
      const result = await acceptVibeMarketingComponentRevision(env, request, runId, {
        batchId: stringFromForm(formData, "batchId"),
        sourceRunId,
      });
      const nextRunId = sourceRunId || result.runId;
      if (nextRunId && nextRunId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(nextRunId)}`);
      }
    } else if (intent === "start-live-preview") {
      const run = await startVibeMarketingLivePreview(env, request, runId, {
        force: stringFromForm(formData, "force") === "true",
        localRepoPath: stringFromForm(formData, "localRepoPath"),
      });
      if (run.runId && run.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`);
      }
      return { ok: true, run };
    } else if (intent === "cancel-article") {
      await controlVibeMarketingRun(env, request, runId, "cancel", { cleanup: true });
      throw redirect("/founder-tools/marketing/create?step=chooseArticle");
    } else if (intent === "cancel-scan") {
      await controlVibeMarketingRun(env, request, runId, "cancel", { cleanup: true, workflow: "repo_scan" });
      throw redirect("/founder-tools/marketing/create?step=articleSystem");
    } else if (intent === CANCEL_SETUP_BUILD_INTENT) {
      let setupRunId = stringFromForm(formData, "setupRunId");
      if (!setupRunId) {
        const currentRun = await getVibeMarketingRun(env, request, runId, companyId);
        if (currentRun.workflow === "article_system_setup") setupRunId = runId;
      }
      if (!setupRunId) return { intent, error: "No setup build was available to cancel." };
      await controlVibeMarketingRun(env, request, setupRunId, "cancel", {
        cleanup: true,
        workflow: "article_system_setup",
      });
      throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`);
    } else if (intent === "retry-scan") {
      const result = await controlVibeMarketingRun(env, request, runId, "resume", { workflow: "repo_scan" });
      if (result.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      return { intent, error: result.errors?.[0] || "Repository scan could not be retried." };
    } else if (intent === "start-scan") {
      const githubRepo = stringFromForm(formData, "githubRepo") || stringFromForm(formData, "github_repo");
      const articleSurfaceUrl = stringFromForm(formData, "articleSurfaceUrl") || stringFromForm(formData, "article_surface_url");
      const scanPurpose = stringFromForm(formData, "scanPurpose") || "inventory";
      if (!githubRepo) return { intent, error: "Choose a GitHub repository before scanning." };
      if (scanPurpose !== "inventory" && !articleSurfaceUrl) return { intent, error: "Enter the articles or blog URL before scanning." };
      const autoSetupPreview = scanPurpose === "setup";
      const result = await startVibeMarketingScan(env, request, {
        companyId,
        githubRepo,
        github_repo: githubRepo,
        scanPurpose,
        scan_purpose: scanPurpose,
        articleSurfaceMode: scanPurpose === "inventory" ? "not_sure" : "existing",
        article_surface_mode: scanPurpose === "inventory" ? "not_sure" : "existing",
        ...(scanPurpose === "inventory"
          ? {}
          : {
              articleSurfaceUrl,
              article_surface_url: articleSurfaceUrl,
            }),
        autoSetupPreview,
        auto_setup_preview: autoSetupPreview,
      });
      if (result.runId) {
        throw redirect(
          scanPurpose === "setup"
            ? `/founder-tools/marketing/create?step=articleSystem&scanRunId=${encodeURIComponent(result.runId)}`
            : `/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`,
        );
      }
      return { intent, error: result.error || result.errors?.[0] || "Repository scan could not be started." };
  } else if (intent === "confirm-article-surface" || intent === "create-article-surface") {
      const githubRepo = stringFromForm(formData, "githubRepo") || stringFromForm(formData, "github_repo");
      const articleSurfaceUrl = stringFromForm(formData, "articleSurfaceUrl") || stringFromForm(formData, "article_surface_url");
      if (!githubRepo) return { intent, error: "Choose a GitHub repository before continuing." };
      if (!articleSurfaceUrl) return { intent, error: "Choose or enter an article/blog route before continuing." };
      const result = await startVibeMarketingScan(env, request, {
        companyId,
        githubRepo,
        github_repo: githubRepo,
        scanPurpose: "setup",
        scan_purpose: "setup",
        articleSurfaceMode: intent === "create-article-surface" ? "none" : "existing",
        article_surface_mode: intent === "create-article-surface" ? "none" : "existing",
        articleSurfaceUrl,
        article_surface_url: articleSurfaceUrl,
        sourceScanRunId: runId,
        source_scan_run_id: runId,
	        autoSetupPreview: true,
	        auto_setup_preview: true,
	      });
	      if (result.runId) throw redirect(`/founder-tools/marketing/create?step=articleSystem&scanRunId=${encodeURIComponent(result.runId)}`);
	      return { intent, error: result.error || result.errors?.[0] || "Articles setup could not be started." };
    } else if (intent === "build-article-system-preview") {
      const result = await controlVibeMarketingRun(env, request, runId, "approve", { workflow: "repo_scan" });
      const setupRunId = setupRunIdForRun(result);
      if (setupRunId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(setupRunId)}`);
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "enable-daily-automation") {
      await controlVibeMarketingRun(env, request, runId, intent, {
        defaultTimezone: stringFromForm(formData, "defaultTimezone"),
      });
    } else if (intent === "run-daily-discovery-now") {
      const result = await replayVibeMarketingDaily(env, request, { companyId });
      if (result.runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "connect-channel") {
      const channelType = stringFromForm(formData, "channelType");
      if (!channelType) return { intent, error: "Choose a notification channel to connect." };
      await createNotificationChannel(env, request, {
        channelType,
        routeId: stringFromForm(formData, "routeId"),
      });
    } else if (intent === "verify-channel-otp") {
      const code = stringFromForm(formData, "code");
      if (!code) return { intent, error: "Enter the 6-digit code from WhatsApp." };
      await verifyNotificationChannelOtp(env, request, stringFromForm(formData, "channelId"), code);
    } else if (intent === "resend-channel-otp") {
      await resendNotificationChannelCode(env, request, stringFromForm(formData, "channelId"));
    } else if (intent === "remove-channel") {
      await removeNotificationChannel(env, request, stringFromForm(formData, "channelId"));
    } else if (["approve", "deny", "resume", "restart", "promote-bundle", "publish-pr", "merge-publish-pr", "merge-setup-pr", "refresh-setup-pr-status"].includes(intent)) {
      const sourceRunId = stringFromForm(formData, "sourceRunId");
      const targetRunId = stringFromForm(formData, "targetRunId");
      const autoMerge =
        stringFromForm(formData, "autoMerge") === "true" &&
        ["approve", "promote-bundle", "publish-pr"].includes(intent);
      const controlRunId =
        intent === "promote-bundle" || intent === "publish-pr"
          ? sourceRunId || runId
          : (intent === "resume" || intent === "restart") && targetRunId
            ? targetRunId
            : runId;
      const payload: Record<string, unknown> = { companyId };
      if (sourceRunId) payload.sourceRunId = sourceRunId;
      if (autoMerge) payload.autoMerge = true;
      const result = await controlVibeMarketingRun(env, request, controlRunId, intent, payload);
      if ((intent === "merge-setup-pr" || intent === "refresh-setup-pr-status") && isArticleSystemSetupMerged(result)) {
        throw redirect("/founder-tools/marketing?setupMerged=1");
      }
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "delivery-mode") {
      await controlVibeMarketingRun(env, request, runId, "delivery-mode", {
        deliveryMode: String(formData.get("deliveryMode") ?? ""),
      });
    } else if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request, companyId);
      if (isArticleSystemSetupBlocked(bootstrap)) {
        return { intent, error: "Publish the articles setup before generating articles. If you've already published it, refresh status." };
      }
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const isCustomTopic = !topicCandidateId || topicCandidateId === "__custom__";
      const selectedCandidate =
        !isCustomTopic
          ? bootstrap.topicCandidates.find((candidate) => candidate.id === topicCandidateId) ?? null
          : null;
      const candidateTitle = stringFromForm(formData, "candidateTitle");
      const candidateKeyword = stringFromForm(formData, "candidateKeyword");
      const customTitle = stringFromForm(formData, "customTitle") || candidateTitle || selectedCandidate?.title || "";
      const targetKeyword = stringFromForm(formData, "targetKeyword") || candidateKeyword || selectedCandidate?.keyword || customTitle;
      const topic = customTitle || targetKeyword;
      if (!topic && !targetKeyword) {
        return { intent, error: "Choose a discovered topic or enter a custom title or keyword before generating an article." };
      }
      const deliveryModeExplicit = stringFromForm(formData, "deliveryModeExplicit") === "true";
      const result = await startVibeMarketingArticle(env, request, {
        companyId,
        clientRequestId: stringFromForm(formData, "clientRequestId"),
        client_request_id: stringFromForm(formData, "clientRequestId"),
        topic,
        targetKeyword,
        customTitle,
        selectedTitle: selectedCandidate?.title || candidateTitle,
        topicCandidateId,
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: deliveryModeExplicit ? stringFromForm(formData, "deliveryMode") || effectiveArticleDeliveryMode(bootstrap) : undefined,
        deliveryModeExplicit,
        deliveryModeConfirmed: deliveryModeExplicit,
        sourceRunId: isCustomTopic ? "" : selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceRunId") || runId,
      });
      if (result.runId) throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    return {
      intent,
      error:
        error?.data?.detail ??
        error?.response?.data?.detail ??
        error?.message ??
        "Run action failed.",
    };
  }

  throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(runId)}`);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function componentCommentPayloadFromForm(formData: FormData) {
  const anchor = componentCommentAnchorFromForm(formData);
  const context = componentCommentContextFromForm(formData);
  return {
    componentId: stringFromForm(formData, "componentId"),
    componentType: stringFromForm(formData, "componentType"),
    componentLabel: stringFromForm(formData, "componentLabel"),
    sourceSectionId: stringFromForm(formData, "sourceSectionId"),
    selector: stringFromForm(formData, "selector"),
    ...(anchor ? { anchor } : {}),
    ...(context ? { context } : {}),
    body: stringFromForm(formData, "body"),
  };
}

function componentCommentAnchorFromForm(formData: FormData): VibeMarketingComponentCommentAnchor | null {
  const raw = stringFromForm(formData, "anchor");
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as Record<string, unknown>;
    const x = typeof payload.x === "number" ? payload.x : Number(payload.x);
    const y = typeof payload.y === "number" ? payload.y : Number(payload.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
      createdFrom: typeof payload.createdFrom === "string" ? payload.createdFrom : "live_preview_click",
    };
  } catch {
    return null;
  }
}

function componentCommentContextFromForm(formData: FormData): VibeMarketingComponentCommentContext | null {
  const raw = stringFromForm(formData, "context");
  if (!raw) return null;
  try {
    const payload = JSON.parse(raw) as unknown;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
    return commentContextFromPayload(payload as Record<string, unknown>, null);
  } catch {
    return null;
  }
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function appendCandidateSource(target: unknown[], value: unknown) {
  if (Array.isArray(value)) {
    target.push(...value);
  } else if (value && typeof value === "object") {
    target.push(value);
  } else if (typeof value === "string" && value.trim()) {
    target.push(value);
  }
}

function topicCandidatesFromRun(run: { result?: Record<string, unknown>; runId: string }): VibeMarketingTopicCandidate[] {
  const result = run.result ?? {};
  const rawCandidates: unknown[] = [];
  for (const source of [result, result.selection, result.selection_data]) {
    if (!source || typeof source !== "object" || Array.isArray(source)) continue;
    const mapping = source as Record<string, unknown>;
    appendCandidateSource(
      rawCandidates,
      mapping.options ??
        mapping.topic_options ??
        mapping.topics ??
        mapping.topic_candidates ??
        mapping.candidates ??
        mapping.keywords ??
        mapping.keyword_options,
    );
    appendCandidateSource(rawCandidates, mapping.selected);
  }
  const candidates = rawCandidates
    .map((raw, index): VibeMarketingTopicCandidate | null => {
      if (typeof raw === "string") {
        return { id: String(index), rawCandidateId: String(index), keyword: raw, title: raw, sourceRunId: run.runId };
      }
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
      const payload = raw as Record<string, unknown>;
      const keyword =
        asString(payload.keyword) ||
        asString(payload.target_keyword) ||
        asString(payload.targetKeyword) ||
        asString(payload.query) ||
        asString(payload.topic) ||
        asString(payload.title);
      const title =
        asString(payload.title) ||
        asString(payload.suggested_title) ||
        asString(payload.suggestedTitle) ||
        asString(payload.angle) ||
        asString(payload.headline) ||
        keyword;
      if (!keyword && !title) return null;
      return {
        id: asString(payload.id) || asString(payload.keyword_id) || String(index),
        rawCandidateId: asString(payload.id) || asString(payload.keyword_id) || String(index),
        keyword: keyword || title,
        title: title || keyword,
        reason: asString(payload.reason) || asString(payload.selection_reason) || asString(payload.rationale),
        audience: asString(payload.audience) || asString(payload.target_audience) || asString(payload.targetAudience),
        confidence: asString(payload.confidence),
        trend: payload.trend ?? payload.search_trend,
        interest: payload.interest ?? payload.interest_trend,
        aiSearches: payload.aiSearches ?? payload.ai_searches ?? payload.ai_search_volume,
        source: asString(payload.source) || "discovery",
        sourceRunId: asString(payload.source_run_id) || asString(payload.sourceRunId) || run.runId,
        intent: payload.intent,
        difficulty: payload.difficulty,
        difficultySource: payload.difficultySource ?? payload.difficulty_source,
        opportunityScore: payload.opportunityScore ?? payload.opportunity_score,
        volume: payload.volume,
      };
    })
    .filter((candidate): candidate is VibeMarketingTopicCandidate => candidate !== null);
  return canonicalizeTopicCandidates(candidates, "topic");
}

function StepStatusDot({ status }: { status: string }) {
  const isComplete = status === "completed" || status === "skipped";
  const isFailed = ["failed", "blocked", "cancelled"].includes(status);
  return (
    <span
      className={clsx(
        "mt-1 h-3 w-3 flex-shrink-0 rounded-full",
        isComplete && "bg-emerald-500",
        isFailed && "bg-red-500",
        !isComplete && !isFailed && "bg-violet-300",
      )}
    />
  );
}

function RunStepTimeline({ run, framed = true }: { run: VibeMarketingRunSummary; framed?: boolean }) {
  return (
    <section className={framed ? "rounded-xl border border-gray-200 bg-white p-5 shadow-sm" : ""}>
      <h2 className="text-lg font-black text-gray-950">Step timeline</h2>
      {run.steps.length > 0 ? (
        <ol className="mt-5 space-y-4">
          {run.steps.map((step) => (
            <li key={step.key} className="flex gap-3">
              <StepStatusDot status={step.status} />
              <div className="min-w-0 flex-1 border-b border-gray-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-black text-gray-950">{step.name}</p>
                  <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                    {step.status.replace(/_/g, " ")}
                  </span>
                </div>
                {step.message ? <p className="mt-1 text-sm text-gray-600">{step.message}</p> : null}
                {step.error ? <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{step.error}</p> : null}
                {step.artifacts.length > 0 ? (
                  <p className="mt-2 text-xs font-semibold text-gray-500">{step.artifacts.length} artifacts</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 rounded-xl bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500">
          No step details have been reported yet.
        </p>
      )}
    </section>
  );
}

function RunApprovalActions({
  isSubmitting,
  isActionPending,
  approveLabel = "Approve",
  denyLabel = "Deny",
}: {
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
  approveLabel?: string;
  denyLabel?: string;
}) {
  const approvePending = isActionPending?.("approve") ?? isSubmitting;
  const denyPending = isActionPending?.("deny") ?? isSubmitting;
  return (
    <div className="flex flex-wrap gap-2">
      <Form method="POST">
        <button
          type="submit"
          name="intent"
          value="deny"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
        >
          {denyPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <XCircleIcon className="h-4 w-4" />}
          {denyPending ? "Denying..." : denyLabel}
        </button>
      </Form>
      <Form method="POST">
        <button
          type="submit"
          name="intent"
          value="approve"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {approvePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
          {approvePending ? "Approving..." : approveLabel}
        </button>
      </Form>
    </div>
  );
}

function PublishApprovalPanel({
  run,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const previewUrl = run.previewUrl || stringResultValue(run, "preview_url", "previewUrl", "article_url", "articleUrl");
  const prUrl = run.prUrl || stringResultValue(run, "pr_url", "prUrl", "pull_request_url", "pullRequestUrl");

  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-emerald-950">Publish approval</h2>
          <p className="mt-2 font-semibold">
            Review the preview or PR evidence, then approve publication or deny this run.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {previewUrl ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                Open preview
              </a>
            ) : null}
            {prUrl ? (
              <a
                href={prUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                Open PR
              </a>
            ) : null}
          </div>
        </div>
        <RunApprovalActions isSubmitting={isSubmitting} isActionPending={isActionPending} approveLabel="Approve publish" denyLabel="Deny publish" />
      </div>
    </section>
  );
}

function arrayResultValue(run: VibeMarketingRunSummary, key: string) {
  const value = run.result?.[key];
  if (Array.isArray(value)) return value;
  const nestedResult = run.result?.["result"];
  if (nestedResult && typeof nestedResult === "object") {
    const nestedValue = (nestedResult as Record<string, unknown>)[key];
    if (Array.isArray(nestedValue)) return nestedValue;
  }
  return [];
}

function articleSystemSetupPayload(run: VibeMarketingRunSummary) {
  const direct = run.result?.["article_system_setup"];
  if (direct && typeof direct === "object" && !Array.isArray(direct)) return direct as Record<string, unknown>;
  const nestedResult = run.result?.["result"];
  if (nestedResult && typeof nestedResult === "object") {
    const nested = (nestedResult as Record<string, unknown>)["article_system_setup"];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) return nested as Record<string, unknown>;
  }
  const latestControl = run.result?.["latest_control_response"];
  if (latestControl && typeof latestControl === "object") {
    const nested = (latestControl as Record<string, unknown>)["article_system_setup"];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) return nested as Record<string, unknown>;
  }
  return {};
}

function articleSystemSetupStatus(run: VibeMarketingRunSummary) {
  const setup = articleSystemSetupPayload(run);
  return String(
    setup.status ??
      run.result?.["setup_status"] ??
      run.result?.["setupStatus"] ??
      run.result?.["status"] ??
      run.currentStep ??
      run.status ??
      "",
  )
    .trim()
    .toLowerCase();
}

function articleSystemSetupString(run: VibeMarketingRunSummary, ...keys: string[]) {
  const setup = articleSystemSetupPayload(run);
  for (const key of keys) {
    const setupValue = setup[key];
    if (typeof setupValue === "string" && setupValue.trim()) return setupValue.trim();
    if (typeof setupValue === "number" && Number.isFinite(setupValue)) return String(setupValue);
  }
  return stringResultValue(run, ...keys);
}

function articleSystemSetupPrUrl(run: VibeMarketingRunSummary) {
  return (
    run.prUrl?.trim() ||
    articleSystemSetupString(run, "pr_url", "prUrl", "pull_request_url", "pullRequestUrl", "draft_pr_url", "draftPrUrl")
  );
}

function articleSystemSetupPrNumber(run: VibeMarketingRunSummary) {
  const direct = articleSystemSetupString(run, "pr_number", "prNumber", "pull_request_number", "pullRequestNumber", "draft_pr_number", "draftPrNumber");
  return direct || prNumberFromPullUrl(articleSystemSetupPrUrl(run));
}

function articleSystemSetupMergeStatus(run: VibeMarketingRunSummary) {
  return articleSystemSetupString(run, "merge_status", "mergeStatus", "checks_status", "checksStatus").toLowerCase();
}

function isArticleSystemSetupMerged(run: VibeMarketingRunSummary) {
  const setupStatus = articleSystemSetupStatus(run);
  const mergeStatus = articleSystemSetupMergeStatus(run);
  return mergeStatus === "merged" || ARTICLE_SETUP_MERGED_STATUSES.has(setupStatus);
}

function isArticleSystemSetupPublishState(run: VibeMarketingRunSummary) {
  const setupStatus = articleSystemSetupStatus(run);
  return Boolean(
    ARTICLE_SETUP_PUBLISH_STATUSES.has(setupStatus) ||
      articleSystemSetupPrUrl(run) ||
      articleSystemSetupMergeStatus(run) === "merged",
  );
}

function isActiveArticleSystemSetupRun(run: VibeMarketingRunSummary) {
  if (run.workflow !== "article_system_setup") return false;
  const setupStatus = articleSystemSetupStatus(run);
  const setupStep = articleSystemSetupCurrentStep(run).toLowerCase();
  return (
    ARTICLE_SETUP_ACTIVE_STATUSES.has(run.status) ||
    ARTICLE_SETUP_ACTIVE_STATUSES.has(setupStatus) ||
    ARTICLE_SETUP_ACTIVE_STATUSES.has(setupStep) ||
    POLLING_STATUSES.has(run.status)
  );
}

function articleSystemSetupCurrentStep(run: VibeMarketingRunSummary) {
  const setup = articleSystemSetupPayload(run);
  return String(
    setup.current_step ??
      setup.currentStep ??
      run.result?.["current_step"] ??
      run.result?.["currentStep"] ??
      run.currentStep ??
      "",
  ).trim();
}

function articleSystemSetupFailureStep(run: VibeMarketingRunSummary) {
  const setup = articleSystemSetupPayload(run);
  return String(
    setup.failed_step ??
      setup.failedStep ??
      setup.failed_phase ??
      setup.failedPhase ??
      setup.failure_step ??
      setup.failureStep ??
      run.result?.["failed_step"] ??
      run.result?.["failedStep"] ??
      run.result?.["failed_phase"] ??
      run.result?.["failedPhase"] ??
      run.result?.["failure_step"] ??
      run.result?.["failureStep"] ??
      run.livePreview?.failedPhase ??
      "",
  ).trim();
}

function articleSystemSetupFailureKind(run: VibeMarketingRunSummary) {
  const setup = articleSystemSetupPayload(run);
  return String(
    setup.failure_kind ??
      setup.failureKind ??
      run.result?.["failure_kind"] ??
      run.result?.["failureKind"] ??
      run.livePreview?.failureKind ??
      "",
  ).trim();
}

function articleSurfaceRouteFromRun(run: VibeMarketingRunSummary) {
  const direct = run.routePath?.trim() || stringResultValue(run, "route_path", "routePath");
  if (direct) return direct;
  const hint = run.result?.["article_surface_hint"];
  if (hint && typeof hint === "object" && !Array.isArray(hint)) {
    const route = (hint as Record<string, unknown>).route_path ?? (hint as Record<string, unknown>).routePath;
    if (typeof route === "string" && route.trim()) return route.trim();
  }
  return "";
}

function ArticleSystemScanFormPanel({
  run,
  bootstrap,
  githubRepos,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  bootstrap: VibeMarketingBootstrap;
  githubRepos: VibeMarketingGithubReposResponse;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const selectedRepo =
    run.githubRepo ||
    stringResultValue(run, "github_repo", "githubRepo") ||
    "";

  return (
    <ArticleSystemConnectionPanel
      bootstrap={bootstrap}
      githubRepos={githubRepos}
      isSubmitting={isSubmitting}
      isActionPending={isActionPending}
      repoSelection={selectedRepo}
      articleSurfaceDefault={articleSurfaceRouteFromRun(run) || "/articles"}
      articleSurfacePlaceholder="/articles"
      scanRun={run}
      articleSetupState={bootstrap.articleSetupState}
      showDenySetupAction
    />
  );
}

function setupBuildCancelActionSlot(
  run: VibeMarketingRunSummary,
  isSubmitting: boolean,
  isActionPending?: (...keys: string[]) => boolean,
): ReactNode {
  if (!canCancelSetupBuild(run)) return null;
  return (
    <CancelSetupBuildButton
      run={run}
      pending={isActionPending?.(CANCEL_SETUP_BUILD_INTENT) ?? false}
      disabled={isSubmitting}
    />
  );
}

function ArticleSystemSetupPreviewPanel({
  run,
  sourceRun,
  selectedComponent,
  onSelectComponent,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  sourceRun?: VibeMarketingRunSummary | null;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const setup = articleSystemSetupPayload(run);
  const source = sourceRun ?? run;
  const repo = run.githubRepo || source.githubRepo || stringResultValue(run, "github_repo", "githubRepo") || stringResultValue(source, "github_repo", "githubRepo");
  const route =
    run.routePath ||
    source.routePath ||
    stringResultValue(run, "route_path", "routePath") ||
    stringResultValue(source, "route_path", "routePath") ||
    (() => {
      const hint = source.result?.["article_surface_hint"];
      return hint && typeof hint === "object" ? String((hint as Record<string, unknown>).route_path ?? "") : "";
    })();
  const prUrl = run.prUrl || stringResultValue(run, "pr_url", "prUrl") || stringResultValue(source, "pr_url", "prUrl");
  const previewUrl = articleSystemSetupExactPreviewUrl(run, source);
  const fallbackPreviewUrl = articleSystemSetupFallbackPreviewUrl(run, source);
  const setupRunId = setupRunIdForRun(run) || setupRunIdForRun(source) || run.runId;
  const setupStatus = (
    stringResultValue(run, "status", "setupStatus", "setup_status") ||
    String(setup.status ?? "") ||
    run.currentStep ||
    run.status ||
    ""
  ).trim().toLowerCase();
  const rescanRunId = stringResultValue(run, "rescan_run_id", "rescanRunId") || String(setup.rescan_run_id ?? setup.rescanRunId ?? "");
  const manualMergeRequired = setupStatus === "manual_merge_required" || run.currentStep === "manual_merge_required";
  const setupMerged = !manualMergeRequired && isArticleSystemSetupMerged(run);
  const setupAlreadyApproved = Boolean(isArticleSystemSetupPublishState(run) || isArticleSystemSetupMerged(run) || run.approvalState === "approved");
  const changedFiles = [
    ...arrayResultValue(run, "changed_files_preview"),
    ...(Array.isArray(setup.changed_files_preview) ? setup.changed_files_preview : []),
  ]
    .map((item) => String(item ?? "").trim())
    .filter(Boolean)
    .slice(0, 8);
  const setupExactPreviewReady = Boolean(
    previewUrl &&
      (
        setupStatus === "preview_ready" ||
        setupAlreadyApproved ||
        run.livePreview?.exactRender === true ||
        source.livePreview?.exactRender === true
      ),
  );
  // Server-rendered stacks (FastAPI/Django/Rails/...) get no hosted preview shape;
  // Content Factory parks the run in "code_review_ready" and the reviewable surface
  // is the setup branch diff, so approval proceeds without a preview URL.
  const setupCodeReviewReady = Boolean(
    !setupAlreadyApproved &&
      setupStatus === "code_review_ready" &&
      (run.status === "awaiting_approval" || run.status === "approval_required"),
  );
  const previewUnsupportedReason =
    stringResultValue(run, "preview_unsupported_reason", "previewUnsupportedReason") ||
    String(setup.preview_unsupported_reason ?? setup.previewUnsupportedReason ?? "");
  const setupBranchName =
    stringResultValue(run, "branch_name", "branchName") || String(setup.branch_name ?? setup.branchName ?? "");
  const setupBranchUrl = repo && setupBranchName ? `https://github.com/${repo}/tree/${setupBranchName}` : "";
  const canApprove = Boolean(
    !setupAlreadyApproved &&
      (setupExactPreviewReady || setupCodeReviewReady) &&
      (run.status === "awaiting_approval" || run.status === "approval_required"),
  );
  const setupCompleted = setupMerged;
  const previewReady = setupExactPreviewReady;
  const setupTerminalFailure = ["blocked", "failed"].includes(run.status) || ARTICLE_SETUP_FAILED_STATUSES.has(setupStatus);
  const previewActive = !setupTerminalFailure && hasActiveLivePreview(run.livePreview);
  const previewFailed =
    setupTerminalFailure ||
    Boolean(fallbackPreviewUrl) ||
    ARTICLE_SETUP_FALLBACK_STATUSES.has(setupStatus) ||
    isFailedArticlePreview(run.livePreview);

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">Articles setup preview</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
            Review the drafted articles/blogs setup before it's published to the website repo.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
            {repo ? <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{repo}</span> : null}
            {route ? <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">{route}</span> : null}
            {prUrl ? (
              <a href={prUrl} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:text-emerald-900">
                View changes
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {changedFiles.length ? (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-sm font-black text-gray-950">Planned setup files</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {changedFiles.map((file) => (
              <span key={file} className="rounded-lg bg-white px-3 py-2 font-mono text-xs font-semibold text-gray-600 shadow-sm">
                {file}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {previewReady ? (
        <LivePreviewCommentInspectorPanel
          run={run}
          targetRunId={setupRunId}
          selectedComponent={selectedComponent}
          onSelectComponent={onSelectComponent}
          previewUrlFallback={previewUrl}
          previewTitle="Articles setup preview"
          reviewTitle="Articles setup comments"
          draftNoun="revision pin"
          emptyDraftText="0 draft revision pins ready for review."
          submittedRetryText="Submitted revision comments are ready to retry."
          waitingBridgeText="Waiting for revision bridge"
          requiresExactPreview
          readOnly={setupAlreadyApproved}
          unavailableSlot={
            <ArticleSystemSetupPreviewUnavailable
              run={run}
              previewUrl={previewUrl}
              fallbackPreviewUrl={fallbackPreviewUrl}
              isSubmitting={isSubmitting}
              isActionPending={isActionPending}
            />
          }
          actionSlot={(reviewState) => {
            if (setupAlreadyApproved) return null;
            const needsCommentSubmitFirst = reviewState.draftComments.length > 0 || reviewState.hasPendingRevisionBatch;
            const approveDisabled = isSubmitting || needsCommentSubmitFirst || !previewUrl;
            const submitCommentsPending = isActionPending?.("submit-article-system-comments") ?? isSubmitting;
            const denyPending = isActionPending?.("deny") ?? isSubmitting;
            const approvePending = isActionPending?.("approve") ?? isSubmitting;
            return (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Form method="POST">
                  <input type="hidden" name="setupRunId" value={setupRunId} />
                  <button
                    type="submit"
                    name="intent"
                    value="submit-article-system-comments"
                    disabled={isSubmitting || !reviewState.canSendRevisionRequest}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-40 sm:w-auto"
                  >
                    {submitCommentsPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                    {submitCommentsPending ? "Sending..." : reviewState.canRetrySubmittedBatch ? "Retry revision comments" : "Send revision comments"}
                  </button>
                </Form>
                {canApprove ? (
                  <>
                    <Form method="POST">
                      <button
                        type="submit"
                        name="intent"
                        value="deny"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50 sm:w-auto"
                      >
                        {denyPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <XCircleIcon className="h-4 w-4" />}
                        {denyPending ? "Rejecting..." : "Reject setup"}
                      </button>
                    </Form>
                    <Form method="POST">
                      <button
                        type="submit"
                        name="intent"
                        value="approve"
                        disabled={approveDisabled}
                        title={needsCommentSubmitFirst ? "Send or clear draft revision comments before approving." : undefined}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                      >
                        {approvePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                        {approvePending ? "Approving..." : "Approve setup and create PR"}
                      </button>
                    </Form>
                  </>
                ) : null}
              </div>
            );
          }}
        />
      ) : setupCodeReviewReady ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-sm font-black text-violet-950">Review the code changes to approve this setup</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-violet-900">
              {previewUnsupportedReason ||
                "A live preview isn't supported for this site's stack yet, so the setup is reviewed from its code changes instead."}
            </p>
            {setupBranchUrl ? (
              <a
                href={setupBranchUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-violet-800 shadow-sm transition hover:bg-violet-100"
              >
                Review the branch on GitHub
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            ) : null}
          </div>
          {canApprove ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Form method="POST">
                <button
                  type="submit"
                  name="intent"
                  value="deny"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50 sm:w-auto"
                >
                  {(isActionPending?.("deny") ?? isSubmitting) ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <XCircleIcon className="h-4 w-4" />}
                  {(isActionPending?.("deny") ?? isSubmitting) ? "Rejecting..." : "Reject setup"}
                </button>
              </Form>
              <Form method="POST">
                <button
                  type="submit"
                  name="intent"
                  value="approve"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                >
                  {(isActionPending?.("approve") ?? isSubmitting) ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                  {(isActionPending?.("approve") ?? isSubmitting) ? "Approving..." : "Approve setup and create PR"}
                </button>
              </Form>
            </div>
          ) : null}
        </div>
      ) : !setupCompleted ? (
        <div className="space-y-4">
          {previewFailed ? (
            <ArticleSystemSetupPreviewUnavailable
              run={run}
              previewUrl={previewUrl}
              fallbackPreviewUrl={fallbackPreviewUrl}
              isSubmitting={isSubmitting}
              isActionPending={isActionPending}
            />
          ) : (
            <ArticlesSetupProgressCard
              run={run}
              actionSlot={setupBuildCancelActionSlot(run, isSubmitting, isActionPending)}
            />
          )}
        </div>
      ) : null}

      {manualMergeRequired ? (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-amber-950">Publishing needs a quick manual step</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-amber-800">
              Open the changes in GitHub to finish publishing, then refresh status to unlock article generation.
            </p>
          </div>
          {prUrl ? (
            <a
              href={prUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-amber-700"
            >
              View changes
            </a>
          ) : null}
        </div>
      ) : setupCompleted ? (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-emerald-950">Articles setup is complete</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-emerald-800">
              Choose a topic to generate the next article.
            </p>
          </div>
          {rescanRunId ? (
            <Link
              to={`/founder-tools/marketing/runs/${encodeURIComponent(rescanRunId)}`}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
            >
              View verification scan
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function ArticleSetupGenerateDetail({
  run,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  return (
    <ArticlesSetupProgressCard
      run={run}
      actionSlot={setupBuildCancelActionSlot(run, isSubmitting, isActionPending)}
    />
  );
}

function ArticleSystemSetupPreviewUnavailable({
  run,
  previewUrl,
  fallbackPreviewUrl,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  previewUrl?: string | null;
  fallbackPreviewUrl?: string | null;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const preview = run.livePreview;
  const diagnosticFallbackUrl = String(fallbackPreviewUrl || fallbackLivePreviewUrl(preview) || "").trim();
  const failedPreviewUrl = articleSystemSetupFailedPreviewUrl(run);
  const setup = articleSystemSetupPayload(run);
  const setupStatus = articleSystemSetupStatus(run);
  const setupActive = isActiveArticleSystemSetupRun(run);
  const setupCurrentStep = articleSystemSetupCurrentStep(run);
  const fallbackStatus = ARTICLE_SETUP_FALLBACK_STATUSES.has(setupStatus);
  const previewStatus = String(
    setupActive
      ? setupCurrentStep || run.currentStep || run.status || "running"
      : setupStatus || preview?.status || run.status || "building",
  ).replace(/_/g, " ");
  const terminalFailure =
    !setupActive &&
    (isFailedArticlePreview(preview) ||
      ["blocked", "failed"].includes(run.status) ||
      ARTICLE_SETUP_FAILED_STATUSES.has(setupStatus) ||
      Boolean(failedPreviewUrl));
  const previewActive = setupActive || (!terminalFailure && hasActiveLivePreview(preview));
  const currentErrorCode = String(
    run.errorCode ||
      stringResultValue(run, "error_code", "errorCode") ||
      setup.error_code ||
      setup.errorCode ||
      "",
  ).trim();
  const previewErrorCode = String(preview?.errorCode || "").trim();
  const currentRunError = String(
    run.errors?.[0] ||
      stringResultValue(run, "error", "message") ||
      setup.error ||
      setup.message ||
      "",
  ).trim();
  const previewError = String(preview?.error || "").trim();
  const failureStep = articleSystemSetupFailureStep(run);
  const failureKind = articleSystemSetupFailureKind(run);
  const previewFailureDetails = formatPreviewFailureDetails(
    setup.preview_failure_details ??
      setup.previewFailureDetails ??
      run.result?.["preview_failure_details"] ??
      run.result?.["previewFailureDetails"] ??
      "",
    { includeStepKind: false },
  );
  const rawError = terminalFailure
    ? previewFailureDetails ||
      currentRunError ||
      previewError ||
      currentErrorCode ||
      (setupStatus === "preview_failed" ? "Directory browser verification failed before setup approval." : "")
    : previewError || currentRunError;
  const isGithubAppWriteAccessError =
    currentErrorCode === "GITHUB_APP_WRITE_ACCESS_REQUIRED" ||
      (!currentErrorCode && /GITHUB_APP_WRITE_ACCESS_REQUIRED|Write access denied|Contents:\s*Read\/Write|Pull requests:\s*Read\/Write/i.test(rawError));
  const isNextAppRootLayoutMissing = currentErrorCode === "NEXT_APP_ROOT_LAYOUT_MISSING" || previewErrorCode === "NEXT_APP_ROOT_LAYOUT_MISSING";
  const fallbackMessage = diagnosticFallbackUrl || fallbackStatus
    ? "A diagnostic fallback preview is available, but it is not the real deployed Next.js page and cannot be approved."
    : "";
  const setupRetryable = Boolean(run.stale || run.retryAvailable || run.resumeAvailable);
  const retryIntent = setupRetryable ? "resume" : "start-live-preview";
  const actionRetryPending = isActionPending?.(retryIntent) ?? isSubmitting;
  const error = fallbackMessage ||
    (previewActive || actionRetryPending
    ? ""
    : isGithubAppWriteAccessError
      ? "MLAI Tools can read this repository, but needs Contents: Read/Write and Pull requests: Read/Write to publish the articles setup."
      : isNextAppRootLayoutMissing
        ? "Content Factory found a Next.js App Router project but could not confirm a root app/layout.* file from the latest repository context. Re-run the repository scan, then retry setup."
      : rawError || (terminalFailure ? "The articles setup build did not advance." : ""));
  const logsUrl = preview?.logsUrl || preview?.builderRunUrl;
  const retryPreviewPending = previewActive || actionRetryPending;
  const setupRunning = retryPreviewPending || setupActive;
  const setupVerifying =
    setupStatus === "preview_verifying" ||
    setupStatus === "repair_preview_building" ||
    setupCurrentStep === "verify_directory_browser" ||
    setupCurrentStep === "browser_repair";
  const hasDiagnosticFallback = Boolean(diagnosticFallbackUrl) || fallbackStatus;
  const title = hasDiagnosticFallback
    ? "Exact articles preview is not ready"
    : setupRunning
      ? setupVerifying
        ? "Verifying articles setup preview"
        : "Articles setup is running"
      : error
        ? setupStatus === "preview_failed" || failedPreviewUrl
          ? "Articles setup preview failed verification"
          : setupRetryable
            ? "Articles setup build did not advance"
            : "Articles setup preview could not be prepared"
        : "Articles setup preview is being built";
  const githubAccessHref = `/founder-tools/marketing/github-connect?forceReconnect=true&returnTo=${encodeURIComponent(`/founder-tools/marketing/runs/${run.runId}`)}`;
  if (previewUrl) return null;
  return (
    <div className={clsx(
      "rounded-xl border px-4 py-5 text-sm font-semibold",
      hasDiagnosticFallback
        ? "border-amber-200 bg-amber-50 text-amber-900"
          : error
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-violet-100 bg-violet-50 text-violet-800",
    )}>
      <p className="font-black">{title}</p>
      <p className="mt-1">
        {setupRunning
          ? `Current setup step: ${previewStatus || "running"}. Refreshing this page is safe.`
          : previewActive
            ? "Waiting for GitHub Actions to finish. Refreshing this page is safe."
            : `Preview status: ${previewStatus}. Refreshing this page is safe.`}
      </p>
      {failureStep && error ? <p className="mt-2 text-xs font-black uppercase">Failed step: {failureStep.replace(/_/g, " ")}</p> : null}
      {failureKind && error ? <p className="mt-1 text-xs font-black uppercase">Failure kind: {failureKind.replace(/_/g, " ")}</p> : null}
      {error ? <p className="mt-2 break-words font-mono text-xs">{error}</p> : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {diagnosticFallbackUrl ? (
          <a
            href={diagnosticFallbackUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-black text-amber-900 shadow-sm transition hover:bg-amber-100"
          >
            Open diagnostic fallback
          </a>
        ) : null}
        {failedPreviewUrl ? (
          <a
            href={failedPreviewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100"
          >
            Open failed preview
          </a>
        ) : null}
        {logsUrl ? (
          <a
            href={logsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100"
          >
            Open GitHub Actions logs
          </a>
        ) : null}
        {isGithubAppWriteAccessError ? (
          <Link
            to={githubAccessHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100"
          >
            Update GitHub App access
          </Link>
        ) : null}
        {error ? (
          <Form method="POST">
            {setupRetryable ? null : <input type="hidden" name="force" value="true" />}
            <button
              type="submit"
              name="intent"
              value={retryIntent}
              disabled={retryPreviewPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-800 disabled:opacity-50 sm:w-auto"
            >
              {retryPreviewPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
              {retryPreviewPending ? "Retrying..." : setupRetryable ? "Retry setup build" : "Retry preview build"}
            </button>
          </Form>
        ) : null}
        {setupBuildCancelActionSlot(run, isSubmitting, isActionPending)}
      </div>
    </div>
  );
}

interface InspectorRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface InspectorComponentMeasurement extends VibeMarketingComponentManifestItem {
  rect: InspectorRect;
}

interface PendingCommentPin {
  component: VibeMarketingComponentManifestItem;
  anchor: VibeMarketingComponentCommentAnchor;
  context?: VibeMarketingComponentCommentContext | null;
}

function numberFromPayload(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function rectFromPayload(value: unknown): InspectorRect | null {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  if (!payload) return null;
  const left = numberFromPayload(payload.left);
  const top = numberFromPayload(payload.top);
  const width = numberFromPayload(payload.width);
  const height = numberFromPayload(payload.height);
  if (left === null || top === null || width === null || height === null) return null;
  return {
    left,
    top,
    width,
    height,
    right: numberFromPayload(payload.right) ?? left + width,
    bottom: numberFromPayload(payload.bottom) ?? top + height,
  };
}

function anchorFromPayload(value: unknown): VibeMarketingComponentCommentAnchor | null {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  if (!payload) return null;
  const x = numberFromPayload(payload.x);
  const y = numberFromPayload(payload.y);
  if (x === null || y === null) return null;
  return {
    x: Math.max(0, Math.min(1, x)),
    y: Math.max(0, Math.min(1, y)),
    createdFrom: typeof payload.createdFrom === "string" ? payload.createdFrom : "live_preview_click",
  };
}

function nullableStringFromPayload(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function previewOriginFromUrl(previewUrl: string | null | undefined) {
  if (!previewUrl || typeof window === "undefined") return null;
  try {
    return new URL(previewUrl, window.location.href).origin;
  } catch {
    return null;
  }
}

function previewDisplayUrl(previewUrl: string | null | undefined) {
  const rawUrl = String(previewUrl || "").trim();
  if (!rawUrl) return "";
  try {
    const hasExplicitOrigin = /^[a-z][a-z\d+.-]*:\/\//i.test(rawUrl) || rawUrl.startsWith("//");
    const parsed = new URL(rawUrl, typeof window === "undefined" ? "https://mlai.au" : window.location.href);
    parsed.searchParams.delete("cfInspector");
    parsed.searchParams.delete("cfPreviewMode");
    if (!hasExplicitOrigin) return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

function numberMapFromPayload(value: unknown, keys: string[]) {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  if (!payload) return null;
  const result: Record<string, number> = {};
  for (const key of keys) {
    const number = numberFromPayload(payload[key]);
    if (number !== null) result[key] = number;
  }
  return Object.keys(result).length ? result : null;
}

function commentContextFromPayload(
  data: Record<string, unknown>,
  fallbackPreviewMode?: string | null,
): VibeMarketingComponentCommentContext | null {
  const context: VibeMarketingComponentCommentContext = {
    domPath: nullableStringFromPayload(data.domPath),
    textHash: nullableStringFromPayload(data.textHash),
    textExcerpt: nullableStringFromPayload(data.textExcerpt),
    rect: numberMapFromPayload(data.rect, ["left", "top", "right", "bottom", "width", "height"]),
    click: numberMapFromPayload(data.click, ["x", "y", "pageX", "pageY"]),
    viewport: numberMapFromPayload(data.viewport, ["width", "height", "scrollX", "scrollY", "devicePixelRatio"]),
    pageUrl: nullableStringFromPayload(data.pageUrl),
    previewMode: nullableStringFromPayload(data.previewMode) ?? fallbackPreviewMode ?? null,
  };
  return Object.values(context).some((value) => value !== null && value !== undefined) ? context : null;
}

function componentFromInspectorPayload(
  data: Record<string, unknown>,
  components: VibeMarketingComponentManifestItem[],
): VibeMarketingComponentManifestItem | null {
  const componentId = typeof data.componentId === "string" ? data.componentId : "";
  if (!componentId) return null;
  return (
    components.find((item) => item.id === componentId) ?? {
      id: componentId,
      type: typeof data.componentType === "string" ? data.componentType : "component",
      label: typeof data.label === "string" ? data.label : componentId,
      selector: typeof data.selector === "string" ? data.selector : `[data-cf-component-id="${componentId}"]`,
      sourceSectionId: typeof data.sourceSectionId === "string" ? data.sourceSectionId : undefined,
      editable: true,
    }
  );
}

function measurementFromInspectorPayload(
  data: Record<string, unknown>,
  components: VibeMarketingComponentManifestItem[],
): InspectorComponentMeasurement | null {
  const component = componentFromInspectorPayload(data, components);
  const rect = rectFromPayload(data.rect);
  if (!component || !rect) return null;
  return {
    ...component,
    selector: typeof data.selector === "string" ? data.selector : component.selector,
    rect,
  };
}

function positionForAnchor(rect: InspectorRect, anchor: VibeMarketingComponentCommentAnchor) {
  return {
    left: rect.left + rect.width * anchor.x,
    top: rect.top + rect.height * anchor.y,
  };
}

function componentForComment(
  comment: VibeMarketingComponentFeedbackComment,
  components: VibeMarketingComponentManifestItem[],
): VibeMarketingComponentManifestItem {
  return (
    components.find((component) => component.id === comment.componentId) ?? {
      id: comment.componentId,
      type: comment.componentType || "component",
      label: comment.componentLabel || comment.componentId,
      selector: comment.selector ?? `[data-cf-component-id="${comment.componentId}"]`,
      sourceSectionId: comment.sourceSectionId ?? undefined,
      editable: comment.status === "draft",
    }
  );
}

function appendCommentFormFields(
  formData: FormData,
  component: VibeMarketingComponentManifestItem,
  body: string,
  anchor?: VibeMarketingComponentCommentAnchor | null,
  context?: VibeMarketingComponentCommentContext | null,
) {
  formData.set("componentId", component.id);
  formData.set("componentType", component.type);
  formData.set("componentLabel", component.label ?? component.id);
  formData.set("sourceSectionId", component.sourceSectionId ?? "");
  formData.set("selector", component.selector ?? `[data-cf-component-id="${component.id}"]`);
  if (anchor) formData.set("anchor", JSON.stringify(anchor));
  if (context) formData.set("context", JSON.stringify(context));
  formData.set("body", body);
}

function sameAnchor(
  left?: VibeMarketingComponentCommentAnchor | null,
  right?: VibeMarketingComponentCommentAnchor | null,
) {
  if (!left || !right) return !left && !right;
  return Math.abs(left.x - right.x) < 0.001 && Math.abs(left.y - right.y) < 0.001;
}

function commentsLikelyMatch(
  left: VibeMarketingComponentFeedbackComment,
  right: VibeMarketingComponentFeedbackComment,
) {
  return (
    left.componentId === right.componentId &&
    left.body.trim() === right.body.trim() &&
    sameAnchor(left.anchor, right.anchor)
  );
}

function mergeServerCommentsWithLocal(
  serverComments: VibeMarketingComponentFeedbackComment[],
  localComments: VibeMarketingComponentFeedbackComment[],
) {
  const next = [...serverComments];
  for (const localComment of localComments) {
    if (localComment.status !== "draft") continue;
    if (!next.some((serverComment) => serverComment.id === localComment.id || commentsLikelyMatch(localComment, serverComment))) {
      next.push(localComment);
    }
  }
  return next;
}

function feedbackCommentFromPayload(value: unknown): VibeMarketingComponentFeedbackComment | null {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  if (!payload) return null;
  const id = typeof payload.id === "string" ? payload.id : "";
  const componentId =
    typeof payload.componentId === "string"
      ? payload.componentId
      : typeof payload.component_id === "string"
        ? payload.component_id
        : "";
  if (!id || !componentId) return null;
  const contextPayload = payload.context && typeof payload.context === "object" && !Array.isArray(payload.context)
    ? (payload.context as Record<string, unknown>)
    : null;
  return {
    id,
    componentId,
    componentType:
      typeof payload.componentType === "string"
        ? payload.componentType
        : typeof payload.component_type === "string"
          ? payload.component_type
          : "component",
    componentLabel:
      typeof payload.componentLabel === "string"
        ? payload.componentLabel
        : typeof payload.component_label === "string"
          ? payload.component_label
          : null,
    sourceSectionId:
      typeof payload.sourceSectionId === "string"
        ? payload.sourceSectionId
        : typeof payload.source_section_id === "string"
          ? payload.source_section_id
          : null,
    selector: typeof payload.selector === "string" ? payload.selector : null,
    anchor: anchorFromPayload(payload.anchor),
    context: contextPayload ? commentContextFromPayload(contextPayload, null) : null,
    body: typeof payload.body === "string" ? payload.body : "",
    status: typeof payload.status === "string" ? payload.status : "draft",
    batchId:
      typeof payload.batchId === "string"
        ? payload.batchId
        : typeof payload.batch_id === "string"
          ? payload.batch_id
          : null,
    createdAt:
      typeof payload.createdAt === "string"
        ? payload.createdAt
        : typeof payload.created_at === "string"
          ? payload.created_at
          : null,
    updatedAt:
      typeof payload.updatedAt === "string"
        ? payload.updatedAt
        : typeof payload.updated_at === "string"
          ? payload.updated_at
          : null,
  };
}

function savedCommentFromFetcherData(data: unknown) {
  const payload = data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : null;
  if (!payload) return null;
  return feedbackCommentFromPayload(payload.comment) ?? feedbackCommentFromPayload(payload);
}

function reconcileSavedComment(
  current: VibeMarketingComponentFeedbackComment[],
  savedComment: VibeMarketingComponentFeedbackComment,
) {
  let replaced = false;
  const next = current.map((comment) => {
    if (comment.id === savedComment.id) {
      replaced = true;
      return savedComment;
    }
    if (!replaced && comment.id.startsWith("optimistic-") && commentsLikelyMatch(comment, savedComment)) {
      replaced = true;
      return savedComment;
    }
    return comment;
  });
  return replaced ? next : [...next, savedComment];
}

interface LivePreviewCommentInspectorState {
  draftComments: VibeMarketingComponentFeedbackComment[];
  latestBatch: NonNullable<VibeMarketingRunSummary["componentFeedback"]>["latestBatch"] | null;
  latestBatchStatus: string;
  hasPendingRevisionBatch: boolean;
  canRetrySubmittedBatch: boolean;
  canSendRevisionRequest: boolean;
  canRenderPreview: boolean;
  batchId: string;
  sourceRunId: string;
}

function LivePreviewCommentInspectorPanel({
  run,
  targetRunId,
  selectedComponent,
  onSelectComponent,
  previewUrlFallback,
  previewTitle,
  reviewTitle = "Review comments",
  draftNoun = "draft pin",
  emptyDraftText = "0 draft pins ready for revision.",
  submittedRetryText = "Submitted comments are ready to retry.",
  waitingBridgeText = "Waiting for comment bridge",
  actionSlot,
  unavailableSlot,
  requiresExactPreview = false,
  readOnly = false,
}: {
  run: VibeMarketingRunSummary;
  targetRunId?: string | null;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  previewUrlFallback?: string | null;
  previewTitle: string;
  reviewTitle?: string;
  draftNoun?: string;
  emptyDraftText?: string;
  submittedRetryText?: string;
  waitingBridgeText?: string;
  actionSlot: (state: LivePreviewCommentInspectorState) => ReactNode;
  unavailableSlot?: ReactNode;
  requiresExactPreview?: boolean;
  readOnly?: boolean;
}) {
  const manifest = run.componentManifest;
  const components = useMemo(() => manifest?.components ?? [], [manifest]);
  const preview = useMemo(() => {
    const fallbackUrl = requiresExactPreview ? "" : String(previewUrlFallback || "").trim();
    if (run.livePreview) {
      const previewUrl = requiresExactPreview && run.livePreview.exactRender !== true
        ? ""
        : run.livePreview.previewUrl || fallbackUrl;
      return {
        ...run.livePreview,
        available: Boolean((!requiresExactPreview && run.livePreview.available) || previewUrl),
        previewUrl,
      };
    }
    if (!fallbackUrl) return null;
    return {
      available: true,
      status: "running",
      previewUrl: fallbackUrl,
      previewMode: "platform_deployment",
      inspectorProtocolVersion: null,
      inspectorMode: null,
    } as NonNullable<VibeMarketingRunSummary["livePreview"]>;
  }, [previewUrlFallback, requiresExactPreview, run.livePreview]);
  const canRenderPreview = Boolean(preview?.available && preview.previewUrl);
  const contentOnlyPreviewActive =
    canRenderPreview &&
    (String(preview?.previewQuality ?? "").trim().toLowerCase() === "content_only" ||
      String(preview?.previewMode ?? "").trim().toLowerCase() === "content_only");
  const contentOnlyPreviewBanner =
    String(preview?.previewBanner ?? "").trim() ||
    "Exact preview unavailable — showing a content-only preview of the article.";
  const [componentMeasurements, setComponentMeasurements] = useState<Record<string, InspectorComponentMeasurement>>({});
  const [pendingPin, setPendingPin] = useState<PendingCommentPin | null>(null);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [inspectorProtocolVersion, setInspectorProtocolVersion] = useState<number | null>(preview?.inspectorProtocolVersion ?? null);
  const [inspectorMode, setInspectorMode] = useState<string | null>(preview?.inspectorMode ?? null);
  const [legacyInspectorWarning, setLegacyInspectorWarning] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const serverComments = useMemo(() => run.componentFeedback?.comments ?? [], [run.componentFeedback?.comments]);
  const [comments, setComments] = useState<VibeMarketingComponentFeedbackComment[]>(serverComments);
  const draftComments = comments.filter((comment) => comment.status === "draft" && comment.body.trim());
  const latestBatch = run.componentFeedback?.latestBatch ?? null;
  const latestBatchStatus = String(latestBatch?.status ?? "");
  const hasPendingRevisionBatch = Boolean(
    latestBatch?.id &&
      ["submitted", "running", "failed"].includes(latestBatchStatus) &&
      !latestBatch.revisionRunId,
  );
  const canRetryFailedRevisionBatch = Boolean(
    latestBatch?.id && run.workflow === "article_revision" && run.status === "failed" && draftComments.length === 0,
  );
  const canRetrySubmittedBatch = Boolean(
    latestBatch?.id &&
      (!latestBatch.revisionRunId || canRetryFailedRevisionBatch) &&
      draftComments.length === 0 &&
      (canRetryFailedRevisionBatch || ["submitted", "failed"].includes(String(latestBatch.status || ""))),
  );
  const canSendRevisionRequest = draftComments.length > 0 || canRetrySubmittedBatch;
  const commentModeActive = Boolean(inspectorProtocolVersion && inspectorProtocolVersion >= 2 && inspectorMode === "comment");
  const previewWarnings = useMemo(
    () => {
      const visualFallback =
        preview?.visualFallback && typeof preview.visualFallback === "object"
          ? (preview.visualFallback as Record<string, unknown>)
          : {};
      const nativePreviewFailure =
        preview?.nativePreviewFailure && typeof preview.nativePreviewFailure === "object"
          ? (preview.nativePreviewFailure as Record<string, unknown>)
          : {};
      const cssWarnings = Array.isArray(visualFallback.cssWarnings)
        ? visualFallback.cssWarnings.map((warning) => String(warning ?? "").trim()).filter(Boolean)
        : [];
      const nativeFailure = typeof nativePreviewFailure.error === "string" ? nativePreviewFailure.error.trim() : "";
      return Array.from(
        new Set([
          ...(preview?.previewMode === "visual_static_fallback"
            ? [
                "Visual fallback preview: layout and content are reviewable, but production runtime behavior was not fully reproduced.",
              ]
            : []),
          ...(preview?.proofWarnings ?? []),
          ...(preview?.browserWarnings ?? []),
          ...(preview?.assetWarnings ?? []),
          ...cssWarnings,
          ...(nativeFailure ? [`Native preview failed: ${nativeFailure}`] : []),
        ]),
      ).slice(0, 8);
    },
    [preview],
  );
  const sourceRunId =
    latestBatch?.sourceRunId ||
    (typeof run.result?.["source_run_id"] === "string" ? run.result["source_run_id"] : "") ||
    "";
  const batchId =
    latestBatch?.id ||
    (typeof run.result?.["feedback_batch_id"] === "string" ? run.result["feedback_batch_id"] : "") ||
    "";
  const previewMessageOrigin = useMemo(() => previewOriginFromUrl(preview?.previewUrl), [preview?.previewUrl]);
  const reviewState: LivePreviewCommentInspectorState = {
    draftComments,
    latestBatch,
    latestBatchStatus,
    hasPendingRevisionBatch,
    canRetrySubmittedBatch,
    canSendRevisionRequest,
    canRenderPreview,
    batchId,
    sourceRunId,
  };

  const sendInspectorCommand = useCallback((message: Record<string, unknown>) => {
    const targetWindow = iframeRef.current?.contentWindow;
    if (!targetWindow || !previewMessageOrigin) return;
    targetWindow.postMessage({ source: "founder-tools-inspector", ...message }, previewMessageOrigin);
  }, [previewMessageOrigin]);

  const mergeMeasurement = useCallback((measurement: InspectorComponentMeasurement) => {
    setComponentMeasurements((current) => ({ ...current, [measurement.id]: measurement }));
  }, []);

  useEffect(() => {
    setComments((current) => mergeServerCommentsWithLocal(serverComments, current));
  }, [serverComments]);

  useEffect(() => {
    setInspectorProtocolVersion(preview?.inspectorProtocolVersion ?? null);
    setInspectorMode(preview?.inspectorMode ?? null);
    setLegacyInspectorWarning(null);
    setPendingPin(null);
    setOpenCommentId(null);
    setComponentMeasurements({});
  }, [preview?.previewUrl, preview?.inspectorMode, preview?.inspectorProtocolVersion]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (iframeWindow && event.source !== iframeWindow) return;
      if (previewMessageOrigin && event.origin !== previewMessageOrigin) return;
      const data = event.data;
      if (!data || typeof data !== "object" || data.source !== "content-factory-inspector") return;
      const payload = data as Record<string, unknown>;
      const protocolVersion = numberFromPayload(payload.protocolVersion);
      if (protocolVersion) setInspectorProtocolVersion(protocolVersion);
      if (payload.type === "ready") {
        const mode = typeof payload.mode === "string" ? payload.mode : "comment";
        setInspectorMode(mode);
        if (protocolVersion && protocolVersion >= 2) {
          setLegacyInspectorWarning(null);
          if (mode !== "comment") sendInspectorCommand({ type: "setMode", mode: "comment" });
        }
        return;
      }
      if (payload.type === "measure" && Array.isArray(payload.components)) {
        const nextMeasurements: Record<string, InspectorComponentMeasurement> = {};
        for (const item of payload.components) {
          if (!item || typeof item !== "object") continue;
          const measurement = measurementFromInspectorPayload(item as Record<string, unknown>, components);
          if (measurement) nextMeasurements[measurement.id] = measurement;
        }
        setComponentMeasurements((current) => ({ ...current, ...nextMeasurements }));
        return;
      }

      const component = componentFromInspectorPayload(payload, components);
      if (!component) return;
      const measurement = measurementFromInspectorPayload(payload, components);
      if (measurement) mergeMeasurement(measurement);

      if (payload.type === "comment:create") {
        const anchor = anchorFromPayload(payload.anchor);
        const context = commentContextFromPayload(payload, preview?.previewMode ?? null);
        onSelectComponent(component);
        setOpenCommentId(null);
        if (!readOnly && anchor) {
          setPendingPin({ component, anchor, context });
        }
        return;
      }
      if (payload.type === "select") {
        const anchor = anchorFromPayload(payload.anchor);
        const context = commentContextFromPayload(payload, preview?.previewMode ?? null);
        onSelectComponent(component);
        setOpenCommentId(null);
        if (!readOnly && anchor) {
          setPendingPin({ component, anchor, context });
          return;
        }
        if (!protocolVersion || protocolVersion < 2) {
          setLegacyInspectorWarning("The preview inspector is out of date. Reload the page to reconnect in-place comments.");
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [components, mergeMeasurement, onSelectComponent, preview?.previewMode, previewMessageOrigin, readOnly, sendInspectorCommand]);

  useEffect(() => {
    if (!selectedComponent) return;
    sendInspectorCommand({ type: "setSelectedComponent", componentId: selectedComponent.id });
  }, [selectedComponent, sendInspectorCommand]);

  const displayPreviewUrl = previewDisplayUrl(preview?.previewUrl);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="sticky top-3 z-20 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-gray-950">{reviewTitle}</p>
            <p className="text-xs font-semibold text-gray-500">
              {draftComments.length > 0
                ? `${draftComments.length} ${draftNoun}${draftComments.length === 1 ? "" : "s"} ready for review.`
                : canRetrySubmittedBatch
                  ? submittedRetryText
                  : emptyDraftText}
            </p>
            <p className={clsx("mt-1 text-xs font-black", commentModeActive ? "text-emerald-700" : "text-amber-700")}>
              {commentModeActive ? "Comment mode active" : waitingBridgeText}
            </p>
            {previewWarnings.length ? (
              <details className="mt-2 text-xs font-semibold text-amber-800">
                <summary className="cursor-pointer font-black">Preview warnings</summary>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {previewWarnings.map((warning) => (
                    <li key={warning} className="break-words font-mono">
                      {warning}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
          {actionSlot(reviewState)}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          {canRenderPreview ? (
            <>
              <div className="border-b border-gray-200 bg-white px-3 py-2">
                <div className="flex min-w-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 shadow-inner">
                  <LockClosedIcon className="h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                  <span className="min-w-0 truncate" aria-label={`Preview URL: ${displayPreviewUrl}`}>
                    {displayPreviewUrl}
                  </span>
                </div>
              </div>
              {contentOnlyPreviewActive ? (
                <div
                  role="status"
                  className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-900"
                >
                  <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>
                    {contentOnlyPreviewBanner}
                    {" "}
                    You can still review and pin comments on the article content.
                  </span>
                </div>
              ) : null}
              <div className="relative">
                {legacyInspectorWarning ? (
                  <div className="absolute left-4 right-4 top-4 z-30 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm">
                    {legacyInspectorWarning}
                  </div>
                ) : null}
                <iframe
                  ref={iframeRef}
                  title={previewTitle}
                  src={preview?.previewUrl ?? ""}
                  className="h-[820px] w-full bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => {
                    window.setTimeout(() => {
                      sendInspectorCommand({ type: "setMode", mode: "comment" });
                      sendInspectorCommand({ type: "measureComponents" });
                    }, 120);
                  }}
                />
                <ArticleCommentCanvas
                  comments={comments}
                  components={components}
                  measurements={componentMeasurements}
                  pendingPin={pendingPin}
                  targetRunId={targetRunId}
                  openCommentId={openCommentId}
                  onOpenComment={setOpenCommentId}
                  onClearPending={() => setPendingPin(null)}
                  onCommentsChange={setComments}
                  onSelectComponent={onSelectComponent}
                  readOnly={readOnly}
                />
              </div>
            </>
          ) : (
            unavailableSlot ?? (
              <div className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-5 text-sm font-semibold text-violet-800">
                The hosted preview is being prepared. Refreshing this page is safe.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function LiveArticlePreviewPanel({
  run,
  selectedComponent,
  onSelectComponent,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const publishStep = run.workflowProgress?.steps.find((step) => step.id === "publish");
  const acceptArticleIntent = articleReviewApproveIntentForRun(run, publishStep?.primaryAction?.intent);
  const acceptArticleLabel = articleReviewApproveLabelForRun(run);
  const reviewApprovalReady = isArticleReviewPreviewReady(run);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">Live article preview</h2>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            Review the generated article and pin comments directly on sections that need changes.
          </p>
        </div>
      </div>

      <LivePreviewCommentInspectorPanel
        run={run}
        selectedComponent={selectedComponent}
        onSelectComponent={onSelectComponent}
        previewTitle="Live generated article preview"
        actionSlot={(reviewState) => {
          const canAcceptRevision =
            run.workflow === "article_revision" &&
            run.status === "completed" &&
            reviewState.latestBatch?.status !== "accepted" &&
            Boolean(reviewState.batchId);
          const canAcceptArticleForPublish = Boolean(
            (run.status === "completed" || reviewApprovalReady) &&
              (run.contentPackage?.contentPackaged || reviewApprovalReady) &&
              reviewState.canRenderPreview &&
              reviewState.draftComments.length === 0 &&
              !canAcceptRevision &&
              !reviewState.hasPendingRevisionBatch &&
              (reviewApprovalReady || publishStep?.status === "ready") &&
              acceptArticleIntent,
          );
          const acceptArticlePending = isActionPending?.(acceptArticleIntent) ?? isSubmitting;
          const acceptRevisionPending = isActionPending?.("accept-component-revision") ?? isSubmitting;
          const submitCommentsPending = isActionPending?.("submit-component-comments") ?? isSubmitting;
          return (
            <div className="flex flex-col gap-2 sm:flex-row">
              {canAcceptArticleForPublish ? (
                <Form method="POST">
                  <input type="hidden" name="autoMerge" value="true" />
                  <button
                    type="submit"
                    name="intent"
                    value={acceptArticleIntent}
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                  >
                    {acceptArticlePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                    {acceptArticlePending ? acceptArticleLabel.pending : acceptArticleLabel.idle}
                  </button>
                </Form>
              ) : null}
              {canAcceptRevision ? (
                <Form method="POST">
                  <input type="hidden" name="intent" value="accept-component-revision" />
                  <input type="hidden" name="batchId" value={reviewState.batchId} />
                  <input type="hidden" name="sourceRunId" value={reviewState.sourceRunId} />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                  >
                    {acceptRevisionPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                    {acceptRevisionPending ? "Accepting..." : "Accept revised article"}
                  </button>
                </Form>
              ) : null}
              <Form method="POST">
                <button
                  type="submit"
                  name="intent"
                  value="submit-component-comments"
                  disabled={isSubmitting || !reviewState.canSendRevisionRequest}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-40 sm:w-auto"
                >
                  {submitCommentsPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                  {submitCommentsPending ? "Sending..." : reviewState.canRetrySubmittedBatch ? "Retry AI revision request" : "Send comments for AI revision"}
                </button>
              </Form>
            </div>
          );
        }}
      />
    </section>
  );
}

function ArticlePreviewEmptyState({
  run,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const preview = run.livePreview;
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  const platformStatus = String(preview?.platformStatus ?? "").trim().toLowerCase();
  const nativePreviewFailure =
    preview?.nativePreviewFailure && typeof preview.nativePreviewFailure === "object"
      ? (preview.nativePreviewFailure as Record<string, unknown>)
      : {};
  const nativeError = typeof nativePreviewFailure.error === "string" ? nativePreviewFailure.error.trim() : "";
  const nativeErrorCode =
    typeof nativePreviewFailure.errorCode === "string"
      ? nativePreviewFailure.errorCode.trim()
      : typeof nativePreviewFailure.error_code === "string"
        ? nativePreviewFailure.error_code.trim()
        : "";
  const previewErrorCode = String(preview?.errorCode || nativeErrorCode || "").trim().toLowerCase();
  const hasManifest = Boolean(run.componentManifest);
  const hostedPreview = preview?.previewMode === "platform_deployment";
  const failed = isFailedArticlePreview(preview);
  const contentOnlyNoRender = isContentOnlyNoRenderPreview(preview);
  const retryablePreviewCodes = new Set([
    "clone_auth_failed",
    "dev_server_startup_failed",
    "platform_preview_builder_not_accessible",
    "platform_preview_dispatch_failed",
    "platform_preview_dispatch_invalid",
    "platform_preview_failed",
    "preview_proof_failed",
    "preview_runtime_failed",
    "preview_start_timeout",
    "preview_verification_failed",
    "unsupported_runtime_for_v1",
  ]);
  const nativeRetryable = typeof nativePreviewFailure.retryable === "boolean" ? nativePreviewFailure.retryable : undefined;
  const retryable = !contentOnlyNoRender && (preview?.retryable !== false && nativeRetryable !== false ? true : retryablePreviewCodes.has(previewErrorCode));
  const statusLabel = previewStatus ? previewStatus.replace(/_/g, " ") : "not started";
  const failedPhase = String(preview?.failedPhase || nativePreviewFailure.failedPhase || nativePreviewFailure.failed_phase || "").trim();
  const failedCommand = String(
    preview?.failedCommand || nativePreviewFailure.failedCommand || nativePreviewFailure.failed_command || "",
  ).trim();
  const displayError =
    contentOnlyNoRender
      ? "Content-only article runs package markdown and metadata but do not produce repo file overrides for component live preview."
      : String(preview?.error || nativeError || "The article preview could not be prepared. Retry the preview when the generator is available.").trim();
  const retryPreviewPending = isActionPending?.("start-live-preview") ?? isSubmitting;
  const restartPreviewPending = isActionPending?.("restart") ?? isSubmitting;
  const diagnosticRows = [
    failedPhase ? ["Phase", failedPhase] : null,
    failedCommand ? ["Command", failedCommand] : null,
  ].filter((row): row is [string, string] => Boolean(row));
  const logExcerpt = String(preview?.logExcerpt || nativePreviewFailure.logExcerpt || nativePreviewFailure.log_excerpt || "").trim();
  const buildLogsUrl = String(
    preview?.builderRunUrl ||
      nativePreviewFailure.builderRunUrl ||
      nativePreviewFailure.builder_run_url ||
      preview?.logsUrl ||
      nativePreviewFailure.logsUrl ||
      nativePreviewFailure.logs_url ||
      "",
  ).trim();

  if (failed || contentOnlyNoRender) {
    return (
      <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <h2 className="text-base font-black text-red-950">Preview failed</h2>
              <p className="mt-1 font-semibold">{displayError}</p>
              {previewErrorCode ? <p className="mt-2 text-xs font-black uppercase text-red-700">Preview status: {previewErrorCode}</p> : null}
              {diagnosticRows.length ? (
                <dl className="mt-3 grid gap-1 text-xs font-semibold text-red-900">
                  {diagnosticRows.map(([label, value]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[5rem_1fr]">
                      <dt className="font-black uppercase text-red-700">{label}</dt>
                      <dd className="break-words font-mono">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {buildLogsUrl ? (
                <a
                  href={buildLogsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-black text-red-800 shadow-sm transition hover:bg-red-100"
                >
                  Open preview build logs
                </a>
              ) : null}
              {logExcerpt ? (
                <pre className="mt-3 max-h-44 overflow-auto whitespace-pre-wrap rounded-lg border border-red-200 bg-white/75 p-3 font-mono text-[11px] leading-relaxed text-red-950">
                  {logExcerpt}
                </pre>
              ) : null}
            </div>
          </div>
          {contentOnlyNoRender ? (
            <Form method="POST">
              <button
                type="submit"
                name="intent"
                value="restart"
                disabled={restartPreviewPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100 disabled:opacity-50 sm:w-auto"
              >
                {restartPreviewPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                {restartPreviewPending ? "Regenerating..." : "Regenerate with exact preview"}
              </button>
            </Form>
          ) : retryable ? (
            <Form method="POST">
              <input type="hidden" name="force" value="true" />
              <button
                type="submit"
                name="intent"
                value="start-live-preview"
                disabled={retryPreviewPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100 disabled:opacity-50 sm:w-auto"
              >
                {retryPreviewPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                {retryPreviewPending ? "Starting preview..." : "Retry preview"}
              </button>
            </Form>
          ) : (
            <Link
              to="/founder-tools/marketing/create?step=chooseArticle"
              className="inline-flex w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100 sm:w-auto"
            >
              Regenerate review draft
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (hasManifest) {
    return (
      <section className="rounded-xl border border-violet-100 bg-violet-50/70 p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-violet-700 shadow-sm">
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
          </span>
          <div>
            <h2 className="text-base font-black text-gray-950">{hostedPreview ? "Building hosted preview" : "Preparing article preview"}</h2>
            <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-gray-600">
              {hostedPreview
                ? "The article is ready for review. We are building and deploying an isolated preview URL for the exact website route."
                : "The article is ready for review. We are preparing the exact website preview and comment layer."}
            </p>
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-violet-700">
              Preview status: {platformStatus || statusLabel}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5">
      <h2 className="text-base font-black text-gray-950">Article preview</h2>
      <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-gray-500">
        Article preview will appear here when the article reaches Ready for review.
      </p>
    </section>
  );
}

function ArticleGenerationReviewDetail({
  run,
  selectedComponent,
  onSelectComponent,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const hasArticlePreview = hasReadyArticlePreview(run);
  return (
    <div className="space-y-5">
      <ArticleRunStageProgress run={run} variant="embedded" />
      {hasArticlePreview ? (
        <LiveArticlePreviewPanel
          run={run}
          selectedComponent={selectedComponent}
          onSelectComponent={onSelectComponent}
          isSubmitting={isSubmitting}
          isActionPending={isActionPending}
        />
      ) : (
        <ArticlePreviewEmptyState run={run} isSubmitting={isSubmitting} isActionPending={isActionPending} />
      )}
    </div>
  );
}

function ArticleSetupPublishDetail({
  run,
  bootstrap,
  isSubmitting,
  isActionPending,
  accountEmail,
  accountEmailVerified,
}: {
  run: VibeMarketingRunSummary;
  bootstrap: VibeMarketingBootstrap;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
  accountEmail?: string | null;
  accountEmailVerified?: boolean | null;
}) {
  const prUrl = articleSystemSetupPrUrl(run);
  const prNumber = articleSystemSetupPrNumber(run);
  const setupStatus = articleSystemSetupStatus(run);
  const mergeStatus = articleSystemSetupMergeStatus(run);
  const checksStatus = articleSystemSetupString(run, "checks_status", "checksStatus");
  const mergeBlockedReason = articleSystemSetupString(run, "merge_blocked_reason", "mergeBlockedReason");
  const setupMerged = isArticleSystemSetupMerged(run);
  const prCreateFailed = setupStatus === "setup_pr_create_failed";
  const approvePending = isActionPending?.("approve") ?? isSubmitting;
  const mergePending = isActionPending?.("merge-setup-pr") ?? isSubmitting;
  const refreshMergePending = isActionPending?.("refresh-setup-pr-status") ?? isSubmitting;
  const enableDailyPending = isActionPending?.("enable-daily-automation") ?? isSubmitting;
  const runDailyPending = isActionPending?.("run-daily-discovery-now") ?? isSubmitting;
  const dailyCheck = bootstrap.checks.dailyAutomation as
    | (VibeMarketingBootstrap["checks"][string] & { ready?: boolean; enabled?: boolean })
    | undefined;
  const dailyEnabled = Boolean(bootstrap.settings.dailyDiscoveryEnabled || dailyCheck?.enabled || dailyCheck?.passed);
  const dailyReady = Boolean(dailyEnabled || setupMerged || dailyCheck?.ready || dailyCheck?.passed);
  const defaultTimezone = bootstrap.settings.defaultTimezone ?? "Australia/Melbourne";
  const dailyChannels = dailyCheck?.channels ?? [];
  const activeChannelLabels = dailyChannels
    .filter((channel) => channel.consentState === "active")
    .map((channel) => ({ slack: "Slack", email: "Email", whatsapp: "WhatsApp" })[channel.channelType])
    .filter(Boolean);

  // Present the two underlying setup steps (create, then merge) as one friendly "Publish" action.
  const publishPending = approvePending || mergePending;
  const publishIntent = prUrl && !setupMerged ? "merge-setup-pr" : "approve";
  const publishLabel = publishPending
    ? "Publishing..."
    : prCreateFailed || mergeBlockedReason
      ? "Retry publish"
      : "Publish";
  // Keep the backend's git phrasing out of the UI when a publish can't finish automatically.
  const blockedMessage =
    mergeBlockedReason && /merge the setup pr/i.test(mergeBlockedReason)
      ? "Publishing couldn't finish automatically — retry, or view changes to check the latest status."
      : mergeBlockedReason;
  const cardStatus = setupMerged
    ? "complete"
    : blockedMessage || prCreateFailed
      ? "blocked"
      : publishPending || prUrl
        ? "running"
        : "ready";
  const cardEyebrow = setupMerged
    ? "Published"
    : blockedMessage
      ? "Needs a retry"
      : prCreateFailed
        ? "Retry needed"
        : prUrl
          ? checksStatus
            ? `Checks ${checksStatus}`
            : "Publishing"
          : "Ready";

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">Publish &amp; automate</p>
            <h2 className="mt-1 text-xl font-black text-gray-950">Finish articles setup</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-600">
              Publish the articles setup — it goes live with the next site build. Once it&apos;s published, article generation unlocks and you can turn on daily research reminders.
            </p>
          </div>
          <WorkflowStatusPill status={setupMerged ? "complete" : prUrl ? "running" : "ready"} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <PublishFlowCard title="Publish" status={cardStatus} eyebrow={cardEyebrow}>
            {setupMerged ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  Articles setup is published — article generation is unlocked. Choose a topic to generate your first article.
                </p>
                {prUrl ? (
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    View changes
                  </a>
                ) : null}
              </div>
            ) : (
              <Form method="POST" className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {blockedMessage
                    ? blockedMessage
                    : prCreateFailed
                      ? "Publishing didn't finish last time. Retry to publish the approved setup."
                      : prUrl
                        ? "Your setup is publishing. This page updates on its own once it's live."
                        : "Publish the approved setup. It goes live with the next site build and unlocks article generation."}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    name="intent"
                    value={publishIntent}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                  >
                    {publishPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                    {publishLabel}
                  </button>
                  {prUrl ? (
                    <a
                      href={prUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                      View changes
                    </a>
                  ) : null}
                </div>
                {prUrl ? (
                  <button
                    type="submit"
                    name="intent"
                    value="refresh-setup-pr-status"
                    disabled={isSubmitting}
                    className="text-xs font-bold text-gray-400 underline-offset-2 transition hover:text-gray-600 hover:underline disabled:opacity-50"
                  >
                    {refreshMergePending ? "Refreshing status..." : "Already published it yourself? Refresh status"}
                  </button>
                ) : null}
              </Form>
            )}
          </PublishFlowCard>

          <PublishFlowCard title="Daily article reminders" status={dailyEnabled ? "complete" : setupMerged ? "ready" : "locked"} eyebrow={dailyEnabled ? (activeChannelLabels.length ? `${activeChannelLabels.join(" + ")} enabled` : "Enabled") : setupMerged ? "Ready" : "Publish first"}>
            {setupMerged ? (
              <div className="space-y-3">
                <DailyReminderChannels
                  channels={dailyChannels}
                  isSubmitting={isSubmitting}
                  accountEmail={accountEmail}
                  accountEmailVerified={accountEmailVerified}
                />
                <Form method="POST" className="space-y-3">
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-wide text-gray-500">Timezone</span>
                    <input
                      type="text"
                      name="defaultTimezone"
                      defaultValue={defaultTimezone}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </label>
                  <button
                    type="submit"
                    name="intent"
                    value="enable-daily-automation"
                    disabled={isSubmitting || dailyEnabled || !dailyReady}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {enableDailyPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : dailyEnabled ? <CheckCircleIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                    {enableDailyPending ? "Enabling..." : dailyEnabled ? "Enabled" : "Enable reminder"}
                  </button>
                </Form>
                <Form method="POST">
                  <button
                    type="submit"
                    name="intent"
                    value="run-daily-discovery-now"
                    disabled={isSubmitting || !dailyEnabled}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    {runDailyPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
                    {runDailyPending ? "Starting..." : "Run today now"}
                  </button>
                </Form>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-500">Daily reminders unlock once the articles setup is published.</p>
            )}
          </PublishFlowCard>
        </div>
      </section>
    </div>
  );
}

function PublishDailyResearchReminderCard({
  channels,
  dailyEnabled,
  dailyReady,
  defaultTimezone,
  enableDailyPending,
  runDailyPending,
  isSubmitting,
  accountEmail,
  accountEmailVerified,
  channelActionError,
  channelActionIntent,
}: {
  channels: VibeMarketingNotificationChannel[];
  dailyEnabled: boolean;
  dailyReady: boolean;
  defaultTimezone: string;
  enableDailyPending: boolean;
  runDailyPending: boolean;
  isSubmitting: boolean;
  accountEmail?: string | null;
  accountEmailVerified?: boolean | null;
  channelActionError?: string | null;
  channelActionIntent?: string | null;
}) {
  const statusLabel = dailyEnabled ? "Enabled" : dailyReady ? "Ready" : "Needs setup";

  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100 text-violet-700 shadow-inner">
          <CalendarDaysIcon className="h-8 w-8" />
        </span>
        <div className="min-w-0 pt-1">
          <h3 className="text-xl font-black leading-7 text-gray-950">Trigger article research daily</h3>
          <p
            className={clsx(
              "mt-1 text-xs font-black uppercase tracking-wide",
              dailyEnabled ? "text-emerald-700" : dailyReady ? "text-violet-700" : "text-gray-500",
            )}
          >
            {statusLabel}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-xl text-base font-semibold leading-6 text-slate-600">
        Get a daily research prompt for the next article via your preferred channels.
      </p>

      <div className="mt-6">
        <DailyReminderChannels
          channels={channels}
          isSubmitting={isSubmitting}
          accountEmail={accountEmail}
          accountEmailVerified={accountEmailVerified}
          error={channelActionError}
          errorIntent={channelActionIntent}
          variant="publish"
        />
      </div>

      <Form method="POST" className="mt-5 border-t border-gray-200 pt-4">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-wide text-gray-500">Timezone</span>
          <div className="relative mt-2">
            <GlobeAltIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              name="defaultTimezone"
              defaultValue={defaultTimezone}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            name="intent"
            value="enable-daily-automation"
            disabled={isSubmitting || dailyEnabled || !dailyReady}
            className={clsx(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-black shadow-sm transition disabled:cursor-not-allowed",
              dailyEnabled
                ? "border border-violet-200 bg-violet-50 text-violet-700"
                : dailyReady
                  ? "bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60"
                  : "border border-gray-200 bg-gray-100 text-gray-500",
            )}
          >
            {enableDailyPending ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <ClockIcon className="h-5 w-5" />}
            {enableDailyPending ? "Enabling..." : dailyEnabled ? "Enabled" : "Enable reminder"}
          </button>
          <button
            type="submit"
            name="intent"
            value="run-daily-discovery-now"
            disabled={isSubmitting || !dailyEnabled}
            className={clsx(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-black shadow-sm transition disabled:cursor-not-allowed",
              dailyEnabled
                ? "bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60"
                : "border border-gray-200 bg-gray-100 text-gray-500",
            )}
          >
            {runDailyPending ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <PlayIcon className="h-5 w-5" />}
            {runDailyPending ? "Starting..." : "Run today now"}
          </button>
        </div>
      </Form>
    </section>
  );
}

function PublishAndAutomateDetail({
  run,
  bootstrap,
  isSubmitting,
  isActionPending,
  accountEmail,
  accountEmailVerified,
  channelActionError,
  channelActionIntent,
}: {
  run: VibeMarketingRunSummary;
  bootstrap: VibeMarketingBootstrap;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
  accountEmail?: string | null;
  accountEmailVerified?: boolean | null;
  channelActionError?: string | null;
  channelActionIntent?: string | null;
}) {
  const publishStep = run.workflowProgress?.steps.find((step) => step.id === "publish");
  const automationStep = run.workflowProgress?.steps.find((step) => step.id === "automation");
  const prUrl = publishPrUrlForRun(run);
  const previewUrl = publishPreviewUrlForRun(run);
  const publishChildRunId = stringResultValue(run, "publish_child_run_id", "promoted_publish_job_id");
  const publishSourceRunId =
    run.sourceRunId ||
    stringResultValue(run, "source_run_id", "sourceRunId", "review_source_run_id", "reviewSourceRunId");
  const publishChildWaitReason =
    run.publishChildWaitReason || stringResultValue(run, "publish_child_wait_reason", "publishChildWaitReason");
  const publishChildStatus =
    run.publishChildStatus ||
    stringResultValue(run, "publish_child_status", "publishChildStatus") ||
    (publishChildRunId === run.runId ? run.status : "");
  const publishChildRecoverable = Boolean(
    run.publishChildRecoverable ||
      run.result?.["publish_child_recoverable"] === true ||
      (publishChildRunId === run.runId && run.status === "awaiting_confirmation" && !prUrl && !previewUrl),
  );
  const publishChildMissingRemote = Boolean(
    publishChildRecoverable &&
      /not found in content factory|recorded locally but was not found|queued but did not start/i.test(publishChildWaitReason),
  );
  const publishChildRunning = Boolean(
    publishChildStatus === "queued" ||
      publishChildStatus === "running" ||
      (publishChildRunId === run.runId && (run.status === "queued" || run.status === "running")),
  );
  const publishChildApprovalRequired = Boolean(
    publishChildStatus === "awaiting_approval" ||
      publishChildStatus === "approval_required" ||
      (publishChildRunId === run.runId && run.approvalState === "approval_required"),
  );
  const publishHandoffPending = run.result?.["publish_handoff_pending"] === true;
  const publishHandoffStale = Boolean(
    publishHandoffPending &&
      run.result?.["publish_handoff_stale"] === true &&
      !publishChildRunId &&
      !prUrl &&
      !previewUrl,
  );
  const publishPending = Boolean(
    !publishHandoffStale &&
      !publishChildRecoverable &&
      !publishChildApprovalRequired &&
      (publishStep?.status === "running" ||
        publishChildRunning ||
        (publishHandoffPending && !publishChildRunId)),
  );
  const prNumber =
    stringResultValue(run, "pr_number", "pull_request_number", "draft_pr_number") ||
    prNumberFromPullUrl(prUrl);
  const checksStatus = stringResultValue(run, "checks_status", "checksStatus");
  const promotePending = isActionPending?.("promote-bundle", "publish-pr") ?? isSubmitting;
  const mergePending = isActionPending?.("merge-publish-pr") ?? isSubmitting;
  const resumePending = isActionPending?.("resume") ?? isSubmitting;
  const enableDailyPending = isActionPending?.("enable-daily-automation") ?? isSubmitting;
  const runDailyPending = isActionPending?.("run-daily-discovery-now") ?? isSubmitting;
  const mergeStatus = stringResultValue(run, "merge_status", "mergeStatus");
  const isMerged = mergeStatus === "merged";
  const mergeBlockedReason = stringResultValue(run, "merge_blocked_reason", "mergeBlockedReason");
  const autoMergeState = stringResultValue(run, "publish_auto_merge_state", "publishAutoMergeState");
  const autoMergeEnabled = run.result?.["publish_auto_merge"] === true;
  const publishChildPreviewUrl = stringResultValue(run, "publish_child_preview_url", "publishChildPreviewUrl");
  const publishedWithoutPr = Boolean(!prUrl && (previewUrl || publishChildPreviewUrl) && publishChildStatus === "completed");
  const mergeBlocked = Boolean(
    prUrl &&
      !isMerged &&
      (autoMergeState === "blocked" || ["failed", "failure", "error", "closed"].includes(checksStatus)),
  );
  const publishChildFailed = Boolean(
    !prUrl &&
      !isMerged &&
      !publishedWithoutPr &&
      (publishChildStatus === "failed" || (publishChildRunId === run.runId && run.status === "failed")),
  );
  // The article content lives on the run that has the component manifest — the
  // current run if it has one, otherwise the source (parent) run. The failed
  // publish child has no manifest, so this resolves to the parent.
  const articleViewRunId = run.componentManifest ? run.runId : publishSourceRunId || run.runId;
  const canViewArticle = Boolean(run.componentManifest || publishSourceRunId);
  const viewArticleHref = `/founder-tools/marketing/runs/${encodeURIComponent(articleViewRunId)}?articleStep=review`;
  // Resume targets the failed publish run. When viewing the article (parent),
  // that's the child via targetRunId; when viewing the child itself, the
  // current run (no targetRunId needed).
  const resumePublishTargetRunId = publishChildRunId && publishChildRunId !== run.runId ? publishChildRunId : "";
  const dailyCheck = bootstrap.checks.dailyAutomation as
    | (VibeMarketingBootstrap["checks"][string] & { ready?: boolean; enabled?: boolean })
    | undefined;
  const dailyEnabled = Boolean(bootstrap.settings.dailyDiscoveryEnabled || dailyCheck?.enabled || dailyCheck?.passed);
  const dailyReady = Boolean(dailyEnabled || dailyCheck?.ready || dailyCheck?.passed);
  const defaultTimezone = bootstrap.settings.defaultTimezone ?? "Australia/Melbourne";
  const dailyChannels = dailyCheck?.channels ?? [];

  return (
    <div className="space-y-5">
      {publishChildMissingRemote ? null : (
        <ArticleRunStageProgress run={run} variant="embedded" reviewHref={canViewArticle ? viewArticleHref : undefined} />
      )}
      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">Publish & automate</p>
            <h2 className="mt-1 text-xl font-black text-gray-950">Finish publishing this article</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-600">
              Publish the article — the PR merges to main automatically once checks pass — then turn on daily research prompts (Slack, email or WhatsApp) for the next article.
            </p>
            {canViewArticle ? (
              <Link
                to={viewArticleHref}
                className="mt-3 inline-flex items-center gap-1 text-sm font-black text-violet-700 transition hover:text-violet-900"
              >
                View article
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <WorkflowStatusPill status={automationStep?.status === "complete" ? "complete" : publishStep?.status ?? "ready"} />
        </div>

        <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
          <PublishFlowCard
            title="Publish"
            status={
              isMerged || publishedWithoutPr
                ? "complete"
                : mergeBlocked || publishChildFailed
                  ? "blocked"
                  : prUrl || publishPending
                    ? "running"
                    : "ready"
            }
            eyebrow={
              isMerged
                ? "Merged"
                : publishedWithoutPr
                  ? "Published"
                  : mergeBlocked
                    ? "Merge blocked"
                    : prUrl
                      ? checksStatus
                        ? `Checks ${checksStatus}`
                        : "Waiting for checks"
                      : publishPending
                        ? "Creating PR"
                        : publishChildFailed
                          ? "Publish failed"
                          : publishChildRecoverable
                            ? "Resume needed"
                            : publishChildApprovalRequired
                              ? "Review needed"
                              : publishHandoffStale
                                ? "Retry needed"
                                : "Ready"
            }
          >
            {isMerged ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {prNumber
                    ? `Pull request #${prNumber} has been merged to main. The article deploys with the next site build.`
                    : "The publish pull request has been merged to main. The article deploys with the next site build."}
                </p>
                {prUrl ? (
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black"
                  >
                    Open merged PR
                  </a>
                ) : null}
              </div>
            ) : publishedWithoutPr ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">The article was published without a pull request.</p>
                <a
                  href={previewUrl || publishChildPreviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black"
                >
                  Open published article
                </a>
              </div>
            ) : mergeBlocked ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {mergeBlockedReason || "The PR could not be merged automatically. Open it on GitHub to investigate, then retry."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Open PR
                  </a>
                  <Form method="POST">
                    <button
                      type="submit"
                      name="intent"
                      value="merge-publish-pr"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black disabled:opacity-50"
                    >
                      {mergePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                      {mergePending ? "Checking..." : "Retry merge"}
                    </button>
                  </Form>
                </div>
              </div>
            ) : prUrl && autoMergeEnabled ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {prNumber ? `Pull request #${prNumber} is open.` : "The publish pull request is open."} It merges to main
                  automatically once GitHub checks pass. This page updates on its own.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-black text-gray-500"
                  >
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                    Waiting for checks
                  </button>
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Open PR
                  </a>
                </div>
              </div>
            ) : prUrl ? (
              <Form method="POST" className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {prNumber ? `Pull request #${prNumber} is ready.` : "The publish pull request is ready."} The app checks
                  GitHub status before merging. If checks are still pending or failing, it will leave the PR open.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    name="intent"
                    value="merge-publish-pr"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {mergePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                    {mergePending ? "Checking..." : "Check and merge"}
                  </button>
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Open PR
                  </a>
                </div>
              </Form>
            ) : publishPending ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  Creating the publish PR. Once checks pass it merges to main automatically — this page updates on its own.
                </p>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-black text-gray-500"
                >
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Creating PR
                </button>
              </div>
            ) : publishChildFailed ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {publishChildWaitReason ||
                    "The publish run failed before a PR was created — a worker likely stalled mid-run. Resume to continue from where it stopped."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Form method="POST">
                    {resumePublishTargetRunId ? <input type="hidden" name="targetRunId" value={resumePublishTargetRunId} /> : null}
                    <button
                      type="submit"
                      name="intent"
                      value="resume"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                    >
                      <ArrowPathIcon className={clsx("h-4 w-4", resumePending && "animate-spin")} />
                      {resumePending ? "Resuming..." : "Resume publish"}
                    </button>
                  </Form>
                  {publishChildRunId && publishChildRunId !== run.runId ? (
                    <a
                      href={`/founder-tools/marketing/runs/${encodeURIComponent(publishChildRunId)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                      Open publish run
                    </a>
                  ) : null}
                </div>
              </div>
            ) : publishChildRecoverable ? (
              <Form method="POST" className="space-y-3">
                {publishSourceRunId ? <input type="hidden" name="sourceRunId" value={publishSourceRunId} /> : null}
                <input type="hidden" name="autoMerge" value="true" />
                <p className="text-sm font-semibold text-gray-600">
                  {publishChildMissingRemote
                    ? "The publish job was queued but did not start. Retry will safely recreate the same PR job."
                    : "The publish run is waiting for confirmation instead of creating a PR. Resume will safely reuse the existing publish run."}
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="promote-bundle"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                >
                  <ArrowPathIcon className={clsx("h-4 w-4", promotePending && "animate-spin")} />
                  {promotePending ? "Publishing..." : publishChildMissingRemote ? "Retry publishing" : "Resume publishing"}
                </button>
              </Form>
            ) : publishChildApprovalRequired ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  The publish run needs review before it can continue.
                </p>
                {publishChildRunId && publishChildRunId !== run.runId ? (
                  <a
                    href={`/founder-tools/marketing/runs/${encodeURIComponent(publishChildRunId)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black"
                  >
                    Open publish review
                  </a>
                ) : (
                  <RunApprovalActions isSubmitting={isSubmitting} isActionPending={isActionPending} approveLabel="Approve publish" denyLabel="Deny publish" />
                )}
              </div>
            ) : publishHandoffStale ? (
              <Form method="POST" className="space-y-3">
                <input type="hidden" name="autoMerge" value="true" />
                <p className="text-sm font-semibold text-gray-600">
                  The previous publish attempt did not produce a PR. Retry will safely reuse any existing publish run if one was created.
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="promote-bundle"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                >
                  <ArrowPathIcon className={clsx("h-4 w-4", promotePending && "animate-spin")} />
                  {promotePending ? "Publishing..." : "Retry publishing"}
                </button>
              </Form>
            ) : (
              <Form method="POST" className="space-y-3">
                <input type="hidden" name="autoMerge" value="true" />
                <p className="text-sm font-semibold text-gray-600">
                  Create the publish PR; once GitHub checks pass it merges to main automatically.
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="promote-bundle"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {promotePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                  {promotePending ? "Publishing..." : "Publish article"}
                </button>
              </Form>
            )}
          </PublishFlowCard>

          <PublishDailyResearchReminderCard
            channels={dailyChannels}
            dailyEnabled={dailyEnabled}
            dailyReady={dailyReady}
            defaultTimezone={defaultTimezone}
            enableDailyPending={enableDailyPending}
            runDailyPending={runDailyPending}
            isSubmitting={isSubmitting}
            accountEmail={accountEmail}
            accountEmailVerified={accountEmailVerified}
            channelActionError={channelActionError}
            channelActionIntent={channelActionIntent}
          />
        </div>

        {previewUrl || publishChildPreviewUrl ? (
          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <a
              href={previewUrl || publishChildPreviewUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-black text-emerald-800 hover:text-emerald-950"
            >
              Open published preview
            </a>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function PublishFlowCard({
  title,
  status,
  eyebrow,
  children,
}: {
  title: string;
  status: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black leading-7 text-gray-950">{title}</h3>
          <p className="mt-1 text-xs font-black uppercase tracking-wide text-gray-500">{eyebrow}</p>
        </div>
        <WorkflowStatusPill status={status} compact />
      </div>
      {children}
    </section>
  );
}

function WorkflowStatusPill({ status, compact = false }: { status: string; compact?: boolean }) {
  const normalized = String(status || "").toLowerCase();
  const label =
    normalized === "complete"
      ? "Complete"
      : normalized === "running"
        ? "Running"
        : normalized === "ready"
          ? "Ready"
          : normalized === "locked"
            ? "Locked"
            : "Needs attention";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-black uppercase tracking-wide",
        compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        normalized === "complete"
          ? "bg-emerald-50 text-emerald-700"
          : normalized === "running"
            ? "bg-violet-50 text-violet-700"
            : normalized === "ready"
              ? "bg-blue-50 text-blue-700"
              : normalized === "locked"
                ? "bg-gray-100 text-gray-500"
                : "bg-red-50 text-red-700",
      )}
    >
      {label}
    </span>
  );
}

function ArticleCommentCanvas({
  comments,
  components,
  measurements,
  pendingPin,
  targetRunId,
  openCommentId,
  onOpenComment,
  onClearPending,
  onCommentsChange,
  onSelectComponent,
  readOnly = false,
}: {
  comments: VibeMarketingComponentFeedbackComment[];
  components: VibeMarketingComponentManifestItem[];
  measurements: Record<string, InspectorComponentMeasurement>;
  pendingPin: PendingCommentPin | null;
  targetRunId?: string | null;
  openCommentId: string | null;
  onOpenComment: (id: string | null) => void;
  onClearPending: () => void;
  onCommentsChange: (updater: (comments: VibeMarketingComponentFeedbackComment[]) => VibeMarketingComponentFeedbackComment[]) => void;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  readOnly?: boolean;
}) {
  const fetcher = useFetcher();
  const isSaving = fetcher.state !== "idle";
  const legacyFallbackStackByComponent = new Map<string, number>();

  useEffect(() => {
    const savedComment = savedCommentFromFetcherData(fetcher.data);
    if (savedComment) {
      onCommentsChange((current) => reconcileSavedComment(current, savedComment));
    }
  }, [fetcher.data, onCommentsChange]);

  function submitComment(intent: "add-component-comment" | "update-component-comment", options: {
    commentId?: string;
    component: VibeMarketingComponentManifestItem;
    body: string;
    anchor?: VibeMarketingComponentCommentAnchor | null;
    context?: VibeMarketingComponentCommentContext | null;
  }) {
    const formData = new FormData();
    formData.set("intent", intent);
    if (targetRunId) formData.set("targetRunId", targetRunId);
    if (options.commentId) formData.set("commentId", options.commentId);
    appendCommentFormFields(formData, options.component, options.body, options.anchor, options.context);
    if (intent === "add-component-comment") {
      const now = new Date().toISOString();
      const optimisticComment: VibeMarketingComponentFeedbackComment = {
        id: `optimistic-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        componentId: options.component.id,
        componentType: options.component.type || "component",
        componentLabel: options.component.label ?? options.component.id,
        sourceSectionId: options.component.sourceSectionId ?? null,
        selector: options.component.selector ?? `[data-cf-component-id="${options.component.id}"]`,
        anchor: options.anchor ?? null,
        context: options.context ?? null,
        body: options.body,
        status: "draft",
        batchId: null,
        createdAt: now,
        updatedAt: now,
      };
      onCommentsChange((current) => [...current, optimisticComment]);
    } else if (options.commentId) {
      onCommentsChange((current) =>
        current.map((comment) =>
          comment.id === options.commentId
            ? {
                ...comment,
                componentId: options.component.id,
                componentType: options.component.type || comment.componentType,
                componentLabel: options.component.label ?? comment.componentLabel,
                sourceSectionId: options.component.sourceSectionId ?? comment.sourceSectionId,
                selector: options.component.selector ?? comment.selector,
                anchor: options.anchor ?? comment.anchor,
                context: options.context ?? comment.context,
                body: options.body,
                updatedAt: new Date().toISOString(),
              }
            : comment,
        ),
      );
    }
    fetcher.submit(formData, { method: "POST" });
  }

  function deleteComment(commentId: string) {
    const formData = new FormData();
    formData.set("intent", "delete-component-comment");
    if (targetRunId) formData.set("targetRunId", targetRunId);
    formData.set("commentId", commentId);
    onCommentsChange((current) => current.filter((comment) => comment.id !== commentId));
    fetcher.submit(formData, { method: "POST" });
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {comments.map((comment, index) => {
        const measurement = measurements[comment.componentId];
        if (!measurement) return null;
        const ordinal = index + 1;
        const anchor = comment.anchor ?? { x: 1, y: 0, createdFrom: "legacy_fallback" };
        const position = positionForAnchor(measurement.rect, anchor);
        const isLegacyFallback = !comment.anchor;
        const fallbackStackIndex = legacyFallbackStackByComponent.get(comment.componentId) ?? 0;
        if (isLegacyFallback) legacyFallbackStackByComponent.set(comment.componentId, fallbackStackIndex + 1);
        const left = isLegacyFallback ? position.left - 18 : position.left;
        const top = isLegacyFallback ? position.top + 22 + fallbackStackIndex * 28 : position.top;
        const isOpen = openCommentId === comment.id;
        const component = componentForComment(comment, components);
        return (
          <div key={comment.id} className="pointer-events-auto absolute" style={{ left, top }}>
            <button
              type="button"
              onClick={() => {
                onSelectComponent(component);
                onOpenComment(isOpen ? null : comment.id);
              }}
              className={clsx(
                "flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-black shadow-lg transition",
                comment.status === "draft"
                  ? "border-white bg-violet-600 text-white hover:bg-violet-700"
                  : "border-white bg-emerald-600 text-white hover:bg-emerald-700",
              )}
              aria-label={`Open comment for ${comment.componentLabel || comment.componentId}`}
            >
              {ordinal}
            </button>
            {isOpen ? (
              <CommentPopover
                title={comment.componentLabel || component.label || comment.componentId}
                status={comment.status}
                initialBody={comment.body}
                readOnly={readOnly || comment.status !== "draft"}
                isSaving={isSaving}
                onSave={(body) => {
                  submitComment("update-component-comment", {
                    commentId: comment.id,
                    component,
                    body,
                    anchor: comment.anchor,
                    context: comment.context,
                  });
                  onOpenComment(null);
                }}
                onCancel={() => onOpenComment(null)}
                onDelete={
                  !readOnly && comment.status === "draft"
                    ? () => {
                        deleteComment(comment.id);
                        onOpenComment(null);
                      }
                    : undefined
                }
              />
            ) : null}
          </div>
        );
      })}

      {!readOnly && pendingPin && measurements[pendingPin.component.id] ? (
        <div
          className="pointer-events-auto absolute"
          style={positionForAnchor(measurements[pendingPin.component.id].rect, pendingPin.anchor)}
        >
          <div className="flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-xs font-black text-white shadow-lg">
            {comments.length + 1}
          </div>
          <CommentPopover
            title={pendingPin.component.label || pendingPin.component.id}
            status="draft"
            initialBody=""
            isSaving={isSaving}
            onSave={(body) => {
              submitComment("add-component-comment", {
                component: pendingPin.component,
                body,
                anchor: pendingPin.anchor,
                context: pendingPin.context,
              });
              onClearPending();
            }}
            onCancel={onClearPending}
          />
        </div>
      ) : null}
    </div>
  );
}

function CommentPopover({
  title,
  status,
  initialBody,
  readOnly = false,
  isSaving,
  onSave,
  onCancel,
  onDelete,
}: {
  title: string;
  status: string;
  initialBody: string;
  readOnly?: boolean;
  isSaving: boolean;
  onSave: (body: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [body, setBody] = useState(initialBody);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const commit = useCallback(() => {
    if (readOnly) {
      onCancel();
      return;
    }
    const trimmed = body.trim();
    if (!trimmed) {
      onCancel();
      return;
    }
    if (trimmed === initialBody.trim()) {
      onCancel();
      return;
    }
    onSave(trimmed);
  }, [body, initialBody, onCancel, onSave, readOnly]);

  return (
    <div
      ref={popoverRef}
      className="absolute left-4 top-4 z-30 w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-gray-200 bg-white p-3 text-left shadow-2xl"
      onBlurCapture={() => {
        window.setTimeout(() => {
          if (!popoverRef.current?.contains(document.activeElement)) commit();
        }, 0);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") commit();
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="line-clamp-1 text-sm font-black text-gray-950">{title}</p>
          <span className={clsx("mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase", statusTone(status))}>
            {status}
          </span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-2 py-1 text-xs font-black text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      {readOnly ? (
        <p className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 px-3 py-2 text-sm leading-6 text-gray-700">
          {body}
        </p>
      ) : (
        <textarea
          value={body}
          autoFocus
          rows={4}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Leave a specific change request..."
          className="w-full resize-none rounded-lg border border-violet-200 px-3 py-2 text-sm font-medium leading-6 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />
      )}
      {!readOnly ? (
        <div className="mt-3 flex items-center justify-between gap-2">
          {onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              disabled={isSaving}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
            >
              <TrashIcon className="h-3.5 w-3.5" />
              Delete
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={commit}
            disabled={isSaving || !body.trim()}
            className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function statusTone(status: string) {
  if (status === "draft") return "bg-gray-100 text-gray-700";
  if (status === "applied") return "bg-emerald-50 text-emerald-700";
  if (status === "failed") return "bg-red-50 text-red-700";
  return "bg-violet-50 text-violet-700";
}

function canCancelArticleRun(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow)) return false;
  if (["completed", "cancelled"].includes(run.status)) return false;
  return !hasExternalPublishEvidence(run);
}

function hasExternalPublishEvidence(run: VibeMarketingRunSummary) {
  return Boolean(
    run.prUrl ||
      stringResultValue(run, "pr_url", "prUrl", "pull_request_url", "pullRequestUrl", "draft_pr_url", "draftPrUrl"),
  );
}

function ArticleRunActionsMenu({
  run,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const canCancel = canCancelArticleRun(run);
  const cancelPending = isActionPending?.("cancel-article") ?? isSubmitting;

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
        <EllipsisHorizontalIcon className="h-5 w-5" />
        <span className="sr-only">Article actions</span>
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-xl"
        >
          <button
            type="button"
            role="menuitem"
            disabled={!canCancel || isSubmitting}
            onClick={() => {
              if (!canCancel) return;
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-white"
          >
            <TrashIcon className="h-4 w-4" />
            Cancel article
          </button>
        </div>
      ) : null}

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-red-100 bg-white p-5 shadow-2xl">
            <h2 className="text-lg font-black text-gray-950">Cancel article?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
              This stops the current article run, removes generated content for this run, and returns you to a clean article creation flow.
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={cancelPending}
                onClick={() => setConfirmOpen(false)}
                className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Keep article
              </button>
              <Form method="POST">
                <button
                  type="submit"
                  name="intent"
                  value="cancel-article"
                  disabled={cancelPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50 sm:w-auto"
                >
                  {cancelPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
                  {cancelPending ? "Cancelling..." : "Cancel article"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ArticleWorkflowPrimaryAction({
  run,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const publishStep = run.workflowProgress?.steps.find((step) => step.id === "publish");
  const publishUrl = publishPreviewUrlForRun(run) || publishPrUrlForRun(run);
  const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black shadow-sm transition disabled:opacity-50";

  if (isArticleReviewPreviewReady(run)) return null;
  if (isPublishApprovalGate(run)) return null;

  if (publishStep?.status === "ready" && publishStep.primaryAction?.intent) {
    const publishPending = isActionPending?.(publishStep.primaryAction.intent) ?? isSubmitting;
    return (
      <Form method="POST">
        <button type="submit" name="intent" value={publishStep.primaryAction.intent} disabled={isSubmitting} className={`${buttonClass} bg-gray-950 text-white hover:bg-black`}>
          {publishPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
          {publishPending ? "Preparing publish..." : publishStep.primaryAction.label || "Publish to website"}
        </button>
      </Form>
    );
  }

  if (publishStep?.status === "complete" && publishUrl) {
    return (
      <a href={publishUrl} target="_blank" rel="noreferrer" className={`${buttonClass} bg-gray-950 text-white hover:bg-black`}>
        Open publish evidence
      </a>
    );
  }

  return null;
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

function resultObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function compactString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function compactStringList(value: unknown, limit = 5) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const category = compactString(record.category);
        const field = compactString(record.field) || compactString(record.mismatch_id) || compactString(record.mismatchId);
        const summary = compactString(record.summary) || compactString(record.reason);
        const expected = compactString(record.expected);
        const actual = compactString(record.actual);
        if (summary || category || field) {
          const label = [category, field].filter(Boolean).join(" / ");
          const comparison = expected || actual ? `expected ${expected || "n/a"}, actual ${actual || "n/a"}` : "";
          return [label ? `${label}: ${summary || "mismatch"}` : summary, comparison].filter(Boolean).join(" ");
        }
        return compactString(record.url) || compactString(record.path) || compactString(record.message) || compactString(record.error);
      }
      return "";
    })
    .filter(Boolean)
    .slice(0, limit);
}

function formatPreviewFailureDetails(
  value: unknown,
  options: { includeStepKind?: boolean } = {},
) {
  if (typeof value === "string") return value.trim();
  const details = resultObject(value);
  if (!Object.keys(details).length) return "";

  const includeStepKind = options.includeStepKind ?? true;
  const lines: string[] = [];
  const pushLine = (line: string) => {
    const normalized = line.replace(/\s+/g, " ").trim().toLowerCase();
    if (!normalized || lines.some((existing) => existing.replace(/\s+/g, " ").trim().toLowerCase() === normalized)) return;
    lines.push(line);
  };
  const summary = compactString(details.summary) || compactString(details.message) || compactString(details.error);
  if (summary) pushLine(summary);

  const failedStep = compactString(details.failed_step) || compactString(details.failedStep);
  const failureKind = compactString(details.failure_kind) || compactString(details.failureKind);
  if (includeStepKind && failedStep) pushLine(`Failed step: ${failedStep.replace(/_/g, " ")}`);
  if (includeStepKind && failureKind) pushLine(`Failure kind: ${failureKind.replace(/_/g, " ")}`);

  const failedRequestPaths = compactStringList(details.failed_request_paths ?? details.failedRequestPaths);
  const failedRequests = failedRequestPaths.length ? failedRequestPaths : compactStringList(details.failed_requests ?? details.failedRequests);
  if (failedRequests.length && !/failed requests:/i.test(summary)) {
    const total = Array.isArray(details.failed_requests) ? details.failed_requests.length : failedRequests.length;
    const remaining = Math.max(total - failedRequests.length, 0);
    pushLine(`Failed requests: ${failedRequests.join(", ")}${remaining ? ` (+${remaining} more)` : ""}`);
  }

  const consoleErrors = compactStringList(details.console_errors ?? details.consoleErrors, 3);
  if (consoleErrors.length && !/console errors:/i.test(summary)) pushLine(`Console errors: ${consoleErrors.join(" | ")}`);

  const reasons = compactStringList(details.reasons, 5);
  if (reasons.length && !/reasons:/i.test(summary)) pushLine(`Reasons: ${reasons.map((reason) => reason.replace(/_/g, " ")).join(", ")}`);

  const score = typeof details.score === "number" ? details.score : Number.NaN;
  if (Number.isFinite(score) && !/style score:/i.test(summary)) pushLine(`Style score: ${score.toFixed(2)}`);

  const mismatchSummaries = compactStringList(details.mismatch_summaries ?? details.mismatchSummaries, 5);
  const mismatches = mismatchSummaries.length ? mismatchSummaries : compactStringList(details.mismatches, 5);
  if (mismatches.length && !/mismatches:/i.test(summary)) pushLine(`Style mismatches: ${mismatches.join(" | ")}`);

  const advisorySummaries = compactStringList(details.advisory_mismatch_summaries ?? details.advisoryMismatchSummaries, 3);
  const advisory = advisorySummaries.length ? advisorySummaries : compactStringList(details.advisory_mismatches ?? details.advisoryMismatches, 3);
  if (advisory.length && !/advisory differences:/i.test(summary)) pushLine(`Advisory differences: ${advisory.join(" | ")}`);

  const findings = compactStringList(details.deterministic_findings ?? details.deterministicFindings, 5);
  if (findings.length && !/findings:/i.test(summary)) pushLine(`Findings: ${findings.join(" | ")}`);

  const repairInstructions = compactStringList(details.repair_instructions ?? details.repairInstructions, 3);
  if (repairInstructions.length && !/repair:/i.test(summary) && !/repair guidance:/i.test(summary)) pushLine(`Repair guidance: ${repairInstructions.join(" | ")}`);

  return lines.join(" ").trim();
}

function resultValue(run: VibeMarketingRunSummary, key: string): unknown {
  if (run.result?.[key] !== undefined) return run.result[key];
  const nestedResult = resultObject(run.result?.result);
  if (nestedResult[key] !== undefined) return nestedResult[key];
  const latestControl = resultObject(run.result?.latest_control_response);
  return latestControl[key];
}

function hasConcreteArticleSurfaceHint(value: unknown) {
  if (typeof value === "string") return Boolean(value.trim());
  const hint = resultObject(value);
  return [
    "route",
    "route_path",
    "routePath",
    "path",
    "public_url",
    "publicUrl",
    "listing_url",
    "listingUrl",
    "article_surface_url",
    "articleSurfaceUrl",
    "url",
  ].some((key) => typeof hint[key] === "string" && Boolean((hint[key] as string).trim()));
}

function scanHasArticleSurfaceHint(run: VibeMarketingRunSummary) {
  return hasConcreteArticleSurfaceHint(resultValue(run, "article_surface_hint")) || hasConcreteArticleSurfaceHint(resultValue(run, "articleSurfaceHint"));
}

function setupRunIdForRun(run: VibeMarketingRunSummary) {
  const direct = stringResultValue(run, "setup_run_id", "setupRunId", "scaffold_job_id", "scaffoldJobId");
  if (direct) return direct;
  const setup = articleSystemSetupPayload(run);
  const setupRunId = setup.setup_run_id ?? setup.setupRunId;
  return typeof setupRunId === "string" && setupRunId.trim() ? setupRunId.trim() : "";
}

function prNumberFromPullUrl(url: string) {
  const match = url.match(/\/pull\/(\d+)/);
  return match?.[1] ?? "";
}

function deliveryModeForRun(run: VibeMarketingRunSummary, bootstrap: VibeMarketingBootstrap) {
  const runMode = stringResultValue(run, "resolved_delivery_mode", "delivery_mode", "deliveryMode");
  if (runMode === "review_draft" || runMode === "publish_code" || runMode === "content_only") {
    return runMode;
  }
  return effectiveArticleDeliveryMode(bootstrap);
}

function isSetupScanRun(run: VibeMarketingRunSummary) {
  if (!SCAN_WORKFLOWS.has(run.workflow)) return false;
  const scanPurpose = stringResultValue(run, "scan_purpose", "scanPurpose");
  return scanPurpose === "setup" || Boolean(setupRunIdForRun(run)) || scanHasArticleSurfaceHint(run);
}

function setupWorkflowStepIdForRun(run: VibeMarketingRunSummary) {
  const setupStatus = articleSystemSetupStatus(run);
  if (isArticleSystemSetupPublishState(run) || run.currentStep === "create_pull_request" || run.currentStep === "merged") return "publish";
  if (run.status === "completed" || setupStatus === "manual_merge_required") return "publish";
  if (exactLivePreviewUrl(run.livePreview) || articleSystemSetupExactPreviewUrl(run)) return "review";
  if ((run.status === "awaiting_approval" || run.status === "approval_required") && articleSystemSetupExactPreviewUrl(run)) return "review";
  return "generate";
}

function setupStepViewFromSearch(search: string): ArticleSetupStepView | null {
  const value = new URLSearchParams(search).get("setupStep");
  return value && SETUP_STEP_VIEW_VALUES.has(value) ? (value as ArticleSetupStepView) : null;
}

function articleStepViewFromSearch(search: string): "generate" | "review" | "publish" | null {
  const value = new URLSearchParams(search).get("articleStep");
  return value && SETUP_STEP_VIEW_VALUES.has(value) ? (value as "generate" | "review" | "publish") : null;
}

function workflowProgressForRunPage(
  run: VibeMarketingRunSummary,
  fallbackProgress: VibeMarketingWorkflowProgress | null | undefined,
): VibeMarketingWorkflowProgress | null {
  const progress = run.workflowProgress ?? fallbackProgress ?? null;
  if (progress && run.workflow === "article_system_setup") {
    const activeStepId = setupWorkflowStepIdForRun(run);
    const setupStatus = articleSystemSetupStatus(run);
    const manualMergeRequired = setupStatus === "manual_merge_required";
    const setupPrCreated = isArticleSystemSetupPublishState(run);
    const setupMerged = isArticleSystemSetupMerged(run);
    const setupActive = isActiveArticleSystemSetupRun(run);
    const setupTerminal = !setupActive && isTerminalAttentionStatus(run.status);
    const setupPreviewActive = !setupTerminal && hasActiveLivePreview(run.livePreview);
    const setupFailed = !setupActive && !setupPreviewActive && (isFailedArticlePreview(run.livePreview) || setupTerminal || ARTICLE_SETUP_FAILED_STATUSES.has(setupStatus));
    const setupComplete = setupMerged && !manualMergeRequired;
    const reviewComplete = setupPrCreated || setupComplete;
    const reviewReady = activeStepId === "review" || reviewComplete;
    return {
      ...progress,
      currentStepId: activeStepId,
      nextStepId: activeStepId === "generate" ? "review" : activeStepId === "review" ? "publish" : null,
      steps: progress.steps.map((step) => {
        if (["profile", "baseline", "repo", "article_system"].includes(step.id)) {
          return { ...step, status: "complete" };
        }
        if (step.id === "generate") {
          return {
            ...step,
            label: "Build setup page",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}?setupStep=generate`,
            summary: "Create the setup branch and exact hosted preview for the articles/blogs directory.",
            status: reviewComplete || reviewReady ? "complete" : setupFailed ? "blocked" : "running",
          };
        }
        if (step.id === "review" || step.id === "revise") {
          return {
            ...step,
            label: step.id === "review" ? "Review setup preview" : "Request setup revisions",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}?setupStep=review`,
            summary: "Inspect the setup preview and leave revision comments.",
            status: reviewComplete ? "complete" : reviewReady ? "needs_action" : "locked",
          };
        }
        if (step.id === "package" || step.id === "publish") {
          return {
            ...step,
            label: step.id === "publish" ? "Publish" : "Publish ready",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}?setupStep=publish`,
            summary: setupComplete
              ? "Your published setup is being verified."
              : setupPrCreated
                ? "Publish the articles setup, then enable daily article reminders."
                : "Publish the approved setup preview.",
            status: setupComplete ? "complete" : setupPrCreated || manualMergeRequired ? "needs_action" : "locked",
          };
        }
        if (step.id === "research" || step.id === "choose_topic" || step.id === "automation") {
          return { ...step, status: "locked" };
        }
        return step;
      }),
    };
  }
  if (!progress || !isArticleGenerationWorkflow(run.workflow) || !POLLING_STATUSES.has(run.status)) {
    return progress;
  }
  if (progress.currentStepId === "publish" || progress.currentStepId === "automation" || hasPublishHandoffEvidence(run)) {
    return progress;
  }

  return {
    ...progress,
    currentStepId: "generate",
    nextStepId: progress.nextStepId === "generate" ? null : progress.nextStepId,
    steps: progress.steps.map((step) =>
      step.id === "generate"
        ? {
            ...step,
            status: "running",
          }
        : step,
    ),
  };
}

export default function FounderToolsMarketingRun() {
  const {
    run: loaderRun,
    bootstrap,
    setupRun: loaderSetupRun,
    githubRepos,
    accountEmail,
    accountEmailVerified,
    billingRequestIds,
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const location = useLocation();
  const revalidator = useRevalidator();
  const runStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const previewStartFetcher = useFetcher<typeof action>();
  const previewStartRunRef = useRef("");
  const statusRefreshRef = useRef("");
  const lastProgressSignatureRef = useRef("");
  const lastProgressAtRef = useRef(Date.now());
  const [polledRun, setPolledRun] = useState<VibeMarketingRunSummary | null>(null);
  const [pageVisible, setPageVisible] = useState(true);
  const run = polledRun ?? loaderRun;
  const [selectedComponent, setSelectedComponent] = useState<VibeMarketingComponentManifestItem | null>(null);
  const workflow = String(run.workflow ?? "");
  const isScanRun = SCAN_WORKFLOWS.has(workflow);
  const isSetupScanContext = isScanRun && isSetupScanRun(run);
  const isStaleScan = isScanRun && Boolean(run.stale || run.staleReason === "scan_queue_not_started");
  const isScanActionNeeded = isScanRun && ["awaiting_confirmation", "awaiting_approval", "approval_required"].includes(run.status);
  const isRunActionNeeded = ["awaiting_confirmation", "awaiting_delivery_mode", "awaiting_approval", "approval_required"].includes(run.status);
  const isScanCompleted = isScanRun && run.status === "completed";
  const isArticleSystemSetupRun = workflow === "article_system_setup";
  const setupRun = isArticleSystemSetupRun ? run : loaderSetupRun;
  const activeSetupRun = setupRun && isActiveArticleSystemSetupRun(setupRun) ? setupRun : null;
  const setupRunActive = isArticleSystemSetupRun ? isActiveArticleSystemSetupRun(run) : Boolean(activeSetupRun);
  const pollRunId = activeSetupRun?.runId ?? loaderRun.runId;
  const statusUrl = `/founder-tools/marketing/runs/${encodeURIComponent(pollRunId)}/status`;
  const setupTerminal = ["blocked", "failed", "cancelled", "canceled"].includes(run.status);
  const setupPreviewActive = isArticleSystemSetupRun && !setupTerminal && hasActiveLivePreview(run.livePreview);
  const setupPreviewFailed = isArticleSystemSetupRun && !setupRunActive && (setupTerminal || isFailedArticlePreview(run.livePreview));
  const shouldPoll =
    setupRunActive ||
    (POLLING_STATUSES.has(run.status) && !isRunActionNeeded && !isScanCompleted && !isStaleScan && !setupPreviewFailed) ||
    setupPreviewActive ||
    hasPendingArticlePreview(run) ||
    (hasPublishHandoffEvidence(run) && !isPublishFlowSettled(run));
  const isArticleWorkflowRun = isArticleWorkflow(workflow);
  const isArticleGenerationRun = isArticleGenerationWorkflow(workflow);
  const hasArticlePreview = hasReadyArticlePreview(run);
  const setupBlocked = isArticleSystemSetupBlocked(bootstrap);
  const isDiscoveryConfirmation =
    ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(workflow) &&
    run.status === "awaiting_confirmation" &&
    !setupBlocked;
  const isPublishApproval = isPublishApprovalGate(run);
  const effectiveSetupPreviewRun = setupRun ?? (isScanRun && setupRunIdForRun(run) ? run : null);
  const showRunAttentionBanner = RESUMABLE_ATTENTION_STATUSES.has(run.status);
  const canResume = Boolean(run.resumeAvailable && RESUMABLE_ATTENTION_STATUSES.has(run.status));
  const discoveryCandidates = useMemo(
    () => (isDiscoveryConfirmation ? topicCandidatesFromRun(run) : []),
    [isDiscoveryConfirmation, run],
  );
  const [selectedDiscoveryCandidateId, setSelectedDiscoveryCandidateId] = useState(discoveryCandidates[0]?.id ?? "");
  const selectedDiscoveryCandidate = useMemo(
    () => discoveryCandidates.find((candidate) => candidate.id === selectedDiscoveryCandidateId) ?? discoveryCandidates[0] ?? null,
    [discoveryCandidates, selectedDiscoveryCandidateId],
  );
  const requestedSetupStep = isArticleSystemSetupRun ? setupStepViewFromSearch(location.search) : null;
  const requestedArticleStep = isArticleGenerationRun ? articleStepViewFromSearch(location.search) : null;
  const viewedWorkflowStepId = viewedWorkflowStepIdForRun(run, requestedSetupStep, setupWorkflowStepIdForRun(run), requestedArticleStep);
  const workflowProgress = workflowProgressForRunPage(run, bootstrap.workflowProgress);
  const deliveryMode = deliveryModeForRun(run, bootstrap);
  const directPublishMode = deliveryMode === "publish_code";
  const isPublishAutomateView = Boolean(isArticleGenerationRun && (viewedWorkflowStepId === "publish" || viewedWorkflowStepId === "automation"));
  const isSetupPublishView = Boolean(isArticleSystemSetupRun && viewedWorkflowStepId === "publish");
  const isSetupGenerateView = Boolean(isArticleSystemSetupRun && viewedWorkflowStepId === "generate");
  const isSetupReviewView = Boolean(isArticleSystemSetupRun && viewedWorkflowStepId === "review");
  const isArticleSetupContext = isSetupScanContext || isArticleSystemSetupRun || Boolean(effectiveSetupPreviewRun);
  const isCompletedArticleReviewPage = hasArticlePreview && run.status === "completed" && !isPublishAutomateView;
  const previewActive = hasActiveLivePreview(run.livePreview);
  const previewFailed = isFailedArticlePreview(run.livePreview);
  const shouldAutoStartPreview = Boolean(
    isArticleGenerationRun &&
      run.status === "completed" &&
      run.componentManifest &&
      !hasArticlePreview &&
      !previewFailed &&
      !previewActive &&
      previewStartFetcher.state === "idle",
  );
  const pendingActions = useMarketingActionPending({
    navigationState: navigation.state,
    navigationFormData: navigation.formData,
    clearSignal: [
      location.pathname,
      location.search,
      run.runId,
      run.status,
      run.currentStep,
      run.updatedAt,
      run.previewUrl,
      run.prUrl,
      run.publishChildStatus,
      run.publishChildRecoverable,
      run.publishChildWaitReason,
      run.livePreview?.status,
      run.livePreview?.previewUrl,
      run.componentFeedback?.latestBatch?.id,
      run.componentFeedback?.latestBatch?.status,
      run.workflowProgress?.steps.map((step) => `${step.id}:${step.status}`).join(","),
      setupRun?.runId,
      setupRun?.status,
      bootstrap.latestRuns.map((item) => `${item.runId}:${item.status}`).join(","),
      bootstrap.settings.dailyDiscoveryEnabled,
    ].join("|"),
    errorKey: actionData?.error && typeof actionData.intent === "string" ? actionData.intent : null,
  });
  const isSubmitting = pendingActions.isAnyPending || previewStartFetcher.state !== "idle";

  useEffect(() => {
    setPolledRun(null);
  }, [loaderRun.currentStep, loaderRun.runId, loaderRun.status, loaderRun.updatedAt, loaderSetupRun?.runId, loaderSetupRun?.status, loaderSetupRun?.updatedAt]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const updateVisibility = () => setPageVisible(document.visibilityState !== "hidden");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      runStatusFetcher.state !== "idle" ||
      !runStatusFetcher.data?.runId ||
      runStatusFetcher.data.runId !== pollRunId
    ) {
      return;
    }
    if (statusPollNeedsFullRefresh(runStatusFetcher.data)) {
      const refreshKey = `${runStatusFetcher.data.runId}:${runStatusFetcher.data.status}:${runStatusFetcher.data.updatedAt ?? ""}:${runStatusFetcher.data.currentStep ?? ""}`;
      if (statusRefreshRef.current !== refreshKey) {
        statusRefreshRef.current = refreshKey;
        setPolledRun(null);
        revalidator.revalidate();
      }
      return;
    }
    setPolledRun(runStatusFetcher.data);
  }, [pollRunId, revalidator, runStatusFetcher.data, runStatusFetcher.state]);

  useEffect(() => {
    const data = previewStartFetcher.data;
    const nextRun = data && typeof data === "object" && "run" in data ? (data.run as VibeMarketingRunSummary) : null;
    if (nextRun?.runId === loaderRun.runId) {
      setPolledRun(nextRun);
    }
  }, [loaderRun.runId, previewStartFetcher.data]);

  useEffect(() => {
    if (!isDiscoveryConfirmation) return;
    const firstCandidateId = discoveryCandidates[0]?.id ?? "";
    const selectionStillValid = discoveryCandidates.some((candidate) => candidate.id === selectedDiscoveryCandidateId);
    if (!selectionStillValid && selectedDiscoveryCandidateId !== firstCandidateId) {
      setSelectedDiscoveryCandidateId(firstCandidateId);
    }
  }, [discoveryCandidates, isDiscoveryConfirmation, selectedDiscoveryCandidateId]);

  useEffect(() => {
    if (!shouldAutoStartPreview || !run.runId || previewStartRunRef.current === run.runId) return;
    previewStartRunRef.current = run.runId;
    const formData = new FormData();
    formData.set("intent", "start-live-preview");
    void previewStartFetcher.submit(formData, { method: "POST" });
  }, [previewStartFetcher, run.runId, shouldAutoStartPreview]);

  useEffect(() => {
    const signature = [
      run.runId,
      run.status,
      run.currentStep,
      run.updatedAt,
      run.steps.map((step) => `${step.key}:${step.status}:${step.completedAt ?? ""}`).join(","),
      run.livePreview?.status,
      run.livePreview?.previewUrl,
      run.previewUrl,
      run.prUrl,
    ].join("|");
    if (lastProgressSignatureRef.current !== signature) {
      lastProgressSignatureRef.current = signature;
      lastProgressAtRef.current = Date.now();
    }
  }, [run]);

  useEffect(() => {
    if (!shouldPoll || !pollRunId || runStatusFetcher.state !== "idle") return;
    if (!pageVisible) return;
    const hasLoadedCurrentRun = runStatusFetcher.data?.runId === pollRunId;
    const idleMs = Date.now() - lastProgressAtRef.current;
    const pollDelay = !hasLoadedCurrentRun ? 0 : idleMs > 60_000 ? 15_000 : idleMs > 10_000 ? 5_000 : 2_500;
    const timer = window.setTimeout(
      () => {
        void runStatusFetcher.load(statusUrl);
      },
      pollDelay,
    );
    return () => window.clearTimeout(timer);
  }, [pageVisible, pollRunId, runStatusFetcher, runStatusFetcher.data?.runId, runStatusFetcher.state, shouldPoll, statusUrl]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <nav className="border-b border-gray-200 pb-4" aria-label="Breadcrumb">
        <Link to="/founder-tools/marketing" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to marketing
        </Link>
      </nav>

      {actionData?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <MarketingWorkflowShell
        progress={workflowProgress}
        viewedStepId={viewedWorkflowStepId}
        workflowMode={isArticleSetupContext ? "article_setup" : "article"}
        title={isArticleSetupContext ? "Build articles/blogs directory page" : directPublishMode || isPublishAutomateView ? "Create and publish article" : "Create article"}
        titleAs="h1"
        subtitle={isArticleSetupContext ? "Create and review the repo page where future articles will be listed." : undefined}
        isSubmitting={isSubmitting}
        topRightActionSlot={isArticleWorkflowRun ? <ArticleRunActionsMenu run={run} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} /> : undefined}
        primaryActionSlot={isArticleWorkflowRun && directPublishMode && !isPublishAutomateView ? <ArticleWorkflowPrimaryAction run={run} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} /> : undefined}
        activeDetailSlot={
          isSetupPublishView ? (
            <ArticleSetupPublishDetail
              run={run}
              bootstrap={bootstrap}
              isSubmitting={isSubmitting}
              isActionPending={pendingActions.isPending}
              accountEmail={accountEmail}
              accountEmailVerified={accountEmailVerified}
            />
          ) : isSetupGenerateView ? (
            <ArticleSetupGenerateDetail run={run} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} />
          ) : isSetupReviewView ? (
            <ArticleSystemSetupPreviewPanel
              run={run}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              isSubmitting={isSubmitting}
              isActionPending={pendingActions.isPending}
            />
          ) : isArticleGenerationRun && isPublishAutomateView ? (
            <PublishAndAutomateDetail
              run={run}
              bootstrap={bootstrap}
              isSubmitting={isSubmitting}
              isActionPending={pendingActions.isPending}
              accountEmail={accountEmail}
              accountEmailVerified={accountEmailVerified}
              channelActionError={actionData?.error ?? null}
              channelActionIntent={actionData && "intent" in actionData ? String(actionData.intent) : null}
            />
          ) : isArticleGenerationRun ? (
            <ArticleGenerationReviewDetail
              run={run}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              isSubmitting={isSubmitting || previewStartFetcher.state !== "idle"}
              isActionPending={pendingActions.isPending}
            />
          ) : undefined
        }
        activeDetailLabel={isSetupPublishView ? "Publish" : isSetupGenerateView ? "Build setup page" : isSetupReviewView ? "Review setup preview" : isArticleSetupContext ? "Articles setup progress" : isPublishAutomateView ? "Publish & automate progress" : "Generating article progress"}
      />

      {isPublishApproval && directPublishMode ? <PublishApprovalPanel run={run} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} /> : null}

      {!isCompletedArticleReviewPage ? (
        <main className="space-y-6">
          {!isArticleGenerationRun && !isScanRun && !isArticleSetupContext ? <MarketingRunProgressCard run={run} /> : null}

          {isDiscoveryConfirmation ? (
            <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-gray-950">Discovery confirmation</h2>
              {discoveryCandidates.length > 0 && selectedDiscoveryCandidate ? (
                <Form method="POST" className="mt-4 space-y-4">
                  <input type="hidden" name="intent" value="start-article" />
                  <input type="hidden" name="clientRequestId" value={billingRequestIds.articleJob} />
                  <input type="hidden" name="candidateTitle" value={selectedDiscoveryCandidate.title} />
                  <input type="hidden" name="candidateKeyword" value={selectedDiscoveryCandidate.keyword} />
                  <input type="hidden" name="sourceRunId" value={selectedDiscoveryCandidate.sourceRunId ?? run.runId} />
                  <input type="hidden" name="deliveryModeExplicit" value="false" />
                  <div className="grid gap-3">
                    {discoveryCandidates.slice(0, 5).map((candidate, index) => (
                      <TopicDecisionCard
                        key={candidate.id}
                        candidate={candidate}
                        rank={index + 1}
                        checked={selectedDiscoveryCandidate.id === candidate.id}
                        onChange={() => setSelectedDiscoveryCandidateId(candidate.id)}
                      />
                    ))}
                  </div>
                  <div className="sticky bottom-4 z-10 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-wide text-gray-400">Selected topic</p>
                        <p className="mt-1 max-w-2xl text-sm font-black leading-5 text-gray-950">{selectedDiscoveryCandidate.title}</p>
                      </div>
                      <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50">
                        {pendingActions.isPending("start-article") ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                        {pendingActions.isPending("start-article") ? (
                          "Starting article..."
                        ) : (
                          <>
                            <span>Generate draft article</span>
                            <span aria-hidden="true">(</span>
                            <RooPointCost points={-VIBE_MARKETING_ARTICLE_JOB_COST_POINTS} />
                            <span aria-hidden="true">)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              ) : (
                <p className="mt-4 rounded-xl bg-gray-50 px-4 py-5 text-sm font-semibold text-gray-500">
                  No topic candidates were included in this discovery result.
                </p>
              )}
            </section>
          ) : null}

          {effectiveSetupPreviewRun && !isArticleSystemSetupRun ? (
            <ArticleSystemSetupPreviewPanel
              run={effectiveSetupPreviewRun}
              sourceRun={isScanRun ? run : null}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              isSubmitting={isSubmitting}
              isActionPending={pendingActions.isPending}
            />
          ) : isScanRun ? (
            <ArticleSystemScanFormPanel run={run} bootstrap={bootstrap} githubRepos={githubRepos} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} />
          ) : null}

          {showRunAttentionBanner ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-black">This run needs attention</p>
                    <p className="mt-1">{run.errors[0] ?? "Review the failed step and resume when ready."}</p>
                  </div>
                </div>
                {canResume ? (
                  <Form method="POST">
                    <button
                      type="submit"
                      name="intent"
                      value="resume"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-amber-900 shadow-sm transition hover:bg-amber-100 disabled:opacity-50 sm:w-auto"
                    >
                      {pendingActions.isPending("resume") ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                      {pendingActions.isPending("resume") ? "Resuming..." : "Resume run"}
                    </button>
                  </Form>
                ) : null}
              </div>
            </div>
          ) : null}

          {!isArticleGenerationRun && !isScanRun && !isArticleSystemSetupRun ? <RunStepTimeline run={run} /> : null}

        </main>
      ) : null}
    </div>
  );
}
