export default function HospitalAppLeaderboard() {
    return (
        <main className="min-h-screen bg-transparent px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-3xl space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Leaderboard</h2>
                </div>

                <div className="rounded-2xl border border-indigo-300/20 bg-indigo-950/40">
                    <div className="px-6 py-10 sm:px-12 sm:py-14 text-center">
                        <p className="text-lg leading-7 text-white/80">
                            Thanks for submitting. The top 2 teams will be invited to the HealthHack grand final, where the winner will be crowned and each finalist will have a chance to explain how they built their solution. Stay tuned!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
