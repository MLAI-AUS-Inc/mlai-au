/**
 * LogoMarquee - Infinite scrolling logo row
 * Creates a conveyor belt effect by duplicating logos and animating with CSS
 */

import type { SponsorLogoData } from '~/components/logo-shooter/types';

interface LogoMarqueeProps {
  logos: SponsorLogoData[];
  direction: 'left' | 'right';
  duration?: number; // Animation duration in seconds
  paused?: boolean;
}

export function LogoMarquee({
  logos,
  direction,
  duration = 40,
  paused = false,
}: LogoMarqueeProps) {
  const animationClass = direction === 'left'
    ? 'animate-marquee-left'
    : 'animate-marquee-right';

  return (
    <div className="overflow-hidden">
      <div
        className={`flex items-center gap-12 sm:gap-16 ${animationClass}`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <img
            key={`${logo.name}-1-${index}`}
            src={logo.imagePath}
            alt={logo.name}
            title={logo.name}
            loading="lazy"
            className="h-20 sm:h-24 w-auto object-contain flex-shrink-0"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <img
            key={`${logo.name}-2-${index}`}
            src={logo.imagePath}
            alt={logo.name}
            title={logo.name}
            loading="lazy"
            className="h-20 sm:h-24 w-auto object-contain flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
