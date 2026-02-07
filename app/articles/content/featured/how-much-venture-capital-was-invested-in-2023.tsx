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
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How much venture capital was invested in 2023?'
export const CATEGORY = 'featured'
export const SLUG = 'how-much-venture-capital-was-invested-in-2023'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-26'
export const DATE_MODIFIED = '2026-01-26'
export const DESCRIPTION = 'Global VC investment in 2023: what the major sources reported, why figures differ, and what it means for Australia.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c930b949-7cad-4fe3-b144-e118eca0cfd1.jpg?alt=media&token=d69d7730-2e33-4055-b69e-b2cc47e40ad4"
const HERO_IMAGE_ALT = 'Global venture funding trends in 2023'
export const FEATURED_FOCUS = 'funding' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'How much venture capital was invested globally in 2023?',
    answer:
      'Depending on the data provider and methodology, global VC funding in 2023 is reported between roughly US$248B (CB Insights) and US$285B (Crunchbase). The headline: 2023 was down markedly from 2021–2022 but stabilised in H2.'
  },
  {
    id: 2,
    question: 'Why do different sources report different numbers?',
    answer:
      'Trackers vary by what they count (equity vs. debt, ICOs, grants), inclusion of corporate venture, secondary transactions, minimum round disclosure thresholds, and how they classify stages. Many also update historical data as deals are disclosed later.'
  },
  {
    id: 3,
    question: 'How did Australia fare in 2023?',
    answer:
      'Most reports show a significant decline versus 2021–2022. Totals vary by source; for a local lens, see Cut Through Venture’s year-in-review for methodology and the latest figure. Regardless of the exact total, late-stage deals slowed while seed activity proved more resilient.'
  },
  {
    id: 4,
    question: 'Which sectors drew the most funding?',
    answer:
      'AI captured outsized attention with multiple mega-rounds, while fintech and crypto cooled from 2021 peaks. Health, climate, and deep tech showed pockets of strength, often at earlier stages.'
  },
  {
    id: 5,
    question: 'Did the market improve in 2024?',
    answer:
      'Reports indicate a modest rebound in 2024 (e.g., KPMG cites ~US$368B globally), helped by AI-related investments and gradually reopening IPO markets. Always compare like-for-like methodologies when using these figures.'
  },
  {
    id: 6,
    question: 'What does this mean for AI jobseekers in Australia?',
    answer:
      'Hiring follows funding but with a lag. Focus on demonstrable skills (projects, MLE pipelines, evaluation), align to resilient sectors (AI/automation in real products), and build community connections (e.g., MLAI) to surface opportunities.'
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'How much VC was invested globally in 2023?', description: 'Around US$248B–US$285B depending on the tracker (scope and methodology differ).' },
    { label: 'Why do estimates for 2023 differ by source?', description: 'Datasets vary on equity vs. debt, CVC, secondaries, stage definitions, and backfilled disclosures.' },
    { label: 'Did AI meaningfully influence 2023 funding?', description: 'Yes. AI drew several mega-rounds and cushioned early-stage activity despite a late-stage slowdown.' }
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
    href: 'https://news.crunchbase.com/venture/global-funding-data-analysis-ai-eoy-2023/',
    title: 'Global Startup Funding In 2023 Clocks In At Lowest Level In 5 Years',
    publisher: 'Crunchbase News',
    description: 'Year-in-review overview with methodology notes and regional breakdowns.',
    category: 'analysis'
  },
  {
    id: 2,
    href: 'https://www.cbinsights.com/research/report/venture-trends-2023/',
    title: 'State of Venture 2023',
    publisher: 'CB Insights',
    description: 'Annual deep-dive reporting ~$248B global funding; coverage by stage and sector.',
    category: 'analysis'
  },
  {
    id: 3,
    href: 'https://kpmg.com/xx/en/media/press-releases/2025/01/2024-global-vc-investment-rises-to-368-billion-dollars.html',
    title: '2024 global VC investment rises to $368B',
    publisher: 'KPMG Private Enterprise – Venture Pulse',
    description: 'Context for 2024 rebound and AI-driven interest; useful for trajectory from 2023.',
    category: 'analysis'
  },
  {
    id: 4,
    href: 'https://pitchbook.com/news/reports/q4-2023-pitchbook-nvca-venture-monitor',
    title: 'Q4 2023 PitchBook–NVCA Venture Monitor (US focus)',
    publisher: 'PitchBook & NVCA',
    description: 'US view of deal value and exit environment; helpful for stage dynamics.',
    category: 'analysis'
  },
  {
    id: 5,
    href: 'https://www.cutthrough.com/insights',
    title: 'Australia Startup Funding – Year in Review',
    publisher: 'Cut Through Venture',
    description: 'Local methodology and annual Australian funding totals; regularly updated.',
    category: 'analysis'
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

      <div className="bg-transparent prose prose-lg prose-slate max-w-none">
        {/* Opening paragraph */}
        <p>
          In 2023, global venture funding fell sharply from 2021–2022 highs. Depending on the tracker and
          methodology, totals range between roughly <strong>US$248B</strong> and <strong>US$285B</strong>. This article
          summarises what the major sources reported, why figures differ, and how to interpret the headlines if you are
          building an AI career in Australia (as at Jan 2026).
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} caption="Year-in-review context for funding levels." />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'You want a realistic read of 2023 funding to plan hiring, runway, and GTM in 2026.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description: 'You’re gauging market health and which skills and sectors remain resilient.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description: 'You support meetups, mentoring, or programs and need an evidence-based summary.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow'
            }
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>Global total for 2023: what the major trackers reported</h2>
        <p>
          The headline global total depends on the dataset: Crunchbase reports ~US$285B and CB Insights ~US$248B for 2023.
          Both point to a slower first half, stabilisation in the second half, and far fewer mega-rounds than 2021–2022.
          These differences are normal across venture datasets and stem from scope and classification choices.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          2023 was a reset year. Totals fell, but early-stage and AI-focused rounds showed relative resilience compared to
          late-stage deals and speculative categories.
        </QuoteBlock>

        <h2>Why the numbers vary: methodology 101</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d308c484-978d-4ff7-97bb-40f2b4a39984.jpg?alt=media&token=aad22caa-79fb-497e-981c-e26f2a58fb61" alt="Tech-savvy team brainstorming in a 90s film aesthetic, showcasing a vibrant startup environment." className="w-full rounded-lg my-8" />

        <p>
          Venture trackers include or exclude different things: equity vs. debt, corporate venture, ICOs and tokens,
          secondaries, and undisclosed or small rounds. Regional attribution also differs. Many providers backfill as new
          disclosures arrive, so figures can shift months later.
        </p>
        <h3>How to compare like-for-like</h3>
        <p>
          When you cite a number, always name the source and the scope (e.g., “equity-only, excludes debt”). Prefer
          medians to avoid being skewed by a handful of mega-rounds, and consider stage-specific trends (seed vs.
          late-stage) rather than a single global total.
        </p>

        <QuoteBlock title="Practical checklist" variant="purple">
          <ul>
            <li>State the source and what it counts (equity, debt, CVC, secondaries).</li>
            <li>Check whether numbers are preliminary or final; many datasets backfill.</li>
            <li>Look at medians and stage mix, not just the global headline total.</li>
            <li>Compare to 2021 and 2022 for context, then focus on the latest two quarters.</li>
          </ul>
        </QuoteBlock>

        <h2>Quarter-by-quarter picture in 2023</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d2e0b950-8f01-4624-82f6-130f3cc4ea8a.jpg?alt=media&token=6108b2e3-ea4a-4e1d-a31f-ca824047ce1f" alt="Group of diverse professionals collaborating in a 90s-inspired tech startup environment." className="w-full rounded-lg my-8" />

        <p>
          Most datasets show a weak Q1–Q2 and a more stable Q3–Q4. IPOs and large exits remained scarce until late 2023,
          which kept late-stage activity muted. Seed and early Series rounds continued—often at down-to-flat valuations
          relative to 2021 peaks—but did not collapse.
        </p>

        <h2>Sectors: AI mega-rounds amid broader caution</h2>
        <p>
          AI drew outsized attention with several large financings, while categories like fintech and crypto cooled from
          their 2021 highs. Health, climate, and deep tech showed selective strength, particularly where there was clear
          commercial traction or regulatory support.
        </p>

        <QuoteBlock title="Pro tip" variant="orange">
          For careers: prioritise hands-on AI capability tied to real product outcomes—evaluation, deployment, and
          measurable impact. Hiring managers optimise for shipped value, not just model familiarity.
        </QuoteBlock>

        <ArticleStepList
          title="How to read VC stats without getting misled"
          steps={[
            { label: 'Check source scope: equity vs. debt, CVC, secondaries, and region/stage definitions.' },
            { label: 'Compare medians and stage trends; avoid over-weighting a single mega-round.' },
            { label: 'Track momentum: look at quarter-on-quarter direction and exit windows, not just annual totals.' }
          ]}
          accent="teal"
        />

        <h2>Australia: what to know if you are job hunting</h2>
        <p>
          Australian totals for 2023 also declined versus 2021–2022, with fewer large late-stage rounds. However, seed and
          early-stage activity persisted, and AI projects with credible paths to customers remained competitive. If you’re
          seeking roles: tailor your portfolio to local market problems, show clear ROI, and connect with the community
          to surface opportunities that never hit job boards.
        </p>

        <h2>Bottom line for 2026</h2>
        <p>
          2023 marked a reset, not a halt. 2024 showed signs of recovery helped by AI interest and a slowly reopening
          exit market. For Australian builders and learners, focus on durable skills, evidence of impact, and community
          connections—these outlast the cycle.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="Keen to jump aboard the pirate ship? Connect with the MLAI community for practical, community-first guidance."
        buttonText="Get in touch"
        buttonHref="https://mlai.au/contact"
        note="MLAI is a not-for-profit community empowering the Australian AI community."
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
