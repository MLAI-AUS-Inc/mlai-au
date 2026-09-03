import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";

const STRIPE_BUY_BUTTON_SCRIPT = "https://js.stripe.com/v3/buy-button.js";
const STRIPE_BUY_BUTTON_SCRIPT_ID = "stripe-buy-button-script";
const STRIPE_LOAD_TIMEOUT_MS = 10_000;

const buyButtonId = import.meta.env.VITE_STRIPE_DONATION_BUY_BUTTON_ID?.trim();
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();

type StripeScriptState = "idle" | "loading" | "ready" | "error";

let stripeBuyButtonLoad: Promise<void> | undefined;

function isValidBuyButtonId(value: string | undefined) {
  return Boolean(value && /^buy_btn_[A-Za-z0-9]+$/.test(value));
}

function isValidPublishableKey(value: string | undefined) {
  return Boolean(value && /^pk_(test|live)_[A-Za-z0-9]+$/.test(value));
}

function loadStripeBuyButton() {
  if (window.customElements.get("stripe-buy-button")) {
    return Promise.resolve();
  }

  if (stripeBuyButtonLoad) return stripeBuyButtonLoad;

  stripeBuyButtonLoad = new Promise<void>((resolve, reject) => {
    let script = document.getElementById(
      STRIPE_BUY_BUTTON_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const handleError = () => finish(new Error("Stripe Buy Button script failed to load"));
    const timeoutId = window.setTimeout(
      () => finish(new Error("Stripe Buy Button registration timed out")),
      STRIPE_LOAD_TIMEOUT_MS,
    );

    const finish = (error?: Error) => {
      window.clearTimeout(timeoutId);
      script?.removeEventListener("error", handleError);
      if (error) reject(error);
      else resolve();
    };

    if (!script) {
      script = document.createElement("script");
      script.id = STRIPE_BUY_BUTTON_SCRIPT_ID;
      script.src = STRIPE_BUY_BUTTON_SCRIPT;
      script.async = true;
    }

    script.addEventListener("error", handleError);
    window.customElements.whenDefined("stripe-buy-button").then(() => finish());

    if (!script.isConnected) document.head.appendChild(script);
  }).catch((error: unknown) => {
    document.getElementById(STRIPE_BUY_BUTTON_SCRIPT_ID)?.remove();
    stripeBuyButtonLoad = undefined;
    throw error;
  });

  return stripeBuyButtonLoad;
}

function useStripeBuyButtonScript(enabled: boolean) {
  const [state, setState] = useState<StripeScriptState>("idle");

  useEffect(() => {
    if (!enabled) return;

    setState("loading");
    let isCurrent = true;

    loadStripeBuyButton().then(
      () => {
        if (isCurrent) setState("ready");
      },
      () => {
        if (isCurrent) setState("error");
      },
    );

    return () => {
      isCurrent = false;
    };
  }, [enabled]);

  return state;
}

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isConfigured =
    isValidBuyButtonId(buyButtonId) && isValidPublishableKey(publishableKey);
  const scriptState = useStripeBuyButtonScript(isOpen && isConfigured);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brutalist-orange)] px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#ff6b3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
        Donate
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[70]"
          initialFocus={closeButtonRef}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="motion-safe:ease-out motion-safe:duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="motion-safe:ease-in motion-safe:duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="motion-safe:ease-out motion-safe:duration-200"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="motion-safe:ease-in motion-safe:duration-150"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-black bg-[var(--brutalist-beige)] p-5 text-left shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-8">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black bg-white text-2xl leading-none transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close donation modal</span>
                    <span aria-hidden="true">&times;</span>
                  </button>

                  <Dialog.Title className="pr-14 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    Support MLAI
                  </Dialog.Title>
                  <Dialog.Description className="mt-3 max-w-md text-base leading-6 text-gray-700">
                    Your one-time donation supports our volunteer-run Australian AI community,
                    helping us connect builders and run accessible events.
                  </Dialog.Description>

                  <div className="mt-6 min-h-40 rounded-2xl bg-white p-3 sm:p-5">
                    {!isConfigured ? (
                      <div className="flex min-h-32 flex-col items-center justify-center text-center">
                        <p className="font-semibold text-black">
                          Donations are temporarily unavailable
                        </p>
                        <p className="mt-2 text-sm leading-5 text-gray-600">
                          We are finishing our secure Stripe setup. Please check back soon.
                        </p>
                      </div>
                    ) : scriptState === "error" ? (
                      <div className="flex min-h-32 flex-col items-center justify-center text-center">
                        <p className="font-semibold text-black">
                          The secure donation form could not load
                        </p>
                        <p className="mt-2 text-sm leading-5 text-gray-600">
                          Check your connection, close this window, and try again.
                        </p>
                      </div>
                    ) : scriptState === "ready" ? (
                      <div className="flex justify-center">
                        {React.createElement("stripe-buy-button", {
                          "buy-button-id": buyButtonId,
                          "publishable-key": publishableKey,
                        })}
                      </div>
                    ) : (
                      <div
                        className="flex min-h-32 items-center justify-center text-sm font-medium text-gray-600"
                        role="status"
                      >
                        Loading secure donation form…
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-center text-xs leading-5 text-gray-600">
                    One-time donation in Australian dollars. Payment details are handled
                    securely by Stripe.
                  </p>
                  <p className="mt-2 text-center text-xs leading-5 text-gray-600">
                    Wish to contribute more than A$10,000? Email{" "}
                    <a
                      className="font-semibold text-black underline underline-offset-2 hover:no-underline"
                      href="mailto:hi@mlai.au"
                    >
                      hi@mlai.au
                    </a>
                    .
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
