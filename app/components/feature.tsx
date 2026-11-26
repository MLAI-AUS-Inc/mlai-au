export default function Feature() {
  return (
    <section id="about" className="mp-sec relative w-full flex lg:min-h-screen">
      {/* The bill: plain paper, hand lettered */}
      <div
        className="mp-bill mp-bill--a2 mp-about w-full relative flex flex-col justify-between"
        data-mp-ink="orange"
        data-mp-tape="4 right"
      >
        {/* Top: "We Are" - written with a fat marker */}
        <div className="flex-none pt-2 sm:pt-4 lg:pt-6 mb-2 sm:mb-4">
          <h2 className="mp-about-weare">We Are</h2>
        </div>

        {/* Divider 1 */}
        <span className="mp-rule" aria-hidden="true" />

        {/* Middle section - Vision text on left, MLAI on right (Swapped vertically on mobile) */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-16 py-6 lg:py-8">
          {/* Vision Statement - Left/Center */}
          <div className="lg:w-1/2 text-center lg:text-left px-2 sm:px-4 lg:pl-10">
            <p className="mp-about-vision">
              We help Australian founders bring their startup ideas to life and to use AI to make it easy. Let's get on it.
            </p>
          </div>

          {/* MLAI - Right side, massive ORANGE */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end pr-0 lg:pr-10">
            <h3 className="mp-about-mlai">MLAI</h3>
          </div>
        </div>

        {/* Divider 2 */}
        <span className="mp-rule" aria-hidden="true" />

        {/* Bottom section */}
        <div className="flex-none pt-4 lg:pt-8 pb-1">
          {/* (Machine Learning & Artificial Intelligence) */}
          <p className="mp-about-long">
            <span className="mp-strip">(Machine learning & Artificial Intelligence)</span>
          </p>

          {/* Navigation labels */}
          <div className="mp-type flex justify-between items-end text-xs sm:text-sm lg:text-base uppercase">
            <span>Hello / About us</span>
            <span>01/07</span>
          </div>
        </div>
      </div>
    </section>
  );
}
