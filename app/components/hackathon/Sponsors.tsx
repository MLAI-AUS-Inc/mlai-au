import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

const sponsors = [
  { name: "unimelb", logo: "/hackathon/logos/melbourneconnect.png" },
  { name: "CoM", logo: "/hackathon/logos/CoM_pad.png" },
  { name: "v2", logo: "/hackathon/logos/v2_logo.png" },
  { name: "aws", logo: "/hackathon/logos/aws_padd.png" },
  { name: "amber", logo: "/hackathon/logos/amber.png" },
];

export function Sponsors() {
  return (
    <section
      id="sponsors"
      aria-label="Sponsors"
      className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900"
    >
      <Container>
        <H2 className="mx-auto justify-center max-w-2xl text-center text-teal-200 font-display tracking-tighter">
          Gold Sponsors
        </H2>
        <div className="flex justify-center items-center max-w-full mt-8">
          <div className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/2 sm:w-1/3 px-4"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
