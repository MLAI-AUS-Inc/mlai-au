# Article publishing and verification

An article should answer a specific reader question with checkable evidence and
usable content. Automated checks protect delivery and known integrity rules;
they do not establish factual accuracy, independent review or reader success.

## Before changing an article

Record the canonical URL, reader task, current source revision, material claims
and supporting sources. Preserve existing publication dates. Give related pages
distinct purposes before considering a merge; a similar keyword is insufficient
evidence for a redirect or withdrawal.

Keep working claim ledgers, review notes, captures and release records in ignored
`.local/`. Do not commit scratchpads or dated audit output. Commit maintained
article content, resources, shared components and tests.

## Editorial checks

- Answer the promised question early, using an example or practical explanation
  that fits the task. Do not add a download, FAQ or widget merely to fill a template.
- Verify consequential and time-sensitive claims against suitable sources.
  Record geography, dates, units, methods and limitations where relevant.
- Label fictional examples as fictional. Never present them as measured customer,
  hiring, investment, educational or clinical outcomes.
- Credit actual contributors and reviewers accurately. A contributor record does
  not establish that an independent review occurred.
- Open and use any promised resource. Confirm its task, format, contents and
  anonymous availability. A working URL or nonempty PDF is not sufficient.
- Have an appropriate independent reviewer check the claims and reader task.
  For reader pilots, retain real observations and exact counts; automated browser
  journeys and AI simulations are not reader research.

A narrow urgent correction can remove a misleading offer, exposed instruction or
specific false claim while deeper review continues. Record its limited scope;
that correction does not accept the entire article. Keep existing review notices
until their outstanding evidence is resolved.

## Local and CI verification

Use the pinned Bun runtime and the frozen lockfile:

```sh
bun install --frozen-lockfile
bun run typecheck
bun run test
bun run build
bunx playwright install chromium
bun run test:articles:browser
```

The unit command scopes discovery to `tests/` so generated build copies are not
counted as additional tests. Executable article labs run through their resource
verification tests in Node. Those checks also compare the ZIP with its individually
served files, preserve the recorded losing forecast, and retain unknown or failed
evidence instead of producing a positive decision.

The build checks known drafting residue and resource placeholders, then verifies
local download files before and after bundling. The browser suite opens every
registered route on desktop, narrow mobile and without JavaScript. It checks
reading access, canonical/indexing identity, keyboard disclosures, hydration
errors, document overflow and actual local download bytes. A delayed-asset case
guards against replacing a disclosure during hydration. It runs with zero retries.

The browser server intentionally uses the local production build and no private
event-feed credentials. CI blocks third-party requests; local browser runs load
the external assets. Verify real event availability, remote resources, image
meaning/rights and appropriate assistive-technology journeys separately. A lab
pass does not establish field performance or complete accessibility conformance.

## Release and follow-up

Release a small, reviewed diff through the normal Cloudflare Workers path. After
deployment, compare the served body, metadata and resource bytes with the reviewed
revision and rerun critical reader journeys. `X-MLAI-Revision` identifies the source
commit supplied by Workers Builds; local builds explicitly report `local`.
`X-MLAI-Document-Render: complete` identifies the complete-document rendering path.
Neither header is an editorial approval or proof that all remote assets are fixed.

Record the previous Worker version before release. On a material regression,
choose a focused correction or restore that version through Cloudflare, then
verify the served result. Consider whether reverting would restore a known false
claim. Do not treat a merged PR as evidence of a successful deployment.

Builds do not submit URLs to search services. `bun run submit:indexnow` is an
explicit operation for after successful production verification; it does not
submit to Google or establish indexing or ranking improvement.

Assign an actual maintenance owner and review dates appropriate to each claim's
volatility. Keep reader outcomes, technical access and search performance separate.
Annotate releases before comparing matched search periods; do not infer a penalty
or recovery from a short change in clicks or average position.

The frontend checks do not close backend/worker publication bypasses. Automatic
publishing requires compatible policy, persisted evidence and accepted-revision
checks throughout generation, repair, retry and promotion. Missing or stale review
must not be interpreted as approval.
