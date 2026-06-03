export const DEFAULT_CONTROLLER_SOURCE = `def controller(state):
    """Tiny starter controller. Easy to read, easy to beat."""

    time_step = int(state.get("time", 0))
    demand_mw = float(state.get("demand", 0.0))
    solar_mw = float(state.get("solar", 0.0))
    price = float(state.get("price", 0.0))
    soc = float(state.get("soc", 0.5))

    forecast = state.get("forecast", {}) or {}
    next_demand_mw = float((forecast.get("demand") or [demand_mw])[0])
    next_solar_mw = float((forecast.get("solar") or [solar_mw])[0])
    features = state.get("features", {}) or {}
    alerts = state.get("alerts", [])
    throughput_left_mwh = float(state.get("battery_throughput_remaining_mwh", 9999.0))

    battery_flow_mw = 0.0
    emergency_generator = 0.0
    curtail_solar = 0.0
    fcas_reserve_mw = 0.0

    solar_surplus_mw = solar_mw - demand_mw

    if solar_surplus_mw > 5.0 and soc < 0.90 and throughput_left_mwh > 1.0:
        battery_flow_mw = -min(20.0, solar_surplus_mw)
    elif price > 300.0 and demand_mw > solar_mw and soc > 0.20:
        battery_flow_mw = min(20.0, demand_mw - solar_mw)

    net_after_battery = demand_mw - solar_mw - battery_flow_mw
    if net_after_battery < -50.0:
        curtail_solar = abs(net_after_battery) - 50.0
    elif net_after_battery > 120.0:
        emergency_generator = min(20.0, net_after_battery - 120.0)

    _ = time_step, next_demand_mw, next_solar_mw, features, alerts

    return {
        "battery_flow_mw": battery_flow_mw,
        "emergency_generator": emergency_generator,
        "curtail_solar": curtail_solar,
        "fcas_reserve_mw": fcas_reserve_mw,
    }
`;
