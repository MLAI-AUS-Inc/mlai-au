import {
  BoltIcon,
  CpuChipIcon,
  HomeModernIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { ComponentCard, ConstraintRow, SidebarLink } from "~/components/watt-the-hack/docs/primitives";

// Content mirrors the live Smart Home mechanics:
//   app/lib/smart-home-pipeline.ts (PIPELINE + PALETTE), app/lib/smart-home-progression.ts (stages),
//   app/components/SmartHomeStatusBar.tsx (scoring), app/components/SmartHomeShop.tsx (shop).

const STAGES = [
  { day: "Day 1", title: "Light switch", body: "You start simple: flip devices like the Bathroom Light and Living Room Lights on and off directly, and deploy them to your house." },
  { day: "Day 6", title: "Actions + Outputs", body: "Your first automation pipeline unlocks. Wire an Action to an Output so your home reacts on its own." },
  { day: "Day 16", title: "+ Schedule", body: "Add a Schedule so your automation fires at the right time — off-peak hours, weekends, or cheap-price windows." },
  { day: "Day 26", title: "+ Brain + Inputs (full board)", body: "The complete SENSE → THINK → ACT board unlocks: Inputs, Schedule, Brain, Actions, Outputs, and an optional Safety block." },
];

const PIPELINE = [
  {
    slot: "Inputs",
    phase: "SENSE",
    req: "Add 1–3",
    hint: "The sensors your controller reads each tick.",
    blocks: [
      ["Smart Meter", "Live household power draw."],
      ["Temperature Sensor", "Indoor & outdoor temperature."],
      ["Weather Forecast", "Sun & temperature outlook."],
    ],
  },
  {
    slot: "Schedule",
    phase: "SENSE",
    req: "Pick 1",
    hint: "When the controller is allowed to act.",
    blocks: [
      ["Time of Day", "Act against the clock (off-peak)."],
      ["Day of Week", "Weekday vs weekend patterns."],
      ["Price Signal", "React to cheap / expensive power."],
    ],
  },
  {
    slot: "Brain",
    phase: "THINK",
    req: "Pick 1",
    hint: "The AI policy engine that decides what to do — pick one.",
    blocks: [
      ["ChatGPT", "OpenAI policy brain."],
      ["Claude", "Anthropic policy brain."],
      ["Gemini", "Google policy brain."],
    ],
  },
  {
    slot: "Actions",
    phase: "ACT",
    req: "Add 1–3",
    hint: "The strategy your home applies.",
    blocks: [
      ["Shift Load", "Move usage to cheaper / greener times."],
      ["Reduce Usage", "Cut consumption where comfort allows."],
      ["Charge Battery", "Store cheap / solar energy."],
    ],
  },
  {
    slot: "Outputs",
    phase: "ACT",
    req: "Add 1–3",
    hint: "The devices your actions drive.",
    blocks: [
      ["Smart Plugs", "Appliances & lights."],
      ["Battery System", "Home battery dispatch."],
      ["EV Charger", "Electric-vehicle charging."],
    ],
  },
  {
    slot: "Safety & Override",
    phase: "GUARD",
    req: "Optional",
    hint: "Guardrails on top of the loop.",
    blocks: [
      ["Manual Override", "You can always take control."],
      ["Max Budget Guard", "Never exceed a daily spend."],
    ],
  },
];

const SCORE_METRICS = [
  { label: "Energy", unit: "kWh", body: "How much power your home draws. Lower is better.", icon: "⚡" },
  { label: "Carbon", unit: "kg", body: "Emissions from that energy. Shift to greener windows to cut it.", icon: "🌍" },
  { label: "Comfort", unit: "Mood %", body: "How happy the household is. Cut too hard and mood drops.", icon: "🙂" },
  { label: "Money", unit: "$", body: "Your savings. A resource, not the score — but don't let it run dry.", icon: "💰" },
];

export default function SmartHomeDocs() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <aside className="hidden w-52 shrink-0 lg:block">
        <nav className="sticky top-6 flex flex-col gap-1 rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-sm backdrop-blur">
          <h4 className="mb-1 px-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">On this page</h4>
          <SidebarLink href="#about" icon={<InformationCircleIcon className="h-4 w-4" />}>What it is</SidebarLink>
          <SidebarLink href="#how-it-works" icon={<HomeModernIcon className="h-4 w-4" />}>How it works</SidebarLink>
          <SidebarLink href="#the-board" icon={<CpuChipIcon className="h-4 w-4" />}>The board</SidebarLink>
          <SidebarLink href="#scoring" icon={<TrophyIcon className="h-4 w-4" />}>Scoring</SidebarLink>
          <SidebarLink href="#shop" icon={<ShoppingBagIcon className="h-4 w-4" />}>Upgrade shop</SidebarLink>
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-10 pb-12">
        <section id="introduction" className="scroll-mt-24">
          <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Beginner track · sponsored by Amber Electric</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Amber Electric — Smart Home</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              The beginner-friendly track — no code required. You run a real smart home in the simulator and build its
              automation with drag-and-drop blocks. Just like Amber Electric passes real wholesale electricity prices
              through to your home, this track rewards shifting your energy use to cheaper, greener times of day.
            </p>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">What&apos;s This All About?</h2>
            <p className="mt-1 text-sm text-muted">
              Build your home&apos;s behaviour visually, hit <strong>Deploy</strong>, and watch your house react in the
              live view above the editor. Redeploy any time to refine your strategy.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ComponentCard title="Run a real simulated home" icon={<HomeModernIcon className="h-5 w-5 text-emerald-600" />} bgColor="bg-emerald-50">
              Start by switching devices like the Bathroom Light and Living Room Lights on and off, then graduate to
              automating them. The campaign runs on a shared clock, so your home keeps living between visits.
            </ComponentCard>
            <ComponentCard title="Pick an AI brain, not a keyboard" icon={<CpuChipIcon className="h-5 w-5 text-violet-600" />} bgColor="bg-violet-50">
              Drag blocks to wire up a SENSE → THINK → ACT pipeline and choose an AI brain — ChatGPT, Claude, or Gemini —
              to run it. New block types unlock as the campaign progresses, so you&apos;re never overwhelmed on day one.
            </ComponentCard>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">How It Works</h2>
            <p className="mt-1 text-sm text-muted">
              The track runs as a 46-day campaign. Capabilities unlock in stages, so your board grows with you.
            </p>
          </div>
          <ol className="space-y-3">
            {STAGES.map((stage, index) => (
              <li key={stage.title} className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-extrabold text-amber-700">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-semibold text-ink">{stage.title}</p>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-amber-700">{stage.day}</span>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="the-board" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">The Board</h2>
            <p className="mt-1 text-sm text-muted">
              At the full stage your controller is a left-to-right pipeline of six slots. Fill the required slots and hit
              Deploy — your home runs the loop every tick.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PIPELINE.map((slot) => (
              <div key={slot.slot} className="rounded-xl border border-line bg-surface p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink">{slot.slot}</h3>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="rounded-md bg-subtle px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">{slot.phase}</span>
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">{slot.req}</span>
                  </div>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{slot.hint}</p>
                <ul className="mt-2.5 space-y-1.5">
                  {slot.blocks.map(([name, blurb]) => (
                    <li key={name} className="text-[13px] leading-snug text-muted">
                      <span className="font-semibold text-ink">{name}</span> — {blurb}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ConstraintRow title="Deploy gating & compatibility">
            You can only deploy once every required slot is filled (Inputs, Schedule, Brain, an Action, and an Output;
            Safety is optional). Not every pairing works — e.g. <strong>Charge Battery</strong> needs the{" "}
            <strong>Battery System</strong> output, not Smart Plugs. Mismatches give you puzzle-style feedback so you can
            fix them, and a price-aware Schedule turns your battery into smart peak-shaving.
          </ConstraintRow>
        </section>

        <section id="scoring" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Scoring</h2>
            <p className="mt-1 text-sm text-muted">
              Your goal: run the smartest, cheapest, happiest home — survive the campaign, then beat your record. A live
              <strong> Score</strong> and your <strong>Day&nbsp;X / 46</strong> sit at the top of the house view.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SCORE_METRICS.map((metric) => (
              <ComponentCard key={metric.label} title={`${metric.label} (${metric.unit})`} icon={<span className="text-lg leading-none">{metric.icon}</span>} bgColor="bg-amber-50">
                {metric.body}
              </ComponentCard>
            ))}
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-5">
            <h3 className="text-base font-bold text-emerald-950">What actually moves your Score</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-950">
              <strong>Energy, carbon and comfort drive your Score</strong> — use less power, keep it green, and keep the
              household happy. The best runs do all three at once: shift heavy loads into cheap, low-carbon windows
              instead of just switching things off.
            </p>
          </div>
          <ConstraintRow title="Don't let the money run dry" tone="warning">
            Money is a resource you manage in the house, not part of the Score directly — but if you let it run low,{" "}
            <strong>the family starts selling things off</strong>. Keep the bills under control so you can keep investing
            in upgrades.
          </ConstraintRow>
        </section>

        <section id="shop" className="scroll-mt-24 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Upgrade Shop</h2>
            <p className="mt-1 text-sm text-muted">Spend your savings on permanent upgrades.</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-muted">
              Run your home efficiently and you bank savings. Spend them in the shop on permanent upgrades that make your
              home cheaper, greener, and smarter to run. The catalogue opens up as your campaign rolls on — new upgrades
              unlock day by day — and anything you can&apos;t afford yet stays locked until you&apos;ve saved enough, with
              the exact price shown so you know what to aim for. Check the in-app shop for the upgrades available today.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
