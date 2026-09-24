import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import { ArticlePreviewEmptyState } from "../app/routes/founder-tools.marketing.run";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function articleRun(overrides: Partial<VibeMarketingRunSummary> = {}): VibeMarketingRunSummary {
  return {
    runId: "component-revision-1",
    workflow: "article_revision",
    domain: "mlai.au",
    status: "running",
    currentStep: "package_content_delivery",
    stepOrder: ["package_content_delivery"],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    componentManifest: { components: [{ id: "title", type: "title" }] },
    contentPackage: { contentPackaged: false },
    livePreview: null,
    ...overrides,
  };
}

function renderPanel(run: VibeMarketingRunSummary) {
  const router = createMemoryRouter(
    [{
      path: "/founder-tools/marketing/runs/:runId",
      element: createElement(ArticlePreviewEmptyState, { run, isSubmitting: false }),
    }],
    { initialEntries: [`/founder-tools/marketing/runs/${run.runId}`] },
  );
  return renderToStaticMarkup(createElement(RouterProvider, { router }));
}

describe("article preview empty state", () => {
  test("shows a packaging failure instead of an active review preview when no preview was built", () => {
    const markup = renderPanel(articleRun({
      status: "failed",
      steps: [{
        key: "package_content_delivery",
        name: "Package content delivery",
        required: true,
        status: "failed",
        attempts: 1,
        error: "Budget exceeded",
        artifacts: [],
      }],
      result: { failed_step: "package_content_delivery" },
    }));

    expect(markup).toContain("Article preview unavailable");
    expect(markup).toContain("stopped while packaging article content");
    expect(markup).not.toContain("Preparing article preview");
    expect(markup).not.toContain("ready for review");
    expect(markup).not.toContain("Retry preview");
  });

  test("does not mark an article ready for review while its preview is being prepared", () => {
    const markup = renderPanel(articleRun());

    expect(markup).toContain("Preparing article preview");
    expect(markup).toContain("Review will be available when the preview is ready.");
    expect(markup).not.toContain("The article is ready for review");
  });

  test("does not mark an article ready for review while its hosted preview is building", () => {
    const markup = renderPanel(articleRun({
      status: "completed",
      contentPackage: { contentPackaged: true },
      livePreview: { available: false, status: "building", previewMode: "platform_deployment" },
    }));

    expect(markup).toContain("Building hosted preview");
    expect(markup).toContain("Review and comments will be available when it is ready.");
    expect(markup).not.toContain("The article is ready for review");
  });

  test("keeps a real preview build failure distinct from an earlier article run failure", () => {
    const markup = renderPanel(articleRun({
      status: "failed",
      livePreview: { available: false, status: "failed", error: "Hosted build failed" },
    }));

    expect(markup).toContain("Preview failed");
    expect(markup).toContain("Hosted build failed");
    expect(markup).toContain("Retry preview");
    expect(markup).not.toContain("stopped while packaging article content");
  });
});
