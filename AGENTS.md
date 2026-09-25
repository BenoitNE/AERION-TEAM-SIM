# AERION TEAM SIM — Agent Instructions

This repository is a small product experiment.

Before changing code, read:

1. `VISION.md`
2. `DECISIONS.md`
3. `docs/codex/STATUS.md`
4. the explicitly requested prompt

## Primary rule

Build the smallest coherent product that validates the gameplay loop.

Do not turn this prototype into a platform.

## Product constraints

- French player-facing UI.
- Normal English software identifiers in source code and training projects.
- Angular 21 web application.
- No Tauri.
- No Monaco.
- No embedded IDE.
- No shell execution.
- No backend.
- No database.
- No authentication.
- No AI API.
- No unnecessary dashboard widgets.
- No premature i18n framework.
- No microservices.
- No speculative abstractions.

## UX

Less is more.

The ticket is the visual focus.

Characters add warmth and context but must not turn the screen into a dense dashboard.

## Engineering

Keep strict TypeScript.

Prefer:
- standalone Angular components;
- signals for local product state;
- typed authored content;
- pure functions for deterministic review rules;
- behavior-focused tests.

## Workflow

Work on one prompt only.

At the end:

- run tests;
- run lint;
- run build;
- update `docs/codex/STATUS.md`;
- summarize actual validation;
- stop.

Never begin the next phase automatically.
