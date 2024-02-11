import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { Speakers } from './components/Speakers'
import { Sponsors } from './components/Sponsors'

export default function HackathonPage() {
    return (
        <div className="relative min-h-screen">
            {/* Content with relative positioning to stack above the background */}
            <div className="relative z-10">
                <Hero />
                <Speakers />
                <Schedule />
                <Sponsors />
            </div>
        </div>
    )
}
