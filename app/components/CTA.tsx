export default function CTA() {
  return (
    <div id="join" className="mp-sec relative isolate w-full pt-8 sm:pt-12">
      <div
        className="mp-bill mp-bill--kraft mp-bill--a5 mp-join mx-auto w-full text-center"
        data-mp-ink="orange"
        data-mp-tape="1"
      >
        <h2 className="mp-join-title">Keen to jump aboard the pirate ship?</h2>
        <p className="mp-type mt-4 sm:mt-5 text-base sm:text-lg">
          Wait no longer, click the button sailor.
        </p>
        <div className="mt-7 sm:mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          <CTAButton href="/volunteers" variant="mp-btn--go" text="I want to volunteer" />
          <CTAButton href="/#events" variant="mp-btn--purple" text="I want to build" />
          <CTAButton href="/sponsors" variant="mp-btn--teal" text="I want to sponsor" />
        </div>
      </div>
    </div>
  );
}

function CTAButton({
  href,
  text,
  variant,
  rel,
}: {
  href: string
  text: string
  variant: string
  rel?: string
}) {
  return (
    <a href={href} rel={rel} className={`mp-btn mp-btn--lg ${variant} w-full`}>
      {text} <span aria-hidden="true">→</span>
    </a>
  )
}
