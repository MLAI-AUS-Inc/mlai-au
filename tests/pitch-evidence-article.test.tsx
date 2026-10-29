import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/the-best-startup-pitch-deck-ever';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import { readFileSync } from 'node:fs';
import { DECK_PROVENANCE, DECK_REVIEW_STATUS, DECK_PILOT_ROWS, DECK_SETUP_MINUTES, DECK_CORRECTIONS, DECK_CLAIMS, DECK_FIELDS, DECK_READ_THROUGH, summariseDeckPilot, deckEvidenceWorksheetText } from '../app/lib/pitch-deck-evidence';
const slug = 'featured/the-best-startup-pitch-deck-ever';
const render = (query = '') => renderToStaticMarkup(<MemoryRouter initialEntries={['/articles/' + slug + query]}><Article /></MemoryRouter>);
test('deck review supplies its underlying records and a real completed claim worksheet', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 for (const text of ['data-deck-pilot-row', 'data-deck-claim-field', '/downloads/pitch-deck-evidence-review.txt', 'Retest not run', 'Preferred MLAI event format', 'buffer.com/resources/the-slide-deck-we-used-to-raise-half-a-million-dollars/', 'reidhoffman.org/linkedin-pitch-to-greylock/']) expect(html).toContain(text);
});

test('pitch deck review has a bounded evidence task and matching community offer', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 const entry = ARTICLE_REGISTRY['featured/the-best-startup-pitch-deck-ever'];
 expect(entry.date).toBe(DATE_PUBLISHED);
 expect(entry.dateModified).toBe(DATE_MODIFIED);
 expect(entry.description).toBe(DESCRIPTION);
 expect(html).toContain('Pitch slide evidence record');
 expect(html).toContain('Entirely fictional teaching example');
 expect(html).toContain('not an MLAI client result');
 expect(html).toContain('https://sequoiacap.com/article/writing-a-business-plan');
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('href="/events"');
 expect(html).toContain('Find a founder learning event');
 expect(html).not.toContain('href="/contact"');
 for (const residue of ['Investor‑validated', 'Download the checklist mentioned above', '10–12 slides', '12–15 slides', 'pattern that wins in 2026']) expect(html).not.toContain(residue);
});

test('fictional pitch example includes correction and setup time rather than claiming review-only savings', () => {
 const total = summariseDeckPilot(DECK_PILOT_ROWS, DECK_SETUP_MINUTES);
 expect(total).toEqual({count:20,baseline:200,review:120,setup:50,corrections:20,assisted:190,difference:10,differencePercent:5,correctedRows:4});
 expect(summariseDeckPilot(DECK_PILOT_ROWS,60).difference).toBe(0);
 expect(summariseDeckPilot(DECK_PILOT_ROWS,80).differencePercent).toBe(-10);
 expect(summariseDeckPilot(DECK_PILOT_ROWS.slice(0,5),50).differencePercent).toBe(-70);
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('5% task-time difference');
 expect(html).toContain('excludes software charges');
 expect(html).toContain('does not establish cash savings or causation');
 expect(html).toContain('4 scripted corrections');
});

test('unknown, duplicate, contradictory and non-finite records fail rather than becoming savings', () => {
 expect(() => summariseDeckPilot([],50)).toThrow();
 for (const setup of [-1,NaN,Infinity]) expect(() => summariseDeckPilot(DECK_PILOT_ROWS,setup)).toThrow();
 expect(() => summariseDeckPilot([...DECK_PILOT_ROWS,DECK_PILOT_ROWS[0]],50)).toThrow('unique');
 for (const patch of [{id:''},{baselineMinutes:0},{baselineMinutes:NaN},{reviewMinutes:-1},{reviewMinutes:Infinity},{correctionMinutes:-1},{correctionMinutes:5,correctionRef:null},{correctionMinutes:0,correctionRef:'C1'}]) expect(() => summariseDeckPilot([{...DECK_PILOT_ROWS[0],...patch}],50)).toThrow();
 expect(() => summariseDeckPilot(DECK_PILOT_ROWS.map(r=>({...r,baselineMinutes:Number.MAX_VALUE})),50)).toThrow('finite');
 expect(DECK_PILOT_ROWS.map(r=>r.id)).toEqual(Array.from({length:20},(_,i)=>`Q${String(i+1).padStart(2,'0')}`));
 expect(DECK_PILOT_ROWS.filter(r=>r.correctionRef).map(r=>r.id)).toEqual(['Q04','Q09','Q14','Q19']);
 for (const c of DECK_CORRECTIONS) expect(DECK_PILOT_ROWS.find(r=>r.id===c.row)?.correctionRef).toBe(c.id);
});

test('the actual download includes all supplied material and both sets of ten fields', () => {
 const html = render(), text = readFileSync('public/downloads/pitch-deck-evidence-review.txt','utf8');
 expect(text).toBe(deckEvidenceWorksheetText());
 expect(DECK_FIELDS).toHaveLength(10); expect(DECK_CORRECTIONS).toHaveLength(4); expect(DECK_CLAIMS).toHaveLength(3); expect(DECK_READ_THROUGH).toHaveLength(3);
 const escaped = (s:string) => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 for(const value of [DECK_PROVENANCE,DECK_REVIEW_STATUS]) {expect(text).toContain(value);expect(html).toContain(escaped(value));}
 for(const rows of [DECK_FIELDS,DECK_CORRECTIONS,DECK_CLAIMS,DECK_READ_THROUGH]) for(const row of rows) for(const value of Object.values(row)) {expect(text).toContain(value);expect(html).toContain(escaped(value));}
 for(const row of DECK_PILOT_ROWS) {
  expect(text).toContain(`${row.id} | ${row.baselineMinutes} | ${row.reviewMinutes} | ${row.correctionMinutes} | ${row.correctionRef??'No output supplied'}`);
  expect(html).toContain(`data-deck-pilot-row="${row.id}"`);
 }
 for(const field of DECK_FIELDS) expect(text.split(field.label+':')).toHaveLength(3);
 expect(html).toContain('download="pitch-deck-evidence-review.txt"');
});

test('fiction, task counts, missing outputs and the failed retelling retain their limits', () => {
 const html=render();
 for(const text of ['No customer, model run, timed trial or independent review produced them','Zero correction time does not mean an output was correct','Twenty drafts are tasks, not twenty customers','Churn is unknown','No actual reviewer took part','Retest not run','The change may help but no actual comprehension improvement']) expect(html).toContain(text);
 expect(DECK_READ_THROUGH[1].material).toContain('saved five per cent of costs');
 expect(DECK_READ_THROUGH[2].material).toContain('Invented timing example');
 expect(DECK_READ_THROUGH[2].material).toContain('No real pilot or cash-saving measurement');
 expect(html).not.toContain('measured task time was 190');
 expect(html).not.toContain('One business participated in the fictional trial');
});

test('historical original-deck commentary is source-scoped and reuse stays unapproved', () => {
 const html=render();
 for(const text of ['Leo Widrich','23 May 2013','Reid Hoffman','2004 pitch','Slide 26','public, but we have not verified a licence','not the complete underlying business records','Original-deck reuse permission and independent source review remain open']) expect(html).toContain(text);
 expect(html).not.toContain('<iframe');
 expect(html).not.toContain('Investor-validated');
 expect(html).toContain('does not isolate the slide’s effect');
});

test('only the applied event format travels; optional updates keep account and evidence limits', () => {
 const config=BASE_ARTICLE_SEO_CONFIG['/articles/'+slug].conversion!;
 expect(config.primary).toBe('events');expect(config.primaryIcp).toBe('COMMUNITY');expect(config.eventCalendarOnly).toBe(true);expect(config.version).toBe('pitch-evidence-v3');
 for(const value of ['online','melbourne']) {const html=render('?event_format='+value+'&claim=PRIVATE_SENTINEL');expect(html).toContain(`href="/events?event_format=${value}"`);expect(html).not.toContain('PRIVATE_SENTINEL');}
 for(const value of ['all','unexpected']) expect(render('?event_format='+value)).toContain('href="/events"');
 const html=render();
 expect(html).toContain('This does not upload your deck, share your claim record');
 expect(html).toContain('workspace requires an account');expect(html).toContain('worksheet is not imported automatically');
 expect(html).toContain('href="/vibe-raising"');expect(html).toContain('href="/articles/featured/how-to-pitch-your-idea"');
 expect(html).not.toContain('href="/mlai-studio#apply"');
});

test('native records, keyboard tables and section anchors expose the complete reader task', () => {
 const html=render();
 expect(html).toContain('data-cf-article-body');expect(html).toContain('data-article-toc-placeholder');
 expect(html.match(/data-deck-claim-field=/g)).toHaveLength(10);expect(html.match(/data-deck-correction=/g)).toHaveLength(4);expect(html.match(/data-deck-read-through=/g)).toHaveLength(3);
 for(const label of ['Deck evidence map','Synthetic deck timing records']) expect(html).toContain(`role="region" aria-label="${label}" tabindex="0"`);
 for(const id of ['purpose','original-decks','review','worked-example','corrections','claim-revisions','record','read-through','next-step','sources']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
 for(const id of ['corrections','completed-record','read-through']) expect(html).toContain(`href="#${id}"`);
 expect(html.match(/<details/g)).toHaveLength(3);
 expect(html).not.toContain('<article');
});
