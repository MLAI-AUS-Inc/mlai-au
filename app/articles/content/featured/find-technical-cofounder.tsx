// src/app/(informational)/articles/featured/find-technical-cofounder/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getFeaturedPeople } from '@server/backend'
import { canonical } from '@/lib/seo'
import { applyArticleRegistryDefaults } from '@/articles/articles-registry'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArticleLayout } from '../../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../../components/articles/ArticleTocPlaceholder'
import { MLAITemplateResourceCTA } from '../../../../components/articles/MLAITemplateResourceCTA'
import { ImageWithFallback } from '../../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Find a Technical Cofounder in Australia'
const CATEGORY = 'featured'
const SLUG = 'find-technical-cofounder'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-12-15'
const DESCRIPTION = 'A practical 2025 guide for Australia: how to find a technical cofounder, align on roles, equity and vesting, and avoid common pitfalls. Includes checklists and links.'
const HERO_IMAGE = 'https://images.mlai.au/articles/technical-cofounder-hero-1200x630.jpg'
const HERO_IMAGE_ALT = 'Two founders planning a product architecture at a whiteboard with a laptop open'
const FEATURED_FOCUS = 'startups'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What are the most reliable ways to find a technical cofounder in Australia?',
    answer:
      'Start with community: local startup/AI meetups, hackathons, university societies, and builder communities. Share a clear problem, early customer signals, and a small, scoped trial project. Use online communities thoughtfully; avoid spam and be specific about expectations.'
  },
  {
    id: 2,
    question: 'How much equity should a technical cofounder receive?',
    answer:
      'It depends on stage and contribution. Typical bands: 10–30% for a later technical leader joining an existing MVP; 30–50% for a true day‑zero cofounder. Use 4‑year vesting with a 1‑year cliff, IP assignment, and a clear founders’ agreement.'
  },
  {
    id: 3,
    question: 'Do we need a founders’ agreement in Australia?',
    answer:
      'Yes. Document roles, decision rights, vesting, IP assignment, confidentiality, dispute processes, and what happens if someone leaves. Templates can help, but get legal advice for your situation. Agreements reduce risk and expectations drift.'
  },
  {
    id: 4,
    question: 'How long does it usually take to find the right person?',
    answer:
      'Commonly 1–6 months. It is faster when you show traction (customers, waitlist, revenue, a no‑code or low‑code demo), a tight problem scope, and an evidence‑based plan for the next 90 days.'
  },
  {
    id: 5,
    question: 'Can I pay cash instead of equity?',
    answer:
      'Yes. Many founders start with a paid contractor to validate scope before formalising equity. For cofounders, combine fair equity with vesting and clear milestones. Avoid unclear “sweat equity” without documentation.'
  },
  {
    id: 6,
    question: 'I’m non‑technical. How do I attract a strong technical partner?',
    answer:
      (
        <>
          <p>
            Show traction and reduce uncertainty: validated customer pain, a clear problem statement, a narrow initial scope,
            and a lightweight prototype. Share a draft roadmap and what you will own (sales, customers, operations).
          </p>
          <p>
            You can also use{' '}
            <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
              MLAI’s recommendations
            </Link>{' '}
            to find practical learning paths and events.
          </p>
        </>
      )
  },
  {
    id: 7,
    question: 'What due diligence should we do on each other?',
    answer:
      'Portfolio/GitHub review, reference calls, small paid trial project, working‑style discussion, and alignment on values and risk. Keep sensitive data private; agree on access and security practices from day one.'
  },
  {
    id: 8,
    question: 'Where should we meet potential collaborators offline?',
    answer:
      (
        <>
          Check the{' '}
          <Link href='/events' className='font-medium text-[#1028E0] hover:underline'>events</Link>{' '}
          calendar for meetups, hackathons and workshops. Universities and community innovation hubs often host student/industry
          nights. Bring a crisp, plain‑English one‑pager and a tiny trial brief.
        </>
      )
  }
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
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: HERO_IMAGE_ALT }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TOPIC} (2025)`,
    description: DESCRIPTION,
    images: [HERO_IMAGE]
  },
  keywords: [
    'find technical cofounder',
    'technical cofounder Australia',
    'find a co-founder',
    'startup cofounder matching'
  ]
}

export default async function Page() {
  const article = applyArticleRegistryDefaults({
    title: `${TOPIC} (2025)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT
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
    location_id: p.location_id ?? (p.locations?.[0]?.id ?? null)
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
          featuredPeopleTitle='Founders and builders experienced in cofounder matching'
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025 in Australia, most founders find technical partners through community networks, small trial projects, and clear alignment on roles, equity vesting, and IP.',
            items: [
              {
                label: `What is ${TOPIC} in Australia?`,
                description:
                  'A structured way to meet, trial, and partner with a technical builder using clear scope, evidence of demand, and fair terms (vesting, IP, decision rights).'
              },
              {
                label: `Who usually needs ${TOPIC}?`,
                description:
                  'Solo or business‑leaning founders, student teams, and community organisers forming projects needing engineering leadership or delivery capability.'
              },
              {
                label: `How does ${TOPIC} work and what does it cost in 2025?`,
                description:
                  'Network via meetups and trials; expect 1–6 months, mostly free. Budget $0–$200 for events, $2k–$8k for legal; accelerators may take 5–10% equity.'
              }
            ]
          }}
          breadcrumb={
            <Breadcrumbs
              items={[
                { label: 'Articles', href: '/articles' },
                { label: TOPIC, current: true }
              ]}
            />
          }
        >
          {/* 1) Intro alert */}
          <div className='my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
            <p className='text-sm text-indigo-900'>
              This guide pairs well with startup fundamentals and early validation. New to the ecosystem?{' '}
              <Link href='/articles/startups/startup-fundamentals' className='font-semibold text-[#1028E0] hover:underline'>
                Read Startup Fundamentals →
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
                    Turn interest into commitment: clarify the problem, scope a tiny trial, and structure fair terms (vesting, IP, decision rights) before you scale.
                  </p>
                </div>
                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-green-900'>🎓 For Students & Career Switchers</h3>
                  <p className='text-sm text-gray-700'>
                    Build a portfolio with small, real projects. Join hackathons and meetups; use checklists to evaluate fit and expectations early.
                  </p>
                </div>
                <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-purple-900'>🤝 For Community Builders</h3>
                  <p className='text-sm text-gray-700'>
                    Use this as a shared reference for intros, match‑making, and mentoring. Promote safer, clearer teaming with documented expectations.
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
              <strong>{TOPIC}</strong> is less about luck and more about clarity, small trials, and fair agreements. In this
              Australia‑focused 2025 guide, you’ll learn practical steps to find, test, and partner with a technical builder.
            </p>
            <p>
              At MLAI, we regularly see founders delay for months waiting for a “perfect CTO”. The faster path is to
              validate demand, narrow the scope, and run a time‑boxed trial with someone whose strengths match your needs.
            </p>
            <p>
              Guidance differs by program and state. Where rules or funding change, check current details and consider
              professional advice for legal/tax matters. We aim to keep this concise and evidence‑forward.
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
                    Cofounder matching works best when you show real demand and a narrow, testable scope.
                  </li>
                  <li>
                    Use fair, clear terms: 4‑year vesting (1‑year cliff), IP assignment, decision rights, and exit rules.
                  </li>
                  <li>Run a small paid trial before equity to reduce risk for both sides.</li>
                  <li>Prioritise values, working style, and communication as much as technical skill.</li>
                </ul>
                <ul className='list-inside list-disc space-y-2 text-gray-700'>
                  <li>Attend 2–3 meetups; pitch a concrete problem and a 2–4 week trial brief.</li>
                  <li>Document assumptions, responsibilities, and milestone‑based equity vesting.</li>
                  <li>Protect confidentiality; avoid sharing sensitive data and credentials.</li>
                  <li>Review fit after each trial; it’s okay to part ways respectfully.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id='what-is'>What is {TOPIC}?</h2>
            <p>
              It’s a structured approach to meeting, testing, and partnering with a technical builder. You’ll align on
              the problem, outcomes, roles, equity vesting, IP ownership, and decision rights—before making long‑term
              commitments.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>Key benefits</h3>
              <ul className='list-inside list-disc space-y-1 text-gray-700'>
                <li>
                  <strong>Clarity:</strong> Convert a broad idea into a 2–4 week build/validation brief.
                </li>
                <li>
                  <strong>Efficiency:</strong> Reduce false starts by testing fit before equity.
                </li>
                <li>
                  <strong>Communication:</strong> Shared language around scope, risks, and decision‑making.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Document IP, confidentiality, and exit pathways early.
                </li>
              </ul>
            </div>

            <h2 id='when-needed'>When do you need {TOPIC}?</h2>
            <p>
              Use this approach when you have a validated problem but lack delivery capability, or when you need senior
              engineering judgment for architecture, data, or AI‑assisted workflows.
            </p>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-3 font-semibold text-blue-900'>New idea or pivot</h3>
                <p className='text-sm text-gray-700'>
                  You’ve found a pain point and early adopters. You need a builder to test core assumptions quickly.
                </p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-3 font-semibold text-purple-900'>Choosing stack & architecture</h3>
                <p className='text-sm text-gray-700'>
                  You’re deciding build vs buy, data model, and AI tool integration—and want trade‑off clarity.
                </p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-6'>
                <h3 className='mb-3 font-semibold text-orange-900'>Funding & programs</h3>
                <p className='text-sm text-gray-700'>
                  An accelerator/grant expects a credible team with delivery capability and a plan for the next 90 days.
                </p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-6'>
                <h3 className='mb-3 font-semibold text-red-900'>High‑risk domains</h3>
                <p className='text-sm text-gray-700'>
                  Privacy, safety, or compliance matters; you need disciplined engineering and documentation.
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

            <h2>Why this matters</h2>
            <p>
              A strong partnership reduces execution risk, speeds learning, and increases credibility with customers and
              programs. Clarity on scope, fit, and terms avoids costly resets.
            </p>
            <p>
              New to the ecosystem? Start with{' '}
              <Link href='/articles/startups/startup-fundamentals' className='font-medium text-[#1028E0] hover:underline'>
                Startup Fundamentals
              </Link>{' '}
              and use{' '}
              <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                MLAI recommendations
              </Link>{' '}
              to find learning paths and events near you.
            </p>

            <h2 id='choosing-help'>Choosing the right next step</h2>
            <p>
              Consider the support you need now: a mentor to shape scope, a contractor for a trial build, an engineer as
              a true partner, or a program to accelerate momentum.
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
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Startup mentor</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Scoping trials, prioritisation, intros.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Pattern recognition, frameworks, feedback.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Office hours, roadmap reviews.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Technical cofounder</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Architecture + delivery + long‑term leadership.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Product/tech trade‑offs, velocity, hiring later.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Equity with vesting, 2–4 week trials.</td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Senior contractor</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Short, testable builds with clear scope.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Delivery speed, less long‑term commitment.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Fixed‑price pilot, sprint‑based work.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Accelerator/incubator</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Network, structure, accountability.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Mentors, alumni, investor readiness.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Cohorts, equity trade, workshops.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4'>
              <h3 className='mb-2 font-semibold text-indigo-900'>💡 Pro tip</h3>
              <p className='text-sm text-gray-700'>
                Choose based on the smallest step that proves the biggest assumption. Clarity, transparency on costs, and
                a time‑boxed trial beat lengthy negotiations.
              </p>
            </div>

            <h2 id='costs'>Costs, access & time</h2>
            <p>
              As at 2025, most discovery and networking is free or low‑cost. Budget for small trials and legal
              documentation. Equity trades should vest over time; avoid large up‑front grants.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>💰 Access pathways</h3>
              <p className='text-sm text-gray-700'>
                Free community meetups, university clubs, hackathons, and online groups. Some workshops are paid. Legal
                costs vary; templates can reduce expense, but tailor agreements to your situation.
              </p>
            </div>

            <div className='my-8 overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Option</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Time (approx.)</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Estimated cost (2025)</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>What’s included</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Self‑guided starter path</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>3–6 hours</td>
                    <td className='px-6 py-4 text-sm font-bold text-green-600'>$0–$200 (AUD)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Reading, checklist, trial brief template, outreach scripts.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Meetups & hackathons</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>2–10 hours</td>
                    <td className='px-6 py-4 text-sm font-bold text-green-600'>$0–$100 (AUD)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Community intros, pitching practice, collaborators.</td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Legal setup (founders’ agreement)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>3–10 hours</td>
                    <td className='px-6 py-4 text-sm font-bold text-orange-600'>$2k–$8k (AUD)</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Vesting, IP assignment, roles, confidentiality.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Accelerator/incubator</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>8–12 weeks</td>
                    <td className='px-6 py-4 text-sm font-bold text-purple-700'>0 cash + 5–10% equity</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Mentors, workshops, network, demo day.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>⏱️ Time breakdown</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>
                    <strong>Preparation:</strong> 1–2 hours (one‑pager, trial brief, outreach list).
                  </li>
                  <li>
                    <strong>Networking:</strong> 2–6 hours (events + targeted introductions).
                  </li>
                  <li>
                    <strong>Trial build:</strong> 10–40 hours over 2–4 weeks (scope dependent).
                  </li>
                  <li>
                    <strong>Review:</strong> 1–2 hours (fit, next steps, terms).
                  </li>
                </ul>
              </div>
              <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                <h3 className='mb-2 font-semibold text-yellow-900'>💡 Cost‑saving tips</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>Use a small paid trial before equity; keep scope tight.</li>
                  <li>Adopt proven building blocks and cloud credits; avoid premature tooling.</li>
                  <li>Use vetted templates to frame agreements, then tailor with advice.</li>
                  <li>Meet in communities first; ask for warm intros to reduce noise.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>These six components keep cofounder matching practical and fair.</p>
            <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>🧭 Vision & values</h3>
                <p className='text-sm text-gray-700'>Alignment on problem, customer, market pace, ethics, and ambition.</p>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                <h3 className='mb-2 font-semibold text-green-900'>🏗️ Scope & roadmap</h3>
                <p className='text-sm text-gray-700'>A 2–4 week trial brief, then 90‑day plan with clear outcomes.</p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                <h3 className='mb-2 font-semibold text-purple-900'>🎯 Roles & responsibilities</h3>
                <p className='text-sm text-gray-700'>Who owns customers, delivery, fundraising, ops, and risk processes.</p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                <h3 className='mb-2 font-semibold text-orange-900'>👥 Working style</h3>
                <p className='text-sm text-gray-700'>Communication rhythms, decision rights, meeting cadences, conflict paths.</p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                <h3 className='mb-2 font-semibold text-red-900'>🔒 Equity, vesting & IP</h3>
                <p className='text-sm text-gray-700'>Vesting schedule, cliffs, IP assignment, confidentiality, leaver rules.</p>
              </div>
              <div className='rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
                <h3 className='mb-2 font-semibold text-indigo-900'>📄 Documentation</h3>
                <p className='text-sm text-gray-700'>Decision logs, trial reports, and a simple founders’ agreement.</p>
              </div>
            </div>

            <h2>Comparison: cofounder vs alternatives</h2>
            <p>
              A cofounder is a long‑term partner with equity and decision rights. Contractors are great for scoped builds;
              early employees trade salary for smaller equity; advisors offer guidance but not delivery.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              By running small trials and documenting expectations, you de‑risk delivery, learn faster, and keep options
              open. Clear agreements protect relationships while you build momentum.
            </p>

            {/* 8) Resource CTA (gallery) */}
            <div className='my-8 bg-white py-12'>
              <div className='mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2'>
                <div className='lg:pr-8 lg:pt-4'>
                  <div className='lg:max-w-lg'>
                    <h2 className='text-sm font-semibold text-indigo-600'>Free resource</h2>
                    <p className='mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
                      Cofounder alignment checklist & interview guide
                    </p>
                    <p className='mt-6 text-lg text-gray-600'>
                      Use this to scope a 2–4 week trial, align on roles, and cover equity/vesting/IP basics before you
                      commit.
                    </p>
                    <div className='mt-8'>
                      <a
                        href='/resources'
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
                      href='/resources'
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
                      href='/resources'
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
              Define your goal and constraints (time, budget, skills). Choose the smallest step that proves a key
              assumption—often a two‑week trial build with a clear outcome and review.
            </p>
            <p>
              Use{' '}
              <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                MLAI’s recommendations
              </Link>{' '}
              to discover learning paths and relevant community events. You can also browse{' '}
              <Link href='/resources' className='font-medium text-[#1028E0] hover:underline'>
                resources
              </Link>{' '}
              and upcoming{' '}
              <Link href='/events' className='font-medium text-[#1028E0] hover:underline'>
                events
              </Link>
              .
            </p>

            {/* 10) Templates section */}
            <h2>Using templates to streamline the process</h2>
            <p>
              Templates reduce ambiguity and help you brief collaborators clearly. They also create a record you can
              refine as you learn.
            </p>
            <ul className='list-inside list-disc space-y-2 text-gray-700'>
              <li>Capture goals, scope, constraints, and risks on one page.</li>
              <li>Align on responsibilities and decision rights before building.</li>
              <li>List milestones that unlock vesting or next steps.</li>
            </ul>

            {/* 11) Impact */}
            <h2>Impact</h2>
            <p>
              Thoughtful cofounder matching speeds feedback loops and reduces costly misunderstandings. It enables a
              professional relationship from day one, even in a scrappy early‑stage context.
            </p>
            <p>
              Clear scope and agreements create the psychological safety required to iterate quickly and learn from
              customers without derailing the partnership.
            </p>

            {/* 12) Specialised deep-dives */}
            <h2>Specialised deep dives</h2>
            <p>In some situations you’ll want deeper work alongside your matching process:</p>
            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-2 font-semibold text-blue-900'>📝 Founders’ agreement & vesting</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• 4‑year vesting, 1‑year cliff, milestone links.</li>
                  <li>• Good leaver/bad leaver rules.</li>
                  <li>• IP assignment and confidentiality.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-6'>
                <h3 className='mb-2 font-semibold text-green-900'>🔍 Technical due diligence</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• Architecture and data choices.</li>
                  <li>• Security and privacy basics.</li>
                  <li>• Delivery cadence and quality bar.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-2 font-semibold text-purple-900'>🌏 Hiring & immigration basics</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• Remote vs local trade‑offs.</li>
                  <li>• Work rights and compliance.</li>
                  <li>• ESOP setup timing and communication.</li>
                </ul>
              </div>
            </div>

            {/* 13) Indigo CTA */}
            <div className='my-12 flex flex-col items-center gap-6 rounded-2xl bg-indigo-50 p-8 shadow'>
              <div className='text-center'>
                <h3 className='mb-2 text-2xl font-semibold text-gray-900'>Ready to take the next step?</h3>
                <p className='text-gray-700'>
                  Get practical recommendations based on your goals, time, and experience level.
                </p>
              </div>
              <div className='flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
                <Link
                  href='/?mode=recommend'
                  className='inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Get recommendations →
                </Link>
              </div>
              <p className='text-sm text-gray-600'>You can filter by topic, format (online/in‑person), and experience level.</p>
            </div>

            {/* 14) Conclusion + action plan */}
            <h2>Conclusion: Your next steps</h2>
            <p>
              You don’t need a “unicorn CTO” to begin. Start with a clear problem, a tiny trial, and fair terms. Iterate
              based on evidence from customers and your working rhythm together.
            </p>
            <p>
              Use the steps below to keep momentum while protecting the relationship and the company.
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
                        href='/resources'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium text-[#1028E0] hover:underline'
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write a one‑page problem, scope, and success criteria.</li>
                    <li>Define fair vesting, IP, and decision rights assumptions.</li>
                    <li>List 10 people to contact for targeted intros.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 2: Outreach with clarity</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Attend two meetups; share your one‑pager and trial brief.</li>
                    <li>
                      Use{' '}
                      <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
                        MLAI recommendations
                      </Link>{' '}
                      to find resources and events.
                    </li>
                    <li>Ask for warm intros to 2–3 relevant builders.</li>
                    <li>Protect sensitive data; give just enough context to assess fit.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 3: Run a small paid trial</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Scope 2–4 weeks, one use case, one measurable outcome.</li>
                    <li>Agree on deliverables, review dates, and confidentiality.</li>
                    <li>Document what worked, what didn’t, and what changed.</li>
                    <li>Decide go/no‑go for a longer partnership.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 4: Formalise fair terms</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Use vesting (4 years, 1‑year cliff) and IP assignment.</li>
                    <li>Define roles, decision rights, and meeting cadence.</li>
                    <li>Capture exit and dispute processes up front.</li>
                    <li>Tailor templates with professional advice where needed.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 5: Plan the next 90 days</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Set weekly goals and a simple dashboard.</li>
                    <li>Book user conversations and iteration checkpoints.</li>
                    <li>Keep a decision log to track trade‑offs.</li>
                    <li>Re‑check program rules and opportunities each month.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 15) FAQ + contact */}
            <div className='my-12'>
              <ArticleFAQ items={faqs} />
              <p className='mt-4 text-base text-gray-600'>
                If you still have questions after reading this guide, you’re welcome to contact us via the{' '}
                <Link href='/about' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>
                  About page
                </Link>{' '}
                or get tailored recommendations through{' '}
                <Link href='/?mode=recommend' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>
                  MLAI’s recommendations
                </Link>
                .
              </p>
            </div>

            {/* 16) Cross-link banner */}
            <div className='my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
              <p className='text-sm text-indigo-900'>
                Ready for the next step?{' '}
                <Link href='/articles/startups/startup-fundamentals' className='font-semibold text-[#1028E0] hover:underline'>
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
