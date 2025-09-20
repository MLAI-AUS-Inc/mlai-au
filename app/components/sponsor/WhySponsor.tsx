import { Body, H2 } from "~/components/ui/Typography";
import { ButtonLink } from "../ui/Button";

export default function WhySponsor() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <H2>Why Sponsor MLAI Aus?</H2>
          <Body className="mt-6">
            MLAI Aus is a non-profit dedicated to making Australia an amazing
            home for AI and machine learning entrepreneurs. We&apos;re
            a thriving community that runs regular meetups, educational programs and events,
            hackathons, and more.
          </Body>
        </div>
      </div>
      <div className="py-12 sm:py-16 flex flex-row justify-center space-x-8">
      <ButtonLink
        href="/sponsor-event"
        variant="primary"
      >
        Sponsor an Event
      </ButtonLink>
      <ButtonLink
        href="/sponsor-mlai"
        variant="primary"
      >
        Sponsor MLAI Aus
      </ButtonLink>
      </div>
    </div>
  )
}
