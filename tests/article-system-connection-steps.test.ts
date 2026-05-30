import { describe, expect, test } from "bun:test";

import {
  articleSystemConnectionStepStates,
  articleSystemScaffoldActionLabel,
} from "../app/lib/article-system-connection-steps";

describe("article system connection step states", () => {
  test("renders future steps as collapsed and disabled before a scan starts", () => {
    const steps = articleSystemConnectionStepStates({ connected: true });

    expect(steps.connect.status).toBe("complete");
    expect(steps.scan.status).toBe("locked");
    expect(steps.scan.defaultExpanded).toBe(false);
    expect(steps.scan.disabled).toBe(true);
    expect(steps.chooseLocation.status).toBe("locked");
    expect(steps.chooseLocation.defaultExpanded).toBe(false);
    expect(steps.buildSetup.status).toBe("locked");
    expect(steps.buildSetup.defaultExpanded).toBe(false);
  });

  test("keeps all four steps visible while scan is running and a previous location exists", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      currentScanRunId: "scan-1",
      scanRunning: true,
      setupTargetReady: true,
    });

    expect(Object.keys(steps)).toEqual(["connect", "scan", "chooseLocation", "buildSetup"]);
    expect(steps.scan.status).toBe("active");
    expect(steps.scan.defaultExpanded).toBe(true);
    expect(steps.chooseLocation.status).toBe("complete");
    expect(steps.chooseLocation.defaultExpanded).toBe(false);
    expect(steps.buildSetup.status).toBe("active");
    expect(steps.buildSetup.defaultExpanded).toBe(true);
  });

  test("enables the location chooser when inventory scan results are ready", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      currentScanRunId: "scan-2",
      inventoryReady: true,
    });

    expect(steps.scan.status).toBe("complete");
    expect(steps.chooseLocation.status).toBe("active");
    expect(steps.chooseLocation.disabled).toBe(false);
    expect(steps.chooseLocation.defaultExpanded).toBe(true);
    expect(steps.buildSetup.status).toBe("locked");
  });

  test("opens setup actions after a location is selected", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      currentScanRunId: "scan-3",
      inventoryReady: true,
      selectedSurfaceUrl: "/articles",
      scaffoldStatus: "ready_to_build",
    });

    expect(steps.chooseLocation.status).toBe("complete");
    expect(steps.chooseLocation.defaultExpanded).toBe(true);
    expect(steps.buildSetup.status).toBe("active");
    expect(steps.buildSetup.disabled).toBe(false);
    expect(articleSystemScaffoldActionLabel("ready_to_build")).toBe("Build articles scaffold");
  });

  test("marks the scaffold step complete when setup is explicitly ready", () => {
    for (const scaffoldStatus of ["ready", "legacy_ready"] as const) {
      const steps = articleSystemConnectionStepStates({
        connected: true,
        setupTargetReady: true,
        scaffoldStatus,
      });

      expect(steps.chooseLocation.status).toBe("complete");
      expect(steps.buildSetup.status).toBe("complete");
      expect(steps.buildSetup.defaultExpanded).toBe(true);
      expect(articleSystemScaffoldActionLabel(scaffoldStatus)).toBe("Continue to topic research");
    }
  });

  test("uses the review CTA when a setup preview is ready", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      setupTargetReady: true,
      scaffoldStatus: "review_ready",
    });

    expect(steps.buildSetup.status).toBe("active");
    expect(articleSystemScaffoldActionLabel("review_ready")).toBe("Review setup preview");
  });

  test("uses the PR CTA when setup publishing is pending", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      setupTargetReady: true,
      scaffoldStatus: "publish_ready",
    });

    expect(steps.buildSetup.status).toBe("active");
    expect(articleSystemScaffoldActionLabel("publish_ready")).toBe("Finish setup PR");
  });

  test("blocks the scaffold step when setup failed", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      setupTargetReady: true,
      scaffoldStatus: "failed",
    });

    expect(steps.buildSetup.status).toBe("blocked");
    expect(steps.buildSetup.defaultExpanded).toBe(true);
  });

  test("blocks downstream steps when the scan failed or went stale", () => {
    const steps = articleSystemConnectionStepStates({
      connected: true,
      currentScanRunId: "scan-4",
      scanStale: true,
    });

    expect(steps.scan.status).toBe("blocked");
    expect(steps.scan.defaultExpanded).toBe(true);
    expect(steps.chooseLocation.status).toBe("locked");
    expect(steps.chooseLocation.unavailableReason).toContain("scan issue");
  });
});
