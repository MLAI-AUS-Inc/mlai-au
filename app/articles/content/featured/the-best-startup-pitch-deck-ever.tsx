import { Home } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
import { DECK_PROVENANCE, DECK_REVIEW_STATUS, DECK_PILOT_ROWS, DECK_SETUP_MINUTES, DECK_CORRECTIONS, DECK_CLAIMS, DECK_FIELDS, DECK_READ_THROUGH, summariseDeckPilot } from '~/lib/pitch-deck-evidence'

export const useCustomHeader = true
export const CATEGORY = 'featured'
export const SLUG = 'the-best-startup-pitch-deck-ever'
export const DATE_PUBLISHED = '2025-11-23'
export const DATE_MODIFIED = '2026-09-15'
export const DESCRIPTION = 'Review startup deck claims using founder-published examples, twenty synthetic timing records, scripted corrections and a completed downloadable evidence worksheet.'
export const FEATURED_FOCUS = 'funding'
const TITLE = 'A startup pitch deck you can defend: an evidence-first review'
const PATH = '/articles/' + CATEGORY + '/' + SLUG
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: 'Dr Sam Donegan' }
export const faqItems = [
 { id: 1, question: 'Is there a best startup pitch deck?', answer: 'Not independently of its audience, stage and purpose. This guide offers an editorial review process, not a ranking of decks or a structure proven to raise money.' },
 { id: 2, question: 'How many slides should I use?', answer: 'Check the recipient or organiser’s requirements, available time and sharing format. Keep enough context to understand each claim; no universal slide count is established here.' },
 { id: 3, question: 'Can I include a forecast before I have revenue?', answer: 'Label it as a forecast, state its assumptions and keep it separate from actual results. A possible future customer, letter of intent or unpaid trial is not recorded revenue.' },
 { id: 4, question: 'Can AI write my pitch deck?', answer: 'AI can help organise your notes or suggest wording, but check every number, quote and source yourself. Do not ask it to invent traction, customer testimonials or research. Only use information you have permission to share with the tool.' },
 { id: 5, question: 'Will an MLAI event provide investor feedback?', answer: 'Check the specific event listing. Attendance does not guarantee pitch review, investor access, funding or commercial advice. Ask another participant before sharing a deck or requesting feedback.' },
]
export default function ArticlePage() {
 const total = summariseDeckPilot(DECK_PILOT_ROWS, DECK_SETUP_MINUTES)
 return <div data-cf-article-body>
  <ArticleHeroHeader
   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
   title={TITLE} titleHighlight="evidence-first review" headerBgColor="purple"
   summary={{ heading: 'Before you share the deck', intro: 'For Australian founders preparing a learning or funding conversation: make the business understandable without turning assumptions into achievements.', items: [
    { label: 'Start with the reader’s decision', description: 'A request for product feedback is different from an investment discussion.' },
    { label: 'Check claims before polishing slides', description: 'Record the source, period, sample and limits of each consequential claim.' },
    { label: 'End with an appropriate next step', description: 'Ask for a specific conversation, not an implied commitment.' },
   ] }}
  />
  <div className="prose prose-lg prose-slate max-w-none">
   <p>Searching for the “best startup pitch deck ever” can lead you to copy a successful company’s slides without knowing what evidence or relationships sat behind them. A template cannot prove demand for your business. This guide helps you produce a defensible draft and a focused feedback question; it does not establish a winning deck or offer financial advice.</p>
   <p>Check claims in a document that may be forwarded without you. For a short spoken explanation and a consent-based rehearsal, use the separate <Link to="/articles/featured/how-to-pitch-your-idea">early idea pitch guide</Link>.</p>
   <ArticleTocPlaceholder />
   <h2 id="purpose" className="scroll-mt-28">Name the decision before choosing slides</h2>
   <p>Write down who will read the deck, what they already know and what you want them to do next. Use a different request for a customer discovery conversation, a community practice session or an investment discussion. Do not treat an event attendee as a prospective investor without asking.</p>
   <p><a href="https://sequoiacap.com/article/writing-a-business-plan">Sequoia’s business-plan guide</a>, published 15 March 2019, offers prompts covering purpose, customer problem, solution, timing, market, alternatives, business model, team, financials and vision. It is one investor’s outline, not a mandatory slide count or evidence that this sequence causes funding. The review process below is MLAI’s editorial exercise, not Sequoia’s certification.</p>
   <h2 id="original-decks" className="scroll-mt-28">Read original decks alongside their authors’ corrections</h2>
   <p>The following are founder-published historical examples. Their authors made the material public, but we have not verified a licence to reproduce their images. Open the original pages for the slides; the annotations here are our written interpretations. These examples do not establish current Australian investor preferences or a deck structure that causes funding.</p>
   <h3 className="scroll-mt-28" id="buffer-example">Buffer: the competition slide answers a recurring question</h3>
   <p><a href="https://buffer.com/resources/the-slide-deck-we-used-to-raise-half-a-million-dollars/">Leo Widrich’s Buffer seed-deck retrospective</a>, 23 May 2013, describes repeated confusion about competitors and a revised positioning slide. His commentary explains how the revised competition slide addressed that confusion.</p>
   <p><strong>Our annotation:</strong> identify the specific alternative your reader is comparing you with, then show the relevant distinction. A diagram of logos does not prove superiority, and this historical market map cannot establish who competes with your product today. The author’s account of fundraising does not isolate the slide’s effect.</p>
   <h3 className="scroll-mt-28" id="linkedin-example">LinkedIn: customer quotations can still be weak evidence</h3>
   <p><a href="https://www.reidhoffman.org/linkedin-pitch-to-greylock/">Reid Hoffman’s annotated LinkedIn Series B deck</a> revisits his 2004 pitch. In his commentary on customer feedback, Hoffman says he would delete the slide that used quotations as evidence of product-market fit, explaining why it added little to the argument.</p>
   <p><strong>Our annotation:</strong> a quotation needs context and permission, and may still fail to support the claim you want to make. Separate customer reports from measured results. Do not borrow the old slide’s savings figures or treat a successful company’s deck as evidence that every slide worked.</p>
   <p>These annotations use selected passages in the authors’ commentary; the underlying business records were not checked. The original slides remain on their sites. No third-party deck images are reproduced in this article or its download.</p>

   <h2 id="review" className="scroll-mt-28">Build an evidence map before a slide order</h2>
   <p>Wide tables scroll sideways. Focus a table region and use arrow keys on a keyboard, or read the same worked record in the text download below.</p>
   <div role="region" aria-label="Deck evidence map" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[42rem]"><caption>What each consequential claim needs</caption><thead><tr><th scope="col">What the reader needs to understand</th><th scope="col">Evidence to inspect</th><th scope="col">Do not substitute</th></tr></thead><tbody>
    <tr><td>Who experiences the problem?</td><td>Permission-cleared observations, interview notes and the current workaround</td><td>An invented persona presented as customer research</td></tr>
    <tr><td>What works today?</td><td>A dated demonstration and its operating limits</td><td>A mockup described as a deployed product</td></tr>
    <tr><td>What demand exists?</td><td>Separate records of interviews, trials, paying accounts and repeat use</td><td>A waitlist or non-binding expression of interest labelled as revenue</td></tr>
    <tr><td>How might the business work?</td><td>Actual prices and costs, with forecasts in a separate scenario</td><td>An addressable-market headline treated as achievable sales</td></tr>
    <tr><td>What is the next request?</td><td>A specific discussion or milestone, dependencies and unresolved questions</td><td>A promised return or an assumed commitment from the reader</td></tr>
   </tbody></table></div>
   <p>For each claim, attach a source record you can inspect, not merely a website that mentions the topic. Keep dates, currency, denominators and exclusions next to the number where possible. Redact identifying information and obtain permission before sharing customer material. A missing source is a reason to qualify or remove a claim, not generate a citation.</p>
   <h2 id="worked-example" className="scroll-mt-28">Inspect a fictional quote-drafting example</h2>
   <p><strong>{DECK_PROVENANCE}</strong> The imagined task is preparing draft estimates for an equipment-hire business. There is no live integration or automatic sending. The twenty rows below make the arithmetic inspectable; they do not become real pilot evidence because the sums reconcile.</p>
   <details className="my-6 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Inspect all twenty synthetic timing rows</summary>
    <p>Setup is a separate, one-time assumption of {total.setup} minutes. Review and extra correction are separate columns. A zero correction entry has no supplied output or correctness review; it must not be counted as an accurate model result.</p>
    <div role="region" aria-label="Synthetic deck timing records" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[40rem]">
     <caption>Invented minute inputs for Q01–Q20</caption>
     <thead><tr><th scope="col">Draft</th><th scope="col">Baseline</th><th scope="col">Review</th><th scope="col">Extra correction</th><th scope="col">Supplied correction</th></tr></thead>
     <tbody>{DECK_PILOT_ROWS.map(row => <tr key={row.id} data-deck-pilot-row={row.id}><th scope="row">{row.id}</th><td>{row.baselineMinutes}</td><td>{row.reviewMinutes}</td><td>{row.correctionMinutes}</td><td>{row.correctionRef ?? 'No output supplied'}</td></tr>)}</tbody>
     <tfoot><tr><th scope="row">Totals</th><td>{total.baseline}</td><td>{total.review}</td><td>{total.corrections}</td><td>{total.correctedRows} scripted corrections</td></tr></tfoot>
    </table></div>
   </details>
   <p><strong>Calculation:</strong> {total.review} review + {total.corrections} correction + {total.setup} setup = {total.assisted} assisted minutes, compared with {total.baseline} baseline minutes. The {total.difference}-minute difference is {total.differencePercent}% of baseline. This illustrated 5% task-time difference does not establish cash savings or causation. It excludes software charges, maintenance and other work.</p>
   <p><strong>Sensitivity:</strong> changing setup to 60 minutes makes the totals equal at 200 minutes. At 80 setup minutes, assisted time becomes 220 minutes, 10% more than baseline. These are alternative assumptions, not later observed tests. Do not quietly remove setup or correction from the displayed result.</p>
   <h3 id="corrections" className="scroll-mt-28">Read what the four corrections actually change</h3>
   <p>The following inputs, bad drafts and edits are scripted teaching material. They illustrate different failure types without claiming an AI system generated or caught them.</p>
   <details className="my-6 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Inspect the four scripted corrections</summary>
    <dl className="space-y-6">{DECK_CORRECTIONS.map(c => <div key={c.id} data-deck-correction={c.id}><dt className="font-bold">{c.id} / {c.row}</dt><dd className="ml-0"><p><strong>Input:</strong> {c.input}</p><p><strong>Draft:</strong> {c.draft}</p><p><strong>Edited:</strong> {c.edit}</p><p>{c.lesson}</p></dd></div>)}</dl>
   </details>
   <p>A real follow-up would define comparable work, record observed timings and preserve outputs for review. Check quantity and duration errors separately from changes to booking status or pickup location. Human review is a proposed operating boundary here, not demonstrated safety.</p>

   <h2 id="claim-revisions" className="scroll-mt-28">Revise the claim, keeping its limits attached</h2>
   <dl className="space-y-6">{DECK_CLAIMS.map(claim => <div key={claim.id} data-deck-claim={claim.id}><dt className="font-bold">{claim.id}: “{claim.before}”</dt><dd className="ml-0"><p><strong>Replacement:</strong> {claim.replacement}</p><p><strong>Why:</strong> {claim.boundary}</p></dd></div>)}</dl>
   <p>These replacements describe the supplied evidence. No retention percentage or churn figure belongs in D2 until a real cohort, time period and method exist. Do not turn one customer’s reported experience into a company-wide result.</p>

   <h2 id="record" className="scroll-mt-28">Save a completed claim record and make your own</h2>
   <p><a href="/downloads/pitch-deck-evidence-review.txt" download="pitch-deck-evidence-review.txt">Download the editable deck evidence review</a>. The actual text file contains the ten blank/completed fields, twenty timing rows, four corrections, three claim revisions and fictional read-through. No signup is required. It contains no copied third-party deck assets.</p>
   <nav aria-label="Deck evidence sections"><ul className="flex list-none flex-wrap gap-x-6 gap-y-2 pl-0"><li><a href="#corrections">Scripted corrections</a></li><li><a href="#completed-record">Completed claim record</a></li><li><a href="#read-through">Read-through</a></li></ul></nav>
   <p>Use one record per consequential claim. Keep enough context on the slide for someone receiving it without your explanation.</p>
   <pre className="whitespace-pre-wrap" aria-label="Pitch slide evidence record">{DECK_FIELDS.map((field, index) => `${index + 1}. ${field.label}:`).join('\n')}</pre>
   <details className="my-6 rounded-xl border border-gray-300 p-4"><summary id="completed-record" className="cursor-pointer font-semibold scroll-mt-28">Completed ten-field record for claim D1</summary>
    <dl className="space-y-5">{DECK_FIELDS.map((field, index) => <div key={field.label} data-deck-claim-field={index + 1}><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl>
   </details>
   <h2 id="read-through" className="scroll-mt-28">Test whether the deck survives being read without you</h2>
   <ol>
    <li>Ask a willing reviewer to explain the intended customer, current product and next request in their own words before you explain the slides.</li>
    <li>Ask which statements they interpreted as measured results. Compare their answers with your evidence records.</li>
    <li>Record unanswered questions and misunderstood claims. Revise those passages rather than treating praise as validation.</li>
    <li>Check the actual sharing format: text legibility, chart labels, permissions, links and any organiser requirements. Keep a static explanation if a demo cannot load.</li>
   </ol>
   <p>This is a comprehension check, not an investor approval score. A live presentation can use spoken explanation; a forwarded deck needs necessary context in the document itself. Do not remove limitations merely to shorten it.</p>
   <p>Here is a supplied fictional read-through, including the misleading interpretation it catches. No actual reviewer took part.</p>
   <ol className="list-none pl-0 space-y-5">{DECK_READ_THROUGH.map(step => <li key={step.id} data-deck-read-through={step.id}><p><strong>{step.id}: {step.action}</strong></p><p>{step.material}</p></li>)}</ol>
   <h2 id="next-step" className="scroll-mt-28">Bring one evidence question to an MLAI event</h2>
   <p>Choose a relevant MLAI founder event and ask whether a participant is willing to discuss one anonymised slide. For example: “Does this sentence make clear what we measured and what remains untested?” Check the event’s topic, format and participation rules; a listing is not a promise of deck review or investor access.</p>
   <p>For this example, the useful question is “Can you tell that these are invented timings rather than measured cash savings?” Pick an event whose actual programme matches the discussion you want. You can attend to learn without pitching or sharing your deck.</p>
   <p>If your separate task is reporting progress to existing stakeholders, <Link to="/vibe-raising">Vibe Raising</Link> is an optional way to prepare an update. Opening the workspace requires an account; this worksheet is not imported automatically, and the tool does not verify your claims or endorse a valuation. For share-count assumptions, see the <Link to="/articles/featured/how-vcs-value-startups">valuation evidence guide</Link>.</p>
    <p><Link to="/events">Explore upcoming MLAI events</Link> and check the listing for its topic, format and participation requirements.</p>
   <h2 id="sources" className="scroll-mt-28">Sources and editorial limits</h2>
   <p>The Sequoia, Buffer and Reid Hoffman pages were checked on 15 September 2026. The linked founder retrospectives provide historical author accounts, not current market research or independent fundraising attribution. Independent source review remains pending. A future reproduction of third-party deck images would require a separate rights and accessibility check.</p>
   <p>{DECK_REVIEW_STATUS} The evidence map, fictional records and read-through are teaching material. No deck outcome, Australian investor preference or legal eligibility is inferred. Seek qualified advice for an actual fundraising transaction. The original publication date is preserved; this revision adds supplied source material and a completed record.</p>
   <ArticleFAQ items={faqItems} />
  </div>
 </div>
}
