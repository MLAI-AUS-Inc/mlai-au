import { expect, test } from '@playwright/test';
import { getArticlesSortedNewestFirst, resolveArticleRouteSlug } from '../app/articles/registry';

test.beforeEach(async ({ page }) => {
  if (process.env.CI) {
    await page.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4198'
      ? route.continue() : route.abort());
  }
});

for (const path of ['/articles', '/articles?page=2', '/roo', '/vibe-raising']) {
  test(`${path} delivers exactly one canonical`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://mlai.au${path}`);
    expect(await page.locator('meta[name="robots"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('content')).join(','))).not.toContain('noindex');
  });
}

test('page two contains its own articles and crawlable previous and next links', async ({ page }) => {
  await page.goto('/articles?page=2', { waitUntil: 'domcontentloaded' });
  const articles = getArticlesSortedNewestFirst().slice(10, 20);
  const list = page.locator('[data-cf-slot="article-list"]');
  const hrefs = await list.locator('[data-cf-slot="article-link"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  expect(hrefs).toEqual(articles.map(article => `/articles/${resolveArticleRouteSlug(article.slug)}`));
  const pagination = page.getByRole('navigation', { name: 'Pagination' });
  await expect(pagination.getByRole('link', { name: 'Previous' })).toHaveAttribute('href', '/articles#all-articles');
  await expect(pagination.getByRole('link', { name: 'Previous' })).toBeVisible();
  await expect(pagination.getByRole('link', { name: 'Next', exact: true })).toHaveAttribute('href', '/articles?page=3#all-articles');
  await expect(pagination.getByRole('link', { name: 'Next', exact: true })).toBeVisible();
});

test('login retains its single noindex directive', async ({ page }) => {
  await page.goto('/platform/login', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('invalid pagination returns a real HTTP 404 and aliases redirect permanently', async ({ request }) => {
  for (const path of ['/articles?page=999', '/articles?page=2garbage', '/articles?page=0']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  for (const [path, destination] of [
    ['/articles?page=1', '/articles'],
    ['/articles/?page=02', '/articles?page=2'],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(301);
    expect(response.headers().location, path).toBe(destination);
  }
});

test('the malformed hackathon link reported by Google reaches the real page', async ({ request }) => {
  const redirect = await request.get('/hackathons):', { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(new URL(redirect.headers().location).pathname).toBe('/hackathons');
  const destination = await request.get('/hackathons');
  expect(destination.status()).toBe(200);
});
