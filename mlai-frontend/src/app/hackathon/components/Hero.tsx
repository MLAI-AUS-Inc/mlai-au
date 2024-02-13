
import AnimatedBackground from './AnimatedBackground';
import { BackgroundImage } from './BackgroundImage';
import { Button } from './Button'
import { Container } from './Container'
import  GetTickets  from './GetTickets'

export function Hero() {
    return (
        <div className="relative sm:pt-24">
            <BackgroundImage className="-bottom-14 -top-36" />
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
                    <h1 className="font-display text-5xl font-bold tracking-tighter text-teal-600 sm:text-7xl">
                        MLAI Green Battery Hackathon
                    </h1>
                    <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-teal-600">
                        <p>
                        The MLAI Green Battery Hack is a beginner friendly hackathon where you are given a simulated battery and have to use it to trade the electricity spot market with the help of an AI model. 
                        </p>
                        
                        <p>
                        This simulation will give insight into the propensity of private batteries to disrupt or “game” the electricity market. Your solution could inform Australian policy to achieve net zero!
                        </p>
                        
                    </div>
                    <Button href="#schedule" className="mt-10 w-full sm:hidden">
                        Get your tickets
                    </Button>
                    <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left z-10">
                        {[
                            ['Speakers', '12'],
                            ['People Attending', '250'],
                            ['Location', 'Melbourne & Sydney'],
                        ].map(([name, value]) => (
                            <div key={name}>
                                <dt className="font-mono text-sm text-teal-600">{name}</dt>
                                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-teal-900">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="flex justify-center items-center max-h-96 mb-10 z-0 -ml-10">
                <AnimatedBackground />
            </div>
            </Container>
        </div>
    )
}
