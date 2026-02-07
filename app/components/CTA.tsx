export default function CTA() {
  return (
    <div
      id="join"
      className="relative isolate w-full px-2 sm:px-4 py-8 sm:py-12 lg:py-16 bg-transparent"
    >
      <div className="mx-auto w-full text-center rounded-2xl sm:rounded-[2.5rem] border border-gray-400 bg-transparent px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-normal text-gray-900 leading-tight"
          style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
        >
          Keen to jump aboard the pirate ship?
        </h2>
        <p className="mt-3 sm:mt-5 text-base sm:text-lg text-gray-800">
          Wait no longer, click the button sailor.
        </p>
        <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <CTAButton
            href="https://forms.gle/GwZR49kwTMszLKtN8"
            bg="bg-[#ff3d00]"
            text="I want to volunteer"
            rel="nofollow"
          />
          <CTAButton href="/#events" bg="bg-[#4b1bd1]" text="I want to build" />
          <CTAButton href="/sponsors" bg="bg-[#00ffd7]" text="I want to sponsor" textColor="text-black" />
        </div>
      </div>
    </div>
  );
}

function CTAButton({
  href,
  text,
  bg,
  textColor = 'text-white',
  rel,
}: {
  href: string
  text: string
  bg: string
  textColor?: string
  rel?: string
}) {
  return (
    <a
      href={href}
      rel={rel}
      className={`inline-flex w-full items-center justify-center rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold ${bg} ${textColor} shadow-[0_20px_50px_-22px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 min-h-[48px]`}
    >
      {text} <span aria-hidden="true" className="ml-1">→</span>
    </a>
  )
}
