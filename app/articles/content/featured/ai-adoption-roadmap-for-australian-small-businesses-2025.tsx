// src/app/(informational)/articles/featured/ai-roadmap-small-business-australia-2025/page.tsx
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
const TOPIC = 'AI Adoption Roadmap for Australian Small Businesses'
const CATEGORY = 'featured'
const SLUG = 'ai-roadmap-small-business-australia-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2026-01-02'
const DESCRIPTION =
  'Practical AI adoption roadmap for Australian small businesses in 2025: use cases, costs, privacy and OAIC tips, tools, and a step-by-step plan. From MLAI.'
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1551836022-4c4c79ecde1a?auto=format&fit=crop&w=1200&h=630&q=80'
const HERO_IMAGE_ALT =
  'Australian small business owner planning an AI adoption roadmap on a laptop'
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
    question: 'What is an AI adoption roadmap for an Australian small business?',
    answer:
      'A short plan that links your business goals to specific AI use cases, data needs, tools, privacy controls, evaluation, and a 4–12 week pilot timeline—written in plain English.',
  },
  {
    id: 2,
    question: 'Where should a non‑technical team start?',
    answer: (
      <>
        Begin with one workflow (e.g., FAQs, invoice processing, marketing copy). Define success in one sentence, list
        constraints (budget, data sensitivity), then test a small pilot. See{' '}
        <Link href='/articles/ai/ai-basics' className='font-medium text-[#1028E0] hover:underline'>
          AI basics
        </Link>{' '}
        for foundations.
      </>
    ),
  },
  {
    id: 3,
    question: 'How much does it cost to get started in 2025?',
    answer:
      'Most SMEs can pilot for $0–$300 AUD/month in tool spend, plus 6–20 hours of staff time. Custom builds vary widely; keep scope small and time‑boxed first.',
  },
  {
    id: 4,
    question: 'Can we use customer data with AI tools under Australian privacy law?',
    answer: (
      <>
        Only if you have a lawful basis and appropriate safeguards. Review the{' '}
        <a
          href='https://www.oaic.gov.au/privacy/australian-privacy-principles'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          Australian Privacy Principles (APPs)
        </a>{' '}
        and your privacy policy. Redact or synthesise sensitive data, use enterprise controls where possible, and keep a
        decision record.
      </>
    ),
  },
  {
    id: 5,
    question: 'Are there grants or free programs to help?',
    answer: (
      <>
        Options change by state and sector. Use the{' '}
        <a
          href='https://business.gov.au/grants-and-programs'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          business.gov.au Grants and Programs Finder
        </a>{' '}
        and check state small business hubs/TAFE short courses. Many vendors offer non‑profit/education discounts.
      </>
    ),
  },
  {
    id: 6,
    question: 'How long does a first pilot take?',
    answer:
      'Commonly 2–10 hours to set up and test, then 1–2 weeks of light use to measure impact. Keep scope to one workflow and one clear metric.',
  },
  {
    id: 7,
    question: 'How do we choose between off‑the‑shelf tools and custom development?',
    answer:
      'Prefer off‑the‑shelf for standard tasks (summarising, drafting). Consider custom when workflows are unique, data is specialised, or you need tight system integration.',
  },
  {
    id: 8,
    question: 'What risks should we consider (accuracy, security, IP)?',
    answer: (
      <>
        Note accuracy limits, data leakage, copyright/IP issues, and safety/abuse risks. See the National AI Centre&apos;s
        guidance on responsible AI and evaluation. For IP basics, visit{' '}
        <a
          href='https://www.ipaustralia.gov.au/'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          IP Australia
        </a>
        .
      </>
    ),
  },
  {
    id: 9,
    question: 'How do I find a mentor or community to review my plan?',
    answer: (
      <>
        Start with local meetups and online communities. You can also use{' '}
        <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
          MLAI&apos;s recommendations
        </Link>{' '}
        to find resources and programs, and browse upcoming <Link href='/events' className='font-medium text-[#1028E0] hover:underline'>events</Link>.
      </>
    ),
  },
  {
    id: 10,
    question: 'Where can I find official Australian guidance on responsible AI?',
    answer: (
      <>
        See the{' '}
        <a
          href='https://www.industry.gov.au/national-ai-centre'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          National AI Centre (CSIRO)
        </a>{' '}
        for responsible AI resources, the{' '}
        <a
          href='https://www.oaic.gov.au/privacy/'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          OAIC
        </a>{' '}
        for privacy, and the{' '}
        <a
          href='https://www.esafety.gov.au/'
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium text-[#1028E0] hover:underline'
        >
          eSafety Commissioner
        </a>{' '}
        for online safety considerations.
      </>
    ),
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
    'AI roadmap small business Australia',
    'AI adoption plan 2025',
    'SME AI checklist',
    'Responsible AI Australia',
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
      <meta property='og:title' content={article.title} />
      <meta property='og:description' content={article.description} />
      <meta property='og:image' content={article.image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={article.title} />
      <meta name='twitter:description' content={article.description} />
      <meta name='twitter:image' content={article.image} />

      <div className='bg-white'>
        <ArticleLayout
          article={article}
          faqItems={faqs}
          featuredPeople={featuredPeople}
          featuredPeopleTitle='AI practitioners experienced in small‑business AI adoption'
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'In Australia in 2025, SMEs can trial AI safely by aligning use cases with OAIC privacy guidance and the National AI Centre’s responsible AI principles.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'A simple plan that ties business goals to safe AI pilots, tools, data, evaluation, and risk controls aligned to Australian guidance.',
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Owners, managers, and teams planning pilots, comparing tools, or preparing for grants, tenders, or assurance requirements.',
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Start with one workflow. Expect 2–10 hours for a pilot; tools range from free tiers to $30–$300+ AUD/month, depending on scope.',
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
          <div className='my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
            <p className='text-sm text-indigo-900'>
              This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
              <Link href='/articles' className='font-semibold text-[#1028E0] hover:underline'>
                Browse related articles →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA */}
          <MLAITemplateResourceCTA />

          {/* 3) Persona grid */}
          <div className='bg-white py-6 sm:py-8'>
            <div className='mx-auto max-w-7xl'>
              <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-blue-900'>🚀 For Founders & Startup Teams</h3>
                  <p className='text-sm text-gray-700'>
                    Apply AI to real decisions—customer support, marketing, and operations—without over‑spending on tools or
                    risky experiments.
                  </p>
                </div>
                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-green-900'>🎓 For Students & Career Switchers</h3>
                  <p className='text-sm text-gray-700'>
                    Learn the basics, practise on safe sample data, and build a small portfolio project that shows practical value.
                  </p>
                </div>
                <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-purple-900'>🤝 For Community Builders</h3>
                  <p className='text-sm text-gray-700'>
                    Use this guide in workshops and mentoring sessions to set shared definitions and clear, low‑risk next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4) TOC mount point */}
          <ArticleTocPlaceholder />

          {/* 5) Main prose intro + hero image */}
          <div className='prose max-w-none'>
            <p>
              <strong>{TOPIC}</strong> is a practical way to move from curiosity to a small, measurable pilot. It aligns
              your goal, data, tools, and safety measures so you can learn quickly without taking unnecessary risks.
            </p>
            <p>
              At MLAI, we often see small businesses ask how to start before they commit to subscriptions or complex builds.
              This guide explains a simple, Australian‑context process you can adapt to your situation.
            </p>
            <p>
              We reference official guidance where possible (e.g., OAIC privacy, National AI Centre responsible AI). Program
              rules and offers can change by provider and state; always check current details before you pay.
            </p>

            <div className='my-4 w-full'>
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                width={800}
                height={600}
                className='w-full rounded-2xl'
                priority
              />
            </div>

            {/* 6) Key takeaways */}
            <div className='my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6'>
              <h3 className='mb-3 text-lg font-semibold text-[#1028E0]'>Key takeaways</h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <ul className='list-inside list-disc space-y-2 text-gray-700'>
                  <li>
                    An AI adoption roadmap helps you <span className='font-semibold'>prioritise and de‑risk practical AI pilots</span>.
                  </li>
                  <li>
                    It is most useful when deciding about <span className='font-semibold'>customers, processes, compliance, and tooling</span>.
                  </li>
                  <li>Follow a clear loop: set goal → gather context → run a small test → document decisions.</li>
                  <li>Tie insights directly to next steps, owners, and a single measurable outcome.</li>
                </ul>
                <ul className='list-inside list-disc space-y-2 text-gray-700'>
                  <li>Start with one workflow and one metric; free tiers are often enough for learning.</li>
                  <li>Write down assumptions before testing; it prevents “moving the goalposts”.</li>
                  <li>Protect privacy: avoid uploading sensitive data unless you have safe controls.</li>
                  <li>Iterate monthly; what works in one team or sector may not transfer directly.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id='what-is'>What is an AI adoption roadmap?</h2>
            <p>
              It’s a short, plain‑English document and checklist that links your business goals to one or two AI use cases,
              the data they need, the safest tools to trial, how you will measure success, and how you will manage risks
              (privacy, security, accuracy, and reputation). It is not vendor marketing and not a guarantee of results.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>Key benefits</h3>
              <ul className='list-inside list-disc space-y-1 text-gray-700'>
                <li>
                  <strong>Clarity:</strong> Everyone sees the same goal, scope, and constraints before testing.
                </li>
                <li>
                  <strong>Efficiency:</strong> Avoids wasting time on tools or features you don’t need yet.
                </li>
                <li>
                  <strong>Communication:</strong> Easier to brief staff, advisors, and vendors using shared terms.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Privacy and safety issues are considered early, not after launch.
                </li>
              </ul>
            </div>

            <h2 id='when-needed'>When do you need this?</h2>
            <p>
              Use a roadmap before you pay for tool stacks, commit to a long contract, or brief a developer. It’s also
              helpful when applying for grants or tenders that require evidence of responsible practice.
            </p>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-3 font-semibold text-blue-900'>New idea or workflow improvement</h3>
                <p className='text-sm text-gray-700'>
                  Validate demand and feasibility for one workflow (e.g., customer replies, quotes, or internal summaries).
                </p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-3 font-semibold text-purple-900'>Choosing tools and platforms</h3>
                <p className='text-sm text-gray-700'>
                  Compare “build vs buy”, vendor privacy options, pricing, and how data is stored or processed.
                </p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-6'>
                <h3 className='mb-3 font-semibold text-orange-900'>Applying for programs or funding</h3>
                <p className='text-sm text-gray-700'>
                  Show a clear plan, a testable scope, and a simple measurement approach aligned to responsible AI norms.
                </p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-6'>
                <h3 className='mb-3 font-semibold text-red-900'>Avoiding avoidable risks</h3>
                <p className='text-sm text-gray-700'>
                  Where privacy, security, or reputation risks are meaningful, document controls before you test.
                </p>
              </div>
            </div>

            <div className='w-full'>
              <Image
                src={HERO_IMAGE}
                alt={`${HERO_IMAGE_ALT} — contextual`}
                width={800}
                height={600}
                className='w-full rounded-2xl'
              />
            </div>

            <h2>Why it matters</h2>
            <p>
              A lightweight roadmap helps founders and operators learn faster with less risk. It creates a shared language
              across business and technical roles and reduces rework when you scale.
            </p>
            <p>
              If you’re new to the space, start with{' '}
              <Link href='/articles/ai/ai-basics' className='font-medium text-[#1028E0] hover:underline'>
                AI basics
              </Link>{' '}
              or use{' '}
              <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                MLAI&apos;s recommendations
              </Link>{' '}
              to pick a short learning path.
            </p>

            <h2 id='choosing-help'>Choosing the right help</h2>
            <p>
              Different options suit different stages. Prioritise clarity of outcomes, transparent costs, and evidence of
              responsible practice.
            </p>

            <div className='my-8 overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Role / option
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Best for
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Key strengths
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Common formats / tools
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <tr>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Startup/SME mentor</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Decision‑making, prioritisation, avoiding common mistakes.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Pattern recognition, frameworks, introductions.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Mentoring calls, office hours, pitch reviews.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>AI practitioner</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Feasibility, evaluation, and safe tool selection.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Technical trade‑offs, data, deployment, testing.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Prototypes, benchmarks, prompt tests, audits.</td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Digital advisor / TAFE</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Structured learning and practical small business guidance.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Curriculum, hands‑on sessions, community links.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Short courses, workshops, templates, checklists.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Vendor / integrator</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Tool setup, integrations, and support.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Product knowledge, automation, connectors.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Implementations, plug‑ins, managed services.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4'>
              <h3 className='mb-2 font-semibold text-indigo-900'>💡 Pro tip</h3>
              <p className='text-sm text-gray-700'>
                Ask each provider to state the outcome, time commitment, and total cost (including add‑ons). If anything
                sounds guaranteed or vague, treat it as a red flag.
              </p>
            </div>

            <h2 id='costs'>Costs, access & time</h2>
            <p>
              The figures below are broad ranges as at 2025. Programs and pricing vary across providers and states—always
              check current details before committing.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>💰 Access pathways</h3>
              <p className='text-sm text-gray-700'>
                Start with free community learning, libraries, university open materials, and vendor free tiers. Look for
                scholarships, state small‑business programs, and short courses. See{' '}
                <a
                  href='https://business.gov.au/grants-and-programs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium text-[#1028E0] hover:underline'
                >
                  business.gov.au
                </a>{' '}
                for current grants.
              </p>
            </div>

            <div className='my-8 overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Option
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Time (approx.)
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Estimated cost (2025)
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                      What&apos;s included
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Self‑guided starter path</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>2–6 hours</td>
                    <td className='px-6 py-4 text-sm font-bold text-green-600'>$0–$50 (AUD)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      Reading, checklists, sample data, and free trials (no credit card where possible).
                    </td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Mentored micro‑pilot</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>1–3 weeks (5–20 staff hours)</td>
                    <td className='px-6 py-4 text-sm font-bold text-orange-600'>$150–$1,500 (AUD)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      One workflow, weekly check‑ins, simple measurement, and a short decision record.
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Off‑the‑shelf tool subscription</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Ongoing (setup 2–8 hours)</td>
                    <td className='px-6 py-4 text-sm font-bold text-green-600'>$0–$300+ / month</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      Hosted features, basic privacy controls, support. Check data processing terms carefully.
                    </td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Custom development (small)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>2–8 weeks (time‑boxed)</td>
                    <td className='px-6 py-4 text-sm font-bold text-red-600'>$2,000–$30,000+</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      Discovery, prototype, integration. Rates vary widely; clarify IP, data, and maintenance.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>⏱️ Time breakdown</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>
                    <strong>Learning & practice:</strong> 2–4 hours to understand concepts and try examples.
                  </li>
                  <li>
                    <strong>Implementation:</strong> 4–20 hours depending on workflow and tooling.
                  </li>
                  <li>
                    <strong>Review & iteration:</strong> 1–2 hours per cycle to check results and adjust.
                  </li>
                  <li>
                    <strong>Community/mentor feedback:</strong> 30–60 minutes to sanity‑check decisions.
                  </li>
                </ul>
              </div>
              <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                <h3 className='mb-2 font-semibold text-yellow-900'>💡 Cost‑saving tips</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>Use free trials with synthetic or redacted data first.</li>
                  <li>Cancel unused subscriptions quickly; review monthly.</li>
                  <li>Prefer open formats and exports to avoid lock‑in.</li>
                  <li>Ask vendors for small‑business or education discounts.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>The roadmap usually covers the following areas.</p>
            <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>🎯 Goals & use cases</h3>
                <p className='text-sm text-gray-700'>Agree on one workflow and one metric that matter to the business.</p>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                <h3 className='mb-2 font-semibold text-green-900'>🗂️ Data readiness</h3>
                <p className='text-sm text-gray-700'>Identify sources, sensitivity, owners, and what must be redacted.</p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                <h3 className='mb-2 font-semibold text-purple-900'>🛠️ Tool selection</h3>
                <p className='text-sm text-gray-700'>Compare build vs buy, privacy controls, costs, and integrations.</p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                <h3 className='mb-2 font-semibold text-orange-900'>✍️ Workflow & prompting</h3>
                <p className='text-sm text-gray-700'>Document steps, guardrails, and reusable prompts or templates.</p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                <h3 className='mb-2 font-semibold text-red-900'>🔒 Privacy & safety</h3>
                <p className='text-sm text-gray-700'>Note APPs/consent, data handling, access controls, and misuse risks.</p>
              </div>
              <div className='rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
                <h3 className='mb-2 font-semibold text-indigo-900'>📏 Evaluation & decision log</h3>
                <p className='text-sm text-gray-700'>Measure outcomes, record decisions, and plan the next iteration.</p>
              </div>
            </div>

            <h2>Comparison: roadmap vs ad‑hoc experimentation</h2>
            <p>
              Ad‑hoc testing can be useful for learning, but it rarely produces a repeatable result or a clear decision.
              A roadmap sets a measurable goal, scope, and safety checks so you can decide to scale, iterate, or stop.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Founders and operators get clarity on what “good” looks like, learners build a portfolio of practical work,
              and community organisers can run safer, more focused sessions.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className='my-8 bg-white py-12'>
              <div className='mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2'>
                <div className='lg:pr-8 lg:pt-4'>
                  <div className='lg:max-w-lg'>
                    <h2 className='text-sm font-semibold text-indigo-600'>Free resource</h2>
                    <p className='mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
                      {TOPIC} checklist &amp; notes
                    </p>
                    <p className='mt-6 text-lg text-gray-600'>
                      A one‑page checklist and notes template to define your goal, data, tools, risks, and measurement—so
                      your first pilot is focused and low risk.
                    </p>
                    <div className='mt-8'>
                      <a
                        href='/resources/ai-roadmap-checklist'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        Open the checklist
                      </a>
                      <p className='mt-4 text-sm italic text-gray-600'>
                        Reviewed by {AUTHOR}. Last updated {DATE_MODIFIED}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2'>
                  <div className='relative group'>
                    <a
                      href='/resources/ai-roadmap-checklist'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='relative block overflow-hidden rounded-lg bg-white'
                    >
                      <ImageWithFallback
                        src={HERO_IMAGE}
                        alt={`${TOPIC} resource preview 1`}
                        width={400}
                        height={500}
                        className='h-auto w-full transform object-cover transition-transform duration-200 group-hover:scale-105'
                      />
                      <div className='absolute bottom-3 left-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <span className='text-sm font-medium text-white'>Page 1 preview</span>
                      </div>
                    </a>
                  </div>
                  <div className='relative group'>
                    <a
                      href='/resources/ai-roadmap-checklist'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='relative block overflow-hidden rounded-lg bg-white'
                    >
                      <ImageWithFallback
                        src={HERO_IMAGE}
                        alt={`${TOPIC} resource preview 2`}
                        width={400}
                        height={500}
                        className='h-auto w-full transform object-cover transition-transform duration-200 group-hover:scale-105'
                      />
                      <div className='absolute bottom-3 left-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <span className='text-sm font-medium text-white'>Page 2 preview</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 9) Finding the right next step */}
            <h2>Finding the right next step</h2>
            <p>
              Clarify your goal, constraints, data sensitivity, and success metric. Then choose the smallest step that answers
              the next question without large spend or lock‑in.
            </p>
            <p>
              You can use{' '}
              <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                MLAI&apos;s recommendations
              </Link>{' '}
              to discover resources and learning paths, and browse <Link href='/events' className='font-medium text-[#1028E0] hover:underline'>events</Link>{' '}
              near you or online.
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates keep important details in one place, help you brief others, and make decisions repeatable.
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-700'>
              <li>Capture goals, data sources, risks, and metrics consistently.</li>
              <li>Share a concise brief with stakeholders, mentors, or vendors.</li>
              <li>Create a reusable decision log for future iterations.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              With a small, deliberate pilot, many SMEs see clearer processes, faster responses, or reduced admin load—without
              large up‑front commitments.
            </p>
            <p>
              The key is disciplined scope and measurement. If a test doesn’t help, you can stop early with minimal sunk cost.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>Sometimes you need additional expertise alongside the roadmap.</p>
            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-2 font-semibold text-blue-900'>🔒 Privacy & data handling</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• When personal/sensitive data is involved.</li>
                  <li>• Deciding redaction, consent, storage, and access controls.</li>
                  <li>• Aligning with OAIC APPs and recording decisions.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-6'>
                <h3 className='mb-2 font-semibold text-green-900'>📏 Evaluation & benchmarking</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• When stakeholders need evidence of impact.</li>
                  <li>• Designing simple, reliable metrics and tests.</li>
                  <li>• Avoiding overclaims and documenting limits.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-2 font-semibold text-purple-900'>⚖️ Legal, IP & compliance basics</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• When contracts, IP, or sector rules matter.</li>
                  <li>• Finding official Australian guidance and support.</li>
                  <li>• Knowing when to consult qualified professionals.</li>
                </ul>
              </div>
            </div>

            {/* 13) Indigo CTA */}
            <div className='my-12'>
              <ArticleCompanyCTA
                title={`Ready to take the next step with ${TOPIC}?`}
                body='Get practical recommendations based on your goals, time, and experience level.'
                buttonText='Get recommendations'
                buttonHref='/?mode=recommend'
                note='You can filter by topic, format (online/in‑person), and experience level.'
              />
            </div>

            {/* 14) Conclusion + action plan */}
            <h2>Conclusion: Your next steps</h2>
            <p>
              You don’t need a big budget to learn. Start with one workflow, protect privacy, and measure a single outcome.
              Review, then decide whether to scale, iterate, or stop.
            </p>
            <p>
              The action plan below is a simple, repeatable loop you can complete in a week or two.
            </p>

            <div className='my-6'>
              <h3 className='mb-6 font-semibold text-gray-800'>Your action plan</h3>
              <div className='space-y-6'>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 1: Download and prepare</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>
                      Download the checklist{' '}
                      <a
                        href='/resources/ai-roadmap-checklist'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium text-[#1028E0] hover:underline'
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your one‑sentence goal and the metric you will track.</li>
                    <li>List assumptions and constraints (budget, time, data sensitivity).</li>
                    <li>Identify one safe, non‑sensitive dataset to start with.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 2: Choose the right next step</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Pick one workflow and one tool to test first (free tier if possible).</li>
                    <li>
                      Use{' '}
                      <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                        MLAI&apos;s recommendations
                      </Link>{' '}
                      to shortlist resources and programs.
                    </li>
                    <li>Document privacy considerations and what you will not upload.</li>
                    <li>Set a hard time‑box (e.g., 1–2 hours of setup, then 1 week of light use).</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 3: Run a small experiment</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Capture the baseline (time or quality) before you start.</li>
                    <li>Run the workflow 5–10 times and record results.</li>
                    <li>Note issues (accuracy, privacy, usability) as they occur.</li>
                    <li>Take screenshots or notes for your decision record.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 4: Review and share</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Summarise results in plain English: what changed, what didn’t, what’s next.</li>
                    <li>Share with a mentor or team for feedback and sanity‑check.</li>
                    <li>Decide to scale, iterate, or stop; record the decision and why.</li>
                    <li>Update your checklist and privacy notes if you proceed.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 5: Plan the next milestone</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>If scaling, choose a second metric and any new data sources.</li>
                    <li>Review subscriptions, costs, and export/portability options.</li>
                    <li>Schedule a monthly review; keep your decision log up to date.</li>
                    <li>Check official guidance again before expanding scope.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 15) FAQ + contact */}
            <div className='my-12'>
              <ArticleFAQ items={faqs} />
              <p className='mt-4 text-base text-gray-600'>
                If you still have questions after reading this guide, you&apos;re welcome to contact us via the{' '}
                <Link href='/about' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>
                  About page
                </Link>{' '}
                or get tailored recommendations through{' '}
                <Link href='/?mode=recommend' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>
                  MLAI&apos;s recommendations
                </Link>
                .
              </p>
            </div>

            {/* 16) Cross-link banner */}
            <div className='my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
              <p className='text-sm text-indigo-900'>
                Ready for the next step?{' '}
                <Link href='/articles/ai/ai-basics' className='font-semibold text-[#1028E0] hover:underline'>
                  Explore the follow‑up guide →
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
