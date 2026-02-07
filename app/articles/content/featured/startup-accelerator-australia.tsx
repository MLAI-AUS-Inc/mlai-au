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
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

export const useCustomHeader = true

const TOPIC = 'Startup accelerators in Australia'
export const CATEGORY = 'australian-ai-landscape'
export const SLUG = 'startup-accelerator-australia'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-28'
export const DATE_MODIFIED = '2026-01-28'
export const DESCRIPTION = 'A practical 2026 guide to Australian startup accelerators: key programs, typical terms, and what AI teams should know before applying.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b4a9a55e-4254-4bb3-9eed-5b80dfbc4432.jpg?alt=media&token=54ee6558-bb42-4528-812c-7377691e9f9f"
const HERO_IMAGE_ALT = 'Sydney skyline at dusk—symbolising Australia’s startup ecosystem'
export const FEATURED_FOCUS = 'startups'

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Which startup accelerators operate in Australia in 2026?',
    answer:
      'Notable names include Startmate, Google for Startups Accelerator: AI First (Australia), UNSW Founders 10x, and state-backed directories such as LaunchVic that list active programs. Always check the official program pages for current details.'
  },
  {
    id: 2,
    question: 'Do Australian accelerators take equity?',
    answer:
      'It varies. Some programs take 0% equity (e.g., ecosystem/corporate programs), while others exchange investment and support for a small equity stake. Terms change—review each program’s current offer.'
  },
  {
    id: 3,
    question: 'How much funding is typical in Australia?',
    answer:
      'Funding ranges widely by program and cohort. Some offer non-dilutive support; others provide capital in exchange for equity. Expect variability and confirm the latest terms on the program site.'
  },
  {
    id: 4,
    question: 'Are Australian accelerators remote or in-person?',
    answer:
      'Both exist. Many run hybrid models with remote components and optional in-person intensives in cities such as Sydney, Melbourne, or Brisbane. Check each program’s format and location.'
  },
  {
    id: 5,
    question: 'When should an AI startup apply?',
    answer:
      'Most programs have 1–2 intakes per year. Apply when you can clearly show a user problem, evidence of demand, and a plausible path to validation. Keep an eye on deadlines and rolling expressions of interest.'
  },
  {
    id: 6,
    question: 'Are accelerators right for research-heavy AI projects?',
    answer:
      'Sometimes. If you’re pre-commercial or focusing on research translation, consider university incubators, state innovation hubs, or grants alongside accelerators. Choose the model that best fits your stage and goals.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'Which startup accelerators operate in Australia in 2026?', description: 'Startmate, Google for Startups AI First (AU), UNSW 10x; state directories like LaunchVic list more.' },
    { label: 'Do Australian accelerators take equity?', description: 'Some are equity‑free; others invest for a small stake. Terms vary—check current program pages.' },
    { label: 'When do accelerator applications open?', description: 'Most run 1–2 intakes per year with cohort deadlines. Confirm dates on each program’s site.' }
  ]
}

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

const references = [
  {
    id: 1,
    href: 'https://startup.google.com/programs/accelerator/ai-first/australia/',
    title: 'Google for Startups Accelerator: AI First (Australia)',
    publisher: 'Google for Startups',
    description: 'Equity-free accelerator focused on AI-first companies in Australia; check current cohort details.',
    category: 'industry'
  },
  {
    id: 2,
    href: 'https://www.startmate.com/',
    title: 'Startmate Accelerator',
    publisher: 'Startmate',
    description: 'Well-known Australian/NZ accelerator with mentor network and alumni community; terms and intakes vary by cohort.',
    category: 'industry'
  },
  {
    id: 3,
    href: 'https://unswfounders.com/10x-accelerator',
    title: 'UNSW Founders 10x Accelerator',
    publisher: 'UNSW Founders',
    description: 'University-led accelerator with cohort-based programming; see current offer and application dates.',
    category: 'industry'
  },
  {
    id: 4,
    href: 'https://launchvic.org/programs/',
    title: 'LaunchVic: Programs and Directories',
    publisher: 'LaunchVic (Victoria State Government)',
    description: 'Directory of Victorian startup programs and funding opportunities; updated listings and links to providers.',
    category: 'government'
  },
  {
    id: 5,
    href: 'https://www.fullstack.com.au/best-startup-accelerators-australia-2025/',
    title: 'Best Startup Accelerators in Australia (2025)',
    publisher: 'Fullstack Advisory',
    description: 'Overview list of accelerators operating in Australia; use as a starting point and verify terms on official sites.',
    category: 'analysis'
  }
]

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <>
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

      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <p>
          <strong>{TOPIC}</strong> – In 2026, Australia hosts a mix of national, university, and state-backed programs. From Startmate to Google for Startups’ AI First cohort, the right accelerator can compress learning, expand networks, and unlock early traction. Below is a practical overview for founders, teams, and AI‑curious builders.
        </p>

        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Australia’s accelerator landscape spans national, state, and university programs. Always check official pages for current terms."
        />

        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'If you’re validating, raising, or seeking mentors to accelerate learning and execution.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description: 'If you’re building a portfolio and want structured exposure to startup basics.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description: 'If you mentor founders or run workshops and need a current, neutral overview.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow'
            }
          ]}
        />

        <h2>Top Australian accelerators to know in 2026</h2>
        <p>
          This short list reflects prominent programs surfaced in public directories and official pages. Use it as a starting map and confirm details directly with organisers.
        </p>

        <h3>Google for Startups Accelerator: AI First (Australia)</h3>
        <p>
          A cohort for AI‑first companies with mentoring and technical support. Historically equity‑free; confirm current settings on the official site.
        </p>

        <h3>Startmate Accelerator</h3>
        <p>
          A well‑known accelerator with an active mentor network and alumni across Australia and New Zealand. Investment and terms vary by cohort—review the latest.
        </p>

        <h3>UNSW Founders 10x Accelerator</h3>
        <p>
          University‑led, cohort‑based accelerator with structured programming and founder support. Check application windows and offer specifics per intake.
        </p>

        <h3>State directories and hubs (e.g., LaunchVic)</h3>
        <p>
          State‑backed organisations, such as LaunchVic in Victoria, maintain directories of current programs and funding initiatives. They’re useful for discovering sector‑specific or early‑stage options.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Programs differ materially on equity, cash, and time commitment. Some are equity‑free; others invest for a small stake. Optimise for mentor quality, alumni outcomes, and program fit—not headline funding alone.
        </QuoteBlock>

        <h2>How offers typically work in Australia</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9e039034-5842-4a56-ade2-71a13ae71196.jpg?alt=media&token=f936f10b-58c3-4000-93e4-b3cdbfbf8785" alt="Nostalgic 90s film aesthetic showing tech professionals collaborating in a dynamic startup environment in Australia." className="w-full rounded-lg my-8" />

        <p>
          While every accelerator sets its own terms, common patterns include: cohort‑based programming over several weeks, mentor access, workshops, and community. Financial terms vary from equity‑free support to investment for equity. Always rely on official program pages for the latest specifics.
        </p>
        <ul>
          <li>
            Funding: ranges from non‑dilutive support to direct investment. Amounts differ by program and cohort.
          </li>
          <li>
            Equity: some programs take none; others take a small percentage linked to their investment.
          </li>
          <li>
            Time commitment: typically multi‑week cohorts with weekly sessions; formats may be in‑person, remote, or hybrid.
          </li>
          <li>
            Perks: access to mentors, partner credits, community, and demo opportunities.
          </li>
        </ul>

        <h2>Timing and fit: when to apply</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ed04a9b1-379b-453b-93f6-dd004f021998.jpg?alt=media&token=6741b376-181f-4a0a-81b8-7a0cf95fc1a5" alt="Tech-savvy team collaborating in a 90s-inspired startup setting, embodying creativity and innovation." className="w-full rounded-lg my-8" />

        <p>
          Most Australian accelerators run one or two intakes per year, with dates announced on program pages. Apply when you can articulate a clear problem, early evidence (or path) to validation, and what you hope to achieve during the cohort.
        </p>

        <h3>For AI startups: what to show</h3>
        <p>
          Beyond product and traction, AI teams should highlight model choice/rationale, safety and risk controls, data provenance, and intended governance. If you’re early, frame a credible plan to validate safely and ethically.
        </p>
        <ul>
          <li>Product and user problem clarity</li>
          <li>Signals of demand (waitlists, pilots, or interviews)</li>
          <li>Responsible AI plan: data handling, safety, and evaluation</li>
          <li>Metrics you’ll target during the program</li>
        </ul>

        <QuoteBlock title="Practical checklist" variant="orange">
          <>
            <p className="m-0">Before you apply:</p>
            <ul>
              <li>List 5–8 programs that match your stage and sector</li>
              <li>Draft a one‑pager and a short traction timeline</li>
              <li>Collect 2–3 product screenshots or a 90‑second demo video</li>
              <li>Prepare concise answers on market, model, and safety</li>
              <li>Ask 2 alumni for a quick reality‑check on your story</li>
            </ul>
          </>
        </QuoteBlock>

        <ArticleStepList
          title="Shortlist and apply in a week"
          steps={[
            'Map fit: goals, sector, location/format, equity preferences',
            'Create a comparison sheet: mentors, terms, and dates',
            'Draft one core narrative; tailor answers per program',
            'Assemble proof: demo, user quotes, key metrics',
            { label: 'Submit 2–3 applications and book follow‑ups with alumni' }
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists and example application answers to speed up your prep."
          buttonLabel="Download now"
          buttonHref="#"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="purple">
          Talk to alumni before you apply. A 15‑minute chat often reveals day‑to‑day cadence, mentor engagement, and what the program truly optimises for.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Alternatives and complements</h2>
        <p>
          If an accelerator isn’t the right fit now, consider university incubators, state innovation programs, domain‑specific communities, or targeted mentorship. Many founders combine a local community with a future accelerator once timing, traction, or team bandwidth improves.
        </p>

        <h2>Closing thoughts</h2>
        <p>
          Australia’s accelerator landscape is diverse and active. Focus on fit, mentors, and learning velocity. For AI teams, be explicit about safety, data, and evaluation—then use the cohort to pressure‑test your path to users and value.
        </p>
      </div>

      <ArticleReferences references={references} heading="Sources & further reading" />

      <ArticleDisclaimer />

      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="MLAI is a not‑for‑profit community empowering the Australian AI community. If you’re exploring programs, we can point you to community resources and peers."
        buttonText="Join the MLAI community"
        buttonHref="/contact"
        note="Friendly, community‑first guidance—no hard sell."
      />

      <AuthorBio author={authorDetails} />

      <ArticleFAQ items={faqItems} />

      <ArticleFooterNav />
    </>
  )
}
