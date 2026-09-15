import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { ARTICLE_REGISTRY } from '../app/articles/registry';

test.beforeEach(async ({ page }) => {
  // CI verifies our build deterministically. Remote assets and destinations
  // receive a dated release review rather than making every commit depend on
  // third-party availability. Local runs retain the actual external assets.
  if (process.env.CI) {
    await page.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4198'
      ? route.continue() : route.abort());
  }
});

// This verifies delivery and controls, not factual accuracy or reader acceptance.
for (const article of Object.values(ARTICLE_REGISTRY)) {
  test(article.slug, async ({ page }, testInfo) => {
    const failures: string[] = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && /hydration|hydrating|Minified React error|server rendered HTML/i.test(message.text())) failures.push(message.text());
    });
    const response = await page.goto(`/articles/${article.slug}`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    expect(response?.headers()['x-mlai-document-render']).toBe('complete');
    expect(response?.headers()['x-mlai-revision']).toMatch(/^(local|[a-f0-9]{40})$/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://mlai.au/articles/${article.slug}`);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots?.includes('noindex')).toBe(article.indexing === 'noindex');
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .flatMap(text => { const value = JSON.parse(text); return value['@graph'] ?? [value]; });
    const articleSchemas = schemas.filter(value => ['Article', 'BlogPosting'].includes(value['@type']));
    expect(articleSchemas).toHaveLength(1);
    expect(articleSchemas[0].headline).toBe(article.title);
    expect(articleSchemas[0].datePublished).toBe(article.date);
    expect(articleSchemas[0].dateModified).toBe(article.dateModified ?? article.lastUpdated ?? article.date);
    expect(schemas.filter(value => value['@type'] === 'FAQPage').length).toBeLessThanOrEqual(1);

    if (article.publicationStatus === 'under-review') {
      await expect(page.locator('#editorial-review-heading')).toBeVisible();
      await expect(page.locator('[data-cf-article-body] > section[aria-labelledby="editorial-review-heading"]')).toHaveCount(1);
      await expect(page.locator('[data-article-content] [data-cf-component-type="references"]')).toHaveCount(0);
      expect(await page.locator('script[type="application/ld+json"]').allTextContents()).not.toEqual(expect.arrayContaining([expect.stringContaining('"FAQPage"')]));
    } else {
      const body = page.locator('[data-article-content]');
      await expect(body).toBeVisible();
      await expect(body.locator('p').first()).toBeVisible();
      const text = await body.innerText();
      expect(text).not.toMatch(/Brief, factual overview referencing|while still tying each conclusion back|Authoritative reference supporting|Download the checklist mentioned above/i);
      await expect(body.locator('a[href="/articles"], a[href="#"]').filter({ hasText: /download/i })).toHaveCount(0);

      // Keep the original DOM handle: resolving a fresh locator after a click
      // can conceal the detached-control hydration regression.
      const summary = body.locator('details > summary').first();
      if (await summary.count()) {
        const handle = await summary.elementHandle();
        await summary.focus();
        await page.keyboard.press('Enter');
        await expect(summary.locator('..')).toHaveAttribute('open', '');
        expect(await handle!.evaluate(node => node.isConnected)).toBe(true);
        await page.keyboard.press('Space');
        await expect(summary.locator('..')).not.toHaveAttribute('open', '');
        expect(await handle!.evaluate(node => node.isConnected)).toBe(true);
      }

      // Validate the actual served local download bytes, not just an href.
      for (const href of [...new Set(await body.locator('a[href^="/downloads/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')!)))]) {
        const download = await page.request.get(href);
        expect(download.status(), href).toBe(200);
        expect(await download.body(), href).toEqual(readFileSync(`public${href}`));
      }
    }
    await page.waitForLoadState('load');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'document must fit the viewport').toBe(true);
    expect(failures, `${testInfo.project.name}: browser errors`).toEqual([]);
  });
}

test('a delayed lazy article hydrates without replacing its disclosure', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'without-javascript', 'The corpus above separately verifies no-script access.');
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  const slug = 'what-is-an-agent-in-artificial-intelligence';
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route(`**/assets/${slug}-*.js`, async route => {
    await gate;
    await route.continue();
  });
  await page.goto(`/articles/featured/${slug}`, { waitUntil: 'domcontentloaded' });
  const summary = page.locator('[data-article-content] details > summary').first();
  await expect(summary).toBeVisible();
  const original = await summary.elementHandle();
  await summary.focus();
  await page.keyboard.press('Enter');
  release();
  await page.waitForLoadState('load');
  await expect(summary.locator('..')).toHaveAttribute('open', '');
  expect(await original!.evaluate(node => node.isConnected)).toBe(true);
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(summary.locator('..')).not.toHaveAttribute('open', '');
  expect(errors).toEqual([]);
});

test('article-to-article navigation keeps a usable body and correct identity', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'without-javascript', 'Direct no-script routes are covered by the corpus.');
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/articles/featured/what-is-an-agent-in-artificial-intelligence');
  await page.evaluate(() => { (window as any).__articleNavigationProbe = true; });
  const next = page.locator('article a').filter({ hasText: 'Next up' }).first();
  const href = await next.getAttribute('href');
  expect(href).toMatch(/^\/articles\//);
  await next.click();
  await page.waitForURL(`**${href}`);
  expect(await page.evaluate(() => (window as any).__articleNavigationProbe)).toBe(true);
  await expect(page.locator('[data-cf-article-body] p').first()).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://mlai.au${href}`);
  const summary = page.locator('[data-cf-article-body] details > summary').first();
  if (await summary.count()) {
    const original = await summary.elementHandle();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(summary.locator('..')).toHaveAttribute('open', '');
    expect(await original!.evaluate(node => node.isConnected)).toBe(true);
  }
  expect(errors).toEqual([]);
});
