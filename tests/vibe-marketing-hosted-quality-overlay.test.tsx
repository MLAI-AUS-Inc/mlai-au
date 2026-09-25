import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import { currentHostedQualityIssuesForRun } from "../app/lib/vibe-marketing-run-view";
import { normalizeMarketingRun } from "../app/lib/vibe-marketing";
import { ArticleHostedQualityIssueOverlay, LivePreviewCommentInspectorPanel } from "../app/routes/founder-tools.marketing.run";

const previewUrl = "https://preview.example/articles/example?cfInspector=1";

function sixthShapedRun() {
  return normalizeMarketingRun({
    runId: "component-revision-sixth",
    workflow: "article_revision",
    domain: "mlai.au",
    status: "awaiting_approval",
    stepOrder: [], steps: [], warnings: [], errors: [], artifacts: [], diagnostics: {},
    result: {
      article_preview_quality: { status: "blocking_findings", preview_url: previewUrl, resume_generation: 0 },
      live_preview: { resumeGeneration: 0 },
    },
    livePreview: { available: true, exactRender: true, status: "running", previewUrl },
    componentManifest: { components: [
      { id: "image:test-assistant", type: "image", label: "Testing image", sourceSectionId: "test-assistant" },
      { id: "resource-cta", type: "resource-cta", label: "Worksheet download" },
      { id: "section:test-assistant", type: "section", label: "Test the assistant" },
    ] },
    hostedQualityIssues: [
      { id: "hosted:claim-150", claimId: "claim-150", componentId: null, sectionId: null,
        reason: "Generated resource cannot substantiate an external claim", sourceHint: "Hosted article quality review", canRemoveSection: false },
      { id: "hosted:claim-158", claimId: "claim-158", componentId: "image:test-assistant", sectionId: "section:test-assistant",
        reason: "The pixels do not establish concentration", sourceHint: "Hosted article quality review", canRemoveSection: false },
      { id: "hosted:claim-174", claimId: "claim-174", componentId: null, sectionId: null,
        reason: "Empirical claim needs evidence", sourceHint: "Hosted article quality review", canRemoveSection: false },
    ],
  });
}

describe("hosted article quality issue markers", () => {
  test("highlights the sixth image issue without guessing resource or disclosure locations", () => {
    const issues = currentHostedQualityIssuesForRun(sixthShapedRun());
    expect(issues.map((issue) => issue.componentId)).toEqual([null, "image:test-assistant", null]);
    const markup = renderToStaticMarkup(createElement(ArticleHostedQualityIssueOverlay, {
      issues,
      measurements: {
        "image:test-assistant": { id: "image:test-assistant", type: "image", label: "Testing image",
          rect: { left: 10, top: 260, right: 410, bottom: 460, width: 400, height: 200 } },
      },
      viewportHeight: 820,
      openIssueId: "hosted:claim-158",
      onToggleIssue: () => {}, onComment: () => {}, readOnly: false,
    }));
    expect(markup).toContain('aria-label="Review quality finding for Testing image"');
    expect(markup).not.toContain('aria-label="Review quality finding for Worksheet download"');
    expect(markup).toContain("The pixels do not establish concentration");
    expect(markup).toContain("Comment on this part");
    expect(markup).not.toContain("Remove section");
    expect(markup).not.toContain("claim-150");
    expect(markup).not.toContain("claim-174");
  });

  test("keeps unanchored resource and disclosure findings visible in the review banner", () => {
    const run = sixthShapedRun();
    const router = createMemoryRouter([{ path: "/", Component: () => createElement(LivePreviewCommentInspectorPanel, {
      run, selectedComponent: null, onSelectComponent: () => {}, previewTitle: "Hosted article",
      actionSlot: () => null,
    }) }], { initialEntries: ["/"] });
    try {
      const markup = renderToStaticMarkup(createElement(RouterProvider, { router }));
      expect(markup).toContain("3 hosted quality findings to review");
      expect(markup).toContain("claim-150: No exact page location recorded");
      expect(markup).toContain("claim-174: No exact page location recorded");
      expect(markup).toContain("Empirical claim needs evidence");
    } finally {
      router.dispose();
    }
  });

  test("hides markers when preview URL, attempt, render, or quality status changes", () => {
    const base = sixthShapedRun();
    expect(currentHostedQualityIssuesForRun({ ...base, livePreview: { ...base.livePreview!, previewUrl: "https://preview.example/changed" } })).toEqual([]);
    expect(currentHostedQualityIssuesForRun({ ...base, result: { ...base.result, live_preview: { resumeGeneration: 1 } } })).toEqual([]);
    expect(currentHostedQualityIssuesForRun({ ...base, livePreview: { ...base.livePreview!, exactRender: false } })).toEqual([]);
    expect(currentHostedQualityIssuesForRun({ ...base, result: { ...base.result, article_preview_quality: { status: "passed", preview_url: previewUrl, resume_generation: 0 } } })).toEqual([]);
  });
});
