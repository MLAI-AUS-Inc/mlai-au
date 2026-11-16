// Logo tape ("IN THE CREW:"): the yellow band across the seam under the hero.
// Not rendered while no community is confirmed. Styles: app/styles/kindness/hero.css.
import { hero, type KindnessLogo } from "~/data/kindness";
import { PixelHeart, type Style } from "./ui";

// Layout constants, in px at the tape's 24px base size.
const BASE = 24;
const GAP = 1.25 * BASE; // gap between items
const HEART = 0.8 * BASE;
const LOGO_H = 1.45 * BASE;
/** Each group must be at least this wide at the 24px base, so wide screens never see its end. */
const MIN_GROUP = 3200;
/** Seconds of travel per item in one group: 52 s at twelve items. */
const SECONDS_PER_ITEM = 4.33;

function estimateWidth(logo: KindnessLogo) {
  if (logo.src && logo.width && logo.height) return (LOGO_H * (logo.scale ?? 1) * logo.width) / logo.height;
  return logo.name.length * 0.5 * BASE;
}

function TapeLogo({ logo }: { logo: KindnessLogo }) {
  if (!logo.src) return <span className="rk-tape__name">{logo.name}</span>;
  return (
    <img
      className="rk-tape__logo"
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt=""
      loading="lazy"
      decoding="async"
      style={logo.scale ? ({ "--rk-logo-s": logo.scale } as Style) : undefined}
    />
  );
}

export default function HeroTape() {
  const { label, communities } = hero.logoTape;
  if (communities.length === 0) return null;

  const labelWidth = label.length * 0.46 * 1.5 * BASE + GAP;
  const listWidth = communities.reduce((sum, logo) => sum + estimateWidth(logo) + 2 * GAP + HEART, 0);
  const reps = Math.max(1, Math.ceil((MIN_GROUP - labelWidth) / listWidth));
  const items = Array.from({ length: reps }, () => communities).flat();
  const time = `${(SECONDS_PER_ITEM * (1 + items.length)).toFixed(2)}s`;

  const group = (key: number) => (
    <div className="rk-tape__group" key={key}>
      <span className="rk-tape__label">{label}</span>
      {items.map((logo, i) => (
        <span className="rk-tape__item" key={i}>
          <TapeLogo logo={logo} />
          <PixelHeart className="rk-tape__heart" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="rk-seam rk-hero-seam">
      <div className="rk-tape rk-tape--band rk-tape--crew" aria-hidden="true">
        <div className="rk-tape__track" style={{ "--rk-tape-time": time } as Style}>
          {group(0)}
          {group(1)}
        </div>
      </div>
    </div>
  );
}
