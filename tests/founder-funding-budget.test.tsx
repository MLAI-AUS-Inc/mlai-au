import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { readFileSync } from 'node:fs';
import Article from '../app/articles/content/featured/startup-company-investment-for-ai-founders';

test('funding guide separates historical heuristics from a conditional milestone budget', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('January 2016');
 expect(html).toContain('Fictional teaching scenario');
 expect(html).toContain('not a recommended raise');
 expect(html).toContain('No revenue or new investment is assumed');
 expect(html).toContain('https://business.gov.au/finance/funding/pitch-for-venture-capital');
 expect(html).not.toContain('A practical planning range is about 12 to 18 months');
 expect(html).not.toContain('What is a good startup company to invest in?');
 expect(3 * 12000 + 6000 - 30000).toBe(12000);
 expect(5 * 12000 + 6000 - 30000).toBe(36000);
 expect((5 - 3) * 12000).toBe(24000);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('twelve discovery interviews');
 expect(html).toContain('We have not demonstrated paid adoption');
 expect(html).toContain('Sources and their scope');
 for (const removed of ['investors are increasingly selective', 'investors are becoming more selective', 'pedalstart.com', 'angelinvestorsnetwork.com', 'sprintlaw.com.au']) expect(html).not.toContain(removed);
 expect(html).toContain('/downloads/founder-funding-preparation.md');
 expect(html).not.toContain('checklist-701741c5.pdf');
 const worksheet = readFileSync('public/downloads/founder-funding-preparation.md', 'utf8');
 for (const text of ['Do not assume a universal runway duration', 'Uncertain receipts', '$42,000', '$66,000', 'not a recommended raise', 'permission to share']) expect(worksheet).toContain(text);
});
