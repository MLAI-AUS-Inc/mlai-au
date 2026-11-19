// Page shell for /kindness: frame, grain, chrome and the sections in page order.
// Wrapper order follows the shell part's Page ground: filter SVG, skip link,
// corner button, top links, frame, grain overlay, rail, <main>, footer.
import { useEffect } from "react";
import { chrome } from "~/data/kindness";
import { mountMotion } from "~/lib/kindness/motion";
import { CornerButton, Frame, GrainOverlay, InkDefs, MotionScript, Rail, SkipLink, TopLinks } from "./Chrome";
import Hero from "./Hero";
import WhatsInIt from "./WhatsInIt";
import Crew from "./Crew";
import WhatYouDo from "./WhatYouDo";
import CareTapes from "./CareTapes";
import Briefs from "./Briefs";
import HopIn from "./HopIn";
import Faq from "./Faq";
import Why from "./Why";
import Behind from "./Behind";
import LastTime from "./LastTime";
import Encore from "./Encore";

export default function KindnessPage() {
  // The page's only hook: re-runs the motion bootstrap after hydration and after
  // client-side navigation (inline scripts do not run then). Its cleanup unbinds
  // the switch listener and removes every rk- class from <html>.
  useEffect(() => mountMotion(chrome.motion), []);

  return (
    <div className="rk-page rk-quest">
      <MotionScript />
      <InkDefs />
      <SkipLink />
      <CornerButton />
      <TopLinks />
      <Frame />
      <GrainOverlay />
      <Rail />
      <main id="rk-main">
        <Hero />
        <div className="rk-ground">
          <WhatsInIt />
          <Crew />
          <WhatYouDo />
          <CareTapes />
          <Briefs />
          <HopIn />
          <Faq />
          <Why />
        </div>
        <Behind />
        <LastTime />
      </main>
      <Encore />
    </div>
  );
}
