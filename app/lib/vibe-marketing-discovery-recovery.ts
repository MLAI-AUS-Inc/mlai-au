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
const DISCOVERY_RUN_STORAGE_PREFIX = "vibe-marketing:discovery-run:";

export type RememberedDiscoveryRun = {
  runId: string;
  kind?: "island" | "custom";
  islandSlug: string;
  islandName: string;
  iconKey: string;
  colorKey: string;
};

type DiscoveryRunStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function discoveryRunStorageKey(companyId: string) {
  return `${DISCOVERY_RUN_STORAGE_PREFIX}${companyId}`;
}

export function readRememberedDiscoveryRun(
  storage: DiscoveryRunStorage | null,
  companyId: string,
): RememberedDiscoveryRun | null {
  if (!storage || !companyId) return null;
  try {
    const raw = storage.getItem(discoveryRunStorageKey(companyId));
    if (!raw) return null;
    const value = JSON.parse(raw) as Record<string, unknown>;
    if (!value || typeof value !== "object" || typeof value.runId !== "string" ||
      !value.runId.trim() || value.runId.length > 128) return null;
    const field = (key: string) => typeof value[key] === "string" ? String(value[key]).slice(0, 200) : "";
    return {
      runId: value.runId,
      kind: value.kind === "island" ? "island" : "custom",
      islandSlug: field("islandSlug"),
      islandName: field("islandName") || "your topic",
      iconKey: field("iconKey") || "default",
      colorKey: field("colorKey") || "purple",
    };
  } catch {
    return null;
  }
}

export function rememberDiscoveryRun(
  storage: DiscoveryRunStorage | null,
  companyId: string,
  run: RememberedDiscoveryRun,
) {
  if (!storage || !companyId || !run.runId) return;
  try {
    storage.setItem(discoveryRunStorageKey(companyId), JSON.stringify(run));
  } catch {
    // Storage can be disabled; in-page polling still works.
  }
}

export function forgetRememberedDiscoveryRun(
  storage: DiscoveryRunStorage | null,
  companyId: string,
  expectedRunId?: string,
) {
  if (!storage || !companyId) return;
  try {
    if (expectedRunId && readRememberedDiscoveryRun(storage, companyId)?.runId !== expectedRunId) return;
    storage.removeItem(discoveryRunStorageKey(companyId));
  } catch {
    // Storage can be disabled; there is nothing else to clear.
  }
}

export async function pollDiscoveryRunStatus(
  fetchStatus: typeof fetch,
  path: string,
  runId: string,
  previous: VibeMarketingRunSummary | null,
): Promise<{ run: VibeMarketingRunSummary | null; unavailable: boolean }> {
  try {
    const response = await fetchStatus(path, {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return { run: previous, unavailable: true };
    const run = await response.json() as VibeMarketingRunSummary;
    if (!run || run.runId !== runId || typeof run.status !== "string") {
      return { run: previous, unavailable: true };
    }
    return { run, unavailable: false };
  } catch {
    // A lost browser connection or a temporary backend failure must not remove
    // the accepted job or replace the dashboard with a route error.
    return { run: previous, unavailable: true };
  }
}

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
