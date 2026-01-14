import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Best way to learn about AI in 2026'
const CATEGORY = 'featured'
const SLUG = 'best-way-to-learn-about-ai-2026'
const AUTHOR = 'Dr Sam Donegan'
const AUTHOR_ROLE = 'Medical Doctor, AI Startup Founder & Lead Editor'
const AUTHOR_BIO = 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.'
const AUTHOR_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376'
const DATE_PUBLISHED = '2025-01-15T00:00:00.000Z'
const DATE_MODIFIED = '2025-01-15T00:00:00.000Z'
const DESCRIPTION = 'A 2026-ready roadmap for Australians to learn AI: fundamentals, hands-on projects, ethics, and career moves tailored to local pathways.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa"
const HERO_IMAGE_ALT = 'Person studying AI concepts on a laptop with diagrams on screen'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'What is the quickest way to start learning AI in Australia?', answer: 'Begin with a short Python refresher, then complete an introductory machine learning course (e.g., Fast.ai or CS50 AI) while following along with local meetups like Machine Learning Sydney to stay motivated.' },
  { id: 2, question: 'Do I need a maths degree to work in AI?', answer: 'No. You need practical comfort with linear algebra basics, probability, and calculus for gradient intuition. Many Australian employers accept candidates who can ship working models, explain trade-offs, and document risks, even without formal maths degrees.' },
  { id: 3, question: 'Which Australian credentials are recognised by employers?', answer: 'Micro-credentials from reputable universities (UNSW, ANU, UQ), industry certs (AWS Machine Learning Specialty, Google Professional ML Engineer), and portfolio evidence (GitHub, Kaggle, papers) are commonly accepted.' },
  { id: 4, question: 'How do I learn AI responsibly under Australian privacy laws?', answer: 'Follow the OAIC Australian Privacy Principles (APPs): minimise personal data, get consent, avoid using production data in public model training, and document data handling. Use synthetic or de-identified datasets when sharing projects.' },
  { id: 5, question: 'What tools should beginners prioritise in 2026?', answer: 'Python, NumPy, Pandas, scikit-learn, PyTorch, and a hosted notebook (Colab, Paperspace). Add prompt engineering and RAG patterns with vector databases (e.g., Pinecone, pgvector) to stay current with applied LLM work.' },
  { id: 6, question: 'How long does it take to be job-ready for an AI role?', answer: 'With 8–10 hours per week, a motivated learner can reach junior-level competency in 6–9 months by combining structured courses, 3–4 shipped projects, and active feedback from meetups or online code reviews.' },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What is the fastest way to start learning AI in 2026?',
      description: 'Begin with Python fundamentals, then take a structured ML/LLM intro course while building weekly mini-projects to publish.',
    },
    {
      label: 'Do I need a degree to get an AI job in Australia?',
      description: 'Not necessarily; employers accept strong portfolios, micro-credentials, and certifications plus evidence of responsible data use.',
    },
    {
      label: 'Which AI tools should beginners focus on this year?',
      description: 'Start with Python, scikit-learn, PyTorch, and hosted notebooks; add RAG patterns with vector databases for applied LLM work.',
    },
  ],
}

export const useCustomHeader = true

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  const breadcrumbs = [
    { label: 'Home', href: '/articles', icon: Home },
    { label: TOPIC, current: true },
  ]

  return (
    <div>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TOPIC}
        headerBgColor="cyan"
        summary={{
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items,
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <QuoteBlock
        variant="purple"
        title="Quick note"
        icon={<span className="text-xl">💡</span>}
        className="my-6"
      >
        This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
        <a href="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
          Browse related articles →
        </a>
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-10" />

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'For leaders validating ideas, seeking funding, or managing teams.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'For those building portfolios, learning new skills, or changing careers.',
            variant: 'purple',
            icon: <AcademicCapIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Community Builders',
            description: 'For workshop facilitators, mentors, and ecosystem supporters.',
            variant: 'yellow',
            icon: <UsersIcon className="w-5 h-5 text-black" strokeWidth={1.8} />,
          },
        ]}
        className="my-10"
      />

      {/* Main content */}
      <div className="">
        <p>
          <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2026 landscape.
        </p>

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

        <h2>What is {TOPIC}?</h2>
        <p>
          Learning AI in 2026 means combining three threads: (1) computational thinking and Python fluency, (2) applied machine learning and large language model (LLM) patterns such as retrieval-augmented generation (RAG), and (3) responsible practice aligned with the Australian Privacy Principles (APPs) and emerging AI safety guidance. It is less about memorising theory and more about shipping small, verifiable projects that demonstrate you can reason about data, evaluate models, and communicate risks.
        </p>
        <p>
          In Australia, employers increasingly value demonstrable skills over titles. Whether you are in Brisbane, Sydney, or remote, the fastest path pairs online coursework with local communities—meetups, hackathons, and open-source contributions—so you can validate your skills with feedback.
        </p>

        <h2>Why it matters in 2026</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d0264b00-0aed-477b-b0f1-54e6c2ede32b.jpg?alt=media&token=39f07a8d-e29a-414c-af1e-6400562d29f4"
          alt="People collaborating in a vibrant tech startup environment with a nostalgic 90s film aesthetic."
        />

        <p>
          Generative AI is now embedded in productivity stacks, customer support, and analytics. Ignoring it risks slower delivery, higher costs, and compliance gaps. Acting now matters because Australian organisations are formalising AI governance in procurement and vendor risk assessments. Being able to explain data lineage, consent, and evaluation metrics is becoming table stakes for roles across product, engineering, and operations.
        </p>
        <p>
          The 2026 hiring market rewards candidates who can move from prototype to production responsibly. If you can show model comparisons (e.g., perplexity vs. cost), basic prompt evaluation, and a privacy-first approach, you will stand out without needing a decade of experience.
        </p>

        <QuoteBlock
          variant="purple"
          title="Pro Tip"
          icon={<span className="text-xl">💡</span>}
          className="my-8"
        >
          Pair every course module with a tiny project (one notebook, one README) and publish it; shipping weekly beats cramming theory.
        </QuoteBlock>

        <h2>Step-by-Step Guide</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e687e40d-6b11-44f4-83bf-4a8fd68b5cc9.jpg?alt=media&token=74c5bdbf-40aa-448b-b1d8-dd3fe3c3643c"
          alt="People collaborating in a vibrant 90s tech startup, embodying innovation and creativity in a retro aesthetic."
        />

        <h3>Step 1: Preparation</h3>
        <p>
          Cover the essentials quickly: Python, Git, and data handling. Use the Australian Bureau of Statistics (ABS) open datasets for practice to stay within local data norms. Learn the math you need just-in-time—vectors, matrices, gradients—via concise resources like 3Blue1Brown. Set up a reproducible environment (Conda or uv) and a hosted notebook (Colab or Paperspace) to avoid local GPU blockers.
        </p>
        <p>
          Choose one credential to anchor your learning—an AWS ML Specialty practice path or a university micro-credential—so you have a clear syllabus and deadlines. Bookmark OAIC guidance to ensure any personal data you touch is de-identified or synthetic.
        </p>

        <h3>Step 2: Execution</h3>
        <p>
          Build three to four projects that reflect real Australian problems: demand forecasting for a local retailer using Prophet, a RAG chatbot over public policy PDFs, or a toxicity filter for community forums using open models. For each project, document dataset sources, evaluation metrics (accuracy, F1, latency, cost per 1k tokens), and privacy controls. Push code to GitHub, add a short Loom walkthrough, and invite feedback from local meetups.
        </p>
        <p>
          Practice responsible deployment: use feature flags, capture model and prompt versions, and add red-teaming checklists. When using LLMs, compare at least two providers on cost and accuracy; note where models struggle with Australian slang or location names, and add guardrails.
        </p>

        <h3>Step 3: Review</h3>
        <p>
          Run a monthly retrospective: what shipped, what was measured, and what broke. Update your portfolio to highlight lessons, not just successes. Map skills to roles—data analyst with LLM augmentation, ML engineer, or AI product manager—and identify the next credential or project to close the gap. Ask mentors for targeted feedback on code quality, model evaluation, and communication clarity.
        </p>
        <p>Finally, rehearse concise storytelling: explain one project in 90 seconds, including the problem, approach, metrics, cost, and risks. This is increasingly what Australian hiring managers expect in 2026 screenings.</p>

        <h2>Conclusion</h2>
        <p>
          The best way to learn about AI in 2026 is to ship small, responsible projects, document your decisions, and stay anchored to Australian privacy and governance expectations. With steady practice and community feedback, you can reach hire-ready confidence without pausing your career for a full degree.
        </p>

        <QuoteBlock variant="purple" className="mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Your Next Steps</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-white/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                1
              </span>
              <span>Set up your learning environment (Python, Git, hosted notebook) this week.</span>
            </li>
            <li className="flex gap-3 text-white/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                2
              </span>
              <span>Complete one introductory ML course module and ship a mini-project to GitHub.</span>
            </li>
            <li className="flex gap-3 text-white/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                3
              </span>
              <span>Join a local AI meetup or online community for feedback and accountability.</span>
            </li>
          </ul>
        </QuoteBlock>

        {/* <div className="my-12">
          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations"
            buttonHref="#"
            note="You can filter by topic, format (online/in‑person), and experience level."
          />
        </div> */}
      </div>

      <hr className="my-10 border-gray-100" />

      <AuthorBio authors={[authorDetails]} />

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav />

    </div >
  )
}
