// Hop in (#hop-in): how to join. A night-gig panel with a spotlight oval, the
// free ticket and the kindness pledge joined by a pixel-heart arrow, the run
// sheet (#run-sheet) on orange gaffer tape, the Slack strip and the four dates
// of the weekend. Server-rendered, no client state.
// Spec: 05-hop-in.md (and 10-mobile.md). Styles: app/styles/kindness/hop-in.css.
import { hopIn, sections, type HopInStep } from "~/data/kindness";
import { HopHeading, PixelHeart, ShoutEyebrow, Sr, Tape, type Style } from "./ui";
import { HopOutArrow, HopPaw, HopPen } from "./hop-art";

const TITLE_ID = "hop-in-title";

/** Step 4's time slot, in the cities' own clock (both are on AEDT in December). */
function timeSlot(iso: string) {
  const at = new Date(iso);
  if (Number.isNaN(at.getTime())) return null;
  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Sydney",
    timeZoneName: "short",
  }).format(at);
}

/** Step 1: the yellow admission ticket with its tear-off stub. */
function Ticket() {
  const { ticket } = hopIn;
  const cities = ticket.cities.filter((city): city is typeof city & { href: string } => Boolean(city.href));

  return (
    <li className="rk-ticket-wrap rk-reveal">
      <div className="rk-ticket">
        <div className="rk-ticket__main">
          <p className="rk-hop-in-step">
            <span>{ticket.step}</span>
            <i aria-hidden="true" />
          </p>
          <HopHeading lines={ticket.title} as="h3" className="rk-reveal rk-reveal--cue rk-ticket__title" />
          <p className="rk-ticket__body">{ticket.body}</p>
          {cities.length > 0 ? (
            <div className="rk-ticket__cities">
              {cities.map(city => (
                <a
                  key={city.key}
                  href={city.href}
                  className={`rk-ticket__city rk-ticket__city--${city.key}`}
                  target="_blank"
                  rel="noopener"
                  data-rk-cta={`hop-in-ticket-${city.key}`}
                >
                  <span>{city.label}</span>
                  <HopOutArrow className="rk-ticket__city-icon" />
                  <Sr>{ticket.newTabNote}</Sr>
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rk-ticket__stub">
          <span className="rk-ticket__admit">{ticket.stub}</span>
          <i className="rk-ticket__barcode" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
}

/** Step 2: the ruled pledge card, with Roo perched behind it and the paw-print stamp. */
function Pledge() {
  const { pledge } = hopIn;

  return (
    <li className="rk-pledge-sheet-wrap rk-reveal" style={{ "--rk-i": 2 } as Style}>
      <span className="rk-pledge-sheet-roo" aria-hidden="true">
        <i className="rk-pledge-sheet-roo__disc" />
        <span className="rk-pledge-sheet-roo__bob">
          <img
            className="rk-pledge-sheet-roo__img"
            src={pledge.roo.src}
            srcSet={pledge.roo.srcSet}
            sizes="(min-width: 1500px) 210px, (min-width: 1072px) 14vw, (min-width: 901px) 150px, (min-width: 561px) 190px, 180px"
            width={pledge.roo.width}
            height={pledge.roo.height}
            alt={pledge.roo.alt}
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>

      <div className="rk-pledge-sheet">
        <p className="rk-hop-in-step">
          <span>{pledge.step}</span>
          <i aria-hidden="true" />
        </p>
        <HopHeading lines={pledge.title} as="h3" className="rk-reveal rk-reveal--cue rk-pledge-sheet__title" />
        <ul className="rk-pledge-sheet__lines" role="list">
          {pledge.lines.map(line => (
            <li key={line}>
              <PixelHeart className="rk-pledge-sheet__heart" />
              {line}
            </li>
          ))}
        </ul>
        <span className="rk-pledge-sheet__sign" aria-hidden="true">
          <HopPen className="rk-pledge-sheet__pen" />
          <i className="rk-pledge-sheet__line" />
        </span>
        <p className="rk-pledge-sheet__caption">{pledge.signature}</p>
        <span className="rk-pledge-sheet__paw" aria-hidden="true">
          <HopPaw className="rk-pledge-sheet__paw-print" />
        </span>
      </div>
    </li>
  );
}

/** One row of the run sheet: a number square on the tape and a dark box with the step. */
function RunStep({ step, n }: { step: HopInStep; n: number }) {
  const time = step.time ? timeSlot(step.time) : null;

  return (
    <li className="rk-run-sheet__step">
      <span className="rk-run-sheet__no" aria-hidden="true">
        {n}
      </span>
      <div className="rk-run-sheet__box">
        <p className="rk-run-sheet__name">{step.name}</p>
        {step.detail ? <p className="rk-run-sheet__detail">{step.detail}</p> : null}
        {time && step.time ? (
          <p className="rk-run-sheet__time">
            <time dateTime={step.time}>{time}</time>
          </p>
        ) : null}
        {step.link?.href ? (
          <a
            href={step.link.href}
            className="rk-run-sheet__go"
            target="_blank"
            rel="noopener"
            data-rk-cta="hop-in-runsheet-slack"
          >
            {step.link.label} <span aria-hidden="true">{step.link.arrow}</span>
            <Sr> (opens in a new tab)</Sr>
          </a>
        ) : null}
      </div>
    </li>
  );
}

/** The code-of-conduct note: a link when there is one, plain words until then. */
function ConductNote() {
  const { conduct } = hopIn.slack;
  return (
    <p className="rk-hop-in__note rk-reveal">
      {conduct.before}
      {conduct.href ? (
        <a href={conduct.href} target="_blank" rel="noopener" data-rk-cta="hop-in-conduct">
          {conduct.link}
          <Sr> (opens in a new tab)</Sr>
        </a>
      ) : (
        conduct.link
      )}
      {conduct.after}
    </p>
  );
}

/** The four dates of the weekend, over a sliding band of spray texture. */
function Weekend() {
  const { weekend } = hopIn;

  return (
    <div className="rk-weekend rk-reveal">
      <div className="rk-weekend__tag">
        <ShoutEyebrow className="rk-weekend__eyebrow">{weekend.eyebrow}</ShoutEyebrow>
        <i className="rk-weekend__rule" aria-hidden="true" />
      </div>
      <ol className="rk-weekend__days" role="list">
        {weekend.days.map((day, i) => {
          const [when, part] = day.when.split(" · ");
          return (
            <li className={`rk-weekend__day${i === 0 ? " rk-weekend__day--first" : ""}`} key={day.when}>
              <time className="rk-weekend__when" dateTime={day.date}>
                {part ? (
                  <>
                    <span>{when} ·</span> <span>{part}</span>
                  </>
                ) : (
                  <span>{when}</span>
                )}
              </time>
              <span className="rk-weekend__what">{day.what}</span>
              {i === 0 ? (
                <span className="rk-weekend-roo" aria-hidden="true">
                  <img
                    className="rk-weekend-roo__img rk-boil"
                    src={weekend.roo.src}
                    srcSet={weekend.roo.srcSet}
                    sizes="(min-width: 1556px) 140px, (min-width: 1000px) 9vw, 90px"
                    width={weekend.roo.width}
                    height={weekend.roo.height}
                    alt={weekend.roo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <i className="rk-weekend-roo__glint" />
                  <i className="rk-weekend-roo__glint rk-weekend-roo__glint--r" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function HopIn() {
  if (!sections.hopIn.show) return null;
  const { runSheet, slack } = hopIn;

  return (
    <section id={sections.hopIn.id} className="rk-sec rk-haze rk-hop-in" aria-labelledby={TITLE_ID}>
      {/* Corner stickers: the floating megaphone and the redrawing heart spark. */}
      <img
        className="rk-hop-in-deco__mega"
        src="/kindness/megaphone.webp"
        width={660}
        height={558}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <span className="rk-hop-in-deco__spark rk-boil" aria-hidden="true">
        <img
          className="rk-hop-in-deco__spark-img"
          src="/kindness/spark-a.webp"
          width={512}
          height={512}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="rk-hop-in-deco__spark-img rk-hop-in-deco__spark-img--fat"
          src="/kindness/spark-b.webp"
          width={512}
          height={512}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>

      <header className="rk-hop-in__head">
        <ShoutEyebrow className="rk-reveal">{hopIn.eyebrow}</ShoutEyebrow>
        <div className="rk-hop-in-oval">
          <span className="rk-hop-in-oval__disc" aria-hidden="true" />
          <HopHeading lines={hopIn.title} id={TITLE_ID} className="rk-reveal rk-reveal--cue rk-hop-in-oval__title" />
        </div>
      </header>

      <ol className="rk-steps" role="list">
        <Ticket />
        <Pledge />
      </ol>

      <div id={runSheet.id} className="rk-run-sheet rk-reveal">
        <h3 id={`${runSheet.id}-title`} className="rk-run-sheet__title">
          {runSheet.title.map(line => (
            <span key={line}>{line}</span>
          ))}
        </h3>
        <ol className="rk-run-sheet__steps" role="list" aria-labelledby={`${runSheet.id}-title`}>
          {runSheet.steps.map((step, i) => (
            <RunStep step={step} n={i + 1} key={step.name} />
          ))}
        </ol>
      </div>

      {slack.href ? (
        <div className="rk-slack-strip rk-reveal">
          <p className="rk-slack-strip__sheet">
            <Tape cream small className="rk-slack-strip__tape rk-slack-strip__tape--l" />
            <Tape cream small className="rk-slack-strip__tape rk-slack-strip__tape--r" />
            {slack.lead}{" "}
            <a
              href={slack.href}
              className="rk-slack-strip__link"
              target="_blank"
              rel="noopener"
              data-rk-cta="hop-in-slack"
            >
              {slack.link} <span aria-hidden="true">{slack.arrow}</span>
              <Sr> (opens in a new tab)</Sr>
            </a>
          </p>
        </div>
      ) : null}
      <ConductNote />

      <Weekend />
    </section>
  );
}
