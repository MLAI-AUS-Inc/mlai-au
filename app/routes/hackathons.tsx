import { Link } from "react-router";
import { HEALTHHACK_BRAND } from "~/lib/healthhack-brand";

const ESAFETY_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504";
const WATT_THE_HACK_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/watt-the-hack%2FChatGPT%20Image%20May%2021%2C%202026%2C%2010_48_11%20PM%20(1).png?alt=media&token=5e39b6e6-7b02-471c-866f-5d18aae506fe";

export default function Hackathons() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,#f7f2e8_100%)] px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--brutalist-black)] sm:text-5xl">
                        Hackathons
                    </h1>
                    <p className="mt-4 text-xl text-black/55">
                        Choose a hackathon to access its event platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
                    {/* Watt The Hack Card — Disabled */}
                    <div
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg grayscale opacity-75 cursor-not-allowed"
                    >
                        <img
                            src={WATT_THE_HACK_STATIC}
                            alt="Watt The Hack"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
                            <h3 className="text-2xl font-bold">Watt The Hack (Coming Soon)</h3>
                            <p className="mt-2 text-sm text-gray-200">
                                Build practical AI and software projects for a cleaner, smarter energy future.
                            </p>
                        </div>
                    </div>

                    {/* HealthHack Card */}
                    <Link
                        to="/hospital/app"
                        aria-label="Open HealthHack"
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--brutalist-blue)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(139,92,246,0.7),transparent_33%),linear-gradient(135deg,#16082d,#40158c_55%,#170b39)]" />
                        <div className="absolute -right-6 -top-10 h-[115%] w-1/2 opacity-70 transition-transform duration-300 group-hover:scale-[1.03]">
                            <img
                                src={HEALTHHACK_BRAND.assets.mark}
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <h3 className="sr-only">HealthHack</h3>
                            <img
                                src={HEALTHHACK_BRAND.assets.wordmark}
                                alt=""
                                className="h-12 w-auto max-w-[68%] object-contain object-left sm:h-14"
                            />
                            <p className="mt-2 text-sm text-gray-200">
                                Build practical solutions to real healthcare challenges.
                            </p>
                        </div>
                    </Link>

                    {/* eSafety Hackathon Card — Disabled */}
                    <div
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg grayscale opacity-75 cursor-not-allowed"
                    >
                        <img
                            src={ESAFETY_STATIC}
                            alt="eSafety Hackathon"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <h3 className="text-2xl font-bold">eSafety Hackathon (Coming Soon)</h3>
                            <p className="mt-2 text-sm text-gray-200">
                                Building a safer internet for everyone. Innovate for online safety.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
