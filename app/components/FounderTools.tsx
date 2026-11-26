/* ============================================================
   FOUNDER TOOLS — homepage section
   Ported from the MLAI Studio "Why join" fanned deck
   (app/routes/mlai-studio.tsx + the `.deck` rules in
   app/styles/mlai-studio.css). The homepage isn't under
   `.ms-scope`, so the deck CSS is recreated self-contained here
   with concrete colours under `ft-` classes and embedded in a
   <style> block (same pattern as MlaiStudioTeaser).

   Interaction (pure CSS, no JS): the four cards fan out; hovering
   the deck dims them; hovering a card straightens + lifts it,
   pops its badge, and cross-fades "See what's inside →" into the
   blurb. On narrow screens the fan collapses to a plain stack
   with the blurbs always shown.
   ============================================================ */

import { Link } from "react-router";

// Four founder tracks. Colours match the studio deck (orange / teal /
// purple / yellow) and the sidebar palette.
const TOOLS = [
  {
    c: "orange",
    icon: "💻",
    t: "Vibe Coding",
    d: "Learn AI vibe coding hands-on, from zero to MVP — or drop a bounty and someone in the MLAI community builds your feature for you.",
  },
  {
    c: "teal",
    icon: "📣",
    t: "Vibe Marketing",
    d: "Use AI to publish content, rank in search, and show up in answer engines so the right customers actually find you.",
    to: "https://chat.mlai.au",
  },
  {
    c: "purple",
    icon: "🤝",
    t: "Vibe Raising",
    d: "Share authentic monthly updates and we'll warm-intro you to investors with a real track record in startups like yours.",
    to: "/vibe-raising",
  },
  {
    c: "yellow",
    icon: "🏢",
    t: "Vibe Coworking",
    d: "Free coworking for MLAI volunteers across Australian capitals — a room full of founders swapping tools and momentum.",
  },
];

const DECK_CSS = `
.ft-deck { display: flex; justify-content: center; align-items: center; margin-top: 40px; padding: 46px 0 30px; }
.ft-card {
  position: relative; flex: 0 0 252px; width: 252px; min-height: 446px;
  padding: 30px 26px; display: flex; flex-direction: column; align-items: center; text-align: center;
  justify-content: space-between; transform-origin: bottom center; cursor: pointer;
  border: 3px solid #1a1a1a; box-shadow: 7px 7px 0 #f5f0e6;
  background-image: var(--mp-tex-xerox-ink); background-size: 22rem;
  transition: transform 110ms steps(3, end), filter 110ms steps(2, end), box-shadow 110ms steps(2, end);
  text-decoration: none;
}
.ft-card:focus-visible { outline: 3px solid #fefc22; outline-offset: 6px; }
.ft-card:nth-child(1) { transform: rotate(-8deg) translateY(12px); z-index: 1; }
.ft-card:nth-child(2) { transform: rotate(-3deg); z-index: 2; margin-left: -60px; }
.ft-card:nth-child(3) { transform: rotate(3deg); z-index: 3; margin-left: -60px; }
.ft-card:nth-child(4) { transform: rotate(8deg) translateY(12px); z-index: 2; margin-left: -60px; }
.ft-deck:hover .ft-card { filter: brightness(.5) grayscale(.5); }
.ft-deck .ft-card:hover { transform: rotate(-1deg) translateY(-30px) scale(1.07); z-index: 20; filter: none; box-shadow: 12px 12px 0 #f5f0e6; }
.ft-orange { background-color: #ff3c00; color: #1a1a1a; }
.ft-teal   { background-color: #00ffd7; color: #1a1a1a; }
.ft-purple { background-color: #4b0db3; color: #f5f0e6; }
.ft-yellow { background-color: #fefc22; color: #1a1a1a; }
.ft-top { width: 100%; display: flex; justify-content: center; position: relative; }
.ft-badge { width: 62px; height: 62px; display: grid; place-items: center; font-size: 27px; background: #f5f0e6; border: 3px solid #1a1a1a; box-shadow: 3px 3px 0 #1a1a1a; transform: rotate(-5deg); transition: transform 110ms steps(2, end); }
.ft-card:hover .ft-badge { transform: scale(1.12) rotate(6deg); }
.ft-title { font-family: 'Anton', 'Oswald', 'Arial Narrow', sans-serif; font-weight: 400; text-transform: uppercase; font-size: 34px; line-height: .98; margin: 0; letter-spacing: .01em; }
.ft-slot { position: relative; width: 100%; min-height: 132px; display: flex; align-items: flex-start; justify-content: center; }
.ft-hint, .ft-desc { position: absolute; left: 0; right: 0; top: 0; transition: opacity 110ms steps(2, end); }
.ft-hint { font-family: 'Special Elite', 'Courier New', monospace; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; padding-top: 30px; }
.ft-desc { font-family: 'Inter', system-ui, sans-serif; font-weight: 500; font-size: 14.5px; line-height: 1.5; opacity: 0; }
.ft-card:hover .ft-hint { opacity: 0; }
.ft-card:hover .ft-desc { opacity: 1; }
@media (max-width: 820px) {
  .ft-deck { flex-direction: column; align-items: center; padding: 8px 0 0; margin-top: 24px; }
  .ft-card { flex: none; width: 100%; max-width: 440px; min-height: 0; margin-left: 0 !important; filter: none !important; margin-bottom: 20px; justify-content: flex-start; gap: 18px; }
  .ft-card:nth-child(odd) { transform: rotate(-0.8deg) !important; }
  .ft-card:nth-child(even) { transform: rotate(0.7deg) !important; }
  .ft-deck:hover .ft-card { filter: none !important; }
  .ft-slot { min-height: 0; }
  .ft-hint { display: none; }
  .ft-desc { position: static; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ft-card, .ft-badge, .ft-hint, .ft-desc { transition: none; }
}
`;

export default function FounderTools() {
  return (
    <div className="mp-sec w-full">
      <div
        className="mp-bill mp-bill--black mp-bill--a1 mp-tools w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        data-mp-ink="orange"
        data-mp-ground="black"
        data-mp-tape="duct right"
      >
        <style>{DECK_CSS}</style>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <p className="mp-eyebrow mb-4">FOUNDER TOOLS</p>
            <h2 className="mp-title mp-title--center mb-6">
              Founder-built tools to launch faster
            </h2>
            <p className="mp-lede max-w-3xl mx-auto">
              Workshops, playbooks, intros, and coworking from the MLAI founder community,
              built to help create 1,000 Australian startups. Pick a track and dive in.
            </p>
          </div>

          {/* Fanned deck — hover a card to straighten it and reveal the blurb */}
          <div className="ft-deck">
            {TOOLS.map((card) => {
              const cardContent = (
                <>
                  <div className="ft-top">
                    <div className="ft-badge">{card.icon}</div>
                  </div>
                  <h3 className="ft-title">{card.t}</h3>
                  <div className="ft-slot">
                    <span className="ft-hint">See what's inside →</span>
                    <p className="ft-desc">{card.d}</p>
                  </div>
                </>
              );

              return card.to ? (
                <Link key={card.t} to={card.to} className={`ft-card ft-${card.c}`} aria-label={card.t === "Vibe Marketing" ? "Open Vibe Marketing in MLAI Chat" : "Open Vibe Raising landing page"}>
                  {cardContent}
                </Link>
              ) : (
                <div key={card.t} className={`ft-card ft-${card.c}`}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
