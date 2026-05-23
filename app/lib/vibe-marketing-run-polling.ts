type LivePreviewLike = {
  status?: string | null;
  platformStatus?: string | null;
  error?: string | null;
};

type RunLike = {
  runId?: string | null;
  workflow?: string | null;
  status?: string | null;
  currentStep?: string | null;
  updatedAt?: string | null;
  error?: string | null;
  livePreview?: LivePreviewLike | null;
};

const ACTIVE_PREVIEW_STATUSES = new Set(["queued", "pending", "preparing", "starting", "building", "running"]);
const FAILED_PREVIEW_STATUSES = new Set(["failed", "blocked", "expired", "cancelled", "canceled", "timeout", "timed_out"]);
const TERMINAL_ARTICLE_SETUP_STATUSES = new Set(["blocked", "blocked_verification", "failed", "denied", "cancelled", "canceled"]);

function normalized(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

export function isArticleSystemSetupTerminalStatus(status: string | null | undefined) {
  return TERMINAL_ARTICLE_SETUP_STATUSES.has(normalized(status));
}

export function isLivePreviewFailedForPolling(preview: LivePreviewLike | null | undefined) {
  const previewStatus = normalized(preview?.status);
  const platformStatus = normalized(preview?.platformStatus);
  if (ACTIVE_PREVIEW_STATUSES.has(previewStatus) || ACTIVE_PREVIEW_STATUSES.has(platformStatus)) return false;
  return Boolean(preview?.error || FAILED_PREVIEW_STATUSES.has(previewStatus) || FAILED_PREVIEW_STATUSES.has(platformStatus));
}

export function shouldPollArticleSystemSetupRun(run: RunLike) {
  if (run.workflow !== "article_system_setup") return true;
  if (isArticleSystemSetupTerminalStatus(run.status)) return false;
  if (isLivePreviewFailedForPolling(run.livePreview)) return false;
  return true;
}

export function statusPollRefreshKey(run: RunLike) {
  if (run.workflow === "article_system_setup" && !shouldPollArticleSystemSetupRun(run)) {
    return [
      run.runId,
      normalized(run.status),
      run.currentStep ?? "",
      normalized(run.livePreview?.status),
      normalized(run.livePreview?.platformStatus),
      run.error ?? run.livePreview?.error ?? "",
    ].join(":");
  }
  return [run.runId, run.status, run.updatedAt ?? "", run.currentStep ?? ""].join(":");
}
