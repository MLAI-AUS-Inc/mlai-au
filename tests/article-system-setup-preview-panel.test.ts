import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import { ArticleSystemSetupPreviewPanel } from "../app/routes/founder-tools.marketing.run";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function setupRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "setup-revision-1",
    workflow: "article_system_setup",
    domain: "statdoctor.app",
    githubRepo: "DrAnuG1995/website",
    status: "running",
    currentStep: "build_preview",
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    result: {},
    ...overrides,
  };
}

function renderPanel(run: VibeMarketingRunSummary) {
  const router = createMemoryRouter(
    [
      {
        path: "/founder-tools/marketing/runs/:runId",
        element: createElement(ArticleSystemSetupPreviewPanel, {
          run,
          selectedComponent: null,
          onSelectComponent: () => {},
          isSubmitting: false,
          isActionPending: () => false,
        }),
      },
    ],
    { initialEntries: [`/founder-tools/marketing/runs/${run.runId}`] },
  );
  return renderToStaticMarkup(createElement(RouterProvider, { router }));
}

function exactPreviewRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return setupRun({
    status: "running",
    currentStep: "start_hosted_preview",
    previewUrl: "https://preview.example/articles",
    livePreview: {
      available: true,
      status: "ready",
      previewUrl: "https://preview.example/articles",
      exactRender: true,
    },
    result: {
      status: "preview_building",
      setup_status: "preview_building",
      article_system_setup: { status: "preview_building" },
    },
    ...overrides,
  });
}

describe("article system setup preview panel", () => {
  test("shows the applying-revision-comments banner while a revision rebuild is in flight", () => {
    const markup = renderPanel(setupRun({ currentStep: "revision_preview_building" }));

    expect(markup).toContain("Applying your revision comments");
    expect(markup).toContain("Your pinned comments stay saved.");
  });

  test("shows the banner when the setup payload carries the revision rebuild status", () => {
    const markup = renderPanel(
      setupRun({ result: { article_system_setup: { status: "revision_preview_building" } } }),
    );

    expect(markup).toContain("Applying your revision comments");
  });

  test("does not show the revision banner outside a revision rebuild", () => {
    const markup = renderPanel(setupRun());

    expect(markup).not.toContain("Applying your revision comments");
  });

  test("keeps a green approval control visible while exact-preview checks are running", () => {
    const markup = renderPanel(exactPreviewRun());

    expect(markup).toContain("Approval checks running...");
    expect(markup).toContain("Approval will unlock automatically when the browser and visual checks finish.");
    expect(markup).toContain("bg-emerald-600");
  });

  test("enables approval from the canonical approval state even when run status is stale", () => {
    const markup = renderPanel(
      exactPreviewRun({
        approvalState: "approval_required",
        result: {
          status: "preview_ready",
          setup_status: "preview_ready",
          article_system_setup: { status: "preview_ready" },
        },
      }),
    );

    expect(markup).toContain("Approve setup and create PR");
    expect(markup).toContain('value="approve"');
    expect(markup).not.toContain("Approval checks running...");
  });

  test("offers a human approval override after exact-preview quality automation stalls", () => {
    const markup = renderPanel(
      exactPreviewRun({
        status: "blocked",
        currentStep: "repair_directory_visual_style",
        approvalState: "not_required",
        livePreview: {
          available: true,
          status: "failed",
          platformStatus: "ready",
          previewUrl: "https://preview.example/articles",
          exactRender: true,
        },
        result: {
          status: "blocked",
          setup_status: "preview_verifying",
          error_code: "SETUP_STEP_STALLED",
          article_system_setup: { status: "preview_verifying" },
        },
      }),
    );

    expect(markup).toContain("Approve preview and create PR");
    expect(markup).toContain('value="approve"');
    expect(markup).toContain("Approval records your reviewed-preview override.");
    expect(markup).not.toContain("Approval unavailable");
  });
});
