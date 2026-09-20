import { useId } from "react";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import type { VibeRaisingInputSourceKey, VibeRaisingInputSourceSummary } from "~/types/vibe-raising";
import { isConnectedConnector, UPDATE_CONNECTORS } from "~/lib/update-connectors";
import "~/styles/connector-tiles.css";

export function ConnectorLogo({ sourceKey }: { sourceKey: VibeRaisingInputSourceKey }) {
  const images: Partial<Record<VibeRaisingInputSourceKey, string>> = {
    gmail: "gmail.svg", slack: "slack.png", google_analytics: "google-analytics.svg", notion: "notion.png", luma: "luma.webp",
  };
  return <span className={`connector-logo connector-logo--${sourceKey}`} aria-hidden="true">
    {images[sourceKey] ? <img src={`/vibe-raising/logos/${images[sourceKey]}`} alt="" />
      : sourceKey === "stripe" ? "S"
      : sourceKey === "xero" ? "xero"
      : sourceKey === "bank_feed" ? <BuildingLibraryIcon />
      : sourceKey === "google_drive" ? <svg viewBox="0 0 36 32"><path d="M13 2h10l11 19H24z" fill="#34a853" /><path d="M13 2L2 21l5 9 11-19z" fill="#fbbc05" /><path d="M7 30h22l5-9H12z" fill="#4285f4" /></svg>
      : <svg viewBox="0 0 36 36"><path d="M8 25l17-17M14 28l14-14M8 17l9-9M22 28l6-6" stroke="currentColor" strokeLinecap="round" strokeWidth="3" /></svg>}
  </span>;
}

export default function ConnectorTile({ source, selected, disabled = false, busy = false, detailed = false, selectionPurpose = "update", onToggle, onConnect }: {
  source: VibeRaisingInputSourceSummary;
  selected: boolean;
  disabled?: boolean;
  busy?: boolean;
  detailed?: boolean;
  selectionPurpose?: "update" | "draft";
  onToggle: (source: VibeRaisingInputSourceSummary) => void;
  onConnect: (source: VibeRaisingInputSourceSummary) => void;
}) {
  const descriptionId = useId();
  const connected = isConnectedConnector(source);
  const on = connected && selected;
  // Stripe's OAuth remains available when its status service is unavailable.
  const unavailable = source.status === "coming_soon" || (source.status === "unavailable" && source.key !== "stripe");
  const status = busy ? "Connecting…" : source.status === "syncing" ? "Syncing"
    : connected ? (on ? (selectionPurpose === "draft" ? "Used for AI draft" : "Included in update") : "Connected · not used")
    : source.status === "coming_soon" ? "Coming soon"
    : unavailable ? "Unavailable"
    : source.status === "error" ? "Reconnect to use ↗" : "Connect to use ↗";
  return <button type="button" className={`connector-tile${detailed ? " connector-tile--detailed" : ""}`}
    data-on={on} data-connected={connected} disabled={disabled || busy || unavailable}
    role={connected ? "switch" : undefined} aria-checked={connected ? on : undefined}
    aria-label={connected ? `${source.label} for this update` : `${source.status === "error" ? "Reconnect" : "Connect"} ${source.label}`}
    aria-describedby={descriptionId} aria-busy={busy || undefined}
    onClick={() => connected ? onToggle(source) : onConnect(source)}>
    <ConnectorLogo sourceKey={source.key} />
    <span className="connector-tile-name">{source.label}</span>
    <span className="connector-tile-state" aria-hidden="true"><i />{on ? "On" : "Off"}</span>
    {detailed && <span className="connector-tile-description">{UPDATE_CONNECTORS.find(item => item.key === source.key)?.description}</span>}
    <span id={descriptionId} className="connector-tile-status">{status}</span>
  </button>;
}
