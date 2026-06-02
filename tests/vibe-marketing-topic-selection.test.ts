import { describe, expect, test } from "bun:test";

import { canonicalizeTopicCandidates } from "../app/lib/vibe-marketing";
import type { VibeMarketingTopicCandidate } from "../app/types/vibe-marketing";

function candidate(overrides: Partial<VibeMarketingTopicCandidate>): VibeMarketingTopicCandidate {
  return {
    id: "0",
    rawCandidateId: "0",
    keyword: "tech central sydney",
    title: "Tech Central Sydney",
    ...overrides,
  };
}

describe("vibe marketing topic selection", () => {
  test("gives duplicate raw candidate ids stable unique ids", () => {
    const candidates = canonicalizeTopicCandidates(
      [
        candidate({
          id: "2",
          rawCandidateId: "2",
          keyword: "tech central sydney",
          title: "Tech Central Sydney",
          sourceRunId: "run-tech-central",
        }),
        candidate({
          id: "2",
          rawCandidateId: "2",
          keyword: "how do ai detectors work",
          title: "How Do AI Detectors Work",
          sourceRunId: "run-ai-detectors",
        }),
      ],
      "topic",
    );

    expect(candidates[0].id).toBe("topic:run:run-tech-central:tech-central-sydney");
    expect(candidates[1].id).toBe("topic:run:run-ai-detectors:how-do-ai-detectors-work");
    expect(new Set(candidates.map((item) => item.id)).size).toBe(2);
    expect(candidates[1].rawCandidateId).toBe("2");
  });
});
