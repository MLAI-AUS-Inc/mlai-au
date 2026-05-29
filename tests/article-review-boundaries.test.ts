import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = join(import.meta.dir, "..");

function source(path: string) {
  return readFileSync(join(repoRoot, path), "utf8");
}

describe("article review component boundaries", () => {
  test("shared article components expose stable comment targets", () => {
    expect(source("app/components/articles/ArticleDisclaimer.tsx")).toContain('data-cf-component-id="disclaimer"');
    expect(source("app/components/articles/ArticleReferences.tsx")).toContain('data-cf-component-id="references"');
    expect(source("app/components/articles/ArticleLayout.tsx")).toContain('data-cf-component-id="authoritative-references"');
  });

  test("upcoming events CTA exposes the same review target with or without events", () => {
    const content = source("app/components/articles/UpcomingEventsCTA.tsx");

    expect(content.match(/data-cf-component-id="events-cta"/g)?.length).toBe(2);
    expect(content.match(/data-cf-component-type="events-cta"/g)?.length).toBe(2);
    expect(content.match(/data-cf-component-label="Upcoming events CTA"/g)?.length).toBe(2);
  });
});
