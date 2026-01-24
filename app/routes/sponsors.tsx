import { ButtonLink } from "~/components/ui/Button";
import { Body, H1, H2 } from "~/components/ui/Typography";

const sponsorshipTiers = [
  {
    name: "Gold Sponsor",
    price: "$10,000+",
    features: [
      "Prime logo placement on all event materials",
      "Speaking opportunities at major events",
      "Dedicated recruitment booth at hackathons",
      "Access to MLAI talent network",
      "Custom workshop or presentation slot",
      "Year-round brand visibility",
      "Social media co-promotion",
      "Direct access to hackathon participants",
    ],
    featured: true,
  },
  {
    name: "Silver Sponsor",
    price: "$5,000+",
    features: [
      "Logo on event materials and website",
      "Recruitment opportunities at events",
      "Workshop or lightning talk slot",
      "Social media mentions",
      "Access to community job board",
      "Networking with AI professionals",
    ],
  },
  {
    name: "Bronze Sponsor",
    price: "$2,500+",
    features: [
      "Logo on website and select materials",
      "Event attendance and networking",
      "Job posting privileges",
      "Community newsletter mentions",
    ],
  },
];

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

export default function SponsorPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate bg-gray-900 py-24">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <H1 className="text-white">Partner with MLAI Aus</H1>
            <Body className="mt-6 text-gray-300">
              Join Australia&apos;s leading AI community and connect with
              talented developers, researchers, and entrepreneurs building the
              future of AI.
            </Body>
          </div>
        </div>
      </div>
      {/* Why Sponsor Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <H2>Why Sponsor MLAI Aus?</H2>
            <Body className="mt-6">
              MLAI Aus is a non-profit dedicated to making Australia an amazing
              home for AI and machine learning entrepreneurs. We&apos;re
              building a thriving community through meetups, hackathons, and
              educational programs.
            </Body>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  Access Top AI Talent
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Connect with Australia&apos;s brightest AI engineers, data
                  scientists, and ML researchers through our events and talent
                  network.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                      />
                    </svg>
                  </div>
                  Brand Visibility
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Showcase your brand to 1000+ AI professionals across our
                  monthly meetups, hackathons, and online channels.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </div>
                  Innovation Partnership
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Be at the forefront of AI innovation by supporting the next
                  generation of Australian AI startups and research.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                  </div>
                  Year-Round Impact
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Support ongoing community initiatives including monthly
                  meetups, annual hackathons, and educational programs.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {/* Sponsorship Tiers */}
      {/* <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <H2>Sponsorship Opportunities</H2>
            <Body className="mt-6">
              Choose a sponsorship tier that aligns with your organization's goals
              and budget. All sponsorships directly support our community initiatives.
            </Body>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
            {sponsorshipTiers.map((tier, tierIdx) => (
              <div
                key={tier.name}
                className={`${
                  tier.featured
                    ? 'relative bg-gray-900 shadow-2xl'
                    : 'bg-white/60 sm:mx-8 lg:mx-0'
                } rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 ${
                  tierIdx === 0 ? 'lg:rounded-r-none' : ''
                } ${tierIdx === 2 ? 'lg:rounded-l-none' : ''}`}
              >
                <h3
                  className={`text-base font-semibold leading-7 ${
                    tier.featured ? 'text-teal-400' : 'text-teal-600'
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      tier.featured ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className={tier.featured ? 'text-gray-400' : 'text-gray-500'}>
                    /year
                  </span>
                </p>
                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.featured ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon
                        className={`h-6 w-5 flex-none ${
                          tier.featured ? 'text-teal-400' : 'text-teal-600'
                        }`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Current Sponsors */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <H2>Our Current Sponsors</H2>
            <Body className="mt-6">
              We&apos;re proud to partner with these forward-thinking
              organizations who share our vision for Australia&apos;s AI future.
            </Body>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
              {currentSponsors.map((sponsor) => (
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
      {/* CTA Section */}
      <div className="bg-teal-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <H2 className="text-white">
              Ready to Support Australia&apos;s AI Community?
            </H2>
            <Body className="mx-auto mt-6 max-w-xl text-teal-50">
              Join us in building a thriving AI ecosystem in Australia.
              Let&apos;s discuss how we can create a partnership that delivers
              value for your organization while supporting our community.
            </Body>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonLink
                href="mailto:hi@mlai.au?subject=Sponsorship Inquiry"
                variant="secondary"
              >
                Contact Us About Sponsorship
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
