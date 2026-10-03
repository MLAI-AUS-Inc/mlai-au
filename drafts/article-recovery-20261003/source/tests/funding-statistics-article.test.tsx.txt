import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/how-much-venture-capital-was-invested-in-2023';
import { ARTICLE_REGISTRY } from '../app/articles/registry';

test('historical funding guide attributes numbers and serves community learning', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['featured/how-much-venture-capital-was-invested-in-2023'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 for (const text of ['US$285 billion', 'US$248.4 billion', '3 January 2024', 'not a combined estimate or confidence interval', 'have not reconciled', 'Fictional teaching example', 'Funding statistic citation record', 'lowest funding quarter of 2023']) expect(html).toContain(text);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).not.toContain('Hiring follows funding');
 expect(html).not.toContain('cutthrough.com');
 expect(html).not.toContain('pirate ship');
});

test('illustrative deal-size calculations distinguish statistics and excluded populations', () => {
 const all = [1, 1, 2, 3, 93];
 const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
 expect(sum(all)).toBe(100);
 expect(sum(all) / all.length).toBe(20);
 expect(all[2]).toBe(2);
 const subset = all.slice(0, -1);
 expect(sum(subset)).toBe(7);
 expect(sum(subset) / subset.length).toBe(1.75);
 expect((subset[1] + subset[2]) / 2).toBe(1.5);
});
