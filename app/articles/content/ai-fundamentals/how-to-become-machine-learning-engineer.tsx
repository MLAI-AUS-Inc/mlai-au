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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to become a Machine Learning Engineer in Australia'
export const CATEGORY = 'ai-fundamentals'
export const SLUG = 'how-to-become-machine-learning-engineer'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-23'
export const DATE_MODIFIED = '2026-01-23'
export const DESCRIPTION = 'A practical, Australia‑focused path into ML engineering in 2026: skills, education options, portfolio, certifications, job search, and a 90‑day plan.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4db8401a-a8e5-4f7c-a183-9f1f5a3fac71.jpg?alt=media&token=87457c20-1ffb-4a1b-8a0d-20096b1b9546"
const HERO_IMAGE_ALT = 'Machine learning engineer working with code and graphs on screen'
export const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Do I need a degree to become a machine learning engineer in Australia?',
    answer:
      "A relevant degree (computer science, software engineering, data science, maths) helps but isn't strictly required. Employers increasingly accept strong portfolios, production experience, and cloud skills as alternatives."
  },
  {
    id: 2,
    question: 'How long does it take to switch into ML engineering?',
    answer:
      'With focused effort, many career switchers reach entry‑level readiness in 6–12 months. Expect longer timelines part‑time. Real, shipped projects and MLOps basics matter more than course counts.'
  },
  {
    id: 3,
    question: 'Which programming languages should I learn first?',
    answer:
      'Start with Python (NumPy, pandas, scikit‑learn, PyTorch/TensorFlow) and SQL. Add bash, Git, and basic Docker. For data platforms, familiarity with Spark (PySpark) is valuable.'
  },
  {
    id: 4,
    question: 'What certifications are valued by Australian employers?',
    answer: (
      <>
        Recognised signals include:
        <ul>
          <li>Google Professional Machine Learning Engineer</li>
          <li>AWS Certified Machine Learning – Specialty</li>
          <li>Cloud practitioner/associate certs (AWS/GCP/Azure) for foundations</li>
        </ul>
        Use certifications to complement, not replace, shipped projects.
      </>
    )
  },
  {
    id: 5,
    question: 'Is maths required, and at what level?',
    answer:
      'Comfort with linear algebra (vectors/matrices), probability/statistics, and calculus basics (derivatives/optimisation) is important. Apply concepts in code rather than only theory.'
  },
  {
    id: 6,
    question: 'How is ML engineering different from data science?',
    answer:
      'Data science leans on analysis, experimentation, and insights. ML engineering focuses on building, deploying, and maintaining reliable ML systems (APIs, pipelines, monitoring, CI/CD).'
  },
  {
    id: 7,
    question: 'Where can I find entry‑level roles in Australia?',
    answer:
      'Check SEEK and LinkedIn, graduate programs, and government roles via APSJobs. Search titles like “Machine Learning Engineer”, “MLOps Engineer”, “Software Engineer (ML)”, or “Data/ML Engineer”.'
  },
  {
    id: 8,
    question: 'What about privacy and AI ethics requirements in Australia?',
    answer:
      "Know the OAIC Privacy Act (Cth) obligations and Australia's AI Ethics Principles. Be able to discuss data minimisation, consent, secure handling, and model risk/impact at a practical level."
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Do you need a degree to become a machine learning engineer?',
      description: 'No—degrees help, but a strong portfolio, Python/SQL, cloud skills, and shipped projects can substitute.'
    },
    {
      label: 'How long does it take to switch into ML engineering?',
      description: 'Around 6–12 months with focused study and projects; longer part‑time. Production experience matters most.'
    },
    {
      label: 'Which certifications are most useful?',
      description: 'Google Professional ML Engineer and AWS ML Specialty are recognised; treat them as signals, not substitutes for projects.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://www.industry.gov.au/publications/australias-artificial-intelligence-ethics-framework',
    title: 'Australia’s AI Ethics Principles',
    publisher: 'Department of Industry, Science and Resources (Australia)',
    description: 'Official guidance on responsible AI principles expected in Australian organisations.',
    category: 'government'
  },
  {
    id: 2,
    href: 'https://www.oaic.gov.au/privacy/the-privacy-act',
    title: 'Privacy Act 1988 (Cth) – Overview',
    publisher: 'Office of the Australian Information Commissioner (OAIC)',
    description: 'Regulatory obligations for handling personal information in Australia.',
    category: 'government'
  },
  {
    id: 3,
    href: 'https://cloud.google.com/learn/certification/machine-learning-engineer',
    title: 'Professional Machine Learning Engineer',
    publisher: 'Google Cloud',
    description: 'Role‑based certification outline and exam guide.',
    category: 'industry'
  },
  {
    id: 4,
    href: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    title: 'AWS Certified Machine Learning – Specialty',
    publisher: 'Amazon Web Services',
    description: 'Validated expertise in building and deploying ML solutions on AWS.',
    category: 'industry'
  },
  {
    id: 5,
    href: 'https://www.coursera.org/articles/what-is-machine-learning-engineer',
    title: 'What Is a Machine Learning Engineer? (+ How to Get Started)',
    publisher: 'Coursera',
    description: 'General overview of the role and entry pathways.',
    category: 'guide'
  },
  {
    id: 6,
    href: 'https://www.seek.com.au/machine-learning-engineer-jobs',
    title: 'Machine Learning Engineer jobs (Australia)',
    publisher: 'SEEK',
    description: 'Live job listings and common requirements across Australian employers.',
    category: 'industry'
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
    <div className='bg-white'>
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
            <strong>{TOPIC}</strong> – In 2026, Australian teams expect ML engineers to ship reliable systems: data pipelines, model APIs, monitoring, and cost‑aware lifecycles. This guide focuses on what hiring managers here actually look for—and a practical path to get there.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName='my-10'
          />

          <h2>What a machine learning engineer actually does (AU workplaces)</h2>
          <p>
            Day‑to‑day, ML engineers turn ideas and analyses into production systems. That often means owning or contributing to: data ingestion and feature pipelines; training jobs and experiment tracking; packaging models behind APIs; CI/CD for models; monitoring (drift, latency, cost); and governance (privacy, access, model cards). In Australia, you’ll see these responsibilities split across small cross‑functional squads in product companies and more specialised platform teams in larger organisations and government.
          </p>

          <ArticleResourceCTA
            eyebrow='Download'
            title={`Get the checklist for ${TOPIC}`}
            description='Practical template to apply the concepts immediately.'
            buttonLabel='Download now'
            buttonHref='/resources'
            accent='purple'
          />

          <ArticleCallout
            title='Pick a lane early (NLP, vision, recommender systems)'
            variant='brand'
            icon={<span className='text-xl'>💡</span>}
          >
            Depth beats breadth for job readiness. Choose one problem family and ship 2–3 focused projects that progress from prototype to a small production deployment.
          </ArticleCallout>

          <h2>Skills that matter in 2026: from Python to MLOps</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0f045db0-bc6b-4396-856b-71ad6803c957.jpg?alt=media&token=c46e4a29-acc4-4eab-bb2f-d903b2cdfc65" alt="Tech professionals collaborating in a retro 90s aesthetic, reflecting future skills like Python and MLOps." className="w-full rounded-lg my-8" />

          <p>
            The stack evolves, but core competencies stay consistent. Prioritise the following and tie each skill to a shipped artifact (repo, demo, or write‑up):
          </p>
          <ul>
            <li><strong>Programming & data:</strong> Python (NumPy, pandas, scikit‑learn), PyTorch or TensorFlow, SQL; data modelling and cleaning.</li>
            <li><strong>Systems & MLOps:</strong> Git, Docker, CI/CD basics; experiment tracking; feature stores; model packaging; monitoring (drift, throughput, cost).</li>
            <li><strong>Cloud:</strong> Comfort on at least one provider (AWS/GCP/Azure). Use managed services judiciously to ship faster.</li>
            <li><strong>Maths for ML:</strong> Linear algebra, probability/statistics, optimisation. Apply concepts in code—don’t only read about them.</li>
            <li><strong>Responsible AI:</strong> Data minimisation, privacy‑by‑design, documentation (model cards), and human‑in‑the‑loop safeguards.</li>
          </ul>

          <h2>Australian pathways: degree, VET, or self‑taught?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4e12a5b6-b273-4af2-a992-80c63392324f.jpg?alt=media&token=c6004614-07a1-429b-9839-8a6402ac77e8" alt="Group of diverse individuals collaborating in a vibrant tech startup space with a retro 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            There is no single path. In Australia, successful ML engineers come from CS/software degrees, maths/stats backgrounds, VET/bootcamps plus strong portfolios, and internal transfers from software/data roles. Hiring signals that consistently help: demonstrable projects, cloud fluency, and clear thinking about trade‑offs and safety.
          </p>
          <h3>Switching from software or data roles</h3>
          <p>
            Leverage what you already know: software engineers tend to excel at production and reliability; data analysts/engineers bring data pipeline strengths. Add an ML toolbox (training, evaluation, deployment) and you can be job‑ready quickly.
          </p>

          <ArticleStepList
            title='Practical steps'
            steps={[
              'Weeks 1–4: solidify Python/SQL, ship a small model API (FastAPI) with a Dockerfile and basic tests.',
              'Weeks 5–8: add a pipeline (orchestrate with a simple scheduler), track experiments, and deploy to a managed cloud service.',
              'Weeks 9–12: implement monitoring (latency, drift), write a model card, and post a short, honest evaluation blog.'
            ]}
            accent='indigo'
          />

          <QuoteBlock title='Evidence or expert insight' variant='purple'>
            “In hiring, a small, reliable system in production beats five unmaintained notebooks. Demonstrate ownership from data to deployment.”
          </QuoteBlock>

          <h2>Build a portfolio hiring managers can assess</h2>
          <p>
            Portfolios should feel like engineering work: reproducible, tested, documented, and deployed. Aim for at least two projects with different risk profiles (e.g., classic ML + deep learning), each with a short write‑up explaining the problem, data, metrics, cost, and what you’d do next.
          </p>
          <h3>Project ideas with Australian context</h3>
          <ul>
            <li>NLP: a text‑classification API with dataset drift alerts; document privacy redaction for common Australian ID formats.</li>
            <li>Vision: on‑device image quality filtering with a lightweight model and a cost‑aware pipeline.</li>
            <li>Recommenders: a basic implicit‑feedback system with offline/online metrics and an A/B test plan.</li>
          </ul>

          <h2>Credentials that help (and what to skip)</h2>
          <p>
            Certifications can validate foundations and cloud familiarity. Commonly recognised in AU hiring: Google Professional ML Engineer and AWS ML Specialty. Short courses/MOOCs are useful for structure, but treat them as scaffolding—not the house. Prioritise shipped artifacts and clear write‑ups over certificate collections.
          </p>

          <h2>Job titles, where to find roles, and how to apply in Australia</h2>
          <p>
            Search broadly: titles include Machine Learning Engineer, MLOps Engineer, Data/ML Engineer, or Software Engineer (ML). Use SEEK and LinkedIn; for public sector, check APSJobs. Tailor your CV to show system outcomes (latency, cost, reliability) and attach links to running demos or repos with clear READMEs.
          </p>

          <h2>Responsible AI and privacy: the non‑negotiables</h2>
          <p>
            Australian employers increasingly expect practical fluency with the OAIC Privacy Act and Australia’s AI Ethics Principles. Show how your projects minimise personal data, handle access securely, document limitations, and plan for human oversight. Include a short risk/impact note in each project README.
          </p>

          <MLAITemplateResourceCTA />

          <h2>Ship a small, real system and get feedback</h2>
          <p>
            Don’t wait for “perfect.” Ship something small, share it, and iterate. Ask for code reviews, discuss trade‑offs, and track metrics. This loop—build, measure, learn—signals readiness better than any course.
          </p>

          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
            <ul className='space-y-3'>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
                <span>Pick one lane (e.g., NLP) and define a scoped project you can deploy in 4 weeks.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
                <span>Set up a minimal pipeline, API, and monitoring—document metrics, costs, and risks.</span>
              </li>
              <li className='flex gap-3 text-gray-700'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
                <span>Ask the MLAI community for feedback and iterate once based on real user input.</span>
              </li>
            </ul>
          </div>

          <AudienceGrid
            heading='Who this helps'
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
          />

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body='Get practical recommendations based on your goals, time, and experience level.'
            buttonText='Get recommendations'
            buttonHref='/contact'
            note='MLAI is a not‑for‑profit community empowering the Australian AI community.'
          />
        </div>
        <ArticleDisclaimer className='mt-8' />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref='/articles' topHref='#' />
      </div>
    </div>
  )
}
