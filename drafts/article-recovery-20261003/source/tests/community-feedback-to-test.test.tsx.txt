import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION, faqItems } from "../app/articles/content/featured/why-australian-startups-need-stronger-ai-communities";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { FEEDBACK_ASK, FEEDBACK_BLANK, FEEDBACK_CASES, FEEDBACK_COMPLETED, FEEDBACK_DOWNLOAD, FEEDBACK_FIELDS, FEEDBACK_NOTES, FEEDBACK_PATH, FEEDBACK_PROVENANCE, FEEDBACK_RECORD_FILE, FEEDBACK_WORKFLOW } from "../app/lib/community-feedback-to-test";

const render = (query = "") => renderToStaticMarkup(<MemoryRouter initialEntries={[FEEDBACK_PATH + query]}><Article /></MemoryRouter>);

test("feedback metadata retains original publication and consistent editorial attribution", () => {
  const entry = ARTICLE_REGISTRY[FEEDBACK_PATH.replace("/articles/", "")];
  expect(DATE_PUBLISHED).toBe("2026-06-21");
  expect(DATE_MODIFIED).toBe("2026-09-11");
  expect(entry.date).toBe(DATE_PUBLISHED);
  expect(entry.dateModified).toBe(DATE_MODIFIED);
  expect(entry.description).toBe(DESCRIPTION);
  for (const key of ["title", "image", "imageAlt", "author"] as const) expect(entry[key]).toBe(articleMeta[key]);
  expect(articleMeta.author).toBe("Content Team");
  expect(articleMeta.imageAlt).toBe("Two people in conversation beside a laptop (illustrative image)");
  expect(render()).toContain("not a claim of independent review");
  expect(render()).not.toContain("Dr Sam Donegan");
});

test("complete synthetic materials replace an unsupported claim of actual model tests", () => {
  expect(FEEDBACK_CASES).toHaveLength(3);
  expect(FEEDBACK_NOTES).toHaveLength(4);
  expect(FEEDBACK_WORKFLOW).toHaveLength(5);
  expect(new Set(FEEDBACK_CASES.map(row => row.id)).size).toBe(3);
  expect(new Set(FEEDBACK_NOTES.map(row => row.id)).size).toBe(4);
  for (const row of FEEDBACK_CASES) {
    expect(FEEDBACK_NOTES.some(note => note.id === row.note)).toBe(true);
    for (const value of [row.message, row.draft, row.problem, row.expected, row.saferReply]) expect(value.length).toBeGreaterThan(20);
  }
  expect(FEEDBACK_PROVENANCE).toContain("not produced by a tested AI system");
  expect(FEEDBACK_PROVENANCE).toContain("No event, customer interview, model run or inbox connection took place");
  const html = render();
  expect((html.match(/data-feedback-case=/g) ?? []).length).toBe(3);
  expect((html.match(/data-feedback-note=/g) ?? []).length).toBe(4);
  expect(html).toContain("not a successful model retest");
  expect(html).toContain("a simple checklist");
  expect(html).toContain("No actual test run or saving has been measured");
  expect(html).not.toContain("She records actual outputs and failures before any correction");
});

test("filled record retains unperformed steps and every field in the real downloadable bytes", () => {
  expect(FEEDBACK_FIELDS).toHaveLength(12);
  expect(FEEDBACK_COMPLETED).toHaveLength(FEEDBACK_FIELDS.length);
  expect(FEEDBACK_COMPLETED.every(value => value.trim().length > 30)).toBe(true);
  expect(FEEDBACK_COMPLETED[3]).toContain("not quotations or paraphrases approved by real participants");
  expect(FEEDBACK_COMPLETED[9]).toContain("No model outputs, timings, correction costs or customer results were observed");
  expect(FEEDBACK_COMPLETED[10]).toContain("proposed, not completed");
  expect(FEEDBACK_COMPLETED[11]).toContain("None agreed or sent");
  expect(readFileSync("public" + FEEDBACK_DOWNLOAD, "utf8")).toBe(FEEDBACK_RECORD_FILE);
  for (const value of [FEEDBACK_ASK, FEEDBACK_BLANK, FEEDBACK_PROVENANCE, ...FEEDBACK_WORKFLOW, ...FEEDBACK_COMPLETED]) expect(FEEDBACK_RECORD_FILE).toContain(value);
  for (const row of FEEDBACK_CASES) for (const value of [row.message, row.draft, row.problem, row.expected, row.saferReply]) expect(FEEDBACK_RECORD_FILE).toContain(value);
  for (const note of FEEDBACK_NOTES) for (const value of [note.id, note.comment, note.action]) expect(FEEDBACK_RECORD_FILE).toContain(value);
  expect(FEEDBACK_RECORD_FILE).toContain("not submitted to MLAI");
  expect(render()).toContain(`href="${FEEDBACK_DOWNLOAD}" download="mlai-feedback-to-test-record.txt"`);
});

test("external participant report stays bounded and separate from MLAI evidence", () => {
  const html = render();
  for (const text of ["Aaron Elbourne", "checked 11 September 2026", "CSIRO publishes the account", "not a measured increase in customers or revenue", "Our inference:", "No permission-cleared MLAI founder-feedback outcome", "does not establish the effectiveness of this exercise"]) expect(html).toContain(text);
  for (const removed of ["applications closed when checked", "top 10 startups", "$100K", "$91 million", "Fourth, write down", "Download the PDF"]) expect(html).not.toContain(removed);
});

test("one body and FAQ source expose stable reading anchors and native answer keys", () => {
  const html = render();
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  expect((html.match(/<dt\b/g) ?? []).length).toBe(12);
  expect(html).toContain("data-cf-article-body");
  expect(html).toContain("data-article-toc-placeholder");
  for (const id of ["gap", "example", "method", "record", "mlai", "programme", "limits", "scope"]) expect(html).toContain(`<h2 id="${id}">`);
  for (const row of FEEDBACK_CASES) expect(html).toContain(`<summary class="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Check the reasoning for ${row.id}</summary>`);
  expect(html).toContain('aria-label="Choosing a useful community question" tabindex="0"');
  expect(html).not.toContain("FAQPage");
  expect(new Set(faqItems.map(faq => faq.question)).size).toBe(faqItems.length);
});

test("COMMUNITY event preference carries only an allowlisted format, never private context", () => {
  const conversion = BASE_ARTICLE_SEO_CONFIG[FEEDBACK_PATH].conversion!;
  expect(conversion.primaryIcp).toBe("COMMUNITY");
  expect(conversion.primary).toBe("events");
  expect(conversion.eventCalendarOnly).toBe(true);
  expect(conversion.version).toBe("feedback-to-test-v4");
  for (const selected of ["online", "sydney", "melbourne"]) {
    const html = render(`?event_format=${selected}&notes=secret-discussion`);
    expect(html).toContain(`value="${selected}" selected=""`);
    expect(html).toContain(`href="/events?event_format=${selected}"`);
    expect(html).toContain(`action="${FEEDBACK_PATH}" method="get"`);
    expect(html).not.toContain("secret-discussion");
    expect(html).toContain('data-article-icp="COMMUNITY"');
    expect(html).not.toContain('data-article-icp="FOUNDER_BUILDER"');
  }
  for (const query of ["", "?event_format=unknown", "?event_format=sydney&event_format=online"]) {
    expect(render(query)).toContain('value="all" selected=""');
    expect(render(query)).toContain('href="/events"');
  }
});
