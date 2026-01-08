import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { canonical } from '../../seo-config'
import { applyArticleRegistryDefaults } from '../../registry'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import { AuthorBio } from '../../../components/AuthorBio'
import type { FeaturedPersonProfile } from '../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Best way to learn about AI in 2026'
const CATEGORY = 'featured'
const SLUG = 'best-way-to-learn-about-ai-2026'
const AUTHOR = 'Sophie Nguyen'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO = 'Sophie covers practical AI literacy, workforce trends, and ethical adoption for Australian teams.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
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

const faqs: FAQ[] = [
  { id: 1, question: 'What is the quickest way to start learning AI in Australia?', answer: 'Begin with a short Python refresher, then complete an introductory machine learning course (e.g., Fast.ai or CS50 AI) while following along with local meetups like Machine Learning Sydney to stay motivated.' },
  { id: 2, question: 'Do I need a maths degree to work in AI?', answer: 'No. You need practical comfort with linear algebra basics, probability, and calculus for gradient intuition. Many Australian employers accept candidates who can ship working models, explain trade-offs, and document risks, even without formal maths degrees.' },
  { id: 3, question: 'Which Australian credentials are recognised by employers?', answer: 'Micro-credentials from reputable universities (UNSW, ANU, UQ), industry certs (AWS Machine Learning Specialty, Google Professional ML Engineer), and portfolio evidence (GitHub, Kaggle, papers) are commonly accepted.' },
  { id: 4, question: 'How do I learn AI responsibly under Australian privacy laws?', answer: 'Follow the OAIC Australian Privacy Principles (APPs): minimise personal data, get consent, avoid using production data in public model training, and document data handling. Use synthetic or de-identified datasets when sharing projects.' },
  { id: 5, question: 'What tools should beginners prioritise in 2026?', answer: 'Python, NumPy, Pandas, scikit-learn, PyTorch, and a hosted notebook (Colab, Paperspace). Add prompt engineering and RAG patterns with vector databases (e.g., Pinecone, pgvector) to stay current with applied LLM work.' },
  { id: 6, question: 'How long does it take to be job-ready for an AI role?', answer: 'With 8–10 hours per week, a motivated learner can reach junior-level competency in 6–9 months by combining structured courses, 3–4 shipped projects, and active feedback from meetups or online code reviews.' },
]

const article = applyArticleRegistryDefaults({
  title: `${TOPIC} (2025)`,
  dateModified: DATE_MODIFIED,
  description: DESCRIPTION,
  author: AUTHOR,
  slug: SLUG,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
})

const metaTitle = article?.title || `${TOPIC} (2025)`
const metaDescription = article?.description || DESCRIPTION
const metaImage = article?.image || HERO_IMAGE
const metaUrl = canonical(`/articles/${CATEGORY}/${SLUG}`)

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: metaUrl },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: metaUrl,
    type: 'article',
    images: [{ url: metaImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: [metaImage],
  },
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metaTitle,
    image: metaImage,
    author: {
      '@type': 'Person',
      name: AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Company',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: DATE_MODIFIED,
    dateModified: DATE_MODIFIED,
    description: metaDescription,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : 'Refer to article content for details.',
      },
    })),
  }

  const featuredPeople: FeaturedPersonProfile[] = []

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ArticleLayout
        article={article}
        // Sticky Sidebar Components
        toc={<ArticleTocPlaceholder />}
        summaryHighlights={{
          heading: `Key facts: ${TOPIC}`,
          intro:
            'Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).',
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
        }}
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/articles" className="hover:text-gray-900 transition-colors">
                  Articles
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-medium text-gray-900">{TOPIC}</span>
              </li>
            </ol>
          </nav>
        }
      >
        {/* 1) Intro alert - Clean, neutral style */}
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
              <Link href="/articles" className="font-semibold text-indigo-600 hover:underline">
                Browse related articles →
              </Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              {/* Icon: Rocket */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84l4.8 0m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">For leaders validating ideas, seeking funding, or managing teams.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              {/* Icon: Graduate */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">For those building portfolios, learning new skills, or changing careers.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              {/* Icon: Community */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">For workshop facilitators, mentors, and ecosystem supporters.</p>
          </div>
        </div>

        {/* 3) Main content starts */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-indigo-500">
          <p>
            <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025 landscape.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>What is {TOPIC}?</h2>
          <p>
            Learning AI in 2026 means combining three threads: (1) computational thinking and Python fluency, (2) applied machine learning and large language model (LLM) patterns such as retrieval-augmented generation (RAG), and (3) responsible practice aligned with the Australian Privacy Principles (APPs) and emerging AI safety guidance. It is less about memorising theory and more about shipping small, verifiable projects that demonstrate you can reason about data, evaluate models, and communicate risks.
          </p>
          <p>
            In Australia, employers increasingly value demonstrable skills over titles. Whether you are in Brisbane, Sydney, or remote, the fastest path pairs online coursework with local communities—meetups, hackathons, and open-source contributions—so you can validate your skills with feedback.
          </p>

          <h2>Why it matters in 2025</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d0264b00-0aed-477b-b0f1-54e6c2ede32b.jpg?alt=media&token=39f07a8d-e29a-414c-af1e-6400562d29f4" alt="People collaborating in a vibrant tech startup environment with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            Generative AI is now embedded in productivity stacks, customer support, and analytics. Ignoring it risks slower delivery, higher costs, and compliance gaps. Acting now matters because Australian organisations are formalising AI governance in procurement and vendor risk assessments. Being able to explain data lineage, consent, and evaluation metrics is becoming table stakes for roles across product, engineering, and operations.
          </p>
          <p>
            The 2025 hiring market rewards candidates who can move from prototype to production responsibly. If you can show model comparisons (e.g., perplexity vs. cost), basic prompt evaluation, and a privacy-first approach, you will stand out without needing a decade of experience.
          </p>

          <div className="my-8 border-l-4 border-indigo-500 bg-indigo-50/50 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">Pair every course module with a tiny project (one notebook, one README) and publish it; shipping weekly beats cramming theory.</p>
          </div>

          <h2>Step-by-Step Guide</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e687e40d-6b11-44f4-83bf-4a8fd68b5cc9.jpg?alt=media&token=74c5bdbf-40aa-448b-b1d8-dd3fe3c3643c" alt="People collaborating in a vibrant 90s tech startup, embodying innovation and creativity in a retro aesthetic." className="w-full rounded-lg my-8" />

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

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="#"
              note="You can filter by topic, format (online/in‑person), and experience level."
            />
          </div>
        </div>

        {/* Author Bio & Footer */}
        <hr className="my-10 border-gray-100" />

        <AuthorBio author={authorDetails} />

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <ArticleFAQ items={faqs} />
        </div>

        {/* Final Breadcrumb/Nav */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
          <Link href="/articles" className="hover:text-indigo-600 transition-colors">
            ← Back to Articles
          </Link>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Top of page ↑
          </a>
        </div>
      </ArticleLayout>
    </div>
  )
}
