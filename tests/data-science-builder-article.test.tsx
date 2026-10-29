import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION, PORTFOLIO_TUTORIAL, employerExamples } from "../app/articles/content/featured/how-to-get-data-science-job";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { DATA_SCIENCE_PORTFOLIO as LAB, DATA_SCIENCE_PORTFOLIO_FILES } from "../app/lib/data-science-portfolio";
import { runExperiment } from "../public/downloads/data-science-portfolio/forecast.mjs";
import { spawnSync } from "node:child_process";

test("career guide covers the application journey while keeping the optional builder offer", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  for (const text of ["If you are changing careers", "If you have no professional data experience", "SQL and data quality", "Python and reproducibility", "Write a CV", "Prepare for technical", "Apply with your work", 'data-article-icp="BUILDER"', "/mlai-studio#apply"]) expect(html).toContain(text);
  for (const text of ["People‑Also‑Ask", "Brief, factual overview", "Reduced churn by 4.3%", "Download the checklist", "Land the interview: a simple 30"]) expect(html).not.toContain(text);
  expect(html).toContain("not an offer of an available contract");
  expect(html).toContain("permission before publishing client work");
  expect(html).toContain("scikit-learn.org/stable/common_pitfalls.html");
});

test("builder guide metadata and ICP agree with its registered canonical", () => {
  const entry = ARTICLE_REGISTRY["featured/how-to-get-data-science-job"];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.date).toBe(DATE_PUBLISHED);
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.description).toBe(DESCRIPTION);
  expect(entry.image).toBe(articleMeta.image);
  expect(entry.imageAlt).toBe(articleMeta.imageAlt);
  const conversion = BASE_ARTICLE_SEO_CONFIG["/articles/featured/how-to-get-data-science-job"].conversion!;
  expect(conversion.primary).toBe("studio-builder");
  expect(conversion.primaryIcp).toBe("BUILDER");
  expect(conversion.version).toBe("builder-evidence-v3");
  expect(articleMeta.dateModified).toBe(DATE_MODIFIED);
  expect(DATE_MODIFIED > LAB.checked).toBe(true); // Article revision must not relabel the original lab run.
});

test("published lab numbers match the actual executable result and every evaluation case", async () => {
  const input = await Bun.file("public/downloads/data-science-portfolio/synthetic-workload.json").json();
  const recorded = await Bun.file("public/downloads/data-science-portfolio/recorded-result.json").json();
  const executed = runExperiment(input);
  expect(executed).toEqual(recorded);
  expect(recorded.version).toBe(LAB.version);
  expect(recorded.mae).toEqual({ baseline: LAB.baselineMae, candidate: LAB.candidateMae });
  expect(recorded.totalAbsoluteErrors).toEqual({ baseline: LAB.baselineAbsoluteError, candidate: LAB.candidateAbsoluteError });
  expect(recorded.training.days).toBe(LAB.trainingDays);
  expect(recorded.evaluation.days).toBe(LAB.evaluationDays);
  const first = recorded.cases.slice(0, 7);
  const second = recorded.cases.slice(7);
  for (const [cases, expected] of [[first, LAB.firstWeek], [second, LAB.secondWeek]] as const) {
    expect(cases.reduce((sum: number, row: { actual: number; baseline: number }) => sum + Math.abs(row.actual - row.baseline), 0) / 7).toBe(expected.baselineMae);
    expect(cases.reduce((sum: number, row: { actual: number; candidate: number }) => sum + Math.abs(row.actual - row.candidate), 0) / 7).toBe(expected.candidateMae);
  }
  expect(recorded.cases[7]).toEqual({ date: LAB.example.date, actual: LAB.example.actual, baseline: LAB.example.baseline, candidate: LAB.example.candidate, baselineAbsoluteError: LAB.example.baselineError, candidateAbsoluteError: LAB.example.candidateError });
});

test("the linked supporting tutorial preserves executable assets, results and provenance", async () => {
  const article = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect(article).toContain(`href="${PORTFOLIO_TUTORIAL}"`);
  expect(article).not.toContain("node --test forecast.test.mjs");
  const html = await Bun.file(`public${PORTFOLIO_TUTORIAL}`).text();
  expect(html).toContain("/articles/featured/how-to-get-data-science-job#application");
  expect(DATA_SCIENCE_PORTFOLIO_FILES).toHaveLength(5);
  for (const resource of DATA_SCIENCE_PORTFOLIO_FILES) {
    const file = Bun.file(`public${resource.href}`);
    expect(await file.exists()).toBe(true);
    expect(file.size).toBeGreaterThan(100);
    expect(html).toContain(`href="${resource.href}" download=""`);
  }
  const readme = await Bun.file("public/downloads/data-science-portfolio/README.md").text();
  for (const text of ["Downloadable portfolio acceptance checklist", "otherwise PENDING", "An AI coding assistant drafted", "not a staffing tool", "21/14 = 1.5", "84/14 = 6.0", "NOT a blind independent benchmark", "Client permission before publishing client work"]) expect(readme).toContain(text);
  for (const text of ["do not recommend this candidate", "not percent accuracy or money saved", "No hiring manager, client or independent delivery reviewer has approved", "1.5 requests/day", "6.0 requests/day", "21 ÷ 14 versus 84 ÷ 14", "bounded AI-assisted prototype guide"]) expect(html).toContain(text);
  expect(html).toContain('role="region" aria-label="Recorded synthetic forecast results" tabindex="0"');
});

test("the downloadable Node test suite executes before publication", () => {
  const result = spawnSync("node", ["--test", "public/downloads/data-science-portfolio/forecast.test.mjs"], { encoding: "utf8", timeout: 20_000 });
  expect(result.status).toBe(0);
  expect(result.error).toBeUndefined();
  expect(result.stdout).toContain("tests 11");
  expect(result.stdout).toContain("fail 0");
});

// Links and scope are the evidence contract for the hiring examples.
test("employer examples are dated and linked without presenting the sample as market research", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const example of employerExamples) expect(html).toContain(example.href.replaceAll("&", "&amp;"));
  expect(html).toContain('dateTime="2026-10-25"'); // Employer source date stays separate from the companion revision.
  expect(html).toContain("not a representative survey or a live vacancy feed");
});
