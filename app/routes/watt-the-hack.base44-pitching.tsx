import { redirect } from "react-router";
import { assertWattTheHackPublicAccessEnabled } from "~/lib/watt-the-hack-access";

// The Base44 Pitching "track" lives in the docs hub now — keep this URL working by
// sending it to the single source of truth.
export function loader() {
  assertWattTheHackPublicAccessEnabled();
  return redirect("/watt-the-hack/docs/base44-pitching");
}

export default function WattTheHackBase44PitchingTrack() {
  return null;
}
