// src/app/(informational)/articles/featured/ai-safety-governance-australia-2025/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getFeaturedPeople } from '@server/backend'
import { canonical } from '@/lib/seo'
import { applyArticleRegistryDefaults } from '@/articles/articles-registry'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArticleLayout } from '@/components/articles/ArticleLayout'
import { ArticleFAQ } from '@/components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '@/components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '@/components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI Safety & Governance in Australia'
const CATEGORY = 'featured'
const SLUG = 'ai-safety-governance-australia-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-03-01'
const DESCRIPTION =
  'Practical 2025 guide to AI safety and governance in Australia: risk assessment, privacy, compliance, and workflows founders, teams, and community builders can use. MLAI’s plain-English playbook.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Team reviewing an AI risk register in an Australian office setting'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What does AI safety and governance cover in Australia?',
    answer:
      'It includes setting policies, assessing model risks, handling data responsibly, testing outputs, documenting decisions, and complying with privacy, consumer, and sector rules (e.g. OAIC privacy guidance and ACCC fairness expectations).',
  },
  {
    id: 2,
    question: 'How much time should a team budget to stand up AI governance in 2025?',
    answer:
      'Small teams can draft a lightweight policy and risk register in 3–6 hours, then schedule monthly 60–90 minute reviews. Larger deployments or regulated sectors often need deeper reviews and audits.',
  },
  {
    id: 3,
    question: 'Are there free or low-cost options to get started?',
    answer:
      'Yes. Use OAIC’s privacy guidance, National AI Centre resources, and MLAI checklists. Start with internal playbooks and small tests before paying for tools, audits, or courses.',
  },
  {
    id: 4,
    question: 'How do I pick an AI tool or vendor safely?',
    answer:
      'Ask for data handling details, retention defaults, model provenance, evaluation results, and incident processes. Avoid uploading sensitive data to public models; prefer enterprise or on-prem options when handling regulated data.',
  },
  {
    id: 5,
    question: 'What should come first: privacy, security, or model evaluation?',
    answer:
      'Do them together in a lightweight pass: map data flows, set allowed/blocked data, run basic red-team prompts, and log findings. Revisit monthly or after major model/tool changes.',
  },
  {
    id: 6,
    question: 'Where can I find mentors or programs for AI governance help?',
    answer:
      <span>
        Use the recommender at{' '}
        <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
          MLAI
        </Link>{' '}
        and check National AI Centre/CSIRO resources. For community practice, look at university, library, or meetup sessions.
      </span>,
  },
  {
    id: 7,
    question: 'Does AI governance differ by state or sector?',
    answer:
      'Yes. Health, finance, and government have stricter rules. State procurement and records rules can differ. Always check your sector regulator and contract terms.',
  },
  {
    id: 8,
    question: 'How often should we review AI risks?',
    answer:
      'At minimum quarterly, and whenever you change models, data sources, or user-facing features. High-risk use cases (e.g. credit, employment, health) should review monthly or per release.',
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

  // Featured people fetch + defensive mapping (copied from canonical north-star article)
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
    focus: (() => {
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
          featuredPeopleTitle={`AI practitioners experienced in ${TOPIC}`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025, Australian teams are expected to align AI use with privacy law (OAIC), consumer fairness (ACCC), and emerging safety norms from the National AI Centre.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'Policies, processes, and tests that keep AI use lawful, privacy-safe, reliable, and documented for Australian teams and communities.',
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Founders, product teams, students, educators, and community builders working with data, public models, or user-facing AI features.',
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Start with a 3–6 hour DIY policy and risk register; workshops cost ~$350–$1.5k; mentored programs range $1.2k–$4.5k AUD.',
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
              This guide is part of our broader series on AI safety and responsible AI. Prefer to jump ahead?{' '}
              <Link href="/articles/ai/ai-risk-assessment-frameworks" className="font-semibold text-[#1028E0] hover:underline">
                Read the AI risk assessment frameworks guide →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA */}
          <ArticleCompanyCTA
            title={`Ready to take the next step with ${TOPIC}?`}
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
                    Use governance to decide which AI features to ship, how to test them, and what risks to manage before customers or regulators ask.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Learn safety basics, privacy norms, and evaluation habits you can demonstrate in portfolios, labs, or hackathons without big budgets.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Use this as a shared reference for workshops and mentoring so people align on terms, risks, and practical guardrails from day one.
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
              <strong>AI safety and governance</strong> translates principles into day-to-day decisions: what data is allowed, which models are suitable, how to test outputs, and how to document choices for teams, partners, or regulators.
            </p>
            <p>
              At MLAI, we often see founders and learners asking how to approach AI governance before they spend time or money on tools or audits that do not match their stage.
            </p>
            <p>
              This guide draws on current Australian references (OAIC privacy guidance, ACCC fairness expectations, National AI Centre materials) and highlights where rules or expectations may differ by sector or state.
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
                    AI governance means <span className="font-semibold">clear policies, risk tests, and decision logs</span> for how you use models and data.
                  </li>
                  <li>
                    It is most critical when AI touches <span className="font-semibold">customers, regulated data, or automated decisions</span>.
                  </li>
                  <li>Expect to iterate: start light, review monthly or per release, deepen controls as risk rises.</li>
                  <li>Documenting choices speeds up procurement, security reviews, and partner trust.</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Start with a short policy, risk register, and “allowed/blocked data” list.</li>
                  <li>Run small red-team prompts and output checks before wider rollout.</li>
                  <li>Keep sensitive data out of public models; prefer enterprise or on-prem tiers.</li>
                  <li>Align with OAIC privacy guidance and ACCC fairness expectations for 2025.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What is AI safety & governance?</h2>
            <p>
              AI safety and governance is a practical set of policies, roles, and tests that guide how you choose, deploy, and monitor AI systems. It covers data permissions, model selection, evaluation, incident response, and how decisions are recorded so others can verify or audit them.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> Everyone knows what data and models are allowed, and why.
                </li>
                <li>
                  <strong>Efficiency:</strong> Faster procurement and security reviews with pre-agreed guardrails.
                </li>
                <li>
                  <strong>Communication:</strong> Shared language for product, legal, engineering, and community.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Early detection of privacy, bias, or reliability issues.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need AI governance?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6aaf058e-f21a-480b-ada0-5944c8e2b1e4.jpg?alt=media&token=de139089-c86b-4478-bc18-93d65475d28a" alt="Abstract technical illustration highlighting the importance of AI governance and compliance in modern technology." className="w-full rounded-lg my-8" />

            <p>
              Bring governance forward when AI touches customer data, regulated sectors, public outputs, or automated decisions. Start light, then deepen controls as stakes rise.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New AI feature or integration</h3>
                <p className="text-sm text-gray-700">
                  Validate data flows, consent, and failure modes before launch. Document intended use and misuse cases.
                </p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Tool/vendor selection</h3>
                <p className="text-sm text-gray-700">
                  Compare retention defaults, regional hosting, audit logs, and model provenance before committing spend.
                </p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Funding or enterprise sales</h3>
                <p className="text-sm text-gray-700">
                  Investors and buyers increasingly ask for privacy posture, risk registers, and evaluation summaries.
                </p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">High-risk use cases</h3>
                <p className="text-sm text-gray-700">
                  Credit, employment, health, safety, or education decisions require stricter oversight and logging.
                </p>
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

            <h2>Why AI safety & governance matters</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4c3ea7d2-40b3-4e13-8dd5-f3d70b7af043.jpg?alt=media&token=bc9194c5-2ef1-41f3-aa58-bf962230f040" alt="Abstract illustration representing AI safety and governance principles in technology." className="w-full rounded-lg my-8" />

            <p>
              Governance keeps teams aligned on acceptable use, reduces surprises in security reviews, and builds trust with customers and partners. It also prepares you for evolving Australian guidance on privacy, safety, and consumer fairness.
            </p>
            <p>
              You can also{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                get personalised learning recommendations
              </Link>{' '}
              if you need a shortcut to relevant templates, mentors, or workshops.
            </p>

            <h2 id="choosing-help">Choosing the right next step</h2>
            <p>
              Pick support that matches your risk level and timeline. Lightweight policies and prompt tests are fine for prototypes; regulated data or customer-facing automation warrants deeper reviews or specialist input.
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
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritising controls that unblock launch or sales.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Pattern spotting, scope cuts, decision framing.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Mentor calls, office hours, go-to-market reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Model selection, evaluation, deployment safety.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Benchmarks, prompt tests, failure analysis.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prototypes, eval harnesses, red-team prompts.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Privacy/security lead</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Data handling, access, retention, vendor due diligence.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Policy, threat modelling, audit trails.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">DPIAs, SOC2/ISO references, access reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Legal/compliance</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Contractual and regulatory risk in specific sectors.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Regulatory mapping, terms, consent.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Contract reviews, policy edits, regulator guidance.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                Ask every provider for data retention defaults, model provenance, and incident handling. If answers are vague or “guaranteed safe”, pause and seek clearer evidence.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, most teams can stand up a lightweight AI governance baseline in under a day. Costs rise with regulated data, enterprise buyers, or formal audits. Start with free guidance, then add paid support only where risk justifies it.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Begin with OAIC and National AI Centre resources, library/university materials, and MLAI checklists. Scholarships or state programs sometimes cover workshops; availability differs by state and provider.
              </p>
            </div>

            <div className="my-8 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Option
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Time (approx.)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Estimated cost (2025)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      What&apos;s included
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Self-guided starter path</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$100 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Policy template, risk register, basic prompt tests, reading list.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–6 weeks part-time</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$350–$1,500 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Facilitated sessions, exercises, feedback, sample evidence pack.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mentored program / audit-lite</td>
                    <td className="px-6 py-4 text-sm text-gray-700">4–8 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">$1,200–$4,500 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Guided controls, red-team sessions, evidence for buyers or grants.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Learning & framing:</strong> 1–2 hours to skim guidance and set scope.
                  </li>
                  <li>
                    <strong>Draft policy & register:</strong> 2–4 hours with templates.
                  </li>
                  <li>
                    <strong>Testing:</strong> 1–3 hours of prompt tests and sample outputs.
                  </li>
                  <li>
                    <strong>Review:</strong> 60–90 minutes with a peer or mentor.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Use free policies and checklists first; only buy tools once gaps are clear.</li>
                  <li>Negotiate monthly plans; avoid annual lock-ins while experimenting.</li>
                  <li>Prefer vendors offering regional hosting and clear data controls by default.</li>
                  <li>Log decisions once; reuse the evidence pack for buyers or grants.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>
              AI governance typically spans policy, data handling, model risk, evaluation, incident response, and documentation. Start with the lightest version of each, then deepen as risk grows.
            </p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧭 Governance policy</h3>
                <p className="text-sm text-gray-700">Roles, allowed/blocked uses, review cadence, and escalation paths.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🔒 Data & privacy</h3>
                <p className="text-sm text-gray-700">Data classes, consent, retention, masking, and third-party sharing rules.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🧠 Model oversight</h3>
                <p className="text-sm text-gray-700">Model provenance, update cadence, and who approves changes.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">🧪 Evaluation & testing</h3>
                <p className="text-sm text-gray-700">Prompt tests, bias checks, reliability thresholds, and rollback triggers.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">🚨 Incident response</h3>
                <p className="text-sm text-gray-700">Playbooks for failures, user reports, and regulator/partner notifications.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Documentation</h3>
                <p className="text-sm text-gray-700">Decision logs, changelog, and evidence for procurement or audits.</p>
              </div>
            </div>

            <h2>Comparison: AI governance vs compliance & security</h2>
            <p>
              Governance sets the practical rules and tests for AI use. Compliance ensures those rules meet legal or contractual requirements. Security protects data and infrastructure. They overlap but governance keeps all three aligned and documented for stakeholders.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Founders can move faster through buyer security reviews. Learners can show evidence of responsible practice in portfolios. Community organisers can run safer workshops with clear ground rules and consent patterns.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      AI safety checklist &amp; notes
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A concise checklist covering policy, data rules, model choice, prompt testing, and incident response. Use it to capture decisions and evidence for partners or applications.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/resources/ai-safety-governance-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Open the checklist
                      </a>
                      <p className="mt-4 text-sm italic text-gray-600">
                        Reviewed by MLAI Editorial Team. Last updated 2025-03-01.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                  <div className="relative group">
                    <a
                      href="/resources/ai-safety-governance-checklist"
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
                      href="/resources/ai-safety-governance-checklist"
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
              Start by clarifying your goal, data sensitivity, and timeline. Choose the smallest safe step—often a single policy page, a risk register entry, and a handful of prompt tests.
            </p>
            <p>
              You can use{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI&apos;s recommendations
              </Link>{' '}
              to discover resources and learning paths for AI safety, and find meetups or workshops under <Link href="/events" className="font-medium text-[#1028E0] hover:underline">events</Link>.
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates reduce friction and make governance repeatable. They help you capture evidence once and reuse it across security reviews, partner questionnaires, and grant applications.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Gather goals, data flows, and constraints in one place.</li>
              <li>Brief mentors or reviewers quickly with consistent context.</li>
              <li>Keep a history of changes so you can explain decisions later.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              Done well, AI governance accelerates rather than slows delivery: clearer requirements, fewer rework cycles, and faster approvals from buyers or partners.
            </p>
            <p>
              It also reduces the chance of privacy missteps or misleading outputs reaching users, protecting brand trust and community safety.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>
              You may need deeper work when handling sensitive data, regulated sectors, or high-stakes automation. Use these as focused add-ons to your core governance.
            </p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & data handling</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Sensitive or identifiable data involved.</li>
                  <li>• Cross-border transfers or vendor sharing.</li>
                  <li>• Consent, retention, and masking decisions.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Evaluation & measurement</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Need evidence for buyers or regulators.</li>
                  <li>• Reliability, bias, or safety thresholds.</li>
                  <li>• Red-team prompts and regression tests.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & compliance basics</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Contracts or procurement with AI clauses.</li>
                  <li>• Sector rules (health, finance, education, gov).</li>
                  <li>• Licensing and attribution for data and models.</li>
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
              AI governance is most effective when it is lightweight, repeatable, and tied to real decisions. Start small, review often, and deepen controls only where risk justifies it.
            </p>
            <p>
              Use the action plan below to move forward this week. Adapt it to your sector, data sensitivity, and team size.
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
                        href="/resources/ai-safety-governance-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your goal, data sensitivity, and what “safe” looks like.</li>
                    <li>List assumptions and current controls; note gaps to test.</li>
                    <li>Set a date for a first review (within 14 days).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Pick self-guided, workshop, or mentor support based on risk.</li>
                    <li>
                      Use{' '}
                      <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI&apos;s recommendations
                      </Link>{' '}
                      to shortlist resources.
                    </li>
                    <li>Confirm budget and time (e.g., 3–6 hours this week).</li>
                    <li>Decide success criteria (evidence pack, tests run, approvals).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Test one feature or workflow with red-team prompts.</li>
                    <li>Check outputs for privacy leaks, bias, or hallucinations.</li>
                    <li>Record what you tried, results, and risks found.</li>
                    <li>Keep sensitive data out of public models during tests.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Summarise outcomes in plain English for stakeholders.</li>
                    <li>Get a peer or mentor review; adjust controls accordingly.</li>
                    <li>Decide whether to expand, pause, or add safeguards.</li>
                    <li>Update your decision log and risk register.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Schedule monthly reviews and per-release checks.</li>
                    <li>Set budgets for tools or audits aligned to risk.</li>
                    <li>Recheck OAIC/sector guidance quarterly for updates.</li>
                    <li>Plan your next milestone (buyer review, launch, or grant).</li>
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
                <Link href="/articles/ai/ai-risk-assessment-frameworks" className="font-semibold text-[#1028E0] hover:underline">
                  Explore the follow‑up guide →
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
    </>
  )
}
