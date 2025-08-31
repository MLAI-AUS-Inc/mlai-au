import { H2 } from "~/components/ui/Typography";

const people = [
  {
    name: "Xavier Andueza",
    role: "President",
    imageUrl: "team-photos/xavier.png",
    linkedIn: "https://www.linkedin.com/in/xavier-andueza/",
  },
  {
    name: "Michael Reitzenstein",
    role: "Vice President",
    imageUrl: "team-photos/michael.png",
    linkedIn: "https://www.linkedin.com/in/michael-reitzenstein-5528024/",
  },
  {
    name: "Pegah Khaleghi",
    role: "Treasurer",
    imageUrl: "team-photos/pegah.png",
    linkedIn: "https://www.linkedin.com/in/pegah-khaleghi/",
  },
  {
    name: "Lukas Wesemann",
    role: "Secretary",
    imageUrl: "team-photos/lukas.png",
    linkedIn: "https://www.linkedin.com/in/lukaswesemann/",
  },
  {
    name: "Dr Sam Donegan",
    role: "Head of Marketing",
    imageUrl: "team-photos/sam.png",
    linkedIn: "https://www.linkedin.com/in/samueldonegan/",
  },
  {
    name: "Callum Holt",
    role: "Head of Partnerships",
    imageUrl: "team-photos/callum.png",
    linkedIn: "https://www.linkedin.com/in/callumholt/",
  },
  {
    name: "Tom McKenzie",
    role: "Head of Technology",
    imageUrl: "team-photos/tom.png",
    linkedIn: "https://www.linkedin.com/in/tom-mckenzie-dev/",
  },
  {
    name: "Jasmine Raj",
    role: "Co-Head of Community",
    imageUrl: "team-photos/jasmine.png",
    linkedIn: "https://www.linkedin.com/in/jasmine-raj-49000b21a/",
  },
  {
    name: "Ethan Lee",
    role: "Co-Head of Community",
    imageUrl: "team-photos/ethan.png",
    linkedIn: "https://www.linkedin.com/in/ethan-lee-resume/",
  },
  // More people...
];

export default function Team() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <H2>That&apos;s us looking all professional.</H2>
          {/* <Body className="mt-6">
                        MLAI Aus is run entirely by volunteers. Interested in jumping aboard the pirate ship?
                    </Body> */}
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-20 w-20 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.linkedIn ? (
                      <a
                        href={person.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {person.name}
                      </a>
                    ) : (
                      person.name
                    )}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-teal-500">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
