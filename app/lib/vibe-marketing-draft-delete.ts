import type { VibeMarketingDraftArticle } from "~/types/vibe-marketing";

function normalizeRunId(value: string | null | undefined) {
  return String(value ?? "").trim();
}

export function hiddenDraftRunIdsAfterSubmit(current: string[], runId: string | null | undefined) {
  const normalized = normalizeRunId(runId);
  if (!normalized || current.includes(normalized)) return current;
  return [...current, normalized];
}

export function restoreHiddenDraftRunId(current: string[], runId: string | null | undefined) {
  const normalized = normalizeRunId(runId);
  if (!normalized) return current;
  return current.filter((item) => item !== normalized);
}

export function pruneHiddenDraftRunIds(current: string[], drafts: VibeMarketingDraftArticle[]) {
  const visibleRunIds = new Set(drafts.map((draft) => draft.runId));
  return current.filter((runId) => visibleRunIds.has(runId));
}

export function filterOptimisticallyDeletedDrafts(
  drafts: VibeMarketingDraftArticle[],
  hiddenRunIds: string[],
) {
  if (!hiddenRunIds.length) return drafts;
  const hidden = new Set(hiddenRunIds.map(normalizeRunId).filter(Boolean));
  return drafts.filter((draft) => !hidden.has(draft.runId));
}
