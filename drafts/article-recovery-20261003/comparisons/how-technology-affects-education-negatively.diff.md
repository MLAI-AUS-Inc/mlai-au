# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-technology-affects-education-negatively.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-technology-affects-education-negatively.tsx
@@ -1,394 +1,123 @@
-/**
- * ARTICLE CONTENT TEMPLATE - React Router v7
- *
- * THIS FILE IS PLACED AT: app/articles/content/featured/how-technology-affects-education-negatively.tsx
- * All relative imports below are calculated from that location.
- *
- * ============================================================================
- * CRITICAL ARCHITECTURE RULES - DO NOT VIOLATE
- * ============================================================================
- *
- * 1. NO ArticleLayout: The route handler already wraps content in ArticleLayout.
- *    WRONG: <ArticleLayout>...</ArticleLayout>
- *    RIGHT: <>...</> (React Fragment) or <div>...</div>
- *
- * 2. DESIGN SYSTEM COMPONENTS: Use the design system, not raw HTML:
- *    - For "Who is this for?": <AudienceGrid> (variants: 'orange' | 'purple' | 'yellow')
- *    - For callouts/quotes: <QuoteBlock> (variants: 'purple' | 'orange')
- *    - For images: <ArticleImageBlock>
- *    - NEVER use variant="purple" or variant="purple" - they don't exist!
- *
- * 3. EXPORT DATA: Export faqs, summaryHighlights, and article metadata so the
- *    route handler can pass them to ArticleLayout.
- *
- * 4. BACKGROUND: If using a wrapper div, use `bg-transparent` (NOT bg-white).
- *
- * ============================================================================
- */
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
+import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
+import AuthorBio from '~/components/AuthorBio'

-import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '~/components/articles/ArticleCompanyCTA'
-import AuthorBio from '~/components/AuthorBio'
-import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '~/components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '~/components/articles/ArticleFooterNav'
-import { QuoteBlock } from '~/components/articles/QuoteBlock'
-import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '~/components/articles/AudienceGrid'
-import { ArticleStepList } from '~/components/articles/ArticleStepList'
-import { MLAITemplateResourceCTA } from '~/components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '~/components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '~/components/articles/ArticleDisclaimer'
-import { getDefaultArticleAuthorDetails } from '~/articles/authors'
-
-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
-
-const TOPIC = 'How technology affects education negatively'
 export const CATEGORY = 'featured'
 export const SLUG = 'how-technology-affects-education-negatively'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-27'
-export const DATE_MODIFIED = '2026-01-27'
-export const DESCRIPTION = 'Evidence-based risks of classroom tech—distraction, screen time, equity, privacy, and AI misuse—plus practical steps for Australian schools.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad2b9095-7c58-48cb-93a0-796ec711627f.jpg?alt=media&token=aedd5035-940a-46bd-a249-0b171a8bc35c"
-const HERO_IMAGE_ALT = 'Students using laptops in an Australian classroom'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+// Preserve the established public registry date, not the later draft-module date.
+export const DATE_PUBLISHED = '2025-12-30'
+export const DATE_MODIFIED = '2026-09-09'
+export const DESCRIPTION = 'Assess classroom technology risks without confusing distraction surveys with proof of harm. Includes Australian privacy boundaries, a fictional decision and a usable risk record.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'How technology can affect education negatively'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad2b9095-7c58-48cb-93a0-796ec711627f.jpg?alt=media&token=aedd5035-940a-46bd-a249-0b171a8bc35c'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const summaryHighlights = {
+ heading: 'Examine the task, the evidence and who could be left out',
+ intro: 'For Australian educators preparing a discussion about one classroom technology activity—not a school procurement or legal approval checklist.',
+ items: [
+  { label: 'Name a specific risk', description: 'Separate distraction, access barriers, unverified answers, data handling and workload; one score cannot stand in for all five.' },
+  { label: 'Read the evidence accurately', description: 'A student survey can reveal reported distraction and associations. It does not establish that a device caused a learning loss.' },
+  { label: 'Record an accountable decision', description: 'State the alternative, observable concern, responsible person and condition for pausing before trying a change.' },
+ ],
 }

-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'Does technology reduce students\' attention in class?',
-    answer:
-      'It can. Multitasking (switching between tabs/apps) is linked to lower recall and slower task completion. Setting device norms (e.g., notifications off, single-task windows) reduces this risk.'
-  },
-  {
-    id: 2,
-    question: 'How much screen time is too much for learning?',
-    answer:
-      'There\'s no one-size number. Focus on quality and purpose: time-bound, curriculum-aligned tasks with breaks. For younger students, prioritise off-screen activities and sleep hygiene.'
-  },
-  {
-    id: 3,
-    question: 'What practical steps cut distraction during laptop use?',
-    answer:
-      <>Use clear cues (\"screens down\" / \"screens up\"), disable notifications, prefer full-screen apps, seat students so screens are visible, and run short digital blocks with explicit outcomes.</>
-  },
-  {
-    id: 4,
-    question: 'Does BYOD widen the digital divide?',
-    answer:
-      'It can if not managed. Provide loan devices, offline-first resources, low-bandwidth options, and consistent platforms. Budget for repairs, chargers, and connectivity in regional contexts.'
-  },
-  {
-    id: 5,
-    question: 'Are AI tools a cheating risk?',
-    answer:
-      'Yes if tasks are easily auto-completed. Use process-focused assessment (drafts, orals, reflections), set AI-use policies, and teach AI literacy and integrity.'
-  },
-  {
-    id: 6,
-    question: 'What privacy checks should schools do before adopting an app?',
-    answer:
-      <>Confirm data location and retention, review the privacy policy, seek a Data Processing Agreement, enable SSO, restrict permissions by role, and follow Privacy Act (Cth) obligations.</>
-  }
+export const faqItems = [
+ { id: 1, question: 'Does technology necessarily make education worse?', answer: 'No. Examine what a particular activity changes for particular learners. Access, attention, learning evidence, staff effort and data handling need separate checks. A device count or satisfaction score cannot answer them all.' },
+ { id: 2, question: 'Does PISA prove that screens cause lower mathematics scores?', answer: 'No. The finding discussed here combines students’ reports of distraction with assessment results. It is an association, not a randomised test of a screen policy, and the OECD average is not an Australian classroom estimate.' },
+ { id: 3, question: 'Is there a universal safe screen-time limit for a lesson?', answer: 'This guide establishes no such limit and gives no medical recommendation. Follow the school’s applicable guidance; individual health or wellbeing concerns belong with appropriate qualified support.' },
+ { id: 4, question: 'Does the federal Privacy Act apply to every Australian school?', answer: 'No. OAIC distinguishes private institutions, which are usually covered, from public schools, to which state or territory laws may instead apply. Ask the responsible school or sector privacy officer which requirements apply; this article does not assess compliance.' },
+ { id: 5, question: 'Can the risk record approve a classroom AI tool?', answer: 'No. It organises questions and evidence for an authorised decision. A completed record, login control or vendor contract is not an approval, legal assessment or proof of learning effectiveness.' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Assess a classroom technology against the learning task, the students using it and the risks that need attention. Separate measured effects from concerns that still need evidence.",
-  items: [
-    { label: 'What are the main negative effects of classroom technology?', description: 'Distraction, shallow learning from multitasking, equity gaps, privacy/security risks, and extra teacher workload.' },
-    { label: 'Does screen time harm learning outcomes?', description: 'Excessive or unfocused use links to lower recall and sleep issues; structured, time‑bound tasks mitigate risk.' },
-    { label: 'How can schools reduce tech distractions?', description: 'Set device norms, disable notifications, use timed single‑task blocks, and measure impact against non‑tech lessons.' },
-  ],
+export const articleMeta = {
+ title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+ datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+ author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
+ imageAlt: 'Illustration of people working with digital technology',
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
+   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Education technology risks', current: true }]}
+   title={TITLE} titleHighlight="education negatively" headerBgColor="cyan"
+   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
+  />
+  <div className="prose prose-lg prose-headings:scroll-mt-24 max-w-3xl mx-auto px-4 py-10">
+   <p>Technology can create problems in education when a task becomes harder to attend to, cannot be accessed by some learners, exposes information, or produces answers that nobody checks. A tool can also appear to save time while moving work to students, families or other staff. These are different failure modes: identify the one you are concerned about before deciding what to change.</p>
+   <p>Use this guide to prepare a conversation about one activity with the appropriate teacher, school leader or support team. It is not a lesson prescription, a health assessment or authority to trial a new service with children. For the historical question rather than a risk decision, see <Link to="/articles/featured/how-technology-has-changed-education">how technology has changed Australian education</Link>.</p>
+
+   <h2 id="evidence">What the distraction evidence actually supports</h2>
+   <p>In <a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-ii_a97db61c-en/full-report/component-10.html">PISA 2022 Results, Volume II, chapter 3</a>, OECD reports that about one in three students across OECD countries said they were distracted by using digital devices in most or every mathematics lesson. About one in four reported distraction from other students’ devices. The chapter also reports an association between distraction and mathematics performance.</p>
+   <p>Those are student reports and statistical associations, not an experiment proving that devices caused lower scores. They are not measurements of this school, every subject or every age group. This source does not validate a universal lesson length, screen ban or expected improvement. The 2022 data were reported in 2023, not newly collected in 2026.</p>
+   <p>Before repeating a learning claim, identify its setting, participants, comparison, outcome and uncertainty. “More work submitted”, “students liked it” and “students could explain the idea without assistance” measure different things. Removing a distraction does not by itself establish that learning improved.</p>
+
+   <h2 id="risk-map">Turn a broad concern into something you can examine</h2>
+   <p>The following is an editorial discussion aid, not a validated risk scale. Ask learners and staff about barriers through the school’s approved channels; do not introduce monitoring or collect sensitive information simply to fill it in.</p>
+   <p className="text-sm">This table scrolls horizontally on small screens. Focus it to use the arrow keys.</p>
+   <div id="education-risk-table" role="region" aria-label="Classroom technology risk questions" tabIndex={0} className="overflow-x-auto scroll-mt-24">
+    <table className="min-w-[38rem]"><caption>Separate risks, observations and possible responses</caption><thead><tr><th>Concern</th><th>Evidence to seek</th><th>Question before changing the activity</th></tr></thead><tbody>
+     <tr><td>Distraction</td><td>What interrupts the specific task, and what participants report—not a diagnosis inferred from screen activity.</td><td>Could an approved less-interruptive format preserve necessary assistive features?</td></tr>
+     <tr><td>Access</td><td>Whether the required device, connection, format and support are actually available.</td><td>Is there an equivalent way to participate without a private device, extra payment or public disclosure of a barrier?</td></tr>
+     <tr><td>Unverified AI output</td><td>A synthetic example checked against an authoritative answer, including incorrect or missing steps.</td><td>Who checks errors, and can the learner demonstrate the intended understanding rather than copy an answer?</td></tr>
+     <tr><td>Personal information</td><td>What would leave the school’s approved environment, who receives it and why it is needed.</td><td>Has the responsible authority approved that use? If not, do not upload the material.</td></tr>
+     <tr><td>Shifted workload</td><td>Preparation, troubleshooting, review, correction and learner/support time separately.</td><td>Is the claimed saving only one person’s time, and what costs or effort are missing?</td></tr>
+    </tbody></table>
+   </div>
+
+   <h2 id="access">A non-digital alternative is not a failed digital lesson</h2>
+   <p>The NSW education department’s <a href="https://education.nsw.gov.au/about-us/education-data-and-research/cese/publications/case-studies/learning-from-home-snapshots/rowena-public-school">Rowena Public School snapshot</a>, originally published 14 July 2020, describes device loans, printed learning packs and recorded lessons in a community with unreliable internet. It is a documented response to that school’s circumstances, not a controlled comparison establishing the best approach everywhere.</p>
+   <p>An equivalent alternative needs to preserve the learning opportunity, not just supply a different file. Ask how someone will receive instructions, complete the task, obtain feedback and ask for help. Do not remove an accessibility tool merely because the activity is described as “screen free”.</p>
+
+   <h2 id="privacy">Correct the privacy question before choosing controls</h2>
+   <p><a href="https://www.oaic.gov.au/privacy/your-privacy-rights/more-privacy-rights/children-and-young-people">OAIC’s education guidance</a> says private schools are usually covered by the federal Privacy Act. Public schools are not covered in the same way; state or territory privacy laws may apply instead. The previous version’s blanket federal-law framing was too broad. The applicable sector, jurisdiction, service and data use matter.</p>
+   <p>Ask the school or sector privacy officer which approval process applies, what data are necessary, how vendor use and retention are assessed, and who handles access or incident concerns. Single sign-on and a data-processing agreement can be parts of a review; neither makes a tool compliant or suitable by itself. Do not treat a vendor’s “education” label as approval.</p>
+   <p>The <a href="https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools">Australian school generative-AI framework resource page</a> records ministerial endorsement of its 2024 review in June 2025. That is national guidance, not permission to use any particular product or exemption from school rules. Check the applicable local policy and authorised advice before proposing a student-facing use.</p>
+
+   <h2 id="worked-decision">A fictional decision that does not hide the stop condition</h2>
+   <p><strong>Invented staff-planning example—not a classroom trial:</strong> a teacher considers an AI service to draft hints for a fractions exercise. The intended task is for learners to explain their reasoning. Staff first review three made-up questions without creating student accounts or uploading student work.</p>
+   <p>These are complete editorial review fixtures, not observed output from an AI product:</p>
+   <ol>
+    <li><strong>Question:</strong> what is 1/2 + 1/4? A correct explanation converts 1/2 to 2/4, then adds 2/4 + 1/4 = 3/4. The deliberately incorrect fictional hint says “The answer is 3/4: add the top numbers and the bottom numbers.” That rule would instead produce 2/6; the final answer happens to be right but the explanation must be rejected.</li>
+    <li><strong>Question:</strong> which is larger, 2/3 or 3/4? Compare 8/12 with 9/12: 3/4 is larger. A review should check the reasoning, not merely whether the larger fraction was selected.</li>
+    <li><strong>Incomplete question:</strong> what is half of this? No quantity is supplied. The expected response asks which quantity is meant rather than inventing a whole or an answer.</li>
+   </ol>
+   <ul>
+    <li><strong>Baseline:</strong> preparing the existing hint sheet is assumed to take 30 staff-minutes.</li>
+    <li><strong>Drafting route:</strong> 10 minutes preparing inputs + 8 generating drafts + 18 checking and correcting = 36 staff-minutes. That is six minutes more, not a saving; licences, training and other people’s time are excluded.</li>
+    <li><strong>Concern found:</strong> one draft gives the correct final answer with an invalid explanation. Output completion is therefore not a sufficient acceptance check.</li>
+    <li><strong>Access and data:</strong> keep the existing accessible format available. The proposed student-account route has no documented approval.</li>
+    <li><strong>Decision:</strong> do not proceed to student use. The teacher retains the existing approach and asks the authorised school lead whether any further staff-only assessment is warranted.</li>
+   </ul>
+   <p>The numbers and error are fictional. They illustrate recording full effort and a reason to stop, not the typical accuracy, cost or educational effect of AI. Any later classroom evaluation would need the school’s authorised design, appropriate safeguards and a suitable learning measure. A short before/after comparison alone would not isolate the cause of a change.</p>
+
+   <h2 id="record">Copy the classroom technology risk record</h2>
+   <p>Use this text in a document you control. It replaces the generic download card; the page does not collect responses. Keep real student records in the school’s approved systems, not in public examples or an unapproved AI service.</p>
+   <pre className="whitespace-pre-wrap break-words" aria-label="Classroom technology risk record">{[
+    'Activity / learners and setting / date:',
+    'Intended learning task and existing approach:',
+    'Specific risk and who could be affected:',
+    'Source or observation / date / what it cannot establish:',
+    'Baseline: learning evidence, access and separate effort/cost measures:',
+    'Proposed change and an equivalent accessible alternative:',
+    'Data needed / destination / unresolved approval questions:',
+    'Potential mitigation / evidence it has actually been implemented:',
+    'Observable harm or failure signal / condition for pausing:',
+    'Responsible person and authorised decision-maker:',
+    'Decision / unresolved issues / next review date:',
+    'What can be shared safely, with whose permission:',
+   ].join('\n')}</pre>
+
+   <h2 id="scope">Use the record with the people responsible for the decision</h2>
+   <p>Take one concrete question and the missing evidence to the relevant school team. MLAI does not offer an education-compliance assessment through this article. A general community discussion cannot approve a classroom tool, and no recruitment or implementation offer is implied.</p>
+   <p>Sources were checked on 9 September 2026. This is a scoped evidence-reading guide with an original fictional exercise, not a systematic review, an independently reviewed school procedure or a claim of measured MLAI educational outcomes. It makes no medical claim about sleep, mood or a safe amount of screen time.</p>
+   <ArticleFAQ items={faqItems} />
+   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
+  </div>
+ </div>
 }
-
-/** ===== References (curated) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://www.aitsl.edu.au/research/spotlights/evaluating-the-evidence-for-educational-technology-part-2-enabling-learning',
-    title: 'Evaluating the evidence for educational technology — Part 2: Enabling learning',
-    publisher: 'AITSL',
-    description: 'Australian evidence and guidance on when and how EdTech supports learning.',
-    category: 'analysis',
-  },
-  {
-    id: 2,
-    href: 'https://www.esafety.gov.au/parents/issues-and-advice/screen-time',
-    title: 'Screen time — advice for parents and carers',
-    publisher: 'eSafety Commissioner',
-    description: 'Practical guidance on balancing screen use and wellbeing in Australia.',
-    category: 'government',
-  },
-  {
-    id: 3,
-    href: 'https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-quick-reference',
-    title: 'Australian Privacy Principles — quick reference',
-    publisher: 'OAIC',
-    description: 'Core privacy obligations relevant to handling student data in Australia.',
-    category: 'government',
-  },
-  {
-    id: 4,
-    href: 'https://www.unesco.org/gem-report/en/publication/technology',
-    title: 'Technology in education: A tool on whose terms? (2023 GEM Report)',
-    publisher: 'UNESCO',
-    description: 'Global synthesis on the promises and pitfalls of technology in education.',
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
-        headerBgColor='cyan'
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
-
-      {/* Table of contents placeholder */}
-      <ArticleTocPlaceholder className='bg-transparent' />
-
-      <div className='prose prose-lg prose-slate max-w-none'>
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> — This isn’t an anti-tech view; it’s a practical look at the
-          downsides that show up in real classrooms. Used without clear purpose or guardrails,
-          devices and apps can erode attention, add workload, and widen equity gaps. This guide
-          summarises the key risks and shares simple ways Australian schools can reduce harm.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption='Devices can help or hinder. Purpose and classroom norms matter most.'
-          width={1200}
-          height={800}
-          containerClassName='my-10'
-          imageClassName='rounded-3xl'
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid */}
-        <AudienceGrid
-          heading='Who is this guide for?'
-          cards={[
-            {
-              title: 'Teachers & school leaders',
-              description: 'Practical checks to reduce distraction, risk, and workload.',
-              icon: <AcademicCapIcon className='h-6 w-6' />,
-              variant: 'purple',
-            },
-            {
-              title: 'Parents & carers',
-              description: 'What to ask schools and how to support healthy screen habits.',
-              icon: <UsersIcon className='h-6 w-6' />,
-              variant: 'yellow',
-            },
-            {
-              title: 'IT & EdTech teams',
-              description: 'Privacy, security, and platform choices that minimise friction.',
-              icon: <RocketLaunchIcon className='h-6 w-6' />,
-              variant: 'orange',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>What the evidence actually says (Australia)</h2>
-        <p>
-          Australian sources such as AITSL highlight a consistent theme: technology can support
-          learning when it is tightly aligned to a clear objective and well-implemented, but the
-          evidence for broad, unbounded use is mixed. The opportunity cost is real — time spent on
-          tech activities that don’t improve learning displaces proven practices like retrieval and
-          feedback.
-        </p>
-        <QuoteBlock title='Key insight' variant='purple'>
-          Start with the learning outcome, not the tool. If a device or app doesn’t clearly improve
-          practice or evidence collection, don’t use it.
-        </QuoteBlock>
-
-        <h2>Distraction and attention costs</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c9e1c17b-9f7c-4498-9c23-fbcef948d50a.jpg?alt=media&token=f37ef452-4dd1-46d7-9f0b-ab96064019ab" alt="People engaged in a 90s tech startup, surrounded by retro gadgets, illustrating distraction and attention costs." className="w-full rounded-lg my-8" />
-
-        <p>
-          Multitasking (e.g., tab switching, chat) reduces recall and slows progress. Notifications,
-          infinite-scroll feeds, and frictionless switching make sustained attention harder. These
-          effects are strongest during note-taking and conceptual learning, where deep processing is
-          required.
-        </p>
-        <h3>Classroom norms that help</h3>
-        <p>
-          Use explicit cues (screens-down/screens-up), single-task windows, and app/site blocking
-          where appropriate. Run short, time-boxed digital tasks with visible timers and defined
-          outputs; then close laptops to debrief.
-        </p>
-        <QuoteBlock title='Quick win' variant='orange'>
-          Make \"purpose + product\" explicit before devices open: what students will make and how
-          you will check it.
-        </QuoteBlock>
-
-        <h2>Screen time, sleep, and wellbeing</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-28042f86-bf3f-4719-8070-2db34464a11a.jpg?alt=media&token=0734bc17-36b1-4781-8055-e056e4045232" alt="People in a stylish 90s tech setting, balancing screen time and wellbeing, surrounded by devices and creativity." className="w-full rounded-lg my-8" />
-
-        <p>
-          Excess, late-night, or unfocused screen use is associated with sleep disruption and mood
-          issues. During school hours, aim for purposeful, time-limited tasks with regular movement
-          and off-screen breaks. Coordinate classroom expectations with home guidance so students get
-          consistent messages.
-        </p>
-
-        <h2>Equity and access: the digital divide</h2>
-        <p>
-          BYOD and app-heavy programs can entrench inequality when families lack reliable devices,
-          repairs, or broadband. Regional and remote contexts face extra hurdles (coverage,
-          bandwidth costs, device servicing). Hidden costs — chargers, logins, consumables, time —
-          can undermine inclusion.
-        </p>
-        <h3>Reduce inequity in daily practice</h3>
-        <p>
-          Provide loan pools, use offline-first resources, and standardise a small toolset across
-          subjects. Prefer low-bandwidth options and printable alternatives where appropriate.
-        </p>
-
-        <h2>Privacy, security, and AI-specific risks</h2>
-        <p>
-          Student data can be sensitive. Schools should review data flows, storage locations, and
-          vendor retention policies, and align practice with the Australian Privacy Principles.
-          Generative AI adds new risks: exposure of personal information, opaque model behaviour,
-          biased outputs, and academic integrity concerns.
-        </p>
-        <h3>Minimum checks before adopting a tool</h3>
-        <p>
-          Require SSO, role-based permissions, a Data Processing Agreement, and a clear retention
-          policy. Avoid tools that require student personal accounts when institution logins are
-          available. Set clear classroom AI rules (what’s allowed, what must be student-original).
-        </p>
-
-        <h2>Teacher workload and platform sprawl</h2>
-        <p>
-          Fragmented platforms multiply logins, notifications, and admin tasks. Without tidy
-          processes, tech increases workload rather than reducing it. Standardise the minimum set of
-          tools, provide short PD focused on classroom routines, and remove rarely-used apps.
-        </p>
-
-        <h2>Shallow learning and over-reliance on automation</h2>
-        <p>
-          Automation (including AI) can short-circuit productive struggle. If tasks are easily
-          completed by a chatbot, students may skip retrieval and reasoning. Favour prompts and
-          products that require explanation, critique, or synthesis — and collect process evidence
-          (drafts, oral checks, reflections).
-        </p>
-
-        <ArticleStepList
-          title='Mitigate the risks in your context'
-          steps={[
-            { label: 'Define a learning goal and success measure for any tech use' },
-            { label: 'Set device norms: notifications off, single-task, timed blocks' },
-            { label: 'Standardise a small toolset; remove low-value apps' },
-            { label: 'Run a short pilot; compare outcomes to a non-tech baseline' },
-            { label: 'Check privacy: DPA, data location/retention, SSO, least privilege' },
-            { label: 'Teach AI literacy and integrity; collect process evidence' },
-          ]}
-          accent='teal'
-        />
-
-
-
-        <QuoteBlock title='Pro tip' variant='purple'>
-          If you can’t describe how the tool improves learning — and how you’ll know — it probably
-          shouldn’t be in the lesson.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Bottom line</h2>
-        <p>
-          Technology should earn its place. Use it when it clearly helps students learn, when it
-          protects their data, and when it doesn’t add unnecessary workload. Start small, measure,
-          and keep what works.
-        </p>
-      </div>
-
-      {/* References */}
-      <ArticleReferences references={references} heading='Sources & further reading' />
-
-      {/* Disclaimer */}
-      <ArticleDisclaimer />
-
-      {/* Company CTA */}
-      <ArticleCompanyCTA
-        title={`Need help with ${TOPIC}?`}
-        body="MLAI is a not-for-profit community supporting Australia's AI practitioners and educators. Get practical recommendations based on your goals and context."
-        buttonText='Connect with MLAI'
-        buttonHref='/contact'
-        note='Friendly, community-first support.'
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
