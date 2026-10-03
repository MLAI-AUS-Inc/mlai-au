import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Capital from '../app/articles/content/featured/venture-capital-how-does-it-work';
import Firm from '../app/articles/content/featured/how-does-a-venture-capital-firm-work';
import Value from '../app/articles/content/featured/how-vcs-value-startups';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
test('valuation promise and summary avoid unsupported market authority', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Value /></MemoryRouter>);
 const metadata = ARTICLE_REGISTRY['featured/how-vcs-value-startups'];
 expect(metadata.date).toBe('2026-01-22');
 expect(metadata.description).toContain('compare evidence');
 expect(html).toContain('fictional comparison exercise');
 expect(html).toContain('Amount raised is not valuation');
 expect(html).toContain('insufficient information');
 for (const residue of ['Investors almost always', 'Berkus', 'investor‑grade', 'methods investors use in 2026', '90s aesthetic', 'SaaS often uses ARR multiples']) expect(html).not.toContain(residue);
 expect(html).toContain('not a current valuation benchmark');
});
test('valuation bounds SAFE terminology and cash-based efficiency example', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Value /></MemoryRouter>);
 expect(html).toContain('uncapped MFN');
 expect(html).toContain('not after the new priced-round investment');
 expect(html).toContain('not Australia');
 expect(html).toContain('denominator is zero');
 expect(html).toContain('ratio is undefined');
 expect(html).toContain('not be described as improved efficiency');
 expect(html).toContain('https://www.ycombinator.com/safe');
 expect(html).toContain('https://www.scalevp.com/blog/benchmarking-saas-growth-and-burn');
 expect(html).not.toContain('lower is better post‑PMF');
 expect(html).not.toContain('Round sizes and prices can be more conservative');
 expect(120_000 / (460_000 - 400_000)).toBe(2);
});
test('valuation distinguishes cap-table arithmetic from market claims', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Value /></MemoryRouter>);
 expect(html).toContain('1,250,000');
 expect(html).toContain('20%');
 expect(html).toContain('does not guarantee repayment');
 expect(html).toContain('Fictional priced-round example');
 expect(html).not.toContain('The cleanest data wins the debate');
 expect(html).not.toContain('local market in 2026 remains disciplined');
 expect(2_000_000 / (8_000_000 / 1_000_000)).toBe(250_000);
 expect(250_000 / 1_250_000).toBe(0.2);
});
for (const [name, Article, boundary] of [
 ['capital', Capital, 'Milestone the business is trying to reach:'],
 ['firm', Firm, 'Decision-maker and process questions:'],
 ['value', Value, 'Verified fact, assumption or unknown:'],
] as const) test(name + ' routes educational intent to contextual events', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).toContain(boundary);
 expect(html).toContain('Funding discussion record');
 expect(html).not.toContain('2 business days');
 expect(html).not.toContain('Download the checklist mentioned above');
 expect(html).not.toContain('Get recommendations');
 expect(html).not.toContain('data-article-icp="FOUNDER_BUILDER"');
});
