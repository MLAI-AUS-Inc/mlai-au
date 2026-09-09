import type { ReactNode, Ref } from "react";
import VibeRaisingProgressPanel, { UPDATE_PROGRESS_STEPS, type VibeRaisingProgressProps } from "./VibeRaisingProgressPanel";
import "../styles/vibe-raising-workflow.css";

type Props = VibeRaisingProgressProps & { children: ReactNode; panelRef?: Ref<HTMLDivElement> };

export default function VibeRaisingWorkflowLayout({ children, panelRef, ...stepperProps }: Props) {
  const activeIndex = UPDATE_PROGRESS_STEPS.findIndex((step) => step.key === stepperProps.activeStep);
  return (
    <div className="vr-workflow-layout">
      <p className="vr-workflow-mobile-heading" aria-live="polite">
        Step {activeIndex + 1} of 4 <span> / </span> {UPDATE_PROGRESS_STEPS[activeIndex]?.title}
      </p>
      <aside className="vr-workflow-sidebar">
        <div ref={panelRef} className="vr-workflow-sticky">
          <VibeRaisingProgressPanel {...stepperProps} />
        </div>
      </aside>
      <div className="vr-workflow-content">
        {children}
      </div>
    </div>
  );
}
