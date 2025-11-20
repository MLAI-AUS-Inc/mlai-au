import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

const sponsors = [
  { name: "unimelb", logo: "/hackathon/logos/unimelb.png" },
  { name: "eSafety", logo: "/hackathon/logos/esafety.png" },

];

export function Sponsors() {
  return (
    <section
      id="sponsors"
      aria-label="Sponsors"
      className="py-16 sm:py-24 bg-gray-900"
    >
      <Container>
        <H2 className="text-center text-teal-200 font-display tracking-tight mb-8">
          Gold Sponsors
        </H2>
        <div className="flex flex-wrap justify-center gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center w-1/2 sm:w-1/3 px-4"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-auto ${sponsor.name === "eSafety"
                  ? "max-w-[400px]" // larger eSafety logo
                  : "max-w-[200px]" // default size for others
                  }`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
