import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dir, "..");

function source(path: string) {
  return readFileSync(join(repoRoot, path), "utf8");
}

describe("article review component boundaries", () => {
  test("shared article components expose stable comment targets", () => {
    expect(source("app/components/articles/ArticleDisclaimer.tsx")).toContain('data-cf-component-id="disclaimer"');
    expect(source("app/components/articles/ArticleReferences.tsx")).toContain('data-cf-component-id="references"');
    expect(source("app/components/articles/ArticleLayout.tsx")).toContain('data-cf-component-id="authoritative-references"');
  });

  test("upcoming events CTA exposes the same review target with or without events", () => {
    const content = source("app/components/articles/UpcomingEventsCTA.tsx");

    expect(content.match(/data-cf-component-id="events-cta"/g)?.length).toBe(2);
    expect(content.match(/data-cf-component-type="events-cta"/g)?.length).toBe(2);
    expect(content.match(/data-cf-component-label="Upcoming events CTA"/g)?.length).toBe(2);
  });

  test("article review keeps commenting available in the expanded iframe", () => {
    const content = source("app/routes/founder-tools.marketing.run.tsx");

    expect(content).toContain('aria-label={previewExpanded ? "Exit expanded preview" : "Expand interactive preview"}');
    expect(content).toContain('initiallyExpanded={notificationReviewExpanded}');
    expect(content).toContain('? "fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col"');
    expect(content).toContain('? "h-full min-h-0"');
    expect(content).toContain('"Comments sent. Your article revision is underway."');
    expect(content).toContain('"Send comments for revision"');
    expect(content).not.toContain("Open full preview");
    expect(content).toContain('sendInspectorCommand({ type: "measureComponents" });');
    expect(content).toContain("event.stopPropagation();");
    expect(content).toContain("<ArticleCommentCanvas");
  });

  test("ready article reviews use the compact mobile review state", () => {
    const route = source("app/routes/founder-tools.marketing.run.tsx");
    const shell = source("app/components/MarketingWorkflowShell.tsx");
    const reviewDetail = route.slice(
      route.indexOf("function ArticleGenerationReviewDetail"),
      route.indexOf("function ArticleSetupPublishDetail"),
    );

    expect(shell).toContain("{mobileSummary ? (");
    expect(route).toContain('eyebrow: "Article review"');
    expect(route).toContain('title: "Ready for review"');
    expect(route).toContain('status: "Needs review"');
    expect(route).toContain("compactMobileControls");
    expect(route).toContain('compactMobileControls && "hidden sm:flex"');
    expect(route).toContain('className="fixed inset-x-0 bottom-0 z-40');
    expect(reviewDetail.indexOf("<LiveArticlePreviewPanel")).toBeLessThan(reviewDetail.indexOf("<ArticleRunStageProgress"));
    expect(route).not.toContain('>Live article preview</h2>');
  });

  test("article review only shows the action relevant to the current state", () => {
    const content = source("app/routes/founder-tools.marketing.run.tsx");

    expect(content).toContain("const showRevisionAction = reviewState.canSendRevisionRequest || revisionInProgress;");
    expect(content).toContain("{showRevisionAction ? (");
    expect(content).toContain('emptyDraftText="No comments yet"');
    expect(content).toContain('commentModeReadyText="Ready for comments"');
  });
});
