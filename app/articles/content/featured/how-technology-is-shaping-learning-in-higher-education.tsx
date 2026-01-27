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
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How technology is shaping learning in higher education'
export const CATEGORY = 'featured'
export const SLUG = 'how-technology-is-shaping-learning-in-higher-education'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-27'
export const DATE_MODIFIED = '2026-01-27'
export const DESCRIPTION = 'How hybrid learning, AI, analytics and micro‑credentials are reshaping Australian higher education in 2026, with practical steps for students and educators.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6d1a2d84-8b4e-4540-969a-efedb4ed79d0.jpg?alt=media&token=40754573-bde6-4fe3-991d-f9b37be9cb08"
const HERO_IMAGE_ALT = '<HERO_IMAGE_ALT>'
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
    question: 'What technologies are most influential in Australian higher education in 2026?',
    answer:
      'Hybrid learning platforms (LMS + lecture capture), generative AI tools, learning analytics, micro‑credential platforms, and emerging XR simulations are the main drivers.'
  },
  {
    id: 2,
    question: 'How are universities handling AI use in assignments?',
    answer:
      'Policies focus on assessment redesign (authentic tasks, oral vivas, project work), transparency about AI use, and academic integrity education. Detection tools have limits, so process‑based evidence is emphasised.'
  },
  {
    id: 3,
    question: 'Do micro‑credentials count towards a degree in Australia?',
    answer:
      'Under the National Microcredentials Framework, micro‑credentials can be stackable. Recognition depends on the provider and program—check your university’s credit policies.'
  },
  {
    id: 4,
    question: 'Is blended learning here to stay?',
    answer:
      'Yes. Most courses now assume hybrid delivery—on‑campus experiences complemented by online content, recordings, and discussion spaces.'
  },
  {
    id: 5,
    question: 'How can students use AI tools responsibly?',
    answer:
      'Follow your subject’s rules, cite where required, log prompts/iterations, and prioritise your own reasoning. Use AI for brainstorming, feedback, and practice—not to replace your original work.'
  },
  {
    id: 6,
    question: 'What skills should I focus on for an AI career while at uni?',
    answer:
      'Core maths/stats and Python, data handling, model evaluation, prompt engineering, and communication. Build a portfolio through projects, hackathons, or micro‑credentials aligned to your interests.'
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'How is AI changing higher education learning?', description: 'AI supports drafting, feedback, and practice; policies prioritise transparency and assessment redesign.' },
    { label: 'What does blended or hybrid delivery look like in 2026?', description: 'Recorded lectures + LMS modules with on‑campus workshops, labs, and authentic assessments.' },
    { label: 'Do micro‑credentials count towards degrees in Australia?', description: 'Many can be stacked under the National Microcredentials Framework—recognition varies by provider.' },
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
    href: 'https://www.universitiesaustralia.edu.au/policy-submissions/principles-for-the-use-of-generative-ai-in-teaching-and-learning/',
    title: 'Principles for the use of generative AI in teaching and learning',
    publisher: 'Universities Australia',
    description: 'Sector‑level guidance for Australian higher education on using generative AI in teaching and assessments.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://www.education.gov.au/higher-education/documents/national-microcredentials-framework',
    title: 'National Microcredentials Framework',
    publisher: 'Australian Government Department of Education',
    description: 'Framework outlining definitions and recognition settings for micro‑credentials in Australia.',
    category: 'analysis',
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

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — In 2026, Australian universities are effectively hybrid‑first.
          Lecture capture, LMS‑centred delivery, and AI‑enabled tools now sit alongside
          studios, labs, placements, and workshops. For students and educators, the goal
          is the same: design learning that is authentic, inclusive, and prepares people
          for real work with AI.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Hybrid‑first learning: recorded lectures, active seminars, and digital assessments coexist in 2026."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Students & Graduates',
              description: 'Make the most of hybrid courses, AI‑supported study, and micro‑credentials.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Career Changers',
              description: 'Bridge gaps with stackable learning and portfolio‑first projects.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Educators & Designers',
              description: 'Design authentic assessments and accessible, AI‑aware learning experiences.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>From lecture theatres to hybrid‑first delivery</h2>
        <p>
          Most Australian courses now blend weekly recordings and LMS modules with
          tutorials, studios, and placements. The shift isn’t about replacing campus time
          but using it for higher‑value activities—discussion, critique, hands‑on labs,
          and assessment support—while content delivery and practice can happen online.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Hybrid works when contact time is repurposed for active learning and support,
          not a repeat of the recording. Design for presence, not redundancy.
        </QuoteBlock>

        <h2>AI in the classroom: personalisation, feedback, and integrity</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b18e8f62-7706-4dc6-b3ae-f40897239931.jpg?alt=media&token=d4fc9cf8-3710-4463-91fa-735a34c159a1" alt="Diverse team in a retro tech setting collaborates on AI-driven education solutions, capturing 90s film vibes." className="w-full rounded-lg my-8" />

        <p>
          Generative AI can scaffold ideas, offer draft feedback, and simulate interview
          or viva practice. Universities emphasise transparent use, with clear rules on
          what is permitted and how to acknowledge it. Detection tools remain imperfect,
          so assessment design (process evidence, oral defences, and authentic tasks)
          carries the load for integrity.
        </p>

        <h3>What to expect in 2026 semesters</h3>
        <p>
          Expect guidance at the subject level on acceptable AI use; more iterative
          submissions that capture your process; and rubrics that reward reasoning,
          critique, and original artefacts over generic prose.
        </p>

        <QuoteBlock title="Policy baseline (sector trend)" variant="orange">
          Be transparent about AI use, keep a brief learning log (prompts, iterations,
          decisions), and prioritise your own analysis. When in doubt, ask your
          coordinator or check the subject guide.
        </QuoteBlock>

        <h2>Assessments are evolving: authentic tasks and open‑AI policies</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dcc535fb-c9bb-468b-ba57-b3ccd4f41cee.jpg?alt=media&token=1e84bca8-2e45-4a34-9f3b-f04a93559d34" alt="A vibrant 90s tech startup scene showcasing diverse individuals collaborating on innovative projects." className="w-full rounded-lg my-8" />

        <p>
          As open‑book and open‑AI norms grow, assessments lean towards real‑world
          scenarios—client briefs, data analysis with commentary, oral presentations,
          and prototypes. These formats make misuse harder and the learning more
          transferable, particularly for AI‑adjacent roles.
        </p>

        <h2>Learning analytics and data governance</h2>
        <p>
          LMS activity and formative quiz data help educators see engagement patterns and
          flag support needs. Institutions are increasingly explicit about privacy,
          consent, and purpose limits for student data. Analytics should guide timely
          support, not become high‑stakes surveillance.
        </p>

        <h2>Micro‑credentials and short courses: stackable, skills‑first</h2>
        <p>
          Micro‑credentials aligned to the National Microcredentials Framework provide
          focused, credit‑bearing units that can be stacked. They’re useful for plugging
          gaps (e.g., Python for data work, prompt engineering, ethics and safety) and
          for career changers building a portfolio of evidence.
        </p>

        <h2>Accessible by default</h2>
        <p>
          With hybrid learning the norm, accessibility isn’t optional—captions,
          transcripts, structured headings, colour‑contrast, and keyboard‑friendly
          interfaces are expected. These practices support many learners, not only those
          with disclosed disabilities.
        </p>

        <h2>XR, simulations, and work‑integrated learning</h2>
        <p>
          Extended reality (XR) and high‑fidelity simulations are increasingly used where
          labs are scarce, risky, or expensive. Paired with industry projects, they help
          students rehearse complex decision‑making before practicum or placements.
        </p>

        <ArticleStepList
          title="How to make the most of tech‑enhanced uni in 2026"
          steps={[
            'Map each subject’s AI policy and acceptable tools',
            'Keep a short learning log of prompts, drafts, and decisions',
            'Prioritise studio/workshop time for feedback and critique',
            'Use micro‑credentials to close skill gaps (e.g., Python, ML ops, ethics)',
            { label: 'Build portfolio artefacts from authentic assessments' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download a study log template, an assessment checklist, and a micro‑credential planning worksheet."
          buttonLabel="Download now"
          buttonHref="#"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="orange">
          Treat every assignment as a portfolio piece. Capture process evidence and
          reflective notes—you’ll reuse them in job applications and interviews.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>What this means for students planning an AI career</h2>
        <p>
          Lean into hybrid rhythms, use AI transparently for practice and feedback, and
          choose assessments and micro‑credentials that produce credible artefacts.
          Curate these in a public portfolio and connect with peers through communities
          and events—your network matters as much as your transcripts.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="Join the MLAI community to connect with practitioners and find practical ways to grow your skills in Australia."
        buttonText="Get recommendations"
        buttonHref="/contact"
        note="Community‑first, not‑for‑profit. We’ll point you to helpful, credible options."
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
