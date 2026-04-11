import type { Route } from "./+types/innovate-connect-alliance.profile";
import { redirect } from "react-router";

export function loader(_: Route.LoaderArgs) {
    return redirect("/innovate-connect-alliance/team");
}

export default function InnovateConnectAllianceProfile() {
    return null;
}
