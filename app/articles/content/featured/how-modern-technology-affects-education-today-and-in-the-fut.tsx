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
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How modern technology affects education today and in the future'
export const CATEGORY = 'featured'
export const SLUG = 'how-modern-technology-affects-education-today-and-in-the-fut'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-27'
export const DATE_MODIFIED = '2026-01-27'
export const DESCRIPTION = 'How technology is changing Australian education today—and what’s next with AI, privacy, inclusion, and practical steps to adopt it responsibly.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c64e3c6c-e429-49ad-acb9-ed1a06156751.jpg?alt=media&token=d82a401d-a58e-47e5-ba8d-76025cf5b37b"
const HERO_IMAGE_ALT = 'Students using laptops in a classroom'
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
    question: 'What are the biggest benefits of using technology in learning today?',
    answer:
      'Personalised support (including AI assistance), faster feedback via learning platforms, improved access and inclusion (captions, screen readers, translation), and richer collaboration through shared docs and classroom tools.'
  },
  {
    id: 2,
    question: 'Will AI replace teachers?',
    answer:
      'No. Evidence and practice point to AI augmenting teachers, not replacing them. The teacher’s role shifts toward facilitation, feedback, and wellbeing, while AI handles drafting, practice, and administrative tasks.'
  },
  {
    id: 3,
    question: 'How should schools handle academic integrity with AI tools?',
    answer:
      <>Design assessments that emphasise process, oral/observed explanations, and original artefacts. Teach citation and disclosure of AI assistance. Avoid relying on “AI detectors” alone—these tools are unreliable and can create false positives.</>
  },
  {
    id: 4,
    question: 'What minimum setup is needed to get value from edtech?',
    answer:
      'A stable internet connection, fit-for-purpose devices, a central learning platform (e.g., LMS), accessibility defaults (captions, alt text, readable formats), and clear classroom routines for when tech is used—and when it is put away.'
  },
  {
    id: 5,
    question: 'How do we protect student data when using new tools?',
    answer:
      'Align to the Australian Privacy Principles (APPs): minimise data collected, prefer onshore data storage, restrict retention, verify vendor security, and provide clear consent and opt-out pathways.'
  },
  {
    id: 6,
    question: 'What metrics should we track in a pilot?',
    answer:
      'Define a small set: engagement (attendance, on-task time), learning outcomes (rubrics, mastery checks), workload/time saved, and inclusion signals (participation across diverse learners). Compare before/after on a short 4–6 week pilot.'
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'What are the biggest benefits of technology in education today?', description: 'Personalised learning, better access/inclusion, faster feedback and richer collaboration.' },
    { label: 'What risks should schools manage with edtech?', description: 'Digital divide, distraction/wellbeing, privacy/data handling, academic integrity, vendor lock‑in.' },
    { label: 'How will technology shape the future of learning?', description: 'AI‑assisted personalisation, more authentic assessment, and immersive simulations—teachers stay central.' }
  ]
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
  imageAlt: HERO_IMAGE_ALT
}

/** ===== References (optional) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.australiancurriculum.edu.au/f-10-curriculum/digital-technologies/',
    title: 'Australian Curriculum: Digital Technologies',
    publisher: 'ACARA',
    description: 'Curriculum expectations for digital technologies and computational thinking across F–10.',
    category: 'government'
  },
  {
    id: 2,
    href: 'https://www.esafety.gov.au/educators',
    title: 'eSafety guidance for schools and educators',
    publisher: 'eSafety Commissioner (Australia)',
    description: 'Practical guidance on online safety, privacy, and wellbeing in education settings.',
    category: 'guide'
  },
  {
    id: 3,
    href: 'https://www.oaic.gov.au/privacy/the-privacy-act/australian-privacy-principles',
    title: 'Australian Privacy Principles (APPs)',
    publisher: 'Office of the Australian Information Commissioner',
    description: 'Legal principles governing personal information handling in Australia.',
    category: 'government'
  },
  {
    id: 4,
    href: 'https://unesdoc.unesco.org/ark:/48223/pf0000386591',
    title: 'Guidance for generative AI in education and research',
    publisher: 'UNESCO',
    description: 'International guidance on the safe, effective use of generative AI in education.',
    category: 'analysis'
  }
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
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <>
      {/* Hero header (custom) */}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true }
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
          <strong>{TOPIC}</strong> in Australia is less about shiny gadgets and more about
          how tools change pedagogy, access, and assessment. Since the rapid rise of
          generative AI in 2023, classrooms, workplaces, and VET/uni settings have been
          adapting quickly. This guide summarises the practical benefits, risks, and
          what’s next—so you can plan responsible, evidence‑based steps.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Technology supports teaching; it doesn’t replace it."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Teachers & trainers',
              description: 'Practical ways to blend AI and edtech with strong pedagogy.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange'
            },
            {
              title: 'Students & career changers',
              description: 'Study strategies and tools that support inclusion and mastery.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple'
            },
            {
              title: 'Leaders & community builders',
              description: 'Policy, privacy, and change management for safe pilots.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow'
            }
          ]}
        />

        {/* Research-derived sections */}
        <h2>How technology is reshaping learning today</h2>
        <p>
          Most Australian classrooms now blend in‑person teaching with digital platforms:
          learning management systems for content and feedback, collaboration tools for
          group work, and accessibility features (captions, alt text, transcripts) baked
          into mainstream apps. AI adds drafting and practice support—helpful for idea
          generation, differentiation, and quick formative checks—when guided by clear
          expectations and teacher oversight.
        </p>
        <p>
          The core shift is from content delivery to coached practice. Teachers remain the
          anchor for context, motivation, and judgement; technology shortens feedback
          loops and widens access when used intentionally.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Technology amplifies good teaching—it rarely fixes weak pedagogy. Start with
          learning outcomes, then choose the smallest toolset that helps you reach them.
        </QuoteBlock>

        <h2>Benefits you can bank on—when implemented well</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d79dc5fc-6199-4f0a-a050-032b2667ba16.jpg?alt=media&token=5fa6f4ac-6865-4b07-947d-9b497f0dad81" alt="People collaborating in a vibrant tech startup office with a nostalgic 90s film aesthetic, showcasing innovation and teamwork." className="w-full rounded-lg my-8" />

        <p>
          Personalisation: adaptive practice, scaffolded prompts, and AI‑assisted
          explanations can meet learners where they are. Access and inclusion: built‑in
          captions, transcripts, screen readers, and translation lower barriers for
          multilingual and neurodivergent learners. Feedback at pace: shared docs and LMS
          tooling enable timely, targeted feedback and peer review.
        </p>
        <p>
          Efficiency for educators: lesson planning, rubric drafting, and administrative
          tasks can be partially automated, giving more time for facilitation and
          wellbeing. Community: technology makes learning visible, connecting students,
          families, and support staff with clearer progress signals.
        </p>

        <h2>Risks and trade‑offs to manage upfront</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-499d3010-19c1-4376-ad24-58c2df09fcad.jpg?alt=media&token=936da780-4a3a-4ff5-ab51-48c8601331a6" alt="Illustration for Risks and trade‑offs to manage upfront" className="w-full rounded-lg my-8" />

        <p>
          Digital divide: connectivity, device quality, and quiet study spaces are not
          equal—plan offline options and equitable access. Attention and wellbeing:
          distraction is real; build clear routines for when devices are open and when
          they’re closed. Privacy and security: apply Australian Privacy Principles
          (APPs)—minimise data, prefer onshore storage, set strict retention, and vet
          vendors carefully.
        </p>
        <p>
          Academic integrity: design for thinking, process, and oral/observed work; avoid
          over‑reliance on AI “detectors”. Cost and lock‑in: prefer standards‑based tools
          and exportable formats; pilot first, scale second.
        </p>

        <QuoteBlock title="Practical guardrails" variant="orange">
          Default to data minimisation, opt‑in pilots, transparent AI use, and regular
          reviews with students and staff. Document what data leaves your systems—and why.
        </QuoteBlock>

        <h2>AI in Australian classrooms, VET and workplace learning</h2>
        <h3>What’s working now</h3>
        <p>
          Teachers and trainers use AI to draft exemplars and rubrics, create differentiated
          practice, generate formative questions, and summarise student reflections. Students
          use AI for brainstorming, revision plans, and practice explanations—when guided to
          cite and disclose assistance. Accessibility features (captions, transcripts,
          text‑to‑speech) lift participation.
        </p>
        <h3>What to avoid</h3>
        <p>
          “Ban or nothing” approaches tend to drive unsupervised use rather than safer
          habits. Over‑automating feedback can reduce teacher judgement; keep human review
          in the loop, particularly for at‑risk learners. Be cautious of uploading personal
          or sensitive data to third‑party tools.
        </p>
        <p>
          For a broader context, see our overview of the Australian AI ecosystem in
          <Link to="/articles/australian-ai-landscape" className="underline underline-offset-4">
            the Australian AI Landscape
          </Link>
          .
        </p>

        <h2>What the next 3–5 years likely bring</h2>
        <h3>AI‑assisted personalisation, with teacher oversight</h3>
        <p>
          Expect tighter learning loops: diagnose → practice → feedback in minutes, not weeks,
          with teachers orchestrating tasks and safeguarding equity.
        </p>
        <h3>Assessment that values process and explanation</h3>
        <p>
          More oral, observed, and project‑based demonstrations of competence; explicit rules
          for disclosing AI assistance.
        </p>
        <h3>Immersive simulations (AR/VR) for applied practice</h3>
        <p>
          Safer, repeatable practice for practical skills (labs, trades, health) that once
          required scarce equipment or placements.
        </p>
        <h3>Data standards and portability</h3>
        <p>
          Interoperable records follow learners across schools, VET, uni, and work—supporting
          lifelong learning without locking into a single vendor.
        </p>
        <h3>Lifelong learning and micro‑credentials</h3>
        <p>
          Short, stackable credentials aligned to real tasks, with evidence captured across
          platforms.
        </p>

        <ArticleStepList
          title="Start small: a safe pilot that builds evidence"
          steps={[
            'Define learning outcomes and constraints (privacy, budget, devices).',
            'Select a low‑risk use case and a small cohort for 4–6 weeks.',
            'Capture baselines (engagement, rubrics) before the pilot starts.',
            'Complete a privacy impact check; get consent where needed.',
            'Co‑design routines with teachers and students; adjust weekly.',
            'Review results; decide to scale, pause, or retire.'
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists, worksheets, and example documents tailored to this guide."
          buttonLabel="Download now"
          buttonHref="#"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="purple">
          Pilot one workflow at a time. Evidence from a small, well‑run pilot beats a
          platform‑wide rollout with unclear outcomes.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Closing: keep people at the centre</h2>
        <p>
          Technology can widen access, speed feedback, and personalise practice—but the
          heart of learning is still human. Start with outcomes, protect privacy, measure
          what matters, and scale only when the evidence is there.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="Join the MLAI community to collaborate with fellow AI practitioners in Australia."
        buttonText="Get recommendations"
        buttonHref="/contact"
        note="We’re a not‑for‑profit community—friendly, practical, and local."
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
