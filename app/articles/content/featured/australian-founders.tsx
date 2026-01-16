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

const TOPIC = 'Australian founders'
const CATEGORY = 'featured'
const SLUG = 'australian-founders'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-02-20'
const DATE_MODIFIED = '2026-02-20'
const DESCRIPTION = 'How Australian founders connect, research origins, and navigate funding and regulation in 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-da8e6472-08c2-4ea6-86a3-47b53259af22.jpg?alt=media&token=539bb9c3-0d88-4fc7-9e5a-7719cf67fb7a"
const HERO_IMAGE_ALT = 'Group of Australian founders collaborating in a bright workspace'
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
    question: 'What is the Aussie Founders Network and who can join?',
    answer:
      'Aussie Founders Network is a member-led community connecting Australian founders globally. Australians building or investing in startups can apply; check the latest criteria on their site before joining.',
  },
  {
    id: 2,
    question: 'How do Australian founders secure early funding in 2026?',
    answer:
      'Most begin with customer revenue and grants (e.g. Accelerating Commercialisation) before angels. State-based funds (LaunchVic, NSW MVP Ventures) and sector accelerators (Cicada for deep tech) remain active as at Feb 2026.',
  },
  {
    id: 3,
    question: 'Where can I research early Australian founders or settlers in my family?',
    answer:
      'Use archival sources such as Trove newspapers, Findmypast, and state archives. Cross-check names with passenger lists and land records to validate lineage.',
  },
  {
    id: 4,
    question: 'Which cities are strongest for founders right now?',
    answer:
      'Sydney and Melbourne lead for capital and talent density; Brisbane and Perth show momentum via sector hubs (climate, mining tech). Regional hubs use coworking grants and university incubators.',
  },
  {
    id: 5,
    question: 'Are there compliance or director requirements unique to Australia?',
    answer:
      'Yes—directors must obtain a Director ID, maintain ASIC records, and follow Corporations Act duties. For AI products, add privacy (APPs), consumer law, and sector-specific guidance (e.g. TGA for medtech).',
  },
  {
    id: 6,
    question: 'How does MLAI support Australian founders?',
    answer:
      'MLAI is a not-for-profit community that connects AI practitioners and learners across Australia. It offers a home to meet peers, share learnings, and discover local opportunities.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Who supports Australian founders in 2026?',
      description: 'Aussie Founders Network, state hubs like LaunchVic and Tech Central, and sector labs such as Cicada or Stone & Chalk lead community support.',
    },
    {
      label: 'Where can I research early Australian founders or settlers?',
      description: 'Start with Trove, state archives, and platforms like Findmypast; cross-check names against passenger lists and land records.',
    },
    {
      label: 'How are founders funding early stages now?',
      description: 'Lean on customer pilots, state grants (e.g. MVP Ventures), and the R&D Tax Incentive before larger angel or VC rounds.',
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
          <p>
            <strong>{TOPIC}</strong> touches both the country’s founding story and the present startup scene. In 2026, founders navigate a tight funding environment, evolving AI guidance, and growing community support networks that connect capital-city hubs with regional talent.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>How Australia defines “founder”: from early settlers to today’s startups</h2>
          <p>
            Search results split between historical founders of the nation and modern company builders. That dual meaning shapes intent: some readers want lineage research, others want startup pathways. In 2026, founders typically set up as proprietary limited companies, obtain a Director ID, and comply with Corporations Act duties. For AI products, add privacy (Australian Privacy Principles), consumer law, and sector rules such as TGA for medtech or APRA/APG 230 for financial services.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Context: lineage vs. startup goals"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              If you are researching family history, focus on archival sources and naming conventions. If you are building a company, prioritise compliance setup, market validation, and community ties for credibility.
            </p>
          </ArticleCallout>

          <h2>What networks support Australian founders in 2026?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-893dc24f-4773-4a64-99f0-5b5cd984b2df.jpg?alt=media&token=dd65c246-490b-4dc8-8c57-0c341932fecd" alt="Group of diverse founders collaborating in a vibrant tech startup space, capturing a 90s film vibe." className="w-full rounded-lg my-8" />

          <p>
            The Aussie Founders Network continues to connect Australian entrepreneurs globally. Locally, hubs such as LaunchVic (Melbourne), Tech Central (Sydney), and sector labs like Cicada (deep tech) or Stone & Chalk offer programs and coworking. University incubators and state-backed innovation precincts add mentoring and lab access. MLAI contributes as a not-for-profit community for AI practitioners and learners across Australia, connecting engineers, designers, and AI-curious builders.
          </p>

          <QuoteBlock title="Expert insight" variant="purple">
            “Communities remain the fastest way to validate ideas, meet collaborators, and hear how others navigated grants or procurement in Australia.”
          </QuoteBlock>

          <h2>Notable Australian tech founders shaping 2026</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-daf8f0f2-55d0-4ffa-8a7c-3f0fc7fa730c.jpg?alt=media&token=defcbbfa-1b0b-41e9-b8dd-96d32e898d60" alt="Australian tech founders in a retro 90s film aesthetic, collaborating in a vibrant startup environment." className="w-full rounded-lg my-8" />

          <p>
            Current search interest centres on AI, climate, and fintech founders. Companies like Canva (Melanie Perkins, Cliff Obrecht), Atlassian (Mike Cannon-Brookes, Scott Farquhar), and emerging AI toolmakers signal paths from local to global markets. Newer founders often leverage remote-first teams, R&D Tax Incentive eligibility, and early customer revenue before significant venture rounds.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Map your sector fit (AI, climate, fintech, deep tech) and relevant compliance pathways.' },
              { label: 'Join two communities: one domain-specific (e.g. MLAI for AI) and one general founder network.' },
              { label: 'Line up a grant or customer pilot before pitching angels to reduce dilution.' },
            ]}
            accent="indigo"
          />

          <h3>Balancing capital efficiency and speed</h3>
          <p>
            With venture capital more selective in 2026, Australian founders emphasise paid pilots, export-friendly pricing, and hybrid funding (grants + angels). Revenue discipline and clear governance help retain optionality for later rounds.
          </p>

          <h2>How to trace early Australian founders and family records</h2>
          <p>
            Genealogy queries lead to sources like Findmypast, Trove, and state archives. Start with known surnames, cross-check against passenger lists, land grants, and newspaper notices. Use variant spellings common in colonial records. Verify with multiple sources to avoid conflating similarly named settlers, and note the record year to avoid anachronisms.
          </p>

          <ArticleCallout
            title="Research safeguard"
            variant="info"
            icon={<span className="text-xl">🗂️</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Keep a log of sources (archive, call number, URL) and note the date accessed. When uncertain, treat lineage links as hypotheses until corroborated.
            </p>
          </ArticleCallout>

          <h2>Funding, grants, and governance for founders (Australia, 2026)</h2>
          <p>
            The R&D Tax Incentive remains the anchor for technical work. State grants such as LaunchVic’s programs and NSW MVP Ventures support early builds. Export-focused businesses can explore Austrade support. For governance, maintain a board cadence, director duties, and privacy-by-design for AI data. Transparent model and data provenance helps with procurement, especially in government and regulated sectors.
          </p>

          <QuoteBlock title="Key takeaway" variant="orange">
            “Pair grants and revenue with lean burn; governance and privacy-by-design build trust faster than pitch decks alone.”
          </QuoteBlock>

          <h2>Building inclusive founder communities across Australia’s states</h2>
          <p>
            Inclusion is a gap in many search results. Regional founders often lack proximity to capital but gain from sector clusters (agrifood in WA/SA, climate in QLD). Online meetups and hybrid events bridge time zones. Community codes of conduct, transparent moderation, and clear pathways for newcomers make spaces safer and more sustainable.
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
                <span>Join a founder network plus one domain community (e.g. MLAI for AI builders).</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Align funding: pick one grant, one customer pilot, and set governance basics.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Join the MLAI community to collaborate with fellow AI practitioners in Australia."
              buttonText="Connect with MLAI"
              buttonHref="https://mlai.au/contact"
              note="We’re a not-for-profit community empowering the Australian AI community."
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
