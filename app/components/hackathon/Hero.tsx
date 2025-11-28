import { H1, Lead } from "~/components/ui/Typography";
import { Button } from "./Button";
import { Container } from "./Container";

function MatrixRain() {
  const columns = Array.from({ length: 20 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {columns.map((_, i) => (
        <div
          key={i}
          className="absolute -top-[120%] text-teal-400/40 text-xs sm:text-sm md:text-base font-mono"
          style={{
            left: `${(i / columns.length) * 100}%`,
            animation: `matrix-fall ${10 + (i % 5)}s linear infinite`,
            animationDelay: `${-i * 0.7}s`,
          }}
        >
          {"0 1 0 1 1 0 1 0 0 1 1 0 0 1 0 1 "
            .repeat(2)
            .trim()
            .split(" ")
            .map((n, idx) => (
              <div key={idx}>{n}</div>
            ))}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative bg-gray-900 py-20 sm:py-32 overflow-hidden">
      <MatrixRain />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <H1 className="text-white text-4xl sm:text-6xl md:text-7xl mb-6">
            Needle in the Hashtag - eSafety Hackathon
          </H1>
          <Lead className="text-gray-300 text-lg sm:text-xl mb-8">
            A two-day eSafety hackathon where builders, designers, students and community experts team up to tackle online harms using a safe, fully-simulated social platform.
          </Lead>
          <Button
            color="teal"
            href="https://events.humanitix.com/keep-our-community-safe-mlai-hackathon"
            className="mt-6 w-full sm:w-auto"
            target="_blank"
          >
            Get your tickets
          </Button>
          <Button
            color="teal"
            href="/platform/login?next=/esafety/dashboard"
            className="mt-6 w-full sm:w-auto sm:ml-4"
          >
            Log into the eSafety app
          </Button>
          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center p-5">
            {[
              ["Speakers", "11"],
              ["Participants", "140"],
              ["Location", "Melbourne, Stone & Chalk"],
            ].map(([name, value]) => (
              <div
                key={name}
                className="flex flex-col items-center text-center"
              >
                <dt className="text-sm text-gray-400 font-mono">{name}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {name === "Location" ? (
                    <>
                      Melbourne,
                      <br />
                      Stone &amp; Chalk
                    </>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
