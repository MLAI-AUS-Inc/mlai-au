import type { Metadata } from 'next'
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

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = "I've vibe-coded my startup—now what? How to get your MVP in front of users"
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'ive-vibe-coded-my-startup-now-what-how-to-get-your-mvp-in'
const AUTHOR = 'Amelia Tran'
const AUTHOR_ROLE = 'Product & Startup Editor'
const AUTHOR_BIO = 'Amelia helps Australian founders move from build mode to validated traction, with a focus on ethical AI and lean testing.' // e.g. 'Expert in...'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' // Optional
const DATE_PUBLISHED = '2026-02-12'
const DATE_MODIFIED = '2026-02-12'
const DESCRIPTION = 'A practical, Australian-focused guide to move your vibe-coded build into a tested MVP, with user pilots, guardrails, and funding readiness.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a8f7d8bc-9e4a-4112-8b69-729f16129e61.jpg?alt=media&token=4ba2d150-2aa5-4945-9c4a-69013546d9ba"
const HERO_IMAGE_ALT = 'Founder testing a mobile MVP with early users in a coworking space'
const FEATURED_FOCUS = 'startups' // 'startups' | 'ai' | 'product' | 'funding'

export const metadata: Metadata = {
  title: TOPIC,
  description: DESCRIPTION,
  alternates: {
    canonical: `/articles/${SLUG}`,
  },
  openGraph: {
    title: TOPIC,
    description: DESCRIPTION,
    type: 'article',
    url: `/articles/${SLUG}`,
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [{ url: HERO_IMAGE, alt: HERO_IMAGE_ALT }],
  },
  authors: [{ name: AUTHOR }],
  keywords: [CATEGORY, FEATURED_FOCUS, 'MVP', 'startup', 'product validation'],
}

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: 'What makes an MVP “good enough” to test in Australia?', answer: 'It should solve one painful user job, run reliably for a narrow cohort, and comply with local privacy rules (e.g. OAIC Australian Privacy Principles). Polish can wait—signal and safety cannot.' },
  { id: 2, question: 'Do I need legal terms before my first pilot?', answer: 'Yes. Provide clear Terms of Use and a Privacy Policy that explains data handling, retention, and third-party services. For AI features, disclose model use and known limitations.' },
  { id: 3, question: 'How many users do I need to validate?', answer: 'Aim for 8–12 structured pilot users first. That’s usually enough to find ~80% of critical usability issues, provided you capture evidence and iterate weekly.' },
  { id: 4, question: 'Can I charge for a pilot?', answer: 'You can, but be transparent. A small fee or commitment (e.g. prepaid month) improves signal. For regulated sectors (health/finance), check if your pilot scope triggers licensing or clinical oversight.' },
  { id: 5, question: 'How do I collect feedback without bias?', answer: 'Use consistent prompts, record sessions (with consent), and separate “observation” from “interpretation.” Avoid leading questions; ask users to show how they’d complete tasks.' },
  { id: 6, question: 'Where do I find my first Australian users?', answer: (
    <ul className="list-disc pl-6 space-y-1">
      <li>Existing LinkedIn contacts filtered by role and industry.</li>
      <li>Local meetups (e.g. meetup.com) and university societies with aligned problems.</li>
      <li>Communities like Fishburners, Stone & Chalk, and accelerator alumni channels.</li>
    </ul>
  ) },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'How many users do I need to validate an MVP?',
      description: '8–12 structured pilot users usually surface ~80% of critical issues when you iterate weekly.',
    },
    {
      label: 'Do I need a Privacy Policy before testing?',
      description: 'Yes. Publish Terms and a Privacy Policy that explain data handling and AI model use per OAIC APPs.',
    },
    {
      label: 'Should I charge for early pilots?',
      description: 'A small, transparent fee or commitment improves signal; check sector rules if handling regulated data.',
    },
  ],
}

const breadcrumbs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Articles', href: '/articles' },
  { label: TOPIC, current: true },
]

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <article className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
          <p>
            <strong>{TOPIC}</strong> – You’ve shipped a working build from late nights and lots of intuition. The fastest way to real traction in 2026 Australia is to move from “it runs” to “it proves one clear outcome” with paying, consenting users and a short learning loop.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

          {/* SECTION PATTERN: Research-Derived H2 */}
          <h2>Define one measurable outcome and user job</h2>
          <p>
            Anchor your MVP to a single job-to-be-done with a measurable outcome. For example: “Reduce weekly reporting time for finance managers by 30%.” Document the success metric, the target role, and the environment (desktop/mobile, in-office/on-site). This lets you judge progress in days, not months.
          </p>

          {/* SECTION PATTERN: Callout Box */}
          <QuoteBlock variant="orange" title="Fast validation tip" icon="💡">
            Write a one-sentence win condition: “A &lt;role&gt; can &lt;task&gt; in &lt;time&gt; without help.” Use it to prioritise fixes and to decide if a feature ships or waits.
          </QuoteBlock>

          {/* SECTION PATTERN: Additional H2s (generate 3-6 more based on research) */}
          <h2>Set up consent, privacy, and reliability guardrails</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4095424-42c2-4fe9-9456-90aeb986efba.jpg?alt=media&token=1f7865ee-1cd6-457d-a677-1849705be738" alt="People in a tech startup setting, showcasing 90s film aesthetic and collaboration on privacy and consent strategies." className="w-full rounded-lg my-8" />

          <p>
            Before adding more features, ensure your pilot is safe to run. Publish clear Terms of Use and a Privacy Policy that match how you actually process data. If you use AI services, disclose the model provider and data flows. Avoid production secrets in client-side code, and keep logs minimal. For personal information, align with the Australian Privacy Principles (APPs) from the Office of the Australian Information Commissioner (OAIC). Reliability: add basic monitoring (uptime + errors), a single rollback path, and clear in-product status messaging.
          </p>

          <h2>Recruit 8–12 pilot users with structured sessions</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-32d7ab6a-f3ff-42b7-ad38-721f192cf8e2.jpg?alt=media&token=3bb0ee21-6ae1-48e9-9cb4-42897d5d54a9" alt="Diverse group collaborating in a 90s tech startup, preparing for structured user recruitment sessions." className="w-full rounded-lg my-8" />

          <p>
            Start with warm networks: LinkedIn 2nd-degree searches, local meetups, and university clubs tied to your problem domain. Offer a short incentive (gift card or early pricing) and block 45-minute moderated sessions. Use a repeatable script: context questions, 2–3 core tasks, time-on-task measurement, and open feedback. Record sessions with consent. After each session, capture observations (what happened), interpretations (what it might mean), and decisions (what to change this week).
          </p>

          <h3>Format your pilot</h3>
          <p>
            Run a two-week sprint: 3–5 users in week one, iterate, then 3–7 users in week two to confirm improvements. Keep your change log public to pilots so they see momentum.
          </p>

          <h2>Price testing: earn signal, not perfect revenue</h2>
          <p>
            Introduce pricing early to test willingness-to-pay. Choose one simple offer (e.g. monthly subscription or per-seat) and one anchor discount for early adopters. If you work in regulated industries, confirm whether charging makes you a service provider under relevant rules (e.g. health data handling). Capture objections verbatim; they inform both product and positioning.
          </p>

          <h2>Instrument learning loops (evidence over opinions)</h2>
          <p>
            Add lightweight analytics focused on the core job: task completion rate, time to complete, error/retry counts, and retention after first week. Pair numbers with qualitative notes from sessions. Ship weekly releases and share a short pilot report covering metric movement, top issues, and the next bet. This rhythm builds credibility with early customers and future investors.
          </p>

          <h2>Prep a lean “MVP packet” for partners and investors</h2>
          <p>
            Create a single page that includes: the user/job, the win condition, 2–3 screenshots, your metric baseline, quotes from pilot users (with permission), pricing test results, and your next 4-week plan. Keep claims cautious—note known gaps, AI limitations, and risk mitigations. This packet accelerates conversations with accelerators, grant programs, and seed investors.
          </p>

          {/* SECTION PATTERN: Persona Grid using AudienceGrid */}
          <AudienceGrid
            heading="Who this helps"
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

          {/* SECTION PATTERN: Conclusion/Summary */}
          <h2>Move from vibe-coded to validated in four weeks</h2>
          <p>
            Keep your MVP narrow, safe, and measurable. Run two pilot cycles, report progress weekly, and ship visible changes. With a clear win condition, evidence from 8–12 users, and transparent privacy practices, you will have the traction story needed for early revenue, partnerships, or a compelling pre-seed discussion.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Write your one-sentence win condition and publish your pilot scope.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Schedule 8–12 pilot sessions with a consistent script and consent flow.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Ship weekly, publish a short pilot report, and update your MVP packet.</span>
              </li>
            </ul>
          </div>

          <div className="my-12 not-prose">
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="#"
              note="You can filter by topic, format (online/in‑person), and experience level."
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </article>
  )
}
