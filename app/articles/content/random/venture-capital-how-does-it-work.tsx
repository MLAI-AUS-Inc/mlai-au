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

const TOPIC = 'Venture capital: how it works'
export const CATEGORY = 'featured'
export const SLUG = 'venture-capital-how-does-it-work'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE?.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-26'
export const DATE_MODIFIED = '2026-01-26'
export const DESCRIPTION = 'A clear, Australia‑aware guide to how venture capital works in 2026: fund mechanics, rounds, dilution, term sheets, and practical steps to raise responsibly.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9dce8514-cb13-4930-b27d-d1f5dbefd41e.jpg?alt=media&token=10c631f0-44c2-4421-9a86-a5505a3d0383"
const HERO_IMAGE_ALT = 'Founders reviewing a term sheet and cap table during a funding round meeting'
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
    question: 'How is venture capital different from angel investing?',
    answer:
      'Angels are typically individuals investing their own money at very early stages. Venture capital firms manage pooled funds from limited partners (LPs), invest larger cheques, and usually take board seats and structured terms.'
  },
  {
    id: 2,
    question: 'How much equity do VCs usually take?',
    answer:
      'Seed rounds commonly sell 10–20% of the company. Later rounds often target 10–15% per round. Actual numbers vary with traction, market conditions, and round size.'
  },
  {
    id: 3,
    question: 'What documents do I need to raise a seed round?',
    answer:
      'A crisp narrative and deck, data room (cap table, financial model, metrics, customer references), product demo or prototype, and clear use of funds tied to 18–24 months of milestones.'
  },
  {
    id: 4,
    question: 'How are valuations set?',
    answer:
      'Valuations are negotiated. They reflect traction, market size, team, defensibility, and comparable rounds. In practice, VCs anchor on ownership targets and fund return models as much as spreadsheets.'
  },
  {
    id: 5,
    question: 'How long does due diligence take?',
    answer:
      'For seed, 2–6 weeks is common once a term sheet is signed. Later rounds can take longer due to deeper legal, financial, security, and customer diligence.'
  },
  {
    id: 6,
    question: 'Is venture capital right for an AI startup in Australia?',
    answer:
      'It can be if you’re chasing a large market with venture‑scale growth potential. If your plan is capital‑efficient or niche, consider angels, grants, and revenue‑funded growth first.'
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'How do venture capital firms make money?', description: 'Management fees (~2%/yr) plus carried interest (~20%) on profits after LP capital is returned.' },
    { label: 'What percentage do VCs usually take?', description: 'Seed often 10–20% ownership; later rounds ~10–15% per round, depending on traction and market.' },
    { label: 'How long does it take to raise VC?', description: 'Commonly 3–6 months from first meetings to funds received; later rounds can take longer.' }
  ]
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
  imageAlt: HERO_IMAGE_ALT
}

/** ===== References (optional) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
    title: 'What Is Venture Capital? Definition, Pros, Cons, and How It Works',
    publisher: 'Investopedia',
    description: 'Overview of venture capital, including advantages, disadvantages, and process.',
    category: 'guide'
  },
  {
    id: 2,
    href: 'https://www.jpmorgan.com/insights/business-planning/what-is-venture-capital',
    title: 'What is Venture Capital?',
    publisher: 'J.P. Morgan',
    description: 'Primer on how venture capital works, stages, and considerations for founders.',
    category: 'analysis'
  },
  {
    id: 3,
    href: 'https://business.gov.au/grants-and-programs/research-and-development-tax-incentive',
    title: 'R&D Tax Incentive',
    publisher: 'Australian Government — business.gov.au',
    description: 'Official guidance on the R&D Tax Incentive relevant to Australian startups.',
    category: 'government'
  },
  {
    id: 4,
    href: 'https://www.aic.co',
    title: 'Private Capital in Australia — overview',
    publisher: 'Australian Investment Council',
    description: 'Context on the Australian venture ecosystem and private capital landscape.',
    category: 'industry'
  },
  {
    id: 5,
    href: 'https://nvca.org/model-legal-documents/',
    title: 'NVCA Model Legal Documents (including Term Sheet)',
    publisher: 'NVCA',
    description: 'Widely referenced model venture documents to understand standard terms.',
    category: 'guide'
  }
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
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <>
      {/* Hero header (custom) */}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
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

      <div className="prose prose-lg prose-slate max-w-none">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> – Venture capital (VC) channels money from limited partners (LPs) into
          high‑growth startups via managed funds. In practice, power‑law returns drive VC behaviour: a few
          breakout companies are expected to return the fund, so partners prioritise outlier potential,
          speed to learnings, and disciplined ownership targets.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Founders align a funding round with milestones and runway."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description:
                'For leaders planning a raise, aligning milestones to runway, and navigating term sheets.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description:
                'For learners building a mental model of VC economics, rounds, and investor expectations.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description:
                'For mentors and facilitators supporting early‑stage Australian founders through a raise.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow'
            }
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>The venture capital model: LPs → funds → startups</h2>
        <p>
          VC firms raise money from LPs (e.g., super funds, family offices, endowments) into a closed‑end
          fund, typically with a 10‑year life. General partners (GPs) invest that fund into startups in
          exchange for equity, support those companies, and aim to return capital plus gains to LPs via
          exits (acquisitions or IPOs). Because outcomes are skewed, fund construction (stage focus,
          cheque size, ownership targets) strongly influences how a VC evaluates your round.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          A small number of investments usually drive most of a fund’s returns. That’s why VCs seek
          credible paths to outsized outcomes and protect follow‑on rights to double down on winners.
        </QuoteBlock>

        <h2>How a VC round actually unfolds</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f1f77dd1-7b6b-4222-a3bb-e1fab59141a5.jpg?alt=media&token=fc24ec1e-a044-4f44-883f-9656fc9b095b"
          alt="Diverse startup team collaborating in a 90s retro tech workspace, discussing venture capital strategies."
          caption="A team aligning on VC outreach, data room prep, and closing plan."
        />

        <p>
          Most raises follow a predictable path: warm introductions or targeted outreach; initial partner
          screening; deeper meetings and a product demo; partner discussion; a term sheet; confirmatory due
          diligence; final documents; completion and funds transfer. For seed rounds this can be 6–12
          meetings across 3–6 months; later rounds can take longer.
        </p>

        <h3>Common terms you’ll see on a term sheet</h3>
        <p>
          Key levers include valuation (pre/post‑money), investor ownership target, option pool size and
          whether it’s created pre‑ or post‑money, board composition, information rights, pro‑rata
          (follow‑on) rights, liquidation preference (often 1× non‑participating), anti‑dilution mechanics,
          and protective provisions. Each term affects control, dilution, and future flexibility.
        </p>

        <QuoteBlock title="Practical checklist" variant="purple">
          Before signing: model dilution over two future rounds; confirm runway ≥ 18–24 months; align the
          option pool with hiring plan; understand liquidation preference; agree on decision rights and the
          board plan; ensure data room completeness for fast diligence.
        </QuoteBlock>

        <ArticleStepList
          title="Steps to run an efficient raise"
          steps={[
            { label: 'Decide if VC fits your plan: market size, pace, risk appetite.' },
            { label: 'Set round size from a 18–24 month plan and key milestones.' },
            { label: 'Build a focused investor list by stage, sector, and geography.' },
            { label: 'Prepare a crisp deck, demo, metrics, and a clean cap table.' },
            { label: 'Sequence outreach, run tight updates, and close momentum efficiently.' }
          ]}
          accent="teal"
        />

        <h2>What VCs look for in 2026 (especially for AI)</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-58299f0e-49bd-4eeb-abfa-3b599896b656.jpg?alt=media&token=108c7918-4423-4fd6-a126-f634eacf08ca"
          alt="Innovative tech professionals strategizing in a retro 90s startup environment focused on AI investment."
          caption="Founders pressure-testing AI defensibility, distribution, and cost structures."
        />

        <p>
          Evidence of pull (users, growth, or pilots), a large or expanding market, a team with unique
          insight, and early proof of defensibility. For AI companies, differentiation often comes from
          proprietary data, systems integration, workflows, or distribution—rather than model access alone.
          Clarity on cost of goods (inference costs), evaluation approaches, and responsible AI practices is
          now table‑stakes.
        </p>

        <h2>Fund economics: how VCs make money (and why it matters)</h2>
        <p>
          VCs typically charge an annual management fee (~2%) and earn carried interest (~20%) on profits
          above returning LP capital. This pushes funds to target ownership that can return a meaningful
          portion of the fund if you succeed. Practically, that’s why many seed investors seek ~10–20%
          ownership and later‑stage investors ~10–15% per round.
        </p>

        <h3>Dilution across rounds (simple mental model)</h3>
        <p>
          A common path might sell ~15% at seed, ~15% at Series A, ~10% at Series B—leaving founders with a
          majority early, then a meaningful but minority stake later. Your mileage varies: strong traction,
          capital efficiency, and investor competition can reduce dilution.
        </p>

        <h2>Pros, cons, and fit</h2>
        <p>
          VC can accelerate ambitious plans, unlock talent and distribution, and offer experienced support.
          The trade‑offs include dilution, governance obligations, and growth pressure. It’s a great fit for
          large markets and compounding moats; it’s a poor fit for niche or lifestyle businesses that can be
          built sustainably without heavy capital.
        </p>

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download a raise planning checklist, cap table model, and a term‑sheet reading guide."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="orange">
          Run your raise like a product launch: time‑boxed outreach, clear weekly updates, measurable
          milestones, and one owner responsible for the data room and close plan.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Australia‑specific notes</h2>
        <p>
          In Australia, timelines of 3–6 months are common for seed, with meaningful variation by market
          conditions. Many funds operate ESVCLP/VCLP structures (tax‑advantaged at the fund level), while
          founders often benefit from the R&D Tax Incentive to extend runway. Expect similar global terms but
          smaller median round sizes than the US at the same stage; larger cheques increasingly come from
          global investors co‑leading with Australian firms.
        </p>

        <h2>Alternatives to VC</h2>
        <p>
          Consider angels and syndicates for earlier validation; grants to reduce technical risk; revenue‑
          based finance or venture debt once you have predictable revenue; and of course bootstrapping. Many
          resilient companies never raise VC—choose the capital that matches your goals and constraints.
        </p>

        <h2>Next steps</h2>
        <p>
          Decide whether VC truly matches your ambition, model your dilution over future rounds, and build a
          clear 18–24 month plan that converts capital into de‑risked milestones. If you proceed, run a tight
          process, protect focus, and keep learning loops fast.
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
        note="You can filter by topic, format (online/in‑person), and experience level."
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
