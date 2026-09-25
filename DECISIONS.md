# Architectural Decisions

## DEC-001 — Angular web app only

Status: Accepted

The prototype is a standard Angular 21 web application.

No Tauri/native shell is used.

Reason: the player's real IDE and toolchain already provide editing, compilation, Git, debugging and terminal capabilities.

## DEC-002 — Real IDE outside the application

Status: Accepted

The simulation never attempts to rebuild IntelliJ/WebStorm/VS Code.

The app supplies context and review. The player edits the provided training project externally.

## DEC-003 — Deterministic local review for prototype

Status: Accepted

Prototype 01 uses deterministic TypeScript review rules over a pasted Git diff.

No AI service is required.

The review is intentionally limited: it evaluates visible evidence in the diff and player declarations, not actual compiled behavior.

## DEC-004 — French UI, English technical identifiers

Status: Accepted

All player-facing product content is French.

Programming identifiers and normal source-code conventions remain English.

## DEC-005 — Authored local content

Status: Accepted

Team members, tickets and review scenarios are local typed data.

No backend/database is introduced for the first experiment.

## DEC-006 — Minimal visual hierarchy

Status: Accepted

The approved visual direction is bright, calm and spacious.

The primary screen contains:
- simple navigation;
- sprint context;
- one dominant ticket;
- one compact team rail.

Avoid dense dashboards.
