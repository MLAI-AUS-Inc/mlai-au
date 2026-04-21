import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type VibeRaisingIntroPopupProps = {
    onDismiss: () => void;
    onComplete?: () => void;
    onSkip?: () => void;
};

export default function VibeRaisingIntroPopup({
    onDismiss,
    onComplete,
    onSkip,
}: VibeRaisingIntroPopupProps) {
    const handleComplete = () => {
        onDismiss();
        onComplete?.();
    };

    const handleSkip = () => {
        onDismiss();
        onSkip?.();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onDismiss}
            />

            <div className="relative z-[110] flex h-[560px] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="relative h-full w-[315px] flex-shrink-0 overflow-hidden bg-black">
                    <iframe
                        src="https://player.vimeo.com/video/1174236138?autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0"
                        className="absolute left-0 top-0 h-full w-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Vibe Raising Intro"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-3 border-b border-gray-100 px-6 pb-4 pt-6">
                        <button
                            onClick={onDismiss}
                            className="flex-shrink-0 text-gray-400 transition-colors hover:text-gray-600"
                            aria-label="Back"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </button>
                        <h2 className="flex-1 text-xl font-bold text-gray-900">Welcome to Vibe Raising</h2>
                    </div>

                    <div className="flex-1 px-6 py-6">
                        <p className="text-sm leading-relaxed text-gray-600">
                            Watch this short intro on how Vibe Raising connects founders with investors through
                            consistent, transparent monthly updates.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 px-6 pb-6">
                        <button
                            onClick={handleComplete}
                            className="w-full rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:bg-violet-700 active:scale-[0.98]"
                        >
                            Get Started →
                        </button>
                        <button
                            onClick={handleSkip}
                            className="text-center text-sm text-gray-400 transition-colors hover:text-gray-600"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
