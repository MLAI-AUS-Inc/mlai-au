import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { readFileSync } from "node:fs";
import Article, { articleMeta, channelTestWorksheet, DATE_PUBLISHED } from "../app/articles/content/featured/go-to-market-for-startups";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { ARTICLE_REGISTRY } from "../app/articles/registry";
import { GTM_RECORDS, GTM_RESULTS, GTM_COMPLETED_FIELDS, GTM_STAGE_ROWS, GTM_BUDGET, GTM_PROVENANCE, GTM_REVIEW_STATUS, GTM_DECISION, gtmWorksheetText, gtmRecordCells, gtmRatio, gtmBudget, summariseGtmChannel, type GtmRecord } from "../app/lib/gtm-channel-test";

const slug = "featured/go-to-market-for-startups";
const render = () => renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);

test("GTM reader can inspect the completed record and exhausted acquisition capacity", () => {
  const html = render();
  expect(html.match(/data-gtm-record-field=/g)).toHaveLength(12);
  expect(html).toContain("Pause new acquisition");
  expect(html).toContain("0 hours remaining");
  expect(html).toContain("Replies to demo invitations");
  expect(html).toContain("Pilot review completed");
  expect(html).toContain("Preferred MLAI event format");
});

test("GTM guide delivers a bounded worksheet and distinguishes synthetic outcomes from evidence", () => {
  const html = render();
  expect(channelTestWorksheet).toHaveLength(12);
  expect(html).toContain('aria-label="Channel test worksheet"');
  expect(html).toContain("Synthetic results for teaching only");
  expect(html).toContain("AUD 280");
  expect(html).toContain("AUD 660");
  expect(html).toContain("opportunity-cost assumption");
  expect(html).toContain("Zero payments so far does not make acquisition cost zero");
  expect(html).toContain("not a fair experiment proving introductions are better");
  expect(html).toContain("Repeat / change / stop");
  expect(html).not.toContain("The goal is to keep choose channels");
  expect(html).toContain('href="/downloads/gtm-channel-test.txt"');
  expect(html).toContain('href="/downloads/gtm-channel-test.txt"');
  const worksheet = readFileSync("public/downloads/gtm-channel-test.txt", "utf8");
  for (const field of channelTestWorksheet) expect(worksheet).toContain(field);
  expect(worksheet).toContain("COMPLETED FICTIONAL EXAMPLE");
  expect(worksheet).toContain("AUD 600");
  expect(worksheet).toContain("payment pending");
});

test("GTM reader receives a contextual community CTA and consistent publication metadata", () => {
  const config = BASE_ARTICLE_SEO_CONFIG["/articles/" + slug].conversion!;
  expect(config.primary).toBe("events");
  expect(config.primaryIcp).toBe("COMMUNITY");
  expect(config.version).toBe("gtm-channel-decision-v3");
  expect(config.eventCalendarOnly).toBe(true);
  const html = render();
  expect(html).toContain(config.copy!.button);
  expect(html).toContain('data-article-icp="COMMUNITY"');
  expect(html).toContain('href="/events"');
  expect(html).not.toContain('href="/mlai-studio#apply"');
  expect(html).toContain("not guaranteed customer introductions");
  expect(ARTICLE_REGISTRY[slug].title).toBe(articleMeta.title);
  expect(ARTICLE_REGISTRY[slug].description).toBe(articleMeta.description);
  expect(ARTICLE_REGISTRY[slug].date).toBe(DATE_PUBLISHED);
  expect(ARTICLE_REGISTRY[slug].dateModified).toBe(articleMeta.dateModified);
  expect(articleMeta.dateModified).toBe("2026-10-29");
  expect(ARTICLE_REGISTRY[slug].imageAlt).toBe(articleMeta.imageAlt);
  expect(articleMeta.imageAlt).toBe("Two people examining a printed profile and coloured notes, one pointing with a pen");
});

test("stage counts derive from the complete synthetic log, not attendance or unknowns relabelled as demand", () => {
  expect(GTM_RECORDS).toHaveLength(28);
  expect(new Set(GTM_RECORDS.map(r => r.id)).size).toBe(28);
  expect(GTM_RESULTS.introductions).toEqual({ reached: 8, fit: 5, notFit: 2, unknownFit: 1, invited: 5, replied: 4, pendingReply: 1, demos: 3, termsShown: 3, accepted: 1, declinedTerms: 1, pendingTerms: 1, paid: 1, pendingPayment: 0, activated: 0 });
  expect(GTM_RESULTS.session).toEqual({ reached: 20, fit: 4, notFit: 5, unknownFit: 11, invited: 4, replied: 3, pendingReply: 1, demos: 2, termsShown: 2, accepted: 1, declinedTerms: 1, pendingTerms: 0, paid: 0, pendingPayment: 1, activated: 0 });
  const paidLater = GTM_RECORDS.map(r => r.id === "S01" ? { ...r, payment: "received" as const } : r);
  const changed = summariseGtmChannel(paidLater, "session");
  expect(changed.paid).toBe(1); expect(changed.pendingPayment).toBe(0); expect(changed.activated).toBe(0);
  const usedLater = paidLater.map(r => r.id === "S01" ? { ...r, reviewCompleted: true } : r);
  expect(summariseGtmChannel(usedLater, "session").activated).toBe(1);
});

test("impossible or missing statuses cannot produce reassuring funnel figures", () => {
  for (const channel of ["other", "constructor", "toString", "__proto__"]) {
    expect(() => summariseGtmChannel(GTM_RECORDS, channel as "introductions")).toThrow("Unknown channel");
  }
  const alter = (patch: Partial<GtmRecord>) => [{ ...GTM_RECORDS[0], ...patch }, ...GTM_RECORDS.slice(1)];
  for (const patch of [{ id: "I02" }, { id: "" }, { fit: "unknown" }, { demoReply: "no" }, { terms: "not-shown" }, { payment: "not-due" }, { channel: "other" }, { fit: undefined }, { reviewCompleted: undefined }]) {
    expect(() => summariseGtmChannel(alter(patch as Partial<GtmRecord>), "introductions")).toThrow();
  }
  const unpaidReview = GTM_RECORDS.map(r => r.id === "S01" ? { ...r, reviewCompleted: true } : r);
  expect(() => summariseGtmChannel(unpaidReview, "session")).toThrow();
  const unknown = { ...GTM_RECORDS[7], fit: "unknown" as const };
  expect(summariseGtmChannel([unknown], "introductions").unknownFit).toBe(1);
  expect(summariseGtmChannel([unknown], "introductions").notFit).toBe(0);
});

test("ratios preserve denominators, zero evidence and bounds", () => {
  expect(gtmRatio(4, 5)).toBe("4 / 5 (80%)");
  expect(gtmRatio(3, 4)).toBe("3 / 4 (75%)");
  expect(gtmRatio(0, 1)).toBe("0 / 1 (0%)");
  expect(gtmRatio(0, 0)).toBe("0 / 0 — not calculable");
  for (const [n, d] of [[1, 0], [-1, 3], [2, 1], [NaN, 2], [1, Infinity], [0.5, 2]]) expect(() => gtmRatio(n, d)).toThrow();
});

test("time and accepted commitments stop acquisition even with cash headroom", () => {
  expect(GTM_BUDGET).toEqual({ cashRemaining: 30, hoursRemaining: 0, commitmentsRemaining: 0, valuedTime: 720, cashPlusTime: 940, pause: true });
  expect(gtmBudget(40, 4, 1).cashPlusTime).toBe(280);
  expect(gtmBudget(180, 8, 1).cashPlusTime).toBe(660);
  expect(gtmBudget(220, 12, 2, 0).cashRemaining).toBe(30);
  expect(gtmBudget(220, 12, 2, 0).cashPlusTime).toBe(220);
  expect(gtmBudget(220, 12, 2, 0).pause).toBe(true);
  expect(gtmBudget(250, 1, 0).pause).toBe(true);
  expect(gtmBudget(1, 12, 0).pause).toBe(true);
  expect(gtmBudget(1, 1, 2).pause).toBe(true);
  expect(gtmBudget(1, 1, 1).pause).toBe(false);
  expect(gtmBudget(260, 13, 3)).toMatchObject({ cashRemaining: -10, hoursRemaining: -1, commitmentsRemaining: -1, pause: true });
  for (const value of [NaN, Infinity, -1, undefined, 1e10]) {
    expect(() => gtmBudget(value as number, 0, 0)).toThrow();
    expect(() => gtmBudget(0, value as number, 0)).toThrow();
    expect(() => gtmBudget(0, 0, value as number)).toThrow();
  }
  expect(() => gtmBudget(0, 0, 0.5)).toThrow();
});

test("the actual file contains the same completed fields, records, stages and honest decision", () => {
  const download = readFileSync("public/downloads/gtm-channel-test.txt", "utf8");
  const html = render();
  expect(download).toBe(gtmWorksheetText());
  expect(GTM_COMPLETED_FIELDS).toHaveLength(12);
  for (const f of GTM_COMPLETED_FIELDS) {
    expect(download).toContain(f.label + ":"); expect(download).toContain(f.value);
    expect(html).toContain(f.label); expect(html).toContain(f.value);
  }
  for (const r of GTM_RECORDS) { expect(html).toContain(`data-gtm-record-id="${r.id}"`); expect(download).toContain(gtmRecordCells(r).join(" | ")); }
  for (const row of GTM_STAGE_ROWS) { expect(html).toContain(row.label); expect(download).toContain(row.rule); for (const value of row.cells) { expect(html).toContain(value); expect(download).toContain(value); } }
  for (const value of [GTM_PROVENANCE, GTM_REVIEW_STATUS, GTM_DECISION]) { expect(html).toContain(value); expect(download).toContain(value); }
  expect(download).toContain("ACTUAL FOLLOW-UP RECORD"); expect(download).toContain("Fictional historical schedule");
  expect(html).toContain('download="gtm-channel-test.txt"');
  expect(html).toContain("Your worksheet and prospect notes are not uploaded or attached");
  expect(html).not.toContain("the next step could be to follow up the pending pilot as agreed");
});

test("article has named keyboard table regions and preserves the distinct conversation task", () => {
  const html = render();
  for (const label of ["GTM channel selection", "GTM stage denominators", "GTM synthetic record log"]) expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
  for (const id of ["buyer-offer", "channel-choice", "worksheet", "completed-record", "worked-results", "cost-check", "decision", "peer-review"]) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
  expect(html).toContain("data-article-toc-placeholder");
  expect(html).toContain('href="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026"');
  expect(html).toContain("opening a workspace requires an account");
});
