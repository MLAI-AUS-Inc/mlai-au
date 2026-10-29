import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/how-to-startup-a-small-business-in-australia';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
test('launch guide separates early founder learning from implementation and legal decisions', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['featured/how-to-startup-a-small-business-in-australia'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 for (const text of ['Small business launch decision record', 'Fictional planning example', 'not permission', 'not a compliance certificate', 'https://business.gov.au/registrations', 'how-to-get-started-with-ai-2026']) expect(html).toContain(text);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).not.toContain('grounded guidance');
 expect(html).not.toContain('avoid registering too early');
 expect(3000 - 2000 - 1500).toBe(-500);
 expect(3000 - 2000 - 1500 + 2000).toBe(1500);
});
