# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-foster-community-engagement.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-foster-community-engagement.tsx
@@ -1,403 +1,135 @@
-/**
- * ARTICLE CONTENT TEMPLATE - React Router v7
- *
- * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
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
- *    - Do NOT use ArticleCallout (deprecated) — use QuoteBlock instead.
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
 import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
+import { DEFAULT_AUTHOR_KEY, getAuthorProfile } from '~/articles/authors'
+import AuthorBio from '~/components/AuthorBio'
+import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
+import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
+import { ENGAGEMENT_PATH, ENGAGEMENT_DOWNLOAD, ENGAGEMENT_BLANK, ENGAGEMENT_PROVENANCE, ENGAGEMENT_RECORD_FIELDS, COMPLETED_ENGAGEMENT_RECORD, FICTIONAL_INVITATION, FICTIONAL_FEEDBACK_NOTES, FICTIONAL_FEEDBACK_DECISIONS, FICTIONAL_FEEDBACK_COUNTS } from '~/lib/community-feedback'

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
-const TOPIC = 'How to foster community engagement'
 export const CATEGORY = 'featured'
 export const SLUG = 'how-to-foster-community-engagement'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-29'
-export const DATE_MODIFIED = '2026-01-29'
-export const DESCRIPTION = 'Practical, Australian-focused guide to foster community engagement: set purpose, include diverse voices, pick methods, close the loop, and measure what matters.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf106b26-0a88-42db-9c1f-6ac3e8d53a9f.jpg?alt=media&token=633f122e-d0b9-4188-aac7-8f1da80c0a63"
-const HERO_IMAGE_ALT = 'People collaborating at a community workshop'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+// Preserve the established public registry date; this is not a new publication.
+export const DATE_PUBLISHED = '2026-01-14'
+export const DATE_MODIFIED = '2026-09-10'
+export const DESCRIPTION = 'Plan an AI-community decision with a fictional feedback cycle, all input notes and an editable record. Separate responses, delivered changes and unresolved barriers.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'How to foster AI community engagement'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf106b26-0a88-42db-9c1f-6ac3e8d53a9f.jpg?alt=media&token=633f122e-d0b9-4188-aac7-8f1da80c0a63'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const summaryHighlights = {
+ heading: 'Give participation a purpose and a visible result',
+ intro: 'For Australian AI-community organisers and volunteers planning a small session where members can make a useful contribution.',
+ items: [
+  { label: 'Make an honest invitation', description: 'State the decision, its limits, who decides and when participants will hear back.' },
+  { label: 'Offer a workable contribution', description: 'Ask what helps people participate; do not equate speaking in a room with being engaged.' },
+  { label: 'Show the follow-through', description: 'Separate suggestions, decisions, delivered changes and unresolved questions.' },
+ ],
 }

-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'What is community engagement?',
-    answer: (
-      <>
-        Community engagement is a structured, two-way process where an organisation or group invites people who are affected by a decision to contribute views, knowledge, and options — and then shows how those contributions shaped the outcome.
-      </>
-    ),
-  },
-  {
-    id: 2,
-    question: 'How do I increase participation in a new community?',
-    answer: (
-      <>
-        Start with a clear purpose and a small, time-boxed pilot. Offer low-friction actions (one-click polls, 15‑minute office hours), recognise contributions publicly, and share a visible “you said, we did” update within two weeks.
-      </>
-    ),
-  },
-  {
-    id: 3,
-    question: 'Which engagement methods work best?',
-    answer: (
-      <>
-        Match methods to your audience and time: co‑design workshops for depth, asynchronous threads for accessibility across time zones, and community ambassadors to reach people who won’t join formal sessions. Blend online and in‑person to widen access.
-      </>
-    ),
-  },
-  {
-    id: 4,
-    question: 'How do we make engagement inclusive in Australia?',
-    answer: (
-      <>
-        Follow inclusive practice: provide multiple channels and formats, use plain English, consider accessibility needs, compensate or recognise lived‑experience contributors, and proactively engage under‑represented groups in culturally safe ways.
-      </>
-    ),
-  },
-  {
-    id: 5,
-    question: 'How often should we report back to the community?',
-    answer: (
-      <>
-        After every engagement cycle. Share a concise update that maps themes to decisions (what changed, what didn’t, and why). A monthly public summary helps maintain trust and momentum.
-      </>
-    ),
-  },
-  {
-    id: 6,
-    question: 'What metrics matter for engagement quality?',
-    answer: (
-      <>
-        Track active participants, diversity of voices, response times, post‑to‑reply ratio, retention, and the percentage of decisions that cite community input. Qualitative trust signals from surveys/interviews round out the picture.
-      </>
-    ),
-  },
+export const faqItems = [
+ { id: 1, question: 'Is community engagement the same as event attendance?', answer: 'No. A headcount shows who attended, not whether people could contribute or influence anything. A talk can still be worthwhile without being a consultation; describe its purpose honestly.' },
+ { id: 2, question: 'Do we have to let participants decide everything?', answer: 'No. Explain what they can influence and what remains the organiser’s responsibility. Do not call an organiser-controlled feedback request co-design or imply that a preference poll transfers final decision-making authority.' },
+ { id: 3, question: 'Is a two-week cycle a proven best practice?', answer: 'No. It is only the timebox used in the fictional example below. Choose a deadline that allows suitable participation, a considered decision and an update you can actually deliver.' },
+ { id: 4, question: 'What if we cannot act on a suggestion?', answer: 'Acknowledge it, explain the constraint and name any next check or decision date. A response is not the same as resolving the issue. If access remains unsuitable, do not describe the activity as accessible to everyone.' },
+ { id: 5, question: 'Can we publish participant feedback as an MLAI case study?', answer: 'Only with an actual record and the necessary permission. Remove identifying details, check the summary with contributors where appropriate, and distinguish what happened from what you infer. The example here is fictional, not MLAI participant research.' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Define what useful participation looks like, make the first contribution manageable and use member feedback to improve the next activity.",
-  items: [
-    { label: 'How do you encourage participation in a community?', description: 'Make actions low-friction, recognise contributions, and publish a quick “you said, we did” update.' },
-    { label: 'How do you measure community engagement?', description: 'Track active members, diversity of voices, response times, retention, and decisions influenced.' },
-    { label: 'What makes engagement inclusive?', description: 'Use multiple channels, plain English, accessible formats, and recognise lived-experience input.' },
-  ],
+export const articleMeta = {
+ title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+ datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+ author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE,
+ imageAlt: 'Person writing on paper beside coloured notes at a table (illustrative image)',
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
+   breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'Community engagement', current: true }]}
+   title={TITLE} titleHighlight="community engagement" headerBgColor="cyan"
+   summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt}
+  />
+  <div data-cf-article-body className="prose prose-lg prose-headings:scroll-mt-24 min-w-0 max-w-4xl mx-auto px-4 py-10 break-words [&_th]:align-top [&_td]:align-top [&_a]:[overflow-wrap:anywhere]">
+   <p>To foster engagement in an AI community, give people a specific way to contribute to something that can still change. Explain the limits, make participation practical, and show what happened to their input. More messages or attendees are not enough to tell you whether that worked.</p>
+   <p>This guide helps an organiser or volunteer plan one small activity: choosing a workshop topic, improving a newcomer session or reviewing a community resource. If you are deciding where to participate yourself, start with our <Link to="/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group">community participation guide</Link>.</p>
+   <p><strong>Updated 10 September 2026:</strong> the example now includes every input note, decision references, a completed record and an editable download. It remains fictional; no permission-cleared MLAI case study or measured engagement improvement is claimed.</p>
+   <ArticleTocPlaceholder />
+
+   <h2 id="influence">Decide what participants can actually influence</h2>
+   <p>Before sending an invitation, finish this sentence: “We need to decide ___; your input can change ___; ___ will make the decision by ___.” If the decision is already fixed, explain it or invite questions instead of asking for preferences you will not use.</p>
+   <p>The Victorian Government’s <a href="https://www.vic.gov.au/better-practice-guide-inclusive-engagement/how-engage-community">inclusive-engagement guide</a>, updated 2 December 2025 and checked 10 September 2026, emphasises clear influence boundaries, early participation and reporting back. It treats co-design as sharing decision-making, not simply collecting comments. This article applies those distinctions to a voluntary AI-community activity; it is not a public-policy consultation procedure.</p>
+   <ul>
+    <li><strong>Still open:</strong> for example, which of two beginner exercises to run and whether questions can be submitted in advance.</li>
+    <li><strong>Fixed:</strong> for example, an existing room booking, the available volunteer hours and a synthetic-data-only demonstration.</li>
+    <li><strong>Decision owner:</strong> the person able to approve the change, not merely the person collecting suggestions.</li>
+    <li><strong>Return path:</strong> the update channel and date, including how someone can correct a misunderstood comment.</li>
+   </ul>
+   <p>The Engagement Institute describes the <a href="https://engagementinstitute.org.au/news/framework-or-certification-why-the-distinction-matters/">IAP2 Spectrum as a way to clarify the public’s role in a decision</a>, not proof that engagement was delivered well. Its <a href="https://engagementinstitute.org.au/about/special-projects/evolution-of-the-spectrum-project/">July/August 2026 review updates</a> distinguish recommendations from a final decision. The <a href="https://www.iap2.org/page/QuestionsandClarifications">IAP2 International clarification page</a> also stated that no final decision had been made when checked on 10 September. This is a dated status check, not an assertion that the process cannot change. We are not reproducing the Spectrum or presenting proposed changes as a new standard.</p>
+
+   <h2 id="invitation">Write an invitation someone can act on</h2>
+   <p><strong>Fictional invitation—not an upcoming event:</strong> {FICTIONAL_INVITATION}</p>
+   <p>Replace the invented dates, contact route and arrangements with ones you can deliver before using this invitation. Say whether the activity is voluntary, what time it asks of people, whether expenses or work are paid, and who to contact about participation needs. The unpaid example is not an MLAI payment policy or advice that advisory work should be unpaid. Do not offer reimbursement, captions, a recording or a private channel unless you can provide it.</p>
+   <p>For a small session, consider these practical checks:</p>
+   <ul>
+    <li>Can someone respond without attending a live discussion or speaking aloud?</li>
+    <li>Do the prompt and exercise make sense without knowing terms such as retrieval, inference or agents?</li>
+    <li>Can people check the format and access arrangements before committing?</li>
+    <li>Can they skip a question or decline without needing to explain personal circumstances?</li>
+    <li>Is there a named person who can respond if the offered participation route does not work?</li>
+   </ul>
+   <p>Do not ask people to disclose a diagnosis or identity just to explain a practical barrier. Keep only the information needed for the activity, agree before attributing comments, and do not upload participants’ notes to an AI service without an appropriate permission and data-handling process. A short form does not make an activity inclusive by itself.</p>
+
+   <h2 id="worked-cycle">A fictional engagement cycle with open issues</h2>
+   <p><strong>Teaching example—not an MLAI event or measured community result:</strong> Lee invites {FICTIONAL_FEEDBACK_COUNTS.invited} existing members. {FICTIONAL_FEEDBACK_COUNTS.discussion} contribute through discussion, {FICTIONAL_FEEDBACK_COUNTS.written} through writing and {FICTIONAL_FEEDBACK_COUNTS.both} through both. That is {FICTIONAL_FEEDBACK_COUNTS.contributors} distinct contributors, not {FICTIONAL_FEEDBACK_COUNTS.discussion + FICTIONAL_FEEDBACK_COUNTS.written}. The {FICTIONAL_FEEDBACK_COUNTS.notes} input notes are not votes. Every ID and observation below is invented, not anonymised real participant data.</p>
+   <ol>
+    <li><strong>Days 1–7:</strong> share the decision boundaries and both participation routes. Ask contributors whether their notes have been understood correctly.</li>
+    <li><strong>Day 8:</strong> group related notes, retain disagreement and mark anything needing clarification. Do not turn several messages from one person into several votes.</li>
+    <li><strong>Day 10:</strong> publish the choice, reasons and outstanding questions. In this example, {FICTIONAL_FEEDBACK_COUNTS.withDecision} notes link to a recorded response and {FICTIONAL_FEEDBACK_COUNTS.needsClarification} need clarification. A response is not the same as resolving the input.</li>
+    <li><strong>Day 14:</strong> run the revised exercise and ask whether the changes helped. Record what was delivered separately from the earlier promise.</li>
+   </ol>
+   <p className="text-sm">The example table scrolls horizontally on small screens. Focus it to scroll with the arrow keys.</p>
+   <div id="feedback-example-table" className="overflow-x-auto scroll-mt-24" role="region" aria-label="Fictional engagement feedback table" tabIndex={0}>
+    <table className="min-w-[48rem] text-base"><caption>Four fictional decisions with linked input; N13/N14 remain unclarified</caption><thead><tr><th>Input and note references</th><th>Decision and response</th><th>Delivery or open issue</th></tr></thead><tbody>
+     {FICTIONAL_FEEDBACK_DECISIONS.map(d => <tr key={d.id} data-feedback-decision={d.id}>
+      <td><strong>{d.id}</strong>: {d.input}<p>Notes: {FICTIONAL_FEEDBACK_NOTES.filter(n => n.decision === d.id).map(n => n.id).join(', ')}.</p></td>
+      <td>{d.decision}<p>{d.response}</p></td><td>{d.delivery}</td>
+     </tr>)}
+    </tbody></table>
+   </div>
+   <details id="feedback-notes" className="my-6 rounded-xl border border-gray-300 p-5 text-base">
+    <summary className="cursor-pointer font-semibold">Inspect all 14 invented input notes</summary>
+    <p>{ENGAGEMENT_PROVENANCE} In a real cycle, keep raw notes private and review a safe, permission-cleared summary before publication.</p>
+    <ol>{FICTIONAL_FEEDBACK_NOTES.map(n => <li key={n.id} data-feedback-note={n.id}><strong>{n.id} / {n.contributor} / {n.route}:</strong> {n.input} <em>{n.decision ? `Linked to ${n.decision}.` : 'Needs clarification; no decision/response recorded.'}</em></li>)}</ol>
+   </details>
+   <p>The two-week span is an editorial timebox, not a validated optimum. A sensitive decision, a paid advisory role or a broader community consultation may require a substantially different process. This example demonstrates traceability, not a claim that it improves trust, retention or attendance.</p>
+
+   <h2 id="measurement">Measure follow-through without inflating the result</h2>
+   <p data-feedback-counts>For the fictional cycle, {FICTIONAL_FEEDBACK_COUNTS.contributors} of {FICTIONAL_FEEDBACK_COUNTS.invited} invited members contributed: about {FICTIONAL_FEEDBACK_COUNTS.contributionPercent}% of that invitation group. It does not show that {FICTIONAL_FEEDBACK_COUNTS.contributionPercent}% of the wider community participated or agreed. Non-response could reflect timing, access, interest or other reasons; the count alone cannot tell you which. The counts are derived from the complete note record, not from adding the two route totals.</p>
+   <p>Keep four separate observations: who was invited, who contributed through each route without double-counting, which inputs received a response, and which promised changes were delivered. Add a short optional question such as “What still made participation difficult?” Small-group responses can identify someone even when names are removed, so avoid publishing identifying combinations or quotations without permission.</p>
+   <p>When the session ends, write one change to keep, one unresolved issue and the next responsible person or decision date. Reporting “we replied to the suggestion” is honest; reporting “the barrier is solved” when it remains is not.</p>
+
+   <h2 id="record">Use the completed decision-and-feedback record</h2>
+   <p>This completed fictional record shows what to retain, what remains unknown and what must not be claimed. It does not substitute for the permission-cleared MLAI example still needed for this guide.</p>
+   <dl aria-label="Completed fictional engagement record" className="rounded-xl border border-gray-300 bg-gray-50 p-5 text-base">
+    {ENGAGEMENT_RECORD_FIELDS.map(([key, label]) => <div key={key} className="mb-5 last:mb-0"><dt className="font-semibold">{label}:</dt><dd className="ml-0 mt-1">{COMPLETED_ENGAGEMENT_RECORD[key]}</dd></div>)}
+   </dl>
+   <p><a href={ENGAGEMENT_DOWNLOAD} download="mlai-community-feedback-record.txt">Download the editable feedback record (.txt)</a>: the invitation, completed record, all 14 notes and four decisions, plus blank private-log and public-update templates. No account is needed; the file submits nothing and grants no permission to publish real participant data.</p>
+   <p>The on-page template below is also available to copy. Keep unperformed steps marked not done; do not turn a plan or an organiser response into a delivered outcome.</p>
+   <pre className="whitespace-pre-wrap break-words" aria-label="Community decision-and-feedback record">{ENGAGEMENT_BLANK}</pre>
+
+   <h2 id="mlai">Participate before offering to organise</h2>
+   <p>MLAI publishes this guide and runs events, so this is an affiliated invitation. Choose a relevant session, bring one useful question and learn how its participation works. Ask the organiser before proposing a feedback exercise or volunteer role, without treating attendees as a contact list. A ticket does not grant research access, a facilitation role or permission to collect participant details.</p>
+   <ArticleEventPreference articlePath={ENGAGEMENT_PATH} idPrefix="engagement" description="Choose a preference for the MLAI calendar. This does not send feedback notes, volunteer you as an organiser or book a place." />
+   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+   <p>For a participant’s next step after a useful conversation, see <Link to="/articles/featured/why-australian-startups-need-stronger-ai-communities">turning community feedback into a testable action</Link>. That is a different task from organising the feedback process described here.</p>
+   <h2 id="scope">What this guide does and does not establish</h2>
+   <p>The sources provide engagement guidance; the invitation, example and record are MLAI editorial aids, not certified methods. No permission-cleared MLAI engagement study is presented. To add a real case later, retain the original ask, agreed data use, participant-checked themes, decisions and delivered changes; do not relabel this fictional cycle as experience.</p>
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
-    href: 'https://www.vic.gov.au/better-practice-guide-inclusive-engagement/how-engage-community',
-    title: 'How to engage with community — Better Practice Guide: Inclusive engagement',
-    publisher: 'State Government of Victoria',
-    description: 'Official guidance on planning and running inclusive community engagement in Victoria.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://visiblenetworklabs.com/guides/community-engagement-101/',
-    title: 'Community Engagement 101: Ultimate Beginner\'s Guide',
-    publisher: 'Visible Network Labs',
-    description: 'Overview of engagement strategies and network mapping concepts for practitioners.',
-    category: 'analysis',
-  },
-  {
-    id: 3,
-    href: 'https://engagementinstitute.org.au/resources/',
-    title: 'IAP2 Public Participation Spectrum',
-    publisher: 'Engagement Institute (formerly IAP2 Australasia)',
-    description: 'Widely used framework describing levels of participation from Inform to Empower.',
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
-          <strong>{TOPIC}</strong> — In Australia, communities engage when the purpose is clear,
-          participation is accessible, and updates show how input changed the outcome. This guide
-          distils inclusive practice, practical methods, and the metrics that matter so your
-          community can contribute with confidence.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          width={1200}
-          height={800}
-          containerClassName="my-10"
-          imageClassName="rounded-3xl"
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'AI practitioners & builders',
-              description: 'For engineers and data folks running open, safe community spaces.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & career switchers',
-              description: 'Practical ways to contribute, learn, and be heard without overwhelm.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Designers & community leads',
-              description: 'Facilitate inclusive, feedback‑rich sessions and report back well.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* Derived from competitor patterns: purpose → inclusivity → methods → loop → metrics */}
-        <h2>Set the purpose and scope before inviting people</h2>
-        <p>
-          Engagement runs on clarity. State the decision or problem, what is “on the table,” who can
-          influence it, and when. Define a small pilot window (e.g., two weeks) and the exact
-          artefacts you will produce (summary, draft recommendations, implementation plan).
-        </p>
-        <QuoteBlock title="Key insight" variant="purple">
-          People lean in when they can see the line from input to decision — publish that line as a
-          simple “you said, we did” table at the end of each cycle.
-        </QuoteBlock>
-
-        <h2>Make it inclusive: reach, access, and representation</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fea18046-02c2-4a4a-995f-0a5dc8a6cb5e.jpg?alt=media&token=0ab342e9-2add-4de1-afce-24ce188b4769" alt="Diverse team collaborating in a tech startup, embodying inclusivity and innovation in a retro 90s film style." className="w-full rounded-lg my-8" />
-
-        <p>
-          Borrow from inclusive engagement guidance used by Australian public bodies: meet people in
-          multiple channels, offer accessible formats, and recognise lived experience. Proactively
-          invite under‑represented voices and ensure culturally safe participation.
-        </p>
-        <ul>
-          <li>Offer synchronous and asynchronous options (workshops, forums, email, surveys).</li>
-          <li>Use plain English and alt text; provide captions or transcripts for recordings.</li>
-          <li>Compensate or formally recognise contributors where appropriate.</li>
-        </ul>
-
-        <h2>Choose fit‑for‑purpose engagement methods</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d5506779-4f64-4fa4-9a4e-e7d09bd437c4.jpg?alt=media&token=7301b967-9e82-4efa-97c7-e211eaa0cbed" alt="People collaborating in a vibrant tech startup, styled with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />
-
-        <p>
-          Match the method to the outcome you need. Blend depth (co‑design) with reach (asynchronous
-          prompts) and trust‑building (community ambassadors).
-        </p>
-        <h3>Co‑design workshops (depth)</h3>
-        <p>
-          Small, facilitated sessions to unpack needs, sketch options, and test trade‑offs. Publish a
-          short read‑out within 48 hours.
-        </p>
-        <h3>Asynchronous threads and micro‑prompts (reach)</h3>
-        <p>
-          Use structured prompts in forums or chat to gather ideas over days, enabling people across
-          time zones or with caring responsibilities to participate.
-        </p>
-        <h3>Community ambassadors (trust)</h3>
-        <p>
-          Equip respected community members to invite peers, summarise local views, and surface
-          barriers. Recognise their contribution publicly.
-        </p>
-
-        <QuoteBlock title="Practical checklist" variant="orange">
-          <ul>
-            <li>State the decision, scope, and timeline up front.</li>
-            <li>Provide 2–3 participation paths (workshop, async, ambassador).</li>
-            <li>Publish a “you said, we did” within two weeks.</li>
-          </ul>
-        </QuoteBlock>
-
-        <ArticleStepList
-          title="Run a two‑week pilot"
-          steps={[
-            { label: 'Define purpose, scope, and success measures' },
-            { label: 'Map stakeholders and inclusion needs' },
-            { label: 'Pick 2–3 methods matched to your audience' },
-            { label: 'Launch, facilitate, and summarise themes' },
-            { label: 'Close the loop: publish what changed and why' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <h2>Close the loop and show impact</h2>
-        <p>
-          After each cycle, map themes to actions. Say what changed, what did not, and the rationale.
-          Keep updates short and link to deeper artefacts. This creates accountability and builds
-          momentum.
-        </p>
-        <QuoteBlock title="Pro tip" variant="orange">
-          Use a standing URL for updates (e.g., /engagement-updates) so people always know where to
-          find the latest “you said, we did.”
-        </QuoteBlock>
-
-        <h2>Measure what matters and iterate</h2>
-        <p>
-          Track both participation and quality. Combine quantitative and qualitative signals to see
-          whether engagement is broad, inclusive, and useful.
-        </p>
-        <ul>
-          <li>
-            Participation: active members, post‑to‑reply ratio, response times, retention month‑on‑month.
-          </li>
-          <li>Diversity: representation across demographics, roles, locations.</li>
-          <li>Outcomes: decisions influenced by community input; policy or product changes shipped.</li>
-          <li>Trust: short pulse surveys and interviews to capture confidence over time.</li>
-        </ul>
-
-        <p>
-          Want a broader view on peer networks and collaboration? See our
-          {' '}
-          <Link to="/articles" className="underline underline-offset-4">
-            Community & Collaboration overview
-          </Link>
-          .
-        </p>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Bring it together: pilot, learn, repeat</h2>
-        <p>
-          Start small, include widely, and report back quickly. Repeat this two‑week rhythm and you’ll
-          build trust, surface better options, and make decisions the community can stand behind.
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
-        body="Join the MLAI community to collaborate with fellow AI practitioners in Australia."
-        buttonText="Get recommendations"
-        buttonHref="/contact"
-        note="You can filter by topic, format (online/in-person), and experience level."
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
