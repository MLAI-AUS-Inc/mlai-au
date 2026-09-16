import { describe, expect, it } from "bun:test";
import { hasUpdateWriting } from "../app/lib/update-draft-writing";

describe("AI draft application", () => {
  it("can fill a blank draft, including blank dot-point rows", () => {
    expect(hasUpdateWriting({})).toBe(false);
    expect(hasUpdateWriting({ summary: "  ", highlights: "\n\n", challenges: "", asks: "\t" })).toBe(false);
  });
  it("protects founder writing in any section, even without a summary", () => {
    for (const field of ["summary", "highlights", "challenges", "learnings", "next30Days", "asks"]) {
      expect(hasUpdateWriting({ [field]: "My own words" })).toBe(true);
    }
  });
});
