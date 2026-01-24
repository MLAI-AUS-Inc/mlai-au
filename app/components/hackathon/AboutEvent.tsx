import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

export function AboutEvent() {
    return (
        <section
            id="about"
            aria-label="About the Event"
            className="py-16 sm:py-24 bg-gray-900"
        >
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium text-teal-300 mb-4">
                        In partnership with the University of Melbourne & the Office of the eSafety Commissioner
                    </p>

                    <H2 className="text-teal-200 font-display tracking-tight mb-6">
                        eSafety Hackathon 2025
                    </H2>

                    <p className="text-lg text-gray-300 mb-6">
                        Bringing research, policy, and engineering together around the mission of safer tech and a safer society.
                    </p>

                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-left">
                        <p className="text-gray-400 italic text-sm leading-relaxed">
                            "If you ask an AI developer to build something, they build something for developers. People solve the problems they know and understand. Magic happens when you bring AI people together with industry professionals."
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
