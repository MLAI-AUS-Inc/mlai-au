import type { ReactNode } from "react";
import type { Route } from "./+types/watt-the-hack.resources";
import { redirect } from "react-router";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { wattClasses } from "~/lib/watt-theme";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

const TOC = [
  { id: "brief", label: "Brief" },
  { id: "organisers", label: "Organisers" },
  { id: "event", label: "The Event" },
  { id: "learning", label: "Learning Goals" },
  { id: "challenges", label: "Challenge Areas" },
  { id: "logistics", label: "Venue & Logistics" },
  { id: "schedule", label: "Session Schedule" },
  { id: "how-it-works", label: "How It Works" },
  { id: "systems", label: "Game Systems" },
  { id: "criteria", label: "Success Criteria" },
  { id: "facilitation", label: "Facilitation" },
  { id: "conduct", label: "Code of Conduct" },
  { id: "policies", label: "Policies" },
  { id: "contact", label: "Contact" },
] as const;

const FACTS = [
  { label: "Format", value: "Classroom energy-transition simulation" },
  { label: "Student role", value: "Junior Grid Advisor" },
  { label: "Session length", value: "125 minutes, teacher-paced" },
  { label: "Core play", value: "Household -> neighbourhood -> state" },
  { label: "Group size", value: "Tables of 4-6 students" },
  { label: "Devices", value: "iPads or school laptops, WebGL build" },
] as const;

const ORGANISERS = [
  {
    name: "MLAI",
    body: "MLAI is building the Watt The Hack experience as a practical, hands-on way for students to explore AI, simulation, data and systems thinking. The goal is to make the energy transition feel concrete: students can see how small household decisions, shared neighbourhood action and state-level policy choices interact over time.",
  },
  {
    name: "Monash Tech School / Supersystems",
    body: "Watt The Hack is designed for the Supersystems learning environment. The session uses a classroom-friendly mix of iPad gameplay, table discussion, whole-class voting, facilitator prompts and reflection, so students are not just trying to win a game; they are gathering evidence for better energy decisions.",
  },
] as const;

const LEARNING_GOALS = [
  "Explain the energy transition as something already happening, not a distant future event.",
  "Describe trade-offs between carbon impact, household funds and house mood or convenience.",
  "Compare household actions with neighbourhood cooperation and state-level policy levers.",
  "Use data, bill-style readouts and source tooltips to justify decisions.",
  "Recognise the jobs and pathways behind upgrades, policies and grid infrastructure.",
  "Reflect on different valid strategies, including high-comfort or high-carbon play-throughs, without treating them as automatic failures.",
] as const;

const CHALLENGES = [
  {
    title: "Household Habits",
    tag: "chapter 1",
    body: "Students begin with a short questionnaire, choose two starter house rules, and learn how chores and everyday behaviour affect energy use, money and family mood.",
  },
  {
    title: "Upgrade Decisions",
    tag: "chapter 1-2",
    body: "Students weigh practical upgrades such as LED bulb packs, smart plugs, programmable thermostats, insulation, solar PV and efficient appliances.",
  },
  {
    title: "Neighbourhood Cooperation",
    tag: "chapter 2",
    body: "Tables pool funds, vote on shared projects, help neighbours recover from events and decide whether collective spending is worth the trade-off.",
  },
  {
    title: "Weather & Resilience",
    tag: "chapter 2-3",
    body: "Heatwaves, gales, cloudy days and grid shocks test whether earlier choices made the household and neighbourhood more resilient.",
  },
  {
    title: "State-Level Policy",
    tag: "chapter 3",
    body: "The class compares evidence and votes on a larger policy option, showing that household action is only one part of the system.",
  },
  {
    title: "Evidence & Pitch",
    tag: "wrap-up",
    body: "Students export or review scorecards and explain which choices gave the biggest benefit, which trade-offs felt fair and what they would try next.",
  },
] as const;

const LOGISTICS = [
  {
    label: "Venue",
    value: "Monash Tech School / Supersystems classroom space",
  },
  {
    label: "Hardware target",
    value: "iPad Air 5th gen as the baseline device; iPad Pro 11-inch and school laptops supported where available.",
  },
  {
    label: "Teacher controls",
    value: "A lightweight teacher page advances the current day, opens chapter transitions, triggers votes and manages reflection prompts.",
  },
  {
    label: "Student setup",
    value: "Students play individually or in table groups, then compare outcomes with their table and the full class.",
  },
  {
    label: "Accessibility",
    value: "Plain-English labels, icon support, staged choice unlocks, readable gauges and colour-blind-aware contrast should be preserved in implementation.",
  },
] as const;

const SCHEDULE = [
  {
    time: "0-10 min",
    title: "Introduction & role briefing",
    body: "Teacher frames students as Junior Grid Advisors. Students learn the three gauges: Carbon, Funds and House Mood.",
  },
  {
    time: "10-20 min",
    title: "Device setup & household questionnaire",
    body: "Students load the simulation, answer a short household questionnaire and select two starter house rules.",
  },
  {
    time: "20-35 min",
    title: "Chapter 1 - Household",
    body: "Students manage chores, respond to family requests and make their first upgrades. The focus is cause-and-effect feedback.",
  },
  {
    time: "35-50 min",
    title: "Table debrief & policy cards",
    body: "Tables compare strategies, collect physical or projected policy cards and prepare for neighbourhood-level decisions.",
  },
  {
    time: "50-65 min",
    title: "Chapter 2 - Neighbourhood",
    body: "Students set pool donations, vote on shared projects and experience cooperative events such as Good-Samaritan repairs or community boosts.",
  },
  {
    time: "65-80 min",
    title: "Class debrief & evidence check",
    body: "The facilitator compares neighbourhood outcomes and prompts students to connect evidence to larger system choices.",
  },
  {
    time: "80-95 min",
    title: "Chapter 3 - State",
    body: "The whole class votes on a major policy. A grid or weather shock tests the resilience of each strategy.",
  },
  {
    time: "95-115 min",
    title: "Reflection, scorecards & pitch prep",
    body: "Students review exports, badges and bill-style summaries, then prepare a short explanation of their best decision and biggest trade-off.",
  },
  {
    time: "115-125 min",
    title: "Wrap, discussion & buffer",
    body: "Teacher runs the final discussion: what changed carbon most, what protected mood, what saved funds, and what only worked at system scale?",
  },
] as const;

const CHAPTERS = [
  {
    title: "1. Household",
    eyebrow: "solo or paired play",
    body: "Start small. Students choose two house rules, watch the family go through a day, perform quick chores and buy early upgrades. The game should ease them in with minimal tutorial text and very obvious gauge changes.",
    items: [
      "Two starter house rules only",
      "Chores such as turning lights off, closing blinds or power-cycling devices",
      "Parent income arrives every in-game day",
      "Family members plead for comfort, convenience and spending choices",
    ],
  },
  {
    title: "2. Neighbourhood",
    eyebrow: "table-scale cooperation",
    body: "Students now see that individual optimisation is not enough. Tables compare outcomes, pool resources and vote on actions that may help everyone, even if they ask some households to give something up.",
    items: [
      "Pool donation slider",
      "Community BBQ or mood boosts",
      "Community battery, resilience or repair votes",
      "Good-Samaritan moments that reward cooperation without forcing it",
    ],
  },
  {
    title: "3. State",
    eyebrow: "whole-class system view",
    body: "The class makes one big decision together. Students use their household and neighbourhood results as evidence, then experience how a policy or grid event affects everyone differently.",
    items: [
      "Whole-class vote",
      "Policy options framed neutrally, not by party",
      "Grid shock, heatwave or quake event",
      "Final comparison across carbon, funds, mood and resilience",
    ],
  },
] as const;

const SYSTEMS = [
  {
    title: "Gauges",
    body: "The three core metrics are Carbon, Funds and House Mood. Every action should visibly flash the relevant change so students understand why a decision mattered.",
  },
  {
    title: "Chores",
    body: "Chores are short interventions while the family goes about its day. They should feel useful but not mandatory: a student can ignore some chores and still have a meaningful run.",
  },
  {
    title: "House Rules",
    body: "Students start with two rules. Rules can prioritise comfort, carbon or cost, and additional rules may unlock later so early play does not feel overwhelming.",
  },
  {
    title: "Upgrades",
    body: "Upgrade options are staged. Early examples include LED bulb packs and smart plugs; later options can include thermostats, insulation, solar PV and batteries.",
  },
  {
    title: "Events",
    body: "Weather and grid events create pressure without secretly punishing students. A high-carbon, high-comfort strategy can still succeed on mood and funds; the debrief surfaces the consequences.",
  },
  {
    title: "Evidence",
    body: "Scorecards, bill-style summaries and source tooltips help students defend their choices and connect gameplay to real-world energy systems.",
  },
] as const;

const EXAMPLE_CHOICES = [
  {
    type: "Chore",
    examples: "Flick halogen lights off; close blinds; power-cycle PlayStation; shut bedroom fan",
    tradeoff: "Small carbon and energy saving; tiny mood cost; uses player attention",
  },
  {
    type: "House rule",
    examples: "Short showers; lights-off discipline; cold-wash laundry; long hot shower; tumble-dryer every load",
    tradeoff: "Can optimise for carbon, funds or comfort depending on the student's strategy",
  },
  {
    type: "Upgrade",
    examples: "LED bulb pack; smart plugs; programmable thermostat; roof insulation; solar PV",
    tradeoff: "Up-front spending for different carbon, bill and resilience outcomes",
  },
  {
    type: "Shared policy",
    examples: "Community battery; pooled repairs; BBQ mood boost; wind-farm investment; fuel-tax rebate",
    tradeoff: "Benefits may be shared unevenly, which creates useful discussion",
  },
] as const;

const CRITERIA = [
  {
    name: "Carbon Impact",
    maxScore: 10,
    description: "How well does the strategy reduce or explain carbon impact over the session?",
    high: "Clear reduction pathway, good use of staged upgrades and accurate reflection on what made the biggest difference.",
    medium: "Some meaningful reductions, but the student cannot fully explain which choices mattered most.",
    low: "Little attention to carbon, or claims impact without evidence from the scorecard or bill readout.",
  },
  {
    name: "Funds Management",
    maxScore: 10,
    description: "How well does the strategy manage money, upgrades, bills and daily income?",
    high: "Strong trade-off decisions, sensible timing and clear explanation of short-term versus long-term costs.",
    medium: "Mostly sensible spending, with some missed opportunities or unclear reasoning.",
    low: "Spending choices feel random, or the student cannot connect purchases to later outcomes.",
  },
  {
    name: "House Mood & Stakeholder Fit",
    maxScore: 10,
    description: "How well does the strategy account for the family's needs, comfort and requests?",
    high: "Balances comfort with constraints and can explain why some high-mood choices were worth it.",
    medium: "Responds to some family needs, but treats mood as secondary or inconsistent.",
    low: "Ignores the household experience or frames comfort as automatically wrong.",
  },
  {
    name: "Systems Thinking",
    maxScore: 10,
    description: "How well does the student connect household, neighbourhood and state-level decisions?",
    high: "Uses evidence from all three chapters and recognises that different levers work at different scales.",
    medium: "Understands multiple scales but focuses mostly on one layer of the system.",
    low: "Treats the activity as only individual household optimisation.",
  },
  {
    name: "Evidence & Explanation",
    maxScore: 5,
    description: "How clearly does the student justify their choices using the simulation outputs?",
    high: "Cites scorecards, bill-style summaries, visible deltas or source tooltips in a clear explanation.",
    medium: "Uses some evidence, but the explanation is partly impressionistic.",
    low: "Gives a preference without connecting it to evidence.",
  },
  {
    name: "Teamwork & Discussion",
    maxScore: 5,
    description: "How well does the student contribute to table votes, class votes and reflection?",
    high: "Listens, explains, compromises and helps the group make a reasoned decision.",
    medium: "Participates but does not consistently connect their view to the group's evidence.",
    low: "Does not engage constructively in shared decisions.",
  },
] as const;

const FACILITATION = [
  {
    title: "Teacher as mayor / facilitator",
    body: "The teacher controls pacing rather than a fixed countdown. They advance days, launch chapter transitions, open voting windows and pause for off-screen discussion.",
  },
  {
    title: "Table mentors",
    body: "Mentors or facilitators should ask students why they made a choice, not tell them which choice is correct. High-carbon and high-comfort pathways are valid discussion material.",
  },
  {
    title: "Movement and screen breaks",
    body: "Use policy cards, table discussion and whole-class votes to break up screen time. The activity should not be 125 straight minutes of device use.",
  },
  {
    title: "Technical support",
    body: "Keep spare devices, a fallback shared-screen mode and a simple reset path ready. The teacher page should be lightweight enough to run from a laptop.",
  },
] as const;

const CONDUCT = [
  "Be respectful of teammates, facilitators and other tables.",
  "Do not mock another student's household setup, strategy, spending style or comfort choices.",
  "Treat high-carbon, high-cost and high-comfort strategies as learning opportunities, not moral failures.",
  "Contribute honestly to discussions and votes. Do not misrepresent your scorecard or another team's result.",
  "Use supplied devices and classroom equipment safely and follow facilitator instructions.",
] as const;

const POLICIES = [
  {
    title: "Data & privacy",
    body: "The questionnaire should only create a fictional simulation profile. Do not ask students for sensitive personal information or real addresses.",
  },
  {
    title: "Evidence & sources",
    body: "Any numerical claim used in the simulation should be traceable through a tooltip, source note or facilitator resource so teachers can defend it in class.",
  },
  {
    title: "Neutral policy framing",
    body: "Large-scale policy options should be presented as trade-offs with balanced pros and cons. Avoid party labels or partisan shortcuts.",
  },
  {
    title: "Accessibility",
    body: "Keep text short, use icons where helpful, provide strong contrast, avoid relying on colour alone and preserve a shared-device fallback for tables.",
  },
  {
    title: "No hidden punishment",
    body: "The game should not conspire against students who choose comfort or higher-carbon pathways. Consequences should be visible, explainable and useful for reflection.",
  },
] as const;

export async function loader({ request, context }: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }

  if (!user) {
    return redirect("/platform/login?app=watt-the-hack&next=/watt-the-hack/resources");
  }

  return { user };
}

export default function WattTheHackResources() {
  return (
    <div className={wattClasses.page}>
      <div className="relative min-h-[calc(100vh-132px)] overflow-hidden rounded-[1.5rem] bg-[#061412] text-white shadow-[0_18px_48px_rgba(82,67,39,0.09),0_1px_5px_rgba(82,67,39,0.05)]">
        <div className="relative lg:hidden px-4 pt-6">
          <TableOfContents />
        </div>

        <div className="relative lg:grid lg:grid-cols-[250px_1fr] lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <TableOfContents />
            </div>
          </aside>

          <main className="space-y-12 min-w-0">
            <Hero />
            <Brief />
            <Organisers />
            <EventOverview />
            <LearningGoals />
            <ChallengeAreas />
            <Logistics />
            <SessionSchedule />
            <HowItWorks />
            <GameSystems />
            <SuccessCriteria />
            <Facilitation />
            <CodeOfConduct />
            <Policies />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
}

function TableOfContents() {
  return (
    <nav className="rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/85 p-4 shadow-2xl shadow-black/20 backdrop-blur">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7cffc3]">
        Resources
      </p>
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-xl px-3 py-2 text-sm text-white/65 transition hover:bg-[#7cffc3]/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-[#7cffc3]/20 bg-[#0d211d]/85 shadow-2xl shadow-black/25">
      <div className="relative p-6 sm:p-10 lg:p-12">
        <div className="absolute right-6 top-6 hidden rounded-full border border-[#ffd166]/30 px-4 py-2 text-sm font-semibold text-[#ffd166] sm:block">
          Supersystems session
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7cffc3]">
          Carbon / Cost / Convenience
        </p>
        <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Watt The Hack
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
          A classroom-scale energy transition challenge where students manage a household, cooperate as a neighbourhood and vote as a state to understand the trade-offs behind carbon, funds and comfort.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#how-it-works"
            className="rounded-full bg-[#7cffc3] px-5 py-3 text-sm font-bold text-[#061412] transition hover:bg-white"
          >
            Student Brief
          </a>
          <a
            href="#schedule"
            className="rounded-full border border-[#7cffc3]/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7cffc3]/10"
          >
            Run Sheet
          </a>
          <a
            href="#criteria"
            className="rounded-full border border-[#ffd166]/40 px-5 py-3 text-sm font-bold text-[#ffd166] transition hover:bg-[#ffd166]/10"
          >
            Success Criteria
          </a>
        </div>
      </div>
    </header>
  );
}

function Brief() {
  return (
    <Section id="brief" title="At a Glance" eyebrow="The resource pack">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7cffc3]/80">
              {fact.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{fact.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Organisers() {
  return (
    <Section id="organisers" title="Who Is Behind It?" eyebrow="Partners">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {ORGANISERS.map((org) => (
          <Card key={org.name}>
            <h3 className="text-2xl font-bold text-white">{org.name}</h3>
            <p className="mt-4 leading-relaxed text-white/70">{org.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function EventOverview() {
  return (
    <Section id="event" title="The Event" eyebrow="What students are doing">
      <Card className="space-y-4">
        <p className="text-xl font-semibold leading-relaxed text-white/90">
          Students are not trying to find the one perfect green answer. They are testing how real decisions pull against each other.
        </p>
        <p className="leading-relaxed text-white/70">
          Watt The Hack asks students to manage a fictional household through a sequence of energy choices. A student might choose comfort, cash, carbon reduction or resilience, and each path should reveal a different part of the system.
        </p>
        <p className="leading-relaxed text-white/70">
          The session deliberately moves from personal action to shared infrastructure. First, students tune their own house. Then their table makes neighbourhood decisions. Finally, the class votes on a state-level policy and reflects on what changed when the decision moved from one household to the whole system.
        </p>
        <p className="leading-relaxed text-white/70">
          The most important teaching point is trade-off literacy: a high-comfort strategy, a low-carbon strategy and a careful money-saving strategy can all be valid, but students should be able to explain the consequences of each.
        </p>
      </Card>
    </Section>
  );
}

function LearningGoals() {
  return (
    <Section id="learning" title="Learning Goals" eyebrow="By the end students should be able to">
      <Card>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LEARNING_GOALS.map((goal) => (
            <li key={goal} className="flex gap-3 text-white/75">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7cffc3]/15 text-sm font-black text-[#7cffc3]">
                <CheckIcon className="h-4 w-4 stroke-[2.4]" aria-hidden="true" />
              </span>
              <span className="leading-relaxed">{goal}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function ChallengeAreas() {
  return (
    <Section id="challenges" title="Challenge Areas" eyebrow="The problems inside the game">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CHALLENGES.map((challenge) => (
          <Card key={challenge.title}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
              <span className="rounded-full border border-[#ffd166]/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#ffd166]">
                {challenge.tag}
              </span>
            </div>
            <p className="leading-relaxed text-white/70">{challenge.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Logistics() {
  return (
    <Section id="logistics" title="Venue & Logistics" eyebrow="What facilitators need to know">
      <div className="overflow-hidden rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80">
        {LOGISTICS.map((item, index) => (
          <div
            key={item.label}
            className={`grid gap-2 p-5 sm:grid-cols-[190px_1fr] ${index === 0 ? "" : "border-t border-[#7cffc3]/10"}`}
          >
            <p className="font-semibold text-[#7cffc3]">{item.label}</p>
            <p className="leading-relaxed text-white/70">{item.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SessionSchedule() {
  return (
    <Section id="schedule" title="Session Schedule" eyebrow="125-minute teacher-paced run sheet">
      <div className="space-y-4">
        {SCHEDULE.map((item) => (
          <div key={item.time} className="grid gap-4 rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80 p-5 md:grid-cols-[120px_1fr]">
            <div>
              <p className="text-sm font-bold text-[#ffd166]">{item.time}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works" title="How It Works" eyebrow="Three chapters, three scales">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {CHAPTERS.map((chapter) => (
          <Card key={chapter.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd166]">
              {chapter.eyebrow}
            </p>
            <h3 className="text-2xl font-bold text-white">{chapter.title}</h3>
            <p className="mt-4 leading-relaxed text-white/70">{chapter.body}</p>
            <ul className="mt-5 space-y-3">
              {chapter.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/70">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7cffc3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function GameSystems() {
  return (
    <Section id="systems" title="Game Systems" eyebrow="What appears in the simulation">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {SYSTEMS.map((system) => (
          <Card key={system.title}>
            <h3 className="text-xl font-bold text-white">{system.title}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{system.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-[#7cffc3]/15 text-left text-white/70">
              <th className="px-5 py-4 font-semibold">Choice type</th>
              <th className="px-5 py-4 font-semibold">Examples</th>
              <th className="px-5 py-4 font-semibold">Trade-off</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLE_CHOICES.map((choice) => (
              <tr key={choice.type} className="border-b border-[#7cffc3]/10 last:border-b-0">
                <td className="px-5 py-4 font-semibold text-[#7cffc3]">{choice.type}</td>
                <td className="px-5 py-4 text-white/75">{choice.examples}</td>
                <td className="px-5 py-4 text-white/65">{choice.tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function SuccessCriteria() {
  const totalScore = CRITERIA.reduce((sum, criterion) => sum + criterion.maxScore, 0);

  return (
    <Section id="criteria" title="Success Criteria" eyebrow="Reflection rubric">
      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Scoring Breakdown</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              This rubric is for reflection and discussion. It should not imply there is only one correct way to play.
            </p>
          </div>
          <div className="rounded-2xl border border-[#ffd166]/30 bg-[#ffd166]/10 px-5 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd166]">Total</p>
            <p className="text-2xl font-black text-white">/{totalScore}</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-[#7cffc3]/15 text-left text-white/70">
                <th className="py-3 pr-4 font-semibold">Category</th>
                <th className="py-3 pl-4 text-right font-semibold">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((criterion) => (
                <tr key={criterion.name} className="border-b border-[#7cffc3]/10 last:border-b-0">
                  <td className="py-3 pr-4 text-white/75">{criterion.name}</td>
                  <td className="py-3 pl-4 text-right font-bold text-[#7cffc3]">/{criterion.maxScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-4">
        {CRITERIA.map((criterion) => (
          <details key={criterion.name} className="group rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-bold text-white">{criterion.name}</span>
                <span className="rounded-full bg-[#7cffc3]/10 px-3 py-1 text-sm font-semibold text-[#7cffc3]">
                  /{criterion.maxScore}
                </span>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-white/50 transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5">
              <p className="mb-5 leading-relaxed text-white/70">{criterion.description}</p>
              <RubricRow label="High" text={criterion.high} tone="good" />
              <RubricRow label="Medium" text={criterion.medium} tone="mid" />
              <RubricRow label="Low" text={criterion.low} tone="low" />
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Facilitation() {
  return (
    <Section id="facilitation" title="Facilitation" eyebrow="How staff should run it">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {FACILITATION.map((item) => (
          <Card key={item.title}>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CodeOfConduct() {
  return (
    <Section id="conduct" title="Code of Conduct" eyebrow="Expected behaviour">
      <Card>
        <ul className="space-y-4">
          {CONDUCT.map((item) => (
            <li key={item} className="flex gap-3 text-white/75">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffd166]/15 text-sm font-black text-[#ffd166]">
                !
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function Policies() {
  return (
    <Section id="policies" title="Policies" eyebrow="Guardrails for the activity">
      <div className="space-y-4">
        {POLICIES.map((policy) => (
          <Card key={policy.title}>
            <h3 className="text-xl font-bold text-white">{policy.title}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{policy.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact & Support" eyebrow="Get help">
      <Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-white">Program questions</h3>
            <p className="mt-3 leading-relaxed text-white/70">
              For session logistics, classroom setup, facilitator notes or Supersystems integration, contact the program lead or Monash Tech School coordinator.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">MLAI contact</h3>
            <dl className="mt-3 space-y-2 text-white/70">
              <div className="flex gap-2">
                <dt className="font-semibold text-white/90">Email:</dt>
                <dd>
                  <a className="text-[#7cffc3] hover:text-white" href="mailto:hi@mlai.au">
                    hi@mlai.au
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-white/90">Website:</dt>
                <dd>
                  <a className="text-[#7cffc3] hover:text-white" href="https://mlai.au" target="_blank" rel="noreferrer">
                    mlai.au
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-white/90">Instagram:</dt>
                <dd>@mlai_aus</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-white/90">LinkedIn:</dt>
                <dd>MLAI on LinkedIn</dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function Section({ id, title, eyebrow, children }: { id: string; title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7cffc3]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#7cffc3]/20 bg-[#0d211d]/80 p-6 shadow-xl shadow-black/10 ${className}`}>
      {children}
    </div>
  );
}

function RubricRow({ label, text, tone }: { label: string; text: string; tone: "good" | "mid" | "low" }) {
  const toneClass =
    tone === "good"
      ? "text-emerald-300"
      : tone === "mid"
        ? "text-yellow-300"
        : "text-red-300";

  return (
    <div className="grid gap-2 border-t border-[#7cffc3]/10 py-3 sm:grid-cols-[90px_1fr]">
      <p className={`text-sm font-bold ${toneClass}`}>{label}</p>
      <p className="text-sm leading-relaxed text-white/65">{text}</p>
    </div>
  );
}

