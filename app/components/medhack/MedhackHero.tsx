const HACKATHON_TICKETS_URL = "https://luma.com/uxf4awhv";
const PITCH_NIGHT_TICKETS_URL = "https://luma.com/zi6w8y0x";

const MEDHACK_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Team%20Formation%20Night%20Slides%20(2).png?alt=media&token=5a1b7fb7-6dd4-4699-9d88-d8db97ff68db";

export default function MedhackHero() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 relative overflow-hidden rounded-2xl border border-[#e2a9f1]/30 bg-gradient-to-r from-[#783f8e] via-[#5a2d6a] to-[#2d1245]"
    >
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#e2a9f1]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#783f8e]/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#5a2d6a]/40 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 text-center lg:flex-row lg:gap-12 lg:px-16 lg:py-20 lg:text-left">
        {/* Text content */}
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
            The Future of Healthcare
          </p>

          <h1 className="text-4xl font-black text-white lg:text-5xl">
            MEDHACK: FRONTIERS
          </h1>

          <p className="text-lg font-medium text-white/80">
            February 15 &ndash; March 4, 2026
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a
              href={HACKATHON_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#783f8e] shadow-lg transition hover:bg-white/90 hover:shadow-xl"
            >
              Grab Your Spot
            </a>
            <a
              href={HACKATHON_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Hackathon Tickets
            </a>
            <a
              href={PITCH_NIGHT_TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Pitch Night Tickets
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={MEDHACK_LOGO_URL}
            alt="MedHack: Frontiers logo"
            className="h-48 w-48 rounded-2xl object-contain drop-shadow-2xl lg:h-64 lg:w-64"
          />
        </div>
      </div>
    </section>
  );
}
