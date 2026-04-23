'use client'

/**
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router'
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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'What are startups?'
export const CATEGORY = 'featured'
export const SLUG = 'what-are-startups'

const DEFAULT_AUTHOR_PROFILE = {
  name: 'Dr Sam Donegan',
  role: 'Founder',
  bio: '',
  avatarUrl:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
}

const AUTHOR_PROFILE = getDefaultArticleAuthorDetails() ?? DEFAULT_AUTHOR_PROFILE
const AUTHOR = AUTHOR_PROFILE.name ?? DEFAULT_AUTHOR_PROFILE.name
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? DEFAULT_AUTHOR_PROFILE.role
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? DEFAULT_AUTHOR_PROFILE.bio
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? DEFAULT_AUTHOR_PROFILE.avatarUrl
export const DATE_PUBLISHED = '2026-01-18'
export const DATE_MODIFIED = '2026-01-18'
export const DESCRIPTION = 'Plain-English definition, stages, funding and Australian context for 2026.'
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-88cc7bbe-1bd0-4ed3-ada8-d9c991054839.jpg?alt=media&token=db283c71-1516-41c2-b519-fb5675abf5b5'
const HERO_IMAGE_ALT = 'Two founders sketching product ideas on a whiteboard in a co-working space'
export const FEATURED_FOCUS = 'startups' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What legally counts as a startup in Australia?',
    answer:
      'There is no specific legal classification. “Startup” describes a stage and model (searching for a repeatable, scalable business) rather than a company type. Legally you will operate as a sole trader, partnership, or company (most venture-backed startups are Pty Ltd).',
  },
  {
    id: 2,
    question: 'Do I need to incorporate before raising capital?',
    answer: (
      <>Most angel and VC investors require a company structure (Pty Ltd) with a clear cap table before investing. If you are just validating, you can start with an ABN and contracts, then incorporate once you have committed co-founders or funding. Seek independent legal/tax advice.</>
    ),
  },
  {
    id: 3,
    question: 'How is a startup different from a small business?',
    answer:
      'Small businesses aim for stable, local profitability with known models. Startups are designed to discover a scalable model under uncertainty and aim for rapid growth beyond a single location or owner-operator capacity.',
  },
  {
    id: 4,
    question: 'What grants or incentives are available in Australia (as at 2026)?',
    answer: (
      <>
        The federal R&D Tax Incentive may offset eligible R&D expenditure; always check current ATO guidance. States may run programs (e.g., LaunchVic in Victoria, Advance Queensland). See{' '}
        <a
          href='https://business.gov.au'
          target='_blank'
          rel='noopener noreferrer'
        >
          business.gov.au
        </a>{' '}
        for current programs, and speak with a registered tax adviser.
      </>
    ),
  },
  {
    id: 5,
    question: 'How long is a company considered a startup?',
    answer:
      'Commonly until it reaches product–market fit and repeatable growth. Practically this is often the first 3–5 years, but the label depends on stage rather than age.',
  },
  {
    id: 6,
    question: 'Do startups have to be “tech”?',
    answer:
      'Not strictly, but most venture-scale startups are technology-enabled because software and data allow scalable distribution, automation, and margins that suit rapid growth.',
  },
  {
    id: 7,
    question: 'Where should I start if I have an idea?',
    answer:
      'Begin with customer discovery (interviews, problem validation), a small prototype or landing page, and a clear hypothesis about who pays and why. Keep costs low until you see repeated pull from real users.',
  },
  {
    id: 8,
    question: 'What registrations do I need in Australia (as at 2026)?',
    answer: (
      <>
        Typically: an ABN via the Australian Business Register, and if incorporating, an ACN and company setup via ASIC. Depending on activity you may need GST registration, payroll obligations, and sector-specific compliance. See{' '}
        <a
          href='https://abr.gov.au/'
          target='_blank'
          rel='noopener noreferrer'
        >
          abr.gov.au
        </a>{' '}
        and{' '}
        <a
          href='https://asic.gov.au/'
          target='_blank'
          rel='noopener noreferrer'
        >
          asic.gov.au
        </a>
        .
      </>
    ),
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What defines a startup?',
      description: 'A young company searching for a repeatable, scalable business model under uncertainty.',
    },
    {
      label: 'How are startups funded?',
      description: 'Often founders then angels/VC (pre‑seed to Series B); in Australia, also grants and the R&D Tax Incentive.',
    },
    {
      label: 'How long is a company a startup?',
      description: 'Typically until product–market fit and repeatable growth; often 3–5 years, but it varies.',
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
    <div className='bg-transparent'>
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
        <QuoteBlock variant='purple' icon={<span className='text-xl'>💡</span>}>
          <p className='text-sm text-white'>
            
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to='/articles' className='font-semibold text-white underline-offset-4 hover:underline'>
              Browse related articles →
            </Link>
          
          </p>
        </QuoteBlock>

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
          <p>
            <strong>{TOPIC}</strong> — A startup is a young organisation searching for a repeatable, scalable business model under high uncertainty. In Australia in 2026, that usually means working quickly to validate a real problem, proving demand with early customers, and building a tech‑enabled product that can grow beyond a single location or team.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION 1 */}
          <h2>What is a startup? Definition and common traits</h2>
          <p>
            A startup combines three elements: uncertainty (you do not yet know the exact product or go‑to‑market), scalability (the model should work in many places with similar unit economics), and speed of learning (rapid cycles to discover what works before capital and energy run out). Many Australian startups are software‑led, but hardware, biotech, climate tech and services can also be “startup‑like” when they pursue scalable models.
          </p>
          <ul>
            <li>Goal: discover a repeatable, scalable model (not just deliver a single project).</li>
            <li>Method: rapid experiments, customer discovery, and measurable learning.</li>
            <li>Result: evidence of demand (retention, revenue, or usage) that sustains growth.</li>
          </ul>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description='Access a structured template to apply the steps in this guide.'
            buttonLabel='Get the checklist'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout
            title='Tip: Write the problem in one sentence'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
            className='not-prose'
          >
            <p className='mt-1 text-gray-800'>
              If you cannot explain the user’s pain, who feels it, and how often it occurs in one sentence, you are not ready to build. Start with 10–15 short interviews and look for repeated phrases.
            </p>
          </ArticleCallout>

          {/* SECTION 2 */}
          <h2>Startup vs small business: what’s the difference?</h2>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-836c1e5c-8037-4179-97f4-35253a8072bb.jpg?alt=media&token=f237f280-6ca5-4fa5-8acf-334301ec3d6f'
            alt='Group of diverse individuals brainstorming in a retro-tech workspace, capturing the vibrant 90s startup vibe.'
            className='w-full rounded-lg my-8'
          />

          <p>
            Small businesses run proven models for a known local market and prioritise stable profit. Startups are designed to search, change quickly, and scale beyond the founders. Both are valuable; they just optimise for different outcomes.
          </p>
          <h3>How they differ in practice</h3>
          <ul>
            <li>Business model: discovery and iteration vs. execution of a known model.</li>
            <li>Funding: external equity and fast reinvestment vs. owner funding or bank finance.</li>
            <li>Team: flexible roles and rapid hiring vs. defined roles and steady headcount.</li>
            <li>Risk/return: higher variance with potential for outsized impact vs. lower variance and local resilience.</li>
          </ul>

          {/* SECTION 3 */}
          <h2>How startups are funded (pre‑seed to Series B)</h2>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3495f9de-ee4d-434b-8529-fa8962a6eb10.jpg?alt=media&token=883dfd41-a7a5-4d3e-9d37-4f9aba4fc2d8'
            alt='People in a tech startup setting, capturing the essence of 90s film aesthetics, discussing funding strategies.'
            className='w-full rounded-lg my-8'
          />

          <p>
            Many Australian startups begin with founders’ savings and customer revenue, then raise external capital when experiments show traction. Typical stages (naming varies):
          </p>
          <ul>
            <li><strong>Pre‑seed:</strong> Idea and problem validation, tiny prototype or landing page; often angels or small funds.</li>
            <li><strong>Seed:</strong> Early product in market with signs of retention or revenue; angels/seed funds/accelerators.</li>
            <li><strong>Series A/B:</strong> Clear product–market fit and repeatable growth; institutional VCs to scale.</li>
          </ul>
          <p>
            In Australia (as at 2026), many teams also use the federal R&D Tax Incentive to offset eligible R&D costs and may apply for state programs (e.g., LaunchVic). Always verify current rules on official sites and seek independent advice.
          </p>

          {/* SECTION 4 */}
          <h2>Lifecycle: from problem–solution fit to scale</h2>
          <h3>Problem–solution fit</h3>
          <p>
            You have evidence that a specific group consistently experiences a painful problem and confirms your proposed solution would help (e.g., pre‑orders, letters of intent, or paid pilots).
          </p>
          <h3>Product–market fit</h3>
          <p>
            Users return without heavy prompting and refer others. Signals include strong retention, high NPS from core users, and improving unit economics.
          </p>
          <h3>Repeatable growth</h3>
          <p>
            A channel (or two) predictably converts prospects to loyal users at an acceptable customer acquisition cost (CAC) and payback period.
          </p>

          {/* SECTION 5 */}
          <h2>How startups make money: models and metrics that matter</h2>
          <p>
            Common models include subscriptions (SaaS), usage‑based pricing, marketplace take rates, enterprise contracts, and ad‑supported freemium. What matters is not the label but whether unit economics improve with scale.
          </p>
          <ul>
            <li><strong>Retention and engagement:</strong> Do users keep using it each week/month?</li>
            <li><strong>Gross margin:</strong> Does margin improve as you grow?</li>
            <li><strong>CAC and payback:</strong> How long to recover acquisition costs from gross profit?</li>
            <li><strong>LTV vs CAC:</strong> Is lifetime value meaningfully higher than CAC?</li>
          </ul>

          <ArticleStepList
            title='Practical steps'
            steps={[
              { label: 'Run 10 short interviews with your target users this week' },
              { label: 'Publish a landing page with a clear value proposition and email capture' },
              { label: 'Ship a small prototype (or concierge version) and charge at least one customer' },
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            “The job of an early‑stage startup is to learn faster than the runway runs out. Prioritise the smallest experiments that create the most learning.”
          </QuoteBlock>

          {/* SECTION 6 */}
          <h2>Set‑up basics in Australia (as at 2026)</h2>
          <p>
            This is general information only. Always check official guidance and seek professional advice.
          </p>
          <ul>
            <li><strong>Structure:</strong> Sole trader vs Pty Ltd company. Many funded startups use a company for equity and ESOPs.</li>
            <li><strong>Registrations:</strong> ABN via the Australian Business Register; if incorporating, ACN and company setup via ASIC.</li>
            <li><strong>Tax & payroll:</strong> Consider GST, PAYG, superannuation obligations, and bookkeeping from day one.</li>
            <li><strong>IP & privacy:</strong> Protect key IP where sensible; follow Australian privacy law and sector‑specific rules.</li>
            <li><strong>Grants & incentives:</strong> Review the R&D Tax Incentive and relevant state programs on official sites.</li>
          </ul>
          <p>
            Helpful starting points: {' '}
            <a href='https://business.gov.au' target='_blank' rel='noopener noreferrer'>business.gov.au</a>, {' '}
            <a href='https://asic.gov.au' target='_blank' rel='noopener noreferrer'>asic.gov.au</a>, {' '}
            <a href='https://abr.gov.au' target='_blank' rel='noopener noreferrer'>abr.gov.au</a>, {' '}
            and your state’s startup agency (e.g., LaunchVic, Advance Queensland).
          </p>

          {/* SECTION 7 */}
          <h2>How long is a company a “startup”, and common risks</h2>
          <p>
            Most teams stop calling themselves a startup once they achieve product–market fit and operate a repeatable growth engine. That often happens within 3–5 years, but timelines vary with markets and capital.
          </p>
          <ul>
            <li><strong>Top risks:</strong> building a solution without a painful problem; running out of capital; regulatory missteps; co‑founder misalignment; weak retention.</li>
            <li>
              <strong>Mitigations:</strong> talk to users weekly, instrument the product, keep burn low, document co‑founder agreements with vesting, and set explicit milestones for each raise.
            </li>
          </ul>

          {/* SECTION 8 */}
          <h2>Turn curiosity into a small test</h2>
          <p>
            If you are unsure whether the startup path fits, run a one‑week test: speak with real users, draft a value proposition, and measure sign‑ups or pre‑orders. Treat the result as data for your next decision, not a verdict on you.
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
              body='Join the MLAI community to collaborate with fellow AI practitioners in Australia.'
              buttonText='Get recommendations'
              buttonHref='/contact'
              note='MLAI is a not‑for‑profit community based in Australia.'
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className='mt-12'>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
