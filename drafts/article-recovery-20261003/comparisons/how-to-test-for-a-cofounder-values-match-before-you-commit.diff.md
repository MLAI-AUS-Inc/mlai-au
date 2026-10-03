# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-test-for-a-cofounder-values-match-before-you-commit.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-test-for-a-cofounder-values-match-before-you-commit.tsx
@@ -1,225 +1,116 @@
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/solid'
-import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import AudienceGrid from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
+import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
+import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
+import AuthorBio from '~/components/AuthorBio'
+import ArticleTocPlaceholder from '~/components/articles/ArticleTocPlaceholder'
+import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
+import { CofounderWorkedRecord } from '~/components/articles/CofounderWorkedRecord'
+import { COFOUNDER_EVENT_CARD, COFOUNDER_HANDOVER, COFOUNDER_PROVENANCE, COFOUNDER_REPLY_CHECKS, COFOUNDER_TIME_EXAMPLE, COFOUNDER_TRIAL_BLANK, COFOUNDER_TRIAL_BRIEF, COFOUNDER_TRIAL_COMPLETED, COFOUNDER_TRIAL_DOWNLOAD, COFOUNDER_TRIAL_FIELDS, COFOUNDER_TRIAL_PATH } from '~/lib/cofounder-working-decisions'

 export const useCustomHeader = true
+export const CATEGORY = 'featured'
+export const SLUG = 'how-to-test-for-a-cofounder-values-match-before-you-commit'
+export const DATE_PUBLISHED = '2026-03-14'
+export const DATE_MODIFIED = '2026-09-11'
+export const DESCRIPTION = 'Plan a low-risk cofounder working trial with a bounded brief, synthetic-data example and observation record. Separate observed behaviour from assumptions about compatibility.'
+export const FEATURED_FOCUS = 'startups'
+const TITLE = 'A cofounder working trial: brief, observe and debrief'
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, date: DATE_PUBLISHED, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, description: DESCRIPTION, author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: '', imageAlt: '' }

-const TOPIC = "How to Test for a Cofounder Values Match Before You Commit"
-export const CATEGORY = "featured"
-export const SLUG = "how-to-test-for-a-cofounder-values-match-before-you-commit"
-export const DATE_PUBLISHED = "2026-03-14"
-export const DATE_MODIFIED = "2026-03-14"
-export const DESCRIPTION = "Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks."
-const HERO_IMAGE = ""
-const HERO_IMAGE_ALT = "How to Test for a Cofounder Values Match Before You Commit"
-export const FEATURED_FOCUS = "startups"
-
-const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
-const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
-const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL
-
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
-}
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: "How do you test for a cofounder values match before starting a company?", answer: "Use action, not just conversation. First define your own non-negotiables in writing. Then run a short trial project with real deadlines and shared pressure, and pair that with direct questions about conflict, risk, money, and decision-making." },
-  { id: 2, question: "How long should a cofounder trial project last?", answer: "A two- to four-week trial is often enough to reveal patterns without creating too much complexity. The key is not length alone, but whether the work includes clear deliverables, time pressure, and a structured debrief at the end." },
-  { id: 3, question: "What behaviours matter most during a cofounder trial?", answer: "Look for how the person handles missed deadlines, feedback, disagreement, ambiguity, and other people. Early honesty, accountability, and respect usually matter more than perfect output." },
-  { id: 4, question: "What questions should you ask a potential cofounder?", answer: "Ask for examples from past conflict, failure, and trade-offs. Also use scenario questions about buyout offers, fundraising, salaries, runway, equity, and who makes final decisions when founders disagree." },
-  { id: 5, question: "Can complementary skills make up for weak values alignment?", answer: "Usually not for long. Skills explain what each founder can do, but values shape how they work together when the startup is under pressure. Misalignment on ethics, risk, fairness, or work style tends to create deeper conflict later." },
-  { id: 6, question: "What should happen after you confirm a strong values match?", answer: "Turn the fit into structure. Agree on roles, ownership, pay, decision rights, and what happens if one founder leaves. Trust matters, but a healthy cofounder relationship also needs clear agreements." },
+export const faqItems = [
+ { id: 1, question: 'How long should a cofounder working trial last?', answer: 'There is no validated duration in this guide. Choose a small task and time limit both people can genuinely accept. A short exercise provides limited observations; it cannot confirm a durable partnership.' },
+ { id: 2, question: 'Should a trial be high-stakes to reveal someone’s values?', answer: 'No. Use real but bounded decisions without manufacturing pressure, withholding information or putting customers at risk. Do not use the exercise to obtain unpaid production work.' },
+ { id: 3, question: 'Does a good demo mean the partnership is a good fit?', answer: 'No. Review the work and the collaboration separately: responsibilities, permissions, communication, error handling and unresolved differences. AI-generated code or a polished demo does not show who understood, tested or maintained it.' },
+ { id: 4, question: 'What happens after the debrief?', answer: 'Choose whether to stop, pause or agree another bounded step. A trial does not settle employment, pay, equity or IP. Resolve applicable terms and obtain appropriate advice before a commitment that depends on them.' },
 ]

-export const summaryHighlights = {
-  heading: "Key facts: How to Test for a Cofounder Values Match Before You Commit",
-  intro: "Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks.",
-  items: [
-    { label: "Start with your own standards", description: "Write down your non-negotiables, working preferences, and deal-breakers before you assess anyone else. Clear standards make the cofounder search more honest." },
-    { label: "Test values through real work", description: "A short trial project with deadlines, clear deliverables, and shared pressure is one of the best ways to see how a potential cofounder behaves when conditions are not ideal." },
-    { label: "Watch what happens under strain", description: "Pay attention to missed deadlines, feedback style, honesty about problems, and how they treat other people. These moments reveal operating values better than polished conversation." },
-  ],
+export default function ArticleContent() {
+ return <div className="bg-white">
+  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
+   title={TITLE} titleHighlight="brief, observe and debrief" headerBgColor="cyan"
+   summary={{ heading: 'Observe a small piece of work—not a whole person', intro: 'For prospective founders who have discussed expectations and want to decide whether to explore collaborating further.', items: [
+    { label: 'Bound the task', description: 'Agree scope, capacity, permissions and stopping rules before starting.' },
+    { label: 'Keep an observation log', description: 'Record what happened, the explanation and what remains unknown.' },
+    { label: 'Debrief separately, then together', description: 'Review delivery and collaboration without turning a demo into a compatibility score.' },
+   ] }}
+  />
+  <article data-cf-article-body className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
+   <p>A cofounder working trial should answer a limited question: can we plan, do and review this particular task together under agreed conditions? Choose a small, reversible exercise, record the work and discuss what you learned. A successful trial is not proof that the relationship will survive a company’s future demands.</p>
+   <p>If you have not discussed commitment, operating boundaries and disagreement, start with the <Link to="/articles/featured/how-to-assess-cofounder-values-match-before-you-commit">four cofounder conversations</Link>. This page is the next step: an example brief and debrief, not another list of personality questions.</p>
+   <p><strong>Correction, 9 September 2026:</strong> the previous article called for a high-stakes trial and implied that two to four weeks was enough to establish fit. This guide does not establish an optimal duration or a reliable compatibility test. It also removes repeated passages and an unsupported startup-failure attribution.</p>
+   <ArticleTocPlaceholder />
+   <h2 id="source">Why try working together?</h2>
+   <p><a href="https://www.blackbird.vc/blog/the-cofounder-question">Blackbird’s “The cofounder question”, published 5 July 2022</a>, recommends working together before committing and discussing the experience candidly. That is investor/practitioner advice, not evidence that a particular timeframe predicts success. The synthetic exercise below is MLAI editorial material, not a Blackbird programme or a study of founders.</p>
+   <h2 id="boundaries">Agree boundaries before assigning tasks</h2>
+   <p>Participation must be voluntary, with a clear way to stop. Do not use a “cofounder trial” label to obtain unpaid production work or bypass obligations. If work will benefit an operating business or a customer, resolve its terms, payment, permissions and appropriate advice before it starts.</p>
+   <p>If this is really a hiring assessment, consult the <a href="https://www.fairwork.gov.au/starting-employment/unpaid-work/unpaid-trials">Fair Work Ombudsman’s unpaid-trial guidance</a>. That page addresses demonstrations for a vacant job, with limits on when unpaid trials are lawful; it does not approve a cofounder arrangement. The example below is not a way to classify real work as unpaid.</p>
+   <ul>
+    <li><strong>Scope:</strong> one learning question and one deliverable, with explicit exclusions.</li>
+    <li><strong>Capacity:</strong> each person’s agreed maximum time and available communication windows.</li>
+    <li><strong>Access:</strong> no customer data, production credentials, employer assets or purchases without the required permission.</li>
+    <li><strong>Terms:</strong> clarify costs, ownership and use of outputs, confidentiality and any payment questions. This article does not determine the legal arrangement.</li>
+    <li><strong>Stopping:</strong> either person can pause the exercise; agree how to handle files, access and outstanding commitments.</li>
+   </ul>
+   <p>Use normal agreed constraints, not invented emergencies. Unexpected events are a reason to communicate and revisit the scope, not an excuse to pressure someone to work beyond their limit.</p>
+   <h2 id="brief">Worked example: a synthetic event-information demo</h2>
+   <p><strong>Fictional teaching brief:</strong> Alex and Morgan have agreed to explore one learning exercise, not form a company. They choose a text-only mock-up to practise negotiating scope and reviewing unsupported answers. You can inspect its entire deliverable below without writing code.</p>
+   <p>{COFOUNDER_PROVENANCE}</p>
+   <blockquote aria-label="Invented event card">{COFOUNDER_EVENT_CARD}</blockquote>
+   <p>This card is test data, not an MLAI listing. There are no real attendees, live organisers, ticket sales, external sending or deployed service.</p>
+   <dl aria-label="Completed fictional trial brief" className="rounded-xl border border-slate-300 bg-slate-50 p-5">{COFOUNDER_TRIAL_BRIEF.map(([field, value]) => <div key={field} className="my-5"><dt className="font-semibold">{field}</dt><dd className="ml-0 mt-1">{value}</dd></div>)}</dl>
+   <p>AI coding tools are optional. If used, keep prompts free of private information, record which parts were generated and have the other person review the change. Do not judge contribution by lines of code or prompt count; ask each person to explain the behaviour and the checks they performed.</p>
+   <h3 id="capacity">Capacity includes review and the debrief</h3>
+   <p><strong>Illustrative time budget, not an estimate of required effort:</strong> each person agrees to a maximum of six hours. They each allocate three hours to their task, one to reviewing the other person’s work, one to checks and handover, and one to the debrief. That is 6 + 6 = 12 person-hours in total, not twelve hours of feature building. Record actual time separately; simplify or stop when capacity runs out.</p>
+   <p>One person drafts the interface and answer behaviour; the other prepares the test cases and handover outline. Both review the other’s work. This division is an example, not evidence that each contribution has equal commercial value or implies any equity split.</p>
+   <h3 id="checks">Inspect the complete mock-up and unchanged-input review</h3>
+   <p>Read each original input and authored reply, then open its review. T3 contains a deliberate unsupported price. The revised cards match the four stated expected texts, but this is a comparison of fixed teaching text—not a model run, an independent security test or a measure of cofounder compatibility.</p>
+   {COFOUNDER_REPLY_CHECKS.map(row => <section key={row.id} data-trial-check={row.id} aria-label={`Trial check ${row.id}`} className="my-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
+    <h4 className="mt-0">{row.id}: {row.input}</h4>
+    <p><strong>Initial authored reply:</strong> {row.before}</p>
+    <details className="rounded-lg border border-slate-300 bg-white p-4"><summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Inspect the review for {row.id}</summary>
+     <p><strong>Expected:</strong> {row.expected}</p><p><strong>Revised authored reply:</strong> {row.after}</p><p>{row.note}</p>
+    </details>
+   </section>)}
+   <p>Keep failed outputs alongside corrected ones. These four synthetic checks are not a security evaluation, a benchmark or evidence of real-user demand. If a model is introduced later, the evaluation and permission questions change; do not assume this fixed-answer exercise validates it.</p>
+   <h2 id="observations">Separate observation from interpretation</h2>
+   <div role="region" aria-label="Observation and interpretation comparison" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
+   <table className="w-full min-w-[42rem] table-fixed"><thead><tr><th scope="col">Fictional observation</th><th scope="col">Unwarranted conclusion</th><th scope="col">Useful debrief question</th></tr></thead><tbody>
+    <tr><td>A task slipped; its owner notified the other person before the agreed check-in and proposed a smaller deliverable</td><td>“They are unreliable” or “they always communicate well”</td><td>Was the revised scope acceptable, and what caused the original estimate to miss?</td></tr>
+    <tr><td>The demo answered three checks correctly but invented a ticket price; the reviewer retained the failure and the pair corrected it</td><td>“Three out of four proves we can ship”</td><td>Why did the unsupported answer appear, and what was retested after the correction?</td></tr>
+    <tr><td>Someone proposed adding a real attendee file; the pair stopped because permission was not established</td><td>“The request proves bad character” or “a pause proves all privacy risks are solved”</td><td>Was the access boundary understood, and what remains outside the exercise?</td></tr>
+   </tbody></table>
+   </div>
+   <p>An explanation may change your interpretation without changing the observation. Let both people correct the log. Do not manufacture these situations to secretly evaluate someone, and do not publish their mistakes as a portfolio case study without permission.</p>
+   <h2 id="review">Trial-project review</h2>
+   <p>Write your own debrief before meeting. Compare evidence and unresolved questions, not numerical ratings of each other.</p>
+   <p><strong>Invented time log, not measured productivity:</strong> Alex uses six hours and Morgan uses five hours 45 minutes. More checking displaces optional styling. These totals do not establish equal contribution value or a recommended trial length.</p>
+   <div role="region" aria-label="Invented trial time log" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
+    <table className="w-full min-w-[30rem] table-fixed"><thead><tr><th scope="col">Activity</th><th scope="col">Alex (hours)</th><th scope="col">Morgan (hours)</th></tr></thead><tbody>{COFOUNDER_TIME_EXAMPLE.map(row => <tr key={row.activity}><th scope="row">{row.activity}</th><td>{row.alex}</td><td>{row.morgan}</td></tr>)}</tbody></table>
+   </div>
+   <CofounderWorkedRecord id="completed-trial-record" title="Read the completed fictional debrief" label="Completed fictional trial debrief" fields={COFOUNDER_TRIAL_FIELDS} values={COFOUNDER_TRIAL_COMPLETED} />
+   <h3 id="handover">The completed handover</h3>
+   <p>{COFOUNDER_HANDOVER}</p>
+   <p><a href={COFOUNDER_TRIAL_DOWNLOAD} download="mlai-cofounder-trial-brief-and-debrief.txt">Download the editable trial brief and debrief (.txt)</a>. Includes the brief, full mock-up, original failure, invented time log, filled debrief, handover and blank copies. Nothing is submitted to MLAI.</p>
+   <details className="rounded-xl border border-slate-300 p-5"><summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Copy a blank trial review</summary>
+    <pre className="whitespace-pre-wrap break-words" aria-label="Trial-project review">{COFOUNDER_TRIAL_BLANK}</pre>
+   </details>
+   <p>Add actual time, the unchanged test inputs, failed outputs and any agreed corrections. Agree where the record is kept and who can access it. Keep personal circumstances out of any shared version unless the person explicitly agrees.</p>
+   <h2 id="next">Decide only what the evidence supports</h2>
+   <p>You can agree another bounded exercise, pause for a missing answer or stop. Do not turn a good demo into an automatic decision to incorporate, share equity or leave employment. Those are separate commitments with separate consequences and advice needs.</p>
+   <p>If you continue, name what the next step is meant to reveal. If you stop, settle the agreed handling of work, access and outstanding terms. Neither outcome means the exercise was wasted: discovering a mismatch in availability or expectations can be a useful result.</p>
+   <h2 id="community">Discuss the method without exposing the other person</h2>
+   <p>Bring a question such as “How did you separate delivery feedback from assumptions about motivation?” to an MLAI session about startup collaboration. Share a synthetic or permission-cleared example. Check the actual topic and format before registering; attending an event is not a cofounder assessment or matching process.</p>
+   <p>MLAI publishes this guide and runs events; this is an affiliated invitation. You can discuss a process question without naming a potential cofounder or sharing their private record.</p>
+   <ArticleEventPreference articlePath={COFOUNDER_TRIAL_PATH} idPrefix="cofounder-trial" description="Carry only your preferred event format to the calendar. Check the actual topic, date and participation format; no private trial notes are sent and no place or suitable cofounder is promised." />
+   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+   <h2 id="scope">Source and scope</h2>
+   <p>Blackbird and Fair Work sources were rechecked on 11 September 2026. Blackbird supports the practitioner recommendation to work together and debrief, not a validated duration; this guide does not adopt its equity advice, programme availability or historical statistics. Fair Work addresses hiring trials, not the legal status of this hypothetical pair. The brief, reply cards, time log and debrief are invented teaching material, not observed founder work, a delivered MLAI project or independent professional review.</p>
+   <ArticleFAQ items={faqItems} />
+   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
+  </article>
+ </div>
 }
-
-export const articleMeta = {
-  title: "How to Test for a Cofounder Values Match Before You Commit",
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
-  featuredFocus: FEATURED_FOCUS,
-}
-
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
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"Research and founder interviews often point to cofounder conflict as a major reason startups stall or fail. That is why a strong skills mix is helpful, but it is not enough. Skills explain what each person can do."}</p>
-        <p>{"A cofounder values match shows up in hard moments, not polished coffee chats. The real test is action. Before you commit, you need ways to see how a potential cofounder works, disagrees, shares credit, and handles uncertainty. That is the core idea of this guide: do not only discuss values, design small real-world tests for them."}</p>
-        <p>{"That is why a strong skills mix is helpful, but it is not enough. Skills explain what each person can do. Research and founder interviews often point to cofounder conflict as a major reason startups stall or fail. The real test is action. Before you commit, you need ways to see how a potential cofounder works, disagrees, shares credit, and handles uncertainty. That is the core idea of this guide: do not only discuss values, design small real-world tests for them."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks."
-          width={1600}
-          height={1067}
-        />
-
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Builders',
-              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        <QuoteBlock title="Key insight" variant="purple">
-          {"Write down your non-negotiables, working preferences, and deal-breakers before you assess anyone else. Clear standards make the cofounder search more honest."}
-        </QuoteBlock>
-          <h2>{"Step 1: Audit and Document Your Own Non-Negotiables"}</h2>
-          <p>{"Before you test whether a potential cofounder matches your values, you need a written view of your own. Many founders stay vague here. If your own values are still fuzzy, almost any early conversation can feel promising because there is no clear standard to compare against."}</p>
-          <p>{"A nice-to-have might be shared hobbies, similar communication style, or preference for the same productivity tools. A non-negotiable is different. It is a value or operating rule that, if broken, will create lasting conflict. Examples include honesty with investors, willingness to challenge each other directly, commitment to inclusive hiring, or refusing to build AI products that cross your ethical line."}</p>
-          <p>{"Founders should also look beyond mission language and test practical values. Risk tolerance is a major one. One founder may be comfortable bootstrapping for years, while another expects aggressive fundraising and fast hiring. Lifestyle expectations matter too. Writing these points down forces you to move from abstract identity to real operating choices."}</p>
-          <p>{"If you work in AI, add explicit statements about responsibility and impact. A short founder values sheet can help: list your top five non-negotiables, your top three working-style preferences, and three scenarios that would make you leave a partnership. Once that document exists, your cofounder search becomes sharper, faster, and more honest because you are testing against something concrete instead of relying on chemistry alone."}</p>
-          <h2>{"Step 2: Execute a High-Stakes Trial Project"}</h2>
-          <p>{"A short trial project is often the most reliable way to test for a cofounder values match."}</p>
-          <p>{"The best trial projects usually run for two to four weeks. Without real constraints, you are only observing compatibility in ideal conditions."}</p>
-          <p>{"Think of the trial as a stress test, not a chemistry test."}</p>
-          <p>{"A short trial project is often the most reliable way to test for a cofounder values match. Without real constraints, you are only observing compatibility in ideal conditions. The best trial projects usually run for two to four weeks. Think of the trial as a stress test, not a chemistry test. Write the trial brief before day one. Also agree on practical norms like response times, meeting cadence, and what quality bar is acceptable."}</p>
-          <h3>{"Set the rules before the work starts"}</h3>
-          <p>{"Write the trial brief before day one. Also agree on practical norms like response times, meeting cadence, and what quality bar is acceptable. These details may feel administrative, but they are exactly where hidden values differences tend to surface."}</p>
-          <p>{"This setup helps you separate genuine misalignment from simple confusion. It may be a different value ranking."}</p>
-          <h3>{"Watch behaviour when things go wrong"}</h3>
-          <p>{"Does your potential cofounder surface the problem early or hide it? Under pressure, people usually reveal their default operating values."}</p>
-          <p>{"That includes contractors, early hires, customers, and community members."}</p>
-          <p>{"At the end of the trial, run a structured debrief. Each person should answer the same questions about what worked, what created friction, where trust increased, and what felt misaligned. If the output was decent but the working experience felt brittle or one-sided, that is a warning sign."}</p>
-
-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Step 1: Audit and Document Your Own Non-Negotiables",
-            "Step 2: Execute a High-Stakes Trial Project",
-            "Step 3: Stress-Test Conflict Resolution Through Hard Questions",
-            "Making the Final Decision to Partner Up",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Step 3: Stress-Test Conflict Resolution Through Hard Questions"}</h2>
-          <p>{"A values match rarely shows up in a relaxed coffee chat. Ask for specific examples from past jobs, side projects, or startup attempts. Questions like, \u201cTell me about a time you strongly disagreed with a teammate,\u201d or \u201cWhat is a failure you still think about?\u201d are useful because they uncover patterns, not polished ideals."}</p>
-          <p>{"Scenario questions are also powerful because they force both founders to make values visible. You are looking for alignment on risk, ambition, fairness, and decision-making style. If one founder optimises for speed and upside while the other protects stability and control, that gap will matter later."}</p>
-          <p>{"Ask how much runway each person has, what salary they need, whether they support family members, and how long they can work without predictable income. Then talk about equity in practical terms, not vague goodwill. These discussions can feel awkward, but avoiding them is worse. Many cofounder conflicts are not really about personality."}</p>
-          <p>{"Ask for specific examples from past jobs, side projects, or startup attempts. Questions like, \u201cTell me about a time you strongly disagreed with a teammate,\u201d or \u201cWhat is a failure you still think about?\u201d are useful because they uncover patterns, not polished ideals. A values match rarely shows up in a relaxed coffee chat. You are looking for alignment on risk, ambition, fairness, and decision-making style."}</p>
-          <h2>{"Making the Final Decision to Partner Up"}</h2>
-          <p>{"By the end of a cofounder trial, you should have more than a good feeling. You should have evidence. If the partnership already feels draining in a small test, that is useful data. Walking away early can feel awkward, but it is often the smartest and kindest choice for both people."}</p>
-          <p>{"If the values match is strong, do not stop at verbal alignment. Turn that fit into clear decisions about roles, ownership, decision-making, pay, and what happens if one person leaves. A healthy cofounder relationship needs structure as well as trust. Trust your instincts, but also trust the pattern of behaviour you observed during the trial. The right cofounder should make the mission feel more possible, not more confusing. When both the evidence and your judgment say yes, move forward with clarity and commitment."}</p>
-          <p>{"You should have evidence. If the partnership already feels draining in a small test, that is useful data. Walking away early can feel awkward, but it is often the smartest and kindest choice for both people."}</p>
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"Pay attention to missed deadlines, feedback style, honesty about problems, and how they treat other people. These moments reveal operating values better than polished conversation."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://www.mentessa.com/7-best-practices-for-a-cofounder-matching-service-online/", title: "7 Best Practices for a Cofounder Matching Service Online", publisher: "mentessa.com", description: "", category: "guide"},
-          {id: 2, href: "https://findskill.ai/skills/productivity/co-founder-vetting-checklist/", title: "Co-Founder Vetting Checklist | FindSkill.ai \u2014 Master Any Skill with AI", publisher: "findskill.ai", description: "", category: "guide"},
-          {id: 3, href: "https://onlyfounders.app/all-blogs/cofounder-compatibility-testing-your-cofounder-s-compatibility", title: "Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App", publisher: "onlyfounders.app", description: "", category: "guide"},
-          {id: 4, href: "https://blackbird.vc/blog/the-cofounder-question", title: "The cofounder question | Blackbird", publisher: "blackbird.vc", description: "", category: "guide"},
-          {id: 5, href: "https://www.nfx.com/post/the-pyramid-of-cofounder-success", title: "The Pyramid of Co-Founder Success", publisher: "nfx.com", description: "", category: "guide"},
-          {id: 6, href: "https://www.fwdstart.me/p/how-to-test-for-co-founder-compatibility-and-alignment", title: "How to test for co-founder compatibility and alignment", publisher: "fwdstart.me", description: "", category: "guide"},
-          {id: 7, href: "https://www.charityentrepreneurship.com/post/how-to-successfully-pick-a-co-founder", title: "How to Successfully Pick a Co-Founder", publisher: "charityentrepreneurship.com", description: "", category: "guide"},
-          {id: 8, href: "https://blog.foundersbase.com/how-can-i-vet-or-evaluate-a-potential-co-founders-compatibility/", title: "How can I vet or evaluate a potential co-founder\u2019s compatibility?", publisher: "blog.foundersbase.com", description: "", category: "guide"},
-          {id: 9, href: "https://www.linkedin.com/posts/jmiddleton_choosing-a-co-founder-is-not-like-choosing-activity-7331680314664103936-s2B7", title: "How to find co-founder fit: 4 tests to pass | Jesse Middleton posted on the topic | LinkedIn", publisher: "linkedin.com", description: "", category: "guide"},
-          {id: 10, href: "https://www.antler.co/blog/find-a-co-founder-with-antler", title: "How Antler facilitates co-founder matching", publisher: "antler.co", description: "", category: "guide"},
-          {id: 11, href: "https://www.library.hbs.edu/working-knowledge/cofounder-courtship-how-to-find-the-right-mate-for-your-startup", title: "Cofounder Courtship: How to Find the Right Mate\u2014for Your Startup | Working Knowledge", publisher: "library.hbs.edu", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Continue exploring cofounder decisions"
-            body="Browse MLAI’s startup guides for related questions about founding a company, finding customers and working with others."
-            buttonText="Browse startup and AI guides"
-            buttonHref="/articles"
-          />
-        </div>
-      </div>
-
-        <AuthorBio author={authorDetails} />
-
-        <div className="mt-12">
-          <ArticleFAQ items={faqItems} />
-        </div>
-
-        <ArticleFooterNav backHref="/articles" topHref="#" />
-    </>
-  )
-}
```
