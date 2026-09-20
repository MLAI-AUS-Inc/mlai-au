import type { VibeMarketingWrittenTopic } from "~/types/vibe-marketing";

export function isLiveBodyVerified(article: VibeMarketingWrittenTopic, now = Date.now()) {
  const receipt = article.liveVerification;
  const checked = Date.parse(receipt?.checkedAt ?? "");
  return receipt?.state === "verified" && Number.isFinite(checked) && now >= checked && now - checked <= 30 * 60_000;
}
