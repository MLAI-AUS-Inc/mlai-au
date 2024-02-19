import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from './Container'
import { Button } from './Button'
import Image from 'next/image'

export function MentorsVolunteers() {
  // Define the people array outside of the return statement
  const people = [
    {
      name: 'Alexar Pendashteh',
      role: 'Electron Workshop',
      imageUrl: 'photos/alexar.png',
    },
    {
      name: 'Oil Wongmayura',
      role: 'Digital Event Manager',
      imageUrl: 'photos/oil.png',
    },
    {
      name: 'Dr. Nick Kirkwood',
      role: 'Uni Melbourne',
      imageUrl: 'photos/nickkirckwood.jpg',
    },
    {
      name: 'Michael Foley',
      role: 'Data Scientist @ Solcast',
      imageUrl: 'photos/michaelfoley.jpg',
    },
    {
      name: 'Asmita Govind',
      role: 'MetaPM',
      imageUrl: 'photos/asmita.png',
    },
/*

    {
      name: 'Dr. Vlada Rozova',
      role: 'Uni Melbourne',
      imageUrl: 'photos/vlada.png',
    },


*/
    // More people...
  ];

  return (
    <div className="bg-gray-900 py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">Awesome mentors and volunteers</h2>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            The MLAI Green Battery Hack would simply be impossible without our awesome mentors and volunteers.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:col-span-2 xl:grid-cols-3">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-20 w-20 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-teal-500">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
