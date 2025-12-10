// app/articles/content/featured/hackathon-melbourne.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: `Key facts: Hackathon Melbourne`,
  intro: 'A practical 2025 guide to finding, entering, and preparing for Melbourne hackathons.',
  items: [
    { label: 'Where to find events?', description: 'Check university clubs, Humanitix, Eventbrite, Devpost, Meetup, and innovation hubs; most publish 6–8 weeks ahead.' },
    { label: 'Who can join?', description: 'Most welcome students and professionals; some are student-only. Review eligibility, team size, IP, and code of conduct before registering.' },
    { label: 'What to prepare?', description: 'Form a team, shortlist ideas, set up repos, review APIs, and pack hardware. Aim for a demoable MVP and clear pitch.' },
  ],
}

export const faqs: ArticleFAQItem[] = [
  { q: 'What is a hackathon?', a: 'A time-boxed event where teams build prototypes, usually 24–48 hours, judged on impact, innovation, execution, UX, and presentation.' },
  { q: 'How do I find hackathons in Melbourne?', a: 'Check Humanitix, Eventbrite, Devpost, Meetup, university tech clubs, and local innovation hubs. Set alerts; many publish 6–8 weeks out.' },
  { q: 'Do I need to be a coder to join?', a: 'Not always. Designers, product managers, data folks, and domain experts are welcome. Teams benefit from mixed skills.' },
  { q: 'How much does it cost to enter?', a: 'Varies by event: free to roughly $50–$150. Student discounts are common. Check inclusions (meals, merch) before paying.' },
  { q: 'Who owns the IP from a hackathon project?', a: 'Often the team retains IP unless sponsor terms state otherwise. Always read T&Cs and code-of-conduct before registering.' },
  { q: 'What are typical judging criteria?', a: 'Problem fit, novelty, execution quality, user experience, viability, and presentation. Weightings vary by event.' },
  { q: 'What should I bring on the day?', a: 'Laptop, charger, ID, water bottle, snacks, hoodie, and any hardware you plan to use (e.g., microcontrollers, sensors).' },
  { q: 'How big are teams?', a: 'Commonly 3–5 people. Some events allow solo entries or larger teams. Confirm in the event rules.' },
  { q: 'Are hackathons inclusive and safe?', a: 'Most publish a code of conduct and escalation contacts. Choose events with accessible venues and clear reporting processes.' },
  { q: 'Can I use AI tools or pre-existing code?', a: 'Usually yes with disclosure. Net-new code is encouraged; open-source libraries are fine. Follow event and provider terms.' },
]

export default function ArticleBody() {
  return (
    <>
      <p><strong>Hackathon Melbourne</strong> events run throughout the year across universities, coworking spaces, and innovation hubs. To join one, find an event, check eligibility, register early, and prepare a demo-ready project.</p>

      <div className='not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900'>
        <h3 className='m-0 text-base font-semibold text-zinc-900 dark:text-zinc-50'>What you’ll learn</h3>
        <ul className='mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300'>
          <li>Where to discover Melbourne hackathons and when they typically run.</li>
          <li>Eligibility, team size, judging criteria, and IP basics.</li>
          <li>A practical prep checklist for a 24–48 hour build.</li>
          <li>Common mistakes and quick fixes from experienced mentors.</li>
        </ul>
      </div>

      <h2>Where to find hackathons in Melbourne</h2>
      <p>As of 2025, most Melbourne hackathons are announced 6–8 weeks before kickoff. Search across event platforms, developer portals, university clubs, and local innovation hubs, then set calendar and email alerts.</p>

      <div className='not-prose my-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Event platforms</h3>
          <ul className='mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300'>
            <li>Humanitix and Eventbrite: frequent listings with ticketing.</li>
            <li>Meetup: community-run nights and themed sprints.</li>
            <li>Check “Hackathon” filters and enable alerts.</li>
          </ul>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Developer platforms</h3>
          <ul className='mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300'>
            <li>Devpost for in-person/online challenges.</li>
            <li>GitHub and Discord communities for niche calls.</li>
            <li>Company blogs (cloud, fintech, health) for sponsor events.</li>
          </ul>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Universities & clubs</h3>
          <ul className='mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300'>
            <li>University of Melbourne, Monash, RMIT, Swinburne.</li>
            <li>Student societies: CS/IT, entrepreneurship, data science.</li>
            <li>Some events are student-only; bring student ID.</li>
          </ul>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Spaces & hubs</h3>
          <ul className='mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300'>
            <li>Innovation hubs: Melbourne Connect, Stone & Chalk.</li>
            <li>Coworking spaces: The Commons and others.</li>
            <li>Gov/civic tech: look for open-data or climate sprints.</li>
          </ul>
        </div>
      </div>

      <p>Tip: keep a simple tracker (date, theme, venue, team, cost, links). Revisit our <Link to='/articles' className='text-teal-600 hover:text-teal-700 underline'>Articles</Link> hub for new guides and checklists.</p>

      <h2>Eligibility, teams, and registration</h2>
      <h3>Eligibility</h3>
      <p>Most Melbourne hackathons welcome both students and professionals; some are student-only or themed (e.g., health, climate, fintech). Many require participants to be 18+; minors usually need guardian consent.</p>

      <h3>Teams</h3>
      <p>Typical team size is 3–5. Balanced skills win: product, engineering, design, data, and a confident presenter. Use mixers or organiser Slack/Discord to form or join a team.</p>

      <h3>Registration (typical steps)</h3>
      <ol className='list-decimal pl-5'>
        <li>Open the event page and check dates, venue, and schedule.</li>
        <li>Read rules: eligibility, team size, IP, code of conduct.</li>
        <li>Register early; some events cap teams or sell out.</li>
        <li>Join the event Slack/Discord and complete any pre-work.</li>
        <li>Confirm your team and shortlist 1–2 ideas.</li>
        <li>Arrive early with ID; set up power and Wi‑Fi.</li>
      </ol>

      <h2>Deliverables and judging</h2>
      <p>Deliverables vary, but you can expect:</p>
      <ul className='list-disc pl-5'>
        <li>A working demo or recorded walkthrough (3–5 minutes).</li>
        <li>Short pitch deck: problem, solution, demo proof, impact, next steps.</li>
        <li>Repo link with README (how to run, stack, licenses).</li>
      </ul>
      <p>Judging usually weighs problem fit, innovation, execution, user experience, viability, and presentation. If criteria include technical depth or data use, show benchmarks, error handling, and a crisp architecture slide.</p>

      <h2>Preparation checklist (48‑hour edition)</h2>
      <ol className='list-decimal pl-5'>
        <li><strong>Two weeks out:</strong> lock roles, pick a domain, draft success metrics, install SDKs/CLIs, and test your preferred stack.</li>
        <li><strong>One week out:</strong> research users and constraints, shortlist 2 ideas, verify API quotas/keys, line up sample data, and gather UI kits.</li>
        <li><strong>48 hours before:</strong> create repo and branches, add lint/format/test, set CI, prepare a 3‑minute pitch skeleton and a demo script.</li>
        <li><strong>Kickoff:</strong> define an MVP that solves one clear user journey. Timebox sprints (e.g., 45 mins build, 15 mins sync). Ship vertical slices, not components.</li>
        <li><strong>Mid-event:</strong> instrument logs, add loading/error states, capture demo data, and record a backup screencast.</li>
        <li><strong>Pre‑judging:</strong> code freeze, polish the README, rehearse twice, and assign speaking parts (problem, demo, results, ask).</li>
        <li><strong>Post‑event:</strong> publish a retro, tidy issues, decide on licenses/IP, and follow up with mentors or sponsors.</li>
      </ol>

      <div className='not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Common mistake: over-scoping</h3>
          <p className='mt-2 text-sm text-zinc-700 dark:text-zinc-300'>Too many features leads to half-finished demos. Define a single must-have user journey and cut aggressively.</p>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Quick fix</h3>
          <p className='mt-2 text-sm text-zinc-700 dark:text-zinc-300'>Prioritise “demo impact” over breadth. Ship one polished flow with clear metrics.</p>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Common mistake: fragile demo</h3>
          <p className='mt-2 text-sm text-zinc-700 dark:text-zinc-300'>Live demos can break due to Wi‑Fi or API limits.</p>
        </div>
        <div className='rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900'>
          <h3 className='m-0 text-base font-semibold'>Quick fix</h3>
          <p className='mt-2 text-sm text-zinc-700 dark:text-zinc-300'>Record a backup screencast, cache data, and add an offline mode or mock switch.</p>
        </div>
      </div>

      <h2>Budget and logistics (Melbourne)</h2>
      <ul className='list-disc pl-5'>
        <li><strong>Costs:</strong> free to mid-range tickets; check inclusions (meals, merch). Students often get discounts.</li>
        <li><strong>Transport:</strong> plan late finishes; check Myki services and venue access after hours.</li>
        <li><strong>Wellbeing:</strong> pace yourself, hydrate, and take breaks. Many venues provide quiet areas.</li>
        <li><strong>Accessibility:</strong> look for step-free access, accessible bathrooms, and dietary options in the event info.</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>Browse more guides: <Link to='/articles' className='text-teal-600 hover:text-teal-700 underline'>Articles</Link></li>
        <li>Learn about our editorial standards: <Link to='/about' className='text-teal-600 hover:text-teal-700 underline'>About</Link></li>
        <li>Want your event listed? <Link to='/contact' className='text-teal-600 hover:text-teal-700 underline'>Contact</Link> the MLAI team.</li>
      </ul>

      <div className='not-prose my-8'>
        <ImageWithFallback
          src='/images/articles/hackathon-melbourne-hero.jpg'
          alt='Developers collaborating at a hackathon in Melbourne'
          width={1200}
          height={630}
          className='w-full rounded-2xl'
        />
      </div>
    </>
  )
}
