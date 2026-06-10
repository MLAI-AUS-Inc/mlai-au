import type { Route } from "./+types/watt-the-hack.team";
import { redirect } from "react-router";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";


export function loader({}: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  return redirect("/watt-the-hack/profile");
}

export default function WattTheHackTeamRedirect() {
  return null;
}
