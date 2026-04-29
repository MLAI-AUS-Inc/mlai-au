import type { Route } from "./+types/founder-tools.marketing.run";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useFetcher, useLoaderData, useNavigation, useRevalidator } from "react-router";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  PlayIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

import MarketingEvidencePanel from "~/components/MarketingEvidencePanel";
import MarketingRunProgressCard from "~/components/MarketingRunProgressCard";
import MarketingWorkflowShell from "~/components/MarketingWorkflowShell";
import { getEnv } from "~/lib/env.server";
import {
  controlVibeMarketingRun,
  acceptVibeMarketingComponentRevision,
  addVibeMarketingComponentComment,
  deleteVibeMarketingComponentComment,
  getVibeMarketingBootstrap,
  getVibeMarketingRun,
  normalizeArticleDeliveryMode,
  submitVibeMarketingComponentComments,
  startVibeMarketingLivePreview,
  startVibeMarketingArticle,
  stopVibeMarketingLivePreview,
  updateVibeMarketingComponentComment,
} from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import type {
  VibeMarketingComponentManifestItem,
  VibeMarketingComponentCommentAnchor,
  VibeMarketingComponentFeedbackComment,
  VibeMarketingRunSummary,
  VibeMarketingTopicCandidate,
} from "~/types/vibe-marketing";

const POLLING_STATUSES = new Set([
  "queued",
  "running",
  "awaiting_confirmation",
  "awaiting_delivery_mode",
  "awaiting_approval",
  "approval_required",
]);

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  await requireVibeRaisingFounder(env, request);
  const runId = params.runId ?? "";
  const run = await getVibeMarketingRun(env, request, runId);
  const bootstrap = await getVibeMarketingBootstrap(env, request);
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
      await startVibeMarketingLivePreview(env, request, runId, {
        force: String(formData.get("force") ?? "") === "1",
      });
    } else if (intent === "stop-live-preview") {
      await stopVibeMarketingLivePreview(env, request, runId);
    } else if (["approve", "deny", "resume", "promote-bundle", "publish-pr"].includes(intent)) {
      const result = await controlVibeMarketingRun(env, request, runId, intent);
      if (result.runId && result.runId !== runId) {
        throw redirect(`/founder-tools/marketing/runs/${encodeURIComponent(result.runId)}`);
      }
    } else if (intent === "delivery-mode") {
      await controlVibeMarketingRun(env, request, runId, "delivery-mode", {
        deliveryMode: normalizeArticleDeliveryMode(formData.get("deliveryMode"), "content_only"),
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
        deliveryMode: normalizeArticleDeliveryMode(
          stringFromForm(formData, "deliveryMode") || bootstrap.settings.articleDeliveryMode,
          "content_only",
        ),
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
  return {
    componentId: stringFromForm(formData, "componentId"),
    componentType: stringFromForm(formData, "componentType"),
    componentLabel: stringFromForm(formData, "componentLabel"),
    sourceSectionId: stringFromForm(formData, "sourceSectionId"),
    selector: stringFromForm(formData, "selector"),
    ...(anchor ? { anchor } : {}),
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
        source: asString(payload.source) || "discovery",
        sourceRunId: asString(payload.source_run_id) || asString(payload.sourceRunId) || run.runId,
        intent: payload.intent,
        difficulty: payload.difficulty,
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
) {
  formData.set("componentId", component.id);
  formData.set("componentType", component.type);
  formData.set("componentLabel", component.label ?? component.id);
  formData.set("sourceSectionId", component.sourceSectionId ?? "");
  formData.set("selector", component.selector ?? `[data-cf-component-id="${component.id}"]`);
  if (anchor) formData.set("anchor", JSON.stringify(anchor));
  formData.set("body", body);
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
  const comments = run.componentFeedback?.comments ?? [];
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
  const commentModeActive = Boolean(preview?.exactRender && inspectorProtocolVersion && inspectorProtocolVersion >= 2 && inspectorMode === "comment");
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
        onSelectComponent(component);
        setOpenCommentId(null);
        if (anchor && component.editable !== false) {
          setPendingPin({ component, anchor });
        }
        return;
      }
      if (payload.type === "select") {
        const anchor = anchorFromPayload(payload.anchor);
        onSelectComponent(component);
        setOpenCommentId(null);
        if (anchor && component.editable !== false) {
          setPendingPin({ component, anchor });
          return;
        }
        if (!protocolVersion || protocolVersion < 2) {
          setLegacyInspectorWarning("This preview is using an older inspector bridge. Force restart the live preview to enable in-place comments.");
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [components, mergeMeasurement, onSelectComponent, sendInspectorCommand]);

  useEffect(() => {
    if (!selectedComponent) return;
    sendInspectorCommand({ type: "setSelectedComponent", componentId: selectedComponent.id });
  }, [selectedComponent, sendInspectorCommand]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">Live article preview</h2>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            {preview?.exactRender
              ? "Rendering in the target article route."
              : "Start an exact local target-app preview before inspecting components."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Form method="POST">
            <input type="hidden" name="intent" value="start-live-preview" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50"
            >
              {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
              {canRenderPreview ? "Restart" : "Start"}
            </button>
          </Form>
          <Form method="POST">
            <input type="hidden" name="intent" value="start-live-preview" />
            <input type="hidden" name="force" value="1" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            >
              Force restart
            </button>
          </Form>
          <Form method="POST">
            <button
              type="submit"
              name="intent"
              value="stop-live-preview"
              disabled={isSubmitting || !preview?.available}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            >
              Stop
            </button>
          </Form>
        </div>
      </div>

      {preview?.error ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {preview.error}
        </div>
      ) : null}

      {!preview?.exactRender && preview?.status && preview.status !== "not_started" && !preview.error ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          Exact target-app rendering is not ready yet. Package HTML fallback is not used for this inspector.
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
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
                onSelectComponent={onSelectComponent}
              />
            </>
          ) : (
            <div className="flex h-72 items-center justify-center px-6 text-center text-sm font-semibold text-gray-500">
              Start the live preview to render the generated article inside the target app.
            </div>
          )}
        </div>
      </div>
    </section>
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
  onSelectComponent,
}: {
  comments: VibeMarketingComponentFeedbackComment[];
  components: VibeMarketingComponentManifestItem[];
  measurements: Record<string, InspectorComponentMeasurement>;
  pendingPin: PendingCommentPin | null;
  openCommentId: string | null;
  onOpenComment: (id: string | null) => void;
  onClearPending: () => void;
  onSelectComponent: (component: VibeMarketingComponentManifestItem | null) => void;
}) {
  const fetcher = useFetcher();
  const isSaving = fetcher.state !== "idle";
  const legacyFallbackStackByComponent = new Map<string, number>();

  function submitComment(intent: "add-component-comment" | "update-component-comment", options: {
    commentId?: string;
    component: VibeMarketingComponentManifestItem;
    body: string;
    anchor?: VibeMarketingComponentCommentAnchor | null;
  }) {
    const formData = new FormData();
    formData.set("intent", intent);
    if (options.commentId) formData.set("commentId", options.commentId);
    appendCommentFormFields(formData, options.component, options.body, options.anchor);
    fetcher.submit(formData, { method: "POST" });
  }

  function deleteComment(commentId: string) {
    const formData = new FormData();
    formData.set("intent", "delete-component-comment");
    formData.set("commentId", commentId);
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

function ComponentCommentsPanel({
  run,
  selectedComponent,
  isSubmitting,
}: {
  run: VibeMarketingRunSummary;
  selectedComponent: VibeMarketingComponentManifestItem | null;
  isSubmitting: boolean;
}) {
  const feedback = run.componentFeedback;
  const comments = feedback?.comments ?? [];
  const draftComments = comments.filter((comment) => comment.status === "draft" && comment.body.trim());
  const selectedComments = selectedComponent
    ? comments.filter((comment) => comment.componentId === selectedComponent.id)
    : [];
  const latestBatch = feedback?.latestBatch ?? null;
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

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">Component comment summary</h2>
          <p className="mt-1 text-sm text-gray-600">
            Click article blocks in the live preview to place comments, then send all draft pins as one AI revision batch.
          </p>
        </div>
        {latestBatch ? (
          <span className={clsx("inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide", statusTone(latestBatch.status))}>
            {latestBatch.status.replace(/_/g, " ")}
          </span>
        ) : null}
      </div>

      {latestBatch?.revisionRunId && latestBatch.revisionRunId !== run.runId ? (
        <Link
          to={`/founder-tools/marketing/runs/${encodeURIComponent(latestBatch.revisionRunId)}`}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-800 transition hover:bg-violet-100"
        >
          Open revised article
        </Link>
      ) : null}

      {run.workflow === "article_revision" && sourceRunId ? (
        <p className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500">
          Revision of <span className="font-mono">{sourceRunId}</span>
        </p>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {selectedComponent ? (
            <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
              <p className="text-sm font-black text-violet-950">{selectedComponent.label ?? selectedComponent.id}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-violet-700">
                <span className="rounded-full bg-white px-2 py-1">{selectedComponent.type}</span>
                <span className="rounded-full bg-white px-2 py-1 font-mono">{selectedComponent.id}</span>
                {selectedComponent.sourceSectionId ? (
                  <span className="rounded-full bg-white px-2 py-1 font-mono">{selectedComponent.sourceSectionId}</span>
                ) : null}
              </div>
              <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-violet-800">
                {selectedComments.length
                  ? `${selectedComments.length} comment${selectedComments.length === 1 ? "" : "s"} pinned to this component.`
                  : "No comments pinned to this component yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500">
              Select a component in the preview or component list to inspect its pinned feedback.
            </div>
          )}

          <div className="space-y-3">
            {(selectedComponent ? selectedComments : comments).map((comment) => (
              <div key={comment.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-black text-gray-900">{comment.componentLabel || comment.componentId}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-gray-500">{comment.componentId}</p>
                  </div>
                  <span className={clsx("rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wide", statusTone(comment.status))}>
                    {comment.status}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">{comment.body}</p>
                {comment.anchor ? (
                  <p className="mt-2 text-[11px] font-semibold text-gray-400">
                    Pinned at {Math.round(comment.anchor.x * 100)}%, {Math.round(comment.anchor.y * 100)}% of component.
                  </p>
                ) : null}
              </div>
            ))}
            {!comments.length ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500">
                No comments yet.
              </div>
            ) : null}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-black text-gray-950">Batch revision</p>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            {draftComments.length} draft comment{draftComments.length === 1 ? "" : "s"} ready.
          </p>
          {canAcceptRevision ? (
            <Form method="POST" className="mt-3">
              <input type="hidden" name="intent" value="accept-component-revision" />
              <input type="hidden" name="batchId" value={batchId} />
              <input type="hidden" name="sourceRunId" value={sourceRunId} />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <CheckCircleIcon className="h-4 w-4" />
                Accept revised article
              </button>
            </Form>
          ) : null}
          <div className="mt-4 max-h-80 space-y-2 overflow-auto">
            {comments.length ? (
              comments.map((comment) => (
                <div key={comment.id} className="rounded-lg bg-white px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-black text-gray-800">{comment.componentLabel || comment.componentId}</p>
                    <span className={clsx("rounded-full px-2 py-0.5 text-[10px] font-black uppercase", statusTone(comment.status))}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{comment.body}</p>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-white px-3 py-5 text-center text-sm font-semibold text-gray-500">
                No comments yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ArticleWorkflowPrimaryAction({
  run,
  isSubmitting,
}: {
  run: VibeMarketingRunSummary;
  isSubmitting: boolean;
}) {
  const comments = run.componentFeedback?.comments ?? [];
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
  const publishStep = run.workflowProgress?.steps.find((step) => step.id === "publish");
  const publishUrl = run.previewUrl || run.prUrl || (typeof run.result?.["preview_url"] === "string" ? run.result["preview_url"] : "") || (typeof run.result?.["pr_url"] === "string" ? run.result["pr_url"] : "");
  const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black shadow-sm transition disabled:opacity-50";

  if (canAcceptRevision) {
    return (
      <Form method="POST">
        <input type="hidden" name="intent" value="accept-component-revision" />
        <input type="hidden" name="batchId" value={batchId} />
        <input type="hidden" name="sourceRunId" value={sourceRunId} />
        <button type="submit" disabled={isSubmitting} className={`${buttonClass} bg-emerald-600 text-white hover:bg-emerald-700`}>
          <CheckCircleIcon className="h-4 w-4" />
          Accept revised article
        </button>
      </Form>
    );
  }

  if (canSendRevisionRequest) {
    return (
      <Form method="POST">
        <button type="submit" name="intent" value="submit-component-comments" disabled={isSubmitting} className={`${buttonClass} bg-gray-950 text-white hover:bg-black`}>
          {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PaperAirplaneIcon className="h-4 w-4" />}
          {canRetrySubmittedBatch ? "Retry AI revision request" : "Send comments for AI revision"}
        </button>
      </Form>
    );
  }

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

  if (!run.livePreview?.previewUrl) {
    return (
      <Form method="POST">
        <input type="hidden" name="intent" value="start-live-preview" />
        <button type="submit" disabled={isSubmitting} className={`${buttonClass} bg-violet-600 text-white hover:bg-violet-700`}>
          {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <PlayIcon className="h-4 w-4" />}
          Start preview
        </button>
      </Form>
    );
  }

  return null;
}

export default function FounderToolsMarketingRun() {
  const { run, bootstrap } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const [selectedComponent, setSelectedComponent] = useState<VibeMarketingComponentManifestItem | null>(null);
  const isSubmitting = navigation.state === "submitting";
  const shouldPoll = POLLING_STATUSES.has(run.status);
  const workflow = String(run.workflow ?? "");
  const isArticleWorkflow = ["article_generation", "content_factory_article", "article_revision"].includes(workflow);
  const contentPackage = run.contentPackage;
  const hasArticlePreview =
    ["article_generation", "content_factory_article", "article_revision"].includes(workflow) &&
    Boolean(contentPackage?.contentPackaged || run.componentManifest);
  const isCompletedArticleReviewPage =
    hasArticlePreview && run.status === "completed";
  const isDiscoveryConfirmation =
    ["auto_discovery", "content_factory_discovery", "daily_discovery"].includes(workflow) &&
    run.status === "awaiting_confirmation";
  const isScaffoldApproval =
    ["repo_scan", "content_factory_scan"].includes(workflow) &&
    ["awaiting_confirmation", "awaiting_approval", "approval_required"].includes(run.status);
  const hasPublishApprovalTarget = Boolean(run.previewUrl || run.prUrl || run.result?.["preview_url"] || run.result?.["pr_url"]);
  const canApprove = isScaffoldApproval || hasPublishApprovalTarget;
  const canDeny = isScaffoldApproval || hasPublishApprovalTarget;
  const discoveryCandidates = isDiscoveryConfirmation ? topicCandidatesFromRun(run) : [];
  useEffect(() => {
    if (!shouldPoll) return;
    const timer = window.setInterval(() => {
      void revalidator.revalidate();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [revalidator, shouldPoll]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link to="/founder-tools/marketing" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to marketing
          </Link>
          <h1 className="text-2xl font-black text-gray-950">Marketing run</h1>
          <p className="mt-2 break-all font-mono text-xs text-gray-500">{run.runId}</p>
        </div>
        {!isArticleWorkflow ? (
          <div className="flex flex-wrap gap-3">
            <Form method="POST">
              <button type="submit" name="intent" value="resume" disabled={isSubmitting || !run.resumeAvailable} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50">
                <PlayIcon className="h-4 w-4" />
                Resume
              </button>
            </Form>
            <Form method="POST">
              <button type="submit" name="intent" value="deny" disabled={isSubmitting || !canDeny} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50">
                <XCircleIcon className="h-4 w-4" />
                Deny
              </button>
            </Form>
            <Form method="POST">
              <button type="submit" name="intent" value="approve" disabled={isSubmitting || !canApprove} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50">
                <CheckCircleIcon className="h-4 w-4" />
                Approve
              </button>
            </Form>
          </div>
        ) : null}
      </div>

      {actionData?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <MarketingWorkflowShell
        progress={run.workflowProgress ?? bootstrap.workflowProgress}
        title="Create and publish article"
        isSubmitting={isSubmitting}
        primaryActionSlot={isArticleWorkflow ? <ArticleWorkflowPrimaryAction run={run} isSubmitting={isSubmitting} /> : undefined}
      />

      {hasArticlePreview ? (
        <LiveArticlePreviewPanel
          run={run}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          isSubmitting={isSubmitting}
        />
      ) : null}

      {!isCompletedArticleReviewPage ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <main className="space-y-6">
            <MarketingRunProgressCard run={run} pollingDegraded={revalidator.state === "loading"} />

          {isDiscoveryConfirmation ? (
            <section className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-gray-950">Discovery confirmation</h2>
              <div className="mt-4 space-y-3">
                {discoveryCandidates.length > 0 ? (
                  discoveryCandidates.slice(0, 5).map((candidate, index) => (
                    <div key={`${candidate.id}-${index}`} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-black text-gray-950">{candidate.title}</p>
                          <p className="mt-1 text-xs font-semibold text-gray-500">{candidate.keyword}</p>
                          {candidate.reason ? <p className="mt-2 text-sm text-gray-600">{candidate.reason}</p> : null}
                        </div>
                        <Form method="POST">
                          <input type="hidden" name="intent" value="start-article" />
                          <input type="hidden" name="topicCandidateId" value={candidate.id} />
                          <input type="hidden" name="candidateTitle" value={candidate.title} />
                          <input type="hidden" name="candidateKeyword" value={candidate.keyword} />
                          <input type="hidden" name="sourceRunId" value={candidate.sourceRunId ?? run.runId} />
                          <input type="hidden" name="deliveryMode" value={bootstrap.settings.articleDeliveryMode ?? "content_only"} />
                          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-50">
                            <CheckCircleIcon className="h-4 w-4" />
                            Generate article from this topic
                          </button>
                        </Form>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl bg-gray-50 px-4 py-5 text-sm font-semibold text-gray-500">
                    No topic candidates were included in this discovery result.
                  </p>
                )}
              </div>
            </section>
          ) : null}

          {isScaffoldApproval ? (
            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <h2 className="text-lg font-black text-amber-950">Scaffold approval</h2>
              <p className="mt-2 font-semibold">
                Review the scan result and use Approve or Deny above to continue the article system setup.
              </p>
              {run.result?.["route_path"] || run.result?.["path"] ? (
                <p className="mt-3 break-all rounded-lg bg-white px-3 py-2 font-mono text-xs text-amber-900">
                  {String(run.result?.["route_path"] ?? run.result?.["path"])}
                </p>
              ) : null}
            </section>
          ) : null}

          {contentPackage?.contentPackaged ? (
            <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-gray-950">Content package</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Title</p>
                  <p className="mt-2 text-sm font-black text-emerald-950">{contentPackage.title ?? contentPackage.slug ?? "Generated article"}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Target keyword</p>
                  <p className="mt-2 text-sm font-black text-gray-900">{contentPackage.targetKeyword ?? "Not reported"}</p>
                </div>
              </div>
              {contentPackage.artifactPaths && Object.keys(contentPackage.artifactPaths).length > 0 ? (
                <div className="mt-4 grid gap-2">
                  {Object.entries(contentPackage.artifactPaths).slice(0, 8).map(([name, path]) => (
                    <div key={name} className="rounded-lg bg-gray-50 px-3 py-2">
                      <p className="text-xs font-black text-gray-700">{name}</p>
                      <p className="mt-1 break-all font-mono text-xs text-gray-500">{path}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {run.status === "blocked" || run.status === "failed" ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              <div className="flex items-start gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-black">This run needs attention</p>
                  <p className="mt-1">{run.errors[0] ?? "Review the failed step and resume when ready."}</p>
                </div>
              </div>
            </div>
          ) : null}

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
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

          {contentPackage?.contentPackaged || run.componentManifest ? (
            <ComponentCommentsPanel run={run} selectedComponent={selectedComponent} isSubmitting={isSubmitting} />
          ) : null}
          </main>

          <MarketingEvidencePanel run={run} />
        </div>
      ) : null}
    </div>
  );
}
