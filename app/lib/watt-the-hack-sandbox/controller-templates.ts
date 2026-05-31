import { DEFAULT_CONTROLLER_SOURCE } from "./default-controller";

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
    floor: any other controller should beat this on cost and renewable
    ratio.
    """
    return {
        "battery_flow_mw": 0.0,
        "emergency_generator": 0.0,
        "curtail_solar": 0.0,
        "fcas_reserve_mw": 0.0,
    }
`;

const ML_STUB_SOURCE = `# Module-level state persists across timesteps because the sandbox
# compiles this source ONCE and reuses the namespace for every call.
# Use globals to remember things between steps — that's your "memory".

# Parameters we LEARN from data: per-hour-of-day running mean of how
# wrong the forecast was. Starts at zero (no correction). Improves with
# every step that passes.
forecast_bias_by_hour = {h: 0.0 for h in range(24)}
samples_seen_by_hour = {h: 0 for h in range(24)}

# Remember last step's first-horizon forecast so we can compare it to
# the actual demand we observe this step.
last_forecast_demand = None
last_hour_bucket = None


def controller(state):
    global last_forecast_demand, last_hour_bucket

    # ---------- 1. READ STATE ----------
    t           = int(state.get("time", 0))
    hour        = (t * 0.25) % 24
    hour_bucket = int(hour)
    soc         = float(state.get("soc", 0.5))
    demand_mw   = float(state.get("demand", 0.0))
    solar_mw    = float(state.get("solar", 0.0))
    price       = float(state.get("price", 200.0))

    # Forecast scenarios expose a NOISY view of the next ~16 steps.
    # Early deterministic scenarios may not include this key.
    forecast = state.get("forecast", {}) or {}
    demand_fc = forecast.get("demand", []) or []
    price_fc  = forecast.get("price", []) or []

    # ---------- 2. LEARN FROM LAST STEP'S MISTAKE ----------
    # Compare the forecast we used last step to what actually arrived.
    # Update a per-hour-of-day running mean of the systematic error.
    if last_forecast_demand is not None and last_hour_bucket is not None:
        error = demand_mw - last_forecast_demand
        n = samples_seen_by_hour[last_hour_bucket]
        # Online mean update: new = old + (sample - old) / (n+1)
        forecast_bias_by_hour[last_hour_bucket] += (
            error - forecast_bias_by_hour[last_hour_bucket]
        ) / (n + 1)
        samples_seen_by_hour[last_hour_bucket] = n + 1

    # ---------- 3. BIAS-CORRECT THE WHOLE HORIZON ----------
    # Apply the learned per-hour bias to every step in the forecast.
    corrected_demand = []
    for h, raw in enumerate(demand_fc):
        future_hour = int(((t + h) * 0.25) % 24)
        corrected_demand.append(raw + forecast_bias_by_hour[future_hour])

    # Stash the h=0 forecast we just produced — we'll grade it next step.
    last_forecast_demand = demand_fc[0] if demand_fc else demand_mw
    last_hour_bucket = hour_bucket

    # ---------- 4. LOOK AHEAD AT PRICES ----------
    # Find the highest-price step coming up in the forecast. If a big
    # spike is approaching, hold the battery for it instead of discharging.
    upcoming_peak_price = max(price_fc) if price_fc else price
    peak_is_coming      = upcoming_peak_price > price * 1.5
    near_peak_now       = price >= upcoming_peak_price * 0.9

    # Best guess at what demand will be right now (bias-corrected h=0)
    expected_demand = corrected_demand[0] if corrected_demand else demand_mw
    surplus = solar_mw - expected_demand

    # ---------- 5. ACT ----------
    battery_flow_mw = 0.0
    emergency_generator = 0.0
    curtail_solar = 0.0

    if surplus > 0 and soc < 0.95:
        # Free solar surplus — soak it into the battery
        battery_flow_mw = -surplus
    elif peak_is_coming and soc < 0.80:
        # A big price spike is coming — hold capacity for it
        battery_flow_mw = 0.0
    elif near_peak_now and soc > 0.20:
        # We're at peak prices now — discharge to cover demand
        battery_flow_mw = max(0.0, expected_demand - solar_mw)

    # Standard guardrails (same as rule-based)
    net = demand_mw - solar_mw - battery_flow_mw
    if net < -50.0:
        curtail_solar = abs(net) - 50.0
    elif net > 120.0:
        emergency_generator = net - 120.0

    return {
        "battery_flow_mw": battery_flow_mw,
        "emergency_generator": emergency_generator,
        "curtail_solar": curtail_solar,
        "fcas_reserve_mw": 0.0,
    }
`;

export const CONTROLLER_TEMPLATES: ControllerTemplate[] = [
  {
    id: "do-nothing",
    label: "Do nothing",
    description:
      "Returns zero every step. Score floor — every other controller should beat this.",
    source: DO_NOTHING_SOURCE,
  },
  {
    id: "rule-based",
    label: "Rule-based",
    description:
      "Hand-written heuristics: charge from surplus solar, discharge at peak prices, curtail to avoid overvoltage, run diesel to avoid blackout.",
    source: DEFAULT_CONTROLLER_SOURCE,
  },
  {
    id: "ml-stub",
    label: "ML stub",
    description:
      "Online bias correction for forecast-enabled scenarios: learns per-hour forecast error from observed data and uses it to plan dispatch.",
    source: ML_STUB_SOURCE,
  },
];
