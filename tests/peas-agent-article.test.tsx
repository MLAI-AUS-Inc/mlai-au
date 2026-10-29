import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, DOWNLOAD_FILES } from "../app/articles/content/featured/what-is-an-intelligent-agent-in-artificial-intelligence";
import review from "../public/downloads/peas-agent-lab/recorded-review.json";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
const slug = "featured/what-is-an-intelligent-agent-in-artificial-intelligence";
const render = () => renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);

test("PEAS article supplies runnable assets and qualifies exactly what the lab proves", () => {
  const html = render();
  expect(DOWNLOAD_FILES).toHaveLength(7);
  for (const file of DOWNLOAD_FILES) {
    expect(html).toContain('href="/downloads/peas-agent-lab/' + file + '"');
    expect(readFileSync("public/downloads/peas-agent-lab/" + file, "utf8").length).toBeGreaterThan(100);
  }
  for (const text of ["Performance", "Environment", "Actuators", "Sensors", "draft-precondition-failed", "step-limit", "in-memory", "infinite loop", "No language model learns here", "drafted with AI coding assistance"]) expect(html).toContain(text);
  for (let n = 1; n <= 6; n++) expect(html).toContain('data-cf-component-id="section:section-0' + n + '"');
  expect(html).not.toContain("What are the 5 types");
});

test("PEAS tutorial offers builder application after evidence without guaranteeing readiness", () => {
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + slug].conversion!;
  expect(config.primaryIcp).toBe("BUILDER");
  expect(config.primary).toBe("studio-builder");
  expect(config.version).toBe("peas-builder-evidence-v3");
  const html = render();
  expect(html).toContain(config.copy!.button);
  expect(html).toContain('href="/mlai-studio#apply"');
  expect(html).toContain("This lab alone is not proof of client readiness");
  expect(html).toContain("confirm eligibility");
  expect(ARTICLE_REGISTRY[slug].title).toBe(articleMeta.title);
  expect(ARTICLE_REGISTRY[slug].description).toBe(articleMeta.description);
  expect(ARTICLE_REGISTRY[slug].date).toBe("2026-05-09");
  expect(ARTICLE_REGISTRY[slug].dateModified).toBe(articleMeta.dateModified);
  expect(articleMeta.dateModified).toBe("2026-09-10");
  expect(ARTICLE_REGISTRY[slug].imageAlt).toBe(articleMeta.imageAlt);
  expect(html).toContain(articleMeta.imageAlt);
});

test("the completed change retains failures, source-bound results and non-learning limits", () => {
  const html = render();
  expect(review.summary).toEqual({ total: 7, baselineMatches: 4, guardedMatches: 7 });
  for (const row of review.cases) {
    expect(html).toContain(row.label);
    expect(row.guarded.matchesContract).toBe(true);
  }
  expect(html.match(/fails new requirement/g)).toHaveLength(3);
  for (const text of ["4/7", "7/7", "REVIEW_REQUIRED", "21 total", "exit", "held-out benchmark", "same rule policy", "freshness-stale", "independent technical and recipient review have not occurred", "not a production recommendation", "Removing the guard would restore"]) expect(html).toContain(text);
  expect(html).not.toContain("This is an exercise proposal");
});

test("PEAS tables have keyboard scroll regions and navigation has a stable slot", () => {
  const html = render();
  for (const label of ["PEAS task specification", "Baseline execution trace", "PEAS failure exercises", "Freshness contract comparison", "Stale record decision trace"]) {
    expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
  }
  expect(html.match(/<table class="min-w-\[640px\]">/g)).toHaveLength(5);
  expect(html.match(/<h2 class="scroll-mt-24">/g)).toHaveLength(6);
  expect(html).toContain("data-article-toc-placeholder");
});
