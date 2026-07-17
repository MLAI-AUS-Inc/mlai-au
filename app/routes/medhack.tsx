import { redirect } from "react-router";

export function loader() {
  return redirect("/healthhack", 301);
}

export default function LegacyMedhackRedirect() {
  return null;
}
