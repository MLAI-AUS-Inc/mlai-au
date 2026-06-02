export const DEFAULT_CONTROLLER_SOURCE = `def controller(state):
    """
    Template Controller for the Watt The Hack AI Hackathon.
    
    This function is called by the simulation every 15 minutes (1 timestep).
    Your goal is to return an 'action' dictionary that minimizes costs and avoids blackouts.
    """
    
    # =========================================================================
    # 1. READ THE STATE (What you know about the world right now)
    # =========================================================================
    
    # Battery Status
    soc = float(state.get("soc", 0.5))           # State of Charge (0.0 = Empty, 1.0 = Full)
    
    # City Physics (in MW)
    demand_mw = float(state.get("demand", 0.0))  # How much power the city is consuming
    solar_mw = float(state.get("solar", 0.0))    # How much free power the sun is providing
    
    # Economics ($ per MWh)
    price = float(state.get("price", 200.0))       # Current cost to import power from the main grid
    
    # =========================================================================
    # 2. YOUR AI LOGIC (Decide what to do)
    # =========================================================================
    
    # Calculate if we have free solar power left over after feeding the city
    solar_surplus_mw = solar_mw - demand_mw
    
    battery_flow_mw = 0.0
    emergency_generator = 0.0
    curtail_solar = 0.0
    fcas_reserve_mw = 0.0
    
    # --- Strategy A: Battery Management ---
    # Rule 1: If there is extra solar, and the battery isn't full, charge the battery!
    if solar_surplus_mw > 0.0 and soc < 0.95:
        # Negative value means CHARGE the battery
        battery_flow_mw = -solar_surplus_mw
        
    # Rule 2: If the city needs power, and grid prices are high, discharge the battery!
    elif solar_surplus_mw < 0.0 and price >= 300.0 and soc > 0.20:
        # Positive value means DISCHARGE the battery to help feed the city
        battery_flow_mw = abs(solar_surplus_mw)

    # Calculate net demand after battery
    net_city_demand = demand_mw - solar_mw - battery_flow_mw

    # --- Strategy B: Overvoltage Management (Too much solar) ---
    # The grid can only absorb 50.0 MW of our exported solar.
    # Exceeding this causes Overvoltage (Massive $5.00/MWh penalty).
    # If we are exporting too much, we must safely disconnect some solar panels.
    if net_city_demand < -50.0:
        curtail_solar = abs(net_city_demand) - 50.0

    # --- Strategy C: Risk Management (The Panic Button) ---
    # The main grid can only supply a maximum of 120.0 MW. 
    # If the city pulls more than that, it BLACKS OUT (Massive $10.00/MWh penalty).
    # If the battery can't cover the gap, we must turn on the expensive Diesel Generator.
    elif net_city_demand > 120.0:
        # We are about to overload the grid! 
        # Fire up the diesel generator ($1.00/MWh) to cover the exact difference.
        emergency_generator = net_city_demand - 120.0

    # =========================================================================
    # 3. RETURN YOUR ACTION (Tell the engine what to do)
    # =========================================================================
    
    return {
        # How many MW to push/pull from the battery (Positive = Discharge, Negative = Charge)
        "battery_flow_mw": battery_flow_mw,
        
        # How many MW to generate from the backup diesel plant (Costs $1.00/MWh to run)
        "emergency_generator": emergency_generator,
        
        # How many MW of solar power to safely disconnect to avoid frying the grid
        "curtail_solar": curtail_solar,

        # How many MW of inverter capacity to reserve for FCAS revenue
        "fcas_reserve_mw": fcas_reserve_mw,
    }
`;
