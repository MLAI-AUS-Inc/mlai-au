'use client'
import Image from 'next/image'
import haizea from '/src/app/hackathon/images/logos/haizea.png'
import solcast from '/src/app/hackathon/images/logos/solcast.png'
import awsstartups from '/src/app/hackathon/images/logos/aws-startups.jpg'
import melbconnect from '/src/app/hackathon/images/logos/melbconnect.png'
import aie from '/src/app/hackathon/images/logos/aie.jpg'

import { Container } from './Container'
import { useEffect, useRef, useState } from 'react'

const sponsors = [
  { name: 'melbconnect', logo: melbconnect },
  { name: 'aws', logo: awsstartups },
]

const sponsorssilver = [
  { name: 'haizea', logo: haizea },
  { name: 'solcast', logo: solcast },
]

const communitypartner = [
  { name: 'aie', logo: aie },

]


export function Sponsors() {
  const [isZoomed, setIsZoomed] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      const top = rect.top;

      setIsZoomed(top <= 0); // Set isZoomed true if the element is at or past the top
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="sponsors" aria-label="Sponsors" className="pt-96 pb-20 sm:pb-32 sm:pt-96 bg-gray-900">
      <Container>
        <h2 className="mx-auto justify-center max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
          Current sponsors
        </h2>
        
        <div className="mx-auto flex items-center justify-center mt-20 grid w-full max-w-full grid-cols-2 place-items-center gap-x-8 gap-y-12 sm:grid-cols-3 md:gap-x-32 lg:gap-x-16 ">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
            </div>
          ))}
        </div>

        <div className="mx-auto  mt-20 grid w-full max-w-full grid-cols-3 place-items-center gap-x-8 gap-y-12 sm:grid-cols-5 md:gap-x-16 lg:gap-x-8">
          {sponsorssilver.map((sponsorssilver) => (
            <div
              key={sponsorssilver.name}
              className="flex items-center justify-center"
            >
              <Image src={sponsorssilver.logo} alt={sponsorssilver.name} unoptimized />
            </div>
          ))}
        </div>

        <h3 className="mx-auto mt-32 max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-3xl">
          Community Partners
        </h3>
        <div className="mx-auto mt-20 grid w-full max-w-full grid-cols-3 place-items-center gap-x-8 gap-y-12 sm:grid-cols-6 md:gap-x-16 lg:gap-x-16">
          {communitypartner.map((communitypartner) => (
            <div
              key={communitypartner.name}
              className="flex items-center justify-center"
            >
              <Image src={communitypartner.logo} alt={communitypartner.name} unoptimized />
            </div>
          ))}
        </div>
      </Container>
    </section>


  )
}
