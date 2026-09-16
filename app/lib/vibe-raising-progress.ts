/** Seven small milestones, not a submission gate: cadence, period and five answers. */
export function getVibeRaisingDraftProgress(cadenceSelected: boolean, periodConfirmed: boolean, answeredQuestions: number) {
  const answerCount = Number.isFinite(answeredQuestions) ? Math.min(5, Math.max(0, answeredQuestions)) : 0;
  return (Number(cadenceSelected) + Number(periodConfirmed) + answerCount) / 7;
}
