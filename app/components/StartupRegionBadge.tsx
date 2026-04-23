import { clsx } from "clsx";

type StartupRegionBadgeVariant = "default" | "inverse";

interface StartupRegionBadgeProps {
  location?: string | null;
  className?: string;
  variant?: StartupRegionBadgeVariant;
}

interface RegionBadge {
  code: string;
  countryCode?: string;
}

const COUNTRY_BADGE_PATTERNS: Array<{ pattern: RegExp; badge: RegionBadge }> = [
  { pattern: /\b(australia|australian|aus)\b/i, badge: { countryCode: "AU", code: "AUS" } },
  { pattern: /\b(united states|usa|u\.s\.a)\b/i, badge: { countryCode: "US", code: "USA" } },
  { pattern: /\b(united kingdom|great britain|britain|england|scotland|wales|gbr|uk)\b/i, badge: { countryCode: "GB", code: "GBR" } },
  { pattern: /\b(canada|can)\b/i, badge: { countryCode: "CA", code: "CAN" } },
  { pattern: /\b(new zealand|nzl)\b/i, badge: { countryCode: "NZ", code: "NZL" } },
  { pattern: /\b(singapore|sgp)\b/i, badge: { countryCode: "SG", code: "SGP" } },
  { pattern: /\b(india|ind)\b/i, badge: { countryCode: "IN", code: "IND" } },
  { pattern: /\b(germany|deu)\b/i, badge: { countryCode: "DE", code: "DEU" } },
  { pattern: /\b(france|fra)\b/i, badge: { countryCode: "FR", code: "FRA" } },
  { pattern: /\b(japan|jpn)\b/i, badge: { countryCode: "JP", code: "JPN" } },
  { pattern: /\b(china|chn)\b/i, badge: { countryCode: "CN", code: "CHN" } },
  { pattern: /\b(hong kong|hkg)\b/i, badge: { countryCode: "HK", code: "HKG" } },
  { pattern: /\b(united arab emirates|uae)\b/i, badge: { countryCode: "AE", code: "UAE" } },
  { pattern: /\b(israel|isr)\b/i, badge: { countryCode: "IL", code: "ISR" } },
  { pattern: /\b(netherlands|nld)\b/i, badge: { countryCode: "NL", code: "NLD" } },
];

const REGION_PATTERNS: Array<{ pattern: RegExp; badge: RegionBadge }> = [
  { pattern: /\b(melbourne|victoria|vic)\b/i, badge: { countryCode: "AU", code: "MEL" } },
  { pattern: /\b(sydney|new south wales|nsw)\b/i, badge: { countryCode: "AU", code: "SYD" } },
  { pattern: /\b(brisbane|queensland|qld)\b/i, badge: { countryCode: "AU", code: "BNE" } },
  { pattern: /\b(perth|western australia|wa)\b/i, badge: { countryCode: "AU", code: "PER" } },
  { pattern: /\b(adelaide|south australia|sa)\b/i, badge: { countryCode: "AU", code: "ADL" } },
  { pattern: /\b(canberra|australian capital territory|act)\b/i, badge: { countryCode: "AU", code: "CBR" } },
  { pattern: /\b(hobart|tasmania|tas)\b/i, badge: { countryCode: "AU", code: "HBA" } },
  { pattern: /\b(darwin|northern territory|nt)\b/i, badge: { countryCode: "AU", code: "DRW" } },
  { pattern: /\b(san francisco|bay area|silicon valley)\b/i, badge: { countryCode: "US", code: "SFO" } },
  { pattern: /\b(new york|nyc)\b/i, badge: { countryCode: "US", code: "NYC" } },
  { pattern: /\b(seattle)\b/i, badge: { countryCode: "US", code: "SEA" } },
  { pattern: /\b(austin)\b/i, badge: { countryCode: "US", code: "ATX" } },
  { pattern: /\b(london)\b/i, badge: { countryCode: "GB", code: "LDN" } },
  { pattern: /\b(singapore)\b/i, badge: { countryCode: "SG", code: "SGP" } },
  { pattern: /\b(auckland)\b/i, badge: { countryCode: "NZ", code: "AKL" } },
  { pattern: /\b(wellington)\b/i, badge: { countryCode: "NZ", code: "WLG" } },
  { pattern: /\b(toronto)\b/i, badge: { countryCode: "CA", code: "TOR" } },
  { pattern: /\b(vancouver)\b/i, badge: { countryCode: "CA", code: "YVR" } },
  { pattern: /\b(bengaluru|bangalore)\b/i, badge: { countryCode: "IN", code: "BLR" } },
  { pattern: /\b(delhi|new delhi)\b/i, badge: { countryCode: "IN", code: "DEL" } },
  { pattern: /\b(mumbai)\b/i, badge: { countryCode: "IN", code: "BOM" } },
  { pattern: /\b(berlin)\b/i, badge: { countryCode: "DE", code: "BER" } },
  { pattern: /\b(paris)\b/i, badge: { countryCode: "FR", code: "PAR" } },
  { pattern: /\b(tokyo)\b/i, badge: { countryCode: "JP", code: "TYO" } },
  { pattern: /\b(hong kong)\b/i, badge: { countryCode: "HK", code: "HKG" } },
  { pattern: /\b(dubai)\b/i, badge: { countryCode: "AE", code: "DXB" } },
  { pattern: /\b(tel aviv)\b/i, badge: { countryCode: "IL", code: "TLV" } },
  { pattern: /\b(amsterdam)\b/i, badge: { countryCode: "NL", code: "AMS" } },
  { pattern: /\b(global|remote)\b/i, badge: { code: "GLB" } },
];

function getFlagAssetUrl(countryCode: string): string {
  return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}

export function getStartupRegionBadge(location?: string | null): RegionBadge {
  const normalizedLocation = location?.trim();

  if (!normalizedLocation) {
    return { countryCode: "AU", code: "AUS" };
  }

  const matchedRegion = REGION_PATTERNS.find(({ pattern }) => pattern.test(normalizedLocation));
  if (matchedRegion) {
    return matchedRegion.badge;
  }

  const matchedCountry = COUNTRY_BADGE_PATTERNS.find(({ pattern }) => pattern.test(normalizedLocation));
  return matchedCountry?.badge ?? { countryCode: "AU", code: "AUS" };
}

export default function StartupRegionBadge({
  location,
  className,
  variant = "default",
}: StartupRegionBadgeProps) {
  const { code, countryCode } = getStartupRegionBadge(location);

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold leading-none tracking-widest",
        variant === "inverse"
          ? "border-white/20 bg-white/15 text-white shadow-none backdrop-blur-sm"
          : "border-gray-200 bg-gray-100 text-gray-600 shadow-sm",
        className,
      )}
      title={location || code}
    >
      {countryCode ? (
        <img
          src={getFlagAssetUrl(countryCode)}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-5 rounded-[2px] object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : null}
      <span>{code}</span>
    </span>
  );
}
