import { Home } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
import AuthorBio from '~/components/AuthorBio'

export const useCustomHeader = true
export const CATEGORY = 'featured'
export const SLUG = 'how-modern-technology-affects-education-today-and-in-the-fut'
export const DATE_PUBLISHED = '2025-12-26'
export const DATE_MODIFIED = '2026-09-15'
export const DESCRIPTION = 'Evaluate education technology claims using a dated planning-time trial, Australian sector guidance and a worked caption-review example. Turn future possibilities into questions you can test.'
export const FEATURED_FOCUS = 'ai'
const TITLE = 'Modern technology in education: evidence today and questions for the future'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c64e3c6c-e429-49ad-acb9-ed1a06156751.jpg?alt=media&token=d82a401d-a58e-47e5-ba8d-76025cf5b37b'

export const summaryHighlights = {
 heading: 'Separate a useful feature from a demonstrated educational benefit',
 intro: 'For Australian educators considering a technology proposal: identify the task, the relevant evidence and the decision your institution must make.',
 items: [
  { label: 'Ask what was measured', description: 'A reduction in preparation time does not establish better student learning or savings across a whole school.' },
  { label: 'Keep sectors separate', description: 'Schools guidance, VET assessment responsibilities and a university’s rules are not interchangeable.' },
  { label: 'Treat the future as conditional', description: 'State the benefit you want, the evidence that would support it and what would make you stop.' },
 ],
}

export const faqItems = [
 { id: 1, question: 'Does technology automatically improve learning?', answer: 'No. A feature, policy or successful demonstration is not an outcome study. Specify what learners should be able to do and look for evidence from a comparable task and setting.' },
 { id: 2, question: 'What does the lesson-planning trial show?', answer: 'The cited English trial concerns preparation time for Year 7 and 8 science using ChatGPT plus a guide. It does not supply an Australian student-attainment estimate or a guaranteed saving for your institution.' },
 { id: 3, question: 'Will AI replace teachers in the next few years?', answer: 'This guide does not make a staffing forecast. A tool’s ability to draft text does not establish that it can take responsibility for teaching, assessment or student support.' },
 { id: 4, question: 'Is a four-to-six-week pilot always enough?', answer: 'No. Duration should follow the question, required approvals, learning cycle and evaluation design. A short demonstration cannot establish long-term learning, safety or equitable access.' },
 { id: 5, question: 'Can we upload student work if a tool stores data in Australia?', answer: 'Not on that fact alone. Obtain the institution’s decision about the particular tool, information, purpose and applicable obligations before uploading. Storage location is only one consideration.' },
]

export const articleMeta = {
 title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
 datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
 author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
 imageAlt: 'Illustration of a small robot on a desk with books, headphones and digital devices',
}

export default function ArticleContent() {
 return <div className="bg-transparent">
  <ArticleHeroHeader
   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Education technology evidence', current: true }]}
   title={TITLE} titleHighlight="education" headerBgColor="cyan"
   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
  />
  <div className="prose prose-lg prose-headings:scroll-mt-24 max-w-3xl mx-auto px-4 py-10">
   <p>Modern technology can change how an educational activity is prepared, accessed, completed or assessed. Those are different changes: a caption helps present spoken information in text; a drafting assistant produces material to review; a learning platform distributes work. Whether a particular use improves access, workload or understanding needs its own evidence.</p>
   <p>This guide helps an Australian educator turn a broad proposal into a specific question. It is not a census of technology use, a recommended-products list or a forecast that every classroom will become AI-led. For earlier changes, see the <Link to="/articles/featured/how-technology-has-changed-education">Australian education technology timeline</Link>; for classroom harms and privacy questions, see the <Link to="/articles/featured/how-technology-affects-education-negatively">education technology risk guide</Link>.</p>

   <h2 id="current-evidence">What current guidance and a measured trial actually establish</h2>
   <p>Sources checked 15 September 2026. This is a deliberately small, mixed evidence set, not a systematic review. The three Australian rows describe responsibilities or policy; the English trial measures a particular workload outcome. They cannot be averaged into a score for “technology in education”.</p>
   <p className="text-sm">The source table scrolls horizontally on small screens. Focus it to use the arrow keys.</p>
   <div id="education-evidence-table" role="region" aria-label="Education technology evidence and scope" tabIndex={0} className="overflow-x-auto scroll-mt-24">
    <table className="min-w-[40rem]"><caption>Source, setting, finding and limit</caption><thead><tr><th>Source and period</th><th>Type and setting</th><th>Supported point</th><th>Limit</th></tr></thead><tbody>
     <tr><td><a href="https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools">Australian AI-in-schools framework resource</a>; review endorsed June 2025</td><td>National schools guidance; the landing page describes its purpose and review.</td><td>There is a responsible-use framework for people connected with school education.</td><td>Its existence does not approve a product or measure a learning effect.</td></tr>
     <tr><td><a href="https://www.asqa.gov.au/for-providers/guidance-and-resources-providers/artificial-intelligence-ai-use-in-vocational-education-training-vet/responsible-use">ASQA responsible AI-use guidance</a>; checked September 2026</td><td>VET provider guidance, including oversight and training-product requirements.</td><td>Qualified people retain responsibility for student-affecting decisions; AI use cannot displace required competency evidence.</td><td>This is not permission to replace practical assessment with a generated answer, or guidance for every school.</td></tr>
     <tr><td><a href="https://www.sydney.edu.au/students/assessments.html">University of Sydney assessment guidance</a>; updated 2 June 2026</td><td>One university’s description of secure and open assessments.</td><td>Assessment conditions matter separately from whether course materials are online.</td><td>It is not a survey showing that Australian universities are uniformly hybrid-first.</td></tr>
     <tr><td><a href="https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/choices-in-edtech-using-generative-ai-chatgpt-for-ks3-science-lesson-preparation-2024-teacher-choices-trial">EEF/NFER Teacher Choices trial</a>; 2024</td><td>School-randomised comparison in England; Year 7 and 8 science preparation.</td><td>ChatGPT plus a guide reduced reported preparation time relative to the non-GenAI comparison.</td><td>A workload result is not a student-attainment result or a local Australian saving.</td></tr>
    </tbody></table>
   </div>

   <h2 id="planning-trial">A promising result, with the denominator left attached</h2>
   <p>The EEF project summary reports 259 teachers in 68 English secondary schools. Preparation time averaged 56.2 minutes per week in the ChatGPT group versus 81.5 in the comparison: 25.3 minutes less, approximately 31%. That concerns the selected science preparation, not the entire working week.</p>
   <p>The linked <a href="https://d2tic4wvo1iusb.cloudfront.net/production/documents/projects/chatgpt_in_lesson_planning_-_evaluation_report.pdf">December 2024 evaluation report</a>, executive summary, PDF file pages 5–6, describes weekly diaries and an outcome window in weeks 6–10 after five initial weeks. It reports incomplete diary data excluded 18.5% of enrolled teachers from the primary analysis. A blinded resource review found no evidence of a quality difference; that is not proof of identical quality or improved student attainment.</p>
   <p>Before transferring a result, compare subject, staff experience, approved tools, preparation task and support. A faster first draft can still require substantial checking. Keep setup, verification and correction in a workload estimate rather than reporting generation time alone.</p>

   <h2 id="caption-example">Worked example: a caption exists, but does it preserve the explanation?</h2>
   <p><strong>Invented editorial fixture—not a recording, product test or learner study:</strong> a teacher wants text access to a short explanation. The original script below is written for this example. The two faulty captions are deliberately constructed to show what a review must catch.</p>
   <p><strong>Original script:</strong> “This activity is optional. Do not submit it for a grade. The water sample starts at twenty degrees Celsius.”</p>
   <ol>
    <li><strong>Faulty caption A:</strong> “This activity is optional. Submit it for a grade. The water sample starts at twenty degrees Celsius.” Removing the negation reverses the instruction. The caption fails even though the surrounding words are correct.</li>
    <li><strong>Faulty caption B:</strong> “This activity is optional. Do not submit it for a grade. The water sample starts at twenty degrees Fahrenheit.” The unit is wrong. A spelling check would not establish that the scientific meaning was preserved.</li>
    <li><strong>Reviewed text:</strong> the original script above is the reference for these fixtures. Restoring its words resolves these two errors; it does not test timing, speaker identification, player controls or whether learners can use the eventual resource.</li>
   </ol>
   <p>A useful proposal is therefore “provide accurate, usable text for this explanation”, not “enable AI captions and claim inclusion”. In a real recording, compare with the actual speech; a script alone may differ from what was said. Do not use student recordings or identifiable material for a tool demonstration without the required institutional approval.</p>

   <h2 id="proposal-record">A completed proposal—and a record you can reuse</h2>
   <dl>
    <dt>Task and audience</dt><dd>Fictional staff-only review of one teacher-authored explanation. No learner account, voice recording or student work is used.</dd>
    <dt>Current alternative</dt><dd>Publish the teacher’s reviewed text alongside the explanation using an existing approved system.</dd>
    <dt>Proposed change</dt><dd>Investigate whether assisted caption preparation would improve that process. The invented fixtures above are only a first content check.</dd>
    <dt>Evidence still missing</dt><dd>Actual audio alignment, keyboard and assistive-technology usability, learner needs, total preparation effort and the institution’s tool decision.</dd>
    <dt>Decision now</dt><dd>Keep the approved text route. Do not begin a student pilot or claim improved access from these fixtures. Take the unanswered questions to the institution’s teaching, accessibility and privacy teams.</dd>
   </dl>
   <p>Copy the following into your planning notes. It is a proposal worksheet, not an approved research protocol or a promise of a downloadable classroom kit.</p>
   <pre className="whitespace-pre-wrap break-words" aria-label="Education technology proposal worksheet">{[
    'Specific reader / learner group and educational task:',
    'Problem with the current approach, with existing evidence:',
    'Current non-AI or already-approved alternative:',
    'Proposed change and why it might help:',
    'Supporting source / setting / date / measured outcome:',
    'Important differences between that evidence and this setting:',
    'Tool, account, input material, rights and data destination:',
    'Required institutional decisions and responsible people:',
    'Quality and accessibility checks / serious-error stop condition:',
    'Comparison, outcome definition and missing-data handling:',
    'Setup, review, correction and ongoing workload to count:',
    'Proposed duration and reason / permissions still required:',
    'Decision: keep current approach, investigate, pause or seek approval:',
    'Next evidence, owner and review date:',
   ].join('\n')}</pre>

   <h2 id="future">Future possibilities: replace a prediction with a testable question</h2>
   <ul>
    <li><strong>More tailored feedback:</strong> can learners explain the next problem without the assistant, and what happens when its advice is wrong? A polished answer is not evidence of retained understanding.</li>
    <li><strong>More simulation:</strong> which parts of a task can be rehearsed, and which still require physical performance, supervision or accredited assessment? A simulation should not be assumed to replace a placement.</li>
    <li><strong>More connected learning records:</strong> who accepts the record, under which rules, and can the learner retrieve it in a usable format? Technical portability is different from credit recognition.</li>
   </ul>
   <p>These are possible directions, not a prediction that they will arrive in three to five years. A future claim becomes useful when it names a decision, a constraint and an observation that could disprove it. The <Link to="/articles/featured/how-technology-is-shaping-learning-in-higher-education">higher-education assessment and credit guide</Link> works through two of those decisions for students.</p>

   <h2 id="approval">Resolve approval before collecting information</h2>
   <p><a href="https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/children-and-young-people">OAIC’s education guidance</a> distinguishes institutions: private education is usually covered by the federal Privacy Act; public schools, TAFEs and most universities instead may fall under state or territory privacy laws. ANU and private universities are federal Act exceptions to that general tertiary distinction. Ask the responsible institutional team which obligations apply.</p>
   <p>An Australian storage location, a consent box or a staff-only demonstration is not a complete approval process. Establish what material may be used, who decides, and what safeguards and alternatives are required. This article does not authorise data collection, assessment changes or procurement.</p>
   <p>The source comparison, caption fixtures and worksheet are MLAI editorial work, not new research or independent specialist approval. There is no school-consulting or contractor offer attached to this education resource.</p>
   <ArticleFAQ items={faqItems} />
   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
  </div>
 </div>
}
