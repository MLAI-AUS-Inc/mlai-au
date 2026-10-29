import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { ARTICLE_REGISTRY, getArticlesSortedNewestFirst } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import ArticleConversionCTA from '../app/components/articles/ArticleConversionCTA';

test('every published article has an explicit versioned ICP and compatible primary offer', () => {
 const articles = getArticlesSortedNewestFirst();
 expect(articles.length).toBeGreaterThanOrEqual(56);
 const compatible: Record<string, string[]> = {
  SMB: ['studio-project'], BUILDER: ['studio-builder'], FOUNDER_BUILDER: ['studio-builder'],
  COMMUNITY: ['events', 'founder-tools', 'vibe-raising'], OUTSIDE: ['none'],
 };
 for (const article of articles) {
  const config = BASE_ARTICLE_SEO_CONFIG['/articles/' + article.slug]?.conversion;
  expect(config, article.slug).toBeDefined();
  expect(config?.primaryIcp, article.slug).toBeDefined();
  expect(config?.version, article.slug).toBeTruthy();
  expect(compatible[config!.primaryIcp!], article.slug).toContain(config!.primary);
  const html = renderToStaticMarkup(<MemoryRouter><ArticleConversionCTA articleSlug={article.slug} config={config!} events={[]} /></MemoryRouter>);
  if (config!.primaryIcp === 'OUTSIDE') expect(html, article.slug).toBe('');
  else expect(html, article.slug).toContain('data-article-icp="' + config!.primaryIcp + '"');
 }
});

test('founder validation and funding readers receive contextual learning CTAs, not contractor offers', async () => {
 for (const slug of ['a-practical-guide-for-australian-founders-building-an-ai-startup', 'startup-company-investment-for-ai-founders']) {
  const module = await import('../app/articles/content/featured/' + slug + '.tsx');
  const Article = module.default;
  const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
  expect(html).toContain('data-article-icp="COMMUNITY"');
  expect(html).toContain('href="/events"');
  expect(html).not.toContain('href="/mlai-studio#apply"');
  expect(module.DATE_MODIFIED).toBe('2026-10-29');
  const entry = ARTICLE_REGISTRY['featured/' + slug];
  expect(module.DATE_PUBLISHED).toBe(entry.date);
  expect(module.articleMeta.datePublished).toBe(entry.date);
  expect(module.DATE_MODIFIED).toBe(entry.dateModified);
  if (slug.startsWith('startup-company')) {
   expect(html).toContain('Funding discussion preparation');
   expect(html).toContain('href="/vibe-raising"');
   expect(html).not.toContain('href="#define-the-milestone-your-round-must-buy"');
  } else expect(html).toContain('Startup validation discussion record');
 }
});
