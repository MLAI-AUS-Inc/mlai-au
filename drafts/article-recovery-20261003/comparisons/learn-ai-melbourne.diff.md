# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/learn-ai-melbourne.tsx
+++ unreviewed-local-draft/app/articles/content/featured/learn-ai-melbourne.tsx
@@ -1,299 +1,226 @@
 import type { ReactNode } from 'react'
 import { Link } from 'react-router'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
-
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
-import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
+
+import AuthorBio from '~/components/AuthorBio'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFooterNav } from '~/components/articles/ArticleFooterNav'
+import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
+import { ArticleCallout } from '~/components/articles/ArticleCallout'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
 import { getDefaultArticleAuthorDetails } from '../../authors'

-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
-
-const TOPIC = 'Learn AI Melbourne'
-export const CATEGORY = 'australian-ai-ecosystem'
+const TOPIC = 'Learn AI in Melbourne: compare courses and choose a first step'
+export const CATEGORY = 'featured'
 export const SLUG = 'learn-ai-melbourne'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-30'
-export const DATE_MODIFIED = '2026-01-30'
-export const DESCRIPTION = 'A practical 2026 guide to learning AI in Melbourne—compare university and TAFE options, online vs on-campus delivery, expected duration and costs, plus local meetups and portfolio tips.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4"
-const HERO_IMAGE_ALT = 'Learners collaborating at an AI workshop in Melbourne'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
-
-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
-}
-
-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'Where can I learn AI in Melbourne?',
-    answer:
-      <>Universities and TAFE providers in Melbourne offer AI-related study, alongside short courses. Examples include Victoria University (graduate certificate) and Holmesglen (TAFE/short courses). Always confirm current availability and entry requirements on the provider’s site.</>,
-  },
-  {
-    id: 2,
-    question: 'Do I need to know Python before I start?',
-    answer:
-      <>Many beginner short courses assume no prior coding. University-level programs often expect foundational programming (commonly Python) and maths. If you are new, start with an intro to Python and basic linear algebra to prepare.</>,
-  },
-  {
-    id: 3,
-    question: 'How long do AI courses take?',
-    answer:
-      <>Short courses can run from a few weeks to a couple of months. Graduate certificates often take 6–12 months part-time, while bachelor’s degrees typically span three years or more. Delivery and pace vary by provider.</>,
-  },
-  {
-    id: 4,
-    question: 'Is online study available?',
-    answer:
-      <>Yes. Many Melbourne providers offer online or hybrid delivery. Check each course page for the latest mode options, campus locations, and timetables.</>,
-  },
-  {
-    id: 5,
-    question: 'How much does it cost to learn AI?',
-    answer:
-      <>Costs vary widely by provider and level. Short courses range from low-cost community offerings to premium bootcamps. TAFE and university programs are typically in the thousands of dollars per unit/semester. Check the provider for fees and any government support options (e.g., FEE-HELP eligibility).</>,
-  },
-  {
-    id: 6,
-    question: 'How do I get hands-on experience?',
-    answer:
-      <>Build small projects, join local meetups and hack nights, contribute to open-source, and share your work publicly (e.g., GitHub or a short blog post). A portfolio of practical projects is highly valued by Melbourne employers.</>,
-  },
-]
-
-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
+// Preserve the established public registry date, not the conflicting old module date.
+export const DATE_PUBLISHED = '2026-01-28'
+export const DATE_MODIFIED = '2026-09-10'
+export const DESCRIPTION = 'Compare three dated Melbourne AI study options by entry requirements, delivery, time and fees, then use a worked example and worksheet to choose your next learning step.'
+export const FEATURED_FOCUS = 'ai'
+const AUTHOR = getDefaultArticleAuthorDetails()
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4'
+const HERO_IMAGE_ALT = 'Open laptop and small robotic arm on a desk, with people working in the background.'
+
+export const learningSources = {
+  vu: 'https://www.vu.edu.au/courses/graduate-certificate-in-artificial-intelligence-ntai',
+  holmesglen: 'https://www.holmesglen.edu.au/explore-courses/computing-and-it/artificial-intelligence/vocational-education/diploma-of-information-technology-cloud-engineering',
+  rmit: 'https://shortcourses.rmit.edu.au/products/fs-generative-ai-air116u',
+} as const
+
 export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Choose a learning route that fits your starting skills, time and goals. Check the provider’s current prerequisites, delivery mode and fees before enrolling.",
+  heading: 'Choose a learning step you can actually take',
+  intro: 'For Melbourne learners exploring AI, not a ranking of providers or a promise of employment.',
   items: [
-    { label: 'Where can I study AI in Melbourne?', description: 'Universities and TAFE (e.g., Victoria University, Holmesglen) plus short courses and bootcamps; confirm current intakes on provider sites.' },
-    { label: 'How long do AI courses take?', description: 'Short courses: weeks; grad certs: 6–12 months part‑time; bachelor’s degrees: 3+ years. Timelines vary by provider.' },
-    { label: 'Do I need coding or maths first?', description: 'Beginner short courses often require none; university programs usually expect Python and maths (algebra, probability).' },
+    { label: 'What do you want to do next?', description: 'Separate exploring an idea, practising a technical skill and pursuing a qualification. They call for different kinds of learning.' },
+    { label: 'Can you meet the prerequisites and workload?', description: 'Check the specific course, not its category. A short course can require more existing technical knowledge than a longer pathway.' },
+    { label: 'What should you confirm before committing?', description: 'Get the timetable, your eligibility, total fees, assessment and support arrangements from the provider. Keep unresolved details visible.' },
   ],
 }

-/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
+export const faqItems: { id: number; question: string; answer: ReactNode }[] = [
+  { id: 1, question: 'Where can I start learning AI in Melbourne without coding experience?', answer: 'First choose whether you want to understand AI or learn to build with it. Look for a session or foundation pathway that explicitly accepts beginners, and ask what prior skills it assumes. The three providers compared in this guide have different entry expectations; none should be assumed suitable merely because it includes AI in its description.' },
+  { id: 2, question: 'Is an online short course the same as a university qualification?', answer: 'Do not treat them as equivalent. Ask what award or credential is issued, how work is assessed and whether any credit is formally available. A shorter or online format does not establish beginner suitability, academic credit or employer recognition.' },
+  { id: 3, question: 'How should I compare course fees?', answer: 'Record the fee period, your student/eligibility category and any excluded charges. Add required equipment, software, travel and time commitments separately. A subsidised figure is not an offer of funding to you, and the listed price is not a personalised total.' },
+  { id: 4, question: 'Will a course or MLAI event get me a job or paid project?', answer: 'Neither enrolment nor attendance guarantees employment, a contract or an introduction. Use learning to produce evidence you can explain and test. Delivery-ready readers can then consider the separate builder pathway; people still exploring can choose an appropriate event without applying for client work.' },
+]
+
 export const articleMeta = {
-  title: `${TOPIC} (2026)`,
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
+  title: TOPIC, topic: TOPIC, category: CATEGORY, slug: SLUG,
+  description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+  author: AUTHOR.name, image: HERO_IMAGE, imageAlt: HERO_IMAGE_ALT,
 }

-/** ===== References (optional) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://www.holmesglen.edu.au/explore-courses/computing-and-it/artificial-intelligence',
-    title: 'Artificial Intelligence Courses in Melbourne',
-    publisher: 'Holmesglen Institute',
-    description: 'Overview of AI-related study options and information from Holmesglen.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://www.vu.edu.au/courses/graduate-certificate-in-artificial-intelligence-ntai',
-    title: 'Graduate Certificate in Artificial Intelligence',
-    publisher: 'Victoria University',
-    description: 'Course structure, entry requirements and delivery details for VU’s graduate certificate.',
-    category: 'guide',
-  },
-]
-
-/**
- * ARTICLE CONTENT COMPONENT
- *
- * This component is dynamically imported by the route handler and rendered
- * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
- */
+export const learningDecisionFields = [
+  'One thing I want to understand or do:',
+  'Why I need it, and whether I need a formal qualification:',
+  'Evidence of my current skills, including gaps:',
+  'Course/session name and official URL:',
+  'Student category and entry requirements confirmed by:',
+  'Weekly study, scheduled attendance and travel I can sustain:',
+  'Duration, start date, deadline and date checked:',
+  'Tuition amount, currency, fee period and eligibility basis:',
+  'Extra equipment/software/service/travel costs:',
+  'Assessment, feedback, accessibility and catch-up arrangements:',
+  'Permitted small project or learning record I will produce:',
+  'How I will test/explain it and what it will not demonstrate:',
+  'Unanswered question and who can answer it:',
+  'Decision: proceed, ask for clarification, choose a foundation step or defer:',
+] as const
+
 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
   return (
     <>
-      {/* Hero header (custom) */}
       <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: '/articles' },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
+        breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Learning AI in Melbourne', current: true }]}
+        title={TOPIC} headerBgColor="cyan" summary={summaryHighlights}
+        heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT}
       />
-
-      {/* Table of contents placeholder */}
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none">
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> – A practical overview for anyone in Melbourne deciding between university, TAFE and short courses, plus where to meet people and build real projects. Wherever you start, aim to produce a small, public piece of work within your first month.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Learning pathways in Melbourne range from university and TAFE to short courses and community-led meetups."
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'Make smart choices about AI upskilling and build portfolio demos that matter.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'Map a path from beginner to job-ready with clear, achievable milestones.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'Run workshops, study groups, or hack nights that help people learn together.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        <h2>Where to study AI in Melbourne (universities, TAFE, and short courses)</h2>
-        <p>
-          Melbourne learners typically choose from three routes: university programs (from graduate certificates to degrees), TAFE/vocational training, and short courses/bootcamps. University options suit those seeking rigorous foundations and recognised credentials. TAFE and vocational routes emphasise practical job skills. Short courses are fastest to start and can help you test interest or upskill quickly. As at January 2026, providers such as Victoria University (graduate certificate) and Holmesglen (TAFE/short courses) list AI-related options—confirm details directly on each provider’s site.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          Pick the smallest credible study path that gets you building useful projects quickly. Credentials signal capability; portfolios demonstrate it.
-        </QuoteBlock>
-
-        <h2>Typical entry requirements (maths, coding, and work experience)</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-15edf82c-e3e1-4170-80bc-03180c83a560.jpg?alt=media&token=f4094232-5912-410f-9d31-3b0cf18884a0" alt="Group of diverse professionals collaborating in a retro tech startup environment, showcasing coding and maths skills." className="w-full rounded-lg my-8" />
-
-        <p>
-          Entry varies by level. Graduate certificates often expect prior study or industry experience, basic programming (commonly Python), and comfort with maths (linear algebra, probability). TAFE and many short courses allow beginners, sometimes offering bridging content. If you’re new to programming, start with a short Python primer and a quick refresher on algebra and statistics before enrolling in heavier AI subjects.
-        </p>
-
-        <h2>On‑campus vs online: how Melbourne providers deliver AI courses</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e423c07c-3bd4-45cf-a082-8ae5b409dee3.jpg?alt=media&token=8a4d8d73-2dd8-4048-bfa5-c68251e4ce2a" alt="People collaborate in a retro tech environment, discussing AI course options at Melbourne providers." className="w-full rounded-lg my-8" />
-
-        <p>
-          Most providers now support online, on‑campus, or hybrid delivery. Online study offers flexibility; on‑campus time gives access to labs, peers, and face‑to‑face support. Check the latest course page for campus locations, mode, and timetables. If you work full‑time, choose asynchronous options or evening classes; if you learn best with peers, prioritise in‑person sessions.
-        </p>
-
-        <h2>How long it takes and what it costs (2026 snapshot)</h2>
-        <p>
-          Timelines: short courses (weeks to a few months); graduate certificates (6–12 months part‑time); bachelor’s degrees (3+ years). Fees vary widely—short courses range from affordable intros to premium intensives; vocational and university programs are typically in the thousands per term or unit. Always verify current fees, intake dates, and any available support (e.g., eligibility for government loan schemes) on the provider’s site.
-        </p>
-
-        <h2>Choosing a course: a simple decision framework</h2>
-        <p>
-          First, define what you need in the next 6–12 months: a recognised credential, faster upskilling, or a career switch. Second, assess your baseline (maths, Python, data skills). Third, shortlist 2–3 providers that match your mode, budget, and timeline. Finally, compare syllabi and outcomes against a small project you want to build.
-        </p>
-
-        <ArticleStepList
-          title="Step-by-step actions"
-          steps={[
-            { label: 'Define your immediate goal (credential, upskilling, or switch).' },
-            { label: 'Check entry requirements and delivery mode for 2–3 Melbourne providers.' },
-            { label: 'Start a small project (e.g., a simple model or AI-enabled app) and iterate weekly.' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Treat every subject or short course as fuel for one portfolio project. Ship a tiny improvement each week and write two paragraphs explaining what you learned.
-        </QuoteBlock>
-
-        <h2>Learn beyond the classroom: meetups, hack nights, and community</h2>
-        <p>
-          Melbourne’s AI community is active and welcoming. Join meetups, hack nights, and study groups to learn faster and find collaborators. MLAI is a not‑for‑profit community supporting Australian AI practitioners and learners—if you’re keen to connect with locals, <Link to="/contact" className="underline underline-offset-4">get in touch</Link>.
-        </p>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Build a portfolio that Melbourne employers recognise</h2>
-        <p>
-          Focus on small, real problems. Examples: a demand‑forecasting notebook for a local dataset, a retrieval‑augmented chatbot for public documents, or a computer‑vision demo on open images. Publish your code, add a README with metrics and limits, and write a short reflection. Two or three tidy, honest projects beat a long list of half‑finished experiments.
-        </p>
-
-        <h2>Next steps</h2>
-        <p>
-          Pick a learning path, start a tiny project this week, and plug into the community. For a broader view of the local landscape, explore our Australian AI ecosystem content and stay close to events and peers.
-        </p>
-        <p>
-          Tip: you can also browse our pillar overview at{' '}
-          <Link to="/articles" className="underline underline-offset-4">Australian AI ecosystem</Link> for related guides.
-        </p>
+      <ArticleTocPlaceholder />
+      <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24">
+        <p>
+          If you are curious about AI but unsure what to study, start with the next thing you want to understand or do—not a course title.
+          You might want to question an AI demonstration, write your first small program, or earn a qualification for a specific purpose.
+          This guide helps you shortlist a Melbourne or online learning option and identify what to ask before spending time or money.
+        </p>
+        <p>
+          It is for learners making that decision, not a list of employers or a route to guaranteed work.
+          If you already know you want to build and test software, the <Link to="/articles/featured/best-way-to-learn-about-ai-2026">AI builder learning guide</Link> covers a practical delivery exercise.
+          This page instead focuses on comparing provider requirements with your starting point.
+        </p>
+
+        <h2 id="choose-a-learning-task">Choose the task before the course</h2>
+        <ul>
+          <li><strong>Understand AI in everyday work:</strong> look for an introductory explanation or demonstration with time for questions. Check whether coding is expected.</li>
+          <li><strong>Practise a technical skill:</strong> look for an assessed activity you can describe, such as testing a small text classifier. Ask what code and data skills you need before day one.</li>
+          <li><strong>Pursue a qualification:</strong> check the exact award, admission pathway, units and assessment. Confirm any credit arrangements directly; do not infer them from a course badge.</li>
+          <li><strong>Find learning peers:</strong> choose a suitably described event or study group. That supports participation; it does not replace a course's curriculum or assessment.</li>
+        </ul>
+
+        <h2 id="provider-comparison">Three provider examples, checked 10 September 2026</h2>
+        <p>
+          These examples illustrate three different formats: a Melbourne postgraduate course, a vocational cloud/AI pathway and an online technical short course from a Melbourne university.
+          They were included because their official pages exposed comparison details—not because MLAI has ranked, attended or validated the courses.
+          This is not an exhaustive directory. Provider descriptions establish what was advertised, not teaching quality or employment outcomes.
+        </p>
+        <ArticleCallout title="A dated snapshot, not live availability" variant="info">
+          The listed intakes and prices were observed on 10 September 2026. They are not an Open or Upcoming status.
+          Follow the official course link and reconfirm your own eligibility, timetable and written fee quote before applying. Do not assume that places remain available.
+        </ArticleCallout>
+        <div role="region" aria-label="Dated Melbourne AI course comparison" tabIndex={0} className="overflow-x-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700">
+          <table className="min-w-[1000px]">
+            <caption className="text-left text-sm">Official Australian/local-student page observations; courses are not interchangeable.</caption>
+            <thead><tr><th scope="col">Course and source</th><th scope="col">Entry check</th><th scope="col">Mode and duration</th><th scope="col">Published fee information</th><th scope="col">Intake shown in the snapshot</th></tr></thead>
+            <tbody>
+              <tr>
+                <th scope="row"><a href={learningSources.vu}>Victoria University: Graduate Certificate in Artificial Intelligence (NTAI)</a></th>
+                <td>Relevant bachelor-level qualification, or consideration of at least three years of approved work experience. Minimum eligibility does not guarantee admission.</td>
+                <td>City Campus; in person; half a year full-time.</td>
+                <td>2026 indicative CSP contribution: A$4,769 per semester for eligible students. Materials and student-services charges excluded; non-CSP fees differ.</td>
+                <td>28 September 2026 start; 20 September application deadline. Dates can change or close early.</td>
+              </tr>
+              <tr>
+                <th scope="row"><a href={learningSources.holmesglen}>Holmesglen: Diploma of Information Technology (Cloud Engineering), ICT50220</a></th>
+                <td>Provider minimum age 17, basic computer skills and pre-training/literacy/numeracy assessment. Check equipment and remote-study requirements.</td>
+                <td>Chadstone/remote options; mixed or on-campus delivery; one year full-time or two part-time.</td>
+                <td>Listed tuition: $15,198 full fee or $8,466 government-subsidised, subject to eligibility. Extra service/equipment charges; request the applicable fee period and total.</td>
+                <td>February and July displayed; exact start date, year and application deadline require confirmation.</td>
+              </tr>
+              <tr>
+                <th scope="row"><a href={learningSources.rmit}>RMIT Short Courses: Generative AI (with Udacity)</a></th>
+                <td>Intermediate Python, basic ML/LLM knowledge and practical prompting experience—not a no-coding introduction.</td>
+                <td>Online; eight weeks; six to eight study hours per week.</td>
+                <td>A$1,000 including GST displayed for the selected intake. Confirm any required software/API costs and support conditions.</td>
+                <td>12 October 2026 selected in the course page. No closing date established in this check.</td>
+              </tr>
+            </tbody>
+          </table>
+        </div>
+        <p>
+          The Holmesglen example is a broader cloud-engineering qualification with AI content, not simply a short AI introduction.
+          The RMIT example assumes technical experience despite its shorter duration. For VU, use the admission and study-load details rather than assuming that any graduate certificate fits around full-time work.
+          These are fit questions, not a recommendation to enrol in one provider over another.
+        </p>
+
+        <h2 id="check-the-total-commitment">Check the total commitment, not just the headline price</h2>
+        <p>
+          Put tuition, compulsory charges, equipment, paid software/API access, travel and scheduled attendance on separate lines.
+          Ask whether the quote covers a semester, unit, whole course or particular intake. Record which student category and subsidy assumptions it uses.
+          Do not compare an eligible-student contribution with another provider's full fee as if both were your final price.
+        </p>
+        <p>
+          Ask when live sessions and assessments occur, what feedback you receive, how long learning materials remain accessible, and what happens if you miss a session.
+          If you need captions, accessible materials, assistive-technology compatibility or a different assessment arrangement, ask about the specific provision before committing.
+          A label such as online does not answer those questions.
+        </p>
+        <blockquote>
+          I want to learn [task]. I can currently [skills/evidence] and have [hours] available each week.
+          Could you confirm the prerequisite gap, required attendance, assessment/feedback, total cost for my circumstances and the next applicable intake?
+        </blockquote>
+
+        <h2 id="worked-learning-decision">Worked example: a course can fit the topic but not the learner yet</h2>
+        <p>
+          <strong>Fictional planning example, not a learner testimonial:</strong> Rina wants to understand how document-answering systems are tested.
+          She can edit a simple script, has not studied ML, and has four study hours per week. She does not currently need a formal qualification.
+        </p>
+        <ol>
+          <li><strong>Task:</strong> explain one incorrect answer and how to check it, before attempting a larger system.</li>
+          <li><strong>Prerequisite gap:</strong> basic script editing does not establish the intermediate Python and ML knowledge in the RMIT example. Rina asks the provider what preparation it expects.</li>
+          <li><strong>Capacity gap:</strong> four hours across eight weeks gives 32 hours. The listed six-to-eight-hour range implies 48–64 hours: a 16–32-hour gap, before any extra catch-up or setup.</li>
+          <li><strong>Qualification decision:</strong> she does not choose a longer qualification just because it mentions AI. If that goal changes, she will ask about admission and the actual part-time timetable.</li>
+          <li><strong>Next step:</strong> choose a clearly beginner-suitable session if one is available, keep a small learning record and reassess after clarifying prerequisites. Deferring enrolment is a valid outcome.</li>
+        </ol>
+        <p>
+          This comparison does not predict completion time or recommend a particular course for Rina. It shows why a relevant topic and affordable listed fee are insufficient without a workload and starting-skill check.
+        </p>
+
+        <h2 id="learning-evidence">Make the learning visible without inventing portfolio claims</h2>
+        <p>
+          Choose one permitted example small enough to inspect. For a non-coding start, take a public AI claim, record its source and write down what evidence would be needed to test it.
+          For a technical activity, use synthetic or appropriately licensed data and record the behaviour you expected, the result and a failure case.
+          Do not publish private class materials, client data or other people's work without permission.
+        </p>
+        <ul>
+          <li><strong>Scope:</strong> name one task, its input/output and what is deliberately excluded.</li>
+          <li><strong>Provenance:</strong> identify sources and data permissions; label fictional examples and generated material.</li>
+          <li><strong>Your decisions:</strong> if you use AI coding tools, record what they proposed, what you accepted or rejected and why.</li>
+          <li><strong>Checks:</strong> include the expected result, an observed result and a failure or uncertainty. Generated tests are not evidence until you run and inspect them.</li>
+          <li><strong>Safety boundary:</strong> identify sensitive information and actions the prototype must not take. A learning demo need not connect to real accounts.</li>
+          <li><strong>Handover:</strong> explain how another person can inspect or reproduce the work, its dependencies and unresolved limits.</li>
+        </ul>
+        <p>
+          This is MLAI's editorial learning-record checklist, not a researched employer preference, accredited assessment or delivery approval.
+          Do not turn a hypothetical improvement into a measured achievement. If you are already using AI coding tools to ship tested, explainable software,
+          use the <Link to="/articles/featured/best-way-to-learn-about-ai-2026">builder guide and its conditional Studio application pathway</Link> to assess your next step.
+          A course completion alone does not establish readiness for client work.
+        </p>
+
+        <h2 id="learning-decision-record">Copyable course and learning decision record</h2>
+        <p>Copy this into your own notes for each option. All fourteen fields are available here; no download or sign-up is required.</p>
+        <pre className="whitespace-pre-wrap break-words text-sm" aria-label="Course and learning decision record">{learningDecisionFields.map((field) => field + '\n').join('\n')}</pre>
+        <p>
+          Mark unknowns as unknown rather than filling them with an estimate. Compare options only after essential constraints are confirmed.
+          Keep the provider link and date with each answer so you can distinguish the provider's current terms from an earlier snapshot.
+        </p>
+
+        <h2 id="bring-a-learning-question">Bring one learning question to an appropriate event</h2>
+        <p>
+          A useful first question might be: “What prerequisite did you wish you had before trying this?” or “Can you show an example that failed and how you checked it?”
+          Ask only where conversation fits the session; speakers and attendees have not agreed to provide course advice or review your project.
+          Read the listing for topic, level, format, accessibility and location or online access before registering.
+        </p>
+        <p>
+          An event is not a substitute for a qualification or a promise of a job. MLAI runs community activities, not the provider courses compared above.
+          For local discovery, use the <Link to="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne AI event guide</Link>.
+          If no suitable session is listed, do not register for an unrelated one just to complete this plan.
+        </p>
+        <ArticleConversionCTA articleSlug="featured/learn-ai-melbourne" config={BASE_ARTICLE_SEO_CONFIG['/articles/featured/learn-ai-melbourne'].conversion!} events={[]} placement="article-inline" />
       </div>
-
-      {/* References */}
-      <ArticleReferences references={references} heading="Sources & further reading" />
-
-      {/* Disclaimer */}
-      <ArticleDisclaimer />
-
-      {/* Company CTA */}
-      <ArticleCompanyCTA
-        title={`Need help with ${TOPIC}?`}
-        body="MLAI is a not‑for‑profit community empowering the Australian AI community. Reach out for practical pointers to local learning paths."
-        buttonText="Get recommendations"
-        buttonHref="/contact"
-        note="Friendly, community‑first guidance."
-      />
-
-      {/* Author Bio */}
-      <AuthorBio author={authorDetails} />
-
-      {/* FAQ */}
       <ArticleFAQ items={faqItems} />
-
-      {/* Navigation */}
+      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
       <ArticleFooterNav />
     </>
   )
```
