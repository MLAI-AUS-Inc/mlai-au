import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router";
import { Dialog, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import {
    EnvelopeIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    SparklesIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Spinner } from "~/components/ui/Spinner";

// ─── Types ───────────────────────────────────────────────────────

export interface PastMonthSummary {
    month: string;
    highlights: string;
    challenges: string;
    asks: string;
    metrics?: Record<string, string>;
}

export interface DraftedContent {
    summary: string;
    highlights: string;
    challenges: string;
    asks: string;
    pastMonths: PastMonthSummary[];
    metrics?: Record<string, string>;
}

interface DraftFromEmailWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onDraftComplete: (content: DraftedContent) => void;
}

type WizardStep = "provider" | "drafting";

// ─── Mock Data ───────────────────────────────────────────────────

const MOCK_DRAFTED_CONTENT: DraftedContent = {
    summary: "AI-powered platform helping founders automate their investor reporting and fundraising updates.",
    highlights:
        "Successfully closed seed extension round of $500K from existing investors.\nLaunched new enterprise dashboard feature which received positive feedback from 3 pilot customers.\nRevenue grew 28% MoM to $45K.\nSigned LOI with major enterprise client worth $120K ARR.\nTeam expanded with new Head of Product joining from Series B startup.",
    challenges:
        "Customer onboarding process still taking 12 days on average, need to streamline.\nIncreased competition in paid acquisition channels driving up CAC by 15%.\nLooking to optimize our go-to-market strategy for enterprise segment.",
    asks:
        "Would appreciate introductions to VP/Director level contacts at enterprise SaaS companies for customer development interviews.\nLooking for advice on optimizing our sales process for enterprise deals.\nAny referrals for experienced enterprise sales hires would be helpful.",
    metrics: {
        revenue: "45,000",
        growth: "28%",
        activeUsers: "1,250",
    },
    pastMonths: [
        {
            month: "December 2025",
            highlights: "Closed pre-seed round of $250K from angel investors. Onboarded first 5 beta customers and hit 500 active users milestone.",
            challenges: "Product stability issues during beta launch. Needed to prioritize bug fixes over new features.",
            asks: "Looking for introductions to early-stage B2B SaaS founders for peer learning and advice on product-market fit.",
            metrics: {
                revenue: "18,000",
                activeUsers: "500",
            },
        },
        {
            month: "January 2026",
            highlights: "Launched v2.0 with enterprise features. Revenue reached $32K MoM with 15% growth from new pricing tier.",
            challenges: "Hiring pipeline slower than expected for engineering roles. Onboarding new enterprise customers taking longer than projected.",
            asks: "Seeking referrals for senior full-stack engineers. Would love intros to heads of procurement at mid-market companies.",
            metrics: {
                revenue: "32,000",
                growth: "15%",
                activeUsers: "820",
            },
        },
    ],
};

// ─── Step Components ─────────────────────────────────────────────

function ProviderStep({
    onConnect,
}: {
    onConnect: (provider: "gmail" | "outlook") => void;
}) {
    const [connecting, setConnecting] = useState<"gmail" | "outlook" | null>(null);
    const [connected, setConnected] = useState<"gmail" | "outlook" | null>(null);
    const [showGmailNotice, setShowGmailNotice] = useState(false);

    const handleConnect = (provider: "gmail" | "outlook") => {
        setConnecting(provider);
        setTimeout(() => {
            setConnecting(null);
            setConnected(provider);
            setTimeout(() => onConnect(provider), 600);
        }, 1500);
    };

    const handleProviderClick = (provider: "gmail" | "outlook") => {
        if (provider === "gmail") {
            setShowGmailNotice(true);
            return;
        }

        handleConnect(provider);
    };

    return (
        <div className="relative">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Connect Your Email
            </h3>
            <p className="text-sm text-gray-500 text-center mb-8">
                We&apos;ll only scan filtered emails relevant to drafting your investor update
            </p>

            <div className="grid grid-cols-2 gap-4">
                {/* Gmail Card */}
                <button
                    type="button"
                    onClick={() => handleProviderClick("gmail")}
                    disabled={connecting !== null || connected !== null}
                    className={clsx(
                        "relative flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-200",
                        connected === "gmail"
                            ? "border-green-400 bg-green-50"
                            : connecting === "gmail"
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 hover:border-red-300 hover:bg-red-50/30 hover:shadow-md",
                        (connecting !== null || connected !== null) &&
                            connecting !== "gmail" &&
                            connected !== "gmail" &&
                            "opacity-50 cursor-not-allowed"
                    )}
                >
                    {connecting === "gmail" ? (
                        <Spinner size="lg" />
                    ) : connected === "gmail" ? (
                        <CheckCircleIcon className="w-12 h-12 text-green-500" />
                    ) : (
                        <svg viewBox="0 0 24 24" className="w-12 h-12">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    )}
                    <span className={clsx(
                        "font-bold",
                        connected === "gmail" ? "text-green-700" : "text-gray-900"
                    )}>
                        {connected === "gmail" ? "Connected!" : "Gmail"}
                    </span>
                </button>

                {/* Outlook Card */}
                <button
                    type="button"
                    onClick={() => handleProviderClick("outlook")}
                    disabled={connecting !== null || connected !== null}
                    className={clsx(
                        "relative flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-200",
                        connected === "outlook"
                            ? "border-green-400 bg-green-50"
                            : connecting === "outlook"
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md",
                        (connecting !== null || connected !== null) &&
                            connecting !== "outlook" &&
                            connected !== "outlook" &&
                            "opacity-50 cursor-not-allowed"
                    )}
                >
                    {connecting === "outlook" ? (
                        <Spinner size="lg" />
                    ) : connected === "outlook" ? (
                        <CheckCircleIcon className="w-12 h-12 text-green-500" />
                    ) : (
                        <EnvelopeIcon className="w-12 h-12 text-blue-600" />
                    )}
                    <span className={clsx(
                        "font-bold",
                        connected === "outlook" ? "text-green-700" : "text-gray-900"
                    )}>
                        {connected === "outlook" ? "Connected!" : "Outlook"}
                    </span>
                </button>
            </div>

            <Transition
                show={showGmailNotice}
                as={Fragment}
            >
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/95 p-3 backdrop-blur-sm sm:p-4">
                    <div className="w-full max-w-sm rounded-2xl border border-violet-100 bg-white p-5 shadow-xl">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-violet-50">
                                <ShieldCheckIcon className="h-6 w-6 text-violet-600" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-gray-900">
                                    Before you connect Gmail
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    MLAI only scans filtered email data needed to draft your investor update.
                                    The Gmail data used for this step is deleted after processing.
                                </p>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    By continuing, you agree to our{" "}
                                    <Link
                                        to="/terms"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-violet-600 underline underline-offset-2"
                                    >
                                        Terms
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/privacy"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-violet-600 underline underline-offset-2"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowGmailNotice(false)}
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowGmailNotice(false);
                                    handleConnect("gmail");
                                }}
                                className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

function DraftingStep() {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <SparklesIcon className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-2">
                Drafting Your Update...
            </p>
            <p className="text-sm text-gray-500 text-center max-w-xs">
                AI is scanning filtered email data and drafting your investor update
            </p>
            <div className="mt-6">
                <Spinner size="md" />
            </div>
        </div>
    );
}

// ─── Main Wizard Component ──────────────────────────────────────

export default function DraftFromEmailWizard({
    isOpen,
    onClose,
    onDraftComplete,
}: DraftFromEmailWizardProps) {
    const [step, setStep] = useState<WizardStep>("provider");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep("provider");
        }
    }, [isOpen]);

    const handleProviderConnected = () => {
        setStep("drafting");
        setTimeout(() => {
            onDraftComplete(MOCK_DRAFTED_CONTENT);
            onClose();
        }, 2500);
    };

    const isDrafting = step === "drafting";

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={isDrafting ? () => {} : onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300 transform"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200 transform"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-6 pt-6 pb-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-8">
                                {/* Close button */}
                                {!isDrafting && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
                                    >
                                        <ArrowLeftIcon className="w-5 h-5" />
                                    </button>
                                )}

                                {/* Step Content */}
                                {step === "provider" && (
                                    <ProviderStep onConnect={handleProviderConnected} />
                                )}
                                {step === "drafting" && <DraftingStep />}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
