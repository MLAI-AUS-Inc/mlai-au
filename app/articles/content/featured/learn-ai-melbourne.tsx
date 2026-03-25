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
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'Learn AI Melbourne'
export const CATEGORY = 'australian-ai-ecosystem'
export const SLUG = 'learn-ai-melbourne'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-30'
export const DATE_MODIFIED = '2026-01-30'
export const DESCRIPTION = 'A practical 2026 guide to learning AI in Melbourne—compare university and TAFE options, online vs on-campus delivery, expected duration and costs, plus local meetups and portfolio tips.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4"
const HERO_IMAGE_ALT = 'Learners collaborating at an AI workshop in Melbourne'
export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Where can I learn AI in Melbourne?',
    answer:
      <>Universities and TAFE providers in Melbourne offer AI-related study, alongside short courses. Examples include Victoria University (graduate certificate) and Holmesglen (TAFE/short courses). Always confirm current availability and entry requirements on the provider’s site.</>,
  },
  {
    id: 2,
    question: 'Do I need to know Python before I start?',
    answer:
      <>Many beginner short courses assume no prior coding. University-level programs often expect foundational programming (commonly Python) and maths. If you are new, start with an intro to Python and basic linear algebra to prepare.</>,
  },
  {
    id: 3,
    question: 'How long do AI courses take?',
    answer:
      <>Short courses can run from a few weeks to a couple of months. Graduate certificates often take 6–12 months part-time, while bachelor’s degrees typically span three years or more. Delivery and pace vary by provider.</>,
  },
  {
    id: 4,
    question: 'Is online study available?',
    answer:
      <>Yes. Many Melbourne providers offer online or hybrid delivery. Check each course page for the latest mode options, campus locations, and timetables.</>,
  },
  {
    id: 5,
    question: 'How much does it cost to learn AI?',
    answer:
      <>Costs vary widely by provider and level. Short courses range from low-cost community offerings to premium bootcamps. TAFE and university programs are typically in the thousands of dollars per unit/semester. Check the provider for fees and any government support options (e.g., FEE-HELP eligibility).</>,
  },
  {
    id: 6,
    question: 'How do I get hands-on experience?',
    answer:
      <>Build small projects, join local meetups and hack nights, contribute to open-source, and share your work publicly (e.g., GitHub or a short blog post). A portfolio of practical projects is highly valued by Melbourne employers.</>,
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'Where can I study AI in Melbourne?', description: 'Universities and TAFE (e.g., Victoria University, Holmesglen) plus short courses and bootcamps; confirm current intakes on provider sites.' },
    { label: 'How long do AI courses take?', description: 'Short courses: weeks; grad certs: 6–12 months part‑time; bachelor’s degrees: 3+ years. Timelines vary by provider.' },
    { label: 'Do I need coding or maths first?', description: 'Beginner short courses often require none; university programs usually expect Python and maths (algebra, probability).' },
  ],
}

/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
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
  imageAlt: HERO_IMAGE_ALT,
}

/** ===== References (optional) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.holmesglen.edu.au/explore-courses/computing-and-it/artificial-intelligence',
    title: 'Artificial Intelligence Courses in Melbourne',
    publisher: 'Holmesglen Institute',
    description: 'Overview of AI-related study options and information from Holmesglen.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://www.vu.edu.au/courses/graduate-certificate-in-artificial-intelligence-ntai',
    title: 'Graduate Certificate in Artificial Intelligence',
    publisher: 'Victoria University',
    description: 'Course structure, entry requirements and delivery details for VU’s graduate certificate.',
    category: 'guide',
  },
]

/**
 * ARTICLE CONTENT COMPONENT
 *
 * This component is dynamically imported by the route handler and rendered
 * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
 */
export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {/* Hero header (custom) */}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      {/* Table of contents placeholder */}
      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> – A practical overview for anyone in Melbourne deciding between university, TAFE and short courses, plus where to meet people and build real projects. Wherever you start, aim to produce a small, public piece of work within your first month.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learning pathways in Melbourne range from university and TAFE to short courses and community-led meetups."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'Make smart choices about AI upskilling and build portfolio demos that matter.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'Map a path from beginner to job-ready with clear, achievable milestones.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'Run workshops, study groups, or hack nights that help people learn together.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        <h2>Where to study AI in Melbourne (universities, TAFE, and short courses)</h2>
        <p>
          Melbourne learners typically choose from three routes: university programs (from graduate certificates to degrees), TAFE/vocational training, and short courses/bootcamps. University options suit those seeking rigorous foundations and recognised credentials. TAFE and vocational routes emphasise practical job skills. Short courses are fastest to start and can help you test interest or upskill quickly. As at January 2026, providers such as Victoria University (graduate certificate) and Holmesglen (TAFE/short courses) list AI-related options—confirm details directly on each provider’s site.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Pick the smallest credible study path that gets you building useful projects quickly. Credentials signal capability; portfolios demonstrate it.
        </QuoteBlock>

        <h2>Typical entry requirements (maths, coding, and work experience)</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-15edf82c-e3e1-4170-80bc-03180c83a560.jpg?alt=media&token=f4094232-5912-410f-9d31-3b0cf18884a0" alt="Group of diverse professionals collaborating in a retro tech startup environment, showcasing coding and maths skills." className="w-full rounded-lg my-8" />

        <p>
          Entry varies by level. Graduate certificates often expect prior study or industry experience, basic programming (commonly Python), and comfort with maths (linear algebra, probability). TAFE and many short courses allow beginners, sometimes offering bridging content. If you’re new to programming, start with a short Python primer and a quick refresher on algebra and statistics before enrolling in heavier AI subjects.
        </p>

        <h2>On‑campus vs online: how Melbourne providers deliver AI courses</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e423c07c-3bd4-45cf-a082-8ae5b409dee3.jpg?alt=media&token=8a4d8d73-2dd8-4048-bfa5-c68251e4ce2a" alt="People collaborate in a retro tech environment, discussing AI course options at Melbourne providers." className="w-full rounded-lg my-8" />

        <p>
          Most providers now support online, on‑campus, or hybrid delivery. Online study offers flexibility; on‑campus time gives access to labs, peers, and face‑to‑face support. Check the latest course page for campus locations, mode, and timetables. If you work full‑time, choose asynchronous options or evening classes; if you learn best with peers, prioritise in‑person sessions.
        </p>

        <h2>How long it takes and what it costs (2026 snapshot)</h2>
        <p>
          Timelines: short courses (weeks to a few months); graduate certificates (6–12 months part‑time); bachelor’s degrees (3+ years). Fees vary widely—short courses range from affordable intros to premium intensives; vocational and university programs are typically in the thousands per term or unit. Always verify current fees, intake dates, and any available support (e.g., eligibility for government loan schemes) on the provider’s site.
        </p>

        <h2>Choosing a course: a simple decision framework</h2>
        <p>
          First, define what you need in the next 6–12 months: a recognised credential, faster upskilling, or a career switch. Second, assess your baseline (maths, Python, data skills). Third, shortlist 2–3 providers that match your mode, budget, and timeline. Finally, compare syllabi and outcomes against a small project you want to build.
        </p>

        <ArticleStepList
          title="Step-by-step actions"
          steps={[
            { label: 'Define your immediate goal (credential, upskilling, or switch).' },
            { label: 'Check entry requirements and delivery mode for 2–3 Melbourne providers.' },
            { label: 'Start a small project (e.g., a simple model or AI-enabled app) and iterate weekly.' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download a course-comparison worksheet and a one‑page project brief to keep your learning focused."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="orange">
          Treat every subject or short course as fuel for one portfolio project. Ship a tiny improvement each week and write two paragraphs explaining what you learned.
        </QuoteBlock>

        <h2>Learn beyond the classroom: meetups, hack nights, and community</h2>
        <p>
          Melbourne’s AI community is active and welcoming. Join meetups, hack nights, and study groups to learn faster and find collaborators. MLAI is a not‑for‑profit community supporting Australian AI practitioners and learners—if you’re keen to connect with locals, <Link to="/contact" className="underline underline-offset-4">get in touch</Link>.
        </p>

        <MLAITemplateResourceCTA />

        <h2>Build a portfolio that Melbourne employers recognise</h2>
        <p>
          Focus on small, real problems. Examples: a demand‑forecasting notebook for a local dataset, a retrieval‑augmented chatbot for public documents, or a computer‑vision demo on open images. Publish your code, add a README with metrics and limits, and write a short reflection. Two or three tidy, honest projects beat a long list of half‑finished experiments.
        </p>

        <h2>Next steps</h2>
        <p>
          Pick a learning path, start a tiny project this week, and plug into the community. For a broader view of the local landscape, explore our Australian AI ecosystem content and stay close to events and peers.
        </p>
        <p>
          Tip: you can also browse our pillar overview at{' '}
          <Link to="/articles" className="underline underline-offset-4">Australian AI ecosystem</Link> for related guides.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="MLAI is a not‑for‑profit community empowering the Australian AI community. Reach out for practical pointers to local learning paths."
        buttonText="Get recommendations"
        buttonHref="/contact"
        note="Friendly, community‑first guidance."
      />

      {/* Author Bio */}
      <AuthorBio author={authorDetails} />

      {/* FAQ */}
      <ArticleFAQ items={faqItems} />

      {/* Navigation */}
      <ArticleFooterNav />
    </>
  )
}
