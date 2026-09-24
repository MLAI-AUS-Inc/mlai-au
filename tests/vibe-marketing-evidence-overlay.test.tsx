import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import { ArticleEvidenceIssueOverlay, CommentPopover, LivePreviewCommentInspectorPanel, canEditComponentComment, canRemoveEvidenceIssue, hasReadyArticlePreview, reviewDraftSrcDoc, suggestedEvidenceSourceUrls } from "../app/routes/founder-tools.marketing.run";
import type { VibeMarketingRunSummary, VibeMarketingSectionIssue } from "../app/types/vibe-marketing";

const issue: VibeMarketingSectionIssue = {
  id: "section:privacy:claim-3",
  sectionId: "section:privacy",
  claimId: "claim-3",
  claimExcerpt: "This tool guarantees privacy compliance",
  reason: "The available OAIC guidance does not support this guarantee.",
  sourceHint: "OAIC guidance",
  state: "needs_review",
};

const measurement = {
  id: "section:privacy",
  type: "section",
  label: "Privacy checks",
  rect: { left: 12, top: 90, right: 412, bottom: 390, width: 400, height: 300 },
};

function renderOverlay(openIssueId: string | null, readOnly = false) {
  return renderToStaticMarkup(createElement(ArticleEvidenceIssueOverlay, {
    issues: [issue],
    measurements: { "section:privacy": measurement },
    viewportHeight: 820,
    openIssueId,
    onToggleIssue: () => {},
    onComment: () => {},
    onRemove: () => {},
    removePending: false,
    readOnly,
  }));
}

describe("article evidence overlay", () => {
  test("highlights the measured draft section with an evidence marker", () => {
    const markup = renderOverlay(null);
    expect(markup).toContain("border-amber-500");
    expect(markup).toContain("left:12px;top:90px;width:400px;height:300px");
    expect(markup).toContain('aria-label="Review evidence for Privacy checks"');
    expect(markup).toContain("The available OAIC guidance does not support this guarantee.");
  });

  test("explains the claim and offers comment or section removal on the draft", () => {
    const markup = renderOverlay(issue.id);
    expect(markup).toContain('role="dialog"');
    expect(markup).toContain("This tool guarantees privacy compliance");
    expect(markup).toContain("Comment");
    expect(markup).toContain("Remove section");
    expect(renderOverlay(issue.id, true)).not.toContain("Remove section");
  });

  test("places the evidence detail above a section near the viewport bottom", () => {
    const markup = renderToStaticMarkup(createElement(ArticleEvidenceIssueOverlay, {
      issues: [issue],
      measurements: { "section:privacy": { ...measurement, rect: { left: 12, top: 740, right: 412, bottom: 1040, width: 400, height: 300 } } },
      viewportHeight: 820,
      openIssueId: issue.id,
      onToggleIssue: () => {},
      onComment: () => {},
      onRemove: () => {},
      removePending: false,
      readOnly: false,
    }));
    expect(markup).toContain("top:-360px;max-height:360px");
  });

  test("keeps a queued removal explicit and non-editable until cancelled", () => {
    expect(canEditComponentComment({
      id: "comment-1", componentId: "section:privacy", componentType: "section",
      body: "Remove the section", requestedAction: "delete_section", status: "draft",
    })).toBe(false);
    const markup = renderToStaticMarkup(createElement(CommentPopover, {
      title: "Privacy checks", status: "draft", initialBody: "Remove the section", readOnly: true,
      intentLabel: "Section removal", isSaving: false, onSave: () => {}, onCancel: () => {}, onDelete: () => {},
    }));
    expect(markup).toContain("Section removal");
    expect(markup).toContain("Cancel removal");
    expect(markup).not.toContain("<textarea");
  });

  test("keeps article-wide reference-trail findings as comment requests", () => {
    const articleWide = { ...issue, id: "section:privacy:evidence-support", claimId: "evidence-support" };
    expect(canRemoveEvidenceIssue(articleWide)).toBe(false);
    const markup = renderToStaticMarkup(createElement(ArticleEvidenceIssueOverlay, {
      issues: [articleWide], measurements: { "section:privacy": measurement }, viewportHeight: 820,
      openIssueId: articleWide.id, onToggleIssue: () => {}, onComment: () => {}, onRemove: () => {},
      removePending: false, readOnly: false,
    }));
    expect(markup).toContain("Comment");
    expect(markup).not.toContain("Remove section");
  });

  test("extracts only bounded saved HTTPS suggestions for a source comment", () => {
    expect(suggestedEvidenceSourceUrls(
      "Saved primary sources: https://business.gov.au/online-and-digital/artificial-intelligence; https://www.oaic.gov.au/privacy/guidance. https://business.gov.au/online-and-digital/artificial-intelligence http://insecure.example/guide",
    )).toEqual([
      "https://business.gov.au/online-and-digital/artificial-intelligence",
      "https://www.oaic.gov.au/privacy/guidance",
    ]);
  });

  test("keeps the content-only draft isolated from scripts and forms", () => {
    const document = reviewDraftSrcDoc('<section data-cf-component-id="section:privacy">Draft</section>');
    expect(document).toContain("default-src 'none'");
    expect(document).toContain("form-action 'none'");
    expect(document).toContain('data-cf-component-id="section:privacy"');
  });

  test("renders the evidence draft in a script-free iframe when hosting is blocked", () => {
    const run: VibeMarketingRunSummary = {
      runId: "failed-evidence-review", workflow: "article_revision", domain: "mlai.au", status: "failed",
      stepOrder: [], steps: [], warnings: [], errors: [], artifacts: [], diagnostics: {},
      componentManifest: { components: [{ id: "section:privacy", type: "section", label: "Privacy checks", sourceSectionId: "privacy" }] },
      reviewDraftHtml: '<section id="privacy" data-cf-component-id="section:privacy"><h2>Privacy checks</h2><p>Draft</p></section>',
      reviewDraftActionsAvailable: true,
      sectionIssues: [issue],
    };
    expect(hasReadyArticlePreview(run)).toBe(true);
    const router = createMemoryRouter([{ path: "/", Component: () => createElement(LivePreviewCommentInspectorPanel, {
      run, selectedComponent: null, onSelectComponent: () => {}, previewTitle: "Evidence draft",
      actionSlot: () => null,
    }) }], { initialEntries: ["/"] });
    try {
      const markup = renderToStaticMarkup(createElement(RouterProvider, { router }));
      expect(markup).toContain("Content-only evidence review draft");
      expect(markup).toContain('sandbox="allow-same-origin"');
      expect(markup).toContain("section:privacy");
      expect(markup).toContain("1 claim needs evidence review");
      expect(markup).not.toContain('sandbox="allow-scripts');
    } finally {
      router.dispose();
    }
  });
});
