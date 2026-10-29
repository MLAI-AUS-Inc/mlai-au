// Editorial teaching material, not observations of customers or a startup classifier.
export const STARTUP_MODEL_PROVENANCE = 'All four cases, the proposed hours and the contradictory request are fictional teaching material. No customer interviews, delivery timings, trials or payments were collected.'
export const STARTUP_MODEL_CASES = [
  { id: 'F1', venture: 'A new local repair shop', facts: 'The owner wants one dependable neighbourhood location. More repairs require more technician hours and bench space.', interpretation: 'A new local business under the stated plan, not a rapid-growth startup merely because it just opened.', next: 'Decide whether one location meets the owner’s goals. A later expansion plan would need separate evidence.' },
  { id: 'F2', venture: 'An AI contractor proposing a shared quote-drafting product', facts: 'The current offer is bespoke workflow setup. A common template is proposed, but no shared product or customer trial exists.', interpretation: 'A service business exploring a startup hypothesis. AI tooling and a reuse estimate do not prove repeatable delivery or demand.', next: 'Compare the actual setup differences before promising a product. The completed record below keeps that uncertainty visible.' },
  { id: 'F3', venture: 'A software team testing one product for several businesses', facts: 'The team intends to serve many similar businesses. In this story two businesses agree to try a demonstration; neither has paid or returned for another use.', interpretation: 'Startup intent and a possible repeatable offering, not demonstrated retention or a validated business model.', next: 'Record what the trial actually involves and whether the same offering solves a recurring need. Two agreements are not two retained customers.' },
  { id: 'F4', venture: 'An established company trying an internal product', facts: 'A separate team is testing a new offer while the parent keeps running its established business.', interpretation: 'The experiment may use startup-style discovery. That does not reclassify the whole parent as a newly founded company.', next: 'Name the unit being discussed. Check the actual applicant entity if considering a programme.' },
] as const

export const STARTUP_MODEL_FIELDS = [
  { label: 'Whose problem does the venture address?', value: 'F2: owners of small field-service businesses preparing draft quotes. This is an imagined audience, not a researched customer segment.' },
  { label: 'What is the offering today, not the future vision?', value: 'Bespoke workflow setup is the current fictional offer. A shared quote-drafting product is proposed, not built, sold or deployed.' },
  { label: 'What repeats between customers?', value: 'The proposed draft structure repeats. The 40 common setup hours and 4 hours per client are planning inputs, not time logs or evidence that the same integration will work.' },
  { label: 'What still requires custom work or founder time?', value: 'Each accounting system, quote approval rule and data permission may differ. Maintenance, support, security, acquisition and infrastructure are unestimated, not zero.' },
  { label: 'What shows demand: conversations, trials, payments or repeat use?', value: 'None collected. Five clients in the calculation means five assumed setups, not a pipeline, five customers or five payments.' },
  { label: 'What evidence contradicts the current assumption?', value: 'Supplied fictional request: “Our accounting app is different and two people must approve every quote.” That would add unscoped integration and approval work. It challenges the shared-setup estimate; it is not an actual interview quotation.' },
  { label: 'What growth is intended, and what constrains it?', value: 'The imagined contractor hopes to serve more firms with one product. Current custom delivery is the constraint. Keep describing this as a service offer exploring a product hypothesis, not a proven scalable business.' },
  { label: 'What remains unknown and what test comes next?', value: 'Pause the product claim. Next, compare two synthetic quote examples with different approval rules, logging common and separate work. Do not use client records or connect accounts. Then seek permission for discovery conversations. Neither test has run; no build, outreach or purchase is authorised by this worksheet.' },
] as const

export type SetupScenario = { clients: number; bespokeHoursPerClient: number; commonHours: number; sharedHoursPerClient: number }
export function compareSetupHours(input: SetupScenario) {
  const { clients, bespokeHoursPerClient, commonHours, sharedHoursPerClient } = input
  if (!Number.isSafeInteger(clients) || clients <= 0) throw new Error('Client count must be a positive safe integer')
  if (![bespokeHoursPerClient, commonHours, sharedHoursPerClient].every(n => typeof n === 'number' && Number.isFinite(n) && n >= 0)) throw new Error('All hour estimates must be finite and non-negative; unknown is not zero')
  const bespoke = clients * bespokeHoursPerClient
  const shared = commonHours + clients * sharedHoursPerClient
  if (![bespoke, shared].every(Number.isFinite)) throw new Error('Hour totals overflow')
  return { bespoke, shared, difference: bespoke - shared }
}
export const STARTUP_SETUP_SCENARIOS = [
  { label: 'Five assumed setups', clients: 5, bespokeHoursPerClient: 20, commonHours: 40, sharedHoursPerClient: 4 },
  { label: 'Only one setup', clients: 1, bespokeHoursPerClient: 20, commonHours: 40, sharedHoursPerClient: 4 },
  { label: 'More custom work', clients: 5, bespokeHoursPerClient: 20, commonHours: 80, sharedHoursPerClient: 8 },
] as const
