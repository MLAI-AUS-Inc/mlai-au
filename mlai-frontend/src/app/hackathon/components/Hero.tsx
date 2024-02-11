
import AnimatedBackground from './AnimatedBackground';
import { BackgroundImage } from './BackgroundImage';
import { Button } from './Button'
import { Container } from './Container'


export function Hero() {
    return (
        <div className="relative sm:pt-36">
            <BackgroundImage className="-bottom-14 -top-36" />
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
                    <h1 className="font-display text-5xl font-bold tracking-tighter text-teal-600 sm:text-7xl">
                        <span className="sr-only">MLAI - </span>Green Battery Hackathon
                    </h1>
                    <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-teal-600">
                        <p>
                            The next generation of web users are tech-savvy and suspicious.
                            They know how to use dev tools, they can detect a phishing scam
                            from a mile away, and they certainly aren’t accepting any checks
                            from Western Union.
                        </p>
                        <p>
                            At DeceptiConf you’ll learn about the latest dark patterns being
                            developed to trick even the smartest visitors, and you’ll learn
                            how to deploy them without ever being detected.
                        </p>
                    </div>
                    <Button href="#" className="mt-10 w-full sm:hidden">
                        Get your tickets
                    </Button>
                    <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left z-10">
                        {[
                            ['Speakers', '18'],
                            ['People Attending', '2,091'],
                            ['Venue', 'Staples Center'],
                            ['Location', 'Los Angeles'],
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
