// app/articles/content/featured/hackathon-melbourne.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: Hackathon Melbourne',
  intro:
    'Melbourne hosts regular public, student, and corporate hackathons across universities, community spaces, and startups year‑round.',
  items: [
    {
      label: 'Where to find listings?',
      description:
        'Check Humanitix, Eventbrite, university tech clubs, Hackathons.com.au, and Devpost for Melbourne‑based events.',
    },
    {
      label: 'Do I need to be a coder?',
      description:
        'Not always. Teams welcome designers, product, data, and domain experts. Read each event’s eligibility rules.',
    },
    {
      label: 'What do judges look for?',
      description:
        'Problem–solution fit, working demo, feasibility, teamwork, and clear storytelling. Many score impact, innovation, and execution.',
    },
  ],
}

export const faqs: ArticleFAQItem[] = [
  {
    q: 'Where can I find hackathon Melbourne events?',
    a: 'Browse Humanitix, Eventbrite, Hackathons.com.au, Devpost, and university tech societies. Always confirm dates and rules on the organiser’s page.',
  },
  {
    q: 'Do I need a team before registering?',
    a: 'Usually no. Many events run team‑forming icebreakers. Solo registration is common unless the event explicitly requires pre‑formed teams.',
  },
  {
    q: 'How long do hackathons run?',
    a: 'Common formats are 6–8 hour sprints, overnight hack nights, or 24–48 hour weekend events. Some run multi‑week online phases.',
  },
  {
    q: 'What should I bring to a hackathon?',
    a: 'Laptop, charger, adapters, ID, water bottle, snacks, repo templates, API keys, and any accessibility items you need. Check venue power and Wi‑Fi details.',
  },
  {
    q: 'Who owns the IP from a hackathon project?',
    a: 'It varies. Many community events let teams keep IP; some sponsors require licences. Read the terms and ask organisers if unclear.',
  },
  {
    q: 'How are projects judged?',
    a: 'Typically on problem clarity, impact, innovation, execution, demo quality, and teamwork. Some events publish a scoring rubric in advance.',
  },
  {
    q: 'Are there beginner‑friendly hackathons in Melbourne?',
    a: 'Yes. Student and community hackathons often welcome beginners and provide mentors. Look for “intro”, “student”, or “first‑timer friendly” tags.',
  },
  {
    q: 'How much does it cost to enter?',
    a: 'Many are free or low‑cost. Corporate or charity events may charge a ticket. Student discounts and scholarships are common—check the listing.',
  },
  {
    q: 'What tools should I prepare in advance?',
    a: 'Git, a repo template, editor, SDKs, API keys, a design tool, and a simple pitch deck template. Test your dev environment before the event.',
  },
]

export default function ArticleBody() {
  return (
    <>
      <p>
        Searching for <strong>hackathon Melbourne</strong> events? You can usually find current
        listings on Humanitix, Eventbrite, university tech clubs, Hackathons.com.au, and Devpost.
        Below is exactly how to pick an event, prepare, and present with confidence.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[oklch(0.205_0_0)]">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          What you’ll learn
        </h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Where to find Melbourne hackathon listings that are actually active</li>
          <li>Typical formats, eligibility, costs, and what to expect on the day</li>
          <li>How judges score projects and how to tailor your demo</li>
          <li>Step‑by‑step prep and a practical packing checklist</li>
          <li>Local communities and spaces to meet future teammates</li>
        </ul>
      </div>

      <h2>The Melbourne hackathon scene at a glance</h2>
      <p>
        Melbourne’s hackathon ecosystem blends university clubs, community groups, startup hubs, and
        corporate innovation programs. Themes range from civic tech and sustainability to fintech,
        health, AI, and data. Events run year‑round; peak periods often align with uni semesters and
        major tech conferences. Details vary by organiser, so always check the current listing.
      </p>
      <p>
        If you’re new, browse our other guides on project planning and collaboration in{' '}
        <Link to="/articles" className="text-teal-600 hover:text-teal-700">
          Articles
        </Link>
        . You can also{' '}
        <Link to="/subscribe" className="text-teal-600 hover:text-teal-700">
          subscribe
        </Link>{' '}
        to get future guides.
      </p>

      <h2>Where to find upcoming events</h2>
      <p>
        Reliable sources include Humanitix and Eventbrite (search “hackathon Melbourne”),
        Hackathons.com.au (national directory), Devpost (global challenges that sometimes anchor in
        Melbourne), and announcements from university societies (e.g., UniMelb, Monash, RMIT tech
        clubs) and startup hubs. Social channels like LinkedIn and Meetup can surface niche themes.
      </p>
      <ul>
        <li>Ticketing: look for capacity limits, refund policies, and accessibility notes.</li>
        <li>Theme and scope: check required tech stacks or API partners before buying tickets.</li>
        <li>Eligibility: some events are student‑only or require corporate affiliation.</li>
        <li>Hybrid/online options: helpful if you’re remote or time‑constrained.</li>
      </ul>

      <h2>Formats, eligibility, and costs</h2>
      <h3>Common formats</h3>
      <ul>
        <li>
          Sprint (6–10 hours): great for beginners; emphasis on rapid ideation and a short demo.
        </li>
        <li>Classic weekend (24–48 hours): the most common, with pitches and prizes.</li>
        <li>
          Multi‑week challenges: asynchronous building, periodic check‑ins, and a final showcase.
        </li>
      </ul>
      <h3>Eligibility and team rules</h3>
      <ul>
        <li>Open community vs student‑only vs corporate internal events.</li>
        <li>
          Team size caps are typical (e.g., 3–5). Many allow solo builds but recommend collaboration.
        </li>
        <li>
          Code freshness rules: most events allow pre‑event libraries but require new work towards the
          challenge during the event.
        </li>
      </ul>
      <h3>Costs</h3>
      <p>
        Many community and student hackathons are free or low‑cost. Corporate or charity events may
        have ticket fees. Sponsors often provide food; travel is usually self‑funded. Student
        discounts or scholarships are common—check the listing.
      </p>

      <h2>What judges look for</h2>
      <p>
        Organisers typically publish a rubric. Even when they don’t, you can plan around these core
        signals: problem clarity, impact, innovation, execution, demo quality, and teamwork.
      </p>
      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <th className="border border-zinc-200 px-3 py-2 text-left font-semibold dark:border-[rgba(255,255,255,0.1)]">
                Criterion
              </th>
              <th className="border border-zinc-200 px-3 py-2 text-left font-semibold dark:border-[rgba(255,255,255,0.1)]">
                What to demonstrate
              </th>
              <th className="border border-zinc-200 px-3 py-2 text-left font-semibold dark:border-[rgba(255,255,255,0.1)]">
                Tip
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Problem fit
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                A clear user and pain point grounded in evidence.
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Lead with the user story before features.
              </td>
            </tr>
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Innovation
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                A novel approach or clever mash‑up of existing tech.
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Explain why now and why this approach.
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Execution
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                A functioning demo or compelling prototype.
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Cut scope; ship a core path end‑to‑end.
              </td>
            </tr>
            <tr className="bg-zinc-50 dark:bg-zinc-900">
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Impact
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Measurable value for users, community, or business.
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                State assumptions; outline next steps to pilot.
              </td>
            </tr>
            <tr>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Storytelling
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                A concise narrative and clear roles in the team.
              </td>
              <td className="border border-zinc-200 px-3 py-2 dark:border-[rgba(255,255,255,0.1)]">
                Rehearse a 3–5 minute pitch with a live demo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Step‑by‑step: join your first Melbourne hackathon</h2>
      <ol>
        <li>
          Pick a theme you care about (e.g., climate, health, fintech). Passion helps when time is
          short.
        </li>
        <li>
          Confirm logistics: venue address, accessibility, power, Wi‑Fi, and ticket requirements.
        </li>
        <li>
          Prepare your tooling: Git, a clean repo template, editor extensions, SDKs, and API keys.
        </li>
        <li>
          Draft a one‑page problem brief and a demo storyboard. Decide success in one sentence.
        </li>
        <li>
          At team‑forming, introduce your strengths succinctly. Aim for complementary roles.
        </li>
        <li>
          Build the narrowest end‑to‑end slice first. Keep stretch goals on a separate list.
        </li>
        <li>
          Rehearse the pitch with a timer. Prioritise a live demo over slides.
        </li>
      </ol>

      <h2>Practical checklist</h2>
      <ul>
        <li>Laptop, charger, power board, USB‑C/HDMI adapters, and a backup hotspot.</li>
        <li>Water bottle, snacks, comfortable clothing, any medications, and earplugs.</li>
        <li>GitHub/GitLab access, repo template, design tool, pitch deck template.</li>
        <li>API keys and sample data where allowed by the rules.</li>
        <li>Respect the code of conduct; look for the organiser’s safety contacts.</li>
      </ul>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Over‑scoping the build and shipping multiple unfinished features.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Cut scope to a single end‑to‑end path that proves value. Demo that path live.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Ignoring judging criteria until the last minute.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[oklch(0.205_0_0)]">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Map your demo to the rubric: problem, impact, novelty, execution, and teamwork.
          </p>
        </div>
      </div>

      <h2>Local communities and spaces</h2>
      <p>
        Keep an eye on university tech societies (UniMelb, Monash, RMIT), language‑specific meetups
        (e.g., JavaScript, Python, Data), and startup hubs and co‑working spaces. Many host
        hackathons, hack nights, or pitch showcases that welcome newcomers.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link to="/articles">Articles</Link>
        </li>
        <li>
          Get templates and resources: <Link to="/resources">Resources</Link>
        </li>
        <li>
          Stay in the loop: <Link to="/subscribe">Subscribe</Link>
        </li>
        <li>
          Questions about this guide? <Link to="/contact">Contact</Link>
        </li>
        <li>
          Learn about MLAI’s mission: <Link to="/about">About</Link>
        </li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="/images/articles/hackathon-melbourne-hero.jpg"
          alt="Developers collaborating at a Melbourne hackathon with laptops and sticky notes."
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
