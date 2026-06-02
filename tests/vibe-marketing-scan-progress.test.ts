import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import MarketingRunProgressCard from "../app/components/MarketingRunProgressCard";
import { normalizeMarketingRun } from "../app/lib/vibe-marketing";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function baseRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "scan-1",
    workflow: "repo_scan",
    domain: "statdoctor.app",
    status: "running",
    currentStep: "scan_structure",
    stepOrder: ["load_repo_context", "scan_structure", "extract_components", "persist_org_config", "finalize"],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    result: {},
    ...overrides,
  };
}

describe("vibe marketing scan progress", () => {
  test("normalizes snake-case scan progress payloads", () => {
    const run = normalizeMarketingRun({
      run_id: "scan-1",
      workflow: "repo_scan",
      domain: "statdoctor.app",
      status: "running",
      scan_progress: {
        phase_key: "generate_components",
        phase_label: "Generating components",
        phase_index: 8,
        phase_count: 9,
        percent: 78,
        message: "Completed 12 of 30 components",
        detail: { completed: 12, total: 30 },
        current_step: "scan_structure",
        updated_at: "2026-05-29T22:50:30Z",
      },
    });

    expect(run.scanProgress).toMatchObject({
      phaseKey: "generate_components",
      phaseLabel: "Generating components",
      phaseIndex: 8,
      phaseCount: 9,
      percent: 78,
      message: "Completed 12 of 30 components",
      detail: { completed: 12, total: 30 },
      currentStep: "scan_structure",
      updatedAt: "2026-05-29T22:50:30Z",
    });
  });

  test("normalizes camel-case scan progress payloads", () => {
    const run = normalizeMarketingRun({
      runId: "scan-2",
      workflow: "content_factory_scan",
      domain: "statdoctor.app",
      status: "running",
      scanProgress: {
        phaseKey: "generate_templates",
        phaseLabel: "Generating templates",
        phaseIndex: 4,
        phaseCount: 9,
        percent: 37,
        message: "Template generation in progress",
      },
    });

    expect(run.scanProgress).toMatchObject({
      phaseKey: "generate_templates",
      phaseLabel: "Generating templates",
      phaseIndex: 4,
      phaseCount: 9,
      percent: 37,
      message: "Template generation in progress",
    });
  });

  test("renders repo scans with phase progress instead of durable step counts", () => {
    const markup = renderToStaticMarkup(
      createElement(MarketingRunProgressCard, {
        run: baseRun({
          scanProgress: {
            phaseKey: "generate_components",
            phaseLabel: "Generating components",
            phaseIndex: 8,
            phaseCount: 9,
            percent: 78,
            message: "Completed 12 of 30 components",
            detail: { completed: 12, total: 30 },
            currentStep: "scan_structure",
          },
        }),
      }),
    );

    expect(markup).toContain("Generating components");
    expect(markup).toContain("Completed 12 of 30 components");
    expect(markup).toContain("Phase 8 of 9");
    expect(markup).toContain("78% complete");
    expect((markup.match(/aria-label="Scan phase/g) ?? []).length).toBe(9);
  });

  test("renders specific scan blocking reason and next step", () => {
    const run = normalizeMarketingRun({
      runId: "scan-blocked-1",
      workflow: "repo_scan",
      domain: "statdoctor.app",
      status: "blocked",
      result: {
        blocking_reason: "No build script was found for the repository web app.",
        blocking_code: "ARTICLE_DIRECTORY_UNSUPPORTED_RUNTIME",
      },
      errors: ["No build script was found for the repository web app."],
    });

    const markup = renderToStaticMarkup(createElement(MarketingRunProgressCard, { run }));

    expect(run.blockingReason).toBe("No build script was found for the repository web app.");
    expect(run.blockingCode).toBe("ARTICLE_DIRECTORY_UNSUPPORTED_RUNTIME");
    expect(markup).toContain("Repository scan needs attention");
    expect(markup).toContain("No build script was found for the repository web app.");
    expect(markup).toContain("Next step:");
    expect(markup).toContain("Add or expose a package build script");
    expect(markup).not.toContain("Repository scan failed. Retry the scan or choose a different repository.");
  });
});
