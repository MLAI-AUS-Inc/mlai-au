import { Container } from "./Container";

const sponsorssilver = [
  { name: "lyra", logo: "/hackathon/logos/lyra.png" },
  { name: "aws", logo: "/hackathon/logos/aws2.png" },
  { name: "lovable", logo: "/hackathon/logos/lovable.png" },
];

const communitypartner = [
  { name: "studynash", logo: "/hackathon/logos/studynash2.png" },
  { name: "aidg", logo: "/hackathon/logos/aidg.png" },
  { name: "luna", logo: "/hackathon/logos/luna.png" },
  { name: "16days", logo: "/hackathon/logos/16days3.png" },
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
              className="flex items-center justify-center w-1/2 sm:w-1/3 md:w-1/5 p-2"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`w-full h-auto ${sponsor.name === "aws"
                  ? "max-w-[140px] sm:max-w-[180px] rounded-lg border-2 border-white"
                  : sponsor.name === "lovable"
                    ? "max-w-[140px] sm:max-w-[180px] rounded-lg"
                    : "max-w-[160px] sm:max-w-[200px]"
                  }`}
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
              className="flex items-center justify-center w-1/2 sm:w-1/4 md:w-1/6 p-2"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-auto ${sponsor.name === "studynash" ||
                  sponsor.name === "gumnut"
                  ? "w-auto max-w-[100px] sm:max-w-[130px]"
                  : "w-full max-w-[80px] sm:max-w-[100px]"
                  } ${sponsor.name === "gumnut" ||
                    sponsor.name === "16days"
                    ? "rounded-lg border-2 border-white"
                    : sponsor.name === "aidg"
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
