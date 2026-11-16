// What you do (#what-you-do): three gig-poster cards under a rocking megaphone,
// then the ticket button. Server-rendered, no client state.
// Spec: 04-do-briefs.md. Styles: app/styles/kindness/do-briefs.css.
import { sections, ticketHref, whatYouDo } from "~/data/kindness";
import { HopHeading, ShoutEyebrow, Stamp, StickerButton, type Style } from "./ui";
import { DoSparkle } from "./do-art";

/** Per-card stamp tilt in degrees (layout constant, by index). */
const STAMP_ROT = [-9, 8, -12];

/** The copy deck writes the badge with its dot; the dot is drawn, so drop the glyph. */
function badgeWords(badge: string) {
  return badge.replace(/^●\s*/, "");
}

export default function WhatYouDo() {
  if (!sections.whatYouDo.show) return null;
  const titleId = `${sections.whatYouDo.id}-title`;

  return (
    <section id={sections.whatYouDo.id} className="rk-sec rk-haze rk-do" aria-labelledby={titleId}>
      {/* Corner character: the megaphone throwing its cone at the cards. */}
      <span className="rk-do__megaphone" aria-hidden="true">
        <span className="rk-do__aim">
          <i className="rk-do__cone" />
          <img
            className="rk-do__mega-art"
            src="/kindness/megaphone.webp"
            width={660}
            height={558}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
      <DoSparkle className="rk-do__sparkle rk-do__sparkle--left" />
      <DoSparkle className="rk-do__sparkle rk-do__sparkle--right" />

      <div className="rk-do__wrap">
        <header className="rk-head rk-do__head">
          <ShoutEyebrow className="rk-reveal">{whatYouDo.eyebrow}</ShoutEyebrow>
          <HopHeading
            lines={whatYouDo.title}
            id={titleId}
            className="rk-reveal rk-reveal--cue rk-do__title"
            mark={whatYouDo.title.length - 1}
          />
        </header>

        <ol className="rk-do__stage">
          {whatYouDo.cards.map((card, i) => (
            <li className="rk-poster rk-reveal rk-reveal--cue" key={card.n} style={{ "--rk-n": i } as Style}>
              <b className="rk-poster__no" aria-hidden="true">
                {card.n}
              </b>
              <div className="rk-poster__art" aria-hidden="true">
                <img
                  className="rk-poster__img"
                  src={card.art.src}
                  width={card.art.width}
                  height={card.art.height}
                  alt={card.art.alt}
                  loading="lazy"
                  decoding="async"
                />
                {card.badge ? <span className="rk-poster__live">{badgeWords(card.badge)}</span> : null}
                <Stamp ink={i > 0} rot={STAMP_ROT[i % STAMP_ROT.length]} className="rk-poster__stamp">
                  {whatYouDo.stamp}
                </Stamp>
              </div>
              <h3 className="rk-poster__title">{card.title}</h3>
              <p className="rk-poster__body">{card.body}</p>
            </li>
          ))}
        </ol>

        <div className="rk-do__go rk-reveal">
          <StickerButton href={ticketHref} variants={["hero"]} cta="what-you-do">
            {whatYouDo.button}
          </StickerButton>
        </div>
      </div>
    </section>
  );
}
