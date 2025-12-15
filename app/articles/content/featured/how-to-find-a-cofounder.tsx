// app/articles/content/featured/how-to-find-a-cofounder.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: How to find a cofounder',
  intro: 'As of 2025, successful cofounder matches prioritise values, complementary skills, and clear commitments before equity.',
  items: [
    { label: 'Where do founders actually meet?', description: 'Warm networks, founder communities, and targeted outreach outperform generic job boards. Track 30–50 prospects and run small build tests.' },
    { label: 'What matters most in fit?', description: 'Aligned mission, complementary skill sets, availability, communication style, and trust. Validate with references and a 2–4 week build sprint.' },
    { label: 'When to discuss equity?', description: 'After a successful trial. Use four‑year vesting with a one‑year cliff and clear roles to reduce future conflict.' },
  ],
}

export const faqs: ArticleFAQItem[] = [
  { q: 'What\'s the fastest way to find a cofounder?', a: 'Define a crisp founder brief, generate 30–50 prospects from your network and founder communities, run short build sprints, then reference‑check.' },
  { q: 'Where do founders find cofounders?', a: 'Existing network, founder matching platforms, meetups, accelerators, universities, open‑source communities, and targeted LinkedIn or X outreach.' },
  { q: 'How do I evaluate a potential cofounder?', a: 'Score values alignment, complementary skills, availability, execution proof via a small build, and third‑party references.' },
  { q: 'How should we split equity with a cofounder?', a: 'After a trial, weigh contribution, risk, and role. Use four‑year vesting with a one‑year cliff; document decisions in a founder agreement.' },
  { q: 'Do we need a founder agreement before building?', a: 'Yes. Even a lightweight memorandum covering IP, vesting, roles, and decision rights helps avoid disputes.' },
  { q: 'Can remote cofounders work well?', a: 'Yes, with strong async habits, overlapping hours, and clear decision‑making. Pilot remote collaboration during the trial sprint.' },
  { q: 'How long should a cofounder trial be?', a: 'Two to four weeks of focused collaboration is typical. Longer if part‑time. Conclude with a retro and written commitments.' },
  { q: 'What if we disagree on vision?', a: 'Document the product thesis early. Use decision rules (e.g., CEO call after debate). If divergence persists, pause and reassess fit.' },
  { q: 'Should I pay a cofounder a salary pre‑funding?', a: 'Commonly no, or a minimal stipend if financially necessary. Equity with vesting aligns incentives pre‑funding.' },
  { q: 'Is being a solo founder a dealbreaker?', a: 'No. Many succeed solo. But a cofounder can accelerate learning, resilience, and recruiting if fit is strong.' },
]

export default function ArticleBody() {
  return (
    <>
      <p><strong>How to find a cofounder</strong> in 2025: write a clear founder brief, source 30–50 targeted prospects, run a short build sprint together, reference‑check, then paper the relationship with vesting.</p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">What you’ll learn</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Where strong cofounder matches actually come from</li>
          <li>How to write a founder brief that attracts the right people</li>
          <li>A step‑by‑step sourcing and vetting playbook</li>
          <li>Common red flags and how to handle equity</li>
        </ul>
      </div>

      <h2>What makes a great cofounder match</h2>
      <p>A durable partnership rests on five pillars: mission alignment, complementary skills, availability, communication habits, and trust. Agree on the problem you want to solve and how you like to work before you touch equity.</p>
      <ul>
        <li><strong>Mission and values:</strong> Write your one‑paragraph product thesis and non‑negotiables. Compare explicitly.</li>
        <li><strong>Complementary skills:</strong> Pair product/engineering, commercial/technical, or domain/technical strengths. Overlap enough to debate constructively.</li>
        <li><strong>Availability and runway:</strong> Be concrete about time (hours/week), location, and financial runway.</li>
        <li><strong>Communication style:</strong> Decide async vs real‑time, preferred tools, and decision rules (e.g., CEO decides after debate).</li>
        <li><strong>Trust signals:</strong> Past delivery, references, and how you handle small misses during a trial.</li>
      </ul>

      <h2>Where to find potential cofounders</h2>
      <p>Your odds improve when you mix warm introductions with high‑signal communities. Cast a wide, targeted net and track a pipeline like a sales process.</p>
      <h3>High‑signal sources</h3>
      <ul>
        <li>Your existing network: alumni, former teammates, advisors. Ask for specific intros.</li>
        <li>Founder communities and matching platforms (e.g., accelerator networks, curated Slack/Discord groups).</li>
        <li>Local meetups and hackathons; university labs and entrepreneurship centres.</li>
        <li>Open‑source and online builders: contributors in your problem space.</li>
        <li>Targeted outreach on LinkedIn or X with a tight, value‑led message.</li>
      </ul>
      <p>Tip: keep a simple CRM (spreadsheet is fine) with 30–50 prospects and weekly follow‑ups. If you’re new to our site, browse other practical guides in <Link to="/articles" className="text-teal-600 hover:text-teal-700">Articles</Link>.</p>

      <h2>Write a compelling founder brief</h2>
      <p>A good brief filters in the right partners and filters out mismatches. Keep it one page; share publicly or via DMs.</p>
      <ul>
        <li><strong>Mission & problem:</strong> What you’re building and why now.</li>
        <li><strong>Evidence:</strong> Users, insights, prototypes, or unique access.</li>
        <li><strong>What you bring:</strong> Skills, domain edge, credibility.</li>
        <li><strong>Who you seek:</strong> Must‑have skills (e.g., senior full‑stack, GTM), nice‑to‑haves, time zone.</li>
        <li><strong>Working model:</strong> Time commitment, cadence, decision rights.</li>
        <li><strong>Compensation:</strong> Equity range with standard four‑year vesting/one‑year cliff.</li>
        <li><strong>Next step:</strong> A short build trial (weekend or 2–4 weeks).</li>
      </ul>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold">Two short outreach templates</h3>
        <ol className="mt-3 list-decimal pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li><strong>Warm intro ask:</strong> “I’m building X for Y. Looking for a cofounder with Z. Would you be open to a 20‑min intro or point me to 1–2 people you recommend?”</li>
          <li><strong>Cold DM:</strong> “Loved your post on [topic]. I’m working on X; early signal: [proof]. Exploring a 2‑week build sprint with a cofounder strong in Z. Interested?”</li>
        </ol>
      </div>

      <h2>Evaluate with a structured scorecard</h2>
      <p>Use a 1–5 scale across criteria, then discuss the deltas openly.</p>
      <ul>
        <li>Values and mission alignment</li>
        <li>Complementary skills and seniority</li>
        <li>Execution in a small build (quality, speed, autonomy)</li>
        <li>Communication and conflict style</li>
        <li>Availability and financial runway</li>
        <li>References from collaborators</li>
      </ul>

      <h2>Step‑by‑step: run this playbook</h2>
      <ol>
        <li><strong>Draft your founder brief</strong> with clear problem, proof, role, and equity principles.</li>
        <li><strong>Generate 30–50 prospects</strong> from your network, founder groups, events, and targeted outreach.</li>
        <li><strong>Qualify quickly</strong> on values, skills, availability; book 6–10 first calls.</li>
        <li><strong>Run a week‑end hack or 2–4 week sprint</strong> to build a thin slice with real users.</li>
        <li><strong>Do back‑channel references</strong> with 2–3 past collaborators each.</li>
        <li><strong>Hold a retro</strong> on energy, speed, quality, and decision‑making. Adjust expectations.</li>
        <li><strong>Agree terms</strong>: roles, equity split, vesting (4‑year/1‑year cliff), IP assignment.</li>
        <li><strong>Paper it</strong> via a lightweight founder agreement, then continue weekly check‑ins.</li>
      </ol>

      <h2>Equity, roles, and simple paperwork</h2>
      <p>Keep it fair and simple. Align split with contribution and risk. Standard startup practice uses four‑year vesting with a one‑year cliff and IP assignment to the company. Define who leads product, who leads GTM, and how tie‑breaks are made.</p>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake: hiring too fast</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Skipping a build trial leads to surprises. Always run a small sprint before finalising equity.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix: trial then decide</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Time‑box a 2–4 week collaboration with explicit scope, demo, and retro. Decide with data.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake: vague roles</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Ambiguity breeds conflict. Define who owns product, engineering, sales, and investor comms.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix: RACI for founders</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Document responsibilities and decision rights. Review quarterly.</p>
        </div>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>Browse more guides: <Link to="/articles" className="text-teal-600 hover:text-teal-700">Articles</Link></li>
        <li>About our work: <Link to="/about" className="text-teal-600 hover:text-teal-700">About</Link></li>
        <li>Stay updated: <Link to="/subscribe" className="text-teal-600 hover:text-teal-700">Subscribe</Link></li>
        <li>Need advice? <Link to="/contact" className="text-teal-600 hover:text-teal-700">Contact</Link></li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="/images/articles/featured/how-to-find-a-cofounder-hero.jpg"
          alt="Two founders reviewing a whiteboard roadmap"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
