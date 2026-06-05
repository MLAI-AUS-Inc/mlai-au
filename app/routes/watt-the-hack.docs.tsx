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
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

const BACKDROP_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2021%2C%202026%2C%2010_33_57%20PM%20(1).png?alt=media&token=d14521c8-c549-434c-bb27-643ab95189ad";

export default function DocsPage() {
  return (
    <div
      className="relative min-h-full"
      style={{
        backgroundImage: `url("${BACKDROP_URL}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-full bg-canvas/70 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <aside className="hidden w-52 shrink-0 lg:block">
              <nav className="sticky top-6 flex flex-col gap-1 rounded-2xl border border-line/70 bg-surface/95 p-3 shadow-sm backdrop-blur">
                <h4 className="mb-1 px-2 pt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  On this page
                </h4>
                <SidebarLink href="#introduction" icon={<InfoIcon className="h-4 w-4" />}>
                  Introduction
                </SidebarLink>
                <SidebarLink href="#grid-components" icon={<ZapIcon className="h-4 w-4" />}>
                  Grid Components
                </SidebarLink>
                <SidebarLink href="#financials" icon={<DollarSignIcon className="h-4 w-4" />}>
                  Financials &amp; Constraints
                </SidebarLink>
                <SidebarLink href="#common-pitfalls" icon={<AlertCircleIcon className="h-4 w-4" />}>
                  Common Pitfalls
                </SidebarLink>
                <SidebarLink href="#controllers" icon={<CodeIcon className="h-4 w-4" />}>
                  Writing a Controller
                </SidebarLink>
                <SidebarLink href="#playtesting" icon={<TerminalIcon className="h-4 w-4" />}>
                  Local Playtesting
                </SidebarLink>
                <SidebarLink href="#submission" icon={<SendIcon className="h-4 w-4" />}>
                  Submission Guide
                </SidebarLink>
                <SidebarLink href="#python" icon={<StackIcon className="h-4 w-4" />}>
                  Persisting State &amp; Python
                </SidebarLink>
                <SidebarLink href="#agentic" icon={<BrainCircuitIcon className="h-4 w-4" />}>
                  Agentic Strategies
                </SidebarLink>
              </nav>
            </aside>

            <div className="min-w-0 flex-1 space-y-10 pb-12">
              <section id="introduction" className="scroll-mt-24">
                <div className="rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50 via-white to-blue-50/40 p-6 shadow-sm sm:p-8">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Grid Simulator Mechanics
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                    Welcome to the Watt-The-Hack Advanced Track docs. Here you'll find everything you need to know about
                    the grid components, financial constraints, and API endpoints to help you build a winning controller.
                  </p>
                </div>
              </section>

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
                    The city's connection to the broader energy market. You can import energy (buying at the dynamic
                    import tariff) or export energy (selling at the export tariff). It has strict{" "}
                    <strong>Import Caps</strong> (default 120 MW) and <strong>Export Caps</strong> (default 50 MW).
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

              <section id="financials" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Financials &amp; Constraints</h2>
                  <p className="mt-1 text-sm text-muted">
                    Your leaderboard score is the total cost accumulated over the run. Lower is better, and a negative
                    score means you actually turned a profit!
                  </p>
                </div>

                <div className="space-y-4">
                  <ConstraintRow title="Dynamic Import Tariff">
                    This is what it costs to import power from the external grid. It fluctuates wildly based on the time
                    of day and market conditions. You can read it via <code>state["price"]</code>. The goal is simple:
                    buy low, and avoid buying high.
                  </ConstraintRow>

                  <ConstraintRow title="Static Export Tariff">
                    When you export excess solar or battery power to the grid, you earn this flat rate (default $50/MWh).
                  </ConstraintRow>

                  <ConstraintRow title="Blackout Penalty" tone="danger">
                    If Demand &gt; (Solar + Battery Discharge + Diesel + Grid Import Cap), the city suffers a blackout.
                    This triggers an extremely punishing penalty per MWh. You should avoid this at all costs.
                  </ConstraintRow>

                  <ConstraintRow title="Overvoltage Penalty" tone="danger">
                    If (Solar + Battery Discharge) &gt; (Demand + Grid Export Cap), the grid is overwhelmed by your
                    exports. This incurs a severe overvoltage penalty. Use <code>curtail_solar</code> or charge your
                    battery to prevent this.
                  </ConstraintRow>

                  <ConstraintRow title="Leaderboard Scoring" tone="warning">
                    Submitting the provided starter template will yield <strong>0 points</strong>. You must write a
                    controller that performs strictly better than the naive baseline to score points. The better your
                    controller relative to the optimal solution, the closer you get to 100 points!
                  </ConstraintRow>

                  <ConstraintRow title="Battery Wear" tone="warning">
                    Cycling the battery isn&apos;t free. Every MWh you move through it — charging <em>or</em>{" "}
                    discharging — costs <strong>$50/MWh</strong> in wear, so needless round-trips quietly eat your
                    score. Separately, a <strong>ramp charge</strong> penalises sudden swings in your{" "}
                    <strong>net grid power</strong> between steps (≈ $1 × ΔMW², so a 30 MW swing ≈ $900) — and since the
                    battery is your main lever on the grid draw, jerky dispatch feeds straight into it. Smooth, gradual
                    moves are much cheaper than slamming between extremes. (Full rates in the cost reference below.)
                  </ConstraintRow>

                  <ConstraintRow title="Throughput Budget" tone="warning">
                    Batteries degrade. In some scenarios, you are given a total throughput budget (MWh). Every MWh you
                    charge or discharge permanently consumes this budget. Once depleted, you can no longer use the
                    battery.
                  </ConstraintRow>

                  <CostReferenceTable />
                </div>
              </section>

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
                    title="Capacity vs Inverter Limit"
                    icon={<BatteryFullIcon className="h-5 w-5 text-indigo-600" />}
                    bgColor="bg-indigo-50"
                  >
                    A massive 100 MWh battery is useless if its <strong>inverter limit</strong> is only 10 MW. The
                    inverter caps how much power (MW) can flow in or out per step. You cannot dump all 100 MWh onto the
                    grid in one 15-minute step!
                  </ComponentCard>

                  <ComponentCard
                    title="Negative Prices"
                    icon={<DollarSignIcon className="h-5 w-5 text-green-600" />}
                    bgColor="bg-green-50"
                  >
                    When <code>price</code> is negative (e.g., -$20/MWh), the grid is oversupplied. This means you get{" "}
                    <strong>paid to import</strong> (charge your battery) and you will be{" "}
                    <strong>charged money to export</strong>. Curtail your solar to avoid paying the grid to take your
                    power!
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

              <section id="controllers" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Writing a Controller</h2>
                  <p className="mt-1 text-sm text-muted">
                    Your controller is just a Python function that runs every timestep. It takes in a <code>state</code>{" "}
                    dictionary and returns an <code>action</code> dictionary.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">The State Dictionary</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`{
  "time": 42,                  # Timestep index
  "demand": 145.2,             # Current city demand (MW) (current step only!)
  "solar": 80.5,               # Current solar generation (MW) (current step only!)
  "soc": 0.45,                 # Battery state of charge (current step only)
  "price": 120.0,              # Current import tariff ($/MWh)
  "features": {                # Dictionary of active mechanics
    "battery": true,
    "fcas": false
  },
  "alerts": [                  # List of qualitative events
    {"type": "qualitative_alert", "text": "DIESEL BANNED"}
  ],
  "forecast": {                # Lookahead arrays (use these for horizon planning!)
    "demand": [146.1, 150.2, ...],
    "solar": [82.1, 85.0, ...],
    "price": [125.0, 150.0, ...]
  },
  "battery_throughput_remaining_mwh": 500.0  # If throughput_budget is active
}`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">The Action Dictionary</h3>
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
        # Positive = discharge to grid, Negative = charge from grid
        # Bounded by: inverter limit, SOC, and throughput budget
        "battery_flow_mw": 10.5,

        # MW of emergency diesel generation to dispatch [0, max_limit]
        "emergency_generator": 0.0,

        # MW of solar to intentionally disconnect (prevents overvoltage)
        "curtail_solar": 0.0,

        # MW of inverter capacity to lock for frequency control
        # This capacity cannot be used for charging/discharging this step!
        "fcas_reserve_mw": 5.0
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

                <div className="rounded-xl border border-blue-300 bg-blue-100 p-5">
                  <h3 className="text-base font-bold text-blue-950">Persistent Memory (Saving Arrays between Steps)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-950">
                    Because <code>step(state)</code> is called repeatedly, any standard local variables you create inside
                    the function will be lost. To persist an array or variable across time steps (e.g., keeping track of
                    history or past errors for PID control), you should use the <strong>Strategy Class</strong> approach
                    (see Agentic Strategies section).
                    <br />
                    <br />
                    Inside the class, you can define an <code>__init__</code> method or initialize properties in the{" "}
                    <code>plan()</code> method and assign them to <code>self.my_history = []</code>.
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-5">
                  <h3 className="text-base font-bold text-emerald-950">Tips for Success</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-emerald-950">
                    <li>
                      <strong>Don't trust the forecast implicitly:</strong> Forecasts have AR(1) noise and can be
                      deliberately skewed by cyberattacks or forecast biases in later scenarios.
                    </li>
                    <li>
                      <strong>Respect the Inverter:</strong> The battery cannot charge/discharge faster than its inverter
                      limit. Furthermore, any capacity assigned to <code>fcas_reserve_mw</code> reduces your available
                      inverter bandwidth for normal flow.
                    </li>
                    <li>
                      <strong>Watch the Caps:</strong> Just because you have 100 MW of excess solar doesn't mean you can
                      export it all. If the grid export cap is 50 MW, the remaining 50 MW will cause an overvoltage
                      penalty unless you curtail it.
                    </li>
                  </ul>
                </div>
              </section>

              <section id="playtesting" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Local Installation &amp; Playtesting</h2>
                  <p className="mt-1 text-sm text-muted">
                    You can run the simulation locally using our public Python engine. It's the best way to iterate on
                    your controller before submitting it to the judging server.
                  </p>
                </div>

                <div className="space-y-4">
                  <ConstraintRow title="1. Install the Engine">
                    The public engine is hosted on GitHub. Install it via pip:
                    <CodeBlock>{`pip install git+https://github.com/AaronEliasZachariah/Watt-The-Hack-Engine-Public.git`}</CodeBlock>
                    <div className="mt-2 text-xs text-muted">
                      <em>
                        Note: As new scenarios are released, run this command again with{" "}
                        <code>--upgrade --force-reinstall</code> to get the latest content.
                      </em>
                    </div>
                  </ConstraintRow>

                  <ConstraintRow title="2. Run the Playtest Harness">
                    Use the built-in playtest CLI to run your controller against a specific scenario. It generates an
                    HTML report with performance graphs and raw metric logs.
                    <CodeBlock>{`python -m watt_the_hack.playtest strategy.py --scenario t1_welcome --open-report`}</CodeBlock>
                  </ConstraintRow>

                  <ConstraintRow title="3. View Available Scenarios">
                    List all the scenarios currently unlocked in your installed package:
                    <CodeBlock>{`python -m watt_the_hack.playtest --list-scenarios`}</CodeBlock>
                  </ConstraintRow>
                </div>
              </section>

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
                    Pick the one that fits your strategy; there's no advantage to picking the more complex one if
                    you don't need it.
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
                      Use this if your controller is stateless: every step's action depends only on the current state
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
        # OPTIONAL. Called when new qualitative alerts fire mid-run.
        # Right place for a second LLM call to react to text events.
        # Returned dict is merged into state["agent_plan"].
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
                        optional: the engine just skips them if you don't define them.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="openai" className="scroll-mt-24 overflow-hidden rounded-2xl border border-rose-300 bg-rose-100 shadow-sm">
                  <div className="border-b border-rose-300 bg-rose-100 px-5 py-3">
                    <h3 className="text-lg font-extrabold text-rose-950">Using the OpenAI API</h3>
                    <p className="mt-1.5 text-sm text-rose-950">
                      The evaluation platform injects <code>OPENAI_API_KEY</code> as an environment variable inside
                      your container. Read it with <code>os.environ</code>; it's already there.
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
                        <code>gpt-5.4-nano</code> (fastest, cheapest) or <code>gpt-5.4-mini</code>; they're quick
                        enough to stay inside it. Larger or slower models risk exceeding the budget, and your run
                        <strong> times out with no score</strong> (a timeout doesn't cost you a submission attempt, but
                        you also get no result). These models draw on a shared credit pool, so keep calls few (see the
                        cadence rule below).
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
                        doesn't ship your <code>.env</code>; the env vars are already in the container. Code that
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
                    the OpenAI SDK) are already in the base image, so you don't need to list them.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-300 bg-slate-100 p-5">
                  <h3 className="font-semibold text-ink">Submission attempts are capped per scenario</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Each scenario allows 3 submissions. <strong>The Gauntlet allows 1.</strong> The portal shows your
                    remaining count before you submit. Spend them wisely; playtest locally first.
                  </p>
                </div>
              </section>

              <section id="python" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Persisting state &amp; Python essentials</h2>
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
                      Anything you write into the <code>state</code> dict you&apos;re handed. The engine rebuilds that
                      view fresh each step, so <code>state["my_thing"] = ...</code> is discarded. Use{" "}
                      <code>self.*</code> or a module-level variable instead.
                    </li>
                  </ul>
                  <p className="mt-2">
                    The one channel the engine deliberately carries forward is <code>state["agent_plan"]</code>, which
                    holds whatever your <code>plan()</code> / <code>replan()</code> returned (see Agentic Strategies).
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

              <section id="agentic" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Advanced: LLM-driven strategies</h2>
                  <p className="mt-1 text-sm text-muted">
                    Some scenarios surface qualitative text events (cyberattacks, policy changes, operator mandates).
                    The <code>Strategy</code> class lifecycle is built to let you reason about them with an LLM
                    without blowing the evaluation's time budget. See <strong>Shape 2: A Strategy class</strong>{" "}
                    above for the skeleton, and the <strong>OpenAI</strong> section for env-var setup.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-100 p-5">
                  <h3 className="text-base font-bold text-amber-950">
                    The LLM budget rule: call it in <code>plan</code> / <code>replan</code>, never <code>step</code>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-950">
                    Your <strong>entire evaluation</strong> (every timestep of the run) must finish within{" "}
                    <strong>~14 minutes</strong> of wall-clock. There is no per-step rescue: if the run as a whole
                    exceeds the budget it ends in <code>TIMEOUT</code> with <strong>no score</strong>. (A timeout is a
                    free retry: it doesn't burn one of your 3 attempts, but you still get nothing back.) So the LLM
                    has to live where it's called rarely:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-amber-950">
                    <li>
                      <code>plan(initial_state)</code> runs <strong>once</strong> before step 0: the right place for an
                      LLM call to read the scenario briefing and pick a high-level policy.
                    </li>
                    <li>
                      <code>replan(state, alerts)</code> runs <strong>only when a new qualitative alert fires</strong>.{" "}
                      Call the LLM here to react to text events. The dict you return is merged into{" "}
                      <code>state["agent_plan"]</code> for every subsequent step.
                    </li>
                    <li>
                      <strong>
                        Never call an LLM from <code>step(state)</code>.
                      </strong>{" "}
                      It runs every 15 simulated minutes; a network call there is multiplied across the whole run and
                      will blow the 14-minute budget. Instead read{" "}
                      <code>state.get("agent_plan", {`{}`})</code> and branch on the cached policy: LLM-quality
                      decisions at deterministic-controller latency.
                    </li>
                    <li>
                      Keep models fast: <code>gpt-5.4-nano</code> or <code>gpt-5.4-mini</code> (see the OpenAI section).
                      Even in <code>plan</code>/<code>replan</code>, a slow model called repeatedly can run you over.
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-medium text-muted transition-colors hover:bg-subtle hover:text-ink"
    >
      <span className="text-sky-500">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </a>
  );
}

function ComponentCard({
  title,
  icon,
  bgColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bgColor}`}>{icon}</div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="mt-2.5 text-[13px] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function ConstraintRow({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "warning" | "danger";
}) {
  const tones = {
    default: {
      card: "border-sky-300 bg-sky-100",
      title: "text-sky-950",
      body: "text-slate-700",
      accent: "bg-sky-400",
    },
    warning: {
      card: "border-amber-300 bg-amber-100",
      title: "text-amber-950",
      body: "text-amber-950",
      accent: "bg-amber-400",
    },
    danger: {
      card: "border-rose-300 bg-rose-100",
      title: "text-rose-950",
      body: "text-rose-950",
      accent: "bg-rose-400",
    },
  };
  const style = tones[tone];

  return (
    <div className={`relative flex flex-col gap-2 overflow-hidden rounded-lg border pl-5 pr-4 py-3 sm:flex-row sm:items-start sm:gap-4 ${style.card}`}>
      <div className={`absolute inset-y-0 left-0 w-1.5 ${style.accent}`} />
      <div className="sm:w-1/3">
        <h4 className={`font-semibold ${style.title}`}>{title}</h4>
      </div>
      <div className={`min-w-0 text-sm leading-relaxed sm:w-2/3 ${style.body}`}>{children}</div>
    </div>
  );
}

const COST_REFERENCE: {
  group: string;
  rows: { key: string; what: string; rate: string; income?: boolean }[];
}[] = [
  {
    group: "Core — charged in every scenario",
    rows: [
      {
        key: "tariff_import",
        what: "Buying power from the external grid.",
        rate: 'price × MWh imported — dynamic, read state["price"] ($/MWh)',
      },
      {
        key: "tariff_export",
        what: "Selling surplus solar or battery power back to the grid.",
        rate: "$50 / MWh exported",
        income: true,
      },
      {
        key: "demand_charge",
        what: "Your single biggest import spike, billed once for the whole run (peak-shaving discipline).",
        rate: "$1,000 / MW of peak import",
      },
      {
        key: "carbon_cost",
        what: "Carbon price on CO₂ from grid imports + diesel. Scenarios can override grid intensity.",
        rate: "$50 / kg CO₂ · grid ≈ 0.7, diesel ≈ 0.27 kg/MWh",
      },
      {
        key: "battery_wear",
        what: "Wear from cycling the battery — charging or discharging.",
        rate: "$50 / MWh moved",
      },
      {
        key: "ramp_charge",
        what: "Smoothness penalty on the step-to-step change in net grid power.",
        rate: "(ΔMW)² × $1",
      },
      {
        key: "generator_fuel",
        what: "Running the diesel generator.",
        rate: "$1,000 / MWh",
      },
      {
        key: "blackout_penalty",
        what: "Unmet demand (load shed). Avoid at all costs.",
        rate: "$100,000 / MWh",
      },
      {
        key: "overvoltage_penalty",
        what: "Exporting beyond the grid export cap.",
        rate: "$5,000 / MWh",
      },
    ],
  },
  {
    group: "FCAS — when the scenario enables the reserve market",
    rows: [
      {
        key: "fcas_revenue",
        what: "Availability pay for capacity you keep on standby (whether or not it's called).",
        rate: "$40 / MW / hour reserved",
        income: true,
      },
      {
        key: "fcas_dispatch_bonus",
        what: "Energy you actually deliver when a dispatch event calls your reserve.",
        rate: "$200 / MWh delivered",
        income: true,
      },
      {
        key: "fcas_shortfall_penalty",
        what: "Failing to deliver a called dispatch — bid only what your SOC can back.",
        rate: "$100,000 / MWh short",
      },
      {
        key: "fcas_ramp_charge",
        what: "Volatility in your reserve bid between steps.",
        rate: "$500 / MW of change",
      },
    ],
  },
  {
    group: "Advanced scenarios only — $0 unless that mechanic is live",
    rows: [
      {
        key: "compliance_penalty",
        what: "Breaching an Operator's-Mandate window you opted into (SOC floor / export cap).",
        rate: "$2,000,000 / SOC-unit · $500,000 / MW over cap, per step",
      },
      {
        key: "diesel_ban_penalty",
        what: "Running diesel during a ban with no valid agent_plan exemption.",
        rate: "$3,000 / MWh",
      },
      {
        key: "anomaly_ack_fine",
        what: "Each step inside an anomaly window you didn't acknowledge in agent_plan.",
        rate: "$5,000 / step",
      },
      {
        key: "cyber_containment_fine",
        what: "Missing a real attack, or acknowledging a fake one.",
        rate: "$50,000 each",
      },
      {
        key: "ids_cost",
        what: "Subscribing to the intrusion-detection signal.",
        rate: "flat per-step fee set by the scenario",
      },
      {
        key: "phishing_fine",
        what: "Acting on a phishing / bait directive.",
        rate: "fine set by the scenario",
      },
    ],
  },
];

function CostReferenceTable() {
  return (
    <div className="rounded-lg border border-slate-300 bg-white px-5 py-4">
      <h4 className="font-semibold text-slate-900">Cost &amp; penalty reference</h4>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">
        Every line that can appear in your <code>cost_breakdown</code>, with the exact rate the engine applies.
        Positive numbers are costs; <span className="font-semibold text-emerald-700">green is income</span>. Most rows
        read $0 unless their mechanic is active in the scenario you&apos;re running — the bottom two groups only fire in
        the advanced scenarios.
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-300 text-[11px] uppercase tracking-wide text-slate-500">
              <th className="py-2 pr-4 font-semibold">Line item</th>
              <th className="py-2 pr-4 font-semibold">What it is</th>
              <th className="py-2 font-semibold">Rate</th>
            </tr>
          </thead>
          {COST_REFERENCE.map((section) => (
            <tbody key={section.group}>
              <tr>
                <td
                  colSpan={3}
                  className="pt-4 pb-1 text-[11px] font-bold uppercase tracking-wider text-sky-700"
                >
                  {section.group}
                </td>
              </tr>
              {section.rows.map((row) => (
                <tr key={row.key} className="border-t border-slate-200 align-top">
                  <td className="py-2 pr-4">
                    <code>{row.key}</code>
                  </td>
                  <td className="py-2 pr-4 text-slate-700">{row.what}</td>
                  <td
                    className={`py-2 font-medium tabular-nums ${row.income ? "text-emerald-700" : "text-slate-900"}`}
                  >
                    {row.rate}
                    {row.income ? " (income)" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-[#0E1525] p-3.5 font-mono text-[12.5px] leading-relaxed text-slate-300">
      <code>{children}</code>
    </pre>
  );
}
