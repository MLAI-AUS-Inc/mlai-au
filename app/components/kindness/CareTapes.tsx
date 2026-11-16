// Care tapes: two printed tapes crossing over the seam between #what-you-do and
// #briefs, their words travelling in opposite directions. Decorative; a direct
// child of the shell's rk-ground. Spec: 04-do-briefs.md. Styles: do-briefs.css.
import { careTapes, sections } from "~/data/kindness";

/** Units per tape (layout constants): 10 x 440px on A, 20 x 220px on B, 4400px each. */
const UNITS = { a: 10, b: 20 } as const;

/** "BE KIND ✦ BUILD LOUD ✦" becomes words and separators, each its own flex item. */
function tokens(text: string) {
  return text.split(/\s*(✦)\s*/).filter(Boolean);
}

function Tape({ text, units, which }: { text: string; units: number; which: "a" | "b" }) {
  const parts = tokens(text);
  return (
    <div className={`rk-tapes__tape rk-tapes__tape--${which}`}>
      <div className="rk-tapes__run">
        {Array.from({ length: units }, (_, u) => (
          <span className="rk-tapes__unit" key={u}>
            {parts.map((part, i) =>
              part === "✦" ? (
                <i className="rk-tapes__sep" key={i}>
                  {part}
                </i>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CareTapes() {
  // The seam joins two sections; it only hangs there when both are live.
  if (!sections.whatYouDo.show || !sections.briefs.show) return null;
  return (
    <div className="rk-tapes" aria-hidden="true">
      <Tape text={careTapes.first} units={UNITS.a} which="a" />
      <Tape text={careTapes.second} units={UNITS.b} which="b" />
    </div>
  );
}
