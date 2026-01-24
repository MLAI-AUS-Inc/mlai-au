import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

const events = [
    {
        title: "Team Formation Night",
        date: "November 26, 2025",
        time: "Evening",
        description: "Trivia-style icebreakers and matchmaking to help you find your squad.",
        image: "/hackathon/width_550 (1).webp",
        registrationUrl: "https://events.humanitix.com/kickoff-and-team-formation-night-esafety-hackathon",
    },
    {
        title: "Hackathon Weekend",
        date: "November 29-30, 2025",
        time: "Two Days",
        description: "Build, test, and iterate with mentors and domain experts available throughout.",
        image: "/hackathon/width_550 (2).webp",
        registrationUrl: "https://events.humanitix.com/keep-our-community-safe-mlai-hackathon",
    },
    {
        title: "Pitch Day",
        date: "December 11, 2025",
        time: "Afternoon",
        description: "Finalists pitch to a judging panel of industry, policy, and research leaders.",
        image: "/hackathon/width_550.webp",
        registrationUrl: null,
    },
];

export function EventOverview() {
    return (
        <section
            id="event-overview"
            aria-label="Event Overview"
            className="py-16 sm:py-24 bg-gray-900"
        >
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <H2 className="text-teal-200 font-display tracking-tight mb-4">
                        Event Overview
                    </H2>
                    <p className="text-lg text-gray-300">
                        Three-part program designed for impact
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="group bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden hover:border-teal-500/50 transition-all duration-300"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-teal-200 mb-2">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                    <time className="font-mono">{event.date}</time>
                                    <span>•</span>
                                    <span>{event.time}</span>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    {event.description}
                                </p>

                                {event.registrationUrl ? (
                                    <a
                                        href={event.registrationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Register Now
                                    </a>
                                ) : (
                                    <div className="text-center py-2 text-sm text-gray-400">
                                        Link provided to finalists
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
