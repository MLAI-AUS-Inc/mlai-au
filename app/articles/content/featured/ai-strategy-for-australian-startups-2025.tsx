import { Link } from 'react-router'
import type { ReactNode } from 'react'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '~/components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '~/components/articles/ArticleCompanyCTA'
import { MLAITemplateResourceCTA } from '~/components/articles/MLAITemplateResourceCTA'
import { ImageWithFallback } from '~/components/ImageWithFallback'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI Strategy for Australian Startups'
const CATEGORY = 'featured'
const SLUG = 'ai-strategy-for-australian-startups'
const AUTHOR = 'MLAI Editorial Team'
const DATE = '2026-01-04'
const DATE_MODIFIED = '2026-01-04'
const DESCRIPTION =
  'Practical 2025 guide for Australian startups to plan AI strategy: where to start, costs, risks, governance, tools. Includes MLAI resources and AU privacy context.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
const HERO_IMAGE_ALT = 'Australian startup team planning AI strategy on laptops'
const FEATURED_FOCUS = 'ai'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'As at 2025, Australian startups are expected to align AI use with Privacy Act obligations, OAIC guidance, and transparent risk controls while proving customer value quickly.',
  items: [
    {
      label: `What is ${TOPIC} in Australia?`,
      description:
        'A plan that links business goals to AI use cases, data safeguards, delivery approach, metrics, and compliance with Australian privacy and sector expectations.',
    },
    {
      label: `Who usually needs ${TOPIC}?`,
      description:
        'Founders, product teams, and operators deciding where AI adds value, how to pick tools, and how to explain risks to customers, boards, and partners.',
    },
    {
      label: `How does ${TOPIC} work and what does it cost in 2025?`,
      description:
        'Start with a 1–2 day draft using free resources; pilots often cost $0–$3k. Time increases if data cleaning, vendor reviews, or legal advice are required.',
    },
  ],
}

export const faqItems: ArticleFAQItem[] = [
  {
    q: 'What is an AI strategy for a startup in Australia?',
    a: 'It is a practical plan that links your business goals to AI use cases, data and privacy settings, delivery approach, and risk controls, aligned to Australian rules and customer needs.',
  },
  {
    q: 'How much does it cost to start an AI pilot in 2025?',
    a: 'Many teams start with $0–$200 using free tiers and open resources. Paid workshops or vendor pilots often range $800–$3,000. Costs vary by data cleaning needs and vendor choice.',
  },
  {
    q: 'How long does it take to create a lightweight AI strategy?',
    a: 'A concise starter strategy can be drafted in 1–2 days and iterated weekly. A deeper plan with governance and vendor selection often takes 2–4 weeks with stakeholder input.',
  },
  {
    q: 'Do we need legal or privacy advice before using AI tools?',
    a: 'If you handle personal, health, financial, or client data, get advice on Privacy Act obligations and OAIC guidance. Avoid sharing sensitive data with tools until risks are understood.',
  },
  {
    q: 'How can we find mentors or programs for AI strategy?',
    a: (
      <>
        You can start with local meetups or accelerators and ask for AI governance support. For tailored options, use the MLAI recommender at{' '}
        <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
          /?mode=recommend
        </Link>
        .
      </>
    ),
  },
  {
    q: 'What free resources exist for early-stage teams?',
    a: 'Use MLAI\'s AI strategy checklist, OAIC privacy guidance, business.gov.au AI basics, and open-source prompt testing tools. Libraries and university innovation hubs often provide free sessions.',
  },
  {
    q: 'How do we pick AI vendors safely?',
    a: 'Define your use case, data sensitivity, and budget first. Compare security, data handling, model provenance, pricing, and exit terms. Ask for a short pilot with metrics before annual contracts.',
  },
]

export default function ArticleBody() {
  return (
    <>
      {/* 1) Intro alert */}
      <div className="my-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
        <p className="text-sm text-indigo-900">
          This guide is part of our broader series on AI strategy. Prefer a quick primer?{' '}
          <Link to="/articles/ai/ai-basics" className="font-semibold text-[#1028E0] hover:underline">
            Read the AI basics overview →
          </Link>
        </p>
      </div>

      {/* 2) Resource CTA */}
      <MLAITemplateResourceCTA />

      {/* 3) Persona grid */}
      <div className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 text-base font-semibold text-blue-900">🚀 For Founders & Startup Teams</h3>
              <p className="text-sm text-gray-700">
                Use AI to solve one clear problem, show traction, and keep costs predictable while meeting privacy and reliability expectations.
              </p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 text-base font-semibold text-green-900">🎓 For Students & Career Switchers</h3>
              <p className="text-sm text-gray-700">
                Learn the fundamentals of AI strategy, risk controls, and experimentation so you can contribute to projects without overspending.
              </p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <h3 className="mb-2 text-base font-semibold text-purple-900">🤝 For Community Builders</h3>
              <p className="text-sm text-gray-700">
                Facilitate workshops and mentoring with a shared baseline on responsible AI, tooling choices, and how to guide early pilots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5) Main prose intro + hero image */}
      <div className="prose max-w-none">
        <p>
          <strong>{TOPIC}</strong> connects your business goals to practical AI use cases, data safeguards, and delivery plans. It avoids "tool-first" spending and helps teams communicate clearly with customers and partners.
        </p>
        <p>
          At MLAI, we often see founders and learners asking how to approach AI strategy before they commit to paid tools or vendor contracts. This guide is designed to answer those questions with Australia-specific context.
        </p>
        <p>
          We reference official guidance where possible (e.g. OAIC privacy resources, business.gov.au, National AI Centre). Rules and programs can change; check dates and links, especially for sector-specific compliance.
        </p>

        <div className="my-4 w-full">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={800}
            height={600}
            className="w-full rounded-2xl"
          />
        </div>

        {/* 6) Key takeaways */}
        <div className="my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/10 p-6">
          <h3 className="mb-3 text-lg font-semibold text-[#1028E0]">Key takeaways</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>
                AI strategy is used to <span className="font-semibold">connect business goals with safe, measurable AI use cases</span>.
              </li>
              <li>
                It applies when deciding on <span className="font-semibold">customers, use cases, data handling, vendors, and governance</span>.
              </li>
              <li>Expect a clear process: define goals, map data and risks, test with evidence, then document decisions.</li>
              <li>Outputs help teams explain value, risks, and costs to boards, partners, and customers.</li>
            </ul>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Start with one use case and one measurable outcome.</li>
              <li>Write assumptions, constraints, and red lines before piloting tools.</li>
              <li>Keep sensitive data out of tools until you confirm privacy and storage terms.</li>
              <li>Iterate weekly; what works in one sector may not transfer directly.</li>
            </ul>
          </div>
        </div>

        {/* 7) Anchored sections */}
        <h2 id="what-is">What is AI strategy for Australian startups?</h2>
        <p>
          AI strategy is a concise plan that explains why you are using AI, which problems you will tackle first, how you will handle data responsibly, and how you will measure outcomes. In Australia, it must also consider Privacy Act obligations, sector rules, and transparency expectations from customers and partners.
        </p>

        <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-900">Key benefits</h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>
              <strong>Clarity:</strong> Turns AI hype into specific use cases with owners, data sources, and metrics.
            </li>
            <li>
              <strong>Efficiency:</strong> Reduces spend on ill-fitting tools by testing with small, evidence-based pilots.
            </li>
            <li>
              <strong>Communication:</strong> Aligns founders, engineers, and stakeholders on risks, timelines, and expected value.
            </li>
            <li>
              <strong>Risk awareness:</strong> Surfaces privacy, security, and legal considerations before scaling.
            </li>
          </ul>
        </div>

        <h2 id="when-needed">When do you need AI strategy?</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-063d4526-67c6-4260-92cd-bc9002d931c1.jpg?alt=media&token=1b58725d-ef61-4753-bd4e-3cfe45f1f487" alt="Abstract illustration depicting the necessity of AI strategy in modern technology and business." className="w-full rounded-lg my-8" />

        <p>
          It is most useful before you buy subscriptions, hire specialists, or commit to investor or customer promises. Use it whenever decisions about data, risk, and value are unclear.
        </p>

        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 font-semibold text-blue-900">New idea or pivot</h3>
            <p className="text-sm text-gray-700">Validate whether AI genuinely improves outcomes before building or pitching.</p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
            <h3 className="mb-3 font-semibold text-purple-900">Tooling and vendor selection</h3>
            <p className="text-sm text-gray-700">Compare privacy, pricing, latency, and exit options before committing to contracts.</p>
          </div>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
            <h3 className="mb-3 font-semibold text-orange-900">Program or grant applications</h3>
            <p className="text-sm text-gray-700">Show evidence of problem fit, metrics, and responsible use for accelerators or grants.</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h3 className="mb-3 font-semibold text-red-900">Sensitive data handling</h3>
            <p className="text-sm text-gray-700">Plan how to protect personal, health, or client data before piloting any model.</p>
          </div>
        </div>

        <div className="w-full">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt={`${HERO_IMAGE_ALT} — contextual`}
            width={800}
            height={600}
            className="w-full rounded-2xl"
          />
        </div>

        <h2>Why AI strategy matters</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6b40279c-d074-4c54-9cba-4aaa53294409.jpg?alt=media&token=c4ed1f4f-58e1-4d1f-9bf3-1fd75e6d0a93" alt="Abstract illustration highlighting the importance of AI strategy in modern technology and business processes." className="w-full rounded-lg my-8" />

        <p>
          A clear strategy keeps teams focused on outcomes, not tools. It helps you communicate value to investors and customers, and it reduces rework by making privacy and security expectations explicit.
          You can also use the MLAI recommender to{' '}
          <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
            get personalised learning paths
          </Link>{' '}
          or browse the{' '}
          <Link to="/articles/startups/startup-fundamentals" className="font-medium text-[#1028E0] hover:underline">
            startup fundamentals guide
          </Link>
          .
        </p>

        <h2 id="choosing-help">Choosing the right next step</h2>
        <p>
          Decide whether you need self-guided learning, mentor input, a workshop, or an accelerator. Check for clear outcomes, transparent costs, and alignment with your sector and data sensitivity.
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
                <td className="px-6 py-4 text-sm text-gray-700">Prioritisation, GTM clarity, avoiding common missteps.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Frameworks, introductions, decision patterns.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Office hours, pitch reviews, roadmap reviews.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">AI practitioner</td>
                <td className="px-6 py-4 text-sm text-gray-700">Feasibility checks, evaluation, data handling.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Benchmarks, latency/cost trade-offs, deployment.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Prototypes, prompt tests, model comparisons.</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Legal/privacy advisor</td>
                <td className="px-6 py-4 text-sm text-gray-700">Sensitive data, contracts, cross-border storage.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Risk identification, policy wording, compliance.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Policy reviews, DPIAs, contract clauses.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Accelerator / workshop</td>
                <td className="px-6 py-4 text-sm text-gray-700">Structured learning with feedback and peer support.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Curriculum, accountability, expert check-ins.</td>
                <td className="px-6 py-4 text-sm text-gray-700">Cohort sessions, templates, practice briefs.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-6 border-l-4 border-indigo-400 bg-indigo-50 p-4">
          <h3 className="mb-2 font-semibold text-indigo-900">💡 Pro tip</h3>
          <p className="text-sm text-gray-700">
            Ask every provider to show how they handle data, what success looks like, and how you can exit without lock-in. If guarantees sound absolute, treat them as a red flag.
          </p>
        </div>

        <h2 id="costs">Costs, access & time</h2>
        <p>
          As at 2025, you can start drafting an AI strategy for free using public resources. Costs increase with data cleaning, vendor pilots, security reviews, and legal input. Always confirm current prices and eligibility.
        </p>

        <div className="my-6 border-l-4 border-green-400 bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-900">💰 Access pathways</h3>
          <p className="text-sm text-gray-700">
            Use free community learning, public templates, and university/library sessions. Check state innovation vouchers, accelerator scholarships, and vendor credits. Availability differs by state and provider; verify details.
          </p>
        </div>

        <div className="my-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Option</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Time (approx.)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estimated cost (2025)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">What's included</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Self-guided starter path</td>
                <td className="px-6 py-4 text-sm text-gray-700">2–6 hours</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">$0–$50 (AUD)</td>
                <td className="px-6 py-4 text-sm text-gray-700">Reading, checklist, prompt tests, initial risk notes.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Structured workshop/course</td>
                <td className="px-6 py-4 text-sm text-gray-700">1–2 days or 4–8 weeks</td>
                <td className="px-6 py-4 text-sm font-bold text-orange-600">$400–$2,000 (AUD)</td>
                <td className="px-6 py-4 text-sm text-gray-700">Curriculum, feedback, templates, practice briefs.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Vendor pilot</td>
                <td className="px-6 py-4 text-sm text-gray-700">2–6 weeks</td>
                <td className="px-6 py-4 text-sm font-bold text-blue-600">$0–$3,000 (credits/pilot)</td>
                <td className="px-6 py-4 text-sm text-gray-700">Limited usage, support, and success criteria.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Legal/privacy review</td>
                <td className="px-6 py-4 text-sm text-gray-700">1–3 weeks</td>
                <td className="px-6 py-4 text-sm font-bold text-red-600">$800–$5,000+</td>
                <td className="px-6 py-4 text-sm text-gray-700">Data handling review, policy wording, contract checks.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">⏱️ Time breakdown</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <strong>Learning & scoping:</strong> 2–4 hours to frame goals and risks.
              </li>
              <li>
                <strong>Pilot design:</strong> 2–6 hours to set metrics and guardrails.
              </li>
              <li>
                <strong>Execution:</strong> 1–3 weeks depending on data and tooling.
              </li>
              <li>
                <strong>Review & iteration:</strong> 1–2 hours per cycle with stakeholders.
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="mb-2 font-semibold text-yellow-900">💡 Cost‑saving tips</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Use free credits and open-source tools for early tests.</li>
              <li>Strip personal data from pilots where possible.</li>
              <li>Run small experiments before annual or enterprise contracts.</li>
              <li>Document metrics so you can compare vendors objectively.</li>
            </ul>
          </div>
        </div>

        <h2>Core components</h2>
        <p>These are the main areas every AI strategy should cover for Australian startups.</p>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">🧩 Problem & outcome</h3>
            <p className="text-sm text-gray-700">Define the customer problem, success metrics, and what "good" looks like.</p>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-900">🏗️ Data & privacy</h3>
            <p className="text-sm text-gray-700">Map data sources, sensitivity, storage, consent, and OAIC-aligned handling.</p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h3 className="mb-2 font-semibold text-purple-900">🎯 Use cases & scope</h3>
            <p className="text-sm text-gray-700">Prioritise one or two use cases with bounded scope and measurable impact.</p>
          </div>
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <h3 className="mb-2 font-semibold text-orange-900">👥 Roles & ownership</h3>
            <p className="text-sm text-gray-700">Assign owners for delivery, review, privacy, and stakeholder communication.</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-900">🔒 Risk & controls</h3>
            <p className="text-sm text-gray-700">Identify risks, red lines, evaluation criteria, and incident response steps.</p>
          </div>
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <h3 className="mb-2 font-semibold text-indigo-900">📄 Governance & comms</h3>
            <p className="text-sm text-gray-700">Document decisions, review cadence, and how you explain AI use to users.</p>
          </div>
        </div>

        <h2>Comparison: AI strategy vs AI project plan</h2>
        <p>
          An AI strategy sets direction, guardrails, and priorities across the business. A project plan is the execution detail for a specific initiative. Strategy guides which projects to run; project plans deliver the work.
        </p>

        <h2>How this empowers people & teams</h2>
        <p>
          Founders gain clarity on where to invest. Product teams align on scope and metrics. Community builders and mentors can use the shared structure to facilitate safer, more focused experimentation.
        </p>

        {/* 8) Resource CTA (gallery) */}
        <div className="my-8 bg-white py-12">
          <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-sm font-semibold text-indigo-600">Free resource</h2>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  AI strategy checklist &amp; notes
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  A printable checklist to capture goals, data sensitivity, vendor questions, and success metrics. Use it to brief teams and track weekly iterations.
                </p>
                <div className="mt-8">
                  <a
                    href="/resources/ai-strategy-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Open the checklist
                  </a>
                  <p className="mt-4 text-sm italic text-gray-600">
                    Reviewed by MLAI Editorial Team. Last updated 2026-01-04.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 overflow-visible lg:grid-cols-2">
              <div className="relative group">
                <a
                  href="/resources/ai-strategy-checklist"
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
                  href="/resources/ai-strategy-checklist"
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
          Clarify your goal, constraints, data sensitivity, and what success means. Choose the smallest step that moves you forward without long contracts or heavy integration.
        </p>
        <p>
          You can use{' '}
          <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
            MLAI's recommendations
          </Link>{' '}
          to discover resources, events, and learning paths for AI strategy. Also browse{' '}
          <Link to="/resources" className="font-medium text-[#1028E0] hover:underline">
            the resource library
          </Link>{' '}
          and{' '}
          <Link to="/events" className="font-medium text-[#1028E0] hover:underline">
            upcoming events
          </Link>
          .
        </p>

        {/* 10) Templates section */}
        <h2>Using templates to streamline the process</h2>
        <p>Templates reduce friction and ensure you cover the essentials before piloting.</p>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>Capture goals, constraints, and risks in one place.</li>
          <li>Brief mentors or vendors quickly with consistent context.</li>
          <li>Create a repeatable record for future reviews and audits.</li>
        </ul>

        {/* 11) Impact */}
        <h2>Impact</h2>
        <p>
          A grounded AI strategy helps you prioritise the right experiments, protect customer trust, and avoid expensive lock-in. It keeps teams aligned on what matters and why.
        </p>
        <p>
          It also makes it easier to communicate with investors, boards, and partners by showing clear intent, controls, and learning loops rather than promises.
        </p>

        {/* 12) Specialised deep-dives */}
        <h2>Specialised deep dives</h2>
        <p>Use these when your context needs more rigour.</p>
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-2 font-semibold text-blue-900">🔒 Privacy & responsible data</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Sensitive or identifiable data involved.</li>
              <li>• Cross-border storage or third-party processors.</li>
              <li>• Need for DPIAs and consent management.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h3 className="mb-2 font-semibold text-green-900">📏 Evaluation & benchmarking</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Comparing models and prompts objectively.</li>
              <li>• Measuring latency, cost, and quality trade-offs.</li>
              <li>• Setting acceptance thresholds before launch.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
            <h3 className="mb-2 font-semibold text-purple-900">⚖️ Legal, IP & contracts</h3>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Licensing of datasets and outputs.</li>
              <li>• Indemnities, SLAs, and termination rights.</li>
              <li>• Sector rules (health/finance/education) checks.</li>
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
          AI strategy works best when you start small, protect data, and iterate with evidence. You do not need a large budget to begin, but you do need clarity on goals and constraints.
        </p>
        <p>
          Use this action plan to move forward, then adapt it to your sector and team.
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
                    href="/resources/ai-strategy-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1028E0] hover:underline"
                  >
                    here
                  </a>
                  .
                </li>
                <li>Write your goal, constraints, and success metric.</li>
                <li>List assumptions and current evidence.</li>
                <li>Note deadlines (launch, grant, investor meeting).</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#1028E0] pl-6">
              <h4 className="mb-2 text-lg font-bold">Step 2: Choose the right next step</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>Pick one use case with clear user benefit.</li>
                <li>
                  Use{' '}
                  <Link to="/?mode=recommend" className="font-medium text-[#1028E0] hover:underline">
                    MLAI's recommendations
                  </Link>{' '}
                  to shortlist learning and tools.
                </li>
                <li>Check privacy and data handling requirements.</li>
                <li>Define success and failure signals.</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#1028E0] pl-6">
              <h4 className="mb-2 text-lg font-bold">Step 3: Run a small experiment</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>Limit scope to one workflow or audience.</li>
                <li>Measure latency, quality, and cost per use.</li>
                <li>Keep sensitive data out unless controls are clear.</li>
                <li>Record prompts, configs, and outcomes.</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#1028E0] pl-6">
              <h4 className="mb-2 text-lg font-bold">Step 4: Review and share</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>Summarise what worked, what failed, and why.</li>
                <li>Share with team or mentor for feedback.</li>
                <li>Decide to iterate, scale, or stop.</li>
                <li>Update your strategy doc and risk notes.</li>
              </ul>
            </div>
            <div className="border-l-4 border-[#1028E0] pl-6">
              <h4 className="mb-2 text-lg font-bold">Step 5: Build a sustainable plan</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                <li>Set a weekly review habit with clear owners.</li>
                <li>Budget for tools and advice that match your stage.</li>
                <li>Re-check official guidance when rules change.</li>
                <li>Plan your next milestone (launch, demo, or grant).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 15) FAQ + contact */}
        <div className="my-12">
          <ArticleFAQ items={faqItems} />
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
              Explore the AI basics follow-up guide →
            </Link>
          </p>
        </div>

        {/* 17) Repeat resource CTA for pattern consistency */}
        <MLAITemplateResourceCTA />
      </div>
    </>
  )
}
