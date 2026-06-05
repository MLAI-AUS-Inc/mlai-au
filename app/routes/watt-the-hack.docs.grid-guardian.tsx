import {
  ChartBarIcon as ActivityIcon,
  Battery100Icon as BatteryFullIcon,
  BuildingOffice2Icon as BuildingIcon,
  CodeBracketIcon as CodeIcon,
  CurrencyDollarIcon as DollarSignIcon,
  FireIcon as FuelIcon,
  InformationCircleIcon as InfoIcon,
  SunIcon,
  BoltIcon as ZapIcon,
  ExclamationTriangleIcon as AlertCircleIcon,
  CommandLineIcon as TerminalIcon,
  PaperAirplaneIcon as SendIcon,
  CpuChipIcon as BrainCircuitIcon,
  CircleStackIcon as StackIcon,
  ScaleIcon,
  BellAlertIcon,
  ShieldCheckIcon,
  TrophyIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import {
  CodeBlock,
  ComponentCard,
  ConstraintRow,
  CostReferenceTable,
  SidebarLink,
} from "~/components/watt-the-hack/docs/primitives";

export default function GridGuardianDocs() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <aside className="hidden w-56 shrink-0 lg:block">
              <nav className="sticky top-6 flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-sm backdrop-blur">
                <SidebarGroup label="Getting Started">
                  <SidebarLink href="#introduction" icon={<InfoIcon className="h-4 w-4" />}>
                    Introduction
                  </SidebarLink>
                  <SidebarLink href="#quickstart" icon={<RocketLaunchIcon className="h-4 w-4" />}>
                    Quickstart
                  </SidebarLink>
                </SidebarGroup>

                <SidebarGroup label="The Simulation">
                  <SidebarLink href="#grid-components" icon={<ZapIcon className="h-4 w-4" />}>
                    Grid Components
                  </SidebarLink>
                  <SidebarLink href="#financials" icon={<DollarSignIcon className="h-4 w-4" />}>
                    Costs &amp; Penalties
                  </SidebarLink>
                  <SidebarLink href="#scoring" icon={<ScaleIcon className="h-4 w-4" />}>
                    Scoring &amp; Leaderboard
                  </SidebarLink>
                  <SidebarLink href="#common-pitfalls" icon={<AlertCircleIcon className="h-4 w-4" />}>
                    Common Pitfalls
                  </SidebarLink>
                </SidebarGroup>

                <SidebarGroup label="Build a Controller">
                  <SidebarLink href="#controllers" icon={<CodeIcon className="h-4 w-4" />}>
                    Controller Basics
                  </SidebarLink>
                  <SidebarLink href="#python" icon={<StackIcon className="h-4 w-4" />}>
                    State &amp; Python
                  </SidebarLink>
                  <SidebarLink href="#playtesting" icon={<TerminalIcon className="h-4 w-4" />}>
                    Playtest &amp; Debug
                  </SidebarLink>
                </SidebarGroup>

                <SidebarGroup label="Advanced &amp; Agentic">
                  <SidebarLink href="#events" icon={<BellAlertIcon className="h-4 w-4" />}>
                    Reacting to Events
                  </SidebarLink>
                  <SidebarLink href="#cyber" icon={<ShieldCheckIcon className="h-4 w-4" />}>
                    Cyber &amp; Phishing
                  </SidebarLink>
                  <SidebarLink href="#agentic" icon={<BrainCircuitIcon className="h-4 w-4" />}>
                    LLM Strategies
                  </SidebarLink>
                  <SidebarLink href="#gauntlet" icon={<TrophyIcon className="h-4 w-4" />}>
                    The Gauntlet
                  </SidebarLink>
                </SidebarGroup>

                <SidebarGroup label="Submission">
                  <SidebarLink href="#submission" icon={<SendIcon className="h-4 w-4" />}>
                    Submission Guide
                  </SidebarLink>
                  <SidebarLink href="#openai" icon={<BrainCircuitIcon className="h-4 w-4" />}>
                    OpenAI API
                  </SidebarLink>
                </SidebarGroup>
              </nav>
            </aside>

            <div className="min-w-0 flex-1 space-y-10 pb-12">
              {/* ============================ INTRODUCTION ============================ */}
              <section id="introduction" className="scroll-mt-24">
                <div className="rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50 via-white to-blue-50/40 p-6 shadow-sm sm:p-8">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Grid Simulator Mechanics
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                    Welcome to the Watt-The-Hack Advanced Track docs. This is the complete reference for the grid
                    components, financial constraints, scoring, event mechanics, and the API your controller talks
                    to. Read the <a href="#quickstart" className="font-semibold text-sky-700 underline">Quickstart</a>{" "}
                    first, then dip into whichever section you need.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <MiniFact label="One step">15 simulated minutes</MiniFact>
                    <MiniFact label="A scenario run">288 steps (72 h / 3 days)</MiniFact>
                    <MiniFact label="Your job">Meet demand at the lowest cost</MiniFact>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">The control loop, in one breath</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Every 15 simulated minutes the engine hands your controller a <code>state</code> dictionary
                    (current demand, solar, price, battery charge, a short forecast, and any active alerts). You
                    return an <code>action</code> dictionary saying how to dispatch the battery, diesel, solar
                    curtailment and grid reserves. The engine applies physics + market rules, charges you the cost
                    of that step, and loops. Your score is the total cost over the whole run — <strong>lower is
                    better</strong>.
                  </p>
                </div>
              </section>

              {/* ============================ QUICKSTART ============================ */}
              <section id="quickstart" className="scroll-mt-24 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Quickstart</h2>
                  <p className="mt-1 text-sm text-muted">
                    From zero to a scored submission in four moves. Each links to the section with the detail.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <StepCard n="1" title="Install the engine" href="#playtesting">
                    <CodeBlock>{`pip install "watt-the-hack[playtest]"`}</CodeBlock>
                    The same engine the judges run. Develop on your own machine with full Python — imports, LLM
                    calls, anything.
                  </StepCard>
                  <StepCard n="2" title="Write a controller" href="#controllers">
                    A function <code>controller(state)</code> or a <code>Strategy</code> class with a{" "}
                    <code>step(self, state)</code> method, returning an action dict. Start from a template in the
                    Submission Portal.
                  </StepCard>
                  <StepCard n="3" title="Playtest &amp; read the report" href="#playtesting">
                    <CodeBlock>{`python -m watt_the_hack.playtest my_controller.py \\
  --scenario duck_curve --open-report`}</CodeBlock>
                    The HTML report tells you <em>exactly</em> where your money went.
                  </StepCard>
                  <StepCard n="4" title="Submit" href="#submission">
                    Paste your code into the{" "}
                    <Link
                      to="/watt-the-hack/city-of-melbourne-advanced-submit"
                      className="font-semibold text-emerald-700 underline hover:text-emerald-800"
                    >
                      Submission Portal
                    </Link>
                    , pick a scenario, hit submit. No zipping. Attempts are limited — playtest first.
                  </StepCard>
                </div>
              </section>

              {/* ============================ GRID COMPONENTS ============================ */}
              <section id="grid-components" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Grid Components</h2>
                  <p className="mt-1 text-sm text-muted">
                    The simulation models a single-node city grid. Your controller sits right at the center, balancing
                    generation and demand.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ComponentCard
                    title="City Demand"
                    icon={<BuildingIcon className="h-5 w-5 text-indigo-600" />}
                    bgColor="bg-indigo-50"
                  >
                    The baseline electricity consumption of the city (in MW). Your primary directive is to meet this
                    demand at all times. Failing to do so triggers severe blackout penalties.
                  </ComponentCard>

                  <ComponentCard
                    title="Solar Generation"
                    icon={<SunIcon className="h-5 w-5 text-amber-600" />}
                    bgColor="bg-amber-50"
                  >
                    Renewable energy generated by the sun (in MW). It's essentially free energy! If solar exceeds the
                    city's demand, the excess is exported or used to charge your battery. You can choose to{" "}
                    <strong>curtail</strong> (disconnect) the solar if you're hitting the grid's export caps.
                  </ComponentCard>

                  <ComponentCard
                    title="Battery & Inverter"
                    icon={<BatteryFullIcon className="h-5 w-5 text-blue-600" />}
                    bgColor="bg-blue-50"
                  >
                    Stores excess energy. The battery is bound by two constraints: its{" "}
                    <strong>Capacity (default 100 MWh)</strong> (how much it holds) and its{" "}
                    <strong>Inverter Limit (default 50 MW)</strong> (the maximum rate it can charge/discharge per step).
                  </ComponentCard>

                  <ComponentCard
                    title="Diesel Generator"
                    icon={<FuelIcon className="h-5 w-5 text-rose-600" />}
                    bgColor="bg-rose-50"
                  >
                    An expensive emergency backup generator. You can manually dispatch it up to its MW limit to prevent
                    blackouts when solar, battery, and grid imports are insufficient.
                  </ComponentCard>

                  <ComponentCard
                    title="External Grid"
                    icon={<ZapIcon className="h-5 w-5 text-emerald-600" />}
                    bgColor="bg-emerald-50"
                  >
                    The city's connection to the broader energy market. Import and export happen{" "}
                    <strong>automatically</strong> to balance the grid — you never set them directly. Whatever your
                    dispatch doesn't cover is imported (at <code>state["price"]</code>); any surplus is exported (at
                    the export tariff). Both respect strict <strong>Import Caps</strong> (default 120 MW) and{" "}
                    <strong>Export Caps</strong> (default 50 MW).
                  </ComponentCard>

                  <ComponentCard
                    title="FCAS Market"
                    icon={<ActivityIcon className="h-5 w-5 text-violet-600" />}
                    bgColor="bg-violet-50"
                  >
                    Frequency Control Ancillary Services — a paid <strong>standby market</strong>. You bid{" "}
                    <code>fcas_reserve_mw</code> = how much inverter capacity you keep on call for the grid, and get
                    paid <strong>$40/MW per hour</strong> just for holding it ready, whether or not it&apos;s ever used.
                    It&apos;s a promise, not a discharge — full mechanics in the FCAS explainer below.
                  </ComponentCard>
                </div>

                <div className="rounded-xl border border-blue-300 bg-blue-100 p-5">
                  <h3 className="text-base font-bold text-blue-950">The Inverter Bottleneck</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-950">
                    Think of the inverter as the gateway between your battery and the rest of the grid.{" "}
                    <strong>Even if your battery is completely full, it can't discharge faster than its inverter limit.</strong>
                    <br />
                    <br />
                    Additionally, the inverter limit is shared between active <code>battery_flow_mw</code> and passive{" "}
                    <code>fcas_reserve_mw</code>. If you have a 50 MW inverter and you reserve 20 MW for FCAS, you can
                    only charge or discharge your battery at a maximum rate of 30 MW for that timestep. Managing this
                    trade-off is crucial to advanced optimization.
                  </p>
                </div>

                <div className="rounded-xl border border-violet-300 bg-violet-100 p-5">
                  <h3 className="text-base font-bold text-violet-950">FCAS, explained — it&apos;s a bid, not a discharge</h3>
                  <p className="mt-2 text-sm leading-relaxed text-violet-950">
                    <strong>What it is in real life:</strong> FCAS (Frequency Control Ancillary Services) is a real
                    market run by AEMO, Australia&apos;s grid operator. The grid must stay at almost exactly{" "}
                    <strong>50 Hz</strong>; when a large generator trips, fast assets like batteries are paid to inject
                    or soak up power within <em>seconds</em> to catch the frequency. Crucially, they&apos;re paid mostly
                    for being <em>on standby</em>, not for the energy they end up moving — the Hornsdale &quot;Tesla big
                    battery&quot; in South Australia earns a large share of its income from FCAS, not from buying and
                    selling energy. This scenario models that market.
                  </p>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-violet-950">
                    <p>
                      <strong>In the game it&apos;s a pure bid.</strong> Each step you set{" "}
                      <code>fcas_reserve_mw</code> = how many MW you <em>promise</em> to keep available for the grid.
                      You move <strong>no energy</strong> and pay <strong>nothing</strong> to bid — you&apos;re just
                      claiming &quot;I&apos;m holding this much in reserve.&quot;
                    </p>
                    <p>
                      <strong>You&apos;re paid to hold it: $40 per MW per hour</strong>, whether or not it&apos;s ever
                      called. Reserve 10 MW for an hour and you earn $400 for doing nothing but staying ready (per
                      15-minute step that&apos;s $10/MW).
                    </p>
                    <p>
                      <strong>It costs you inverter headroom.</strong> FCAS gets first claim on the inverter:{" "}
                      <code>|battery_flow_mw| + fcas_reserve_mw ≤ inverter limit</code> (default 50 MW) — every MW you
                      reserve is a MW you can&apos;t use for arbitrage that step. Changing your bid sharply between steps
                      also costs a small ramp charge (~$500 per MW of change), so keep it steady.
                    </p>
                    <p>
                      <strong>Dispatch events test your claim.</strong> Sometimes the grid actually calls your reserve —
                      a <code>fcas_dispatch</code> event asks for a number of MW over a window. You&apos;re warned ahead
                      of time: read <code>state["fcas_events_upcoming"]</code> (each entry has <code>at_step</code>,{" "}
                      <code>end_step</code>, <code>magnitude_mw</code>). When called you must actually deliver from{" "}
                      <strong>stored charge</strong>, so a reserve bid is only as good as the battery SOC backing it.
                    </p>
                  </div>
                  <div className="mt-3 rounded-lg border-2 border-rose-300 bg-rose-100 p-3">
                    <p className="text-[13px] font-extrabold uppercase tracking-wider text-rose-950">
                      ⚠ Failing a dispatch is the harshest penalty in the game
                    </p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-rose-950">
                      <li>
                        <strong>Deliver</strong> the called MW (from your reserve + enough SOC) → a{" "}
                        <strong>$200/MWh</strong> bonus.
                      </li>
                      <li>
                        <strong>Fall short</strong> — you didn&apos;t reserve enough, or your battery is too empty to
                        back it → <strong>$100,000 per MWh of shortfall</strong>. Example: bid 10 MW, get called for
                        10 MW over one 15-minute step, deliver 0 → 10 MW × 0.25 h × $100,000 ={" "}
                        <strong>$250,000</strong> in a single step.
                      </li>
                    </ul>
                    <p className="mt-2 text-[13px] leading-relaxed text-rose-950">
                      So FCAS is reliable, near-free income — but only bid what you can truly back with charge when a
                      dispatch lands, and keep some SOC in the tank ahead of the windows the engine warns you about.
                    </p>
                  </div>
                </div>
              </section>

              {/* ============================ FINANCIALS ============================ */}
              <section id="financials" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Costs &amp; Penalties</h2>
                  <p className="mt-1 text-sm text-muted">
                    Every step accrues cost. The sum over the run is your raw score (lower is better; a negative raw
                    score means you turned a profit). Here&apos;s every lever that moves it.
                  </p>
                </div>

                <div className="space-y-4">
                  <ConstraintRow title="Dynamic Import Tariff">
                    What it costs to import power from the external grid (which happens automatically to cover any
                    shortfall). It fluctuates wildly with time of day and market conditions — read it via{" "}
                    <code>state["price"]</code>. The goal is simple: buy low, avoid buying high.
                  </ConstraintRow>

                  <ConstraintRow title="Static Export Tariff">
                    When surplus solar or battery power is exported to the grid (also automatic), you earn this flat
                    rate (default $50/MWh). When <code>price</code> goes negative, exporting <em>costs</em> you — see
                    Negative Prices under Common Pitfalls.
                  </ConstraintRow>

                  <ConstraintRow title="Demand Charge" tone="warning">
                    Your single biggest grid-import spike over the whole run is billed once, at{" "}
                    <strong>$1,000 per MW</strong> of that peak. One careless 120 MW import moment can cost{" "}
                    <strong>$120,000</strong> on its own. This rewards <em>peak shaving</em> — pre-charging the battery
                    so you never lean hard on the grid in a single step.
                  </ConstraintRow>

                  <ConstraintRow title="Battery Wear" tone="warning">
                    Cycling the battery isn&apos;t free. Every MWh you move through it — charging <em>or</em>{" "}
                    discharging — costs <strong>$50/MWh</strong> in wear, so needless round-trips quietly eat your
                    score. Separately, a <strong>ramp charge</strong> penalises sudden swings in your{" "}
                    <strong>net grid power</strong> between steps (≈ $1 × ΔMW², so a 30 MW swing ≈ $900) — and since the
                    battery is your main lever on the grid draw, jerky dispatch feeds straight into it. Smooth, gradual
                    moves are much cheaper than slamming between extremes.
                  </ConstraintRow>

                  <ConstraintRow title="Carbon Cost" tone="warning">
                    CO₂ from grid imports and diesel is priced at <strong>$50/kg</strong>. Grid intensity is{" "}
                    ≈ 0.7 kg/MWh and diesel ≈ 0.27 kg/MWh by default (scenarios may override grid intensity, exposed as{" "}
                    <code>state["grid_co2_intensity"]</code>). Cleaner dispatch is cheaper dispatch.
                  </ConstraintRow>

                  <ConstraintRow title="Blackout Penalty" tone="danger">
                    If demand exceeds everything you can supply (solar + battery discharge + diesel + the grid import
                    cap), the city browns out. This costs <strong>$100,000 per MWh</strong> of unmet demand. Avoid it
                    at all costs.
                  </ConstraintRow>

                  <ConstraintRow title="Overvoltage Penalty" tone="danger">
                    If (solar + battery discharge) overwhelms (demand + grid export cap), you flood the grid:{" "}
                    <strong>$5,000 per MWh</strong> over the cap. Use <code>curtail_solar</code> or charge the battery
                    to absorb the excess.
                  </ConstraintRow>

                  <ConstraintRow title="Throughput Budget" tone="warning">
                    Some scenarios give you a total battery throughput budget (MWh). Every MWh you charge or discharge
                    permanently consumes it — read what&apos;s left via{" "}
                    <code>state["battery_throughput_remaining_mwh"]</code>. Once depleted, the battery is locked. Spend
                    cycles where they matter most.
                  </ConstraintRow>

                  <CostReferenceTable />
                </div>
              </section>

              {/* ============================ SCORING ============================ */}
              <section id="scoring" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Scoring &amp; Leaderboard</h2>
                  <p className="mt-1 text-sm text-muted">
                    There are <strong>two</strong> numbers, and they point in opposite directions. Don&apos;t confuse
                    them.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-300 bg-slate-50 p-5">
                    <h3 className="text-base font-bold text-slate-900">Raw cost — what you see locally</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      The playtest report&apos;s <code>final_score</code> is the total dollars your run accrued.{" "}
                      <strong>Lower wins.</strong> This is what you optimise against on your own machine.
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5">
                    <h3 className="text-base font-bold text-emerald-900">Points — what the leaderboard shows</h3>
                    <p className="mt-2 text-sm leading-relaxed text-emerald-800">
                      Your raw cost is converted into <strong>leaderboard points</strong>. <strong>Higher wins.</strong>{" "}
                      The conversion is anchored to two baselines for each scenario.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-sky-300 bg-sky-50 p-5">
                  <h3 className="text-base font-bold text-sky-950">How raw cost becomes points</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sky-950">
                    Each scenario has a <strong>naive baseline</strong> (a do-nothing-clever controller) and an{" "}
                    <strong>optimal baseline</strong> (a strong reference). Your points are a linear interpolation
                    between them:
                  </p>
                  <div className="mt-3">
                    <CodeBlock>
{`points = 100 × (naive_cost − your_cost) / (naive_cost − optimal_cost)
points = clamp(points, 0, 150)`}
                    </CodeBlock>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-sky-950">
                    <li>Match the <strong>naive baseline</strong> → <strong>0 points</strong>.</li>
                    <li>Match the <strong>optimal baseline</strong> → <strong>100 points</strong>.</li>
                    <li>
                      <strong>Beat optimal</strong> → above 100, up to a <strong>150-point cap</strong> per scenario.
                    </li>
                    <li>
                      <strong>Worse than naive</strong> → clamped to <strong>0</strong>. The starter template scores 0
                      — you must beat naive to put a point on the board.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
                  <h3 className="text-base font-bold text-amber-950">Your leaderboard total — and why the Gauntlet dominates</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900">
                    Your headline total is the <strong>sum</strong> of your per-scenario points, with one twist: the{" "}
                    <strong>Gauntlet counts triple (×3)</strong>. With five Phase-1 scenarios plus the Gauntlet, a
                    flawless run is 5 × 100 + (100 × 3) = <strong>800 points</strong>, of which the Gauntlet is{" "}
                    <strong>≈ 37.5%</strong>. No other single scenario comes close — it is by far the highest-leverage
                    thing you can get right. See <a href="#gauntlet" className="font-semibold underline">The Gauntlet</a>.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-300 bg-white p-5">
                  <h4 className="font-semibold text-slate-900">Worked example</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Say a scenario&apos;s naive baseline is <strong>$1,000,000</strong> and its optimal is{" "}
                    <strong>$400,000</strong> (a $600k &quot;moat&quot;). Your controller runs at{" "}
                    <strong>$520,000</strong>:
                  </p>
                  <div className="mt-2">
                    <CodeBlock>{`points = 100 × (1,000,000 − 520,000) / (1,000,000 − 400,000)
       = 100 × 480,000 / 600,000  =  80 points`}</CodeBlock>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Shave another $120k off (to $400k) and you hit 100. Every dollar closer to optimal is worth more
                    points when the moat is narrow — so the scenarios with the widest naive→optimal gap are where
                    effort pays off most. The playtest report shows your standing on this ladder after every run.
                  </p>
                </div>
              </section>

              {/* ============================ COMMON PITFALLS ============================ */}
              <section id="common-pitfalls" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Common Pitfalls &amp; Clarifications</h2>
                  <p className="mt-1 text-sm text-muted">
                    Understanding these concepts will save you from making costly mistakes in the simulation.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ComponentCard
                    title="MW vs MWh (Power vs Energy)"
                    icon={<ZapIcon className="h-5 w-5 text-purple-600" />}
                    bgColor="bg-purple-50"
                  >
                    <strong>MW (Megawatts)</strong> is the <em>rate</em> of power flow at a specific moment (e.g., your
                    battery is discharging at 10 MW).
                    <br />
                    <br />
                    <strong>MWh (Megawatt-hours)</strong> is the <em>volume</em> of energy stored (e.g., your battery
                    holds 50 MWh).
                    <br />
                    <br />
                    Since each timestep is 15 minutes (0.25 hours), flowing at 10 MW for one timestep uses{" "}
                    <code>10 MW × 0.25h = 2.5 MWh</code> of your battery capacity.
                  </ComponentCard>

                  <ComponentCard
                    title="Inverter limits & clamping"
                    icon={<BatteryFullIcon className="h-5 w-5 text-indigo-600" />}
                    bgColor="bg-indigo-50"
                  >
                    A massive 100 MWh battery is useless if its <strong>inverter limit</strong> is only 10 MW. The
                    inverter caps how much power (MW) can flow in or out per step. Ask for more — say{" "}
                    <code>battery_flow_mw = 300</code> — and the engine simply <strong>clamps</strong> it to the
                    limit (~50 MW). It won&apos;t error, but you also won&apos;t get 300 MW. See &quot;out-of-range
                    values&quot; under Controller Basics.
                  </ComponentCard>

                  <ComponentCard
                    title="Negative Prices"
                    icon={<DollarSignIcon className="h-5 w-5 text-green-600" />}
                    bgColor="bg-green-50"
                  >
                    When <code>price</code> is negative (e.g., -$20/MWh), the grid is oversupplied. Because import and
                    export are automatic, this means you get <strong>paid to import</strong> (charge your battery) and
                    you are <strong>charged to export</strong>. Curtail your solar so you aren&apos;t paying the grid to
                    take your surplus!
                  </ComponentCard>

                  <ComponentCard
                    title="Sign Conventions (Positive vs Negative)"
                    icon={<ActivityIcon className="h-5 w-5 text-blue-600" />}
                    bgColor="bg-blue-50"
                  >
                    The simulation uses a strict sign convention. For <code>battery_flow_mw</code>,{" "}
                    <strong>positive</strong> means discharging into the grid (providing power), while{" "}
                    <strong>negative</strong> means charging from the grid (consuming power).
                  </ComponentCard>
                </div>
              </section>

              {/* ============================ CONTROLLER BASICS ============================ */}
              <section id="controllers" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Controller Basics</h2>
                  <p className="mt-1 text-sm text-muted">
                    Your controller is just a Python function that runs every timestep. It takes in a <code>state</code>{" "}
                    dictionary and returns an <code>action</code> dictionary.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">The State Dictionary (what you read)</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`{
  "time": 42,                       # Timestep index (0..287)
  "demand": 145.2,                  # Current city demand (MW)   — this step only
  "solar": 80.5,                    # Current solar generation (MW) — this step only
  "soc": 0.45,                      # Battery state of charge (0..1) — this step only
  "price": 120.0,                   # Current import tariff ($/MWh)
  "features": {                     # Which mechanics are live this scenario
    "battery": True, "fcas": True, "ids": True
  },
  "forecast": {                     # Lookahead arrays (≈16 steps). NOISY — see Tips.
    "demand": [146.1, 150.2, ...],
    "solar":  [82.1, 85.0, ...],
    "price":  [125.0, 150.0, ...]
  },
  "alerts": [                       # Narrative events active RIGHT NOW (see Reacting to Events)
    {"id": "ids_w1", "type": "qualitative_alert", "severity": "critical",
     "title": "IDS Alert wave 1", "description": "SECURITY BREACH ...",
     "at_step": 30, "end_step": 42}
  ],
  "fcas_events_upcoming": [         # Scheduled FCAS dispatch calls (pre-position SOC!)
    {"at_step": 152, "end_step": 154, "magnitude_mw": 18.0}
  ],
  "ids_signal_node_a": 0.87,        # Attack-probability hint [0..1] — only if you subscribed,
  "ids_signal_node_b": 0.64,        #   otherwise None (see Cyber & Phishing)
  "battery_throughput_remaining_mwh": 500.0,   # If a throughput budget is active
  "peak_import_mw": 92.0,           # Your biggest grid import so far (drives the demand charge)
  "agent_plan": { ... }             # Whatever your plan()/replan() returned (see Agentic)
}`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">The Action Dictionary (what you return)</h3>
                  </div>
                  <div className="p-4">
                    <p className="mb-3 text-sm text-muted">
                      You control the grid for the upcoming timestep by returning a dictionary with any of these keys. If
                      you leave a key out, it just defaults to 0.
                    </p>
                    <CodeBlock>
{`def controller(state):
    # Your logic here...

    return {
        # Positive = discharge to grid, Negative = charge from grid.
        # Bounded by: inverter limit, SOC, and throughput budget.
        "battery_flow_mw": 10.5,

        # MW of emergency diesel generation to dispatch [0, max_limit]
        "emergency_generator": 0.0,

        # MW of solar to intentionally disconnect (prevents overvoltage)
        "curtail_solar": 0.0,

        # MW of inverter capacity to lock for frequency control.
        # This capacity cannot be used for charging/discharging this step!
        "fcas_reserve_mw": 5.0,

        # Pay for the IDS probability signal THIS step (cyber scenarios).
        # Populates state["ids_signal_node_a"/"_b"] on the NEXT step.
        "subscribe_ids": False,

        # Per-step acknowledgements the engine reads from YOUR ACTION.
        # (containment_ack / anomaly_ack — see Cyber & Phishing.)
        "agent_plan": {},
    }`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="rounded-xl border border-sky-300 bg-sky-100 p-5">
                  <h3 className="text-base font-bold text-sky-950">What if I return out-of-range values?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sky-950">
                    You don&apos;t need to pre-validate your numbers. The engine reads each value, treats it as a
                    number, and <strong>clamps it to what&apos;s physically possible that step</strong> — it does not
                    error or penalise you just for asking for too much:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-950">
                    <li>
                      <code>battery_flow_mw</code> → clamped to <strong>±the inverter limit</strong> (default 50 MW,
                      minus any FCAS reserve), then further to what your <strong>state of charge</strong> can actually
                      deliver or absorb. So <code>battery_flow_mw = 300</code> just becomes a ~50 MW full-power
                      discharge — not an error.
                    </li>
                    <li><code>curtail_solar</code> → clamped to <strong>[0, current solar]</strong>.</li>
                    <li><code>emergency_generator</code> → clamped to <strong>[0, its MW limit]</strong>.</li>
                    <li>
                      <code>fcas_reserve_mw</code> → clamped to <strong>[0, inverter limit]</strong> (and it shares the
                      inverter with battery flow).
                    </li>
                    <li>Any key you omit defaults to <strong>0</strong>; a negative where only positive makes sense is clamped up to 0.</li>
                  </ul>
                  <p className="mt-2 text-sm leading-relaxed text-sky-950">
                    <strong>So always return plain numbers.</strong> A value the engine can&apos;t convert to a number
                    (<code>None</code> or non-numeric text) can fail the whole evaluation. And if your{" "}
                    <code>step()</code> throws, or returns something that isn&apos;t a dict, that step is replaced with
                    the <strong>zero action</strong> (do nothing) and logged as a controller error — one buggy step
                    won&apos;t crash the run, but its intended action is lost.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-5">
                  <h3 className="text-base font-bold text-emerald-950">Tips for Success</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-emerald-950">
                    <li>
                      <strong>Don&apos;t trust the forecast implicitly:</strong> Forecasts carry AR(1) noise and a
                      persistent bias, and can be deliberately skewed by cyberattacks in later scenarios. The error is{" "}
                      <em>structured</em>, so it&apos;s partly learnable — debias it rather than taking it at face value.
                    </li>
                    <li>
                      <strong>Respect the Inverter:</strong> The battery cannot charge/discharge faster than its inverter
                      limit, and any capacity assigned to <code>fcas_reserve_mw</code> reduces your available bandwidth
                      for normal flow.
                    </li>
                    <li>
                      <strong>Watch the Caps:</strong> 100 MW of excess solar doesn&apos;t mean you can export 100 MW. If
                      the export cap is 50 MW, the rest causes an overvoltage penalty unless you curtail it.
                    </li>
                    <li>
                      <strong>Shave your peak:</strong> The demand charge bills your single worst import spike. Smooth,
                      pre-emptive battery use beats reacting at the peak.
                    </li>
                  </ul>
                </div>
              </section>

              {/* ============================ STATE & PYTHON ============================ */}
              <section id="python" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">State &amp; Python essentials</h2>
                  <p className="mt-1 text-sm text-muted">
                    New to Python, or unsure what the engine does between steps? This is the stuff that quietly
                    breaks first-time controllers — read it before you fight a bug that isn&apos;t really a bug.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">How the engine runs your code</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The engine imports your file <strong>once</strong>, then calls your controller{" "}
                    <strong>every 15 simulated minutes</strong> for the whole run — it never restarts in between. So
                    a value you compute inside <code>step()</code> / <code>controller()</code> and keep in a{" "}
                    <strong>local variable is thrown away</strong> the instant the function returns. Locals do not
                    survive to the next step. To remember anything, you need state that lives <em>outside</em> a
                    single call.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    Keep an array (or any value) alive for the whole run
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    This is the most common sticking point: you want a list you can update <em>every</em> step (a
                    price history, a rolling error buffer, a counter). There are two correct ways.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-emerald-300 bg-emerald-100 shadow-sm">
                  <div className="border-b border-emerald-300 bg-emerald-100 px-4 py-2.5">
                    <h3 className="text-sm font-extrabold text-emerald-950">Recommended: a Strategy class with self.</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`class MyStrategy:                    # any name works — the portal detects it
    def __init__(self):
        # Runs ONCE, when the engine first creates your strategy.
        # Put anything you want to remember for the whole run here.
        self.price_history = []          # this list lives for the entire run

    def step(self, state):
        # self.price_history is the SAME list every step — append to it,
        # read it, modify it, and it is still there on the next step.
        self.price_history.append(state["price"])
        recent = self.price_history[-12:]            # last 3 hours (12 x 15min)
        avg = sum(recent) / len(recent)
        flow = 20.0 if state["price"] > avg else -20.0
        return {"battery_flow_mw": flow}`}
                    </CodeBlock>
                    <p className="mt-3 text-[13px] leading-relaxed text-emerald-950">
                      The engine builds your strategy class <strong>once</strong> and reuses that one instance
                      for every step, so everything stored on <code>self</code> persists automatically. This is the
                      clean way, and it sidesteps the gotcha below.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-ink">Alternative: a module-level variable (plain function)</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`price_history = []          # defined at the TOP of the file = "module level"

def controller(state):
    price_history.append(state["price"])         # appending is fine, no keyword needed
    recent = price_history[-12:]
    avg = sum(recent) / len(recent)
    return {"battery_flow_mw": 20.0 if state["price"] > avg else -20.0}`}
                    </CodeBlock>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      This works because your file is imported once, so the module-level{" "}
                      <code>price_history</code> is shared across every call.
                    </p>
                  </div>
                </div>

                <ConstraintRow title="The #1 gotcha: rebinding a global needs the `global` keyword" tone="warning">
                  <strong>Mutating</strong> a module-level value (<code>.append()</code>, <code>my_list[i] = ...</code>,{" "}
                  <code>my_dict[k] = ...</code>) works with no ceremony. But if you <strong>reassign</strong> the name
                  itself inside a function, Python silently creates a <em>new local</em> instead — so your value never
                  actually updates:
                  <div className="mt-2">
                    <CodeBlock>
{`counter = 0

def controller(state):
    global counter          # WITHOUT this line, the next line makes a NEW local...
    counter = counter + 1   # ...and the module-level counter never changes.
    return {"battery_flow_mw": 0.0}`}
                    </CodeBlock>
                  </div>
                  Rule of thumb: mutating an existing object needs nothing; <strong>rebinding the name</strong>{" "}
                  (<code>counter = ...</code>, <code>x = x + 1</code>) needs <code>global</code>. The{" "}
                  class-based approach avoids this trap entirely — just write <code>self.counter += 1</code>.
                </ConstraintRow>

                <ConstraintRow title="What does NOT persist" tone="danger">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Local variables inside <code>step()</code> / <code>controller()</code> — reset on every step.</li>
                    <li>
                      Arbitrary keys you write into the <code>state</code> dict you&apos;re handed (e.g.{" "}
                      <code>state["my_thing"] = ...</code>) — the engine rebuilds that view fresh each step, so they&apos;re
                      discarded. Use <code>self.*</code> or a module-level variable instead.
                    </li>
                  </ul>
                  <p className="mt-2">
                    The one channel the engine deliberately carries forward is <code>state["agent_plan"]</code>, which
                    accumulates whatever your <code>plan()</code> / <code>replan()</code> returned <em>and</em> whatever
                    you return under the <code>agent_plan</code> key from <code>step()</code> (see Reacting to Events).
                  </p>
                </ConstraintRow>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-ink">Class syntax, for non-experts</h3>
                  </div>
                  <div className="space-y-3 p-4">
                    <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-muted">
                      <li>
                        A class bundles data (<code>self.x</code>) with functions (called <strong>methods</strong>). The
                        engine makes one instance and calls its <code>step</code> each tick.
                      </li>
                      <li>
                        Every method&apos;s first parameter must be <code>self</code> (<code>def step(self, state):</code>).
                        Forget it and you get <code>TypeError: step() takes 1 positional argument but 2 were given</code>.
                      </li>
                      <li>
                        To call one method from another, go through <code>self.</code> — a bare{" "}
                        <code>helper()</code> raises <code>NameError</code>.
                      </li>
                      <li>
                        Plain functions defined at module level <em>are</em> callable from inside a method directly (no{" "}
                        <code>self.</code>).
                      </li>
                      <li>
                        You never create the class yourself — the engine does. So{" "}
                        <code>__init__(self)</code> must work with no arguments (don&apos;t add required parameters).
                      </li>
                    </ul>
                    <CodeBlock>
{`def clamp(x, lo, hi):                 # a plain module-level helper
    return max(lo, min(hi, x))

class MyStrategy:                     # any name works
    def __init__(self):
        self.target_soc = 0.5

    def _decide_target(self, price):  # a helper METHOD (leading _ is just convention)
        return 0.8 if price < 0.10 else 0.3

    def step(self, state):
        self.target_soc = self._decide_target(state["price"])   # call a method via self.
        raw = (self.target_soc - state["soc"]) * 100
        return {"battery_flow_mw": clamp(raw, -50.0, 50.0)}       # call a function directly`}
                    </CodeBlock>
                  </div>
                </div>

                <ConstraintRow title="A few more traps that fail silently or error" tone="warning">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>
                      <strong>Mutable default arguments:</strong> <code>def f(x, hist=[]):</code> creates that list{" "}
                      <em>once</em> and reuses it across calls. Use <code>hist=None</code>, then{" "}
                      <code>hist = hist or []</code> inside.
                    </li>
                    <li>
                      <strong>Division:</strong> <code>1 / 2</code> is <code>0.5</code> (true division);{" "}
                      <code>1 // 2</code> is <code>0</code> (floor). Mixing them up skews your maths.
                    </li>
                    <li>
                      <strong>Indentation is syntax:</strong> blocks are defined by consistent indentation (4 spaces).
                      Mixing tabs and spaces, or uneven indents, is an <code>IndentationError</code>.
                    </li>
                  </ul>
                </ConstraintRow>
              </section>

              {/* ============================ PLAYTEST & DEBUG ============================ */}
              <section id="playtesting" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Playtest &amp; Debug</h2>
                  <p className="mt-1 text-sm text-muted">
                    The public Python engine is identical to the one the judges run. Iterating locally — with the HTML
                    report open — is the single fastest way to climb the leaderboard. This is also{" "}
                    <strong>where you find out why you lost points</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  <ConstraintRow title="1. Install the engine">
                    The public engine is published on PyPI. Install it with the playtest extras:
                    <CodeBlock>{`pip install "watt-the-hack[playtest]"`}</CodeBlock>
                    <div className="mt-2 text-xs text-muted">
                      <em>
                        As new scenarios unlock, upgrade with{" "}
                        <code>pip install --upgrade &quot;watt-the-hack[playtest]&quot;</code> to pull the latest content.
                      </em>
                    </div>
                  </ConstraintRow>

                  <ConstraintRow title="2. Run the playtest harness">
                    Run your controller against a scenario. <code>--open-report</code> pops the HTML report in your
                    browser when it finishes.
                    <CodeBlock>{`python -m watt_the_hack.playtest my_controller.py --scenario duck_curve --open-report`}</CodeBlock>
                  </ConstraintRow>

                  <ConstraintRow title="3. List available scenarios">
                    See everything unlocked in your installed package:
                    <CodeBlock>{`python -m watt_the_hack.playtest --list-scenarios`}</CodeBlock>
                  </ConstraintRow>
                </div>

                <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-5">
                  <h3 className="text-base font-bold text-indigo-950">
                    Read the report — it tells you exactly where the money went
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-900">
                    &quot;I scored badly&quot; is not a diagnosis. Every run writes a folder under{" "}
                    <code>runs/&lt;scenario&gt;_&lt;timestamp&gt;/</code> containing a <code>report.html</code> plus raw{" "}
                    <code>metrics.json</code> and per-step <code>steps.csv</code>. The report breaks down{" "}
                    <strong>precisely which line items cost you</strong>:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-indigo-900">
                    <li>
                      <strong>Cost breakdown</strong> — every component (import, battery wear, demand charge, each
                      penalty…) ranked by size and as a % of your total. Your &quot;biggest lever&quot; is called out.
                    </li>
                    <li>
                      <strong>Top worst steps</strong> — the exact timesteps that hurt most, with the demand, solar,
                      SOC, net grid and penalty at that moment. Start your fixes here.
                    </li>
                    <li>
                      <strong>Opportunities</strong> — data-driven hints (&quot;you&apos;re importing at peak price in
                      the evening — pre-charge earlier&quot;).
                    </li>
                    <li>
                      <strong>Baseline ladder</strong> — where your raw cost sits between the naive and optimal
                      baselines, i.e. roughly how many points you&apos;d score.
                    </li>
                  </ul>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-900">
                    If a penalty line you didn&apos;t expect is non-zero (e.g.{" "}
                    <code>cyber_containment_fine</code>, <code>diesel_ban_penalty</code>,{" "}
                    <code>fcas_shortfall_penalty</code>), that&apos;s a mechanic you mis-handled — jump to the matching
                    section below.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-300 bg-white p-5">
                  <h4 className="font-semibold text-slate-900">Inspect costs straight from Python</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Prefer raw numbers? Run a controller and print the breakdown yourself:
                  </p>
                  <div className="mt-2">
                    <CodeBlock>
{`from watt_the_hack.playtest import run_controller   # convenience wrapper

result = run_controller("my_controller.py", scenario="gauntlet")
print(result["metrics"]["final_score"])             # raw cost (lower wins)
for k, v in sorted(result["cost_breakdown"].items(),
                   key=lambda kv: -abs(kv[1])):
    print(f"{k:<28} {v:>14,.0f}")                    # where every dollar went`}
                    </CodeBlock>
                  </div>
                </div>
              </section>

              {/* ============================ REACTING TO EVENTS ============================ */}
              <section id="events" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Reacting to Events</h2>
                  <p className="mt-1 text-sm text-muted">
                    From Frequency Frenzy onward, scenarios fire <strong>events</strong>: weather notes, demand spikes,
                    operator briefs, compliance windows, cyberattacks. Here&apos;s how they reach your controller and
                    how to respond without blowing your time budget.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">Three channels carry events</h3>
                  <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                    <li>
                      <strong><code>state["alerts"]</code></strong> — the list of narrative events <em>active right
                      now</em>. Each has <code>id</code>, <code>type</code>, <code>severity</code>, <code>title</code>,{" "}
                      <code>description</code> (the prose), <code>at_step</code>, <code>end_step</code>. Read it every
                      step.
                    </li>
                    <li>
                      <strong><code>replan(self, state, alerts)</code></strong> — an optional hook that fires whenever
                      alerts are active. The right place for a slow parse (e.g. an LLM call). Its return value is merged
                      into the persistent <code>agent_plan</code>.
                    </li>
                    <li>
                      <strong><code>state["agent_plan"]</code></strong> — your standing memo to the engine. It persists
                      across steps and is how you <em>respond</em> to enforcement events (acknowledge an attack, file an
                      exemption).
                    </li>
                  </ol>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-100 p-5">
                  <h3 className="text-base font-bold text-amber-950">
                    ⚠ Not every event shows up as an alert
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900">
                    Narrative events (qualitative alerts, weather, demand/price signals, forecast-bias notices) appear
                    in <code>state["alerts"]</code>. But the engine deliberately <strong>hides the structured
                    enforcement windows</strong> — compliance windows, the diesel ban, cyberattack windows, phishing
                    traps — and strips their numeric payload. That&apos;s the whole challenge of the advanced
                    scenarios: the <em>prose</em> brief tells you a rule is coming (&quot;cap exports to 22 MW over
                    steps 108–124&quot;), and <strong>you</strong> must parse it into the right action. The engine
                    won&apos;t hand you the number.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-300 bg-rose-100 p-5">
                  <h3 className="text-base font-bold text-rose-950">
                    ⚠ The biggest timeout trap: <code>replan</code> fires <em>every</em> active step
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-rose-900">
                    <code>replan</code> is called on <strong>every step where at least one alert is active</strong> —
                    not once per alert. An alert that spans steps 8–20 calls <code>replan</code> 13 times. Across a
                    full run that can be <strong>100–200 calls</strong>. If you fire an LLM request on every one,
                    you&apos;ll blow the ~14-minute evaluation budget and your run ends in <code>TIMEOUT</code> with no
                    score.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-rose-900">
                    <strong>The fix is one line: dedupe by alert id.</strong> Track which ids you&apos;ve already
                    handled and only do expensive work for genuinely new ones. The number of <em>distinct</em> alerts
                    is small (see the table), so a deduped controller makes only a handful of LLM calls.
                  </p>
                  <div className="mt-3">
                    <CodeBlock>
{`class Strategy:
    def __init__(self):
        self.seen = set()
        self.constraints = []          # parsed rules live here for step() to read

    def replan(self, state, alerts):
        new = [a for a in alerts if a["id"] not in self.seen]
        if not new:
            return {}                  # nothing new -> do NO work, return immediately
        for a in new:
            self.seen.add(a["id"])
            self.constraints.append(self._parse(a))   # regex or ONE batched LLM call
        return {}                      # (you can also return dict updates for agent_plan)

    def _parse(self, alert):
        # turn alert["description"] prose into a structured rule on self
        ...`}
                    </CodeBlock>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-ink">How many alerts to expect</h3>
                  <p className="mt-1 text-sm text-muted">
                    Counts for the scored (judging) run of the scenarios where an LLM actually helps — the earlier
                    ones (Duck Curve, Frequency Frenzy, AI Grid Shock) don&apos;t need one. Budget your LLM calls
                    against <strong>distinct alerts</strong> (what you handle when you dedupe), not the raw{" "}
                    <code>replan</code> firings.
                  </p>
                </div>
                <AlertBudgetTable />

                <div className="rounded-xl border border-sky-300 bg-sky-100 p-5">
                  <h3 className="text-base font-bold text-sky-950">
                    <code>agent_plan</code> is one persistent dictionary
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sky-950">
                    Everything you write to <code>agent_plan</code> accumulates into a <strong>single plan that
                    persists</strong> for the rest of the run, and the engine reads it back. Anything you return under
                    the <code>agent_plan</code> key of your <code>step()</code> action is merged into that same plan — so
                    you don&apos;t have to memorise which key goes where. The clean habit:
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-sky-400 bg-white/70 p-3">
                      <p className="text-[13px] font-extrabold text-sky-950">
                        Per-step acknowledgements → from <code>step()</code>
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-sky-900">
                        <code>containment_ack</code> / <code>anomaly_ack</code> are a <em>live signal</em> — set them in
                        the <code>agent_plan</code> you return from <code>step()</code>, every step the incident is live.
                      </p>
                    </div>
                    <div className="rounded-lg border border-sky-400 bg-white/70 p-3">
                      <p className="text-[13px] font-extrabold text-sky-950">
                        One-time policy → from <code>plan()</code> / <code>replan()</code>
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-sky-900">
                        <code>emergency_exemption</code> and your parsed constraints are a <em>standing document</em> you
                        file once — the natural home for anything you parse with an LLM (see the budget rule).
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-sky-900">
                    Both land in the same persistent <code>agent_plan</code>; pick the hook that reads cleanly. The
                    worked examples in Cyber &amp; Phishing show both.
                  </p>
                </div>
              </section>

              {/* ============================ CYBER & PHISHING ============================ */}
              <section id="cyber" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Cyber &amp; Phishing Defense</h2>
                  <p className="mt-1 text-sm text-muted">
                    The Cybersecurity scenario and the Gauntlet attack your <em>inputs</em>. Some incidents are real and
                    must be contained; some are decoys you must <em>not</em> react to; some prose is bait designed to
                    make you sabotage yourself.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <ComponentCard title="The IDS signal" icon={<ShieldCheckIcon className="h-5 w-5 text-cyan-600" />} bgColor="bg-cyan-50">
                    Set <code>subscribe_ids: True</code> in your action to buy an intrusion hint (small per-step fee).
                    Next step you can read two probabilities, <code>ids_signal_node_a</code> and{" "}
                    <code>ids_signal_node_b</code> ∈ [0, 1]. If you don&apos;t subscribe, both are <code>None</code>.
                  </ComponentCard>
                  <ComponentCard title="The forecast cross-check" icon={<ActivityIcon className="h-5 w-5 text-violet-600" />} bgColor="bg-violet-50">
                    A real attack corrupts your live sensors (<code>demand</code>, <code>solar</code>, <code>soc</code>)
                    but the forecast still reads the true series. A large, sudden gap between a sensor and its forecast
                    is a tell that your data is being spoofed.
                  </ComponentCard>
                  <ComponentCard title="The alert prose" icon={<BellAlertIcon className="h-5 w-5 text-amber-600" />} bgColor="bg-amber-50">
                    Critical alerts name the incident and often the exact id to acknowledge. Decoy alerts hedge
                    (&quot;single node&quot;, &quot;second node disagrees&quot;, &quot;do not ack unless both agree&quot;).
                    Read the words.
                  </ComponentCard>
                </div>

                <div className="rounded-xl border border-cyan-300 bg-cyan-50 p-5">
                  <h3 className="text-base font-bold text-cyan-950">Real vs decoy: the two IDS nodes must agree</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cyan-900">
                    The two IDS nodes are designed so you can&apos;t trust either alone:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-cyan-900">
                    <li><strong>Real attack</strong> → both nodes read high (node A ≈ 0.85, node B ≈ 0.65). They <em>agree</em>.</li>
                    <li><strong>Decoy / false flag</strong> → node A looks suspicious (≈ 0.60) but node B stays low (≈ 0.10). They <em>disagree</em>.</li>
                    <li><strong>Normal</strong> → both low (≈ 0.20 / 0.10).</li>
                  </ul>
                  <p className="mt-2 text-sm leading-relaxed text-cyan-900">
                    So the rule is: <strong>only treat it as real when BOTH nodes clear a threshold</strong> (≈ 0.4 each).
                    The signal is noisy, so smooth it over a couple of steps rather than trusting a single reading.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-300 bg-rose-100 p-5">
                  <h3 className="text-base font-bold text-rose-950">
                    Containment: acknowledge real attacks, ignore decoys
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-rose-900">
                    During a real attack window you must set{" "}
                    <code>agent_plan["containment_ack"] = &lt;the attack id&gt;</code> (the critical alert names it, e.g.{" "}
                    <code>&quot;attack_30&quot;</code>). Both mistakes are punished equally hard — about{" "}
                    <strong>$50,000 per step</strong>:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-900">
                    <li><strong>Miss a real attack</strong> (no ack, or wrong id) → fined every step of the window.</li>
                    <li><strong>Acknowledge a decoy</strong> (ack the fake one&apos;s id) → fined every step of <em>that</em> window.</li>
                  </ul>
                  <p className="mt-2 text-sm leading-relaxed text-rose-900">
                    Remember the channel: <code>containment_ack</code> is read from{" "}
                    <strong>the action your <code>step()</code> returns</strong>, so set it there, every step the
                    confirmed attack is live.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">Worked example — detect, confirm, contain</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`import re

class Strategy:
    def __init__(self):
        self.seen = set()
        self.attacks = {}        # attack_id -> (start_step, end_step), learned from prose
        self.ema_a = 0.0         # smoothed IDS node A
        self.ema_b = 0.0         # smoothed IDS node B

    def replan(self, state, alerts):
        # Parse each NEW alert once. A critical alert names the attack id to ack;
        # a decoy alert names an id but tells you NOT to ack it.
        for a in alerts:
            if a["id"] in self.seen:
                continue
            self.seen.add(a["id"])
            m = re.search(r"\`containment_ack\`:\\s*\`([^\`]+)\`", a.get("description", ""))
            if m and a.get("severity") == "critical" and "decoy" not in a["description"].lower():
                self.attacks[m.group(1)] = (a.get("at_step"), a.get("end_step"))
        return {}

    def step(self, state):
        t = int(state["time"])

        # 1) Smooth the (noisy) IDS signal. Subscribe whenever an attack window is open.
        in_window = any(s <= t <= e for (s, e) in self.attacks.values())
        a = state.get("ids_signal_node_a") or 0.0
        b = state.get("ids_signal_node_b") or 0.0
        self.ema_a = 0.5 * self.ema_a + 0.5 * a
        self.ema_b = 0.5 * self.ema_b + 0.5 * b
        corroborated = self.ema_a >= 0.4 and self.ema_b >= 0.4   # BOTH nodes agree -> real

        # 2) Acknowledge ONLY a confirmed real attack, using the id from the prose.
        agent_plan = {}
        for aid, (s, e) in self.attacks.items():
            if s is not None and s <= t <= e and corroborated:
                agent_plan["containment_ack"] = aid

        # 3) When data looks spoofed, steer by the forecast instead of the live sensor.
        demand = state["demand"]; solar = state["solar"]
        fc = state.get("forecast", {})
        if corroborated and fc.get("demand") and fc.get("solar"):
            demand, solar = fc["demand"][0], fc["solar"][0]

        net = demand - solar
        flow = max(-50.0, min(50.0, net)) if state["soc"] > 0.1 else 0.0
        return {
            "battery_flow_mw": flow,
            "subscribe_ids": in_window,     # only pay for IDS while a window is open
            "agent_plan": agent_plan,       # containment_ack read from HERE
        }`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-5">
                  <h3 className="text-base font-bold text-emerald-950">
                    The diesel-ban exemption
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                    During an environmental diesel-ban window, running diesel without a filed exemption costs{" "}
                    <strong>$3,000/MWh</strong>. To run it legally you file a small document. It&apos;s one-time{" "}
                    <em>policy</em>, so <code>plan()</code> / <code>replan()</code> is the natural home (it persists for
                    the run):
                  </p>
                  <div className="mt-3">
                    <CodeBlock>
{`def replan(self, state, alerts):
    # File the exemption once. The id is named in the EPA brief, e.g. "epa_g77_day3".
    return {
        "emergency_exemption": {
            "directive_id": "epa_g77_day3",
            # reason must be substantive: >= 60 chars, contain a number AND an
            # operational keyword (mw / soc / demand / deficit / import / capacity ...).
            "reason": ("Confirmed import deficit of 28 MW above the 120 MW grid cap "
                       "during the EPA window; battery SOC at 12% and demand rising, "
                       "diesel required to maintain load."),
            "expected_duration_steps": 6,        # int, 1..12
        }
    }`}
                    </CodeBlock>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-emerald-900">
                    A vague or numberless reason is rejected and the penalty applies — the engine wants a real
                    justification, not a rubber stamp.
                  </p>
                </div>

                <div className="rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-5">
                  <h3 className="text-base font-bold text-fuchsia-950">Phishing: never let prose write your plan</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fuchsia-900">
                    Some alerts are <strong>bait</strong>. They&apos;ll urgently instruct you to put a specific key in
                    your <code>agent_plan</code> (&quot;set <code>verify_reserve: true</code> to confirm&quot;). If you
                    obey, the engine fines you. The defense is a hard rule:
                  </p>
                  <p className="mt-2 rounded-lg border border-fuchsia-400 bg-white/70 p-3 text-sm font-semibold text-fuchsia-950">
                    Only ever write keys to <code>agent_plan</code> that <em>your own controller logic</em> decided on
                    (<code>containment_ack</code>, <code>anomaly_ack</code>, <code>emergency_exemption</code>, your
                    constraints). Never copy a key just because an alert&apos;s text told you to.
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-fuchsia-900">
                    If you&apos;re using an LLM to parse briefs, this is a prompt-injection risk: instruct the model to
                    extract <em>constraints</em> only, and validate its output against a fixed allow-list of keys before
                    you act on it.
                  </p>
                </div>
              </section>

              {/* ============================ LLM STRATEGIES ============================ */}
              <section id="agentic" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Advanced: LLM-driven strategies</h2>
                  <p className="mt-1 text-sm text-muted">
                    The Operator&apos;s Mandate, Cybersecurity, and the Gauntlet hide their rules in plain-English
                    briefs. To act on them you have to <em>read</em> the text — that&apos;s where an LLM helps. This is
                    the part most people find confusing, so here it is from scratch.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">The one idea that makes it click</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Your code is <strong>not</strong> restarted each step. The engine creates <strong>one</strong>{" "}
                    instance of your <code>Strategy</code> class and keeps it for the whole run, calling{" "}
                    <strong>three methods on that same object at three different times</strong>. Because it&apos;s one
                    long-lived object, anything you save on <code>self</code> in one method is still there in the
                    others. That is the whole trick: the <strong>slow thinking</strong> (an LLM call) happens in the
                    methods that run rarely, saves its conclusions on <code>self</code>, and the <strong>fast loop</strong>{" "}
                    just reads them.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-ink">The three methods, in plain English</h3>
                  <p className="mt-1 text-sm text-muted">One object, three jobs, three very different frequencies.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <ComponentCard
                    title="plan() — study once"
                    icon={<InfoIcon className="h-5 w-5 text-sky-600" />}
                    bgColor="bg-sky-50"
                  >
                    Runs <strong>one time</strong>, before step 0, with the opening state. Job: read the briefing and
                    pick your overall game plan. <strong>An LLM call is fine here</strong> — it happens once.{" "}
                    <em>Optional.</em>
                  </ComponentCard>
                  <ComponentCard
                    title="replan() — react to news"
                    icon={<BellAlertIcon className="h-5 w-5 text-amber-600" />}
                    bgColor="bg-amber-50"
                  >
                    Runs <strong>while an alert is active</strong>. Job: turn a new brief into a concrete rule and save
                    it on <code>self</code>. <strong>An LLM call is fine here if you dedupe</strong> (handle each alert
                    id once). <em>Optional.</em>
                  </ComponentCard>
                  <ComponentCard
                    title="step() — act fast"
                    icon={<ZapIcon className="h-5 w-5 text-emerald-600" />}
                    bgColor="bg-emerald-50"
                  >
                    Runs <strong>every 15 min — 288 times</strong>. Job: return this tick&apos;s dispatch using what you
                    already prepared. <strong>Never call an LLM here.</strong> <em>Required.</em>
                  </ComponentCard>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">When each one fires (one run, start to finish)</h3>
                  <div className="mt-3">
                    <CodeBlock>
{`run starts
│
├─ plan(state)               ← ONCE   (optional LLM: read the briefing)
│
├─ step(state)   t = 0       ← every tick: fast, NO LLM
├─ step(state)   t = 1
│      ⋮
│   🔔 a new alert appears around t = 30
├─ replan(state, alerts)     ← fires because an alert is active
│                               (optional LLM: parse it, save to self)
├─ step(state)   t = 30      ← reads what replan just saved on self
├─ step(state)   t = 31
│      ⋮
└─ step(state)   t = 287     ← run ends`}
                    </CodeBlock>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    Two things beginners trip on: <code>replan</code> fires on <strong>every step an alert is
                    active</strong> (not once per alert — hence dedupe, see Reacting to Events), and <code>step</code>{" "}
                    runs every tick whether or not an alert is present.
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-5">
                  <h3 className="text-base font-bold text-indigo-950">How the methods hand information to each other</h3>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-900">
                    Two channels — and as a beginner you mostly need the first:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-indigo-900">
                    <li>
                      <strong><code>self.something</code> — your own notebook.</strong> Whatever you assign to{" "}
                      <code>self</code> in <code>plan</code> / <code>replan</code> is readable in <code>step</code>. This
                      is how an LLM&apos;s decision reaches the fast loop. Use it for almost everything.
                    </li>
                    <li>
                      <strong><code>agent_plan</code> — a note to the <em>engine</em>.</strong> Only for the handful of
                      keys the engine itself reads (<code>containment_ack</code>, <code>emergency_exemption</code>,{" "}
                      <code>anomaly_ack</code>). Return it from any method; it persists and also shows up as{" "}
                      <code>state[&quot;agent_plan&quot;]</code> (see Reacting to Events &amp; Cyber).
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-100 p-5">
                  <h3 className="text-base font-bold text-amber-950">
                    The LLM budget rule: call it in <code>plan</code> / <code>replan</code>, never <code>step</code>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-950">
                    Your <strong>entire evaluation</strong> (every timestep of the run) must finish within{" "}
                    <strong>~14 minutes</strong> of wall-clock. There is no per-step rescue: if the run as a whole
                    exceeds the budget it ends in <code>TIMEOUT</code> with <strong>no score</strong>. (A timeout is a
                    free retry: it doesn&apos;t burn one of your attempts, but you still get nothing back.) So the LLM
                    has to live where it&apos;s called rarely:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-amber-950">
                    <li>
                      <code>plan(initial_state)</code> runs <strong>once</strong> before step 0: the right place for an
                      LLM call to read the scenario briefing and pick a high-level policy.
                    </li>
                    <li>
                      <code>replan(state, alerts)</code> runs <strong>whenever alerts are active</strong> — so{" "}
                      <strong>dedupe by alert id</strong> (see Reacting to Events) and only call the LLM for new ones.
                      The dict you return is merged into the persistent <code>state["agent_plan"]</code>.
                    </li>
                    <li>
                      <strong>
                        Never call an LLM from <code>step(state)</code>.
                      </strong>{" "}
                      It runs every 15 simulated minutes; a network call there is multiplied across the whole run and
                      will blow the budget. Instead read{" "}
                      <code>state.get("agent_plan", {`{}`})</code> and branch on the cached policy: LLM-quality
                      decisions at deterministic-controller latency.
                    </li>
                    <li>
                      Keep models fast: <code>gpt-5.4-nano</code> or <code>gpt-5.4-mini</code> (see the OpenAI section).
                      Even in <code>plan</code>/<code>replan</code>, a slow model called repeatedly can run you over.
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">A full worked example — the three methods cooperating</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The LLM &quot;thinks&quot; in <code>plan</code> and <code>replan</code> and writes its conclusions
                    onto <code>self</code>; <code>step</code> just reads them and dispatches. Trace{" "}
                    <code>self.stance</code> and <code>self.export_cap</code> through the three methods:
                  </p>
                  <div className="mt-3">
                    <CodeBlock>
{`class MyStrategy:                       # any class name works
    # The engine builds this ONCE and reuses it for the whole run.

    def __init__(self):
        # self.* is shared memory across plan / replan / step.
        self.stance = "balanced"        # plan() will set this
        self.export_cap = None          # replan() will set this from a brief
        self.handled = set()            # alert ids already parsed (dedupe!)

    # ── ONCE, before t=0. A slow LLM call is fine here. ──────────────
    def plan(self, state):
        briefs = state.get("alerts", [])
        # ask_llm_* are YOUR helpers that call OpenAI (see the OpenAI section).
        self.stance = ask_llm_for_stance(briefs) or "balanced"   # save on self
        return {}                        # nothing for the engine yet

    # ── while an alert is active. DEDUPE, then (maybe) call the LLM. ──
    def replan(self, state, alerts):
        for a in alerts:
            if a["id"] in self.handled:  # already handled ->
                continue                 #   do NO work (this is what saves you)
            self.handled.add(a["id"])
            cap = parse_export_cap_with_llm(a.get("description", ""))  # 22.0 or None
            if cap is not None:
                self.export_cap = cap    # save on self for step() to use
        return {}                        # everything we need is on self

    # ── EVERY 15 min (288x). Fast. NO LLM. Use what we prepared. ─────
    def step(self, state):
        demand, solar, soc = state["demand"], state["solar"], state["soc"]
        net = demand - solar
        flow = max(-50.0, min(50.0, net)) if soc > 0.1 else 0.0

        if self.stance == "conserve":    # <- decided by the LLM in plan()
            flow = min(flow, 0.0)        #    hold charge; don't discharge hard

        curtail = 0.0
        if self.export_cap is not None:  # <- parsed by the LLM in replan()
            export = max(0.0, -(net - flow))
            curtail = max(0.0, export - self.export_cap)

        return {"battery_flow_mw": flow, "curtail_solar": curtail}`}
                    </CodeBlock>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    <code>ask_llm_for_stance</code> and <code>parse_export_cap_with_llm</code> are functions{" "}
                    <strong>you</strong> write that call the OpenAI API (see the{" "}
                    <a href="#openai" className="font-semibold text-sky-700 underline">OpenAI section</a>). Make them
                    fail soft: if the key is missing or the call errors, return a sensible default so a network blip
                    never crashes the run.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-5">
                  <h3 className="text-base font-bold text-emerald-950">No LLM? You can still play.</h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                    Nothing forces you to use an LLM. Swap the <code>*_with_llm</code> helpers for plain string
                    matching / regex on <code>a[&quot;description&quot;]</code>, or skip <code>plan</code> and{" "}
                    <code>replan</code> entirely and write a pure <code>step</code> controller. The LLM just makes the
                    wordier briefs easier to parse — it&apos;s a tool, not a requirement.
                  </p>
                </div>
              </section>

              {/* ============================ THE GAUNTLET ============================ */}
              <section id="gauntlet" className="scroll-mt-24 space-y-6">
                <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50/40 p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <TrophyIcon className="h-7 w-7 text-amber-600" />
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">The Gauntlet</h2>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                    The finale. A single <strong>288-step (3-day)</strong> run that combines <em>every</em> mechanic
                    from the earlier scenarios at once. You get <strong>one submission</strong>, and it counts{" "}
                    <strong>×3</strong> on the leaderboard — by far the highest-leverage scenario in the event.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5">
                  <h3 className="text-base font-bold text-emerald-950">
                    It introduces no new mechanic — so you can fully prepare
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                    Every challenge in the Gauntlet is something you already practised in an earlier scenario, where you
                    have <strong>unlimited local playtests</strong>. The single-submission limit applies to the{" "}
                    <em>scored run</em>, not to your iteration: master each mechanic in its own scenario first, then the
                    Gauntlet is &quot;just&quot; doing all of them in one controller.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="text-sm font-semibold text-ink">What it folds in, and where you learned it</h3>
                  </div>
                  <div className="overflow-x-auto p-1">
                    <table className="w-full border-collapse text-left text-[13px]">
                      <thead>
                        <tr className="border-b border-line text-[11px] uppercase tracking-wide text-muted">
                          <th className="px-3 py-2 font-semibold">In the Gauntlet you&apos;ll face…</th>
                          <th className="px-3 py-2 font-semibold">Practise it in</th>
                        </tr>
                      </thead>
                      <tbody>
                        <GauntletRow what="A severe duck curve + battery throughput budget" where="Duck Curve" />
                        <GauntletRow what="A noisy AR(1) forecast to debias and plan against" where="Frequency Frenzy" />
                        <GauntletRow what="FCAS reserve bids + scheduled dispatch calls" where="AI Grid Shock" />
                        <GauntletRow what="Prose briefs → compliance windows (SOC floors, export caps)" where="Operator's Mandate" />
                        <GauntletRow what="An EPA diesel-ban window needing an exemption" where="Operator's Mandate" />
                        <GauntletRow what="A phishing / bait directive to ignore" where="Operator's Mandate" />
                        <GauntletRow what="Real + decoy cyberattacks, IDS, sensor spoofing" where="Cybersecurity" />
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-100 p-5">
                  <h3 className="text-base font-bold text-amber-950">Build a detector, not a memoriser</h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900">
                    The Gauntlet rephrases its briefs and can shuffle the timing of incidents between runs, and the
                    scored run is graded fresh. A controller that hard-codes &quot;ack at step 30&quot; is brittle; one
                    that <em>detects</em> conditions (corroborated IDS nodes, a forecast-vs-sensor gap, a parsed
                    constraint window) generalises. The reference patterns in Cyber &amp; Phishing and Reacting to
                    Events are written to generalise on purpose.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-300 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-slate-900">One-submission checklist</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                    <li>Score 100+ on each Phase-1 scenario locally before you touch the Gauntlet.</li>
                    <li>Confirm your <code>replan</code> dedupes — check your LLM call count over a full run.</li>
                    <li>Verify each penalty line is <strong>$0</strong> in the report: containment, diesel-ban, FCAS shortfall, compliance, overvoltage, blackout.</li>
                    <li>Confirm you ignore the bait key and only write your own keys to <code>agent_plan</code>.</li>
                    <li>Check your worst-case wall-clock is comfortably under 14 minutes (LLM latency varies).</li>
                    <li>Re-read the <a href="#submission" className="font-semibold underline">Submission Guide</a>: the Gauntlet allows <strong>1</strong> attempt.</li>
                  </ul>
                </div>
              </section>

              {/* ============================ SUBMISSION ============================ */}
              <section id="submission" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-ink">Submission Guide</h2>
                  <p className="mt-2 text-base text-muted">
                    Submit your controller through the in-app{" "}
                    <Link
                      to="/watt-the-hack/city-of-melbourne-advanced-submit"
                      className="font-semibold text-emerald-700 underline hover:text-emerald-800"
                    >
                      Submission Portal
                    </Link>
                    . No zipping, no CLI: paste your code into the editor and hit submit.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-100 p-6 shadow-sm">
                  <h3 className="text-xl font-extrabold tracking-tight text-emerald-950">
                    The structure of your submission
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-950">
                    Your code can take exactly <strong>one of two shapes</strong>. The engine auto-detects which.
                    Pick the one that fits your strategy; there&apos;s no advantage to picking the more complex one if
                    you don&apos;t need it.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-blue-300 bg-blue-100 shadow-sm">
                  <div className="border-b border-blue-300 bg-blue-100 px-5 py-3">
                    <div className="flex items-baseline gap-3">
                      <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Shape 1
                      </span>
                      <h3 className="text-lg font-extrabold text-blue-950">A controller(state) function</h3>
                    </div>
                    <p className="mt-1.5 text-sm text-blue-950">
                      Use this if your controller is stateless: every step&apos;s action depends only on the current state
                      (plus the forecast). No persistent variables between timesteps.
                    </p>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`def controller(state):
    # Read state, return an action dictionary.
    soc = state["soc"]
    demand = state["demand"]
    solar = state["solar"]

    return {
        "battery_flow_mw": demand - solar,
        # Any key you omit defaults to 0.
    }`}
                    </CodeBlock>
                    <div className="mt-3 rounded-lg border border-blue-300 bg-white/60 p-3">
                      <p className="text-[13px] font-bold text-blue-950">REQUIRED</p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] text-blue-950">
                        <li>
                          The function MUST be named <code>controller</code> and take a single <code>state</code>{" "}
                          argument.
                        </li>
                        <li>It MUST return a dict (any of the action keys; missing keys default to 0).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-amber-300 bg-amber-100 shadow-sm">
                  <div className="border-b border-amber-300 bg-amber-100 px-5 py-3">
                    <div className="flex items-baseline gap-3">
                      <span className="rounded-md bg-amber-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Shape 2
                      </span>
                      <h3 className="text-lg font-extrabold text-amber-950">A Strategy class</h3>
                    </div>
                    <p className="mt-1.5 text-sm text-amber-950">
                      Use this if you need persistent state between timesteps (e.g. a rolling error buffer, a PID
                      memory, a precomputed plan from an LLM call). The engine instantiates your class once and reuses
                      it for the whole run.
                    </p>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`class Strategy:
    def __init__(self):
        # Anything you want to persist between steps lives on self.
        self.history = []

    def plan(self, initial_state):
        # OPTIONAL. Called ONCE before step 0. Right place for a slow
        # LLM call to read the scenario briefing. The dict you return
        # is stashed on state["agent_plan"] for every later step().
        return {"policy": "conserve"}

    def replan(self, state, alerts):
        # OPTIONAL. Called when qualitative alerts are active mid-run.
        # Right place for a second LLM call to react to text events.
        # Returned dict is merged into state["agent_plan"]. DEDUPE first!
        return {"policy": "respond"}

    def step(self, state):
        # REQUIRED. Called every 15-minute timestep.
        # DO NOT call an LLM here; it will time out.
        # Read state["agent_plan"] if you used plan()/replan().
        self.history.append(state["soc"])
        return {"battery_flow_mw": 10.0}`}
                    </CodeBlock>
                    <div className="mt-3 rounded-lg border border-amber-400 bg-white/60 p-3">
                      <p className="text-[13px] font-bold text-amber-950">REQUIRED</p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] text-amber-950">
                        <li>
                          The class can have <strong>any name</strong> (the starter code uses{" "}
                          <code>MyStrategy</code>) — the portal detects it automatically from your code.
                          What matters is the <code>step</code> method below, not the class name.
                        </li>
                        <li>
                          It MUST define a <code>step(self, state)</code> method, written{" "}
                          <strong>directly in this class</strong>, that returns an action dict.{" "}
                          <strong>If the class has no <code>step</code> method, the engine refuses the submission.</strong>{" "}
                          (A <code>step</code> only inherited from a base class or assigned by alias
                          isn&apos;t detected — keep it as a plain method here.)
                        </li>
                        <li>It MUST be instantiable with no args (no required <code>__init__</code> parameters).</li>
                      </ul>
                      <p className="mt-2 text-[13px] text-amber-950">
                        <code>plan(self, initial_state)</code> and <code>replan(self, state, alerts)</code> are
                        optional: the engine just skips them if you don&apos;t define them.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="openai" className="scroll-mt-24 overflow-hidden rounded-2xl border border-rose-300 bg-rose-100 shadow-sm">
                  <div className="border-b border-rose-300 bg-rose-100 px-5 py-3">
                    <h3 className="text-lg font-extrabold text-rose-950">Using the OpenAI API</h3>
                    <p className="mt-1.5 text-sm text-rose-950">
                      The evaluation platform injects <code>OPENAI_API_KEY</code> as an environment variable inside
                      your container. Read it with <code>os.environ</code>; it&apos;s already there.
                    </p>
                  </div>
                  <div className="space-y-3 p-4">
                    <CodeBlock>
{`# Works as-is on the evaluation platform.
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Use a fast model; the whole evaluation must finish within ~14 minutes.
resp = client.chat.completions.create(model="gpt-5.4-nano", messages=[...])`}
                    </CodeBlock>

                    <div className="rounded-lg border-2 border-rose-500 bg-rose-100 p-4">
                      <p className="text-sm font-extrabold uppercase tracking-wider text-rose-950">
                        ⚠ Use gpt-5.4-nano or gpt-5.4-mini
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-rose-950">
                        Your whole evaluation runs under a <strong>~14-minute budget</strong>. Stick to{" "}
                        <code>gpt-5.4-nano</code> (fastest, cheapest) or <code>gpt-5.4-mini</code>; they&apos;re quick
                        enough to stay inside it. Larger or slower models risk exceeding the budget, and your run
                        <strong> times out with no score</strong> (a timeout doesn&apos;t cost you a submission attempt, but
                        you also get no result). These models draw on a shared credit pool, so keep calls few (call in{" "}
                        <code>plan</code>/<code>replan</code>, dedupe by alert id).
                      </p>
                    </div>

                    <div className="rounded-lg border-2 border-rose-500 bg-rose-100 p-4">
                      <p className="text-sm font-extrabold uppercase tracking-wider text-rose-950">
                        ⚠ Remove your .env loading line before you submit
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-rose-950">
                        Locally you probably load your key from a <code>.env</code> file:
                      </p>
                      <div className="mt-2">
                        <CodeBlock>
{`# LOCAL TESTING ONLY. DELETE BEFORE SUBMITTING.
from dotenv import load_dotenv
load_dotenv()`}
                        </CodeBlock>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-rose-950">
                        Delete those two lines (and the <code>python-dotenv</code> entry in your{" "}
                        <code>requirements.txt</code>, if you added it) before pasting into the portal. The platform
                        doesn&apos;t ship your <code>.env</code>; the env vars are already in the container. Code that
                        tries to read a non-existent <code>.env</code> can silently no-op and leave the API key empty,
                        which then throws an <code>AuthenticationError</code> on the first LLM call.
                      </p>
                    </div>

                    <p className="text-[13px] text-rose-950">
                      Never hardcode a key in your <code>strategy.py</code>; submissions are stored and re-runnable.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="font-semibold text-ink">Extra pip dependencies?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The portal has a <strong>requirements</strong> textarea right under the code editor. Paste any
                    additional pip packages your strategy needs there (one per line, same format as a normal{" "}
                    <code>requirements.txt</code>). The platform builds a fresh container with those packages installed
                    before running your code. Common ones (<code>numpy</code>, <code>scipy</code>, <code>pandas</code>,
                    the OpenAI SDK) are already in the base image, so you don&apos;t need to list them.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-300 bg-slate-100 p-5">
                  <h3 className="font-semibold text-ink">Submission attempts are capped per scenario</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Each scenario allows 3 submissions. <strong>The Gauntlet allows 1.</strong> The portal shows your
                    remaining count before you submit. Spend them wisely; playtest locally first. (A run that{" "}
                    <code>TIMEOUT</code>s does not consume an attempt — but it also returns no score.)
                  </p>
                </div>
              </section>
            </div>
          </div>
  );
}

function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <h4 className="mb-0.5 px-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{label}</h4>
      {children}
    </div>
  );
}

function MiniFact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-white/70 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-slate-800">{children}</p>
    </div>
  );
}

function StepCard({
  n,
  title,
  href,
  children,
}: {
  n: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-[12px] font-extrabold text-white">
          {n}
        </span>
        <a href={href} className="text-sm font-bold text-ink hover:text-sky-700 hover:underline">
          {title}
        </a>
      </div>
      <div className="mt-2.5 text-[13px] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function GauntletRow({ what, where }: { what: string; where: string }) {
  return (
    <tr className="border-t border-slate-200 align-top">
      <td className="px-3 py-2 text-slate-700">{what}</td>
      <td className="px-3 py-2 font-medium text-slate-900">{where}</td>
    </tr>
  );
}

// Only the LLM/agentic scenarios — the earlier ones (Duck Curve, Frequency
// Frenzy, AI Grid Shock) don't use an LLM, so there's no LLM-call budget to manage.
const ALERT_BUDGET: { scenario: string; distinct: number; replans: string }[] = [
  { scenario: "The Operator's Mandate", distinct: 13, replans: "~73" },
  { scenario: "Cybersecurity", distinct: 11, replans: "~92" },
  { scenario: "The Gauntlet", distinct: 18, replans: "~119" },
];

function AlertBudgetTable() {
  return (
    <div className="rounded-lg border border-slate-300 bg-white px-5 py-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-300 text-[11px] uppercase tracking-wide text-slate-500">
              <th className="py-2 pr-4 font-semibold">Scenario</th>
              <th className="py-2 pr-4 font-semibold">Distinct alerts (your LLM-call budget)</th>
              <th className="py-2 font-semibold">replan() firings if you don&apos;t dedupe</th>
            </tr>
          </thead>
          <tbody>
            {ALERT_BUDGET.map((row) => (
              <tr key={row.scenario} className="border-t border-slate-200 align-top">
                <td className="py-2 pr-4 font-medium text-slate-900">{row.scenario}</td>
                <td className="py-2 pr-4 tabular-nums text-emerald-700">{row.distinct}</td>
                <td className="py-2 tabular-nums text-rose-700">{row.replans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
        The middle column is the number of <strong>unique</strong> alerts — dedupe by <code>id</code> and that&apos;s
        how many times you do real work. The right column is how often <code>replan()</code> is called if you{" "}
        <em>don&apos;t</em> dedupe: firing an LLM on each of those will time you out. Figures are for the scored
        (judging) runs and may shift slightly as scenarios are tuned; treat them as ceilings, not contracts.
      </p>
    </div>
  );
}
