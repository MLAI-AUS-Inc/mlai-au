import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'Venture capital: how does it work?'
export const CATEGORY = 'featured'
export const SLUG = 'venture-capital-how-does-it-work'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-26'
export const DATE_MODIFIED = '2026-01-26'
export const DESCRIPTION = 'A plain‑English guide to how venture capital works in Australia: fund structure, stages, dilution, and what investors look for. Updated for 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-fd28a08d-960c-4264-b8ee-8723810599db.jpg?alt=media&token=87ce9c67-c2a7-4870-8e7a-fb7c74658f0f"
const HERO_IMAGE_ALT = 'Founders discussing funding with venture investors'
export const FEATURED_FOCUS = 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'How do venture capitalists make money?',
    answer: (
      <>
        VCs typically earn a management fee on committed capital (often around 2% per year) and a performance fee called carried interest (commonly ~20%) on profits once investors’ principal has been returned. The exact numbers vary by fund and vintage.
      </>
    ),
  },
  {
    id: 2,
    question: 'What ownership percentage do VCs usually take?',
    answer: (
      <>
        It depends on stage and valuation. Seed rounds may land anywhere from ~10–25% new ownership for investors; later rounds often target dilution bands of ~15–25%. Your cap table, valuation, and any employee option pool adjustments affect the final percentage.
      </>
    ),
  },
  {
    id: 3,
    question: 'Do I need revenue to raise VC?',
    answer: (
      <>
        Not always at pre‑seed or seed, where the bet is often on team, market, and early signals of demand. By Series A, many funds expect evidence of product‑market fit (repeatable usage and growth, sometimes revenue momentum) plus a clear plan to scale.
      </>
    ),
  },
  {
    id: 4,
    question: 'How long does due diligence take?',
    answer: (
      <>
        Light diligence can be 2–3 weeks; deeper processes may run 4–8+ weeks, depending on round size, complexity, and how organised your data room is. Market conditions can extend timelines.
      </>
    ),
  },
  {
    id: 5,
    question: 'SAFE vs convertible note—what’s the difference?',
    answer: (
      <>
        A SAFE is an agreement that converts to equity in the future, typically at a discount and/or valuation cap, without accruing interest or a maturity date. A convertible note is debt that accrues interest and has a maturity date; it also converts to equity under agreed terms. Local legal advice is recommended in Australia.
      </>
    ),
  },
  {
    id: 6,
    question: 'Is venture capital right for my startup?',
    answer: (
      <>
        VC suits ventures targeting large, fast‑growing markets where scale requires significant upfront investment and a long runway. If you prefer control, steady growth, or capital‑efficiency over blitz‑scaling, alternatives like angel funding, grants, or bootstrapping may be a better fit.
      </>
    ),
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'How do venture capitalists make money?', description: 'Mainly via management fees (often ~2% p.a.) and carried interest (commonly ~20%) on profits after returning capital to LPs.' },
    { label: 'What are the stages of VC funding?', description: 'Pre‑seed, seed, Series A–C+. Each round funds new milestones with higher expectations for traction, governance, and scale.' },
    { label: 'How does dilution work in a VC round?', description: 'New shares are issued; investor ownership ≈ investment ÷ post‑money valuation. Existing holders dilute unless they invest pro‑rata.' },
  ],
}

/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
export const articleMeta = {
  title: `${TOPIC} (2026)`,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
}

/** ===== References (optional) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
    title: 'What Is Venture Capital?',
    publisher: 'Investopedia',
    description: 'Definition, how VC works, typical fee/carry structures, and stages.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://www.jpmorgan.com/insights/business-planning/what-is-venture-capital',
    title: 'What is Venture Capital?',
    publisher: 'J.P. Morgan',
    description: 'Overview of VC, how it works, pros and cons, and considerations for founders.',
    category: 'guide',
  },
  {
    id: 3,
    href: 'https://stripe.com/au/resources/more/venture-capital-firms-and-startups',
    title: 'How venture capital firms work and what they look for',
    publisher: 'Stripe',
    description: 'Fund mechanics, evaluation criteria, and guidance for startups approaching VCs.',
    category: 'analysis',
  },
]

/**
 * ARTICLE CONTENT COMPONENT
 *
 * This component is dynamically imported by the route handler and rendered
 * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
 */
export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {/* Hero header (custom) */}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      {/* Table of contents placeholder */}
      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — For Australian founders and operators, this means understanding where VC money comes from, how funds decide, what a round does to your ownership, and how to run a clean process. This guide distils global norms and local context for 2026 so you can make an informed, values‑aligned choice.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          width={1600}
          height={900}
          containerClassName="my-10"
          imageClassName="rounded-3xl"
          caption="A founder team preparing their pitch and data room before investor meetings."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'You’re considering a raise or deciding whether VC fits your goals.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'You want a practical model of how VC funds and rounds actually work.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'You support founders and want a clear, Australia‑aware explainer.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>How VC funds are structured and how returns are made</h2>
        <p>
          Venture capital funds are typically limited partnerships. Limited partners (LPs) — such as super funds, family offices, and institutions — commit capital. General partners (GPs) manage the fund: they source deals, support portfolio companies, and aim to return more than was invested. Two revenue streams matter: an annual management fee (often ~2% of committed capital) and carried interest (commonly ~20% of the profits after returning LP capital). Funds often have ~10‑year lives with an investment period in the early years and harvest later. Australian VC funds generally follow the same global model.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          VC economics reward outsized outcomes. A few exceptional winners must pay for many experiments — that’s why investors focus on scalable markets and repeatable growth.
        </QuoteBlock>

        <h2>The funding journey: from pre‑seed to Series C</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-87e4babf-c80f-4ea6-ae06-c2fd8d24d72f.jpg?alt=media&token=76ea37dc-2beb-4618-8123-ae1942e5e0a8" alt="Group of diverse entrepreneurs brainstorming in a retro 90s tech workspace, capturing the funding journey." className="w-full rounded-lg my-8" />

        <p>
          Rounds fund milestones. Expectations and governance rise with each stage; the goal is to reduce risk step by step.
        </p>
        <h3>Pre‑seed and seed</h3>
        <ul>
          <li><strong>Pre‑seed:</strong> Team, early insight, prototype or initial research. Evidence of a real customer pain and a credible plan.</li>
          <li><strong>Seed:</strong> Early product in market, first users, clear problem/solution fit, learning loops, and early traction indicators.</li>
        </ul>
        <h3>Series A–C</h3>
        <ul>
          <li><strong>Series A:</strong> Signals of product‑market fit, improving retention, repeatable go‑to‑market, early unit economics.</li>
          <li><strong>Series B–C:</strong> Scaling systems, multi‑quarter growth, leadership hires, governance, and expansion plans.</li>
        </ul>

        <h2>What venture investors evaluate</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3dc0d858-c475-497a-8cfe-c8c165c4f411.jpg?alt=media&token=f7a5e0d6-2d21-4cba-bfed-776c30668c41" alt="Group of diverse professionals in a retro tech setting, discussing venture investments and startups." className="w-full rounded-lg my-8" />

        <ul>
          <li><strong>Team:</strong> Rate of learning, clarity, founder‑market fit, ability to recruit.</li>
          <li><strong>Market:</strong> Big, growing, and accessible with a credible wedge.</li>
          <li><strong>Product & defensibility:</strong> Differentiation, velocity, and any moats (data, distribution, community, IP).</li>
          <li><strong>Traction & unit economics:</strong> Evidence of demand, retention, CAC/LTV directionality (appropriate to stage).</li>
          <li><strong>Round structure:</strong> Valuation, proposed dilution, option pool, governance, and a plan for 18–24 months.</li>
        </ul>

        <h2>Common deal instruments in Australia (as at 2026)</h2>
        <p>
          You will encounter a few standard approaches. Seek local legal advice; terms and tax can vary.
        </p>
        <ul>
          <li><strong>Priced equity round:</strong> Shares are issued at an agreed pre‑money valuation. Clean, familiar, and sets a clear baseline for the next round.</li>
          <li><strong>SAFE:</strong> Simple agreement for future equity. Converts in a later round using a valuation cap and/or discount. No interest or maturity.</li>
          <li><strong>Convertible note:</strong> Debt that converts later, usually with interest, a discount, and a maturity date. Sometimes used where timing or pricing is uncertain.</li>
        </ul>

        <QuoteBlock title="Pro tip" variant="orange">
          Prefer standard, well‑understood documents. The time you save and the trust you build often matter more than clever edge‑case terms.
        </QuoteBlock>

        <h2>Dilution in practice: a quick worked example</h2>
        <p>
          Suppose a seed investor puts $1.0m into a company at a $4.0m pre‑money valuation ($5.0m post‑money). Investor ownership after the round is $1.0m ÷ $5.0m = 20%. Founders now hold 80% (before any option pool changes). If a later Series A raises $5.0m at a $20.0m pre ($25.0m post), new dilution is $5.0m ÷ $25.0m = 20%. Founders would move from 80% to 64% (0.8 × 0.8); the seed investor’s 20% becomes 16%, and the Series A investor holds 20%. Real rounds also adjust for employee option pools and any convertibles.
        </p>
        <p>
          These numbers are illustrative only; your valuation, pool size, and instrument terms will change the math.
        </p>

        <h2>Process and timing: what to expect in a raise</h2>
        <p>
          Efficient raises are structured, time‑boxed, and data‑driven. In balanced markets, 8–16 weeks from first meetings to funds‑in is common; tougher markets can take longer. Keep communications clear and your data room organised.
        </p>

        <ArticleStepList
          title="Step‑by‑step actions"
          steps={[
            { label: 'Prepare essentials: 12–18‑month plan, focused deck, clean data room' },
            { label: 'Build a target list: stage/sector fit, cheque size, portfolio conflicts' },
            { label: 'Run outreach: warm intros where possible; track pipeline clearly' },
            { label: 'First and partner meetings: align on thesis, milestones, and use of funds' },
            { label: 'Negotiate term sheet, complete diligence, sign, and close' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists, worksheets, and example documents tailored to this guide."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <h2>Pros, cons, and realistic alternatives</h2>
        <ul>
          <li><strong>Pros:</strong> Capital to move faster, investor networks, credibility with hires and partners.</li>
          <li><strong>Cons:</strong> Dilution, board/investor expectations, bias toward high‑growth paths.</li>
          <li><strong>Alternatives:</strong> Angels, grants, revenue/bootstrapping, and (later) venture debt. Choose the path that matches your ambition, risk tolerance, and runway needs.</li>
        </ul>

        <h2>Australia‑specific notes (as at 2026)</h2>
        <ul>
          <li>Most local funds mirror global norms on structure, fees, and deal mechanics.</li>
          <li>SAFE and convertible notes are widely understood; priced equity remains standard for larger rounds.</li>
          <li>Connect with the Australian ecosystem early — community groups, mentors, and founder peers can shorten your learning loop.</li>
        </ul>

        <QuoteBlock title="Pro tip" variant="orange">
          Map your milestones to a realistic runway. Raise what you need to reach the next proof‑point — not an arbitrary round label.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Next steps</h2>
        <p>
          Decide whether VC aligns with your goals. If yes, set a tight milestone plan, prepare your materials, and run a crisp, respectful process. If not, pursue the capital path that best serves your customers and team — there are many ways to build an impactful company.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="Get practical recommendations based on your goals, time, and experience level."
        buttonText="Get recommendations"
        buttonHref="/contact"
        note="You can filter by topic, format (online/in-person), and experience level."
      />

      {/* Author Bio */}
      <AuthorBio author={authorDetails} />

      {/* FAQ */}
      <ArticleFAQ items={faqItems} />

      {/* Navigation */}
      <ArticleFooterNav />
    </>
  )
}
