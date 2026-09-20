import { isLiveBodyVerified } from "../app/lib/article-live-state";
import { normalizeWrittenTopic } from "../app/lib/vibe-marketing";
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { normalizeMarketingRun } from "../app/lib/vibe-marketing";
import { runFailureGuidance } from "../app/lib/vibe-marketing-run-failures";
import ArticleRecoveryNotice from "../app/components/ArticleRecoveryNotice";

describe("article reliability state", () => {
  test("pending automatic recovery suppresses manual retry and retains the failure", () => {
    const run = normalizeMarketingRun({ run_id: "article", status: "running", resume_available: true,
      retry_available: true, generation: 2, state_version: 10,
      failure: { code: "CORPUS_UNAVAILABLE", message: "Article directory timed out", next_action: "automatic_retry" },
      recovery: { state: "pending", due_at: "2026-09-14T01:00:00Z" } });
    expect(run.resumeAvailable).toBe(false);
    expect(run.retryAvailable).toBe(false);
    expect(run.generation).toBe(2);
    expect(run.stateVersion).toBe(10);
    expect(runFailureGuidance(run).reason).toBe("Article directory timed out");
    const html = renderToStaticMarkup(<ArticleRecoveryNotice run={run} />);
    expect(html).toContain("Recovery scheduled");
    expect(html).toContain("retry automatically");
  });
  test("cancelled or completed runs cannot display stale recovery", () => {
    for (const status of ["completed", "cancelled"]) {
      const run = normalizeMarketingRun({ status, recovery: { state: "pending" } });
      expect(renderToStaticMarkup(<ArticleRecoveryNotice run={run} />)).toBe("");
    }
  });
  test("unknown failure codes and messages survive normalization", () => {
    const run = normalizeMarketingRun({ status: "failed", result: {
      failure: { code: "NEW_DEPENDENCY_CODE", message: "Evidence store unavailable", requires_user_action: true } } });
    expect(runFailureGuidance(run).code).toBe("NEW_DEPENDENCY_CODE");
    expect(runFailureGuidance(run).reason).toBe("Evidence store unavailable");
  });
});

 test("merge and old sitemap status cannot imply a verified live body", () => {
   const article = normalizeWrittenTopic({title: "Article", keyword: "topic", onMain: true, publishStatus: "live"})!;
   expect(isLiveBodyVerified(article)).toBe(false);
   const now = Date.now();
   article.liveVerification = {state: "verified", checkedAt: new Date(now).toISOString()};
   expect(isLiveBodyVerified(article, now)).toBe(true);
   expect(isLiveBodyVerified(article, now + 31 * 60_000)).toBe(false);
 });
