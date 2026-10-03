/** Authored teaching fiction, not a participant transcript or measured result. */
export const PITCH_PROVENANCE = 'Fictional teaching example—not a real MLAI project or participant result. All dialogue, observations and permissions in this exercise are invented.';
export const PITCH_REVIEW_STATUS = 'AI-assisted editorial exercise; independent source, accessibility and founder review pending. Retest not run.';
export const PITCH_BEFORE = 'Our revolutionary AI platform eliminates event admin and guarantees a better experience. Sign up now before you miss out.';
export const PITCH_DRAFT = 'I’m exploring a draft assistant for volunteer event organisers. In this fictional scenario, an organiser described repeatedly answering questions about arrival instructions. The idea would draft replies using approved event notes, with the organiser checking every reply before sending. It is only a sketch; I have not tested whether it saves time. If you organise events, how do you handle changes to arrival instructions today?';
export const PITCH_REVISION = 'The proposed assistant would prepare a reply inside a review screen. It would not send messages or update the event page. The organiser would check each draft against the latest approved notes and decide whether to copy it into their existing messaging tool. This is a proposed boundary, not a feature we have built or tested.';
export const PITCH_STEPS = [
  { id: 'P1', action: 'Share the draft with a willing peer', material: 'Fictional peer: “I can read one draft and tell you what I think it does. Please do not record me or contact me afterwards.” The writer shares the draft above, not a working demo.', boundary: 'Permission covers this one written exchange only. No recording, mailing-list signup or follow-up.' },
  { id: 'P2', action: 'Read the retelling before explaining', material: 'Fictional peer: “It answers attendees automatically after the organiser approves the event notes. I have not organised an event, so I cannot tell you whether this solves a real problem.”', boundary: 'A specific misunderstanding of sending authority; no evidence of customer demand or workflow effectiveness.' },
  { id: 'P3', action: 'Revise internally; leave the retest open', material: PITCH_REVISION, boundary: 'Retest not run. Do not send another version to this peer. A future rehearsal requires a different willing listener or fresh explicit permission; the revised wording is not proven clearer.' },
] as const;
export const PITCH_FIELDS = [
  { label: 'Intended user and task', value: 'Volunteer event organiser preparing answers to arrival-information questions.' },
  { label: 'Observation versus assumption', value: 'The organiser report is invented. Actual question frequency, time cost and priority remain unknown; no customer interview occurred.' },
  { label: 'What exists and what is proposed', value: 'A written sketch only. Review-screen drafting, approved-note retrieval and no-send controls are proposed, not implemented or tested.' },
  { label: 'One question for this conversation', value: 'What do you think the assistant would do, and who would send the reply?' },
  { label: 'Permission and setting', value: 'P1: one written peer exchange; no recording and no subsequent contact. This fictional permission is not permission to contact a real person.' },
  { label: 'Listener understanding before clarification', value: 'P2: the peer assumed automatic sending after approval of the notes, rather than review of each individual reply.' },
  { label: 'Relevant experience or lack of it', value: 'P2: the peer has not organised events. Their retelling tests wording, not whether organisers need or would buy the idea.' },
  { label: 'Objection or contradictory information', value: 'The claimed review boundary was misunderstood. No evidence yet establishes that drafting is preferable to clearer event information or an existing reply template.' },
  { label: 'Next change, owner and investigation', value: 'P3: writer replaces the proposed-change sentence with the explicit no-send wording. Retest not run; no measured clarity improvement, saved time or demand claim.' },
  { label: 'Follow-up permission and note handling', value: 'No follow-up permitted for P1–P3. For real notes, agree use and storage, minimise identifiers and do not publish quotes or upload them to AI tools without appropriate permission.' },
] as const;
export const PITCH_RUBRIC = [
  { criterion: 'Specific user and task', before: 'Broad event administration; no clear task.', draft: 'Volunteer organisers answering arrival questions.', after: 'Same scope; no extra industry-wide claim.' },
  { criterion: 'Evidence and status', before: 'Guaranteed benefit without evidence.', draft: 'Fictional observation; sketch; savings untested.', after: 'Proposed controls explicitly remain unbuilt and untested.' },
  { criterion: 'Human action boundary', before: 'Unclear who does what.', draft: 'Per-reply review stated, but P2 reads it as automatic sending.', after: 'No sending or page updates; organiser decides whether to copy. Retest not run.' },
  { criterion: 'Learning request and permission', before: 'Urgent signup without a learning question.', draft: 'Asks about current practice; P1 limits this exercise to clarity.', after: 'No further contact with this peer; no customer or endorsement inferred.' },
] as const;
export const PITCH_DECK_EXAMPLE = [
  { slide: '1. Introduction', example: 'Arrival Draft — a proposed reply-preparation aid for volunteer organisers.' },
  { slide: '2. Problem', example: 'Hypothesis: arrival questions take repeated effort. No real interview or frequency measurement yet.' },
  { slide: '3. Solution', example: 'Proposed drafts from approved notes; organiser checks and copies each reply. No automatic sending.' },
  { slide: '4. Demonstration / technical detail', example: 'Text sketch only. No working retrieval, permission controls or accuracy test to demonstrate.' },
  { slide: '5. Team', example: 'No real team is claimed in this teaching example. Replace with your actual role and relevant experience; leave unsupported affiliations out.' },
  { slide: '6. Evidence or next work', example: 'One fictional peer misunderstood the wording; a sentence was revised. No customers, traction graph or measured improvement. Next: a permission-based clarity check.' },
  { slide: '7. Ask', example: 'Would you be willing to read this sketch and explain who sends the reply? No signup, purchase or introduction requested.' },
] as const;
