import { describe, expect, test } from "bun:test";

import { previewIframeSrc } from "../app/lib/vibe-marketing";

const URL = "https://cf-articles-run1.pages.dev/articles";

describe("previewIframeSrc", () => {
  test("returns an empty string for an empty preview url", () => {
    expect(previewIframeSrc("", "abc123")).toBe("");
    expect(previewIframeSrc(null, "abc123")).toBe("");
    expect(previewIframeSrc(undefined, "abc123")).toBe("");
    expect(previewIframeSrc("   ", "abc123")).toBe("");
  });

  test("returns the url unchanged when the revision key is empty", () => {
    expect(previewIframeSrc(URL, "")).toBe(URL);
    expect(previewIframeSrc(URL, null)).toBe(URL);
    expect(previewIframeSrc(URL, undefined)).toBe(URL);
    expect(previewIframeSrc(URL, "   ")).toBe(URL);
    expect(previewIframeSrc(`${URL}?tab=preview`, "")).toBe(`${URL}?tab=preview`);
  });

  test("appends cfRev with ? when the url has no query", () => {
    expect(previewIframeSrc(URL, "abc123")).toBe(`${URL}?cfRev=abc123`);
  });

  test("appends cfRev with & when the url already has a query", () => {
    expect(previewIframeSrc(`${URL}?tab=preview`, "abc123")).toBe(`${URL}?tab=preview&cfRev=abc123`);
  });

  test("replaces an existing cfRev instead of duplicating it", () => {
    expect(previewIframeSrc(`${URL}?cfRev=oldsha`, "newsha")).toBe(`${URL}?cfRev=newsha`);
    expect(previewIframeSrc(`${URL}?tab=preview&cfRev=oldsha`, "newsha")).toBe(`${URL}?tab=preview&cfRev=newsha`);
    expect(previewIframeSrc(`${URL}?cfRev=oldsha&tab=preview`, "newsha")).toBe(`${URL}?tab=preview&cfRev=newsha`);
  });

  test("encodes the revision key", () => {
    expect(previewIframeSrc(URL, "sha/with spaces+chars")).toBe(`${URL}?cfRev=sha%2Fwith%20spaces%2Bchars`);
  });

  test("keeps a hash fragment after the appended query", () => {
    expect(previewIframeSrc(`${URL}#top`, "abc123")).toBe(`${URL}?cfRev=abc123#top`);
  });
});
