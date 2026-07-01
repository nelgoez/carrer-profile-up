# `.context/PBI/` — Product Backlog Items

Local-first planning hierarchy for this project. Epics group related work; Stories describe individual features.

> **This tree is LOCAL-ONLY.** No Jira sync. Content is authored directly in markdown files by `/product-management` and consumed by `/sprint-development`.

## Layout

```
.context/PBI/
  epic-tree.md                    master index of all epics
  epics/<EPIC-SLUG>/
    epic.md                        epic definition
    stories/<STORY-SLUG>/
      story.md                     story definition + acceptance criteria
      implementation-plan.md       implementation plan (written by /sprint-development)
      context.md  progress.md      dev-authored state
      evidence/                    screenshots, logs, artifacts
```

## Ownership

- **Epics and Stories** are created by `/product-management` (or manually).
- **implementation-plan.md** is written by `/sprint-development` Stage 0.
- **context.md**, **progress.md**, **evidence/** are dev-authored locally.
- No external sync — git is the source of truth.

## Cross-session resumability

`/sprint-development` rehydrates from `.session/sprint-development/<scope>/progress.md` (Phase 0 resume check, per `agentic-dev-core/references/session-management.md`).
