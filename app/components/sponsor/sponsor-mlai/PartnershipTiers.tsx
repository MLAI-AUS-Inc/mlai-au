import { H2, Body } from '~/components/ui/Typography';
import type { SponsorshipTier } from '~/components/sponsor/types';
import SponsorshipTierCards from '~/components/sponsor/SponsorshipTierCards';

const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "Gold Partner",
    description: "",
    price: "$10,000+",
    price_modifier: "/year",
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
    description: "",
    price: "$5,000+",
    price_modifier: "/year",
    features: [
      "Logo on website and select materials",
      "Workshop or lightning talk opportunities",
      "Access to community job board",
      "Social media mentions and features",
      "Networking opportunities at all events",
      "Monthly newsletter inclusion",
    ],
    featured: false,
  },
  {
    name: "Bronze Partner",
    description: "",
    price: "$2,500+",
    price_modifier: "/year",
    features: [
      "Logo on website sponsor page",
      "Job posting privileges",
      "Community newsletter mentions",
      "Event attendance benefits",
      "Basic social media recognition",
    ],
    featured: false,
  },
];

export default function PartnershipTiers() {

  return (
    <SponsorshipTierCards sponsorshipTiers={sponsorshipTiers} />
  )
}
