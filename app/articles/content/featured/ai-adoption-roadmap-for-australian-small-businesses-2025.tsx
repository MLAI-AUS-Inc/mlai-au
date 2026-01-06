import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getFeaturedPeople } from '../lib/backend.server'
import { applyArticleRegistryDefaults } from '../articles/registry'
import Breadcrumbs from '../components/Breadcrumbs'
import { ArticleLayout } from '../components/articles/ArticleLayout'
import { ArticleFAQ } from '../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../components/articles/ArticleCompanyCTA'
import ArticleCompanyHighlightCTA from '../components/articles/ArticleCompanyHighlightCTA'
import { ImageWithFallback } from '../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI adoption roadmap for Australian small businesses'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'ai-adoption-roadmap-australian-small-business-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-02-12'
const DESCRIPTION =
  'Step-by-step AI adoption roadmap for Australian small businesses in 2025, covering costs, timelines, privacy, grants, and safe implementation tips. MLAI guide.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Small business team in Australia reviewing an AI implementation roadmap on laptops'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
const KEYWORDS: string[] = [
  'AI adoption roadmap Australia',
  'small business AI 2025',
  'AI implementation plan',
  'Australian SMEs AI',
]

export const metadata: Metadata = {
  title: `${TOPIC} (2025)`,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    images: [HERO_IMAGE],
    url: `/articles/${SLUG}`,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    images: [HERO_IMAGE],
  },
}

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How long does a small business AI adoption roadmap take in 2025?',
    answer:
      'Most Australian SMEs can draft a practical roadmap in 1–3 weeks, then run a 4–12 week pilot. Regulated sectors or data-heavy workflows may need longer for privacy and testing.',
  },
  {
    id: 2,
    question: 'What does AI adoption typically cost for an Australian small business?',
    answer:
      'Starting costs are often $0–$500 for pilot tools (pro tiers, API credits). Facilitated workshops can range $800–$3,000. Full implementations with integrations may run $5,000–$25,000 depending on scope.',
  },
  {
    id: 3,
    question: 'Are there Australian grants or rebates for AI adoption?',
    answer:
      'Check business.gov.au for federal programs, state-based innovation vouchers, and city grants. Eligibility, co-funding, and timing differ by state and change frequently—confirm current rounds before applying.',
  },
  {
    id: 4,
    question: 'How do we manage privacy when using AI tools?',
    answer:
      'Follow OAIC guidance: minimise personal data, avoid uploading sensitive information to third-party tools, and review data handling terms. Use redaction and access controls; keep a data register for audits.',
  },
  {
    id: 5,
    question: 'What should a first AI pilot look like for a retailer or service business?',
    answer:
      'Pick one workflow (e.g., product descriptions, appointment triage, FAQ drafting). Define a success metric, keep data non-sensitive, and run a 2–4 week test with before/after measures.',
  },
  {
    id: 6,
    question: 'How do I find the right mentor or program for AI adoption?',
    answer: (
      <>
        Use trusted hubs and ask for transparent outcomes. You can also use{' '}
        <Link href="/?mode=recommend" className="font-semibold text-[#1028E0] hover:underline">
          MLAI recommendations
        </Link>{' '}
        to filter by topic, format, and location.
      </>
    ),
  },
  {
    id: 7,
    question: 'What skills do staff need before starting?',
    answer:
      'Comfort with basic prompts, data hygiene, and measuring outcomes. A short 1–2 hour primer on responsible AI use and privacy is usually enough to begin.',
  },
  {
    id: 8,
    question: 'How do we avoid vendor lock-in?',
    answer:
      'Document requirements, prefer exportable data, run short pilots with at least two tools, and keep prompts/configs in your own repo. Avoid long contracts until benefits are proven.',
  },
]

export default async function ArticlePage() {
  const article = applyArticleRegistryDefaults({
    title: `${TOPIC} (2025)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  const people = await getFeaturedPeople(FEATURED_FOCUS as any, 8)
  const featuredPeople: FeaturedPersonProfile[] = (people || []).map((p: any, idx: number) => ({
    slug: p.slug || p.person_id || `person-${idx}`,
    name:
      (p.name && String(p.name).trim()) || `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Community member',
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
    <div className="bg-white">
      <ArticleLayout
        article={article}
        faqItems={faqs}
        featuredPeople={featuredPeople}
        featuredPeopleTitle="AI practitioners experienced in small-business AI adoption"
        summaryHighlights={{
          heading: `Key facts: ${TOPIC}`,
          intro:
            'As at 2025, Australian SMEs are adopting AI for content, support, and operations. Start with low-risk pilots, respect OAIC privacy guidance, and check state grant rules before spending.',
          items: [
            {
              label: `What is ${TOPIC} in Australia?`,
              description:
                'A step-by-step plan for SMEs to choose safe AI use cases, test them, and scale responsibly using AU privacy, security, and funding settings.',
            },
            {
              label: 'Who usually needs an AI adoption roadmap?',
              description:
                'Founders, owners, ops managers, and team leads in retail, services, and online SMEs who need clarity on AI value, risks, and costs.',
            },
            {
              label: 'How does it work and what does it cost in 2025?',
              description:
                'Draft in 1–3 weeks, pilot in 4–12 weeks. Tools can start at $0–$500; guided programs $800–$3k; deeper builds $5k–$25k.',
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
            This guide pairs well with our AI basics primer. Prefer to start there?{' '}
            <Link href="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
              Read the AI basics guide →
            </Link>
          </p>
        </div>

        {/* 2) Resource CTA (swap component when a topic-specific CTA exists) */}
        <ArticleCompanyCTA
          title={`Ready to take the next step with ${TOPIC.toLowerCase()}?`}
          body="Get practical recommendations based on your goals, time, and experience level."
          buttonText="Get recommendations"
          buttonHref="/?mode=recommend"
          note="You can filter by topic, format (online/in‑person), and experience level."
        />

        {/* 3) Persona grid */}
        <div className="bg-white py-6 sm:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
                <p className="text-sm text-gray-700">
                  Decide where AI fits your model, which metrics matter, and how to test value before committing to tools or long contracts.
                </p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                <p className="text-sm text-gray-700">
                  Learn a repeatable process you can demonstrate in portfolios: scope, pilot, measure, and explain AI use responsibly.
                </p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                <p className="text-sm text-gray-700">
                  Use this roadmap as a shared reference for workshops and mentoring, with AU privacy and grant context baked in.
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
            <strong>{TOPIC}</strong> helps owners and teams move from AI curiosity to measured outcomes. It cuts through vendor hype by grounding decisions in privacy, risk, and business value specific to Australia.
          </p>
          <p>
            At MLAI, we often see founders and learners asking how to approach AI adoption before they spend time or money on tools that don’t fit. A clear roadmap keeps experiments small, safe, and aligned to revenue or service goals.
          </p>
          <p>
            This guide blends official Australian guidance (OAIC privacy, business.gov.au programs) with practical steps you can apply in days, not months. Where rules differ by state, we flag it and link to where to check.
          </p>

          <div className="my-4 w-full">
            <img src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl" />
          </div>

          {/* 6) Key takeaways */}
          <div className="my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6">
            <h3 className="mb-3 text-lg font-semibold text-[#1028E0]">Key takeaways</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>An AI adoption roadmap aligns use cases to business goals, privacy, and risk before choosing tools.</li>
                <li>Start with one pilot use case, clear metrics, and non-sensitive data to avoid costly rework.</li>
                <li>Expect a loop: scope → pilot → measure → adjust; document decisions to show accountability.</li>
                <li>Use grants and trials to reduce spend, but validate value before long-term contracts.</li>
              </ul>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>Write success criteria first; avoid “AI for AI’s sake.”</li>
                <li>Check OAIC privacy guidance and vendor terms before uploads.</li>
                <li>Compare at least two tools; keep prompts/configs portable.</li>
                <li>Share pilot learnings in plain English to build team trust.</li>
              </ul>
            </div>
          </div>

          {/* 7) Anchored sections */}
          <h2 id="what-is">What is AI adoption for Australian small businesses?</h2>
          <p>
            It is a structured plan to choose, test, and scale AI use cases that improve revenue, service, or efficiency while respecting Australian privacy, security, and sector rules. It covers goals, data, tools, guardrails, and change management.
          </p>

          <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              <li>
                <strong>Clarity:</strong> Links AI ideas to measurable outcomes and constraints.
              </li>
              <li>
                <strong>Efficiency:</strong> Reduces wasted spend on tools that don’t match your data or workflows.
              </li>
              <li>
                <strong>Communication:</strong> Gives staff and stakeholders a shared language for risk and value.
              </li>
              <li>
                <strong>Risk awareness:</strong> Surfaces privacy, IP, and security issues early, before rollout.
              </li>
            </ul>
          </div>

          <h2 id="when-needed">When do you need an AI adoption roadmap?</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f510740b-66fa-49b7-ac17-658e894542eb.jpg?alt=media&token=7e6fee1c-d5be-4e87-adbb-656befccc6d4"
            alt="Modern abstract illustration depicting the concept of an AI adoption roadmap for organizations."
            className="w-full rounded-lg my-8"
          />

          <p>
            Use one before you sign long-term contracts, integrate customer data, or promise AI-driven outcomes. It’s especially valuable when compliance, customer trust, or budget is tight.
          </p>

          <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">New AI idea or feature</h3>
              <p className="text-sm text-gray-700">Validate if the idea solves a real customer or ops problem before building.</p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-3 font-semibold text-purple-900">Selecting vendors and tools</h3>
              <p className="text-sm text-gray-700">Compare cost, data handling, and export options before committing.</p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <h3 className="mb-3 font-semibold text-orange-900">Grant or accelerator applications</h3>
              <p className="text-sm text-gray-700">Show a responsible plan with outcomes, risks, and milestones.</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <h3 className="mb-3 font-semibold text-red-900">Handling sensitive data</h3>
              <p className="text-sm text-gray-700">Map privacy and security controls before moving customer or health data.</p>
            </div>
          </div>

          <div className="w-full">
            <img
              src={HERO_IMAGE}
              alt={`${HERO_IMAGE_ALT} — contextual`}
              width={1200}
              height={630}
              className="w-full rounded-2xl"
            />
          </div>

          <h2>Why it matters</h2>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-49767363-27f7-41f9-8066-7baf85e31b6c.jpg?alt=media&token=754f29f8-9308-4aa4-b22c-17eb8e39de08"
            alt="Modern abstract illustration highlighting the importance of technology in today's world."
            className="w-full rounded-lg my-8"
          />

          <p>
            A roadmap helps founders, managers, and community organisers set realistic expectations and avoid risky shortcuts. It supports transparent communication with staff and customers about how AI is used.
          </p>
          <p>
            You can also use{' '}
            <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
              MLAI&apos;s recommendations
            </Link>{' '}
            to find learning paths and tools that fit your stage, or explore foundational context in our{' '}
            <Link href="/articles/ai/ai-basics" className="font-medium text-[#1028E0] hover:underline">
              AI basics guide
            </Link>
            .
          </p>

          <h2 id="choosing-help">Choosing the right next step</h2>
          <p>
            Match support to your risk, data sensitivity, and budget. For many SMEs, a short mentor session plus a pilot is enough to prove value before larger spend.
          </p>

          <div className="my-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role / option</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Best for</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Key strengths</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Common formats / tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Startup or SME mentor</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Prioritising use cases and business metrics.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Pattern recognition, scoping, stakeholder comms.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Office hours, short consults, action plans.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Feasibility, prompting, data handling.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Technical trade-offs, evaluation, safe deployment.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Prototypes, benchmarks, prompt tests, audits.</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Change/ops lead</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Training staff, SOP updates, rollout.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Process design, documentation, adoption.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Playbooks, workshops, SOP templates.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Legal/privacy advisor</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Sensitive data, contracts, compliance.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Risk identification, controls, documentation.</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Policy reviews, data maps, DPIAs, contract terms.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
            <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
            <p className="text-sm text-gray-700">
              Ask providers for proof of outcomes in similar businesses, clarity on data handling, and short pilot terms. Avoid long commitments until a small pilot shows value.
            </p>
          </div>

          <h2 id="costs">Costs, access & time</h2>
          <p>
            Costs vary by scope. As at 2025, most SMEs can pilot with <$1k in tool spend. Structured training or facilitated roadmaps can add $800–$3k. Custom integrations or multi-tool rollouts can reach $5k–$25k.
          </p>

          <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
            <p className="text-sm text-gray-700">
              Use free trials, library resources, and community sessions first. Check business.gov.au and state innovation vouchers; many require co-funding and have short windows. Paid courses or advisors can help when risk or complexity is higher.
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
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Self-guided starter path</td>
                  <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$200 (AUD)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Reading list, prompts, checklists, simple tests using free/low-cost tools.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–8 weeks</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">$800–$3,000 (AUD)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Guided curriculum, facilitation, templates, pilot support.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Custom implementation sprint</td>
                  <td className="px-6 py-4 text-sm text-gray-700">4–12 weeks</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600">$5,000–$25,000 (AUD)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Integration, security review, change management, documentation.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Learning & practice:</strong> 2–6 hours to align goals and draft use cases.
                </li>
                <li>
                  <strong>Implementation:</strong> 8–40 hours for pilots and light integrations.
                </li>
                <li>
                  <strong>Review & iteration:</strong> 2–4 hours per cycle to measure and adjust.
                </li>
                <li>
                  <strong>Feedback:</strong> 30–60 minutes with a mentor or team review.
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Use free trials and switch off auto-renew until value is proven.</li>
                <li>Keep sensitive data out of pilots; use synthetic or redacted data.</li>
                <li>Test at least two tools; avoid annual commitments early.</li>
                <li>Reuse prompts, SOPs, and templates across teams.</li>
              </ul>
            </div>
          </div>

          <h2>Core components</h2>
          <p>Six pillars keep your roadmap practical and auditable for an Australian SME.</p>
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-900">🧩 Use cases & metrics</h3>
              <p className="text-sm text-gray-700">Define 1–3 workflows, success measures, and stop/go criteria.</p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">🏗️ Data & privacy</h3>
              <p className="text-sm text-gray-700">Map data sources, sensitivity, OAIC obligations, and redaction steps.</p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-900">🎯 Tooling & vendors</h3>
              <p className="text-sm text-gray-700">Compare options, export paths, uptime, and support for your stack.</p>
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <h3 className="mb-2 font-semibold text-orange-900">👥 People & training</h3>
              <p className="text-sm text-gray-700">Assign owners, training, and escalation for issues or misuse.</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-900">🔒 Risk & governance</h3>
              <p className="text-sm text-gray-700">Set guardrails, approval steps, and incident response basics.</p>
            </div>
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">📄 Documentation</h3>
              <p className="text-sm text-gray-700">Keep a living log of decisions, prompts, configs, and results.</p>
            </div>
          </div>

          <h2>Comparison: Roadmap vs ad-hoc automation</h2>
          <p>
            An AI roadmap is deliberate: it aligns to goals, risk, and measurement. Ad-hoc automation is opportunistic and often breaks when data, people, or tools change. Use a roadmap when stakes are higher or data is sensitive; use ad-hoc tests for quick, low-risk experiments.
          </p>

          <h2>How this empowers people & teams</h2>
          <p>
            Founders gain clarity on what to fund. Staff learn how to use AI safely. Community builders can run workshops with shared templates. Everyone gets a repeatable way to test, measure, and communicate outcomes.
          </p>

          {/* 8) Resource CTA (gallery) */}
          <div className="my-8 bg-white py-12">
            <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    AI adoption checklist &amp; notes
                  </p>
                  <p className="mt-6 text-lg text-gray-600">
                    Capture goals, data sensitivity, use cases, risks, and pilot results. Includes prompts for decision logs and a one-page summary for stakeholders.
                  </p>
                  <div className="mt-8">
                    <a
                      href="/resources/ai-adoption-roadmap-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Open the checklist
                    </a>
                    <p className="mt-4 text-sm italic text-gray-600">Reviewed by MLAI Editorial Team. Last updated 2025-02-12.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                <div className="relative group">
                  <a
                    href="/resources/ai-adoption-roadmap-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden rounded-lg bg-white"
                  >
                    <ImageWithFallback
                      src={HERO_IMAGE}
                      alt="AI adoption checklist preview page 1"
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
                    href="/resources/ai-adoption-roadmap-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden rounded-lg bg-white"
                  >
                    <ImageWithFallback
                      src={HERO_IMAGE}
                      alt="AI adoption checklist preview page 2"
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
            Clarify your goal, data sensitivity, and budget. Choose one workflow, run a contained pilot, and measure change. Avoid all-in contracts until a pilot works.
          </p>
          <p>
            You can use{' '}
            <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
              MLAI&apos;s recommendations
            </Link>{' '}
            to discover resources and community events that match your stage.
          </p>

          {/* 10) Templates section */}
          <h2>Using templates to streamline the process</h2>
          <p>Templates reduce risk by keeping each step explicit and repeatable.</p>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Capture goals, constraints, and success metrics in one place.</li>
            <li>Brief mentors and teams quickly with shared context.</li>
            <li>Maintain a reusable decision log for audits or future pilots.</li>
          </ul>

          {/* 11) Impact */}
          <h2>Impact</h2>
          <p>
            A deliberate roadmap lowers the chance of privacy missteps and wasted spend. It builds trust with staff and customers by showing where AI is used and why.
          </p>
          <p>It also speeds learning: by measuring each pilot, you find what to scale, what to stop, and what to revisit later.</p>

          {/* 12) Specialised deep-dives */}
          <h2>Specialised deep dives</h2>
          <p>Some situations need extra depth alongside the core roadmap.</p>
          <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & responsible data use</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• When handling customer or health data.</li>
                <li>• Data minimisation, redaction, and access controls.</li>
                <li>• Aligning with OAIC guidance and vendor terms.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="mb-2 font-semibold text-green-900">📏 Model evaluation & benchmarking</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• When outputs affect customers or revenue.</li>
                <li>• A/B tests, human review, and error tracking.</li>
                <li>• Comparing tools with the same prompts and data.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & compliance basics</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• Contracts, IP ownership, and data residency.</li>
                <li>• Sector rules (health, finance, education).</li>
                <li>• When to seek qualified professional advice.</li>
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
          <p>An AI roadmap keeps your team aligned, reduces risk, and proves value before bigger investments. Start small, measure, and communicate clearly.</p>
          <p>Adapt the steps below to your context and revisit them as tools and rules evolve.</p>

          <div className="my-6">
            <h3 className="mb-6 font-semibold text-gray-800">Your action plan</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-[#1028E0] pl-6">
                <h4 className="mb-2 text-lg font-bold">Step 1: Download and prepare</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>
                    Download the checklist{' '}
                    <a
                      href="/resources/ai-adoption-roadmap-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1028E0] hover:underline"
                    >
                      here
                    </a>
                    .
                  </li>
                  <li>Write your goal, constraints, and what success looks like.</li>
                  <li>List assumptions and current evidence.</li>
                  <li>Note deadlines (launch, grant, event).</li>
                </ul>
              </div>
              <div className="border-l-4 border-[#1028E0] pl-6">
                <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>Pick one workflow with low data sensitivity.</li>
                  <li>
                    Use{' '}
                    <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                      MLAI&apos;s recommendations
                    </Link>{' '}
                    to shortlist tools or programs.
                  </li>
                  <li>Check credibility, costs, and data handling.</li>
                  <li>Schedule a 2–4 week pilot.</li>
                </ul>
              </div>
              <div className="border-l-4 border-[#1028E0] pl-6">
                <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>Keep scope narrow and data non-sensitive.</li>
                  <li>Define a metric (time saved, quality, revenue proxy).</li>
                  <li>Document prompts, configs, and results.</li>
                  <li>Pause auto-renewals until value is proven.</li>
                </ul>
              </div>
              <div className="border-l-4 border-[#1028E0] pl-6">
                <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>Summarise what worked and what changed.</li>
                  <li>Share with your team or mentor for feedback.</li>
                  <li>Decide to scale, adjust, or stop.</li>
                  <li>Update your decision log and SOPs.</li>
                </ul>
              </div>
              <div className="border-l-4 border-[#1028E0] pl-6">
                <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>Set a cadence for reviews (monthly/quarterly).</li>
                  <li>Budget for tools and training that match value.</li>
                  <li>Re-check rules and vendor terms annually.</li>
                  <li>Plan the next milestone (scale or new use case).</li>
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
                Explore the AI basics guide →
              </Link>
            </p>
          </div>

          {/* 17) Repeat resource CTA for pattern consistency */}
          <ArticleCompanyCTA
            title="Ready to take the next step?"
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations →"
            buttonHref="/?mode=recommend"
            note="You can filter by topic, format, and experience level."
          />
        </div>
      </ArticleLayout>
    </div>
  )
}
