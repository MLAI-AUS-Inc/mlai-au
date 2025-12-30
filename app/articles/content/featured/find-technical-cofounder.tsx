// src/app/(informational)/articles/featured/find-technical-cofounder/page.tsx
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
import ArticleCompanyHighlightCTA from '../../../components/articles/ArticleCompanyHighlightCTA'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Finding a Technical Cofounder in Australia'
const CATEGORY = 'featured'
const SLUG = 'find-technical-cofounder'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-12-30'
const DESCRIPTION = 'How to find a technical cofounder in Australia in 2025: practical routes, outreach scripts, equity norms, legal basics, and community pathways. From the MLAI team.'
const HERO_IMAGE = 'https://mlai.au/images/articles/technical-cofounder-hero-1200x630.jpg'
const HERO_IMAGE_ALT = 'Two founders reviewing architecture and product diagrams on a whiteboard'
const FEATURED_FOCUS = 'startups'
const RESOURCE_HREF = '/resources/technical-cofounder-outreach-playbook'
const CROSSLINK = '/articles/startups/startup-fundamentals'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What does a technical cofounder actually do?',
    answer:
      'Typically leads product architecture and delivery (stack choices, prototypes, deployment) while sharing responsibility for customer discovery, prioritisation, hiring, and governance. Titles vary (CTO, Head of Engineering).',
  },
  {
    id: 2,
    question: 'Where do Australians usually find technical cofounders in 2025?',
    answer:
      'Common pathways: local meetups and hackathons, university societies, accelerator tryouts, startup Slack/Discord groups, alumni networks, open-source projects, and targeted outreach to engineers with relevant domain experience.',
  },
  {
    id: 3,
    question: 'How long does it take to find the right cofounder?',
    answer:
      'Plan for 4–12 weeks of deliberate outreach and working sessions. Many teams run 2–3 mini‑projects to test collaboration fit before formalising roles or equity. Timelines vary by network and domain.',
  },
  {
    id: 4,
    question: 'How much equity should a technical cofounder get in Australia?',
    answer:
      'There is no standard. Early equal commitment can look like 50/50. If one person is part‑time, late, or cash‑compensated, splits adjust. Consider vesting, cliffs, IP assignment, and a founders’ deed. Seek legal advice.',
  },
  {
    id: 5,
    question: 'Are there free or low‑cost options to get started?',
    answer:
      (
        <>
          Yes. Community meetups and hackathons (often free), university clubs, open‑source contributions, and targeted LinkedIn/GitHub outreach are $0–$50 pathways. You can also use{' '}
          <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
            MLAI’s recommendations
          </Link>{' '}
          to map routes that fit your time and budget.
        </>
      ),
  },
  {
    id: 6,
    question: 'What should we test before we decide to be cofounders?',
    answer:
      'Alignment on problem, customer, pace, and decision style; a small build together (1–2 sprints); code ownership and IP expectations; availability; and how you handle disagreement. Write outcomes down.',
  },
  {
    id: 7,
    question: 'How do we reduce legal risk at the start?',
    answer:
      'Use a clear founders’ deed or shareholders’ agreement with vesting and IP assignment. Keep sensitive data out of shared repos until roles are agreed. Get advice from a qualified lawyer for your structure.',
  },
  {
    id: 8,
    question: 'Should I hire a contractor or seek a cofounder?',
    answer:
      'If delivery is bounded and you can specify outcomes, contracting can be faster. If the product requires ongoing technical leadership and trade‑offs, a cofounder may make more sense. You can start with a trial.',
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
    'find technical cofounder',
    'technical cofounder Australia',
    'startup cofounder search',
    'equity split cofounders',
    'CTO cofounder',
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
          featuredPeopleTitle={`Mentors experienced in cofounder matching and early hiring`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025 in Australia, most successful cofounder matches come from deliberate outreach, community participation, and small trial projects with clear expectations and written agreements.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'A practical process to meet, test, and formalise a partnership with a builder who can lead product and technology with you.',
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Non‑technical founders, small teams needing technical leadership, students forming startups, and community organisers matching builders with validated problems.',
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Start with free meetups and outreach; expect 4–12 weeks of trials. Costs range $0–$2k for events/courses; equity and legal costs vary by structure.',
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
              This guide is part of our broader series on early‑stage teaming. Prefer to jump ahead?{' '}
              <Link href={CROSSLINK} className="font-semibold text-[#1028E0] hover:underline">
                Read startup fundamentals →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA (swap component when a topic-specific CTA exists) */}
          <MLAITemplateResourceCTA />

          {/* Small highlight CTA to avoid unused import and provide value */}
          <div className="my-4">
            <ArticleCompanyHighlightCTA
              title="Not sure where to start?"
              body="Get a shortlist of meetups, outreach scripts, and trial project ideas tailored to your goals."
              buttonText="Get recommendations"
              buttonHref="/?mode=recommend"
            />
          </div>

          {/* 3) Persona grid */}
          <div className="bg-white py-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
                  <p className="text-sm text-gray-700">
                    Learn the fastest safe routes to meet, evaluate, and trial work with potential technical cofounders—before you commit equity.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Turn portfolio projects and hackathons into real collaborations, and understand equity, IP, and expectations in plain English.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Use this as a shared reference for mixers, matchmaking, and mentor sessions—helping people align on goals and trial projects.
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
              <strong>{TOPIC}</strong> is about finding the right person, not just the right skills. You need alignment on
              problem, pace, and how decisions happen—then a small project to test collaboration in the real world.
            </p>
            <p>
              At MLAI, we often see founders asking how to approach cofounder search before they spend time or money on
              programs and tools that don’t match their stage. This guide focuses on practical, low‑risk steps.
            </p>
            <p>
              Where rules or norms vary (equity, agreements, accelerator terms), we say so plainly. As at 2025, most
              Australian teams benefit from written expectations, vesting, and clear IP assignment from day one.
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
                    Cofounder search is used to <span className="font-semibold">turn a validated problem into a buildable, maintained product</span>.
                  </li>
                  <li>
                    It matters when deciding <span className="font-semibold">roles, equity, delivery pace, and how you’ll make trade‑offs</span>.
                  </li>
                  <li>Run a small trial: define scope, deliver, retrospect—before any equity paperwork.</li>
                  <li>Write expectations down: availability, scope, decision style, IP ownership, vesting.</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Start with free community routes and warm intros; expand to targeted outreach.</li>
                  <li>Lead with the customer problem and outcomes—not just the idea or tech stack.</li>
                  <li>Use vesting and a cliff; avoid irreversible splits before you’ve worked together.</li>
                  <li>Protect privacy and repos until roles and IP assignment are agreed.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What is finding a technical cofounder?</h2>
            <p>
              It’s a deliberate process to meet, evaluate, and formalise a partnership with someone who can lead product
              and technology with you. It includes outreach, trial projects, reference checks, and eventually an
              agreement covering roles, vesting, and IP.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> Aligns goals, scope, and decision rights before equity.
                </li>
                <li>
                  <strong>Velocity:</strong> Converts discovery into shipping through shared ownership and cadence.
                </li>
                <li>
                  <strong>Trust:</strong> Trial work surfaces working style and communication gaps early.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Highlights legal, IP, and data‑handling needs from day one.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need this?</h2>
            <p>
              Use a cofounder search when you have strong problem conviction, early validation, or domain access—but need
              durable technical leadership to build, iterate, and maintain the product.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New idea or pivot</h3>
                <p className="text-sm text-gray-700">You’ve validated demand and now need a partner to turn it into a product roadmap and MVP.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Tooling and platform choices</h3>
                <p className="text-sm text-gray-700">You need ongoing judgment on stack, feasibility, and cost of change—not one‑off code.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Acceleration and programs</h3>
                <p className="text-sm text-gray-700">Applications often ask for team capability, delivery evidence, and responsible data practices.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">High‑stakes domains</h3>
                <p className="text-sm text-gray-700">When privacy, safety, or uptime matters, leadership and guardrails are essential.</p>
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
              The right partner accelerates learning and reduces costly detours. Clear expectations and a trial project
              help you avoid misalignment that can derail momentum and relationships.
            </p>
            <p>
              If you’re unsure where to begin, you can{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                get personalised recommendations
              </Link>{' '}
              or browse our hubs such as{' '}
              <Link href="/articles/startups/startup-fundamentals" className="font-medium text-[#1028E0] hover:underline">
                Startup Fundamentals
              </Link>{' '}
              and{' '}
              <Link href="/articles/ai/ai-basics" className="font-medium text-[#1028E0] hover:underline">
                AI Basics
              </Link>
              .
            </p>

            <h2 id="choosing-help">Choosing the right help</h2>
            <p>
              Depending on stage, consider self‑guided resources, mentor sessions, community programs, or structured
              accelerators. Optimise for credibility, clarity of outcomes, and transparent costs.
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
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritisation and decision‑making; avoiding common team pitfalls.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Pattern recognition, frameworks, intros, accountability.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Office hours, strategy sessions, pitch/plan reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Technical practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Feasibility checks and stack choices; safe, cost‑aware delivery.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Trade‑offs, testing, deployment, observability.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prototypes, benchmarks, code reviews, audits.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Community program</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Warm intros, peers, and practice with low cost.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Network density, shared norms, accountability.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Meetups, hackathons, founder circles, Slack/Discord.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                When comparing options, prioritise evidence of delivery and clear expectations for trial work. Avoid
                irreversible equity decisions until you’ve shipped something together.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, you can run an effective search primarily through free community routes and targeted outreach.
              Budget for a few event tickets, legal setup, and time for trial work.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Mix free meetups/hackathons, university clubs, alumni groups, open‑source, and online communities. Add
                selective workshops or short courses if you need structure. Eligibility and costs differ by provider.
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
                    <td className="px-6 py-4 text-sm text-gray-700">3–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$50 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Outreach scripts, shortlist, 1–2 trial ideas, community events.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1 day–6 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$200–$2,000 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Curriculum, feedback, peer network, accountability.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal setup (basic)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">$1,000–$5,000 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Founders’ deed/shareholders’ agreement, vesting, IP assignment.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Networking & outreach:</strong> 1–3 hours/week across 4–12 weeks.
                  </li>
                  <li>
                    <strong>Trial project:</strong> 6–20 hours over 1–3 sprints.
                  </li>
                  <li>
                    <strong>Review & reference checks:</strong> 2–4 hours.
                  </li>
                  <li>
                    <strong>Agree & formalise:</strong> 2–6 hours (with legal review).
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Prioritise free community and warm intros before paid platforms.</li>
                  <li>Use a narrow trial scope; avoid long unpaid commissions.</li>
                  <li>Standard vesting reduces risk without heavy legal spend upfront.</li>
                  <li>Document decisions to prevent rework and misunderstandings.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>These areas help you run a safe, focused cofounder search.</p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧩 Vision & value proposition</h3>
                <p className="text-sm text-gray-700">A crisp problem statement, target user, and evidence you’re solving something real.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🏗️ Skills matrix & gap analysis</h3>
                <p className="text-sm text-gray-700">What you bring, what you need, and how roles evolve over the first year.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🎯 Trial project design</h3>
                <p className="text-sm text-gray-700">Two‑week scope to test collaboration, delivery, and decision style.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">👥 Working norms</h3>
                <p className="text-sm text-gray-700">Availability, pace, decision rights, review cadence, and conflict handling.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">🔒 Legal & IP basics</h3>
                <p className="text-sm text-gray-700">Founders’ deed/shareholders’ agreement, vesting/cliff, IP assignment.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Evidence & portfolio fit</h3>
                <p className="text-sm text-gray-700">Github, demos, references, and domain narratives that show fit.</p>
              </div>
            </div>

            <h2>Comparison: Cofounder vs contractor</h2>
            <p>
              Contractors are ideal for defined deliverables when you can specify scope and handover. Cofounders are best
              when ongoing technical leadership and product judgment are core to the venture. You can start with a
              contractor and evolve to cofounder if collaboration excels.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              A structured search reduces risk and improves velocity. Founders make clearer decisions; learners gain
              real‑world collaboration experience; community organisers gain shared language for events and mentoring.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      Technical Cofounder Outreach Playbook
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A practical checklist with outreach scripts, trial project templates, reference‑check questions,
                      and a one‑page founders’ alignment canvas.
                    </p>
                    <div className="mt-8">
                      <a
                        href={RESOURCE_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Open the checklist
                      </a>
                      <p className="mt-4 text-sm italic text-gray-600">
                        Reviewed by {AUTHOR}. Last updated {DATE_MODIFIED}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                  <div className="relative group">
                    <a
                      href={RESOURCE_HREF}
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
                      href={RESOURCE_HREF}
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
              Start with a crisp problem statement and a shortlist of people to contact. Run one small trial project with
              a clear scope and retrospective. Keep decisions reversible until trust is earned.
            </p>
            <p>
              You can use{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI&apos;s recommendations
              </Link>{' '}
              to discover events, outreach scripts, and learning paths, and browse upcoming{' '}
              <Link href="/events" className="font-medium text-[#1028E0] hover:underline">
                community events
              </Link>
              .
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Simple templates keep you focused on evidence over hype and help align expectations across busy schedules.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Gather your problem statement, assumptions, and success criteria in one place.</li>
              <li>Brief collaborators quickly with trial scope, timeline, and definition of done.</li>
              <li>Record decisions, references, and outcomes for future hires and investors.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              A deliberate, evidence‑first cofounder search reduces false starts and protects relationships. It gives you
              a repeatable way to evaluate fit without overcommitting early.
            </p>
            <p>
              This approach also improves communication with mentors and programs because you can show a trail of
              decisions, experiments, and delivery—not just intent.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>In some situations, you may want deeper support alongside your search.</p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Founder agreements & IP</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Vesting with a 12‑month cliff.</li>
                  <li>• IP assignment and confidentiality.</li>
                  <li>• Company vs. partnership implications.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Trial design & evaluation</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Two‑week scope and success metrics.</li>
                  <li>• Reference checks and portfolio review.</li>
                  <li>• Retrospectives and decision logs.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ Risk & compliance basics</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Privacy and data handling.</li>
                  <li>• Domain‑specific obligations.</li>
                  <li>• When to seek professional advice.</li>
                </ul>
              </div>
            </div>

            {/* 13) Indigo CTA (Generic ArticleCompanyCTA) */}
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
              You don’t need a massive network or budget to run a great cofounder search. Small, clear experiments and
              written expectations beat speed‑dating and vague promises.
            </p>
            <p>
              Use the plan below and adapt it to your stage. Keep decisions reversible until you’ve shipped together.
            </p>

            <div className="my-6">
              <h3 className="mb-6 font-semibold text-gray-800">Your action plan</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 1: Download and prepare</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>
                      Download the playbook{' '}
                      <a
                        href={RESOURCE_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your problem statement, target user, and evidence so far.</li>
                    <li>Define trial scope (two weeks), definition of done, and review date.</li>
                    <li>List 10–20 target contacts (warm intros first).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Start with community routes and targeted outreach.</li>
                    <li>
                      Use{' '}
                      <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI&apos;s recommendations
                      </Link>{' '}
                      to shortlist events and resources.
                    </li>
                    <li>Prepare a concise intro and a trial brief that respects time.</li>
                    <li>Book 3–5 conversations in the next two weeks.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Deliver the trial; keep scope narrow and measurable.</li>
                    <li>Protect repos and data; share only what’s needed.</li>
                    <li>Hold a 30‑minute retrospective; capture lessons.</li>
                    <li>Decide whether to iterate, pivot, or part ways respectfully.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Reference & due diligence</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Check 2–3 references focused on collaboration and delivery.</li>
                    <li>Review portfolio/code samples and decision rationale.</li>
                    <li>Align on availability, pace, and communication norms.</li>
                    <li>Capture agreements in writing, even at trial stage.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Formalise safely</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Agree roles, vesting with a cliff, and IP assignment.</li>
                    <li>Choose company structure with professional advice as needed.</li>
                    <li>Document decision log and next delivery milestone.</li>
                    <li>Schedule a regular cadence for reviews and course‑corrections.</li>
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
                <Link href={CROSSLINK} className="font-semibold text-[#1028E0] hover:underline">
                  Explore Startup Fundamentals →
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
