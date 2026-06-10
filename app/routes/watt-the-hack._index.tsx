import type { Route } from "./+types/watt-the-hack._index";
import { redirect } from "react-router";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";


export function loader({}: Route.LoaderArgs) {
  assertWattTheHackPublicAccessEnabled();
  return redirect("/watt-the-hack/dashboard");
}

export default function WattTheHackIndex() {
  return null;
}
