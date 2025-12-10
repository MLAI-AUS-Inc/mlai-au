// app/articles/content/featured/hackathon.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: Hackathon',
  intro: 'A hackathon is a time‑boxed event where people rapidly prototype solutions—usually in 24–72 hours—then demo for feedback or prizes.',
  items: [
    { label: 'What is a hackathon?', description: 'A short, intense event where teams build a working prototype or concept around a theme, then present it to judges.' },
    { label: 'How long do they run?', description: 'Commonly 24–48 hours, though corporate or student events may span a week with part‑time work blocks.' },
    { label: 'Who owns the IP?', description: 'It depends on the rules. Many events let teams keep IP; employer or sponsor terms may override. Always check the handbook.' },
  ],
}

export const faqs: ArticleFAQItem[] = [
  { q: 'What is a hackathon?', a: 'A time‑boxed event where people form teams to design and build a prototype or solution, then demo to judges for feedback or prizes.' },
  { q: 'How do hackathons work?', a: 'Participants form teams, choose an idea aligned to the theme, build a prototype within the time limit, and pitch to judges using set criteria.' },
  { q: 'Do I need to be a developer?', a: 'No. Designers, product managers, domain experts, researchers, and writers are valuable. Mixed skills generally perform best.' },
  { q: 'How long is a typical hackathon?', a: 'Most run 24–48 hours. University and corporate events may run 3–7 days with part‑time schedules.' },
  { q: 'How are hackathons judged?', a: 'Common criteria: problem clarity, novelty, execution, usability, impact, and presentation. Weightings vary by event.' },
  { q: 'Who owns the project IP?', a: 'Varies. Many events let teams keep IP. Employer or sponsor terms may claim rights. Read the rules before you start.' },
  { q: 'What should I bring to a hackathon?', a: 'Laptop, charger, headset, repos or starter kits, snacks, water bottle, and any required IDs. Prepare accounts and APIs in advance.' },
  { q: 'How do I pick a winning idea?', a: 'Choose a real pain point, cut scope to a demo‑able core, and align to judging criteria. Prioritise a coherent story over features.' },
  { q: 'Are hackathons good for beginners?', a: 'Yes. They are a fast way to learn, network, and build a portfolio piece. Join a supportive team and take a focused role.' },
  { q: 'What tech stack should I use?', a: 'Use tools you know or proven templates. Prioritise speed and reliability over novelty unless the theme requires a specific stack.' },
]

export default function ArticleBody() {
  return (
    <>
      <p>
        <strong>Hackathon</strong> refers to a short, time‑boxed event where people collaborate to design and build a working prototype (often in 24–48 hours) and demo it to judges or stakeholders.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">What you’ll learn</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>How hackathons work, common formats, and judging criteria</li>
          <li>How to plan, join, or lead a high‑performing team</li>
          <li>Practical checklists for organisers and participants</li>
        </ul>
      </div>

      <h2>What is a hackathon?</h2>
      <p>
        A hackathon is an event designed for rapid learning and prototyping. Participants form cross‑functional teams, pick a problem aligned to a theme, and produce a tangible demo—code, design, data analysis, or a hardware proof‑of‑concept. Many hackathons end with lightning pitches and a showcase.
      </p>

      <h2>Why people run or join hackathons</h2>
      <ul className="list-disc pl-5">
        <li>Skill growth: learn new tools quickly by building under constraints.</li>
        <li>Networking: meet collaborators, mentors, and potential employers.</li>
        <li>Innovation: explore risky ideas without long‑term commitment.</li>
        <li>Portfolio: ship a demo you can show publicly (subject to IP rules).</li>
      </ul>

      <h2>Common formats</h2>
      <h3>Open/community</h3>
      <p>Public events—often weekend‑long—sponsored by universities, community groups, or tech companies.</p>
      <h3>Corporate/internal</h3>
      <p>Run inside an organisation to surface ideas, improve tooling, or foster culture. May be part‑time across a week.</p>
      <h3>Themed or challenge‑led</h3>
      <p>Focused on a domain (e.g., health, climate, govtech) or a specific dataset/API.</p>

      <div className="not-prose my-6 rounded-xl border border-teal-200 bg-teal-50 p-4 text-teal-900 dark:border-teal-700/40 dark:bg-teal-900/20 dark:text-teal-100">
        <p className="m-0 text-sm">
          Tip: Before you start, skim the criteria and past winners. Align your story and demo to what judges actually score.
        </p>
      </div>

      <h2>How judging usually works</h2>
      <p>
        Criteria vary, but a common scoring mix includes: problem clarity, novelty, execution quality, usability, impact, and presentation. Many events require a live demo and a brief pitch (2–5 minutes) with a Q&amp;A.
      </p>

      <h2>Team formation and roles</h2>
      <ul className="list-disc pl-5">
        <li>Product lead: frames the problem, scope, and pitch narrative.</li>
        <li>Engineer(s): implement core functionality and demo flow.</li>
        <li>Designer: user flows, UI, assets, and demo polish.</li>
        <li>Domain expert: validates assumptions and datasets.</li>
        <li>Pitch lead: rehearses delivery, timekeeping, and Q&amp;A.</li>
      </ul>

      <h2>Choosing the right idea</h2>
      <p>
        Pick a real pain point, then reduce scope to a slice that proves value. Prefer a narrow, working demo over a broad, unfinished prototype. Tie features to criteria: if usability is weighted, invest in onboarding and a rehearsed demo path.
      </p>

      <h2>Tech stack choices</h2>
      <p>
        Use what your team already knows or a mature template. Prepare auth, UI kits, and data scaffolding in advance if allowed. Cloud credits or sponsor APIs can accelerate delivery; ensure you can demo offline if the venue network is unreliable.
      </p>

      <h2>Ethics, data, and IP</h2>
      <p>
        Respect privacy and licensing. Use datasets and assets with clear rights. IP ownership depends on event rules and employment contracts—many community events let teams keep IP, while corporate hackathons may assign IP to the employer or sponsor. Always read the handbook.
      </p>

      <h2>Plan and run a weekend hackathon (steps)</h2>
      <ol className="list-decimal pl-5">
        <li>Define theme and outcomes (learning, prototypes, or delivery).</li>
        <li>Publish rules: eligibility, code of conduct, IP, and judging.</li>
        <li>Secure venue/virtual tools, mentors, and prize sponsors.</li>
        <li>Provide starter kits: repos, datasets, API keys, and templates.</li>
        <li>Kick‑off: clarify criteria, timeboxes, and submission process.</li>
        <li>Mentor rounds: unblock teams at set checkpoints.</li>
        <li>Demo fair: time‑boxed pitches with live demos.</li>
        <li>Judging and awards: share feedback and next‑step pathways.</li>
      </ol>

      <h2>Participant checklist</h2>
      <ul className="list-disc pl-5">
        <li>Read the rules and judging criteria before ideation.</li>
        <li>Set a 2–3 sentence problem statement and success metric.</li>
        <li>Cut scope to a single, crisp demo path.</li>
        <li>Use a reliable template; avoid yak‑shaving.</li>
        <li>Rehearse the pitch, including live demo failure modes.</li>
      </ul>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Over‑scoping: teams chase too many features and end with an unstable demo and a rushed story.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Ruthlessly prioritise one demo path. Hide non‑essential UI. Pre‑record a fallback demo video in case the network or API fails.
          </p>
        </div>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link to="/articles" className="text-teal-600 hover:text-teal-700 underline">Articles</Link>
        </li>
        <li>
          Learn about MLAI: <Link to="/about" className="text-teal-600 hover:text-teal-700 underline">About</Link>
        </li>
        <li>
          Explore resources: <Link to="/resources" className="text-teal-600 hover:text-teal-700 underline">Resources</Link>
        </li>
        <li>
          Have questions? <Link to="/contact" className="text-teal-600 hover:text-teal-700 underline">Contact</Link>
        </li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
          alt="Developers collaborating at a hackathon"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
