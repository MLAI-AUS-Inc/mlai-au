import { ButtonLink } from "~/components/ui/Button";
import { Body, H1, H2, H3 } from "~/components/ui/Typography";

const sponsorshipTiers = [
  {
    name: "Gold Partner",
    price: "$10,000+",
    features: [
      "Prime logo placement on website and all materials",
      "Speaking opportunities at major events",
      "Custom workshop or presentation slot",
      "Year-round brand visibility across all channels",
      "Direct access to talent network",
      "Priority event sponsorship opportunities",
      "Social media co-promotion campaigns",
      "Quarterly strategy meetings with MLAI leadership",
    ],
    featured: true,
  },
  {
    name: "Silver Partner",
    price: "$5,000+",
    features: [
      "Logo on website and select materials",
      "Workshop or lightning talk opportunities",
      "Access to community job board",
      "Social media mentions and features",
      "Networking opportunities at all events",
      "Monthly newsletter inclusion",
    ],
  },
  {
    name: "Bronze Partner",
    price: "$2,500+",
    features: [
      "Logo on website sponsor page",
      "Job posting privileges",
      "Community newsletter mentions",
      "Event attendance benefits",
      "Basic social media recognition",
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

export default function SponsorMLAIPage() {
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
            <H1 className="text-white">Partner with MLAI</H1>
            <Body className="mt-6 text-gray-300">
              Support Australia&apos;s leading AI community through strategic
              partnership. Join industry leaders in building the future of AI
              talent and innovation in Australia.
            </Body>
          </div>
        </div>
      </div>

      {/* Mission & Impact */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <H2>Our Mission & Impact</H2>
            <Body className="mt-6">
              MLAI Australia is a non-profit dedicated to making Australia the
              best place in the world for AI and machine learning
              entrepreneurs. We&apos;re building a thriving ecosystem through
              education, community, and innovation.
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
                  Community Growth
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Over 1,500+ active members across Australia, growing 20% month
                  over month through strategic community building initiatives.
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
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15m-9 0l4.5 1.5.75-1.125"
                      />
                    </svg>
                  </div>
                  Educational Impact
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Monthly workshops and masterclasses upskilling hundreds of
                  professionals in cutting-edge AI technologies and practices.
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
                  Innovation Catalyst
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Supporting the launch of 20+ AI startups through hackathons,
                  mentorship programs, and investor connections.
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
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z"
                      />
                    </svg>
                  </div>
                  National Reach
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Active chapters in Melbourne, Sydney, Brisbane, and expanding
                  to Adelaide and Perth, creating a truly national AI ecosystem.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

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

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
            {sponsorshipTiers.map((tier, tierIdx) => (
              <div
                key={tier.name}
                className={`${
                  tier.featured
                    ? "relative bg-gray-900 shadow-2xl"
                    : "bg-white/60 sm:mx-8 lg:mx-0"
                } rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 ${
                  tierIdx === 0 ? "lg:rounded-r-none" : ""
                } ${tierIdx === 2 ? "lg:rounded-l-none" : ""}`}
              >
                <h3
                  className={`text-base font-semibold leading-7 ${
                    tier.featured ? "text-teal-400" : "text-teal-600"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      tier.featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={tier.featured ? "text-gray-400" : "text-gray-500"}
                  >
                    /year
                  </span>
                </p>
                <ul
                  role="list"
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.featured ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        className={`h-6 w-5 flex-none ${
                          tier.featured ? "text-teal-400" : "text-teal-600"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Partners */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <H2>Our Current Partners</H2>
            <Body className="mt-6">
              We&apos;re proud to work alongside these forward-thinking
              organizations who share our vision for Australia&apos;s AI future.
              Join this distinguished group of industry leaders.
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

      {/* Custom Partnership Options */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <H2>Custom Partnership Opportunities</H2>
            <Body className="mt-6">
              Beyond our standard tiers, we offer bespoke partnership
              opportunities tailored to your organization&apos;s unique
              objectives and community engagement goals.
            </Body>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <H3>Research Partnerships</H3>
              <Body className="mt-4 text-gray-600">
                Collaborate on applied research projects with our academic
                partners and community members. Access cutting-edge research and
                contribute to Australia&apos;s AI knowledge base.
              </Body>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <H3>Talent Pipeline Programs</H3>
              <Body className="mt-4 text-gray-600">
                Create direct pathways from our community to your organization
                through internship programs, graduate schemes, and exclusive
                recruitment initiatives.
              </Body>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <H3>Industry Advisory Roles</H3>
              <Body className="mt-4 text-gray-600">
                Shape the future of AI education and community initiatives by
                joining our advisory board and providing strategic guidance on
                industry trends and needs.
              </Body>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <H2 className="text-white">
              Ready to Partner with Australia&apos;s AI Future?
            </H2>
            <Body className="mx-auto mt-6 max-w-xl text-teal-50">
              Join us in building a thriving AI ecosystem that benefits all
              Australians. Let&apos;s discuss how we can create a partnership
              that drives mutual value and community impact.
            </Body>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonLink
                href="mailto:hi@mlai.au?subject=MLAI Partnership Inquiry"
                variant="secondary"
              >
                Become a Partner
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}