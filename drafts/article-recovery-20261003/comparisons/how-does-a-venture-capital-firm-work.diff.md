# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-does-a-venture-capital-firm-work.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-does-a-venture-capital-firm-work.tsx
@@ -1,372 +1,130 @@
-/**
- * ARTICLE TEMPLATE - React Router v7
- *
- * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
- * All relative imports below are calculated from that location.
- */
-import type { ReactNode } from 'react'
+import { Link } from 'react-router'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
-
-import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
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
-import { ArticleCallout } from '../../../components/articles/ArticleCallout'
-import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
 import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
 import { getDefaultArticleAuthorDetails } from '../../authors'

-/** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true
+export const CATEGORY = 'featured'
+export const SLUG = 'how-does-a-venture-capital-firm-work'
+export const DATE_PUBLISHED = '2025-11-27'
+export const DATE_MODIFIED = '2026-09-10'
+export const FEATURED_FOCUS = 'funding'
+const TOPIC = 'How a VC firm works: research the fund before a meeting'
+export const DESCRIPTION = 'Separate the firm, fund and decision-makers; use a dated Australian investor example and an editable research checklist to prepare a better funding conversation.'
+const AUTHOR = getDefaultArticleAuthorDetails()
+const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69616611-a5ea-4b41-88f0-f07c970a38d2.jpg?alt=media&token=78aae951-a9f0-4ec5-86f7-1a86a0167850'
+const HERO_IMAGE_ALT = 'Illustration of laptop charts and cash beside a meeting room, with a small robot and Australian flag.'
+const SEC_SOURCE = 'https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-funds'
+const COOLEY_SOURCE = 'https://thefundlawyer.cooley.com/primer-structuring-the-general-partner-and-management-company-for-a-private-equity-or-venture-capital-fund/'
+const BLACKBIRD_SOURCE = 'https://www.blackbird.vc/get-investment'
+const ESVCLP_SOURCE = 'https://business.gov.au/grants-and-programs/early-stage-venture-capital-limited-partnerships'
+const PITCH_SOURCE = 'https://business.gov.au/finance/funding/pitch-for-venture-capital'

-const TOPIC = 'How does a venture capital firm work'
-export const CATEGORY = 'australian-ai-ecosystem'
-export const SLUG = 'how-does-a-venture-capital-firm-work'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-25'
-export const DATE_MODIFIED = '2026-01-25'
-export const DESCRIPTION = 'Plain-English explainer of VC fund structure, economics (\"2 and 20\"), decision process, local instruments, and how Australian AI teams can prepare in 2026.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69616611-a5ea-4b41-88f0-f07c970a38d2.jpg?alt=media&token=78aae951-a9f0-4ec5-86f7-1a86a0167850"
-const HERO_IMAGE_ALT = 'Abstract financial graphs in a meeting setting, symbolising venture capital decisions'
-export const FEATURED_FOCUS = 'funding'
-
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
-    question: 'How do VC firms make money?',
-    answer:
-      'Primarily via a management fee (often around 2% per year on committed capital) and carried interest (commonly 20% of profits after returning capital to LPs). Exact terms vary by fund and vintage.'
-  },
-  {
-    id: 2,
-    question: 'What is the typical VC fund life cycle?',
-    answer:
-      'Most funds run 10–12 years: 1–2 years to raise, ~3–5 years to invest, and the remaining years to support companies and realise exits. Extensions are common.'
-  },
-  {
-    id: 3,
-    question: 'Do Australian VCs invest in pre-revenue AI startups?',
-    answer:
-      'Yes. Many AU funds back pre-revenue teams at pre-seed/seed where the focus is on team, problem insight, early technical validation, and credible go-to-market. Evidence of a data advantage or early customer pull helps.'
-  },
-  {
-    id: 4,
-    question: 'What equity do VCs usually take at seed?',
-    answer:
-      'It varies. As a broad (non-binding) reference, founders might sell ~10–25% in a typical seed. Actual dilution depends on valuation, round size, and investor appetite. Always seek independent legal advice.'
-  },
-  {
-    id: 5,
-    question: 'SAFE vs convertible note vs priced equity — what\'s the difference?',
-    answer: (
-      <>
-        <p>
-          SAFEs and notes defer valuation to a later priced round. A SAFE is an agreement for future equity (often with a valuation cap/discount), while a convertible note is a debt instrument that converts to equity later (with interest/maturity). Priced equity sets a valuation now and issues shares immediately.
-        </p>
-      </>
-    )
-  },
-  {
-    id: 6,
-    question: 'Are there Australian government settings that affect VC?',
-    answer: (
-      <>
-        <p>
-          Australia recognises VC through programs such as ESVCLP and VCLP and broader measures like the R&D Tax Incentive. These aim to support early-stage investment. Check official sources for up-to-date eligibility and tax details.
-        </p>
-      </>
-    )
-  },
-  {
-    id: 7,
-    question: 'VC vs private equity — what\'s the difference?',
-    answer:
-      'VC targets earlier-stage, high-growth companies and typically takes minority stakes, accepting higher risk for potential outlier returns. Private equity often acquires controlling stakes in mature businesses, using leverage and operational improvements to drive returns.'
-  }
+export const summaryHighlights = {
+  heading: 'Research the investor, not just the logo',
+  intro: 'For Australian founders learning how an investor works: produce a sourced meeting brief that separates what the firm states from what you still need to ask.',
+  items: [
+    { label: 'Is the firm the same as the fund?', description: 'No. A management business may work with multiple funds. Identify the actual investing entity and mandate rather than assuming the brand answers both.' },
+    { label: 'Does a partner meeting mean approval?', description: 'Not necessarily. Ask who owns the decision, what evidence is needed and what is still conditional.' },
+    { label: 'What does the checklist establish?', description: 'Only what you have sourced or confirmed. An unknown reserve, cheque size or timetable must remain unknown—not a guessed green light.' },
+  ],
+}
+export const faqItems = [
+  { id: 1, question: 'How do venture capital firms make money?', answer: 'Management fees support the management business, while carried interest links compensation to fund profits. The recipient, calculation base and distribution conditions depend on the structure and documents. This article establishes no standard Australian fee or carry percentage.' },
+  { id: 2, question: 'Is a venture fund the same as its management company?', answer: 'No. The fund holds investments; the management business provides the team and services. A general partner has a distinct role in a limited-partnership structure. Actual entities, delegated powers and agreements must be checked rather than inferred from a brand name.' },
+  { id: 3, question: 'Does every VC use an investment committee?', answer: 'Do not assume an identical process. The Blackbird example describes its published committee process; that is not evidence about every firm. Ask your contact which approvals apply and what remains outstanding.' },
+  { id: 4, question: 'Does a venture fund always last ten years?', answer: 'No universal duration is established here. As one specific Australian program example, ESVCLP guidance requires a qualifying partnership agreement with a five-to-fifteen-year existence period. That is not a promise of first-cheque availability, follow-on funding or a startup exit date.' },
+  { id: 5, question: 'Does ESVCLP registration mean my startup qualifies for funding?', answer: 'No. It is a fund registration and tax-support framework with eligibility and ongoing requirements, not approval of your company or a direct grant award. Check current official guidance and the actual fund mandate with appropriate advisers.' },
+  { id: 6, question: 'Can MLAI introduce me to the investor in this example?', answer: 'No introduction is included in this article or its event invitation. The example teaches source reading. Check the firm’s own current contact process if appropriate; an MLAI session is a separate community learning activity.' },
 ]
-
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro:
-    "Follow how a venture fund raises, invests and returns capital, and distinguish the fund’s economics from the finances of an individual startup.",
-  items: [
-    {
-      label: 'How do VC firms make money?',
-      description: 'Management fees (~2% p.a.) and carried interest (often 20%) after LP capital is returned.'
-    },
-    {
-      label: 'What is a VC fund’s structure?',
-      description: 'LPs commit capital to a fund run by GPs; it invests over 3–5 years with a 10–12 year fund life.'
-    },
-    {
-      label: 'What do VCs look for in AI startups?',
-      description: 'Team, market, traction, defensibility—plus data advantage, distribution, and responsible AI.'
-    }
-  ]
-}
-
 const references = [
-  {
-    id: 1,
-    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
-    title: 'What Is Venture Capital? Definition, Pros, Cons, and How It Works',
-    publisher: 'Investopedia',
-    description: 'General global explainer of VC definitions, mechanics, and trade-offs.',
-    category: 'guide'
-  },
-  {
-    id: 2,
-    href: 'https://stripe.com/au/resources/more/venture-capital-firms-and-startups',
-    title: 'How venture capital firms work and what they look for',
-    publisher: 'Stripe',
-    description: 'Founder-oriented guidance on VC processes and evaluation criteria.',
-    category: 'industry'
-  },
-  {
-    id: 3,
-    href: 'https://business.gov.au/grants-and-programs/early-stage-venture-capital-limited-partnerships',
-    title: 'Early Stage Venture Capital Limited Partnerships (ESVCLP)',
-    publisher: 'Australian Government (business.gov.au)',
-    description: 'Program overview and official information for ESVCLP.',
-    category: 'government'
-  },
-  {
-    id: 4,
-    href: 'https://business.gov.au/grants-and-programs/venture-capital-limited-partnerships',
-    title: 'Venture Capital Limited Partnerships (VCLP)',
-    publisher: 'Australian Government (business.gov.au)',
-    description: 'Program overview and official information for VCLP.',
-    category: 'government'
-  },
-  {
-    id: 5,
-    href: 'https://www.cutthrough.com/insights',
-    title: 'Australian Startup Funding Reports',
-    publisher: 'Cut Through Venture',
-    description: 'Independent analysis of Australian startup funding trends (check latest report).',
-    category: 'analysis'
-  },
-  {
-    id: 6,
-    href: 'https://www.ycombinator.com/documents',
-    title: 'Standard form SAFEs',
-    publisher: 'Y Combinator',
-    description: 'Official SAFE templates and notes. Commonly referenced globally.',
-    category: 'guide'
-  }
+  { id: 1, href: SEC_SOURCE, title: 'Private Funds — 12 June 2024', publisher: 'US Securities and Exchange Commission', description: 'Fund/adviser distinction; US rules are not Australian requirements.', category: 'guide' },
+  { id: 2, href: COOLEY_SOURCE, title: 'Structuring the GP and management company — 17 June 2026', publisher: 'Cooley', description: 'US-context entity and economic distinctions; not a model Australian partnership agreement.', category: 'guide' },
+  { id: 3, href: BLACKBIRD_SOURCE, title: 'Get Investment', publisher: 'Blackbird', description: 'The firm’s own process and mandate description, checked 10 September 2026; not an MLAI endorsement.', category: 'guide' },
+  { id: 4, href: ESVCLP_SOURCE, title: 'Early Stage Venture Capital Limited Partnerships', publisher: 'Australian Government', description: 'Scope, registration and partnership requirements for this particular program.', category: 'government' },
+  { id: 5, href: PITCH_SOURCE, title: 'Pitch for venture capital', publisher: 'Australian Government', description: 'Researching investor specialisation and preparing company evidence.', category: 'government' },
 ]

 export default function ArticlePage() {
-  const breadcrumbs = [
-    { label: 'Articles', href: '/articles' },
-    { label: TOPIC, href: `/articles/${CATEGORY}/${SLUG}`, current: true }
-  ]
+  return <>
+    <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TOPIC, current: true }]}
+      title={TOPIC} titleHighlight="research the fund" headerBgColor="purple" summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT} />
+    <ArticleTocPlaceholder />
+    <div className="prose prose-lg prose-slate prose-headings:scroll-mt-24 max-w-none">
+      <p>A conversation with someone at a venture firm is not the same as an investment decision. This guide helps Australian founders and startup-curious readers prepare a sourced brief about one firm: who invests, what it says it backs and which questions remain open. It does not rank investors or recommend a transaction.</p>
+      <p>For the earlier choice of whether to investigate venture funding, start with the <Link to="/articles/featured/venture-capital-how-does-it-work">capital-choice primer</Link>. For share pricing and option pools, use the separate <Link to="/articles/featured/how-vcs-value-startups">valuation calculation guide</Link>. Here, the output is your research brief for a conversation.</p>

-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR
-  }
+      <h2>Separate the firm, fund and people</h2>
+      <p>The <a href={SEC_SOURCE}>SEC’s private-funds explainer</a> distinguishes pooled investment capital from its adviser. <a href={COOLEY_SOURCE}>Cooley’s June 2026 structure primer</a> further separates a fund, its general partner and the management company. These are US-context explanations; the table is a vocabulary aid, not a prescribed Australian legal structure.</p>
+      <div role="region" aria-label="Venture firm roles" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-purple-700">
+        <table className="min-w-[630px]"><caption>Identify the actual entity and authority; roles can be organised differently.</caption><thead><tr><th scope="col">Role</th><th scope="col">Meaning in this model</th><th scope="col">Research question</th></tr></thead><tbody>
+          <tr><th scope="row">Limited partners (LPs)</th><td>Investors in the fund, rather than direct participants in every startup discussion.</td><td>Am I confusing fund investors with the company’s proposed shareholders?</td></tr>
+          <tr><th scope="row">Fund</th><td>The investment vehicle that holds portfolio assets.</td><td>Which vehicle and investment mandate are relevant to this conversation?</td></tr>
+          <tr><th scope="row">General partner (GP)</th><td>Controls the fund under a limited-partnership arrangement.</td><td>Which entity has authority under the actual agreements?</td></tr>
+          <tr><th scope="row">Management company</th><td>The operating business supplying people and services, potentially to multiple funds.</td><td>Who provides support, and which promises are documented?</td></tr>
+          <tr><th scope="row">Individual contact or committee</th><td>A person or group involved in that firm’s decision process.</td><td>Who can recommend, approve and sign—and what is still conditional?</td></tr>
+        </tbody></table>
+      </div>
+      <h3>Fees and carry are different from startup ownership</h3>
+      <p>Cooley describes management fees as supporting the operating business and carried interest as participation in fund profits. Their recipients and conditions depend on the structure. Carry is not the percentage of your startup sold in a round. Neither a brand name nor a headline fund size discloses the actual fee terms, remaining investable capital or willingness to support your company later.</p>
+      <p>Ask about the matters relevant to your relationship: current first-investment activity, follow-on decision criteria, reporting expectations and the people who would work with you. A stated intention to support companies is not a contractual follow-on commitment.</p>

-  return (
-    <>
-      <ArticleHeroHeader
-        breadcrumbs={breadcrumbs}
-        title={`${TOPIC} (2026)`}
-        titleHighlight={TOPIC}
-        headerBgColor='purple'
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
+      <h2 id="source-reading-example">Read one actual firm's process without guessing the rest</h2>
+      <p><a href={BLACKBIRD_SOURCE}>Blackbird’s Get Investment page</a>, checked 10 September 2026, is used because it publishes a process and investment FAQ. This is a source-reading example, not a shortlist, ranking or endorsement. The following records the firm’s statements, not independently verified service outcomes.</p>
+      <div role="region" aria-label="Blackbird source-reading example" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-purple-700">
+        <table className="min-w-[660px]"><caption>Published statements versus questions that still need confirmation.</caption><thead><tr><th scope="col">Topic</th><th scope="col">What the page states</th><th scope="col">What it does not establish</th></tr></thead><tbody>
+          <tr><th scope="row">Geographic connection</th><td>A strong founder connection to Australia or New Zealand matters, not location alone.</td><td>Whether your specific connection qualifies.</td></tr>
+          <tr><th scope="row">Stage</th><td>It considers pre-product/pre-revenue teams and also later rounds.</td><td>Approval of a particular company or a universal sector rule.</td></tr>
+          <tr><th scope="row">Contact</th><td>A direct pitch route is available without a warm introduction.</td><td>A guaranteed response date or invitation for this reader.</td></tr>
+          <tr><th scope="row">Decision</th><td>Its investment team develops the case for committee consideration before approval and terms.</td><td>That an encouraging first meeting is a completed decision.</td></tr>
+          <tr><th scope="row">Current deal</th><td>The public process is a starting point.</td><td>Your cheque size, investing vehicle, available reserves or final conditions.</td></tr>
+        </tbody></table>
+      </div>
+      <p>Keep a check date beside the source. A previous portfolio investment shows a historical investment, not today’s mandate or an obligation to consider a similar company. Reconfirm material details before acting; do not turn this snapshot into a personalised suitability score.</p>

-      <ArticleTocPlaceholder className="mb-12" />
+      <h2>A fund life is not your fundraising deadline</h2>
+      <p>One concrete Australian example is the <a href={ESVCLP_SOURCE}>ESVCLP program</a>. Its guidance describes registration and tax benefits for qualifying partnerships; the partnership agreement must provide for existence between five and fifteen years. That program requirement is not a market-average fund life or a startup exit timetable.</p>
+      <p>The official page also flags announced future cap changes subject to legislation. Do not treat proposed changes as current eligibility. This guide is not a tax assessment: verify the applicable rules, registration status and investment conditions with qualified advisers. A registered fund does not make every company eligible, and the scheme is not a direct grant application for your startup.</p>

-      <div className=''>
-        <h2>{TOPIC}</h2>
-        <p>
-          In simple terms: investors (LPs) commit money to a fund, general partners (GPs) run the fund, and that capital is invested into a small number of high-potential startups. In Australia (2026), VC is a focused tool for AI teams pursuing outsized growth; it comes with expectations on speed, scale, and governance.
-        </p>
+      <h2 id="firm-research-exercise">Turn an encouraging email into a precise next question</h2>
+      <p><strong>Fictional exercise:</strong> Leila receives an email from “Harbour Seed”, an invented firm unrelated to Blackbird: “We like the demo. Could you send pilot results before our partner discussion?” The message names no investing vehicle, amount, approval or closing date.</p>
+      <ul>
+        <li><strong>Confirmed in the fictional message:</strong> someone requested pilot results for a discussion.</li>
+        <li><strong>Not confirmed:</strong> an approved investment, a lead commitment or permission to circulate identifiable customer records.</li>
+        <li><strong>Useful reply question:</strong> “Which pilot measures would help, who will review them, and what decision would follow?”</li>
+        <li><strong>Evidence to prepare:</strong> a dated, appropriately redacted summary that distinguishes completed use, unpaid trials and collected revenue, with permission checks before sharing.</li>
+        <li><strong>Record the outcome:</strong> if the reply asks for more evidence, keep the state as “information requested”; do not promote it to “approved”.</li>
+      </ul>
+      <p>This is a reasoning exercise, not a suggested disclosure to an unverified contact. Verify identity and the agreed sharing scope before sending confidential material. The Australian Government’s <a href={PITCH_SOURCE}>pitch preparation guidance</a> supports researching the investor and preparing company evidence, but does not validate the fictional firm or its request.</p>

-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          containerClassName='my-10'
-        />
-
-        {/* SECTION 1 */}
-        <h2>Inside a VC firm: LPs, GPs, and the fund economics ("2 and 20")</h2>
-        <p>
-          A venture capital firm typically manages one or more closed-end funds. <em>Limited partners (LPs)</em>—such as super funds, family offices, and high-net-worth investors—commit capital. <em>General partners (GPs)</em> source deals, invest, and manage the portfolio. The firm usually earns a management fee (often around 2% per year on committed capital) and a performance fee called <em>carry</em> (commonly 20% of profits after returning LP capital). Returns are highly skewed: a few outliers tend to drive most of a fund’s performance.
-        </p>
-
-        <ArticleCallout
-          title='Know your investor’s fund math'
-          variant='brand'
-          icon={<span className='text-xl'>💡</span>}
-        >
-          Ask where a fund is in its life cycle and how much is reserved for follow-on. If a GP has limited reserves, they may favour companies with clear near-term milestones or syndicates that can lead later rounds.
-        </ArticleCallout>
-
-        {/* SECTION 2 */}
-        <h2>How decisions get made: sourcing → screening → diligence → investment committee</h2>
-        <ArticleImageBlock
-          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-67a0c0ab-1f4b-4a44-a503-c73dcc9786aa.jpg?alt=media&token=0f02d0e9-bbd6-40dc-8f37-9ceb43d45904"
-          alt="People in a tech startup setting collaborate, embodying a 90s film aesthetic, focused on decision-making processes."
-        />
-
-        <p>
-          Most firms run a pipeline: (1) <strong>Sourcing</strong> via networks, inbound, and theses; (2) <strong>Screening</strong> for fit (stage, sector, cheque size); (3) <strong>Diligence</strong> on team, product, market, traction, references, legal; (4) <strong>Investment Committee</strong> (IC) to approve terms; and (5) <strong>Closing</strong> and wiring funds. For AI startups, diligence often includes model provenance, data rights, eval quality, governance, and customer validation.
-        </p>
-
-
-
-        <QuoteBlock title='Evidence or expert insight' variant='purple'>
-          “VC is a power‑law business: one or two companies can return an entire fund. Show how you might be that outlier—credibly.”
-        </QuoteBlock>
-
-        {/* SECTION 3 */}
-        <h2>The VC fund life cycle: raise, invest, support, exit (10–12 years)</h2>
-        <ArticleImageBlock
-          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-70cefaae-5ceb-46a1-b31d-022491c7c52d.jpg?alt=media&token=349c0858-14a2-495d-82e8-7736232826ee"
-          alt="Nostalgic 90s film-style scene featuring diverse professionals collaborating in a tech startup environment."
-        />
-
-        <p>
-          A typical fund spends its first 1–2 years raising, then invests initial cheques over ~3–5 years while reserving capital for follow-ons. The final years focus on scaling portfolio companies and realising outcomes (secondary sales, M&A, IPO). Understanding this cadence helps you time outreach and anticipate follow-on behaviour.
-        </p>
-
-        {/* SECTION 4 */}
-        <h2>What VCs look for — especially in AI startups</h2>
-        <p>
-          Common lenses include: team (insight, speed, ethics), market (size, growth, urgency), product (clear wedge and user love), traction (paying users or strong usage), unit economics, and path to a meaningful outcome. For AI teams, investors also scrutinise your data advantage, model and infra choices, evals, and distribution.
-        </p>
-        <h3>AI-specific signals that help</h3>
-        <p>
-          • Credible data rights and privacy posture (as at 2026, customer and regulator expectations are rising). • Robust internal evals tied to customer outcomes. • Moats beyond model access (e.g., proprietary data, workflow lock‑in, or unique distribution). • Early revenue quality (expansion, retention) versus vanity metrics.
-        </p>
-
-        {/* SECTION 5 */}
-        <h2>Rounds, instruments, and terms in Australia</h2>
-        <p>
-          Australian rounds generally mirror global norms but with local nuances. <strong>Pre‑seed/Seed</strong> often use SAFEs or convertible notes (valuation cap/discount), while <strong>Series A+</strong> are usually priced equity. Term sheets commonly include pro‑rata rights and a 1× non‑participating liquidation preference in Australia; specifics vary by deal.
-        </p>
-        <h3>Instruments (founder quick scan)</h3>
-        <p>
-          • <strong>SAFE:</strong> Simple agreement for future equity. No interest or maturity, converts later. • <strong>Convertible note:</strong> Debt that converts to equity later with interest/maturity. • <strong>Priced equity:</strong> Sets a valuation now; governance ramps up (board, reporting).
-        </p>
-        <p>
-          As at 2026, AU seed rounds remain highly context‑specific. Founders should model dilution across scenarios and align on runway (typically 18–24 months) and milestones.
-        </p>
-
-        {/* SECTION 6 */}
-        <h2>The Australian landscape: programs, players, and norms</h2>
-        <p>
-          Australia supports early‑stage investing through frameworks such as <strong>ESVCLP</strong> and <strong>VCLP</strong> (see official guidance), alongside the <strong>R&D Tax Incentive</strong>. Local funds span generalist and deep‑tech; angel syndicates and micro‑funds play a growing role at pre‑seed. International funds increasingly participate remotely when the problem and traction are compelling. Always confirm program details from official sources.
-        </p>
-
-        {/* SECTION 7 */}
-        <h2>Getting a first meeting: materials, outreach, and proof</h2>
-        <p>
-          Prepare a tight 10–12 slide deck, a concise memo, and a lightweight data room (cap table, product demo, key metrics, customer references). For outreach, warm intros help but thoughtful cold emails with clear traction are read. Lead with customer outcomes, why now, and a crisp ask (round size, use of funds, milestones).
-        </p>
-
-        <ArticleStepList
-          title='Practical steps'
-          steps={[
-            'Map investor–company fit: stage, cheque size, sector thesis, and fund age.',
-            'Build an evidence pack: product demo, early customer proof, metrics, and data rights.',
-            'Create a targeted list and run a 2–3 week, well‑paced process to keep momentum.'
-          ]}
-          accent='indigo'
-        />
-
-        <AudienceGrid
-          heading='Who this helps'
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'For leaders validating AI ideas, seeking funding, or planning runway.',
-              icon: <RocketLaunchIcon className='h-6 w-6' />,
-              variant: 'orange'
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For those building portfolios, learning venture basics, or exploring AI paths.',
-              icon: <AcademicCapIcon className='h-6 w-6' />,
-              variant: 'purple'
-            },
-            {
-              title: 'Community Builders',
-              description: 'For mentors and organisers supporting early-stage AI teams in Australia.',
-              icon: <UsersIcon className='h-6 w-6' />,
-              variant: 'yellow'
-            }
-          ]}
-        />
-
-        <MLAITemplateResourceCTA />
-
-        {/* SECTION 8 (Closing) */}
-        <h2>Choose your capital strategy, not just a round</h2>
-        <p>
-          VC can be powerful when your goal is speed to a large outcome. It is not the only path: angels, revenue, grants, and partnerships may better fit some AI teams. Decide based on your milestones, customer cycles, and resilience to market swings. If you do pursue VC, be explicit about runway, evidence, and what success looks like between now and the next raise.
-        </p>
-
-        <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
-          <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
-          <ul className='space-y-3'>
-            <li className='flex gap-3 text-gray-700'>
-              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
-              <span>Map who supplies capital, who makes investment decisions and how returns reach investors.</span>
-            </li>
-            <li className='flex gap-3 text-gray-700'>
-              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
-              <span>Draft your round plan: runway, milestones, and target investor list.</span>
-            </li>
-            <li className='flex gap-3 text-gray-700'>
-              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
-              <span>Run a focused outreach window and refine based on feedback.</span>
-            </li>
-          </ul>
-        </div>
-
-        <ArticleCompanyCTA
-          title={`Need help with ${TOPIC}?`}
-          body="MLAI is a not-for-profit community empowering the Australian AI community. Share your goals and we'll point you to helpful resources and connections."
-          buttonText='Join the MLAI community'
-          buttonHref='https://mlai.au/contact'
-          note='Friendly, community-first contact — no hard sell.'
-        />
-
-        <ArticleDisclaimer className='mt-8' />
-
-        <ArticleReferences references={references} />
-
-        <AuthorBio author={authorDetails} className="mt-8" />
-      </div>
-    </>
-  )
+      <h2 id="funding-discussion-record">Build the research brief you can actually use</h2>
+      <p>For each item record a source/date, a confirmed fact or explicit unknown, and the next question. Do not mark an item complete simply because you have a link. The editable file contains a filled fictional example, blank checklist and claim-by-claim sharing log.</p>
+      <pre className="whitespace-pre-wrap break-words text-sm" aria-label="Funding discussion record">{[
+        'Firm and official source/date:', 'Stated stage, geography and sector:',
+        'What is confirmed versus inferred about its mandate:', 'Decision-maker and process questions:',
+        'Information requested and permission to share it:', 'Unresolved fit question and next agreed step:',
+      ].join('\n')}</pre>
+      <p><a href="/downloads/venture-learning/firm-research-checklist.md" download>Download the firm research checklist and worked brief (.md)</a>. This is a preparation aid, not legal due diligence, investor accreditation or a deal recommendation.</p>
+      <p>If your separate task is reporting progress to existing stakeholders, <Link to="/vibe-raising">explore Vibe Raising for a factual progress update</Link>. Use verified inputs and label estimates; it does not assess an investor or verify the evidence for you.</p>
+      <p>Bring one general process question to a relevant MLAI founder session, in person or online. Check the topic and level; leave confidential deal information out of the group conversation. Attendance does not include access to Blackbird or another investor.</p>
+      <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+      <p>Sources checked 10 September 2026. Independent financial/legal review is pending. Primary-source attribution does not mean the source publisher reviewed or endorsed this article.</p>
+      <ArticleReferences references={references} heading="Sources" />
+      <ArticleFAQ items={faqItems} />
+      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
+      <ArticleFooterNav />
+    </div>
+  </>
 }
```
