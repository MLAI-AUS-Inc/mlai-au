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
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'Startup incubator Melbourne'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'startup-incubator-melbourne'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-17'
const DATE_MODIFIED = '2026-01-17'
const DESCRIPTION = 'Current overview of Melbourne startup incubators and accelerators—programs, eligibility, equity, timelines, and how to choose. As at Jan 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-69bbf9ce-161b-45e3-99ba-2a38429cc76d.jpg?alt=media&token=847ec6be-d4ed-4819-be4a-02922684166e"
const HERO_IMAGE_ALT = 'Melbourne skyline at dusk'
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
    question: 'Which incubators and accelerators operate in Melbourne (2026)?',
    answer:
      'Examples include LaunchVic-backed programs and operators, university-linked hubs (MAP at the University of Melbourne, RMIT Activator, Monash Generator), Boab AI (scale-up focused), Stone & Chalk (hub/coworking), and national operators that often run Melbourne cohorts (Startmate, Antler). Always check official pages for current status.',
  },
  {
    id: 2,
    question: 'What’s the difference between an incubator and an accelerator?',
    answer:
      'Incubators support earlier-stage founders (idea to prototype) over a longer period with mentoring, community and light structure; accelerators are fixed-term, more intense (e.g. 8–16 weeks), and may invest capital in exchange for equity. Terminology varies by operator – read the fine print.',
  },
  {
    id: 3,
    question: 'Are Melbourne incubators free or equity-based?',
    answer:
      'Many university and LaunchVic-backed initiatives are fee-free and equity-free. Commercial accelerators may offer funding for ~5–10% equity (ranges vary). Confirm fees, equity, and any follow-on rights directly with the operator.',
  },
  {
    id: 4,
    question: 'When do applications open, and how competitive are they?',
    answer:
      'Most run 1–2 intakes per year. Some accept rolling expressions of interest. Competitiveness varies; plan 6–8 weeks ahead to prepare your application. Track LaunchVic’s Programs page and each operator’s site/newsletter.',
  },
  {
    id: 5,
    question: 'Do I need to be a student to join university programs?',
    answer:
      'Not always. Several have streams for alumni or the broader community, while others require a current affiliation. Check MAP, RMIT Activator and Monash Generator eligibility pages for specifics.',
  },
  {
    id: 6,
    question: 'Are there AI-specific options in Melbourne?',
    answer:
      'Boab AI targets data-rich AI scale-ups; national accelerators often include AI startups; sector-specific cohorts appear periodically via LaunchVic-backed operators. Verify current scope, stage and sector fit.',
  },
  {
    id: 7,
    question: 'Can international founders apply to Melbourne programs?',
    answer:
      'Many accept interstate or overseas applicants, though some expect in-person participation in Victoria. Visa and work rights are your responsibility; this guide is general information only.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Which startup incubators are in Melbourne?',
      description: 'LaunchVic-backed programs, university hubs (MAP, RMIT Activator, Monash Generator) and sector operators like Boab AI; check each site for current intakes.',
    },
    {
      label: 'Are Melbourne incubators free or equity-based?',
      description: 'Many uni/LaunchVic programs are equity-free; commercial accelerators may invest for ~5–10% equity. Always confirm fees and terms.',
    },
    {
      label: 'When do applications open?',
      description: 'Most run 1–2 intakes per year. Track LaunchVic’s Programs directory and operator newsletters for dates.',
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
    <div className="bg-transparent">
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
        <QuoteBlock variant='purple' icon={<span className='text-xl'>💡</span>}>
          <p className='text-sm text-white'>
            
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
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
          <p>
            <strong>{TOPIC}</strong> is one of the most common searches Victorian founders make, but results can be a jumble of lists and dated pages. As at January 2026, here’s a structured way to navigate Melbourne’s incubators and accelerators—what they do, who they suit, and where to find current intakes.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>Incubator vs accelerator: what Melbourne operators actually mean</h2>
          <p>
            Operators in Melbourne use these terms in slightly different ways, so confirm details on each program page. As a rule of thumb:
          </p>
          <ul>
            <li>
              <strong>Incubators</strong>: earlier stage (idea → prototype), flexible timelines, mentoring, community and light structure; usually equity‑free.
            </li>
            <li>
              <strong>Accelerators</strong>: fixed-term (e.g. 8–16 weeks), structured sprints, demo days; may provide capital and take equity.
            </li>
          </ul>
          <p>
            Some hubs blend both (e.g. pre‑accelerators or founder fellowships). Always check eligibility, sector focus, equity and time commitment.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="/resources"
            accent="purple"
          />

          <ArticleCallout
            title="Quick tip: match program intent, not brand"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Shortlist programs by <em>stage fit</em> (idea, MVP, growth), <em>sector fit</em> (e.g. AI, climate, deep tech), and <em>constraints</em> (equity, schedule, location). This avoids chasing well‑known brands that don’t match your needs.
            </p>
          </ArticleCallout>

          <h2>Melbourne programs to know in 2026 (check each operator for dates)</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-765f5f42-a311-4492-ba22-e49fe1ace541.jpg?alt=media&token=bcbae9f1-0a4b-401b-a991-bd0785536fb8" alt="Tech enthusiasts collaborate in a vibrant 90s film aesthetic, embodying Melbourne's innovative startup culture." className="w-full rounded-lg my-8" />

          <p>
            This overview isn’t exhaustive and programs change. Use it to build a shortlist, then verify details on the official sites (links below in Sources).
          </p>
          <h3>LaunchVic Program Finder</h3>
          <p>
            State-backed directory of current founder programs across Victoria (incubators, accelerators, courses). Best starting point to see what’s live.
          </p>
          <h3>Melbourne Accelerator Program (MAP) — University of Melbourne</h3>
          <p>
            A well-known accelerator with mentoring and alumni network. Streams and eligibility evolve—check current cohort focus and equity terms.
          </p>
          <h3>RMIT Activator</h3>
          <p>
            Runs founder programs across stages (including pre‑accelerators). Some streams are open to broader community; others are university‑linked.
          </p>
          <h3>Monash Generator</h3>
          <p>
            Monash’s entrepreneurship hub with pathways from ideation through to accelerator‑style programs.
          </p>
          <h3>Boab AI (scale‑up)</h3>
          <p>
            A Victoria‑based program focused on data‑rich AI companies at later (scale‑up) stages. Not aimed at first‑time idea validation.
          </p>
          <h3>Stone & Chalk (Melbourne)</h3>
          <p>
            A startup hub/coworking community in Docklands. While not an incubator per se, it provides community, mentors and events that complement structured programs.
          </p>
          <h3>Startmate & Antler (national, often with Melbourne cohorts)</h3>
          <p>
            National operators that periodically run Melbourne‑based or hybrid cohorts. Check current intake city, equity terms and sector focus.
          </p>

          <h2>How to choose the right Melbourne program</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0303a6d3-f5d1-42f4-80a7-99251af25958.jpg?alt=media&token=6e4687da-28ab-4889-b249-6bd43104a646" alt="Diverse group collaborating in a tech startup, showcasing 90s film aesthetic and innovation in Melbourne." className="w-full rounded-lg my-8" />

          <p>Use these decision filters before you apply:</p>
          <ul>
            <li>
              <strong>Stage</strong>: idea/validation, MVP, or revenue/growth. Choose programs that explicitly support your stage.
            </li>
            <li>
              <strong>Sector</strong>: generalist vs specialist (e.g. AI, climate, health). Sector alignment improves mentor relevance.
            </li>
            <li>
              <strong>Equity and funding</strong>: equity‑free vs investment for equity; any fees; follow‑on rights.
            </li>
            <li>
              <strong>Time/format</strong>: in‑person vs hybrid; days per week; conflict with study/work.
            </li>
            <li>
              <strong>Network</strong>: alumni outcomes in your domain; access to local mentors and customers in Victoria.
            </li>
          </ul>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Map your stage, sector and constraints (equity/time/location).' },
              { label: 'Build a shortlist (5–8 programs) from LaunchVic + operator sites.' },
              { label: 'Prepare an application pack: 1‑page problem/solution, lean traction, 10‑slide deck.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Cohorts are accelerators, not substitutes for customer discovery. Do the work upfront—programs amplify momentum you already have.”
          </QuoteBlock>

          <h2>Applications and timelines: where to find open cohorts</h2>
          <p>
            Most operators run one or two intakes per year, with application windows 3–8 weeks long. To avoid missing out:
          </p>
          <ul>
            <li>
              Monitor the <strong>LaunchVic Programs</strong> directory and each operator’s website.
            </li>
            <li>
              Subscribe to program newsletters and set calendar reminders one quarter ahead.
            </li>
            <li>
              Keep an EOI draft ready (founder bios, 100‑word problem statement, traction bullets, links to demo/Notion).
            </li>
          </ul>

          <h2>Funding, equity and IP: what to check before you apply</h2>
          <ul>
            <li>
              <strong>Equity</strong>: commercial accelerators often invest for ~5–10% (varies). University/LaunchVic programs are commonly equity‑free.
            </li>
            <li>
              <strong>Fees and perks</strong>: any program fees, cloud credits, coworking, or mentorship guarantees.
            </li>
            <li>
              <strong>IP and confidentiality</strong>: review participation terms; avoid sharing sensitive trade secrets outside safe contexts.
            </li>
            <li>
              <strong>Eligibility</strong>: residency requirements for in‑person cohorts in Victoria; student/alumni constraints.
            </li>
          </ul>

          <h2>For AI startups: compute, safety and data considerations</h2>
          <p>
            If you’re building with AI, expect questions about data provenance, privacy, model risks and evaluation. Be ready to show a responsible approach: document datasets, avoid production use of sensitive personal information without consent, and include a brief risk register (misuse, bias, security) with mitigations. This is general information only—seek independent advice for legal/privacy matters.
          </p>

          <h2>Not ready for a cohort? Community and coworking help</h2>
          <p>
            If you’re still validating, use Melbourne’s community to build momentum: attend local meetups, join hubs (e.g. Stone & Chalk) and connect with the MLAI community for peer support. A few weeks of customer discovery can materially improve your application quality.
          </p>

          <h2>Make your move: a simple 30‑day plan</h2>
          <ul>
            <li><strong>Week 1</strong>: Define your ICP and problem statement. Book 10 discovery calls.</li>
            <li><strong>Week 2</strong>: Build a clickable demo or data‑backed prototype. Capture 3 learnings.</li>
            <li><strong>Week 3</strong>: Shortlist programs, draft your 10‑slide deck, collect 1–2 advisor references.</li>
            <li><strong>Week 4</strong>: Apply to 2–3 best‑fit programs and schedule follow‑ups.</li>
          </ul>

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

          <ArticleReferences
            heading="Sources"
            description="Curated references to verify current programs and intakes (as at Jan 2026)."
            headingId="references"
            references={[
              {
                id: 1,
                href: 'https://launchvic.org/programs/',
                title: 'Startup Programs, Courses & Accelerators',
                publisher: 'LaunchVic',
                category: 'government',
                description: 'Official directory of current Victorian founder programs.'
              },
              {
                id: 2,
                href: 'https://www.themap.co/',
                title: 'Melbourne Accelerator Program (MAP)',
                publisher: 'The University of Melbourne',
                category: 'guide',
                description: 'University of Melbourne’s accelerator, cohorts and eligibility.'
              },
              {
                id: 3,
                href: 'https://www.boab.ai/',
                title: 'Boab AI',
                publisher: 'Boab AI / Artesian',
                category: 'industry',
                description: 'Scale‑up program for data‑rich AI companies based in Victoria.'
              },
              {
                id: 4,
                href: 'https://www.growthmentor.com/location/melbourne/startup-accelerators/',
                title: 'Top Startup Accelerators in Melbourne [2025]',
                publisher: 'GrowthMentor',
                category: 'analysis',
                description: 'Third‑party list of accelerators operating in Melbourne.'
              },
              {
                id: 5,
                href: 'https://www.failory.com/startups/melbourne-accelerators-incubators',
                title: 'Top Accelerators and Incubators in Melbourne (2026)',
                publisher: 'Failory',
                category: 'analysis',
                description: 'Curated list with short summaries and links.'
              },
              {
                id: 6,
                href: 'https://www.rmit.edu.au/activator',
                title: 'RMIT Activator',
                publisher: 'RMIT University',
                category: 'guide',
                description: 'Programs and founder support from RMIT.'
              },
              {
                id: 7,
                href: 'https://www.monash.edu/entrepreneurship/generator',
                title: 'Monash Generator',
                publisher: 'Monash University',
                category: 'guide',
                description: 'Monash entrepreneurship hub and programs.'
              },
              {
                id: 8,
                href: 'https://www.stoneandchalk.com.au/',
                title: 'Stone & Chalk (Melbourne)',
                publisher: 'Stone & Chalk',
                category: 'industry',
                description: 'Innovation hub and community with a Melbourne location.'
              },
              {
                id: 9,
                href: 'https://www.startmate.com/accelerator',
                title: 'Startmate Accelerator',
                publisher: 'Startmate',
                category: 'guide',
                description: 'National accelerator with cohorts across AU/NZ (check city each intake).'
              },
              {
                id: 10,
                href: 'https://www.antler.co/australia',
                title: 'Antler Australia',
                publisher: 'Antler',
                category: 'guide',
                description: 'Venture generator/accelerator operating in AU; check current city locations.'
              }
            ]}
          />

          <ArticleDisclaimer />
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
