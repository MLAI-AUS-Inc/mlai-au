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
                <SidebarLink href="#agentic" icon={<BrainCircuitIcon className="h-4 w-4" />}>
                  Agentic Strategies
                </SidebarLink>
              </nav>
            </aside>

            <div className="min-w-0 flex-1 space-y-10 pb-12">
              <section id="introduction" className="scroll-mt-24">
                <div className="rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-50 via-white to-blue-50/40 p-6 shadow-sm sm:p-8">
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
                    Frequency Control Ancillary Services. You can reserve a portion of your battery's{" "}
                    <strong>inverter capacity</strong> to provide stability to the broader grid, earning a steady revenue
                    stream.
                  </ComponentCard>
                </div>

                <div className="rounded-xl border border-blue-200/70 bg-blue-50/95 p-5">
                  <h3 className="text-base font-bold text-blue-900">The Inverter Bottleneck</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-900/90">
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

                  <ConstraintRow title="Throughput Budget" tone="warning">
                    Batteries degrade. In some scenarios, you are given a total throughput budget (MWh). Every MWh you
                    charge or discharge permanently consumes this budget. Once depleted, you can no longer use the
                    battery.
                  </ConstraintRow>
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

                <div className="rounded-xl border border-blue-200/70 bg-blue-50/95 p-5">
                  <h3 className="text-base font-bold text-blue-900">Persistent Memory (Saving Arrays between Steps)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-900/90">
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

                <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/95 p-5">
                  <h3 className="text-base font-bold text-emerald-900">Tips for Success</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-emerald-900/90">
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
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Submission Guide</h2>
                  <p className="mt-1 text-sm text-muted">
                    Once you're happy with how your controller performs locally, it's time to submit it for the official
                    cloud evaluation.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ComponentCard
                    title="Required Files"
                    icon={<CodeIcon className="h-5 w-5 text-emerald-600" />}
                    bgColor="bg-emerald-50"
                  >
                    Your submission must be a ZIP file containing:
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        <code>strategy.py</code>: Your logic.
                      </li>
                      <li>
                        <code>requirements.txt</code>: Any pip dependencies you need.
                      </li>
                      <li>
                        <code>metadata.json</code> (Optional): Used if you rename your function or use a class.
                      </li>
                    </ul>
                  </ComponentCard>

                  <ComponentCard
                    title="Cloud Isolation"
                    icon={<BuildingIcon className="h-5 w-5 text-slate-600" />}
                    bgColor="bg-slate-50"
                  >
                    Your code runs on our Google Kubernetes Engine platform. We use Kaniko to securely build an isolated
                    Docker environment pre-loaded with the dependencies from your <code>requirements.txt</code>.
                  </ComponentCard>
                </div>

                <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
                  <h3 className="mb-2 font-semibold text-ink">Creating the ZIP Archive (CLI)</h3>
                  <p className="mb-3 text-sm text-muted">
                    Depending on your OS, run the following commands in the folder containing your files:
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-slate-700">Windows (PowerShell)</h4>
                      <CodeBlock>{`Compress-Archive -Path strategy.py, requirements.txt, metadata.json -DestinationPath submission.zip -Force`}</CodeBlock>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-slate-700">Mac / Linux / WSL</h4>
                      <CodeBlock>{`zip submission.zip strategy.py requirements.txt metadata.json`}</CodeBlock>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-muted">
                    Submit this ZIP file via the{" "}
                    <Link
                      to="/watt-the-hack/city-of-melbourne-advanced-submit"
                      className="text-emerald-600 underline hover:text-emerald-700"
                    >
                      <strong>Submission Portal</strong>
                    </Link>
                    .
                  </p>
                </div>
              </section>

              <section id="agentic" className="scroll-mt-24 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">Advanced: Agentic Strategies</h2>
                  <p className="mt-1 text-sm text-muted">
                    For scenarios with text events (like cyberattacks or policy changes), you can use an Object-Oriented
                    approach. This lets you hook up Large Language Models (LLMs) to reason about the grid state.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200/70 bg-amber-50/95 p-5">
                  <h3 className="text-base font-bold text-amber-900">
                    The <code>Strategy</code> Class
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
                    Instead of a simple <code>controller(state)</code> function, you can submit a Python class named{" "}
                    <code>Strategy</code>. Just make sure to set <code>"class_name": "Strategy"</code> in your{" "}
                    <code>metadata.json</code> file.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <div className="border-b border-line/60 bg-subtle px-4 py-2.5">
                    <h3 className="font-mono text-sm font-semibold text-ink">Lifecycle Hooks</h3>
                  </div>
                  <div className="p-4">
                    <CodeBlock>
{`class Strategy:
    def plan(self, initial_state):
        # Called once at the start of the simulation.
        # Ideal for making a single, slow LLM call to process the initial scenario briefing.
        # The engine automatically persists the dictionary you return inside state["agent_plan"].
        return {"policy": "aggressive_saving"}

    def replan(self, state, alerts):
        # Called only when a new qualitative alert fires (e.g. "DIESEL GENERATOR BANNED").
        # Make a new LLM call to adjust your strategy based on the text.
        # The engine will merge your returned dictionary into state["agent_plan"].
        return {"policy": "conserve_diesel"}

    def step(self, state):
        # Called every 15-minute timestep.
        # DO NOT MAKE LLM CALLS HERE! It will time out.
        # Instead, read the pre-computed plan from state.get("agent_plan", {}).

        my_plan = state.get("agent_plan", {})
        if my_plan.get("policy") == "conserve_diesel":
            return {"emergency_generator": 0.0}

        return {"battery_flow_mw": 10.0}`}
                    </CodeBlock>
                  </div>
                </div>

                <div className="space-y-4">
                  <ConstraintRow title="API Keys" tone="warning">
                    When you submit an agentic strategy, the cloud evaluation platform securely injects{" "}
                    <code>OPENAI_API_KEY</code> and <code>ANTHROPIC_API_KEY</code> environment variables into your
                    isolated pod. You do not (and should not) hardcode your API keys in your submission!
                  </ConstraintRow>
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
      card: "border-sky-200 bg-sky-50/95",
      title: "text-sky-950",
      body: "text-slate-700",
      accent: "bg-sky-400",
    },
    warning: {
      card: "border-amber-300 bg-amber-100/90",
      title: "text-amber-950",
      body: "text-amber-950/85",
      accent: "bg-amber-400",
    },
    danger: {
      card: "border-rose-300 bg-rose-100/90",
      title: "text-rose-950",
      body: "text-rose-950/85",
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-[#0E1525] p-3.5 font-mono text-[12.5px] leading-relaxed text-slate-300">
      <code>{children}</code>
    </pre>
  );
}
