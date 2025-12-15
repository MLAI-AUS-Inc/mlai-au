// app/articles/content/featured/find-technical-cofounder.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: Find a technical cofounder',
  intro:
    'In 2025, the fastest matches come from targeted founder-matching platforms, OSS communities, and warm intros—validated by quick trial-builds and clear equity terms.',
  items: [
    {
      label: 'Where should I look first?',
      description:
        'Start with warm intros, YC cofounder matching, reputable meetups, OSS contributors, and alumni networks—channels with pre-vetted, high-signal talent.'
    },
    {
      label: 'How do I vet quickly?',
      description:
        'Run a 1–2 week scoped, time-boxed trial build with agreed outcomes, async updates, and code review to assess skill and working style.'
    },
    {
      label: 'What about equity?',
      description:
        'Align on roles and risk, use 4-year vesting with a 1-year cliff, and capture IP assignment and decision rights in a founder agreement.'
    }
  ]
}

export const faqs: ArticleFAQItem[] = [
  {
    q: 'Where do I find a technical cofounder?',
    a: 'Start with warm intros, YC’s cofounder matching, reputable meetups, OSS projects, university labs, and alumni networks. Focus on communities aligned to your domain.'
  },
  {
    q: 'How is a technical cofounder different from a CTO hire?',
    a: 'A cofounder shares risk, equity, and core decisions from day one. A CTO hire is an employee with salary and stock options but not equal governance.'
  },
  {
    q: 'How much equity should a technical cofounder get?',
    a: 'It depends on stage, traction, and relative contribution. Many teams use equal or near-equal splits with 4-year vesting and a 1-year cliff; adjust for prior work.'
  },
  {
    q: 'How do I vet engineering ability if I am non-technical?',
    a: 'Use a scoped trial build, ask for architecture notes, run code review with a trusted advisor, and check shipped work, references, and open-source contributions.'
  },
  {
    q: 'What if I cannot pay a salary yet?',
    a: 'Be transparent about runway. Offer fair equity with standard vesting, time-boxed trials, and milestones. Consider small stipends for trial work if possible.'
  },
  {
    q: 'Is remote cofounding viable?',
    a: 'Yes, if you set overlapping hours, write things down, and use clear decision processes. Start remote and schedule focused in-person sprints when needed.'
  },
  {
    q: 'Should I use founder-matching platforms?',
    a: 'They can work if you screen rigorously. Prioritise platforms with reputation systems, verified profiles, or founder references.'
  },
  {
    q: 'How long should a trial project last?',
    a: 'Typically 1–2 weeks, with clear scope, demo criteria, and async updates. Long enough to see collaboration, short enough to maintain momentum.'
  },
  {
    q: 'What documents do we need to start?',
    a: 'A founder agreement, IP assignment, vesting schedule, decision-making policy, and confidentiality terms. Get local legal advice before committing equity.'
  }
]

export default function ArticleBody() {
  return (
    <>
      <p>
        <strong>To find a technical cofounder</strong>, clarify the problem and market you’re tackling, search in high-signal communities (e.g. cofounder-matching, OSS, alumni, meetups), run a short trial build, and align equity with vesting and clear roles.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-50">What you’ll learn</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Where to look for credible cofounder candidates (ranked by signal)</li>
          <li>How to pitch, screen, and run a no-drama trial build</li>
          <li>Equity, vesting, and decision-rights basics to avoid friction</li>
          <li>Lightweight outreach scripts that earn replies</li>
          <li>A step-by-step plan and a printable checklist</li>
        </ul>
      </div>

      <h2>Cofounder vs early technical hire: what’s the difference?</h2>
      <p>
        A technical cofounder is a long-term owner of the problem and product, shares risk, and shapes strategy. An early technical hire executes within a defined scope, typically for salary plus options. If you need a partner to co-own product, architecture, delivery, and fundraising narratives, you’re looking for a cofounder.
      </p>
      <h3>Signals you actually need a cofounder</h3>
      <ul>
        <li>You need rapid product iteration while validating problem/solution fit.</li>
        <li>Your roadmap depends on defensible technical insight or IP.</li>
        <li>You want shared accountability for shipping, quality, and strategy.</li>
      </ul>

      <h2>Where to look (ranked by signal)</h2>
      <p>
        Go where strong builders already demonstrate judgment and follow-through. Prioritise places that encode reputation and shipped work.
      </p>
      <ul>
        <li>
          <strong>Warm introductions:</strong> Ask operators and engineers you trust. Be explicit about stage, time commitment, and vision. Warm signals beat cold outreach.
        </li>
        <li>
          <strong>Founder-matching platforms:</strong> Use reputable platforms with verification and references. Write a crisp profile: problem, who you are, traction, commitment, and what success looks like.
        </li>
        <li>
          <strong>Open-source communities:</strong> Look for maintainers and frequent contributors in your domain. Read issues/PRs to gauge collaboration and code quality.
        </li>
        <li>
          <strong>Alumni and research labs:</strong> Alumni boards and university labs often surface ambitious builders. Target programs aligned with your problem space.
        </li>
        <li>
          <strong>Meetups and hackathons:</strong> Attend events where real projects are shipped. Offer to form a team around a tightly scoped prototype.
        </li>
        <li>
          <strong>Engineer-visible channels:</strong> Weekly portfolio posts, dev blogs, and demo communities expose people who ship consistently.
        </li>
      </ul>

      <h2>How to pitch your vision (so builders lean in)</h2>
      <p>
        Technical founders evaluate clarity, stakes, and your ability to execute the non-technical load. Your message should make it easy to say “yes” to a conversation.
      </p>
      <ul>
        <li>
          <strong>Be specific:</strong> Who has the problem, how often, what’s broken, and why now?
        </li>
        <li>
          <strong>Show commitment:</strong> Time, capital, early traction, or domain expertise you bring.
        </li>
        <li>
          <strong>Propose a trial:</strong> A 1–2 week scope with success criteria and demo date.
        </li>
        <li>
          <strong>Be fair on equity:</strong> Explain your approach (vesting, cliffs) and openness to calibrate after a trial.
        </li>
      </ul>

      <div className="not-prose my-6 rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-teal-800 dark:text-teal-200">Outreach snippets you can adapt</h3>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <p className="m-0 font-medium">Warm intro</p>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              Hey [Name] — I’m validating [problem] for [user]. I’m full-time and have [traction/signal]. Would you be open to a 20‑min chat about a 1–2 week trial build?
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <p className="m-0 font-medium">Platform message</p>
            <p className="mt-1 text-zinc-700 dark:text-zinc-300">
              Your work on [project] fits our domain. I’m tackling [problem], targeting [who], and can handle [sales/ops/GTN]. Trial scope: [feature], demo in [date]. Interested?
            </p>
          </div>
        </div>
      </div>

      <h2>Vetting for skill, values, and execution</h2>
      <ul>
        <li>
          <strong>Portfolio review:</strong> Deployed products, OSS commits, or shipped features matter more than credentials.
        </li>
        <li>
          <strong>Trial build:</strong> Time-box 15–25 hours. Ask for brief architecture notes, lightweight tests, and a demo. Evaluate communication cadence and trade-offs.
        </li>
        <li>
          <strong>References:</strong> Two short calls with previous collaborators. Ask: How did they handle ambiguity and deadlines?
        </li>
        <li>
          <strong>Values check:</strong> Discuss decision-making, user empathy, security, and quality bar.
        </li>
      </ul>

      <h2>Equity, roles, and legal basics</h2>
      <p>
        As of 2025, many early teams use 4-year vesting with a 1-year cliff and IP assignment to the company. Document roles, decision rights, and a mechanism for resolving deadlock. Calibrate equity to risk, contribution, and prior work. Seek local legal advice before issuing equity.
      </p>

      <h2>Step-by-step plan to find a technical cofounder</h2>
      <ol>
        <li>Write a one-pager: problem, user, why-now, traction, and your commitment.</li>
        <li>Define a 1–2 week trial scope with a demo date and acceptance criteria.</li>
        <li>List 30 targets across warm intros, platforms, OSS, and alumni. Prioritise by signal.</li>
        <li>Send tailored outreach to 10 high-signal leads. Schedule 20–30 min calls.</li>
        <li>Advance 2–3 to a trial build. Share design notes and async update format.</li>
        <li>Run weekly demos. Capture trade-offs, speed, and collaboration style.</li>
        <li>Decide with references. Align on equity, vesting, and roles. Paper it.</li>
        <li>Run a 30–60 day cofounder “sprint” to confirm cadence before broad launch.</li>
      </ol>

      <h2>Printable checklist</h2>
      <ul>
        <li>One-pager and trial scope complete</li>
        <li>High-signal channels identified and prioritised</li>
        <li>Outreach messages tailored and sent</li>
        <li>Trial build plan, demo date, and success criteria agreed</li>
        <li>Reference checks documented</li>
        <li>Founder agreement, vesting, and IP assignment drafted</li>
      </ul>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Pitching a vague idea without user specifics or trial scope. Result: low replies and mismatched expectations.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Share a crisp one-pager and propose a 1–2 week build with a demo date and acceptance criteria.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Negotiating equity before testing collaboration.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Run a small paid or equity-accruing trial; decide equity after seeing working style and speed.
          </p>
        </div>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link to="/articles">Articles</Link>
        </li>
        <li>
          Learn about our approach: <Link to="/about">About</Link>
        </li>
        <li>
          Need tailored advice? <Link to="/contact">Contact</Link>
        </li>
        <li>
          Explore tools and templates: <Link to="/resources">Resources</Link>
        </li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="/images/articles/find-technical-cofounder-hero.jpg"
          alt="Two founders reviewing code and a product roadmap"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
