// What's in it (#whats-in-it): the "$0" monument on its plinth, the ribbon,
// the perks and the kicker (03-win-crew.md). Server-rendered, no client state.
// Styles: app/styles/kindness/win-crew.css.
import { Fragment } from "react";
import { sections, whatsInIt } from "~/data/kindness";
import { HopHeading, PixelHeartUse, ShoutEyebrow, type Style } from "./ui";

/** Pixel-heart scatter: 16 hearts, placed from their index (Pixel-heart scatter). */
const HEARTS = Array.from({ length: 16 }, (_, i) => {
  const x = (61 * i) % 100;
  return { i, x, y: (37 * i + 11) % 70, a: ((23 * i) % 41) - 20 };
});

/** Red outside the 30 to 70% band; inside it, alternate teal and cream. */
function heartTone(x: number, inner: number) {
  if (x < 30 || x > 70) return "red";
  return inner % 2 === 0 ? "teal" : "cream";
}

/** The two halves of the kicker: its first three words sit on a tape label. */
function splitKicker(line: string) {
  const words = line.split(" ");
  return { tag: words.slice(0, 3).join(" "), rest: words.slice(3).join(" ") };
}

export default function WhatsInIt() {
  if (!sections.whatsInIt.show) return null;

  const { eyebrow, title, monument, ribbon, perks, kicker } = whatsInIt;
  const titleId = `${sections.whatsInIt.id}-title`;
  const chars = Array.from(monument.number).length;
  const label = [monument.stamp, [monument.number, monument.plate].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(". ");
  const { tag, rest } = splitKicker(kicker);

  let inner = 0;
  const hearts = HEARTS.map(h => {
    const tone = heartTone(h.x, inner);
    if (tone !== "red") inner += 1;
    return { ...h, tone };
  });

  return (
    <section id={sections.whatsInIt.id} className="rk-win" aria-labelledby={titleId}>
      {/* Mist filter: turns the black of the mist art into transparency, so the
          haze lights whatever sits under it without a blend mode. */}
      <svg className="rk-win__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="rk-win-haze" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  .8 1.2 .4 0 0" />
        </filter>
      </svg>

      <div className="rk-win__rays" aria-hidden="true" />
      <div className="rk-win__spot rk-win__spot--l" aria-hidden="true" />
      <div className="rk-win__spot rk-win__spot--r" aria-hidden="true" />
      <div className="rk-win__hearts" aria-hidden="true">
        {hearts.map(h => (
          <PixelHeartUse
            key={h.i}
            className={`rk-win__heart rk-win__heart--${h.tone}`}
            style={{ "--rk-heart-x": `${h.x}%`, "--rk-heart-y": `${h.y}%`, "--rk-heart-a": `${h.a}deg` } as Style}
          />
        ))}
      </div>

      <header className="rk-head rk-win__head">
        <ShoutEyebrow className="rk-reveal">{eyebrow}</ShoutEyebrow>
        <HopHeading
          lines={title}
          id={titleId}
          mark={title.length > 1 ? title.length - 1 : undefined}
          className="rk-win__title rk-reveal rk-reveal--cue"
        />
      </header>

      <div
        className="rk-monument rk-reveal rk-reveal--cue"
        role="img"
        aria-label={label}
        style={{ "--rk-win-n": chars } as Style}
      >
        <div className="rk-monument__figure" aria-hidden="true">
          <span className="rk-monument__num">
            <span className="rk-monument__depth">{monument.number}</span>
            <span className="rk-monument__face" data-rk-text={monument.number}>
              {monument.number}
            </span>
            <span className="rk-monument__roo">
              <img
                src="/kindness/roo-perched.webp"
                width={600}
                height={600}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          </span>
          {monument.stamp ? (
            <span className="rk-monument__stamp">
              <b data-rk-text={monument.stamp}>
                <i>{monument.stamp}</i>
              </b>
            </span>
          ) : null}
        </div>

        <div className="rk-plinth" aria-hidden="true">
          {monument.plate ? (
            <span className="rk-plinth__plate">
              <span>{monument.plate}</span>
            </span>
          ) : null}
          <span className="rk-plinth__base" />
          <div className="rk-plinth__mist">
            <img src="/kindness/stage-mist.webp" width={1632} height={408} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <p className="rk-ribbon rk-reveal rk-reveal--cue">
        <span className="rk-ribbon__badge" aria-hidden="true">
          <PixelHeartUse className="rk-ribbon__heart" />
        </span>
        <span className="rk-ribbon__band">
          <span className="rk-ribbon__face">
            {ribbon.lead ? <span className="rk-ribbon__lead">{ribbon.lead}</span> : null}
            <b className="rk-ribbon__what">{ribbon.line}</b>
          </span>
        </span>
      </p>

      <ul className="rk-perks">
        {perks.map((perk, i) => {
          const detail = "detail" in perk ? perk.detail : null;
          return (
            <li key={i} className="rk-reveal" style={{ "--rk-i": i } as Style}>
              <PixelHeartUse className="rk-perks__heart" />
              {detail ? `${perk.text} ${detail}` : perk.text}
            </li>
          );
        })}
      </ul>

      <p className="rk-win__kicker rk-reveal">
        <span className="rk-win__kicker-tag">{tag}</span>{" "}
        {rest.split(" ").map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            {/* Keep any hyphenated display words together. */}
            {word.includes("-") ? <span className="rk-win__nowrap">{word}</span> : word}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
