# MLAI coding-assistant benchmark

Status: **pre-registered; no comparative runs completed**

Protocol version 1 was frozen on 29 July 2026 before MLAI ran or inspected any
tool results. This directory exists to prevent the replacement article from
turning into another opinion listicle.

The frozen `protocol.v1.json` SHA-256 is
`ea2e692081b5061b361107e260f5f63df8d783cc286953f3bef8250ba9fe1190`.
Any amendment must keep this original file and checksum available.

The public article must remain unpublished and the stale 2025 URL must remain
`noindex` until all release gates in `protocol.v1.json` pass.

## What is fixed before results

- six licence-safe TypeScript tasks covering a bug fix, API error handling,
  behaviour-preserving refactor, test generation, UI state and a multi-file
  agent workflow;
- three independent runs per tool and task;
- a minimum of four and maximum of six coding assistants;
- a binary primary outcome based on hidden acceptance tests;
- deterministic blocked randomisation of tool order;
- identical task workspaces, prompts, permissions, time limits and available
  commands;
- publication of failures, exclusions and missing cost/token fields;
- no universal-winner claim from one aggregate score.

## Current access check

The 29 July 2026 workstation check found:

- Codex CLI `0.146.0-alpha.3.1`;
- Claude Code `2.1.149`;
- no locally available Gemini CLI, Cursor CLI or Aider command;
- GitHub CLI `2.83.2`, without a listed coding-assistant extension.

That is not a four-tool benchmark. It is an execution blocker, not a result.
MLAI must freeze at least four approved, authenticated tools in a completed
copy of `tool-roster.template.json` before generating the randomisation file.
Installing tools, accepting vendor terms or spending paid API credits requires
the project owner’s approval.

## Required artifact order

1. Freeze `protocol.v1.json`.
2. Finish and independently validate the six fixtures and hidden tests.
3. Complete the tool roster, settings, pricing snapshot and privacy/permission
   record.
4. Generate and freeze the randomisation schedule.
5. Run the trials without changing the protocol or hidden tests.
6. Preserve raw records, stdout/stderr, diffs and verifier output.
7. Blind the human reviewer to tool identity and run order.
8. Run the analysis script and publish all included and excluded trials.
9. Obtain named engineering, security/privacy and accessibility review.
10. Publish the date-neutral canonical, then add a one-hop 301 from the stale
    2025 URL.

Any protocol change after trials begin must be recorded as an amendment. The
original result must also be reported unless a pre-registered infrastructure
exclusion applies.
