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
});
