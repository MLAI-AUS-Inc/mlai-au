import type { Metadata } from 'next'
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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleSummaryCard } from '../../../components/articles/ArticleSummaryCard'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleResourceList, type ArticleResource } from '../../../components/articles/ArticleResourceList'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'How to price your product in Australia'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'how-do-i-figure-out-how-much-my-product-should-cost'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name
const AUTHOR_ROLE = AUTHOR_PROFILE.role || 'Lead Editor'
const AUTHOR_BIO =
  AUTHOR_PROFILE.bio || 'Writer and operator focused on practical guidance for Australian teams.'
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ||
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2024-12-18'
const DATE_MODIFIED = '2025-01-05'
const DESCRIPTION =
  'Practical ways to price a product in Australia using cost, value, and competitor signals, with steps to test willingness-to-pay and stay ACCC compliant.'
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff729998-0ce9-4822-89af-11bca3c17257.jpg?alt=media&token=7ab776b3-d45c-4ff5-9679-b9b169949d94'
const HERO_IMAGE_ALT = 'Team reviewing pricing scenarios on laptops and whiteboard'
const FEATURED_FOCUS = 'product' // 'startups' | 'ai' | 'product' | 'funding'

export const metadata: Metadata = {
  title: `${TOPIC} (2025)`,
  description: DESCRIPTION,
  keywords: [TOPIC, 'pricing strategy', 'Australia', FEATURED_FOCUS, CATEGORY],
  alternates: {
    canonical: `/articles/${SLUG}`,
  },
  authors: [{ name: AUTHOR }],
  openGraph: {
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [
      {
        url: HERO_IMAGE,
        alt: HERO_IMAGE_ALT,
      },
    ],
  },
}

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What pricing methods work best for a new product in Australia?',
    answer:
      'Most teams blend cost-plus to set a floor, competitor benchmarks to stay market-relevant, and value-based pricing to capture willingness-to-pay. For regulated sectors, check ACCC guidance and any industry-specific price disclosure rules.',
  },
  {
    id: 2,
    question: 'How do I factor in GST when setting prices?',
    answer: (
      <>
        If you are registered for GST, list prices as GST-inclusive for consumer products. For B2B, clearly state
        whether prices are GST exclusive or inclusive. Confirm obligations via the ATO and keep tax invoices
        compliant.
      </>
    ),
  },
  {
    id: 3,
    question: 'How can I test willingness-to-pay quickly?',
    answer:
      'Run 5–10 moderated interviews with live price cards, pair with a landing page smoke test offering 2–3 tiers, and track click-to-intent (e.g., waitlist or checkout starts). Use Van Westendorp or Gabor-Granger surveys for directional ranges.',
  },
  {
    id: 4,
    question: 'What are common mistakes first-time founders make with pricing?',
    answer:
      'Underpricing to chase adoption, ignoring unit economics, copying competitors without understanding their bundle, hiding fees that erode trust, and failing to revisit prices after costs or positioning change.',
  },
  {
    id: 5,
    question: 'How often should I review prices after launch?',
    answer:
      'Set a quarterly review to compare actual margins, churn drivers, and competitor moves. For subscription products, communicate changes at least 30 days ahead with clear rationale and alternatives.',
  },
  {
    id: 6,
    question: 'Does Australia have rules against misleading pricing?',
    answer:
      'Yes. ACCC enforces rules against drip pricing, fake discounts, and unfair contract terms. Display total prices clearly, avoid “was/now” claims without substantiation, and ensure any surcharges are disclosed upfront.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How do I calculate a price floor from my costs?',
      description: 'Add COGS, fulfilment, fees, GST position, and a target margin to avoid selling below contribution.',
    },
    {
      label: 'What do competitors charge for similar offers?',
      description: 'Benchmark inclusions, contract terms, and surcharges to understand credible price bands.',
    },
    {
      label: 'How can I test willingness-to-pay quickly?',
      description: 'Run price card interviews and a landing page A/B with two tiers, measuring conversion and churn risk.',
    },
  ],
}

/** ===== Resources (optional) ===== */
const resources: ArticleResource[] = [
  {
    label: 'ACCC pricing and advertising basics',
    description: 'Official guidance on avoiding misleading pricing practices in Australia.',
    href: 'https://www.accc.gov.au/business/pricing/price-displays',
    type: 'Guide',
    status: 'Official',
  },
  {
    label: 'ATO GST overview for small business',
    description: 'How GST applies to pricing, invoicing, and receipts.',
    href: 'https://www.ato.gov.au/Business/GST',
    type: 'Guide',
    status: 'Official',
  },
]

export default function ArticlePage() {
  return (
    <article className="article-content">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={`${TOPIC} (2025)`}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:text-gray-900">
          <ArticleTocPlaceholder />

          <p>
            <strong>{TOPIC}</strong> – Australian founders in 2025 are dealing with higher input costs, tighter capital,
            and sharper competition. Pricing is now a core product decision: it shapes margin, signals quality, and
            affects trust under ACCC scrutiny.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-8"
            imageClassName="rounded-3xl"
          />

          <h2>Align unit economics before picking a price</h2>
          <p>
            Start with a clean unit economics model: cost of goods sold (COGS), payment fees, fulfilment, support time,
            and marketing cost to acquire a customer. Set a price floor that preserves contribution margin after
            discounts and taxes. For subscriptions, model churn and payback period; for physical goods, include returns
            and warranty provisions typical in Australia.
          </p>

          <ArticleCallout variant="info" title="Keep GST clarity" icon={<span className="text-xl">💡</span>}>
            List consumer prices as GST-inclusive; for B2B, clearly mark if GST is excluded. Mislabelled pricing can
            breach ACCC guidance and frustrate customers.
          </ArticleCallout>

          <h2>Blend three signals: cost, value, and competition</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1fc252f7-7e31-4949-b82f-a769e8a38b0e.jpg?alt=media&token=5035d3f2-0f1e-4a7a-b4cc-aeaa1c23b6cb"
            alt="Nineties film-style scene of diverse individuals collaborating in a tech startup environment, blending strategy and innovation."
            className="w-full rounded-lg my-8"
          />

          <p>
            Use cost-plus to set the floor, competitor benchmarks to stay credible, and value-based pricing to capture
            willingness-to-pay. Map your value drivers (time saved, revenue gained, risk reduced) and translate them into
            outcomes that justify tiers. For competitors, note what is bundled, contract terms, and any surcharges to
            avoid underpricing.
          </p>

          <h3>Practical ways to test willingness-to-pay</h3>
          <p>
            Run live price card interviews (3–4 price points), set up a landing page A/B test with two tiers, and
            measure click-to-checkout starts. Supplement with Van Westendorp or Gabor-Granger surveys for range finding.
            Ensure each test has clear success metrics, like target conversion at a sustainable margin.
          </p>

          <ArticleStepList
            title="Rapid pricing validation sprint (7–10 days)"
            steps={[
              'Map costs and margin floor; define a “good, better, best” tier hypothesis.',
              'Interview 8–10 target customers with live price cards and capture objection themes.',
              'Run a landing page or in-product prompt with two price variants; track conversion and churn signals.',
            ]}
            accent="indigo"
          />

          <QuoteBlock variant="purple" title="Price is part of the product">
            “A clear, honest price builds trust faster than a discount. Make the value story as deliberate as the feature
            roadmap.”
          </QuoteBlock>

          <ArticleResourceCTA
            eyebrow="Resources"
            title="Get templates and checklists"
            description="Download practical tools tailored to this topic."
            buttonLabel="Access resources"
            buttonHref="#"
            accent="purple"
          />

          <ArticleResourceList items={resources} className="my-10" />

          <h2>Avoid ACCC red flags and build trust</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7b684cb0-5db8-4fea-a30b-3fb293c8f7d9.jpg?alt=media&token=3b298fff-9e6b-444a-adfe-f792464e6f1f"
            alt="Tech professionals collaborate in a vibrant 90s startup office, embodying innovation and trust-building strategies."
            className="w-full rounded-lg my-8"
          />

          <p>
            Australian consumers expect transparent pricing. Avoid drip pricing (hidden fees revealed late), misleading
            “was/now” comparisons, and unfair contract terms. If you surcharge for payment methods or shipping, disclose
            them upfront. For subscriptions, provide clear renewal terms and easy cancellation paths that work on mobile.
          </p>

          <h2>When and how to adjust prices after launch</h2>
          <p>
            Review pricing quarterly against margin, churn, and competitor moves. If you raise prices, give at least 30
            days’ notice, explain the value delivered, and offer options (grandfathering, annual discounts, or
            feature-limited plans). For physical products, consider price locks for pre-orders and communicate currency or
            freight volatility transparently.
          </p>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations"
            buttonHref="#"
            note="You can filter by topic, format (online/in‑person), and experience level."
          />

          <ArticleFAQ items={faqItems} />

          <AuthorBio
            author={{
              name: AUTHOR,
              role: AUTHOR_ROLE,
              bio: AUTHOR_BIO,
              avatarUrl: AUTHOR_AVATAR,
            }}
          />

          <ArticleFooterNav />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <ArticleSummaryCard summary={summaryHighlights} />
          <AudienceGrid
            heading="Who is this for?"
            cards={[
              {
                title: 'Founders & teams',
                description: 'Validating ideas, seeking funding, or managing product decisions.',
                icon: <RocketLaunchIcon className="w-6 h-6" />,
                variant: 'orange',
              },
              {
                title: 'Students & switchers',
                description: 'Building portfolios, learning new skills, or changing careers.',
                icon: <AcademicCapIcon className="w-6 h-6" />,
                variant: 'purple',
              },
              {
                title: 'Community builders',
                description: 'Facilitating workshops, mentoring, or supporting local ecosystems.',
                icon: <UsersIcon className="w-6 h-6" />,
                variant: 'yellow',
              },
            ]}
          />
        </aside>
      </div>
    </article>
  )
}
