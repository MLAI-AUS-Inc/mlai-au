import { useEffect } from 'react'
import { Home } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
import AuthorBio from '~/components/AuthorBio'
import ArticleTocPlaceholder from '~/components/articles/ArticleTocPlaceholder'
import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
import { FEEDBACK_ASK, FEEDBACK_BLANK, FEEDBACK_CASES, FEEDBACK_COMPLETED, FEEDBACK_DOWNLOAD, FEEDBACK_FIELDS, FEEDBACK_NOTES, FEEDBACK_PATH, FEEDBACK_PROVENANCE, FEEDBACK_WORKFLOW } from '~/lib/community-feedback-to-test'

export const useCustomHeader = true
export const CATEGORY = 'featured'
export const SLUG = 'why-australian-startups-need-stronger-ai-communities'
export const DATE_PUBLISHED = '2026-06-21'
export const DATE_MODIFIED = '2026-09-11'
export const DESCRIPTION = 'Turn an Australian AI community conversation into a testable next step: prepare a shareable question, distinguish peer opinion from evidence and record what you will check.'
export const FEATURED_FOCUS = 'product'
const TITLE = 'Using AI community feedback: from conversation to a testable next step'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-23950c23-bc67-4450-8674-8c111d188163.jpg?alt=media&token=ca641826-f54e-48e4-97c3-c4dabb3bffa5'
const HERO_ALT = 'Two people in conversation beside a laptop (illustrative image)'
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, date: DATE_PUBLISHED, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, description: DESCRIPTION, author: 'Content Team', image: HERO_IMAGE, imageAlt: HERO_ALT }

export const faqItems = [
 { id: 1, question: 'Does positive community feedback validate my startup?', answer: 'No. A useful discussion can identify assumptions or tests, but approval from peers is not evidence of customer demand, reliable operation or willingness to pay. Identify who gave the feedback and what they actually observed.' },
 { id: 2, question: 'Can a non-technical founder bring an AI question?', answer: 'Yes. Describe the work, the problem and the decision you need to make in ordinary language. Check the event’s topic and participation format; do not assume attendees will design or build a solution for you.' },
 { id: 3, question: 'What should I share at an event?', answer: 'Bring a short question and synthetic or permission-cleared material. Avoid customer records, credentials, private personnel information and confidential investor details. Ask before recording or quoting another person.' },
 { id: 4, question: 'What is a useful outcome if nobody agrees with my idea?', answer: 'A specific objection, alternative explanation or missing fact can help you decide what to investigate. Record it without implying that one conversation proves the idea wrong. No response is not evidence of demand or rejection.' },
]

const CONTENT_FACTORY_INSPECTOR_SCRIPT = `window.__cfArticleInspectorInstalled=true;try{window.parent.postMessage({source:'content-factory-inspector',protocolVersion:3,type:'ready',mode:'comment'},'*')}catch(e){}`;

function ContentFactoryInspectorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!new URLSearchParams(window.location.search).has('cfInspector')) {
      return;
    }

    const script = document.createElement('script');
    script.dataset.contentFactoryInspector = 'true';
    script.textContent = CONTENT_FACTORY_INSPECTOR_SCRIPT;
    document.body.appendChild(script);

    return (): void => {
      script.remove();
    };
  }, []);

  return null;
}

export default function ArticleContent() {
 return <div className="bg-white">
  <ContentFactoryInspectorBridge />
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
   title={TITLE} titleHighlight="a testable next step" headerBgColor="cyan"
   heroImage={HERO_IMAGE} heroImageAlt={HERO_ALT}
   summary={{ heading: 'A conversation is an input, not a verdict', intro: 'For Australians interested in AI and startups who want to learn from a relevant community session.', items: [
    { label: 'Bring one decision', description: 'Describe what you are trying to understand, not a request for a complete free solution.' },
    { label: 'Keep evidence separate', description: 'Distinguish someone’s experience, an opinion, a source and a new hypothesis.' },
    { label: 'Leave with a check', description: 'Record the next test and its limits rather than treating enthusiasm as validation.' },
   ] }}
  />
  <article data-cf-article-body className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
   <p>To use an AI community conversation well, bring a specific question, listen for evidence and alternatives, then choose one next step you can actually check. The useful output might be a better test or a reason to pause. It does not need to be a lead, a collaborator or a decision to build.</p>
   <p><strong>Correction, 9 September 2026:</strong> the earlier article used funding headlines and startup rankings to support claims about faster learning and growth, while its summary asked unrelated ranking and budget questions. Those do not establish community impact. This version focuses on a practical feedback process and clearly labelled examples.</p>
   <ArticleTocPlaceholder />
   <h2 id="gap">Name the question before choosing the room</h2>
   <p>Start with “I am deciding whether…” or “I do not understand…” and name the kind of response that would help. A session about research methods, a beginner demonstration and an informal founder discussion offer different opportunities. Check the actual listing rather than assuming all AI events provide hands-on help.</p>
   <div role="region" aria-label="Choosing a useful community question" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
   <table className="w-full min-w-[42rem] table-fixed"><thead><tr><th scope="col">Unfocused ask</th><th scope="col">More useful question</th><th scope="col">What a peer response could contribute</th></tr></thead><tbody>
    <tr><td>“Is my AI idea good?”</td><td>“Which assumption in this workflow would you test first, and why?”</td><td>An alternative explanation or test to investigate</td></tr>
    <tr><td>“Which model should I use?”</td><td>“What failure cases would matter for this task before comparing models?”</td><td>Candidate checks, not a production recommendation</td></tr>
    <tr><td>“Can someone build my product?”</td><td>“Which parts of this task are unclear enough to stop me writing a useful brief?”</td><td>Questions to resolve before a separately agreed build</td></tr>
    <tr><td>“Who can introduce me to investors?”</td><td>“What evidence is missing from the way I explain progress?”</td><td>Feedback on clarity, not promised investor access</td></tr>
   </tbody></table>
   </div>
   <p>Respect the format and the other person’s time. Offer context, ask if they want to discuss it and accept a decline. A community invitation is not an agreement to provide unpaid delivery or specialist advice.</p>
   <h2 id="example">Worked example: feedback on an enquiry-drafting idea</h2>
   <p>{FEEDBACK_PROVENANCE}</p>
   <p>Priya’s question is deliberately narrower than “Is my startup a good idea?” You can read the whole example without using an AI tool or sharing any business data.</p>
   <blockquote aria-label="Fictional community ask">{FEEDBACK_ASK}</blockquote>
   <h3 id="workflow">The proposed workflow</h3>
   <ol>{FEEDBACK_WORKFLOW.map(step => <li key={step}>{step}</li>)}</ol>
   <h3 id="conversation">What each comment changes</h3>
   <ul>{FEEDBACK_NOTES.map(note => <li key={note.id} data-feedback-note={note.id}><strong>{note.id} — {note.basis}:</strong> “{note.comment}” {note.action}</li>)}</ul>
   <h3 id="checking-exercise">Try the three-reply checking exercise</h3>
   <p>For each candidate reply, identify the unsupported commitment and the missing fact. Then open the answer key. All prices, requests and replies below are invented; the exercise checks your reading, not a model’s accuracy.</p>
   {FEEDBACK_CASES.map(row => <section key={row.id} data-feedback-case={row.id} aria-label={`${row.id}: ${row.label}`} className="my-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
    <h4 className="mt-0">{row.id}: {row.label}</h4>
    <p><strong>Invented enquiry:</strong> {row.message}</p>
    <p><strong>Author-written candidate:</strong> {row.draft}</p>
    <details className="rounded-lg border border-slate-300 bg-white p-4">
     <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Check the reasoning for {row.id}</summary>
     <p><strong>Problem:</strong> {row.problem}</p>
     <p><strong>Expected behaviour:</strong> {row.expected}</p>
     <p><strong>Safer sample wording:</strong> {row.saferReply}</p>
     <p>Linked to fictional comment {row.note}. This is an authored answer key, not a successful model retest.</p>
    </details>
   </section>)}
   <p><strong>The decision changes from “connect an inbox” to “resolve the workflow first”.</strong> In this fiction, Priya pauses connection, keeps sending out of scope and plans a draft-only comparison with a simple checklist. The three cases are a starting point, not a representative evaluation: ordinary enquiries and unseen variations are still needed. No actual test run or saving has been measured.</p>
   <p>If a participant says “I would use this,” Priya records the statement as interest. It is not a paid order, a trial agreement or proof of demand. A later conversation with an appropriate intended user is a different activity with its own permission and evidence requirements.</p>
   <h2 id="method">Four steps from a comment to an experiment</h2>
   <ol>
    <li><strong>Capture the comment accurately.</strong> Ask whether your paraphrase is fair. Request permission before recording, quoting or attributing it publicly.</li>
    <li><strong>Classify its basis.</strong> Is it an observed result, an account of experience, an opinion, a question or a linked source? Preserve “unknown” when the basis is unclear.</li>
    <li><strong>Choose a bounded check.</strong> State the input, expected behaviour, constraints and what would make you pause. Do not widen access or scope just to obtain an impressive demonstration.</li>
    <li><strong>Record what changed.</strong> Keep both the result and the limits. Tell someone about a follow-up only if they agreed to hear it, and share only material you may disclose.</li>
   </ol>
   <p>These are MLAI editorial steps, not an experimentally validated community method. Their purpose is to keep a helpful conversation from turning into an unsupported product claim.</p>
   <h2 id="record">Community feedback-to-test record</h2>
   <p>The completed fictional record keeps comments, planned checks and actual evidence separate. Save the editable file for the whole example, an empty copy and a log to use <em>if</em> you later run a test.</p>
   <details id="completed-record" className="rounded-xl border border-slate-300 bg-slate-50 p-5">
    <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Read Priya’s completed fictional record</summary>
    <dl aria-label="Completed fictional feedback-to-test record">{FEEDBACK_FIELDS.map((label, index) => <div key={label} className="my-5"><dt className="font-semibold">{label}</dt><dd className="ml-0 mt-1">{FEEDBACK_COMPLETED[index]}</dd></div>)}</dl>
   </details>
   <p><a href={FEEDBACK_DOWNLOAD} download="mlai-feedback-to-test-record.txt">Download the editable feedback-to-test record (.txt)</a>. No notes are submitted to MLAI, and downloading does not register you for an event.</p>
   <details className="rounded-xl border border-slate-300 p-5">
    <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Copy a blank record without downloading</summary>
    <pre className="whitespace-pre-wrap break-words" aria-label="Community feedback-to-test record">{FEEDBACK_BLANK}</pre>
   </details>
   <p>This on-page record replaces the earlier PDF promotion; the new TXT includes the actual materials promised here. That is not a claim that the historical PDF was broken. Keep real notes private and share only material you have permission to disclose.</p>
   <h2 id="mlai">Bring a question to a relevant MLAI session</h2>
   <p>Have a question like Priya’s? Choose a listed topic and online or in-person format where you can learn or contribute. MLAI publishes this guide and runs events; this is an affiliated invitation. Do not assume attendance includes introductions, customers, funding or a technical review. Check the listing before expecting discussion time; listening is also a valid first step.</p>
   <ArticleEventPreference articlePath={FEEDBACK_PATH} idPrefix="feedback" description="Choose a format to carry to the MLAI calendar, then check the actual session topic, participation format, date, cost and admission requirements. This does not reserve a place." />
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG[FEEDBACK_PATH].conversion!} events={[]} placement="article-inline" />
   <h2 id="programme">A real reported change—and what it does not prove</h2>
   <p>In the transcript on <a href="https://www.csiro.au/en/work-with-us/funding-programs/innovation-programs/on-prime">CSIRO’s ON Prime page</a>, checked 11 September 2026, participant Aaron Elbourne describes arriving with a scientific problem and coming to see a broader potential market and other possible applications. This is an attributable report of changed thinking, not a measured increase in customers or revenue.</p>
   <p>CSIRO publishes the account to describe its own programme. ON Prime provides facilitated customer discovery for research teams; it is not an ordinary meetup or open to every startup. Its stated eligibility requires a team of two to five, including an Australian university or publicly funded research organisation researcher, with all members based in Australia during the programme. Check current conditions directly if considering it.</p>
   <p><strong>Our inference:</strong> ask what assumption changed and what evidence still needs collecting. The transcript does not show that an informal community conversation caused Elbourne’s change, establish an independently verified commercial outcome or demonstrate MLAI’s impact.</p>
   <h2 id="limits">Know when the next step belongs elsewhere</h2>
   <p>If the question requires a legal, financial, privacy or safety determination, seek appropriate professional advice rather than treating peer agreement as permission. If you need someone to deliver work, prepare a scope and discuss a separate engagement; attending a community session does not establish a contractor relationship.</p>
   <p>For an existing business deciding whether to scope an AI workflow, the <Link to="/articles/featured/how-small-business-owners-can-get-started-with-ai-2026">small-business pilot guide</Link> addresses that different task. For deciding whether to commit to a recurring group, use the <Link to="/articles/featured/why-founders-clubs-work-for-early-stage-growth">founders-club participation review</Link>.</p>
   <h2 id="scope">Source and editorial scope</h2>
   <p>The CSIRO source supports its programme description, eligibility and the attributed participant account only. The four-step method, invented conversation, checking exercise and record are MLAI editorial teaching material. No permission-cleared MLAI founder-feedback outcome or independent review of this guide is claimed. A programme testimonial does not establish the effectiveness of this exercise or endorse MLAI.</p>
   <ArticleFAQ items={faqItems} />
   <AuthorBio author={{ name: 'Content Team', role: 'MLAI editorial team', bio: 'This guide distinguishes sourced participant accounts from invented teaching material. The byline is not a claim of independent review or first-hand event participation.' }} />
  </article>
 </div>
}
