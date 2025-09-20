export type SponsorshipTier = {
  name: string;
  description: string;
  price: string;
  price_modifier: string; // Used for things like AUD, /year, /month...
  features: string[];
  featured: boolean;
}
