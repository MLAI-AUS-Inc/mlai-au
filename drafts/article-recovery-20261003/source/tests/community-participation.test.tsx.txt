import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION, faqItems } from "../app/articles/content/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { DESK_READING_RECORD, PARTICIPATION_BLANK, PARTICIPATION_DOWNLOAD, PARTICIPATION_FIELDS, PARTICIPATION_PATH, PARTICIPATION_PROVENANCE, PARTICIPATION_RECORD_FILE, PUBLIC_CONTRIBUTIONS } from "../app/lib/community-participation";

const render = (query = "") => renderToStaticMarkup(<MemoryRouter initialEntries={[PARTICIPATION_PATH + query]}><Article /></MemoryRouter>);

test("community metadata uses the main publication date, not an earlier preview", () => {
  const entry = ARTICLE_REGISTRY[PARTICIPATION_PATH.replace("/articles/", "")];
  expect(DATE_PUBLISHED).toBe("2026-07-26");
  expect(DATE_MODIFIED).toBe("2026-09-11");
  expect(entry.date).toBe(DATE_PUBLISHED);
  expect(entry.dateModified).toBe(DATE_MODIFIED);
  expect(entry.description).toBe(DESCRIPTION);
  for (const key of ["title", "image", "imageAlt", "author"] as const) expect(entry[key]).toBe(articleMeta[key]);
  expect(articleMeta.imageAlt).toBe("Two people facing each other in conversation (illustrative image)");
  const source = readFileSync("app/articles/content/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group.tsx", "utf8");
  const inspector = source.split("\n").find(line => line.startsWith("const CONTENT_FACTORY_INSPECTOR_SCRIPT"))!;
  expect(createHash("sha256").update(inspector).digest("hex")).toBe("50cfb2bba483d1cc692ade14138af96f6de020cad2f9df48b5f8d65085582770");
});

test("recorded independent response stays distinct from self-merge and unproven outcomes", () => {
  const [reviewed, selfMerged] = PUBLIC_CONTRIBUTIONS;
  expect(reviewed.number).toBe(1586);
  expect(reviewed.reviewer).toBe("drsamdonegan");
  expect(reviewed.reviewer).not.toBe(reviewed.author);
  expect(reviewed.mergedAt).toBe("2026-09-05T22:19:50Z");
  expect(reviewed.headCommit).toBe("932025ab58bf830f88a6c26091b5114e6d1e5cb5");
  expect(reviewed.response).toContain("no written review explanation");
  expect(selfMerged.number).toBe(1514);
  expect(selfMerged.reviewer).toBeNull();
  expect(selfMerged.mergedBy).toBe(selfMerged.author);
  expect(selfMerged.reviewStatus).toBe("No review recorded");
  expect(selfMerged.headCommit).toBe("89b1b24e4932eea64d5b6acf6051533823a0d220");
  for (const row of PUBLIC_CONTRIBUTIONS) {
    expect(row.url).toBe(`https://github.com/MLAI-AUS-Inc/mlai-au/pull/${row.number}`);
    expect(row.mergeCommit).toMatch(/^[a-f0-9]{40}$/);
  }
  const html = render();
  expect(html).toContain("no written explanation");
  expect(html).toContain("does not tell us whether either contributor attended an event");
  expect(html).toContain("not proof that every keyboard interaction works");
  expect(html).toContain("not evidence that another person checked it");
});

test("the completed desk record does not manufacture event participation or outreach", () => {
  expect(PARTICIPATION_FIELDS).toHaveLength(7);
  expect(DESK_READING_RECORD).toHaveLength(7);
  expect(PARTICIPATION_PROVENANCE).toContain("not a member attendance story");
  expect(DESK_READING_RECORD[1]).toContain("No event selected, registered for or attended");
  expect(DESK_READING_RECORD[2]).toContain("No development setup was run");
  expect(DESK_READING_RECORD[3]).toContain("Proposed question, not sent");
  expect(DESK_READING_RECORD[5]).toContain("No contributor was contacted");
  expect(DESK_READING_RECORD[6]).toContain("No attendance, pay, career or usability outcome");
  const html = render();
  expect((html.match(/<dt\b/g) ?? []).length).toBe(7);
  expect((html.match(/data-public-contribution=/g) ?? []).length).toBe(2);
  expect(html).toContain('id="reading-check"');
  expect(html).toContain('aria-label="Public MLAI contribution comparison" tabindex="0"');
  expect(html).toContain('class="w-full min-w-[52rem] table-fixed"');
});

test("the advertised file delivers both source records, the completed example and every blank field", () => {
  expect(readFileSync("public" + PARTICIPATION_DOWNLOAD, "utf8")).toBe(PARTICIPATION_RECORD_FILE);
  expect(PARTICIPATION_RECORD_FILE).toContain(PARTICIPATION_PROVENANCE);
  expect(PARTICIPATION_RECORD_FILE).toContain(PARTICIPATION_BLANK);
  for (const value of DESK_READING_RECORD) expect(PARTICIPATION_RECORD_FILE).toContain(value);
  for (const row of PUBLIC_CONTRIBUTIONS) {
    for (const value of [row.url, row.response, row.headCommit, row.mergeCommit, row.limit]) expect(PARTICIPATION_RECORD_FILE).toContain(value);
  }
  expect(PARTICIPATION_RECORD_FILE).toContain("it is not submitted to MLAI");
  expect(render()).toContain(`href="${PARTICIPATION_DOWNLOAD}" download="mlai-community-participation-record.txt"`);
});

test("one article body and FAQ source retain the reader's definition and navigation", () => {
  const html = render();
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  expect(html).toContain("data-cf-article-body");
  expect(html).toContain("data-article-toc-placeholder");
  for (const id of ["what-community-is", "public-contributions", "signals-of-real-ai-community", "ai-tools-and-human-trust", "newcomer-plan"]) expect(html).toContain(`<h2 id="${id}">`);
  expect(html).not.toContain("FAQPage");
  expect(new Set(faqItems.map(faq => faq.question)).size).toBe(faqItems.length);
  expect(html).toContain("wenger-trayner.com/introduction-to-communities-of-practice/");
  expect(html).toContain("not a ranking of AI communities");
  expect(html).toContain("does not include guaranteed introductions");
  expect(html).not.toContain("Download now");
});

test("COMMUNITY preference flows to the calendar without transporting private notes", () => {
  const conversion = BASE_ARTICLE_SEO_CONFIG[PARTICIPATION_PATH].conversion!;
  expect(conversion.primary).toBe("events");
  expect(conversion.primaryIcp).toBe("COMMUNITY");
  expect(conversion.eventCalendarOnly).toBe(true);
  expect(conversion.version).toBe("community-contribution-v3");
  for (const selected of ["online", "melbourne", "sydney"]) {
    const html = render(`?event_format=${selected}&notes=private-content`);
    expect(html).toContain(`value="${selected}" selected=""`);
    expect(html).toContain(`href="/events?event_format=${selected}"`);
    expect(html).toContain(`action="${PARTICIPATION_PATH}" method="get"`);
    expect(html).not.toContain("private-content");
  }
  for (const query of ["", "?event_format=unknown", "?event_format=online&event_format=sydney"]) {
    expect(render(query)).toContain('value="all" selected=""');
    expect(render(query)).toContain('href="/events"');
  }
  expect(render()).toContain("your participation notes are not sent");
  expect(render()).not.toContain('data-article-conversion="studio-builder"');
});
