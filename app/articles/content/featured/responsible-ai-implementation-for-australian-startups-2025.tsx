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
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../../data/types'

const TOPIC = 'Responsible AI Implementation for Australian Startups'
const CATEGORY = 'featured'
const SLUG = 'responsible-ai-implementation-australia-2025'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-02-15'
const DESCRIPTION = 'Practical 2025 guide for Australian startups to implement responsible AI: governance, privacy, risk, costs, and pathways. MLAI checklist and steps included.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
const HERO_IMAGE_ALT = 'Australian startup team reviewing an AI governance checklist together'
const FEATURED_FOCUS = 'ai'

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What does responsible AI implementation mean for Australian startups?',
    answer:
      'It means designing, deploying, and operating AI systems with clear goals, privacy safeguards (aligned to the Privacy Act 1988 and OAIC guidance), risk controls, and transparent documentation that stakeholders can understand.',
  },
  {
    id: 2,
    question: 'How long does a responsible AI implementation take for a first use case?',
    answer:
      'For a narrow use case, expect 2–6 hours to scope and gather context, 4–12 hours to prototype and test, and another 2–4 hours to review and document. Larger rollouts take longer and should be phased.',
  },
  {
    id: 3,
    question: 'What does it cost in 2025?',
    answer:
      'Self-guided pilots can be $0–$50 using free tiers. Structured workshops or short courses are often $300–$2,500. Tooling can stay under $200/month if you limit scope and monitor usage.',
  },
  {
    id: 4,
    question: 'Where can I find trusted guidance and rules?',
    answer:
      <>
        Check the Office of the Australian Information Commissioner (OAIC) for privacy guidance, the National AI Centre and CSIRO for responsible AI principles, and business.gov.au for program requirements. Link to updates where possible.
      </>,
  },
  {
    id: 5,
    question: 'How do I choose the right mentor or program?',
    answer:
      <>
        Look for transparency on outcomes, costs, and evidence of safe practice. You can{' '}
        <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>
          use MLAI to get recommendations
        </Link>{' '}and compare workshops, mentors, or community options that match your stage.
      </>,
  },
  {
    id: 6,
    question: 'What should be documented?',
    answer:
      'Capture the purpose, data sources, privacy controls, evaluation approach, human oversight points, and known limitations. Keep a decision log so you can update when models, policies, or laws change.',
  },
  {
    id: 7,
    question: 'Can I use production data in AI pilots?',
    answer:
      'Only if you have consent or a lawful basis, data is minimised, and risks are assessed. Use de-identified or synthetic data where possible. Follow OAIC guidance and consult legal counsel for sensitive contexts.',
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
  keywords: ['responsible AI Australia', 'AI governance startups', 'AI risk checklist', 'OAIC privacy AI', 'AI implementation 2025'],
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
          featuredPeopleTitle={`AI practitioners experienced in ${TOPIC}`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'Australian teams are rolling out AI in 2025 and must align with OAIC privacy guidance, NAIC responsible AI principles, and clear documentation to meet customer and regulator expectations.',
            items: [
              {
                label: `What is ${TOPIC}?`,
                description:
                  'A structured way to design, test, and run AI with privacy, safety, evaluation, and human oversight built in for Australian contexts.',
              },
              {
                label: 'Who usually needs responsible AI implementation?',
                description:
                  'Founders, product teams, data/AI leads, compliance owners, and educators who must show safe, explainable AI for customers or funders.',
              },
              {
                label: 'How does it work and what does it cost in 2025?',
                description:
                  'Start with a scoped use case, run small tests, document controls; free to $50 for pilots, $300–$2,500 for structured learning.',
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
          <div className='my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
            <p className='text-sm text-indigo-900'>
              This guide is part of our broader series on responsible AI. Want fundamentals first?{' '}
              <Link href='/articles/ai/ai-basics' className='font-semibold text-[#1028E0] hover:underline'>
                Read AI basics →
              </Link>
            </p>
          </div>

          <ArticleCompanyCTA
            title='Ready to take the next step with responsible AI?'
            body='Get practical recommendations based on your goals, time, and experience level.'
            buttonText='Get recommendations'
            buttonHref='/?mode=recommend'
            note='You can filter by topic, format (online/in-person), and experience level.'
          />

          <div className='bg-white py-6 sm:py-8'>
            <div className='mx-auto max-w-7xl'>
              <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-blue-900'>🚀 For Founders & Startup Teams</h3>
                  <p className='text-sm text-gray-700'>
                    Apply responsible AI to validate use cases, safeguard data, and meet customer or investor expectations before scaling spend.
                  </p>
                </div>
                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-green-900'>🎓 For Students & Career Switchers</h3>
                  <p className='text-sm text-gray-700'>
                    Learn the core steps (purpose, data, evaluation, oversight) in plain English and practise with small, low-cost exercises.
                  </p>
                </div>
                <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                  <h3 className='mb-2 text-base font-semibold text-purple-900'>🤝 For Community Builders</h3>
                  <p className='text-sm text-gray-700'>
                    Use this as a shared reference for workshops and mentoring so participants align on safety, privacy, and documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ArticleTocPlaceholder />

          <div className='prose max-w-none'>
            <p>
              <strong>{TOPIC}</strong> is a practical, evidence-based way to design, test, and operate AI so it is safe, fair, and fit-for-purpose in Australia.
            </p>
            <p>
              At MLAI, we often see founders and learners asking how to approach responsible AI before investing in tools or programs that may not suit their sector or data.
            </p>
            <p>
              This guide uses current Australian references (as at 2025) and flags where rules or program settings can differ by state or provider.
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

            <div className='my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6'>
              <h3 className='mb-3 text-lg font-semibold text-[#1028E0]'>Key takeaways</h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <ul className='list-inside list-disc space-y-2 text-gray-700'>
                  <li>Responsible AI makes AI uses <span className='font-semibold'>safe, explainable, and legally aligned</span>.</li>
                  <li>Use it when decisions touch people, data, compliance, funding, or reputation.</li>
                  <li>Follow a clear flow: purpose → data → risks → evaluation → oversight → documentation.</li>
                  <li>Outputs are strongest when linked to measurable outcomes and review cycles.</li>
                </ul>
                <ul className='list-inside list-disc space-y-2 text-gray-700'>
                  <li>Start with one narrow use case and a measurable success metric.</li>
                  <li>Write down assumptions and decision criteria before piloting tools.</li>
                  <li>Protect privacy: minimise personal data; avoid uploading sensitive info to vendors.</li>
                  <li>Iterate with feedback from users, mentors, or compliance owners.</li>
                </ul>
              </div>
            </div>

            <h2 id='what-is'>What is Responsible AI Implementation?</h2>
            <p>
              It is a structured approach to planning, testing, and running AI that balances value with privacy, safety, fairness, and transparency. It covers purpose definition, data governance, risk assessment, human oversight, evaluation, and communication.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>Key benefits</h3>
              <ul className='list-inside list-disc space-y-1 text-gray-700'>
                <li><strong>Clarity:</strong> Aligns AI work to a defined problem and acceptable outcomes.</li>
                <li><strong>Efficiency:</strong> Avoids spending on tools or vendors that do not meet your constraints.</li>
                <li><strong>Communication:</strong> Gives teams and stakeholders a shared language for risks and evidence.</li>
                <li><strong>Risk awareness:</strong> Surfaces privacy, security, and fairness risks early.</li>
              </ul>
            </div>

            <h2 id='when-needed'>When do you need Responsible AI?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9c3a6893-5b8e-4240-828b-6b50f529ef84.jpg?alt=media&token=f8b211ca-4234-4605-ae3d-86a523775b61" alt="Abstract illustration of Responsible AI concepts, highlighting ethical technology and decision-making." className="w-full rounded-lg my-8" />

            <p>
              Use it before you deploy models that affect people, finances, or decisions; when applying for grants or accelerators; or when customers ask for proof of safe AI.
            </p>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-3 font-semibold text-blue-900'>New product or feature</h3>
                <p className='text-sm text-gray-700'>Validate impact and safety before launch; set success metrics and guardrails.</p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-3 font-semibold text-purple-900'>Vendor and tool selection</h3>
                <p className='text-sm text-gray-700'>Compare privacy terms, data locations, and evaluation results before committing.</p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-6'>
                <h3 className='mb-3 font-semibold text-orange-900'>Program or funding applications</h3>
                <p className='text-sm text-gray-700'>Show evidence of responsible use for grants, accelerators, or enterprise buyers.</p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-6'>
                <h3 className='mb-3 font-semibold text-red-900'>High-risk domains</h3>
                <p className='text-sm text-gray-700'>Health, finance, education, and government-facing tools need stronger oversight.</p>
              </div>
            </div>

            <div className='w-full'>
              <Image
                src='https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
                alt={`${HERO_IMAGE_ALT} — contextual`}
                width={800}
                height={600}
                className='w-full rounded-2xl'
              />
            </div>

            <h2>Why Responsible AI matters</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5f81d733-abc6-4642-8312-45caed7d4792.jpg?alt=media&token=0c479ad1-229d-4372-a48c-8d250655bc68" alt="Abstract illustration symbolizing the significance of Responsible AI in technology and society." className="w-full rounded-lg my-8" />

            <p>
              It protects users, keeps you aligned with the Privacy Act 1988 and OAIC guidance, and builds trust with customers, investors, and regulators.
              Use our <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>personalised recommendations</Link> to find resources that match your sector.
            </p>

            <h2 id='choosing-help'>Choosing the right next step</h2>
            <p>
              Support options range from self-guided checklists to mentor sessions, workshops, and accelerators. Prioritise clarity of outcomes, transparency on data handling, and evidence of practical experience in your domain.
            </p>

            <div className='my-8 overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Role / option</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Best for</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Key strengths</th>
                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Common formats / tools</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <tr>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Startup mentor</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Prioritisation, roadmap, avoiding common pitfalls.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Frameworks, decision logs, introductions.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Mentoring calls, office hours, pitch reviews.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>AI practitioner</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Feasibility, evaluation, safe tool selection.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Data handling, benchmarks, deployment patterns.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Prototypes, prompt tests, audits, MLOps reviews.</td>
                  </tr>
                  <tr>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Compliance / legal advisor</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Privacy, contracts, sector obligations.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Privacy-by-design, terms, risk registers.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Policy reviews, DPIAs, template clauses.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>Community / workshop</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Shared learning and peer review.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Collective examples, accountability.</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Meetups, co-working sessions, hands-on labs.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4'>
              <h3 className='mb-2 font-semibold text-indigo-900'>💡 Pro tip</h3>
              <p className='text-sm text-gray-700'>
                Ask for evidence of safe practice: data handling, evaluation examples, and clarity on what is in and out of scope. If promises sound guaranteed, treat that as a warning.
              </p>
            </div>

            <h2 id='costs'>Costs, access & time</h2>
            <p>
              As at 2025, you can start with free community resources, then scale to structured training or tooling as needed. Costs vary by provider and state; always confirm current pricing and eligibility.
            </p>

            <div className='my-6 border-l-4 border-green-400 bg-green-50 p-4'>
              <h3 className='mb-2 font-semibold text-green-900'>💰 Access pathways</h3>
              <p className='text-sm text-gray-700'>
                Free community learning, university libraries, and National AI Centre resources are available. Some state programs and scholarships offset costs. Paid courses and tools add structure—confirm inclusions and data policies.
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
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Self-guided starter path</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>2–6 hours</td>
                    <td className='px-6 py-4 text-sm font-bold text-green-600'>$0–$50</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Checklists, OAIC guidance, small tests, free tool tiers.</td>
                  </tr>
                  <tr className='bg-gray-50'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Structured workshop/course</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>1–2 days or 4–6 weeks</td>
                    <td className='px-6 py-4 text-sm font-bold text-orange-600'>$300–$2,500</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Curriculum, feedback, case studies, templates.</td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>Specialist audit or advisory</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>1–3 weeks scoped</td>
                    <td className='px-6 py-4 text-sm font-bold text-red-600'>$3,000–$15,000</td>
                    <td className='px-6 py-4 text-sm text-gray-700'>Risk assessment, DPIAs, evaluation, recommendations.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>⏱️ Time breakdown</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li><strong>Learning & practice:</strong> 2–6 hours.</li>
                  <li><strong>Implementation:</strong> 4–12 hours for a scoped pilot.</li>
                  <li><strong>Review & iteration:</strong> 1–3 hours per cycle.</li>
                  <li><strong>Mentor/community feedback:</strong> 30–60 minutes.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                <h3 className='mb-2 font-semibold text-yellow-900'>💡 Cost-saving tips</h3>
                <ul className='space-y-1 text-sm text-gray-700'>
                  <li>Use free tiers to scope and test before paying.</li>
                  <li>De-identify or synthesise data for early experiments.</li>
                  <li>Share outcomes with mentors to avoid rework.</li>
                  <li>Check state programs and university libraries for access.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>Responsible AI typically includes these elements for startups in Australia.</p>
            <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-900'>🧩 Purpose & context</h3>
                <p className='text-sm text-gray-700'>Define the problem, success metric, users, and constraints.</p>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                <h3 className='mb-2 font-semibold text-green-900'>🏗️ Data governance</h3>
                <p className='text-sm text-gray-700'>Source, minimise, de-identify, and manage consent and retention.</p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
                <h3 className='mb-2 font-semibold text-purple-900'>🎯 Risk assessment</h3>
                <p className='text-sm text-gray-700'>Identify privacy, fairness, security, and misuse risks; plan controls.</p>
              </div>
              <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                <h3 className='mb-2 font-semibold text-orange-900'>👥 Human oversight</h3>
                <p className='text-sm text-gray-700'>Decide when humans review, override, or audit AI outputs.</p>
              </div>
              <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                <h3 className='mb-2 font-semibold text-red-900'>🔒 Security & privacy</h3>
                <p className='text-sm text-gray-700'>Protect data in transit and at rest; review vendor terms and locations.</p>
              </div>
              <div className='rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
                <h3 className='mb-2 font-semibold text-indigo-900'>📄 Documentation & comms</h3>
                <p className='text-sm text-gray-700'>Keep decision logs, user notices, and evaluation summaries up to date.</p>
              </div>
            </div>

            <h2>Comparison: Responsible AI vs ad-hoc AI adoption</h2>
            <p>
              Responsible AI is intentional, documented, and evaluated. Ad-hoc adoption often skips privacy checks, clear metrics, and oversight, increasing risk and rework. Use responsible AI when outcomes affect people or compliance; use ad-hoc only for trivial, low-risk exploration.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Founders can make clearer go/no-go decisions. Product and AI teams gain a repeatable pattern for testing and monitoring. Community organisers can teach consistent, safe practices to diverse groups.
            </p>

            <div className='my-8 bg-white py-12'>
              <div className='mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2'>
                <div className='lg:pr-8 lg:pt-4'>
                  <div className='lg:max-w-lg'>
                    <h2 className='text-sm font-semibold text-indigo-600'>Free resource</h2>
                    <p className='mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
                      Responsible AI checklist & notes
                    </p>
                    <p className='mt-6 text-lg text-gray-600'>
                      A practical checklist covering purpose, data, risk, evaluation, oversight, and communication. Includes prompts for decision logs and user notices.
                    </p>
                    <div className='mt-8'>
                      <a
                        href='/resources/responsible-ai-checklist'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        Open the checklist
                      </a>
                      <p className='mt-4 text-sm italic text-gray-600'>
                        Reviewed by MLAI Editorial Team. Last updated 2025-02-15.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2'>
                  <div className='relative group'>
                    <a
                      href='/resources/responsible-ai-checklist'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='relative block overflow-hidden rounded-lg bg-white'
                    >
                      <ImageWithFallback
                        src='https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80'
                        alt='Responsible AI checklist preview page 1'
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
                      href='/resources/responsible-ai-checklist'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='relative block overflow-hidden rounded-lg bg-white'
                    >
                      <ImageWithFallback
                        src='https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80'
                        alt='Responsible AI checklist preview page 2'
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

            <ArticleCompanyHighlightCTA
              title='Need help applying this checklist?'
              body='We can point you to mentors, workshops, or programs that align with your sector and time.'
              buttonText='Get matched'
              buttonHref='/?mode=recommend'
            />

            <h2>Finding the right next step</h2>
            <p>
              Clarify your goal, constraints, data sensitivity, and success metric. Choose the smallest step that builds evidence without locking in cost. Document decisions and revisit when models or policies change.
            </p>
            <p>
              You can use <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>MLAI’s recommendations</Link> to discover resources, events, and learning paths, or browse <Link href='/resources' className='font-medium text-[#1028E0] hover:underline'>resources</Link> and <Link href='/events' className='font-medium text-[#1028E0] hover:underline'>events</Link>.
            </p>

            <h2>Using templates to streamline the process</h2>
            <p>Checklists reduce stress and help you cover essentials.</p>
            <ul className='list-inside list-disc space-y-2 text-gray-700'>
              <li>Keep purpose, data, and risks in one shared view.</li>
              <li>Brief mentors and stakeholders quickly with consistent structure.</li>
              <li>Create a reusable record for future audits or updates.</li>
            </ul>

            <h2>Impact</h2>
            <p>
              Thoughtful responsible AI reduces avoidable risk, speeds approvals, and builds trust with customers and partners. It also lowers rework when policies, models, or vendors change.
            </p>
            <p>
              It helps teams align on definitions and expectations, making it easier to communicate with non-technical stakeholders.
            </p>

            <h2>Specialised deep dives</h2>
            <p>Use deeper work when stakes are high or evidence is required.</p>
            <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-2 font-semibold text-blue-900'>🔒 Privacy & data handling</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• Sensitive or personal data involved.</li>
                  <li>• Cross-border storage or vendors.</li>
                  <li>• Need for consent, minimisation, retention rules.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-green-200 bg-green-50 p-6'>
                <h3 className='mb-2 font-semibold text-green-900'>📏 Evaluation & measurement</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• When evidence of impact is required.</li>
                  <li>• Safety and fairness tests for higher-risk uses.</li>
                  <li>• Benchmarking models or vendors.</li>
                </ul>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <h3 className='mb-2 font-semibold text-purple-900'>⚖️ Legal, IP & compliance basics</h3>
                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>• Contracts and IP ownership questions.</li>
                  <li>• Sector obligations (health, finance, education).</li>
                  <li>• When to seek qualified legal advice.</li>
                </ul>
              </div>
            </div>

            <div className='my-12'>
              <ArticleCompanyCTA
                title={`Ready to take the next step with ${TOPIC}?`}
                body='Get practical recommendations based on your goals, time, and experience level.'
                buttonText='Get recommendations'
                buttonHref='/?mode=recommend'
                note='You can filter by topic, format (online/in-person), and experience level.'
              />
            </div>

            <h2>Conclusion: Your next steps</h2>
            <p>
              You do not need to solve everything at once. Start with one use case, document your assumptions, and build evidence safely.
            </p>
            <p>
              Use the steps below to move forward with confidence and adjust as you learn.
            </p>

            <div className='my-6'>
              <h3 className='mb-6 font-semibold text-gray-800'>Your action plan</h3>
              <div className='space-y-6'>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 1: Download and prepare</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>
                      Download the checklist{' '}
                      <a href='/resources/responsible-ai-checklist' target='_blank' rel='noopener noreferrer' className='font-medium text-[#1028E0] hover:underline'>here</a>.
                    </li>
                    <li>Write your goal, constraints, and what success looks like.</li>
                    <li>List assumptions and existing evidence.</li>
                    <li>Note deadlines (launch, application, customer review).</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 2: Choose the right next step</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Decide between self-guided, mentor, or structured help.</li>
                    <li>
                      Use <Link href='/?mode=recommend' className='font-medium text-[#1028E0] hover:underline'>MLAI recommendations</Link> to shortlist fits.
                    </li>
                    <li>Check credibility, costs, and data policies.</li>
                    <li>Pick one small, testable step this week.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 3: Run a small experiment</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Keep scope narrow; define a success metric.</li>
                    <li>Use de-identified data where possible.</li>
                    <li>Document what you tried and learned.</li>
                    <li>Protect privacy; avoid sharing sensitive data in demos.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 4: Review and share</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Summarise outcomes in plain English.</li>
                    <li>Share with a mentor or stakeholder for feedback.</li>
                    <li>Decide to iterate, expand, or stop.</li>
                    <li>Update your decision log.</li>
                  </ul>
                </div>
                <div className='border-l-4 border-[#1028E0] pl-6'>
                  <h4 className='mb-2 text-lg font-bold'>Step 5: Build a sustainable plan</h4>
                  <ul className='list-disc space-y-2 pl-5 text-sm text-gray-700'>
                    <li>Set a regular review cadence.</li>
                    <li>Budget for tools and learning that match your stage.</li>
                    <li>Re-check official guidance as rules change.</li>
                    <li>Plan your next milestone (pitch, launch, workshop).</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='my-12'>
              <ArticleFAQ items={faqs} />
              <p className='mt-4 text-base text-gray-600'>
                If you still have questions, contact us via the <Link href='/about' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>About page</Link> or get tailored recommendations through{' '}
                <Link href='/?mode=recommend' className='font-semibold text-[#1028E0] hover:text-[#1028E0]'>MLAI’s recommendations</Link>.
              </p>
            </div>

            <div className='my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4'>
              <p className='text-sm text-indigo-900'>
                Ready for the next step?{' '}
                <Link href='/articles/ai/ai-basics' className='font-semibold text-[#1028E0] hover:underline'>
                  Explore the AI basics guide →
                </Link>
              </p>
            </div>

            <ArticleCompanyCTA
              title='Ready to take the next step?'
              body='Get practical recommendations based on your goals, time, and experience level.'
              buttonText='Get recommendations →'
              buttonHref='/?mode=recommend'
              note='You can filter by topic, format, and experience level.'
            />
          </div>
        </ArticleLayout>
      </div>
    </>
  )
}
