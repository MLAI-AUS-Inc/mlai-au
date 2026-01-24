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

const TOPIC = 'Why is artificial intelligence bad?'
const CATEGORY = 'australian-ai-ecosystem'
const SLUG = 'why-is-artificial-intelligence-bad'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-21'
const DATE_MODIFIED = '2026-01-21'
const DESCRIPTION = 'A plain‑English look at AI’s downsides—bias, privacy, misinformation and job impacts—and how Australia can manage the risks in 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f9e5b8be-754b-4be7-90f9-0cfe7f226d5d.jpg?alt=media&token=83d585bc-f5e8-4536-9079-a6e146abf01a"
const HERO_IMAGE_ALT = 'Abstract AI circuitry with a cautionary tone'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Is AI illegal in Australia?',
    answer:
      'No. AI isn\'t illegal in Australia, but some uses can be unlawful if they breach existing laws (e.g., privacy, consumer, discrimination, IP). Whether a use is allowed depends on the context and controls you put in place.'
  },
  {
    id: 2,
    question: 'Does using public AI tools put my data at risk?',
    answer: (
      <>
        Yes, potentially. Avoid pasting confidential or personal information into public tools. Check the provider\'s data retention and training settings, use enterprise controls where possible, and apply minimisation and redaction. For Australian context, see the{' '}
        <a href="https://www.oaic.gov.au/privacy/australian-privacy-principles" target="_blank" rel="noreferrer noopener">Australian Privacy Principles (APPs)</a> and your organisation\'s security policies.
      </>
    )
  },
  {
    id: 3,
    question: 'Are deepfakes illegal in Australia?',
    answer: (
      <>
        Harmful deepfakes can breach existing laws (e.g., image‑based abuse offences at state/territory level, defamation, harassment). The{' '}
        <a href="https://www.esafety.gov.au/" target="_blank" rel="noreferrer noopener">eSafety Commissioner</a> has takedown powers for some content. Rules are evolving—check current guidance and seek legal advice for specific cases.
      </>
    )
  },
  {
    id: 4,
    question: 'Will AI take my job?',
    answer:
      'AI usually automates tasks within roles rather than entire occupations. Impact varies by sector. In practice, redesigning work, reskilling, and using AI as a copilot can offset displacement for many workers.'
  },
  {
    id: 5,
    question: 'Is AI always biased?',
    answer:
      'AI can amplify biases present in data or in how systems are designed and deployed. Rigorous data practices, testing, diverse evaluation sets, and human review can reduce (not eliminate) bias risk.'
  },
  {
    id: 6,
    question: 'What frameworks should teams in Australia use to manage AI risk?',
    answer: (
      <>
        Start with recognised frameworks:{' '}
        <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer noopener">NIST AI RMF 1.0</a>,{' '}
        ISO/IEC 23894 (AI risk management) and ISO/IEC 42001 (AI management systems). Align with the APPs for privacy, and maintain auditable processes (impact assessments, testing, logging, human‑in‑the‑loop).
      </>
    )
  },
  {
    id: 7,
    question: 'How should we handle First Nations data and AI?',
    answer: (
      <>
        Apply Indigenous Data Sovereignty principles (e.g., CARE with FAIR), obtain proper consent, and ensure meaningful governance and benefit sharing. See guidance from bodies like AIATSIS and relevant community organisations.
      </>
    )
  },
  {
    id: 8,
    question: 'Where can I report harmful or scam AI content?',
    answer: (
      <>
        Use platform reporting tools first. In Australia, you can also engage the{' '}
        <a href="https://www.esafety.gov.au/" target="_blank" rel="noreferrer noopener">eSafety Commissioner</a> for online harms, the{' '}
        <a href="https://www.oaic.gov.au/" target="_blank" rel="noreferrer noopener">OAIC</a> for serious privacy issues, and the{' '}
        <a href="https://www.accc.gov.au/" target="_blank" rel="noreferrer noopener">ACCC</a> for scams and misleading conduct.
      </>
    )
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'A balanced view for Australia in 2026: privacy expectations under the APPs, risk‑based governance is emerging, and practical controls can reduce harm in real deployments.',
  items: [
    {
      label: 'Is AI always harmful?',
      description: 'No—risk depends on the use case and controls. With guardrails, oversight, and testing, many applications are low risk.'
    },
    {
      label: 'Will AI take my job?',
      description: 'AI automates tasks more than whole jobs. Impacts vary by role; redesign and reskilling can offset displacement.'
    },
    {
      label: 'Is AI regulated in Australia?',
      description: 'Yes via existing laws (privacy, consumer, discrimination) with risk‑based guidance emerging. Check OAIC and government updates.'
    }
  ]
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
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
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> — If you\'ve searched this, you\'re likely seeing headlines about deepfakes, job losses, and biased algorithms. This article separates signal from noise: the real risks, what Australia is doing about them, and practical ways to use AI safely.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION: PAA-derived */}
          <h2>Why do people say AI is bad?</h2>
          <p>
            Most concerns fall into a few buckets: privacy leaks and misuse of personal data; unfair or biased outcomes; misinformation and deepfakes; safety, reliability and security failures; environmental and compute costs; and concentration of power. These are not theoretical—each has real-world examples. The good news: many risks can be reduced with better design, guardrails, and oversight.
          </p>
          <p>
            Importantly, <em>“AI” is not one thing</em>. Risk depends on the use case, model type, data, and context. A content assistant for drafting emails has a different risk profile to an AI system screening rental applications or triaging health queries.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Tip: Separate ‘capability’ from ‘harm’"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Ask two questions: 1) What can this model do? 2) What could go wrong for people if we deploy it? The second question drives your mitigations and review process.
            </p>
          </ArticleCallout>

          {/* SECTION: Competitor pattern — risks list */}
          <h2>What are the biggest risks right now?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-15c7e783-7498-45e8-98eb-315e5624a333.jpg?alt=media&token=644cd72c-1009-4168-9220-f16699472dde" alt="Vibrant 90s film aesthetic capturing a dynamic tech startup team in an innovative workspace." className="w-full rounded-lg my-8" />

          <p>
            Bias and discrimination: models learn from data that reflect society\'s historical patterns. Without careful curation and testing, outputs can skew against protected groups. Use diverse evaluation sets, document limitations, and require human review for high-stakes decisions.
          </p>
          <p>
            Privacy and data protection: sensitive inputs can be retained or inferred. Under Australia\'s <a href="https://www.oaic.gov.au/privacy/australian-privacy-principles" target="_blank" rel="noreferrer noopener">APPs</a>, organisations must collect only what\'s necessary, get appropriate consent, secure personal information, and be transparent about use.
          </p>
          <p>
            Misinformation and deepfakes: generative models can produce persuasive but false content at scale. Watermarking, provenance tools, and platform policies help, but your best defence is layered verification and human oversight for high-impact content.
          </p>
          <p>
            Safety, reliability and security: hallucinations, prompt injection, data poisoning, and model theft are active threats. Use threat modelling, adversarial testing, content filters, rate limiting, and retrieval strategies to bound behaviour.
          </p>
          <p>
            Power concentration and access: a small number of firms control advanced models and compute, which can create dependency risks for governments, schools, and SMEs. Prefer portable patterns (standardised interfaces, data export) and avoid single-vendor lock-in.
          </p>

          <h3>Risks that often get overlooked</h3>
          <p>
            Environmental footprint: training and running models consumes energy and water; the impact varies by data centre mix, efficiency, and workload. Measure before you scale—smaller or distilled models can often meet the need with far less cost and carbon.
          </p>
          <p>
            Indigenous data and cultural harms: data scraped from the web can include cultural knowledge that requires consent and governance. Apply Indigenous Data Sovereignty principles and seek community-led guidance.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Define the outcome and risk level for the use case' },
              { label: 'Minimise data: remove personal/sensitive info where possible' },
              { label: 'Choose lower‑risk patterns (e.g., RAG with citations, not open‑ended generation) \u2014 use content filters' },
              { label: 'Test for bias, reliability and security; keep an audit trail' },
              { label: 'Keep a human in the loop for high‑impact decisions' }
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Treat AI like any powerful tool: start small, measure risks, and scale only when you can show it\'s safe, fair, and useful for people.”
          </QuoteBlock>

          {/* SECTION: PAA-derived */}
          <h2>Will AI take jobs in Australia?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6b96f637-e3ea-4a68-b97c-523b23cb22a0.jpg?alt=media&token=763364f1-81d9-46aa-ae40-815889390b15" alt="90s film-style photo of diverse professionals collaborating in a tech startup office setting." className="w-full rounded-lg my-8" />

          <p>
            In the near term, AI reassigns tasks more than it removes entire occupations. Roles heavy on routine information processing are most exposed; roles centred on interpersonal work, safety-critical judgement, or hands-on care see augmentation first. Organisations that pair AI with training and job redesign usually see better outcomes than \"replace-first\" approaches.
          </p>
          <h3>Short‑term vs long‑term</h3>
          <p>
            Short‑term: productivity tools shift how work is done (drafting, summarising, coding assistance). Long‑term: some roles will change substantially, but new roles emerge around data, oversight, and integration. For individuals, focus on durable skills: domain expertise, critical thinking, and the ability to supervise AI systems.
          </p>

          {/* SECTION: PAA-derived, AU context */}
          <h2>Is AI regulated in Australia?</h2>
          <p>
            Australia currently manages many AI risks through existing laws: privacy (APPs), consumer law (misleading and deceptive conduct), discrimination law, IP, and online safety. Government has consulted on additional, risk‑based measures for high‑risk AI. As at early 2026, check current updates from the Department of Industry, Science and Resources and the OAIC before making policy decisions.
          </p>
          <p>
            For organisations, a practical approach is to adopt recognised frameworks (e.g., NIST AI RMF, ISO/IEC 23894 and 42001), run impact assessments, and keep documentation (data lineage, evaluation results, incident logs) so you can demonstrate responsible practice under scrutiny.
          </p>

          {/* SECTION: PAA-derived, education focus */}
          <h2>Is AI bad for students and schools?</h2>
          <p>
            Not inherently, but unmanaged use can enable cheating, expose student data, or normalise inaccurate content. Australia\'s education sector has published guidance (e.g., a generative AI framework for schools). Practical controls include clear classroom rules, privacy‑respecting tools, watermark/provenance checks, and assessments that value process as much as product.
          </p>

          {/* SECTION: Closing, action oriented */}
          <h2>If you\'re worried about harm, here\'s how to respond</h2>
          <p>
            Start with a small, low‑risk pilot and measure outcomes. Write down the risks you care about (privacy, bias, reliability, safety), choose technical and process mitigations, and assign clear accountability. Review frequently—models, guidance, and threats evolve quickly.
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
                <span>Run a quick risk screen on your highest‑impact use case.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Set a small pilot with human oversight and clear success criteria.</span>
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
              buttonHref="/contact"
              note="We\'re a not‑for‑profit community—friendly, practical support."
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
