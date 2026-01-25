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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'What is Artificial Intelligence (AI)?'
const CATEGORY = 'australian-ai-ecosystem'
const SLUG = 'what-are-artificial-intelligence'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-21'
const DATE_MODIFIED = '2026-01-21'
const DESCRIPTION = 'A clear, Australian‑context explainer of AI: how it works, types, examples, risks and ethics, plus practical steps to explore responsibly in 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1767c4ce-112a-4466-b4b0-d421beb7e312.jpg?alt=media&token=b3ebd9d9-8bd4-4c62-a5e5-bbf3009e9d99"
const HERO_IMAGE_ALT = 'Teal abstract network nodes representing AI connections'
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
    question: 'What is artificial intelligence in simple terms?',
    answer:
      'Computer systems designed to perform tasks that usually require human intelligence — such as recognising patterns, understanding language, making decisions, or generating content.'
  },
  {
    id: 2,
    question: 'Is AI the same as machine learning?',
    answer:
      'No. AI is the broader field of building intelligent systems. Machine learning (ML) is a subset that learns patterns from data; deep learning is a further subset of ML using neural networks.'
  },
  {
    id: 3,
    question: 'What types of AI are used today?',
    answer:
      'Most real‑world systems are Narrow AI (task‑specific). Techniques include symbolic/rule‑based systems, traditional ML (supervised/unsupervised/reinforcement), and generative AI (models that create text, images, or code).'
  },
  {
    id: 4,
    question: 'Where do I see AI in everyday life?',
    answer:
      'Spam filters, photo categorisation, voice assistants, predictive text, maps and routing, translation, fraud and anomaly detection, and increasingly, summarisation and drafting tools.'
  },
  {
    id: 5,
    question: 'Is AI safe and legal to use in Australia?',
    answer:
      'Yes, with safeguards. Follow your organisation’s policies, the Australian AI Ethics Principles (for responsible use), privacy law obligations (APPs), and secure‑by‑design guidance from cyber.gov.au.'
  },
  {
    id: 6,
    question: 'How can students or career‑changers get started in Australia?',
    answer: (
      <>
        Begin with a clear goal (e.g., data analysis or prototyping), learn basic Python/ML or prompt design, and build a small portfolio project. Connect with local peers — the MLAI community is a friendly place to start.{' '}
        <Link to='https://mlai.au/contact' className='font-semibold text-[--brand] underline-offset-4 hover:underline'>
          Say hello →
        </Link>
      </>
    )
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What is artificial intelligence in simple terms?',
      description: 'Computer systems that perform tasks needing human intelligence—recognising patterns, understanding language, deciding or generating content.'
    },
    {
      label: 'How is AI different from machine learning?',
      description: 'ML is a subset of AI that learns from data; AI is the broader field. Modern AI often uses ML and deep learning to build models.'
    },
    {
      label: 'Is AI safe and legal to use in Australia?',
      description: 'Yes, with safeguards. Follow the Australian AI Ethics Principles, privacy law (APPs), and secure‑by‑design guidance from cyber.gov.au.'
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
    <div className='bg-transparent'>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
        ]}
        title={TOPIC}
        titleHighlight='(2026)'
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <ArticleTocPlaceholder />

        {/* Intro alert - Clean, neutral style */}
        <QuoteBlock variant='purple' icon={<span className='text-xl'>💡</span>}>
          <p className='text-sm text-white'>
            
            This guide is part of our broader series on the Australian AI ecosystem. Prefer to jump ahead?{' '}
            <Link to='/articles' className='font-semibold text-white underline-offset-4 hover:underline'>
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
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange'
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple'
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow'
            }
          ]}
          className='my-10'
        />

        <div className='prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]'>
          <p>
            <strong>{TOPIC}</strong> — In Australia, you’re already surrounded by AI, from spam filters and photo sorting to translation and safer payments. This explainer outlines what AI means in practice, how today’s systems work, the main types you’ll hear about (including generative AI), and the guardrails that matter locally.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>Artificial intelligence in plain English</h2>
          <p>
            Artificial intelligence is the field of building systems that perform tasks we usually associate with human intelligence — recognising patterns, understanding or generating language, recommending options, or making decisions under uncertainty. Most AI in 2026 is <em>narrow</em>: models are trained to do specific tasks very well (e.g., classify emails, draft a first pass of text) rather than possessing open‑ended general intelligence.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description='Access a structured template to apply the steps in this guide.'
            buttonLabel='Get the checklist'
            buttonHref='#'
            accent='purple'
          />

          <ArticleCallout title='Tip: start with the problem, not the model' variant='brand' icon={<span className='text-xl'>💡</span>} className='not-prose'>
            <p className='mt-1 text-gray-800'>
              Define the outcome and constraints (accuracy, privacy, latency, cost) before choosing a tool. This avoids chasing hype and helps you evaluate trade‑offs.
            </p>
          </ArticleCallout>

          <h2>How AI works: data, models, training and inference</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a60aeb05-b909-416f-840f-b541e8acfb2d.jpg?alt=media&token=80e76b0c-b68e-447e-ac59-f5c08a619336" alt="People collaborating in a 90s tech startup, surrounded by computers, illustrating AI concepts and innovation." className="w-full rounded-lg my-8" />

          <p>
            Modern AI relies on data, algorithms and compute. During <strong>training</strong>, a model learns patterns from examples (images, text, audio, tabular data). During <strong>inference</strong>, the trained model applies what it learned to new inputs — classifying, predicting, or generating outputs. For generative models, prompts and safeguards (filters, retrieval, system instructions) shape behaviour.
          </p>
          <h3>Training, inference and prompts: a simple pipeline</h3>
          <p>
            A typical flow: define the task → collect and prepare data (or use a pretrained model) → train or fine‑tune → evaluate on a held‑out set → deploy with monitoring and guardrails (rate limits, content filtering, human review where appropriate). For sensitive data, de‑identify where possible and follow privacy policies.
          </p>

          <ArticleStepList
            title='Practical steps'
            steps={[
              { label: 'Define the task and success measures (quality, safety, cost).' },
              { label: 'Pick a baseline tool/model and trial with a small, de‑identified sample.' },
              { label: 'Measure results, document risks/safeguards, then iterate or pause.' }
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            “Small, well‑measured pilots beat big bang rollouts. Treat models as fallible teammates: verify outputs, log decisions, and keep a human in the loop for high‑impact tasks.”
          </QuoteBlock>

          <h2>Types of AI you’ll hear about (including generative AI)</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-46d58cee-3b92-47d5-8f37-3ca62b92e39a.jpg?alt=media&token=5fee8c5a-317d-4298-9326-628968754b2e" alt="People collaborating in a retro tech startup setting, showcasing the rise of AI and innovation." className="w-full rounded-lg my-8" />

          <p>
            You’ll commonly see three practical buckets:
          </p>
          <ul>
            <li>
              <strong>Symbolic / rule‑based systems:</strong> expert rules and knowledge graphs for transparent logic.
            </li>
            <li>
              <strong>Machine learning:</strong> models learn from data (supervised, unsupervised, reinforcement). Deep learning uses neural networks for vision, speech and language.
            </li>
            <li>
              <strong>Generative AI:</strong> models that produce text, images, audio or code. Useful for drafting, summarising and ideation, but outputs require review.
            </li>
          </ul>
          <p>
            You may also see ‘narrow vs general AI’. Today’s tools are narrow and task‑specific. Be cautious with oversimplified taxonomies (e.g., “four types of AI” lists); they’re popular but not used by practitioners for system design.
          </p>

          <h2>AI vs machine learning vs deep learning — what’s the difference?</h2>
          <p>
            <strong>AI</strong> is the goal: systems that demonstrate useful intelligence. <strong>Machine learning</strong> is a method for achieving that goal by learning patterns from data. <strong>Deep learning</strong> is a subset of ML that stacks many layers (neural networks) to learn complex representations. In practice, when teams say “AI” today, they usually mean ML or deep learning models (including large language models for text).
          </p>

          <h2>Where you’ll see AI in Australia today</h2>
          <p>
            Everyday examples include fraud detection in banking, routing and traffic prediction, assistive accessibility features (speech‑to‑text, captions), translation, document search with semantic retrieval, and drafting/summarisation in productivity tools. In industry, teams use computer vision for inspection, forecasting for supply chains, and chat interfaces for knowledge bases — all with oversight.
          </p>

          <h2>Risks, ethics and Australian guidance</h2>
          <p>
            Responsible use means understanding limitations, testing for bias, protecting privacy, and building secure systems. In Australia, teams commonly reference the Australian AI Ethics Principles (fairness, privacy, transparency, accountability), privacy obligations under the Australian Privacy Principles (APPs), and secure‑by‑design guidance from <Link to='https://www.cyber.gov.au' target='_blank' rel='noreferrer' className='underline underline-offset-4'>cyber.gov.au</Link>. For high‑impact use cases, keep humans in the loop and document decisions.
          </p>

          <h2>Turn curiosity into a small experiment</h2>
          <p>
            Pick one task where AI could remove friction — summarising internal notes, classifying tickets, or improving search. Run a time‑boxed pilot with clear success metrics, apply basic guardrails (privacy, safety checks), and review outcomes with your team. Simple, safe experiments build understanding faster than theory alone.
          </p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]'>3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className='my-12 not-prose'>
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body='Get practical recommendations based on your goals, time, and experience level.'
              buttonText='Get recommendations'
              buttonHref='https://mlai.au/contact'
              note='You can filter by topic, format (online/in‑person), and experience level.'
            />
          </div>

          <ArticleReferences
            heading='Sources'
            description='Curated references for further reading (accessed Jan 2026).'
            headingId='references'
            references={[
              {
                id: 1,
                href: 'https://www.ibm.com/think/topics/artificial-intelligence',
                title: 'What Is Artificial Intelligence (AI)?',
                publisher: 'IBM',
                category: 'guide',
                description: 'Introductory overview and core concepts.'
              },
              {
                id: 2,
                href: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
                title: 'Artificial intelligence',
                publisher: 'Wikipedia',
                category: 'analysis',
                description: 'Encyclopaedia‑style summary of history, approaches and applications.'
              },
              {
                id: 3,
                href: 'https://cloud.google.com/learn/what-is-artificial-intelligence',
                title: 'What is Artificial Intelligence (AI)?',
                publisher: 'Google Cloud',
                category: 'guide',
                description: 'High‑level explanation with contemporary examples.'
              },
              {
                id: 4,
                href: 'https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/an-introduction-to-artificial-intelligence',
                title: 'An introduction to artificial intelligence',
                publisher: 'Cyber.gov.au',
                category: 'government',
                description: 'Australian secure‑by‑design perspective on AI systems.'
              },
              {
                id: 5,
                href: 'https://www.oaic.gov.au/privacy/the-privacy-act',
                title: 'The Privacy Act',
                publisher: 'OAIC',
                category: 'government',
                description: 'Privacy obligations relevant to handling personal information in Australia.'
              }
            ]}
          />
        </div>

        <AuthorBio author={authorDetails} />

        <div className='mt-12'>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
