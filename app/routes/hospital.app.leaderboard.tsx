export default function HospitalAppLeaderboard() {
    return (
        <main className="min-h-screen bg-[#110822] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-3xl space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Leaderboard</h2>
                </div>

                <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl">
                    <div className="px-6 py-10 sm:px-12 sm:py-14 text-center">
                        <p className="text-lg leading-7 text-white/80">
                            Thanks for submitting. The top 2 teams will be invited to Medhack: Frontiers — Pitch Night where the winner will be crowned and they will have a chance to explain how they did it. Stay tuned!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
