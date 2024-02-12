import CTA from "@/components/CTA";

const stats = [];

export default function CodeOfConduct() {
    return (
        <div className="bg-white pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-40">
                <div className="flex justify-center">
                    <div className="max-w-6xl">
                        <div className="text-base leading-7 text-gray-700">
                            <p className="text-base font-semibold leading-7 text-teal-600">Our Values</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-8">
                                MLAI Aus Code of Contact
                            </h1>
                            <div className="max-w-xl">
                                <div className="text-base leading-7 text-gray-700 lg:max-w-lg mt-12">
                                    <div className="max-w-6xl mt-6">
                                        <p className="text-base font-semibold leading-7 text-teal-600">Introduction</p>
                                        <p>
                                            The purpose of this document is to outline the standards and expectations imposed on all members of MLAI Aus Incorporated. It is not exhaustive, but serves as a set of guidelines for members of our community.
                                        </p>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Scope</p>
                                        <p>
                                            This code of conduct applies to all committee members, volunteers, community partners, and participants of MLAI Aus Incorporated and associated community events.
                                        </p>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Core Values and Principles</p>
                                        <p>Our core values drive our decisions. These are:</p>
                                        <ul className="list-disc ml-4 mt-2">
                                            <li><strong>Community</strong> - We value the benefit of our community over personal, financial, or commercial interests.</li>
                                            <li><strong>Integrity</strong> - We value integrity and a high standard of ethics as individuals, and as an organization.</li>
                                            <li><strong>Innovation</strong> - We aim to catalyze innovation and support community members in developing new ideas.</li>
                                            <li><strong>Diversity</strong> - We understand that committing to diversity benefits our whole community. We commit to providing an inclusive space and welcome perspectives that differ from our own.</li>
                                        </ul>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Safety</p>
                                        <p>
                                            The safety of all community members, volunteers, and committee members is our highest priority. All individuals have the right to be safe from all forms of bullying, harassment, discrimination, and risks to physical or mental health. It is vital to our community that these rights are upheld by every participating member of the community. MLAI Aus Incorporated will not tolerate behaviors that pose a risk to the safety and wellbeing of our community.
                                        </p>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Respect, Diversity, and Inclusion</p>
                                        <p>
                                            We actively encourage diversity in the MLAI Aus community, and pledge our commitment to providing a safe, welcoming environment to all regardless of protected attributes. We expect all participants to respect and uphold this commitment, regardless of personal beliefs, preferences, and political ideologies.
                                        </p>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Integrity and Ethics</p>
                                        <p>
                                            MLAI Aus Incorporated is committed to upholding a high standard of integrity and ethical conduct.
                                        </p>
                                        <p className="text-base font-semibold leading-7 text-teal-600 mt-6">Data and Privacy</p>
                                        <p>
                                            We uphold and advocate for our community’s right to privacy. We do not tolerate any privacy breaches within our organization and strongly condemn the use of individual data without informed consent.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CTA></CTA>
        </div>
    )
}
