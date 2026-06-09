import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

// Discovery workflows whose in-flight runs the dashboard can recover from
// bootstrap.latestRuns after a navigation, so the topic-research progress card
// resumes instead of vanishing. Custom-topic research and content-island research
// are both the `auto_discovery` workflow.
export const DISCOVERY_RESEARCH_WORKFLOWS = new Set([
  "auto_discovery",
  "content_factory_discovery",
  "daily_discovery",
]);

const DISCOVERY_RUNNING_STATUSES = new Set(["queued", "running", "processing", "in_progress"]);

function normalizeRunStatus(status: string | null | undefined) {
  return String(status || "").trim().toLowerCase();
}

/**
 * Find a still-running discovery run to re-attach the dashboard progress card to
 * after the user navigated away and back. The backend job keeps running detached,
 * so latestRuns surfaces it (queued/running) and we resume polling from it.
 *
 * `completedRunIds` guards against re-seeding a run we already saw finish this
 * session (its status in latestRuns can lag the local completion by one poll).
 */
export function findRecoverableDiscoveryRun(
  runs: readonly VibeMarketingRunSummary[],
  completedRunIds: ReadonlySet<string>,
): VibeMarketingRunSummary | null {
  return (
    runs.find(
      (run) =>
        DISCOVERY_RESEARCH_WORKFLOWS.has(run.workflow) &&
        DISCOVERY_RUNNING_STATUSES.has(normalizeRunStatus(run.status)) &&
        !completedRunIds.has(run.runId),
    ) ?? null
  );
}
