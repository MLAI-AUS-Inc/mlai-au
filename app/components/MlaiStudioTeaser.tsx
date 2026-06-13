import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   MLAI STUDIO — homepage teaser
   A bespoke section (deliberately NOT a Founder Tools clone — no
   row of colour cards). Concept: a live "deal-flow" of paid
   project briefs streaming past, framed by a type-led header and
   a bold stat strip. Matches the site theme (dark brutalist band,
   rounded, flat, brand palette, Inter) and links to /mlai-studio.

   Animation/interaction:
   - Headline word rotates inside a crimson highlight box.
   - Two pill marquees scroll in opposite directions; hovering
     pauses the stream.
   - CTA glows with a gentle pulse.
   ============================================================ */

const ROTATING_WORDS = ["build", "ship", "automate", "launch", "integrate"];

// Project briefs that stream past. Colour cycles through the brand palette.
const BRIEFS_TOP = [
  "AI workflow automation",
  "MVP in 4 weeks",
  "API integrations",
  "Internal tools",
  "Customer dashboards",
  "AI agents & assistants",
  "RAG search",
];
const BRIEFS_BOTTOM = [
  "Prompt & workflow systems",
  "CRM & ops tooling",
  "Data cleaning & mapping",
  "Technical debugging",
  "Chatbots & copilots",
  "Product & UX support",
  "Automations",
];

const PILL_COLORS = [
  { bg: "#ff3d00", dark: false },
  { bg: "#00ffd7", dark: true },
  { bg: "#4b0db3", dark: false },
  { bg: "#fefc22", dark: true },
  { bg: "#3537dc", dark: false },
  { bg: "#ff003d", dark: false },
];

const STATS = [
  { n: "2,000+", l: "builders & founders in the community" },
  { n: "Paid", l: "scoped project work — not job boards" },
  { n: "1,000", l: "Aussie startups we're backing by 2030" },
];

const MARQUEE_CSS = `
@keyframes ms-marquee-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ms-marquee-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
.ms-marquee { -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.ms-marquee-track { display: flex; width: max-content; gap: 14px; padding-right: 14px; animation: ms-marquee-l 38s linear infinite; }
.ms-marquee-track.rev { animation-name: ms-marquee-r; }
.ms-marquee:hover .ms-marquee-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .ms-marquee-track { animation: none; } }
`;

function Pill({ label, color }: { label: string; color: (typeof PILL_COLORS)[number] }) {
  return (
    <span
      className={`shrink-0 rounded-full px-6 py-3 text-base sm:text-lg font-bold uppercase tracking-wide whitespace-nowrap ${color.dark ? "text-black" : "text-white"}`}
      style={{ backgroundColor: color.bg }}
    >
      {label}
    </span>
  );
}

function Marquee({ items, reverse = false, offset = 0 }: { items: string[]; reverse?: boolean; offset?: number }) {
  // Duplicate the list so the -50% loop is seamless.
  const doubled = [...items, ...items];
  return (
    <div className="ms-marquee w-full overflow-hidden">
      <div className={`ms-marquee-track ${reverse ? "rev" : ""}`}>
        {doubled.map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} color={PILL_COLORS[(i + offset) % PILL_COLORS.length]} />
        ))}
      </div>
    </div>
  );
}

export default function MlaiStudioTeaser() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((w) => (w + 1) % ROTATING_WORDS.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-[var(--brutalist-beige)] p-2 lg:p-3">
      <div className="relative w-full bg-gray-900 rounded-2xl sm:rounded-[2.5rem] py-12 sm:py-16 lg:py-20 overflow-hidden">
        <style>{MARQUEE_CSS}</style>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#ff003d] text-sm uppercase tracking-widest mb-5">MLAI Studio</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>Get paid to</span>
            <span className="relative inline-flex items-center justify-center rounded-2xl bg-[#ff003d] px-3 sm:px-4 py-1 text-white overflow-hidden align-middle">
              <span className="invisible" aria-hidden="true">integrate</span>
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    className="inline-block"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <span>what startups actually need</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            MLAI Studio matches vetted Australian AI builders with real, paid startup projects —
            AI, automation, MVPs, integrations and product work. Join the builder pool.
          </p>
        </div>

        {/* Live deal-flow — two opposing pill marquees (hover to pause) */}
        <div className="mt-12 sm:mt-14 flex flex-col gap-3.5">
          <Marquee items={BRIEFS_TOP} offset={0} />
          <Marquee items={BRIEFS_BOTTOM} reverse offset={3} />
        </div>

        {/* Stat strip */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.n}>
                <div className="text-4xl sm:text-5xl font-bold text-[#ff003d] leading-none mb-2">{s.n}</div>
                <div className="text-gray-400 text-sm sm:text-base max-w-[22ch] mx-auto">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA with a gentle pulsing glow */}
        <div className="text-center mt-12">
          <motion.span
            className="inline-block rounded-full"
            animate={{
              boxShadow: [
                "0 0 0px #ff003d00, 0 4px 20px rgba(0,0,0,0.3)",
                "0 0 36px #ff003d90, 0 4px 20px rgba(0,0,0,0.3)",
                "0 0 0px #ff003d00, 0 4px 20px rgba(0,0,0,0.3)",
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              to="/mlai-studio"
              className="inline-block font-bold py-4 px-12 rounded-full text-lg text-white bg-[#ff003d] transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Explore MLAI Studio →
            </Link>
          </motion.span>
        </div>
      </div>
    </div>
  );
}
