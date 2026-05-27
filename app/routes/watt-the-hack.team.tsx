import type { Route } from "./+types/watt-the-hack.team";
import { redirect } from "react-router";


export function loader({}: Route.LoaderArgs) {
  return redirect("/watt-the-hack/profile");
}

export default function WattTheHackTeamRedirect() {
  return null;
}
