import { describe, expect, test } from "bun:test";

import {
  AUTOFILL_SLOW_AFTER_MS,
  AUTOFILL_UNAVAILABLE_AFTER_MS,
  autofillProgressState,
  autofillStartErrorsForDisplay,
  hasAcceptedAutofillRun,
  isAutofillStatusPollFailure,
} from "../app/lib/vibe-marketing-autofill-state";

describe("vibe marketing autofill state", () => {
  test("accepts active run ids even when the start response includes warnings", () => {
    expect(hasAcceptedAutofillRun("run-123", "processing")).toBe(true);
    expect(
      autofillStartErrorsForDisplay({
        runId: "run-123",
        status: "running",
        error: "Transient warning from backend",
        errors: ["Another non-fatal warning"],
      }),
    ).toEqual([]);
  });

  test("keeps errors for failed start statuses", () => {
    expect(hasAcceptedAutofillRun("run-123", "blocked")).toBe(false);
    expect(
      autofillStartErrorsForDisplay({
        runId: "run-123",
        status: "blocked",
        error: "Content Factory worker is unavailable",
        errors: ["Content Factory worker is unavailable"],
      }),
    ).toEqual(["Content Factory worker is unavailable"]);
  });

  test("does not mark a still-polling run unavailable after two minutes", () => {
    expect(
      autofillProgressState({
        polling: true,
        statusAgeMs: 2 * 60 * 1000 + 1,
        progressAgeMs: 2 * 60 * 1000 + 1,
      }),
    ).toEqual({ stalled: false, unavailable: false });
  });

  test("separates slow progress from unavailable status polling", () => {
    expect(
      autofillProgressState({
        polling: true,
        statusAgeMs: 5_000,
        progressAgeMs: AUTOFILL_SLOW_AFTER_MS + 1,
      }),
    ).toEqual({ stalled: true, unavailable: false });

    expect(
      autofillProgressState({
        polling: true,
        statusAgeMs: AUTOFILL_UNAVAILABLE_AFTER_MS + 1,
        progressAgeMs: AUTOFILL_UNAVAILABLE_AFTER_MS + 1,
      }),
    ).toEqual({ stalled: true, unavailable: true });
  });

  test("identifies transient status poll failures", () => {
    expect(isAutofillStatusPollFailure({ diagnostics: { statusLoaderError: "Network connection lost." } })).toBe(true);
    expect(isAutofillStatusPollFailure({ diagnostics: {} })).toBe(false);
    expect(isAutofillStatusPollFailure(null)).toBe(false);
  });
});
