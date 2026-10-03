# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-assess-cofounder-values-match-before-you-commit.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-assess-cofounder-values-match-before-you-commit.tsx
@@ -1,277 +1,119 @@
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
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
+import { COFOUNDER_ASSESS_DOWNLOAD, COFOUNDER_ASSESS_PATH, COFOUNDER_CONVERSATIONS, COFOUNDER_PROVENANCE, COFOUNDER_VALUES_BLANK, COFOUNDER_VALUES_COMPLETED, COFOUNDER_VALUES_FIELDS } from '~/lib/cofounder-working-decisions'

 export const useCustomHeader = true
+export const CATEGORY = 'featured'
+export const SLUG = 'how-to-assess-cofounder-values-match-before-you-commit'
+export const DATE_PUBLISHED = '2026-03-30'
+export const DATE_MODIFIED = '2026-09-11'
+export const DESCRIPTION = 'Prepare four cofounder conversations, distinguish values from practical constraints, and record disagreements before deciding whether to try working together.'
+export const FEATURED_FOCUS = 'startups'
+const TITLE = 'Assess cofounder values: four conversations before a working trial'
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-61741a72-5e72-4a5d-aa77-2b18a2d80edd.jpg?alt=media&token=9365304c-09a2-4986-914d-af4699a65f17'
+const HERO_ALT = 'Two people talking at a table, one gesturing and the other listening (illustrative image)'
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, date: DATE_PUBLISHED, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, description: DESCRIPTION, author: getAuthorProfile(DEFAULT_AUTHOR_KEY).name, image: HERO_IMAGE, imageAlt: HERO_ALT }

-const TOPIC = "How to Assess Cofounder Values Match Before You Commit"
-export const CATEGORY = "featured"
-export const SLUG = "how-to-assess-cofounder-values-match-before-you-commit"
-export const DATE_PUBLISHED = "2026-03-30"
-export const DATE_MODIFIED = "2026-03-30"
-export const DESCRIPTION = "How to assess cofounder values match before building together."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-61741a72-5e72-4a5d-aa77-2b18a2d80edd.jpg?alt=media&token=9365304c-09a2-4986-914d-af4699a65f17"
-const HERO_IMAGE_ALT = "Two startup cofounders in"
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
+function ConversationExample({ index }: { index: number }) {
+ const row = COFOUNDER_CONVERSATIONS[index]
+ return <aside data-conversation-example={row.id} aria-label={`Fictional ${row.label.toLowerCase()} conversation`} className="my-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
+  <p className="mt-0"><strong>Fictional example — {row.label}:</strong> {row.question}</p>
+  <p><strong>Alex:</strong> “{row.alex}”</p>
+  <p><strong>Morgan:</strong> “{row.morgan}”</p>
+  <p><strong>Follow-up:</strong> {row.followup}</p>
+  <p className="mb-0"><strong>Decision and remaining question:</strong> {row.decision}</p>
+ </aside>
 }

-export const faqItems: FAQ[] = [
-  { id: 1, question: "What is the difference between cofounder values fit and skills fit?", answer: "Skills fit is about whether your roles complement each other. Values fit is about whether you make tough decisions using similar principles when tradeoffs, pressure, or conflict appear." },
-  { id: 2, question: "Can cofounders succeed if they share a vision but not the same values?", answer: "They may agree on the destination but still clash on how to get there. The grounded sections show that shared direction alone does not prevent conflict over trust, pace, transparency, or decision-making." },
-  { id: 3, question: "What should you ask a potential cofounder to assess values alignment?", answer: "Ask about mission, long-term ambition, time commitment, pace, risk tolerance, money, feedback style, and conflict handling. The goal is to compare real expectations, not just broad statements about working well together." },
-  { id: 4, question: "How long should a cofounder trial project be?", answer: "The source material supports a short, bounded trial rather than an immediate formal commitment. It should be long enough to include real deadlines, shared ownership, and at least one meaningful decision." },
-  { id: 5, question: "What are signs to pause or walk away from a cofounder partnership?", answer: "Pause when important expectations still feel vague after several discussions. Walk away when repeated conversations reveal deep differences on trust, priorities, commitment, or how the company should be built." },
+export const faqItems = [
+ { id: 1, question: 'Does a values match mean agreeing about everything?', answer: 'No. Identify which operating boundaries you both need, which preferences can differ and which practical constraints need a plan. Different opinions are not a failed test; a consequential unresolved difference needs an explicit decision.' },
+ { id: 2, question: 'Can this worksheet confirm cofounder compatibility?', answer: 'No. It records stated expectations and open questions. It is not a validated compatibility score, background check or prediction of startup success. Observe actual collaboration before drawing broader conclusions.' },
+ { id: 3, question: 'Must I disclose private finances or family details?', answer: 'You can discuss the availability, pay requirements and commitments relevant to working together without supplying bank statements or private family information for this exercise. Agree what each person is comfortable recording and who can access it.' },
+ { id: 4, question: 'What should we do when an important answer is unknown?', answer: 'Name the unknown, why it matters and what would help resolve it. Pause commitments that depend on the answer. Do not turn silence or a polite agreement into consent.' },
 ]

-export const summaryHighlights = {
-  heading: "Key facts: How to Assess Cofounder Values Match Before You Commit",
-  intro: "How to assess cofounder values match before building together.",
-  items: [
-    { label: "What a values match really means", description: "A cofounder values match is about shared principles behind hard decisions, not similar personalities. It is separate from both shared vision and complementary skills." },
-    { label: "How to test alignment early", description: "Use structured conversations about mission, commitment, risk, money, communication, and conflict. Direct questions reveal where agreement is real and where assumptions differ." },
-    { label: "Why a short trial matters", description: "A bounded project with deadlines and shared ownership shows how each person behaves under pressure. Consistent actions are a better signal than verbal agreement alone." },
-  ],
+export default function ArticleContent() {
+ return <div className="bg-white">
+  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
+   title={TITLE} titleHighlight="four conversations" headerBgColor="cyan"
+   heroImage={HERO_IMAGE} heroImageAlt={HERO_ALT}
+   summary={{ heading: 'Compare expectations before commitments', intro: 'For Australians exploring a startup with another person—not a contractor application or cofounder-matching service.', items: [
+    { label: 'Prepare separately', description: 'Write what you mean by your priorities before reading the other person’s answers.' },
+    { label: 'Use a concrete decision', description: 'Compare actions and boundaries, not just shared words such as trust or ambition.' },
+    { label: 'Leave with a record', description: 'Keep agreements, differences and unknowns visible. A conversation is not proof of compatibility.' },
+   ] }}
+  />
+  <article data-cf-article-body className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
+   <p>To assess a potential cofounder’s values, choose decisions you might actually face, write your own response, then compare the reasons and boundaries behind each answer. The immediate outcome is a clearer decision about whether to explore working together—not a verdict about someone’s character.</p>
+   <p>This guide is for the conversation stage. If you already have enough agreement to try a small project, use the separate <Link to="/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit">cofounder working-trial guide</Link>. Keep introductions, a working trial and formal company commitments as different decisions.</p>
+   <ArticleTocPlaceholder />
+   <h2 id="basis">What the source supports—and what this guide adds</h2>
+   <p><a href="https://www.ycombinator.com/blog/10-questions-to-discuss-with-a-potential-co-founder">Y Combinator’s questionnaire, published 27 April 2023</a>, recommends answering independently before comparing responses. It covers goals, roles, location, commitment, finances and disagreement, and cautions that a questionnaire cannot replace time working together. This is practitioner guidance, not a validated predictor of compatibility.</p>
+   <p>The four conversations, examples and record below are MLAI editorial exercises. They are not YC’s questionnaire reproduced or a research-backed ranking of people. Use them to make a particular working decision clearer.</p>
+   <h2 id="distinctions">Separate a value, a preference and a constraint</h2>
+   <div role="region" aria-label="Values, preferences and constraints" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
+   <table className="w-full min-w-[42rem] table-fixed"><thead><tr><th scope="col">Type</th><th scope="col">Illustrative statement</th><th scope="col">Question to resolve</th></tr></thead><tbody>
+    <tr><td>Operating boundary</td><td>“We do not present invented customer results as real.”</td><td>What will we do if a pitch needs evidence we do not have?</td></tr>
+    <tr><td>Working preference</td><td>“I prefer written feedback before a call.”</td><td>Can we agree a feedback format both people can use?</td></tr>
+    <tr><td>Practical constraint</td><td>“I can offer six hours a week until my current commitment ends.”</td><td>Does the proposed scope fit that capacity?</td></tr>
+   </tbody></table>
+   </div>
+   <p>Do not treat a caring responsibility, a need for paid work or a different communication style as evidence of weak values. An arrangement may be impractical without either person being untrustworthy. Ask whether a difference can be accommodated, needs more information or prevents this particular partnership.</p>
+   <p>{COFOUNDER_PROVENANCE} Their four conversations below lead to one limited learning exercise, not a decision to form a company.</p>
+   <h2 id="mission">1. Ambition and the first commitment</h2>
+   <p>Discuss what you each want from this project and the smallest commitment you are considering now. A weekend experiment, a part-time business and a venture seeking rapid growth are not interchangeable. Neither a shared product idea nor a shared label such as “startup founder” settles the question.</p>
+   <ul>
+    <li>What useful outcome would make the next experiment worth doing, even if we do not start a company?</li>
+    <li>Which kinds of customer problem do we want to work on, and which would we decline?</li>
+    <li>What evidence would make either of us change direction or stop?</li>
+   </ul>
+   <p>Write down the differences. If one person wants a learning project and the other expects immediate full-time commitment, resolve that before assigning work.</p>
+   <ConversationExample index={0} />
+   <h2 id="capacity">2. Capacity, cost and expectations</h2>
+   <p>Exchange the constraints that affect the proposed work: available hours, response windows, spending limits and whether paid work is required. Each person chooses how much personal context to share. Do not use this worksheet to demand financial records, private family details or evidence of willingness to sacrifice wellbeing.</p>
+   <p>A useful output is specific: “We can each spend up to six hours on the next exercise; neither can promise daytime availability.” That is an example, not a recommended workload. If the task needs more capacity, reduce its scope, find another arrangement or pause. Do not silently assume the other person will absorb the gap.</p>
+   <ConversationExample index={1} />
+   <h2 id="boundaries">3. Evidence, customer data and AI boundaries</h2>
+   <p>For an AI startup, discuss how you will handle a confident but unsupported output, a request to upload private data, or pressure to describe a prototype as production-ready. Ask what each person would do, who may authorise an action and what evidence would be needed first.</p>
+   <ConversationExample index={2} />
+   <p>This records a specific decision, not proof of either person’s overall values or the legality of a future data use. Whether the agreed boundary is followed in practice remains an observation to make, not an assumption to score as passed.</p>
+   <h2 id="disagreement">4. Disagreement, feedback and stopping</h2>
+   <p>Use a low-stakes scenario: the demo has a known error and the deadline is close. Would you reduce scope, delay or show the limitation clearly? Compare the reasons, the people affected and who would decide. Do not manufacture a crisis, conceal information or provoke someone to “reveal their true self.”</p>
+   <p>Agree how someone can raise a concern, request a pause and correct the written record. Ask for a past example only if they can share it without exposing another person’s private information. A single anecdote is context, not verification. Any later reference conversations should be transparent and consent-based.</p>
+   <ConversationExample index={3} />
+   <h2 id="record">Values discussion record</h2>
+   <p>Complete your answers separately, then let each person check how their position is recorded. Use one record per important decision; there is no aggregate compatibility score.</p>
+   <CofounderWorkedRecord id="completed-values-record" title="Read Alex and Morgan’s completed fictional record" label="Completed values discussion record" fields={COFOUNDER_VALUES_FIELDS} values={COFOUNDER_VALUES_COMPLETED} />
+   <p><a href={COFOUNDER_ASSESS_DOWNLOAD} download="mlai-values-discussion-record.txt">Download the editable values discussion record (.txt)</a>. Includes all four examples, the completed record and blank fields; nothing is submitted to MLAI.</p>
+   <details className="rounded-xl border border-slate-300 p-5"><summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">Copy a blank discussion record</summary>
+    <pre className="whitespace-pre-wrap break-words" aria-label="Values discussion record">{COFOUNDER_VALUES_BLANK}</pre>
+   </details>
+   <p>Keep the record private to the agreed participants. Do not upload identifiable notes to an AI tool without appropriate permission. The record is a conversation aid, not a legal agreement, psychological assessment or confirmation that a partnership will work.</p>
+   <h2 id="decision">Choose the next step without forcing a yes</h2>
+   <ul>
+    <li><strong>Explore a bounded trial:</strong> both people understand its purpose and agree to its boundaries. That authorises only the agreed exercise.</li>
+    <li><strong>Pause:</strong> a consequential question is unresolved, or the proposed commitment does not fit someone’s capacity.</li>
+    <li><strong>Stop:</strong> either person does not want to continue. Document the practical loose ends without pressuring them to justify private circumstances.</li>
+   </ul>
+   <p>Equity, pay, ownership and company responsibilities need their own appropriate advice and agreements. Do not infer them from a positive conversation or from completing this worksheet.</p>
+   <h2 id="community">Take one process question to a relevant event</h2>
+   <p>You might ask a peer, “How did you record a disagreement about demo quality before starting a project?” Ask about their process, not for a verdict on a named potential cofounder. Check the event’s topic and online or in-person format, and keep the other person’s circumstances confidential.</p>
+   <p>MLAI publishes this guide and runs events; this is an affiliated invitation, not an assessment or matching service.</p>
+   <ArticleEventPreference articlePath={COFOUNDER_ASSESS_PATH} idPrefix="cofounder-values" description="Carry only your preferred event format to the calendar. Check the listed topic and participation format; no private discussion notes travel with this choice and it does not reserve a place." />
+   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+   <h2 id="scope">Scope and update</h2>
+   <p>YC source rechecked 11 September 2026. This revision completes the four conversations with supplied answers, follow-up questions and a filled record. The retained byline is not evidence that the fictional conversation occurred or that an independent professional reviewed this worksheet. No MLAI matching service, independent assessment or successful partnership is implied.</p>
+   <ArticleFAQ items={faqItems} />
+   <AuthorBio author={getAuthorProfile(DEFAULT_AUTHOR_KEY)} />
+  </article>
+ </div>
 }
-
-export const articleMeta = {
-  title: "How to Assess Cofounder Values Match Before You Commit",
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
-const faqSchemaItems = [
-  { question: "What is the difference between cofounder values fit and skills fit?", answer: "Skills fit is about whether your roles complement each other. Values fit is about whether you make tough decisions using similar principles when tradeoffs, pressure, or conflict appear." },
-  { question: "Can cofounders succeed if they share a vision but not the same values?", answer: "They may agree on the destination but still clash on how to get there. The grounded sections show that shared direction alone does not prevent conflict over trust, pace, transparency, or decision-making." },
-  { question: "What should you ask a potential cofounder to assess values alignment?", answer: "Ask about mission, long-term ambition, time commitment, pace, risk tolerance, money, feedback style, and conflict handling. The goal is to compare real expectations, not just broad statements about working well together." },
-  { question: "How long should a cofounder trial project be?", answer: "The source material supports a short, bounded trial rather than an immediate formal commitment. It should be long enough to include real deadlines, shared ownership, and at least one meaningful decision." },
-  { question: "What are signs to pause or walk away from a cofounder partnership?", answer: "Pause when important expectations still feel vague after several discussions. Walk away when repeated conversations reveal deep differences on trust, priorities, commitment, or how the company should be built." },
-]
-
-const faqStructuredData = faqSchemaItems.length
-  ? JSON.stringify({
-      '@context': 'https://schema.org',
-      '@type': 'FAQPage',
-      mainEntity: faqSchemaItems.map((item) => ({
-        '@type': 'Question',
-        name: item.question,
-        acceptedAnswer: {
-          '@type': 'Answer',
-          text: item.answer,
-        },
-      })),
-    })
-  : null
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
-
-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: "/articles" },
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
-        <p><strong>{TOPIC}</strong> — {"Choosing a cofounder is one of the highest-stakes decisions in a startup. Several of the sources frame it as a choice that can matter as much as, or even more than, the original idea because the relationship shapes how the company makes decisions, handles pressure, and keeps moving when things get hard. Strong early chemistry can feel convincing, but it does not tell you enough about how two people will respond when priorities clash, trade-offs get painful, or the work becomes less exciting and more repetitive."}</p>
-        <p>{"That is why values match deserves explicit assessment, not just a good gut feeling. The source material consistently points to shared vision, values, commitment expectations, trust, and working style as core parts of cofounder fit, while also warning against overvaluing skills alone. In practice, a promising cofounder is not just someone talented or easy to talk to. It is someone whose underlying principles line up with yours well enough to support better decisions over time."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="How to assess cofounder values match before building together."
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
-          {"A cofounder values match is about shared principles behind hard decisions, not similar personalities. It is separate from both shared vision and complementary skills."}
-        </QuoteBlock>
-          <h2>{"Define what a cofounder values match actually means"}</h2>
-          <p>{"A cofounder values match is not about having the same personality, background, or working quirks. It is about sharing the core principles that guide choices when things get hard. Sources consistently frame values as the hidden force behind decision-making, especially under pressure. In practice, that means asking whether both founders judge tradeoffs in similar ways: how transparent to be, how to treat commitments, what kind of culture to build, and what lines they will not cross to grow faster."}</p>
-          <p>{"That is different from shared vision. Vision is about where the company is going and how big or fast both people want to build it. Values are about how the team gets there. Two founders can agree on the product and market direction, but still clash if one cares most about speed while the other cares most about process or trust. A strong match usually needs both: enough alignment on direction to move together, and enough alignment on principles to make consistent choices."}</p>
-          <p>{"It is also different from complementary skills. Many cofounder searches start with role gaps such as product plus engineering or technical plus sales. That mix can be useful, and several sources explicitly recommend complementary rather than identical skills."}</p>
-          <p>{"So when you assess values match, the goal is not to ask, \"Are we the same?\" The better question is, \"Will we make the same kind of tough calls for the same reasons?\" If the answer is unclear, you may have skill fit or idea fit without true cofounder compatibility."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-da2cef24-2019-422a-bc89-ec425bfeae4b.jpg?alt=media&token=8e7bc4f1-355a-4f28-b7c1-7ae13c87cb3f"
-            alt="Define what a cofounder values match actually means"
-            caption="Define what a cofounder values match actually means"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Use four conversations to surface core values early"}</h2>
-          <p>{"A values match is easier to assess when you break the discussion into a few focused conversations instead of one vague chemistry check. The strongest pattern across the sources is simple: shared vision and core values matter more than just finding someone with useful skills. Early talks should help you learn how a potential cofounder thinks about the company\u2019s future, how they want to work, and what happens when pressure forces tradeoffs."}</p>
-          <p>{"These conversations work best when you ask direct questions and compare real expectations, not just broad statements like \u201cwe both care about impact\u201d or \u201cwe both move fast.\u201d Sources on cofounder fit repeatedly point to alignment on vision, commitment, working style, communication, and conflict handling. It is to find out where agreement is essential and where differences will create friction later."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3931f2d5-daf5-480d-b55f-2eb5e6c502c5.jpg?alt=media&token=21b79492-98b8-4c21-a09b-6640c9b7df51"
-            alt="Use four conversations to surface core values early"
-            caption="Use four conversations to surface core values early"
-            width={1200}
-            height={800}
-          />
-          <h3>{"1. Mission and commitment"}</h3>
-          <p>{"Start with the big picture: what kind of company do you both want to build, and why does it matter to each of you? A shared vision is a recurring theme in the priority sources, because people can have complementary skills but still pull in different directions if they want different outcomes. Ask what success looks like in a few years, what kind of problem feels worth the effort, and what choices each person would protect if growth and values ever came into tension."}</p>
-          <p>{"Discuss availability, expected pace, and how much time each person can realistically give. This helps reveal values in action. Standardising these expectations early gives you a clearer picture of whether the partnership can work in real life, not just in theory."}</p>
-          <h3>{"2. Risk, priorities, and conflict"}</h3>
-          <p>{"Talk through how each of you thinks about uncertainty, financial pressure, and the tradeoffs between startup demands and life outside work."}</p>
-          <p>{"The fourth conversation is about communication, feedback, and conflict resolution. The sources emphasise that values show up most clearly when people disagree. Ask how they like to give feedback, how they prefer to handle tension, and what they do when trust takes a hit. A healthy cofounder match is not one with no conflict. It is one where both people can handle disagreement in a way that protects the relationship and the company."}</p>
-
-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Move forward when your vision, values, commitment level, and conflict norms are clear enough to state in writing.",
-            "Slow down when alignment seems promising but important expectations are still not defined.",
-            "End the process when repeated conversations expose deep differences on trust, priorities, or how the company should be built.",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Look for evidence in behaviour, not just agreement"}</h2>
-          <p>{"Early conversations can make two people sound more aligned than they really are. Most potential co-founders can say they care about trust, ambition, or a shared mission. The better test is to ask for real examples from past work: how they made hard decisions, how they handled pressure, and whether they followed through when plans became messy. The source material consistently frames compatibility as more than a good first impression. It points to shared values as something that shows up in decisions, not just in polished answers."}</p>
-          <p>{"Reliability and trust are observable. Can they explain a time when values shaped a trade-off, not just name a value they like? Sources on co-founder vetting also suggest testing compatibility through real-life scenarios."}</p>
-          <p>{"That keeps the focus on evidence."}</p>
-          <p>{"In practice, founders should treat values alignment as something to verify over time. A co-founder relationship is built on repeated decisions under pressure, so the best assessment method is one that watches for patterns. Agreement is a starting point. Consistent action is the proof."}</p>
-          <h2>{"Run a short trial before making the partnership official"}</h2>
-          <p>{"A short working trial is often safer than jumping straight into a formal cofounder commitment. The core idea is simple: do real work together before you tie equity, titles, and long-term expectations to the relationship. The sources consistently point to the same risk areas to test early: vision and values alignment, working style compatibility, and commitment expectations."}</p>
-          <p>{"Keep the trial bounded and meaningful. Choose a small project with a deadline, shared ownership, and at least one decision that matters. That is where values become real."}</p>
-          <p>{"Compare what each person expected on pace, ownership, availability, and decision-making."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e569619a-5b7a-44e1-8a54-89dd3bcd7377.jpg?alt=media&token=25467d74-0b7d-4157-977a-3350d015eb41"
-            alt="Run a short trial before making the partnership official"
-            caption="Run a short trial before making the partnership official"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Decide with clarity and document the partnership"}</h2>
-          <p>{"Once you have assessed values match, make the decision explicit. A strong fit should not end with a vague sense that you get along well. It should lead to clear agreement on the big issues that shape day-to-day work: your shared vision, how much time each person will commit, how you will make decisions, and how you will handle disagreement. The sources consistently point to values alignment, commitment expectations, working style, communication, and conflict handling as the foundations of a durable cofounder relationship."}</p>
-          <p>{"Compatibility matters most when the startup is under pressure, not when conversations are easy. The goal is not simply to find a cofounder. It is to build a working relationship that can hold up through uncertainty, hard trade-offs, and conflict."}</p>
-          <ul>
-            <li>{"Move forward when your vision, values, commitment level, and conflict norms are clear enough to state in writing."}</li>
-            <li>{"Slow down when alignment seems promising but important expectations are still not defined."}</li>
-            <li>{"End the process when repeated conversations expose deep differences on trust, priorities, or how the company should be built."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2f1421db-cdd8-49d6-8899-53a5ef5f1773.jpg?alt=media&token=a5c93846-8420-406b-91a1-4c075b71a3c4"
-            alt="Decide with clarity and document the partnership"
-            caption="Decide with clarity and document the partnership"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"A bounded project with deadlines and shared ownership shows how each person behaves under pressure. Consistent actions are a better signal than verbal agreement alone."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://www.mentessa.com/7-best-practices-for-a-cofounder-matching-service-online/", title: "7 Best Practices for a Cofounder Matching Service Online", publisher: "mentessa.com", description: "", category: "guide"},
-          {id: 2, href: "https://foundingjourney.com/p/cofounder-mistakes", title: "8 Common Mistakes When Choosing a Co-Founder", publisher: "foundingjourney.com", description: "", category: "guide"},
-          {id: 3, href: "https://www.ycombinator.com/blog/10-questions-to-discuss-with-a-potential-co-founder", title: "10 Questions to Discuss with a Potential Co-founder | Y Combinator", publisher: "ycombinator.com", description: "", category: "guide"},
-          {id: 4, href: "https://onlyfounders.app/all-blogs/cofounder-compatibility-testing-your-cofounder-s-compatibility", title: "Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App", publisher: "onlyfounders.app", description: "", category: "guide"},
-          {id: 5, href: "https://www.nfx.com/post/the-pyramid-of-cofounder-success", title: "The Pyramid of Co-Founder Success", publisher: "nfx.com", description: "", category: "guide"},
-          {id: 6, href: "https://www.linkedin.com/posts/the-startup-pod_the-ultimate-co-founder-vetting-checklist-activity-7268049878226714624-xUKx", title: "The Ultimate Co-Founder Vetting Checklist | The Startup Podcast", publisher: "linkedin.com", description: "", category: "guide"},
-          {id: 7, href: "https://blog.foundersbase.com/how-can-i-vet-or-evaluate-a-potential-co-founders-compatibility/", title: "How can I vet or evaluate a potential co-founder\u2019s compatibility?", publisher: "blog.foundersbase.com", description: "", category: "guide"},
-          {id: 8, href: "https://www.nascent.live/post/why-finding-the-right-co-founder-match-is-critical-for-your-startup", title: "Why finding the right co-founder match is critical for your startup", publisher: "nascent.live", description: "", category: "guide"},
-          {id: 9, href: "https://www.startuplinkx.com/post/find-startup-cofounder-guide", title: "How to Find the Perfect Cofounder: Matchmaking Guide for Startups| Blog | StartupLinkX", publisher: "startuplinkx.com", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Go deeper on cofounder alignment"
-            body="Compare short trials, hard questions, and decision checkpoints before you formalise the partnership with a cofounder."
-            buttonText="Read the follow-up guide"
-            buttonHref="/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit"
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
