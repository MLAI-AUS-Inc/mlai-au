import { describe, expect, test } from "bun:test";

import {
  isArticleSystemSetupTerminalRun,
  isArticleSystemSetupTerminalStatus,
  shouldPollArticleSystemSetupRun,
  statusPollRefreshKey,
} from "../app/lib/vibe-marketing-run-polling";

describe("vibe marketing run polling", () => {
  test("does not poll failed article setup runs", () => {
    expect(
      shouldPollArticleSystemSetupRun({
        workflow: "article_system_setup",
        status: "failed",
        livePreview: { status: "failed", error: "Directory scaffold dependency validation failed" },
      }),
    ).toBe(false);
    expect(isArticleSystemSetupTerminalStatus("blocked_verification")).toBe(true);
    expect(isArticleSystemSetupTerminalStatus("preview_failed")).toBe(true);
    expect(isArticleSystemSetupTerminalStatus("fallback_ready")).toBe(true);
    expect(isArticleSystemSetupTerminalStatus("running")).toBe(false);
  });

  test("does not poll failed article setup previews", () => {
    expect(
      shouldPollArticleSystemSetupRun({
        workflow: "article_system_setup",
        status: "running",
        livePreview: { status: "failed", platformStatus: "failed" },
      }),
    ).toBe(false);
  });

  test("keeps terminal refresh keys stable when updatedAt changes", () => {
    const first = statusPollRefreshKey({
      runId: "setup-1",
      workflow: "article_system_setup",
      status: "failed",
      currentStep: "build_setup_page",
      updatedAt: "2026-05-23T10:10:00Z",
      error: "Missing required directory component slots: article_list",
    });
    const second = statusPollRefreshKey({
      runId: "setup-1",
      workflow: "article_system_setup",
      status: "failed",
      currentStep: "build_setup_page",
      updatedAt: "2026-05-23T10:11:00Z",
      error: "Missing required directory component slots: article_list",
    });

    expect(second).toBe(first);
  });

  test("treats setup preview failures in current step and nested result as terminal", () => {
    expect(
      isArticleSystemSetupTerminalRun({
        workflow: "article_system_setup",
        status: "running",
        currentStep: "preview_failed",
      }),
    ).toBe(true);
    expect(
      shouldPollArticleSystemSetupRun({
        workflow: "article_system_setup",
        status: "running",
        result: {
          article_system_setup: {
            status: "preview_failed",
            error: "Directory browser verification failed before setup approval.",
          },
        },
      }),
    ).toBe(false);
  });

  test("still polls active article setup runs", () => {
    expect(
      shouldPollArticleSystemSetupRun({
        workflow: "article_system_setup",
        status: "running",
        livePreview: { status: "building" },
      }),
    ).toBe(true);
  });
});
