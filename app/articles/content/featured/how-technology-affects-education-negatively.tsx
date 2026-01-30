/**
 * ARTICLE CONTENT TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/featured/how-technology-affects-education-negatively.tsx
 * All relative imports below are calculated from that location.
 *
 * ============================================================================
 * CRITICAL ARCHITECTURE RULES - DO NOT VIOLATE
 * ============================================================================
 *
 * 1. NO ArticleLayout: The route handler already wraps content in ArticleLayout.
 *    WRONG: <ArticleLayout>...</ArticleLayout>
 *    RIGHT: <>...</> (React Fragment) or <div>...</div>
 *
 * 2. DESIGN SYSTEM COMPONENTS: Use the design system, not raw HTML:
 *    - For "Who is this for?": <AudienceGrid> (variants: 'orange' | 'purple' | 'yellow')
 *    - For callouts/quotes: <QuoteBlock> (variants: 'purple' | 'orange')
 *    - For images: <ArticleImageBlock>
 *    - NEVER use variant="purple" or variant="purple" - they don't exist!
 *
 * 3. EXPORT DATA: Export faqs, summaryHighlights, and article metadata so the
 *    route handler can pass them to ArticleLayout.
 *
 * 4. BACKGROUND: If using a wrapper div, use `bg-transparent` (NOT bg-white).
 *
 * ============================================================================
 */
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleCompanyCTA from '~/components/articles/ArticleCompanyCTA'
import AuthorBio from '~/components/AuthorBio'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '~/components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '~/components/articles/ArticleFooterNav'
import { QuoteBlock } from '~/components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '~/components/articles/AudienceGrid'
import { ArticleResourceCTA } from '~/components/articles/ArticleResourceCTA'
import { ArticleStepList } from '~/components/articles/ArticleStepList'
import { MLAITemplateResourceCTA } from '~/components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '~/components/articles/ArticleReferences'
import { ArticleDisclaimer } from '~/components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '~/articles/authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How technology affects education negatively'
export const CATEGORY = 'featured'
export const SLUG = 'how-technology-affects-education-negatively'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-27'
export const DATE_MODIFIED = '2026-01-27'
export const DESCRIPTION = 'Evidence-based risks of classroom tech—distraction, screen time, equity, privacy, and AI misuse—plus practical steps for Australian schools.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad2b9095-7c58-48cb-93a0-796ec711627f.jpg?alt=media&token=aedd5035-940a-46bd-a249-0b171a8bc35c"
const HERO_IMAGE_ALT = 'Students using laptops in an Australian classroom'
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
    question: 'Does technology reduce students\' attention in class?',
    answer:
      'It can. Multitasking (switching between tabs/apps) is linked to lower recall and slower task completion. Setting device norms (e.g., notifications off, single-task windows) reduces this risk.'
  },
  {
    id: 2,
    question: 'How much screen time is too much for learning?',
    answer:
      'There\'s no one-size number. Focus on quality and purpose: time-bound, curriculum-aligned tasks with breaks. For younger students, prioritise off-screen activities and sleep hygiene.'
  },
  {
    id: 3,
    question: 'What practical steps cut distraction during laptop use?',
    answer:
      <>Use clear cues (\"screens down\" / \"screens up\"), disable notifications, prefer full-screen apps, seat students so screens are visible, and run short digital blocks with explicit outcomes.</>
  },
  {
    id: 4,
    question: 'Does BYOD widen the digital divide?',
    answer:
      'It can if not managed. Provide loan devices, offline-first resources, low-bandwidth options, and consistent platforms. Budget for repairs, chargers, and connectivity in regional contexts.'
  },
  {
    id: 5,
    question: 'Are AI tools a cheating risk?',
    answer:
      'Yes if tasks are easily auto-completed. Use process-focused assessment (drafts, orals, reflections), set AI-use policies, and teach AI literacy and integrity.'
  },
  {
    id: 6,
    question: 'What privacy checks should schools do before adopting an app?',
    answer:
      <>Confirm data location and retention, review the privacy policy, seek a Data Processing Agreement, enable SSO, restrict permissions by role, and follow Privacy Act (Cth) obligations.</>
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'What are the main negative effects of classroom technology?', description: 'Distraction, shallow learning from multitasking, equity gaps, privacy/security risks, and extra teacher workload.' },
    { label: 'Does screen time harm learning outcomes?', description: 'Excessive or unfocused use links to lower recall and sleep issues; structured, time‑bound tasks mitigate risk.' },
    { label: 'How can schools reduce tech distractions?', description: 'Set device norms, disable notifications, use timed single‑task blocks, and measure impact against non‑tech lessons.' },
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

/** ===== References (curated) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.aitsl.edu.au/research/spotlights/evaluating-the-evidence-for-educational-technology-part-2-enabling-learning',
    title: 'Evaluating the evidence for educational technology — Part 2: Enabling learning',
    publisher: 'AITSL',
    description: 'Australian evidence and guidance on when and how EdTech supports learning.',
    category: 'analysis',
  },
  {
    id: 2,
    href: 'https://www.esafety.gov.au/parents/skills-advice/taming-technology/screen-time',
    title: 'Screen time — advice for parents and carers',
    publisher: 'eSafety Commissioner',
    description: 'Practical guidance on balancing screen use and wellbeing in Australia.',
    category: 'government',
  },
  {
    id: 3,
    href: 'https://www.oaic.gov.au/privacy/privacy-for-organisations/apply-the-privacy-act/app-guidelines/australian-privacy-principles-quick-reference',
    title: 'Australian Privacy Principles — quick reference',
    publisher: 'OAIC',
    description: 'Core privacy obligations relevant to handling student data in Australia.',
    category: 'government',
  },
  {
    id: 4,
    href: 'https://www.unesco.org/en/education/technology/gem-report-2023',
    title: 'Technology in education: A tool on whose terms? (2023 GEM Report)',
    publisher: 'UNESCO',
    description: 'Global synthesis on the promises and pitfalls of technology in education.',
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
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      {/* Table of contents placeholder */}
      <ArticleTocPlaceholder className='bg-transparent' />

      <div className='prose prose-lg prose-slate max-w-none'>
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — This isn’t an anti-tech view; it’s a practical look at the
          downsides that show up in real classrooms. Used without clear purpose or guardrails,
          devices and apps can erode attention, add workload, and widen equity gaps. This guide
          summarises the key risks and shares simple ways Australian schools can reduce harm.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption='Devices can help or hinder. Purpose and classroom norms matter most.'
          width={1200}
          height={800}
          containerClassName='my-10'
          imageClassName='rounded-3xl'
        />

        {/* WHO IS THIS FOR - Use AudienceGrid */}
        <AudienceGrid
          heading='Who is this guide for?'
          cards={[
            {
              title: 'Teachers & school leaders',
              description: 'Practical checks to reduce distraction, risk, and workload.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple',
            },
            {
              title: 'Parents & carers',
              description: 'What to ask schools and how to support healthy screen habits.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow',
            },
            {
              title: 'IT & EdTech teams',
              description: 'Privacy, security, and platform choices that minimise friction.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>What the evidence actually says (Australia)</h2>
        <p>
          Australian sources such as AITSL highlight a consistent theme: technology can support
          learning when it is tightly aligned to a clear objective and well-implemented, but the
          evidence for broad, unbounded use is mixed. The opportunity cost is real — time spent on
          tech activities that don’t improve learning displaces proven practices like retrieval and
          feedback.
        </p>
        <QuoteBlock title='Key insight' variant='purple'>
          Start with the learning outcome, not the tool. If a device or app doesn’t clearly improve
          practice or evidence collection, don’t use it.
        </QuoteBlock>

        <h2>Distraction and attention costs</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c9e1c17b-9f7c-4498-9c23-fbcef948d50a.jpg?alt=media&token=f37ef452-4dd1-46d7-9f0b-ab96064019ab" alt="People engaged in a 90s tech startup, surrounded by retro gadgets, illustrating distraction and attention costs." className="w-full rounded-lg my-8" />

        <p>
          Multitasking (e.g., tab switching, chat) reduces recall and slows progress. Notifications,
          infinite-scroll feeds, and frictionless switching make sustained attention harder. These
          effects are strongest during note-taking and conceptual learning, where deep processing is
          required.
        </p>
        <h3>Classroom norms that help</h3>
        <p>
          Use explicit cues (screens-down/screens-up), single-task windows, and app/site blocking
          where appropriate. Run short, time-boxed digital tasks with visible timers and defined
          outputs; then close laptops to debrief.
        </p>
        <QuoteBlock title='Quick win' variant='orange'>
          Make \"purpose + product\" explicit before devices open: what students will make and how
          you will check it.
        </QuoteBlock>

        <h2>Screen time, sleep, and wellbeing</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-28042f86-bf3f-4719-8070-2db34464a11a.jpg?alt=media&token=0734bc17-36b1-4781-8055-e056e4045232" alt="People in a stylish 90s tech setting, balancing screen time and wellbeing, surrounded by devices and creativity." className="w-full rounded-lg my-8" />

        <p>
          Excess, late-night, or unfocused screen use is associated with sleep disruption and mood
          issues. During school hours, aim for purposeful, time-limited tasks with regular movement
          and off-screen breaks. Coordinate classroom expectations with home guidance so students get
          consistent messages.
        </p>

        <h2>Equity and access: the digital divide</h2>
        <p>
          BYOD and app-heavy programs can entrench inequality when families lack reliable devices,
          repairs, or broadband. Regional and remote contexts face extra hurdles (coverage,
          bandwidth costs, device servicing). Hidden costs — chargers, logins, consumables, time —
          can undermine inclusion.
        </p>
        <h3>Reduce inequity in daily practice</h3>
        <p>
          Provide loan pools, use offline-first resources, and standardise a small toolset across
          subjects. Prefer low-bandwidth options and printable alternatives where appropriate.
        </p>

        <h2>Privacy, security, and AI-specific risks</h2>
        <p>
          Student data can be sensitive. Schools should review data flows, storage locations, and
          vendor retention policies, and align practice with the Australian Privacy Principles.
          Generative AI adds new risks: exposure of personal information, opaque model behaviour,
          biased outputs, and academic integrity concerns.
        </p>
        <h3>Minimum checks before adopting a tool</h3>
        <p>
          Require SSO, role-based permissions, a Data Processing Agreement, and a clear retention
          policy. Avoid tools that require student personal accounts when institution logins are
          available. Set clear classroom AI rules (what’s allowed, what must be student-original).
        </p>

        <h2>Teacher workload and platform sprawl</h2>
        <p>
          Fragmented platforms multiply logins, notifications, and admin tasks. Without tidy
          processes, tech increases workload rather than reducing it. Standardise the minimum set of
          tools, provide short PD focused on classroom routines, and remove rarely-used apps.
        </p>

        <h2>Shallow learning and over-reliance on automation</h2>
        <p>
          Automation (including AI) can short-circuit productive struggle. If tasks are easily
          completed by a chatbot, students may skip retrieval and reasoning. Favour prompts and
          products that require explanation, critique, or synthesis — and collect process evidence
          (drafts, oral checks, reflections).
        </p>

        <ArticleStepList
          title='Mitigate the risks in your context'
          steps={[
            { label: 'Define a learning goal and success measure for any tech use' },
            { label: 'Set device norms: notifications off, single-task, timed blocks' },
            { label: 'Standardise a small toolset; remove low-value apps' },
            { label: 'Run a short pilot; compare outcomes to a non-tech baseline' },
            { label: 'Check privacy: DPA, data location/retention, SSO, least privilege' },
            { label: 'Teach AI literacy and integrity; collect process evidence' },
          ]}
          accent='teal'
        />

        <ArticleResourceCTA
          eyebrow='Resources'
          title={`Get templates for ${TOPIC}`}
          description='Download checklists, lesson planning prompts, and privacy review guides.'
          buttonLabel='Download now'
          buttonHref='/resources'
          accent='purple'
        />

        <QuoteBlock title='Pro tip' variant='purple'>
          If you can’t describe how the tool improves learning — and how you’ll know — it probably
          shouldn’t be in the lesson.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Bottom line</h2>
        <p>
          Technology should earn its place. Use it when it clearly helps students learn, when it
          protects their data, and when it doesn’t add unnecessary workload. Start small, measure,
          and keep what works.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading='Sources & further reading' />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body='MLAI is a not-for-profit community supporting Australia\'s AI practitioners and educators. Get practical recommendations based on your goals and context.'
        buttonText='Connect with MLAI'
        buttonHref='/contact'
        note='Friendly, community-first support.'
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
