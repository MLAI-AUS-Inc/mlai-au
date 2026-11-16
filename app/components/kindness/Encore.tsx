// The footer and sign-off (#contact): sparkle sky, heart sparks, the credit
// line, the encore scene with its glows and stage mist, the contact emails,
// MLAI's mark, and the ticket bar with the motion switch and the way back up.
// Spec: 07-closing.md. Styles: app/styles/kindness/closing.css.
// Server-rendered, no client state. The motion switch's click is handled by
// the shell's inline motion bootstrap.
import { Fragment } from "react";
import { chrome, facts, footer, mlaiLogos, sections } from "~/data/kindness";
import { Sr } from "./ui";

const SPARK = { a: "/kindness/spark-a.webp", b: "/kindness/spark-b.webp" };

function Spark({ which }: { which: "one" | "two" }) {
  const [base, swap] = which === "one" ? [SPARK.a, SPARK.b] : [SPARK.b, SPARK.a];
  return (
    <span className={`rk-encore__spark rk-encore__spark--${which}`} aria-hidden="true">
      <span className="rk-encore__spark-in">
        <img
          className="rk-encore__spark-base"
          src={base}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
        />
        <img
          className="rk-encore__spark-swap"
          src={swap}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
        />
      </span>
    </span>
  );
}

export default function Encore() {
  if (!sections.contact.show) return null;
  const [wdName, times, mlaiName] = footer.names;
  const emails = footer.emails.filter((e): e is string => Boolean(e));
  const links = footer.ticket.links.filter((l): l is typeof l & { href: string } => Boolean(l.href));
  const mark = mlaiLogos.reversedWordmark;
  const [lineHead, ...lineRest] = footer.ticket.line.split(" ✦ ");

  return (
    <footer id={sections.contact.id} className="rk-encore rk-grain--live">
      <div className="rk-encore__sparkles" aria-hidden="true" />
      <div className="rk-encore__sparkles rk-encore__sparkles--near" aria-hidden="true" />
      <Spark which="one" />
      <Spark which="two" />

      <div className="rk-encore__stage rk-reveal">
        <p className="rk-encore__by">{footer.presentedBy}</p>
        <p className="rk-encore__names">
          {facts.webDirectionsUrl ? (
            <a href={facts.webDirectionsUrl} target="_blank" rel="noopener" data-rk-cta="footer-webdirections">
              {wdName}
              <Sr> (opens in a new tab)</Sr>
            </a>
          ) : (
            <span>{wdName}</span>
          )}
          <i aria-hidden="true">{times}</i>
          <Sr> {footer.and} </Sr>
          <a href={facts.mlaiUrl} target="_blank" rel="noopener" data-rk-cta="footer-mlai">
            {mlaiName}
            <Sr> (opens in a new tab)</Sr>
          </a>
        </p>

        <div className="rk-encore__scene">
          <span className="rk-encore__float">
            <img
              src={footer.encore.src}
              srcSet="/kindness/encore-640.webp 640w, /kindness/encore-1280.webp 1280w, /kindness/encore.webp 1920w"
              sizes="(max-width: 900px) 150vw, min(1500px, 112vw)"
              alt={footer.encore.alt}
              width={1920}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <i className="rk-encore__glow rk-encore__glow--mega" aria-hidden="true" />
            <i className="rk-encore__glow rk-encore__glow--lamp" aria-hidden="true" />
          </span>
        </div>

        {emails.length ? (
          <p className="rk-encore__mails">
            {emails.map((email, i) => (
              <a key={email} className="rk-encore__mail" href={`mailto:${email}`} data-rk-cta={`footer-email-${i + 1}`}>
                <span>{email}</span>
              </a>
            ))}
          </p>
        ) : null}

        <span className="rk-encore__mark">
          <img src={mark.src} alt={mark.name} width={mark.width} height={mark.height} loading="lazy" decoding="async" />
        </span>
      </div>

      <div className="rk-mist rk-encore__mist" aria-hidden="true" />

      <div className="rk-endticket">
        <span className="rk-endticket__roo" aria-hidden="true">
          <img
            className="rk-boil"
            src="/kindness/roo-bust-192.webp"
            srcSet="/kindness/roo-bust-192.webp 192w, /kindness/roo-bust-280.webp 280w"
            sizes="96px"
            alt=""
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
          />
        </span>
        <div className="rk-endticket__wrap">
          <div className="rk-endticket__paper">
            <div className="rk-endticket__main">
              <p className="rk-endticket__line">
                <span>{lineHead}</span>
                {lineRest.map((part, i) => (
                  <Fragment key={i}>
                    {" "}
                    <span>
                      <i aria-hidden="true">✦</i>
                      <Sr>, </Sr>
                      {part}
                    </span>
                  </Fragment>
                ))}
              </p>
              <div className="rk-endticket__row">
                {links.length ? (
                  <nav className="rk-endticket__nav" aria-label={footer.navLabel}>
                    <ul>
                      {links.map(l => {
                        const external = /^https?:\/\//.test(l.href);
                        return (
                          <li key={l.label}>
                            <a href={l.href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                              {l.label}
                              {external ? <Sr> (opens in a new tab)</Sr> : null}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                ) : null}
                <button type="button" className="rk-motion-btn rk-endticket__switch">
                  {chrome.motion.pause}
                </button>
              </div>
            </div>
            <div className="rk-endticket__stub">
              <a href="#top">{footer.ticket.stub}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
