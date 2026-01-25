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

const TOPIC = 'How to get into venture capital'
const CATEGORY = 'ai-learning-fundamentals'
const SLUG = 'how-to-get-into-venture-capital'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-22'
const DATE_MODIFIED = '2026-01-22'
const DESCRIPTION = 'An AU-focused, practical path to break into venture capital: hiring signals, entry routes, track record, and a 90-day plan.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d23bd6be-5c90-4bb8-bc19-02189749e2c6.jpg?alt=media&token=97b584da-e610-47a2-b038-fc9c7ea3ce3f"
const HERO_IMAGE_ALT = 'Small team reviewing an investment memo on a laptop with charts'
const FEATURED_FOCUS = 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Do I need an MBA to get into VC in Australia?',
    answer:
      'No. Australian VC firms hire operators (product, engineering, data/AI), founders, analysts and consultants. An MBA can help with signalling and networks, but a visible track record (memos, thesis, founder references) matters more.',
  },
  {
    id: 2,
    question: 'What entry-level roles exist?',
    answer:
      'Analyst and Investment Associate roles are the most common. Some firms offer internships or fellowships. Platform roles (community, portfolio success, talent) can also be an entry point that later transitions into investing.',
  },
  {
    id: 3,
    question: 'How can I build “deal sense” without a VC job?',
    answer: (
      <>
        Publish short investment memos, construct a simple pipeline (e.g., 20–40 startups you follow), and run small founder interviews. If you can invest personally, be mindful of Australia’s wholesale investor rules under the Corporations Act 2001 (Cth) s708. If not, simulate: scorecards, theses, and public write‑ups.
      </>
    ),
  },
  {
    id: 4,
    question: 'Do I need a licence to work in VC?',
    answer: (
      <>
        VC firms typically operate under an Australian Financial Services Licence (AFSL) or through authorised representatives. Individual junior investors generally don’t hold a personal AFSL, but you must follow firm policies and law. See ASIC’s AFSL guidance:{' '}
        <a href='https://asic.gov.au/regulatory-resources/afsl/' target='_blank' rel='noreferrer'>asic.gov.au/regulatory-resources/afsl/</a>.
      </>
    ),
  },
  {
    id: 5,
    question: 'Where do VC jobs get posted in Australia?',
    answer:
      'Fund websites, LinkedIn, university careers portals, and community newsletters. Many roles are networked first, so warm references from founders or portfolio operators materially increase your chances.',
  },
  {
    id: 6,
    question: 'How competitive is VC in Australia?',
    answer:
      'Very. Teams are small and roles open infrequently. Expect multi‑round interviews focused on your thesis, founder empathy, and written memos. A visible body of work often differentiates candidates with similar CVs.',
  },
  {
    id: 7,
    question: 'Is AI expertise useful to VC teams?',
    answer:
      'Yes. Funds increasingly value genuine product and ML/AI experience—especially the ability to evaluate use‑cases, moat, data advantages, and model/infra trade‑offs. Translate your technical depth into clear commercial assessments.',
  },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Do you need an MBA to get into VC?',
      description: 'No. Helpful for networks, but Australian firms prioritise a visible track record—memos, thesis, and founder references.',
    },
    {
      label: 'How to get VC experience without a fund job?',
      description: 'Publish investment memos, join internships/fellowships, scout or simulate deals, and interview founders ethically.',
    },
    {
      label: 'How competitive are VC roles in Australia?',
      description: 'Very. Teams are small and roles open rarely; strong writing, thesis depth, and credible references stand out.',
    },
  ],
}

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true },
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className='bg-transparent'>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor='purple'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <ArticleTocPlaceholder />

        <div className='prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]'>
          <p>
            <strong>{TOPIC}</strong> — Australia’s VC teams are small and roles open infrequently. Your advantage is a visible body of work: crisp memos, a focused thesis, and genuine founder empathy. This guide distils common hiring signals, Australian entry paths, and a 90‑day plan you can start today.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName='my-10'
          />

          <h2>What Australian VC firms actually hire for in 2026</h2>
          <p>
            Patterns from public job ads and hiring updates are consistent: clear written thinking (investment memos), founder empathy, sector insight (often AI, climate, deep tech), and disciplined sourcing. Technical literacy helps—especially the ability to assess product, data advantages, and competitive moats—then translate that into a concise, defensible view.
          </p>
          <ul>
            <li>Evidence of judgment: 5–10 public memos beat 5–10 generic coffee chats.</li>
            <li>Networks that compound: warm intros from respected founders or operators.</li>
            <li>Thesis depth: a 3–5 page, AU‑specific thesis with pipeline examples.</li>
            <li>Craft: crisp writing, respectful outreach, confidentiality habits.</li>
          </ul>

          <ArticleResourceCTA
            eyebrow='Download'
            title={`Get the checklist for ${TOPIC}`}
            description='Practical template to apply the concepts immediately.'
            buttonLabel='Download now'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout title='Make your work observable' variant='brand' icon={<span className='text-xl'>💡</span>}>
            Publish one short memo a week for 8–10 weeks. Keep a consistent structure (problem, product, market, moat, risks, verdict). Link your best three in applications.
          </ArticleCallout>

          <h2>Entry paths that actually work in Australia</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-94dc3c22-e744-4ba1-85ab-c70faddc97e1.jpg?alt=media&token=c1758f7b-a1d4-4b1f-a588-b697ad10dfe9" alt="People collaborating in a vibrant 90s tech startup setting, showcasing innovative entry paths in Australia." className="w-full rounded-lg my-8" />

          <p>
            There isn’t one doorway into VC. In Australia, successful candidates typically come through one of four routes. Choose the path that aligns to your current experience and make your progress easy to verify.
          </p>
          <h3>Analyst/Associate via finance or consulting</h3>
          <p>
            Classic entry: strong analytical skills, structured writing, and exposure to transactions or markets. Strengthen with a sector thesis (e.g., AI tooling for SMEs, climate software) and founder references.
          </p>
          <h3>Operator‑to‑investor (founder, product, engineering, data/AI)</h3>
          <p>
            If you have shipped products or led teams, emphasise customer insight, speed, and your pattern recognition across launches. Translate build experience into investment signals and post‑investment support.
          </p>
          <h3>Scout/angel/investment club</h3>
          <p>
            Some investors spot talent through quality referrals and memos. If you can legally invest, start tiny and document learning. If you can’t, simulate with public memos and diligence checklists; be mindful of Australia’s wholesale investor rules (Corporations Act s708).
          </p>
          <h3>University, accelerator, or CVC programmes</h3>
          <p>
            Fellowships, internships, accelerator ops, and corporate venture teams offer deal exposure and rigorous screening practice. Seek roles that let you interview founders, write memos, and sit in on IC discussions.
          </p>

          <h2>Build a track record without writing a cheque</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8cade6f7-dfa0-416a-a8e7-40fad83ce82d.jpg?alt=media&token=4c60e24a-0a2e-4fa2-a691-eebccfc209f0" alt="Nostalgic 90s film vibe featuring diverse people collaborating in a dynamic tech startup environment." className="w-full rounded-lg my-8" />

          <p>
            You don’t need a fund title to demonstrate judgment. Show your work: structured memos, a small pipeline, and founder conversations. Quality beats quantity.
          </p>
          <ArticleStepList
            title='Practical steps'
            steps={[
              'Pick one AU‑relevant thesis (e.g., applied AI in healthcare) and outline 5–7 signals you believe matter.',
              'Publish 6–10 short memos using a consistent, comparable template; include risks and a verdict.',
              'Run 8–12 respectful founder interviews (off‑the‑record), summarising learnings without disclosing confidential info.',
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Evidence over claims' variant='purple'>
            Most Australian VC teams are small and roles open rarely. A public trail of thoughtful memos and founder references is the strongest differentiator.
          </QuoteBlock>

          <h2>Where to find roles and real deal flow in Australia</h2>
          <p>
            Roles: check fund websites, LinkedIn, and university portals, and follow partners on social channels. Deal flow: attend local meetups, demo days, and technical communities; ask founders thoughtful, specific questions and follow up with concise notes. MLAI is a not‑for‑profit community that connects Australian AI builders—use communities like this to learn responsibly and meet peers.
          </p>
          <ul>
            <li>Jobs: fund career pages, LinkedIn job alerts, university/accelerator newsletters.</li>
            <li>Signals: GitHub activity, open‑source traction, early design partners, customer references.</li>
            <li>Etiquette: always ask permission before sharing anything beyond public info.</li>
          </ul>

          <AudienceGrid
            heading='Who this helps'
            cards={[
              {
                title: 'Founders & Teams',
                description: 'For leaders validating ideas, seeking funding, or managing teams.',
                icon: <RocketLaunchIcon className='h-6 w-6' />,
                variant: 'orange',
              },
              {
                title: 'Students & Switchers',
                description: 'For those building portfolios, learning new skills, or changing careers.',
                icon: <AcademicCapIcon className='h-6 w-6' />,
                variant: 'purple',
              },
              {
                title: 'Community Builders',
                description: 'For workshop facilitators, mentors, and ecosystem supporters.',
                icon: <UsersIcon className='h-6 w-6' />,
                variant: 'yellow',
              },
            ]}
          />

          <h2>MBA, masters or certificates: what actually helps?</h2>
          <p>
            Degrees can expand networks and signal commitment, but they’re neither necessary nor sufficient. Prioritise experiences that make your judgment legible: shipping products, conducting founder interviews, publishing memos, and contributing to a clear thesis. If you pursue study, anchor it to a concrete output (a portfolio of memos, a research project, or an internship).
          </p>

          <h2>Compliance, ethics and conflicts (AU basics)</h2>
          <p>
            VC firms operate within Australian financial services law and internal policies. Expect confidentiality obligations, conflict‑of‑interest disclosures, and careful handling of non‑public information. Many firms hold an AFSL (or operate via authorised reps). Junior investors focus on research and diligence under supervision. This article is general information—seek independent advice for your situation.
          </p>
          <ul>
            <li>AFSL overview: <a href='https://asic.gov.au/regulatory-resources/afsl/' target='_blank' rel='noreferrer'>asic.gov.au/regulatory-resources/afsl/</a></li>
            <li>Wholesale investor concepts (Corporations Act 2001 (Cth) s708) if you ever invest personally—get legal advice first.</li>
            <li>VC programme context: Australia recognises venture capital limited partnership structures; see government resources for current settings.</li>
          </ul>

          <MLAITemplateResourceCTA />

          <h2>A 90‑day plan to move toward VC</h2>
          <p>
            Commit to a cadence you can keep. In three months you can build credible, visible momentum.
          </p>
          <ol>
            <li><strong>Weeks 1–2:</strong> Pick one thesis. Draft a 2–3 page brief and a memo template.</li>
            <li><strong>Weeks 3–8:</strong> Publish six memos (one per week). Do three structured founder interviews.</li>
            <li><strong>Weeks 9–12:</strong> Consolidate into a 4–5 page thesis update, include pipeline and learnings. Ask two founders and one operator for feedback and a short reference.</li>
          </ol>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body='Join the MLAI community to collaborate with fellow AI practitioners in Australia.'
            buttonText='Get recommendations'
            buttonHref='/contact'
            note='You can filter by topic, format (online/in-person), and experience level.'
          />
        </div>
        <ArticleFAQ items={faqItems} />

        <ArticleReferences
          heading='Sources'
          description='Official and foundational references for Australian settings.'
          headingId='references'
          references={[
            {
              id: 1,
              href: 'https://asic.gov.au/regulatory-resources/afsl/',
              title: 'Australian Financial Services Licence (AFSL) overview',
              publisher: 'ASIC',
              category: 'government',
              description: 'Regulatory guidance on AFS licensing in Australia.'
            },
            {
              id: 2,
              href: 'https://www.legislation.gov.au/Series/C2004A01268',
              title: 'Corporations Act 2001 (Cth), s708 – Offers without disclosure',
              publisher: 'Federal Register of Legislation',
              category: 'government',
              description: 'Wholesale/sophisticated investor concepts relevant to private offers.'
            },
            {
              id: 3,
              href: 'https://www.industry.gov.au/',
              title: 'Venture capital programs (overview)',
              publisher: 'Department of Industry, Science and Resources',
              category: 'government',
              description: 'Background on Australian venture and innovation programs (overview page; check current settings).'
            },
          ]}
        />

        <ArticleDisclaimer />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
