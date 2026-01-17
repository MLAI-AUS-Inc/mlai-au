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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'Accelerator startup programs in Australia'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'accelerator-startup-programs'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-17'
const DATE_MODIFIED = '2026-01-17'
const DESCRIPTION = 'A practical 2026 guide to Australian accelerators: eligibility, equity, timelines and how to choose the right program, with links to LaunchVic, Startmate, Google for Startups and more.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e920b16e-5eae-4998-87aa-b9f5828de3c3.jpg?alt=media&token=b163fa30-60c7-4501-bd8f-27b1413a5e60"
const HERO_IMAGE_ALT = 'Founders collaborating at an accelerator workspace'
const FEATURED_FOCUS = 'startups' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  {
    id: 1,
    question: 'Do accelerators in Australia take equity?',
    answer:
      'Many do. Equity-based models are common for investment-backed programs (e.g., some cohort offers include a standard cheque for a negotiated %). Others, such as Google for Startups Accelerator, are equity-free. Always confirm current terms on the program’s page (as at 2026).',
  },
  {
    id: 2,
    question: 'Where can I find current accelerator and incubator programs in Victoria?',
    answer: (
      <>
        Check the LaunchVic programs directory for up-to-date opportunities in Victoria. Listings change across the year and include accelerators, incubators and capability programs. See{' '}
        <a
          href="https://launchvic.org/programs/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline text-[--brand-ink]"
        >
          launchvic.org/programs
        </a>{' '}
        (as at 2026).
      </>
    ),
  },
  {
    id: 3,
    question: 'How competitive are top accelerators like Startmate?',
    answer:
      'Highly competitive. Teams with early traction, a clear problem-solution fit, and a strong founding team narrative are more likely to progress. Talk to alumni and read public application guides to calibrate before applying.',
  },
  {
    id: 4,
    question: 'When do applications typically open?',
    answer:
      'Application windows vary. Many programs open 2–3 months before a cohort starts. Some (e.g., Startmate) tend to run two cycles per year; others run rolling or thematic intakes. Set calendar alerts and subscribe to program newsletters for 2026 cohorts.',
  },
  {
    id: 5,
    question: 'What support do equity-free accelerators provide?',
    answer:
      'Typically mentorship, technical guidance, workshops, and partner benefits. Equity-free programs do not invest for ownership but may still carry time commitments and expectations around engagement and milestones.',
  },
  {
    id: 6,
    question: 'Are accelerators worth it for AI startups?',
    answer:
      'It depends on your goals. If you need structured mentorship, alumni network access and credibility with early customers or investors, the right accelerator can compress learning and signal quality. If you already have strong traction and networks, a targeted advisor bench or revenue focus may outperform a cohort model.',
  },
  {
    id: 7,
    question: 'What’s the difference between accelerators and incubators?',
    answer:
      'Incubators generally provide ongoing support and workspace with broader community benefits; accelerators are time-boxed cohorts with intensive programming and a clear start/finish (often culminating in a demo day). Some organisations run both models—read the program details closely.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Do accelerators in Australia take equity?',
      description: 'Many do; terms vary by program. Some invest for equity (check current %), while others like Google for Startups Accelerator are equity‑free.',
    },
    {
      label: 'When are accelerator applications open?',
      description: 'Cohorts usually open 2–3 months before start dates. Startmate often runs two cycles per year; LaunchVic lists current VIC programs.',
    },
    {
      label: 'How should I choose the right accelerator?',
      description: 'Match one key goal (e.g., pilots or ARR) to mentor/alumni fit, equity/fee terms, and time commitment. Shortlist 2–3 and speak to alumni.',
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

        {/* Intro alert - Clean, neutral style */}
        <ArticleCallout variant="info">
          <p className="text-sm text-gray-800">
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to="/articles" className="font-semibold text-[--brand] underline-offset-4 hover:underline">
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
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          {/* 
            ⚠️ IMPORTANT: CONTENT STRUCTURE INSTRUCTIONS
            The sections below are research-derived for the query “accelerator startup programs” with an Australian focus (2026).
          */}

          <p>
            <strong>{TOPIC}</strong> — If you’re comparing options like Startmate, Google for Startups Accelerator, or programs listed via LaunchVic and Spacecubed, the real question isn’t “what’s best?” but “what fits our stage, goals, and equity preferences?”. This 2026 guide summarises how Australian accelerators work, what equity and time commitments look like, and where to track current intakes.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION 1 */}
          <h2>Accelerators vs incubators: what founders should expect in Australia</h2>
          <p>
            In Australia, <em>accelerators</em> are typically time-boxed cohorts (often 10–14 weeks) with structured programming, mentors, and a clear start/finish—frequently ending with a demo day. <em>Incubators</em> usually provide ongoing support, workspace, and lighter-touch programming over a longer period. Some organisations run both models; always check each program’s format, expected time commitment, and outcomes. For AI startups, look for programs with relevant technical mentors, product validation support, and a credible alumni network.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Tip: anchor your choice to a single measurable outcome"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Decide on one non-vanity metric (e.g., activated users, pilot LOIs, or revenue milestones) to guide which program structure, mentors, and timing will actually move the needle.
            </p>
          </ArticleCallout>

          {/* SECTION 2 */}
          <h2>Finding programs in Victoria: LaunchVic’s directory</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4a87106d-8754-4ff1-b7c6-143500ab38ed.jpg?alt=media&token=cf5ed8b0-6889-47ef-a990-3e4a01828ff5" alt="People collaborate in a vibrant tech and startup environment, reflecting a 90s film aesthetic, embodying innovation in Victoria." className="w-full rounded-lg my-8" />

          <p>
            For founders in Victoria, LaunchVic maintains a live directory of programs—accelerators, incubators, and capability-building initiatives—relevant to 2026 cohorts. It’s a reliable first stop to scan current intakes, themes, and eligibility. Browse the listings at{' '}
            <a href="https://launchvic.org/programs/" target="_blank" rel="noopener noreferrer">launchvic.org/programs</a> and subscribe to updates.
          </p>

          {/* SECTION 3 */}
          <h2>Startmate Accelerator: stage, equity and timelines</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b1f9c7f3-9249-407b-adc9-1f249d867d31.jpg?alt=media&token=39558b32-de72-4b6c-bfa8-39a8c927abb2" alt="Nineties film-style scene of a tech startup team collaborating in a vibrant office space." className="w-full rounded-lg my-8" />

          <p>
            Startmate is a well-known Australian accelerator for early-stage startups. It typically runs multiple intakes each year and focuses on strong teams solving meaningful problems. Terms, investment size, and equity mechanics can change—read the current program page and FAQs before applying. If you’re AI-focused, look for mentor depth in your domain and ask alumni how the program impacted customer validation and follow-on capital.
          </p>
          <p>
            Explore details and current cohorts at{' '}
            <a href="https://startmate.com/accelerator/program" target="_blank" rel="noopener noreferrer">startmate.com/accelerator/program</a> (check terms as at 2026).
          </p>

          {/* SECTION 4 */}
          <h2>Google for Startups Accelerator: equity-free technical program</h2>
          <p>
            Google for Startups Accelerator offers equity-free programs with deep technical mentorship, especially useful for teams building on modern AI and cloud stacks. The program often supports specialised themes (e.g., Cloud, AI) and may be hybrid or remote. While there’s no investment component, expect a structured time commitment and meaningful engagement with mentors and technical staff.
          </p>
          <p>
            See current streams and application windows at{' '}
            <a href="https://startup.google.com/programs/accelerator/" target="_blank" rel="noopener noreferrer">startup.google.com/programs/accelerator/</a>.
          </p>

          {/* SECTION 5 */}
          <h2>Spacecubed and regional programs across Australia</h2>
          <p>
            Spacecubed operates from Western Australia with a portfolio of programs and community infrastructure. If you are outside VIC/NSW, regional hubs like Spacecubed can offer closer networks, mentors, and customer access. Compare program length, thematic focus (e.g., resources, climate, AI), and the calibre of local partners.
          </p>
          <p>
            Explore program options at{' '}
            <a href="https://spacecubed.com/programs/" target="_blank" rel="noopener noreferrer">spacecubed.com/programs</a>.
          </p>

          {/* SECTION 6 */}
          <h2>Equity, fees and funding—what to expect in Australia</h2>
          <p>
            Australia’s landscape spans two broad models: (1) investor-backed accelerators that may offer a standard cheque in exchange for equity, and (2) equity-free programs funded by corporates or grants. Beyond headline terms, scrutinise effective cost (equity/fees) versus value (mentors, alumni, follow-on capital, customer access). For AI startups, hands-on support with data, ML safety, and productisation often matters more than generic pitching workshops.
          </p>

          {/* SECTION 7 */}
          <h2>Shortlist criteria: picking the right accelerator for your startup</h2>
          <h3>Match your program to one clear goal</h3>
          <p>
            Founders who do best in accelerators typically enter with a sharp hypothesis (e.g., “Prove paid pilots in two industries” or “Ship a safety-reviewed v1 with 10 design partners”). Use that to qualify mentors and alumni relevance.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Define one cohort goal and 2–3 metrics (e.g., pilots, ARR, retention)' },
              { label: 'Shortlist 3 programs and map mentor/alumni fit to your domain' },
              { label: 'Validate terms: equity/fees, time cost, and IP/AI compliance expectations' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “The best accelerator is the one whose mentors, alumni and expectations line up with your single measurable outcome—not the shiniest brand.”
          </QuoteBlock>

          {/* SECTION 8: Closing */}
          <h2>Make a plan for the next cohort</h2>
          <p>
            Use the checklist above, line up 2–3 alumni conversations, and prepare a crisp narrative: problem, insight, traction, and why this program now. Set application reminders 2–3 months ahead of cohort dates and keep a living doc of FAQs and evidence (metrics, pilot LOIs, demo links). As at 2026, most programs expect clear thinking on AI safety, data handling and product readiness—be explicit.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="/contact"
              note="You can filter by topic, format (online/in‑person), and experience level."
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
