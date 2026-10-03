import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, SLUG, DISCOVERY_LOG } from "../app/articles/content/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import ArticleConversionCTA from "../app/components/articles/ArticleConversionCTA";
import { readFileSync } from "node:fs";
import { DISCOVERY_FIELDS, DISCOVERY_QUESTIONS, DISCOVERY_COUNTS, DISCOVERY_INVITATIONS, DISCOVERY_CONVERSATIONS, DISCOVERY_EXAMPLE, DISCOVERY_NEXT_TEST, DISCOVERY_PROVENANCE, formatDiscoveryWorksheet } from "../app/lib/customer-problem-discovery";

test("Issue 6 corrects the method and delivers a bounded discovery exercise", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  for (const text of ["bibliometric analysis", "Latent Dirichlet Allocation", "Correction", "not customer research", "Find a suitable MLAI event", 'data-article-icp="COMMUNITY"', "10.1016/j.jbusres.2025.115383"]) expect(html).toContain(text);
  for (const text of ["increases exponentially", "Reddit Shadow-Op", "Trust Ceiling", "80 hours", "FAQPage"]) expect(html).not.toContain(text);
  expect(html).toContain('href="/downloads/customer-problem-discovery.txt" download="customer-problem-discovery.txt"');
  for (const label of ["Sales research claim boundaries", "Customer discovery signal limits", "Fictional discovery notes and interpretations"]) expect(html).toContain('role="region" aria-label="' + label + '" tabindex="0"');
  for (const id of ["research", "hypothesis", "conversation", "test", "worked-example", "next-test", "log", "community"]) expect(html).toContain('id="' + id + '" class="scroll-mt-28"');
  expect(html).toContain('data-cf-article-body');
  expect(html).toContain('data-article-toc-placeholder');
  expect(html).not.toContain('data-cf-component-id="hero-image"');
  for (const text of ["refusals", "contradict", "stop condition", "unknown"]) expect(DISCOVERY_LOG).toContain(text);
});

test("Issue 6 preserves publication date and aligns canonical metadata and offer", () => {
  const entry = ARTICLE_REGISTRY[SLUG];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.date).toBe("2026-02-25");
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.authors).toEqual(["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"]);
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!;
  expect(config.primaryIcp).toBe("COMMUNITY");
  expect(config.primary).toBe("events");
  expect(config.version).toBe("issue6-discovery-v3");
  expect(entry.image).toBe("https://mlai.au/press-kit/logo-wide-black.png");
});

test("the complete fictional recruitment ledger retains non-response and ties each note to one completed conversation", () => {
  expect(DISCOVERY_COUNTS).toEqual({ invited: 8, completed: 3, declined: 2, noResponse: 3 });
  expect(DISCOVERY_COUNTS.completed + DISCOVERY_COUNTS.declined + DISCOVERY_COUNTS.noResponse).toBe(DISCOVERY_COUNTS.invited);
  expect(new Set(DISCOVERY_INVITATIONS.map(row => row.id)).size).toBe(8);
  const completed = DISCOVERY_INVITATIONS.filter(row => row.status === "completed");
  expect(DISCOVERY_CONVERSATIONS.map(row => row.id)).toEqual(completed.map(row => row.id));
  for (const row of DISCOVERY_INVITATIONS) {
    expect(Date.parse(row.statusDate)).toBeGreaterThanOrEqual(Date.parse(row.invited));
    expect(Date.parse(row.statusDate)).toBeLessThanOrEqual(Date.parse("2026-09-07"));
  }
  for (const row of DISCOVERY_CONVERSATIONS) {
    expect(row.date).toBe(completed.find(invitation => invitation.id === row.id)!.statusDate);
    expect(row.note.length).toBeGreaterThan(40);
    expect(row.interpretation.length).toBeGreaterThan(40);
    expect(row.missing.length).toBeGreaterThan(40);
  }
});

test("the delivered worksheet contains every prompt, blank field, completed field and unrun test boundary", () => {
  const text = formatDiscoveryWorksheet();
  expect(readFileSync("public/downloads/customer-problem-discovery.txt", "utf8")).toBe(text);
  expect(text.endsWith("\n")).toBe(true);
  expect(DISCOVERY_QUESTIONS).toHaveLength(6);
  expect(DISCOVERY_FIELDS).toHaveLength(11);
  expect(DISCOVERY_EXAMPLE.map(([label]) => label)).toEqual([...DISCOVERY_FIELDS]);
  expect(new Set(DISCOVERY_FIELDS).size).toBe(11);
  for (const [question, followup] of DISCOVERY_QUESTIONS) { expect(text).toContain(question); expect(text).toContain(followup); }
  for (const [label, answer] of DISCOVERY_EXAMPLE) { expect(text).toContain(label); expect(text).toContain(answer); expect(answer.length).toBeGreaterThan(60); }
  for (const [label, value] of DISCOVERY_NEXT_TEST) { expect(text).toContain(label); expect(text).toContain(value); }
  for (const row of DISCOVERY_INVITATIONS) expect(text).toContain(`${row.id} | invited ${row.invited} | ${row.status} | status/cutoff ${row.statusDate}`);
  expect(text.indexOf(DISCOVERY_PROVENANCE)).toBeLessThan(text.indexOf(DISCOVERY_EXAMPLE[0][1]));
  for (const boundary of ["three completed conversations, two declines and three", "No actual observations were collected", "No real contact details or permission records exist", "Frequency unknown", "CHANGE SCOPE", "UNRUN", "A$0 external spend; the time is not free", "No completed sessions means an access problem", "not statistically validated thresholds", "Codex assisted"]) expect(text).toContain(boundary);
});

test("the rendered example keeps contrary evidence and an unrun plan before the community CTA", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const value of [DISCOVERY_PROVENANCE, "8 invitations: 3 completed conversations, 2 declines and 3 without a response", "CHANGE SCOPE", "Frequency unknown", "UNRUN", "No worksheet is automatically shared", "not a sales funnel or a contractor application"]) expect(html).toContain(value);
  expect(html.indexOf(DISCOVERY_PROVENANCE)).toBeLessThan(html.indexOf("8 invitations"));
  expect(html.indexOf('id="worked-example"')).toBeLessThan(html.indexOf('data-article-conversion="events"'));
  expect(html.indexOf('id="next-test"')).toBeLessThan(html.indexOf('data-article-conversion="events"'));
  expect(html).toContain('href="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026"');
  expect(html).not.toContain('href="/mlai-studio#apply"');
});

test("contextual event copy works with and without event cards", () => {
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!;
  for (const events of [[], [{ _id: "test", name: "Sample event", startDate: "2026-10-01T09:00:00Z", timezone: "Australia/Sydney", url: "https://lu.ma/example" }]]) {
    const html = renderToStaticMarkup(<MemoryRouter><ArticleConversionCTA articleSlug={SLUG} config={config} events={events as Parameters<typeof ArticleConversionCTA>[0]["events"]} /></MemoryRouter>);
    expect(html).toContain(config.copy!.title);
    expect(html).toContain(config.copy!.button);
    expect(html).toContain('href="/events"');
    expect(html).toContain('data-article-icp="COMMUNITY"');
  }
});
