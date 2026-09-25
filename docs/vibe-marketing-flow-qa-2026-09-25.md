# Vibe Marketing article flow: live QA and fixes

Date: 25 September 2026 (Australia/Melbourne)

## Outcome

The founder flow was exercised end to end in the signed-in browser: discover a topic from a content island, select it, generate a draft, review it, leave comments, request revisions, approve the revised article, and publish it. The resulting [article](https://mlai.au/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task) is live. The founder source and publishing child pages both show the workflow complete.

The production site serves revision `3efc9cd4fb5b107ed8b314145e8604e767edbd18`. The public route, listing, sitemap, canonical URL, companion PDF, and five image alt texts were checked after publication. The Content Factory publishing child completed its finalization step on the approved source; its web service, worker, and build verifier were checked after deployment.

## Issues encountered and fixes

| Area | Observed problem | Implemented behavior |
| --- | --- | --- |
| Draft generation | Formatting, fonts, style rules, and export parity could stop a draft or revision. | Repair safe presentation and export issues in the generation path and retry against the same article context. Preserve checks that protect content and source integrity. |
| Evidence review | Unsupported claims or image descriptions could block the article without showing the author where to edit. | Highlight safely anchored findings in the article inspector. The highlight explains the issue and offers a comment action. Findings that cannot be safely anchored appear as separate reason cards. Section removal uses the existing signed section flow, and the short article rule accommodates a user requested deletion. |
| Hosted preview | Signed revision attributes were misread, and stale or out of order callbacks could attach the wrong preview to a review. | Read static JSX attributes correctly and bind preview callbacks, quality results, and approval to the exact signed attempt. An absent or stale quality receipt keeps approval unavailable. |
| Approval and publishing | A promotion child could be rewound during a slow preflight; later retries lost sealed assets, article identity, or approved exports. | Protect the promotion child from premature watchdog and Resume changes. Restore only checksum bound approved artifacts and preserve the approved image manifest, slug, and registry context through build and finalization. |
| Founder progress | The wizard sometimes displayed inherited checks as current completion, enabled acceptance too early, or asked for publication again after a merged article PR. | Show current stage and next steps from the live run, require the exact review receipt for acceptance, and reflect settled publication and enabled discovery on both child and source pages. |
| Page loads | The first Marketing navigation took about 19–24 seconds. Later warm navigations were about 0.54–0.9 seconds, but final founder reloads varied from roughly 5–17 seconds. | Trim duplicated article payloads from run and summary responses, avoid unchanged status rewrites and callbacks, and refresh a background tab when it becomes visible. Variable reload times remain a separate performance investigation; browser automation wall time does not isolate server time. |
| Other errors | A local AdBlock extension reported `FILE_ERROR_NO_SPACE`. One Founder Tools load error recovered on retry. Content Factory GitHub Actions jobs could not start because of an account billing gate. | Freed safe local caches; the browser extension may still need a manual reload. Focused local tests and a guarded manual Content Factory release were used while the external CI gate remained unavailable. |

The detailed chronological observations were kept locally during the live run. This page records the verified end state and the remaining performance follow-up without publishing temporary run state or local browser details.

## Verification and remaining work

- Site PRs [#1704](https://github.com/MLAI-AUS-Inc/mlai-au/pull/1704), [#1709](https://github.com/MLAI-AUS-Inc/mlai-au/pull/1709), [#1710](https://github.com/MLAI-AUS-Inc/mlai-au/pull/1710), [#1711](https://github.com/MLAI-AUS-Inc/mlai-au/pull/1711), and [#1712](https://github.com/MLAI-AUS-Inc/mlai-au/pull/1712) are merged; the site release and public article were verified after deployment.
- Content Factory [#827](https://github.com/drsamdonegan/content-factory/pull/827) completed the approved artifact and build handoff. Its deployed publishing child reached `completed/finalize`.
- Focused regression suites, type checking, site PR builds, production revision checks, and the final browser flow passed. A single mobile keyboard test failed once on a site main build and passed on rerun.
- Investigate the remaining variable founder page load time with browser navigation timing and server request traces. Restore normal Content Factory CI once the GitHub billing gate is cleared.
