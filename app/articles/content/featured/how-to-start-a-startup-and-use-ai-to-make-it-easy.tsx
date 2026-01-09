import { Link, useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import type { ReactNode } from 'react'
import { applyArticleRegistryDefaults } from '../../registry'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../data/types'

// New Components
import AuthorBio from '../../../components/AuthorBio'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'How to start a startup and use AI to make it easy'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'how-to-start-a-startup-and-use-ai-to-make-it-easy'
const AUTHOR = 'Alex Grant'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO = 'Alex writes practical guides for Australian founders, with a focus on responsible AI adoption and early-stage validation.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
const DATE_MODIFIED = '2025-02-15T00:00:00.000Z'
const DESCRIPTION = 'Practical 2025 guide for Australian founders on starting a startup and using AI safely to speed research, validation, and operations.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Founders collaborating with laptops and AI tools in an office'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: 'What is the first legal step for an Australian startup?', answer: 'Choose a business structure (sole trader, partnership, or Pty Ltd) and apply for an ABN through the Australian Business Register. For limited liability and future investment, most tech startups register as Pty Ltd with ASIC.' },
  { id: 2, question: 'How can AI help with early customer research in Australia?', answer: 'Use AI to summarise interview notes, cluster themes, and draft problem statements. Always validate outputs with real customer conversations and comply with the Privacy Act 1988 when handling personal data.' },
  { id: 3, question: 'Do I need funding before building an MVP?', answer: 'Not necessarily. Many Australian founders build a lean MVP using no-code tools and AI-assisted development to reduce cost. Seek grants (e.g., state innovation vouchers) or angel investment only after clear problem–solution fit signals.' },
  { id: 4, question: 'How do I keep AI usage compliant with privacy rules?', answer: 'Avoid pasting personal or confidential client data into public AI tools. De-identify data, limit prompts to non-sensitive content, and review vendor terms. Where sensitive data is required, use enterprise-grade tools with data residency and audit controls.' },
  { id: 5, question: 'What metrics should I track first?', answer: 'Start with activation (first meaningful action), retention (repeat use), and qualitative feedback volume. Add revenue metrics only once you have a clear value hypothesis and early pricing experiments.' },
  { id: 6, question: 'How much does it typically cost to start in 2025?', answer: 'For a lean Australian tech startup: company setup and compliance ~$1.2k–$2.5k, basic tools ~$100–$300/month, AI-assisted no-code MVP build ~$1k–$5k depending on complexity. Validate these figures against your own vendors and state fees as at 02/2025.' },
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
    { property: 'og:url', content: `/articles/${CATEGORY}/${SLUG}` },
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
        datePublished: DATE_MODIFIED,
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
    title: `${TOPIC} (2025)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  const featuredPeople: FeaturedPersonProfile[] = []
  return { article, featuredPeople }
}

export default function ArticlePage() {
  const { article, featuredPeople } = useLoaderData<typeof loader>()

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-white">
      <ArticleLayout
        article={article}
        // Sticky Sidebar Components

        summaryHighlights={{
          heading: `Key facts: ${TOPIC}`,
          intro:
            'Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).',
          items: [
            {
              label: `What is ${TOPIC}?`,
              description:
                'A practical approach to launching an Australian startup while using AI tools to speed research, prototyping, and operations without skipping governance.',
            },
            {
              label: `Who needs it?`,
              description:
                'First-time founders, students testing ideas, and community builders helping early teams validate and communicate value.',
            },
            {
              label: `Cost & Effort (2025)`,
              description:
                'Expect $1k–$5k for a lean AI-assisted MVP, plus ASIC/ABN setup and basic tools; 4–8 weeks for initial validation with disciplined scope.',
            },
          ],
        }}
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
        {/* 1) Intro alert - Clean, neutral style */}
        <div className="my-6 rounded-lg border border-gray-200 bg-[--soft] p-4">
          <p className="text-sm text-[--brand-ink] flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
              <Link to="/articles" className="font-semibold text-[--brand-ink] underline-offset-4 hover:underline">
                Browse related articles →
              </Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
              {/* Icon: Rocket */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84p4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01-.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For leaders validating ideas, seeking funding, or managing teams.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
              {/* Icon: Graduate */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For those building portfolios, learning new skills, or changing careers.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
              {/* Icon: Community */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For workshop facilitators, mentors, and ecosystem supporters.
            </p>
          </div>
        </div>

        {/* 3) Main content starts */}
        <div className="">
          <p>
            <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025 landscape.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>What is {TOPIC}?</h2>
          <p>
            Starting a startup means structuring a new venture to solve a validated problem and deliver a repeatable business model. Using AI to make it easy refers to applying AI tools to speed research, prototyping, content, and operations while respecting privacy, data security, and bias controls. In Australia, this includes complying with the Privacy Act 1988, consumer law, and sector-specific guidance (e.g., health, finance) while leveraging cost-effective AI-enabled workflows.
          </p>

          {/* 4) Resource / Checklist CTA (Fixed Image Bug) */}
          <div className="my-12 rounded-2xl bg-[--soft] p-8 sm:p-12 relative overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 relative z-10">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[--brand-ink]">Free download</span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
                  {TOPIC} <br className="hidden sm:inline" /> Checklist & Notes
                </h3>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Capture goals, data sensitivity, use cases, risks, and pilot results. Includes prompts for decision logs and a one-page summary for stakeholders.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <a href="#" className="inline-flex items-center justify-center rounded-lg bg-[--brand] px-6 py-3 text-sm font-semibold text-[--accent] shadow-sm ring-1 ring-inset ring-[--brand] hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand] focus-visible:ring-offset-2">
                    Download Checklist (PDF)
                  </a>
                </div>
              </div>

              {/* Document Preview Cards - Tilted stack effect */}
              <div className="flex gap-4 justify-center lg:justify-end">
                <div className="w-40 rotate-[-3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 1</p>
                    <p className="text-xs text-gray-500">Preview</p>
                  </div>
                </div>
                <div className="w-40 rotate-[3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 2</p>
                    <p className="text-xs text-gray-500">Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-100/60 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-200/50 blur-3xl" />
          </div>


          <h2>Why it matters in 2025</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-23a1c97b-fd04-43df-a2b6-cf46061cb5a5.jpg?alt=media&token=b3b61d90-bb13-4a01-93e9-060c4fe8ecfa" alt="Modern abstract technical illustration symbolizing significance in 2025 and future innovations." className="w-full rounded-lg my-8" />

          <p>
            Early-stage capital is more selective, and buyers expect evidence. AI can reduce time-to-learning by automating desk research, clustering feedback, and generating draft UI copy. However, unmanaged AI use can introduce privacy risk, hallucinated outputs, and biased training data. 2025 is the right time to operationalise AI safely: Australian regulators are signalling tighter privacy controls, while accelerators and grants favour teams that demonstrate disciplined validation, data minimisation, and responsible AI practices.
          </p>

          <div className="my-8 border-l-4 border-[--brand] bg-teal-50/60 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-800">
              Treat every AI-assisted output as a draft; pair it with a short verification checklist so your team builds the habit of checking facts and sources.
            </p>
          </div>

          <h2>Step-by-Step Guide</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1bc0e869-f528-4c7d-b286-cf0ad9561c2e.jpg?alt=media&token=eb9abb94-bb34-43f2-9dc7-c56390e6f1f2" alt="Modern abstract illustration depicting a step-by-step process guide in a technical style." className="w-full rounded-lg my-8" />


          <h3>Step 1: Preparation</h3>
          <p>
            Define the problem and affected audience in one sentence. Register your ABN and decide on Pty Ltd if you plan to raise capital. Set up a lean stack: project tracker, version control, and an AI policy covering privacy and acceptable tools. Use AI to summarise market reports and extract competitor positioning, but record sources. Draft 10–15 customer interview questions and use AI to cluster expected themes; validate with real interviews.
          </p>
          <ul>
            <li><strong>Outputs:</strong> Problem statement, customer segments, compliance checklist, AI usage guardrails.</li>
            <li><strong>AI assists:</strong> Secondary research summaries, interview script drafts, initial landing page copy.</li>
          </ul>

          <h3>Step 2: Execution</h3>
          <p>
            Build a lean MVP (no-code or low-code) and pair AI for code suggestions or content. Keep data de-identified during tests. Run 10–20 usability sessions; use AI to transcribe and cluster feedback. Instrument activation and retention metrics. For pricing tests, generate offer pages and short explainer videos with AI voice, but clearly label them as drafts and verify claims against reality.
          </p>
          <ul>
            <li><strong>Outputs:</strong> MVP, activation events defined, first retention cohort, decision log.</li>
            <li><strong>AI assists:</strong> UI copy variants, test scripts, quick mockups, structured insight summaries.</li>
          </ul>

          <h3>Step 3: Review</h3>
          <p>
            Hold a review at week 4–8. Compare qualitative themes with quantitative signals (activation, repeat use). Identify risks: privacy, bias, security, or regulatory gaps. Decide to persevere, pivot, or pause. If persevering, harden data handling, move to paid AI tiers with data controls, and prepare an evidence pack (problem, solution, evidence, risks, next milestones) for advisors or early investors.
          </p>
          <ul>
            <li><strong>Outputs:</strong> Evidence pack, risk register, next experiment plan, grant/investor-ready summary.</li>
            <li><strong>AI assists:</strong> Board-ready summaries, visual charts from analytics exports, concise experiment retros.</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Combining disciplined startup practice with responsible AI shortens the path to evidence. Keep your scope lean, protect data, validate every AI-generated claim, and use structured decision logs. This balance helps Australian founders move faster without sacrificing trust.
          </p>

          <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="#"
              note="You can filter by topic, format (online/in‑person), and experience level."
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
          <Link to="/articles" className="hover:text-[--brand-ink] underline-offset-4 hover:underline">← Back to Articles</Link>
          <a href="#" className="hover:text-[--brand-ink] underline-offset-4 hover:underline">Top of page ↑</a>
        </div>

      </ArticleLayout>
    </div>
  )
}
