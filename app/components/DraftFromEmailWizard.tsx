import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import {
  EnvelopeIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Spinner } from "~/components/ui/Spinner";
import {
  bootstrapVibeRaisingStartupUpdate,
  getVibeRaisingStartupUpdateStatus,
  runVibeRaisingStartupUpdate,
} from "~/lib/vibe-raising";
import type {
  VibeRaisingDraftedContent,
  VibeRaisingStartupUpdateStatusResponse,
} from "~/types/vibe-raising";

interface DraftFromEmailWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onDraftComplete: (content: VibeRaisingDraftedContent) => void;
  backendBaseUrl: string;
  companyDomain?: string | null;
  resumeAfterGoogleAuth?: boolean;
}

type WizardStep = "provider" | "drafting";
type Provider = "gmail" | "outlook";

const DEFAULT_DRAFTING_MESSAGE =
  "AI is scanning your recent emails and drafting your investor update.";
const POLL_INTERVAL_MS = 2500;
const MAX_POLL_ATTEMPTS = 60;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatRunStep(step?: string | null) {
  if (!step) return DEFAULT_DRAFTING_MESSAGE;
  return `Working through ${step.replace(/_/g, " ")}.`;
}

function getErrorMessage(error: unknown) {
  const payload = (error as { data?: { error?: string; detail?: string } })?.data;
  if (payload?.error) return payload.error;
  if (payload?.detail) return payload.detail;
  if (error instanceof Error && error.message) return error.message;
  return "We couldn't draft your update from Gmail. Please try again.";
}

function ProviderStep({
  companyDomain,
  connectingProvider,
  errorMessage,
  onConnectGmail,
  onRetryDraft,
  resumeAfterGoogleAuth,
}: {
  companyDomain?: string | null;
  connectingProvider: Provider | null;
  errorMessage: string | null;
  onConnectGmail: () => void;
  onRetryDraft: () => void;
  resumeAfterGoogleAuth?: boolean;
}) {
  const gmailBusy = connectingProvider === "gmail";

  return (
    <div>
      <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
        Connect Your Email
      </h3>
      <p className="mb-8 text-center text-sm text-gray-500">
        We&apos;ll scan your recent emails to draft your investor update.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onConnectGmail}
          disabled={connectingProvider !== null}
          className={clsx(
            "relative flex flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all duration-200",
            gmailBusy
              ? "border-blue-300 bg-blue-50"
              : "border-gray-200 hover:border-red-300 hover:bg-red-50/30 hover:shadow-md",
            connectingProvider !== null && !gmailBusy && "cursor-not-allowed opacity-50",
          )}
        >
          {gmailBusy ? (
            <Spinner size="lg" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-12 w-12">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          <span className="font-bold text-gray-900">
            {gmailBusy ? "Redirecting..." : "Gmail"}
          </span>
        </button>

        <button
          type="button"
          disabled
          className="relative flex cursor-not-allowed flex-col items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 opacity-70"
        >
          <EnvelopeIcon className="h-12 w-12 text-blue-600" />
          <span className="font-bold text-gray-900">Outlook</span>
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Coming soon
          </span>
        </button>
      </div>

      {!companyDomain && (
        <p className="mt-4 text-sm text-amber-700">
          Add a company domain in{" "}
          <a href="/vibe-raising/companies" className="font-semibold underline">
            Companies
          </a>{" "}
          before connecting Gmail.
        </p>
      )}

      {errorMessage && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {resumeAfterGoogleAuth && errorMessage && (
        <button
          type="button"
          onClick={onRetryDraft}
          className="mt-4 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Retry draft generation
        </button>
      )}
    </div>
  );
}

function DraftingStep({ statusMessage }: { statusMessage: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
          <SparklesIcon className="h-8 w-8 animate-pulse text-purple-600" />
        </div>
      </div>
      <p className="mb-2 text-lg font-bold text-gray-900">Drafting Your Update...</p>
      <p className="max-w-xs text-center text-sm text-gray-500">{statusMessage}</p>
      <div className="mt-6">
        <Spinner size="md" />
      </div>
    </div>
  );
}

export default function DraftFromEmailWizard({
  isOpen,
  onClose,
  onDraftComplete,
  backendBaseUrl,
  companyDomain,
  resumeAfterGoogleAuth = false,
}: DraftFromEmailWizardProps) {
  const [step, setStep] = useState<WizardStep>("provider");
  const [connectingProvider, setConnectingProvider] = useState<Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(DEFAULT_DRAFTING_MESSAGE);
  const flowNonceRef = useRef(0);
  const resumeHandledRef = useRef(false);

  const resetToProvider = useCallback(() => {
    flowNonceRef.current += 1;
    setStep("provider");
    setConnectingProvider(null);
    setStatusMessage(DEFAULT_DRAFTING_MESSAGE);
  }, []);

  const handleStatus = useCallback(
    (statusResponse: VibeRaisingStartupUpdateStatusResponse) => {
      if (statusResponse.state === "ready" && statusResponse.draft) {
        onDraftComplete(statusResponse.draft);
        return false;
      }

      if (statusResponse.state === "processing") {
        setStep("drafting");
        setStatusMessage(formatRunStep(statusResponse.run?.currentStep));
        return true;
      }

      resetToProvider();
      setErrorMessage(
        statusResponse.error ??
          (statusResponse.state === "needs_domain"
            ? "Add a company domain before connecting Gmail."
            : statusResponse.state === "needs_google_auth"
              ? "Reconnect Gmail to continue drafting from email."
              : "We couldn't draft your update from Gmail. Please try again."),
      );
      return false;
    },
    [onDraftComplete, resetToProvider],
  );

  const startDraftFlow = useCallback(async () => {
    const flowNonce = ++flowNonceRef.current;
    setConnectingProvider(null);
    setErrorMessage(null);
    setStep("drafting");
    setStatusMessage("Starting your email scan...");

    try {
      const initial = await runVibeRaisingStartupUpdate(backendBaseUrl);
      if (flowNonce !== flowNonceRef.current) return;
      if (!handleStatus(initial)) return;

      for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
        await sleep(POLL_INTERVAL_MS);
        if (flowNonce !== flowNonceRef.current) return;

        const currentStatus = await getVibeRaisingStartupUpdateStatus(backendBaseUrl);
        if (flowNonce !== flowNonceRef.current) return;
        if (!handleStatus(currentStatus)) return;
      }

      resetToProvider();
      setErrorMessage(
        "Email processing is still running. Please wait a moment and retry draft generation.",
      );
    } catch (error) {
      if (flowNonce !== flowNonceRef.current) return;
      resetToProvider();
      setErrorMessage(getErrorMessage(error));
    }
  }, [backendBaseUrl, handleStatus, resetToProvider]);

  const handleGmailConnect = useCallback(async () => {
    if (!companyDomain?.trim()) {
      setErrorMessage("Add a company domain before connecting Gmail.");
      return;
    }

    const flowNonce = ++flowNonceRef.current;
    setConnectingProvider("gmail");
    setErrorMessage(null);

    try {
      const response = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl);
      if (flowNonce !== flowNonceRef.current) return;
      if (!response.oauthUrl) {
        throw new Error("Missing Google OAuth redirect URL.");
      }
      window.location.assign(response.oauthUrl);
    } catch (error: any) {
      if (flowNonce !== flowNonceRef.current) return;
      setConnectingProvider(null);
      setErrorMessage(
        error?.data?.state === "needs_domain"
          ? error?.data?.error ?? "Add a company domain before connecting Gmail."
          : getErrorMessage(error),
      );
    }
  }, [backendBaseUrl, companyDomain]);

  useEffect(() => {
    if (!isOpen) {
      resetToProvider();
      setErrorMessage(null);
      resumeHandledRef.current = false;
      return;
    }

    if (!resumeAfterGoogleAuth) {
      setErrorMessage(null);
      setStep("provider");
      setStatusMessage(DEFAULT_DRAFTING_MESSAGE);
      resumeHandledRef.current = false;
    }
  }, [isOpen, resetToProvider, resumeAfterGoogleAuth]);

  useEffect(() => {
    if (!isOpen || !resumeAfterGoogleAuth || resumeHandledRef.current) {
      return;
    }

    resumeHandledRef.current = true;
    void startDraftFlow();
  }, [isOpen, resumeAfterGoogleAuth, startDraftFlow]);

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-6 pb-6 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-8">
                {!isDrafting && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}

                {step === "provider" && (
                  <ProviderStep
                    companyDomain={companyDomain}
                    connectingProvider={connectingProvider}
                    errorMessage={errorMessage}
                    onConnectGmail={handleGmailConnect}
                    onRetryDraft={startDraftFlow}
                    resumeAfterGoogleAuth={resumeAfterGoogleAuth}
                  />
                )}

                {step === "drafting" && (
                  <DraftingStep statusMessage={statusMessage} />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
