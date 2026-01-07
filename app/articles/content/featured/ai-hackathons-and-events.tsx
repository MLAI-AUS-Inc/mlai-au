// app/routes/articles.$category.$slug.tsx
import { Link, useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import type { ReactNode } from 'react'
import { applyArticleRegistryDefaults } from '../articles/registry'
import { ArticleLayout } from '../components/articles/ArticleLayout'
import { ArticleFAQ } from '../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../components/articles/ArticleCompanyCTA'
import ArticleCompanyHighlightCTA from '../components/articles/ArticleCompanyHighlightCTA'
import { ImageWithFallback } from '../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../data/types'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI Hackathons and Events in Australia'
const CATEGORY = 'featured'
const SLUG = 'ai-hackathons-and-events'
const AUTHOR = 'MLAI Editorial Team'
const DATE_MODIFIED = '2025-01-15'
const DESCRIPTION =
  'Plan AI hackathons and AI community events in Australia for 2025 with a practical guide to formats, costs, prep checklists, safety, and MLAI resources.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80'
const HERO_IMAGE_ALT = 'Developers collaborating at an AI hackathon in Australia with laptops and sticky notes'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I choose the right AI hackathon in Australia?',
    answer:
      'Match the theme to your goals (e.g., health, climate, education), check judging criteria, data/privacy rules, and whether beginner tracks or mentorship are provided.',
  },
  {
    id: 2,
    question: 'What does it cost to join an AI hackathon in 2025?',
    answer:
      'Many community or university hackathons are free; paid corporate or hybrid events range roughly $25–$250 AUD. Budget extra for travel, data access, and cloud credits if not provided.',
  },
  {
    id: 3,
    question: 'How should teams prepare before an AI hackathon?',
    answer:
      'Clarify a problem, gather any public datasets or synthetic data, review the rules, set up accounts (GitHub, notebooks, model APIs), and align on roles for product, data, and pitching.',
  },
  {
    id: 4,
    question: 'How do we manage data privacy and safety?',
    answer:
      'Use non-sensitive or synthetic data, follow OAIC privacy guidance, avoid uploading personal data to public models, and document sources and licenses for any datasets or media.',
  },
  {
    id: 5,
    question: 'Where can I find mentors or collaborators?',
    answer:
      <span>
        Check event mentor lists, join the organiser’s Discord/Slack, and use MLAI&apos;s recommender at{' '}
        <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
          /?mode=recommend
        </Link>{' '}
        to find relevant community members.
      </span>,
  },
  {
    id: 6,
    question: 'How long do AI hackathons usually run?',
    answer:
      'Common formats are 24–48 hours (weekend) or 1–4 weeks (online sprints). Allow extra time for setup, model runs, testing, and pitch refinement before submission.',
  },
  {
    id: 7,
    question: 'Can beginners join AI hackathons?',
    answer:
      'Yes. Many offer beginner tracks, intro workshops, and template notebooks. Focus on a narrow problem, clear story, and responsible use rather than complex architectures.',
  },
  {
    id: 8,
    question: 'What deliverables do judges usually expect?',
    answer:
      'A concise demo, clear problem statement, approach, responsible AI considerations, and evidence of testing or user feedback. Keep code reproducible with setup steps and licenses.',
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
    { property: 'og:url', content: `/articles/${CATEGORY}/${SLUG}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'keywords', content: 'AI hackathons Australia 2025, AI events, hackathon checklist' },
  ]
}

export async function loader(_args: LoaderFunctionArgs) {
  const article = applyArticleRegistryDefaults({
    title: 'AI Hackathons and Events in Australia (2025)',
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
          featuredPeopleTitle={`AI practitioners experienced in ${TOPIC}`}
          summaryHighlights={{
            heading: `Key facts: ${TOPIC}`,
            intro:
              'As at 2025, Australian AI hackathons mix in-person and online formats, emphasising responsible data use, reproducibility, and safety aligned with OAIC and National AI Centre guidance.',
            items: [
              {
                label: 'What are AI hackathons and events in Australia?',
                description:
                  'Short, time-boxed build or learning events where teams prototype AI solutions, often with themes like health, climate, or education, ending in a demo or pitch.',
              },
              {
                label: 'Who usually needs AI hackathons?',
                description:
                  'Founders, students, engineers, product and community teams looking to test ideas, build portfolios, meet collaborators, or stress-test responsible AI practices.',
              },
              {
                label: 'How do AI hackathons work and what do they cost in 2025?',
                description:
                  'Typically 24–48 hours or 1–4 week sprints; many are free, while paid events range ~$25–$250 AUD, with cloud credits often provided for model experimentation.',
              },
            ],
          }}
          breadcrumb={
            <nav aria-label="Breadcrumb" className="flex text-sm text-gray-500">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/articles" className="hover:text-gray-900 transition-colors">
                    Articles
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <span className="font-medium text-gray-900">{TOPIC}</span>
                </li>
              </ol>
            </nav>
          }
        >
          {/* 1) Intro alert */}
          <div className="my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm text-indigo-900">
              This guide is part of our broader series on AI adoption and community building. Prefer a foundations refresh?{' '}
              <Link to="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                Read AI basics →
              </Link>
            </p>
          </div>

          {/* 2) Resource CTA */}
          <ArticleCompanyCTA
            title="Ready to plan your AI hackathon?"
            body="Get practical recommendations on events, tooling credits, and mentors tailored to your goals."
            buttonText="Get recommendations"
            buttonHref="/?mode=recommend"
            note="Filter by location, format (online/in‑person), and experience level."
          />

          {/* 3) Persona grid */}
          <div className="bg-white py-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
                  <p className="text-sm text-gray-700">
                    Road-test problem-solution fit, de-risk AI feasibility, and gather signals for accelerators or partners before larger investment.
                  </p>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
                  <p className="text-sm text-gray-700">
                    Build portfolio pieces, practise responsible AI patterns, and learn collaboration in a safe, time-boxed format.
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
                  <p className="text-sm text-gray-700">
                    Run inclusive events with clear rules, safety guidance, and reproducible templates for mentoring and judging.
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
              <strong>AI hackathons and events</strong> combine rapid experimentation with community learning. In Australia, 2025 events increasingly emphasise responsible data use, reproducibility, and practical demos over slideware.
            </p>
            <p>
              At MLAI, we often see founders, students, and organisers asking how to get the most from these events without overspending on tools or risking compliance issues.
            </p>
            <p>
              This guide covers formats, costs, preparation, roles, and safety. Where rules differ by organiser or state, we call that out and point you to official or organiser sources for the latest details.
            </p>

            <div className="my-4 w-full">
              <img
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                className="w-full rounded-2xl"
                width={1400}
                height={800}
                loading="eager"
              />
            </div>

            {/* 6) Key takeaways */}
            <div className="my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6">
              <h3 className="mb-3 text-lg font-semibold text-[#1028E0]">Key takeaways</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>
                    AI hackathons help teams <span className="font-semibold">prototype responsibly and tell a clear story</span> in days or weeks.
                  </li>
                  <li>
                    Focus on <span className="font-semibold">problem clarity, data safety, and reproducibility</span> before complex models.
                  </li>
                  <li>Judges value impact evidence, not just novelty—show testing, feedback, or benchmarks.</li>
                  <li>Rules vary; check organiser T&Cs for IP, data use, and submission formats.</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  <li>Start with one narrow use case and publicly available or synthetic data.</li>
                  <li>Pre-set accounts (GitHub, notebooks, model APIs) to avoid race-day blockers.</li>
                  <li>Document sources, licenses, and model settings for transparency.</li>
                  <li>Rehearse a concise demo: problem, approach, safeguards, and results.</li>
                </ul>
              </div>
            </div>

            {/* 7) Anchored sections */}
            <h2 id="what-is">What are AI hackathons and events?</h2>
            <p>
              AI hackathons are time-bound build or learning events where teams prototype solutions using AI models, data, and tooling. They can be in-person, hybrid, or fully online, often themed (health, climate, education, accessibility) and ending with a demo or pitch. Events may include workshops, mentor hours, and sponsor credits for APIs or cloud.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Clarity:</strong> Forces a sharp problem statement and measurable success criteria.
                </li>
                <li>
                  <strong>Efficiency:</strong> Time-boxed constraints reduce over-engineering and surface blockers early.
                </li>
                <li>
                  <strong>Communication:</strong> Improves storytelling to users, judges, or investors via concise demos.
                </li>
                <li>
                  <strong>Risk awareness:</strong> Highlights data, privacy, and safety considerations before scaling.
                </li>
              </ul>
            </div>

            <h2 id="when-needed">When do you need AI hackathons?</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8ef16122-1bff-4587-b4ab-eeeeec5d85be.jpg?alt=media&token=e46205b2-00d5-4b09-8342-2e99b18bd84d" alt="Abstract illustration showcasing AI hackathons, highlighting innovation, collaboration, and technology." className="w-full rounded-lg my-8" />

            <p>
              They are most useful when you need fast learning, evidence, or collaboration without long commitments.
            </p>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 font-semibold text-blue-900">New idea or pivot</h3>
                <p className="text-sm text-gray-700">Validate demand and feasibility before investing in full builds.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-3 font-semibold text-purple-900">Tooling and model selection</h3>
                <p className="text-sm text-gray-700">Compare APIs, guardrails, and costs under real workloads.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                <h3 className="mb-3 font-semibold text-orange-900">Portfolio and hiring signals</h3>
                <p className="text-sm text-gray-700">Create demonstrable work for roles or accelerator applications.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="mb-3 font-semibold text-red-900">Safety and compliance checks</h3>
                <p className="text-sm text-gray-700">Stress-test privacy, bias, and reliability before pilots.</p>
              </div>
            </div>

            <div className="w-full">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1300&q=80"
                alt="Team presenting an AI prototype at a tech event"
                className="w-full rounded-2xl"
                width={1300}
                height={780}
                loading="lazy"
              />
            </div>

            <h2>Why AI hackathons matter</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cfef2820-f07f-410f-a560-f53434055ac0.jpg?alt=media&token=ac161a2c-d3b9-430b-b65d-03462e4de72f" alt="Modern abstract illustration reflecting the significance of AI hackathons in innovation and collaboration." className="w-full rounded-lg my-8" />

            <p>
              They compress learning cycles, connect you to mentors, and provide tangible evidence of progress. For founders, this can strengthen grant or accelerator applications. For learners, it builds portfolio artefacts. Community organisers can use hackathons to catalyse local collaboration while reinforcing responsible AI norms.
            </p>
            <p>
              If you need tailored options, use{' '}
              <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI recommendations
              </Link>{' '}
              to find events, workshops, or mentors that suit your stage.
            </p>

            <h2 id="choosing-help">Choosing the right help</h2>
            <p>
              Decide whether you need mentorship, structured learning, or specialist review. Use the table to match support types to your needs.
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
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Startup mentor</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Prioritisation, storytelling, pitch practice.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Frameworks, feedback, investor perspective.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Office hours, pitch reviews.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Feasibility, evaluation, guardrails.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Model selection, testing, deployment paths.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Notebooks, benchmarks, infra walkthroughs.</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Product & UX coach</td>
                    <td className="px-6 py-4 text-sm text-gray-700">User journeys, clarity of value.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Rapid testing, usability, demo flow.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Storyboards, usability tests, scripts.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Community organiser</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Inclusive spaces, logistics, matching mentors.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Ops, code of conduct, safety processes.</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Onboarding, Discord/Slack, check-ins.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
              <p className="text-sm text-gray-700">
                When comparing events or mentors, prioritise clarity of outcomes, IP and data policies, and transparency on what support (credits, mentors, workshops) is included.
              </p>
            </div>

            <h2 id="costs">Costs, access & time</h2>
            <p>
              As at 2025, many Australian community or university AI hackathons remain free, while sponsored or hybrid events may charge modest fees. Budget for travel, connectivity, and any paid APIs if credits are not provided.
            </p>

            <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
              <p className="text-sm text-gray-700">
                Look for student discounts, scholarship slots, travel stipends, and cloud/model credits from sponsors. State programs and university hubs sometimes underwrite community events—eligibility differs by provider.
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Weekend hackathon (in-person)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">24–48 hours</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$120 AUD</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Venue, meals, mentor slots, basic credits.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Online sprint</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1–4 weeks (async)</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">$0–$250 AUD</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Workshops, community channels, sponsor credits.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Corporate/partner challenge</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2–6 weeks</td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">$100–$500 AUD</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Briefs, data sandboxes, dedicated mentoring.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Prep:</strong> 2–6 hours (accounts, rules, data checks).
                  </li>
                  <li>
                    <strong>Build:</strong> 8–24 hours active work for weekend; 15–40 hours for multi-week sprints.
                  </li>
                  <li>
                    <strong>Testing:</strong> 2–6 hours (benchmarks, guardrails, user feedback).
                  </li>
                  <li>
                    <strong>Pitch:</strong> 1–3 hours to script and rehearse.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost-saving tips</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>Use provided credits; cap spending with quotas.</li>
                  <li>Prefer open data or synthetic data to avoid licensing costs.</li>
                  <li>Share infra (team notebooks) instead of duplicating resources.</li>
                  <li>Ask organisers about travel or scholarship support early.</li>
                </ul>
              </div>
            </div>

            <h2>Core components</h2>
            <p>Six pillars to organise your AI hackathon plan and execution.</p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-900">🧩 Problem framing</h3>
                <p className="text-sm text-gray-700">Clear user, constraint, and success metric.</p>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 font-semibold text-green-900">🏗️ Data & inputs</h3>
                <p className="text-sm text-gray-700">Open/synthetic data, licenses, privacy-safe handling.</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 font-semibold text-purple-900">🎯 Model & tooling</h3>
                <p className="text-sm text-gray-700">APIs, guardrails, evaluation setup, observability.</p>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h3 className="mb-2 font-semibold text-orange-900">👥 Roles & workflow</h3>
                <p className="text-sm text-gray-700">Clear roles: product, data, engineering, presentation.</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-2 font-semibold text-red-900">🔒 Safety & compliance</h3>
                <p className="text-sm text-gray-700">Privacy, bias checks, usage policies, audit notes.</p>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">📄 Demo & storytelling</h3>
                <p className="text-sm text-gray-700">Concise narrative, reproducible demo, clear ask.</p>
              </div>
            </div>

            <h2>Comparison: Hackathon vs build sprint</h2>
            <p>
              Hackathons emphasise community, mentorship, and public demos. Build sprints (internal or client) emphasise delivery and acceptance criteria. Both benefit from tight scopes, safety checks, and clear success metrics.
            </p>

            <h2>How this empowers people & teams</h2>
            <p>
              Founders gain evidence and feedback; learners gain portfolio work and collaborators; community builders strengthen local networks while reinforcing safe AI practices.
            </p>

            {/* Resource CTA (gallery) */}
            <div className="my-8 bg-white py-12">
              <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                      AI hackathon checklist &amp; run sheet
                    </p>
                    <p className="mt-6 text-lg text-gray-600">
                      A practical prep list covering goals, data, roles, safety, evaluation, and demo flow—ready to share with your team or organisers.
                    </p>
                    <div className="mt-8">
                      <a
                        href="/resources/ai-hackathon-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Open the checklist
                      </a>
                      <p className="mt-4 text-sm italic text-gray-600">
                        Reviewed by MLAI Editorial Team. Last updated {DATE_MODIFIED}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
                  <div className="relative group">
                    <a
                      href="/resources/ai-hackathon-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg bg-white"
                    >
                      <ImageWithFallback
                        src={HERO_IMAGE}
                        alt="AI hackathon checklist preview page 1"
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
                      href="/resources/ai-hackathon-checklist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg bg-white"
                    >
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80"
                        alt="AI hackathon checklist preview page 2"
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

            <h2>Finding the right next step</h2>
            <p>
              Clarify your goal (learning, hiring signal, customer validation, community impact), time, and budget. Choose the smallest step: join a weekend event, volunteer as a mentor, or run a mini-sprint with friends.
            </p>
            <p>
              Use{' '}
              <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                MLAI recommendations
              </Link>{' '}
              to find events and workshops, and check <Link to="/events" className="font-medium text-[#1028E0] hover:underline">/events</Link> for upcoming meetups.
            </p>

            <div className="my-8">
              <ArticleCompanyHighlightCTA
                eyebrow="On the calendar"
                title="See upcoming AI meetups and hackathons"
                body="Browse community-led and partner events across Australia, updated regularly."
                buttonHref="/events"
                buttonText="View events"
              />
            </div>

            <h2>Using templates to streamline the process</h2>
            <p>Templates keep the team aligned and reduce friction when time is short.</p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Capture rules, data sources, and roles in one page.</li>
              <li>Checklist prevents missing safety, licenses, or submission steps.</li>
              <li>Reusable run sheet speeds up future events or sprints.</li>
            </ul>

            <h2>Impact</h2>
            <p>
              Well-run hackathons accelerate learning, highlight feasibility, and provide artefacts you can share with stakeholders. They can also surface safety gaps early, reducing downstream risk.
            </p>
            <p>
              For organisers, consistent templates and transparent rules build trust and repeat participation.
            </p>

            <h2>Specialised deep dives</h2>
            <p>Consider deeper support in these areas when stakes are higher.</p>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & responsible data</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Sensitive or health data handling.</li>
                  <li>• Consent, licenses, and de-identification.</li>
                  <li>• Refer to OAIC and organiser policies.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                <h3 className="mb-2 font-semibold text-green-900">📏 Evaluation & reliability</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Benchmarks, human-in-the-loop checks.</li>
                  <li>• Latency, cost, and error tracking.</li>
                  <li>• Test edge cases and hallucination risks.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                <h3 className="mb-2 font-semibold text-purple-900">⚖️ IP & participation terms</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Ownership of code and models.</li>
                  <li>• Third-party licenses (data, media, APIs).</li>
                  <li>• When to seek legal advice.</li>
                </ul>
              </div>
            </div>

            <div className="my-12">
              <ArticleCompanyCTA
                title={`Ready to take the next step with ${TOPIC}?`}
                body="Get practical recommendations based on your goals, time, and experience level."
                buttonText="Get recommendations"
                buttonHref="/?mode=recommend"
                note="You can filter by topic, format (online/in‑person), and experience level."
              />
            </div>

            <h2>Conclusion: Your next steps</h2>
            <p>
              AI hackathons work best when you start with a focused problem, safe data, and a clear plan. You do not need advanced architectures—judges value clarity, evidence, and responsibility.
            </p>
            <p>
              Use this action plan to move forward confidently and reuse it for future events.
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
                        href="/resources/ai-hackathon-checklist"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1028E0] hover:underline"
                      >
                        here
                      </a>
                      .
                    </li>
                    <li>Write your problem statement, success metric, and constraints.</li>
                    <li>Confirm rules on IP, data, and submission format.</li>
                    <li>Set up required accounts and credits.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Pick a format: weekend, online sprint, or local meetup build night.</li>
                    <li>
                      Use{' '}
                      <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                        MLAI recommendations
                      </Link>{' '}
                      to shortlist events and mentors.
                    </li>
                    <li>Check support offered (credits, mentors, workshops).</li>
                    <li>Lock in a team and agree roles.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Prototype on a narrow slice with safe data.</li>
                    <li>Track latency, cost, and quality; add guardrails.</li>
                    <li>Document assumptions, prompts, and settings.</li>
                    <li>Gather quick feedback from a user or mentor.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Rehearse a 2–3 minute demo: problem, approach, safeguards, results.</li>
                    <li>Ensure reproducibility (README, env, data notes).</li>
                    <li>Credit sources, licenses, and mentors.</li>
                    <li>Submit early to avoid platform cut-offs.</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#1028E0] pl-6">
                  <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                    <li>Decide whether to iterate, open-source, or pause.</li>
                    <li>Set a follow-up milestone (pilot, user tests, grant application).</li>
                    <li>Track costs before scaling and re-check rules if using new data.</li>
                    <li>Stay connected with collaborators via community channels.</li>
                  </ul>
                </div>
              </div>
            </div>

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

            <div className="my-8 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm text-indigo-900">
                Ready for the next step?{' '}
                <Link to="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
                  Explore the follow‑up guide →
                </Link>
              </p>
            </div>

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
