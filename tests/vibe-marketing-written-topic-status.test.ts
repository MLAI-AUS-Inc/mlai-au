import { describe, expect, test } from "bun:test";

import { normalizeWrittenTopic } from "../app/lib/vibe-marketing";

describe("normalizeWrittenTopic publish status", () => {
  test("parses camelCase publish status and live url", () => {
    const topic = normalizeWrittenTopic({
      title: "How to Start Fundraising for Your AI Startup",
      keyword: "ai startup fundraising",
      publishStatus: "live",
      liveUrl: "https://mlai.au/articles/featured/how-to-start-fundraising-for-your-ai-startup",
      prNumber: 990,
    });
    expect(topic?.publishStatus).toBe("live");
    expect(topic?.liveUrl).toBe(
      "https://mlai.au/articles/featured/how-to-start-fundraising-for-your-ai-startup",
    );
    expect(topic?.prNumber).toBe(990);
  });

  test("parses snake_case publish status from older payloads", () => {
    const topic = normalizeWrittenTopic({
      title: "Article",
      keyword: "article",
      publish_status: "pr_open",
      pr_url: "https://github.com/MLAI-AUS-Inc/mlai-au/pull/990",
    });
    expect(topic?.publishStatus).toBe("pr_open");
    expect(topic?.prUrl).toBe("https://github.com/MLAI-AUS-Inc/mlai-au/pull/990");
  });

  test("unknown status values fall back to null instead of leaking through", () => {
    const topic = normalizeWrittenTopic({
      title: "Article",
      keyword: "article",
      publishStatus: "shipped",
    });
    expect(topic?.publishStatus).toBeNull();
  });

  test("missing status stays null for legacy rows", () => {
    const topic = normalizeWrittenTopic({ title: "Article", keyword: "article" });
    expect(topic?.publishStatus).toBeNull();
  });
});
