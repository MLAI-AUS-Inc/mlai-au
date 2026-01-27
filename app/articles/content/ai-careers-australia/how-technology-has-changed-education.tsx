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

const TOPIC = 'How technology has changed education'
export const CATEGORY = 'featured'
export const SLUG = 'how-technology-has-changed-education'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-15'
export const DATE_MODIFIED = '2026-01-27'
export const DESCRIPTION = 'A practical Australian look at how technology reshaped learning, teaching and assessment—covering access, personalisation, collaboration, risks, and next steps.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0536c018-0450-4ef6-bc45-46686799945c.jpg?alt=media&token=f79f1f9d-f5b6-41ca-8df5-35f1dce4af2f"
const HERO_IMAGE_ALT = 'Students in a blended classroom using laptops and a digital whiteboard'
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
    question: 'What are the biggest ways technology has changed education?',
    answer:
      'Access (online and blended delivery), faster and more personalised feedback, collaborative tools, and data‑informed teaching have reshaped how Australia learns—while keeping the teacher–student relationship central.',
  },
  {
    id: 2,
    question: 'Does technology improve learning outcomes?',
    answer:
      'When paired with good pedagogy and clear goals, technology can improve engagement and feedback speed. Outcomes vary by context—implementation quality matters more than the tool itself.',
  },
  {
    id: 3,
    question: 'What are the downsides or risks?',
    answer:
      'Distraction, inequity (device/data access), and privacy concerns. Mitigate with clear policies, accessible design, offline options, and minimal‑distraction modes.',
  },
  {
    id: 4,
    question: 'How has the teacher’s role changed?',
    answer:
      'Teachers increasingly orchestrate learning—using tech for routine feedback, admin and content delivery—so they can focus on relationships, higher‑order thinking, and authentic assessment.',
  },
  {
    id: 5,
    question: 'How can students pick reliable ed‑tech tools?',
    answer:
      'Check evidence of effectiveness, accessibility features, privacy settings, and total cost. Prefer tools that support your learning goals and integrate with your institution’s systems.',
  },
  {
    id: 6,
    question: 'Where does AI fit in education?',
    answer:
      'AI can support drafting, practice, and feedback. Use it responsibly: keep privacy in mind, cite sources, follow academic integrity rules, and prioritise understanding over automation.',
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'Does technology improve student outcomes?', description: 'When paired with good pedagogy, tech can speed feedback and boost engagement; impact varies by context.' },
    { label: 'How has technology changed assessment?', description: 'More formative quizzes, faster feedback and analytics; authentic, real‑world tasks still matter most.' },
    { label: 'What are the biggest risks?', description: 'Distraction, inequity and privacy; mitigate with clear policies, accessibility and offline options.' },
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
    href: 'https://education.purdue.edu/news/2024/01/01/how-has-technology-changed-education/',
    title: 'How Has Technology Changed Education?',
    publisher: 'Purdue University College of Education',
    description: 'Overview of how technology affects access, personalisation, collaboration and the teacher role.',
    category: 'analysis',
  },
  {
    id: 2,
    href: 'https://studyonline.ecu.edu.au/blog/teachers-and-technology',
    title: 'How Collaboration Between Teachers and Technology Can Improve Education',
    publisher: 'ECU Online',
    description: 'Discusses teacher–technology collaboration and practical classroom improvements.',
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

      <div className="prose prose-lg prose-slate max-w-none">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — In Australia, classrooms and lecture theatres have moved from
          paper‑first to digital‑by‑default. Rather than asking whether technology replaces teaching,
          the useful question is how it changes access, collaboration, feedback and assessment — and
          which trade‑offs to manage so learners actually benefit.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Blended learning in practice: devices and shared displays enable flexible delivery."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating ideas, seeking funding, or managing teams.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>What has actually changed in classrooms and lecture theatres?</h2>
        <p>
          The core shift is structural: content is now accessible on demand (LMS, video, cloud docs),
          classrooms are hybrid‑ready, and assessments increasingly combine in‑person tasks with
          digital submissions. For many Australian schools, TAFEs and universities, micro‑credentials
          and flexible timetabling extend learning beyond a fixed campus week.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Technology delivers the most value when it frees teacher time for feedback and higher‑order
          learning, rather than simply moving lectures from a room to a screen.
        </QuoteBlock>

        <h2>Access and flexibility: online, blended and micro‑credentials</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b69469f9-6322-4f77-bded-0fe9fa4e0d43.jpg?alt=media&token=fbfce89e-cba1-4a4b-8c7e-425fe04f80e0"
          alt="People collaborate in a tech startup setting, showcasing access and flexibility in online learning environments."
          caption="Access and flexibility for learners beyond the classroom."
        />

        <p>
          Online and blended delivery broaden who can participate — regional learners, carers, and
          people working part‑time. Recorded lectures and flexible labs reduce timetable friction, and
          short micro‑credentials let Australians upskill without committing to a full degree. The
          trade‑off is ensuring equitable device/data access and maintaining engagement without
          overloading learners.
        </p>

        <h2>Personalised learning and assessment: adaptive platforms and fast feedback</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-07d35ee9-4b67-40d3-beef-a74b10562150.jpg?alt=media&token=7862f921-cc7a-4770-b0de-c2e3fa152c73"
          alt="Diverse team collaborating in a tech startup, showcasing personalized learning and adaptive assessment tools."
          caption="Adaptive tools can personalise feedback for diverse learners."
        />

        <p>
          Low‑stakes quizzes, interactive notebooks, and adaptive practice tools offer immediate
          feedback and targeted exercises. Analytics help educators spot misconceptions early. These
          gains rely on clear learning outcomes and authentic tasks — otherwise tools can drift into
          busywork or feel punitive.
        </p>

        <h3>Has technology improved outcomes?</h3>
        <p>
          Evidence suggests technology can improve engagement and the speed/quality of feedback when
          aligned to sound pedagogy. Impact depends on implementation: pacing, task design, and how
          teachers use insights to adjust instruction matter more than the brand of tool.
        </p>

        <h2>Teacher–technology collaboration: planning, feedback and co‑design</h2>
        <p>
          The strongest improvements come when technology augments teacher practice: streamlining
          admin, centralising resources, and supporting timely feedback. Professional learning and
          collaborative planning time help staff co‑design activities that use tools intentionally,
          not incidentally.
        </p>

        <QuoteBlock title="Co‑teaching with tech" variant="orange">
          Let tools handle routine admin and practice feedback; teachers invest time where it counts —
          relationships, thinking skills, and targeted support.
        </QuoteBlock>

        <h2>Collaboration and community: from group chats to cloud documents</h2>
        <p>
          Real‑time documents, version history, and shared whiteboards make peer learning visible and
          reviewable. Students can contribute asynchronously, record short presentations, and reflect
          with timestamps. Clear norms (naming files, roles, conflict resolution) keep collaboration
          constructive.
        </p>

        <h2>The cons: distraction, equity gaps, and privacy risks</h2>
        <p>
          Always‑on devices can fragment attention; not all learners have reliable hardware or data;
          and platforms vary in privacy controls. Australian contexts also need to consider data
          retention, parental consent, and academic integrity when using AI‑enabled tools.
        </p>

        <h3>How to reduce the downside in Australian contexts</h3>
        <p>
          Use minimal‑distraction modes (focus settings, locked browsers) for key tasks, provide
          offline or low‑bandwidth options, and teach students to manage notifications. Prefer tools
          with transparent privacy controls and accessibility features, and make expectations explicit
          (e.g., what AI assistance is allowed and how to acknowledge it).
        </p>

        <QuoteBlock title="Practical checklist" variant="purple">
          Default to low‑distraction settings, provide offline options, set clear AI/use policies,
          and align tools to authentic outcomes you can observe.
        </QuoteBlock>

        <ArticleStepList
          title="Step‑by‑step actions"
          steps={[
            { label: 'Define one learning outcome you want to improve (e.g., faster feedback).' },
            { label: 'Pick a low‑friction tool that fits your context and privacy needs.' },
            { label: 'Run a 2–3 week pilot with clear norms (focus modes, file naming, roles).' },
            { label: 'Measure what changed: engagement, feedback speed/quality, outcomes.' },
            { label: 'Iterate or swap tools; keep what measurably helps learning.' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists, pilot plans, and example class norms tailored to this guide."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <QuoteBlock title="Pro tip" variant="orange">
          Start small. One outcome, one class, one tool. Measure, then scale what works.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Closing thoughts: tools change, good teaching endures</h2>
        <p>
          Technology will keep shifting — from LMS features to AI‑assisted feedback — but the anchor
          stays the same: clear learning goals, inclusive design, and timely feedback. Use evidence,
          run short pilots, and share what works with your community. That’s how Australian learners
          benefit at scale.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="Join the MLAI community to collaborate with peers across Australia."
        buttonText="Get in touch"
        buttonHref="/contact"
        note="Not‑for‑profit, community‑first."
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
