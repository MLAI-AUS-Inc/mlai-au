import { describe, expect, test } from "bun:test";

import {
  findRecoverableDiscoveryRun,
  forgetRememberedDiscoveryRun,
  pollDiscoveryRunStatus,
  readRememberedDiscoveryRun,
  rememberDiscoveryRun,
} from "../app/lib/vibe-marketing-discovery-recovery";
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

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  } as Storage;
}

describe("content island research recovery", () => {
  test("keeps an accepted run after reload for the correct company, including failed runs", () => {
    const storage = memoryStorage();
    const accepted = {
      runId: "accepted-1",
      kind: "island" as const,
      islandSlug: "ai-small-business",
      islandName: "AI For Small Business",
      iconKey: "sparkles",
      colorKey: "purple",
    };
    rememberDiscoveryRun(storage, "company-1", accepted);
    expect(readRememberedDiscoveryRun(storage, "company-1")).toEqual(accepted);
    expect(readRememberedDiscoveryRun(storage, "company-2")).toBeNull();
    forgetRememberedDiscoveryRun(storage, "company-1", "different-run");
    expect(readRememberedDiscoveryRun(storage, "company-1")?.runId).toBe("accepted-1");
    forgetRememberedDiscoveryRun(storage, "company-1", "accepted-1");
    expect(readRememberedDiscoveryRun(storage, "company-1")).toBeNull();
  });

  test("keeps the previous status through lost connections and bad responses, then accepts recovery", async () => {
    const previous = run({ runId: "accepted-1", status: "queued" });
    const lost = await pollDiscoveryRunStatus(
      (async () => { throw new Error("Network connection lost."); }) as typeof fetch,
      "/founder-tools/marketing/runs/accepted-1/status",
      "accepted-1",
      previous,
    );
    expect(lost).toEqual({ run: previous, unavailable: true });
    const failedResponse = await pollDiscoveryRunStatus(
      (async () => new Response("Unavailable", { status: 503 })) as typeof fetch,
      "/founder-tools/marketing/runs/accepted-1/status",
      "accepted-1",
      previous,
    );
    expect(failedResponse).toEqual({ run: previous, unavailable: true });
    const recovered = run({ runId: "accepted-1", status: "failed", errors: ["Research worker failed"] });
    const next = await pollDiscoveryRunStatus(
      (async () => Response.json(recovered)) as typeof fetch,
      "/founder-tools/marketing/runs/accepted-1/status",
      "accepted-1",
      previous,
    );
    expect(next).toEqual({ run: recovered, unavailable: false });
  });
});
