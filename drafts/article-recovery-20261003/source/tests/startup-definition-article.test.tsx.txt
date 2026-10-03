import { test, expect } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import Article, { DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION } from '../app/articles/content/featured/what-constitutes-a-startup-in-practice';
import { ARTICLE_REGISTRY } from '../app/articles/registry';
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config';
import { readFileSync } from 'node:fs';
import { STARTUP_MODEL_CASES, STARTUP_MODEL_FIELDS, STARTUP_MODEL_PROVENANCE, STARTUP_SETUP_SCENARIOS, compareSetupHours } from '../app/lib/startup-model-evidence';
const slug = 'featured/what-constitutes-a-startup-in-practice';
const render = (query = '') => renderToStaticMarkup(<MemoryRouter initialEntries={['/articles/' + slug + query]}><Article /></MemoryRouter>);
test('startup definition makes evidence limits and community intent explicit', () => {
 const html = renderToStaticMarkup(<MemoryRouter><Article /></MemoryRouter>);
 expect(html).toContain('data-article-icp="COMMUNITY"');
 expect(html).toContain('Find a startup learning event');
 expect(html).toContain('href="/events"');
 expect(html).toContain('paulgraham.com/growth.html');
 expect(html).toContain('not a legal classification');
 expect(html).toContain('Startup model evidence record');
 expect(html).toContain('100 delivery hours');
 expect(html).toContain('60 hours');
 expect(html).toContain('not MLAI companies');
 expect(html).not.toContain('data-article-icp="FOUNDER_BUILDER"');
});

test('startup definition preserves original dates and adds a scoped printable resource description', () => {
 const entry = ARTICLE_REGISTRY[slug];
 expect(DATE_PUBLISHED).toBe('2026-04-06'); expect(DATE_MODIFIED).toBe('2026-09-11');
 expect(entry.date).toBe(DATE_PUBLISHED); expect(entry.dateModified).toBe(DATE_MODIFIED); expect(entry.description).toBe(DESCRIPTION);
 const html = render();
 for (const text of ['not a fillable form','a blank print sheet','No customer validation','Independent founder and source review remain outstanding']) expect(html).toContain(text);
 expect(html).not.toContain('<article');
});

test('all cases and completed fields appear in both the article and actual editable download', () => {
 const html = render(), text = readFileSync('public/downloads/startup-model-evidence.txt','utf8');
 const escaped = (value: string) => value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 expect(STARTUP_MODEL_FIELDS).toHaveLength(8); expect(STARTUP_MODEL_CASES).toHaveLength(4);
 for (const row of [...STARTUP_MODEL_FIELDS, ...STARTUP_MODEL_CASES]) for(const value of Object.values(row)) { expect(text).toContain(value); expect(html).toContain(escaped(value)); }
 expect(text).toContain(STARTUP_MODEL_PROVENANCE); expect(html).toContain(STARTUP_MODEL_PROVENANCE);
 for (const field of STARTUP_MODEL_FIELDS) expect(text.split(field.label)).toHaveLength(3);
 expect(html).toContain('download="startup-model-evidence.txt"');
 expect(html).toContain('download="startup-model-decision-sheet.pdf"');
 const pdf = readFileSync('public/downloads/startup-model-decision-sheet.pdf');
 expect(pdf.subarray(0,5).toString()).toBe('%PDF-'); expect(pdf.length).toBeGreaterThan(1000);
});

test('all three setup scenarios retain setup and negative differences', () => {
 const totals = STARTUP_SETUP_SCENARIOS.map(compareSetupHours);
 expect(totals).toEqual([{bespoke:100,shared:60,difference:40},{bespoke:20,shared:44,difference:-24},{bespoke:100,shared:120,difference:-20}]);
 const base = STARTUP_SETUP_SCENARIOS[0];
 expect(compareSetupHours({...base,clients:2}).difference).toBe(-8);
 expect(compareSetupHours({...base,clients:3}).difference).toBe(8);
 expect(compareSetupHours({...base,clients:5,commonHours:80,sharedHoursPerClient:4}).difference).toBe(0);
 const html=render(), text=readFileSync('public/downloads/startup-model-evidence.txt','utf8');
 expect(html.match(/data-startup-scenario=/g)).toHaveLength(3);
 for(const [i,row] of STARTUP_SETUP_SCENARIOS.entries()) {
  expect(text).toContain(`Bespoke: ${row.clients} x ${row.bespokeHoursPerClient} = ${totals[i].bespoke} hours.`);
  expect(text).toContain(`Shared: ${row.commonHours} + ${row.clients} x ${row.sharedHoursPerClient} = ${totals[i].shared} hours.`);
 }
 expect(html).toContain('three whole setups');expect(html).toContain('not a margin forecast');expect(html).toContain('unestimated, not zero');
});

test('missing, coercible, non-finite and invalid setup inputs fail rather than inventing estimates', () => {
 const base=STARTUP_SETUP_SCENARIOS[0];
 for (const clients of [0,-1,1.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) expect(()=>compareSetupHours({...base,clients})).toThrow();
 for(const field of ['bespokeHoursPerClient','commonHours','sharedHoursPerClient']) for(const value of [-1,NaN,Infinity,undefined,null,'4']) expect(()=>compareSetupHours({...base,[field]:value} as unknown as Parameters<typeof compareSetupHours>[0])).toThrow();
 expect(()=>compareSetupHours({...base,bespokeHoursPerClient:Number.MAX_VALUE})).toThrow('overflow');
 expect(()=>compareSetupHours({...base,commonHours:Number.MAX_VALUE,sharedHoursPerClient:Number.MAX_VALUE})).toThrow('overflow');
 expect(compareSetupHours({clients:1,bespokeHoursPerClient:0,commonHours:0,sharedHoursPerClient:0})).toEqual({bespoke:0,shared:0,difference:0});
});

test('contradiction changes a fictional decision without claiming research or permission to act', () => {
 const html=render();
 for(const text of ['not an actual interview quotation','Pause the product claim','Neither test has run','not a pipeline','not demonstrated retention','not permanently to that industry','not a researched customer segment']) expect(html).toContain(text);
 expect(STARTUP_MODEL_FIELDS[5].value).toContain('two people must approve every quote');
 expect(STARTUP_MODEL_FIELDS[7].value).toContain('Do not use client records or connect accounts');
 expect(html).not.toContain('validated scalable product');
});

test('original definitions and dated programme rules are not interchangeable eligibility claims', () => {
 const html=render();
 for(const text of ['paulgraham.com/growth.html','steveblank.com/2010/01/25/whats-a-startup-first-principles/','business.gov.au/grants-and-programs/industry-growth-program','25 January 2010','September 2012','11 September 2026','paused to new applications','not identical definitions','not a recommendation to apply','successful merit assessment','not a universal meaning']) expect(html).toContain(text);
 expect(html).not.toContain('50-100-500'); expect(html).not.toContain('Download the checklist mentioned above');
});

test('definition readers get format-only community events, not an inferred contractor pitch', () => {
 const config=BASE_ARTICLE_SEO_CONFIG['/articles/'+slug].conversion!;
 expect(config.primary).toBe('events');expect(config.primaryIcp).toBe('COMMUNITY');expect(config.version).toBe('startup-model-v3');expect(config.eventCalendarOnly).toBe(true);
 for(const value of ['online','melbourne']) {const html=render('?event_format='+value+'&record=PRIVATE_SENTINEL');expect(html).toContain(`href="/events?event_format=${value}"`);expect(html).not.toContain('PRIVATE_SENTINEL');}
 for(const value of ['all','unexpected']) expect(render('?event_format='+value)).toContain('href="/events"');
 const html=render();expect(html).toContain('This does not upload your business record');expect(html).not.toContain('data-article-icp="SMB"');expect(html).not.toContain('data-article-icp="BUILDER"');expect(html).not.toContain('data-article-icp="FOUNDER_BUILDER"');
});

test('native evidence details, accessible table and section links expose all eight fields', () => {
 const html=render();
 expect(html).toContain('data-article-toc-placeholder');expect(html).toContain('role="region" aria-label="Proposed setup-hour comparison" tabindex="0"');
 expect(html.match(/data-startup-field=/g)).toHaveLength(8);expect(html.match(/data-startup-case=/g)).toHaveLength(4);expect(html.match(/<details/g)).toHaveLength(1);
 for(const id of ['definition','examples','repeatability','evidence','eligibility','conversation','sources']) expect(html).toContain(`id="${id}" class="scroll-mt-28"`);
 for(const id of ['completed-record','eligibility','conversation']) expect(html).toContain(`href="#${id}"`);
});
