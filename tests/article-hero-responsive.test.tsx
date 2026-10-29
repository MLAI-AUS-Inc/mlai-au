import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleHeroHeader } from '../app/components/articles/ArticleHeroHeader';

test('article headlines allow long words to wrap, including highlighted words', () => {
  const title = 'Technology in higher education: AI assessment rules and microcredential credit';
  for (const titleHighlight of [undefined, 'higher education', 'microcredential']) {
    const html = renderToStaticMarkup(<ArticleHeroHeader title={title} titleHighlight={titleHighlight} />);
    expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
    expect(html).toMatch(/<h1 class="[^"]*\bbreak-words\b/);
    expect(html).not.toContain('whitespace-nowrap');
    expect(html.replace(/<[^>]+>/g, '')).toContain(title);
  }
});

test('hero accents and summaries use the article background colour palette', () => {
  const summary = { heading: 'Decision', intro: 'Check the evidence.', items: [{ label: 'Question', description: 'One useful answer.' }] };
  for (const [headerBgColor, titleColour, accentColour] of [
    ['cyan', 'text-black', 'text-black underline decoration-current decoration-2 underline-offset-4'],
    ['purple', 'text-white', 'text-[#fefc22]'],
    ['blue', 'text-white', 'text-[#fefc22]'],
    ['orange', 'text-white', 'text-white underline decoration-current decoration-2 underline-offset-4'],
  ] as const) {
    const html = renderToStaticMarkup(<ArticleHeroHeader title="Check this decision" titleHighlight="decision" headerBgColor={headerBgColor} summary={summary} />);
    expect(html.match(/<h1 class="([^"]*)"/)?.[1]).toContain(titleColour);
    expect(html).toContain(`<span class="${accentColour}">decision</span>`);
    expect(html).toContain('bg-[#ff3d00] rounded-2xl p-6 sm:p-8 text-white');
    expect(html).not.toContain('text-[#ff3d00]');
  }
});

test('summary-only and image-only headers do not reserve an empty desktop column', () => {
  const summary = { heading: 'Decision', intro: 'Check the evidence.', items: [] };
  for (const props of [{ summary }, { heroImage: '/press-kit/logo-wide-black.png' }]) {
    const html = renderToStaticMarkup(<ArticleHeroHeader title="Handover" {...props} />);
    expect(html).toMatch(/grid grid-cols-1\s+gap-4 mt-4/);
    expect(html).not.toContain('lg:grid-cols-2');
  }
  expect(renderToStaticMarkup(<ArticleHeroHeader title="Handover" summary={summary} heroImage="/press-kit/logo-wide-black.png" />)).toContain('lg:grid-cols-2');
});
