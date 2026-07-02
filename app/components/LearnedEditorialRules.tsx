import { Form } from "react-router";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Sparkles, Trash2 } from "lucide-react";
import { clsx } from "clsx";

import type { VibeMarketingLearnedRule } from "~/types/vibe-marketing";

export const LEARNED_RULE_INTENTS = ["retract-learned-rule"] as const;

function ScopeChip({ scope }: { scope: string }) {
  const isDurable = scope !== "one_off";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-black uppercase tracking-wide",
        isDurable
          ? "border-violet-200 bg-violet-50 text-violet-700"
          : "border-gray-200 bg-gray-100 text-gray-500",
      )}
    >
      {isDurable ? "Every article" : "One-off"}
    </span>
  );
}

function RetractButton({ ruleId, disabled }: { ruleId: string; disabled: boolean }) {
  return (
    <Form method="POST" className="inline">
      <input type="hidden" name="ruleId" value={ruleId} />
      <button
        type="submit"
        name="intent"
        value="retract-learned-rule"
        disabled={disabled}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-black text-gray-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Retract
      </button>
    </Form>
  );
}

function LearnedRuleRow({
  rule,
  isSubmitting,
}: {
  rule: VibeMarketingLearnedRule;
  isSubmitting: boolean;
}) {
  const target = rule.componentLabel || rule.componentType || null;
  return (
    <div className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <ScopeChip scope={rule.scope} />
          {target ? (
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-bold text-gray-600">
              {target}
            </span>
          ) : null}
          {rule.foldedToSpec ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              <CheckCircleIcon className="h-3 w-3" />
              In the design specs
            </span>
          ) : null}
        </div>
        <p className="text-sm font-bold leading-6 text-gray-950">{rule.rule}</p>
        {rule.specAmendment ? (
          <p className="text-xs font-medium leading-5 text-gray-600">
            <span className="font-black text-gray-700">Spec change:</span> {rule.specAmendment}
          </p>
        ) : null}
        {rule.sourceComment ? (
          <p className="truncate text-xs italic text-gray-400" title={rule.sourceComment}>
            From your comment: “{rule.sourceComment}”
          </p>
        ) : null}
      </div>
      <div className="sm:pt-0.5">
        <RetractButton ruleId={rule.id} disabled={isSubmitting} />
      </div>
    </div>
  );
}

export default function LearnedEditorialRules({
  rules,
  isSubmitting,
  error,
}: {
  rules: VibeMarketingLearnedRule[];
  isSubmitting: boolean;
  error?: string | null;
}) {
  return (
    <div>
      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      {rules.length === 0 ? (
        <div className="flex items-start gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-5">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
          <div>
            <p className="text-sm font-black text-gray-900">Nothing learned yet</p>
            <p className="mt-1 text-sm text-gray-600">
              When you comment on a draft article and accept the AI revision, the durable
              preferences behind your feedback show up here — and every future article applies
              them automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {rules.map((rule) => (
            <LearnedRuleRow key={rule.id} rule={rule} isSubmitting={isSubmitting} />
          ))}
        </div>
      )}
    </div>
  );
}
