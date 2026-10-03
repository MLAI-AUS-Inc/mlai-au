import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import Article, { articleMeta, HANDOFF_WORKSHEET } from "../app/articles/content/featured/what-are-collaboration-tools";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { readFileSync } from "node:fs";
import { HANDOFF_FIELDS, HANDOFF_PLANNING_OPTIONS, HANDOFF_ACCEPTANCE_CASES, HANDOFF_CAPACITY_MINUTES, handoffSetupCost, collaborationHandoffText } from "../app/lib/collaboration-handoff";

test("owner receives a completed handoff, comparable options and a real download before the offer", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const text of ["Completed fictional handoff", "Q-104", "not performed", "Process-only trial", "Configure existing tools", "Scoped integration", "Unknown — obtain a quote", "NOT RUN", "not automatically attached", "/downloads/collaboration-handoff.txt"]) expect(html).toContain(text);
  expect(html.indexOf("Completed fictional handoff")).toBeLessThan(html.indexOf("Describe your workflow"));
  expect(html.indexOf("Compare the three paths")).toBeLessThan(html.indexOf("Describe your workflow"));
  expect(html).toContain('data-cf-article-body');
  expect(html).toContain('data-article-toc-placeholder');
});

test("collaboration guide supplies an owner handoff aid, exception tests and scoped offer", () => {
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  for (const field of ["explicit acceptance by receiver:", "Missing information, duplicate and absence handling:", "cash spending actually avoidable:", "manual fallback / decision owner and date:"]) expect(HANDOFF_WORKSHEET).toContain(field);
  for (const text of ["Fictional example", "not a forecast", "Duplicate trigger or retry", "Scope changed after acceptance", "Integration unavailable", "120 minutes", "capacity, not automatically cash savings", "Describe your workflow", 'data-article-icp="SMB"', "/mlai-studio/start-project"]) expect(html).toContain(text);
  for (const text of ["Competitor sources", "Students &amp; Switchers", "Contact MLAI", "FAQPage", "human-edited and reviewed"]) expect(html).not.toContain(text);
  expect(html).not.toContain('href="/articles" download');
});

test("collaboration metadata preserves publication date and selects SMB conversion", () => {
  const entry = ARTICLE_REGISTRY["featured/what-are-collaboration-tools"];
  expect(entry.title).toBe(articleMeta.title);
  expect(entry.date).toBe("2025-12-13");
  expect(entry.date).toBe(articleMeta.datePublished);
  expect(entry.dateModified).toBe(articleMeta.dateModified);
  expect(entry.description).toBe(articleMeta.description);
  expect(entry.imageAlt).toBe(articleMeta.imageAlt);
  const conversion = BASE_ARTICLE_SEO_CONFIG["/articles/featured/what-are-collaboration-tools"].conversion;
  expect(conversion?.primaryIcp).toBe("SMB");
  expect(conversion?.primary).toBe("studio-project");
  expect(conversion?.version).toBe("smb-handoff-decision-v3");
  expect(articleMeta.dateModified).toBe("2026-09-11");
});

test("download delivers every completed field, blank prompt, option and unrun case", () => {
  const text = readFileSync('public/downloads/collaboration-handoff.txt', 'utf8');
  expect(text).toBe(collaborationHandoffText());
  expect(HANDOFF_FIELDS).toHaveLength(12);
  for (const field of HANDOFF_FIELDS) { expect(text).toContain(field.label + ':'); expect(text).toContain(field.example); }
  for (const option of HANDOFF_PLANNING_OPTIONS) { expect(text).toContain(option.name); expect(text).toContain(option.access); expect(text).toContain(option.upkeep); }
  expect(HANDOFF_ACCEPTANCE_CASES).toHaveLength(6);
  for (const row of HANDOFF_ACCEPTANCE_CASES) { expect(text).toContain(row.id + ': ' + row.case); expect(text).toContain(row.expected); }
  expect(text.match(/Actual: NOT RUN; reviewer unassigned\./g)).toHaveLength(6);
  for (const field of ['Expected result / actual result / evidence reference:', 'Reviewer / date / pass, fail, unresolved or not run:', 'Change, retest and owner decision:']) expect(text).toContain(field);
  expect(text).toContain('Independent review pending');
  expect(text).toContain('No live system, client experiment');
});

test("planning arithmetic distinguishes setup capacity, cash, ongoing cost and unknowns", () => {
  expect(HANDOFF_CAPACITY_MINUTES).toBe(120);
  expect(handoffSetupCost(HANDOFF_PLANNING_OPTIONS[0])).toBe(150);
  expect(handoffSetupCost(HANDOFF_PLANNING_OPTIONS[1])).toBe(500);
  expect(handoffSetupCost(HANDOFF_PLANNING_OPTIONS[2])).toBeNull();
  expect(HANDOFF_PLANNING_OPTIONS[2].monthlyCash).toBeNull();
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  for (const label of ['Collaboration needs comparison', 'Handoff options cost and control comparison', 'Handoff acceptance plan']) expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
  for (const id of ['match-tool','handoff-example','copy-workflow','configure-or-build','acceptance-tests','measure-value','access-and-privacy','next-step']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
  expect(html).toContain('Unknown build costs prevent a complete financial ranking');
  expect(html).toContain('Case review and rework are already inside the per-case figures');
});
