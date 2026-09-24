import { describe, expect, test } from "bun:test";

import { normalizeMarketingRun } from "../app/lib/vibe-marketing";

describe("article evidence issues", () => {
  test("keeps only section-scoped issues and the explicit removal request", () => {
    const run = normalizeMarketingRun({
      runId: "article-run",
      workflow: "article_revision",
      sectionIssues: [
        {
          id: "section:privacy:claim-3",
          sectionId: "section:privacy",
          claimId: "claim-3",
          claimExcerpt: "A specific business claim",
          reason: "No supporting primary source was found.",
          sourceHint: "OAIC",
          state: "needs_review",
        },
        { id: "bad", sectionId: "section:\"evil", state: "needs_review" },
      ],
      componentFeedback: {
        comments: [{
          id: "comment-1",
          componentId: "section:privacy",
          componentType: "section",
          body: "Remove this section",
          requestedAction: "delete_section",
          status: "draft",
        }],
      },
      reviewDraftHtml: '<section data-cf-component-id="section:privacy">Draft</section>',
      reviewDraftActionsAvailable: true,
    });

    expect(run.sectionIssues).toEqual([{
      id: "section:privacy:claim-3",
      sectionId: "section:privacy",
      claimId: "claim-3",
      claimExcerpt: "A specific business claim",
      reason: "No supporting primary source was found.",
      state: "needs_review",
      sourceHint: "OAIC",
    }]);
    expect(run.componentFeedback?.comments[0]?.requestedAction).toBe("delete_section");
    expect(run.reviewDraftHtml).toContain("section:privacy");
    expect(run.reviewDraftActionsAvailable).toBe(true);
  });

  test("accepts snake-case status payloads from the backend", () => {
    const run = normalizeMarketingRun({
      run_id: "failed-draft",
      section_issues: [{
        id: "section:intro:claim-1",
        section_id: "section:intro",
        claim_id: "claim-1",
        claim_excerpt: "Unverified claim",
        reason: "The cited page does not support it.",
        source_hint: "Source 4",
        state: "needs_review",
      }],
      review_draft_html: '<section data-cf-component-id="section:intro">Draft</section>',
      review_draft_actions_available: false,
    });
    expect(run.sectionIssues?.[0]?.sectionId).toBe("section:intro");
    expect(run.reviewDraftHtml).toContain("section:intro");
    expect(run.reviewDraftActionsAvailable).toBe(false);
  });
});
