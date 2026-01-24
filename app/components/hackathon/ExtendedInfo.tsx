import { Container } from "./Container";

export function ExtendedInfo() {
  return (
    <section
      id="extendedinfo"
      aria-label="Extended Info"
      className="py-16 sm:py-20 bg-gray-900"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-6">
            Why an eSafety Hackathon?
          </h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              Online safety is one of the most pressing challenges of our digital age.
              As social platforms grow, so do the risks of online harms including cyberbullying,
              misinformation, and privacy violations.
            </p>
            <p>
              This hackathon presents a unique opportunity to tackle these challenges in a safe,
              controlled environment. Participants will work with a fully-simulated social platform
              to develop innovative solutions that can help protect users and create safer online spaces.
            </p>
            <p>
              Join us for two days of collaboration, innovation, and impact as we work together
              to build a safer digital future for everyone.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
