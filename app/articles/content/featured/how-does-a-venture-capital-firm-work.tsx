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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How does a venture capital firm work?'
export const CATEGORY = 'ai-community-collaboration'
export const SLUG = 'how-does-a-venture-capital-firm-work'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-25'
export const DATE_MODIFIED = '2026-01-25'
export const DESCRIPTION = 'A founder-friendly breakdown of how VC firms operate: structure, incentives, the investment process, and the Australian context (2026).'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ceed4961-efbc-497b-ab3e-a2b769f990b1.jpg?alt=media&token=fc18666c-6347-4074-90c8-a2972f085642"
const HERO_IMAGE_ALT = 'Partners reviewing a startup pitch deck around a table'
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
    question: 'How do VC firms make money?',
    answer:
      'Primarily via an annual management fee (often ~2% of committed capital during the investment period, then stepping down) and carried interest (commonly 20% of the fund’s profits after returning capital to investors). Structures vary by fund and jurisdiction.'
  },
  {
    id: 2,
    question: 'What’s the difference between LPs and GPs?',
    answer:
      'Limited Partners (LPs) provide the capital (e.g., super funds, family offices). General Partners (GPs) form the VC firm, make investment decisions, manage the portfolio, and earn fees and carry. LPs have limited liability; GPs manage operations and take on fiduciary duties.'
  },
  {
    id: 3,
    question: 'How long does a VC fund last?',
    answer:
      'Typically 10–12 years. Years 1–4 are the main investing period; later years focus on supporting portfolio companies and managing exits. One- to two-year extensions are common.'
  },
  {
    id: 4,
    question: 'What do VCs look for at seed versus Series A?',
    answer:
      'Seed: team, problem clarity, early signals of product–market fit. Series A: repeatable go-to-market, growing cohorts, improving unit economics, and a credible plan to scale.'
  },
  {
    id: 5,
    question: 'Are there Australian-specific settings I should know?',
    answer: (
      <>
        As at 2026, Australia recognises venture structures such as VCLP and ESVCLP with specific tax settings. See the Australian Taxation Office guidance for details:{' '}
        <a href="https://www.ato.gov.au/Business/Your-workers/In-detail/Capital-gains-tax/Venture-capital-limited-partnerships/" target="_blank" rel="noopener noreferrer">ATO: Venture capital limited partnerships</a>.
      </>
    )
  },
  {
    id: 6,
    question: 'How long does it take to raise a round?',
    answer:
      'Plan for 3–6 months from first meetings to money in the bank, assuming materials are ready and there is traction. Timelines vary with market conditions.'
  },
  {
    id: 7,
    question: 'Is VC right for my startup?',
    answer:
      'VC suits high-growth, high-uncertainty opportunities where outcomes could return the fund. If growth is steady or capital-efficient, alternatives (revenue, grants, R&D incentive) may be a better fit.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How do VC firms make money?',
      description: 'Through annual management fees (~2% of committed capital) and carried interest (often 20% of profits after returning capital to investors).'
    },
    {
      label: 'What is a typical VC fund lifecycle?',
      description: 'Usually 10–12 years: 3–5 years investing, then 5–7 years managing and exiting; one–two year extensions are common.'
    },
    {
      label: 'What do VCs look for at seed vs Series A?',
      description: 'Seed: team, problem clarity, early traction. Series A: repeatable growth, improving unit economics, and a clear go‑to‑market.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
    title: 'What Is Venture Capital? Definition, Pros, Cons, and How It Works',
    publisher: 'Investopedia',
    description: 'Overview of venture capital structures, stages, and terms.',
    category: 'guide'
  },
  {
    id: 2,
    href: 'https://stripe.com/au/resources/more/venture-capital-firms-and-startups',
    title: 'How venture capital firms work and what they look for',
    publisher: 'Stripe',
    description: 'Founder-focused guidance on how VCs operate and selection criteria.',
    category: 'industry'
  },
  {
    id: 3,
    href: 'https://www.jpmorgan.com/insights/business-planning/what-is-venture-capital',
    title: 'What is Venture Capital?',
    publisher: 'J.P. Morgan',
    description: 'Intro to VC stages, processes, and key concepts.',
    category: 'industry'
  },
  {
    id: 4,
    href: 'https://www.ato.gov.au/Business/Entity-structures/In-detail/Venture-capital-limited-partnerships/',
    title: 'Venture capital limited partnerships (VCLP/ESVCLP)',
    publisher: 'Australian Taxation Office',
    description: 'Official guidance on Australian venture capital partnership structures and tax settings (as at 2026).',
    category: 'government'
  }
]

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true }
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="relative">
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-72">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <p>
            <strong>{TOPIC}</strong> — Venture capital (VC) firms pool money from investors (LPs) and are managed by partners (GPs) who back high-growth startups. Below is a practical walk-through of how a VC firm is structured, how incentives work, what the investment process looks like, and what’s specific to Australia in 2026.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          <h2>Inside the VC firm: LPs, GPs and the 10‑year fund cycle</h2>
          <p>
            A VC fund is typically a limited partnership. <em>Limited Partners</em> (LPs) — such as super funds, family offices, corporates, and high-net-worth individuals — commit capital. <em>General Partners</em> (GPs) run the fund: sourcing deals, leading due diligence, supporting companies, and managing exits. Most funds are raised with a 10–12 year life: around 3–5 years to make initial investments (and reserves for follow-ons), followed by several years to help companies grow and exit. Extensions are common.
          </p>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout title="Tip for founders" variant="brand" icon={<span className="text-xl">💡</span>}>
            When you meet a VC, ask where they are in their fund cycle and how much capital is reserved for follow‑on cheques. It signals sophistication and affects the support you can expect post‑investment.
          </ArticleCallout>

          <h2>How VC firms make money: management fees, carry and waterfalls</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-da9d8689-75b6-434e-8040-ada6c2ce3a6c.jpg?alt=media&token=225fa430-394c-42cf-9b2a-9dad8bfa803a" alt="People discussing startup strategies in a 90s film aesthetic, embodying the tech entrepreneurial spirit." className="w-full rounded-lg my-8" />

          <p>
            VC firms are paid two main ways. First, an annual <strong>management fee</strong> (commonly ~2% of committed capital during the investment period, stepping down over time) funds salaries and operations. Second, <strong>carried interest</strong> (often 20%) is the GP’s share of profits once LPs have their contributed capital returned (and sometimes a preferred return). Profits flow through a <em>waterfall</em>: capital back to LPs, then carry split between GPs and LPs on gains. Precise economics are set in fund documents and can vary by jurisdiction.
          </p>

          <h2>From intro to term sheet: the VC investment process</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bcfba10a-0773-43a6-a417-70c6118f5ee2.jpg?alt=media&token=d89d5e7e-1ca8-43ba-9332-038aacd08c88" alt="People in a retro tech startup setting discuss strategies, embodying the VC investment journey from intro to term sheet." className="w-full rounded-lg my-8" />

          <p>
            The typical sequence: sourcing (warm referrals help, but open channels matter), quick screening, partner deep‑dives, diligence (team, market, product, legal, and references), investment committee, and a term sheet. Closing follows legal documentation and any outstanding conditions. Founders should keep a clean data room ready: deck, metrics, cap table, customer references, and a short demo.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              'Define the round goal: 18–24 months of runway and milestones you will hit.',
              'Assemble a concise data room: deck, metrics, demo, cap table, customer references.',
              'Build an investor map: stage/sector fit, cheque size, and a tight outreach sequence.'
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Evidence or expert insight" variant="purple">
            “Most funds are powered by a few outliers. VCs look for companies that can return a fund — not just clear the next round.”
          </QuoteBlock>

          <h2>What VCs look for by stage (pre‑seed to Series B)</h2>
          <p>
            While criteria vary, patterns are consistent. <strong>Pre‑seed:</strong> team, insight, early product signal, and a credible plan to test riskiest assumptions. <strong>Seed:</strong> early product–market fit indicators (retention, usage growth), first revenues or strong waitlist/engagement. <strong>Series A:</strong> repeatable go‑to‑market, improving unit economics, cohort retention, and path to efficient scale. <strong>Series B:</strong> systems for scale, multi‑channel acquisition, and predictable revenue expansion.
          </p>

          <h3>Australian context (2026)</h3>
          <p>
            Round sizes and valuations in Australia are often smaller than in the US, but expectations on evidence are similar: clear problem definition, customer pull, disciplined metrics, and governance readiness. Programs like the R&D Tax Incentive can complement equity, but confirm current eligibility and rules via official sources.
          </p>

          <h2>Term sheets and dilution essentials for founders</h2>
          <p>
            Term sheets outline key economics and control. Core items include valuation and option pool (which both affect dilution), liquidation preference (1× non‑participating is common, but terms vary), anti‑dilution provisions, board structure, information rights, and pro‑rata rights for follow‑on rounds. Model ownership over multiple rounds to understand post‑money dilution and runway implications.
          </p>

          <h2>Exits and timelines in Australia</h2>
          <p>
            Exits drive fund returns and carry. In Australia, trade sales (M&A) remain more common than IPOs for venture‑backed startups; timelines can span 7–10+ years from first cheque. Build optionality: maintain clean financials, robust governance, and a data trail of product and customer value to support diligence when opportunities arise.
          </p>

          <h3>Alternatives and complements to VC (AU)</h3>
          <p>
            Consider non‑dilutive and alternative capital: the R&D Tax Incentive, grants, venture debt, or revenue‑based finance. Some Australian funds operate under VCLP/ESVCLP structures with specific tax settings — helpful context for founders and investors to understand at a high level (see ATO references below).
          </p>

          <AudienceGrid
            heading="Who this helps"
            cards={[
              {
                title: 'Founders & Teams',
                description: 'For leaders validating ideas, seeking funding, or managing teams.',
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                variant: 'orange'
              },
              {
                title: 'Students & Switchers',
                description: 'For those building portfolios, learning new skills, or changing careers.',
                icon: <AcademicCapIcon className="h-6 w-6" />,
                variant: 'purple'
              },
              {
                title: 'Community Builders',
                description: 'For workshop facilitators, mentors, and ecosystem supporters.',
                icon: <UsersIcon className="h-6 w-6" />,
                variant: 'yellow'
              }
            ]}
          />

          <MLAITemplateResourceCTA />

          <h2>Make the most of your next VC conversation</h2>
          <p>
            Anchor your ask to milestones, be transparent on risks, and show how each dollar moves the metrics that matter. Clarify how you will use capital to unlock the next proof points, and how governance and reporting will keep everyone aligned.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="Join the MLAI community to collaborate with fellow AI practitioners in Australia. No sales pitch — just practical, community-first support."
            buttonText="Connect with the MLAI community"
            buttonHref="/contact"
            note="We’ll point you to community resources, events, and peers."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleDisclaimer className="mt-8" />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
