import type { Route } from "./+types/founder-tools.marketing.run";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useLocation, useNavigation } from "react-router";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  PlayIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import ArticleRunStageProgress from "~/components/ArticleRunStageProgress";
import ArticlesSetupProgressCard from "~/components/ArticlesSetupProgressCard";
import ArticleSystemConnectionPanel from "~/components/ArticleSystemConnectionPanel";
import ArticleSystemSurfaceSummary from "~/components/ArticleSystemSurfaceSummary";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import { TopicDecisionCard } from "~/components/TopicDecisionCard";
import { getEnv } from "~/lib/env.server";
import { useMarketingActionPending } from "~/lib/vibe-marketing-pending-actions";
import {
  connectVibeMarketingGithub,
  controlVibeMarketingRun,
  acceptVibeMarketingComponentRevision,
  addVibeMarketingComponentComment,
  deleteVibeMarketingComponentComment,
  getVibeMarketingBootstrap,
  getVibeMarketingGithubRepos,
  getVibeMarketingRun,
  replayVibeMarketingDaily,
  submitVibeMarketingArticleSystemComments,
  submitVibeMarketingComponentComments,
  startVibeMarketingScan,
  startVibeMarketingLivePreview,
  startVibeMarketingArticle,
  updateVibeMarketingComponentComment,
} from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import type {
  VibeMarketingComponentManifestItem,
  VibeMarketingComponentCommentAnchor,
  VibeMarketingComponentCommentContext,
  VibeMarketingComponentFeedbackComment,
  VibeMarketingBootstrap,
  VibeMarketingGithubReposResponse,
  VibeMarketingRunSummary,
  VibeMarketingTopicCandidate,
  VibeMarketingWorkflowProgress,
} from "~/types/vibe-marketing";

const POLLING_STATUSES = new Set([
  "queued",
  "running",
  "awaiting_confirmation",
  "awaiting_delivery_mode",
  "awaiting_approval",
  "approval_required",
]);
const LIVE_PREVIEW_ACTIVE_STATUSES = new Set(["queued", "pending", "preparing", "starting", "building", "running"]);
const LIVE_PREVIEW_FAILURE_STATUSES = new Set(["failed", "blocked", "expired", "cancelled", "canceled", "timeout", "timed_out"]);

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

function hasActiveLivePreview(preview: VibeMarketingRunSummary["livePreview"] | null | undefined) {
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  const platformStatus = String(preview?.platformStatus ?? "").trim().toLowerCase();
  return LIVE_PREVIEW_ACTIVE_STATUSES.has(previewStatus) || LIVE_PREVIEW_ACTIVE_STATUSES.has(platformStatus);
}

function hasPendingArticlePreview(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow) || !run.componentManifest || hasReadyArticlePreview(run)) {
    return false;
  }
  const preview = run.livePreview;
  if (isFailedArticlePreview(preview)) {
    return false;
  }
  return run.status === "completed" || hasActiveLivePreview(preview);
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const bootstrap = await getVibeMarketingBootstrap(env, request);
  const run = await getVibeMarketingRun(env, request, runId);
  let githubRepos: VibeMarketingGithubReposResponse = { status: "unavailable", repos: [], repositories: [] };
  try {
    githubRepos = await getVibeMarketingGithubRepos(env, request);
  } catch {
    githubRepos = { status: "unavailable", repos: [], repositories: [], error: "Repository list is unavailable." };
  }
  const setupRunId = setupRunIdForRun(run);
  let setupRun: VibeMarketingRunSummary | null = null;
  if (setupRunId && setupRunId !== run.runId) {
    try {
      setupRun = await getVibeMarketingRun(env, request, setupRunId);
    } catch {
      setupRun = null;
    }
  }
  return { run, bootstrap, setupRun, githubRepos };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
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
      throw redirect("/founder-tools/marketing/create?step=scan");
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
      throw redirect("/founder-tools/marketing/create?step=scan");
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
      const result = await replayVibeMarketingDaily(env, request, {});
      if (result.runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (["approve", "deny", "resume", "promote-bundle", "publish-pr", "merge-publish-pr"].includes(intent)) {
      const sourceRunId = stringFromForm(formData, "sourceRunId");
      const controlRunId = intent === "promote-bundle" || intent === "publish-pr" ? sourceRunId || runId : runId;
      const result = await controlVibeMarketingRun(env, request, controlRunId, intent, sourceRunId ? { sourceRunId } : {});
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "delivery-mode") {
      await controlVibeMarketingRun(env, request, runId, "delivery-mode", {
        deliveryMode: String(formData.get("deliveryMode") ?? ""),
      });
    } else if (intent === "start-article") {
      const bootstrap = await getVibeMarketingBootstrap(env, request);
      const topicCandidateId = stringFromForm(formData, "topicCandidateId");
      const selectedCandidate =
        topicCandidateId && topicCandidateId !== "__custom__"
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
      const result = await startVibeMarketingArticle(env, request, {
        topic,
        targetKeyword,
        customTitle,
        selectedTitle: selectedCandidate?.title || candidateTitle,
        topicCandidateId,
        context: stringFromForm(formData, "articleContext"),
        deliveryMode: stringFromForm(formData, "deliveryMode") || effectiveArticleDeliveryMode(bootstrap),
        deliveryModeExplicit: stringFromForm(formData, "deliveryModeExplicit") === "true",
        deliveryModeConfirmed: true,
        sourceRunId: selectedCandidate?.sourceRunId || stringFromForm(formData, "sourceRunId") || runId,
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
  return rawCandidates
    .map((raw, index): VibeMarketingTopicCandidate | null => {
      if (typeof raw === "string") {
        return { id: String(index), keyword: raw, title: raw, sourceRunId: run.runId };
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
      showDenySetupAction
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
  const previewUrl =
    run.livePreview?.previewUrl ||
    run.previewUrl ||
    stringResultValue(run, "preview_url", "previewUrl") ||
    stringResultValue(source, "preview_url", "previewUrl");
  const setupRunId = setupRunIdForRun(run) || setupRunIdForRun(source) || run.runId;
  const changedFiles = [
    ...arrayResultValue(run, "changed_files_preview"),
    ...(Array.isArray(setup.changed_files_preview) ? setup.changed_files_preview : []),
  ]
    .map((item) => String(item ?? "").trim())
    .filter(Boolean)
    .slice(0, 8);
  const canApprove = run.status === "awaiting_approval" || run.status === "approval_required";
  const setupCompleted = run.status === "completed" || run.approvalState === "approved";
  const previewReady = Boolean(previewUrl || (run.livePreview?.available && run.livePreview.previewUrl));
  const previewActive = hasActiveLivePreview(run.livePreview);
  const previewFailed =
    !previewActive && (isFailedArticlePreview(run.livePreview) || (["blocked", "failed"].includes(run.status) && Boolean(run.livePreview?.error || run.errors.length)));

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">Articles setup preview</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
            Review the drafted articles/blogs setup before it is merged into the website repo.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
            {repo ? <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{repo}</span> : null}
            {route ? <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">{route}</span> : null}
            {prUrl ? (
              <a href={prUrl} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:text-emerald-900">
                Open PR
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <ArticleSystemSurfaceSummary run={source} />

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
          unavailableSlot={<ArticleSystemSetupPreviewUnavailable run={run} previewUrl={previewUrl} isSubmitting={isSubmitting} isActionPending={isActionPending} />}
          actionSlot={(reviewState) => {
            const needsCommentSubmitFirst = reviewState.draftComments.length > 0 || reviewState.hasPendingRevisionBatch;
            const approveDisabled = isSubmitting || needsCommentSubmitFirst;
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
                        {approvePending ? "Approving..." : "Approve articles setup"}
                      </button>
                    </Form>
                  </>
                ) : null}
              </div>
            );
          }}
        />
      ) : !setupCompleted ? (
        <div className="space-y-4">
          <ArticlesSetupProgressCard run={run} />
          {previewFailed ? (
            <ArticleSystemSetupPreviewUnavailable
              run={run}
              previewUrl={previewUrl}
              isSubmitting={isSubmitting}
              isActionPending={isActionPending}
            />
          ) : null}
        </div>
      ) : null}

      {setupCompleted ? (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-emerald-950">Articles setup approved</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-emerald-800">
              Future articles can now be generated into this repo location.
            </p>
          </div>
          <Link
            to="/founder-tools/marketing/create?step=research"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
          >
            Continue to topic research
          </Link>
        </div>
      ) : null}
    </section>
  );
}

function ArticleSystemSetupPreviewUnavailable({
  run,
  previewUrl,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  previewUrl?: string | null;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
}) {
  const preview = run.livePreview;
  const previewStatus = String(preview?.status || run.status || "building").replace(/_/g, " ");
  const previewActive = hasActiveLivePreview(preview);
  const error = previewActive ? "" : String(preview?.error || run.errors?.[0] || "").trim();
  const logsUrl = preview?.logsUrl || preview?.builderRunUrl;
  const retryPreviewPending = previewActive || (isActionPending?.("start-live-preview") ?? isSubmitting);
  if (previewUrl) return null;
  return (
    <div className={clsx(
      "rounded-xl border px-4 py-5 text-sm font-semibold",
      error ? "border-red-200 bg-red-50 text-red-800" : "border-violet-100 bg-violet-50 text-violet-800",
    )}>
      <p className="font-black">{error ? "Articles setup preview could not be prepared" : "Articles setup preview is being built"}</p>
      <p className="mt-1">{previewActive ? "Waiting for GitHub Actions to finish. Refreshing this page is safe." : `Preview status: ${previewStatus}. Refreshing this page is safe.`}</p>
      {error ? <p className="mt-2 break-words font-mono text-xs">{error}</p> : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
        {error ? (
          <Form method="POST">
            <input type="hidden" name="force" value="true" />
            <button
              type="submit"
              name="intent"
              value="start-live-preview"
              disabled={retryPreviewPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-800 disabled:opacity-50 sm:w-auto"
            >
              {retryPreviewPending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
              {retryPreviewPending ? "Starting preview..." : "Retry preview build"}
            </button>
          </Form>
        ) : null}
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
}) {
  const manifest = run.componentManifest;
  const components = useMemo(() => manifest?.components ?? [], [manifest]);
  const preview = useMemo(() => {
    const fallbackUrl = String(previewUrlFallback || "").trim();
    if (run.livePreview) {
      const previewUrl = run.livePreview.previewUrl || fallbackUrl;
      return {
        ...run.livePreview,
        available: Boolean(run.livePreview.available || previewUrl),
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
  }, [previewUrlFallback, run.livePreview]);
  const canRenderPreview = Boolean(preview?.available && preview.previewUrl);
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
        if (anchor) {
          setPendingPin({ component, anchor, context });
        }
        return;
      }
      if (payload.type === "select") {
        const anchor = anchorFromPayload(payload.anchor);
        const context = commentContextFromPayload(payload, preview?.previewMode ?? null);
        onSelectComponent(component);
        setOpenCommentId(null);
        if (anchor) {
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
  }, [components, mergeMeasurement, onSelectComponent, preview?.previewMode, previewMessageOrigin, sendInspectorCommand]);

  useEffect(() => {
    if (!selectedComponent) return;
    sendInspectorCommand({ type: "setSelectedComponent", componentId: selectedComponent.id });
  }, [selectedComponent, sendInspectorCommand]);

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
          {legacyInspectorWarning ? (
            <div className="absolute left-4 right-4 top-4 z-30 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm">
              {legacyInspectorWarning}
            </div>
          ) : null}
          {canRenderPreview ? (
            <>
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
              />
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
  const acceptArticleIntent = publishStep?.primaryAction?.intent ?? "promote-bundle";

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
            run.status === "completed" &&
              run.contentPackage?.contentPackaged &&
              reviewState.canRenderPreview &&
              reviewState.draftComments.length === 0 &&
              !canAcceptRevision &&
              !reviewState.hasPendingRevisionBatch &&
              publishStep?.status === "ready" &&
              acceptArticleIntent,
          );
          const acceptArticlePending = isActionPending?.(acceptArticleIntent) ?? isSubmitting;
          const acceptRevisionPending = isActionPending?.("accept-component-revision") ?? isSubmitting;
          const submitCommentsPending = isActionPending?.("submit-component-comments") ?? isSubmitting;
          return (
            <div className="flex flex-col gap-2 sm:flex-row">
              {canAcceptArticleForPublish ? (
                <Form method="POST">
                  <button
                    type="submit"
                    name="intent"
                    value={acceptArticleIntent}
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                  >
                    {acceptArticlePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                    {acceptArticlePending ? "Continuing..." : "Accept article and continue"}
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
  const retryable = preview?.retryable !== false && nativeRetryable !== false ? true : retryablePreviewCodes.has(previewErrorCode);
  const statusLabel = previewStatus ? previewStatus.replace(/_/g, " ") : "not started";
  const failedPhase = String(preview?.failedPhase || nativePreviewFailure.failedPhase || nativePreviewFailure.failed_phase || "").trim();
  const failedCommand = String(
    preview?.failedCommand || nativePreviewFailure.failedCommand || nativePreviewFailure.failed_command || "",
  ).trim();
  const displayError =
    String(preview?.error || nativeError || "The article preview could not be prepared. Retry the preview when the generator is available.").trim();
  const retryPreviewPending = isActionPending?.("start-live-preview") ?? isSubmitting;
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

  if (failed) {
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
          {retryable ? (
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

function PublishAndAutomateDetail({
  run,
  bootstrap,
  isSubmitting,
  isActionPending,
}: {
  run: VibeMarketingRunSummary;
  bootstrap: VibeMarketingBootstrap;
  isSubmitting: boolean;
  isActionPending?: (...keys: string[]) => boolean;
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
  const enableDailyPending = isActionPending?.("enable-daily-automation") ?? isSubmitting;
  const runDailyPending = isActionPending?.("run-daily-discovery-now") ?? isSubmitting;
  const mergeStatus = stringResultValue(run, "merge_status", "mergeStatus");
  const isMerged = mergeStatus === "merged";
  const dailyCheck = bootstrap.checks.dailyAutomation as
    | (VibeMarketingBootstrap["checks"][string] & { ready?: boolean; enabled?: boolean })
    | undefined;
  const dailyEnabled = Boolean(bootstrap.settings.dailyDiscoveryEnabled || dailyCheck?.enabled || dailyCheck?.passed);
  const dailyReady = Boolean(dailyEnabled || dailyCheck?.ready || dailyCheck?.passed);
  const defaultTimezone = bootstrap.settings.defaultTimezone ?? "Australia/Melbourne";

  return (
    <div className="space-y-5">
      {publishChildMissingRemote ? null : <ArticleRunStageProgress run={run} variant="embedded" />}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-violet-700">Publish & automate</p>
            <h2 className="mt-1 text-xl font-black text-gray-950">Finish publishing this article</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-gray-600">
              Create the publish PR, merge it after checks pass, then turn on Slack research prompts for the next article.
            </p>
          </div>
          <WorkflowStatusPill status={automationStep?.status === "complete" ? "complete" : publishStep?.status ?? "ready"} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <PublishFlowCard
            title="Publish PR"
            status={prUrl ? "complete" : publishPending ? "running" : "ready"}
            eyebrow={
              prUrl
                ? "PR ready"
                : publishPending
                  ? "Preparing PR"
                  : publishChildRecoverable
                    ? "Resume needed"
                    : publishChildApprovalRequired
                      ? "Review needed"
                      : publishHandoffStale
                        ? "Retry needed"
                        : "Ready"
            }
          >
            {prUrl ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  {prNumber ? `Pull request #${prNumber} is ready for review.` : "The publish pull request is ready for review."}
                </p>
                <a
                  href={prUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black"
                >
                  Open PR
                </a>
              </div>
            ) : publishPending ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  The publish handoff has started. This page will update when the PR is available.
                </p>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-black text-gray-500"
                >
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Preparing PR
                </button>
              </div>
            ) : publishChildRecoverable ? (
              <Form method="POST" className="space-y-3">
                {publishSourceRunId ? <input type="hidden" name="sourceRunId" value={publishSourceRunId} /> : null}
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
                  {promotePending ? "Preparing PR..." : publishChildMissingRemote ? "Retry creating PR" : "Resume publish PR"}
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
                <p className="text-sm font-semibold text-gray-600">
                  The previous publish handoff did not produce a PR. Retry will safely reuse any existing publish run if one was created.
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="promote-bundle"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                >
                  <ArrowPathIcon className={clsx("h-4 w-4", promotePending && "animate-spin")} />
                  {promotePending ? "Preparing PR..." : "Retry creating PR"}
                </button>
              </Form>
            ) : (
              <Form method="POST" className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  Generate the website changes as a pull request before anything is merged.
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="promote-bundle"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {promotePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                  {promotePending ? "Creating PR..." : "Create publish PR"}
                </button>
              </Form>
            )}
          </PublishFlowCard>

          <PublishFlowCard
            title="Merge to main"
            status={isMerged ? "complete" : prUrl ? "ready" : "locked"}
            eyebrow={isMerged ? "Merged" : checksStatus ? `Checks ${checksStatus}` : prUrl ? "Ready to check" : "Waiting for PR"}
          >
            {isMerged ? (
              <p className="text-sm font-semibold text-gray-600">The publish pull request has been merged.</p>
            ) : (
              <Form method="POST" className="space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  The app checks GitHub status before merging. If checks are still pending or failing, it will leave the PR open.
                </p>
                <button
                  type="submit"
                  name="intent"
                  value="merge-publish-pr"
                  disabled={isSubmitting || !prUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-black disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {mergePending ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
                  {mergePending ? "Checking..." : "Check and merge"}
                </button>
              </Form>
            )}
          </PublishFlowCard>

          <PublishFlowCard
            title="Daily research reminder"
            status={dailyEnabled ? "complete" : dailyReady ? "ready" : "locked"}
            eyebrow={dailyEnabled ? "Slack enabled" : dailyReady ? "Ready" : "Needs setup"}
          >
            <div className="space-y-3">
              <Form method="POST" className="space-y-3">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-wide text-gray-500">Timezone</span>
                  <input
                    name="defaultTimezone"
                    defaultValue={defaultTimezone}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
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
                  {enableDailyPending ? "Enabling..." : dailyEnabled ? "Enabled" : "Enable Slack reminder"}
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
          </PublishFlowCard>
        </div>

        {previewUrl ? (
          <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <a href={previewUrl} target="_blank" rel="noreferrer" className="text-sm font-black text-emerald-800 hover:text-emerald-950">
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
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-gray-950">{title}</h3>
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
                readOnly={comment.status !== "draft"}
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
                  comment.status === "draft"
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

      {pendingPin && measurements[pendingPin.component.id] ? (
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

function setupRunIdForRun(run: VibeMarketingRunSummary) {
  const direct = stringResultValue(run, "setup_run_id", "setupRunId", "scaffold_job_id", "scaffoldJobId");
  if (direct) return direct;
  const setup = articleSystemSetupPayload(run);
  const setupRunId = setup.setup_run_id ?? setup.setupRunId;
  return typeof setupRunId === "string" && setupRunId.trim() ? setupRunId.trim() : "";
}

function publishPrUrlForRun(run: VibeMarketingRunSummary) {
  return run.prUrl?.trim() || stringResultValue(run, "pr_url", "prUrl", "pull_request_url", "pullRequestUrl", "draft_pr_url", "draftPrUrl");
}

function publishPreviewUrlForRun(run: VibeMarketingRunSummary) {
  return run.previewUrl?.trim() || stringResultValue(run, "preview_url", "previewUrl", "article_url", "articleUrl", "url");
}

function prNumberFromPullUrl(url: string) {
  const match = url.match(/\/pull\/(\d+)/);
  return match?.[1] ?? "";
}

function hasPublishHandoffEvidence(run: VibeMarketingRunSummary) {
  return Boolean(
    publishPrUrlForRun(run) ||
      publishPreviewUrlForRun(run) ||
      stringResultValue(run, "publish_child_run_id", "promoted_publish_job_id", "promote_bundle_requested_at") ||
      run.result?.["publish_handoff_pending"] === true ||
      run.workflowProgress?.currentStepId === "publish" ||
      run.workflowProgress?.currentStepId === "automation",
  );
}

function deliveryModeForRun(run: VibeMarketingRunSummary, bootstrap: VibeMarketingBootstrap) {
  const runMode = stringResultValue(run, "resolved_delivery_mode", "delivery_mode", "deliveryMode");
  if (runMode === "review_draft" || runMode === "publish_code" || runMode === "content_only") {
    return runMode;
  }
  return effectiveArticleDeliveryMode(bootstrap);
}

function hasReviewTarget(run: VibeMarketingRunSummary) {
  return Boolean(publishPreviewUrlForRun(run) || publishPrUrlForRun(run));
}

function isRunApprovalRequired(run: VibeMarketingRunSummary) {
  return run.approvalState === "approval_required" || APPROVAL_GATE_STATUSES.has(run.status);
}

function isPublishApprovalGate(run: VibeMarketingRunSummary) {
  const workflow = String(run.workflow ?? "");
  return isArticleWorkflow(workflow) && isRunApprovalRequired(run) && hasReviewTarget(run);
}

function isSetupScanRun(run: VibeMarketingRunSummary) {
  if (!SCAN_WORKFLOWS.has(run.workflow)) return false;
  const scanPurpose = stringResultValue(run, "scan_purpose", "scanPurpose");
  return scanPurpose === "setup" || Boolean(setupRunIdForRun(run)) || Boolean(run.result?.["article_surface_hint"]);
}

function setupWorkflowStepIdForRun(run: VibeMarketingRunSummary) {
  if (run.status === "completed" || run.approvalState === "approved") return "publish";
  if (run.livePreview?.available && run.livePreview.previewUrl) return "review";
  if (run.previewUrl || run.status === "awaiting_approval" || run.status === "approval_required") return "review";
  return "generate";
}

function viewedWorkflowStepIdForRun(run: VibeMarketingRunSummary) {
  const workflow = String(run.workflow ?? "");
  if (DISCOVERY_WORKFLOWS.has(workflow)) {
    return run.status === "awaiting_confirmation" ? "choose_topic" : "research";
  }
  if (SCAN_WORKFLOWS.has(workflow)) return "article_system";
  if (workflow === "article_system_setup") return setupWorkflowStepIdForRun(run);
  if (workflow === "website_baseline") return "baseline";
  if (workflow === "article_revision") return hasPublishHandoffEvidence(run) ? "publish" : "revise";
  if (isArticleWorkflow(workflow)) {
    if (hasPublishHandoffEvidence(run)) return "publish";
    if (POLLING_STATUSES.has(run.status)) return "generate";
    if (run.componentManifest) return "review";
    if (run.contentPackage?.contentPackaged) return "package";
    return "generate";
  }
  return run.workflowProgress?.currentStepId ?? null;
}

function workflowProgressForRunPage(
  run: VibeMarketingRunSummary,
  fallbackProgress: VibeMarketingWorkflowProgress | null | undefined,
): VibeMarketingWorkflowProgress | null {
  const progress = run.workflowProgress ?? fallbackProgress ?? null;
  if (progress && run.workflow === "article_system_setup") {
    const activeStepId = setupWorkflowStepIdForRun(run);
    const setupPreviewActive = hasActiveLivePreview(run.livePreview);
    const setupFailed = !setupPreviewActive && (isFailedArticlePreview(run.livePreview) || run.status === "blocked" || run.status === "failed");
    const setupComplete = run.status === "completed" || run.approvalState === "approved";
    const reviewReady = activeStepId === "review" || setupComplete;
    return {
      ...progress,
      currentStepId: activeStepId,
      nextStepId: setupComplete ? null : activeStepId === "generate" ? "review" : "publish",
      steps: progress.steps.map((step) => {
        if (["profile", "baseline", "repo", "article_system"].includes(step.id)) {
          return { ...step, status: "complete" };
        }
        if (step.id === "generate") {
          return {
            ...step,
            label: "Build setup page",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`,
            summary: "Create the setup branch and hosted preview for the articles/blogs directory.",
            status: setupComplete || reviewReady ? "complete" : setupFailed ? "blocked" : "running",
          };
        }
        if (step.id === "review" || step.id === "revise") {
          return {
            ...step,
            label: step.id === "review" ? "Review setup preview" : "Request setup revisions",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`,
            summary: "Inspect the setup preview and leave revision comments.",
            status: setupComplete ? "complete" : reviewReady ? "needs_action" : "locked",
          };
        }
        if (step.id === "package" || step.id === "publish") {
          return {
            ...step,
            label: step.id === "publish" ? "Publish setup PR" : "Setup PR ready",
            href: `/founder-tools/marketing/runs/${encodeURIComponent(run.runId)}`,
            summary: "Approve and merge the setup pull request to main.",
            status: setupComplete ? "complete" : "locked",
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
  const { run: loaderRun, bootstrap, setupRun: loaderSetupRun, githubRepos } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const location = useLocation();
  const runStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const previewStartFetcher = useFetcher<typeof action>();
  const previewStartRunRef = useRef("");
  const [polledRun, setPolledRun] = useState<VibeMarketingRunSummary | null>(null);
  const run = polledRun ?? loaderRun;
  const [selectedComponent, setSelectedComponent] = useState<VibeMarketingComponentManifestItem | null>(null);
  const statusUrl = `/founder-tools/marketing/runs/${encodeURIComponent(loaderRun.runId)}/status`;
  const workflow = String(run.workflow ?? "");
  const isScanRun = SCAN_WORKFLOWS.has(workflow);
  const isSetupScanContext = isScanRun && isSetupScanRun(run);
  const isStaleScan = isScanRun && Boolean(run.stale || run.staleReason === "scan_queue_not_started");
  const isScanActionNeeded = isScanRun && ["awaiting_confirmation", "awaiting_approval", "approval_required"].includes(run.status);
  const isScanCompleted = isScanRun && run.status === "completed";
  const isArticleSystemSetupRun = workflow === "article_system_setup";
  const setupPreviewActive = isArticleSystemSetupRun && hasActiveLivePreview(run.livePreview);
  const setupPreviewFailed = isArticleSystemSetupRun && !setupPreviewActive && isFailedArticlePreview(run.livePreview);
  const shouldPoll =
    (POLLING_STATUSES.has(run.status) && !isScanActionNeeded && !isScanCompleted && !isStaleScan && !setupPreviewFailed) ||
    setupPreviewActive ||
    hasPendingArticlePreview(run) ||
    hasPublishHandoffEvidence(run);
  const setupRun = isArticleSystemSetupRun ? run : loaderSetupRun;
  const isArticleWorkflowRun = isArticleWorkflow(workflow);
  const isArticleGenerationRun = isArticleGenerationWorkflow(workflow);
  const hasArticlePreview = hasReadyArticlePreview(run);
  const isDiscoveryConfirmation =
    ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(workflow) &&
    run.status === "awaiting_confirmation";
  const isPublishApproval = isPublishApprovalGate(run);
  const effectiveSetupPreviewRun = setupRun?.livePreview?.previewUrl || setupRun?.previewUrl ? setupRun : isScanRun && setupRunIdForRun(run) ? run : setupRun;
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
  const viewedWorkflowStepId = viewedWorkflowStepIdForRun(run);
  const workflowProgress = workflowProgressForRunPage(run, bootstrap.workflowProgress);
  const deliveryMode = deliveryModeForRun(run, bootstrap);
  const directPublishMode = deliveryMode === "publish_code";
  const isPublishAutomateView = Boolean(isArticleGenerationRun && (viewedWorkflowStepId === "publish" || viewedWorkflowStepId === "automation"));
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
  }, [loaderRun.runId]);

  useEffect(() => {
    if (
      runStatusFetcher.state !== "idle" ||
      !runStatusFetcher.data?.runId ||
      runStatusFetcher.data.runId !== loaderRun.runId
    ) {
      return;
    }
    setPolledRun(runStatusFetcher.data);
  }, [loaderRun.runId, runStatusFetcher.data, runStatusFetcher.state]);

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
    if (!shouldPoll || !loaderRun.runId || runStatusFetcher.state !== "idle") return;
    const hasLoadedCurrentRun = runStatusFetcher.data?.runId === loaderRun.runId;
    const timer = window.setTimeout(
      () => {
        void runStatusFetcher.load(statusUrl);
      },
      hasLoadedCurrentRun ? 5000 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [loaderRun.runId, runStatusFetcher, runStatusFetcher.data?.runId, runStatusFetcher.state, shouldPoll, statusUrl]);

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
          isArticleGenerationRun && isPublishAutomateView ? (
            <PublishAndAutomateDetail run={run} bootstrap={bootstrap} isSubmitting={isSubmitting} isActionPending={pendingActions.isPending} />
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
        activeDetailLabel={isArticleSetupContext ? "Articles setup progress" : isPublishAutomateView ? "Publish & automate progress" : "Generating article progress"}
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
                  <input type="hidden" name="candidateTitle" value={selectedDiscoveryCandidate.title} />
                  <input type="hidden" name="candidateKeyword" value={selectedDiscoveryCandidate.keyword} />
                  <input type="hidden" name="sourceRunId" value={selectedDiscoveryCandidate.sourceRunId ?? run.runId} />
                  <input type="hidden" name="deliveryMode" value={effectiveArticleDeliveryMode(bootstrap)} />
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
                        {pendingActions.isPending("start-article") ? "Starting article..." : "Generate draft article"}
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

          {effectiveSetupPreviewRun ? (
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
