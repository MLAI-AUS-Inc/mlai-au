import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'Startup AI: programs, credits, and community paths for Australian founders'
const CATEGORY = 'featured'
const SLUG = 'startup-ai'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-15'
const DATE_MODIFIED = '2026-01-15'
const DESCRIPTION = 'A practical 2026 guide for Australian founders comparing AI startup programs, cloud credits, and community pathways to ship responsibly and quickly.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b138002f-4d58-481b-9152-2ad13de3b915.jpg?alt=media&token=c913ce09-bb1d-4482-a649-6eaae0dba62e"
const HERO_IMAGE_ALT = 'Two founders reviewing an AI startup roadmap on a laptop'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What is an AI startup program and how does it differ from a general accelerator?',
    answer:
      "AI startup programs (like Google Cloud's AI startup program) combine credits, technical support, and model-access incentives tailored for teams building with AI models, whereas general accelerators focus on business coaching, investor prep, and broader sector support.",
  },
  {
    id: 2,
    question: 'Can Australian startups access Google Cloud\'s AI credits in 2026?',
    answer:
      'Yes. Australian-registered startups can apply if they meet eligibility (typically funding stage, incorporation, and product focus). Confirm current terms on the Google Cloud site because credit tiers and model access change periodically.',
  },
  {
    id: 3,
    question: 'Do I need a US entity to join AI startup programs?',
    answer:
      'Most cloud credit programs accept Australian entities. Some US-based accelerators prefer or require a US entity for investment logistics, so check legal and tax implications with your advisor.',
  },
  {
    id: 4,
    question: 'What should I budget for AI infrastructure in year one?',
    answer:
      'Plan a conservative runway that assumes credits taper after the first 12 months. Model GPU/API costs per feature, then add a 25–40% buffer for experimentation. Track unit economics per workflow from the start.',
  },
  {
    id: 5,
    question: 'How do I handle data privacy when using third-party AI services?',
    answer:
      'Map data flows, classify sensitive data, and avoid sending personal or regulated data to external APIs unless contractual terms, retention, and storage locations meet your obligations (e.g., Australian Privacy Principles). Prefer region-pinned deployments where available.',
  },
  {
    id: 6,
    question: 'What if I am pre-product and still exploring?',
    answer:
      'Start with a narrow prototype, join community meetups for feedback, and use limited free tiers before committing to credits. Validate one user journey, then layer in credits for scale or advanced models.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Snapshot for 2026: cloud AI startup programs prioritise model access, credits, and architecture reviews; Australian founders still need clear privacy plans, lean pilots, and a community loop for feedback.',
  items: [
    {
      label: 'What does an AI startup program include?',
      description: 'Typically cloud credits, model access, architecture reviews, and limited GTM support—credits taper after 6–12 months.',
    },
    {
      label: 'Can Australian startups join Google Cloud’s AI program?',
      description: 'Yes, if eligibility is met; check current terms, regional data options, and credit tiers for 2026.',
    },
    {
      label: 'How do I avoid cost shocks when credits end?',
      description: 'Instrument usage early, model a no-credit budget, and keep orchestration portable to switch or multi-home providers.',
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
    <div className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight="(2026)"
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        <ArticleCallout variant="info">
          <p className="text-sm text-gray-800">
            This guide compares leading AI startup programs, credits, and community options for Australian founders in 2026. Prefer to browse related topics?{' '}
            <Link to="/articles" className="font-semibold text-[--brand] underline-offset-4 hover:underline">
              Browse related articles →
            </Link>
          </p>
        </ArticleCallout>

        <AudienceGrid
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating AI products, planning infra, or seeking credits.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For early-stage builders testing AI ideas and portfolios.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For mentors and meetup hosts guiding responsible AI pilots.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> – Australian founders are weighing two fast tracks in 2026: dedicated AI startup programs (like Google Cloud's AI startup offering) that bundle credits and model access, and community-first pathways that prioritise feedback, responsible build patterns, and early customer validation. This guide maps both routes so you can move quickly without burning runway.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>What AI startup programs actually provide (credits, model access, reviews)</h2>
          <p>
            Cloud-led AI startup programs typically include platform credits, priority access to managed models, architecture or cost reviews, and occasional GTM showcases. The headline value is speed to experiment with lower infra cost. The trade-off: credits expire and may skew your stack toward one provider. Before joining, map your core workloads (prompt orchestration, vector search, fine-tuning, evaluation) to see which services you would actually use in month 1–6.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to decide between credits, accelerators, or community pathways."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Match credits to real usage"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              List your top 3 product flows, estimate monthly token/GPU usage, then cap credit allocation to those flows. This avoids scattering spend across services you will turn off later.
            </p>
          </ArticleCallout>

          <h2>Inside Google Cloud's AI startup program: what an Australian team should know</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-54d3d3d3-9e6d-4508-8581-22892d60e994.jpg?alt=media&token=360a4b07-bc7a-4f17-a6ce-c55a10ccfd09" alt="Diverse team brainstorming in a vibrant tech workspace with a nostalgic 90s film vibe, embodying innovation and collaboration." className="w-full rounded-lg my-8" />

          <p>
            The Google Cloud AI startup program promotes credits for core services, access to Gemini models, and guidance on Vertex AI pipelines. Eligibility normally hinges on stage, incorporation, and product focus. For Australian entities, confirm region options (e.g., Sydney/Melbourne) to keep data residency aligned with Australian Privacy Principles. Use their technical office hours to stress-test your eval harness and cost controls before scaling.
          </p>

          <h3>Using credits without overfitting your stack</h3>
          <p>
            Keep your orchestration layer cloud-agnostic (e.g., standard HTTP APIs, portable embeddings). Avoid hard-coding provider-specific response formats into business logic. When credits end, you can swap or multi-home models with fewer regressions.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Check eligibility and region constraints (Sydney/Melbourne) before applying.' },
              { label: 'Design a 90-day pilot: one workflow, fixed eval set, weekly cost check.' },
              { label: 'Instrument usage and unit costs early so you know when credits taper.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Credits are a runway multiplier, not a moat. Instrument costs, keep payloads portable, and invest in evaluation from week one.”
          </QuoteBlock>

          <h2>Do you need an accelerator, cloud credits, or just a strong community loop?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9c15eefa-bcfa-494c-b3ed-5faf8a3c439f.jpg?alt=media&token=cacbc1b2-27fc-4be4-92ae-7979c792e221" alt="Retro-styled tech-savvy team collaborating in a vibrant startup environment, inspired by 90s film aesthetics." className="w-full rounded-lg my-8" />

          <p>
            Accelerators add structure (mentors, investor prep) but may take equity. Cloud programs are non-dilutive but narrow to platform usage. A community loop—regular demos, user councils, and local meetups—can surface sharper product feedback than broad accelerators. Decide by your immediate gap: if you lack distribution or investor readiness, an accelerator helps; if you need experimentation speed, credits suffice; if you need truth from users, community is the fastest path.
          </p>

          <ArticleCallout
            title="Signal checks"
            variant="info"
            icon={<ShieldCheckIcon className="h-5 w-5 text-[--brand]" />}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Run fortnightly customer calls and monthly community demos. If insights keep changing your roadmap, stay flexible with credits rather than locking into a long accelerator calendar.
            </p>
          </ArticleCallout>

          <h2>Responsible build patterns for Australian AI startups</h2>
          <p>
            Australian founders must align with the Australian Privacy Principles and sector rules (health, finance, education). Keep data residency explicit, document model choices, and maintain an eval set that includes local edge cases (vernacular, accents, policy-specific scenarios). Log user feedback to improve safety and reduce hallucinations before scaling pilots.
          </p>

          <ArticleStepList
            title="Responsible AI mini-check"
            steps={[
              { label: 'Data mapping: classify personal and sensitive data; avoid sending regulated data to third-party APIs without clear terms.' },
              { label: 'Evaluation: maintain a standing test set with Australian edge cases and re-run after each model update.' },
              { label: 'Governance: record prompts, model versions, and release notes for every user-facing change.' },
            ]}
            accent="brand"
          />

          <h2>Funding, runway, and credit taper planning</h2>
          <p>
            Credits mask true unit costs. Model a no-credit scenario so you know your real gross margin. If you rely on inference-heavy features, explore batching, caching embeddings, and retrieval-first designs to reduce token usage. For capital planning, combine R&D tax incentive timing with credit expiry dates to avoid a sudden cost cliff in Q3–Q4.
          </p>

          <h2>Week-one action plan for founders</h2>
          <p>
            Move quickly but deliberately: validate one AI-enabled workflow, protect data, and set cost guardrails. Use the steps below to leave week one with proof points instead of just sign-up confirmations.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Apply for the relevant AI startup program and confirm regional data options.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Ship a 90-day pilot with a fixed evaluation set and weekly cost review.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Join a local AI community session to demo and gather user feedback.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="MLAI is a not-for-profit community empowering the Australian AI community. Join to compare options with peers and get practical recommendations." 
              buttonText="Join the MLAI community"
              buttonHref="https://mlai.au/contact"
              note="We respond with community pathways, not sales pitches."
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
