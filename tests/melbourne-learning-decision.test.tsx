import { expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import Learning, { articleMeta, CATEGORY, SLUG, DATE_PUBLISHED, DATE_MODIFIED, DESCRIPTION, learningSources, learningDecisionFields } from '../app/articles/content/featured/learn-ai-melbourne'
import { ARTICLE_REGISTRY } from '../app/articles/registry'
import { BASE_ARTICLE_SEO_CONFIG } from '../app/articles/seo-config'

const render = () => renderToStaticMarkup(<MemoryRouter><Learning /></MemoryRouter>)

test('Melbourne learning preserves its canonical/date identity and contextual community offer', () => {
  const slug = CATEGORY + '/' + SLUG
  const baseline = JSON.parse(readFileSync('tests/fixtures/article-publication-dates.json', 'utf8'))
  const entry = ARTICLE_REGISTRY[slug]
  const conversion = BASE_ARTICLE_SEO_CONFIG['/articles/' + slug].conversion!
  const html = render()
  expect(slug).toBe('featured/learn-ai-melbourne')
  expect(DATE_PUBLISHED).toBe(baseline[slug].date)
  expect(entry.date).toBe(DATE_PUBLISHED)
  expect(entry.dateModified).toBe(DATE_MODIFIED)
  expect(entry.title).toBe(articleMeta.title)
  expect(entry.description).toBe(DESCRIPTION)
  expect(entry.author).toBe(articleMeta.author)
  expect(entry.imageAlt).toBe(articleMeta.imageAlt)
  expect(conversion.primaryIcp).toBe('COMMUNITY')
  expect(conversion.primary).toBe('events')
  expect(conversion.version).toBe('melbourne-learning-v3')
  expect(html).toContain(conversion.copy!.button)
  expect(html).toContain('data-article-icp="COMMUNITY"')
  expect(html).toContain('href="/events"')
  expect(html).toContain('not a substitute for a qualification')
  expect(html).toContain('not the provider courses compared above')
  expect(html).toContain('href="/articles/featured/best-way-to-learn-about-ai-2026"')
  expect(html).toContain('href="/articles/featured/where-to-find-ai-events-in-melbourne"')
  expect(html.match(/<h1[\s>]/g)?.length).toBe(1)
})

test('provider comparison is dated, specific and explicit about unequal fees and unknowns', () => {
  const html = render()
  for (const href of Object.values(learningSources)) expect(html).toContain('href="' + href + '"')
  for (const text of [
    'checked 29 October 2026', 'not live availability', 'not teaching quality or employment outcomes',
    'Minimum eligibility does not guarantee admission', 'half a year full-time', 'A$4,940 per semester',
    '15 February 2027', '7 February 2027', 'ICT50220', 'pre-training/literacy/numeracy assessment',
    'A$15,810 full fee', 'A$8,823 government-subsidised', 'A$85 per semester', 'No dated intake was visible',
    'Intermediate Python', 'not a no-coding introduction', 'A$1,000 including GST',
    'Upcoming dates to be announced', 'no next intake or closing date is confirmed', 'fee period', 'written fee quote',
    'Melbourne Business School: AI for Business', 'A$3,500 including GST', 'A$3,950', '25–26 November 2026',
    'scope="row"', 'scope="col"', 'aria-label="Dated Melbourne AI course comparison"', 'tabindex="0"',
  ]) expect(html).toContain(text)
  for (const staleFact of ['A$4,769', '$15,198', '$8,466', '28 September 2026', '12 October 2026']) {
    expect(html).not.toContain(staleFact)
  }
  const source = readFileSync('app/articles/content/featured/learn-ai-melbourne.tsx', 'utf8')
  expect(source).not.toContain('new Date()') // Snapshot facts are not silently re-dated at render time.
  for (const residue of ['AudienceGrid', 'MLAITemplateResourceCTA', 'Build a portfolio that Melbourne employers recognise',
    'Most providers now support', 'Two or three tidy', 'within your first month']) expect(source).not.toContain(residue)
})

test('the learning worksheet and worked capacity decision are genuinely usable without a promised download', () => {
  const html = render()
  expect(learningDecisionFields).toHaveLength(14)
  expect(new Set(learningDecisionFields).size).toBe(14)
  for (const field of learningDecisionFields) expect(html).toContain(field)
  for (const text of ['Fictional planning example, not a learner testimonial', '32 hours', '48–64 hours',
    '16–32-hour gap', 'before any extra catch-up or setup', 'Deferring enrolment is a valid outcome',
    'No account is required', 'AI coding tools', 'what you accepted or rejected',
    'Generated tests are not evidence until you run and inspect them', 'not a researched employer preference',
    'scope', 'whitespace-pre-wrap', 'break-words']) expect(html).toContain(text)
  expect(4 * 8).toBe(32)
  expect(6 * 8 - 32).toBe(16)
  expect(8 * 8 - 32).toBe(32)
  expect(html).not.toContain('Download now')
  expect(html).not.toContain('href="/contact"')
})
