import { Link, useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import type { ReactNode } from 'react'

import { canonical } from '../../seo-config'
import { applyArticleRegistryDefaults } from '../../registry'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import AuthorBio from '../../../components/AuthorBio'
import type { FeaturedPersonProfile } from '../../../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Weekly deep dive into AI and ML advancements'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates'
const AUTHOR = 'MLAI Editorial Team'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO = 'We monitor the Australian AI and machine learning ecosystem, translating technical shifts and policy updates into plain-English actions for founders, operators, and learners.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
const DATE_MODIFIED = '2025-02-15T00:00:00.000Z'
const DESCRIPTION = 'Stay across this week’s AI and ML advancements with Australian context: model updates, safety notes, regulation changes, tooling tips, and actions for teams.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Abstract data visualisation representing AI and machine learning signals'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  // ≥6 items; AU context; evidence-forward; answers can be strings or JSX.
  { id: 1, question: 'What are the biggest AI model updates this week?', answer: 'Frontier labs released incremental efficiency gains (e.g., longer context windows and cheaper inference tiers). No new state-changing frontier model is publicly available as at Feb 2025, but fine-tuned domain models for finance and health have improved safety guardrails.' },
  { id: 2, question: 'How does this affect Australian startups?', answer: 'Lower inference pricing and longer context mean founders can pilot richer copilots (contracts, compliance, research summaries) with smaller budgets. Keep data residency in mind—choose AU or APAC regions where available and document where data is processed.' },
  { id: 3, question: 'Do I need to change my privacy notices?', answer: 'If you introduce new AI features that process personal or sensitive information, update your privacy notice and consent flows. Reference the OAIC APPs and include a short, plain-English description of what the model does, inputs needed, retention, and human oversight.' },
  { id: 4, question: 'What is the safest way to start a pilot?', answer: 'Begin with low-risk internal content (policies, FAQs), apply rate limits, log prompts/outputs, and perform red-team style testing. Use feature flags and role-based access. Run a DPIA/PIA if personal data is involved.' },
  { id: 5, question: 'How should teams validate model performance?', answer: 'Create a small, labeled evaluation set that mirrors your domain. Track accuracy, hallucination rate, latency, and cost per request. Re-test after any model switch or prompt change, and record changes in a decision log.' },
  { id: 6, question: 'Are there grants or programs in Australia for AI experiments?', answer: 'Check current state-based innovation vouchers, CSIRO Kick-Start, and university accelerator programs. Funding cycles shift—confirm eligibility windows and co-contribution rules before committing spend.' },
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

type LoaderData = Awaited<ReturnType<typeof loader>>

export default function ArticlePage() {
  const { article, featuredPeople } = useLoaderData<LoaderData>()

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

        summaryHighlights={{
          heading: `Key facts: ${TOPIC}`,
          intro:
            'Practical rundown for Australian founders, teams, and learners tracking weekly AI/ML changes, with emphasis on safety, costs, and compliance expectations in 2025.',
          items: [
            {
              label: `What is ${TOPIC}?`,
              description:
                'A weekly, evidence-led snapshot of model releases, pricing shifts, regulation, and practical tips that impact how Australians build and deploy AI/ML.',
            },
            {
              label: `Who needs it?`,
              description:
                'Founders, product managers, engineers, students, and community facilitators who must keep products aligned with current capabilities and local privacy norms.',
            },
            {
              label: `Cost & Effort (2025)`,
              description:
                'Expect 1–2 hours to scan, plus ~4 hours to trial changes. Many frontier APIs cut inference costs; still budget for evals, observability, and storage.',
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
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
              <Link to="/articles" className="font-semibold text-[--brand-ink] hover:underline">
                Browse related articles →
              </Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
              {/* Icon: Rocket */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84v4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For leaders validating ideas, seeking funding, or managing teams.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
              {/* Icon: Graduate */}
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For those building portfolios, learning new skills, or changing careers.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-[--brand-ink]">
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
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <p>
            <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025 landscape.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>What is {TOPIC}?</h2>
          <p>
            A weekly deep dive summarises material AI and machine learning changes—model releases, pricing, safety notes, evaluation results, and policy shifts—filtered for relevance to Australian teams. Instead of scanning dozens of release notes or social threads, you get a concise, evidenced view with links to primary sources and practical next steps. We focus on what can be actioned within a week, noting where verification or expert review is still required.
          </p>
          <p>
            The aim is to help you keep products compliant with local expectations (Privacy Act reforms in progress; OAIC guidance; state procurement rules) and to avoid surprise costs when models or rate limits change. We include caveats so you can communicate honestly with stakeholders and customers.
          </p>

          {/* 4) Resource / Checklist CTA (Fixed Image Bug) */}
          <div className="my-12 rounded-2xl bg-gray-50 p-8 sm:p-12 relative overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 relative z-10">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-[--brand-ink]">Free download</span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
                  {TOPIC} <br className="hidden sm:inline" /> Checklist & Notes
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Capture goals, data sensitivity, use cases, risks, and pilot results. Includes prompts for decision logs and a one-page summary for stakeholders.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <a href="#" className="inline-flex items-center justify-center rounded-lg bg-[--brand] px-6 py-3 text-sm font-semibold text-[--accent] shadow-sm ring-1 ring-inset ring-[--brand] hover:brightness-95 transition-colors">
                    Download Checklist (PDF)
                  </a>
                </div>
              </div>

              {/* Document Preview Cards - Tilted stack effect */}
              <div className="flex gap-4 justify-center lg:justify-end">
                <div className="w-40 rotate-[-3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg bg-white p-4 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 1</p>
                    <p className="text-xs text-gray-500">Page 1</p>
                  </div>
                </div>
                <div className="w-40 rotate-[3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                  <div className="rounded-lg bg-white p-4 border border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Checklist Page 2</p>
                    <p className="text-xs text-gray-500">Page 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-50/80 blur-3xl" />
          </div>


          <h2>Why it matters in 2025</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bdbe603f-d16d-4949-afc1-6915177f76f0.jpg?alt=media&token=5c392e57-e210-4528-9866-fca5f8a23245" alt="Modern abstract illustration symbolizing significance and innovation for the year 2025." className="w-full rounded-lg my-8" />

          <p>
            AI/ML capability is compounding, but the most impactful shifts for operators are often pragmatic: latency improvements, cheaper context, safer defaults, and clearer governance expectations. As at February 2025, Australian privacy reforms are still in motion, yet customers already expect transparent data handling and human oversight. Weekly awareness helps you avoid building on deprecated endpoints, prevent regressions after silent model updates, and communicate realistic timelines to boards or grant assessors.
          </p>
          <p>
            Teams that review changes weekly can spot savings (e.g., switching to a more efficient embedding model), reduce risk (patching prompt injection vectors), and maintain trust (documenting where AI is used). The window between a model update and customer impact is shrinking; a light-weight, repeatable cadence keeps you prepared.
          </p>

          <div className="my-8 border-l-4 border-[--brand-ink] bg-teal-50/70 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-[--brand-ink] flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">
              Maintain a 1-page "AI change log" with dates, sources, and decisions; link it in sprint rituals so everyone sees what changed and why.
            </p>
          </div>

          <h2>Step-by-Step Guide</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fcfc94f3-66dc-43ae-966e-2a828760b4ca.jpg?alt=media&token=b35a90f7-cf7f-48cc-85ff-7e18b5016739" alt="Modern abstract illustration showcasing a step-by-step guide concept with dynamic shapes and technical elements." className="w-full rounded-lg my-8" />

          <h3>Step 1: Preparation</h3>
          <p>
            Set a 60–90 minute weekly slot. Define your sources: official provider changelogs, trusted evaluation blogs, OAIC/ACCC updates, and a shortlist of academic or industry newsletters. Assign an owner but invite rotation so knowledge spreads. Before each session, skim for: model version changes, pricing/quotas, safety patches, new SDKs, and regional data handling notes. Pre-load 5–10 high-priority links to avoid rabbit holes.
          </p>
          <p>
            Create a simple template: date, sources, notable changes, risks, opportunities, required decisions, and follow-ups. Label each item with impact (cost/safety/product) and effort (S/M/L). Have your evaluation set ready so you can test new models quickly without rebuilding pipelines.
          </p>

          <h3>Step 2: Execution</h3>
          <p>
            For each change, answer four questions: What changed? Why does it matter for our use cases? What evidence do we have (benchmarks, provider notes, community tests)? What is our next action? Run quick trials with your eval set, logging accuracy, hallucinations, latency, and cost. If a provider introduces a new default safety layer, re-run tests to confirm no over-blocking or silent truncation.
          </p>
          <p>
            Evaluate integration effort. Some upgrades are drop-in (same API path), others require new SDK versions or prompt tweaks. Note dependency updates in package management, and check license terms. Capture privacy and security implications—especially if new features move data to different regions or enable third-party plugins. If uncertain, park items in a "needs legal/infosec review" column.
          </p>

          <h3>Step 3: Review</h3>
          <p>
            Summarise decisions and publish to your team channel: wins (e.g., 20% cost reduction by switching embeddings), cautions (e.g., hallucination spike with new model), and actions (e.g., update rate limits, add monitoring). Record unresolved items with owners and due dates. If you paused a change, state the trigger to revisit (e.g., when evaluation coverage expands, or after a security sign-off).
          </p>
          <p>
            Close the loop by updating documentation: privacy notices if new data categories are processed, customer-facing FAQs, and runbooks for incident response. If you ship user-facing AI, add an "as at Feb 2025" note to clarify currency and link to provider status pages. Archive your weekly logs so auditors and grant assessors can see your governance trail.
          </p>

          <h2>Conclusion</h2>
          <p>
            A weekly deep dive into AI and ML advancements keeps Australian teams responsive to change without chasing hype. By standardising sources, testing with your own eval set, and publishing concise decisions, you balance speed with safety. The cadence also strengthens trust with customers, investors, and regulators—showing you actively monitor risk while pursuing opportunity.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-[--brand-ink]">3</span>
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
          <Link to="/articles" className="hover:text-[--brand-ink] transition-colors">← Back to Articles</Link>
          <a href="#" className="hover:text-[--brand-ink] transition-colors">Top of page ↑</a>
        </div>

      </ArticleLayout>
    </div>
  )
}
