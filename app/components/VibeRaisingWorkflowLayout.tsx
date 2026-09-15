import type { ReactNode, Ref } from "react";
import VibeRaisingProgressPanel, { type VibeRaisingProgressProps } from "./VibeRaisingProgressPanel";
import "../styles/vibe-raising-workflow.css";

type Props = VibeRaisingProgressProps & { children: ReactNode; panelRef?: Ref<HTMLDivElement> };

export default function VibeRaisingWorkflowLayout({ children, panelRef, ...stepperProps }: Props) {
  return (
    <div className="vr-workflow-layout">
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
