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

const TOPIC = 'How to measure community engagement'
export const CATEGORY = 'community-collaboration'
export const SLUG = 'how-to-measure-community-engagement'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-29'
export const DATE_MODIFIED = '2026-01-29'
export const DESCRIPTION = 'Practical, Australian-focused ways to measure community engagement—combining participation metrics, quality signals, and ethical reporting.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-56a69653-25ee-4655-8801-f0fc0f450e80.jpg?alt=media&token=c2d66679-100c-45fd-996b-e478c9012f1b"
const HERO_IMAGE_ALT = 'Community members collaborating at an AI meetup in Australia'
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
    question: 'What is a good engagement rate for a community?',
    answer:
      'There is no universal benchmark. Establish your own baseline (e.g., % active members per month, median replies per post) and track the trend by cohort (new vs. established members). Compare against your past performance rather than other communities.'
  },
  {
    id: 2,
    question: 'How do we measure the quality of engagement, not just volume?',
    answer:
      'Pair activity metrics with qualitative signals: belonging, trust, reciprocity, and perceived value. Use short pulse surveys (1–5 scale) and 5–10 minute interviews, then theme the comments (e.g., onboarding, moderation, inclusivity).'
  },
  {
    id: 3,
    question: 'Which metrics best predict retention?',
    answer:
      'Early contributions (first 30 days), getting a first reply within 24–48 hours, and attending at least one event in the first quarter are strong predictors. Track: time-to-first-reply, first-month contribution rate, and new-member event attendance.'
  },
  {
    id: 4,
    question: 'How often should we report engagement?',
    answer:
      'Use a lightweight monthly scoreboard (3–5 KPIs) and a deeper quarterly review that includes qualitative insights and actions. Keep the audience in mind—leaders want decisions and risks; facilitators want practical improvements.'
  },
  {
    id: 5,
    question: 'How do we measure engagement across multiple platforms (e.g., Slack, Meetup, Discord)?',
    answer:
      'Instrument each source (exports or APIs) and reconcile to a simple member ID where possible. For small teams, a spreadsheet with monthly snapshots works: paste exports, tag duplicates, and calculate a few standard KPIs.'
  },
  {
    id: 6,
    question: 'What if our community is small? Will metrics be noisy?',
    answer:
      'Yes—focus on rate-based metrics and rolling 3-month averages. Prioritise qualitative inputs and “binary” milestones (e.g., welcomed in first week). Document context (e.g., holidays) to explain swings.'
  }
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'What metrics actually show community engagement?', description: 'Track active members, time-to-first-reply, contribution ratio, event conversion, and peer-resolved help rate.' },
    { label: 'How do you measure engagement quality, not just volume?', description: 'Use short pulse surveys (belonging, value, safety) and interviews; theme comments to find actionable insights.' },
    { label: 'How often should you report engagement metrics?', description: 'Publish a monthly one-page scoreboard and a deeper quarterly review with qualitative insights and actions.' }
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
    href: 'https://engagementhub.com.au/community-engagement/10-ways-measure-community-engagement/',
    title: '10 ways to measure your community engagement',
    publisher: 'Engagement Hub',
    description: 'Practical list of engagement measures used by Australian organisations.',
    category: 'guide'
  },
  {
    id: 2,
    href: 'https://engagementinstitute.org.au/news/beyond-the-numbers-measuring-the-quality-of-community-engagement-inaustralia/',
    title: 'Beyond the numbers: measuring the quality of community engagement in Australia',
    publisher: 'Engagement Institute',
    description: 'Discusses qualitative indicators and how to assess engagement quality, not just volume.',
    category: 'analysis'
  },
  {
    id: 3,
    href: 'https://iap2.org.au/resources/core-values/',
    title: 'IAP2 Core Values & Spectrum of Public Participation',
    publisher: 'IAP2 Australasia',
    description: 'Framework for participation levels that helps align engagement goals and measures.',
    category: 'guide'
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
        summaryHighlights={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      {/* Table of contents placeholder */}
      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — The goal isn’t to chase vanity numbers; it’s to understand whether people are finding value, returning, and contributing. This guide adapts common practice from Australian engagement teams to give you a practical, privacy-safe approach that works for communities of any size.
        </p>
        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Community measurement blends participation metrics with quality signals like trust and belonging."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Community Leads & Facilitators',
              description: 'People running meetups, online groups, or student societies who need clear, lightweight reporting.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange'
            },
            {
              title: 'Students & New Builders',
              description: 'Anyone starting a community or project who wants to set up good measurement from day one.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple'
            },
            {
              title: 'Mentors & Organisers',
              description: 'People supporting multiple groups who need comparable, ethical metrics across platforms.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow'
            }
          ]}
        />
        <h2>Start with purpose: define what “engagement” means for your community</h2>
        <p>
          Tie metrics to the specific behaviours you want to encourage. For an AI study group, that could be “asking questions”, “sharing code”, or “presenting a demo”. For an events-led community, it might be “RSVP-to-attendance conversion” and “first-time attendee return rate”. If a metric doesn’t support a decision (e.g., improve onboarding, adjust event format), it’s noise.
        </p>

        <QuoteBlock title="Key insight" icon={<RocketLaunchIcon className="h-5 w-5" />} variant="purple">
          If you can’t link a metric to a decision you’re willing to make next month, don’t track it.
        </QuoteBlock>

        <h2>Ten practical ways to measure community engagement</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2124e9a4-e6a3-422c-9202-806d6b583147.jpg?alt=media&token=f120f871-c285-453f-b36e-ae5e31af2e37"
          alt="People collaborating in a retro tech space, embodying community engagement and innovation in a vibrant 90s film style."
          caption="Community engagement shows up in shared work, not vanity metrics."
        />

        <p>
          Adapted from Australian engagement practice and platform analytics. Pick 3–5 that directly map to your goals and track them consistently.
        </p>
        <ul>
          <li><strong>Active members (% monthly):</strong> Members who contribute or attend at least once this month.</li>
          <li><strong>New member activation (first 30 days):</strong> % of new members who post, reply, or attend within 30 days.</li>
          <li><strong>Time-to-first-reply:</strong> Median hours until a member’s first post gets a response.</li>
          <li><strong>Reply depth:</strong> Median number of replies per thread (filter out announcements).</li>
          <li><strong>Contribution ratio:</strong> Posts and replies per active member (avoid over-relying on a few super-posters).</li>
          <li><strong>Event conversion:</strong> RSVP → attendance rate and first-time attendee return rate (within 90 days).</li>
          <li><strong>Onboarding completion:</strong> % of newcomers who are welcomed and receive a reply within 7 days.</li>
          <li><strong>Retention:</strong> 90-day retention for new members and 12‑month retention for all members.</li>
          <li><strong>Volunteer health:</strong> Number of active moderators/hosts and their monthly cadence.</li>
          <li><strong>Community help rate:</strong> % of questions resolved by peers (not organisers) within 48 hours.</li>
        </ul>

        <h2>Go beyond the numbers: measuring quality of engagement</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c8eca816-3c2b-446f-955e-811428a1d9d5.jpg?alt=media&token=adbaaa44-67ac-4df7-83f3-df507ca1728c"
          alt="People collaborating in a retro tech startup environment, embodying vibrant 90s film aesthetics."
          caption="Quality of engagement depends on trust, reciprocity, and safety."
        />

        <p>
          Quantity tells you how much is happening; quality tells you whether it matters. Look for signals like trust, reciprocity, psychological safety, and a sense of belonging. Short, repeatable instruments work best: a monthly 2‑question pulse, plus a few interviews each quarter.
        </p>
        <h3>Signals of quality you can capture</h3>
        <ul>
          <li><strong>Belonging:</strong> “I feel welcome here.” (1–5)</li>
          <li><strong>Value:</strong> “I get practical help when I need it.” (1–5)</li>
          <li><strong>Safety:</strong> “I can ask for help without fear of judgement.” (1–5)</li>
          <li><strong>Reciprocity:</strong> Count of help‑giving vs help‑seeking threads; % peer‑resolved.</li>
          <li><strong>Inclusion:</strong> Who speaks, who moderates, and whose work is surfaced.</li>
        </ul>

        <QuoteBlock title="Pro tip" variant="orange">
          Ask fewer, better questions. For example: “I feel a sense of belonging here” (1–5) + “What made the biggest difference this month?”
        </QuoteBlock>

        <h2>Set your baseline and track trends</h2>
        <p>
          Start with a single snapshot month. Define each KPI precisely (denominator, timeframe, exclusions) and document data sources. Track a 3‑month rolling average to smooth volatility—especially in small communities.
        </p>
        <h3>Define “active” and “contribution” clearly</h3>
        <p>
          For example: “Active = posted, replied, or attended an event at least once this month.” “Contribution = posts + replies (excludes announcements and automated messages).” Consistent definitions make reports trustworthy and comparable.
        </p>

        <h2>Ethical, privacy‑safe measurement</h2>
        <ul>
          <li><strong>Consent and clarity:</strong> Tell members what you track and why. Use opt‑outs for surveys.</li>
          <li><strong>Minimise:</strong> Collect the least data needed to make decisions; avoid storing sensitive attributes unless essential.</li>
          <li><strong>De‑identify:</strong> Aggregate reports; share anecdotes with permission and remove identifying details.</li>
          <li><strong>Duty of care:</strong> Avoid “leaderboards” that pressure individuals; recognise teams and collective effort.</li>
        </ul>

        <h2>A lightweight reporting rhythm people actually read</h2>
        <p>
          Create a one‑page monthly update: 3 outcome metrics, 2–3 activity metrics, one quality insight, and 3 actions for the next month. Quarterly, add deeper analysis and member stories.
        </p>

        <ArticleStepList
          title="Set up your measurement in five steps"
          steps={[
            { label: 'Choose 3 outcome KPIs + 3 activity metrics + 3 quality signals.' },
            { label: 'Define baselines and a target range; write exact metric definitions.' },
            { label: 'Instrument your sources (platform exports, event check‑ins, simple forms).' },
            { label: 'Run a monthly 2‑question pulse and 3–5 short interviews.' },
            { label: 'Publish a one‑page report with actions; review quarterly trends.' }
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download lightweight KPI definitions, a monthly one‑pager, and a pulse survey script."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <QuoteBlock title="Action to take this week" variant="purple">
          Pick one goal, one activity metric, and one quality signal. Track them for 30 days and decide what you’ll change next month.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Wrapping up: measure what matters to your community</h2>
        <p>
          Meaningful engagement is visible in both participation and the quality of interactions. Start small, measure consistently, and let results guide improvements in onboarding, facilitation, and event design. Want more on collaboration?{' '}
          <Link to="/articles/community-collaboration" className="underline underline-offset-4">Explore our Community & Collaboration guides</Link>.
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
        note="We’ll respond within 2 business days."
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
