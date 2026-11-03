import { Link } from "react-router";
import { financialRefreshBusy, financialRefreshCandidateExpired, type FinancialProvider, type FinancialRefreshState } from "~/lib/pulse-financial-refresh";
import type { FinancialHistory, FinancialHistorySelection } from "~/lib/pulse-financial-history";
import PulseFinancialHistory from "./PulseFinancialHistory";
import PulseFinancialHistoryPicker from "./PulseFinancialHistoryPicker";

export default function PulseFinancialRefreshCard({ state, ownerHistory, audienceHistory, history, selection, reportingMonth, sources, connectedSources = sources, connectionsHref, disabled = false, onRefresh, onChange }: {
  state: FinancialRefreshState;
  ownerHistory?: FinancialHistory | null;
  audienceHistory?: FinancialHistory | null;
  history?: FinancialHistory | null;
  selection?: FinancialHistorySelection;
  reportingMonth: string;
  sources: FinancialProvider[];
  connectedSources?: string[];
  connectionsHref: string;
  disabled?: boolean;
  onRefresh: () => void;
  onChange: (selection: FinancialHistorySelection) => void;
}) {
  const busy = financialRefreshBusy(state);
  const candidate = state.candidate;
  const owner = candidate?.ownerPreview || (ownerHistory?.reportingMonth === reportingMonth ? ownerHistory : null)
    || (history?.reportingMonth === reportingMonth ? history : null);
  const savedAudience = selection?.shareAmounts ? ownerHistory : audienceHistory;
  const audience = candidate ? selection?.shareAmounts ? candidate.ownerPreview : candidate.audiencePreview
    : savedAudience?.reportingMonth === reportingMonth ? savedAudience
      : history?.reportingMonth === reportingMonth && history.shareAmounts === selection?.shareAmounts ? history : null;
  const expired = financialRefreshCandidateExpired(state);
  return <section className="pulse-financial-refresh-card" aria-label="Your financials">
    <header className="pulse-financial-refresh-heading">
      <div><h2>Your financials</h2><p>Refresh your chart from Xero and Stripe while you keep writing.</p></div>
      <button type="button" className="update-button secondary" disabled={disabled || busy || !sources.includes("xero") || !connectedSources.includes("xero")}
        onClick={onRefresh}>{busy ? "Refreshing financials…" : state.paused ? "Retry financial refresh" : "Refresh financials"}</button>
    </header>
    <p className="pulse-financial-history-note">Private to you. Publishing this chart and its dollar amounts are separate choices below.</p>
    <ul className="pulse-financial-refresh-sources" aria-label="Financial sources">
      {(["xero", "stripe"] as const).map(provider => {
        const source = state.job?.sources.find(item => item.provider === provider);
        const connected = connectedSources.includes(provider);
        const selected = sources.includes(provider);
        const label = source?.status === "ready" ? "Updated" : source?.status === "reconnect_required" ? "Reconnect needed"
          : source?.status === "failed" ? "Refresh failed" : source?.status === "refreshing" ? "Refreshing…"
            : source?.status === "pending" ? "Waiting…" : !connected ? "Not connected" : selected ? "Selected" : "Not selected";
        return <li key={provider}><strong>{provider === "xero" ? "Xero" : "Stripe"}</strong><span>{label}</span>
          {source?.lastRefreshedAt && <time dateTime={source.lastRefreshedAt}>Last refreshed {new Date(source.lastRefreshedAt).toLocaleString("en-AU")}</time>}
          {source?.detail && <small>{source.detail}</small>}
          {(!connected || source?.status === "reconnect_required") && <Link to={`${connectionsHref}#source-${provider}`}>{connected ? "Reconnect" : "Connect"} {provider === "xero" ? "Xero" : "Stripe"}</Link>}
        </li>;
      })}
    </ul>
    <p className="pulse-financial-history-note">Refresh uses Xero accrual revenue and costs. Stripe payments are checked separately and are not added to Xero revenue.</p>
    {!sources.includes("xero") && <p className="pulse-financial-history-note">{connectedSources.includes("xero") ? "Select Xero above for the revenue and costs chart." : "Connect Xero for the revenue and costs chart."} Stripe payment data can refresh alongside it.</p>}
    {busy && <p role="status">Updating financial sources. Your previous chart stays visible and you can keep editing or save it.</p>}
    {state.error && <p className="update-notice" role="alert">{state.error}</p>}
    {state.job?.status === "partial" && <p className="update-notice" role="status">{state.job.detail || "Xero figures are ready. Stripe needs attention; see its source status above."}</p>}
    {expired && <p className="update-notice" role="status">This preview has expired. Refresh financials again before saving these figures.</p>}
    {owner ? <PulseFinancialHistory history={owner} preview="owner" /> : <p className="pulse-financial-history-note">Refresh financials to see six months of revenue and costs ending in this update’s month. Xero is needed for the accounting chart. Missing figures stay empty.</p>}
    {candidate && !expired && <p className="pulse-financial-history-note" role="status">Your refreshed chart is ready. Save your draft to keep these figures; review the update before publishing.</p>}
    <PulseFinancialHistoryPicker selection={selection} history={history} reportingMonth={reportingMonth}
      disabled={disabled} onChange={onChange} controlsOnly />
    {selection?.enabled && <details className="pulse-financial-audience-preview"><summary>Preview what your audience will see</summary>
      {audience ? <PulseFinancialHistory history={audience} preview="audience" /> : <p>Save and review to prepare the chart with your chosen sharing settings.</p>}
    </details>}
  </section>;
}
