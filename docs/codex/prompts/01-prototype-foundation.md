# PROTOTYPE 01 — FOUNDATION + FIRST JAVA SCENARIO

Continue from the starter repository.

Do not rebuild the project from scratch unless something is genuinely broken.

## Read first

- `AGENTS.md`
- `VISION.md`
- `DECISIONS.md`
- `docs/codex/STATUS.md`
- `docs/design/DIRECTION-ARTISTIQUE.md`
- `docs/scenarios/SCENARIO-001-JAVA.md`

Also inspect the two design references under `docs/design/references/`.

## Objective

Deliver a polished first playable prototype of the new product direction.

The user must be able to:

1. open the app;
2. understand the current sprint;
3. read US-2841;
4. see the virtual team;
5. understand that coding happens in a real IDE;
6. open/find the local Java training project;
7. run Maven/JUnit outside the app;
8. fix the Java bug;
9. paste a `git diff`;
10. confirm local tests passed;
11. submit the diff;
12. receive concise team review feedback;
13. iterate after a rejected review;
14. reach a validated ticket state.

## Language policy

Player-facing interface: French.

Keep normal software identifiers in English:
- Java classes;
- methods;
- variables;
- packages;
- source filenames;
- test names;
- commands;
- framework names.

Use natural French developer vocabulary:
- code review;
- PR;
- commit;
- diff;
- backend;
- frontend;
- build.

Do not add a language selector.
Do not add a full i18n framework yet.

## Visual direction

The latest minimal reference is the source of truth.

Key rule:

LESS IS MORE.

The ticket is the central visual object.

Keep:
- bright surfaces;
- navy text;
- teal accent;
- generous whitespace;
- soft borders;
- restrained shadows;
- compact team rail.

Remove anything that feels like an analytics dashboard.

Do not add:
- graphs;
- KPI cards;
- activity feeds;
- permanent QA dashboard;
- decorative metrics.

## Characters

The six team members are already defined.

Keep their roles and viewpoints consistent.

The generated catalogue is a visual reference only.

Do not crop low-quality portraits out of the reference image and ship them as final assets.

For this prototype:
- clean placeholders are acceptable;
- asset paths must remain easy to replace later.

## Review behavior

Keep review deterministic and local.

Do not use an LLM/API.

The prototype must be honest:
it cannot prove the Java code compiles from a pasted diff.

It can evaluate visible evidence and the player's declaration that local tests passed.

Feedback should feel human and concise.

Examples:

Marc:
"Je ne vois pas de test de régression pour le cas négatif."

Nora:
"Le bug concerne les températures négatives. Montre-moi ce cas dans les tests."

Claire:
"Le besoin reste bien ciblé."

Avoid generic corporate prose.

## Training project

Keep the project small.

Do not introduce Spring, databases or Angular in Scenario 001.

The initial test suite must demonstrate the defect.

Code identifiers remain English.

The expected solution must be small enough for a beginner but not be displayed directly in the application.

## Product state

Persist only useful lightweight prototype state.

It must be easy to reset the scenario.

Do not add accounts, login or cloud saves.

## Tests

Add/fix tests for:

- rendering the French ticket;
- review rejection with empty diff;
- review rejection without regression test;
- review rejection when local tests are not confirmed;
- review approval for a focused valid-looking diff;
- ticket status progression;
- reset behavior where practical.

## Accessibility

Basic keyboard use and semantic controls must work.

Maintain readable contrast.

Do not make character color the only carrier of meaning.

## Acceptance criteria

- Angular 21 app starts locally
- lint passes
- tests pass
- production build passes
- UI matches the minimal approved direction
- no faux IDE
- no Tauri
- no backend
- no AI dependency
- Scenario 001 is understandable without developer explanation
- Java project opens independently in a normal IDE
- `mvn test` initially reproduces the defect
- paste/review loop works
- feedback comes from consistent team personalities
- accepted/rejected state is clear
- reset is possible
- documentation reflects what was actually implemented

## Final report

At the end report:

### Implemented
### UX
### Scenario 001
### Review rules
### Tests
### Build
### Known limitations
### Manual playtest checklist
### Recommendation

Then update `docs/codex/STATUS.md` and STOP.

Do not start a second scenario automatically.
