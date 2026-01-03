// src/app/(informational)/articles/featured/responsible-ai-australia-startups-2025/page.tsx
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
import type { FeaturedPersonProfile } from '../../../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Responsible AI for Australian Startups'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'responsible-ai-australia-startups-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2026-01-03'
const DESCRIPTION = 'Plain‑English guide to responsible AI for Australian startups: privacy (OAIC), data handling, evaluation, governance, costs and practical steps. Evidence‑based, from MLAI.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?auto=format&fit=crop&w=1200&h=630&q=60'
const HERO_IMAGE_ALT = 'Padlock on laptop keyboard representing data privacy and responsible AI in Australia'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What laws and standards guide responsible AI in Australia?',
    answer: (
      <>
        The Australian Privacy Act 1988 and the Australian Privacy Principles (APPs) apply when personal information is
        involved. The OAIC has guidance on AI and privacy, and organisations should consider safety, transparency and
        fairness norms outlined by the National AI Centre. Sector rules can also apply (e.g. health, finance). See{' '}
        <a
          href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations/ai-and-privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          OAIC: AI and privacy
        </a>{' '}
        and{' '}
        <a
          href="https://www.csiro.au/en/work-with-us/industries/digital/national-ai-centre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          National AI Centre (CSIRO)
        </a>
        .
      </>
    ),
  },
  {
    id: 2,
    question: 'Do we need consent to use customer data to train or fine‑tune models?',
    answer: (
      <>
        If data is reasonably identifiable, APPs apply. Under APP 6, you generally need consent for new purposes unless
        a permitted exception applies. Consider de‑identification, purpose limitation, and transparency. Check the
        provider’s terms, data handling, and whether your use matches what customers reasonably expect. See{' '}
        <a
          href="https://www.oaic.gov.au/privacy/australian-privacy-principles-guidelines/chapter-6-app-6-use-or-disclosure-of-personal-information"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          OAIC APP 6
        </a>
        .
      </>
    ),
  },
  {
    id: 3,
    question: 'How much does a “responsible AI” starter setup cost for a small team?',
    answer:
      'As at 2025: $0–$50 for self‑guided templates and basic tools; $200–$2,000 for short courses/workshops; $0–$300 per mentor session; legal advice varies widely ($500–$3,000+).',
  },
  {
    id: 4,
    question: 'What should we do first if we are just starting?',
    answer: (
      <>
        Start with a quick risk screen (what data, who is affected, where stored), draft a one‑page AI use policy, and
        run a small, measurable test. You can use{' '}
        <Link href="/?mode=recommend" className="text-[#1028E0] underline">
          MLAI’s recommendations
        </Link>{' '}
        to find a lightweight path.
      </>
    ),
  },
  {
    id: 5,
    question: 'How long does it take to draft an AI use policy?',
    answer:
      'Often 1–3 hours using a template and examples, then 1–2 iterations with team feedback. Update it as your tools and risks change.',
  },
  {
    id: 6,
    question: 'What’s the difference between “responsible AI” and legal compliance?',
    answer:
      'Compliance is the minimum required by law. Responsible AI adds practical safeguards—testing, monitoring, transparency, and user‑centred risk reduction—often going beyond the legal baseline.',
  },
  {
    id: 7,
    question: 'How do we handle overseas AI tools and data storage?',
    answer: (
      <>
        Check data residency, cross‑border disclosure (APP 8), and vendor security. Prefer enterprise modes that avoid
        training on your inputs. Document what goes where. See{' '}
        <a
          href="https://www.oaic.gov.au/privacy/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1028E0] underline"
        >
          OAIC APP 8
        </a>
        .
      </>
    ),
  },
  {
    id: 8,
    question: 'How do we evaluate model outputs for safety and quality?',
    answer:
      'Use small tests with realistic prompts and data. Track failure modes (bias, toxicity, hallucination). Compare with baselines. Keep a decision log and review regularly as models or prompts change.',
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
    'Responsible AI Australia',
    'AI privacy Australia',
    'AI governance startup',
    'OAIC Australian Privacy Principles',
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
    formats: p.formats || p.offers || [], // e.g. mentoring, talks, workshops
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
              'As at 2025, Australian startups are expected to apply privacy‑by‑design and transparent AI practices aligned with OAIC guidance and emerging AI safety norms.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'Building and using AI safely, legally and transparently in line with Australian Privacy Principles, safety norms, and user expectations across products and operations.',
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Founders, product managers, engineers and students working with personal data, automated decisions, or generative AI in startups, SMEs, pilots or community programs.',
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Start with a risk screen, a short policy and small tests; expect 3–15 hours and $0–$2,000 depending on tools, training and whether you use community or paid support.',
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
              This guide is part of our broader series on responsible AI. Prefer to start with foundations?{' '}
              <Link href="/articles/featured/ai-startup-foundations" className="font-semibold text-[#1028E0] hover:underline">
                Read AI Startup Foundations →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA (topic‑agnostic template) */}
          <MLAITemplateResourceCTA />

          {/* 3) Persona grid */}
          <div className="bg-white py-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
                  <p className="text-sm text-gray-700">
                    Apply responsible AI to prioritise risks, choose tools, and communicate with customers and partners—without over‑engineering or slowing delivery.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Learn privacy, testing and transparency basics in plain English. Build portfolio artifacts that show good judgement as well as technical skill.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Use this as a shared reference for workshops and mentoring—especially when participants have different levels of AI experience.
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
              <strong>{TOPIC}</strong> is a practical way to deliver value with AI while reducing avoidable risks. This guide
              explains what to do first in Australia, how to choose sensible safeguards, and how to keep costs in check.
            </p>
            <p>
              At MLAI, we often see founders and learners asking how to approach responsible AI before they spend time or money
              on tools and programs that may not fit their situation.
            </p>
            <p>
              We reference current Australian guidance and credible sources. Where rules differ by state, sector or provider, we
              call that out and link to official material so you can check the latest.
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
                    {TOPIC} is used to <span className="font-semibold">ship useful AI while protecting people and the business</span>.
                  </li>
                  <li>
                    It matters when deciding about <span className="font-semibold">data, tooling, user impacts and governance</span>.
                  </li>
                  <li>Expect a clear process: set goals, screen risks, test small, document decisions.</li>
                  <li>Best results link safeguards directly to product workflows and user needs.</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Start small: one workflow, one metric, one review cycle.</li>
                  <li>Write down assumptions and decision criteria before implementation.</li>
                  <li>Protect privacy: avoid sharing sensitive data with third‑party tools.</li>
                  <li>Revisit as models, prompts and regulations evolve.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What is {TOPIC}?</h2>
            <p>
              Responsible AI means designing, building and using AI in ways that are safe, lawful, fair and transparent. In the
              Australian context that includes complying with the Privacy Act and Australian Privacy Principles when personal
              information is involved, being open about AI use, testing for foreseeable harms, and giving people meaningful ways
              to get help or opt out where appropriate.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> turns vague concerns into concrete steps you can explain to teammates and customers.
                </li>
                <li>
                  <strong>Efficiency:</strong> avoids wasted work and re‑builds by identifying risks early.
                </li>
                <li>
                  <strong>Communication:</strong> builds trust through plain‑English policies and transparent choices.
                </li>
                <li>
                  <strong>Risk awareness:</strong> helps surface privacy, security and reputational risks before launch.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need {TOPIC}?</h2>
            <p>
              Use it before you commit to tooling or ship AI‑powered features—especially where decisions may affect people,
              money, health, safety or reputation.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New idea or feature</h3>
                <p className="text-sm text-gray-700">
                  Validate data needs, error tolerance and user impacts before building or buying tools.
                </p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Choosing AI vendors</h3>
                <p className="text-sm text-gray-700">
                  Compare data handling, retention, security, and enterprise modes that disable training on your inputs.
                </p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Applying for programs or funding</h3>
                <p className="text-sm text-gray-700">
                  Demonstrate clear goals, testing, and privacy‑by‑design for accelerators, grants or pilots.
                </p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">Handling sensitive data</h3>
                <p className="text-sm text-gray-700">
                  When personal, financial or health data is involved, document controls and consider expert advice.
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

            <h2>Why Responsible AI matters</h2>
            <p>
              It helps founders, learners and community organisers make confident decisions about data, tooling and product
              scope. A small amount of structure can prevent expensive missteps.
            </p>
            <p>
              If you want a curated path, you can{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                get personalised recommendations
              </Link>{' '}
              or browse relevant topics like{' '}
              <Link href="/articles/ai/ai-basics" className="font-medium text-[#1028E0] hover:underline">
                AI basics
              </Link>{' '}
              and{' '}
              <Link href="/resources" className="font-medium text-[#1028E0] hover:underline">
                resources
              </Link>
              .
            </p>

            <h2 id="choosing-help">Choosing the right next step</h2>
            <p>
              Support ranges from self‑guided templates and community mentoring to structured courses and specialist audits. Pick
              the lightest option that addresses your actual risks and stage.
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
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritisation and practical guardrails.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Frameworks, trade‑offs, intros.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Office hours, decision reviews, templates.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Feasibility and evaluation.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prompting, benchmarking, deployment.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prototypes, prompt tests, audits.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Privacy/legal advisor</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Higher‑risk data and contracts.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">APPs, consent, cross‑border rules.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Policy review, clauses, training.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                Choose the smallest intervention that reduces your top risk. Ask providers for clear outcomes, costs, and data
                handling details before you commit.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, most teams can create a responsible AI starter stack in a week or less. Costs vary by provider and
              scope—use free community options first, then add paid support if needed.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Free community learning, university/library resources, scholarships, and state or federal programs can reduce
                cost. Availability and eligibility differ by state and provider—check the latest details on official sites.
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
                      What's included
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Self‑guided starter path</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$50 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Reading list, templates, basic checks.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Workshop / short course</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–8 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$200–$2,000 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Guided curriculum, examples, feedback.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mentoring/advisory session</td>
                    <td className="px-6 py-4 text-sm text-gray-700">45–90 minutes</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">$0–$300 (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Decision review, risk screen, next steps.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal/privacy consultation</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–5 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">$500–$3,000+ (AUD)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Policy review, contracts, APP guidance.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Learning & practice:</strong> 1–3 hours to understand core concepts, 1–3 hours to apply.
                  </li>
                  <li>
                    <strong>Implementation:</strong> 2–10 hours to configure tools and policies.
                  </li>
                  <li>
                    <strong>Review & iteration:</strong> 1–2 hours per cycle.
                  </li>
                  <li>
                    <strong>Community/mentor feedback:</strong> 30–60 minutes.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Use free templates to define scope before buying tools.</li>
                  <li>Prefer vendor modes that disable training on your data.</li>
                  <li>Redact or synthesise sensitive data in tests.</li>
                  <li>Book short mentoring sessions for targeted decisions.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>
              Responsible AI spans the following areas. You can start simple and add depth as risk increases.
            </p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧭 Governance & policy</h3>
                <p className="text-sm text-gray-700">One‑page policy, roles, decision log and review cadence.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🔍 Data & privacy</h3>
                <p className="text-sm text-gray-700">Purpose limitation, consent, de‑identification, retention.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🧪 Evaluation & monitoring</h3>
                <p className="text-sm text-gray-700">Prompt tests, baselines, error budgets, ongoing checks.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">🔐 Security & access</h3>
                <p className="text-sm text-gray-700">Least privilege, API key hygiene, incident response basics.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">🧠 Model & prompt safety</h3>
                <p className="text-sm text-gray-700">Guardrails, harmful content filters, human‑in‑the‑loop.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Transparency & docs</h3>
                <p className="text-sm text-gray-700">User‑facing notes, capability limits, contact pathways.</p>
              </div>
            </div>

            <h2>Comparison: {TOPIC} vs compliance</h2>
            <p>
              Compliance is the legal baseline (e.g. privacy law). Responsible AI adds practical safeguards—testing,
              monitoring, user transparency and continuous improvement—that reduce risk and improve product quality.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              A light, repeatable workflow helps founders and teams ship confidently, avoid unnecessary complexity, and
              communicate clearly with customers, partners and regulators.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      Responsible AI starter checklist
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A one‑pager to set goals, screen risks, choose simple safeguards, and record decisions. Use it before
                      picking tools or writing policies.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/resources/responsible-ai-starter-checklist"
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
                      href="/resources/responsible-ai-starter-checklist"
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
                      href="/resources/responsible-ai-starter-checklist"
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
              Clarify your goal, constraints and what “good” looks like. Choose the smallest safe step that reduces the highest
              risk without locking you into expensive commitments.
            </p>
            <p>
              You can use{' '}
              <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI's recommendations
              </Link>{' '}
              to discover resources and learning paths, or check upcoming{' '}
              <Link href="/events" className="font-medium text-[#1028E0] hover:underline">
                events
              </Link>{' '}
              and <Link href="/resources" className="font-medium text-[#1028E0] hover:underline">resources</Link>.
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates reduce ambiguity and help you capture the essentials: goals, risks, safeguards and decisions.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Faster onboarding for new teammates and stakeholders.</li>
              <li>Clearer mentoring sessions and vendor briefings.</li>
              <li>A reusable record when models, prompts or regulations change.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              Teams that use a light responsible‑AI workflow catch issues earlier, communicate more clearly and make better
              trade‑offs between speed and safety. It also helps with partner and investor diligence.
            </p>
            <p>
              The aim is practicality, not perfection: a modest, repeatable process you can extend for higher‑risk use cases.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>
              In some situations you may need deeper work alongside your starter workflow.
            </p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & responsible data use</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• When personal or sensitive data is involved.</li>
                  <li>• Cross‑border disclosures and vendor terms.</li>
                  <li>• Updating notices, consent and retention.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Model evaluation & benchmarking</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Safety filters, bias checks, error budgets.</li>
                  <li>• Baselines vs “AI‑assisted” workflows.</li>
                  <li>• Monitoring drift and regressions.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & consumer law basics</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Contract clauses for data and liability.</li>
                  <li>• IP ownership of prompts and outputs.</li>
                  <li>• Clear, non‑misleading claims (ACCC).</li>
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
              Responsible AI works best when you keep it small, specific and repeatable. You don’t need a complex program—just
              enough structure to reduce your top risks.
            </p>
            <p>
              Use the checklist below to turn intent into action, then iterate as your product and context evolve.
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
                        href="/resources/responsible-ai-starter-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write down your goal, constraints and success metric.</li>
                    <li>List assumptions and what evidence you already have.</li>
                    <li>Note deadlines (launch, application, pilot date).</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Decide between self‑guided learning, mentoring or a short course.</li>
                    <li>
                      Use{' '}
                      <Link href="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI's recommendations
                      </Link>{' '}
                      to shortlist options.
                    </li>
                    <li>Check source credibility and data handling transparency.</li>
                    <li>Pick one small, testable step for this week.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Narrow scope: one workflow, one audience.</li>
                    <li>Define success and failure conditions up front.</li>
                    <li>Document prompts, settings and outcomes.</li>
                    <li>Keep sensitive data out of third‑party tools.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Summarise what worked, what didn’t, and what changed.</li>
                    <li>Share with teammates or a mentor for feedback.</li>
                    <li>Decide to iterate, expand or stop.</li>
                    <li>Update your one‑page policy and decision log.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Make it sustainable</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Schedule a monthly review and incident drill.</li>
                    <li>Assign roles for privacy, security and model testing.</li>
                    <li>Re‑check official guidance as it evolves.</li>
                    <li>Plan your next milestone (pilot, launch, pitch).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 15) FAQ + contact */}
            <div className="my-12">
              <ArticleFAQ items={faqs} />
              <p className="mt-4 text-base text-gray-600">
                If you still have questions after reading this guide, you're welcome to contact us via the{' '}
                <Link href="/about" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  About page
                </Link>{' '}
                or get tailored recommendations through{' '}
                <Link href="/?mode=recommend" className="font-semibold text-[#1028E0] hover:text-[#1028E0]">
                  MLAI's recommendations
                </Link>
                .
              </p>
            </div>

            {/* 16) Cross-link banner */}
            <div className="my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm text-indigo-900">
                Ready for the next step?{' '}
                <Link href="/articles/featured/ai-startup-foundations" className="font-semibold text-[#1028E0] hover:underline">
                  Explore AI Startup Foundations →
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
