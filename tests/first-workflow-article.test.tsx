import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { articleMeta } from '../app/articles/content/featured/how-to-get-started-with-ai-2026';
import { readFileSync } from 'node:fs';
import { FIRST_WORKFLOW_PLAN, FIRST_WORKFLOW_RESULTS, FIRST_WORKFLOW_SLOW_REVIEW, FIRST_WORKFLOW_CANDIDATES, FIRST_WORKFLOW_BRIEF, FIRST_WORKFLOW_BRIEF_TEMPLATE, calculateFirstWorkflow, firstWorkflowSelectionText, firstWorkflowPercent } from '../app/lib/first-workflow-readiness';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
test('first-workflow economics separates setup, repeat-week cost and completed brief before the CTA', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const text of ['First week is not a repeat week', 'What happens to margin under these assumptions?', 'Customer-remedy allowance', 'Completed FAQ workflow brief', 'not automatically attached', 'NOT RUN']) expect(html).toContain(text);
 expect(html.indexOf('What happens to margin')).toBeLessThan(html.indexOf('Describe your workflow'));
 expect(html).toContain('data-article-toc-placeholder');
});
test('first workflow guide targets SMB with scoped arithmetic and privacy limits', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('data-article-icp="SMB"');
 expect(html).toContain('href="/mlai-studio/start-project"');
 expect(html).toContain('Describe your workflow');
 expect(html).toContain('releases 40 minutes of capacity');
 expect(html).toContain('First business workflow brief');
 expect(html).toContain('not a compliance determination');
 expect(html).toContain('fictional business');
 expect(html).not.toContain('reduces effort by at least');
 expect(html).not.toContain('stick to vendors offering Australian or APAC');
});
test('selection guide includes the completed comparison and matching usable download', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const worksheet = readFileSync('public/downloads/first-ai-workflow-selection.txt', 'utf8');
 for (const text of ['240 minutes', '100 minutes', '150 minutes', 'operations manager', 'template']) {
  expect(html.toLowerCase()).toContain(text);
  expect(worksheet.toLowerCase()).toContain(text);
 }
 expect(html).toContain('href="/downloads/first-ai-workflow-selection.txt"');
 expect(html).toContain('invented one-week baseline');
 expect(html).toContain('cost unknown');
 expect(html).toContain('not a universal points system');
 expect(worksheet).toContain('not 120 minutes');
 expect(worksheet).toContain('mark unknowns explicitly');
});

test('first and repeat weeks account separately for review, correction, maintenance and one-off setup', () => {
 const r = FIRST_WORKFLOW_RESULTS;
 expect(r.baselineMinutes).toBe(240); expect(r.reviewMinutes).toBe(120);
 expect(r.firstWeekMinutes).toBe(200); expect(r.repeatWeekMinutes).toBe(170);
 expect(r.firstWeekCapacity).toBe(40); expect(r.repeatWeekCapacity).toBe(70);
 expect(r.internalSetupValue).toBe(30); expect(r.combinedSetupValue).toBe(120);
 expect(FIRST_WORKFLOW_PLAN.extraCorrectionMinutes + FIRST_WORKFLOW_PLAN.maintenanceMinutes + FIRST_WORKFLOW_PLAN.setupMinutes).toBe(80);
 expect(FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekMinutes).toBe(250);
 expect(FIRST_WORKFLOW_SLOW_REVIEW.firstWeekMinutes).toBe(280);
 expect(FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekCapacity).toBe(-10);
 expect(FIRST_WORKFLOW_SLOW_REVIEW.firstWeekCapacity).toBe(-40);
 expect(FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekChange).toBe(-24);
});

test('listed-cost margin never books released payroll as savings or double-counts the whole remedy allowance', () => {
 const r = FIRST_WORKFLOW_RESULTS;
 expect(r.recurringCash).toBe(20); expect(r.incrementalRemedies).toBe(4);
 expect(r.baselineResult).toBe(992); expect(r.firstWeekResult).toBe(878); expect(r.repeatWeekResult).toBe(968);
 expect(r.firstWeekChange).toBe(-114); expect(r.repeatWeekChange).toBe(-24);
 expect(r.baselineMargin).toBeCloseTo(19.84, 8); expect(r.firstWeekMargin).toBeCloseTo(17.56, 8); expect(r.repeatWeekMargin).toBeCloseTo(19.36, 8);
 expect(r.repeatMarginPointChange).toBeCloseTo(-0.48, 8); expect(r.firstMarginPointChange).toBeCloseTo(-2.28, 8);
 const noSetup = calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, setupMinutes: 0, setupCash: 0 });
 expect(noSetup.firstWeekResult).toBe(noSetup.repeatWeekResult); expect(noSetup.firstWeekMinutes).toBe(noSetup.repeatWeekMinutes);
 const differentCapacityRate = calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, capacityHourlyValue: 200 });
 expect(differentCapacityRate.internalSetupValue).toBe(100); expect(differentCapacityRate.firstWeekResult).toBe(878);
 const worseErrors = calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, proposedRemedies: 100 });
 expect(worseErrors.repeatWeekChange).toBe(-112);
});

test('invalid or zero-revenue inputs cannot manufacture a percentage margin', () => {
 for (const key of Object.keys(FIRST_WORKFLOW_PLAN) as (keyof typeof FIRST_WORKFLOW_PLAN)[]) {
  for (const value of [NaN, Infinity, -1, undefined, 1e10]) expect(() => calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, [key]: value } as typeof FIRST_WORKFLOW_PLAN)).toThrow();
 }
 expect(() => calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, replies: 1.5 })).toThrow();
 const noRevenue = calculateFirstWorkflow({ ...FIRST_WORKFLOW_PLAN, weeklyRevenue: 0 });
 for (const value of [noRevenue.baselineMargin, noRevenue.firstWeekMargin, noRevenue.repeatWeekMargin, noRevenue.repeatMarginPointChange, noRevenue.firstMarginPointChange]) expect(value).toBeNull();
 expect(firstWorkflowPercent(null)).toBe('Not defined');
 expect(noRevenue.repeatWeekResult).toBe(-4032);
});

test('download matches every completed field, candidate and calculation with actual-case slots', () => {
 const text = readFileSync('public/downloads/first-ai-workflow-selection.txt', 'utf8');
 expect(text).toBe(firstWorkflowSelectionText());
 expect(FIRST_WORKFLOW_BRIEF).toHaveLength(12); expect(FIRST_WORKFLOW_BRIEF_TEMPLATE.split('\n')).toHaveLength(12);
 for (const field of FIRST_WORKFLOW_BRIEF) { expect(text).toContain(field.label + ':'); expect(text).toContain(field.value); }
 expect(FIRST_WORKFLOW_CANDIDATES).toHaveLength(3);
 for (const c of FIRST_WORKFLOW_CANDIDATES) { expect(text).toContain(c.task); expect(text).toContain(c.decision); expect(c.reworkCases).toBeLessThanOrEqual(c.weeklyCases); }
 for (const value of ['BLANK WEEKLY ECONOMICS', 'ACTUAL CASE LOG', 'GST-exclusive', 'not automatically attached', 'NOT RUN', 'Independent owner/technical review pending', 'not measured error rates', 'not an annual projection', '−A$114', '−A$24', '19.84%', '17.56%', '19.36%']) expect(text).toContain(value);
});

test('metadata, buyer CTA, primary evidence and table regions remain aligned', () => {
 const slug = 'featured/how-to-get-started-with-ai-2026';
 const entry = ARTICLE_REGISTRY[slug];
 for (const key of ['title', 'description', 'author', 'imageAlt'] as const) expect(entry[key]).toBe(articleMeta[key]);
 expect(entry.date).toBe('2025-02-10'); expect(entry.dateModified).toBe(articleMeta.dateModified); expect(articleMeta.dateModified).toBe('2026-09-11');
 const c = BASE_ARTICLE_SEO_CONFIG['/articles/' + slug].conversion;
 expect(c?.primary).toBe('studio-project'); expect(c?.primaryIcp).toBe('SMB'); expect(c?.version).toBe('first-workflow-cost-v3');
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const label of ['First workflow candidate boundaries', 'First and repeat week effort', 'First workflow cost and margin assumptions']) expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
 for (const id of ['observe', 'compare', 'completed-selection', 'data', 'measure', 'margin', 'brief', 'implementation']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
 expect(html).toContain('set-up-a-profit-and-loss-statement'); expect(html).toContain('not a compliance determination');
 expect(html).toContain('not a statutory profit-and-loss statement'); expect(html).not.toContain('FAQPage');
});
