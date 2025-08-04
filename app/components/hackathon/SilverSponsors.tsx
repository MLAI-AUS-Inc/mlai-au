import { Container } from "./Container";

const sponsorssilver = [
  { name: "haizea", logo: "/hackathon/logos/haizea.png" },
  { name: "solcast", logo: "/hackathon/logos/solcast.png" },
  { name: "dscubed", logo: "/hackathon/logos/dscubed.png" },
  { name: "dscubed", logo: "/hackathon/logos/dscubed.png" },
  { name: "hal", logo: "/hackathon/logos/Hal.png" },
  { name: "acs", logo: "/hackathon/logos/acs.png" },
];

const communitypartner = [
  { name: "aie", logo: "/hackathon/logos/aie.png" },
  { name: "optima", logo: "/hackathon/logos/optima.png" },
  { name: "mcn", logo: "/hackathon/logos/mcn.png" },
  { name: "exciton", logo: "/hackathon/logos/exciton.png" },
  { name: "mcds", logo: "/hackathon/logos/mcds.png" },
  { name: "buildclub", logo: "/hackathon/logos/buildclub.png" },
  { name: "opennem", logo: "/hackathon/logos/onem.png" },
];

export function SilverSponsors() {
  return (
    <section
      id="silversponsors"
      aria-label="SilverSponsors"
      className="pt-32 pb-20 sm:pb-32 sm:pt-32 bg-gray-900"
    >
      <Container>
        <h2 className="mx-auto pt-16 justify-center max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-3xl">
          Silver Sponsors
        </h2>
        <div className="flex justify-center items-center max-w-full mt-4">
          <div className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsorssilver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/5 px-4"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{ width: "90%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
        <h3 className="mx-auto mt-10 max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-2xl">
          Community Partners
        </h3>
        <div className="flex justify-center items-center max-w-full mt-4">
          <div className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {communitypartner.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/6 px-4"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{ width: "90%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
