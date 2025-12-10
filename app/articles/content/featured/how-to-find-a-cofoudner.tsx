// app/articles/content/featured/how-to-find-a-cofoudner.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: How to Find a Cofounder',
  intro: 'Finding a cofounder is a structured search: clarify needs, look where builders gather, then test fit with a short, scoped sprint.',
  items: [
    {
      label: 'Where do strong candidates gather?',
      description:
        'Founder communities, alumni groups, industry Slack/Discords, hackathons, and vetted matching platforms work best when you lead with a clear problem and role.',
    },
    {
      label: 'What signals matter most?',
      description:
        'Complementary skills, shared problem obsession, evidence of grit, time commitment, and written expectations outweigh personality match alone.',
    },
    {
      label: 'How to test fit fast?',
      description:
        'Run a one‑week build sprint with scope, daily async updates, and a retro. Decide on outcomes and collaboration quality, not vibes.',
    },
  ],
}

export const faqs: ArticleFAQItem[] = [
  {
    q: 'What is the fastest way to find a cofoudner?',
    a: 'Define role and problem, post in founder communities and matching platforms, shortlist 2–3, then run a one‑week trial sprint before committing.',
  },
  {
    q: 'Where should I look for a cofounder?',
    a: 'YC Co‑Founder Matching, CoFoundersLab, alumni networks, industry Slack/Discords, local meetups, hackathons, open‑source communities, and referrals from operators.',
  },
  {
    q: 'How do I know if someone is the right cofounder?',
    a: 'Assess complementary skills, shared problem obsession, grit, availability, and a successful trial sprint with clear communication and steady velocity.',
  },
  {
    q: 'How should we split equity early?',
    a: 'Use 4‑year vesting with a 1‑year cliff. Consider dynamic models (e.g., Slicing Pie) or milestone‑based splits. Document assumptions and roles in writing.',
  },
  {
    q: 'What red flags should I avoid?',
    a: 'Inconsistent availability, over‑promising, blame‑shifting, secrecy with code or data, refusal to document, and reluctance to run a trial sprint.',
  },
  {
    q: 'Can remote cofounders work well?',
    a: 'Yes—with shared core hours, async updates, written decisions, and clear ownership. Use version control, issue tracking, and weekly retros.',
  },
  {
    q: 'Do I need a cofounder to raise funding?',
    a: 'Not strictly. Many pre‑seed investors favour teams, but solo founders raise with traction, clear focus, and a strong advisory bench.',
  },
  {
    q: 'How many candidates should I trial?',
    a: 'Two to three in parallel is efficient. Keep scope small and timelines identical so outcomes are comparable.',
  },
]

export default function ArticleBody() {
  return (
    <>
      <p>
        To answer how to find a cofoudner: clarify the role and problem you’re solving, source candidates where serious builders gather, then run a one‑week trial sprint to evaluate fit before committing.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">What you’ll learn</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Where to find credible cofounder candidates (online and offline)</li>
          <li>The signals that predict good cofounder fit</li>
          <li>A one‑week sprint template to test collaboration</li>
          <li>How to handle equity, vesting, and expectations early</li>
          <li>Common red flags and fast diagnostics</li>
        </ul>
      </div>

      <h2>Start with clarity: role, problem, and constraints</h2>
      <p>
        Before any outreach, define the problem you’re committed to, the outcomes you want in six months, and the capabilities you lack. Write a one‑pager that includes: mission, target user, insight/hypothesis, traction to date, required skills (e.g., full‑stack, applied ML, GTM), expected time commitment, preferred location/time‑zone, and decision‑making style. This document becomes your brief to candidates and a touchstone for scope.
      </p>
      <h3>Craft a crisp role brief</h3>
      <ul className="list-disc pl-5">
        <li>Role: e.g., “Founding Engineer (Full‑stack, TypeScript/React, Node)” or “Founding GTM (PLG, devtools, content + partnerships)”.</li>
        <li>Ownership: decisions, systems, and KPIs you’ll own.</li>
        <li>Must‑haves vs nice‑to‑haves: keep must‑haves short and testable.</li>
        <li>Time and runway: hours/week, funding status, when you’d decide to incorporate.</li>
      </ul>

      <h2>Where to find cofounder candidates</h2>
      <p>
        Fish where builders gather and where your domain context gives you an edge. Pair outreach with a clear role and trial scope.
      </p>
      <ul className="list-disc pl-5">
        <li>Reputable matching platforms: Y Combinator’s Co‑Founder Matching and CoFoundersLab.</li>
        <li>Alumni and operator networks: university, prior employers, accelerators, and angel syndicates.</li>
        <li>Industry Slack/Discords: domain communities, devtools groups, ML/AI guilds.</li>
        <li>Hackathons and ship‑sprints: great for observing bias to action and collaboration style.</li>
        <li>Open‑source projects: contributors already signalling perseverance and code quality.</li>
        <li>Local meetups: domain‑specific groups and demo nights for face‑to‑face tests.</li>
        <li>Warm referrals: ask operators you trust for two intros; follow up within 48 hours.</li>
      </ul>
      <p>
        As you shortlist, keep notes on signals and gaps. If you’re new to our content, browse more startup guides in <Link to="/articles" className="text-teal-600 hover:text-teal-700 underline">Articles</Link>.
      </p>

      <h2>Signals over vibes: selection criteria that matter</h2>
      <ul className="list-disc pl-5">
        <li><strong>Complementary skills:</strong> you cover product + distribution; they cover what you don’t.</li>
        <li><strong>Problem obsession:</strong> can they articulate user pain succinctly and propose tests?</li>
        <li><strong>Grit and follow‑through:</strong> evidence of multi‑month projects and ownership under ambiguity.</li>
        <li><strong>Time commitment:</strong> realistic hours per week now and post‑incorporation.</li>
        <li><strong>Written communication:</strong> concise updates; decisions recorded in docs or issues.</li>
        <li><strong>Ethics and trust:</strong> transparent about constraints, past failures, and expectations.</li>
      </ul>

      <h2>Validate fit with a one‑week trial sprint</h2>
      <p>
        Short, scoped collaboration beats long interviews. Run a one‑week build sprint to test speed, quality, ownership, and communication.
      </p>
      <h3>Suggested structure</h3>
      <ul className="list-disc pl-5">
        <li><strong>Scope:</strong> a thin‑slice milestone (e.g., functional prototype, scrappy landing + signup, data pipeline spike).</li>
        <li><strong>Plan:</strong> write a one‑page brief; define “done”, risks, and who owns what.</li>
        <li><strong>Cadence:</strong> async daily update (progress, blockers, next steps) and 2x short huddles.</li>
        <li><strong>Demo & retro:</strong> ship something end‑to‑end, review outcomes, decide go/no‑go.</li>
        <li><strong>IP:</strong> use a simple contribution agreement; clarify code access and confidentiality.</li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="/images/articles/how-to-find-a-cofounder.jpg"
          alt="Two founders mapping roles and sprint plan on a whiteboard"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>

      <h2>Equity, vesting, and expectations</h2>
      <p>
        Early equity is best paired with vesting and clarity. Standard startup defaults are four‑year vesting with a one‑year cliff and IP assignment to the company. If contributions are unclear, consider a dynamic model (e.g., time‑and‑risk based) during the trial period, then convert to fixed equity upon incorporation. Always document roles, decision areas, and time expectations.
      </p>

      <h2>Remote collaboration that works</h2>
      <ul className="list-disc pl-5">
        <li>Pick tools once: repo + issues, docs, chat, calendar, and a shared kanban.</li>
        <li>Set 10–15 shared hours per week and a weekly planning/retro ritual.</li>
        <li>Default to written decisions; link PRs/issues so context is discoverable.</li>
        <li>Measure on outcomes: shipped changes, learnings, and impact on a single metric.</li>
      </ul>

      <h2>Red flags and quick diagnostics</h2>
      <ul className="list-disc pl-5">
        <li>Won’t run a trial sprint or insists on large equity upfront before any work.</li>
        <li>Vague availability; misses updates without notice; blames tools or others.</li>
        <li>Over‑indexes on titles, stealth, or secrecy; resists documentation.</li>
        <li>Dismisses user feedback or avoids talking to customers.</li>
      </ul>

      <h2>Step‑by‑step: from search to decision</h2>
      <ol className="list-decimal pl-5">
        <li>Write a one‑page problem + role brief.</li>
        <li>Post and outreach across 3–4 channels in the same week.</li>
        <li>Screen with a 20‑minute call and a short written follow‑up task.</li>
        <li>Shortlist 2–3 candidates; schedule identical one‑week sprints.</li>
        <li>Run scope, daily async updates, and a mid‑week check‑in.</li>
        <li>Demo and retro; decide go/no‑go within 48 hours.</li>
        <li>For a go: align on equity ranges, vesting, and near‑term milestones in writing.</li>
      </ol>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake: hiring mindset</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Treating the process like a job hire leads to interviews without collaboration. Cofounders need shared execution, not just resumes. Run a build sprint.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix: sprint first</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Keep scope tiny, measurable, and user‑impacting. Decide based on outcomes, communication, and quality over one week.
          </p>
        </div>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link to="/articles" className="text-teal-600 hover:text-teal-700 underline">Articles</Link>
        </li>
        <li>
          Build your toolkit: <Link to="/resources" className="text-teal-600 hover:text-teal-700 underline">Resources</Link>
        </li>
        <li>
          Learn about our approach: <Link to="/about" className="text-teal-600 hover:text-teal-700 underline">About</Link>
        </li>
        <li>
          Get feedback or intros: <Link to="/contact" className="text-teal-600 hover:text-teal-700 underline">Contact</Link>
        </li>
        <li>
          Receive new playbooks: <Link to="/subscribe" className="text-teal-600 hover:text-teal-700 underline">Subscribe</Link>
        </li>
      </ul>
    </>
  )
}
