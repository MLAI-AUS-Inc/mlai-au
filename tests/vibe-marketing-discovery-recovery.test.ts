import { describe, expect, test } from "bun:test";

import { findRecoverableDiscoveryRun } from "../app/lib/vibe-marketing-discovery-recovery";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function run(partial: Partial<VibeMarketingRunSummary>): VibeMarketingRunSummary {
  return { runId: "run", workflow: "auto_discovery", status: "running", ...partial } as unknown as VibeMarketingRunSummary;
}

describe("findRecoverableDiscoveryRun", () => {
  test("recovers an in-flight discovery run after navigation", () => {
    const runs = [run({ runId: "r1", workflow: "auto_discovery", status: "running" })];
    expect(findRecoverableDiscoveryRun(runs, new Set())?.runId).toBe("r1");
  });

  test("ignores terminal discovery runs (done or failed)", () => {
    const runs = [
      run({ runId: "done", workflow: "auto_discovery", status: "awaiting_confirmation" }),
      run({ runId: "failed", workflow: "auto_discovery", status: "failed" }),
    ];
    expect(findRecoverableDiscoveryRun(runs, new Set())).toBeNull();
  });

  test("ignores non-discovery workflows", () => {
    const runs = [run({ runId: "article", workflow: "article_generation", status: "running" })];
    expect(findRecoverableDiscoveryRun(runs, new Set())).toBeNull();
  });

  test("skips runs already seen completed this session", () => {
    const runs = [run({ runId: "r1", workflow: "auto_discovery", status: "running" })];
    expect(findRecoverableDiscoveryRun(runs, new Set(["r1"]))).toBeNull();
  });

  test("normalizes status casing and whitespace", () => {
    const runs = [run({ runId: "r1", workflow: "daily_discovery", status: " QUEUED " })];
    expect(findRecoverableDiscoveryRun(runs, new Set())?.runId).toBe("r1");
  });

  test("returns the first matching in-flight run (latestRuns is newest-first)", () => {
    const runs = [
      run({ runId: "newest", workflow: "auto_discovery", status: "running" }),
      run({ runId: "older", workflow: "auto_discovery", status: "queued" }),
    ];
    expect(findRecoverableDiscoveryRun(runs, new Set())?.runId).toBe("newest");
  });
});
