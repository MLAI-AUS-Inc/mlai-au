import { useEffect, useId, useRef, useState } from "react";
import "~/styles/studio-work-preview.css";

const STEPS = ["Gather", "Draft", "Review"] as const;

/** A local illustration of the evidence → draft → human review workflow. */
export default function StudioWorkPreview() {
  const [step, setStep] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const panelId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusHeading = useRef(false);

  useEffect(() => {
    if (shouldFocusHeading.current) {
      headingRef.current?.focus();
      shouldFocusHeading.current = false;
    }
  }, [step]);

  const advanceToStep = (nextStep: number) => {
    shouldFocusHeading.current = true;
    setStep(nextStep);
  };

  return (
    <div className="studio-work-preview">
      <div className="studio-work-preview__masthead">
        <span>Vibe Raising</span>
        <span>Monthly founder updates</span>
      </div>

      <div
        className="studio-work-preview__steps"
        role="group"
        aria-label="Explore the sample workflow"
      >
        {STEPS.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={step === index}
            aria-controls={panelId}
            onClick={() => {
              shouldFocusHeading.current = false;
              setStep(index);
            }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        className="studio-work-preview__panel"
        aria-live="polite"
        aria-atomic="true"
      >
        {step === 0 && (
          <>
            <p className="studio-work-preview__eyebrow">The starting point</p>
            <h3 ref={headingRef} tabIndex={-1}>
              Notes for September’s update
            </h3>
            <dl className="studio-work-preview__evidence">
              <div>
                <dt>Stripe invoices</dt>
                <dd>
                  <strong>$18,400</strong> in paid invoices, excluding tax.
                </dd>
              </div>
              <div>
                <dt>Team notes</dt>
                <dd>
                  Two new customers onboarded. Integration delayed by a week.
                </dd>
              </div>
              <div>
                <dt>Founder’s ask</dt>
                <dd>An introduction to an Australian retail operator.</dd>
              </div>
            </dl>
            <button
              className="studio-work-preview__next"
              type="button"
              onClick={() => advanceToStep(1)}
            >
              Read the draft <span aria-hidden="true">→</span>
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <p className="studio-work-preview__eyebrow">
              Paperbark · sample September update
            </p>
            <h3 ref={headingRef} tabIndex={-1}>
              September investor update
            </h3>
            <div className="studio-work-preview__draft">
              <p>
                We brought on two new customers this month. Paid Stripe invoices
                came to <strong>$18,400 excluding tax</strong>. We haven’t
                checked other revenue yet.
              </p>
              <p>
                The integration is a week late. We’re aiming to have it ready
                for customers next month.
              </p>
              <p>Can anyone introduce us to a retail operator in Australia?</p>
            </div>
            <button
              className="studio-work-preview__next"
              type="button"
              onClick={() => advanceToStep(2)}
            >
              Check the draft <span aria-hidden="true">→</span>
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="studio-work-preview__eyebrow">
              Before anything is shared
            </p>
            <h3 ref={headingRef} tabIndex={-1}>
              Check the revenue figure
            </h3>
            <p className="studio-work-preview__review-intro">
              The draft includes a number that needs checking before the founder
              sends it.
            </p>
            <div className="studio-work-preview__review">
              <div className="studio-work-preview__review-heading">
                <span>Source</span>
                <strong>Stripe only</strong>
              </div>
              <p>This figure only covers paid Stripe invoices.</p>
              <button
                type="button"
                aria-pressed={showEvidence}
                aria-expanded={showEvidence}
                aria-controls={`${panelId}-evidence`}
                onClick={() => setShowEvidence((visible) => !visible)}
              >
                {showEvidence ? "Hide details" : "What’s missing?"}
              </button>
              {showEvidence && (
                <p
                  id={`${panelId}-evidence`}
                  className="studio-work-preview__gap"
                >
                  Check bank payments, refunds and other adjustments before
                  treating this as total revenue. The Stripe figure excludes
                  tax.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <p className="studio-work-preview__caption">
        Example using fictional company data
      </p>
    </div>
  );
}
