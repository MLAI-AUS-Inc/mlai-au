import { ButtonLink } from "@/components/ui/Button";
import { H1, Body } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-screen "
    >
      <img
        src="photos/bg.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-sm">
              Check out the Green Battery Hack {" "}
              <a href="/hackathon" className="font-semibold text-teal-200">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <H1 className="text-white">
              Empowering the Australian AI Community
            </H1>
            <Body className="mt-6 text-gray-300">
              MLAI Aus is a non-profit org dedicated to making Australia an
              awesome home for AI builders. Join us for one of our next meetups
              and hackathons!
            </Body>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <ButtonLink
                href="https://forms.gle/GwZR49kwTMszLKtN8"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                I want to volunteer
              </ButtonLink>
              <ButtonLink
                href="#events"
                variant="primary"
                size="md"
              >
                I want to build
              </ButtonLink>
              <ButtonLink
                href="/sponsors"
                variant="ghost"
                size="md"
                className="text-white hover:text-teal-300"
              >
                I want to sponsor <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
