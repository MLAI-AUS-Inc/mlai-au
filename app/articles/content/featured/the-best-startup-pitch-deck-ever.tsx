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

const TOPIC = 'The Best Startup Pitch Deck Ever'
export const CATEGORY = 'featured'
export const SLUG = 'the-best-startup-pitch-deck-ever'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-25'
export const DATE_MODIFIED = '2026-01-25'
export const DESCRIPTION = 'What “great” looks like for a startup pitch deck in 2026: structure, timing, AU context, examples, and mistakes to avoid.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1968fb96-80f9-49e4-95d6-42c5a359b4ce.jpg?alt=media&token=2884e0cc-4793-4155-a69c-0468133ece8b"
const HERO_IMAGE_ALT = 'Founder presenting a slide deck to an audience in a modern workspace'
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
    question: 'How many slides should a pitch deck have in 2026?',
    answer:
      'Aim for 10–12 slides for a live meeting and 12–15 for an “email deck”. If you routinely need more than 15, you likely have multiple ideas per slide—split and simplify.'
  },
  {
    id: 2,
    question: 'What’s the best slide order for early‑stage rounds?',
    answer: (
      <>
        Problem → Audience → Solution/Product → Why now → Market size → Traction → Business model → Go‑to‑market → Competition & moat → Team → Financials (one‑page) → The ask & use of funds. Adjust for stage (e.g., pre‑seed may shrink financials, seed/Series A will expand traction and GTM).
      </>
    )
  },
  {
    id: 3,
    question: 'Do I need a full financial model in the deck?',
    answer:
      'No. Put a one‑page high‑level view (revenue drivers, unit economics, runway post‑raise). Keep the detailed model for diligence/data room.'
  },
  {
    id: 4,
    question: 'Should I include AI safety or privacy content for an AI startup?',
    answer: (
      <>
        Yes—briefly. In Australia, investors will expect clear data handling and privacy practices (see the Australian Privacy Principles). Add a short line on model risks, evaluation, and human‑in‑the‑loop where relevant, with a link to policy docs.
      </>
    )
  },
  {
    id: 5,
    question: 'Do I need different versions for email and live presentations?',
    answer:
      'Yes. Email decks must be self‑contained (a touch more text and annotated visuals). Live decks should be visual and lightweight, leaving narrative to you.'
  },
  {
    id: 6,
    question: 'PDF, PowerPoint, Google Slides, or Canva—what do AU investors prefer?',
    answer:
      'Use PDF for sharing reliability (16:9, <10 MB). Building in Google Slides or Canva is fine—export to PDF. For live, bring the editable version as backup.'
  },
  {
    id: 7,
    question: 'How do I reference non‑dilutive funding like the R&D Tax Incentive?',
    answer:
      'Include a single slide bullet noting confirmed grants/credits and their timing (e.g., R&D Tax Incentive eligibility, expected cashflow impact). Keep claims conservative and link to source policies.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How many slides should a startup pitch deck have?',
      description: '10–12 for live, 12–15 for email; keep it skimmable in 3–5 minutes for demo‑style pitches.'
    },
    {
      label: 'What makes a pitch deck stand out to investors?',
      description: 'Clear problem, evidence of demand/traction, credible “why now”, crisp model and a specific ask.'
    },
    {
      label: 'Do I need separate email and live versions?',
      description: 'Yes. Email decks are self‑contained with brief annotations; live decks are visual and minimal.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://slidebean.com/pitch-deck-examples',
    title: 'Pitch Deck Examples from 35+ Startups',
    publisher: 'Slidebean',
    description: 'Gallery of well‑known decks; helpful for pattern recognition and inspiration.',
    category: 'industry'
  },
  {
    id: 2,
    href: 'https://www.failory.com/pitch-deck',
    title: 'The +500 Most Successful Startup Pitch Decks',
    publisher: 'Failory',
    description: 'Large list of pitch deck examples across stages and sectors.',
    category: 'industry'
  },
  {
    id: 3,
    href: 'https://www.sequoiacap.com/article/writing-a-business-plan/',
    title: 'Writing a Business Plan (Pitch Deck Template)',
    publisher: 'Sequoia Capital',
    description: 'Canonical investor‑oriented outline for early‑stage pitch decks.',
    category: 'guide'
  },
  {
    id: 4,
    href: 'https://guykawasaki.com/the_102030_rule/',
    title: 'The 10/20/30 Rule of PowerPoint',
    publisher: 'Guy Kawasaki',
    description: 'Guideline for slide count, time, and font size that remains influential.',
    category: 'guide'
  },
  {
    id: 5,
    href: 'https://asic.gov.au/regulatory-resources/fundraising/',
    title: 'Fundraising Guidance',
    publisher: 'Australian Securities and Investments Commission (ASIC)',
    description: 'Official Australian guidance on fundraising and disclosure obligations.',
    category: 'government'
  },
  {
    id: 6,
    href: 'https://www.oaic.gov.au/privacy/australian-privacy-principles',
    title: 'Australian Privacy Principles',
    publisher: 'Office of the Australian Information Commissioner (OAIC)',
    description: 'Privacy requirements relevant to data handling claims in AI decks.',
    category: 'government'
  },
  {
    id: 7,
    href: 'https://www.business.gov.au/grants-and-programs/research-and-development-tax-incentive',
    title: 'Research and Development Tax Incentive',
    publisher: 'business.gov.au',
    description: 'Information on Australia’s R&D Tax Incentive and eligibility.',
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
    <div className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        <div className="prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <p>
            <strong>{TOPIC}</strong> is less about a “perfect” template and more about telling a crisp, de‑risked story. Top lists like Slidebean and Failory showcase great examples, but the pattern that wins in 2026 is consistent: one problem, one audience, clear traction, and a specific ask—delivered in 3–5 minutes.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          <h2>What “best” actually means in a pitch deck</h2>
          <p>
            The best decks do three things quickly: (1) prove there’s real pain and willingness to pay, (2) show why your timing and approach give you an unfair shot, and (3) make it obvious how the funds convert into milestones. Design matters, but evidence beats polish—screenshots of live usage, cohort retention, unit economics, and short customer quotes are stronger than mockups.
          </p>
          <p>
            Keep one idea per slide. Use natural language headings like “Customers churned 12% → 6% after automation” rather than generic labels. For AI products, add one line on model choice, evaluation, and human oversight so investors don’t need to guess about safety and reliability.
          </p>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="#"
            accent="purple"
          />

          <QuoteBlock title="Two versions win" variant="purple" icon={<span className="text-xl">💡</span>}>
            Maintain a concise live deck (visual, 10–12 slides) and a self‑contained email deck (annotated, ~12–15 slides). The former supports your narrative; the latter must survive forwarding without you.
          </QuoteBlock>

          <h2>Investor‑validated structure: the 12‑slide flow</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-66a7f9bf-370f-4830-a630-d91009a58e79.jpg?alt=media&token=e0341765-316f-4b19-b047-caa45e3ca173" alt="Vibrant 90s tech scene featuring diverse individuals collaborating in a startup environment." className="w-full rounded-lg my-8" />

          <p>
            A structure adapted from widely used investor templates (e.g., Sequoia) works across most sectors:
            Problem → Audience → Solution/Product → Why now → Market size → Traction → Business model → Go‑to‑market → Competition & moat → Team → Financials (one page) → The ask & use of funds.
          </p>

          <h3>Optional slides by stage or sector</h3>
          <p>
            Pre‑seed: compress financials and expand founder–market fit. Seed/Series A: expand traction (retention, payback) and GTM (pipeline, sales motion). AI: add a brief note on data sources, evaluation metrics, and safety guardrails; link to a longer policy if asked.
          </p>

          <ArticleStepList
            title="Build your deck in this order"
            steps={[
              'Write your one‑sentence narrative: Problem → Why now → Why us → What’s the ask',
              'Assemble slides following the 12‑slide flow; keep one idea per slide',
              'Cut words by half; add real evidence (metrics, screenshots, customer quotes)'
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Key takeaway" variant="purple">
            “Investors skim first, then engage. Make the skim undeniable: a clear why‑now, real traction, and a precise use‑of‑funds.”
          </QuoteBlock>

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

          <h2>Formats and timing: slides, minutes, and file type</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f6b7cf59-6964-4301-93fa-f123a3742617.jpg?alt=media&token=a80ad5ed-844c-4e99-a3c6-98f50ca366c2" alt="90s film aesthetic scene showing diverse team collaborating in a tech startup office, surrounded by gadgets and notes." className="w-full rounded-lg my-8" />

          <p>
            For live sessions, 10–12 slides and ~10 minutes is a safe default; demo days often compress to 3–5 minutes. The classic 10/20/30 guideline remains useful: ~10 slides, ≤20 minutes, ≥30‑point text for readability. Share a PDF (16:9, under 10 MB) and carry an editable backup for live.
          </p>
          <p>
            Email decks need short annotations because they travel without you. Avoid auto‑playing videos; link to a 60–90 second demo and include a static screenshot so the message still lands if the link is skipped.
          </p>

          <h2>The Australian context in 2026: local expectations for AI startups</h2>
          <p>
            AU investors will expect awareness of privacy and responsible AI. If you touch personal data, align your claims with the Australian Privacy Principles and be ready to discuss data storage, consent, and deletion. For AI safety, state your approach to evaluation, bias mitigation, and human oversight in one concise slide note.
          </p>
          <p>
            If you rely on non‑dilutive funding (e.g., the R&D Tax Incentive), mention it briefly as part of runway planning—conservatively and with timing caveats. For fundraising mechanics, ensure you understand local disclosure rules and investor norms before circulating widely.
          </p>

          <h2>Mistakes that stall a raise (and how to fix them)</h2>
          <p>
            Common blockers include: too many ideas per slide, no traction proxy (e.g., waitlist growth, LOIs), unclear go‑to‑market, and a vague ask. Fix by tightening to one message per slide, adding simple evidence (screenshots, metrics), naming your first distribution channel and early ICP, and stating an explicit use‑of‑funds with milestone dates.
          </p>

          <h2>Examples to study (and what to copy, not clone)</h2>
          <p>
            Browse curated galleries (Slidebean, Failory) to see patterns: strong title slides, crisp problem framing, traction visualisation, and short asks. Copy the principles (clarity, evidence, pacing), not the aesthetics of a different business model or market. When in doubt, prioritise proof over polish.
          </p>

          <h2>Ship your v1 deck this week</h2>
          <p>
            Draft your narrative in plain language, map to the 12‑slide flow, add real evidence, and produce both a live and email version. Share with 3–5 trusted reviewers for a “skim test” before sending to investors. Small, fast iterations beat long internal debates.
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
            body="MLAI is a not‑for‑profit community empowering the Australian AI community. Join peers to workshop your deck and get practical feedback."
            buttonText="Join the MLAI community"
            buttonHref="/contact"
            note="Friendly, community‑first support."
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
