import { Link, useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import type { ReactNode } from 'react'

// From app/articles/content/{category}/{slug}.tsx to app/articles/seo-config.ts
import { canonical } from '../../seo-config'

// From app/articles/content/{category}/{slug}.tsx to app/articles/registry.ts  
import { applyArticleRegistryDefaults } from '../../registry'
import { getDefaultArticleAuthorDetails } from '../../authors'

// From app/articles/content/{category}/{slug}.tsx to app/components/articles/*
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'

// New Components
import AuthorBio from '../../../components/AuthorBio'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'How many startup accelerators and incubators are there in Singapore?'
const CATEGORY = 'featured'
const SLUG = 'how-many-startup-accelerators-and-incubators-are-there-in-si'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-26'
const DATE_MODIFIED = '2026-01-26'
const DESCRIPTION = 'About 60–80 active accelerators/incubators in Singapore in 2026, depending on definitions. Here’s how the count is built and how to verify programmes.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-765a4937-d602-4779-9250-982df5058a4b.jpg?alt=media&token=cae4b2b5-76fd-48f2-bb4d-c018c943c150"
const HERO_IMAGE_ALT = 'Singapore startup ecosystem with accelerators and incubators highlighted'
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
    question: 'How many accelerators and incubators are there in Singapore in 2026?',
    answer:
      'A practical range is ~60–80 active programmes. Lists like Failory cite ~65, but totals shift with new cohorts, corporate programmes, and university incubators. Treat any number as a snapshot, not a census.'
  },
  {
    id: 2,
    question: 'What counts as an accelerator versus an incubator?',
    answer: (
      <>
        <p>
          Broadly: accelerators are time-bound (e.g., 3–6 months) with a cohort, structured curriculum, mentors, and often an investment for equity (commonly 5–10%). Incubators are lighter-touch or ongoing, often university- or hub-based, providing space, community, and selective support without a fixed cohort rhythm.
        </p>
      </>
    )
  },
  {
    id: 3,
    question: 'Why do different sources show different counts?',
    answer:
      'Definitions vary (accelerator vs incubator vs venture studio), some lists include corporate innovation labs or co-working hubs, and pages can be out of date. Duplicates, paused programmes, or renamed brands also skew totals.'
  },
  {
    id: 4,
    question: 'Do accelerators take equity or charge fees?',
    answer:
      'Many accelerators invest a small cheque for 5–10% equity; some charge programme fees instead of taking equity. University incubators and some government-supported programmes may be non-dilutive. Always read current terms.'
  },
  {
    id: 5,
    question: 'Can Australian founders join Singapore programmes?',
    answer: (
      <>
        <p>
          Yes—many accept regional/international teams and offer hybrid or remote cohorts. Check visa/residency requirements for in-person phases and confirm whether incorporation in Singapore is required.
        </p>
      </>
    )
  },
  {
    id: 6,
    question: 'How can I verify a programme is active?',
    answer: (
      <>
        <ul>
          <li>Recent cohort dates (2025/2026) and active application links</li>
          <li>Updated portfolio or alumni outcomes</li>
          <li>Transparent terms (equity, fees, investment amount)</li>
          <li>Alumni references or community chatter (e.g., LinkedIn, demo days)</li>
        </ul>
      </>
    )
  },
  {
    id: 7,
    question: 'Is there an official list I can rely on?',
    answer: (
      <>
        <p>
          There is no single authoritative list. Combine aggregator roundups (e.g., Failory) with agency pages (Enterprise Singapore/Startup SG, SGInnovate) and programme websites. Cross-check for 2025/2026 activity.
        </p>
      </>
    )
  }
]

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { article } = data || {}
  const title = article?.title || `${TOPIC} (2026)`
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
    // Structured Data (Schema.org)
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: image,
        author: {
           '@type': 'Person',
           name: AUTHOR
        },
        publisher: {
           '@type': 'Organization',
           name: 'Company',
           logo: {
             '@type': 'ImageObject',
             url: '/logo.png'
           }
        },
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        description: description
      }
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: typeof faq.answer === 'string' ? faq.answer : 'Refer to article content for details.'
          }
        }))
      }
    }
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const article = applyArticleRegistryDefaults({
    title: `${TOPIC} (2026)`,
    date: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  return { article }
}

export default function ArticlePage() {
  const { article } = useLoaderData<typeof loader>()

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-transparent">
      <ArticleLayout
        article={article}
        
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/articles" className="hover:text-gray-900 transition-colors">Articles</Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-medium text-gray-900">{TOPIC}</span>
              </li>
            </ol>
          </nav>
        }
      >
        <ArticleTocPlaceholder />
        <section className="my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">{`Key facts: ${TOPIC}`}</h2>
          <p className="mt-2 text-sm text-gray-600">
            Singapore’s accelerator/incubator landscape changes each year. Use ranges, verify activity (2025/2026), and check terms before you apply.
          </p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="font-semibold text-gray-900">How many accelerators and incubators are in Singapore in 2026?</dt>
              <dd className="text-sm text-gray-600">Roughly 60–80 active programmes, depending on definitions and cohort activity; many roundups list ~65.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Why do different sources list different counts?</dt>
              <dd className="text-sm text-gray-600">Scope differs (accelerators vs incubators vs studios), plus duplicates, paused brands, and renames.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">How can I check a programme is active now?</dt>
              <dd className="text-sm text-gray-600">Look for 2025/2026 cohorts, updated portfolios, clear terms (equity/fees), and speak to 2–3 alumni.</dd>
            </div>
          </dl>
        </section>
        {/* 1) Intro alert - Clean, neutral style */}
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              If you scan aggregator lists you’ll see numbers from the 40s to 80s. In 2026, a realistic range is broader than a single point estimate—and depends on definitions and programme activity.
              {' '}<Link to="/articles" className="font-semibold text-indigo-600 hover:underline">Browse related guides →</Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
               {/* Icon: Rocket */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84p4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Scoping Singapore options? Use a shortlist-and-verify approach before committing equity or fees.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="mb-4 h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
               {/* Icon: Graduate */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Look for non-dilutive incubators and university-linked programmes if you’re pre-idea or portfolio-building.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
               {/* Icon: Community */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 a3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
               Map sector-specific options (AI, health, fintech) and track demo days to spot current activity.
            </p>
          </div>
        </div>

        {/* 3) Main content starts */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-indigo-500">
          <p>
            <strong>{TOPIC}</strong> In 2026, a sensible range is around 60–80 active programmes when you include generalist accelerators, sector-specific cohorts, corporate initiatives, and university incubators. Aggregators often cite figures near 65, but totals vary quarter to quarter as programmes pause, merge, or launch new verticals.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>The quick answer: a realistic range for 2026</h2>
          <p>
            If you just need a ballpark: expect roughly <strong>60–80 active accelerators and incubators</strong> in Singapore. Why a range? Because counts hinge on definitions (do you include corporate labs or venture studios?), programme status (paused vs. live), and whether university incubators are tallied alongside private accelerators.
          </p>

          <QuoteBlock title="Treat counts as a snapshot" variant="purple">
            Use a range, then verify whether the specific programme you care about is actively running 2025/2026 cohorts with clear terms and recent alumni.
          </QuoteBlock>

          <h2>What’s counted—and what isn’t</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-506e017c-dedf-4f20-9206-fc5b5d055142.jpg?alt=media&token=c0039b0e-29d6-46dc-b3a8-2a8d38ac2334" alt="People collaborating in a retro 90s tech startup, embodying creativity and innovation in a vibrant workspace." className="w-full rounded-lg my-8" />

          <p>
            To answer “how many,” you need boundaries. A pragmatic approach includes: time-bound accelerators with cohorts; university incubators and venture labs; corporate accelerators with a defined curriculum; and government- or agency-supported programmes with startup-facing tracks. We usually <em>exclude</em> pure co-working spaces without a programme, corporate innovation labs with no founder-facing track, and dormant brands without recent cohorts.
          </p>

          <h2>2026 snapshot by category (approximate ranges)</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b192f8d9-7935-4a4f-81b1-efd30fd1bf12.jpg?alt=media&token=70feb145-fb1e-457e-baed-26c3161a869a" alt="People collaborating in a tech startup setting with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

          <ul>
            <li><strong>Generalist accelerators:</strong> ~10–15</li>
            <li><strong>Sector/vertical accelerators (AI, health, fintech, climate):</strong> ~20–30</li>
            <li><strong>University incubators/venture labs:</strong> ~10–15</li>
            <li><strong>Corporate accelerators/programmes:</strong> ~10–15</li>
            <li><strong>Government/agency programmes (e.g., deep-tech, founder grants):</strong> ~5–8</li>
          </ul>
          <p>
            These bands reflect what founders tend to encounter in 2026 and will move with the market. Always confirm activity and terms for the specific option you’re considering.
          </p>

          <h2>Why lists disagree (and how to read them)</h2>
          <p>
            Discrepancies usually come from scope and freshness. Some roundups include venture studios or innovation labs; others don’t. A few keep inactive brands, while others drop them after a cohort gap. Names change, programmes merge, and corporate initiatives spin up or wind down. Read any list’s inclusion criteria and check recency.
          </p>

          <h2>A 5‑minute credibility check</h2>
          <ul>
            <li><strong>Recency:</strong> Look for 2025/2026 cohort pages, demo days, or announcement posts.</li>
            <li><strong>Terms:</strong> Equity ask, cheque size, or fees—spelled out in writing.</li>
            <li><strong>Alumni proof:</strong> Portfolio pages with recent logos; reach out to two alumni.</li>
            <li><strong>Mentor/operators:</strong> Named, relevant to your sector and stage.</li>
            <li><strong>Support stack:</strong> Visa/incorporation guidance if relocation is required; intros you actually need.</li>
          </ul>

          <h2>If you’re building AI: programme fit and trade‑offs</h2>
          <p>
            AI teams often benefit from deep‑tech or data‑heavy tracks that offer domain mentors, compute credits, and responsible‑AI guidance. Generalist accelerators can help with GTM and fundraising readiness, but check whether they provide access to sector mentors, pilot partners, or regulatory advice (health/finance). Balance any equity ask against the quality of that network and support.
          </p>

          <h2>Where to track updates</h2>
          <ul>
            <li>Aggregator roundups (e.g., “Top accelerators/incubators in Singapore”) for broad discovery</li>
            <li>Agency pages (e.g., Enterprise Singapore/Startup SG; SGInnovate) for official programmes</li>
            <li>Programme websites, demo‑day announcements, and alumni posts on LinkedIn</li>
          </ul>
          <p>
            Combine multiple sources and verify 2025/2026 activity before applying. If you’re an Australian founder comparing regional options, cross‑check incorporation or residency requirements.
          </p>

          <h2>Make a shortlist you can validate this week</h2>
          <p>
            Aim for 5–8 candidates spanning one generalist, one category‑specific, one university‑linked, and one corporate option. Score them on recency, mentor fit, equity/fees, and alumni outcomes. Book 2–3 quick chats with alumni before you apply.
          </p>
          
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                 <span>Create a shortlist of 5–8 programmes (mix generalist, sector, university, corporate).</span>
               </li>
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                 <span>Run the 5‑minute credibility check and confirm 2025/2026 activity and terms.</span>
               </li>
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                 <span>Speak with 2–3 alumni before you apply; adjust your shortlist accordingly.</span>
               </li>
            </ul>
          </div>
          
          <div className="my-12">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, timeline, and sector. We’re a not‑for‑profit community focused on empowering builders."
              buttonText="Get recommendations"
              buttonHref="/contact"
              note="We’ll point you to resources and communities to compare your options."
            />
          </div>
        </div>
        
        {/* Author Bio & Footer */}
        <hr className="my-10 border-gray-100" />
        
        <AuthorBio author={authorDetails} />
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <ArticleFAQ items={faqs} />
        </div>
        
        {/* Final Breadcrumb/Nav */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
           <Link to="/articles" className="hover:text-indigo-600 transition-colors">← Back to Articles</Link>
           <a href="#" className="hover:text-indigo-600 transition-colors">Top of page ↑</a>
        </div>
        
      </ArticleLayout>
    </div>
  )
}
