import { Body, H2 } from "~/components/ui/Typography";
import Hero from "~/components/sponsor/sponsor-mlai/Hero";
import Mission from "~/components/sponsor/sponsor-mlai/Mission";
import PartnershipTierCards from "~/components/sponsor/sponsor-mlai/PartnershipTiers";
import PreviousSponsors from "~/components/sponsor/PreviousSponsors";
import CallToAction from "~/components/sponsor/sponsor-mlai/CallToAction";

const currentSponsors = [
  { name: "NAB", logo: "/sponsor_logos/nab.png" },
  { name: "V2 Digital", logo: "/sponsor_logos/v2digital.png" },
  { name: "AWS Startups", logo: "/sponsor_logos/aws.png" },
  { name: "Mantel Group", logo: "/sponsor_logos/mantel.png" },
  { name: "Wilson AI", logo: "/sponsor_logos/wilsonai.png" },
  { name: "Humyn.ai", logo: "/sponsor_logos/humyn.png" },
  { name: "Cake", logo: "/sponsor_logos/cake.png" },
  { name: "Dropshipzone", logo: "/sponsor_logos/dropshipzone.png" },
  { name: "Microsoft", logo: "/sponsor_logos/microsoft.png" },
  { name: "Sirius", logo: "/sponsor_logos/sirius.png" },
  { name: "University of Melbourne", logo: "/sponsor_logos/uom.jpeg" },
  { name: "Squarepeg", logo: "/sponsor_logos/squarepeg.png" },
  { name: "AirTree", logo: "/sponsor_logos/airtree.jpeg" },
];

export default function SponsorMLAIPage() {
  return (
    <main className="bg-white">
      <Hero />
      <Mission />

      {/* Sponsorship Tiers */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <H2>Partnership Tiers</H2>
            <Body className="mt-6">
              Choose a partnership level that aligns with your organization's
              goals and budget. All partnerships directly support our community
              initiatives and help grow Australia&apos;s AI ecosystem.
            </Body>
          </div>

          <PartnershipTierCards />
        </div>
      </div>

      <PreviousSponsors />

      <CallToAction />
    </main>
  );
}
