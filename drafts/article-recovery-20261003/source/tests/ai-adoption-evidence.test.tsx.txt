import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/how-many-people-use-artificial-intelligence-in-2026';
import { ARTICLE_REGISTRY } from '../app/articles/registry';

test('AI adoption article preserves scope, observation dates and community intent', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['featured/how-many-people-use-artificial-intelligence-in-2026'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 expect(html).toContain(entry.title);
 for (const text of ['15 October 2025', '2024', '45.6%', 'monthly users of standalone', 'not a confidence interval', 'AI adoption claim record', 'Fictional exercise', 'not a reconstruction']) expect(html).toContain(text);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 for (const removed of ['84% of humanity', '57% of Australians', 'hostinger.com', 'medium.com']) expect(html).not.toContain(removed);
});

test('illustrative overlap and denominator arithmetic matches visible examples', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('60 + 40 − 30 = 70');
 expect(60 + 40 - 30).toBe(70);
 expect(Math.max(60, 40)).toBe(60);
 expect(Math.min(100, 60 + 40)).toBe(100);
 expect(60 / 80 * 100).toBe(75);
 expect(60 / 200 * 100).toBe(30);
 expect(html).toContain('75% of users');
 expect(html).toContain('30% of all respondents');
});
