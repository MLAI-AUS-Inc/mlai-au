import { Container } from "./Container";

const sponsorssilver = [
  { name: "lyra", logo: "/hackathon/logos/lyra.png" },

];

const communitypartner = [
  { name: "stoneandchalk", logo: "/hackathon/logos/stoneandchalk.png" },
  { name: "aws", logo: "/hackathon/logos/aws2.png" },
  { name: "studynash", logo: "/hackathon/logos/studynash2.png" },
  { name: "aidg", logo: "/hackathon/logos/aidg.png" },
  { name: "luna", logo: "/hackathon/logos/luna.png" },
  { name: "16days", logo: "/hackathon/logos/16days3.png" },
  { name: "lovable", logo: "/hackathon/logos/lovable.png" },
  { name: "gumnut", logo: "/hackathon/logos/gumnut1.png" },

];

export function SilverSponsors() {
  return (
    <section
      id="silversponsors"
      aria-label="Silver Sponsors"
      className="py-16 sm:py-24 bg-gray-900"
    >
      <Container>
        <h2 className="text-center text-2xl sm:text-3xl font-display font-medium tracking-tight text-teal-200 mb-8">
          Silver Sponsors
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {sponsorssilver.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center w-1/3 sm:w-1/5"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-auto max-w-[200px]"
              />
            </div>
          ))}
        </div>
        <h3 className="text-center text-xl sm:text-2xl font-display font-medium tracking-tight text-teal-200 mb-8">
          Community Partners
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {communitypartner.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center w-1/3 sm:w-1/6"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-auto ${sponsor.name === "studynash" ||
                  sponsor.name === "lovable" ||
                  sponsor.name === "gumnut"
                  ? "w-auto max-w-[130px]"
                  : "w-full max-w-[100px]"
                  } ${sponsor.name === "aws" ||
                    sponsor.name === "stoneandchalk" ||
                    sponsor.name === "gumnut" ||
                    sponsor.name === "16days"
                    ? "rounded-lg border-2 border-white"
                    : sponsor.name === "lovable" || sponsor.name === "aidg"
                      ? "rounded-lg"
                      : ""
                  }`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
