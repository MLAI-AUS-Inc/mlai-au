import DonationModal from "~/components/DonationModal";

export default function Hero() {
  return (
    <section id="hero" className="mp-hero-wrap relative w-full flex min-h-[70vh] lg:min-h-screen">
      {/* The bill: one big pasted-up poster */}
      <div
        className="mp-bill mp-hero w-full relative flex flex-col"
        data-mp-ink="orange"
        data-mp-tape="duct"
      >
        <div className="mp-hero-bands" aria-hidden="true" />
        <div className="mp-hero-clouds" aria-hidden="true" />

        {/* Top row - Action chips */}
        <div className="relative z-10 grid grid-cols-1 items-start justify-items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Log in - Top Left */}
          <a href="https://chat.mlai.au" className="mp-btn mp-btn--teal lg:justify-self-start">
            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m3-6 3 3m0 0-3 3m3-3H3" />
            </svg>
            Log in
          </a>

          <DonationModal />

          {/* See Events - Top Right */}
          <a
            href="https://luma.com/mlai_au"
            target="_blank"
            rel="noopener noreferrer"
            className="mp-btn mp-hero-events lg:justify-self-end"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            See Events
          </a>
        </div>

        {/* Center content - The big number and subtitle */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full py-6 lg:py-0">
          {/* Mobile Logo - Kangaroo in mint box - Only visible on mobile */}
          <a href="/" className="mp-hero-logo lg:hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82"
              alt="MLAI Kangaroo logo"
              fetchPriority="high"
            />
          </a>

          {/* Massive "1000" number */}
          <h1 className="mp-hero-number">1000</h1>

          {/* Subtitle - printed on a pasted black strip */}
          <p className="mp-hero-sub">
            <span className="mp-strip">AUSTRALIAN STARTUPS</span>
          </p>
        </div>

        {/* Bottom row - MLAI label and community text */}
        <div className="relative z-10 flex justify-between items-end gap-4 mt-4">
          {/* Left: MLAI */}
          <h2 className="mp-hero-mlai">MLAI</h2>

          {/* Right: Community descriptor */}
          <div className="mp-hero-desc">
            <p>Not-For-Profit,</p>
            <p>Volunteer</p>
            <p>Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}
