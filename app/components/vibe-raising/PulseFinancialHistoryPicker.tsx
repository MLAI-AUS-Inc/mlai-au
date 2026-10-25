import { type FinancialHistory, type FinancialHistorySelection } from "~/lib/pulse-financial-history";
import PulseFinancialHistory from "./PulseFinancialHistory";
import "~/styles/pulse-financial-history.css";

export default function PulseFinancialHistoryPicker({ selection, history, reportingMonth, onChange, disabled = false }: {
  selection?: FinancialHistorySelection | null;
  history?: FinancialHistory | null;
  reportingMonth?: string;
  onChange: (selection: FinancialHistorySelection) => void;
  disabled?: boolean;
}) {
  const enabled = selection?.enabled === true;
  const shareAmounts = selection?.shareAmounts === true;
  const current = enabled && history && history.shareAmounts === shareAmounts && !selection?.refresh
    && (!reportingMonth || history.reportingMonth.slice(0, 7) === reportingMonth.slice(0, 7));
  return (
    <section className="pulse-financial-history-picker" aria-label="Financial chart sharing">
      <h2>Financial snapshot <span>Optional</span></h2>
      <p>Share six months of revenue and costs ending in this update’s reporting month. The selected month is highlighted.</p>
      <label className="pulse-financial-history-choice"><input type="checkbox" checked={enabled} disabled={disabled} onChange={event => onChange({ enabled: event.target.checked, shareAmounts: false })} /><span>Include the financial snapshot in this update</span></label>
      {enabled && <>
        <label className="pulse-financial-history-choice"><input type="checkbox" checked={shareAmounts} disabled={disabled} onChange={event => onChange({ enabled: true, shareAmounts: event.target.checked })} /><span>Share actual revenue and cost amounts with this update’s audience</span></label>
        <p className="pulse-financial-history-note">{shareAmounts ? "Your audience will see the exact amounts for every available month shown. Review the figures and audience before publishing." : "Dollar amounts stay hidden. Both lines use the same relative scale across all six months; your audience can see financial trends and the relationship between revenue and costs."}</p>
        {current ? <PulseFinancialHistory history={history} /> : <p role="status" className="pulse-financial-history-note">Save the draft or choose Save and review to prepare the exact chart for approval.</p>}
        {history && !selection?.refresh && <button type="button" className="progress-text-button" disabled={disabled} onClick={() => onChange({ enabled: true, shareAmounts, refresh: true })}>Use latest source figures</button>}
        {selection?.refresh && <p className="pulse-financial-history-note">The next save will capture fresh figures in a new revision. Review that revision before publishing.</p>}
      </>}
    </section>
  );
}
