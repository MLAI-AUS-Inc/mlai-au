import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/how-to-pitch-your-idea';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import { readFileSync } from 'node:fs';
import { PITCH_FIELDS, PITCH_STEPS, PITCH_RUBRIC, PITCH_DECK_EXAMPLE, PITCH_PROVENANCE, PITCH_REVIEW_STATUS, PITCH_BEFORE, PITCH_DRAFT, PITCH_REVISION } from '../app/lib/idea-pitch-rehearsal';
const slug = 'featured/how-to-pitch-your-idea';
const render = (query = '') => renderToStaticMarkup(<MemoryRouter initialEntries={['/articles/' + slug + query]}><Article /></MemoryRouter>);
test('retains the actual pitch sources and supplies a usable completed rehearsal', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const text of ['a96f41d2326743bc8067d06d503dd9db', '8yJnf-ISi9E', '2PACX-1vQWU1kTTTBvLqg8j6YdC_gRCGbx9le6NzHR5lLzpo2zXArzPYDGpD0xDLL2vlmLcdl8yxu-Q1sBcMbi', '/downloads/idea-pitch-rehearsal.txt', 'Completed ten-field conversation record', 'Retest not run', 'Preferred MLAI event format']) expect(html).toContain(text);
});

test('public access does not become verified claims, full transcript access or reuse permission', () => {
 const html = render();
 for (const text of ['text was visible through 1:52, followed by a signup prompt', 'these notes cover the opening only', 'not full transcripts', 'editable-copy access and reuse rights were not verified', 'Speaker/audio verification', 'full accessible transcript provision and media reuse review remain pending', 'not a claim that either presenter made these revisions', 'not current carbon-credit or financial guidance', 'Automatically generated names and technical terms need correction']) expect(html).toContain(text);
 for (const seconds of [139, 164, 220]) expect(html).toContain(`href="https://www.youtube.com/watch?v=8yJnf-ISi9E&amp;t=${seconds}s"`);
 expect(html).not.toContain('VideoObject');
 expect(html).not.toContain('Download the editable Google deck');
});

test('download supplies every blank field and exact completed scenario, not a token checklist', () => {
 const html = render(), asset = readFileSync('public/downloads/idea-pitch-rehearsal.txt', 'utf8');
 expect(PITCH_FIELDS).toHaveLength(10);
 expect(PITCH_STEPS).toHaveLength(3);
 expect(PITCH_RUBRIC).toHaveLength(4);
 expect(PITCH_DECK_EXAMPLE).toHaveLength(7);
 expect(html.match(/data-pitch-field=/g)).toHaveLength(10);
 expect(html.match(/data-pitch-step=/g)).toHaveLength(3);
 expect(html.match(/data-pitch-slide=/g)).toHaveLength(7);
 const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/'/g, '&#x27;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
 for (const rows of [PITCH_FIELDS, PITCH_STEPS, PITCH_RUBRIC, PITCH_DECK_EXAMPLE]) for (const row of rows) for (const value of Object.values(row)) { expect(asset).toContain(value); expect(html).toContain(escape(value)); }
 for (const value of [PITCH_PROVENANCE, PITCH_REVIEW_STATUS, PITCH_BEFORE, PITCH_DRAFT, PITCH_REVISION]) { expect(asset).toContain(value); expect(html).toContain(escape(value)); }
 expect(asset).toContain('BLANK TEN-FIELD RECORD');
 expect(asset).toContain('COMPLETED TEN-FIELD RECORD');
 for (const field of PITCH_FIELDS) expect(asset.split(field.label + ':')).toHaveLength(3);
 expect(html).toContain('download="idea-pitch-rehearsal.txt"');
});

test('the retelling changes the sending boundary without inventing a successful retest', () => {
 expect(PITCH_STEPS[0].material).toContain('do not record me or contact me afterwards');
 expect(PITCH_STEPS[1].material).toContain('answers attendees automatically');
 expect(PITCH_STEPS[1].material).toContain('I have not organised an event');
 expect(PITCH_STEPS[2].material).toBe(PITCH_REVISION);
 expect(PITCH_REVISION).toContain('would not send messages or update the event page');
 expect(PITCH_STEPS[2].boundary).toContain('Retest not run');
 expect(PITCH_STEPS[2].boundary).toContain('Do not send another version to this peer');
 expect(PITCH_FIELDS[8].value).toContain('no measured clarity improvement');
 expect(PITCH_DECK_EXAMPLE[5].example).toContain('No customers, traction graph or measured improvement');
});

test('community CTA fits a revised question and carries only an applied format', () => {
 const config = BASE_ARTICLE_SEO_CONFIG['/articles/' + slug].conversion!;
 expect(config.primary).toBe('events'); expect(config.primaryIcp).toBe('COMMUNITY');
 expect(config.version).toBe('idea-conversation-v3'); expect(config.eventCalendarOnly).toBe(true);
 expect(config.copy!.body).toContain('does not include a pitch slot');
 for (const value of ['online', 'melbourne']) {
  const html = render('?event_format=' + value + '&notes=PRIVATE_SENTINEL');
  expect(html).toContain(`href="/events?event_format=${value}"`); expect(html).not.toContain('PRIVATE_SENTINEL');
 }
 for (const value of ['all', 'unexpected']) expect(render('?event_format=' + value)).toContain('href="/events"');
 const html = render();
 expect(html).toContain('This does not reserve a pitch slot, send your notes or book a review');
 expect(html).toContain(`action="/articles/${slug}" method="get"`);
 expect(html).not.toContain('href="/mlai-studio#apply"');
});

test('reader-owned navigation and native details work alongside the h2 contents', () => {
 const html = render();
 expect(html).toContain('data-cf-article-body'); expect(html).toContain('data-article-toc-placeholder');
 expect(html).toContain('role="region" aria-label="Pitch wording comparison" tabindex="0"');
 expect(html).toContain('aria-label="Pitch record sections"');
 for (const id of ['permission', 'script', 'real-examples', 'example', 'questions', 'practice', 'record', 'deck', 'event', 'scope']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
 for (const id of ['completed-record', 'deck', 'event']) expect(html).toContain(`href="#${id}"`);
 expect(html.match(/<details/g)).toHaveLength(2);
 expect(html).not.toContain('<article');
});
test('idea pitch is a distinct consent-based community learning task', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['featured/how-to-pitch-your-idea'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 expect(html).toContain('Idea pitch conversation record');
 expect(html).toContain('Fictional teaching example');
 expect(html).toContain('not a real MLAI project');
 expect(html).toContain('Do not copy the example as your personal experience');
 expect(html).toContain('Ask before recording');
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).toContain('Explore upcoming MLAI events');
 expect(html).toContain('/articles/featured/the-best-startup-pitch-deck-ever');
 expect(html).toContain('https://www.stylemanual.gov.au/');
 expect(html).not.toContain('<iframe');
 for (const old of ['patient recovery rates by 40%', 'serial-position effect', 'P-A-S', 'ensuring timely patient care']) expect(html).not.toContain(old);
});
