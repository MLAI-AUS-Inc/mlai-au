import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { Dialog, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import {
  EnvelopeIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Spinner } from "~/components/ui/Spinner";
import {
  bootstrapVibeRaisingStartupUpdate,
} from "~/lib/vibe-raising";

interface DraftFromEmailWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleConnected?: () => void;
  backendBaseUrl: string;
  companyDomain?: string | null;
}

type Provider = "gmail";

function getErrorMessage(error: unknown) {
  const statusCode = (error as { status?: number })?.status;
  const requestId = (error as { requestId?: string })?.requestId;
  const payload = (error as { data?: { error?: string; detail?: string } })?.data;
  const message =
    payload?.error ??
    payload?.detail ??
    (error instanceof Error && error.message ? error.message : null) ??
    "We couldn't draft your update from Gmail. Please try again.";
  const diagnostics = [
    statusCode ? `status ${statusCode}` : null,
    requestId ? `request ${requestId}` : null,
  ].filter(Boolean);

  if (diagnostics.length === 0) return message;
  const separator = message.endsWith(".") ? " " : ". ";
  return `${message}${separator}Reference: ${diagnostics.join(" · ")}.`;
}

function ProviderStep({
  companyDomain,
  connectingProvider,
  errorMessage,
  showGmailNotice,
  onConnectGmail,
  onReviewGmailNotice,
  onCancelGmailNotice,
}: {
  companyDomain?: string | null;
  connectingProvider: Provider | null;
  errorMessage: string | null;
  showGmailNotice: boolean;
  onConnectGmail: () => void;
  onReviewGmailNotice: () => void;
  onCancelGmailNotice: () => void;
}) {
  const gmailBusy = connectingProvider === "gmail";

  return (
    <div className="relative">
      <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
        Connect Your Email
      </h3>
      <p className="mb-8 text-center text-sm text-gray-500">
        We&apos;ll only scan filtered emails relevant to drafting your investor update.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onReviewGmailNotice}
          disabled={connectingProvider !== null}
          className={clsx(
            "relative flex flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all duration-200",
            gmailBusy
              ? "border-violet-300 bg-violet-50"
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
            {gmailBusy ? "Connecting..." : "Gmail"}
          </span>
        </button>
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Outlook support is coming soon"
          className="relative flex cursor-not-allowed flex-col items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 opacity-60 transition-all duration-200"
        >
          <EnvelopeIcon className="h-12 w-12 text-blue-500" />
          <span className="font-bold text-gray-900">Outlook</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
            Coming soon
          </span>
        </button>
      </div>

      <Transition show={showGmailNotice} as={Fragment}>
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
                onClick={onCancelGmailNotice}
                disabled={connectingProvider !== null}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConnectGmail}
                disabled={connectingProvider !== null}
                className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 disabled:opacity-60"
              >
                {gmailBusy ? "Connecting..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </Transition>

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
    </div>
  );
}

export default function DraftFromEmailWizard({
  isOpen,
  onClose,
  onGoogleConnected,
  backendBaseUrl,
  companyDomain,
}: DraftFromEmailWizardProps) {
  const [connectingProvider, setConnectingProvider] = useState<Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showGmailNotice, setShowGmailNotice] = useState(false);

  const handleGmailConnect = useCallback(async () => {
    if (!companyDomain?.trim()) {
      setErrorMessage("Add a company domain before connecting Gmail.");
      return;
    }

    setConnectingProvider("gmail");
    setErrorMessage(null);

    try {
      const response = await bootstrapVibeRaisingStartupUpdate(backendBaseUrl);
      if (response.googleConnected) {
        setConnectingProvider(null);
        onGoogleConnected?.();
        return;
      }
      if (!response.oauthUrl) {
        throw new Error("Missing Google OAuth redirect URL.");
      }
      window.location.assign(response.oauthUrl);
    } catch (error: any) {
      setConnectingProvider(null);
      setErrorMessage(
        error?.data?.state === "needs_domain"
          ? error?.data?.error ?? "Add a company domain before connecting Gmail."
          : getErrorMessage(error),
      );
    }
  }, [backendBaseUrl, companyDomain, onGoogleConnected]);

  useEffect(() => {
    if (!isOpen) {
      setConnectingProvider(null);
      setErrorMessage(null);
      setShowGmailNotice(false);
    }
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
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
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <ProviderStep
                  companyDomain={companyDomain}
                  connectingProvider={connectingProvider}
                  errorMessage={errorMessage}
                  showGmailNotice={showGmailNotice}
                  onConnectGmail={handleGmailConnect}
                  onReviewGmailNotice={() => setShowGmailNotice(true)}
                  onCancelGmailNotice={() => setShowGmailNotice(false)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
