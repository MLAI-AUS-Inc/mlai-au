import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { ArticleLayout } from '../app/components/articles/ArticleLayout';
import { getArticlesSortedNewestFirst } from '../app/articles/registry';

test('full article layout never adds a generic authority list and preserves article-owned citations', () => {
 let inspected = 0;
 for (const article of getArticlesSortedNewestFirst()) {
  const html = renderToStaticMarkup(<MemoryRouter><ArticleLayout article={article} upcomingEvents={[]}>
   <p>Article-owned evidence: <a href="https://example.org/claim-specific-source">A source for this claim</a>.</p>
  </ArticleLayout></MemoryRouter>);
  expect(html, article.slug).not.toContain('data-cf-component-id="authoritative-references"');
  expect(html, article.slug).not.toContain('https://www.digital.gov.au/policy/policy-responsible-use-ai-government');
  expect(html, article.slug).toContain('href="https://example.org/claim-specific-source"');
  expect(html, article.slug).toContain('A source for this claim');
  inspected++;
 }
 expect(inspected).toBeGreaterThanOrEqual(56);
});
