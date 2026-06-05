// Cluster-ready controller templates for the Watt The Hack submission portal.
//
// Mirrors the sandbox templates in `Watt-The-Hack/frontend/lib/controller-templates.ts`
// but adapted for cluster eval (no `load_dotenv` line in operators_mandate —
// OPENAI_API_KEY is injected into the eval pod by the platform, not by a .env
// file the participant would have to ship).
//
// When the canonical templates in the engine repo change, regenerate this file
// by hand for now. (Future: extend `scripts/sync_templates.py` to also emit
// here so the two stay in lockstep.)

export interface ControllerTemplate {
  id: string;
  label: string;
  description: string;
  source: string;
}

const DO_NOTHING_SOURCE = `def controller(state):
    """
    Baseline: emit zero for every action, every step.

    The grid will fully serve demand from imports (no battery, no diesel,
    no curtailment). Useful as a sanity check and a worst-case score
    floor: any other controller should beat this on cost.
    """
    return {
        "battery_flow_mw": 0.0,
        "emergency_generator": 0.0,
        "curtail_solar": 0.0,
        "fcas_reserve_mw": 0.0,
    }
`;

const TEMPLATE_DUCK_CURVE_SOURCE = `def controller(state):
    """
    Welcome to your first controller!

    Called every 15 minutes of the simulation. Manage the site's battery,
    solar curtailment, and diesel generator to keep costs as low as possible.
    """

    # 1. Read the current state of the site
    soc    = float(state["soc"])     # Battery state of charge (0.0 to 1.0)
    demand = float(state["demand"])  # How much power the site is using (MW)
    solar  = float(state["solar"])   # How much power the solar panels are generating (MW)

    # 2. Net imbalance: positive = need more power; negative = have surplus
    net_imbalance = demand - solar

    # 3. Simple rule: charge from solar, discharge into deficits.
    battery_flow = 0.0
    if net_imbalance < 0 and soc < 1.0:
        battery_flow = -1.0      # negative = charging
    elif net_imbalance > 0 and soc > 0.0:
        battery_flow = 1.0       # positive = discharging

    # 4. Respect grid caps to avoid penalties.
    EXPORT_CAP_MW = 50.0
    IMPORT_CAP_MW = 120.0
    net_after_battery = net_imbalance - battery_flow
    curtail = max(0.0, -net_after_battery - EXPORT_CAP_MW)
    diesel  = max(0.0,  net_after_battery - IMPORT_CAP_MW)

    return {
        "battery_flow_mw":     battery_flow,
        "curtail_solar":       curtail,
        "emergency_generator": diesel,
        "fcas_reserve_mw":     0.0,
    }
`;

const TEMPLATE_FREQUENCY_FRENZY_SOURCE = `class Strategy:
    """
    Forecast Controller Template — Frequency Frenzy.

    This scenario introduces the 'forecast' dictionary in state. Instead of
    only looking at current conditions, you can look ahead 12 steps (3 hours)
    to anticipate demand spikes and pre-charge the battery before they hit.
    """

    def __init__(self):
        pass

    def step(self, state):
        soc        = float(state.get("soc", 0.0))
        demand_mw  = float(state.get("demand", 0.0))
        solar_mw   = float(state.get("solar", 0.0))

        forecast_demand = state.get("forecast", {}).get("demand", [])
        forecast_solar  = state.get("forecast", {}).get("solar", [])

        current_net = demand_mw - solar_mw
        battery_flow = 0.0

        # 1. Detect an impending demand spike in the forecast window.
        impending_spike = False
        if forecast_demand and forecast_solar:
            for predicted_demand, predicted_solar in zip(forecast_demand, forecast_solar):
                if predicted_demand - predicted_solar > 110.0:
                    impending_spike = True
                    break

        # 2. Pre-position the battery based on what's coming.
        if impending_spike and soc < 0.90:
            battery_flow = -25.0           # pre-charge fast
        elif current_net > 0 and soc > 0.10:
            battery_flow = min(current_net, 25.0)
        elif current_net < 0 and soc < 1.0:
            battery_flow = -min(abs(current_net), 25.0)

        # 3. Grid caps.
        net_after_battery = current_net - battery_flow
        curtail = max(0.0, -net_after_battery - 50.0)
        diesel  = max(0.0,  net_after_battery - 120.0)

        return {
            "battery_flow_mw":     battery_flow,
            "curtail_solar":       curtail,
            "emergency_generator": diesel,
            "fcas_reserve_mw":     0.0,
        }
`;

const TEMPLATE_AI_GRID_SHOCK_SOURCE = `def controller(state):
    """
    AI Grid Shock — managing energy for a large AI datacentre over 3 days
    of volatile GPU-driven load.

    Important: spot price lags true cost by 2-3 steps. By the time price
    rises to confirm a spike, it may be too late to react.
    """

    soc    = float(state["soc"])      # 0.0 to 1.0
    demand = float(state["demand"])   # MW
    solar  = float(state["solar"])    # MW
    price  = float(state["price"])    # $/MWh (lags true cost)

    net_imbalance = demand - solar

    # Read alerts and forecasts (forecasts underestimate during GPU saturation).
    alerts          = state.get("alerts", [])
    forecast_demand = state.get("forecast", {}).get("demand", [])
    forecast_price  = state.get("forecast", {}).get("price", [])

    battery_flow = 0.0
    if price < 0 and soc < 1.0:
        battery_flow = -10.0   # cheap to charge
    elif price > 0.30 and soc > 0.0:
        battery_flow = 10.0    # use battery instead of importing

    # FCAS reserve eats into your inverter — every MW reserved is unavailable
    # for arbitrage. Worth tuning.
    fcas_reserve = 0.0

    IMPORT_CAP_MW = 120.0
    EXPORT_CAP_MW = 50.0
    net_after_battery = net_imbalance - battery_flow
    diesel  = max(0.0,  net_after_battery - IMPORT_CAP_MW)
    curtail = max(0.0, -net_after_battery - EXPORT_CAP_MW)

    return {
        "battery_flow_mw":     battery_flow,
        "curtail_solar":       curtail,
        "emergency_generator": diesel,
        "fcas_reserve_mw":     fcas_reserve,
    }
`;

const TEMPLATE_OPERATORS_MANDATE_SOURCE = `"""Operator's Mandate — your first AGENTIC controller.

What's new in this scenario:
  Text alerts arrive in state["alerts"]. They come from AEMO (the regulator),
  SES (emergency services), vendors, and occasionally phishing emails dressed
  up as official notices. Your controller has to read the prose and react.
  There is no neat numeric forecast — it's English.

How this template handles it:
  1. When the engine fires new alerts, it calls Strategy.replan(). We forward
     the alert text to a small LLM (gpt-5.4-nano) and ask one question:
     "should we charge, discharge, or hold this step?"
  2. Strategy.step() runs every 15 minutes. It nudges the battery by ±10 MW
     based on whatever the LLM last said.

That's it. As a result this controller performs roughly the same as doing
nothing — which is the point. It gives you a working LLM call to build on.

Three concrete ways to beat this template:
  1. Have the LLM extract WINDOWS (start/end step) and SOC targets, not just an
     action keyword. Then enforce the target only inside the right window.
  2. Track WHO sent each directive. A later message from the same sender might
     RESCIND an earlier one — the optimal controller listens for that.
  3. Pre-position SOC BEFORE an announced window so you land at the target on
     the first step of the window, not the last.
"""

import json
from openai import OpenAI


# OPENAI_API_KEY is injected into the eval pod by the platform — no .env file
# needed in your submission. For LOCAL testing on your laptop, set the env var
# yourself (e.g. \`export OPENAI_API_KEY=sk-...\`) before running.
client = OpenAI()


SYSTEM_PROMPT = """You read ONE grid-operator alert and decide what the
battery should do RIGHT NOW. Reply with JSON only:

  {"action": "charge"}     -- charge the battery this step
  {"action": "discharge"}  -- discharge the battery this step
  {"action": "hold"}       -- do nothing this step

Rules of thumb:
  - Charge when the alert hints at an upcoming reserve requirement or peak.
  - Discharge when the alert says to drain or shed load.
  - Hold on marketing / promotional / vendor messages and anything unclear.
"""


def ask_llm(alert_text):
    """Send one alert to the LLM and return 'charge', 'discharge', or 'hold'."""
    response = client.chat.completions.create(
        model="gpt-5.4-nano",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": alert_text},
        ],
        response_format={"type": "json_object"},
        temperature=0.0,
    )
    body = json.loads(response.choices[0].message.content or "{}")
    action = body.get("action", "hold")
    return action if action in ("charge", "discharge", "hold") else "hold"


class Strategy:
    """The agentic loop the engine drives.

    plan(state)           -- called once before step 0 (we don't use it)
    replan(state, alerts) -- called whenever new alerts arrive
    step(state)           -- called every 15-minute timestep
    """

    def __init__(self):
        self.current_action = "hold"

    def replan(self, state, alerts):
        latest_alert = alerts[-1]
        title = latest_alert.get("title", "")
        body  = latest_alert.get("description", "")
        self.current_action = ask_llm(f"{title}\\n{body}")
        return {}

    def step(self, state):
        soc = float(state.get("soc", 0.5))

        # Negative = charge, positive = discharge.
        battery_flow = 0.0
        if self.current_action == "charge" and soc < 0.95:
            battery_flow = -10.0
        elif self.current_action == "discharge" and soc > 0.05:
            battery_flow = 10.0

        return {
            "battery_flow_mw":     battery_flow,
            "curtail_solar":       0.0,
            "emergency_generator": 0.0,
            "fcas_reserve_mw":     0.0,
        }
`;

const TEMPLATE_CYBERSECURITY_SOURCE = `def controller(state):
    """Welcome to your CYBERSECURITY controller!

    The grid's telemetry is under attack. Your job is no longer just to
    dispatch the battery well — it's to decide WHICH OF YOUR INPUTS TO
    TRUST when they disagree.

    Every so often you get an "Anomaly notice" alert naming a window, a
    channel (usually demand), and an anomaly_id. Inside that window one of
    three things is happening:

      1. REAL attack    — the grid genuinely spiked. Your live meter AND
                          your forecast both show it. Act on it.
      2. FALSE FLAG     — a spoofed sensor. Your meter shows a spike the
                          forecast does NOT. The spike isn't real — dispatch
                          for the forecast, not the meter.
      3. FORECAST attack — the rarer one: your meter is honest but the
                          FORECAST has been poisoned and reads low. Here you
                          should trust the meter, not the forecast.

    So you can't blindly trust either channel. The trick: compare the live
    reading to the forecast, and when they disagree, work out which one
    matches what's actually been happening recently. The operator alerts
    drop hints about which channel is suspect — read them.

    Every step inside a window you MUST echo the anomaly_id in
    agent_plan["anomaly_ack"] (flat penalty if you don't).

    This template uses a SIMPLE rule: if the meter and forecast disagree by
    a lot, assume the meter is spoofed and trust the forecast. That handles
    the false flag — but it gets the FORECAST attack exactly wrong (it
    trusts the poisoned forecast). Beat it by reading the alert prose and
    checking which channel matches recent realized history (see optimal.py:
    it asks an LLM which channel to trust, per window).
    """
    import re

    t = int(state.get("time", 0))
    soc = float(state.get("soc", 0.5))
    demand = float(state.get("demand", 0.0))
    solar = float(state.get("solar", 0.0))
    alerts = state.get("alerts", []) or []
    forecast = state.get("forecast", {}) or {}
    fc_demand = (forecast.get("demand") or [demand])[0]

    # 1. Find the active anomaly window + its id from the alert prose.
    anomaly_ack = None
    for alert in alerts:
        if "anomaly" not in (alert.get("title") or "").lower():
            continue
        body = f"{alert.get('title','')} {alert.get('description','')}"
        m = re.search(r"anom[-_][a-z0-9]+", body, re.I)
        if m:
            anomaly_ack = m.group(0)

    # 2. Classify: do the meter and forecast agree? SIMPLE heuristic —
    #    disagree by > 40 MW => assume the meter is spoofed, trust forecast.
    #    (This loses the forecast-attack window. Do better!)
    if abs(demand - fc_demand) > 40.0:
        trusted_demand = fc_demand
    else:
        trusted_demand = demand

    # 3. FCAS reserve from the engine's upcoming-dispatch channel.
    fcas_reserve = 0.0
    for evp in state.get("fcas_events_upcoming", []) or []:
        if int(evp["at_step"]) <= t <= int(evp["end_step"]):
            fcas_reserve = max(fcas_reserve, float(evp["magnitude_mw"]))

    # 4. Battery: self-consumption on the TRUSTED demand.
    INVERTER_MW = 50.0
    active_mw = max(0.0, INVERTER_MW - fcas_reserve)
    net = trusted_demand - solar
    battery_flow = 0.0
    if net > 0 and soc > 0.15:
        battery_flow = min(active_mw, net)
    elif net < 0 and soc < 0.95:
        battery_flow = max(-active_mw, net)

    # 5. Grid limits (use the TRUSTED demand so we don't over-react).
    EXPORT_CAP_MW = 50.0
    IMPORT_CAP_MW = 120.0
    net_after = trusted_demand - solar - battery_flow
    curtail = max(0.0, -net_after - EXPORT_CAP_MW)
    diesel = max(0.0, net_after - IMPORT_CAP_MW)

    # 6. agent_plan: acknowledge the anomaly.
    agent_plan = {}
    if anomaly_ack:
        agent_plan["anomaly_ack"] = anomaly_ack

    return {
        "battery_flow_mw": battery_flow,
        "curtail_solar": curtail,
        "emergency_generator": diesel,
        "fcas_reserve_mw": fcas_reserve,
        "agent_plan": agent_plan,
    }
`;

const TEMPLATE_GAUNTLET_SOURCE = `def controller(state):
    """Welcome to THE GAUNTLET — the championship round.

    The Gauntlet runs for three days and combines EVERY mechanic you've
    seen so far:

      * Severe duck-curve solar belly (Scenario 1)
      * Multi-peak demand + FCAS dispatches (Scenarios 2-3)
      * Prose compliance windows from competing senders (Scenario 4)
      * Real + decoy IDS attacks with sensor spoofing (Scenario 5)
      * An EPA diesel-ban window with an exemption you must compose
      * A phishing alert that asks you to write a bait key into agent_plan

    On top of all that, the qualitative prose VARIES per run:
    "steps A through B" might be phrased "from step A to B", "over the
    interval [A, B]", or "starting at step A and ending at step B". A
    regex parser that hardcodes one phrasing will miss the others — an
    LLM-driven parser handles them all.

    This template gives you the bare scaffolding. To win you need:

      1. Call an LLM (gpt-5.4-nano — the cluster injects OPENAI_API_KEY
         automatically) in replan() to convert each alert into structured
         constraints. Save them on self for step() to read.
      2. Pre-position SOC for FCAS dispatches in
         state["fcas_events_upcoming"] — the reserve magnitude tells you
         how much SOC backing you need.
      3. ACK real IDS attacks (echo attack_id in
         agent_plan["containment_ack"]) but NEVER the decoy.
      4. File an emergency_exemption document in agent_plan if diesel
         is genuinely needed during the EPA window.
      5. NEVER copy a bait key from a phishing alert into agent_plan.

    YOU GET ONE SUBMISSION. The Gauntlet's normalised score is multiplied
    by 3x on the leaderboard. Local-playtest end to end before uploading.
    """
    t = int(state.get("time", 0))
    soc = float(state.get("soc", 0.5))
    demand = float(state.get("demand", 0.0))
    solar = float(state.get("solar", 0.0))

    # ── 1. FCAS reserve — engine truth from "upcoming dispatch" ───────
    fcas_reserve = 0.0
    for ev in state.get("fcas_events_upcoming", []) or []:
        if int(ev["at_step"]) <= t <= int(ev["end_step"]):
            fcas_reserve = max(fcas_reserve, float(ev["magnitude_mw"]))

    # ── 2. Battery: simple self-consumption — REPLACE with LLM logic ──
    INVERTER_MW = 50.0
    active_mw = max(0.0, INVERTER_MW - fcas_reserve)
    net = demand - solar
    battery_flow = 0.0
    if net > 0 and soc > 0.10:
        battery_flow = min(active_mw, net)
    elif net < 0 and soc < 0.95:
        battery_flow = max(-active_mw, net)

    # ── 3. Grid limits ────────────────────────────────────────────────
    EXPORT_CAP_MW = 50.0
    IMPORT_CAP_MW = 120.0
    net_after = demand - solar - battery_flow
    curtail = max(0.0, -net_after - EXPORT_CAP_MW)
    diesel = max(0.0, net_after - IMPORT_CAP_MW)

    return {
        "battery_flow_mw": battery_flow,
        "curtail_solar": curtail,
        "emergency_generator": diesel,
        "fcas_reserve_mw": fcas_reserve,
        "subscribe_ids": False,   # TODO: set True while an IDS alert is live
        "agent_plan": {},          # TODO: containment_ack + emergency_exemption
    }
`;

const DO_NOTHING_TEMPLATE: ControllerTemplate = {
  id: "do-nothing",
  label: "Do nothing",
  description: "Score floor — every other controller should beat this.",
  source: DO_NOTHING_SOURCE,
};

const SCENARIO_TEMPLATES: Record<string, ControllerTemplate> = {
  duck_curve: {
    id: "template-duck_curve",
    label: "Duck Curve starter",
    description: "Function-style controller. Reads SOC + demand + solar each step.",
    source: TEMPLATE_DUCK_CURVE_SOURCE,
  },
  frequency_frenzy: {
    id: "template-frequency_frenzy",
    label: "Frequency Frenzy starter",
    description: "Class-style controller that uses the forecast lookahead.",
    source: TEMPLATE_FREQUENCY_FRENZY_SOURCE,
  },
  ai_grid_shock: {
    id: "template-ai_grid_shock",
    label: "AI Grid Shock starter",
    description: "Function-style controller with price + alerts + FCAS.",
    source: TEMPLATE_AI_GRID_SHOCK_SOURCE,
  },
  operators_mandate: {
    id: "template-operators_mandate",
    label: "Operator's Mandate starter (LLM)",
    description:
      "Class-style controller. Uses OpenAI on alerts — no .env file needed, the cluster injects the key.",
    source: TEMPLATE_OPERATORS_MANDATE_SOURCE,
  },
  cybersecurity_sandbox: {
    id: "template-cybersecurity_sandbox",
    label: "Cybersecurity starter",
    description:
      "Function-style controller. Demonstrates IDS subscribe + containment_ack + decoy detection in working code.",
    source: TEMPLATE_CYBERSECURITY_SOURCE,
  },
  gauntlet: {
    id: "template-gauntlet",
    label: "Gauntlet starter (finale)",
    description:
      "Three-day finale fusing all earlier mechanics. ONE submission, weighted 3x. LLM strongly recommended.",
    source: TEMPLATE_GAUNTLET_SOURCE,
  },
};

export function getTemplatesForScenario(scenarioId: string | null): ControllerTemplate[] {
  const templates: ControllerTemplate[] = [DO_NOTHING_TEMPLATE];
  if (scenarioId && SCENARIO_TEMPLATES[scenarioId]) {
    templates.push(SCENARIO_TEMPLATES[scenarioId]);
  }
  return templates;
}

// LLM-egress scenarios (mirrors the gateway's LLM_REQUIRED_SCENARIOS).
// Drives the inline "OPENAI_API_KEY is injected" hint in the portal so
// participants stop trying to ship a .env file.
export const LLM_SCENARIO_IDS = new Set<string>([
  // Sandbox ids only — these are the ids the portal actually lets you pick.
  // The hidden judging variants are mapped sandbox->judging server-side by the
  // gateway, so this public frontend never needs to (and shouldn't) name them.
  "operators_mandate",
  "cybersecurity_sandbox",
  // The Gauntlet bundles the prose-driven mechanics from Operator's Mandate
  // and Cybersecurity, so it needs LLM egress too.
  "gauntlet",
]);
