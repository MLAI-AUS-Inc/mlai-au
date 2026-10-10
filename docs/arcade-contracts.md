# Arcade roster handoff

The homepage team selector is a directory styled like an arcade character selector. This change establishes contracts for a future game; it adds no game loop or playable fight.

`app/data/team-roster.json` owns all 15 profiles and permanent IDs. `app/data/team-roster.ts` imports the JSON, checks distinct nonempty IDs, and supplies typed selection helpers. JSON IDs are inferred as strings; runtime resolution verifies membership. Never regenerate an ID after a rename, reorder or role change. `resolveTeamMember` resolves untrusted selections to Callum, or the first member of a custom roster. Empty rosters are rejected. Arrow navigation follows current roster order and wraps. `Team` accepts an initial ID and calls `onFighterSelect` for desktop/mobile selections and arrows.

`app/lib/arcade/contracts.ts` separates identity from artwork and combat defaults. The shell captures keyboard/touch actions, including release events, and renders simulation state. The simulation advances rules using elapsed milliseconds. The keyboard map uses KeyboardEvent.code; the future shell must manage held keys and avoid capturing inputs in editable fields. Touch controls should emit the same actions. Rendering, audio, frame scheduling and engine choice remain future work.

## Pilot and artwork

Start with two pilot fighters before expanding unique artwork to the full roster. The pair remains undecided pending team agreement. All 15 current mappings explicitly have placeholder status. The selector downloads the original shared GIF and map directly from Firebase Storage using `getBlob()`, then creates browser object URLs. Paths are configured in `app/data/arcade-artwork.json`; public Firebase project configuration uses the existing `VITE_FIREBASE_*` settings. No download-token URLs or binary files are added. There is no portrait/artwork fallback: loading and failure are explicit. Previously published tokens still require revocation by a Firebase owner; removing the URLs does not invalidate historical copies. The shared character preview is not a combat sprite sheet. Animation mappings are empty; consumers must not assume animation assets exist. Generic combat fallback approval remains pending. Artwork volunteers should supply approved animation mappings keyed by permanent fighter ID. Health, movement and attack numbers are illustrative prototype defaults and require gameplay review.

## Verification

Unit tests exercise unique IDs, default and invalid selection, reorder stability, wraparound and placeholder coverage. Browser review should confirm all 15 members on desktop/mobile, Callum as the initial selection, arrows, profile links and unchanged hackathon destinations. Social-link cleanup and press-kit content extraction are separate tasks.

## Firebase deployment prerequisites

Direct browser SDK downloads require Storage rules allowing anonymous reads of these two intentionally public objects and bucket CORS permitting the website origin. Existing download-token access does not prove either prerequisite is configured. The frontend does not deploy or change Firebase permissions.

Merge these exact-object matches into the existing Storage rules (do not replace unrelated rules):

```text
match /Untitleddesign-ezgif.com-resize.gif {
  allow get: if true;
}
match /1000.jpg {
  allow get: if true;
}
```

These matches belong inside `match /b/{bucket}/o`. They grant no list or write permission. Review existing overlapping rules: an allow in another match still applies. Retain the project's existing maintainer write restrictions and private-file rules.

Configure GET CORS for the actual production website origins, plus the developer origin when testing. CORS is not authorization; Storage rules enforce access. For example, merge the required origins into the bucket CORS configuration:

```json
[{ "origin": ["https://mlai.au", "http://127.0.0.1:3017"], "method": ["GET"], "maxAgeSeconds": 3600 }]
```

Confirm the configured bucket contains the exact paths, test GIF/map rendering on desktop and mobile and inspect requests for absence of download tokens. Then revoke the historical download tokens through Firebase and verify their old token no longer authorizes access (public-read rules may still allow the image to be read without a token). Object URLs are revoked on unmount/path changes. Failure messages deliberately replace artwork rather than displaying substitute assets.

Reference: https://firebase.google.com/docs/storage/web/download-files#download_data_directly_from_the_sdk
