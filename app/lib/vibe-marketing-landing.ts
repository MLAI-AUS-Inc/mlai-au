import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";

// The dashboard only needs connection status. Fetching the repository picker
// here makes every visit and background refresh wait for GitHub enumeration.
export function isDashboardGithubConnected(bootstrap: Pick<VibeMarketingBootstrap, "settings" | "checks">) {
  const state = String(bootstrap.settings.githubConnectionState ?? "").trim().toLowerCase();
  return Boolean(
    (bootstrap.checks.github?.passed && bootstrap.settings.githubRepo) ||
      state === "connected" ||
      state === "already_connected",
  );
}

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
