export const VIBE_MARKETING_ARTICLE_JOB_COST_POINTS = 6;
export const VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS = 1;

function isFreeContentFactoryDomain(domain: string | null | undefined) {
  const value = String(domain || "").trim().toLowerCase();
  if (!value) return false;
  const hostname = value.replace(/^https?:\/\//, "").split(/[/?#:]/, 1)[0]?.replace(/\.$/, "").replace(/^www\./, "");
  return hostname === "mlai.au";
}

export function vibeMarketingArticleCostPoints(domain: string | null | undefined) {
  return isFreeContentFactoryDomain(domain) ? 0 : VIBE_MARKETING_ARTICLE_JOB_COST_POINTS;
}

export function vibeMarketingContentIslandTopicCostPoints(domain: string | null | undefined) {
  return isFreeContentFactoryDomain(domain) ? 0 : VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS;
}

function randomIdPart() {
  const runtimeCrypto = globalThis.crypto;
  if (typeof runtimeCrypto?.randomUUID === "function") {
    return runtimeCrypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function createVibeMarketingClientRequestId(prefix: string, scope = "") {
  const cleanPrefix = prefix.trim() || "vibe-marketing";
  const cleanScope = scope.trim();
  return [cleanPrefix, cleanScope, randomIdPart()].filter(Boolean).join(":");
}

type RequestIdStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function contentIslandRequestKey(companyId: string, islandSlug: string) {
  return `vibe-marketing:content-island-request:${companyId}:${islandSlug}`;
}

// A lost POST response leaves the outcome uncertain. Reuse the same backend
// idempotency key on retry, including after a route reload, until a run ID is
// confirmed. Separate islands and companies keep separate pending requests.
export function contentIslandResearchRequestId(
  storage: RequestIdStorage | null,
  companyId: string,
  islandSlug: string,
) {
  const freshId = () => createVibeMarketingClientRequestId("vibe-content-island-topics");
  if (!storage || !companyId || !islandSlug) return freshId();
  const key = contentIslandRequestKey(companyId, islandSlug);
  try {
    const existing = storage.getItem(key);
    if (existing && existing.length <= 100) return existing;
    const created = freshId();
    storage.setItem(key, created);
    return created;
  } catch {
    // A disabled storage API does not prevent the request itself.
  }
  return freshId();
}

export function clearContentIslandResearchRequestId(
  storage: RequestIdStorage | null,
  companyId: string,
  islandSlug: string,
) {
  if (!storage || !companyId || !islandSlug) return;
  try {
    storage.removeItem(contentIslandRequestKey(companyId, islandSlug));
  } catch {
    // A disabled storage API has no pending request to clear.
  }
}
