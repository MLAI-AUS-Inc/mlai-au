export function GbhPeople() {
  // Define the people array outside of the return statement
  const people = [
    {
      name: "Louka Ewington-Pitsos",
      role: "Co-Founder",
      imageUrl: "/hackathon/photos/louka.jpeg",
    },
    {
      name: "Jamie Blackwell",
      role: "Co-Founder",
      imageUrl: "/hackathon/photos/jaime.png",
    },
    {
      name: "Lukas Wesemann",
      role: "Co-Founder",
      imageUrl: "/hackathon/photos/lukas.png",
    },
    {
      name: "Andrew Atta",
      role: "Marketing Wizz",
      imageUrl: "/hackathon/photos/andrew.png",
    },
    {
      name: "Doc Sam Donegan",
      role: "Master of the Web",
      imageUrl: "/hackathon/photos/sam.png",
    },
    {
      name: "Vincent Koc",
      role: "Sydney Lead",
      imageUrl: "/hackathon/photos/vincent.jpg",
    },
    {
      name: "Axel Ahmer",
      role: "ML Research, Aus. Bureau of Statistics",
      imageUrl: "/hackathon/photos/axelahmer.png",
    },
    // More people...
  ];

  return (
    <div className="bg-gray-900 pt-32  pb-24 md:pt-0">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
            MLAI Aus team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-200 pb-6">
            MLAI Aus is run entirely by volunteers. Interested in jumping aboard
            the pirate ship?
          </p>
          <a
            href="/"
            className="text-sm font-semibold leading-6 text-teal-300 hover:underline"
          >
            Learn more about our organisation <span aria-hidden="true">→</span>
          </a>
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
                  src={`${person.imageUrl}`}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                    {person.name}
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
