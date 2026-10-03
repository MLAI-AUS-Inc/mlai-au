# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-technology-has-changed-education.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-technology-has-changed-education.tsx
@@ -1,343 +1,113 @@
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
-const TOPIC = 'How technology has changed education'
 export const CATEGORY = 'featured'
 export const SLUG = 'how-technology-has-changed-education'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-15'
-export const DATE_MODIFIED = '2026-01-27'
-export const DESCRIPTION = 'A practical Australian look at how technology reshaped learning, teaching and assessment—covering access, personalisation, collaboration, risks, and next steps.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0536c018-0450-4ef6-bc45-46686799945c.jpg?alt=media&token=f79f1f9d-f5b6-41ca-8df5-35f1dce4af2f"
-const HERO_IMAGE_ALT = 'Students in a blended classroom using laptops and a digital whiteboard'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+export const DATE_PUBLISHED = '2025-12-21'
+export const DATE_MODIFIED = '2026-09-09'
+export const DESCRIPTION = 'Trace selected Australian education changes from radio lessons to school AI guidance. Compare documented adoption with learning evidence using a dated timeline and claim-checking exercise.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'How technology has changed education in Australia'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0536c018-0450-4ef6-bc45-46686799945c.jpg?alt=media&token=f79f1f9d-f5b6-41ca-8df5-35f1dce4af2f'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const summaryHighlights = {
+ heading: 'A history of changing delivery—not proof that every change improved learning',
+ intro: 'For educators and readers examining Australian education history: use dated examples to distinguish access, implementation and educational outcomes.',
+ items: [
+  { label: 'Distance learning predates the internet', description: 'Alice Springs School of the Air provides a named 1951 example; later digital tools did not invent remote education.' },
+  { label: 'Delivery is not the same as learning', description: 'Equipment targets, resource availability and policy endorsement establish different facts from student understanding.' },
+  { label: 'Keep the context attached', description: 'A NSW school’s 2020 response or a national schools framework cannot describe every Australian institution or course.' },
+ ],
 }

-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'What are the biggest ways technology has changed education?',
-    answer:
-      'Access (online and blended delivery), faster and more personalised feedback, collaborative tools, and data‑informed teaching have reshaped how Australia learns—while keeping the teacher–student relationship central.',
-  },
-  {
-    id: 2,
-    question: 'Does technology improve learning outcomes?',
-    answer:
-      'When paired with good pedagogy and clear goals, technology can improve engagement and feedback speed. Outcomes vary by context—implementation quality matters more than the tool itself.',
-  },
-  {
-    id: 3,
-    question: 'What are the downsides or risks?',
-    answer:
-      'Distraction, inequity (device/data access), and privacy concerns. Mitigate with clear policies, accessible design, offline options, and minimal‑distraction modes.',
-  },
-  {
-    id: 4,
-    question: 'How has the teacher’s role changed?',
-    answer:
-      'Teachers increasingly orchestrate learning—using tech for routine feedback, admin and content delivery—so they can focus on relationships, higher‑order thinking, and authentic assessment.',
-  },
-  {
-    id: 5,
-    question: 'How can students pick reliable ed‑tech tools?',
-    answer:
-      'Check evidence of effectiveness, accessibility features, privacy settings, and total cost. Prefer tools that support your learning goals and integrate with your institution’s systems.',
-  },
-  {
-    id: 6,
-    question: 'Where does AI fit in education?',
-    answer:
-      'AI can support drafting, practice, and feedback. Use it responsibly: keep privacy in mind, cite sources, follow academic integrity rules, and prioritise understanding over automation.',
-  },
+export const faqItems = [
+ { id: 1, question: 'Did distance education begin with online classes?', answer: 'No. The timeline includes Alice Springs School of the Air in 1951. It is one documented Australian example, not a claim that all forms of distance education began there.' },
+ { id: 2, question: 'Does supplying a computer to each student prove better learning?', answer: 'No. A device target concerns access or provision. You still need evidence about actual use, support, the learning task, outcomes and an appropriate comparison.' },
+ { id: 3, question: 'Did learning from home mean every activity moved online?', answer: 'No. The documented Rowena Public School example combined printed packs, recorded lessons and teacher contact. It describes that school’s 2020 response, not a current national delivery model.' },
+ { id: 4, question: 'Is the national AI-in-schools framework evidence that an AI product works?', answer: 'No. The Department of Education resource records guidance and a review endorsement. Neither is an evaluation of a particular product or permission to use it in an assessment.' },
+ { id: 5, question: 'Can this timeline tell us whether technology improved education overall?', answer: 'No. It documents selected changes using institutional accounts, an administration audit and policy records. They are not a common outcome dataset or a causal comparison across decades.' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Explore changes in access, teaching and assessment, while asking which learners and settings the evidence actually describes.",
-  items: [
-    { label: 'Does technology improve student outcomes?', description: 'When paired with good pedagogy, tech can speed feedback and boost engagement; impact varies by context.' },
-    { label: 'How has technology changed assessment?', description: 'More formative quizzes, faster feedback and analytics; authentic, real‑world tasks still matter most.' },
-    { label: 'What are the biggest risks?', description: 'Distraction, inequity and privacy; mitigate with clear policies, accessibility and offline options.' },
-  ],
+export const articleMeta = {
+ title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+ datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+ author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
+ imageAlt: 'Illustration of a group working with digital technology',
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
+   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Education technology history', current: true }]}
+   title={TITLE} titleHighlight="education in Australia" headerBgColor="cyan"
+   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
+  />
+  <div className="prose prose-lg prose-headings:scroll-mt-24 max-w-3xl mx-auto px-4 py-10">
+   <p>Technology has changed how Australian learners can receive teaching, obtain materials and communicate with teachers. Radio lessons, computer access, remote-learning resources and generative-AI guidance show different kinds of change. They do not support a simple story in which every classroom became digital or every newer tool produced better learning.</p>
+   <p>This is a selected history of school education, not a complete history of Australian schooling, VET or universities. It helps you read a claim such as “technology transformed education” more precisely: what changed, for whom, when, and what evidence shows the result? For a present-day risk decision, use the separate <Link to="/articles/featured/how-technology-affects-education-negatively">classroom technology risk guide</Link>.</p>
+
+   <h2 id="timeline">Four dated changes, with the limits of each source</h2>
+   <p>Sources checked 9 September 2026. Dates below describe the historical event or source period, not when the web page was last crawled. The examples are selected for different delivery problems, not as an exhaustive ranking of important inventions.</p>
+   <p className="text-sm">The timeline table scrolls horizontally on small screens. Focus it to use the arrow keys.</p>
+   <div id="education-history-table" role="region" aria-label="Australian education technology timeline" tabIndex={0} className="overflow-x-auto scroll-mt-24">
+    <table className="min-w-[40rem]"><caption>Historical provision, practice and policy are different forms of evidence</caption><thead><tr><th>Period and source</th><th>Documented change</th><th>What this does not establish</th></tr></thead><tbody>
+     <tr><td><strong>1951:</strong> <a href="https://www.assoa.nt.edu.au/about/">Alice Springs School of the Air’s own history</a></td><td>A named example of radio-based distance schooling. The school describes later movement from radio to internet communication.</td><td>It is an institutional account, not a comparison of radio, online and face-to-face learning outcomes.</td></tr>
+     <tr><td><strong>2008–2011:</strong> <a href="https://www.anao.gov.au/work/performance-audit/digital-education-revolution-program-national-secondary-schools-computer-fund">ANAO audit, published 17 February 2011</a></td><td>The National Secondary Schools Computer Fund ran application rounds in 2008–09 and targeted one computer per student in Years 9–12 by the end of 2011.</td><td>A programme target is not proof it was met. An audit of administration is not a trial demonstrating a learning effect.</td></tr>
+     <tr><td><strong>2020:</strong> <a href="https://education.nsw.gov.au/about-us/education-data-and-research/cese/publications/case-studies/learning-from-home-snapshots">NSW learning-from-home snapshots, originally published 14 July 2020</a></td><td>Selected school accounts documented ways of continuing education away from the classroom during disruption.</td><td>Selected case studies do not establish national prevalence, permanent hybrid delivery or comparative effectiveness.</td></tr>
+     <tr><td><strong>2023 resource / 2025 review endorsement:</strong> <a href="https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools">Department of Education’s AI-in-schools resource</a></td><td>The resource page was created in November 2023 and records endorsement of the 2024 Framework Review in June 2025.</td><td>A publication date is not a universal school implementation date. Guidance is neither a product approval nor measured student benefit.</td></tr>
+    </tbody></table>
+   </div>
+
+   <h2 id="rowena">A concrete example: printed packs and digital lessons together</h2>
+   <p>In its <a href="https://education.nsw.gov.au/about-us/education-data-and-research/cese/publications/case-studies/learning-from-home-snapshots/rowena-public-school">2020 Rowena Public School account</a>, NSW’s Centre for Education Statistics and Evaluation describes a rural community with inconsistent device access and unreliable internet. The school consulted families, loaned devices, supplied printed packs and linked recorded lessons. Contact with teachers remained part of the approach.</p>
+   <p>The useful distinction is between making a resource available and making an activity workable. This was not simply “put lessons online”. It is also not a controlled study proving that those arrangements improved scores. The page’s August 2026 metadata does not turn the historical account into a new 2026 classroom observation.</p>
+   <p>For your own historical comparison, ask what the delivery required from the learner and household: equipment, connection, space, time and help. A change can remove one barrier while leaving another unresolved. Do not infer that an absent login means a student did no work; the task may have an offline route.</p>
+
+   <h2 id="evidence-levels">Separate adoption, practice and outcomes</h2>
+   <ol>
+    <li><strong>Adoption:</strong> was equipment supplied, a service made available or a policy issued? Record the date, population and whether the number is a target or an observed result.</li>
+    <li><strong>Practice:</strong> what did teachers and learners actually do? An account of use can explain how a system operated without estimating how common or effective it was.</li>
+    <li><strong>Outcome:</strong> what changed in access, workload or learning, measured how and for whom? More submissions are not automatically deeper understanding.</li>
+    <li><strong>Attribution:</strong> what evidence supports the claim that technology caused the change? Consider the comparison, prior differences, missing participants and other changes at the same time.</li>
+   </ol>
+   <p>The sources in this timeline mainly document provision, practice and policy. They cannot be combined into a single effect size for “technology in education”. This guide deliberately leaves the overall learning-effect question open instead of presenting adoption as its answer.</p>
+
+   <h2 id="exercise">A worked claim-checking exercise</h2>
+   <p><strong>Entirely fictional school dashboard—not an Australian study:</strong> a class has 24 enrolled learners. Eighteen open a new resource; 12 of those 18 submit the activity. Of those 12 submitters, eight meet the stated criterion on a separate task completed without that resource. No baseline or comparison group is supplied.</p>
+   <ul>
+    <li><strong>Access observation:</strong> 18/24 = 75% opened it. That is not proof everyone could access it or use it successfully.</li>
+    <li><strong>Completion observation:</strong> 12/24 = 50% submitted. Do not report 12/18 as the whole-class completion rate; that is about 67% of openers.</li>
+    <li><strong>Criterion observation:</strong> eight of the 12 submitters met the criterion, about 67%; eight of all 24 enrolled is about 33%. Outcomes for the other learners cannot be invented.</li>
+    <li><strong>Unsupported conclusion:</strong> “The platform improved learning by 67%.” There is no before/after improvement estimate, and no design isolating the platform’s effect.</li>
+   </ul>
+   <p>A defensible summary is narrower: “In this invented example, 12 of 24 learners submitted; eight submitters met the separate-task criterion. We cannot estimate improvement from these counts.” The arithmetic teaches denominator discipline, not an evaluation protocol. Real assessment and data use require the institution’s authorised processes.</p>
+
+   <h2 id="record">Keep a history-and-evidence record</h2>
+   <p>Copy this record into your own notes. It replaces the former generic class-pilot download promise; this page does not offer a ready-to-run classroom experiment or collect personal information.</p>
+   <pre className="whitespace-pre-wrap break-words" aria-label="Education history and evidence record">{[
+    'Claim about what changed:',
+    'Institution / sector / place / learners:',
+    'Event or observation dates:',
+    'Source title and link / publication versus update date:',
+    'Source type: policy, institutional account, audit, survey or experiment:',
+    'What changed in access, delivery or practice:',
+    'Target versus observed result:',
+    'Outcome definition / denominator / missing observations:',
+    'Comparison and other plausible explanations:',
+    'What the source cannot establish:',
+    'Careful summary / next evidence to obtain:',
+   ].join('\n')}</pre>
+
+   <h2 id="next-question">Ask a more precise question about the next change</h2>
+   <p>Instead of asking whether the newest technology will transform all education, choose one question: does this particular change address an access barrier, alter the feedback process, or require a new way to demonstrate understanding? Then look for evidence that actually measures that question in a comparable setting.</p>
+   <p>This article is an educational history resource, not an offer of school consulting, paid builder work or procurement advice. The timeline and exercise are MLAI’s editorial synthesis; they are not new research, a systematic review or an independently reviewed classroom procedure. Relevant school and sector authorities remain responsible for current practice and policy decisions.</p>
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
-    href: 'https://education.purdue.edu/news/2024/01/01/how-has-technology-changed-education/',
-    title: 'How Has Technology Changed Education?',
-    publisher: 'Purdue University College of Education',
-    description: 'Overview of how technology affects access, personalisation, collaboration and the teacher role.',
-    category: 'analysis',
-  },
-  {
-    id: 2,
-    href: 'https://studyonline.ecu.edu.au/blog/teachers-and-technology',
-    title: 'How Collaboration Between Teachers and Technology Can Improve Education',
-    publisher: 'ECU Online',
-    description: 'Discusses teacher–technology collaboration and practical classroom improvements.',
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
-      <div className="prose prose-lg prose-slate max-w-none">
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> — In Australia, classrooms and lecture theatres have moved from
-          paper‑first to digital‑by‑default. Rather than asking whether technology replaces teaching,
-          the useful question is how it changes access, collaboration, feedback and assessment — and
-          which trade‑offs to manage so learners actually benefit.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Blended learning in practice: devices and shared displays enable flexible delivery."
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'For leaders validating ideas, seeking funding, or managing teams.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For those building portfolios, learning new skills, or changing careers.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>What has actually changed in classrooms and lecture theatres?</h2>
-        <p>
-          The core shift is structural: content is now accessible on demand (LMS, video, cloud docs),
-          classrooms are hybrid‑ready, and assessments increasingly combine in‑person tasks with
-          digital submissions. For many Australian schools, TAFEs and universities, micro‑credentials
-          and flexible timetabling extend learning beyond a fixed campus week.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          Technology delivers the most value when it frees teacher time for feedback and higher‑order
-          learning, rather than simply moving lectures from a room to a screen.
-        </QuoteBlock>
-
-        <h2>Access and flexibility: online, blended and micro‑credentials</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b69469f9-6322-4f77-bded-0fe9fa4e0d43.jpg?alt=media&token=fbfce89e-cba1-4a4b-8c7e-425fe04f80e0" alt="People collaborate in a tech startup setting, showcasing access and flexibility in online learning environments." className="w-full rounded-lg my-8" />
-
-        <p>
-          Online and blended delivery broaden who can participate — regional learners, carers, and
-          people working part‑time. Recorded lectures and flexible labs reduce timetable friction, and
-          short micro‑credentials let Australians upskill without committing to a full degree. The
-          trade‑off is ensuring equitable device/data access and maintaining engagement without
-          overloading learners.
-        </p>
-
-        <h2>Personalised learning and assessment: adaptive platforms and fast feedback</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-07d35ee9-4b67-40d3-beef-a74b10562150.jpg?alt=media&token=7862f921-cc7a-4770-b0de-c2e3fa152c73" alt="Diverse team collaborating in a tech startup, showcasing personalized learning and adaptive assessment tools." className="w-full rounded-lg my-8" />
-
-        <p>
-          Low‑stakes quizzes, interactive notebooks, and adaptive practice tools offer immediate
-          feedback and targeted exercises. Analytics help educators spot misconceptions early. These
-          gains rely on clear learning outcomes and authentic tasks — otherwise tools can drift into
-          busywork or feel punitive.
-        </p>
-
-        <h3>Has technology improved outcomes?</h3>
-        <p>
-          Evidence suggests technology can improve engagement and the speed/quality of feedback when
-          aligned to sound pedagogy. Impact depends on implementation: pacing, task design, and how
-          teachers use insights to adjust instruction matter more than the brand of tool.
-        </p>
-
-        <h2>Teacher–technology collaboration: planning, feedback and co‑design</h2>
-        <p>
-          The strongest improvements come when technology augments teacher practice: streamlining
-          admin, centralising resources, and supporting timely feedback. Professional learning and
-          collaborative planning time help staff co‑design activities that use tools intentionally,
-          not incidentally.
-        </p>
-
-        <QuoteBlock title="Co‑teaching with tech" variant="orange">
-          Let tools handle routine admin and practice feedback; teachers invest time where it counts —
-          relationships, thinking skills, and targeted support.
-        </QuoteBlock>
-
-        <h2>Collaboration and community: from group chats to cloud documents</h2>
-        <p>
-          Real‑time documents, version history, and shared whiteboards make peer learning visible and
-          reviewable. Students can contribute asynchronously, record short presentations, and reflect
-          with timestamps. Clear norms (naming files, roles, conflict resolution) keep collaboration
-          constructive.
-        </p>
-
-        <h2>The cons: distraction, equity gaps, and privacy risks</h2>
-        <p>
-          Always‑on devices can fragment attention; not all learners have reliable hardware or data;
-          and platforms vary in privacy controls. Australian contexts also need to consider data
-          retention, parental consent, and academic integrity when using AI‑enabled tools.
-        </p>
-
-        <h3>How to reduce the downside in Australian contexts</h3>
-        <p>
-          Use minimal‑distraction modes (focus settings, locked browsers) for key tasks, provide
-          offline or low‑bandwidth options, and teach students to manage notifications. Prefer tools
-          with transparent privacy controls and accessibility features, and make expectations explicit
-          (e.g., what AI assistance is allowed and how to acknowledge it).
-        </p>
-
-        <QuoteBlock title="Practical checklist" variant="purple">
-          Default to low‑distraction settings, provide offline options, set clear AI/use policies,
-          and align tools to authentic outcomes you can observe.
-        </QuoteBlock>
-
-        <ArticleStepList
-          title="Step‑by‑step actions"
-          steps={[
-            { label: 'Define one learning outcome you want to improve (e.g., faster feedback).' },
-            { label: 'Pick a low‑friction tool that fits your context and privacy needs.' },
-            { label: 'Run a 2–3 week pilot with clear norms (focus modes, file naming, roles).' },
-            { label: 'Measure what changed: engagement, feedback speed/quality, outcomes.' },
-            { label: 'Iterate or swap tools; keep what measurably helps learning.' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Start small. One outcome, one class, one tool. Measure, then scale what works.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Closing thoughts: tools change, good teaching endures</h2>
-        <p>
-          Technology will keep shifting — from LMS features to AI‑assisted feedback — but the anchor
-          stays the same: clear learning goals, inclusive design, and timely feedback. Use evidence,
-          run short pilots, and share what works with your community. That’s how Australian learners
-          benefit at scale.
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
-        body="Join the MLAI community to collaborate with peers across Australia."
-        buttonText="Get in touch"
-        buttonHref="/contact"
-        note="Not‑for‑profit, community‑first."
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
