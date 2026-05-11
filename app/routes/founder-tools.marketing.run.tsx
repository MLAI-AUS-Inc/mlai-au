import type { Route } from "./+types/founder-tools.marketing.run";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useNavigation } from "react-router";
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
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import { TopicDecisionCard } from "~/components/TopicDecisionCard";
import { getEnv } from "~/lib/env.server";
import {
  controlVibeMarketingRun,
  acceptVibeMarketingComponentRevision,
  addVibeMarketingComponentComment,
  deleteVibeMarketingComponentComment,
  getVibeMarketingBootstrap,
  getVibeMarketingRun,
  submitVibeMarketingComponentComments,
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

function hasPendingArticlePreview(run: VibeMarketingRunSummary) {
  if (!isArticleWorkflow(run.workflow) || !run.componentManifest || hasReadyArticlePreview(run)) {
    return false;
  }
  const preview = run.livePreview;
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  if (preview?.error || previewStatus === "failed" || previewStatus === "blocked") {
    return false;
  }
  return run.status === "completed" || previewStatus === "running" || previewStatus === "starting";
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const bootstrap = await getVibeMarketingBootstrap(env, request);
  const run = await getVibeMarketingRun(env, request, runId);
  return { run, bootstrap };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");

  try {
    if (intent === "add-component-comment") {
      const comment = await addVibeMarketingComponentComment(env, request, runId, componentCommentPayloadFromForm(formData));
      return { ok: true, comment };
    } else if (intent === "update-component-comment") {
      const commentId = stringFromForm(formData, "commentId");
      if (!commentId) return { error: "Comment id is required." };
      const comment = await updateVibeMarketingComponentComment(env, request, runId, commentId, componentCommentPayloadFromForm(formData));
      return { ok: true, comment };
    } else if (intent === "delete-component-comment") {
      const commentId = stringFromForm(formData, "commentId");
      if (!commentId) return { error: "Comment id is required." };
      const componentFeedback = await deleteVibeMarketingComponentComment(env, request, runId, commentId);
      return { ok: true, componentFeedback };
    } else if (intent === "submit-component-comments") {
      const result = await submitVibeMarketingComponentComments(env, request, runId);
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "accept-component-revision") {
      await acceptVibeMarketingComponentRevision(env, request, runId, {
        batchId: stringFromForm(formData, "batchId"),
        sourceRunId: stringFromForm(formData, "sourceRunId"),
      });
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
    } else if (["approve", "deny", "resume", "promote-bundle", "publish-pr"].includes(intent)) {
      const result = await controlVibeMarketingRun(env, request, runId, intent);
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
        return { error: "Choose a discovered topic or enter a custom title or keyword before generating an article." };
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
  approveLabel = "Approve",
  denyLabel = "Deny",
}: {
  isSubmitting: boolean;
  approveLabel?: string;
  denyLabel?: string;
}) {
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
          <XCircleIcon className="h-4 w-4" />
          {denyLabel}
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
          <CheckCircleIcon className="h-4 w-4" />
          {approveLabel}
        </button>
      </Form>
    </div>
  );
}

function PublishApprovalPanel({
  run,
  isSubmitting,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
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
        <RunApprovalActions isSubmitting={isSubmitting} approveLabel="Approve publish" denyLabel="Deny publish" />
      </div>
    </section>
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
    if (!localComment.id.startsWith("optimistic-")) continue;
    if (!next.some((serverComment) => commentsLikelyMatch(localComment, serverComment))) {
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

function LiveArticlePreviewPanel({
  run,
  selectedComponent,
  onSelectComponent,
  isSubmitting,
}: {
  run: VibeMarketingRunSummary;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  isSubmitting: boolean;
}) {
  const manifest = run.componentManifest;
  const components = useMemo(() => manifest?.components ?? [], [manifest]);
  const preview = run.livePreview;
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
  const canAcceptRevision =
    run.workflow === "article_revision" &&
    run.status === "completed" &&
    latestBatch?.status !== "accepted" &&
    Boolean(batchId);

  const sendInspectorCommand = useCallback((message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage({ source: "founder-tools-inspector", ...message }, "*");
  }, []);

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
  }, [preview?.previewUrl, preview?.inspectorMode, preview?.inspectorProtocolVersion]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
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
  }, [components, mergeMeasurement, onSelectComponent, preview?.previewMode, sendInspectorCommand]);

  useEffect(() => {
    if (!selectedComponent) return;
    sendInspectorCommand({ type: "setSelectedComponent", componentId: selectedComponent.id });
  }, [selectedComponent, sendInspectorCommand]);

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

      <div className="space-y-4">
        <div className="sticky top-3 z-20 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-gray-950">Review comments</p>
            <p className="text-xs font-semibold text-gray-500">
              {draftComments.length > 0
                ? `${draftComments.length} draft pin${draftComments.length === 1 ? "" : "s"} ready for revision.`
                : canRetrySubmittedBatch
                  ? "Submitted comments are ready to retry."
                  : "0 draft pins ready for revision."}
            </p>
            <p className={clsx("mt-1 text-xs font-black", commentModeActive ? "text-emerald-700" : "text-amber-700")}>
              {commentModeActive ? "Comment mode active" : "Waiting for comment bridge"}
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
          <div className="flex flex-col gap-2 sm:flex-row">
            {canAcceptRevision ? (
              <Form method="POST">
                <input type="hidden" name="intent" value="accept-component-revision" />
                <input type="hidden" name="batchId" value={batchId} />
                <input type="hidden" name="sourceRunId" value={sourceRunId} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  Accept revised article
                </button>
              </Form>
            ) : null}
            <Form method="POST">
              <button
                type="submit"
                name="intent"
                value="submit-component-comments"
                disabled={isSubmitting || !canSendRevisionRequest}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-40 sm:w-auto"
              >
                {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
                {canRetrySubmittedBatch ? "Retry AI revision request" : "Send comments for AI revision"}
              </button>
            </Form>
          </div>
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
                title="Live generated article preview"
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
                openCommentId={openCommentId}
                onOpenComment={setOpenCommentId}
                onClearPending={() => setPendingPin(null)}
                onCommentsChange={setComments}
                onSelectComponent={onSelectComponent}
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ArticlePreviewEmptyState({
  run,
  isSubmitting,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
}) {
  const preview = run.livePreview;
  const previewStatus = String(preview?.status ?? "").trim().toLowerCase();
  const previewErrorCode = String(preview?.errorCode ?? "").trim().toLowerCase();
  const hasManifest = Boolean(run.componentManifest);
  const hostedPreview = preview?.previewMode === "platform_deployment";
  const failed = Boolean(preview?.error || previewStatus === "failed" || previewStatus === "blocked");
  const retryablePreviewCodes = new Set([
    "clone_auth_failed",
    "dev_server_startup_failed",
    "platform_preview_dispatch_failed",
    "platform_preview_failed",
    "preview_proof_failed",
    "preview_runtime_failed",
    "preview_start_timeout",
    "preview_verification_failed",
    "unsupported_runtime_for_v1",
  ]);
  const retryable = preview?.retryable !== false || retryablePreviewCodes.has(previewErrorCode);
  const statusLabel = previewStatus ? previewStatus.replace(/_/g, " ") : "not started";
  const diagnosticRows = [
    preview?.failedPhase ? ["Phase", preview.failedPhase] : null,
    preview?.failedCommand ? ["Command", preview.failedCommand] : null,
  ].filter((row): row is [string, string] => Boolean(row));
  const logExcerpt = String(preview?.logExcerpt ?? "").trim();

  if (failed) {
    return (
      <section className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <h2 className="text-base font-black text-red-950">Preview failed</h2>
              <p className="mt-1 font-semibold">
                {preview?.error || "The article preview could not be prepared. Retry the preview when the generator is available."}
              </p>
              {preview?.errorCode ? <p className="mt-2 text-xs font-black uppercase text-red-700">Preview status: {preview.errorCode}</p> : null}
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
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-black text-red-800 shadow-sm transition hover:bg-red-100 disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
                Retry preview
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
              Preview status: {preview?.platformStatus || statusLabel}
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
}: {
  run: VibeMarketingRunSummary;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
  isSubmitting: boolean;
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
        />
      ) : (
        <ArticlePreviewEmptyState run={run} isSubmitting={isSubmitting} />
      )}
    </div>
  );
}

function ArticleCommentCanvas({
  comments,
  components,
  measurements,
  pendingPin,
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
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const canCancel = canCancelArticleRun(run);

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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
                  Cancel article
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
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
}) {
  const publishStep = run.workflowProgress?.steps.find((step) => step.id === "publish");
  const publishUrl = run.previewUrl || run.prUrl || (typeof run.result?.["preview_url"] === "string" ? run.result["preview_url"] : "") || (typeof run.result?.["pr_url"] === "string" ? run.result["pr_url"] : "");
  const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black shadow-sm transition disabled:opacity-50";

  if (isPublishApprovalGate(run)) return null;

  if (publishStep?.status === "ready" && publishStep.primaryAction?.intent) {
    return (
      <Form method="POST">
        <button type="submit" name="intent" value={publishStep.primaryAction.intent} disabled={isSubmitting} className={`${buttonClass} bg-gray-950 text-white hover:bg-black`}>
          {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
          {publishStep.primaryAction.label || "Publish to website"}
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
  }
  return "";
}

function deliveryModeForRun(run: VibeMarketingRunSummary, bootstrap: VibeMarketingBootstrap) {
  const runMode = stringResultValue(run, "resolved_delivery_mode", "delivery_mode", "deliveryMode");
  if (runMode === "review_draft" || runMode === "publish_code" || runMode === "content_only") {
    return runMode;
  }
  return effectiveArticleDeliveryMode(bootstrap);
}

function hasReviewTarget(run: VibeMarketingRunSummary) {
  return Boolean(run.previewUrl || run.prUrl || stringResultValue(run, "preview_url", "previewUrl", "pr_url", "prUrl"));
}

function isRunApprovalRequired(run: VibeMarketingRunSummary) {
  return run.approvalState === "approval_required" || APPROVAL_GATE_STATUSES.has(run.status);
}

function isScaffoldApprovalGate(run: VibeMarketingRunSummary) {
  const workflow = String(run.workflow ?? "");
  if (!SCAN_WORKFLOWS.has(workflow)) return false;
  const requestedAction = stringResultValue(run, "requested_action");
  const scaffoldStatus = stringResultValue(run, "scaffold_status");
  return (
    isRunApprovalRequired(run) ||
    (run.status === "awaiting_confirmation" &&
      (requestedAction === "scaffold_publish_route" || scaffoldStatus === "approval_required"))
  );
}

function isPublishApprovalGate(run: VibeMarketingRunSummary) {
  const workflow = String(run.workflow ?? "");
  return isArticleWorkflow(workflow) && isRunApprovalRequired(run) && hasReviewTarget(run);
}

function viewedWorkflowStepIdForRun(run: VibeMarketingRunSummary) {
  const workflow = String(run.workflow ?? "");
  if (DISCOVERY_WORKFLOWS.has(workflow)) {
    return run.status === "awaiting_confirmation" ? "choose_topic" : "research";
  }
  if (SCAN_WORKFLOWS.has(workflow)) return "article_system";
  if (workflow === "website_baseline") return "baseline";
  if (workflow === "article_revision") return "revise";
  if (isArticleWorkflow(workflow)) {
    const publishUrl = run.previewUrl || run.prUrl || stringResultValue(run, "preview_url", "previewUrl", "pr_url", "prUrl");
    const isPublishRun = run.workflowProgress?.currentStepId === "publish" && (POLLING_STATUSES.has(run.status) || Boolean(publishUrl));
    if (isPublishRun) return "publish";
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
  if (!progress || !isArticleGenerationWorkflow(run.workflow) || !POLLING_STATUSES.has(run.status)) {
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
  const { run: loaderRun, bootstrap } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const runStatusFetcher = useFetcher<VibeMarketingRunSummary>();
  const previewStartFetcher = useFetcher<typeof action>();
  const previewStartRunRef = useRef("");
  const [polledRun, setPolledRun] = useState<VibeMarketingRunSummary | null>(null);
  const run = polledRun ?? loaderRun;
  const [selectedComponent, setSelectedComponent] = useState<VibeMarketingComponentManifestItem | null>(null);
  const isSubmitting = navigation.state === "submitting";
  const shouldPoll = POLLING_STATUSES.has(run.status) || hasPendingArticlePreview(run);
  const statusUrl = `/founder-tools/marketing/runs/${encodeURIComponent(loaderRun.runId)}/status`;
  const workflow = String(run.workflow ?? "");
  const isArticleWorkflowRun = isArticleWorkflow(workflow);
  const isArticleGenerationRun = isArticleGenerationWorkflow(workflow);
  const hasArticlePreview = hasReadyArticlePreview(run);
  const isCompletedArticleReviewPage =
    hasArticlePreview && run.status === "completed";
  const isDiscoveryConfirmation =
    ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(workflow) &&
    run.status === "awaiting_confirmation";
  const isScaffoldApproval = isScaffoldApprovalGate(run);
  const isPublishApproval = isPublishApprovalGate(run);
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
  const previewStatus = String(run.livePreview?.status ?? "").trim().toLowerCase();
  const previewFailed = Boolean(run.livePreview?.error || previewStatus === "failed" || previewStatus === "blocked");
  const shouldAutoStartPreview = Boolean(
    isArticleGenerationRun &&
      run.status === "completed" &&
      run.componentManifest &&
      !hasArticlePreview &&
      !previewFailed &&
      previewStatus !== "running" &&
      previewStatus !== "starting" &&
      previewStartFetcher.state === "idle",
  );

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
        title={directPublishMode ? "Create and publish article" : "Create article"}
        titleAs="h1"
        isSubmitting={isSubmitting}
        topRightActionSlot={isArticleWorkflowRun ? <ArticleRunActionsMenu run={run} isSubmitting={isSubmitting} /> : undefined}
        primaryActionSlot={isArticleWorkflowRun && directPublishMode ? <ArticleWorkflowPrimaryAction run={run} isSubmitting={isSubmitting} /> : undefined}
        activeDetailSlot={
          isArticleGenerationRun ? (
            <ArticleGenerationReviewDetail
              run={run}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              isSubmitting={isSubmitting || previewStartFetcher.state !== "idle"}
            />
          ) : undefined
        }
        activeDetailLabel="Generating article progress"
      />

      {isPublishApproval && directPublishMode ? <PublishApprovalPanel run={run} isSubmitting={isSubmitting} /> : null}

      {!isCompletedArticleReviewPage ? (
        <main className="space-y-6">
          {!isArticleGenerationRun ? <MarketingRunProgressCard run={run} /> : null}

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
                        <CheckCircleIcon className="h-4 w-4" />
                        Generate draft article
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

          {isScaffoldApproval ? (
            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-black text-amber-950">Scaffold approval</h2>
                  <p className="mt-2 font-semibold">
                    Review the scan result, then approve setup or deny the scaffold request.
                  </p>
                </div>
                <RunApprovalActions isSubmitting={isSubmitting} approveLabel="Approve setup" denyLabel="Deny setup" />
              </div>
              {run.result?.["route_path"] || run.result?.["path"] ? (
                <p className="mt-3 break-all rounded-lg bg-white px-3 py-2 font-mono text-xs text-amber-900">
                  {String(run.result?.["route_path"] ?? run.result?.["path"])}
                </p>
              ) : null}
            </section>
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
                      <PlayIcon className="h-4 w-4" />
                      Resume run
                    </button>
                  </Form>
                ) : null}
              </div>
            </div>
          ) : null}

          {!isArticleGenerationRun ? <RunStepTimeline run={run} /> : null}

        </main>
      ) : null}
    </div>
  );
}
