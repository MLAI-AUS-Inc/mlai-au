export const VIBE_MARKETING_ARTICLE_JOB_COST_POINTS = 6;
export const VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS = 1;

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
