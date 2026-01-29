/**
 * ARTICLE CONTENT TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
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
 *    - Do NOT use ArticleCallout (deprecated) — use QuoteBlock instead.
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
import { Link } from 'react-router'

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

const TOPIC = 'How to foster community engagement'
export const CATEGORY = 'featured'
export const SLUG = 'how-to-foster-community-engagement'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-29'
export const DATE_MODIFIED = '2026-01-29'
export const DESCRIPTION = 'Practical, Australian-focused guide to foster community engagement: set purpose, include diverse voices, pick methods, close the loop, and measure what matters.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf106b26-0a88-42db-9c1f-6ac3e8d53a9f.jpg?alt=media&token=633f122e-d0b9-4188-aac7-8f1da80c0a63"
const HERO_IMAGE_ALT = 'People collaborating at a community workshop'
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
    question: 'What is community engagement?',
    answer: (
      <>
        Community engagement is a structured, two-way process where an organisation or group invites people who are affected by a decision to contribute views, knowledge, and options — and then shows how those contributions shaped the outcome.
      </>
    ),
  },
  {
    id: 2,
    question: 'How do I increase participation in a new community?',
    answer: (
      <>
        Start with a clear purpose and a small, time-boxed pilot. Offer low-friction actions (one-click polls, 15‑minute office hours), recognise contributions publicly, and share a visible “you said, we did” update within two weeks.
      </>
    ),
  },
  {
    id: 3,
    question: 'Which engagement methods work best?',
    answer: (
      <>
        Match methods to your audience and time: co‑design workshops for depth, asynchronous threads for accessibility across time zones, and community ambassadors to reach people who won’t join formal sessions. Blend online and in‑person to widen access.
      </>
    ),
  },
  {
    id: 4,
    question: 'How do we make engagement inclusive in Australia?',
    answer: (
      <>
        Follow inclusive practice: provide multiple channels and formats, use plain English, consider accessibility needs, compensate or recognise lived‑experience contributors, and proactively engage under‑represented groups in culturally safe ways.
      </>
    ),
  },
  {
    id: 5,
    question: 'How often should we report back to the community?',
    answer: (
      <>
        After every engagement cycle. Share a concise update that maps themes to decisions (what changed, what didn’t, and why). A monthly public summary helps maintain trust and momentum.
      </>
    ),
  },
  {
    id: 6,
    question: 'What metrics matter for engagement quality?',
    answer: (
      <>
        Track active participants, diversity of voices, response times, post‑to‑reply ratio, retention, and the percentage of decisions that cite community input. Qualitative trust signals from surveys/interviews round out the picture.
      </>
    ),
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'How do you encourage participation in a community?', description: 'Make actions low-friction, recognise contributions, and publish a quick “you said, we did” update.' },
    { label: 'How do you measure community engagement?', description: 'Track active members, diversity of voices, response times, retention, and decisions influenced.' },
    { label: 'What makes engagement inclusive?', description: 'Use multiple channels, plain English, accessible formats, and recognise lived-experience input.' },
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
    href: 'https://www.vic.gov.au/better-practice-guide-inclusive-engagement/how-engage-community',
    title: 'How to engage with community — Better Practice Guide: Inclusive engagement',
    publisher: 'State Government of Victoria',
    description: 'Official guidance on planning and running inclusive community engagement in Victoria.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://visiblenetworklabs.com/guides/community-engagement-101/',
    title: 'Community Engagement 101: Ultimate Beginner\'s Guide',
    publisher: 'Visible Network Labs',
    description: 'Overview of engagement strategies and network mapping concepts for practitioners.',
    category: 'analysis',
  },
  {
    id: 3,
    href: 'https://iap2.org.au/resources/iap2-public-participation-spectrum/',
    title: 'IAP2 Public Participation Spectrum',
    publisher: 'IAP2 Australasia',
    description: 'Widely used framework describing levels of participation from Inform to Empower.',
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

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — In Australia, communities engage when the purpose is clear,
          participation is accessible, and updates show how input changed the outcome. This guide
          distils inclusive practice, practical methods, and the metrics that matter so your
          community can contribute with confidence.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          width={1200}
          height={800}
          containerClassName="my-10"
          imageClassName="rounded-3xl"
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'AI practitioners & builders',
              description: 'For engineers and data folks running open, safe community spaces.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & career switchers',
              description: 'Practical ways to contribute, learn, and be heard without overwhelm.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Designers & community leads',
              description: 'Facilitate inclusive, feedback‑rich sessions and report back well.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* Derived from competitor patterns: purpose → inclusivity → methods → loop → metrics */}
        <h2>Set the purpose and scope before inviting people</h2>
        <p>
          Engagement runs on clarity. State the decision or problem, what is “on the table,” who can
          influence it, and when. Define a small pilot window (e.g., two weeks) and the exact
          artefacts you will produce (summary, draft recommendations, implementation plan).
        </p>
        <QuoteBlock title="Key insight" variant="purple">
          People lean in when they can see the line from input to decision — publish that line as a
          simple “you said, we did” table at the end of each cycle.
        </QuoteBlock>

        <h2>Make it inclusive: reach, access, and representation</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fea18046-02c2-4a4a-995f-0a5dc8a6cb5e.jpg?alt=media&token=0ab342e9-2add-4de1-afce-24ce188b4769" alt="Diverse team collaborating in a tech startup, embodying inclusivity and innovation in a retro 90s film style." className="w-full rounded-lg my-8" />

        <p>
          Borrow from inclusive engagement guidance used by Australian public bodies: meet people in
          multiple channels, offer accessible formats, and recognise lived experience. Proactively
          invite under‑represented voices and ensure culturally safe participation.
        </p>
        <ul>
          <li>Offer synchronous and asynchronous options (workshops, forums, email, surveys).</li>
          <li>Use plain English and alt text; provide captions or transcripts for recordings.</li>
          <li>Compensate or formally recognise contributors where appropriate.</li>
        </ul>

        <h2>Choose fit‑for‑purpose engagement methods</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d5506779-4f64-4fa4-9a4e-e7d09bd437c4.jpg?alt=media&token=7301b967-9e82-4efa-97c7-e211eaa0cbed" alt="People collaborating in a vibrant tech startup, styled with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

        <p>
          Match the method to the outcome you need. Blend depth (co‑design) with reach (asynchronous
          prompts) and trust‑building (community ambassadors).
        </p>
        <h3>Co‑design workshops (depth)</h3>
        <p>
          Small, facilitated sessions to unpack needs, sketch options, and test trade‑offs. Publish a
          short read‑out within 48 hours.
        </p>
        <h3>Asynchronous threads and micro‑prompts (reach)</h3>
        <p>
          Use structured prompts in forums or chat to gather ideas over days, enabling people across
          time zones or with caring responsibilities to participate.
        </p>
        <h3>Community ambassadors (trust)</h3>
        <p>
          Equip respected community members to invite peers, summarise local views, and surface
          barriers. Recognise their contribution publicly.
        </p>

        <QuoteBlock title="Practical checklist" variant="orange">
          <ul>
            <li>State the decision, scope, and timeline up front.</li>
            <li>Provide 2–3 participation paths (workshop, async, ambassador).</li>
            <li>Publish a “you said, we did” within two weeks.</li>
          </ul>
        </QuoteBlock>

        <ArticleStepList
          title="Run a two‑week pilot"
          steps={[
            { label: 'Define purpose, scope, and success measures' },
            { label: 'Map stakeholders and inclusion needs' },
            { label: 'Pick 2–3 methods matched to your audience' },
            { label: 'Launch, facilitate, and summarise themes' },
            { label: 'Close the loop: publish what changed and why' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists for planning, running, and reporting on engagement cycles."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <h2>Close the loop and show impact</h2>
        <p>
          After each cycle, map themes to actions. Say what changed, what did not, and the rationale.
          Keep updates short and link to deeper artefacts. This creates accountability and builds
          momentum.
        </p>
        <QuoteBlock title="Pro tip" variant="orange">
          Use a standing URL for updates (e.g., /engagement-updates) so people always know where to
          find the latest “you said, we did.”
        </QuoteBlock>

        <h2>Measure what matters and iterate</h2>
        <p>
          Track both participation and quality. Combine quantitative and qualitative signals to see
          whether engagement is broad, inclusive, and useful.
        </p>
        <ul>
          <li>
            Participation: active members, post‑to‑reply ratio, response times, retention month‑on‑month.
          </li>
          <li>Diversity: representation across demographics, roles, locations.</li>
          <li>Outcomes: decisions influenced by community input; policy or product changes shipped.</li>
          <li>Trust: short pulse surveys and interviews to capture confidence over time.</li>
        </ul>

        <p>
          Want a broader view on peer networks and collaboration? See our
          {' '}
          <Link to="/articles/community-collaboration" className="underline underline-offset-4">
            Community & Collaboration overview
          </Link>
          .
        </p>

        <MLAITemplateResourceCTA />

        <h2>Bring it together: pilot, learn, repeat</h2>
        <p>
          Start small, include widely, and report back quickly. Repeat this two‑week rhythm and you’ll
          build trust, surface better options, and make decisions the community can stand behind.
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
        note="You can filter by topic, format (online/in-person), and experience level."
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