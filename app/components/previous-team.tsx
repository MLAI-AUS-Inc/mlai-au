import { H3, Body } from "~/components/ui/Typography";

const previousMembers = [
  {
    name: "Louka Ewington-Pitsos",
    role: "Co-founder, President (2023-2025)",
    imageUrl: "/team-photos/previous/louka.png",
    contribution: "Co-founded MLAI and led it to initial success running the first major hackathon focused on solving Australian problems with AI, and leading its second hackathon - the Green Battery Hack. Louka is a data science award winner and entrepreneur who founded a road maintenance startup, sold an arbitrage system, and surveyed 1/3 of the ACT with computer vision models, Louka still works in startups relating to AI.",
  },
  {
    name: "Jaime Blackwell",
    role: "Co-founder, Vice President (2023-2024)",
    imageUrl: "/team-photos/previous/jaime.png",
    contribution: "Co-founded MLAI, putting in significant time and effort into the first hackathon and assisting with developing monthly events afterwards focused on AI and startups. Jaime now works as a Data Scientist, having completed her AI and Computer Science Honours on tabular data generation.",
  },
  {
    name: "Dr Lukas Wesemann",
    role: "Co-founder, Secretary (2023-Present)",
    imageUrl: "/team-photos/lukas.png",
    contribution: "Co-founded MLAI and continues to serve as Secretary, Lukas has extensively assisted with all hackathons and ongoing events, being a pivotal member of the community. Lukas has a postdoc in photonics specializing in meta-optics, and is currently working as an AI Research Engineer.",
  },
  {
    name: "Dr Sam Donegan",
    role: "Vice President (2024-2025)",
    imageUrl: "/team-photos/sam.png",
    contribution: "A medical doctor with a passion for health promotion through design and technology, Dr Sam Donegan has run many successful events with MLAI, particularly his work for Medhack 2025. Dr Donegan is dedicated to building tech-enabled, sustainable companies that solve real problems. He continues to work with MLAI through his role as Head of Marketing.",
  },
  {
    name: "Benjaporn (Oil) Wongmayura",
    role: "Treasurer (2024-2025)",
    imageUrl: "/team-photos/previous/oil.png",
    contribution: "Oil Served as an invaluable asset to MLAI, managing the organization's finances and ensuring sustainable growth while supporting the expansion of community programs and initiatives. Oil is an experienced IT Consultant with 5 years of experience in Fintech who delivered data-driven, innovative solutions for major financial institutions across Asia and Europe.",
  },
];

export default function PreviousTeam() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {previousMembers.map((person) => (
              <div key={person.name} className="group relative">
                <div className="flex flex-col">
                  {/* Image and basic info */}
                  <div className="flex items-start gap-x-4 mb-4">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={person.imageUrl}
                      alt={person.name}
                    />
                    <div className="flex-1">
                      <H3 className="text-base font-semibold leading-6 text-gray-900">
                        {person.name}
                      </H3>
                      <p className="mt-2 text-sm font-medium leading-5 text-teal-500">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  {/* Contribution description */}
                  <div className="pl-0">
                    <Body className="text-sm leading-6 text-gray-600">
                      {person.contribution}
                    </Body>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
