'use client'
import Image from 'next/image'


import logoLaravel from '/src/app/hackathon/images/logos/laravel.svg'
import logoMirage from '/src/app/hackathon/images/logos/mirage.svg'
import logoStatamic from '/src/app/hackathon/images/logos/statamic.svg'
import logoStaticKit from '/src/app/hackathon/images/logos/statickit.svg'
import logoTransistor from '/src/app/hackathon/images/logos/transistor.svg'
import logoTuple from '/src/app/hackathon/images/logos/tuple.svg'
import { Container } from './Container'
import { useEffect, useRef, useState } from 'react'

const sponsors = [
  { name: 'Transistor', logo: logoTransistor },
  { name: 'Tuple', logo: logoTuple },
  { name: 'StaticKit', logo: logoStaticKit },
  { name: 'Mirage', logo: logoMirage },
  { name: 'Laravel', logo: logoLaravel },
  { name: 'Statamic', logo: logoStatamic },
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
      <div ref={mountRef} className="typo-zoom-sticky">
        <div className="typo-zoom-sticky-inner">
          <div
            className={`typo-zoom-text-wrapper ${isZoomed ? 'zoomAnimation' : ''}`}
            style={{
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="typo-zoom-text"></div>
            <img src="https://assets-global.website-files.com/61f1e1f5e79d214f7f0df5a0/65a530c5b54dfea4a6decaee_Take%20a%20look%20under%20the%20hood....svg" loading="lazy" alt="" className="typo-zoom-text-image"/>
          </div>
        </div>
      </div>


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
