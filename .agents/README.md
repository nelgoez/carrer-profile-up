# `.agents/` — agent-consumed project configuration

Tool-agnostic source of truth for the data AI agents need to operate on this repository.

## Files

| File | What it is | Who edits it |
|------|-----------|-------------|
| `project.yaml` | Human-edited project config: project name, repo paths, URLs, MCP server names, default env. ALSO holds the `git_strategy:` block (this repo's git workflow — read by `git-flow-master`). | You (project owner) / `git-flow-master` |

## `git_strategy` (block inside `project.yaml`)

The persisted source of truth for **this repository's** git workflow lives as the `git_strategy:` block inside `.agents/project.yaml`. `git-flow-master` reads it before any branch / commit / push / PR / `gh` operation and adapts every action to the declared strategy.

## Variable syntax conventions

| Syntax | Meaning | Resolves from |
|--------|---------|---------------|
| `{{VAR_NAME}}` | **Project variable** — static, per-repo value. Two flavours: **flat** (top-level section) and **env-scoped** (`{{WEB_URL}}`, `{{API_URL}}`) which resolve to the active environment's value. | `.agents/project.yaml` |
| `{{environments.<env>.<var>}}` | **Explicit env-scoped reference** — bypasses active-env resolution. | `.agents/project.yaml` |
| `<<VAR_NAME>>` | **Session variable** — computed at runtime by the calling prompt. | Prompt's runtime context |

For AI agents: to resolve `{{VAR_NAME}}`, read `.agents/project.yaml`. For env-scoped vars, use the active environment.
