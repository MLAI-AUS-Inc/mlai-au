import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import * as Clubs from '../app/articles/content/featured/why-founders-clubs-work-for-early-stage-growth';
import * as Feedback from '../app/articles/content/featured/why-australian-startups-need-stronger-ai-communities';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';

function render(module: typeof Clubs | typeof Feedback) {
 const Article = module.default;
 return renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
}

test('community learning revisions preserve dates, truthful attribution and task-specific event offers', () => {
 for (const module of [Clubs, Feedback]) {
  const html = render(module);
  const slug = module.CATEGORY + '/' + module.SLUG;
  const entry = ARTICLE_REGISTRY[slug];
  const conversion = BASE_ARTICLE_SEO_CONFIG['/articles/' + slug].conversion!;
  expect(entry.date).toBe(module.DATE_PUBLISHED);
  expect(entry.dateModified).toBe(module.DATE_MODIFIED);
  expect(entry.description).toBe(module.DESCRIPTION);
  expect(html).toContain(entry.author!);
  expect(conversion.primaryIcp).toBe('COMMUNITY');
  expect(conversion.primary).toBe('events');
  expect(html).toContain(conversion.copy!.button);
  expect(html).toContain('data-article-icp="COMMUNITY"');
  expect(html).toContain('href="/events"');
  expect(html).not.toContain('source set');
  expect(html).not.toContain('human-edited');
 }
});

test('club decision makes provider scope and total commitment explicit without claiming growth', () => {
 const html = render(Clubs);
 for (const text of ['Founders club participation review', 'Illustrative example, AUD',
  '340 minutes: 5 hours 40 minutes', 'not a return-on-investment calculation',
  'not an independent review', 'https://cohortspace.com.au/gold-coast-startup-programs/',
  'renewal and cancellation', 'affiliated invitation', 'What I actually learned or experienced:']) {
  expect(html).toContain(text);
 }
 expect(html).not.toContain('create value faster than loose networking');
 expect(html).not.toContain('For founders clubs are built');
 expect(80 + 2 * 25).toBe(130);
 expect(2 * (90 + 60 + 20)).toBe(340);
});

test('feedback guide delivers a bounded experiment and removes unrelated search and funding filler', () => {
 const html = render(Feedback);
 for (const text of ['Community feedback-to-test record', 'Fictional teaching example',
  'missing service', 'absent pricing', 'discount request',
  'What the comment does not establish:', 'Aaron Elbourne',
  'https://www.csiro.au/en/work-with-us/funding-programs/innovation-programs/on-prime',
  'not a paid order', 'on-page record replaces', 'Content Team']) {
  expect(html).toContain(text);
 }
 for (const text of ['top 10 startups', '$100K', '$91 million', 'Fourth, write down', 'Download the PDF', 'Dr Sam Donegan']) {
  expect(html).not.toContain(text);
 }
 const source = readFileSync('app/articles/content/featured/' + Feedback.SLUG + '.tsx', 'utf8');
 expect(source).toContain("if (!new URLSearchParams(window.location.search).has('cfInspector'))");
 expect(source).toContain("window.__cfArticleInspectorInstalled=true;try{window.parent.postMessage({source:'content-factory-inspector',protocolVersion:3,type:'ready',mode:'comment'},'*')}catch(e){}");
});
