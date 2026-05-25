import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";

type VibeMarketingLandingBootstrap = Pick<
  VibeMarketingBootstrap,
  "articleSetupState" | "checks" | "hasCompletedArticleFlow" | "startPageMode"
>;

export function shouldShowVibeMarketingTopicPicker(bootstrap: VibeMarketingLandingBootstrap) {
  const scaffold = bootstrap.checks.scaffold;
  const articleSetupState = bootstrap.articleSetupState;
  const setupBlocked = Boolean(scaffold?.setupBlocked || articleSetupState?.setupBlocked);
  if (setupBlocked) return false;

  return Boolean(
    bootstrap.hasCompletedArticleFlow ||
      bootstrap.startPageMode === "topic_picker" ||
      scaffold?.passed ||
      scaffold?.published ||
      scaffold?.setupMerged ||
      articleSetupState?.published ||
      articleSetupState?.setupMerged,
  );
}
