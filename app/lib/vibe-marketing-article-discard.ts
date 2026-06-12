import type { VibeMarketingWrittenTopic } from "~/types/vibe-marketing";

function normalizeArticleId(value: string | null | undefined) {
  return String(value ?? "").trim();
}

export function hiddenArticleIdsAfterSubmit(current: string[], articleId: string | null | undefined) {
  const normalized = normalizeArticleId(articleId);
  if (!normalized || current.includes(normalized)) return current;
  return [...current, normalized];
}

export function restoreHiddenArticleId(current: string[], articleId: string | null | undefined) {
  const normalized = normalizeArticleId(articleId);
  if (!normalized) return current;
  return current.filter((item) => item !== normalized);
}

export function pruneHiddenArticleIds(current: string[], topics: VibeMarketingWrittenTopic[]) {
  const visibleIds = new Set(topics.map((topic) => normalizeArticleId(topic.id)).filter(Boolean));
  return current.filter((articleId) => visibleIds.has(articleId));
}

export function filterDiscardedWrittenTopics(
  topics: VibeMarketingWrittenTopic[],
  hiddenArticleIds: string[],
) {
  if (!hiddenArticleIds.length) return topics;
  const hidden = new Set(hiddenArticleIds.map(normalizeArticleId).filter(Boolean));
  return topics.filter((topic) => !topic.id || !hidden.has(normalizeArticleId(topic.id)));
}
