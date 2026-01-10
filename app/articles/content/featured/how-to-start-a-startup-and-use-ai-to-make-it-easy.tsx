import { Link } from 'react-router'
import type { ReactNode } from 'react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../data/types'
import AuthorBio from '../../../components/AuthorBio'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'The Australian Founder Playbook for 2026: Start Lean, Use AI Wisely, Build Trust Fast'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'australian-founder-playbook-2026'
const AUTHOR = 'Dr Sam Donegan'
const AUTHOR_ROLE = 'Medical Doctor, AI Startup Founder & Lead Editor'
const AUTHOR_BIO =
  'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.'
const AUTHOR_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376'
const DATE_MODIFIED = '2026-01-10T00:00:00.000Z'
const DESCRIPTION =
  'A 2026 playbook for Australian founders: a 30-day launch plan, a 90-day validation system, and responsible AI guardrails that keep customers and regulators onside.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2F7ebeaf16-d68f-42f9-b1a1-3a77d19d6c80%20(2).png?alt=media&token=70248355-2685-43f2-b855-57566e7146a7'
const HERO_IMAGE_ALT = 'Founders collaborating in an office with laptops and AI tools'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Can AI write my business plan?',
    answer:
      'It can draft a strong baseline fast, but it cannot validate your assumptions. Use AI for structure, formatting, and first-pass research. Then verify with primary sources, real customer conversations, and your own numbers. Treat it like a junior analyst who works quickly and needs supervision.',
  },
  {
    id: 2,
    question: 'What is the fastest way to validate a startup idea in 2026?',
    answer:
      'Run a 30-day sequence: write a one-sentence problem statement, interview 12 target customers, test a landing page offer, then ship the smallest measurable MVP. The goal is not to launch big. The goal is to learn with evidence.',
  },
  {
    id: 3,
    question: 'How should I use AI in customer research without fooling myself?',
    answer:
      'Use AI to summarise and cluster your notes, not to invent customer truth. Keep raw notes and direct quotes. If an AI summary surprises you, go back to the source. Your rule is simple: AI can help you organise what people said, but it cannot replace talking to them.',
  },
  {
    id: 4,
    question: 'Do I need to be technical to build an MVP now?',
    answer:
      'Less than ever. You can combine no-code workflows, templates, and AI coding support to ship something testable. The key is not the stack. The key is instrumented learning: activation, retention, and a clear decision log.',
  },
  {
    id: 5,
    question: 'How much does it cost to build an AI MVP in Australia?',
    answer:
      'It depends on what you are building and how sensitive the data is. Many teams can get to a testable MVP on a few thousand dollars plus monthly tooling and hosting. If you handle personal or sensitive data, budget extra for better controls, security, and professional advice.',
  },
  {
    id: 6,
    question: 'What are the biggest AI risks for early-stage startups?',
    answer:
      'Three repeat offenders: data leakage (pasting customer info into public tools), hallucinations (shipping confident nonsense), and trust gaps (no clarity on how your system makes decisions). Fix this with data classification, a verification habit, and simple governance you can explain in one minute.',
  },
]

export const summaryHighlights = {
  heading: 'Quick Look: Build Fast, Prove It, Stay Trusted',
  intro:
    'In 2026, speed matters, but trust is the multiplier. Use AI to compress busywork, then back your decisions with customer proof and clean operating habits.',
  items: [
    {
      label: 'What to do first',
      description:
        'Write a painfully clear problem statement, then interview 12 real customers in 7 days. AI can help you prepare and summarise, but it cannot replace conversations.',
    },
    {
      label: 'What to measure',
      description:
        'Ship the smallest measurable MVP. Track activation and retention, not vanity metrics. Run weekly experiments with a decision rule you follow.',
    },
    {
      label: 'How to use AI safely',
      description:
        'Classify your data, keep sensitive info out of public tools, and treat every AI output as a draft. Add a 60-second verification habit to everything important.',
    },
  ],
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className="bg-white">
      {/* 1) Intro alert - Clean, neutral style */}
      <div className="my-6 rounded-lg border border-gray-200 bg-[--soft] p-4">
        <p className="text-sm text-[--brand-ink] flex gap-2">
          <span className="text-xl">💡</span>
          <span>
            This guide is part of our broader series on starting a startup in Australia. Prefer to jump ahead?{' '}
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
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84p4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01-.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For leaders validating ideas, finding traction, raising capital, and building a team that ships.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
            {/* Icon: Graduate */}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For people building a portfolio, learning the ropes, or switching into startups with real projects.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
            {/* Icon: Community */}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For mentors and facilitators who want a clean, repeatable system founders can actually follow.
          </p>
        </div>
      </div>

      {/* 3) Main content starts */}
      <div className="">
        <p>
          <strong>{TOPIC}</strong>
          {' '}
          is a practical playbook for building in Australia in 2026. Starting a startup is two jobs: learn faster than
          everyone else, and avoid trust-killers like sloppy data handling and unverified AI outputs.
        </p>
        <p className="mt-4">
          AI can compress weeks of busywork into hours. It cannot replace customer truth, clean governance, or basic
          security. Use it to move faster, then back your decisions with evidence.
        </p>

        <div className="my-12 max-w-3xl mx-auto">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

        <h2>What this playbook covers</h2>
        <p>
          You will get three things:
        </p>
        <ul>
          <li>
            A <strong>30-day plan</strong> to go from idea to a measurable MVP.
          </li>
          <li>
            A <strong>90-day validation system</strong> with weekly experiments and decision rules.
          </li>
          <li>
            <strong>Responsible AI guardrails</strong> so you move fast without burning trust.
          </li>
        </ul>

        {/* 4) Resource / Checklist CTA */}
        <div className="my-12 rounded-2xl bg-[--soft] p-8 sm:p-12 relative overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 relative z-10">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[--brand-ink]">Free download</span>
              <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
                Founder validation kit <br className="hidden sm:inline" /> Checklist & Notes
              </h3>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Capture your hypothesis, data sensitivity, risks, and weekly decisions in one place. Includes a one-page
                summary format you can share with mentors, advisors, and early customers.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg bg-[--brand] px-6 py-3 text-sm font-semibold text-[--accent] shadow-sm ring-1 ring-inset ring-[--brand] hover:bg-teal-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--brand] focus-visible:ring-offset-2"
                >
                  Download Checklist (PDF)
                </a>
              </div>
            </div>

            {/* Document Preview Cards - Tilted stack effect */}
            <div className="flex gap-4 justify-center lg:justify-end">
              <div className="w-40 rotate-[-3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-sm font-semibold text-gray-900">Experiment Card</p>
                  <p className="text-xs text-gray-500">Preview</p>
                </div>
              </div>
              <div className="w-40 rotate-[3deg] transform transition-transform hover:rotate-0 hover:z-10 hover:scale-105 shadow-md">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                  <p className="text-sm font-semibold text-gray-900">Decision Log</p>
                  <p className="text-xs text-gray-500">Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-100/60 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-200/50 blur-3xl" />
        </div>

        <h2>Why it matters in 2026</h2>
        <div className="my-12 max-w-3xl mx-auto">
          <ImageWithFallback
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%2010%2C%202026%2C%2002_58_26%20PM%20(1).png?alt=media&token=7893b797-dff8-43ed-a8d8-384e622884d1"
            alt="Modern abstract technical illustration symbolising significance in 2026 and future innovations."
            width={1200}
            height={800}
            className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

        <p>
          Early-stage capital is still selective, and customers expect proof. AI can reduce time-to-learning by
          automating busywork like desk research, clustering feedback, and drafting experiments. The trade-off is that
          unmanaged AI use can introduce privacy risk, security risk, and confident inaccuracies. In 2026, the teams that
          win are the teams that move quickly with discipline.
        </p>

        <div className="my-8 border-l-4 border-[--brand] bg-teal-50/60 pl-6 py-4 pr-4 rounded-r-lg">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">💡</span> Working rule
          </h4>
          <p className="mt-1 text-gray-800">
            Every AI-assisted output is a draft. Pair it with a 60-second verification habit: check sources, sanity-check
            numbers, and confirm anything that could harm a customer if wrong.
          </p>
        </div>

        <h2>The 30-day plan</h2>
        <p>
          This is what to do first, in order. Keep it simple. Keep it measurable.
        </p>

        <h3>Days 1–3: Pick a painfully clear problem</h3>
        <p>
          Write this sentence and make it real:
        </p>
        <p className="mt-2 rounded-xl border border-gray-200 bg-white p-4 text-gray-800">
          <strong>“We help</strong> [specific customer] <strong>do</strong> [job-to-be-done] <strong>by</strong> [approach],{' '}
          <strong>so they can</strong> [measurable outcome].”
        </p>
        <ul>
          <li>
            <strong>AI helps:</strong> generate versions, list competitors, surface objections, draft a one-page problem brief.
          </li>
          <li>
            <strong>You do:</strong> make it specific enough that a target customer nods, not politely smiles.
          </li>
        </ul>

        <h3>Days 4–10: Talk to 12 people</h3>
        <p>
          You are not validating your idea. You are validating pain, urgency, and willingness to change.
        </p>
        <p className="mt-3">
          <strong>Target:</strong> 12 interviews in 7 days. If you are not slightly uncomfortable, you are moving too slowly.
        </p>
        <p className="mt-3">
          Use this script:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>“Walk me through the last time this problem happened.”</li>
          <li>“What did it cost you (time, money, stress, risk)?”</li>
          <li>“What have you tried already?”</li>
          <li>“If I could fix it tomorrow, what would ‘better’ look like?”</li>
          <li>“Who else is involved in deciding or paying?”</li>
          <li>“Would you pay for it? How would you expect pricing to work?”</li>
        </ol>
        <ul className="mt-4">
          <li>
            <strong>AI helps:</strong> cluster themes, pull out phrases customers use, draft follow-up questions.
          </li>
          <li>
            <strong>You do:</strong> keep raw notes and quotes. If AI says something surprising, verify in the source.
          </li>
        </ul>

        <h3>Days 11–17: Test an offer before you build</h3>
        <p>
          Build a simple landing page and force a real next step: book a call, join a waitlist with detail, agree to a pilot.
          This is a distribution test, not a design project.
        </p>
        <ul>
          <li>
            <strong>Success looks like:</strong> 3–5 real next steps from your target audience.
          </li>
          <li>
            <strong>AI helps:</strong> write copy variants, generate offer angles, draft an objection-handling script.
          </li>
        </ul>

        <h3>Days 18–30: Build the smallest measurable MVP</h3>
        <p>
          Your MVP must do one core action end-to-end and capture learning signals. The goal is not “launch”. The goal is
          instrumented proof.
        </p>
        <ul>
          <li>
            <strong>Must have:</strong> one core workflow, activation event, retention signal, and a rollback plan.
          </li>
          <li>
            <strong>AI helps:</strong> onboarding copy, help docs, test cases, code suggestions (still review everything).
          </li>
        </ul>

        <h2>The 90-day validation system</h2>
        <p>
          After the first 30 days, you need a repeatable rhythm. Run weekly experiment cycles.
        </p>

        <h3>Every Monday: pick one experiment</h3>
        <ul>
          <li>
            <strong>Hypothesis:</strong> “We believe [customer] will [action] because [reason].”
          </li>
          <li>
            <strong>Test:</strong> “We will [do X] to see if [metric] hits [threshold].”
          </li>
          <li>
            <strong>Decision rule:</strong> “If we hit it, we double down. If not, we change [offer, audience, channel].”
          </li>
          <li>
            <strong>Risk check:</strong> privacy, security, bias, reputational.
          </li>
        </ul>

        <h3>Every Friday: decide</h3>
        <ul>
          <li>
            <strong>Persevere:</strong> signal got stronger.
          </li>
          <li>
            <strong>Pivot:</strong> same effort, weaker signal.
          </li>
          <li>
            <strong>Pause:</strong> no signal and no new learning.
          </li>
        </ul>
        <p className="mt-3">
          Keep a decision log. It makes your next pitch, grant application, or partner conversation dramatically easier.
        </p>

        <h2>Australia-specific setup checklist</h2>
        <p>
          Do the boring bits early so they do not become a future fire.
        </p>
        <ul>
          <li>
            Decide your structure (sole trader vs company). If you plan to raise capital, a Pty Ltd is common.
          </li>
          <li>
            Register what you need (ABN and relevant registrations).
          </li>
          <li>
            If you form a company, set director responsibilities, basic governance, and clean record-keeping from day one.
          </li>
          <li>
            If you plan to pursue grants or incentives, keep a tight evidence trail and experiment history.
          </li>
        </ul>

        <div className="my-12 max-w-3xl mx-auto">
          <ImageWithFallback
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%2010%2C%202026%2C%2002_56_32%20PM.png?alt=media&token=3c7a7ba2-04aa-4ce0-8c5e-900826b52bbc"
            alt="Responsible AI practices illustration"
            width={1200}
            height={800}
            className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>

        <h2>Responsible AI for founders</h2>
        <p>
          This is the “move fast without doing dumb things” section.
        </p>

        <h3>1) Classify your data in 60 seconds</h3>
        <ul>
          <li><strong>Public</strong></li>
          <li><strong>Internal</strong></li>
          <li><strong>Confidential</strong></li>
          <li><strong>Sensitive</strong> (personal info, health, financial, kids)</li>
        </ul>
        <p className="mt-3">
          If it is sensitive, do not paste it into public AI tools. Use de-identified examples, synthetic data, or a secured workflow.
        </p>

        <h3>2) Build a “draft + verify” habit</h3>
        <p>
          Every important output gets a quick check:
        </p>
        <ul>
          <li>What sources back this?</li>
          <li>What could be wrong?</li>
          <li>What would harm a customer if this is wrong?</li>
        </ul>

        <h3>3) If your product makes significant decisions, plan for transparency</h3>
        <p>
          If you do anything like automated approvals, ranking, eligibility decisions, risk scoring, or pricing decisions, build
          explainability and documentation early. Even if you are small now, future customers and partners will expect you to
          explain what your system does, what data it uses, and what controls exist.
        </p>

        <h3>4) If kids might use your product, design for it early</h3>
        <p>
          If your product is even adjacent to children, choose stronger defaults, clearer language, and tighter data practices.
          You do not want to retrofit trust later.
        </p>

        <h2>AI workflows that actually help</h2>
        <p>
          Use AI to compress time. Use humans to confirm truth.
        </p>

        <h3>Workflow A: Research sprint in 90 minutes</h3>
        <ul>
          <li><strong>AI generates:</strong> market map, competitor list, pricing models, objection list.</li>
          <li><strong>You verify:</strong> 10 key claims with primary sources.</li>
          <li><strong>Output:</strong> a one-page brief and 5 customer questions.</li>
        </ul>

        <h3>Workflow B: Customer feedback to product decisions</h3>
        <ul>
          <li><strong>AI clusters:</strong> notes, transcripts, tickets into themes.</li>
          <li><strong>You decide:</strong> top 3 pains, top 1 build.</li>
          <li><strong>Output:</strong> experiment card and weekly changelog.</li>
        </ul>

        <h3>Workflow C: Build faster with guardrails</h3>
        <ul>
          <li><strong>AI helps:</strong> code suggestions, tests, docs, edge cases.</li>
          <li><strong>You enforce:</strong> review, logging, rollback plan, privacy checks.</li>
          <li><strong>Output:</strong> an MVP that survives contact with reality.</li>
        </ul>

        <h2>Final checklist</h2>
        <p>
          If you do nothing else, do this:
        </p>
        <ul>
          <li>One-sentence problem statement your target customer agrees with</li>
          <li>12 interviews completed, with quotes and willingness-to-change evidence</li>
          <li>Landing page offer test with real next steps</li>
          <li>Smallest measurable MVP with activation + retention tracking</li>
          <li>Data classification and a clear rule for sensitive information</li>
          <li>Weekly experiment cadence and a decision log</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          In 2026, the teams that win are not the teams that “use AI the most”. They are the teams that learn fastest, measure
          honestly, and protect trust while they scale. Use AI to speed up the work, then earn your right to grow with evidence.
        </p>

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">
                1
              </span>
              <span>Download the validation kit and start an experiment card for your first week.</span>
            </li>
            <li className="flex gap-3 text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">
                2
              </span>
              <span>Book 12 interviews for next week. No building until you have dates in the calendar.</span>
            </li>
            <li className="flex gap-3 text-gray-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--brand] text-xs font-bold text-[--accent]">
                3
              </span>
              <span>Ship a measurable MVP in 30 days. Keep it small, keep it real, keep it instrumented.</span>
            </li>
          </ul>
        </div>

        {/* <div className="my-12">
          <ArticleCompanyCTA
            title="Want a tailored plan for your idea?"
            body="Answer a few questions and get recommended next steps, experiments, and responsible AI guardrails based on your context."
            buttonText="Get recommendations"
            buttonHref="#"
            note="You can filter by topic, format (online/in-person), and experience level."
          />
        </div> */}
      </div>

      {/* Author Bio & Footer */}
      <hr className="my-10 border-gray-100" />

      <AuthorBio author={authorDetails} />

      {/* FAQ Section */}
      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      {/* Final Breadcrumb/Nav */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
        <Link to="/articles" className="hover:text-[--brand-ink] underline-offset-4 hover:underline">
          ← Back to Articles
        </Link>
        <a href="#" className="hover:text-[--brand-ink] underline-offset-4 hover:underline">
          Top of page ↑
        </a>
      </div>
    </div>
  )
}
