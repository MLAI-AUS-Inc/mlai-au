import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
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

const TOPIC = 'How to invest in startups in India'
const CATEGORY = 'australian-ai-ecosystem' // e.g. 'ai'
const SLUG = 'how-to-invest-in-startups-india'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-21'
const DATE_MODIFIED = '2026-01-21'
const DESCRIPTION =
  'Practical overview for Australians investing in Indian startups — routes, compliance, tax basics and due diligence. General information only.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d9db90bd-d13c-4341-8e0f-63edaee6e06b.jpg?alt=media&token=016de48a-97df-47bf-aba5-e09e564b9cfe"
const HERO_IMAGE_ALT = 'Team collaborating on laptops with an India–Australia connection motif'
const FEATURED_FOCUS = 'funding' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Can Australians legally invest in Indian startups?',
    answer:
      'Yes. Foreign investment into most tech/services startups is generally permitted under India’s FDI policy (automatic route), subject to sector-specific rules. Use compliant channels (SEBI-registered funds, reputable syndicates) and ensure the Indian company files required RBI/FEMA paperwork. This is general information, not financial advice.',
  },
  {
    id: 2,
    question: 'Do I need an Indian PAN or bank account to invest?',
    answer: (
      <>
        Not always. Many funds/syndicates onboard foreign investors with passport KYC and source-of-funds checks, and accept international transfers. Some AIFs or administrators may request a PAN for tax reporting. Confirm onboarding requirements with the platform. See the ATO for Australian tax obligations:{' '}
        <a href='https://www.ato.gov.au/individuals/investments-and-assets/capital-gains-tax' target='_blank' rel='noreferrer noopener'>
          ATO CGT guidance
        </a>
        .
      </>
    ),
  },
  {
    id: 3,
    question: 'What is the usual minimum cheque size?',
    answer:
      'It varies by route. Syndicates often allow smaller cheques than funds. SEBI-registered AIFs typically require higher minimum commitments. Ask each platform/fund for current minimums and fees.',
  },
  {
    id: 4,
    question: 'Are SAFEs used in India?',
    answer:
      'You may see iSAFE notes (an India-adapted SAFE), convertible notes for DPIIT-recognised startups, or CCPS (preferred shares). Terms differ from US/AU. Read the instrument, ask how and when it converts, and confirm investor protections.',
  },
  {
    id: 5,
    question: 'Will I pay tax in both Australia and India?',
    answer: (
      <>
        Potentially. Australia generally taxes capital gains on your worldwide assets. Indian taxes may apply depending on the instrument and exit. The India–Australia tax treaty may allow credits. Seek registered tax advice. References:{' '}
        <a href='https://www.ato.gov.au/individuals/international-tax-for-individuals/foreign-income' target='_blank' rel='noreferrer noopener'>
          ATO: Foreign income
        </a>{' '}
        and{' '}
        <a href='https://www.incometaxindia.gov.in/' target='_blank' rel='noreferrer noopener'>
          Income Tax India
        </a>
        .
      </>
    ),
  },
  {
    id: 6,
    question: 'Which sectors are restricted for foreign investment?',
    answer: (
      <>
        India’s FDI policy lists sectors with caps or approval requirements (e.g., certain defence, telecom, media). Most software/services startups are under the automatic route, but always check the latest policy. See DPIIT’s FDI resources:{' '}
        <a href='https://dpiit.gov.in/foreign-direct-investment' target='_blank' rel='noreferrer noopener'>
          DPIIT FDI policy
        </a>
        .
      </>
    ),
  },
  {
    id: 7,
    question: 'Is this financial advice?',
    answer:
      'No. This article provides general information only (as at Jan 2026). It is not financial, legal, or tax advice. Speak with licensed advisers in Australia and India for your situation.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Can foreigners invest in Indian startups?',
      description: 'Yes. Most tech/services sectors allow FDI via the automatic route; invest through SEBI‑registered funds or compliant direct rounds and check FEMA/sector rules.',
    },
    {
      label: 'How can I invest from Australia?',
      description: 'Common routes: join a syndicate (SPV), commit to a SEBI‑registered AIF, or invest directly in a priced/convertible round. Complete KYC and follow platform instructions.',
    },
    {
      label: 'Do Australians pay tax on exits?',
      description: 'Usually yes in Australia (CGT on global assets). Indian taxes may apply too; the India–Australia treaty may provide credits. Get licensed advice.',
    },
  ],
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className='bg-white'>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight='(2026)'
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <ArticleTocPlaceholder />

        {/* Intro alert - Clean, neutral style */}
        <ArticleCallout variant='info'>
          <p className='text-sm text-gray-800'>
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to='/articles' className='font-semibold text-[--brand] underline-offset-4 hover:underline'>
              Browse related articles →
            </Link>
          </p>
        </ArticleCallout>

        {/* Persona Grid */}
        <AudienceGrid
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating ideas, seeking funding, or managing teams.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow',
            },
          ]}
          className='my-10'
        />

        <div className='prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]'>
          {/* 
            ⚠️ IMPORTANT: CONTENT STRUCTURE INSTRUCTIONS
            The sections below are derived from platform patterns (AngelList India, AIF fund pages) and PAA queries.
          */}

          <p>
            <strong>{TOPIC}</strong> — If you are an Australian angel, operator, or learner exploring India, this
            evidence-forward overview covers the main routes, onboarding, documents, and risks you will encounter. As at
            Jan 2026. General information only.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION 1 */}
          <h2>Can foreigners invest in Indian startups?</h2>
          <p>
            Yes—subject to sector rules. Under India’s foreign investment framework (FEMA) and FDI policy, most software
            and services startups can take foreign investment via the automatic route. Practically, you will complete
            KYC and fund a bank transfer, and the Indian company (or fund/SPV) handles regulatory filings (e.g.,
            post-allotment reporting through its authorised dealer bank). Avoid restricted sectors and confirm the route
            is compliant before wiring funds.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description='Access a structured template to apply the steps in this guide.'
            buttonLabel='Get the checklist'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout
            title='Start where compliance is handled'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
            className='not-prose'
          >
            <p className='mt-1 text-gray-800'>
              For a first cheque, use a reputable syndicate or SEBI-registered fund that manages KYC, custody, FX, and
              filings. You get diversification and fewer admin surprises.
            </p>
          </ArticleCallout>

          {/* SECTION 2 */}
          <h2>Syndicates, AIFs, or direct — which route suits you?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7945cbb4-d987-4203-8bde-a6686cd6974c.jpg?alt=media&token=fe34313b-85af-45a5-9cf5-5007505a8655" alt="Tech-savvy entrepreneurs collaborate in a retro 90s film aesthetic, exploring investment routes for startups." className="w-full rounded-lg my-8" />

          <p>
            Australians typically choose between three pathways. The right option depends on cheque size, time
            commitment, and your comfort with India-specific paperwork.
          </p>
          <h3>Syndicates (platform-led SPVs)</h3>
          <p>
            Good for smaller, opportunistic cheques. Platforms like AngelList India coordinate KYC, carry, and
            allocations via SPVs/vehicles. Expect deal-by-deal access and lightweight admin; your diligence relies on
            the lead’s thesis and track record.
          </p>
          <h3>SEBI-registered AIFs (funds)</h3>
          <p>
            Better for portfolio construction and professional governance. Minimum commitments are usually higher and
            calls occur over time. Review the fund’s strategy, fee stack, compliance, and audit history.
          </p>
          <h3>Direct rounds (priced or convertible)</h3>
          <p>
            Highest control, highest admin. You will negotiate terms, review company filings, and coordinate bank
            remittance details. Ensure the company’s counsel confirms the instrument and filings are FEMA-compliant.
          </p>

          {/* SECTION 3 */}
          <h2>KYC, PAN, and bank accounts — what Australians need</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-586beed3-c329-4afe-92f6-21f6ad0243bc.jpg?alt=media&token=543b0255-4a1a-482a-a09f-ce8626f92df8" alt="People in a tech startup setting, discussing KYC, PAN, and banking essentials for Australians, 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            Onboarding is similar to other private-market platforms, with India-specific nuances:
          </p>
          <ul>
            <li>
              Identification: passport and address documents; sometimes a short investor questionnaire and source-of-funds proof.
            </li>
            <li>
              PAN: some fund administrators request a PAN for tax reporting; others can onboard foreign investors without it. Confirm before you start.
            </li>
            <li>
              Bank: you typically do not need an Indian bank account; international transfers via your Australian bank are common for funds/SPVs.
            </li>
            <li>
              Documentation: be prepared for notarised/attested copies depending on the platform’s compliance policy.
            </li>
          </ul>

          {/* SECTION 4 */}
          <h2>Term sheets and instruments you will see in India</h2>
          <p>
            Early-stage rounds commonly use iSAFE notes (an India-adapted SAFE), convertible notes (especially for
            DPIIT-recognised startups), and CCPS (compulsorily convertible preference shares) for priced rounds. Key
            questions to ask:
          </p>
          <ul>
            <li>When and how does the instrument convert? What triggers (next round, time, milestones)?</li>
            <li>What investor protections apply (pro-rata, MFN, information rights)?</li>
            <li>Who pays stamp duty or other local costs? How is FX handled at conversion or exit?</li>
          </ul>

          <ArticleStepList
            title='Practical steps'
            steps={[
              { label: 'Pick your route (syndicate, AIF, or direct) and shortlist one platform/fund.' },
              { label: 'Complete KYC early; ask about PAN needs, wiring, and expected timelines.' },
              { label: 'Start with a small cheque, then review portfolio reporting and cadence.' },
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            ‘In cross-border angel deals, structure and process matter more than headline valuation. Fewer surprises
            beats perfect pricing.’
          </QuoteBlock>

          {/* SECTION 5 */}
          <h2>Tax and currency — high-level notes for Australians (not advice)</h2>
          <p>
            Australia generally taxes capital gains on worldwide assets; India may also levy tax depending on the
            instrument and exit. The India–Australia tax treaty may allow credits. FX adds another layer of risk and
            timing considerations (remittance cut-offs, bank fees). As at Jan 2026, confirm details with registered
            tax advisers in both countries and review the latest from regulators (ATO, RBI, SEBI).
          </p>

          {/* SECTION 6 */}
          <h2>Due diligence checklist for India early-stage deals</h2>
          <ul>
            <li>Lead and co-investor quality: track record, ownership after round, and alignment.</li>
            <li>Regulatory fit: sector under automatic route; company counsel confirms FEMA/FDI compliance.</li>
            <li>Cap table hygiene: ESOP pool, prior instruments, and any outstanding filings.</li>
            <li>Runway and use of funds: months of runway post-close and key milestones.</li>
            <li>Reporting cadence: frequency, metrics shared, and access to management.</li>
            <li>Exit pathways: follow-on appetite, local/global acquirers, and governance.</li>
          </ul>

          {/* SECTION 7 */}
          <h2>Make a micro‑commitment, then learn and scale</h2>
          <p>
            Treat your first allocation as a learning loop: start small, verify the back-office experience, and tighten
            your thesis with real portfolio data. If you prefer community learning, connect with local builders and
            investors through MLAI.
          </p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className='my-12 not-prose'>
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body='Get practical recommendations based on your goals, time, and experience level.'
              buttonText='Get recommendations'
              buttonHref='/contact'
              note='You can filter by topic, format (online/in‑person), and experience level.'
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <ArticleReferences
          heading='Sources'
          description='Curated references for further reading (as at Jan 2026).'
          headingId='references'
          references={[
            {
              id: 1,
              href: 'https://dpiit.gov.in/foreign-direct-investment',
              title: 'Foreign Direct Investment policy',
              publisher: 'DPIIT (Government of India)',
              category: 'government',
              description: 'Official FDI policy, including sector caps and approval routes.',
            },
            {
              id: 2,
              href: 'https://www.sebi.gov.in/legal/regulations/jun-2012/sebi-alternative-investment-funds-regulations-2012-last-amended-on-january-23-2024-_77238.html',
              title: 'SEBI Alternative Investment Funds Regulations, 2012 (as amended)',
              publisher: 'SEBI',
              category: 'government',
              description: 'Regulatory framework for AIFs in India.',
            },
            {
              id: 3,
              href: 'https://www.rbi.org.in/',
              title: 'Reserve Bank of India (RBI) – FEMA and foreign investment resources',
              publisher: 'RBI',
              category: 'government',
              description: 'Rules and FAQs on foreign exchange and investment filings.',
            },
            {
              id: 4,
              href: 'https://www.ato.gov.au/individuals/investments-and-assets/capital-gains-tax',
              title: 'Capital gains tax (CGT)',
              publisher: 'Australian Taxation Office',
              category: 'government',
              description: 'Australian guidance on CGT for investments and assets.',
            },
            {
              id: 5,
              href: 'https://www.angellistindia.com/',
              title: 'AngelList India',
              publisher: 'AngelList India',
              category: 'industry',
              description: 'Platform overview for startup investing in India.',
            },
          ]}
        />

        <div className='mt-12'>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleDisclaimer />

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
