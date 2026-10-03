# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/venture-capital-how-does-it-work.tsx
+++ unreviewed-local-draft/app/articles/content/featured/venture-capital-how-does-it-work.tsx
@@ -1,363 +1,128 @@
-import type { ReactNode } from 'react'
+import { Link } from 'react-router'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
-
 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '../../../components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '../../seo-config'
 import AuthorBio from '../../../components/AuthorBio'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
 import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
 import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
 import { getDefaultArticleAuthorDetails } from '../../authors'

-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
-
-const TOPIC = 'Venture capital: how does it work?'
 export const CATEGORY = 'featured'
 export const SLUG = 'venture-capital-how-does-it-work'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-26'
-export const DATE_MODIFIED = '2026-01-26'
-export const DESCRIPTION = 'A plain‑English guide to how venture capital works in Australia: fund structure, stages, dilution, and what investors look for. Updated for 2026.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fd28a08d-960c-4264-b8ee-8723810599db.jpg?alt=media&token=87ce9c67-c2a7-4870-8e7a-fb7c74658f0f"
-const HERO_IMAGE_ALT = 'Founders discussing funding with venture investors'
+export const DATE_PUBLISHED = '2025-12-05'
+export const DATE_MODIFIED = '2026-09-10'
 export const FEATURED_FOCUS = 'funding'
+const TOPIC = 'How venture capital works: capital choices and dilution'
+export const DESCRIPTION = 'Understand venture funding before planning a raise: compare capital obligations, follow a two-round ownership example and prepare a capital-fit discussion.'
+const AUTHOR = getDefaultArticleAuthorDetails()
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fd28a08d-960c-4264-b8ee-8723810599db.jpg?alt=media&token=87ce9c67-c2a7-4870-8e7a-fb7c74658f0f'
+const HERO_IMAGE_ALT = 'Three people talking in an office, one holding a folder.'
+const FUNDING_SOURCE = 'https://business.gov.au/finance/funding/choose-your-funding'
+const PITCH_SOURCE = 'https://business.gov.au/finance/funding/pitch-for-venture-capital'
+const SEC_SOURCE = 'https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-funds'

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const articleMeta = {
+  title: TOPIC, topic: TOPIC, category: CATEGORY, slug: SLUG, description: DESCRIPTION,
+  datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+  author: AUTHOR.name, image: HERO_IMAGE, imageAlt: HERO_IMAGE_ALT,
 }
-
-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'How do venture capitalists make money?',
-    answer: (
-      <>
-        VCs typically earn a management fee on committed capital (often around 2% per year) and a performance fee called carried interest (commonly ~20%) on profits once investors’ principal has been returned. The exact numbers vary by fund and vintage.
-      </>
-    ),
-  },
-  {
-    id: 2,
-    question: 'What ownership percentage do VCs usually take?',
-    answer: (
-      <>
-        It depends on stage and valuation. Seed rounds may land anywhere from ~10–25% new ownership for investors; later rounds often target dilution bands of ~15–25%. Your cap table, valuation, and any employee option pool adjustments affect the final percentage.
-      </>
-    ),
-  },
-  {
-    id: 3,
-    question: 'Do I need revenue to raise VC?',
-    answer: (
-      <>
-        Not always at pre‑seed or seed, where the bet is often on team, market, and early signals of demand. By Series A, many funds expect evidence of product‑market fit (repeatable usage and growth, sometimes revenue momentum) plus a clear plan to scale.
-      </>
-    ),
-  },
-  {
-    id: 4,
-    question: 'How long does due diligence take?',
-    answer: (
-      <>
-        Light diligence can be 2–3 weeks; deeper processes may run 4–8+ weeks, depending on round size, complexity, and how organised your data room is. Market conditions can extend timelines.
-      </>
-    ),
-  },
-  {
-    id: 5,
-    question: 'SAFE vs convertible note—what’s the difference?',
-    answer: (
-      <>
-        A SAFE is an agreement that converts to equity in the future, typically at a discount and/or valuation cap, without accruing interest or a maturity date. A convertible note is debt that accrues interest and has a maturity date; it also converts to equity under agreed terms. Local legal advice is recommended in Australia.
-      </>
-    ),
-  },
-  {
-    id: 6,
-    question: 'Is venture capital right for my startup?',
-    answer: (
-      <>
-        VC suits ventures targeting large, fast‑growing markets where scale requires significant upfront investment and a long runway. If you prefer control, steady growth, or capital‑efficiency over blitz‑scaling, alternatives like angel funding, grants, or bootstrapping may be a better fit.
-      </>
-    ),
-  },
+export const summaryHighlights = {
+  heading: 'Understand the trade before choosing the money',
+  intro: 'For Australian founders and startup-curious readers: explain what external capital would change before treating a funding round as the next milestone.',
+  items: [
+    { label: 'What is venture capital?', description: 'A venture fund pools investors’ money to invest in businesses. An equity investment exchanges capital for part ownership, with negotiated rights.' },
+    { label: 'Why does ownership shrink?', description: 'In the fictional example, new shares increase the total: founders move from 100% to 80%, then 64%, without selling their original shares.' },
+    { label: 'What should I produce?', description: 'A capital-fit record: the milestone, evidence, alternatives, ownership assumptions and questions that need qualified advice.' },
+  ],
+}
+export const faqItems = [
+  { id: 1, question: 'Is venture capital a loan?', answer: 'The priced-equity example here exchanges investment for newly issued shares, not scheduled loan repayments. Different instruments and contractual rights change the analysis. Do not apply this example to a convertible note or assume that equity has no obligations.' },
+  { id: 2, question: 'What percentage do venture investors take?', answer: 'This guide supplies no typical Australian ownership range. In its simplified example, divide new investment by the sum of pre-money value and that investment. Pools, convertibles, secondary sales and different rights require a separate model.' },
+  { id: 3, question: 'Does a seed or Series A label prove a company is ready?', answer: 'No. A round label does not prove revenue, customer retention, investment approval or a specific valuation. Describe the actual evidence and ask each firm about its current mandate.' },
+  { id: 4, question: 'How long does a venture capital raise take?', answer: 'There is no verified market-wide timetable in this guide. Ask the actual firm which decision is next, what remains unresolved and whether any date is agreed. A term sheet, completed documentation and cash received are different states.' },
+  { id: 5, question: 'Can I use this model for a SAFE?', answer: 'No. This is two primary priced-share issues only. A SAFE or convertible note has its own conversion terms and may change later ownership. The separate valuation guide explains the scope difference; ask an Australian-qualified adviser about the actual documents.' },
+  { id: 6, question: 'Will an MLAI event help me raise money?', answer: 'The invitation is to learn and discuss general startup questions. It does not include funding, investor introductions, transaction advice or endorsement of a capital strategy. Check the session topic and experience level before registering.' },
+]
+const references = [
+  { id: 1, href: FUNDING_SOURCE, title: 'Choose your funding', publisher: 'Australian Government', description: 'Debt/equity distinction and funding sources; not adopted as a timetable or ownership benchmark.', category: 'government' },
+  { id: 2, href: PITCH_SOURCE, title: 'Pitch for venture capital', publisher: 'Australian Government', description: 'Preparation questions about capital use, company evidence and investor fit.', category: 'government' },
+  { id: 3, href: SEC_SOURCE, title: 'Private Funds — 12 June 2024', publisher: 'US Securities and Exchange Commission', description: 'Pooled-fund vocabulary only; US legal rules are not Australian requirements.', category: 'guide' },
+  { id: 4, href: 'https://www.cooleygo.com/glossary/post-money-valuation/', title: 'Post-money valuation', publisher: 'Cooley GO', description: 'Terminology for the simplified primary financing example, with US context.', category: 'guide' },
 ]

-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Follow the relationship between investors, funds and startups, then consider what accepting equity investment means for ownership and expectations.",
-  items: [
-    { label: 'How do venture capitalists make money?', description: 'Mainly via management fees (often ~2% p.a.) and carried interest (commonly ~20%) on profits after returning capital to LPs.' },
-    { label: 'What are the stages of VC funding?', description: 'Pre‑seed, seed, Series A–C+. Each round funds new milestones with higher expectations for traction, governance, and scale.' },
-    { label: 'How does dilution work in a VC round?', description: 'New shares are issued; investor ownership ≈ investment ÷ post‑money valuation. Existing holders dilute unless they invest pro‑rata.' },
-  ],
+export default function ArticleContent() {
+  return <>
+    <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TOPIC, current: true }]}
+      title={TOPIC} titleHighlight="capital choices and dilution" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT} />
+    <ArticleTocPlaceholder />
+    <div className="prose prose-lg prose-slate prose-headings:scroll-mt-24 max-w-none">
+      <p>Venture funding is a financing relationship, not a certificate that a startup is successful. This guide helps Australian founders and learners explain a capital choice and the arithmetic behind dilution. It does not tell you to raise, set a price or recommend an investor.</p>
+      <p>Start here for capital choices. Use the <Link to="/articles/featured/how-does-a-venture-capital-firm-work">VC firm research guide</Link> when your task is understanding a specific investor, and the <Link to="/articles/featured/how-vcs-value-startups">valuation and option-pool guide</Link> for the separate pricing-denominator exercise.</p>
+
+      <h2>What happens between a fund and a startup?</h2>
+      <p>The <a href={SEC_SOURCE}>SEC’s June 2024 private-funds explainer</a> describes a fund as pooled investor capital managed for investment; venture funds commonly invest for equity. This is useful vocabulary, not a statement of Australian securities law. The fund’s investors and the startup receiving an investment are different parties.</p>
+      <p>In the primary-share example below, money goes into the company and the investor receives new shares. Existing holders own a smaller fraction of a larger share count. That fraction alone does not establish voting control, board rights, exit proceeds or the value of anyone’s holding. Those depend on the transaction and its documents.</p>
+
+      <h2>Start with the milestone, then compare obligations</h2>
+      <p>The Australian Government’s <a href={FUNDING_SOURCE}>funding overview</a> distinguishes borrowing from exchanging part ownership and identifies sources such as self-funding and grants. Use that distinction to prepare questions; this article does not adopt the overview’s broad deal-size, control or timing generalisations.</p>
+      <div role="region" aria-label="Capital obligations comparison" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-purple-700">
+        <table className="min-w-[620px]"><caption>Questions for a capital discussion, not a suitability ranking.</caption><thead><tr><th scope="col">Path to investigate</th><th scope="col">What to check</th><th scope="col">Do not assume</th></tr></thead><tbody>
+          <tr><th scope="row">Existing cash or customer revenue</th><td>Which payments are actually collected, which obligations already exist, and what delivery capacity remains?</td><td>A signed proposal is cash, or existing money makes a project risk-free.</td></tr>
+          <tr><th scope="row">Loan or other debt</th><td>Repayments, interest, security, guarantees and downside cash scenarios with an adviser.</td><td>No dilution means no personal or business risk.</td></tr>
+          <tr><th scope="row">Equity from an angel or venture fund</th><td>Ownership, information and decision rights, growth expectations and how investors might realise returns.</td><td>Every investor wants the same outcome or is obliged to fund a later round.</td></tr>
+          <tr><th scope="row">A specific grant program</th><td>Current eligibility, permitted costs, co-contributions, payment timing and reporting.</td><td>An open program means your application or expense will qualify.</td></tr>
+        </tbody></table>
+      </div>
+      <p>The <a href={PITCH_SOURCE}>official venture-pitch preparation guide</a> asks applicants to explain the amount, use and intended outcome of capital. A useful first draft separates evidence from assumptions. An ambition to expand is not evidence that customers want the product.</p>
+
+      <h3>One AI prototype, two different capital questions</h3>
+      <p><strong>Fictional discussion exercise:</strong> Mila and Ben each have a document-triage prototype. Neither has decided to raise. These are invented situations, not MLAI client results or financing recommendations.</p>
+      <ul>
+        <li><strong>Mila:</strong> three local clients want different integrations. Her aim is a sustainable owner-operated service. She records the delivery hours, payment dates and support obligations before asking whether external capital would solve her actual constraint.</li>
+        <li><strong>Ben:</strong> wants to license one reusable product across many organisations. His pilot users have not agreed to pay. He records which functionality is genuinely shared, what customers did and which adoption assumption remains untested before discussing expansion funding.</li>
+      </ul>
+      <p>The distinction is not “small business bad, venture startup good”. They have different objectives and missing evidence. For Mila, the useful question may be delivery capacity; for Ben, it may be repeatable demand. Neither the AI label nor a prototype answers the financing question.</p>
+
+      <h2 id="two-round-dilution">Follow the shares through two fictional rounds</h2>
+      <p>All money figures are AUD. Assume founders initially hold all 4,000 shares; each round issues only new primary shares with identical economic rights. No options, reserves, convertibles, fees, secondary sales, splits or additional investment by existing holders. Round names are labels, not evidence of market norms.</p>
+      <ol>
+        <li><strong>Round one:</strong> A$4m pre-money plus A$1m new cash gives A$5m post-money. Price per share is A$4m ÷ 4,000 = A$1,000. The new investor buys 1,000 shares; total shares become 5,000.</li>
+        <li><strong>Round two:</strong> assume A$20m pre-money plus A$5m new cash. Price is A$20m ÷ 5,000 = A$4,000. The second investor buys 1,250 shares; total shares become 6,250.</li>
+      </ol>
+      <div role="region" aria-label="Two-round ownership example" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-purple-700">
+        <table className="min-w-[620px]"><caption>Fictional share counts and ownership after each primary issue.</caption><thead><tr><th scope="col">Holder</th><th scope="col">Before funding</th><th scope="col">After round one</th><th scope="col">After round two</th></tr></thead><tbody>
+          <tr><th scope="row">Founders together</th><td>4,000 / 100%</td><td>4,000 / 80%</td><td>4,000 / 64%</td></tr>
+          <tr><th scope="row">Round-one investor</th><td>0 / 0%</td><td>1,000 / 20%</td><td>1,000 / 16%</td></tr>
+          <tr><th scope="row">Round-two investor</th><td>0 / 0%</td><td>0 / 0%</td><td>1,250 / 20%</td></tr>
+          <tr><th scope="row">Total</th><td>4,000 / 100%</td><td>5,000 / 100%</td><td>6,250 / 100%</td></tr>
+        </tbody></table>
+      </div>
+      <p>Founders still have 4,000 shares. Their 80% after the first round is multiplied by the 80% retained by all existing holders after the second: 0.8 × 0.8 = 0.64. Subtracting 20 percentage points twice would incorrectly give 60%. The second dilution applies to the then-current ownership, not the original 100%.</p>
+      <p><a href="https://www.cooleygo.com/glossary/post-money-valuation/">Cooley’s post-money definition</a> supplies the vocabulary; the numbers above are MLAI’s fictional teaching model, not that source’s transaction example. The file below includes the formula for changing assumptions and an answer key. It is not a live cap table or independently approved professional advice.</p>
+      <p><a href="/downloads/venture-learning/two-round-dilution.md" download>Download the two-round calculations and capital-fit record (.md)</a>. This editable text file contains the complete model, assumptions and discussion prompts—not an automated spreadsheet.</p>
+
+      <h2>Separate interest, approval and cash received</h2>
+      <p>A positive meeting is not a completed investment. Record the state you actually know: a conversation, requested evidence, a decision still pending, proposed terms, documentation or receipt of funds. Ask what remains before the next state; do not forecast cash using a generic fundraising timetable.</p>
+      <p>For example, “an investor asked for our pilot results” supports only a request for information. It does not support “the round is approved”. If you report progress to existing stakeholders, <Link to="/vibe-raising">Vibe Raising</Link> can help prepare an update from your actual metrics and notes. It does not verify claims or secure investment.</p>
+
+      <h2 id="funding-discussion-record">Bring a capital-fit question to the conversation</h2>
+      <p>Complete this record before asking others for feedback. “I do not know yet” is a useful answer when it identifies the next evidence you need. Keep private financials and deal documents out of an open event.</p>
+      <pre className="whitespace-pre-wrap break-words text-sm" aria-label="Funding discussion record">{[
+        'Milestone the business is trying to reach:', 'Evidence that milestone needs external capital:',
+        'Alternatives I still need to understand:', 'Assumptions about timing, cost and ownership:',
+        'Question for a general discussion:', 'Questions that need my own qualified adviser:',
+      ].join('\n')}</pre>
+      <p>Choose an MLAI founder session that suits your question, topic and experience level, in person or online. Peer discussion is for learning, not selecting an investment or endorsing your financing terms.</p>
+      <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+      <p>Sources checked 10 September 2026. These worked examples are fictional and independent financial/legal review is pending. For an actual financing decision, obtain advice appropriate to your company and documents.</p>
+      <ArticleReferences references={references} heading="Sources" />
+      <ArticleFAQ items={faqItems} />
+      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
+      <ArticleFooterNav />
+    </div>
+  </>
 }
-
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
-}
-
-/** ===== References (optional) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
-    title: 'What Is Venture Capital?',
-    publisher: 'Investopedia',
-    description: 'Definition, how VC works, typical fee/carry structures, and stages.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://www.jpmorgan.com/insights/business-planning/what-is-venture-capital',
-    title: 'What is Venture Capital?',
-    publisher: 'J.P. Morgan',
-    description: 'Overview of VC, how it works, pros and cons, and considerations for founders.',
-    category: 'guide',
-  },
-  {
-    id: 3,
-    href: 'https://stripe.com/au/resources/more/venture-capital-firms-and-startups',
-    title: 'How venture capital firms work and what they look for',
-    publisher: 'Stripe',
-    description: 'Fund mechanics, evaluation criteria, and guidance for startups approaching VCs.',
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
-          <strong>{TOPIC}</strong> — For Australian founders and operators, this means understanding where VC money comes from, how funds decide, what a round does to your ownership, and how to run a clean process. This guide distils global norms and local context for 2026 so you can make an informed, values‑aligned choice.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          width={1600}
-          height={900}
-          containerClassName="my-10"
-          imageClassName="rounded-3xl"
-          caption="A founder team preparing their pitch and data room before investor meetings."
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'You’re considering a raise or deciding whether VC fits your goals.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'You want a practical model of how VC funds and rounds actually work.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'You support founders and want a clear, Australia‑aware explainer.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>How VC funds are structured and how returns are made</h2>
-        <p>
-          Venture capital funds are typically limited partnerships. Limited partners (LPs) — such as super funds, family offices, and institutions — commit capital. General partners (GPs) manage the fund: they source deals, support portfolio companies, and aim to return more than was invested. Two revenue streams matter: an annual management fee (often ~2% of committed capital) and carried interest (commonly ~20% of the profits after returning LP capital). Funds often have ~10‑year lives with an investment period in the early years and harvest later. Australian VC funds generally follow the same global model.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          VC economics reward outsized outcomes. A few exceptional winners must pay for many experiments — that’s why investors focus on scalable markets and repeatable growth.
-        </QuoteBlock>
-
-        <h2>The funding journey: from pre‑seed to Series C</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-87e4babf-c80f-4ea6-ae06-c2fd8d24d72f.jpg?alt=media&token=76ea37dc-2beb-4618-8123-ae1942e5e0a8" alt="Group of diverse entrepreneurs brainstorming in a retro 90s tech workspace, capturing the funding journey." className="w-full rounded-lg my-8" />
-
-        <p>
-          Rounds fund milestones. Expectations and governance rise with each stage; the goal is to reduce risk step by step.
-        </p>
-        <h3>Pre‑seed and seed</h3>
-        <ul>
-          <li><strong>Pre‑seed:</strong> Team, early insight, prototype or initial research. Evidence of a real customer pain and a credible plan.</li>
-          <li><strong>Seed:</strong> Early product in market, first users, clear problem/solution fit, learning loops, and early traction indicators.</li>
-        </ul>
-        <h3>Series A–C</h3>
-        <ul>
-          <li><strong>Series A:</strong> Signals of product‑market fit, improving retention, repeatable go‑to‑market, early unit economics.</li>
-          <li><strong>Series B–C:</strong> Scaling systems, multi‑quarter growth, leadership hires, governance, and expansion plans.</li>
-        </ul>
-
-        <h2>What venture investors evaluate</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3dc0d858-c475-497a-8cfe-c8c165c4f411.jpg?alt=media&token=f7a5e0d6-2d21-4cba-bfed-776c30668c41" alt="Group of diverse professionals in a retro tech setting, discussing venture investments and startups." className="w-full rounded-lg my-8" />
-
-        <ul>
-          <li><strong>Team:</strong> Rate of learning, clarity, founder‑market fit, ability to recruit.</li>
-          <li><strong>Market:</strong> Big, growing, and accessible with a credible wedge.</li>
-          <li><strong>Product & defensibility:</strong> Differentiation, velocity, and any moats (data, distribution, community, IP).</li>
-          <li><strong>Traction & unit economics:</strong> Evidence of demand, retention, CAC/LTV directionality (appropriate to stage).</li>
-          <li><strong>Round structure:</strong> Valuation, proposed dilution, option pool, governance, and a plan for 18–24 months.</li>
-        </ul>
-
-        <h2>Common deal instruments in Australia (as at 2026)</h2>
-        <p>
-          You will encounter a few standard approaches. Seek local legal advice; terms and tax can vary.
-        </p>
-        <ul>
-          <li><strong>Priced equity round:</strong> Shares are issued at an agreed pre‑money valuation. Clean, familiar, and sets a clear baseline for the next round.</li>
-          <li><strong>SAFE:</strong> Simple agreement for future equity. Converts in a later round using a valuation cap and/or discount. No interest or maturity.</li>
-          <li><strong>Convertible note:</strong> Debt that converts later, usually with interest, a discount, and a maturity date. Sometimes used where timing or pricing is uncertain.</li>
-        </ul>
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Prefer standard, well‑understood documents. The time you save and the trust you build often matter more than clever edge‑case terms.
-        </QuoteBlock>
-
-        <h2>Dilution in practice: a quick worked example</h2>
-        <p>
-          Suppose a seed investor puts $1.0m into a company at a $4.0m pre‑money valuation ($5.0m post‑money). Investor ownership after the round is $1.0m ÷ $5.0m = 20%. Founders now hold 80% (before any option pool changes). If a later Series A raises $5.0m at a $20.0m pre ($25.0m post), new dilution is $5.0m ÷ $25.0m = 20%. Founders would move from 80% to 64% (0.8 × 0.8); the seed investor’s 20% becomes 16%, and the Series A investor holds 20%. Real rounds also adjust for employee option pools and any convertibles.
-        </p>
-        <p>
-          These numbers are illustrative only; your valuation, pool size, and instrument terms will change the math.
-        </p>
-
-        <h2>Process and timing: what to expect in a raise</h2>
-        <p>
-          Efficient raises are structured, time‑boxed, and data‑driven. In balanced markets, 8–16 weeks from first meetings to funds‑in is common; tougher markets can take longer. Keep communications clear and your data room organised.
-        </p>
-
-        <ArticleStepList
-          title="Step‑by‑step actions"
-          steps={[
-            { label: 'Prepare essentials: 12–18‑month plan, focused deck, clean data room' },
-            { label: 'Build a target list: stage/sector fit, cheque size, portfolio conflicts' },
-            { label: 'Run outreach: warm intros where possible; track pipeline clearly' },
-            { label: 'First and partner meetings: align on thesis, milestones, and use of funds' },
-            { label: 'Negotiate term sheet, complete diligence, sign, and close' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <h2>Pros, cons, and realistic alternatives</h2>
-        <ul>
-          <li><strong>Pros:</strong> Capital to move faster, investor networks, credibility with hires and partners.</li>
-          <li><strong>Cons:</strong> Dilution, board/investor expectations, bias toward high‑growth paths.</li>
-          <li><strong>Alternatives:</strong> Angels, grants, revenue/bootstrapping, and (later) venture debt. Choose the path that matches your ambition, risk tolerance, and runway needs.</li>
-        </ul>
-
-        <h2>Australia‑specific notes (as at 2026)</h2>
-        <ul>
-          <li>Most local funds mirror global norms on structure, fees, and deal mechanics.</li>
-          <li>SAFE and convertible notes are widely understood; priced equity remains standard for larger rounds.</li>
-          <li>Connect with the Australian ecosystem early — community groups, mentors, and founder peers can shorten your learning loop.</li>
-        </ul>
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Map your milestones to a realistic runway. Raise what you need to reach the next proof‑point — not an arbitrary round label.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Next steps</h2>
-        <p>
-          Decide whether VC aligns with your goals. If yes, set a tight milestone plan, prepare your materials, and run a crisp, respectful process. If not, pursue the capital path that best serves your customers and team — there are many ways to build an impactful company.
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
-        body="Get practical recommendations based on your goals, time, and experience level."
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
