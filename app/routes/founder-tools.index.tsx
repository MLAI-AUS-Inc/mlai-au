import type { Route } from "./+types/founder-tools.index";
import { redirect } from "react-router";

export const loader = async (_args: Route.LoaderArgs) => {
  throw redirect("/founder-tools/updates");
};

export default function FounderToolsIndex() {
  return null;
}
