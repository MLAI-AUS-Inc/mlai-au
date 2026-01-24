import { H2 } from "~/components/ui/Typography";
import { Container } from "./Container";

export function AboutUnite() {
    return (
        <section
            id="unite-campaign"
            aria-label="UNiTE Campaign"
            className="py-16 sm:py-24 bg-gray-900"
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <H2 className="text-teal-200 font-display tracking-tight mb-6">
                            Why Now? Supporting the UNiTE Campaign
                        </H2>

                        <div className="space-y-4 text-gray-300">
                            <p>
                                This year's eSafety Hackathon is intentionally timed to coincide with the global{" "}
                                <span className="font-semibold text-teal-200">16 Days of Activism against Gender-based Violence</span>{" "}
                                (Nov 25 – Dec 10, 2025).
                            </p>

                            <p>
                                The UN Women UNiTE campaign theme is{" "}
                                <span className="font-semibold text-teal-200">"End digital violence against all women and girls."</span>
                            </p>

                            <p>
                                Our Team Formation Night (Nov 26) and Hackathon Weekend (Nov 29-30) run within the campaign window, with Pitch Night (Dec 11) sustaining momentum immediately after Human Rights Day.
                            </p>

                            <p className="text-sm text-gray-400 pt-4">
                                By aligning with this global movement, we invite participants, mentors, and sponsors to channel their effort into concrete, safety-by-design prototypes that address digital violence and online safety.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="/hackathon/width_550.webp"
                            alt="16 Days of Activism"
                            className="rounded-lg shadow-2xl border border-gray-700"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
