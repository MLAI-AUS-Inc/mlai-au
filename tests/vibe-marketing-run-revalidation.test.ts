import { describe, expect, test } from "bun:test";

import {
  isVibeMarketingRunViewNavigation,
  shouldSkipVibeMarketingRunRevalidation,
} from "../app/lib/vibe-marketing-step-revalidation";

const RUN = "/founder-tools/marketing/runs/run-123";

function url(path: string) {
  return new URL(path, "https://app.test");
}

function args(current: string, next: string, extra: Record<string, unknown> = {}) {
  return {
    currentUrl: url(current),
    nextUrl: url(next),
    currentParams: {},
    nextParams: {},
    defaultShouldRevalidate: true,
    ...extra,
  } as unknown as Parameters<typeof shouldSkipVibeMarketingRunRevalidation>[0];
}

describe("vibe marketing run revalidation", () => {
  test("skips when only setupStep changes on the same run", () => {
    expect(
      isVibeMarketingRunViewNavigation(url(`${RUN}?setupStep=generate`), url(`${RUN}?setupStep=review`)),
    ).toBe(true);
    expect(
      shouldSkipVibeMarketingRunRevalidation(args(`${RUN}?setupStep=generate`, `${RUN}?setupStep=review`)),
    ).toBe(true);
  });

  test("does NOT skip a same-URL revalidation (status poll refresh must run)", () => {
    expect(
      isVibeMarketingRunViewNavigation(url(`${RUN}?setupStep=review`), url(`${RUN}?setupStep=review`)),
    ).toBe(false);
    expect(
      shouldSkipVibeMarketingRunRevalidation(args(`${RUN}?setupStep=review`, `${RUN}?setupStep=review`)),
    ).toBe(false);
  });

  test("does NOT skip plain run load with no params (e.g. revalidate during generation)", () => {
    expect(shouldSkipVibeMarketingRunRevalidation(args(RUN, RUN))).toBe(false);
  });

  test("does NOT skip when navigating to a different run", () => {
    expect(
      shouldSkipVibeMarketingRunRevalidation(
        args(`${RUN}?setupStep=generate`, "/founder-tools/marketing/runs/run-999?setupStep=generate"),
      ),
    ).toBe(false);
  });

  test("does NOT skip when a non-view param also changes", () => {
    expect(
      shouldSkipVibeMarketingRunRevalidation(args(`${RUN}?setupStep=generate`, `${RUN}?setupStep=review&other=1`)),
    ).toBe(false);
  });

  test("does NOT skip after a form action", () => {
    expect(
      shouldSkipVibeMarketingRunRevalidation(
        args(`${RUN}?setupStep=generate`, `${RUN}?setupStep=review`, { formMethod: "POST" }),
      ),
    ).toBe(false);
  });

  test("does NOT skip after an action result", () => {
    expect(
      shouldSkipVibeMarketingRunRevalidation(
        args(`${RUN}?setupStep=generate`, `${RUN}?setupStep=review`, { actionResult: { ok: true } }),
      ),
    ).toBe(false);
  });

  test("does NOT treat non-run paths as run view navigation", () => {
    expect(
      isVibeMarketingRunViewNavigation(
        url("/founder-tools/marketing/create?setupStep=generate"),
        url("/founder-tools/marketing/create?setupStep=review"),
      ),
    ).toBe(false);
  });
});
