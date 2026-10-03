import { useEffect, useRef, useState } from "react";
import { PK_TEAM } from "~/data/press-kit";

const websitePhoto = (name: string) => {
  const person = PK_TEAM.find((member) => member.name === name);
  return person ? `/press-kit/${person.img}` : undefined;
};

// Reuse named website records, plus the MLAI Slack profile photos for Luiz
// Flavio and Eva Ng. Initials remain as a network-error fallback.
const BUILDERS = [
  { name: "Dr Sam", image: websitePhoto("Sam Donegan") },
  { name: "Callum", image: websitePhoto("Callum Holt") },
  { name: "Shan", image: websitePhoto("Shan Yang") },
  { name: "Alan", image: websitePhoto("Alan Philip") },
  { name: "Juan", image: websitePhoto("Juan Bernal") },
  { name: "Luiz", image: "https://avatars.slack-edge.com/2026-07-13/11572558188962_c3777151f3d0105815e2_original.png" },
  {
    name: "Tom",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Ftom.png?alt=media&token=b2e5357e-ca52-40d7-953c-b505b178225f",
  },
  { name: "Eva", image: "https://avatars.slack-edge.com/2026-05-13/11117538094402_6e81229e6b74e30c6989_original.jpg" },
  { name: "Daniel", image: websitePhoto("Daniel Malkinson") },
];

function BuilderPortrait({ name, image }: (typeof BUILDERS)[number]) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="studio-builder-photo" role="img" aria-label={name}>
      {image && !failed ? (
        <img src={image} alt="" width="128" height="128" onError={() => setFailed(true)} />
      ) : (
        <span className="studio-builder-initial" aria-hidden="true">{name[0]}</span>
      )}
    </span>
  );
}

export default function StudioBuilders() {
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (hovered || focused || reducedMotion) return;
    let frame: number;
    let previous = 0;
    let position = viewport.current?.scrollLeft ?? 0;
    const scroll = (now: number) => {
      if (viewport.current && group.current) {
        if (previous) position += Math.min(now - previous, 50) * 0.025;
        const width = group.current.getBoundingClientRect().width;
        if (width > 0 && position >= width) position %= width;
        viewport.current.scrollLeft = position;
      }
      previous = now;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [hovered, focused, reducedMotion]);

  return (
    <section className="studio-builders" aria-labelledby="studio-builders-title"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="studio-builders-heading">
        <h2 id="studio-builders-title">Good people. Ready to build.</h2>
      </div>
      <div ref={viewport} className="studio-builders-viewport" tabIndex={0}
        role="region" aria-label="MLAI builders. Scroll horizontally to meet the team.">
        <div className="studio-builders-track">
          <ul ref={group} className="studio-builders-group">
            {BUILDERS.map((builder) => <li key={builder.name}><BuilderPortrait {...builder} /></li>)}
          </ul>
          {!reducedMotion && [1, 2].map((copy) => <ul key={copy} className="studio-builders-group" aria-hidden="true">
            {BUILDERS.map((builder) => <li key={builder.name}><BuilderPortrait {...builder} /></li>)}
          </ul>)}
        </div>
      </div>
    </section>
  );
}
