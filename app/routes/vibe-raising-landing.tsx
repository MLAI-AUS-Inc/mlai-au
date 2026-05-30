import { useState } from "react";
import { useNavigate } from "react-router";
import VibeRaisingFounderOverview from "~/components/VibeRaisingFounderOverview";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import type { Route } from "./+types/vibe-raising-landing";

const PAGE_DESCRIPTION =
  "MLAI Vibe Raising helps founders draft monthly investor updates and build investor relationships before they raise.";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MLAI Vibe Raising | Monthly Founder Updates" },
    { name: "description", content: PAGE_DESCRIPTION },
    { property: "og:title", content: "MLAI Vibe Raising" },
    { property: "og:description", content: PAGE_DESCRIPTION },
    { name: "application-name", content: "MLAI Vibe Raising" },
    { tagName: "link", rel: "canonical", href: "https://mlai.au/vibe-raising" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return {};
}

export default function VibeRaisingLandingPage({}: Route.ComponentProps) {
  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const navigate = useNavigate();

  const continueToUpdateCreation = () => {
    navigate("/platform/login?app=founder-tools&next=/founder-tools/updates/create");
  };

  return (
    <>
      <VibeRaisingFounderOverview
        firstName="Founder"
        heading="Turn Your Startup Into a Fundable Business"
        showEyebrow={false}
        showInvestorConnectionSection
        useNumberedSectionHeadings
        bleedToShell={false}
        onCreateFirstUpdate={() => setShowIntroVideo(true)}
      />

      {showIntroVideo ? (
        <VibeRaisingIntroPopup
          onDismiss={() => setShowIntroVideo(false)}
          onComplete={continueToUpdateCreation}
        />
      ) : null}
    </>
  );
}
