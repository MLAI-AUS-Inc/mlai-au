import type { Route } from "./+types/watt-the-hack._index";
import { redirect } from "react-router";


export function loader({}: Route.LoaderArgs) {
  return redirect("/watt-the-hack/dashboard");
}

export default function WattTheHackIndex() {
  return null;
}
