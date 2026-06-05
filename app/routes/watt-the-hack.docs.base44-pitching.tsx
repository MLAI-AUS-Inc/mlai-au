import { Link } from "react-router";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  MegaphoneIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { SidebarLink } from "~/components/watt-the-hack/docs/primitives";

const STEPS = [
  {
    title: "Interview Mentors",
    body: "Talk to the energy experts, AI and tech specialists, designers, and startup veterans in the room. Understand the real pain points in the grid and gather early feedback on your idea.",
  },
  {
    title: "Identify & Define the Problem",
    body: "Use the discovery phase of the Double Diamond (empathise, then define). Zero in on a specific energy challenge that's both impactful and solvable within the hackathon timeline.",
  },
  {
    title: "Ideate & Prototype (Diverge & Converge)",
    body: "Brainstorm a broad range of solutions, then pick the most promising concept to prototype. Keep it simple and focused — an MVP or mockup built with Base44 is enough to bring your vision to life.",
  },
  {
    title: "Test & Iterate",
    body: "Gather feedback from mentors and potential end-users. Refine your solution, making sure it meets a real need and is feasible.",
  },
  {
    title: "Pitch Perfectly",
    body: "Prepare a concise pitch that tells a compelling story: the problem you're solving, who benefits, how your solution works, and why it's better than what exists today.",
  },
];

const MENTORS = [
  { label: "Energy & grid experts", body: "who understand the power system, networks, markets, and where the real bottlenecks sit." },
  { label: "AI & tech specialists", body: "who know the best tools, platforms, models, and how to ship fast with Base44." },
  { label: "Design gurus", body: "who can help you craft user-friendly, visually compelling solutions." },
  { label: "Startup veterans", body: "who've walked the walk when it comes to pitching, scaling, and launching new ideas." },
];

// Same six criteria and weights as the MedHack pitching rubric, reworded for energy + AI.
const CRITERIA = [
  { name: "Innovation", description: "Does the solution offer a genuinely new or significantly improved approach to an energy or grid problem compared with what already exists?", max: 5 },
  { name: "Usefulness (User Needs)", description: "Does it truly address the needs of the user, and does it solve a large, meaningful problem in the energy transition?", max: 10 },
  { name: "Viability", description: "Is it scalable, cost-effective, and realistic for households, networks, or the grid to adopt?", max: 10 },
  { name: "Technical Feasibility", description: "Is what the team built technically credible, and is their future vision technically achievable?", max: 10 },
  { name: "Business Readiness", description: "Does it have a clear value proposition and the potential to be implemented, funded, or commercialised?", max: 10 },
  { name: "Sustainability", description: "Will it minimise long-term environmental impact and stand the test of time?", max: 5 },
];

const PITCH_TIMELINE = [
  { time: "5:00 PM", label: "Submissions for the pitching track open — semifinals." },
  { time: "7:45 PM", label: "The most promising teams pitch live to the judges." },
  { time: "8:30 PM", label: "Winners announced." },
];

const JUDGES = [
  { name: "David Gilmore", org: "MLAI" },
  { name: "Mat Brennan", org: "Amber Electric" },
  { name: "Doron Bahar", org: "Base44" },
  { name: "Julian Featherston", org: "HAL Systems" },
];

export default function Base44PitchingDocs() {
  const totalScore = CRITERIA.reduce((sum, c) => sum + c.max, 0);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <aside className="hidden w-52 shrink-0 lg:block">
        <nav className="sticky top-6 flex flex-col gap-1 rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-sm backdrop-blur">
          <h4 className="mb-1 px-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">On this page</h4>
          <SidebarLink href="#about" icon={<InformationCircleIcon className="h-4 w-4" />}>What it is</SidebarLink>
          <SidebarLink href="#how-to-win" icon={<TrophyIcon className="h-4 w-4" />}>How to Win</SidebarLink>
          <SidebarLink href="#mentors" icon={<UserGroupIcon className="h-4 w-4" />}>Mentors</SidebarLink>
          <SidebarLink href="#criteria" icon={<ClipboardDocumentCheckIcon className="h-4 w-4" />}>Judging Criteria</SidebarLink>
          <SidebarLink href="#the-pitch" icon={<MegaphoneIcon className="h-4 w-4" />}>The Pitch</SidebarLink>
          <SidebarLink href="#final" icon={<SparklesIcon className="h-4 w-4" />}>Final Words</SidebarLink>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-10 pb-12">
        <section id="introduction" className="scroll-mt-24">
          <div className="rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-sky-50/40 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Watt The Hack · 6 June 2026</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Base44 Pitching Track</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              Feeling ambitious? Ready to dive into a real-world energy challenge and come up with a solution —
              software, hardware, process, or otherwise? This track is less about raw coding and more about insight,
              teamwork, and a sharp pitch. Bonus: there&apos;s a big prize at the end.
            </p>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">What&apos;s This All About?</h2>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-muted">
              In the Base44 Pitching Track, you and your team will identify a real energy challenge, brainstorm a
              solution, build a small demo or MVP — moving fast with Base44 and the AI tools on hand — and then pitch
              your idea to our panel of judges on the Saturday evening of the hackathon. Don&apos;t let the word
              &quot;pitching&quot; fool you: it&apos;s less about how much code you write and more about insight,
              teamwork, and a compelling story.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Remember: your solution can be anything. It could be a consumer energy app, a smarter way to manage a
              household or neighbourhood&apos;s power, a grid or market mechanism, a hardware concept, or any other idea
              that tackles a real problem in Australia&apos;s energy system. As long as it addresses a genuine user need
              and meets the judging criteria, you&apos;ll score well.
            </p>
          </div>
        </section>

        <section id="how-to-win" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">How to Win the Pitching Track</h2>
            <p className="mt-1 text-sm text-muted">
              This follows the <strong>Double Diamond</strong> framework — Discover, Define, Develop, Deliver. Understand
              the problem deeply, explore many ideas, then refine down to the solution with the biggest impact.
            </p>
          </div>
          <ol className="space-y-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-extrabold text-emerald-700">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="mentors" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Mentors: Your Secret Weapons</h2>
            <p className="mt-1 text-sm text-muted">
              We have mentors ready to help you, from across the energy, AI, and startup worlds:
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
            <ul className="space-y-3">
              {MENTORS.map((mentor) => (
                <li key={mentor.label} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>
                    <strong className="text-ink">{mentor.label}</strong> {mentor.body}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Tap into their expertise! Ask questions, refine your idea, and let them poke holes in your plan — so your
              final pitch is stronger than ever.
            </p>
          </div>
        </section>

        <section id="criteria" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Judging Criteria</h2>
            <p className="mt-1 text-sm text-muted">
              Your pitch is assessed across {CRITERIA.length} categories totalling {totalScore} points. Not all criteria
              are weighted equally.
            </p>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white px-5 py-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-300 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Category</th>
                    <th className="py-2 pr-4 font-semibold">What the judges look for</th>
                    <th className="py-2 font-semibold text-right">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((criterion) => (
                    <tr key={criterion.name} className="border-t border-slate-200 align-top">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{criterion.name}</td>
                      <td className="py-2 pr-4 text-slate-700">{criterion.description}</td>
                      <td className="py-2 text-right font-semibold tabular-nums text-emerald-700">/{criterion.max}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-300 align-top">
                    <td className="py-2 pr-4 font-extrabold text-slate-900">Total</td>
                    <td className="py-2 pr-4" />
                    <td className="py-2 text-right font-extrabold tabular-nums text-emerald-700">/{totalScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Scores between semifinal judges are normalised to ensure fairness across judging panels.
            </p>
          </div>
        </section>

        <section id="the-pitch" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">The Pitch</h2>
            <p className="mt-1 text-sm text-muted">
              The Base44 Pitching Track culminates on the Saturday evening of Watt The Hack (6 June 2026). We&apos;ll give
              you resources on how to craft your pitch, so even if you&apos;ve never done one, no worries.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
            <ul className="space-y-2.5">
              {PITCH_TIMELINE.map((slot) => (
                <li key={slot.time} className="flex items-start gap-4 text-sm">
                  <span className="w-20 shrink-0 font-semibold tabular-nums text-emerald-700">{slot.time}</span>
                  <span className="leading-relaxed text-muted">{slot.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Judging panel</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {JUDGES.map((judge) => (
                <div key={judge.name} className="rounded-xl border border-line bg-surface px-4 py-3 shadow-sm">
                  <p className="font-semibold text-ink">{judge.name}</p>
                  <p className="text-sm text-muted">{judge.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="final" className="scroll-mt-24 space-y-4">
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-emerald-950">Big prize, bigger impact</h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-950">
              The Base44 Pitching Track has a real prize at stake, but the bigger win is creating a solution that could
              genuinely help households, networks, and Australia&apos;s energy transition. Think outside the box, lean on
              your team, and show us what you&apos;ve got. If you love brainstorming solutions and creating real-world
              impact, this is your track.
            </p>
            <div className="mt-5">
              <Link
                to="/articles/featured/how-to-pitch-your-idea"
                className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                Learn How to Pitch Your Idea
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
