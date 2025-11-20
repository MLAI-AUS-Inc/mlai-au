export function GbhPeople() {
  // Define the people array outside of the return statement
  const people = [
    {
      name: "Xavier Andueza",
      role: "President",
      imageUrl: "/hackathon/photos/xavier.jpeg",
    },
    {
      name: "Michael Reitzenstein",
      role: "Vice President",
      imageUrl: "/hackathon/photos/michael.jpeg",
    },
    {
      name: "Pegah Khaleghi",
      role: "Treasurer",
      imageUrl: "/hackathon/photos/pegah.jpeg",
    },
    {
      name: "Lukas Wesemann",
      role: "Secretary",
      imageUrl: "/hackathon/photos/lukas.png",
    },
    {
      name: "Dr Sam Donegan",
      role: "Head of Marketing",
      imageUrl: "/hackathon/photos/sam.png",
    },
    {
      name: "Callum Holt",
      role: "Head of Partnerships",
      imageUrl: "/hackathon/photos/callum.jpeg",
    },
    {
      name: "Tom McKenzie",
      role: "Head of Technology",
      imageUrl: "/hackathon/photos/tom.jpeg",
    },
    {
      name: "Jasmine Raj",
      role: "Co-Head of Community",
      imageUrl: "/hackathon/photos/jasmine.jpeg",
    },
    {
      name: "Ethan Lee",
      role: "Co-Head of Community",
      imageUrl: "/hackathon/photos/ethan.jpeg",
    },
  ];


  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-4">
            MLAI AUS team
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            MLAI Aus is run entirely by volunteers. Interested in jumping aboard
            the pirate ship?
          </p>
          <a
            href="/"
            className="text-sm font-semibold text-teal-300 hover:text-teal-200 transition-colors"
          >
            Learn more about our organisation →
          </a>
        </div>
        <ul
          role="list"
          className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-200">
                    {person.name}
                  </h3>
                  <p className="text-xs text-teal-400">
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
