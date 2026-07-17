import HealthHackLogo from "~/components/healthhack/HealthHackLogo";
import { HEALTHHACK_BRAND } from "~/lib/healthhack-brand";

export default function MedhackHero() {
  return (
    <section
      id="hero"
      className="healthhack-hero scroll-mt-24 relative overflow-hidden rounded-3xl"
    >
      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#e2a9f1]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#783f8e]/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#5a2d6a]/40 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 text-center lg:flex-row lg:gap-12 lg:px-16 lg:py-20 lg:text-left">
        {/* Text content */}
        <div className="flex-1 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
            {HEALTHHACK_BRAND.organizerLine} presents
          </p>

          <h1>
            <HealthHackLogo className="mx-auto h-auto w-full max-w-xl object-contain lg:mx-0" />
          </h1>

          <p className="text-xl font-semibold text-white/90">
            {HEALTHHACK_BRAND.tagline}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a
              href={HEALTHHACK_BRAND.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#783f8e] shadow-lg transition hover:bg-white/90 hover:shadow-xl"
            >
              Get tickets
            </a>
            <a
              href={HEALTHHACK_BRAND.routes.app}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Open HealthHack app
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <HealthHackLogo
            variant="mark"
            className="h-48 w-48 object-contain drop-shadow-2xl lg:h-64 lg:w-64"
          />
        </div>
      </div>
    </section>
  );
}
