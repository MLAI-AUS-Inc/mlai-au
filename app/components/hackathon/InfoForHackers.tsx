import { Container } from "./Container";
import { ButtonLink } from "~/components/ui/Button";

export function InfoForHackers() {
  return (
    <section
      id="infoForHackers"
      aria-label="Info for Hackers"
      className="py-16 sm:py-24 bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-4">
            All info for hackers here
          </h2>
          <p className="mb-8 text-gray-300">
            Everything you need to know about the hackathon, resources, guidelines, and more.
          </p>
          <ButtonLink
            href="https://maroon-button-187.notion.site/Welcome-f511642e9807442d9d0a64d4464c6596"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
          >
            Go to Hack Wiki
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
