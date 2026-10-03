# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-technology-is-shaping-learning-in-higher-education.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-technology-is-shaping-learning-in-higher-education.tsx
@@ -1,346 +1,118 @@
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
+import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
+import AuthorBio from '~/components/AuthorBio'

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
-import { getDefaultArticleAuthorDetails } from '../../authors'
-
-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
-
-const TOPIC = 'How technology is shaping learning in higher education'
 export const CATEGORY = 'featured'
 export const SLUG = 'how-technology-is-shaping-learning-in-higher-education'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-27'
-export const DATE_MODIFIED = '2026-01-27'
-export const DESCRIPTION = 'How hybrid learning, AI, analytics and micro‑credentials are reshaping Australian higher education in 2026, with practical steps for students and educators.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6d1a2d84-8b4e-4540-969a-efedb4ed79d0.jpg?alt=media&token=40754573-bde6-4fe3-991d-f9b37be9cb08"
-const HERO_IMAGE_ALT = '<HERO_IMAGE_ALT>'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+export const DATE_PUBLISHED = '2025-12-09'
+export const DATE_MODIFIED = '2026-09-09'
+export const DESCRIPTION = 'Check AI assessment rules, online participation and microcredential credit using dated Australian university examples. Includes a practical learning log and questions for your course team.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'Technology in higher education: AI assessment rules and microcredential credit'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6d1a2d84-8b4e-4540-969a-efedb4ed79d0.jpg?alt=media&token=40754573-bde6-4fe3-991d-f9b37be9cb08'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const summaryHighlights = {
+ heading: 'Three checks before relying on a tool, recording or credential',
+ intro: 'For students planning Australian higher-education study: use the rules for your actual subject, assessment and intended qualification.',
+ items: [
+  { label: 'Permission is task-specific', description: 'An AI-friendly institution can still prohibit AI in a particular assessment. Check the current instructions.' },
+  { label: 'A recording is not the whole class', description: 'Check participation, practical work and supervised assessment requirements separately from online material.' },
+  { label: 'Credit is not automatic', description: 'A short credential’s value for a degree depends on the receiving institution’s recognition and your circumstances.' },
+ ],
 }

-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'What technologies are most influential in Australian higher education in 2026?',
-    answer:
-      'Hybrid learning platforms (LMS + lecture capture), generative AI tools, learning analytics, micro‑credential platforms, and emerging XR simulations are the main drivers.'
-  },
-  {
-    id: 2,
-    question: 'How are universities handling AI use in assignments?',
-    answer:
-      'Policies focus on assessment redesign (authentic tasks, oral vivas, project work), transparency about AI use, and academic integrity education. Detection tools have limits, so process‑based evidence is emphasised.'
-  },
-  {
-    id: 3,
-    question: 'Do micro‑credentials count towards a degree in Australia?',
-    answer:
-      'Under the National Microcredentials Framework, micro‑credentials can be stackable. Recognition depends on the provider and program—check your university’s credit policies.'
-  },
-  {
-    id: 4,
-    question: 'Is blended learning here to stay?',
-    answer:
-      'Yes. Most courses now assume hybrid delivery—on‑campus experiences complemented by online content, recordings, and discussion spaces.'
-  },
-  {
-    id: 5,
-    question: 'How can students use AI tools responsibly?',
-    answer:
-      'Follow your subject’s rules, cite where required, log prompts/iterations, and prioritise your own reasoning. Use AI for brainstorming, feedback, and practice—not to replace your original work.'
-  },
-  {
-    id: 6,
-    question: 'What skills should I focus on for an AI career while at uni?',
-    answer:
-      'Core maths/stats and Python, data handling, model evaluation, prompt engineering, and communication. Build a portfolio through projects, hackathons, or micro‑credentials aligned to your interests.'
-  }
+export const faqItems = [
+ { id: 1, question: 'Can I use AI in every university assignment?', answer: 'No. The examples here show different conditions by institution and assessment. Find the current task instructions and ask the coordinator before using a tool if permission or scope is unclear.' },
+ { id: 2, question: 'Does acknowledging AI make any use acceptable?', answer: 'No. Permission and disclosure are separate. A declaration cannot turn prohibited drafting, coding or proofreading into authorised use.' },
+ { id: 3, question: 'Do microcredentials automatically count towards a degree?', answer: 'No. Ask the institution awarding the degree which specific credit, if any, it will recognise and what conditions you must satisfy. A completion badge alone does not settle that decision.' },
+ { id: 4, question: 'Can I replace attendance with lecture recordings?', answer: 'Do not assume so. Your course may require participation, practical work or supervised assessment that a recording does not replace. Check your current outline and discuss access arrangements with the appropriate team.' },
+ { id: 5, question: 'Can I put all my assignments in a public portfolio?', answer: 'Not automatically. Check assessment rules and rights in course materials, group work, partner information and datasets before sharing. A separate project using material you are permitted to publish may be more suitable.' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Examine how digital tools affect university learning and assessment, including access, evidence of learning and the limits of automated feedback.",
-  items: [
-    { label: 'How is AI changing higher education learning?', description: 'AI supports drafting, feedback, and practice; policies prioritise transparency and assessment redesign.' },
-    { label: 'What does blended or hybrid delivery look like in 2026?', description: 'Recorded lectures + LMS modules with on‑campus workshops, labs, and authentic assessments.' },
-    { label: 'Do micro‑credentials count towards degrees in Australia?', description: 'Many can be stacked under the National Microcredentials Framework—recognition varies by provider.' },
-  ],
+export const articleMeta = {
+ title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+ datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+ author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
+ imageAlt: 'Illustration of people collaborating around digital work',
 }

-/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
-export const articleMeta = {
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
+export default function ArticleContent() {
+ return <div className="bg-transparent">
+  <ArticleHeroHeader
+   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Technology in higher education', current: true }]}
+   title={TITLE} titleHighlight="higher education" headerBgColor="cyan"
+   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
+  />
+  <div className="prose prose-lg prose-headings:scroll-mt-24 max-w-3xl mx-auto px-4 py-10">
+   <p>Technology changes the practical choices students face: where to find learning materials, when AI assistance is allowed, how to demonstrate understanding and whether a short credential contributes to a degree. There is no single Australian rule that resolves all four.</p>
+   <p>This guide is for a student checking those choices, not a claim that most universities or courses are “hybrid-first”. It uses two universities’ public assessment guidance, one named 2026 subject outline and a separate provider’s credit procedure. The examples are selected to expose different decisions, not to estimate national practice or recommend a course.</p>
+
+   <h2 id="policy-sample">A dated sample: what Sydney and Monash ask students to check</h2>
+   <p>Sources checked 9 September 2026. These are teaching-and-assessment sources, not policies about conducting academic research. Your current unit site and task instructions may contain further conditions; this article does not override them.</p>
+   <p className="text-sm">The comparison table scrolls horizontally on small screens. Focus it to use the arrow keys.</p>
+   <div id="higher-education-policy-table" role="region" aria-label="University AI assessment guidance comparison" tabIndex={0} className="overflow-x-auto scroll-mt-24">
+    <table className="min-w-[39rem]"><caption>Two institutional examples, not a sector-wide rule</caption><thead><tr><th>Source and date</th><th>Published approach</th><th>What the student must resolve</th></tr></thead><tbody>
+     <tr><td><a href="https://www.sydney.edu.au/students/responsible-ai-use.html">University of Sydney: responsible AI use</a>; updated 2 June 2026</td><td>AI is allowed in open assessments. Secure assessments generally prohibit it unless the unit coordinator expressly permits it in the outline. The outline has an AI-use column.</td><td>Read the entry for each task, the permitted scope and acknowledgement requirements. Do not transfer one assessment’s permission to another.</td></tr>
+     <tr><td><a href="https://www.monash.edu/student-academic-success/ai-hub/ai-and-assessments">Monash: AI and assessments</a>; checked 9 September 2026</td><td>Assessment instructions can allow broad use, limit use to specified activities or prohibit it. Rules can differ within a unit.</td><td>Check the statement in Moodle, record permitted use and follow the task’s declaration instructions. A tool being available does not establish permission.</td></tr>
+    </tbody></table>
+   </div>
+   <p>Sydney also distinguishes <a href="https://www.sydney.edu.au/students/assessments.html">secure and open assessment arrangements</a>, including a stated transition for online courses during 2026 and in-person supervised assessment from 2027. This is a published institutional plan, not evidence that all Australian online degrees have the same attendance rules. Check the arrangements that apply to your enrolment.</p>
+
+   <h2 id="subject-example">Read the assessment row, not just the university headline</h2>
+   <p>The public <a href="https://www.sydney.edu.au/units/INFS1000/2026-S1C-ND-CC">INFS1000 Digital Business Innovation, Semester 1 2026 outline</a> provides a concrete example from that completed semester. Its assessment table marks the final and mid-semester exams as AI prohibited, while weekly homework, the early-feedback quiz and group project are AI allowed. Full instructions are on Canvas; they were not inspected for this guide.</p>
+   <p>The same outline says recordings capture lecture parts, not group activities, and that participation in those activities cannot be substituted. A recording link therefore does not establish that a student can complete that subject remotely. Do not treat this Semester 1 example as the rules for a different offering.</p>
+   <p><strong>Practical reading method:</strong> identify the exact subject code, year and teaching period; find the assessment row; then check its detailed instructions. If a general web page and your task instructions appear inconsistent, ask the coordinator to resolve the conflict before acting. Do not choose whichever version gives broader permission.</p>
+
+   <h2 id="permission-exercise">A worked permission decision</h2>
+   <p><strong>Entirely fictional assessment instructions—not a Monash or Sydney task:</strong> “You may use an approved AI tool to brainstorm possible project topics. Do not use it to write or edit the submitted analysis. Declare any brainstorming assistance.”</p>
+   <ul>
+    <li><strong>Within the stated boundary:</strong> request topic ideas without uploading restricted material, then independently select and investigate a topic. Follow the approval and declaration conditions.</li>
+    <li><strong>Outside it:</strong> ask the tool to rewrite the analysis for clarity. “I only used it for editing” does not make editing permitted.</li>
+    <li><strong>Still unresolved:</strong> whether a particular embedded writing feature counts as the prohibited assistance. Ask before enabling it; do not assume a familiar app is exempt.</li>
+   </ul>
+   <p>The exercise concerns the supplied instructions only. It is not an acknowledgement template approved by a university. A record helps you explain what happened; it cannot retrospectively authorise prohibited use or guarantee an academic-integrity outcome.</p>
+
+   <h2 id="learning-log">Keep a learning log that records your decisions</h2>
+   <p>Copy this into an institution-approved private location and follow its retention and submission rules. Do not put classmates’ work, assignment materials, personal information or confidential partner data into public prompts or repositories. Sydney’s <a href="https://www.sydney.edu.au/students/responsible-ai-use.html">responsible-use guidance</a> specifically addresses prohibited inputs as well as declarations.</p>
+   <pre className="whitespace-pre-wrap break-words" aria-label="Higher education learning and AI-use log">{[
+    'Subject / teaching period / assessment and version:',
+    'Instruction location and date checked:',
+    'Allowed activities / prohibited activities / tool approval:',
+    'Unresolved question and coordinator response:',
+    'Date / tool, version, publisher and URL (if used):',
+    'What I asked and how I used or rejected the output:',
+    'Private location of records required by the institution:',
+    'Facts, references or code I checked independently:',
+    'My reasoning, changes and remaining uncertainty:',
+    'Required declaration / source citations / submission evidence:',
+    'What I can explain or demonstrate without the assistance:',
+    'Publication permissions and material that must stay private:',
+   ].join('\n')}</pre>
+   <p>For the fictional task above, a useful entry would record: topic brainstorming only; no analysis text sent; one suggestion rejected as too broad; sources located and checked independently; the final analysis written without AI assistance. These are example entries, not a record of work anyone has actually completed.</p>
+
+   <h2 id="microcredential-credit">Microcredentials: distinguish learning, a badge and degree credit</h2>
+   <p>The <a href="https://www.education.gov.au/higher-education-publications/resources/national-microcredentials-framework">National Microcredentials Framework</a>, published in March 2022, defines assessed short-form learning. Its document, page 9 and section 5.5 on page 18, leaves academic-credit decisions with institutions and calls for any recognition and stacking conditions to be stated. Framework alignment is not an automatic entitlement to degree credit.</p>
+   <p>A concrete provider condition appears in <a href="https://policies.rmit.edu.au/document/view.php?id=37">RMIT’s current Credit Procedure</a>, clause 18: approved combinations awarded by RMIT may receive credit where the stated learning outcomes and equivalent AQF level align; microcredentials may also be considered in an RPL application. That is conditional recognition, not a promise about every badge or another university’s degree.</p>
+   <p>RMIT’s <a href="https://www.rmit.edu.au/students/my-course/enrolment/apply-for-credit">credit application guidance</a> asks for evidence relating prior learning to the intended program. It also tells enrolled students to continue attending the relevant classes while awaiting a decision. Follow your own provider’s current process and deadlines rather than assuming an application has already reduced your study load.</p>
+   <h3>Before enrolling mainly to reduce a degree’s workload</h3>
+   <ol>
+    <li>Name the receiving institution, qualification, intake and subject you hope to replace. “University credit” is too vague.</li>
+    <li>Ask which exact credential or combination is recognised, whether approval is automatic under a current agreement or requires individual assessment, and what evidence is needed.</li>
+    <li>Confirm the type and amount of credit, completion conditions, any expiry or curriculum-version limits, and remaining study requirements.</li>
+    <li>Get the answer from the receiving course or credit team. If credit is uncertain, decide whether the learning is still worthwhile without that benefit.</li>
+   </ol>
+   <p><strong>Fictional purchasing decision:</strong> a learner wants to replace a specific degree subject. A short-course page promises a completion badge but names no receiving qualification or credit arrangement. The learner cannot infer an exemption. Their next step is a credit enquiry with the intended institution—not withdrawing from the subject or buying a second badge to create an assumed “stack”. This example is not an evaluation of an actual provider.</p>
+
+   <h2 id="next-step">Choose the next step that matches the unanswered question</h2>
+   <p>For assessment permission, ask your unit coordinator. For access or participation barriers, use the institution’s accessibility and course-support processes. For degree recognition, ask the receiving credit team. Record the decision, the relevant version and any condition you must still meet.</p>
+   <p>If your next question is whether an education technology proposal has evidence behind it, use the <Link to="/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut">education technology evidence guide</Link>. Do not publish assessed work as a portfolio simply because it demonstrates a useful skill: resolve rights and assessment restrictions first, or develop a separate permission-cleared project.</p>
+   <p>This is an educational decision guide, not a university-approved procedure, admissions service or offer of paid builder work. The worked decisions and log are MLAI editorial examples, not research findings or independent academic review. Institutional sources can change; recheck the rules for your actual enrolment.</p>
+   <ArticleFAQ items={faqItems} />
+   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
+  </div>
+ </div>
 }
-
-/** ===== References (optional) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://universitiesaustralia.edu.au/policy-submissions/research-innovations/artificial-intelligence-in-research/',
-    title: 'Artificial intelligence in research',
-    publisher: 'Universities Australia',
-    description: 'Sector‑level guidance for Australian higher education on responsible and ethical use of AI.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://www.education.gov.au/higher-education/documents/national-microcredentials-framework',
-    title: 'National Microcredentials Framework',
-    publisher: 'Australian Government Department of Education',
-    description: 'Framework outlining definitions and recognition settings for micro‑credentials in Australia.',
-    category: 'analysis',
-  },
-]
-
-/**
- * ARTICLE CONTENT COMPONENT
- *
- * This component is dynamically imported by the route handler and rendered
- * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
- */
-export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
-  return (
-    <>
-      {/* Hero header (custom) */}
-      <ArticleHeroHeader
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
-      />
-
-      {/* Table of contents placeholder */}
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> — In 2026, Australian universities are effectively hybrid‑first.
-          Lecture capture, LMS‑centred delivery, and AI‑enabled tools now sit alongside
-          studios, labs, placements, and workshops. For students and educators, the goal
-          is the same: design learning that is authentic, inclusive, and prepares people
-          for real work with AI.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <figure className="my-12">
-          <ArticleImageBlock
-            src={HERO_IMAGE}
-            alt={HERO_IMAGE_ALT}
-            containerClassName="my-0"
-          />
-          <figcaption className="mt-4 text-center text-sm text-gray-500">
-            Hybrid‑first learning: recorded lectures, active seminars, and digital assessments coexist in 2026.
-          </figcaption>
-        </figure>
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Students & Graduates',
-              description: 'Make the most of hybrid courses, AI‑supported study, and micro‑credentials.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Career Changers',
-              description: 'Bridge gaps with stackable learning and portfolio‑first projects.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Educators & Designers',
-              description: 'Design authentic assessments and accessible, AI‑aware learning experiences.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>From lecture theatres to hybrid‑first delivery</h2>
-        <p>
-          Most Australian courses now blend weekly recordings and LMS modules with
-          tutorials, studios, and placements. The shift isn’t about replacing campus time
-          but using it for higher‑value activities—discussion, critique, hands‑on labs,
-          and assessment support—while content delivery and practice can happen online.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          Hybrid works when contact time is repurposed for active learning and support,
-          not a repeat of the recording. Design for presence, not redundancy.
-        </QuoteBlock>
-
-        <h2>AI in the classroom: personalisation, feedback, and integrity</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b18e8f62-7706-4dc6-b3ae-f40897239931.jpg?alt=media&token=d4fc9cf8-3710-4463-91fa-735a34c159a1" alt="Diverse team in a retro tech setting collaborates on AI-driven education solutions, capturing 90s film vibes." className="w-full rounded-lg my-8" />
-
-        <p>
-          Generative AI can scaffold ideas, offer draft feedback, and simulate interview
-          or viva practice. Universities emphasise transparent use, with clear rules on
-          what is permitted and how to acknowledge it. Detection tools remain imperfect,
-          so assessment design (process evidence, oral defences, and authentic tasks)
-          carries the load for integrity.
-        </p>
-
-        <h3>What to expect in 2026 semesters</h3>
-        <p>
-          Expect guidance at the subject level on acceptable AI use; more iterative
-          submissions that capture your process; and rubrics that reward reasoning,
-          critique, and original artefacts over generic prose.
-        </p>
-
-        <QuoteBlock title="Policy baseline (sector trend)" variant="orange">
-          Be transparent about AI use, keep a brief learning log (prompts, iterations,
-          decisions), and prioritise your own analysis. When in doubt, ask your
-          coordinator or check the subject guide.
-        </QuoteBlock>
-
-        <h2>Assessments are evolving: authentic tasks and open‑AI policies</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dcc535fb-c9bb-468b-ba57-b3ccd4f41cee.jpg?alt=media&token=1e84bca8-2e45-4a34-9f3b-f04a93559d34" alt="A vibrant 90s tech startup scene showcasing diverse individuals collaborating on innovative projects." className="w-full rounded-lg my-8" />
-
-        <p>
-          As open‑book and open‑AI norms grow, assessments lean towards real‑world
-          scenarios—client briefs, data analysis with commentary, oral presentations,
-          and prototypes. These formats make misuse harder and the learning more
-          transferable, particularly for AI‑adjacent roles.
-        </p>
-
-        <h2>Learning analytics and data governance</h2>
-        <p>
-          LMS activity and formative quiz data help educators see engagement patterns and
-          flag support needs. Institutions are increasingly explicit about privacy,
-          consent, and purpose limits for student data. Analytics should guide timely
-          support, not become high‑stakes surveillance.
-        </p>
-
-        <h2>Micro‑credentials and short courses: stackable, skills‑first</h2>
-        <p>
-          Micro‑credentials aligned to the National Microcredentials Framework provide
-          focused, credit‑bearing units that can be stacked. They’re useful for plugging
-          gaps (e.g., Python for data work, prompt engineering, ethics and safety) and
-          for career changers building a portfolio of evidence.
-        </p>
-
-        <h2>Accessible by default</h2>
-        <p>
-          With hybrid learning the norm, accessibility isn’t optional—captions,
-          transcripts, structured headings, colour‑contrast, and keyboard‑friendly
-          interfaces are expected. These practices support many learners, not only those
-          with disclosed disabilities.
-        </p>
-
-        <h2>XR, simulations, and work‑integrated learning</h2>
-        <p>
-          Extended reality (XR) and high‑fidelity simulations are increasingly used where
-          labs are scarce, risky, or expensive. Paired with industry projects, they help
-          students rehearse complex decision‑making before practicum or placements.
-        </p>
-
-        <ArticleStepList
-          title="How to make the most of tech‑enhanced uni in 2026"
-          steps={[
-            'Map each subject’s AI policy and acceptable tools',
-            'Keep a short learning log of prompts, drafts, and decisions',
-            'Prioritise studio/workshop time for feedback and critique',
-            'Use micro‑credentials to close skill gaps (e.g., Python, ML ops, ethics)',
-            { label: 'Build portfolio artefacts from authentic assessments' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Treat every assignment as a portfolio piece. Capture process evidence and
-          reflective notes—you’ll reuse them in job applications and interviews.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>What this means for students planning an AI career</h2>
-        <p>
-          Lean into hybrid rhythms, use AI transparently for practice and feedback, and
-          choose assessments and micro‑credentials that produce credible artefacts.
-          Curate these in a public portfolio and connect with peers through communities
-          and events—your network matters as much as your transcripts.
-        </p>
-      </div>
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
-        body="Join the MLAI community to connect with practitioners and find practical ways to grow your skills in Australia."
-        buttonText="Get recommendations"
-        buttonHref="/contact"
-        note="Community‑first, not‑for‑profit. We’ll point you to helpful, credible options."
-      />
-
-      {/* Author Bio */}
-      <AuthorBio author={authorDetails} />
-
-      {/* FAQ */}
-      <ArticleFAQ items={faqItems} />
-
-      {/* Navigation */}
-      <ArticleFooterNav />
-    </>
-  )
-}
```
