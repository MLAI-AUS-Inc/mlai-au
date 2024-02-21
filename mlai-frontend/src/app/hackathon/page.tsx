import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { Speakers } from './components/Speakers'
import { Sponsors } from './components/Sponsors'
import { InfoForHackers } from './components/InfoForHackers'
import { ExtendedInfo } from './components/ExtendedInfo'
import { GbhPeople } from './components/gbhPeople'
import { MentorsVolunteers } from './components/MentorsVolunteers'

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
