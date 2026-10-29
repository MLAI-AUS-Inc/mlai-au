import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Home } from 'lucide-react'

import AuthorBio from '~/components/AuthorBio'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFooterNav } from '~/components/articles/ArticleFooterNav'
import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
import { ArticleCallout } from '~/components/articles/ArticleCallout'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
import { getDefaultArticleAuthorDetails } from '../../authors'

export const useCustomHeader = true
const TOPIC = 'Learn AI in Melbourne: courses, costs and learning pathways'
export const CATEGORY = 'featured'
export const SLUG = 'learn-ai-melbourne'
// Preserve the established public registry date, not the conflicting old module date.
export const DATE_PUBLISHED = '2026-01-28'
export const DATE_MODIFIED = '2026-10-29'
export const DESCRIPTION = 'Compare Melbourne AI courses by goal, fees, prerequisites and workload. Includes 2026–27 provider dates, a dated source check and a downloadable decision record.'
export const FEATURED_FOCUS = 'ai'
const AUTHOR = getDefaultArticleAuthorDetails()
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4'
const HERO_IMAGE_ALT = 'Open laptop and small robotic arm on a desk, with people working in the background.'

export const learningSources = {
  vu: 'https://www.vu.edu.au/courses/graduate-certificate-in-artificial-intelligence-ntai',
  holmesglen: 'https://www.holmesglen.edu.au/explore-courses/computing-and-it/artificial-intelligence/vocational-education/diploma-of-information-technology-cloud-engineering',
  rmit: 'https://shortcourses.rmit.edu.au/products/fs-generative-ai-air116u',
  mbs: 'https://mbs.edu/short-courses/ai-for-business',
} as const

export const summaryHighlights = {
  heading: 'Find your starting point in Melbourne',
  intro: 'Compare business introductions, technical short courses, formal qualifications and local community learning.',
  items: [
    { label: 'What do you want to do next?', description: 'Separate exploring an idea, practising a technical skill and pursuing a qualification. They call for different kinds of learning.' },
    { label: 'Can you meet the prerequisites and workload?', description: 'Check the specific course, not its category. A short course can require more existing technical knowledge than a longer pathway.' },
    { label: 'What should you confirm before committing?', description: 'Get the timetable, your eligibility, total fees, assessment and support arrangements from the provider. Keep unresolved details visible.' },
  ],
}

export const faqItems: { id: number; question: string; answer: ReactNode }[] = [
  { id: 1, question: 'Where can I start learning AI in Melbourne without coding experience?', answer: 'First choose whether you want to understand AI or learn to build with it. Look for a session or foundation pathway that explicitly accepts beginners, and ask what prior skills it assumes. For a free first step, read MLAI’s plain-language AI introduction and write down a question to test at a suitable community session. The four provider examples in this guide have different entry expectations; confirm beginner suitability with the provider.' },
  { id: 2, question: 'Is an online short course the same as a university qualification?', answer: 'Do not treat them as equivalent. Ask what award or credential is issued, how work is assessed and whether any credit is formally available. A shorter or online format does not establish beginner suitability, academic credit or employer recognition.' },
  { id: 3, question: 'How should I compare course fees?', answer: 'Record the fee period, your student/eligibility category and any excluded charges. Add required equipment, software, travel and time commitments separately. A subsidised figure is not an offer of funding to you, and the listed price is not a personalised total.' },
  { id: 4, question: 'Will a course or MLAI event get me a job or paid project?', answer: 'Neither enrolment nor attendance guarantees employment, a contract or an introduction. Use learning to produce evidence you can explain and test. Delivery-ready readers can then consider the separate builder pathway; people still exploring can choose an appropriate event without applying for client work.' },
]

export const articleMeta = {
  title: TOPIC, topic: TOPIC, category: CATEGORY, slug: SLUG,
  description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
  author: AUTHOR.name, image: HERO_IMAGE, imageAlt: HERO_IMAGE_ALT,
}

export const learningDecisionFields = [
  'One thing I want to understand or do:',
  'Why I need it, and whether I need a formal qualification:',
  'Evidence of my current skills, including gaps:',
  'Course/session name and official URL:',
  'Student category and entry requirements confirmed by:',
  'Weekly study, scheduled attendance and travel I can sustain:',
  'Duration, start date, deadline and date checked:',
  'Tuition amount, currency, fee period and eligibility basis:',
  'Extra equipment/software/service/travel costs:',
  'Assessment, feedback, accessibility and catch-up arrangements:',
  'Permitted small project or learning record I will produce:',
  'How I will test/explain it and what it will not demonstrate:',
  'Unanswered question and who can answer it:',
  'Decision: proceed, ask for clarification, choose a foundation step or defer:',
] as const

export default function ArticleContent() {
  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Learning AI in Melbourne', current: true }]}
        title={TOPIC} headerBgColor="cyan" summary={summaryHighlights}
        heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT}
      />
      <ArticleTocPlaceholder />
      <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24">
        <p>
          You can learn AI in Melbourne through a business short course, a technical course, a university or TAFE qualification, or a community session.
          The right choice depends on whether you want to use AI at work, build software, earn a credential or meet people learning alongside you.
          This guide compares specific options and their commitments, checked on <time dateTime={DATE_MODIFIED}>29 October 2026</time>.
        </p>

        <nav aria-label="Choose a learning comparison"><p><a href="#provider-comparison">Compare four course options</a>, <a href="#worked-learning-decision">check a workload decision</a>, or <a href="/downloads/melbourne-ai-learning-decision.txt" download>download the decision record</a>.</p></nav>
        <div role="region" aria-label={"Quick shortlist by goal; confirm eligibility and fee basis in the full comparison"} tabIndex={0} className="min-w-0 max-w-full overflow-x-auto"><table><caption>Quick shortlist by goal; confirm eligibility and fee basis in the full comparison</caption><thead><tr><th>Goal</th><th>Starting route</th><th>Commitment to check</th></tr></thead><tbody>
          <tr><td>Explore without coding</td><td>Free AI introduction and a beginner-suitable community session</td><td>Confirm the session level and ticket separately; no formal qualification implied.</td></tr>
          <tr><td>Business application</td><td>MBS AI for Business</td><td>Two in-person days; November listed tuition A$3,500, with travel/time extra.</td></tr>
          <tr><td>Technical practice</td><td>RMIT Generative AI</td><td>A$1,000; intermediate Python/ML; 48–64 study hours over eight weeks; next intake unconfirmed.</td></tr>
          <tr><td>Formal qualification</td><td>VU graduate certificate or Holmesglen diploma</td><td>Different entry levels and durations; CSP/subsidised fees depend on eligibility and are not full-fee equivalents.</td></tr>
        </tbody></table></div>
        <h2 id="choose-a-learning-task">Choose your starting point</h2>
        <ul>
          <li><strong>New to AI, with no coding experience:</strong> start with our free <Link to="/articles/featured/what-is-artificial-intelligence-in-simple-words">plain-language AI introduction</Link>. Choose one everyday use, check an output against its source and bring a question to a beginner-suitable session. Confirm the level before attending.</li>
          <li><strong>Using AI in a business:</strong> compare an introductory business program such as Melbourne Business School’s AI for Business. Start with one workflow you want to understand; ask about the practical activity and any software requirements.</li>
          <li><strong>Building AI systems:</strong> compare technical prerequisites before duration or price. RMIT’s Generative AI course expects intermediate Python and prior ML/LLM knowledge. Try a small Python exercise first if you are unsure of your starting level.</li>
          <li><strong>Seeking a qualification:</strong> compare VU’s graduate certificate with Holmesglen’s broader cloud/AI diploma. Check admission, units, assessment and timetable against your goal. For a career goal, also read the <Link to="/articles/featured/how-to-get-data-science-job">Australian data science job guide</Link>.</li>
        </ul>

        <h2 id="provider-comparison">Melbourne AI courses compared — checked 29 October 2026</h2>
        <p>
          These four examples cover different learning goals and formats. We checked official provider pages for the details below;
          we have not ranked or attended all four courses. The descriptions establish what was advertised, not teaching quality or employment outcomes.
        </p>
        <ArticleCallout title="A dated snapshot, not live availability" variant="info">
          Fees and intakes were rechecked on 29 October 2026. Confirm places, your student category, timetable and written fee quote with the provider.
          Where the next date or fee could not be confirmed, it is marked below rather than carrying forward an old intake or price.
        </ArticleCallout>
        <p className="text-sm">On a small screen, scroll the table sideways to compare fees, entry requirements and dates.</p>
        <div role="region" aria-label="Dated Melbourne AI course comparison" tabIndex={0} className="overflow-x-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700">
          <table className="min-w-[900px] w-full [&_th]:align-top [&_td]:align-top">
            <caption className="text-left text-sm">Australian/local-student page observations. Short-course prices and subsidised qualification contributions have different bases.</caption>
            <thead><tr><th scope="col">Course and learner</th><th scope="col">Entry check</th><th scope="col">Mode and duration</th><th scope="col">Published fee information</th><th scope="col">Next date shown at this check</th></tr></thead>
            <tbody>
              <tr>
                <th scope="row"><a href={learningSources.mbs}>Melbourne Business School: AI for Business</a><br /><span className="font-normal">Business introduction</span></th>
                <td>Designed for executives, managers and decision-makers. Ask about preparation and software; the page does not specify a coding prerequisite.</td>
                <td>Carlton, in person; two days.</td>
                <td>A$3,500 including GST for the November 2026 session. March 2027 is listed at A$3,950; confirm that intake’s inclusions.</td>
                <td>25–26 November 2026, with an enquiry link. Also lists 10–11 March 2027. Confirm availability before booking.</td>
              </tr>
              <tr>
                <th scope="row"><a href={learningSources.rmit}>RMIT Short Courses: Generative AI (with Udacity)</a><br /><span className="font-normal">Technical short course</span></th>
                <td>Intermediate Python, basic ML/LLM knowledge and practical prompting experience—not a no-coding introduction.</td>
                <td>Online; eight weeks; six to eight study hours per week.</td>
                <td>A$1,000 including GST. Confirm software/API costs and support conditions.</td>
                <td>Upcoming dates to be announced. The page offers a notification option; no next intake or closing date is confirmed.</td>
              </tr>
              <tr>
                <th scope="row"><a href={learningSources.vu}>Victoria University: Graduate Certificate in Artificial Intelligence (NTAI)</a><br /><span className="font-normal">Postgraduate qualification</span></th>
                <td>Relevant bachelor-level qualification, or consideration of at least three years of approved work experience. Minimum eligibility does not guarantee admission.</td>
                <td>City Campus; in person; half a year full-time.</td>
                <td>Commonwealth supported place advertised. The 2027 indicative full-time contribution is A$4,940 per semester for eligible CSP students, excluding materials and SSAF. Unit selection changes the total; request your actual quote.</td>
                <td>15 February 2027 start; applications close 7 February 2027. Later 2027 intakes also listed. Dates may change or close early.</td>
              </tr>
              <tr>
                <th scope="row"><a href={learningSources.holmesglen}>Holmesglen: Diploma of Information Technology (Cloud Engineering), ICT50220</a><br /><span className="font-normal">Vocational cloud/AI qualification</span></th>
                <td>Minimum age 17 and basic computer skills; pre-training/literacy/numeracy assessment. Check device requirements.</td>
                <td>Chadstone or live online; mixed/on-campus delivery; one year full-time or two part-time.</td>
                <td>Indicative tuition: A$15,810 full fee or A$8,823 government-subsidised, subject to eligibility. Listed service fee A$85 per semester. Confirm tuition fee period, total and extra equipment costs.</td>
                <td>No dated intake was visible in the checked listing. Ask the provider for the next start and application deadline.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Holmesglen’s course includes cloud, AI and IoT content; it is broader than an AI short course.
          RMIT’s shorter duration still requires technical preparation. MBS focuses on business application, while VU offers a formal postgraduate award.
          Compare the learning goal and starting skills before comparing prices.
        </p>

        <h2 id="check-the-total-commitment">Check the total commitment, not just the headline price</h2>
        <p>
          Put tuition, compulsory charges, equipment, paid software/API access, travel and scheduled attendance on separate lines.
          Ask whether the quote covers a semester, unit, whole course or particular intake. Record which student category and subsidy assumptions it uses.
          Do not compare an eligible-student contribution with another provider's full fee as if both were your final price.
        </p>
        <p>
          Ask when live sessions and assessments occur, what feedback you receive, how long learning materials remain accessible, and what happens if you miss a session.
          If you need captions, accessible materials, assistive-technology compatibility or a different assessment arrangement, ask about the specific provision before committing.
          A label such as online does not answer those questions.
        </p>
        <blockquote>
          I want to learn [task]. I can currently [skills/evidence] and have [hours] available each week.
          Could you confirm the prerequisite gap, required attendance, assessment/feedback, total cost for my circumstances and the next applicable intake?
        </blockquote>

        <h2 id="worked-learning-decision">Worked example: a course can fit the topic but not the learner yet</h2>
        <p>
          <strong>Fictional planning example, not a learner testimonial:</strong> Rina wants to understand how document-answering systems are tested.
          She can edit a simple script, has not studied ML, and has four study hours per week. She does not currently need a formal qualification.
        </p>
        <ol>
          <li><strong>Task:</strong> explain one incorrect answer and how to check it, before attempting a larger system.</li>
          <li><strong>Prerequisite gap:</strong> basic script editing does not establish the intermediate Python and ML knowledge in the RMIT example. Rina asks the provider what preparation it expects.</li>
          <li><strong>Capacity gap:</strong> four hours across eight weeks gives 32 hours. The listed six-to-eight-hour range implies 48–64 hours: a 16–32-hour gap, before any extra catch-up or setup.</li>
          <li><strong>Qualification decision:</strong> she does not choose a longer qualification just because it mentions AI. If that goal changes, she will ask about admission and the actual part-time timetable.</li>
          <li><strong>Next step:</strong> choose a clearly beginner-suitable session if one is available, keep a small learning record and reassess after clarifying prerequisites. Deferring enrolment is a valid outcome.</li>
        </ol>
        <p>
          This comparison does not predict completion time or recommend a particular course for Rina. It shows why a relevant topic and affordable listed fee are insufficient without a workload and starting-skill check.
        </p>

        <h2 id="learning-evidence">Make the learning visible without inventing portfolio claims</h2>
        <p>
          Choose one permitted example small enough to inspect. For a non-coding start, take a public AI claim, record its source and write down what evidence would be needed to test it.
          For a technical activity, use synthetic or appropriately licensed data and record the behaviour you expected, the result and a failure case.
          Do not publish private class materials, client data or other people's work without permission.
        </p>
        <ul>
          <li><strong>Scope:</strong> name one task, its input/output and what is deliberately excluded.</li>
          <li><strong>Provenance:</strong> identify sources and data permissions; label fictional examples and generated material.</li>
          <li><strong>Your decisions:</strong> if you use AI coding tools, record what they proposed, what you accepted or rejected and why.</li>
          <li><strong>Checks:</strong> include the expected result, an observed result and a failure or uncertainty. Generated tests are not evidence until you run and inspect them.</li>
          <li><strong>Safety boundary:</strong> identify sensitive information and actions the prototype must not take. A learning demo need not connect to real accounts.</li>
          <li><strong>Handover:</strong> explain how another person can inspect or reproduce the work, its dependencies and unresolved limits.</li>
        </ul>
        <p>
          This is MLAI's editorial learning-record checklist, not a researched employer preference, accredited assessment or delivery approval.
          Do not turn a hypothetical improvement into a measured achievement. If you are already using AI coding tools to ship tested, explainable software,
          use the <Link to="/articles/featured/best-way-to-learn-about-ai-2026">builder guide and its conditional Studio application pathway</Link> to assess your next step.
          A course completion alone does not establish readiness for client work.
        </p>

        <h2 id="learning-decision-record">Copyable course and learning decision record</h2>
        <p>Copy these fourteen fields into your own notes, or <a href="/downloads/melbourne-ai-learning-decision.txt" download>download the editable record with the Rina example</a>. No account is required.</p>
        <pre className="whitespace-pre-wrap break-words text-sm" aria-label="Course and learning decision record">{learningDecisionFields.map((field) => field + '\n').join('\n')}</pre>
        <p>
          Mark unknowns as unknown rather than filling them with an estimate. Compare options only after essential constraints are confirmed.
          Keep the provider link and date with each answer so you can distinguish the provider's current terms from an earlier snapshot.
        </p>

        <h2 id="bring-a-learning-question">Learn with Melbourne’s AI community</h2>
        <p>
          A discussion, demonstration or hackathon can help you test an idea and find learning peers.
          It is not a substitute for a qualification. MLAI runs community activities, not the provider courses compared above.
          Ask about prerequisites and what you will actually do; an engineering event title does not establish beginner suitability.
        </p>
        <p>For the next available session, use the <Link to="/events">current MLAI calendar</Link> and <Link to="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne AI event guide</Link>. Check the listing’s date, prerequisites, ticket and admission before committing.</p>
        <details className="my-6 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Historical listing observations from 25 October 2026</summary>
        <p><strong>Two dated examples checked on 25 October 2026:</strong></p>
        <ul>
          <li><a href="https://luma.com/mlai-c122">AI Engineer Night Melbourne #2</a> — 29 October, 6–9 pm AEDT, at Stone &amp; Chalk Melbourne. The public listing showed full/waitlist at the check. Topic and experience-level detail were limited; ask the organiser if you need a beginner introduction.</li>
          <li><a href="https://luma.com/strangerbuilds-mel">Stranger Builds Melbourne</a> — 31 October 2026, an in-person build day followed by seven days online to ship. The listing showed approval-required ticket options; early-bird tickets were sold out. Check the ticket price, requirements and confirmed location on the organiser’s page.</li>
        </ul>
        <p>
          These are historical observations of the listings, not live admission status. For dates after these sessions, use the <Link to="/events">current MLAI calendar</Link>{' '}
          and the <Link to="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne AI event guide</Link>.
          Before attending, write one question you want answered; afterwards, record one thing you learned and one small next step.
        </p>
        </details>
        <h2 id="first-step">Choose one action this week</h2>
        <p>
          A beginner can check one AI answer against a public source. A technical learner can run one small exercise and explain a failure.
          A qualification seeker can compare the entry rules and timetable for two courses. Someone exploring a data career can use our <Link to="/articles/featured/how-to-get-data-science-job">skills, portfolio and application guide</Link>{' '}
          to connect learning with a specific role. Keep the course decision worksheet above so you can compare the answers you receive.
        </p>
        <ArticleConversionCTA articleSlug="featured/learn-ai-melbourne" config={BASE_ARTICLE_SEO_CONFIG['/articles/featured/learn-ai-melbourne'].conversion!} events={[]} placement="article-inline" />
      </div>
      <ArticleFAQ items={faqItems} />
      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
      <ArticleFooterNav />
    </>
  )
}
