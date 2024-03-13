'use client'
import Image from 'next/image'
import haizea from '/src/app/hackathon/images/logos/haizea.png'
import solcast from '/src/app/hackathon/images/logos/solcast.png'
import awsstartups from '/src/app/hackathon/images/logos/aws_padd.png'
import melbconnect from '/src/app/hackathon/images/logos/melbourneconnect.png'
import aie from '/src/app/hackathon/images/logos/aie.jpg'
import v2 from '/src/app/hackathon/images/logos/v2_logo.png'
import dscubed from '/src/app/hackathon/images/logos/dscubed.png'
import buildclub from '/src/app/hackathon/images/logos/buildclub.png'
import hal from '/src/app/hackathon/images/logos/Hal.png'
import acs from '/src/app/hackathon/images/logos/acs.png'

import { Container } from './Container'
import { useEffect, useRef, useState } from 'react'

const sponsors = [
  { name: 'aws', logo: awsstartups },
  { name: 'unimelb', logo: melbconnect },
  { name: 'v2', logo: v2 },
]

const sponsorssilver = [
  { name: 'haizea', logo: haizea },
  { name: 'solcast', logo: solcast },
  { name: 'dscubed', logo: dscubed },
  { name: 'hal', logo: hal },
  { name: 'acs', logo: acs },
]

const communitypartner = [
  { name: 'aie', logo: aie },
  { name: 'buildclub', logo: buildclub },

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
        <h2 className="mx-auto justify-center max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-5xl">
         Gold Sponsors
        </h2>

        <div className="flex justify-center items-center max-w-full mt-8">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/4 px-2"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '90%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

        <h2 className="mx-auto pt-8 justify-center max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-3xl">
          Silver Sponsors
        </h2>

        <div className="flex justify-center items-center max-w-full mt-4">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {sponsorssilver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/5 px-4"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '90%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>


        <h3 className="mx-auto mt-10 max-w-1xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 text-xl sm:text-2xl">
          Community Partners
        </h3>

        <div className="flex justify-center items-center max-w-full mt-4">
          <div
            className="flex flex-wrap justify-center gap-x-0 gap-y-12 mx-auto w-full">
            {communitypartner.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center justify-center w-1/3 sm:w-1/6 px-4"  
              >
                <Image src={sponsor.logo} alt={sponsor.name} unoptimized style={{ width: '90%', height: 'auto' }} />
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>


  )
}
