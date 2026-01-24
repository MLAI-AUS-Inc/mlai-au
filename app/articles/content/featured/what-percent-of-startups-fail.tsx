import type { ReactNode } from 'react'
import { Link } from 'react-router'
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

const TOPIC = 'What percent of startups fail?'
const CATEGORY = 'australian-ai-ecosystem'
const SLUG = 'what-percent-of-startups-fail'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-20'
const DATE_MODIFIED = '2026-01-20'
const DESCRIPTION = 'Evidence-based failure rates, time horizons, and the Australian context—plus practical ways to reduce risk.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-111c3b26-106b-448b-9c5a-a2ffb7860e9f.jpg?alt=media&token=45888962-20f3-49c6-bc47-d6554fb0e8cb"
const HERO_IMAGE_ALT = 'Founders reviewing runway and milestones on a whiteboard'
const FEATURED_FOCUS = 'startups'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Is the “90% of startups fail” stat accurate in 2026?',
    answer:
      'It is a useful rule-of-thumb for the long-run outcome of venture-style startups, but it depends on definition and timeframe. Many sources still cite ~90% overall failure, while first-year failures are closer to ~10–20%. Always check what counts as failure (shutdown, no meaningful growth, acquihire, zombie) and the cohort measured.'
  },
  {
    id: 2,
    question: 'How many fail in the first year vs five years?',
    answer:
      'Global ranges: ~10–20% fail in year one; by five years, roughly half of new businesses survive. Startups (especially venture-backed, high-growth) often show lower survival because the bar for “success” is higher than small businesses. Australia-specific “startup” rates are not officially tracked; ABS reports survival for all businesses.'
  },
  {
    id: 3,
    question: 'Why do most startups fail?',
    answer:
      <>Top recurring reasons in post‑mortems include no validated market need, running out of runway, weak distribution, team/fit issues, and timing/competition. CB Insights’ synthesis places lack of demand and cash/runway near the top. In Australia, small markets and distribution can amplify these risks.</>
  },
  {
    id: 4,
    question: 'Does industry matter?',
    answer:
      'Yes. Capital‑intensive sectors (hardware, biotech, deeptech) carry higher technical and financing risk. B2B SaaS and services can show higher early survival if they reach paid pilots quickly. Regulated sectors add compliance timelines that affect survival math.'
  },
  {
    id: 5,
    question: 'How are Australian stats different?',
    answer:
      <>Australia has official business survival data from the ABS (all businesses), not an official “startup failure” series. Funding volume and density are lower than the US, which can lengthen fundraising cycles and make distribution partnerships more important. As at 01/2026, consult ABS and local funding trackers for current figures.</>
  },
  {
    id: 6,
    question: 'What practical steps reduce the odds of failure?',
    answer:
      <>Define success and kill criteria upfront, run weekly customer interviews, ship small pilots that test behaviour change, track learning per dollar of runway, and plan distribution early (partners, channels, SEO/SEM, community).</>
  },
  {
    id: 7,
    question: 'What counts as “failure” for this article?',
    answer:
      <>We use a pragmatic definition: the venture cannot reach sustainable traction or a meaningful outcome (revenue break‑even, healthy growth, or a clearly positive acquisition) before runway and team conviction run out.</>
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'What the numbers mean in 2026: definitions, time horizons, and the Australian picture.',
  items: [
    {
      label: 'What percent of startups fail?',
      description: 'Roughly 90% over the long run for venture‑style startups, but the figure varies by definition, stage, and cohort.'
    },
    {
      label: 'How many fail in the first year?',
      description: 'About 10–20% globally, depending on sector, region, and how “failure” is defined.'
    },
    {
      label: 'What’s the 5‑year survival rate?',
      description: 'Around half of new businesses survive 5 years; startup survival can be lower. Australia has no official “startup” rate.'
    }
  ]
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className='bg-white'>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
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
            This guide is part of our broader series on the Australian startup and AI ecosystem. Prefer to jump ahead?{' '}
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
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow'
            }
          ]}
          className='my-10'
        />

        <div className='prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]'>
          <p>
            The internet loves the line <strong>‘90% of startups fail’</strong>. In 2026, the better question is: failure by which
            definition and over what timeframe? This evidence‑forward guide summarises what the headline percentages actually
            mean, how the odds shift over 1–5 years, and what’s different in Australia—plus practical ways to tilt the odds in your favour.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>What counts as ‘failure’ in startup stats?</h2>
          <p>
            Different studies measure different end states. Before quoting a percentage, clarify what is being counted:
          </p>
          <ul>
            <li><strong>Shutdown/liquidation:</strong> the company ceases operations.</li>
            <li><strong>Non‑traction or ‘zombie’:</strong> still alive but not growing meaningfully.</li>
            <li><strong>Acquihire/soft landing:</strong> team absorbed; outcome small or neutral.</li>
            <li><strong>Pivoted survival:</strong> original thesis failed; new model succeeds.</li>
          </ul>
          <p>
            Also check the cohort (all small businesses vs venture‑style startups), region, and stage (pre‑seed through Series A+).
          </p>

          <ArticleResourceCTA
            title={`Download the startup risk checklist`}
            description='A one‑page worksheet to define success, kill criteria, and your first learning milestones.'
            buttonLabel='Get the checklist'
            buttonHref='/resources'
            accent='purple'
          />

          <ArticleCallout title='Make your definition explicit' variant='brand' icon={<span className='text-xl'>💡</span>} className='not-prose'>
            <p className='mt-1 text-gray-800'>
              Agree on a working definition with your team: what outcome counts as success, what counts as failure, and what
              milestone ends the current experiment. It keeps decision‑making calm when runway pressure rises.
            </p>
          </ArticleCallout>

          <h2>So, what percent of startups fail?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c23ba06b-c950-49d3-82e0-01cd49d772df.jpg?alt=media&token=2151b3f1-97ea-42f9-82e6-743185748880" alt="Tech professionals in a 90s film aesthetic discuss startup challenges and failure rates." className="w-full rounded-lg my-8" />

          <p>
            The widely cited global figure is <strong>~90% fail overall</strong>—a directional statement that aligns with long‑run outcomes for
            venture‑style startups. In the <strong>first year</strong>, failure is closer to <strong>~10–20%</strong>. By <strong>five years</strong>, roughly <strong>half of new
            businesses</strong> survive; for high‑growth tech startups, survival can be lower because the bar for “success” is higher than
            simply remaining registered.
          </p>
          <p>
            Treat these figures as <em>ranges</em>, not absolutes. Methodology (what counts as failure, and which cohorts are included) materially
            changes the number.
          </p>

          <h3>Two things to keep in mind</h3>
          <ul>
            <li><strong>Denominator drift:</strong> ‘startup’ is not an ABS category; many stats use small‑business cohorts instead.</li>
            <li><strong>Outcome bar:</strong> venture outcomes demand faster growth and larger markets, so “survival” is a tougher bar.</li>
          </ul>

          <ArticleStepList
            title='Practical ways to tilt the odds'
            steps={[
              { label: 'Write down success + kill criteria for the next 12 weeks (before you start).' },
              { label: 'Run 5–10 customer interviews weekly; test behaviour, not just opinions.' },
              { label: 'Ship a small paid pilot; measure a specific behaviour change.' },
              { label: 'Track learning per dollar of runway (burn, runway, confidence by milestone).' },
              { label: 'Design distribution early (partners, channels, SEO/SEM, community).' }
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            “It’s not the failure rate that matters day‑to‑day—it’s your learning rate per dollar of runway.”
          </QuoteBlock>

          <h2>Where in the journey do most startups fail?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4ef0b9f1-096e-4afc-88d9-267e223038e5.jpg?alt=media&token=ccfb074e-26bc-452f-bd4f-1640a3cbc53f" alt="Nostalgic 90s film aesthetic, showcasing a tech startup team brainstorming and collaborating." className="w-full rounded-lg my-8" />

          <p>
            Most failures concentrate <strong>before product‑market fit</strong> (pre‑seed through seed) when teams are still validating demand,
            pricing, and distribution. Later‑stage failures typically involve <strong>unit economics</strong>, <strong>scaling distribution</strong>, or
            <strong>fundraising timing</strong> during market shifts.
          </p>

          <h2>Industry and business‑model differences</h2>
          <p>
            Capital‑intensive sectors (hardware, biotech, deeptech) carry technical and regulatory risk alongside market risk. B2B SaaS
            and services can sometimes reach revenue faster via paid pilots. Regulated domains add compliance timelines that lengthen the
            path to traction. Adjust your milestones, capital plan, and survival expectations accordingly.
          </p>

          <h2>Australia in 2026: reading the numbers locally</h2>
          <p>
            Australia does not publish an official ‘startup failure rate’. The <a href='https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release' target='_blank' rel='noopener noreferrer'>ABS</a>
            reports <em>business</em> survival (all entities), which is useful context but not a perfect proxy for venture‑style startups. Funding
            density is lower than in the US, which can lengthen fundraising cycles and make <strong>partnerships and distribution</strong> even more
            important. For capital‑market context as at 2026, check local trackers such as Cut Through Venture’s funding reports.
          </p>

          <h2>From stats to action this month</h2>
          <p>
            Use the percentages to shape your <strong>decision process</strong>, not to discourage you. Set explicit learning milestones, keep the
            bar clear for success vs failure, and iterate quickly in the smallest responsible scope. If the experiment fails, you’ve preserved
            runway and increased your odds for the next one.
          </p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>1</span>
                <span>Download the risk checklist and write your 12‑week success + kill criteria.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>2</span>
                <span>Schedule 5 customer interviews per week for the next month.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>3</span>
                <span>Design a small paid pilot and agree upfront on the decision date.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className='my-12 not-prose'>
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title='Need help de‑risking your startup?'
              body='MLAI is a not‑for‑profit community for the Australian AI ecosystem. Connect with peers and mentors to road‑test your next steps.'
              buttonText='Get recommendations'
              buttonHref='/contact'
              note='You can filter by topic, format (online/in‑person), and experience level.'
            />
          </div>

          <ArticleReferences
            heading='Sources'
            description='Curated references for further reading (as at 01/2026).'
            headingId='references'
            references={[
              {
                id: 1,
                href: 'https://www.failory.com/blog/startup-failure-rate',
                title: 'Startup Failure Rate: How Many Startups Fail and Why (2026 update)',
                publisher: 'Failory',
                category: 'analysis',
                description: 'Synthesis of commonly cited failure‑rate figures and context.'
              },
              {
                id: 2,
                href: 'https://www.cbinsights.com/research/startup-failure-reasons-top/',
                title: 'The Top Reasons Startups Fail',
                publisher: 'CB Insights',
                category: 'analysis',
                description: 'Post‑mortems aggregated across sectors; demand and cash runway dominate.'
              },
              {
                id: 3,
                href: 'https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release',
                title: 'Counts of Australian Businesses, including Entries and Exits',
                publisher: 'Australian Bureau of Statistics (ABS)',
                category: 'government',
                description: 'Official survival statistics for all Australian businesses (not startup‑specific).'
              },
              {
                id: 4,
                href: 'https://www.cutthrough.vc/reports',
                title: 'Australian Startup Funding Reports',
                publisher: 'Cut Through Venture',
                category: 'industry',
                description: 'Quarterly/annual funding snapshots for Australia—useful ecosystem context.'
              }
            ]}
          />
        </div>

        <AuthorBio author={authorDetails} />

        <div className='mt-12'>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleDisclaimer />

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
