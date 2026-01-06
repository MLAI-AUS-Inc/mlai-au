// src/routes/articles.featured.ai-governance-checklist-australia-2025.tsx
import { Link, useLoaderData } from '@remix-run/react'
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
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
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI Governance Checklist for Australian Startups'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'ai-governance-checklist-australia-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-02-15'
const DESCRIPTION =
  'A 2025 Australian AI governance checklist covering risk, privacy, compliance, and practical steps for startups and teams. Includes costs, timelines, and local resources from MLAI.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1523968044756-39c9b6ff9c86?auto=format&fit=crop&w=1400&q=80'
const HERO_IMAGE_ALT = 'Team reviewing AI governance checklist on laptops in an Australian startup office'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
const KEYWORDS = ['AI governance Australia', 'AI risk management 2025', 'startup AI compliance', 'OAIC privacy AI']

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What is an AI governance checklist in Australia?',
    answer:
      'It is a structured list of steps to plan, build, and review AI systems safely—covering purpose, data handling, privacy (OAIC), security, evaluation, human oversight, and documentation aligned to Australian expectations in 2025.',
  },
  {
    id: 2,
    question: 'How long does AI governance setup usually take for a startup?',
    answer:
      'A lightweight setup can be done in 4–10 hours: 1–2 hours to define purpose and risk level, 2–4 hours to map data and access controls, and 1–4 hours to test, document, and brief the team. More regulated sectors may take longer.',
  },
  {
    id: 3,
    question: 'What does AI governance cost in 2025?',
    answer:
      'Self-guided checklists and templates are usually free. Expect $0–$50 for basic tools, $350–$1,800 for short courses/workshops, and $2,000+ if you engage specialist audits. Many accelerators include AI risk sessions at no extra cost.',
  },
  {
    id: 4,
    question: 'How do I handle privacy when using generative AI tools?',
    answer:
      'Follow OAIC guidance: avoid uploading personal or sensitive data unless you have consent and safeguards; turn off data retention where possible; minimise data; and document who can access outputs. Use redaction or synthetic data for demos.',
  },
  {
    id: 5,
    question: 'Where can I find credible Australian guidance?',
    answer: (
      <>
        Start with the OAIC&apos;s AI privacy guidance, the National AI Centre&apos;s responsible AI resources, and business.gov.au on data security. For health, see the Australian Digital Health Agency; for finance, check ASIC and APRA standards.
      </>
    ),
  },
  {
    id: 6,
    question: 'How do I find mentors or programs for AI governance?',
    answer: (
      <>
        Use MLAI&apos;s recommender at{' '}
        <Link to="/?mode=recommend" className="font-semibold text-[#1028E0] hover:underline">
          /?mode=recommend
        </Link>{' '}
        to filter mentors and workshops. Also check local AI meetups, CSIRO/National AI Centre events, and accelerator programs with responsible AI modules.
      </>
    ),
  },
  {
    id: 7,
    question: 'Is a formal AI policy required for small teams?',
    answer:
      'A concise, plain-English policy is recommended even for small teams. It should state allowed tools, data rules, review steps, human oversight, incident handling, and how to request exceptions. Keep it to one page and update quarterly.',
  },
]

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { article } = data || {}
  const title = article?.title || `${TOPIC} (2025)`
  const description = article?.description || DESCRIPTION
  const image = article?.image || HERO_IMAGE

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: canonical(`/articles/${CATEGORY}/${SLUG}`) },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'keywords', content: KEYWORDS.join(', ') },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
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

  return { article, featuredPeople }
}

export default function ArticlePage() {
  const { article, featuredPeople } = useLoaderData<typeof loader>()

  return (
    <>
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
          featuredPeopleTitle={`Mentors experienced in AI governance and risk`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025, Australian startups are expected to show clear AI purpose, privacy safeguards (OAIC), and risk controls before scaling tools or applying to programs.',
            items: [
              {
                label: `What is AI governance for startups in Australia?`,
                description:
                  'A practical framework to plan, test, and monitor AI so it is lawful, privacy-safe, explainable, and aligned to your business goals in Australia.',
              },
              {
                label: `Who usually needs AI governance?`,
                description:
                  'Founders, product teams, and community builders using AI for decisions or customer data, especially when handling personal, health, or financial information.',
              },
              {
                label: `How does it work and what does it cost in 2025?`,
                description:
                  'Start with a checklist and policy, run small tests, document controls. Free–$50 for basics; $350–$1,800 for courses; audits cost more.',
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
              This guide pairs with our hands-on privacy and AI basics walkthrough. Want the foundations first?{' '}
              <Link to="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                Read AI basics →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA */}
          <ArticleCompanyCTA
            title="Ready to take the next step with AI governance?"
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
                    Apply AI governance to product decisions, vendor selection, and pitch evidence. Avoid rework by
                    defining risk level, data rules, and human oversight early.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Learn responsible AI basics in plain English, practise with small case studies, and build a
                    portfolio piece that shows risk-aware thinking.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Use this checklist in workshops or mentoring so participants align on privacy, safety, and scope—even
                    when experience levels differ.
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
              <strong>AI governance</strong> is how you make sure AI features are purposeful, privacy-safe, and
              explainable before you scale them. This guide gives Australian startups and teams a concise checklist you
              can apply in days, not months.
            </p>
            <p>
              At MLAI, we often see founders and learners asking how to approach AI governance before they spend time or
              money on tools or programs. This article distils current Australian guidance and practical steps you can
              action immediately.
            </p>
            <p>
              We reference official sources where possible (OAIC for privacy, National AI Centre for responsible AI,
              business.gov.au for security). Where requirements differ by sector or state, we flag the variance and
              point to the source.
            </p>

            <div className="my-4 w-full">
              <img
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                width={1400}
                height={700}
                className="w-full rounded-2xl"
              />
            </div>

            {/* 6) Key takeaways */}
            <div className="my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6">
              <h3 className="mb-3 text-lg font-semibold text-[#1028E0]">Key takeaways</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>
                    AI governance sets purpose, privacy rules, evaluation, and oversight so AI features are safe and
                    useful.
                  </li>
                  <li>
                    Use it whenever AI touches customer data, makes decisions, or influences funding and program
                    applications.
                  </li>
                  <li>
                    A lean checklist works: define intent, assess risk, control data, test, document, and review.
                  </li>
                  <li>
                    Evidence matters—keep artefacts (policies, tests, decisions) to satisfy partners, investors, or
                    regulators.
                  </li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Start small: one workflow, one dataset, one clear metric to improve.</li>
                  <li>Write a one-page AI use policy and share it with your team.</li>
                  <li>Turn off vendor data retention where possible; avoid sensitive uploads.</li>
                  <li>Schedule quarterly reviews—models, rules, and risks shift quickly.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What is AI governance?</h2>
            <p>
              AI governance is the set of decisions, safeguards, and review processes that keep your AI use aligned to
              business goals, legal duties, and community expectations. It includes purpose clarity, risk assessment,
              privacy and security controls, model and prompt testing, human oversight, and documentation. It is not just
              paperwork—done well, it speeds up safe delivery.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> Aligns the AI use case with a measurable outcome and a defined risk level.
                </li>
                <li>
                  <strong>Efficiency:</strong> Prevents rework from mismatched tools or unclear data permissions.
                </li>
                <li>
                  <strong>Communication:</strong> Gives founders and teams a shared language for risk and readiness.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Surfaces privacy, bias, and security concerns before launch.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need AI governance?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a2b042f4-8eb1-4c54-99ba-f9467fa2710a.jpg?alt=media&token=b52ee7ac-6ac8-44ae-ab2b-78fc22839a22" alt="Abstract illustration depicting AI governance concepts and modern technology themes for blog post." className="w-full rounded-lg my-8" />

            <p>
              Use AI governance whenever AI systems inform customer outcomes, store personal data, or feed investor and
              grant narratives. It is especially important before pilots become production or when joining programs that
              expect responsible AI evidence.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New AI feature or pivot</h3>
                <p className="text-sm text-gray-700">
                  Validate purpose, risks, and data flows before you ship or scale. Capture decisions to update investors
                  and partners.
                </p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Vendor or tool selection</h3>
                <p className="text-sm text-gray-700">
                  Compare privacy settings, data residency, pricing, retention defaults, and evaluation results before
                  locking in a stack.
                </p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Program or grant applications</h3>
                <p className="text-sm text-gray-700">
                  Accelerators and grants increasingly ask for responsible AI evidence—use your checklist as proof.
                </p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">Sensitive or regulated data</h3>
                <p className="text-sm text-gray-700">
                  Health, finance, education, and government data need stricter controls and clearer human oversight.
                </p>
              </div>
            </div>

            <div className="w-full">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
                alt="Colleagues mapping AI risks and controls on a whiteboard"
                width={1400}
                height={700}
                className="w-full rounded-2xl"
              />
            </div>

            <h2>Why AI governance matters</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6bc2d302-b7c7-4b07-b08a-30d3905ec547.jpg?alt=media&token=a533e095-398e-4fd6-a13e-6182b65a4e8f" alt="Modern abstract illustration symbolizing AI governance and its importance in technology and society." className="w-full rounded-lg my-8" />

            <p>
              Clear governance makes it easier to explain AI decisions to customers, partners, and regulators. It also
              reduces security and privacy risk, and speeds up approvals for enterprise deals. You can{' '}
              <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                get personalised learning recommendations
              </Link>{' '}
              to find programs that include responsible AI modules, or explore foundational context via{' '}
              <Link to="/articles/startups/startup-fundamentals" className="font-medium text-[#1028E0] hover:underline">
                startup fundamentals
              </Link>
              .
            </p>

            <h2 id="choosing-help">Choosing the right next step</h2>
            <p>
              Pick support based on your risk level, budget, and timeline. Combine self-guided templates with mentor
              feedback and, where needed, specialist reviews for regulated sectors.
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
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritisation, lean controls, investor readiness.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Patterns, quick wins, stakeholder messaging.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Mentoring calls, office hours, pitch reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Feasibility, model testing, prompt safety.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Technical trade-offs, evaluation, deployment patterns.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prototypes, benchmarks, red-team tests.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Legal/privacy advisor</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Sensitive data, contracts, cross-border transfers.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">OAIC alignment, consent wording, DPIAs.
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">Policy reviews, DPIA templates, contract clauses.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Community workshop</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Shared language, peer feedback, quick starts.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Accessibility, low cost, practical exercises.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Checklists, tabletop scenarios, peer review.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                Ask providers to show their data handling defaults, evaluation evidence, and incident process. If these
                are unclear or promised as “coming soon”, consider that a risk signal.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, a lean AI governance setup is accessible: many steps are free with public guidance. Costs rise
              with formal audits or sector-specific compliance. Time can be kept to hours if you focus on one workflow.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Start with free resources (OAIC, National AI Centre, business.gov.au). Libraries and universities often
                provide standards access. Some accelerators and state programs include responsible AI support or
                scholarships—check current eligibility and dates.
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
                    <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$50 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Checklist, policy template, data map, basic tests.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–8 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$350–$1,800 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Guided curriculum, examples, feedback, certificate.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist review/audit</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–4 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">$2,000–$10,000+ (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Detailed risk review, DPIA, documentation, remediations.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Purpose & risk level:</strong> 30–60 minutes.
                  </li>
                  <li>
                    <strong>Data mapping & controls:</strong> 1–3 hours.
                  </li>
                  <li>
                    <strong>Testing & evaluation:</strong> 1–3 hours per workflow.
                  </li>
                  <li>
                    <strong>Documentation & briefing:</strong> 1–2 hours.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Use free OAIC and National AI Centre guidance first.</li>
                  <li>Switch off vendor data retention; use redaction for tests.</li>
                  <li>Start with one workflow to keep audit scope small.</li>
                  <li>Reuse templates across teams; review quarterly, not daily.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>These six components keep AI governance practical and evidence-based for startups.</p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧩 Purpose & scope</h3>
                <p className="text-sm text-gray-700">Define the decision, user, and success metric. Exclude high-risk data if not essential.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🏗️ Data & privacy</h3>
                <p className="text-sm text-gray-700">Map inputs/outputs, consent basis, retention, residency, and access controls aligned to OAIC.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🎯 Evaluation</h3>
                <p className="text-sm text-gray-700">Test prompts/models for accuracy, bias, and safety; track metrics and red flags.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">👥 Human oversight</h3>
                <p className="text-sm text-gray-700">Assign reviewers for sensitive decisions; define when humans must approve outputs.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">🔒 Security & incidents</h3>
                <p className="text-sm text-gray-700">Control access, monitor logs, and set a simple incident response path.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Documentation</h3>
                <p className="text-sm text-gray-700">Keep a one-page policy, data map, test results, and change log for transparency.</p>
              </div>
            </div>

            <h2>Comparison: AI governance vs generic security checklists</h2>
            <p>
              Security checklists cover infrastructure and access; AI governance adds purpose clarity, model/prompt
              testing, bias assessment, and human oversight. Use both: start with security baselines, then add AI-specific
              evaluation and documentation.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Founders can explain AI decisions confidently to customers and investors. Product teams reduce rework by
              testing small and documenting choices. Community organisers can run safer workshops by setting shared
              guardrails and signposting official resources.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      AI governance checklist & notes
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A one-page checklist with purpose, data, testing, oversight, and documentation steps. Includes a
                      decision log and risk triage sheet you can reuse.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/resources/ai-governance-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Open the checklist
                      </a>
                      <p className="mt-4 text-sm italic text-gray-600">
                        Reviewed by MLAI Editorial Team. Last updated 2025-02-15.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                  <div className="relative group">
                    <a
                      href="/resources/ai-governance-checklist"
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
                      href="/resources/ai-governance-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg bg-white"
                    >
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
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
              Start with a single AI use case and identify what “good” looks like. Choose the smallest action—often a
              draft policy and one red-team test—before investing in new tools.
            </p>
            <p>
              You can use{' '}
              <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI&apos;s recommendations
              </Link>{' '}
              to discover resources, workshops, and mentors. Check{' '}
              <Link to="/resources" className="font-medium text-[#1028E0] hover:underline">
                resources
              </Link>{' '}
              for templates, and{' '}
              <Link to="/events" className="font-medium text-[#1028E0] hover:underline">
                events
              </Link>{' '}
              for upcoming meetups with responsible AI sessions.
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates reduce uncertainty and make reviews faster. They also create a paper trail that investors and
              partners appreciate.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Capture purpose, risk level, and data decisions in one place.</li>
              <li>Brief mentors and advisors quickly with consistent context.</li>
              <li>Reuse the decision log when applying to grants or programs.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              Thoughtful AI governance reduces privacy and bias risks, increases trust, and shortens sales cycles by
              making compliance questions easier to answer.
            </p>
            <p>
              It also builds team confidence. When everyone knows the rules and review steps, experimentation becomes
              safer and faster.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>
              If your use case is sensitive or regulated, consider deeper work alongside the checklist.
            </p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & data handling</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• When processing personal or health data.</li>
                  <li>• Cross-border transfers and vendor retention.</li>
                  <li>• DPIAs and consent wording aligned to OAIC.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Evaluation & benchmarking</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• When decisions impact customers or revenue.</li>
                  <li>• Bias and drift checks on prompts/models.</li>
                  <li>• Scenario testing and red-teaming.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & compliance basics</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• When contracts require AI terms.</li>
                  <li>• IP ownership of prompts and outputs.</li>
                  <li>• Sector rules (ASIC/APRA/ADHA) and standards (ISO/IEC 42001).</li>
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
              AI governance does not need to be heavy. Start with a small, evidence-based checklist and grow it only when
              your risk or scale increases.
            </p>
            <p>
              The action plan below keeps momentum while ensuring privacy, safety, and clear communication.
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
                        href="/resources/ai-governance-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your AI purpose, success metric, and risk level.</li>
                    <li>List data sources, sensitivity, and who can access them.</li>
                    <li>Note any deadlines (pilot launch, program application).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Pick one workflow to test and one vendor to trial.</li>
                    <li>
                      Use{' '}
                      <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI&apos;s recommendations
                      </Link>{' '}
                      to find a mentor or workshop if you need feedback.
                    </li>
                    <li>Confirm privacy settings (no retention, limited access).</li>
                    <li>Set a simple success threshold (e.g., reduce manual time by 20%).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Test with non-sensitive or synthetic data first.</li>
                    <li>Red-team prompts for mistakes, bias, and safety issues.</li>
                    <li>Record results, changes, and remaining risks.</li>
                    <li>Decide if human approval is required before release.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Summarise findings in plain English for your team.</li>
                    <li>Update the policy and checklist with decisions made.</li>
                    <li>Store artefacts (tests, settings) for future audits.</li>
                    <li>Plan a quarterly review date.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Expand to the next workflow only after review.</li>
                    <li>Budget modestly for tools; renegotiate once value is proven.</li>
                    <li>Track changes in vendor terms and Australian guidance.</li>
                    <li>Keep learning—add a monthly practice or community check-in.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 15) FAQ + contact */}
            <div className="my-12">
              <ArticleFAQ items={faqs} />
              <p className="mt-4 text-base text-gray-600">
                If you still have questions after reading this guide, you&apos;re welcome to contact us via the{' '}
                <Link to="/about" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  About page
                </Link>{' '}
                or get tailored recommendations through{' '}
                <Link to="/?mode=recommend" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  MLAI&apos;s recommendations
                </Link>
                .
              </p>
            </div>

            {/* 16) Cross-link banner */}
            <div className="my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm text-indigo-900">
                Ready for the next step?{' '}
                <Link to="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                  Explore the follow‑up guide →
                </Link>
              </p>
            </div>

            {/* 17) Repeat resource CTA */}
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
