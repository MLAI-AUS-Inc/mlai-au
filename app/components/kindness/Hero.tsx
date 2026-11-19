// Hero (#top): the poster on the first screen, and the logo tape across its
// bottom seam. Server-rendered, no client state. Styles: app/styles/kindness/hero.css.
import type { ReactNode } from "react";
import { hero, sections, ticketHref, type KindnessLogo } from "~/data/kindness";
import { Eyebrow, ShoutEyebrow, Sr, StickerButton, TextLink, cx } from "./ui";
import HeroTape from "./hero-tape";

/** One logo in the Backed-by box: the file flat as supplied, or the name set in type. */
function BackerLogo({ logo }: { logo: KindnessLogo }) {
  if (!logo.src) return <span className="rk-backed__name">{logo.name}</span>;
  return (
    <img
      className="rk-backed__logo"
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={logo.name}
      decoding="async"
    />
  );
}

/** Wraps the misprinting character of a headline line in its own `em`. */
function withDigit(line: string, flicker: string): ReactNode {
  const at = flicker ? line.indexOf(flicker) : -1;
  if (at < 0) return line;
  return (
    <>
      {line.slice(0, at)}
      <em className="rk-oval__digit">{flicker}</em>
      {line.slice(at + flicker.length)}
    </>
  );
}

export default function Hero() {
  if (!sections.hero.show) return null;

  const [eyebrowLead, ...eyebrowRest] = hero.eyebrow.split(" · ");
  const { where, backed, oval, wordmark } = hero;
  const cities = [where.cities, where.soloOrTeam].filter((part): part is string => Boolean(part));
  const flickerLine = oval.lines.findIndex(line => line.includes(oval.flicker));

  return (
    <>
      <section id={sections.hero.id} tabIndex={-1} className="rk-sec rk-hero" aria-labelledby="rk-hero-title">
        {/* Back layers: drawn sparkles, the heart spark, the megaphone. */}
        <div className="rk-hero__haze" aria-hidden="true" />

        <div className="rk-drift rk-hero__spark" data-rk-depth="18" aria-hidden="true">
          <div className="rk-spark">
            <img
              className="rk-spark__img rk-spark__img--thin rk-boil"
              src="/kindness/spark-a.webp"
              width={512}
              height={512}
              alt=""
              decoding="async"
            />
            <img
              className="rk-spark__img rk-spark__img--fat rk-boil"
              src="/kindness/spark-b.webp"
              width={512}
              height={512}
              alt=""
              decoding="async"
            />
          </div>
        </div>

        <div className="rk-drift rk-mega" data-rk-depth="42" aria-hidden="true">
          <div className="rk-mega__float">
            <i className="rk-mega__cone" />
            <img
              className="rk-mega__art"
              src="/kindness/megaphone.webp"
              width={660}
              height={558}
              alt=""
              decoding="async"
            />
          </div>
        </div>

        <ShoutEyebrow className="rk-hero__eyebrow">
          {eyebrowLead}
          {eyebrowRest.length > 0 ? (
            <span className="rk-hero__eyebrow-org"> · {eyebrowRest.join(" · ")}</span>
          ) : null}
        </ShoutEyebrow>

        {/* Row 1: the title stack (Roo and the wordmark, then the oval). */}
        <div className="rk-hero__stack">
          <div className="rk-drift rk-hero__title-drift" data-rk-depth="-10">
            <div className="rk-hero__title">
              {/* A picture until the P2 engine enables Kind mode. */}
              <button type="button" className="rk-roo" aria-label="Kind mode" aria-hidden="true" disabled>
                <span className="rk-roo__art">
                  <img
                    className="rk-roo__img rk-boil"
                    src="/kindness/roo-bust.webp"
                    srcSet="/kindness/roo-bust-192.webp 192w, /kindness/roo-bust-280.webp 280w, /kindness/roo-bust.webp 512w"
                    sizes="(max-width: 760px) 132px, 176px"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <i className="rk-roo__glint rk-roo__glint--l" />
                  <i className="rk-roo__glint rk-roo__glint--r" />
                </span>
              </button>

              <h1 id="rk-hero-title" className="rk-wordmark" aria-label={wordmark.name}>
                <span className="rk-wordmark__plate">
                  <img
                    className="rk-wordmark__art"
                    src={wordmark.art.src}
                    width={wordmark.art.width}
                    height={wordmark.art.height}
                    alt={wordmark.art.alt}
                    fetchPriority="high"
                  />
                </span>
                <span className="rk-wordmark__live" hidden>
                  <span>{wordmark.live[0]}</span> <span>{wordmark.live[1]}</span>
                </span>
              </h1>
            </div>
          </div>

          <div className="rk-drift rk-hero__oval-drift" data-rk-depth="-4">
            <div className="rk-oval">
              <div className="rk-oval__ring" aria-hidden="true" />
              <div className="rk-oval__plate" aria-hidden="true">
                <i className="rk-oval__spray" />
              </div>
              <p className="rk-oval__headline">
                <span className="rk-oval__small">{oval.small}</span>{" "}
                {oval.lines.map((line, i) => (
                  <span className="rk-oval__line" key={i}>
                    {i === flickerLine ? withDigit(line, oval.flicker) : line}
                    {i < oval.lines.length - 1 ? " " : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: the bar. Source order is button, place and dates, backers. */}
        <div className="rk-hero__bar">
          <div className="rk-hero__cta">
            <StickerButton href={ticketHref} variants={["hero"]} cta="hero" className="rk-hero__btn">
              {hero.button.before}
            </StickerButton>
          </div>

          <div className="rk-where">
            <Eyebrow className="rk-where__eyebrow">{cities}</Eyebrow>
            <p className="rk-where__dates">
              {where.dates.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < where.dates.length - 1 ? " " : null}
                </span>
              ))}
            </p>
            <p className="rk-where__body">
              {where.lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < where.lines.length - 1 ? " " : null}
                </span>
              ))}
            </p>
            <p className="rk-where__links">
              {[where.stepByStep, where.slack].map(link =>
                link.href ? (
                  <a
                    key={link.label}
                    className="rk-where__link"
                    href={link.href}
                    data-rk-cta={`hero-${link.label.toLowerCase().replace(/\W+/g, "-")}`}
                    {...(/^https?:/.test(link.href) ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {link.label}{" "}
                    <span
                      className={cx("rk-where__arrow", link.arrow === "↓" ? "rk-where__arrow--down" : "rk-where__arrow--right")}
                      aria-hidden="true"
                    >
                      {link.arrow}
                    </span>
                    {/^https?:/.test(link.href) ? <Sr> (opens in a new tab)</Sr> : null}
                  </a>
                ) : null,
              )}
            </p>
          </div>

          <div className="rk-hero__backers">
            <div className="rk-backed">
              <p className="rk-backed__label" aria-hidden="true">
                {backed.label}
              </p>
              <ul className="rk-backed__row rk-backed__row--main" aria-label="Backed by">
                {backed.main.map(logo => (
                  <li key={logo.name}>
                    <BackerLogo logo={logo} />
                  </li>
                ))}
              </ul>
              {backed.partners.length > 0 ? (
                <ul className="rk-backed__row rk-backed__row--partners" aria-label="Partners">
                  {backed.partners.map(logo => (
                    <li key={logo.name}>
                      <BackerLogo logo={logo} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <TextLink href={backed.briefsLink.href} arrow="↓" small cta="hero-briefs" className="rk-hero__briefs">
              {backed.briefsLink.label}
            </TextLink>
          </div>
        </div>
      </section>

      <HeroTape />
    </>
  );
}
