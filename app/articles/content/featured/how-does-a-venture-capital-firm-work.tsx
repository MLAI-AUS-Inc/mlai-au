/**
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
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

const TOPIC = 'How does a venture capital firm work'
export const CATEGORY = 'australian-ai-ecosystem'
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
export const DESCRIPTION = 'Plain-English explainer of VC fund structure, economics (\"2 and 20\"), decision process, local instruments, and how Australian AI teams can prepare in 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69616611-a5ea-4b41-88f0-f07c970a38d2.jpg?alt=media&token=78aae951-a9f0-4ec5-86f7-1a86a0167850"
const HERO_IMAGE_ALT = 'Abstract financial graphs in a meeting setting, symbolising venture capital decisions'
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
      'Primarily via a management fee (often around 2% per year on committed capital) and carried interest (commonly 20% of profits after returning capital to LPs). Exact terms vary by fund and vintage.'
  },
  {
    id: 2,
    question: 'What is the typical VC fund life cycle?',
    answer:
      'Most funds run 10–12 years: 1–2 years to raise, ~3–5 years to invest, and the remaining years to support companies and realise exits. Extensions are common.'
  },
  {
    id: 3,
    question: 'Do Australian VCs invest in pre-revenue AI startups?',
    answer:
      'Yes. Many AU funds back pre-revenue teams at pre-seed/seed where the focus is on team, problem insight, early technical validation, and credible go-to-market. Evidence of a data advantage or early customer pull helps.'
  },
  {
    id: 4,
    question: 'What equity do VCs usually take at seed?',
    answer:
      'It varies. As a broad (non-binding) reference, founders might sell ~10–25% in a typical seed. Actual dilution depends on valuation, round size, and investor appetite. Always seek independent legal advice.'
  },
  {
    id: 5,
    question: 'SAFE vs convertible note vs priced equity — what\'s the difference?',
    answer: (
      <>
        <p>
          SAFEs and notes defer valuation to a later priced round. A SAFE is an agreement for future equity (often with a valuation cap/discount), while a convertible note is a debt instrument that converts to equity later (with interest/maturity). Priced equity sets a valuation now and issues shares immediately.
        </p>
      </>
    )
  },
  {
    id: 6,
    question: 'Are there Australian government settings that affect VC?',
    answer: (
      <>
        <p>
          Australia recognises VC through programs such as ESVCLP and VCLP and broader measures like the R&D Tax Incentive. These aim to support early-stage investment. Check official sources for up-to-date eligibility and tax details.
        </p>
      </>
    )
  },
  {
    id: 7,
    question: 'VC vs private equity — what\'s the difference?',
    answer:
      'VC targets earlier-stage, high-growth companies and typically takes minority stakes, accepting higher risk for potential outlier returns. Private equity often acquires controlling stakes in mature businesses, using leverage and operational improvements to drive returns.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How do VC firms make money?',
      description: 'Management fees (~2% p.a.) and carried interest (often 20%) after LP capital is returned.'
    },
    {
      label: 'What is a VC fund’s structure?',
      description: 'LPs commit capital to a fund run by GPs; it invests over 3–5 years with a 10–12 year fund life.'
    },
    {
      label: 'What do VCs look for in AI startups?',
      description: 'Team, market, traction, defensibility—plus data advantage, distribution, and responsible AI.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://www.investopedia.com/terms/v/venturecapital.asp',
    title: 'What Is Venture Capital? Definition, Pros, Cons, and How It Works',
    publisher: 'Investopedia',
    description: 'General global explainer of VC definitions, mechanics, and trade-offs.',
    category: 'guide'
  },
  {
    id: 2,
    href: 'https://stripe.com/au/resources/more/venture-capital-firms-and-startups',
    title: 'How venture capital firms work and what they look for',
    publisher: 'Stripe',
    description: 'Founder-oriented guidance on VC processes and evaluation criteria.',
    category: 'industry'
  },
  {
    id: 3,
    href: 'https://business.gov.au/grants-and-programs/early-stage-venture-capital-limited-partnerships',
    title: 'Early Stage Venture Capital Limited Partnerships (ESVCLP)',
    publisher: 'Australian Government (business.gov.au)',
    description: 'Program overview and official information for ESVCLP.',
    category: 'government'
  },
  {
    id: 4,
    href: 'https://business.gov.au/grants-and-programs/venture-capital-limited-partnerships',
    title: 'Venture Capital Limited Partnerships (VCLP)',
    publisher: 'Australian Government (business.gov.au)',
    description: 'Program overview and official information for VCLP.',
    category: 'government'
  },
  {
    id: 5,
    href: 'https://www.cutthrough.com/insights',
    title: 'Australian Startup Funding Reports',
    publisher: 'Cut Through Venture',
    description: 'Independent analysis of Australian startup funding trends (check latest report).',
    category: 'analysis'
  },
  {
    id: 6,
    href: 'https://www.ycombinator.com/documents',
    title: 'Standard form SAFEs',
    publisher: 'Y Combinator',
    description: 'Official SAFE templates and notes. Commonly referenced globally.',
    category: 'guide'
  }
]

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, href: `/articles/${CATEGORY}/${SLUG}`, current: true }
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor='purple'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className="mb-12" />

      <div className=''>
        <h2>{TOPIC}</h2>
        <p>
          In simple terms: investors (LPs) commit money to a fund, general partners (GPs) run the fund, and that capital is invested into a small number of high-potential startups. In Australia (2026), VC is a focused tool for AI teams pursuing outsized growth; it comes with expectations on speed, scale, and governance.
        </p>

        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          containerClassName='my-10'
        />

        {/* SECTION 1 */}
        <h2>Inside a VC firm: LPs, GPs, and the fund economics ("2 and 20")</h2>
        <p>
          A venture capital firm typically manages one or more closed-end funds. <em>Limited partners (LPs)</em>—such as super funds, family offices, and high-net-worth investors—commit capital. <em>General partners (GPs)</em> source deals, invest, and manage the portfolio. The firm usually earns a management fee (often around 2% per year on committed capital) and a performance fee called <em>carry</em> (commonly 20% of profits after returning LP capital). Returns are highly skewed: a few outliers tend to drive most of a fund’s performance.
        </p>

        <ArticleCallout
          title='Know your investor’s fund math'
          variant='brand'
          icon={<span className='text-xl'>💡</span>}
        >
          Ask where a fund is in its life cycle and how much is reserved for follow-on. If a GP has limited reserves, they may favour companies with clear near-term milestones or syndicates that can lead later rounds.
        </ArticleCallout>

        {/* SECTION 2 */}
        <h2>How decisions get made: sourcing → screening → diligence → investment committee</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-67a0c0ab-1f4b-4a44-a503-c73dcc9786aa.jpg?alt=media&token=0f02d0e9-bbd6-40dc-8f37-9ceb43d45904"
          alt="People in a tech startup setting collaborate, embodying a 90s film aesthetic, focused on decision-making processes."
        />

        <p>
          Most firms run a pipeline: (1) <strong>Sourcing</strong> via networks, inbound, and theses; (2) <strong>Screening</strong> for fit (stage, sector, cheque size); (3) <strong>Diligence</strong> on team, product, market, traction, references, legal; (4) <strong>Investment Committee</strong> (IC) to approve terms; and (5) <strong>Closing</strong> and wiring funds. For AI startups, diligence often includes model provenance, data rights, eval quality, governance, and customer validation.
        </p>

        <ArticleResourceCTA
          eyebrow='Download'
          title={`Get the checklist for ${TOPIC}`}
          description='A founder-side due‑diligence list to prep your deck, metrics, and data room.'
          buttonLabel='Download now'
          buttonHref='#'
          accent='purple'
        />

        <QuoteBlock title='Evidence or expert insight' variant='purple'>
          “VC is a power‑law business: one or two companies can return an entire fund. Show how you might be that outlier—credibly.”
        </QuoteBlock>

        {/* SECTION 3 */}
        <h2>The VC fund life cycle: raise, invest, support, exit (10–12 years)</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-70cefaae-5ceb-46a1-b31d-022491c7c52d.jpg?alt=media&token=349c0858-14a2-495d-82e8-7736232826ee"
          alt="Nostalgic 90s film-style scene featuring diverse professionals collaborating in a tech startup environment."
        />

        <p>
          A typical fund spends its first 1–2 years raising, then invests initial cheques over ~3–5 years while reserving capital for follow-ons. The final years focus on scaling portfolio companies and realising outcomes (secondary sales, M&A, IPO). Understanding this cadence helps you time outreach and anticipate follow-on behaviour.
        </p>

        {/* SECTION 4 */}
        <h2>What VCs look for — especially in AI startups</h2>
        <p>
          Common lenses include: team (insight, speed, ethics), market (size, growth, urgency), product (clear wedge and user love), traction (paying users or strong usage), unit economics, and path to a meaningful outcome. For AI teams, investors also scrutinise your data advantage, model and infra choices, evals, and distribution.
        </p>
        <h3>AI-specific signals that help</h3>
        <p>
          • Credible data rights and privacy posture (as at 2026, customer and regulator expectations are rising). • Robust internal evals tied to customer outcomes. • Moats beyond model access (e.g., proprietary data, workflow lock‑in, or unique distribution). • Early revenue quality (expansion, retention) versus vanity metrics.
        </p>

        {/* SECTION 5 */}
        <h2>Rounds, instruments, and terms in Australia</h2>
        <p>
          Australian rounds generally mirror global norms but with local nuances. <strong>Pre‑seed/Seed</strong> often use SAFEs or convertible notes (valuation cap/discount), while <strong>Series A+</strong> are usually priced equity. Term sheets commonly include pro‑rata rights and a 1× non‑participating liquidation preference in Australia; specifics vary by deal.
        </p>
        <h3>Instruments (founder quick scan)</h3>
        <p>
          • <strong>SAFE:</strong> Simple agreement for future equity. No interest or maturity, converts later. • <strong>Convertible note:</strong> Debt that converts to equity later with interest/maturity. • <strong>Priced equity:</strong> Sets a valuation now; governance ramps up (board, reporting).
        </p>
        <p>
          As at 2026, AU seed rounds remain highly context‑specific. Founders should model dilution across scenarios and align on runway (typically 18–24 months) and milestones.
        </p>

        {/* SECTION 6 */}
        <h2>The Australian landscape: programs, players, and norms</h2>
        <p>
          Australia supports early‑stage investing through frameworks such as <strong>ESVCLP</strong> and <strong>VCLP</strong> (see official guidance), alongside the <strong>R&D Tax Incentive</strong>. Local funds span generalist and deep‑tech; angel syndicates and micro‑funds play a growing role at pre‑seed. International funds increasingly participate remotely when the problem and traction are compelling. Always confirm program details from official sources.
        </p>

        {/* SECTION 7 */}
        <h2>Getting a first meeting: materials, outreach, and proof</h2>
        <p>
          Prepare a tight 10–12 slide deck, a concise memo, and a lightweight data room (cap table, product demo, key metrics, customer references). For outreach, warm intros help but thoughtful cold emails with clear traction are read. Lead with customer outcomes, why now, and a crisp ask (round size, use of funds, milestones).
        </p>

        <ArticleStepList
          title='Practical steps'
          steps={[
            'Map investor–company fit: stage, cheque size, sector thesis, and fund age.',
            'Build an evidence pack: product demo, early customer proof, metrics, and data rights.',
            'Create a targeted list and run a 2–3 week, well‑paced process to keep momentum.'
          ]}
          accent='indigo'
        />

        <AudienceGrid
          heading='Who this helps'
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating AI ideas, seeking funding, or planning runway.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning venture basics, or exploring AI paths.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description: 'For mentors and organisers supporting early-stage AI teams in Australia.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow'
            }
          ]}
        />

        <MLAITemplateResourceCTA />

        {/* SECTION 8 (Closing) */}
        <h2>Choose your capital strategy, not just a round</h2>
        <p>
          VC can be powerful when your goal is speed to a large outcome. It is not the only path: angels, revenue, grants, and partnerships may better fit some AI teams. Decide based on your milestones, customer cycles, and resilience to market swings. If you do pursue VC, be explicit about runway, evidence, and what success looks like between now and the next raise.
        </p>

        <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
          <ul className='space-y-3'>
            <li className='flex gap-3 text-gray-700'>
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
              <span>Download the checklist mentioned above.</span>
            </li>
            <li className='flex gap-3 text-gray-700'>
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
              <span>Draft your round plan: runway, milestones, and target investor list.</span>
            </li>
            <li className='flex gap-3 text-gray-700'>
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
              <span>Run a focused outreach window and refine based on feedback.</span>
            </li>
          </ul>
        </div>

        <ArticleCompanyCTA
          title={`Need help with ${TOPIC}?`}
          body="MLAI is a not-for-profit community empowering the Australian AI community. Share your goals and we'll point you to helpful resources and connections."
          buttonText='Join the MLAI community'
          buttonHref='https://mlai.au/contact'
          note='Friendly, community-first contact — no hard sell.'
        />

        <ArticleDisclaimer className='mt-8' />

        <ArticleReferences references={references} />

        <AuthorBio author={authorDetails} className="mt-8" />
      </div>
    </>
  )
}
