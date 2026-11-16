// Who's behind it (#whos-behind-it): dimmed footage ground, giant organiser
// names split into letters on the server, body line, count sticker and the
// organiser links. Spec: 07-closing.md. Styles: app/styles/kindness/closing.css.
// Server-rendered, no client state. In release 1 there is no footage yet, so
// the section is the ink ground under the full shade; the <video> appears once
// behind.footage holds a poster (the engine loads the clip in release 2).
import { behind, sections } from "~/data/kindness";
import { Eyebrow, Sr, TextLink, type Style } from "./ui";

function GiantWords() {
  let n = 0;
  return (
    <h2 className="rk-behind__words rk-reveal" id="rk-behind-title">
      <Sr>{behind.wordsLabel}</Sr>
      <span className="rk-behind__lines" aria-hidden="true">
        {behind.words.map((line, li) => (
          <span className="rk-behind__line" key={li}>
            {line.split(" ").flatMap((word, wi) => {
              const w = (
                <span className="rk-behind__word" key={`w${wi}`}>
                  {Array.from(word).map((ch, ci) => {
                    const i = n++;
                    return (
                      <span className="rk-behind__letter" key={ci} style={{ "--rk-n": i, "--rk-o": i } as Style}>
                        {ch}
                      </span>
                    );
                  })}
                </span>
              );
              return wi === 0 ? [w] : [" ", w];
            })}
          </span>
        ))}
      </span>
    </h2>
  );
}

export default function Behind() {
  if (!sections.behind.show) return null;
  const { footage, count } = behind;
  const body = [behind.webDirectionsLine, behind.mlaiLine].filter(Boolean).join(" ");
  const ctas = ["behind-webdirections", "behind-mlai"];
  const links = behind.links.flatMap((l, i) => (l.href ? [{ ...l, href: l.href, cta: ctas[i] }] : []));

  return (
    <section id={sections.behind.id} className="rk-behind" aria-labelledby="rk-behind-title">
      {footage.poster ? (
        <video
          className="rk-behind__footage"
          muted
          loop
          playsInline
          preload="none"
          poster={footage.poster}
          {...(footage.video ? { "data-rk-src": footage.video } : {})}
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : null}
      <div className="rk-behind__shade" aria-hidden="true" />
      <div className="rk-behind__copy">
        <Eyebrow className="rk-behind__eyebrow rk-reveal">{behind.eyebrow}</Eyebrow>
        <GiantWords />
        {body ? <p className="rk-behind__body rk-reveal">{body}</p> : null}
        <div className="rk-behind__row rk-reveal">
          <p className="rk-count">
            <Sr>{count.srText}</Sr>
            <b className="rk-count__num" aria-hidden="true">
              <span className="rk-count__sizer">{count.display}</span>
              <span className="rk-count__live">
                <span data-rk-count={count.value}>{count.display.replace(/\+$/, "")}</span>+
              </span>
            </b>
            <span className="rk-count__label" aria-hidden="true">
              {count.label.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </span>
          </p>
          {links.map(l => (
            <TextLink key={l.cta} href={l.href} arrow="↗" newTab cta={l.cta} className="rk-behind__link">
              {l.label}
            </TextLink>
          ))}
        </div>
      </div>
    </section>
  );
}
