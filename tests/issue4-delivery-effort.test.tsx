import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION, TITLE } from '../app/articles/content/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
test('coding productivity issue preserves study boundaries and builder conversion', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.title).toBe(TITLE);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 expect(entry.authors).toHaveLength(4);
 for (const text of ['2507.09089v2', '2510.10165v3', '246 tasks', '19% longer completion time', 'same completion-time measure', 'selected measurement sections', 'AI-assisted delivery effort record', 'not recorded', 'Fictional teaching example']) expect(html).toContain(text);
 expect(html).toContain('data-article-icp="BUILDER"');
 expect(html).toContain('href="/mlai-studio#apply"');
 expect(html).toContain('Apply with your build evidence');
 expect(html).not.toContain('Three questions people are hammering into search');
 expect(html).not.toContain('papers you should pretend you read');
 expect((80 - 45) / 80).toBe(0.4375);
 expect(45 + 35 + 25).toBe(105);
 expect((105 - 100) / 100).toBe(0.05);
 expect(html).toContain('does not imply a 5% longer calendar duration');
});

test('source measurements remain distinct from elapsed duration and person-effort', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const text of ['self-reported implementation work', 'post-review times imputed', 'forecast task difficulty', '95% confidence intervals', '19% fewer commits and 6.5% more PR reviews', 'difference-in-differences', 'individual Copilot usage is not observed', 'not been independently reproduced']) expect(html.includes(text), text).toBe(true);
 expect(html).not.toContain('reviewed 6.5% more code');
});

test('delivery issue supplies a complete fictional log and a separate real execution path', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const text of ['filled fictional delivery record', 'blank delivery record', 'criterion C remains untested', '24 passing code tests', 'No author/reviewer effort measurement', 'known subtotal becomes 70', 'independent recipient approval', 'data-cf-article-body', 'data-article-toc-placeholder']) expect(html.includes(text), text).toBe(true);
 for (const name of ['Delivery measurement definitions', 'Fictional delivery effort comparison']) expect(html).toContain('role="region" aria-label="' + name + '" tabindex="0"');
 for (const id of ['studies', 'question', 'example', 'record', 'practice', 'handover', 'scope']) expect(html).toContain('id="' + id + '" class="scroll-mt-28"');
 for (const url of ['/downloads/delivery-effort-example.txt', '/downloads/delivery-effort-template.txt', '/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8']) expect(html).toContain('href="' + url + '"');
 expect(html.indexOf('Make security review proportional')).toBeLessThan(html.indexOf('Apply with your build evidence'));
 expect(BASE_ARTICLE_SEO_CONFIG['/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4'].conversion?.version).toBe('delivery-effort-v3');
});
