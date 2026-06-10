import type { Route } from "./+types/watt-the-hack.smart-home-beginner.shop";
import { getEnv } from "~/lib/env.server";
import { getSmartHomeShop, type SmartHomeShopState } from "~/lib/generic-hackathon";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

// Resource route (no default export) — polled by the smart-home page for the upgrades shop.
export async function loader({ request, context }: Route.LoaderArgs): Promise<SmartHomeShopState> {
  assertWattTheHackPublicAccessEnabled();
  const env = getEnv(context);
  try {
    return await getSmartHomeShop(env, request);
  } catch {
    return { available: false, items: [] };
  }
}
