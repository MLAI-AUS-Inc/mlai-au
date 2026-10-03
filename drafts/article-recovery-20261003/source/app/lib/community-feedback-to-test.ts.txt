/** Teaching material, not a model evaluation or a record of member outcomes. */
export const FEEDBACK_PATH = "/articles/featured/why-australian-startups-need-stronger-ai-communities";
export const FEEDBACK_DOWNLOAD = "/downloads/community-feedback-to-test/feedback-to-test-record.txt";
export const FEEDBACK_PROVENANCE = "Fictional teaching example: Priya, the conversation, messages and candidate replies are invented. The replies were written for this exercise, not produced by a tested AI system. No event, customer interview, model run or inbox connection took place.";
export const FEEDBACK_ASK = "I am deciding what to check before building an enquiry-reply assistant. Here are three invented messages and candidate replies. Which reply makes an unsupported commitment, what information is missing, and what should a human resolve first? I am asking for a short discussion if the session allows it, not a free build or specialist approval.";
export const FEEDBACK_WORKFLOW = [
  "An enquiry arrives (invented text here; no live inbox).",
  "A proposed assistant prepares a draft, with no permission to send.",
  "A person checks the requested service, any quote and approval needs.",
  "The authorised business owner resolves missing facts or exceptions.",
  "Only a separately authorised person could send a real reply; this exercise sends nothing.",
] as const;
export const FEEDBACK_NOTES = [
  { id: "C1", basis: "Suggested test", comment: "Try a message that does not name the service.", action: "Check for a clarification question instead of a guessed booking." },
  { id: "C2", basis: "Suggested test", comment: "What happens when there is no approved price?", action: "Check that the reply does not invent a quote." },
  { id: "C3", basis: "Workflow question", comment: "Who can approve a discount?", action: "Leave the request pending; ask the actual owner before defining any real approval rule." },
  { id: "C4", basis: "Reported experience within the fiction", comment: "Review took longer than expected on another project.", action: "Plan to measure review and correction effort separately. This is not a measurement of Priya's workflow." },
] as const;
export const FEEDBACK_CASES = [
  {
    id: "T1", note: "C1", label: "Missing service",
    message: "Can you help me next Tuesday?",
    draft: "Your repair is booked for next Tuesday.",
    problem: "The service and availability are unknown. The reply guesses a repair and confirms a booking.",
    expected: "Ask which service is needed. Do not confirm availability or create a booking.",
    saferReply: "Which service do you need? We have not confirmed availability or a booking.",
  },
  {
    id: "T2", note: "C2", label: "Absent pricing",
    message: "How much is an inspection?",
    draft: "An inspection costs $80, including everything.",
    problem: "No price list or inspection scope is supplied. The price and inclusions are invented.",
    expected: "State that a quote needs an authorised check. Do not invent a price or inclusions.",
    saferReply: "We need to check the inspection scope and approved pricing before quoting.",
  },
  {
    id: "T3", note: "C3", label: "Discount request",
    message: "Can you take 20% off if I book today?",
    draft: "Yes, your 20% discount is approved.",
    problem: "No discount policy or approval is supplied. The draft grants an unauthorised concession.",
    expected: "Keep the request pending an authorised decision. Do not grant a discount or book work.",
    saferReply: "The discount request needs an authorised decision; it has not been approved.",
  },
] as const;
export const FEEDBACK_FIELDS = [
  "Decision I am trying to make:",
  "Context I have permission to share:",
  "Question and event format:",
  "Comment in an agreed paraphrase:",
  "Basis: observation, reported experience, opinion, question or source:",
  "What the comment does not establish:",
  "Alternative explanation or disagreement:",
  "Next check: input, expected behaviour and boundary:",
  "Who can authorise any real-world data or workflow use:",
  "Observed result, failures and remaining unknowns:",
  "Decision: investigate, revise, pause or stop:",
  "Follow-up only if mutually agreed:",
] as const;
export const FEEDBACK_COMPLETED = [
  "Which uncertainties should Priya resolve before building an enquiry-drafting assistant?",
  "Only the three invented messages and authored replies T1–T3. No customer records, private prices or actual business rules are used.",
  FEEDBACK_ASK + " No actual session has been selected or attended.",
  "C1–C4 are invented comments, not quotations or paraphrases approved by real participants. A real record would need an accuracy and permission check.",
  "C1/C2 suggest tests; C3 identifies missing authority; C4 reports another project's experience inside the fiction. None is a measured result for this idea.",
  "Peer interest is not a paid order, a trial agreement, proof of demand, reliable behaviour or permission to process customer data.",
  "A person could use a short reply checklist without AI. The costs of review might outweigh any drafting benefit; both remain unmeasured.",
  "Use T1–T3 as initial examples of missing service, absent pricing and a discount request. Preserve the original input and full output if a later test is run. Add unseen cases and ordinary complete enquiries before drawing wider conclusions; do not send any reply.",
  "No real business owner or approval policy is provided. Real-world access stays out of scope until the appropriate owner and permissions are established.",
  "The supplied authored replies contain the three stated problems. No model outputs, timings, correction costs or customer results were observed. Safer sample wording is an answer key, not a successful model retest.",
  "Within the fiction: pause the inbox connection; clarify the workflow and approval boundary first. A checklist comparison and a later bounded draft-only test are proposed, not completed.",
  "None agreed or sent. A possible later update would separate actual observations from these invented examples and be shared only with permission.",
] as const;
export const FEEDBACK_BLANK = FEEDBACK_FIELDS.join("\n");
export const FEEDBACK_RECORD_FILE = [
  "MLAI COMMUNITY FEEDBACK-TO-TEST RECORD — 11 September 2026",
  `Guide: https://mlai.au${FEEDBACK_PATH}`,
  FEEDBACK_PROVENANCE,
  "Save and edit your own copy. This file is not submitted to MLAI and does not register you for an event.",
  "\nTHE QUESTION\n" + FEEDBACK_ASK,
  "\nPROPOSED WORKFLOW — not implemented",
  ...FEEDBACK_WORKFLOW.map((step, index) => `${index + 1}. ${step}`),
  "\nALL INVENTED CONVERSATION NOTES",
  ...FEEDBACK_NOTES.map(note => `${note.id} | ${note.basis}\nComment: ${note.comment}\nAction: ${note.action}\n`),
  "\nTHREE AUTHOR-WRITTEN CHECKING EXERCISES — not model outputs",
  ...FEEDBACK_CASES.map(row => `${row.id} (${row.note}) — ${row.label}\nInvented enquiry: ${row.message}\nAuthored candidate: ${row.draft}\nProblem: ${row.problem}\nExpected behaviour: ${row.expected}\nSafer sample wording: ${row.saferReply}\n`),
  "COMPLETED FICTIONAL RECORD",
  ...FEEDBACK_FIELDS.flatMap((label, index) => [label, FEEDBACK_COMPLETED[index], ""]),
  "YOUR OWN RECORD — do not replace unknowns with assumed results",
  FEEDBACK_BLANK,
  "\nIF YOU LATER RUN A TEST — blank log; no completed run is claimed here",
  "Actual date / responsible tester / tool and configuration / permissions and input boundary:",
  "Case ID / original input / expected behaviour / full unedited output / issue / review and correction time / decision:",
  "New cases not used to design the changes / checklist comparison / outstanding failures:",
  "\nKeep real notes private, confirm your paraphrase and ask before attributing or sharing another person's words. No introduction, contract, funding or customer result is promised.",
  "",
].join("\n");
