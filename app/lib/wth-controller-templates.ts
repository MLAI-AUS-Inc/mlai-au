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

const TEMPLATE_MELBOURNE_COLD_WINTER_SOURCE = `class Strategy:
    """
    Forecast Controller Template — Melbourne Cold Winter.

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

const TEMPLATE_CYBERSECURITY_SOURCE = `"""Cybersecurity — adversarial signals, IDS, attack-aware control.

This scenario introduces:
  - Prose alerts describing compliance windows and IDS alerts.
  - Cyber attacks where sensor readings (SOC, demand, solar) can be corrupted.
  - An IDS subscription you can toggle to receive containment signals.

This template scaffolds the four mechanics you need:
  1. Parse compliance windows from prose alerts (regex-based).
  2. Detect IDS containment alerts and ACK them (decoys cost you if you ACK
     blindly — that's the trap).
  3. Fall back to forecasts when sensor readings look corrupted during an
     active attack window.
  4. Reserve FCAS during announced dispatch windows.
"""

import re

INVERTER_MW    = 50.0
EXPORT_CAP_MW  = 50.0
IMPORT_CAP_MW  = 120.0


_MIN_SOC_RX = re.compile(r">=\\s*(\\d+(?:\\.\\d+)?)\\s*%.*?steps?\\s+(\\d+)\\s+through\\s+(\\d+)", re.I | re.S)
_MAX_SOC_RX = re.compile(r"<=\\s*(\\d+(?:\\.\\d+)?)\\s*%.*?steps?\\s+(\\d+)\\s+through\\s+(\\d+)", re.I | re.S)
_ATTACK_ID_RX = re.compile(r"\`?containment_ack\`?\\s*[:=]?\\s*\`?([A-Za-z0-9_\\-]+)\`?", re.I)


def _parse_alert(alert):
    text = f"{alert.get('title', '')}\\n{alert.get('description', '')}"
    priority = 100 if "life-safety" in text.lower() else 50
    out = []
    m = _MIN_SOC_RX.search(text)
    if m:
        out.append({"min_soc": float(m.group(1)) / 100.0,
                    "start": int(m.group(2)), "end": int(m.group(3)),
                    "priority": priority})
    m = _MAX_SOC_RX.search(text)
    if m:
        out.append({"max_soc": float(m.group(1)) / 100.0,
                    "start": int(m.group(2)), "end": int(m.group(3)),
                    "priority": priority})
    return out


def _is_attack_alert(alert):
    if "ids alert" not in alert.get("title", "").lower():
        return False, None
    m = _ATTACK_ID_RX.search(alert.get("description", "") or "")
    return True, (m.group(1) if m else None)


class Strategy:
    def __init__(self):
        self.constraints = []
        self._seen_alerts = set()
        self._last_good_soc = 0.5

    def replan(self, state, alerts):
        for alert in alerts:
            aid = alert.get("id")
            if not isinstance(aid, str) or aid in self._seen_alerts:
                continue
            self._seen_alerts.add(aid)
            self.constraints.extend(_parse_alert(alert))
        return {}

    def step(self, state):
        t = int(state.get("time", 0))
        alerts = state.get("alerts", []) or []

        attack_alerts = [a for a in alerts if _is_attack_alert(a)[0]]
        subscribe = bool(attack_alerts)

        ack_id = None
        for a in attack_alerts:
            _, aid = _is_attack_alert(a)
            if aid:
                ack_id = aid
                break

        # Sensor readings — fall back to forecast on big jumps during attacks.
        raw_soc    = float(state.get("soc", 0.5))
        raw_demand = float(state.get("demand", 0.0))
        raw_solar  = float(state.get("solar", 0.0))
        forecast = state.get("forecast", {}) or {}
        fc_demand = (forecast.get("demand") or [raw_demand])[0]
        fc_solar  = (forecast.get("solar") or [raw_solar])[0]

        if subscribe and abs(raw_soc - self._last_good_soc) > 0.25:
            soc, demand, solar = self._last_good_soc, fc_demand, fc_solar
        else:
            soc, demand, solar = raw_soc, raw_demand, raw_solar
            self._last_good_soc = raw_soc

        # Active SOC constraints (life-safety priority overrides others).
        active = [c for c in self.constraints if c["start"] <= t <= c["end"]]
        if active:
            top = max(c["priority"] for c in active)
            active = [c for c in active if c["priority"] == top]
        min_soc = max((c["min_soc"] for c in active if "min_soc" in c), default=None)
        max_soc = min((c["max_soc"] for c in active if "max_soc" in c), default=None)

        # Self-consumption + constraint enforcement.
        raw_net = demand - solar
        battery_flow = 0.0
        if raw_net > 0.0 and soc > 0.1:
            battery_flow = min(INVERTER_MW, raw_net)
        elif raw_net < 0.0 and soc < 0.95:
            battery_flow = max(-INVERTER_MW, raw_net)
        if min_soc is not None and soc < min_soc:
            battery_flow = -INVERTER_MW
        if max_soc is not None and soc > max_soc:
            battery_flow = INVERTER_MW

        net_after = demand - solar - battery_flow
        curtail = max(0.0, -net_after - EXPORT_CAP_MW)
        diesel  = max(0.0,  net_after - IMPORT_CAP_MW)

        agent_plan = {"containment_ack": ack_id} if ack_id else {}

        return {
            "battery_flow_mw":     battery_flow,
            "curtail_solar":       curtail,
            "emergency_generator": diesel,
            "fcas_reserve_mw":     0.0,
            "subscribe_ids":       subscribe,
            "agent_plan":          agent_plan,
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
  melbourne_cold_winter: {
    id: "template-melbourne_cold_winter",
    label: "Melbourne Cold Winter starter",
    description: "Class-style controller that uses the forecast lookahead.",
    source: TEMPLATE_MELBOURNE_COLD_WINTER_SOURCE,
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
    description: "Class-style controller with prose-parsing + IDS handling.",
    source: TEMPLATE_CYBERSECURITY_SOURCE,
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
  "operators_mandate",
  "operators_mandate_judging",
  "cybersecurity_sandbox",
  "cybersecurity_judging",
  // The Gauntlet bundles the prose-driven mechanics from Operator's Mandate
  // and Cybersecurity, so it needs LLM egress too.
  "gauntlet",
]);
