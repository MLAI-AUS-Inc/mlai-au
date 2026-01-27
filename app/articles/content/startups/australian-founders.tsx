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

const TOPIC = 'Australian founders: from colonial beginnings to startup builders'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'australian-founders'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-15'
const DATE_MODIFIED = '2026-01-15'
const DESCRIPTION = 'A 2026 guide to how “Australian founders” are understood—from colonial figures to today’s startup leaders, with hubs, funding, and community pathways.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4ad6f4bb-7daf-483f-9011-70292f8e493e.jpg?alt=media&token=fd644fd0-5792-4824-acb2-4bb873b075d8"
const HERO_IMAGE_ALT = 'Australian founders collaborating in a modern workspace'
const FEATURED_FOCUS = 'startups' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: 'Who are historically referred to as the “founders” of Australia?', answer: 'The term often refers to early colonial leaders around the 1788 First Fleet and figures leading to Federation in 1901, but it is contested because it overlooks First Nations custodianship. Contemporary usage is shifting to acknowledge Indigenous sovereignty and avoid implying ownership.' },
  { id: 2, question: 'How is “Australian founder” used in startups today?', answer: 'It typically means someone who establishes and leads an Australian-based company, often backed by local investors or headquartered in major hubs like Sydney or Melbourne. The focus is on value creation, compliance with Australian law, and contribution to the local economy.' },
  { id: 3, question: 'Which hubs matter most for founders in 2026?', answer: 'Sydney, Melbourne, and Brisbane remain the largest, with growing activity in Perth and Adelaide. University-linked precincts and sector clusters (fintech in Sydney, AI/health in Melbourne/Brisbane) provide accelerators, labs, and meetups.' },
  { id: 4, question: 'What funding routes are common for Australian founders?', answer: 'Angel syndicates, early-stage VCs, industry-linked accelerators, the R&D Tax Incentive, Export Market Development Grants, and equity crowdfunding. Each has eligibility rules; founders should check current guidance as at 2026 on government sites.' },
  { id: 5, question: 'Can overseas founders base themselves in Australia?', answer: 'Yes, but they must meet visa requirements (e.g., Global Talent visa or Temporary Skill Shortage streams) and set up compliant entities. Legal advice and migration guidance are recommended to ensure status and payroll obligations are met.' },
  { id: 6, question: 'Where can AI-focused founders find community?', answer: 'Sector meetups (e.g., AI/ML groups), university innovation hubs, Aussie Founders Network for general networking, and not-for-profit communities like MLAI for practitioners and enthusiasts across Australia.' },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Who were the founders of modern Australia?',
      description: 'Colonial leaders of the 1788 First Fleet and federation figures, though usage now notes Indigenous custodianship and avoids implying ownership.',
    },
    {
      label: 'What defines an Australian company founder today?',
      description: 'Someone establishing and leading an Australian-based firm with compliant structures, local presence, and contribution to the economy.',
    },
    {
      label: 'Where do Australian founders get funding in 2026?',
      description: 'Angels, early-stage VCs, accelerators, R&D Tax Incentive, Export Market Development Grants, and equity crowdfunding.',
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
            <strong>{TOPIC}</strong> – Modern search results blur colonial history, company creation, and startup life. This 2026 guide separates those threads: acknowledging First Nations custodianship, outlining how “founder” is used in today’s startup economy, and mapping the Australian ecosystems where builders gather.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>Who gets called a “founder” of Australia? From 1788 to federation</h2>
          <p>
            Early colonial accounts often labelled First Fleet leaders and Federation architects as “founders”, but that framing overlooks more than 65,000 years of First Nations custodianship. In 2026, historians and community organisations increasingly emphasise that colonisation is not “founding”; instead, it marks the start of British settlement and the path to the 1901 Commonwealth. When using the term “founder”, be explicit about whether you mean colonial office-holders, federation framers, or modern company creators—and respect Indigenous sovereignty in your language.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Phrase with care"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              When discussing colonial figures, pair terms like “Governor Phillip” or “colonial administrators” instead of “founders”. For company builders, “startup founder” or “Australian company founder” is clearer and avoids historical ambiguity.
            </p>
          </ArticleCallout>

          <h2>Networks uniting Australian founders in 2026</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c198b610-9621-43dc-938b-98f98231b211.jpg?alt=media&token=e27b0109-6a3b-4a6d-a3fd-d20952aaa083" alt="A vibrant 90s film-style scene with diverse Australian founders collaborating in a tech startup environment." className="w-full rounded-lg my-8" />

          <p>
            Today’s founders lean on community: Aussie Founders Network offers broad networking; university precincts host accelerators; sector-specific meetups (fintech, climate, AI) provide peer reviews and demo days. Not-for-profit groups—such as MLAI for AI practitioners—fill the gap for skills-sharing and local accountability, especially outside capital cities.
          </p>

          <h3>What founders look for in a network</h3>
          <p>
            Founders prioritise access to mentors, investor office hours, lightweight legal/accounting templates, and trusted referrals. In 2026, many hubs add responsible-AI guidance, data privacy primers, and export-readiness sessions to match evolving regulation.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Map 3–5 active communities in your city (general + sector + stage-specific).' },
              { label: 'Attend two events this month; schedule follow-ups with one mentor and one peer founder.' },
              { label: 'Join one values-aligned non-profit community (e.g., MLAI for AI builders) to keep learning affordably.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Communities reduce founder isolation and sharpen judgment. A small, consistent peer circle often beats a long list of loose connections.”
          </QuoteBlock>

          <h2>Startup pathways: funding, visas, and compliance for new founders</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7ebdacea-8e7f-4524-ac4f-62bebd24797c.jpg?alt=media&token=ad904359-2eef-4264-bb18-4a4f0903caf5" alt="Tech entrepreneurs collaborating in a vibrant 90s-inspired startup workspace, embodying innovation and creativity." className="w-full rounded-lg my-8" />

          <p>
            Australian founders in 2026 typically mix angel capital, early-stage VCs, and government support. The R&D Tax Incentive remains central for tech-heavy builds, while Export Market Development Grants help outbound growth. Equity crowdfunding suits consumer-facing products with engaged audiences. Overseas founders considering Australia should assess visa options (e.g., Global Talent visa) and set up entities compliant with the Corporations Act, Fair Work obligations, and privacy rules (including the Privacy Act and sector-specific guidance for health or finance).
          </p>

          <ArticleCallout variant="info">
            <p className="text-sm text-gray-800">
              Always verify funding and visa settings on official Australian Government sites as at 2026; programs and thresholds can change year to year.
            </p>
          </ArticleCallout>

          <h2>Notable sectors and Australian company founders to watch</h2>
          <p>
            Software remains strong—Atlassian (Mike Cannon-Brookes, Scott Farquhar) set an enduring playbook. Design-led tools like Canva (Melanie Perkins, Cliff Obrecht, Cameron Adams) showed global reach from Australia. SafetyCulture (Luke Anear) expanded industrial SaaS. In AI, newer companies focus on model evaluation, safety, and domain-specific copilots; health and climate AI ventures gain attention thanks to university research pipelines. Use these examples to benchmark governance, hiring pace, and capital efficiency rather than copy valuation narratives.
          </p>

          <h3>Signals of resilient Australian founders</h3>
          <p>
            Look for disciplined burn, transparent governance, compliance-ready data practices, and early customer validation. These traits matter more than headline valuations in 2026’s funding climate.
          </p>

          <h2>Move from research to action in the Australian ecosystem</h2>
          <p>
            Whether you’re clarifying historical language or mapping startup supports, anchor on evidence: official guidance for compliance, peer-reviewed community knowledge, and mentor feedback from local hubs. Small, consistent steps—joining a community, shipping a pilot, and tracking customer proof—beat waiting for perfect conditions.
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
              body="Join the MLAI community to collaborate with fellow AI practitioners in Australia."
              buttonText="Get recommendations"
              buttonHref="https://mlai.au/contact"
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
