import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import UpcomingEventsCTA from '../app/components/articles/UpcomingEventsCTA';
import ArticleConversionCTA from '../app/components/articles/ArticleConversionCTA';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import { eventFixture } from './fixtures/events';

test('every configured event CTA allows wrapped labels with and without event cards', () => {
  const event = eventFixture({ _id: 'responsive-fixture', name: 'Fixture event, not a live offer' });
  const configurations = Object.values(BASE_ARTICLE_SEO_CONFIG)
    .filter(config => config.conversion?.primary === 'events');
  expect(configurations.length).toBeGreaterThan(0);
  for (const config of configurations) {
    for (const events of [[], [event]]) {
      const html = renderToStaticMarkup(<MemoryRouter><UpcomingEventsCTA events={events} copy={config.conversion!.copy} /></MemoryRouter>);
      expect(html).toContain('href="/events"');
      expect(html).toContain('inline-flex max-w-full');
      expect(html).toContain('whitespace-normal');
      expect(html).not.toContain('whitespace-nowrap');
      expect(html).toContain('<span class="min-w-0 break-words">');
      expect(html).toContain('<span aria-hidden="true" class="shrink-0">→</span>');
      expect(html).toContain('class="not-prose relative');
      expect(html).toContain('font-semibold text-white shadow-lg');
      expect(html).toContain('focus-visible:outline-white');
    }
  }
});

test('every configured conversion card isolates its text from surrounding article typography', () => {
  for (const config of Object.values(BASE_ARTICLE_SEO_CONFIG)) {
    const conversion = config.conversion;
    if (!conversion || conversion.primary === 'none' || conversion.primaryIcp === 'OUTSIDE') continue;
    const html = renderToStaticMarkup(<MemoryRouter><ArticleConversionCTA articleSlug="fixture" config={conversion} events={[]} /></MemoryRouter>);
    const openingTag = html.match(/^<(?:div|section)\b[^>]*>/)?.[0];
    expect(openingTag).toBeDefined();
    expect(openingTag).toContain('class="not-prose ');
    if (conversion.primary === 'studio-project') {
      expect(openingTag).toContain('bg-[#ff3d00] text-white');
      expect(html).not.toContain('opacity-70');
    }
  }
});

test('event card colours remain legible on all three brand backgrounds', () => {
  const events = ['orange', 'purple', 'yellow'].map((colour, index) => eventFixture({
    _id: colour, name: `Fixture ${colour}`, startDate: `2026-09-${15 + index}T07:30:00Z`,
  }));
  const html = renderToStaticMarkup(<MemoryRouter><UpcomingEventsCTA events={events} /></MemoryRouter>);
  expect(html).toContain('transition-colors text-white">Fixture orange</h4>');
  expect(html).toContain('text-sm mt-auto text-white/85');
  expect(html).toContain('transition-colors text-white">Fixture purple</h4>');
  expect(html).toContain('transition-colors text-black">Fixture yellow</h4>');
});

test('non-event CTA heading anchors reserve space for fixed mobile navigation', () => {
  const configurations = Object.values(BASE_ARTICLE_SEO_CONFIG).flatMap(config => config.conversion ? [config.conversion] : [])
    .filter(config => config.primary !== 'events' && config.primary !== 'none' && config.primaryIcp !== 'OUTSIDE');
  expect(configurations.length).toBeGreaterThan(0);
  for (const config of configurations) {
    const html = renderToStaticMarkup(<MemoryRouter><ArticleConversionCTA articleSlug="fixture" config={config} events={[]} /></MemoryRouter>);
    expect(html.match(/<h2\b[^>]*>/)?.[0]).toContain('scroll-mt-28');
  }
});
