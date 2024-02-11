import Image from 'next/image'


import logoLaravel from '/src/app/hackathon/images/logos/laravel.svg'
import logoMirage from '/src/app/hackathon/images/logos/mirage.svg'
import logoStatamic from '/src/app/hackathon/images/logos/statamic.svg'
import logoStaticKit from '/src/app/hackathon/images/logos/statickit.svg'
import logoTransistor from '/src/app/hackathon/images/logos/transistor.svg'
import logoTuple from '/src/app/hackathon/images/logos/tuple.svg'
import { Container } from './Container'

const sponsors = [
  { name: 'Transistor', logo: logoTransistor },
  { name: 'Tuple', logo: logoTuple },
  { name: 'StaticKit', logo: logoStaticKit },
  { name: 'Mirage', logo: logoMirage },
  { name: 'Laravel', logo: logoLaravel },
  { name: 'Statamic', logo: logoStatamic },
]

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32 bg-white">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-teal-900 sm:text-5xl">
          Current sponsorships for our workshops and speakers.
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
