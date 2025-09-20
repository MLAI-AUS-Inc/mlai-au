import PreviousSponsors from "~/components/sponsor/PreviousSponsors";
import Hero from "~/components/sponsor/Hero";
import WhySponsor from "~/components/sponsor/WhySponsor";
import CallToAction from "~/components/sponsor/CallToAction";

export default function SponsorPage() {
  return (
    <main className="bg-white">
      <Hero />
      <WhySponsor />
      <PreviousSponsors />
      <CallToAction />
    </main>
  );
}
