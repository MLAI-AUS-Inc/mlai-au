import { describe, expect, test } from "bun:test";

import {
  filterDiscardedWrittenTopics,
  hiddenArticleIdsAfterSubmit,
  pruneHiddenArticleIds,
  restoreHiddenArticleId,
} from "../app/lib/vibe-marketing-article-discard";
import { normalizeWrittenTopic } from "../app/lib/vibe-marketing";
import type { VibeMarketingWrittenTopic } from "../app/types/vibe-marketing";

function topic(partial: Partial<VibeMarketingWrittenTopic>): VibeMarketingWrittenTopic {
  return { title: "Article", keyword: "article", ...partial } as VibeMarketingWrittenTopic;
}

describe("article discard optimistic helpers", () => {
  test("hides the submitted article id once", () => {
    const first = hiddenArticleIdsAfterSubmit([], "a1");
    expect(first).toEqual(["a1"]);
    expect(hiddenArticleIdsAfterSubmit(first, "a1")).toBe(first);
    expect(hiddenArticleIdsAfterSubmit(first, "")).toBe(first);
  });

  test("restores an id when the discard fails", () => {
    expect(restoreHiddenArticleId(["a1", "a2"], "a1")).toEqual(["a2"]);
    expect(restoreHiddenArticleId(["a1"], "")).toEqual(["a1"]);
  });

  test("prunes hidden ids that no longer exist in fresh bootstrap", () => {
    const topics = [topic({ id: "a1" }), topic({ id: "a3" })];
    expect(pruneHiddenArticleIds(["a1", "a2"], topics)).toEqual(["a1"]);
  });

  test("filters discarded topics but keeps id-less rows visible", () => {
    const topics = [topic({ id: "a1" }), topic({ id: "a2" }), topic({ id: undefined })];
    const filtered = filterDiscardedWrittenTopics(topics, ["a2"]);
    expect(filtered.map((item) => item.id)).toEqual(["a1", undefined]);
    expect(filterDiscardedWrittenTopics(topics, [])).toBe(topics);
  });
});

describe("normalizeWrittenTopic runId parsing", () => {
  test("parses camelCase runId", () => {
    expect(normalizeWrittenTopic({ title: "T", keyword: "k", runId: "run-1" })?.runId).toBe("run-1");
  });

  test("parses snake_case run_id and source_run_id fallbacks", () => {
    expect(normalizeWrittenTopic({ title: "T", keyword: "k", run_id: "run-2" })?.runId).toBe("run-2");
    expect(normalizeWrittenTopic({ title: "T", keyword: "k", source_run_id: "run-3" })?.runId).toBe("run-3");
  });

  test("missing runId stays null so the Edit link hides", () => {
    expect(normalizeWrittenTopic({ title: "T", keyword: "k" })?.runId).toBeNull();
  });
});
