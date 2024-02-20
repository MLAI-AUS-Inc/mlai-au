import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { Speakers } from './components/Speakers'
import { Sponsors } from './components/Sponsors'
import { InfoForHackers } from './components/InfoForHackers'
import { ExtendedInfo } from './components/ExtendedInfo'
import { GbhPeople } from './components/gbhPeople'
import { MentorsVolunteers } from './components/MentorsVolunteers'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL("https://mlai.au/hackathon"), 
    title: "MLAI Green Battery Hack",
    description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
    authors: [
        {
          name: 'Dr Sam Donegan',
          url: 'https://www.linkedin.com/in/samueldonegan/', 
        },
        {
            name: 'Dr Lukas Wesemann',
            url: 'https://www.linkedin.com/in/lukaswesemann/', 
          },
      ],
    openGraph: {
      title: 'MLAI',
      description: "MLAI Green Battery Hackathon, Melbourne & Sydney, April-May 2024",
      url: 'https://mlai.au/hackathon',
      type: 'website',
      images: [
        {
          url: 'photos/gbh_melbourne.webp',
          width: 1200,
          height: 630,
          alt: 'A Giant green battery in the middle of Melbourne and Sydney',
        },
      ],
    },
    robots: {
      index: true, // Allow indexing of the page by search engines
      follow: false, // Do not follow the links on the page to discourage scrapers
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      nocache: true,
    },
  };

export default function HackathonPage() {
    return (
        <div className="relative min-h-screen">
            
            <div className="relative z-10">
                <Hero />
                <Sponsors />
                <ExtendedInfo />
                <Speakers />
                <Schedule />
                <MentorsVolunteers />
                <GbhPeople />
                <InfoForHackers />
            </div>
        </div>
    )
}
