export function MentorsVolunteers() {
  // Define the people array outside of the return statement
  const people = [
    { name: "David Gilmore", role: "Mentor" },
    { name: "Utkarsh Nagar", role: "Mentor" },
    { name: "Alan Agon", role: "Mentor" },
    { name: "Krishna kanth Mundada", role: "Mentor" },
    { name: "Tung Van Truong", role: "Mentor" },
    { name: "Sanath Kolachippu", role: "Mentor" },
    { name: "Sajjad Kamal", role: "Mentor" },
    { name: "Aaron Chan", role: "Mentor" },
    { name: "Abhay", role: "Mentor" },
    { name: "Sarah davis-Gilmore", role: "Mentor" },
    { name: "Dave Morrissey", role: "Mentor" },
    { name: "Miles Johnson", role: "Mentor" },
    { name: "Joseph Roccisano", role: "Mentor" },
    { name: "Manu Ventura", role: "Mentor" },
    { name: "Khatija", role: "Mentor" },
    { name: "Jasmine Raj", role: "Mentor" },
    { name: "Annie Davila Campanello", role: "Mentor" },
    { name: "Pegah Khalegi", role: "Mentor" },
    { name: "Trevor Brunton", role: "Mentor" },
    { name: "Sumedh", role: "Mentor" },
    { name: "JK Chang", role: "Mentor" },
    { name: "Anshuk Kumar", role: "Mentor" },
  ];

  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-teal-200 sm:text-4xl mb-4">
            Awesome Mentors and Advisors
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The MLAI e-Safety Hackathon would simply be impossible without our
            awesome mentors and volunteers.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="rounded-lg bg-gray-800/50 border border-gray-700/50 px-4 py-3 hover:bg-gray-800/70 transition-colors">
                <h3 className="text-base font-semibold text-gray-200 mb-1">
                  {person.name}
                </h3>
                <p className="text-sm text-teal-400">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
