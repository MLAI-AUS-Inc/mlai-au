import { describe, expect, test } from "bun:test";

import { runFailureGuidance } from "../app/lib/vibe-marketing-run-failures";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function failedRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "discovery-run-1",
    workflow: "auto_discovery",
    domain: "mlai.au",
    status: "blocked",
    currentStep: "load_context",
    approvalState: null,
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    ...overrides,
  } as VibeMarketingRunSummary;
}

describe("vibe marketing run failure guidance", () => {
  test("tells users to retry a configuration service outage without changing setup", () => {
    const guidance = runFailureGuidance(
      failedRun({
        errorCode: "CONFIG_SERVICE_UNAVAILABLE",
        errors: ["The organization configuration service is temporarily unavailable for mlai.au."],
        resumeAvailable: true,
      }),
    );

    expect(guidance.nextStep).toBe(
      "Retry or resume this run shortly. Your saved competitors and seed keywords have not changed.",
    );
    expect(guidance.nextStep).not.toContain("re-scan");
    expect(guidance.nextStep).not.toContain("articles/blogs route");
  });

  test("keeps genuine missing configuration guidance distinct", () => {
    const guidance = runFailureGuidance(
      failedRun({
        status: "failed",
        errorCode: "MISSING_CONFIG",
        errors: ["No configuration found for domain mlai.au."],
      }),
    );

    expect(guidance.nextStep).toBe(
      "Open company setup and add at least one competitor or seed keyword, then retry topic research.",
    );
  });

  test("does not give repository scan advice to an unknown discovery failure", () => {
    const guidance = runFailureGuidance(
      failedRun({
        status: "failed",
        errorCode: "INTERNAL_ERROR",
        errors: ["Research provider failed."],
      }),
    );

    expect(guidance.nextStep).toBe("Review the failed step, then retry or resume this run when ready.");
    expect(guidance.nextStep).not.toContain("articles/blogs route");
  });
});
