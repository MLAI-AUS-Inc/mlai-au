import { Home } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
import { PITCH_PROVENANCE, PITCH_REVIEW_STATUS, PITCH_BEFORE, PITCH_DRAFT, PITCH_STEPS, PITCH_FIELDS, PITCH_RUBRIC, PITCH_DECK_EXAMPLE } from '~/lib/idea-pitch-rehearsal'

export const useCustomHeader = true
export const CATEGORY = 'featured'
export const SLUG = 'how-to-pitch-your-idea'
export const DATE_PUBLISHED = '2025-06-01'
export const DATE_MODIFIED = '2026-09-11'
export const DESCRIPTION = 'Explain an early idea with annotated pitch videos, a seven-slide example and an editable rehearsal record that separates clear wording from evidence of demand.'
export const FEATURED_FOCUS = 'startups'
const TITLE = 'How to pitch an early idea and ask for useful feedback'
const PATH = '/articles/' + CATEGORY + '/' + SLUG
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: 'Dr Sam Donegan' }
export const faqItems = [
 { id: 1, question: 'Do I need slides to explain an early idea?', answer: 'For an informal conversation, start with a short explanation and a question. A sketch can help, but label a mockup as a mockup. A formal event may have different requirements; check its listing.' },
 { id: 2, question: 'What if I have no customers or results yet?', answer: 'Say that the idea is untested. Explain the observation behind it, the assumption you want to test and what you hope to learn. Do not invent testimonials, savings or endorsements.' },
 { id: 3, question: 'How long should my pitch be?', answer: 'Ask how much time the listener has or follow the organiser’s limit. Rehearse with your own timing; there is no universal duration that proves a pitch is effective.' },
 { id: 4, question: 'Does positive feedback validate an idea?', answer: 'It can show interest or understanding, but it does not by itself establish demand, willingness to pay or repeat use. Record what the person actually said and what remains unknown.' },
]
export default function ArticleContent() {
 return <div data-cf-article-body>
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
   title={TITLE} titleHighlight="ask for useful feedback" headerBgColor="cyan"
   summary={{ heading: 'A conversation, not a performance test', intro: 'For AI- and startup-curious people preparing to explain an early idea at an Australian community event.', items: [
    { label: 'Name a person and a problem', description: 'Describe an observable task instead of a broad claim about transforming an industry.' },
    { label: 'Separate the idea from the evidence', description: 'Say what exists, what you observed and what remains a hypothesis.' },
    { label: 'Ask for one useful response', description: 'Invite a question or relevant experience; make declining easy.' },
   ] }}
  />
  <div className="prose prose-lg prose-slate max-w-none">
   <p>An early idea pitch can simply be a short explanation followed by a question. You do not need to present yourself as an investor-ready founder or persuade everyone to join you. The task here is to help a willing listener understand the idea and identify something you still need to learn.</p>
   <p>This guide is for informal learning conversations, not an investment solicitation, sales promise or clinical product demonstration. If you are preparing an actual deck, use the separate <Link to="/articles/featured/the-best-startup-pitch-deck-ever">pitch-deck evidence review</Link>.</p>
   <ArticleTocPlaceholder />
   <h2 id="permission" className="scroll-mt-28">Check the setting and ask first</h2>
   <p>At an event, read the format and participation rules. During a break, try: “Would you be open to hearing an early idea and telling me what is unclear?” If the person declines or is busy, leave it there. An online session may have a designated question channel; do not interrupt or send unsolicited decks to attendees.</p>
   <p>Ask before recording, quoting someone or adding them to a contact list. Remove private customer details from examples. You can describe a problem without exposing a client, employer or participant.</p>
   <h2 id="script" className="scroll-mt-28">Draft five short parts in your own words</h2>
   <ol>
    <li><strong>Person and task:</strong> who is doing what, in which setting?</li>
    <li><strong>Observation:</strong> what have you actually seen or heard? If it is only an assumption, say so.</li>
    <li><strong>Proposed change:</strong> what would your idea do, and what would stay with a person?</li>
    <li><strong>Current status:</strong> idea, sketch, prototype or something used in practice?</li>
    <li><strong>Question:</strong> what relevant experience or clarification would help you learn?</li>
   </ol>
   <p>The <a href="https://www.stylemanual.gov.au/writing-and-designing-content/clear-language-and-writing-style/plain-language-and-word-choice">Australian Government Style Manual</a> recommends familiar words and explaining unfamiliar terms. That supports the language choice here, not a claim that this five-part exercise has been proven to win pitches. Prefer “draft a reply from approved event information” to unexplained phrases such as “agentic engagement orchestration”.</p>
   <h2 id="real-examples" className="scroll-mt-28">Read two real pitch examples critically</h2>
   <p>These are the original recordings linked by this guide, not fictional success stories. The notes below are MLAI editorial interpretations of selected captioned passages, not endorsements or independently verified business results. Use the written lessons without watching; they are not full transcripts.</p>
   <h3 id="support-sorted" className="scroll-mt-28">Support-Sorted: distinguish a story from a measured outcome</h3>
   <p><a href="https://www.loom.com/share/a96f41d2326743bc8067d06d503dd9db">Watch The Story of Support-Sorted on Loom</a>. The page identifies Dr Sam Donegan as uploader; the recording is 4:54. The exact recording date was not verified.</p>
   <ul>
    <li><strong>0:01–0:18:</strong> the opening introduces the service and a personal story. A specific situation helps explain the problem; permission to tell a story is separate from evidence that a solution improves outcomes.</li>
    <li><strong>0:42–1:13:</strong> the story contrasts someone seeking help with a provider seeking clients. Identify both sides of the proposed connection; do not treat one account as a verified market-wide waiting-time estimate.</li>
   </ul>
   <p><strong>Access limit:</strong> select Transcript on Loom. In our signed-out check, text was visible through 1:52, followed by a signup prompt. The captions contain errors; these notes cover the opening only. Health, availability and business claims in the recording were not independently verified here.</p>
   <h3 id="climate" className="scroll-mt-28">CliMate: distinguish a demonstration from evidence of reliability</h3>
   <p><a href="https://www.youtube.com/watch?v=8yJnf-ISi9E">Watch CliMate Pitch Video</a>, uploaded by the mlai-au channel on 24 April 2024; duration 5:13. This is a historical project pitch, not current carbon-credit or financial guidance.</p>
   <ul>
    <li><a href="https://www.youtube.com/watch?v=8yJnf-ISi9E&t=139s">2:19</a>: the presenter describes farmer interviews. A research claim needs methods and context before you can infer demand.</li>
    <li><a href="https://www.youtube.com/watch?v=8yJnf-ISi9E&t=164s">2:44–3:31</a>: the explanation moves into a website walkthrough. Label what the demonstration shows and what remains untested.</li>
    <li><a href="https://www.youtube.com/watch?v=8yJnf-ISi9E&t=220s">3:40–4:02</a>: implementation technologies are described. Naming a model or retrieval method is not an accuracy test.</li>
   </ul>
   <p><strong>Transcript:</strong> expand the YouTube description and choose Show transcript; the full caption text was available signed out in our check. Automatically generated names and technical terms need correction before quotation.</p>
   <p>Neither recording proves that following its structure improves conversion. We have not reproduced their full transcripts or cleared reuse of their footage, personal stories or deck images. The exercise below is our separate, explicitly fictional before-and-after comparison—not a claim that either presenter made these revisions.</p>

   <h2 id="example" className="scroll-mt-28">Before and after: a fictional event-information idea</h2>
   <p><strong>{PITCH_PROVENANCE}</strong></p>
   <p><strong>Before:</strong> “{PITCH_BEFORE}”</p>
   <p><strong>Draft for the first rehearsal:</strong> “{PITCH_DRAFT}”</p>
   <p>For your own version, replace the invented observation with a permission-cleared real observation or explicitly state that it is a hypothesis. Do not copy the example as your personal experience.</p>
   <h2 id="questions" className="scroll-mt-28">Match the question to what you need to learn</h2>
   <ul>
    <li><strong>Clarity:</strong> “What do you think the idea would do?” Ask before supplying more explanation.</li>
    <li><strong>Current practice:</strong> “Can you describe the last time this happened?” Avoid asking for confidential details.</li>
    <li><strong>Limits:</strong> “When would this approach be unsuitable?” Record the objection rather than arguing it away.</li>
    <li><strong>Next conversation:</strong> “Would you be open to discussing this again?” A yes is permission to arrange that conversation, not a sale or endorsement.</li>
   </ul>
   <p>Do not turn every conversation into customer research. A supportive community peer may not have the problem you are exploring. Record that distinction. If the person has no relevant experience, their response can still reveal unclear wording without establishing market demand.</p>
   <h2 id="practice" className="scroll-mt-28">Practise, then change one sentence</h2>
   <p>Read the draft aloud or share it in writing with someone who agrees to help. Notes, a sketch, captions or an asynchronous message are all possible supports. You do not need a prescribed personality, eye-contact pattern or speaking style to take part.</p>
   <ol>
    <li>Check your actual timing against the time offered by the listener or organiser.</li>
    <li>Ask the listener to describe the intended user, proposed change and current status.</li>
    <li>Identify one misunderstanding and revise the relevant sentence.</li>
    <li>Check that the revision has not removed an important uncertainty or added an unsupported benefit.</li>
   </ol>
   <p>Here is the supplied fictional exchange, including a misunderstanding and the actual replacement sentence. It does not report a real rehearsal.</p>
   <ol className="list-none pl-0 space-y-5">{PITCH_STEPS.map(step => <li key={step.id} data-pitch-step={step.id}>
    <p><strong>{step.id}: {step.action}</strong></p><p>{step.material}</p><p><strong>Boundary:</strong> {step.boundary}</p>
   </li>)}</ol>
   <p>The rubric describes the text, not a validated score or an observed improvement. Wide tables scroll sideways; focus the region and use arrow keys, or use the matching text download below.</p>
   <div role="region" aria-label="Pitch wording comparison" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[46rem]">
    <caption>Before, first rehearsal draft and untested revision</caption>
    <thead><tr><th scope="col">Criterion</th><th scope="col">Before</th><th scope="col">Draft</th><th scope="col">After P3</th></tr></thead>
    <tbody>{PITCH_RUBRIC.map(row => <tr key={row.criterion}><th scope="row">{row.criterion}</th><td>{row.before}</td><td>{row.draft}</td><td>{row.after}</td></tr>)}</tbody>
   </table></div>

   <h2 id="record" className="scroll-mt-28">Keep a conversation record, not a confidence score</h2>
   <p><a href="/downloads/idea-pitch-rehearsal.txt" download="idea-pitch-rehearsal.txt">Save the editable pitch rehearsal record</a>. It contains the ten blank and completed fields, all three steps, wording comparison and seven-slide fictional example. No signup is required for this file.</p>
   <nav aria-label="Pitch record sections"><ul className="flex list-none flex-wrap gap-x-6 gap-y-2 pl-0"><li><a href="#completed-record">Completed record</a></li><li><a href="#deck">Seven-slide example</a></li><li><a href="#event">Event next step</a></li></ul></nav>
   <pre className="whitespace-pre-wrap" aria-label="Idea pitch conversation record">{PITCH_FIELDS.map((field, index) => `${index + 1}. ${field.label}:`).join('\n')}</pre>
   <details className="my-6 rounded-xl border border-gray-300 p-4">
    <summary id="completed-record" className="cursor-pointer font-semibold scroll-mt-28">Completed ten-field conversation record</summary>
    <p>This record belongs to the fictional P1–P3 exchange, not a real participant.</p>
    <dl className="space-y-5">{PITCH_FIELDS.map((field, index) => <div key={field.label} data-pitch-field={index + 1}><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl>
   </details>
   <p>Do not equate compliments, a QR scan or contact exchange with a customer, contract or validated business. A peer’s clear retelling would still not establish willingness to pay.</p>

   <h2 id="deck" className="scroll-mt-28">Use the original deck as a reference, not ready-made evidence</h2>
   <p><a href="https://docs.google.com/presentation/d/e/2PACX-1vQWU1kTTTBvLqg8j6YdC_gRCGbx9le6NzHR5lLzpo2zXArzPYDGpD0xDLL2vlmLcdl8yxu-Q1sBcMbi/pub">View the original MLAI pitch template</a>. The public slideshow has seven slides; use its previous/next controls. It contains instructions and third-party example images, not just blank fields. Viewing worked without an account; editable-copy access and reuse rights were not verified.</p>
   <p>Create your own text-first outline using the worked example below. Replace teaching fiction with your actual evidence or an explicit unknown. Do not copy another team’s logos, screenshots, numbers or endorsements. A roadmap is proposed work, not traction; a rising graph is appropriate only when you have the underlying data and context. Ask the owner for reuse permission before reproducing template assets.</p>
   <details className="my-6 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Read the filled seven-slide fictional outline</summary>
    <p>Our new text-only example, not copied from a real company deck. All claims remain within the P1–P3 teaching scenario.</p>
    <dl className="space-y-5">{PITCH_DECK_EXAMPLE.map(row => <div key={row.slide} data-pitch-slide><dt className="font-bold">{row.slide}</dt><dd className="ml-0 mt-1">{row.example}</dd></div>)}</dl>
   </details>
   <p>A conversation may not need slides at all. For a formal submission, check the organiser’s requirements and use the linked pitch-deck evidence review to distinguish claims, sources and missing evidence.</p>

   <h2 id="event" className="scroll-mt-28">Take your revised question to a relevant MLAI event</h2>
   <p>Look for a topic and experience level that match your interests, then check the location or online format. Bring your draft as a starting point, not a demand for feedback. Event attendance does not guarantee cofounders, investors, clients or a pitch slot.</p>
   <p>If you are still exploring an AI idea, an event can help you learn from relevant discussions. For this exercise, bring “Who would check and send the reply?” rather than a claim that the concept is validated. Choose pitch practice only when the actual event listing offers it, and ask before requesting feedback.</p>
   <ArticleEventPreference articlePath={PATH} idPrefix="idea-pitch" description="Choose online or in-person discovery for the MLAI calendar. This does not reserve a pitch slot, send your notes or book a review." />
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
   <h2 id="scope" className="scroll-mt-28">Sources, access and editorial scope</h2>
   <p>The linked resources were checked on 11 September 2026. The Style Manual page was updated 20 December 2024. Caption access, historical source claims and reuse permission are separate checks; access can change. Speaker/audio verification, full accessible transcript provision and media reuse review remain pending.</p>
   <p>{PITCH_REVIEW_STATUS} The script, scenario and record are MLAI editorial exercises, not measured interventions. No funding, conversion, safety or clarity improvement is claimed. The original publication date is retained; this revision adds source annotations and a worked rehearsal.</p>
   <ArticleFAQ items={faqItems} />
  </div>
 </div>
}
