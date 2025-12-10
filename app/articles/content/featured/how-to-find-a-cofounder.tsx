// app/articles/content/featured/how-to-find-a-cofounder.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: How to find a cofounder',
  intro:
    'Define the role, search in credible pools, then validate fit with time-boxed trials and references before finalising equity and vesting.',
  items: [
    {
      label: 'Where do strong candidates come from?',
      description:
        'Warm networks, founder-matching platforms, communities, events, and ex-colleagues with complementary skills and shared market conviction.',
    },
    {
      label: 'How do I assess fit quickly?',
      description:
        'Run a 2–4 week scoped trial with clear success criteria, async collaboration, and reference checks.',
    },
    {
      label: 'What about equity splits?',
      description:
        'Discuss expectations early; default to vesting and cliffs, and align splits with risk, time, and role scope.',
    },
  ],
}

export const faqs: ArticleFAQItem[] = [
  {
    q: 'What is the fastest way to find a cofounder?',
    a: 'Define the role, tap warm networks and founder-matching platforms, then run a 2–4 week trial with clear deliverables.',
  },
  {
    q: 'Where should I look for a cofounder?',
    a: 'Warm intros, YC Co-Founder Matching, CoFoundersLab, startup communities, hackathons, universities, and open-source projects.',
  },
  {
    q: 'How do I know if someone is a good cofounder fit?',
    a: 'Complementary skills, shared market thesis, healthy conflict, bias to ship, ownership mindset, and reliable communication.',
  },
  {
    q: 'How should we split equity fairly?',
    a: 'Balance risk, time commitment, and role scope; use standard vesting (e.g., 4-year, 1-year cliff) and document agreements.',
  },
  {
    q: 'Should I work with someone I just met?',
    a: 'Yes, but only after a scoped trial, reference checks, and written expectations on time, decision rights, and equity.',
  },
  {
    q: 'What red flags should I watch for?',
    a: 'Vague availability, no portfolio, dodging equity/legal talks, blaming others, or resistance to small validation experiments.',
  },
  {
    q: 'Can remote cofounders work well?',
    a: 'Yes, with clear rituals: weekly planning, written RFCs, async updates, and transparent calendars; trial this before committing.',
  },
  {
    q: 'Do I need an NDA before talking to candidates?',
    a: 'Usually no for high-level discussions. Use NDAs for proprietary assets or sensitive customer data.',
  },
]

export default function ArticleBody() {
  return (
    <>
      <p>
        <strong>How to find a cofounder</strong> in practice: define the role you
        truly need, source from credible communities and platforms, then run a
        scoped 2–4 week trial to validate collaboration, speed, and values
        before agreeing equity and vesting.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.25_0_0)]">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          What you’ll learn
        </h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>How to write a sharp cofounder role profile and skills matrix</li>
          <li>Where to source quality candidates beyond your immediate circle</li>
          <li>A 2–4 week trial framework that de-risks the decision</li>
          <li>Fair equity, vesting, and legal basics to avoid regret</li>
          <li>Common mistakes and quick fixes</li>
        </ul>
      </div>

      <h2>Start with the role, not the person</h2>
      <p>
        Many searches fail because the role is fuzzy. Decide whether you need a
        product, technical, commercial, or operations cofounder (or a hybrid),
        and document the outcomes only they can own. Tie this to your market
        thesis so both of you know why this company should exist.
      </p>

      <div className="not-prose my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Mini skills matrix</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Product discovery, design, and prioritisation</li>
            <li>Engineering architecture and shipping velocity</li>
            <li>Customer development and revenue generation</li>
            <li>Hiring, finance, and operational cadence</li>
          </ul>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Values and ways of working</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Bias to ship and measure</li>
            <li>Kind, direct feedback</li>
            <li>Transparent calendars and commitments</li>
            <li>Owner mindset over title-seeking</li>
          </ul>
        </div>
      </div>

      <h2>Where to find strong cofounder candidates</h2>
      <h3>Channels that consistently work</h3>
      <ul>
        <li>
          Warm network: ex-colleagues, mentors, and customers who’ve seen your
          work. Ask for targeted intros, not vague broadcasts.
        </li>
        <li>
          Credible platforms: Y Combinator’s Co‑Founder Matching and
          CoFoundersLab list thousands of profiles with filters for skills and
          stage.
        </li>
        <li>
          Communities and events: niche Slack/Discord groups, meetups,
          hackathons, demo days, and university founder clubs.
        </li>
        <li>
          Open-source and portfolios: collaborate on a small issue or review
          shipped projects to see quality and velocity.
        </li>
      </ul>
      <p>
        Avoid purely generic job boards for early cofounders. Prioritise places
        where builders show proof of work.
      </p>

      <h2>How to screen for fit</h2>
      <p>
        Treat the search like a de-risking exercise. Look for complementary
        spikes, reliable communication, and a shared view of the market’s
        problem and timing.
      </p>
      <ul>
        <li>
          Signals: shipped projects, customer conversations, and clarity on
          trade-offs they’ve made.
        </li>
        <li>
          Red flags: vague availability, no portfolio, dodging equity/legal
          topics, or reluctance to run small validation experiments.
        </li>
        <li>
          References: speak with two previous collaborators; ask about delivery,
          conflict handling, and follow-through.
        </li>
      </ul>

      <h2>Validate fit fast with a trial</h2>
      <p>
        A time-boxed trial aligns expectations and reduces risk for both sides.
        Keep scope meaningful but small, with written success criteria and
        weekly demos.
      </p>
      <ol>
        <li>
          Define a 2–4 week project tied to a near-term milestone (e.g., 10 user
          interviews, prototype v1, landing page with 100 signups).
        </li>
        <li>
          Set rituals: weekly planning, mid-week async updates, and a demo.
        </li>
        <li>
          Capture decisions in short written RFCs; test how you disagree.
        </li>
      </ol>

      <h2>Equity, vesting, and legal basics</h2>
      <p>
        Align on compensation early. Equity should reflect risk and contribution
        and should almost always vest (e.g., 4-year vesting with a 1-year
        cliff). Document IP assignment and roles. Consider lightweight founder
        letters or a pre-incorporation agreement before formal setup. This is
        not legal advice; consult a qualified professional for your jurisdiction.
      </p>

      <h2>Remote vs in-person</h2>
      <p>
        Remote cofounding can work well if you establish strong written
        communication and predictable rhythms. Trial your ideal cadence before
        committing long term.
      </p>
      <ul>
        <li>Weekly planning, daily async updates, and transparent calendars</li>
        <li>Clear ownership per workstream and a shared roadmap</li>
        <li>Quarterly in-person working sessions when possible</li>
      </ul>

      <h2>Step-by-step checklist</h2>
      <ol>
        <li>
          Write a one‑page role profile and a simple skills matrix with outcomes
          only a cofounder can own.
        </li>
        <li>
          Draft your market thesis: problem, who cares, why now, and unfair
          insight.
        </li>
        <li>
          Source candidates via warm intros, reputable platforms, and targeted
          communities; prioritise proof of work.
        </li>
        <li>
          Run 30–45 minute screens: motivation, availability, and proof of
          shipping; exchange portfolios.
        </li>
        <li>
          Plan a 2–4 week trial with measurable outcomes and weekly demos.
        </li>
        <li>
          Do reference checks and talk openly about equity, vesting, and roles.
        </li>
        <li>
          Decide with evidence; document agreements and next milestones.
        </li>
      </ol>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Choosing based on vibe alone. Without a scoped trial, you can’t
            assess collaboration, speed, or follow-through.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Create a 3‑sprint trial with weekly demos and a retro. Decide with
            evidence, not intuition alone.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Avoiding equity talks until “later.” This amplifies resentment and
            risk.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[color:oklch(1_0_0_/_0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Discuss expectations and vesting during the trial. Write it down and
            iterate if roles evolve.
          </p>
        </div>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link to="/articles">Articles</Link>
        </li>
        <li>
          Use our resources hub to structure your trial: <Link to="/resources">Resources</Link>
        </li>
        <li>
          Talk with us about founder workflows: <Link to="/contact">Contact</Link>
        </li>
        <li>
          Learn about MLAI’s approach: <Link to="/about">About</Link>
        </li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1529336953121-ad5332cfe049?q=80&w=1600&auto=format&fit=crop"
          alt="Two founders planning sprints with sticky notes on a glass board"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
