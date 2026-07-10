import { describe, expect, test } from "bun:test";

import { shouldOpenExpandedArticleReview } from "../app/lib/vibe-marketing-review-entry";

describe("notification article review entry", () => {
  test("opens the review in expanded mode only for the explicit notification deep link", () => {
    expect(shouldOpenExpandedArticleReview("?articleStep=review&reviewMode=expanded")).toBe(true);
    expect(shouldOpenExpandedArticleReview("?reviewMode=expanded&articleStep=review")).toBe(true);
    expect(shouldOpenExpandedArticleReview("?articleStep=review")).toBe(false);
    expect(shouldOpenExpandedArticleReview("?articleStep=publish&reviewMode=expanded")).toBe(false);
    expect(shouldOpenExpandedArticleReview("")).toBe(false);
  });
});
