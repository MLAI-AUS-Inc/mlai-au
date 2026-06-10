import { describe, expect, test } from "bun:test";

import {
  filterOptimisticallyDeletedDrafts,
  hiddenDraftRunIdsAfterSubmit,
  pruneHiddenDraftRunIds,
  restoreHiddenDraftRunId,
} from "../app/lib/vibe-marketing-draft-delete";
import { normalizeMarketingRun } from "../app/lib/vibe-marketing";
import type { VibeMarketingDraftArticle } from "../app/types/vibe-marketing";

function draft(runId: string, sourceRunId = "source-one"): VibeMarketingDraftArticle {
  return {
    runId,
    sourceRunId,
    workflow: "article_generation",
    status: "blocked",
    title: `Draft ${runId}`,
    targetKeyword: `keyword ${runId}`,
    stageLabel: "Needs attention",
    actionKind: "restart",
    actionLabel: "Restart",
    resumeAvailable: false,
    restartAvailable: true,
    updatedAt: "2026-06-01T00:00:00Z",
    createdAt: "2026-06-01T00:00:00Z",
  };
}

describe("vibe marketing draft deletion", () => {
  test("preserves group cancel response fields on normalized runs", () => {
    const run = normalizeMarketingRun({
      runId: "draft-representative",
      workflow: "article_generation",
      domain: "mlai.au",
      status: "cancelled",
      cancelledRunIds: ["draft-a", "draft-b"],
      protected_run_ids: ["draft-pr-open"],
    });

    expect(run.cancelledRunIds).toEqual(["draft-a", "draft-b"]);
    expect(run.protectedRunIds).toEqual(["draft-pr-open"]);
  });

  test("hides a submitted draft immediately and restores it after an error", () => {
    const drafts = [draft("draft-a"), draft("draft-b", "source-two")];
    let hiddenRunIds = hiddenDraftRunIdsAfterSubmit([], "draft-a");

    expect(filterOptimisticallyDeletedDrafts(drafts, hiddenRunIds).map((item) => item.runId)).toEqual(["draft-b"]);

    hiddenRunIds = restoreHiddenDraftRunId(hiddenRunIds, "draft-a");

    expect(filterOptimisticallyDeletedDrafts(drafts, hiddenRunIds).map((item) => item.runId)).toEqual([
      "draft-a",
      "draft-b",
    ]);
  });

  test("keeps hidden ids only while the stale bootstrap still contains them", () => {
    const hiddenRunIds = hiddenDraftRunIdsAfterSubmit([], "draft-a");

    expect(pruneHiddenDraftRunIds(hiddenRunIds, [draft("draft-a")])).toEqual(["draft-a"]);
    expect(pruneHiddenDraftRunIds(hiddenRunIds, [])).toEqual([]);
  });
});
