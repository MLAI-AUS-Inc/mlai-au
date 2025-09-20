import { Body, H1, H2 } from "~/components/ui/Typography";

const previousSponsors = [
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

export default function PreviousSponsors() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <H2>Previous Sponsors</H2>
          <Body className="mt-6">
            We&apos;re proud to have partnered with these forward-thinking
            organizations on events who share our vision for Australia&apos;s AI future.
          </Body>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
            {previousSponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center bg-gray-50 px-6 py-8 rounded-lg"
              >
                <img
                  className="h-12 w-auto object-contain"
                  src={sponsor.logo}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
