import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { getArticlesSortedNewestFirst } from "../app/articles/registry";

test("published modules do not contain known drafting or unsupported authority boilerplate", () => {
  for (const article of getArticlesSortedNewestFirst()) {
    const source = readFileSync("app/articles/content/" + article.slug + ".tsx", "utf8");
    for (const phrase of ["Brief, factual overview referencing", "Authoritative reference supporting ", "works best when the section stays specific about what changes first", "while still tying each detail back to the main point of the section"]) {
      expect(source.includes(phrase), article.slug + ": " + phrase).toBe(false);
    }
  }
});
