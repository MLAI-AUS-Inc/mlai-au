import { HEALTHHACK_BRAND } from "~/lib/healthhack-brand";

interface HealthHackLogoProps {
  variant?: "mark" | "wordmark";
  className?: string;
  decorative?: boolean;
}

export default function HealthHackLogo({
  variant = "wordmark",
  className,
  decorative = false,
}: HealthHackLogoProps) {
  const isMark = variant === "mark";

  return (
    <img
      src={isMark ? HEALTHHACK_BRAND.assets.mark : HEALTHHACK_BRAND.assets.wordmark}
      alt={decorative ? "" : HEALTHHACK_BRAND.name}
      width={isMark ? 1076 : 1610}
      height={isMark ? 1099 : 403}
      className={className}
    />
  );
}
