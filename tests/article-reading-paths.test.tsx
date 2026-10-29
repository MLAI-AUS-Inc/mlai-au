import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { ARTICLE_REGISTRY, isArticleIndexable } from '../app/articles/registry';
import { ARTICLE_READING_PATHS } from '../app/articles/reading-paths';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import { resolveArticleReadingPaths } from '../app/lib/article-reading-paths';
import RelatedArticlesCarousel from '../app/components/RelatedArticlesCarousel';
import { ArticleLayout } from '../app/components/articles/ArticleLayout';

const published = Object.values(ARTICLE_REGISTRY).filter(a => isArticleIndexable(a) && a.publicationStatus !== 'under-review');
const path = (slug: string) => '/articles/' + slug;
const first = published[0];
const currentPath = path(first.slug);
const entry = ARTICLE_READING_PATHS[currentPath][0];
const markup = (value: React.ReactNode) => renderToStaticMarkup(<MemoryRouter>{value}</MemoryRouter>);
const text = (value: string) => renderToStaticMarkup(<span>{value}</span>).slice(6, -7);
const hrefs = (html: string) => [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(match => match[1]);

test('every current published article has an explicit reading decision, with no notices or orphan source files', () => {
  expect(published).toHaveLength(58);
  expect(Object.keys(ARTICLE_READING_PATHS).sort()).toEqual(published.map(a => path(a.slug)).sort());
  for (const article of published) {
    const route = path(article.slug);
    const configured = BASE_ARTICLE_SEO_CONFIG[route];
    expect(configured.readingPaths).toBe(ARTICLE_READING_PATHS[route]);
    expect(configured.internalLinks).toEqual(configured.readingPaths!.map(item => item.href));
    const resolved = resolveArticleReadingPaths(route, configured.readingPaths);
    expect(resolved.map(item => item.href), route).toEqual(configured.internalLinks!);
    expect(new Set(resolved.map(item => item.href)).size).toBe(resolved.length);
    for (const item of resolved) {
      expect(item.href).not.toBe(route);
      expect(item.reason.trim()).toBe(item.reason);
      expect(item.reason).not.toBe('Read more');
      expect(item.article.title).toBeTruthy();
    }
  }
});

test('beginner reading choices retain a community learning offer', () => {
  for (const slug of ['what-is-artificial-intelligence-in-simple-words', 'what-is-artificial-intelligence-used-for-in-everyday-work-and-life']) {
    const current = BASE_ARTICLE_SEO_CONFIG['/articles/featured/' + slug].conversion!;
    expect(current.primary).toBe('events');
    expect(current.primaryIcp).toBe('COMMUNITY');
    expect(current.secondary).toBeUndefined();
  }
});

test('conditional founder-contract and city choices are explicit, not inferred for every reader', () => {
  const builder = ARTICLE_READING_PATHS['/articles/featured/how-to-start-a-startup-as-an-ai-builder'];
  expect(builder[0].href).toBe('/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence');
  const contractor = builder.find(item => item.href.endsWith('/starting-a-company-around-an-ai-idea-from-prototype-to-customers'))!;
  expect(contractor.reason).toContain('Already delivering with AI coding tools and considering client work alongside your startup?');
  const national = ARTICLE_READING_PATHS['/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia'];
  expect(national.some(item => item.reason.startsWith('If Sydney is your location'))).toBe(true);
  expect(national.some(item => item.reason.startsWith('If Melbourne is your location'))).toBe(true);
  const customer = ARTICLE_READING_PATHS['/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026'];
  expect(customer.find(item => item.href.endsWith('/a-practical-guide-for-australian-founders-building-an-ai-startup'))?.reason).toContain('different questions');
});

test('invalid, ambiguous, private, self and withheld destinations are not replaced with other articles', () => {
  const notice = Object.values(ARTICLE_REGISTRY).find(a => a.publicationStatus === 'under-review')!;
  const bad = [
    'https://other.example/articles/' + first.slug, '//other.example/articles/' + first.slug,
    '/articles/' + entry.href.split('/').at(-1), entry.href + '?notes=PRIVATE', entry.href + '#not-verified',
    entry.href + '/', '/articles/featured/not-published', currentPath, path(notice.slug), '/mlai-studio#apply',
    '/articles/featured/%2e%2e/events', '/articles/featured/how-to-get-a-job-at-an-ai-startup-australia',
  ];
  for (const href of bad) expect(resolveArticleReadingPaths(currentPath, [{ href, reason: 'Example' }]), href).toEqual([]);
  expect(resolveArticleReadingPaths(currentPath, [{ ...entry, reason: '   ' }])).toEqual([]);
  expect(resolveArticleReadingPaths('/articles/unknown', [entry])).toEqual([]);
  for (const source of [currentPath.slice('/articles/'.length), currentPath + '/', currentPath + '?notes=PRIVATE', currentPath + '#reading', 'https://mlai.au' + currentPath]) {
    expect(resolveArticleReadingPaths(source, [entry]), source).toEqual([]);
  }
  expect(resolveArticleReadingPaths(path(notice.slug), [entry])).toEqual([]);
  expect(resolveArticleReadingPaths(currentPath)).toEqual([]);
  expect(resolveArticleReadingPaths(currentPath, [null, {}, { href: 3, reason: 'Example' }] as any)).toEqual([]);
  expect(resolveArticleReadingPaths(currentPath, null as any)).toEqual([]);
  expect(resolveArticleReadingPaths(currentPath, [entry, entry])).toHaveLength(1);
});

test('an under-review target remains withheld even if its noindex flag is accidentally absent', () => {
  const target = ARTICLE_REGISTRY[entry.href.slice('/articles/'.length)];
  const original = target.publicationStatus;
  try {
    target.publicationStatus = 'under-review';
    expect(resolveArticleReadingPaths(currentPath, [entry])).toEqual([]);
  } finally { target.publicationStatus = original; }
});

test('related choices are real named links with task descriptions, not hidden slides', () => {
  const items = resolveArticleReadingPaths(currentPath, ARTICLE_READING_PATHS[currentPath]);
  const html = markup(<RelatedArticlesCarousel items={items} />);
  expect(hrefs(html)).toEqual(items.map(item => item.href));
  expect(html).toContain('<nav aria-labelledby=');
  expect(html).toContain('aria-describedby=');
  expect(html).toContain('<ul role="list"');
  expect(html).not.toContain('<button');
  expect(html).not.toContain('aria-hidden="true"><a');
  for (const item of items) {
    expect(html).toContain(text(item.article.title));
    expect(html).toContain(text(item.reason));
  }
  expect(markup(<RelatedArticlesCarousel items={[]} />)).toBe('');
});

test('a held article and an uncurated future article do not inherit chronological navigation', () => {
  for (const article of [{ ...first, publicationStatus: 'under-review' as const }, { ...first, slug: 'featured/future-reader-task' }]) {
    const html = markup(<ArticleLayout article={article}><p>Available text</p></ArticleLayout>);
    expect(html).not.toContain('data-cf-component-id="next-article"');
    expect(html).not.toContain('data-cf-component-id="related-articles"');
  }
});

test('withheld correction notices do not display acquisition offers', () => {
  const notices = Object.values(ARTICLE_REGISTRY).filter(article => article.publicationStatus === 'under-review');
  expect(notices).toHaveLength(4);
  for (const article of notices) {
    const html = markup(<ArticleLayout article={article}><p>Correction notice</p></ArticleLayout>);
    expect(html, article.slug).not.toContain('data-article-conversion=');
    expect(html, article.slug).not.toContain('data-cf-component-id="events-cta"');
    expect(html, article.slug).toContain('Correction notice');
  }
});

test('all 58 current modules in their shared layout render every configured path once, in order, with the current title and reason', async () => {
  for (const article of published) {
    const { default: Article } = await import('../app/articles/content/' + article.slug + '.tsx');
    // articles.slug owns this wrapper; a content-only export omits navigation.
    const html = markup(<ArticleLayout article={article}><Article /></ArticleLayout>);
    const next = html.match(/<nav\b[^>]*data-cf-component-id="next-article"[^>]*>[\s\S]*?<\/nav>/g) ?? [];
    const related = html.match(/<nav\b[^>]*data-cf-component-id="related-articles"[^>]*>[\s\S]*?<\/nav>/g) ?? [];
    const paths = resolveArticleReadingPaths(path(article.slug), ARTICLE_READING_PATHS[path(article.slug)]);
    expect(next.length, article.slug).toBe(paths.length ? 1 : 0);
    expect(related.length, article.slug).toBe(paths.length > 1 ? 1 : 0);
    const navigation = [...next, ...related].join('');
    expect(hrefs(navigation), article.slug).toEqual(paths.map(item => item.href));
    for (const item of paths) {
      expect(navigation, article.slug).toContain(text(item.article.title));
      expect(navigation, article.slug).toContain(text(item.reason));
    }
  }
});
