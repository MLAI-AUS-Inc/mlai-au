'use client'
import Image from 'next/image'
import haizea from '/src/app/hackathon/images/logos/haizea.png'

import { Container } from './Container'
import { useEffect, useRef, useState } from 'react'

const sponsors = [
  { name: 'haizea', logo: haizea },
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
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-200 sm:text-5xl">
          Current sponsors
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-x-32 gap-y-12 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image src={sponsor.logo} alt={sponsor.name} unoptimized />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
