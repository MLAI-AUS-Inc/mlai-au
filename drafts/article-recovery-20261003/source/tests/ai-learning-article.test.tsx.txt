import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, SLUG, DOWNLOAD_FILES } from "../app/articles/content/featured/best-way-to-learn-about-ai-2026";
import record from "../public/downloads/ai-builder-lab/change-record.json";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";

test("learning guide delivers real starter files and distinguishes learning from client readiness", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect(DOWNLOAD_FILES).toHaveLength(7);
  for (const name of DOWNLOAD_FILES) {
    expect(html).toContain('href="/downloads/ai-builder-lab/' + name + '"');
    expect(existsSync("public/downloads/ai-builder-lab/" + name)).toBe(true);
  }
  for (const text of ["keyword baseline, not AI", "five correct routes out of six", "31 March 2026", "Apply with your project evidence", "not guaranteed", "New Zealand"]) expect(html).toContain(text);
  for (const text of ["6–9 months", "Brief, factual overview", "commonly accepted", "FAQPage"]) expect(html).not.toContain(text);
  for (const text of ["HOLD", "12/14", "9/14", "neither set is an independent held-out benchmark", "No latency", "same agent", "not a record of your own client work", "15 passing code tests"]) {
    expect(html).toContain(text);
  }
  expect(html).toContain('data-article-toc-placeholder');
  expect(html).toContain('data-cf-article-body');
  expect(html).toContain('[&amp;_h2]:scroll-mt-24');
  for (const label of ['Choose your next learning step', 'Starter acceptance boundaries', 'Learning change comparison', 'Learning change failure log']) {
    expect(html).toContain('role="region" aria-label="' + label + '" tabindex="0"');
  }
  for (const failure of record.failureLog) expect(html).toContain(failure.text);
  expect(html).toContain('href="https://developers.google.com/machine-learning/crash-course/prereqs-and-prework"');
  expect(html).toContain('href="/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence"');
});

test("learning metadata and builder offer match the canonical article", () => {
  const entry = ARTICLE_REGISTRY[SLUG];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.date).toBe(articleMeta.datePublished);
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.image).toBe(articleMeta.image);
  expect(entry.imageAlt).toBe(articleMeta.imageAlt);
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!;
  expect(config.primaryIcp).toBe("BUILDER");
  expect(config.primary).toBe("studio-builder");
  expect(config.version).toBe("learning-evidence-v3");
});

test("article record matches current source hashes and the actual executed review", () => {
  expect(Object.keys(record.sourceSha256).sort()).toEqual(DOWNLOAD_FILES.filter(file => file.endsWith('.mjs')).sort());
  for (const [file, hash] of Object.entries(record.sourceSha256)) {
    expect(createHash('sha256').update(readFileSync('public/downloads/ai-builder-lab/' + file)).digest('hex')).toBe(hash);
  }
  const run = spawnSync('node', ['change-review.mjs'], { cwd: 'public/downloads/ai-builder-lab', encoding: 'utf8', timeout: 10000 });
  expect(run.error).toBeUndefined();
  expect(run.status).toBe(2);
  expect(JSON.parse(run.stdout)).toEqual(record);
  expect(record.summary).toEqual({ total: 14, baselineCorrect: 9, candidateCorrect: 12, remainingFailures: 2, regressions: 1, rejectedPredictions: 0 });
  expect(record.failureLog.map(row => row.id)).toEqual(['c3', 'c5']);
  expect(record.decision).toBe('HOLD');
  expect(record.boundaries.independentReview).toBe('pending');
  expect(record.boundaries.learnedModel).toBe(false);
  expect(record.boundaries.totalOperatingCost).toBe('not-measured');
});

test("the delivered test suite runs and the filled portfolio preserves actual and unknown evidence", () => {
  const tests = spawnSync('node', ['--test', 'triage.test.mjs', 'change-review.test.mjs'], { cwd: 'public/downloads/ai-builder-lab', encoding: 'utf8', timeout: 10000 });
  expect(tests.error).toBeUndefined();
  expect(tests.status).toBe(0);
  expect(tests.stdout).toContain('tests 15');
  expect(tests.stdout).toContain('fail 0');
  const portfolio = readFileSync('public/downloads/ai-builder-lab/PORTFOLIO.md', 'utf8');
  for (const phrase of ['9/14 versus 12/14', '15 passing tests', 'decision HOLD', 'Independent reviewer: pending', 'not measured', 'same agent', 'original evaluate()', 'not a hidden test set']) expect(portfolio).toContain(phrase);
});
