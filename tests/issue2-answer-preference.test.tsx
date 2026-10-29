import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
test('model preference issue teaches separate correctness and style checks', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 expect(entry.authors).toHaveLength(4);
 for (const text of ['2508.21628v1', '32 participants', 'underlying data were not independently analysed', '32 university students', 'four people per personality/model cell', 'one assigned model', 'interface hiding the model name', 'Fictional exercise', 'Registration is required', 'Contradicts the source', 'Adds an unsupported promise', 'Answer comparison record', 'not an MLAI listing', 'No personality questionnaire is needed']) expect(html).toContain(text);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).toContain('Find an AI learning event');
 expect(html).not.toContain('Three questions people are hammering');
 expect(html).not.toContain('paper you should pretend');
 expect(html).not.toContain('human-grade, emotionally nuanced audio');
});


test('answer comparison download keeps the source, corrected answer and editable record together', async () => {
 const sheet = await Bun.file('public/downloads/ai-answer-comparison.txt').text();
 for (const text of ['Registration required', 'Recording availability has not been confirmed', 'Task and permitted source:', 'all event details invented', 'One task does not identify the best model']) expect(sheet).toContain(text);
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('href="/downloads/ai-answer-comparison.txt" download=""');
});
