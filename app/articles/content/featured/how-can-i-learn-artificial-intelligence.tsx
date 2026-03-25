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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How can I learn artificial intelligence?'
const CATEGORY = 'australian-ai-ecosystem'
const SLUG = 'how-can-i-learn-artificial-intelligence'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-21'
const DATE_MODIFIED = '2026-01-21'
const DESCRIPTION = 'A practical Australian path to learn AI: foundations, maths/coding, study options, projects, privacy, costs, timelines, and communities.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1049bac6-f2d7-498f-980d-6509040136eb.jpg?alt=media&token=af776564-016c-4863-9467-a5ad38e5f5c6"
const HERO_IMAGE_ALT = 'Abstract teal circuit pattern representing an AI learning path'
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
    question: 'Can I learn AI without knowing how to code?',
    answer:
      'Yes, you can learn concepts, prompt engineering, and use low/no‑code tools. For technical roles (ML engineer/data scientist), basic Python is expected. Start with notebooks (Google Colab, Jupyter) and learn just‑in‑time.'
  },
  {
    id: 2,
    question: 'What maths do I need for AI?',
    answer:
      'Start with data literacy and statistics (mean, variance, distributions), then light linear algebra (vectors/matrices) and probability. You can learn these alongside projects; you don’t need a full calculus refresher to begin.'
  },
  {
    id: 3,
    question: 'What kind of laptop do I need in 2026?',
    answer:
      'A recent CPU with 8–16 GB RAM is fine for learning and classic ML. Use cloud notebooks/GPUs when needed. Free tiers and quotas change frequently (as at 2026), so check provider terms before relying on them.'
  },
  {
    id: 4,
    question: 'How long does it take to learn AI?',
    answer:
      'With 5–7 hours/week, many learners cover fundamentals in 6–8 weeks and build a small portfolio in 3–6 months. Timelines vary by background, goals, and study intensity.'
  },
  {
    id: 5,
    question: 'Are certificates worth it in Australia?',
    answer:
      'Short courses and micro‑credentials can help structure learning and signal progress, but portfolios and demonstrated projects matter most to many employers. Focus on real, reviewable work and clear documentation.'
  },
  {
    id: 6,
    question: 'What about privacy and Responsible AI in Australia?',
    answer: (
      <>
        Use privacy by design: minimise data, avoid sensitive/identifiable data, and document limitations. For current guidance, refer to the Office of the Australian Information Commissioner (OAIC) and your organisation’s policies (as at 2026). See{' '}
        <a href='https://www.oaic.gov.au' target='_blank' rel='noopener noreferrer'>oaic.gov.au</a>.
      </>
    )
  },
  {
    id: 7,
    question: 'Do I have to learn deep learning before using generative AI?',
    answer:
      'No. Start with fundamentals (data, evaluation, prompt safety). Learn deep learning when your projects require it. Understanding limitations and evaluation often matters more than training large models from scratch.'
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What should I learn first for AI?',
      description: 'Start with Python, notebooks, and data literacy (Pandas), then core ML/GenAI concepts and simple evaluation.'
    },
    {
      label: 'Do I need maths or coding?',
      description: 'Not to start. For technical roles, learn basic Python plus statistics/linear algebra alongside projects.'
    },
    {
      label: 'How long does it take?',
      description: 'With 5–7 hrs/week: 6–8 weeks for fundamentals; 3–6 months for a small portfolio. Timelines vary.'
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
            
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
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
            <strong>{TOPIC}</strong> — You don’t need a PhD to start. In Australia (2026), most people progress fastest by learning basic Python and data literacy, building a small
            project in a domain they care about, sharing results, and practising Responsible AI habits from day one.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION: PAA — What should I learn first? */}
          <h2>What should I learn first for AI?</h2>
          <p>
            Focus on practical foundations you can apply immediately:
          </p>
          <ul>
            <li><strong>Python + notebooks:</strong> Jupyter or Google Colab for quick experiments.</li>
            <li><strong>Data literacy:</strong> loading, cleaning, and exploring data with Pandas/NumPy; plotting basics.</li>
            <li><strong>Core ML ideas:</strong> train/test split, evaluation (accuracy, precision/recall), overfitting, iteration.</li>
            <li><strong>GenAI basics:</strong> prompt writing, safety, hallucination checks, and simple evaluation.</li>
          </ul>
          <p>
            Keep a mental model of the loop: <em>problem → data → model/tool → evaluate → improve</em>. This is the same for classic ML and generative AI.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description='Access a structured template to apply the steps in this guide.'
            buttonLabel='Get the checklist'
            buttonHref='/articles'
            accent='purple'
          />

          <ArticleCallout
            title='Pick a problem you genuinely care about'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
            className='not-prose'
          >
            <p className='mt-1 text-gray-800'>
              You’ll learn faster if your practice project matters to you (e.g., summarising policy PDFs, analysing sports stats, or batching admin tasks). Make the dataset small so you can iterate quickly.
            </p>
          </ArticleCallout>

          {/* SECTION: PAA — Do I need maths or coding? */}
          <h2>Do I need maths or coding to learn AI?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-af337c0c-b67e-4790-bb6c-77f76de5fa02.jpg?alt=media&token=06faa127-111b-44dc-8750-fed1bbde6dcf" alt="Group of diverse individuals collaborating in a retro tech startup environment with vintage 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            You can start without both, but the more technical your goal, the more you’ll rely on them. For non‑technical roles (e.g., product or operations), focus on data literacy, evaluation, and safe tool use. For technical roles, learn Python and a little linear algebra and statistics alongside projects.
          </p>
          <h3>If you don’t code yet</h3>
          <p>
            Spend two weeks with Python basics (variables, lists, functions) and notebooks. Learn just enough Pandas to load a CSV and make a chart. Automate one boring task.
          </p>
          <h3>If you’re comfortable coding</h3>
          <p>
            Add scikit‑learn for classic ML and try a tiny end‑to‑end workflow. For GenAI, learn prompt patterns, retrieval‑augmented generation (RAG) basics, and simple evals.
          </p>

          <ArticleStepList
            title='Practical steps'
            steps={[
              { label: 'Define a clear goal (what should the model or tool help you decide/do?)' },
              { label: 'Choose one stack: Python + notebooks + Pandas + scikit‑learn (starter) or a GenAI SDK' },
              { label: 'Find a small dataset (public or synthetic); write your first baseline' },
              { label: 'Evaluate, document trade‑offs, and share results (README + screenshots)' },
              { label: 'Ask for feedback from a local community; iterate once more' }
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Expert insight' variant='purple'>
            “The fastest learners keep projects small, measure results honestly, and share progress for feedback. Ship something imperfect, then improve it.”
          </QuoteBlock>

          {/* SECTION: Choose a learning path */}
          <h2>Choose your path: self‑paced vs Australian qualifications</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-031434c3-6229-4046-a050-4bdf000b7c7b.jpg?alt=media&token=cd22c3a9-a966-41a8-a318-869a9be1d29f" alt="People in a tech startup collaborate, embodying the exploration of self-paced vs Australian qualifications. 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            You have three common routes in Australia (as at 2026):
          </p>
          <ul>
            <li><strong>Self‑paced online:</strong> global providers (e.g., vendor academies, MOOCs) for flexible fundamentals and applied projects.</li>
            <li><strong>Australian micro‑credentials:</strong> short, stackable courses from universities and TAFE for structured learning and assessment.</li>
            <li><strong>Formal degrees/grad certs:</strong> deeper theory and signals for research‑heavy roles; longer timelines and higher cost.</li>
          </ul>
          <h3>How to decide</h3>
          <ul>
            <li><strong>Time and budget:</strong> start self‑paced if you need flexibility; add a micro‑credential if you want assessed work.</li>
            <li><strong>Portfolio needs:</strong> pick options with project work, code reviews, and peer feedback.</li>
            <li><strong>Recognition:</strong> check whether the program offers a statement of attainment or credit pathways.</li>
          </ul>

          {/* SECTION: Projects and GPUs */}
          <h2>Build a project portfolio (even without a GPU)</h2>
          <p>
            You can learn a lot without training big models. Use small datasets and pre‑trained models, and rely on cloud notebooks for bursts of compute. For data, try public sources (e.g., data.gov.au, ABS) or create synthetic data when privacy is a concern.
          </p>
          <ul>
            <li><strong>Classic ML:</strong> tabular datasets + scikit‑learn; aim for explainability and evaluation.</li>
            <li><strong>GenAI:</strong> summarise documents, build a FAQ bot with RAG, or prototype a content workflow. Track quality, cost, and safety.</li>
            <li><strong>Reproducibility:</strong> package your work with a README, environment file, and example inputs/outputs.</li>
          </ul>

          {/* SECTION: Responsible AI */}
          <h2>Responsible and private by default: Australian expectations</h2>
          <p>
            Australia’s privacy and safety expectations emphasise data minimisation, transparency, and accountability. Treat personal or sensitive data with care, prefer public or synthetic datasets, and document known limitations. Check current OAIC guidance and your organisation’s policies (as at 2026).
          </p>

          {/* SECTION: Time and cost */}
          <h2>How long does it take — and what does it cost?</h2>
          <p>
            Timelines and costs vary widely. A common pattern is 6–8 weeks for fundamentals (5–7 hrs/week), 3–6 months to complete 2–3 portfolio projects, and 6–12 months to be competitive for junior technical roles. Self‑paced options can be low‑cost; assessed micro‑credentials and degrees cost more but may offer recognition.
          </p>

          {/* SECTION: Community */}
          <h2>Connect locally: meetups and communities in Australia</h2>
          <p>
            Learning accelerates when you share progress and get feedback. Look for Australian AI meetups, university clubs, hack days, and online groups. If you’re AI‑curious or already building, you’re welcome in the MLAI community.
          </p>

          {/* SECTION PATTERN: Closing */}
          <h2>Turn learning into momentum</h2>
          <p>
            Keep your loop small: plan → build → evaluate → share → improve. Pick problems that matter, protect privacy, and ask for feedback early. Consistency beats intensity.
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
              body='Join the MLAI community to collaborate with fellow AI practitioners in Australia.'
              buttonText='Get recommendations'
              buttonHref='/contact'
              note='You can filter by topic, format (online/in‑person), and experience level.'
            />
          </div>
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
