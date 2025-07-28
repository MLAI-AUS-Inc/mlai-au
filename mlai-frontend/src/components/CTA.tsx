import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { H2, Body } from "@/components/ui/Typography";

export default function CTA() {
  return (
    <div
      id="join"
      className="bg-black relative isolate px-6 py-16 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <H2 className="text-white">
          Keen to jump aboard the pirate ship?
        </H2>
        <Body className="mx-auto mt-6 max-w-xl text-gray-300">
          Wait no longer, click the button sailor.
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
            href="/#events"
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
  );
}
