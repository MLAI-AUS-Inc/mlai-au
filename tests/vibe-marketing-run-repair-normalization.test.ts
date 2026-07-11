import { describe, expect, test } from "bun:test";

import { normalizeMarketingRun } from "../app/lib/vibe-marketing";

describe("article repair run normalization", () => {
  test("preserves nested precondition repair fields for the run page", () => {
    const run = normalizeMarketingRun({
      run_id: "article-1",
      workflow: "confirmed_topic",
      status: "blocked",
      result: {
        result: {
          precondition_status: "precondition_failed",
          repair_status: "queued",
          scan_run_id: "scan-1",
          next_action: "monitor_repair",
          requires_user_action: false,
        },
      },
    });

    expect(run).toMatchObject({
      preconditionStatus: "precondition_failed",
      repairStatus: "queued",
      repairRunId: "scan-1",
      nextAction: "monitor_repair",
      requiresUserAction: false,
    });
  });

  test("does not treat unrelated JSON artifacts as a completed content package", () => {
    const run = normalizeMarketingRun({
      run_id: "article-2",
      workflow: "confirmed_topic",
      status: "running",
      content_package: {
        artifact_paths: {
          org_config_snapshot: "fetch_org_config/org_config_snapshot.json",
        },
      },
    });

    expect(run.contentPackage).toBeNull();
  });
});
