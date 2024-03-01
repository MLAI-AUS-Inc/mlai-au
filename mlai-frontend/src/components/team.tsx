import React from 'react';
const people = [
    {
        name: 'Louka Ewington-Pitsos',
        role: 'Co-Founder',
        imageUrl:
            'photos/louka.jpeg',
    },
    {
        name: 'Jamie Blackwell',
        role: 'Co-Founder',
        imageUrl:
            'photos/jaime.png',
    },
    {
        name: 'Lukas Wesemann',
        role: 'Co-Founder',
        imageUrl:
            'photos/lukas.png',
    },
    {
        name: 'Andrew Atta',
        role: 'Marketing Wizz',
        imageUrl:
            'photos/andrew.png',
    },
    {
        name: 'Doc Sam Donegan',
        role: 'Master of the Web',
        imageUrl:
            'photos/sam.png',
    },
    // More people...
]

export default function Team() {
    return (
        <div className="bg-white py-24 sm:py-32" >
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">That&apos;s us looking all professional.</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        MLAI Aus is run entirely by volunteers. Interested in jumping aboard the pirate ship?
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-20 w-20 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-teal-500">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}