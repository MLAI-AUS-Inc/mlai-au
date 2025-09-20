import { H2, Body } from '~/components/ui/Typography';
import type { SponsorshipTier } from '~/components/sponsor/types';

function getSponsorshipCardRounding(tierIdx: number, nTiers: number) {
  if (tierIdx === 0) {
    return 'lg:rounded-r-none';
  } else if (tierIdx === nTiers - 1) {
    return 'lg:rounded-l-none';
  }
  return 'lg:rounded-none';
}

export default function SponsorshipTierCards({ sponsorshipTiers }: { sponsorshipTiers: SponsorshipTier[] }) {
  return (
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
      {sponsorshipTiers.map((tier, tierIdx) => (
        <div
          key={tier.name}
          className={`rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10
            ${tier.featured
              ? "relative bg-gray-900 shadow-2xl"
              : "bg-white/60 sm:mx-8 lg:mx-0"
          } ${getSponsorshipCardRounding(tierIdx, sponsorshipTiers.length)}`}
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
              {tier.price_modifier}
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
  )
}
