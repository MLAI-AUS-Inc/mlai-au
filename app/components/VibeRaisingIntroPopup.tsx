import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type VibeRaisingIntroPopupProps = {
    onDismiss: () => void;
    onComplete?: () => void;
};

export default function VibeRaisingIntroPopup({
    onDismiss,
    onComplete,
}: VibeRaisingIntroPopupProps) {
    const handleComplete = () => {
        onDismiss();
        onComplete?.();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onDismiss}
            />

            <div className="relative z-[110] flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[var(--vr-color-card)] shadow-2xl md:h-[560px] md:max-h-none md:flex-row">
                <div className="relative h-[62dvh] min-h-[360px] max-h-[620px] w-full overflow-hidden bg-black md:h-full md:min-h-0 md:w-[315px] md:flex-shrink-0">
                    <iframe
                        src="https://player.vimeo.com/video/1174236138?autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0"
                        className="absolute left-0 top-0 h-full w-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Vibe Raising Intro"
                    />
                </div>

                <div className="flex min-w-0 flex-col px-5 py-5 sm:px-6 sm:py-6 md:flex-1 md:p-0">
                    <div className="flex items-center gap-3 md:border-b md:border-[var(--vr-color-border)] md:px-6 md:pb-4 md:pt-6">
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="flex-shrink-0 text-[var(--vr-color-text-sub)] transition-colors hover:text-[var(--vr-color-text)]"
                            aria-label="Back"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </button>
                        <h2 className="flex-1 text-xl font-bold text-[var(--vr-color-text)]">Welcome to Vibe Raising</h2>
                    </div>

                    <div className="mt-4 md:mt-0 md:flex-1 md:px-6 md:py-6">
                        <p className="text-sm leading-relaxed text-[var(--vr-color-text-mid)]">
                            Watch this short intro on how Vibe Raising connects founders with investors through
                            consistent, transparent monthly updates.
                        </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:mt-0 md:flex-col md:items-stretch md:px-6 md:pb-6">
                        <button
                            type="button"
                            onClick={handleComplete}
                            className="inline-flex items-center justify-center rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition-all duration-200 hover:bg-[var(--vr-palette-black)] active:scale-[0.98] md:w-full md:px-6 md:py-3.5 md:text-base"
                        >
                            Get Started →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
