// src/app/(informational)/articles/featured/ai-small-business-australia-checklist-2025/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getFeaturedPeople } from '@server/backend'
import { canonical } from '@/lib/seo'
import { applyArticleRegistryDefaults } from '@/articles/articles-registry'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../data/types'

/** ========== INPUTS ========== */
const TOPIC = 'AI for Small Business in Australia — Practical Checklist'
const CATEGORY = 'featured'
const SLUG = 'ai-small-business-australia-checklist-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-12-31'
const DESCRIPTION = 'A practical 2025 checklist for Australian small businesses using AI. Covers benefits, costs, privacy, tool selection, risks, and next steps. Built by MLAI.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=60'
const HERO_IMAGE_ALT = 'Small business team reviewing an AI workflow on a laptop in a bright office'
const FEATURED_FOCUS = 'ai' as const

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Is using AI legal for small businesses in Australia?',
    answer: (
      <>
        Yes, but you must handle personal information lawfully. Follow the OAIC Privacy Act guidance and the Australian AI Ethics Principles. See{' '}
        <a
          href="https://www.oaic.gov.au/privacy/guidance-and-advice/guide-to-securing-personal-information"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          OAIC security guide
        </a>{' '}
        and{' '}
        <a
          href="https://www.industry.gov.au/publications/australias-ai-ethics-principles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          AI Ethics Principles
        </a>
        .
      </>
    ),
  },
  {
    id: 2,
    question: 'What does AI typically cost a small business in 2025?',
    answer:
      'Most teams start on free tiers, then pay $20–$150 per user/month for AI chat, office add-ons, or automation apps. Allow a few hundred dollars for training or workshops if needed.',
  },
  {
    id: 3,
    question: 'Do I need technical skills to use AI at work?',
    answer:
      'No. Many tools are no‑code. Start with clear use cases (e.g., drafting emails, summaries, customer replies). For data or workflow integration, consider short mentoring or a vetted consultant.',
  },
  {
    id: 4,
    question: 'How do I protect customer data when using AI tools?',
    answer: (
      <>
        Avoid uploading sensitive or identifiable data into consumer tools. Prefer enterprise settings that disable training on your inputs, use data minimisation, and follow the OAIC’s{' '}
        <a
          href="https://www.oaic.gov.au/privacy/guidance-and-advice/australian-privacy-principles-app-guidelines/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          APP Guidelines
        </a>
        . Document what data is shared and why.
      </>
    ),
  },
  {
    id: 5,
    question: 'How long until I see benefits?',
    answer:
      'For focused tasks (e.g., email drafts, meeting notes), expect improvements within 1–2 weeks. For workflow automation or data analysis, allow 2–6 weeks including testing and staff onboarding.',
  },
  {
    id: 6,
    question: 'How do I find the right mentor, course, or program?',
    answer: (
      <>
        Start with your goals and constraints. You can{' '}
        <Link href="/?mode=recommend" className="text-[#1028E0] underline">
          get recommendations
        </Link>{' '}
        and browse community{' '}
        <Link href="/events" className="text-[#1028E0] underline">
          events
        </Link>
        . Check outcomes, privacy stance, and cost transparency before committing.
      </>
    ),
  },
  {
    id: 7,
    question: 'Are there grants or official support for adopting AI?',
    answer: (
      <>
        Programs vary by state and change over time. Use{' '}
        <a
          href="https://business.gov.au/grants-and-programs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          business.gov.au’s grant finder
        </a>{' '}
        and your state small‑business department. Always verify eligibility and deadlines (as at 2025).
      </>
    ),
  },
  {
    id: 8,
    question: 'What are common mistakes to avoid?',
    answer:
      'Buying tools before defining outcomes, pasting sensitive data into consumer AI, skipping small tests, and not measuring results. Start small, write guardrails, and review monthly.',
  },
]

export const metadata: Metadata = {
  title: `${TOPIC} (2025)`,
  description: DESCRIPTION,
  alternates: { canonical: canonical(`/articles/${CATEGORY}/${SLUG}`) },
  openGraph: {
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    url: canonical(`/articles/${CATEGORY}/${SLUG}`),
    type: 'article',
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: HERO_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    images: [HERO_IMAGE],
  },
  keywords: [
    'AI for small business Australia',
    'small business AI checklist',
    'AI tools cost 2025 Australia',
    'OAIC privacy AI',
  ],
}

export default async function Page() {
  const article = applyArticleRegistryDefaults({
    title: `${TOPIC} (2025)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  // Featured people fetch + defensive mapping
  const people = await getFeaturedPeople(FEATURED_FOCUS as any, 8)
  const featuredPeople: FeaturedPersonProfile[] = (people || []).map((p: any, idx: number) => ({
    slug: p.slug || p.person_id || `person-${idx}`,
    name:
      (p.name && String(p.name).trim()) ||
      `${p.first_name || ''} ${p.last_name || ''}`.trim() ||
      'Community member',
    first_name: p.first_name || undefined,
    last_name: p.last_name || undefined,
    headshot: p.avatar || p.avatar_url || p.blurred_avatar_url || '',
    topics: p.topics || p.focus_areas || p.niches || [],
    languages: p.languages || [],
    focus: ((): any => {
      const arr = Array.isArray(p.persona)
        ? p.persona
        : p.persona
        ? String(p.persona)
            .split(',')
            .map((s: string) => s.trim())
        : []
      const first = (arr[0] || '').toLowerCase()
      if (first === 'founder' || first === 'startup') return 'startups'
      if (first === 'ai' || first === 'machine-learning' || first === 'ml') return 'ai'
      if (first === 'product' || first === 'growth') return 'product'
      if (first === 'funding' || first === 'investor' || first === 'legal') return 'funding'
      return p.focus || FEATURED_FOCUS
    })(),
    headline: p.headline || p.role_title || '',
    shortBio: p.shortBio || p.summary || '',
    longBio: p.longBio || p.long_bio || '',
    formats: p.formats || p.offers || [],
    availability: p.availability || [],
    online: !!p.online || !!p.remote || !!p.virtual,
    inPerson: !!p.in_person || !!p.inPerson || !!p.local,
    credentials: p.credentials || p.credBullets || [],
    links: p.links || [],
    city_suburb: p.city_suburb || p.city || '',
    state_region: p.state_region || p.state || '',
    latitude: p.latitude ?? (p.locations?.[0]?.latitude ?? null),
    longitude: p.longitude ?? (p.locations?.[0]?.longitude ?? null),
    place_id: p.place_id ?? (p.locations?.[0]?.place_id ?? null),
    location_id: p.location_id ?? (p.locations?.[0]?.id ?? null),
  })) as any

  return (
    <>
      {/* Inline social tags */}
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description} />
      <meta property="og:image" content={article.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.description} />
      <meta name="twitter:image" content={article.image} />

      <div className="bg-white">
        <ArticleLayout
          article={article}
          faqItems={faqs}
          featuredPeople={featuredPeople}
          featuredPeopleTitle={`AI practitioners experienced in AI for small business`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025 in Australia, small businesses adopt AI under OAIC privacy rules and the AI Ethics Principles, focusing on safe, practical automations over hype.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'Using AI tools to automate tasks, draft content, assist customers and analyse data for small firms, with attention to privacy, accuracy and responsible use.',
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Owners, sole traders, office managers and small teams seeking time savings, better service or insights without hiring engineers or building custom models.',
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Start with clear use cases and free trials; expect 2–8 hours setup and roughly $0–$150/month for common tools, plus optional training or mentoring.',
              },
            ],
          }}
          breadcrumb={
            <Breadcrumbs
              items={[
                { label: 'Articles', href: '/articles' },
                { label: TOPIC, current: true },
              ]}
            />
          }
        >
          {/* 1) Intro alert */}
          <div className="my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm text-indigo-900">
              This guide is part of our small business AI series. Ready to learn the basics first?{' '}
              <Link href="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                Read AI basics →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA */}
          <MLAITemplateResourceCTA />

          {/* 3) Persona grid */}
          <div className="bg-white py-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
                  <p className="text-sm text-gray-700">
                    Turn routine work into measured wins. Use this checklist to decide what to automate, how to protect
                    data, and how to show results.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Learn practical AI skills you can demonstrate in any small business—prompting, workflow design,
                    measurement, and responsible use.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Run workshops with shared language, privacy guardrails, and outcome templates that teams can use the
                    next day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4) TOC mount point */}
          <ArticleTocPlaceholder />

          {/* 5) Main prose intro + hero image */}
          <div className="prose max-w-none">
            <p>
              <strong>AI for small business</strong> is about applying simple, safe tools to real tasks—email drafts,
              meeting notes, customer replies, inventory notes, basic analysis—then measuring whether it helps.
            </p>
            <p>
              At MLAI, we often see teams asking how to start before spending on tools or training. This guide explains
              what to try first, how to protect privacy, what it may cost in 2025, and how to pick support if needed.
            </p>
            <p>
              Where rules, grants, or vendor features differ by state or provider, we note the uncertainty and point to
              official sources so you can check the latest details.
            </p>

            <div className="my-4 w-full">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                width={800}
                height={600}
                className="w-full rounded-2xl"
                priority
              />
            </div>

            {/* 6) Key takeaways */}
            <div className="my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6">
              <h3 className="mb-3 text-lg font-semibold text-[#1028E0]">Key takeaways</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>
                    AI delivers value when tied to <span className="font-semibold">specific, measurable tasks</span>
                    —not vague goals.
                  </li>
                  <li>
                    Start with low‑risk workflows (drafts, summaries, FAQs) and{' '}
                    <span className="font-semibold">avoid sensitive data</span> in consumer tools.
                  </li>
                  <li>Document outcomes and costs so you can compare tool options fairly.</li>
                  <li>Use small experiments to build confidence before integrating systems.</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Pick one use case and one metric (e.g., minutes saved per task).</li>
                  <li>Write guardrails for tone, accuracy, and privacy before you start.</li>
                  <li>Prefer enterprise settings that disable training on your inputs.</li>
                  <li>Review monthly: keep what works, stop what doesn’t.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What is AI for small business?</h2>
            <p>
              In Australia, small businesses use AI to reduce repetitive work, improve responsiveness, and make better
              decisions. Typical tasks include content drafting, meeting transcripts and summaries, customer support
              suggestions, and spreadsheet or email automations. It is <em>not</em> a replacement for judgement—think of
              it as a helpful assistant with clear boundaries.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> Translate goals into testable workflows and metrics.
                </li>
                <li>
                  <strong>Efficiency:</strong> Save minutes on everyday tasks; compound gains across the team.
                </li>
                <li>
                  <strong>Communication:</strong> Shared checklists improve consistency and onboarding.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Guardrails reduce privacy and reputational risks.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need this?</h2>
            <p>
              Use this checklist before buying subscriptions or commissioning custom builds. It helps you decide if a
              free tier is enough, what to test, and when to pause.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New process or repeated task</h3>
                <p className="text-sm text-gray-700">You do the same steps weekly (emails, notes, listings, FAQs).</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Tool selection</h3>
                <p className="text-sm text-gray-700">Comparing AI add‑ons vs standalone apps vs custom scripts.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Customer service improvements</h3>
                <p className="text-sm text-gray-700">Speeding up replies with templates and suggested answers.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">Risk‑aware work</h3>
                <p className="text-sm text-gray-700">When privacy, brand tone, or accuracy matters.</p>
              </div>
            </div>

            <div className="w-full">
              <Image
                src={HERO_IMAGE}
                alt={`${HERO_IMAGE_ALT} — contextual`}
                width={800}
                height={600}
                className="w-full rounded-2xl"
              />
            </div>

            <h2>Why this matters</h2>
            <p>
              A disciplined approach prevents wasted spend and helps teams learn safely. You can also{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                get personalised recommendations
              </Link>{' '}
              for resources or short courses, and explore related hubs like{' '}
              <Link href="/articles/ai/ai-basics" className="font-medium text-[#1028E0] hover:underline">
                AI basics
              </Link>{' '}
              and{' '}
              <Link href="/articles/startups/startup-fundamentals" className="font-medium text-[#1028E0] hover:underline">
                startup fundamentals
              </Link>
              .
            </p>

            <h2 id="choosing-help">Choosing the right help</h2>
            <p>
              Support ranges from self‑guided guides to mentor sessions, workshops, vendor training, and accelerators.
              Match the option to your risk, timeline, and budget.
            </p>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Role / option
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Best for
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Key strengths
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Common formats / tools
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Startup mentor</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritisation, scoping, and avoiding common pitfalls.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Frameworks, decision criteria, intros.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Mentor calls, office hours, reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Feasibility, data, safe deployment.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Technical trade‑offs, evaluation.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prototypes, benchmarks, prompt tests.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Workshop/course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Fast skills for non‑technical teams.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Structured practice, feedback.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Hands‑on exercises, templates.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                Choose the smallest option that delivers evidence (a before/after metric) within your budget and privacy
                constraints. Avoid long contracts until you see value.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, most small businesses start free, then add paid seats or automations once results are clear.
              Costs vary by provider and features; confirm pricing and data terms.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Use community resources and vendor trials first. Check local small‑business programs and business.gov.au
                for grant listings. Availability differs by state/provider and changes over time.
              </p>
            </div>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Option</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Time (approx.)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estimated cost (2025)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">What&apos;s included</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Self‑guided starter path</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$50 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Reading, templates, trials of basic tools.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–6 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$200–$900 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Guided practice, feedback, community.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mentored implementation sprint</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–3 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">$500–$3,000 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Scoping, tests, documentation, handover.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Learning & practice:</strong> 1–3 hours to understand patterns; 1–3 hours to apply.
                  </li>
                  <li>
                    <strong>Implementation:</strong> 2–10 hours depending on tools and integrations.
                  </li>
                  <li>
                    <strong>Review & iteration:</strong> 1–2 hours per cycle.
                  </li>
                  <li>
                    <strong>Mentor feedback:</strong> 30–60 minutes when stuck.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Use free trials and a throwaway dataset for early tests.</li>
                  <li>Consolidate tools; prefer features inside platforms you already pay for.</li>
                  <li>Switch off data sharing/training where available.</li>
                  <li>Track minutes saved; cancel what doesn’t move a metric.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>These six components keep small‑business AI practical and safe.</p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧩 Use case & outcome</h3>
                <p className="text-sm text-gray-700">Define the task, success metric, and what “done” looks like.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🔒 Data & privacy</h3>
                <p className="text-sm text-gray-700">Minimise data, redact sensitive info, document data flows.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🧰 Tool selection</h3>
                <p className="text-sm text-gray-700">Compare features, cost, and data controls; start with trials.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">🗂️ Prompting & workflow</h3>
                <p className="text-sm text-gray-700">Write reusable prompts, templates, and standard operating steps.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">📏 Evaluation</h3>
                <p className="text-sm text-gray-700">Track accuracy, time saved, and quality with simple checks.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Governance & notes</h3>
                <p className="text-sm text-gray-700">Keep a decision log, guardrails, and handover docs.</p>
              </div>
            </div>

            <h2>Comparison: off‑the‑shelf tools vs custom models</h2>
            <p>
              Most small businesses should start with off‑the‑shelf tools: faster setup, lower cost, and fewer security
              decisions. Custom models or fine‑tuning suit larger datasets, unique workflows, or integration needs—after
              you’ve proved value with simpler steps.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Owners get clearer visibility on what works. Staff gain reusable templates that speed up work without
              sacrificing quality. Community leaders can run repeatable sessions with shared guardrails.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      Small business AI checklist &amp; notes
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A printable worksheet to pick use cases, set guardrails, and measure outcomes—plus a decision log
                      you can share with your team or mentor.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/resources/ai-small-business-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Open the checklist
                      </a>
                      <p className="mt-4 text-sm italic text-gray-600">Reviewed by {AUTHOR}. Last updated {DATE_MODIFIED}.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                  <div className="relative group">
                    <a
                      href="/resources/ai-small-business-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg bg-white"
                    >
                      <ImageWithFallback
                        src={HERO_IMAGE}
                        alt={`${TOPIC} resource preview 1`}
                        width={400}
                        height={500}
                        className="h-auto w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="text-sm font-medium text-white">Page 1 preview</span>
                      </div>
                    </a>
                  </div>
                  <div className="relative group">
                    <a
                      href="/resources/ai-small-business-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg bg-white"
                    >
                      <ImageWithFallback
                        src={HERO_IMAGE}
                        alt={`${TOPIC} resource preview 2`}
                        width={400}
                        height={500}
                        className="h-auto w-full transform object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="text-sm font-medium text-white">Page 2 preview</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 9) Finding the right next step */}
            <h2>Finding the right next step</h2>
            <p>
              Clarify your goal, constraints, and the smallest test worth running. Choose one workflow, one tool, and one
              metric; avoid multi‑tool rollouts until you see results.
            </p>
            <p>
              You can use{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI&apos;s recommendations
              </Link>{' '}
              to discover resources and learning paths, and browse upcoming{' '}
              <Link href="/events" className="font-medium text-[#1028E0] hover:underline">
                events
              </Link>
              .
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates reduce friction, keep decisions visible, and help you brief collaborators.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Capture goals, guardrails, and sample prompts in one place.</li>
              <li>Share clear acceptance criteria for review and sign‑off.</li>
              <li>Reuse across tasks; improve it as you learn.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              A measured approach leads to tangible, compounding gains—minutes saved each day, more consistent customer
              responses, and clearer internal documentation.
            </p>
            <p>
              It also builds trust: staff know what’s allowed, leaders see results, and customers get faster, clearer
              communication.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>Sometimes you need deeper work alongside this checklist.</p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & responsible data use</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• When personal or sensitive data is in scope.</li>
                  <li>• Vendor data processing and retention settings.</li>
                  <li>• Recording a data map and purpose limits.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Model evaluation & benchmarking</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Accuracy, tone, bias checks against examples.</li>
                  <li>• Time saved and quality metrics.</li>
                  <li>• Regression checks after updates.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & compliance basics</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Contracts, supplier terms, content rights.</li>
                  <li>• Privacy Act and sector rules (as applicable).</li>
                  <li>• When to consult a qualified professional.</li>
                </ul>
              </div>
            </div>

            {/* 13) Indigo CTA */}
            <div className="my-12">
              <ArticleCompanyCTA
                title={`Ready to take the next step with ${TOPIC}?`}
                body="Get practical recommendations based on your goals, time, and experience level."
                buttonText="Get recommendations"
                buttonHref="/?mode=recommend"
                note="You can filter by topic, format (online/in‑person), and experience level."
              />
            </div>

            {/* 14) Conclusion + action plan */}
            <h2>Conclusion: Your next steps</h2>
            <p>
              You don’t need a big budget to get value from AI. Start small, measure, and keep your privacy settings and
              documentation in order.
            </p>
            <p>
              Use the steps below to move from curiosity to clear results without locking into expensive commitments.
            </p>

            <div className="my-6">
              <h3 className="mb-6 font-semibold text-gray-800">Your action plan</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 1: Download and prepare</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>
                      Download the checklist{' '}
                      <a
                        href="/resources/ai-small-business-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your goal, success metric, and constraints (time, budget, data).</li>
                    <li>List assumptions and the smallest test worth running.</li>
                    <li>Note any deadlines (campaign, meeting, grant).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Decide on self‑guided, mentor support, or a workshop.</li>
                    <li>
                      Use{' '}
                      <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI&apos;s recommendations
                      </Link>{' '}
                      to shortlist options.
                    </li>
                    <li>Check data controls and pricing; avoid long contracts early.</li>
                    <li>Pick one test to run this week.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Use a non‑sensitive sample. Keep scope narrow.</li>
                    <li>Record time taken before vs after.</li>
                    <li>Save prompts/templates that worked.</li>
                    <li>Capture any risks or errors you notice.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Summarise results in plain English.</li>
                    <li>Share with your team or a mentor; get feedback.</li>
                    <li>Decide to iterate, expand, or stop.</li>
                    <li>Update your decision log and guardrails.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Keep one weekly habit (prompt pack, SOP updates).</li>
                    <li>Set a realistic monthly budget for tools.</li>
                    <li>Re‑check official guidance quarterly.</li>
                    <li>Plan your next milestone (handover, training, or a new use case).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 15) FAQ + contact */}
            <div className="my-12">
              <ArticleFAQ items={faqs} />
              <p className="mt-4 text-base text-gray-600">
                If you still have questions after reading this guide, you&apos;re welcome to contact us via the{' '}
                <Link href="/about" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  About page
                </Link>{' '}
                or get tailored recommendations through{' '}
                <Link href="/?mode=recommend" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  MLAI&apos;s recommendations
                </Link>
                .
              </p>
            </div>

            {/* 16) Cross-link banner */}
            <div className="my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm text-indigo-900">
                Ready for the next step?{' '}
                <Link href="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                  Explore AI basics →
                </Link>
              </p>
            </div>

            {/* 17) Repeat resource CTA for pattern consistency */}
            <MLAITemplateResourceCTA />
          </div>
        </ArticleLayout>
      </div>
    </>
  )
}
