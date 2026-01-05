// app/routes/articles.$category.$slug.tsx
import Link from 'next/link'

/** ========== INPUTS (FILL ALL) ========== */
const TOPIC = 'How to Find a Technical Cofounder'
const DATE = '2025-02-15'
const DESCRIPTION = 'A step-by-step playbook to source, vet, and collaborate with a technical cofounder without wasting months.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Two founders collaborating over code and roadmap sketches'
const AUTHOR = 'MLAI Editorial'
const SLUG = 'find-technical-cofounder'

type FAQItem = { q: string; a: string }

/** ===== FAQ ===== */
const faqs: FAQItem[] = [
  {
    q: 'Do I need a technical cofounder if I can hire an agency?',
    a: 'Agencies can build a v1, but they rarely provide the ongoing product ownership, architectural decisions, and equity-level accountability a technical cofounder brings. If speed to learn and long-term resilience matter, a technical cofounder is usually better.'
  },
  {
    q: 'What equity range is fair for a technical cofounder?',
    a: 'For pre-product teams, 25–50% is common depending on stage, traction, and how critical the technical role is. Use a vesting schedule (4 years with a 1-year cliff) and document expectations in writing.'
  },
  {
    q: 'How long should a trial project last?',
    a: 'Two to four weeks is enough to test collaboration, quality, and pace. Keep scope tight: a single workflow, a basic deployment, and a weekly retro to assess fit.'
  },
  {
    q: 'Can remote technical cofounders work as well as local ones?',
    a: 'Yes—if you agree on overlap hours, tool choices, decision rituals, and clear ownership. Start with explicit communication cadences and instrumented work so both sides see progress.'
  }
]

/** ===== Featured Professionals (safe placeholder) ===== */
const featuredProfessionals: Array<Record<string, unknown>> = []

export default function ArticlePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-gray-600">
          <li>
            <Link href="/articles" className="hover:underline">
              Articles
            </Link>
          </li>
          <li aria-hidden="true" className="px-1">
            /
          </li>
          <li aria-current="page" className="font-medium text-gray-900">
            {TOPIC}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{TOPIC} (2025)</h1>
        <p className="text-gray-600">{DESCRIPTION}</p>

        <div className="mt-3 text-xs text-gray-500">
          <span>By {AUTHOR}</span>
          <span className="mx-2">·</span>
          <time dateTime={DATE}>Updated {DATE}</time>
        </div>
      </header>

      {/* Hero Image */}
      <div className="my-6 w-full">
        <img
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>

      {/* Summary Highlights */}
      <section
        aria-label="Key Takeaways"
        className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
      >
        <h2 className="mb-3 text-lg font-semibold">Summary highlights</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Move fast with a 3-phase plan: define fit, source widely, and test via a 2–4 week build sprint.</li>
          <li>Source from founder-focused networks, alumni groups, niche forums, and builder communities—not just job boards.</li>
          <li>Use written scorecards covering technical depth, product sense, pace, communication, and ownership.</li>
          <li>Run a small paid or equity-credited pilot to validate collaboration before signing cofounder docs.</li>
          <li>Align early on equity, vesting, decision rights, IP, and cadence to prevent downstream conflict.</li>
          <li>Instrument collaboration: weekly retros, issue tracking, deployment cadence, and explicit decision logs.</li>
        </ul>
      </section>

      {/* On-page ToC */}
      <aside className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <h2 className="mb-2 text-base font-semibold">Table of contents</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-01c4792b-7059-4079-bc22-5de92bab0930.jpg?alt=media&token=c28e9f9d-a4e7-4159-843d-8a392a87752d" alt="Modern abstract illustration symbolizing a digital table of contents in a tech-inspired design." className="w-full rounded-lg my-8" />

        <ol className="list-decimal pl-5 text-sm text-gray-700">
          <li>
            <a href="#introduction" className="hover:underline">
              Introduction
            </a>
          </li>
          <li>
            <a href="#readiness" className="hover:underline">
              Readiness: clarity, scope, and proof
            </a>
          </li>
          <li>
            <a href="#sourcing" className="hover:underline">
              Sourcing channels that actually work
            </a>
          </li>
          <li>
            <a href="#screening" className="hover:underline">
              Screening and vetting framework
            </a>
          </li>
          <li>
            <a href="#pilot" className="hover:underline">
              Pilot sprint: 2–4 week collaboration test
            </a>
          </li>
          <li>
            <a href="#equity" className="hover:underline">
              Equity, legal, and IP basics
            </a>
          </li>
          <li>
            <a href="#pitfalls" className="hover:underline">
              Common pitfalls and how to avoid them
            </a>
          </li>
          <li>
            <a href="#first-90-days" className="hover:underline">
              Your first 90 days together
            </a>
          </li>
          <li>
            <a href="#resources" className="hover:underline">
              Resources and next steps
            </a>
          </li>
        </ol>
      </aside>

      {/* Body */}
      <article className="prose max-w-none">
        <p>
          <strong>Finding a technical cofounder</strong> is less about luck and more about structured search, transparent expectations, and a fast collaboration trial. This guide compresses what seasoned founders do into repeatable steps you can run over 30–60 days.
        </p>

        <h2 id="introduction">Introduction</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9f63d5e4-ab78-4e3f-8a25-64e4e55ddb1c.jpg?alt=media&token=2e368f6f-f3bc-4cab-a921-a0af653f15da" alt="Modern abstract illustration symbolizing technology and innovation in the introduction to technical concepts." className="w-full rounded-lg my-8" />

        <p>
          A great technical cofounder combines technical judgment, delivery pace, and product intuition. You do not need the most senior architect—you need someone who can learn, ship, and make trade-offs with you. The process here is designed to minimize time on mismatches and maximize learning through small, time-boxed trials.
        </p>

        <h2 id="readiness">Readiness: clarity, scope, and proof</h2>
        <ul>
          <li><strong>Problem clarity:</strong> Articulate the user, pain, and current workaround in two sentences. Avoid vague “AI for everyone” pitches.</li>
          <li><strong>Evidence:</strong> Bring 5–10 user quotes or a small waitlist. Traction, however small, attracts better partners.</li>
          <li><strong>Scope a thin slice:</strong> Define one workflow (e.g., “upload file → get summary → export”) as the pilot. Keep infra simple.</li>
          <li><strong>Decide your default stack:</strong> Suggest a baseline (e.g., TypeScript + Next or Remix + Supabase) but stay flexible.</li>
          <li><strong>Time budget:</strong> Plan a 2–4 week pilot with 5–10 hours per week each.</li>
        </ul>

        <h2 id="sourcing">Sourcing channels that actually work</h2>
        <p>
          Cast a wide, targeted net. Blend warm introductions with builder-first communities to avoid cold-start problems.
        </p>
        <ol>
          <li><strong>Founder programs and venture studios:</strong> Antler, Entrepreneur First, and local accelerator alumni groups often have technical builders seeking partners.</li>
          <li><strong>University and alumni networks:</strong> Computer science alumni Slack/Discord, hackathon groups, and faculty-led founder clubs.</li>
          <li><strong>Builder meetups and hack nights:</strong> Attend with a clear one-liner and your pilot scope. Offer to co-present user insights.</li>
          <li><strong>Open-source and niche forums:</strong> Contribute to repos related to your problem domain; collaborators here already ship.</li>
          <li><strong>AngelList, Y Combinator Startup School, and indie hacker forums:</strong> Post concise, user-first briefs—not “idea guy seeks coder.”</li>
          <li><strong>Referrals from engineers you trust:</strong> Ask for 2–3 names; provide your pilot summary and time commitment up front.</li>
        </ol>
        <p>
          Keep a simple pipeline (spreadsheet or Notion board) with columns for <em>contacted</em>, <em>intro chat</em>, <em>pilot proposed</em>, <em>pilot active</em>, and <em>decision</em>.
        </p>

        <h2 id="screening">Screening and vetting framework</h2>
        <p>Use a scorecard to stay objective. Rate each area 1–5 and note evidence, not impressions.</p>
        <ul>
          <li><strong>Technical depth:</strong> Systems they have built, databases used, incidents handled, and how they debug.</li>
          <li><strong>Product sense:</strong> How they trade accuracy vs. speed, what they instrument, and how they reduce scope.</li>
          <li><strong>Pace and ownership:</strong> Examples of shipping in weeks, not months; willingness to make decisions with incomplete info.</li>
          <li><strong>Communication:</strong> Preference for async vs. live, clarity in writing, and response time expectations.</li>
          <li><strong>Values and risk tolerance:</strong> How they think about users, security, and short-term sacrifices for long-term gain.</li>
        </ul>
        <p>
          <strong>Interview flow (45–60 minutes):</strong> 10 minutes on problem context, 15 minutes on their last build (architectural choices, trade-offs), 15 minutes on a hypothetical day-1 plan for your pilot, and 10 minutes on working styles. End with a clear pilot invitation and next steps.
        </p>

        <h2 id="pilot">Pilot sprint: 2–4 week collaboration test</h2>
        <p>
          A pilot is the safest way to test collaboration without overcommitting. Keep it small and observable.
        </p>
        <ol>
          <li><strong>Scope:</strong> One user flow, hosted in production-like conditions (auth, logging, basic monitoring).</li>
          <li><strong>Cadence:</strong> Kickoff (align on success metrics), 2–3 touchpoints weekly, and a retro at the end.</li>
          <li><strong>Instrumentation:</strong> Track time-to-first-commit, deploy frequency, and defect rate. Use a simple Kanban to visualize work.</li>
          <li><strong>Compensation:</strong> Offer a small stipend or an equity credit convertible on cofounder agreement. Make this explicit.</li>
          <li><strong>Decision:</strong> After the retro, both sides answer: “Would I do another 90 days?” If either side hesitates, pause respectfully.</li>
        </ol>
        <p>
          Provide access to real users during the pilot. Observing how a candidate gathers feedback is as telling as their code.
        </p>

        <h2 id="equity">Equity, legal, and IP basics</h2>
        <ul>
          <li><strong>Vesting:</strong> Standard is 4 years with a 1-year cliff; consider a 6–12 month double-trigger acceleration for acquisitions.</li>
          <li><strong>Founder agreement:</strong> Capture roles, decision areas, time commitments, and conflict-resolution steps. Keep it written.</li>
          <li><strong>IP and code ownership:</strong> Ensure contributions during the pilot are assignable to the company if you proceed. Use simple contractor + IP assignment for the pilot; convert to founder docs afterward.</li>
          <li><strong>Decision rights:</strong> Define how product, architecture, hiring, and budget calls are made. Use a tie-breaker mechanism.</li>
          <li><strong>Entity setup:</strong> If pre-incorporation, agree on incorporation jurisdiction and cap table model before signing cofounder docs.</li>
        </ul>

        <h2 id="pitfalls">Common pitfalls and how to avoid them</h2>
        <ul>
          <li>Rushing into cofounder status without a pilot. Always test collaboration on real work.</li>
          <li>Vague roles. Write an accountability map (e.g., product roadmap vs. infra vs. fundraising vs. user research).</li>
          <li>Over-indexing on pure coding skill. Product judgment, speed, and ownership matter more in early stages.</li>
          <li>No instrumentation. Without deploy cadence and issue tracking, you cannot tell if partnership pace is sustainable.</li>
          <li>Equity decided by charisma. Use contribution, risk, and time commitment as inputs.</li>
        </ul>

        <h2 id="first-90-days">Your first 90 days together</h2>
        <ol>
          <li><strong>Month 1:</strong> Ship the thin slice, set up monitoring, and talk to 10 users. Run weekly retros.</li>
          <li><strong>Month 2:</strong> Add one core feature and stabilize reliability. Begin lightweight hiring pipeline for future needs.</li>
          <li><strong>Month 3:</strong> Instrument activation/retention, prepare a simple metrics dashboard, and align on fundraising or revenue milestones.</li>
        </ol>
        <p>
          Keep a <em>decision log</em> (one doc) for architecture, pricing, and product choices. This lowers conflict and speeds onboarding for future team members.
        </p>

        <h2 id="resources">Resources and next steps</h2>
        <p>
          Adapt this playbook to your context. For more depth on founder agreements, technical due diligence, and early-stage product loops, explore related guides in{' '}
          <Link href="/articles" className="font-medium text-blue-600 hover:underline">
            Articles
          </Link>
          .
        </p>
      </article>

      {/* Featured Professionals */}
      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold">Mentors experienced in {TOPIC}</h2>
        {featuredProfessionals.length === 0 ? (
          <p className="text-sm text-gray-600">
            Looking for practitioner feedback or guidance? Explore more guides in{' '}
            <Link href="/articles" className="font-medium text-blue-600 hover:underline">
              Articles
            </Link>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredProfessionals.map((_, idx) => (
              <li
                key={idx}
                className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700"
              >
                Profile
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <summary className="cursor-pointer text-base font-medium">{item.q}</summary>
                <div className="mt-2 text-gray-700">{item.a}</div>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
