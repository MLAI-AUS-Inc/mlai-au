import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";

type VibeMarketingLandingBootstrap = Pick<
  VibeMarketingBootstrap,
  "articleSetupState" | "checks" | "hasCompletedArticleFlow" | "startPageMode"
>;

export function shouldShowVibeMarketingTopicPicker(bootstrap: VibeMarketingLandingBootstrap) {
  const scaffold = bootstrap.checks.scaffold;
  const articleSetupState = bootstrap.articleSetupState;
  const generationReady = Boolean(
    bootstrap.hasCompletedArticleFlow ||
      scaffold?.generationReady ||
      scaffold?.setupMerged ||
      articleSetupState?.generationReady ||
      articleSetupState?.setupMerged,
  );
  if (generationReady) return true;

  const setupBlocked = Boolean(scaffold?.setupBlocked || articleSetupState?.setupBlocked);
  if (setupBlocked) return false;

  return Boolean(
    bootstrap.startPageMode === "topic_picker" ||
      scaffold?.passed ||
      scaffold?.published ||
      scaffold?.setupMerged ||
      articleSetupState?.published ||
      articleSetupState?.setupMerged,
  );
}
