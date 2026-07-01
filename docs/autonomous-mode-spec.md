# Autonomous Mode — AI-Native Checkpoint Governance for Agentic Dev

> **Target audience**: AI agents (Claude Code, OpenCode) reading this document to understand, evaluate, and replicate the feature.
> **Context**: Agentic dev workflow skills (sprint-development, project-foundation, design-system, project-bootstrap, product-management, unit-testing, testability-guide) using OpenCode + Claude Code.

---

## 1. Problem

Agentic dev workflow skills run 30+ minutes through multiple phases. Each phase fires human checkpoints: "review this plan", "approve this architecture", "confirm this PR", etc. For experienced developers who trust the AI's judgment, these checkpoints create unnecessary friction — the human babysits an otherwise autonomous pipeline.

**The problem is not "make everything automatic"** — it's "let me pre-approve the safe decisions and only interrupt me for the dangerous ones."

---

## 2. Solution: Three-tier gate bypass

Autonomous mode introduces a slider with three levels. Each level controls **when** the orchestrator blocks and asks for human input.

| Mode | Behavior |
|------|----------|
| `off` (default) | All checkpoints fire. Every WAIT blocks. Standard operation. |
| `semi` | User approves scope/pick/plan upfront via permission manifest. Per-phase WAIT points still fire. |
| `full` | Only HARD gates surface. Everything else auto-resolves. |

Set via `/autonomous full|semi|off` in conversation, or via config key in settings.

---

## 3. Gate classification

Every workflow checkpoint is classified into four types. The classification is stored in a single-source-of-truth table (`autonomous-gates.md`).

| Gate type | Meaning | `off` | `semi` | `full` |
|-----------|---------|-------|--------|--------|
| **HARD** | Never auto-approve. Always surface to user. | Block | Block | Block |
| **Block** | Normal checkpoint. User must approve. | Block | Block | Auto |
| **Ask** | Prompt user regardless. | Ask | Ask | Auto |
| **Auto** | Proceed silently, log decision. | Auto | Auto | Auto |

### HARD gates (non-negotiable, fire in ALL modes)

| Gate ID | Condition |
|---------|-----------|
| G-CC-01 | T4 skill load (high-risk external tool access) |
| G-CC-02 | Subagent TOOL_FAILURE |
| G-CC-03 | Environment dead / unreachable |
| G-CC-04 | Security / auth finding recalibration |
| G-CC-05 | Git push to main / force push |
| G-CC-06 | Credential missing (cannot proceed) |
| G-SD-11 | Staging env dead |
| G-SD-12 | Security / auth finding during implementation |
| G-SD-13 | Production deploy gate |
| G-PM-05 | Jira write confirmation (new issues) |
| G-TG-04 | Credentials artifact publish |

---

## 4. Permission manifest (pre-flight contract)

When `autonomous ≠ off`, **before any skill execution**, the orchestrator MUST:

1. Load the target ticket/scope
2. Load relevant context files
3. Read user preference overrides (if any)
4. Cross-reference every gate the session will hit against the gate table for the current mode
5. Generate a **permission manifest** — a one-page upfront contract
6. Present to the user
7. **WAIT for explicit OK**

Full template at `agentic-dev-core/references/permission-manifest-template.md`.

---

## 5. Safety invariants

1. **Bug/issue creation in Jira NEVER auto-approved.** Always requires human confirmation.
2. **Security findings NEVER downgraded.** If the AI detects a potential security or auth issue, it MUST surface it.
3. **Environment failure is always HARD.** If the target environment is unreachable, the session cannot proceed.
4. **Manifest approval is mandatory.** Even in `full` mode, the initial permission manifest requires explicit human OK.
5. **Production deploy is always HARD.** Cannot auto-deploy to production regardless of mode.
6. **Progress is never lost.** If a HARD gate fires mid-execution, all progress is preserved.

---

## 6. Wiring into this project

| File | Purpose |
|------|---------|
| `AGENTS.md` | `/autonomous full|semi|off` command definition for OpenCode |
| `CLAUDE.md §15` | Autonomous mode behavioral rule |
| `agentic-dev-core/references/autonomous-gates.md` | Gate classification table (single source of truth) |
| `agentic-dev-core/references/permission-manifest-template.md` | Pre-flight manifest template |
| `agentic-dev-core/references/session-management.md` | §§4,8 auto-resume, auto-archive |

Each workflow skill declares in its SKILL.md:
```markdown
Orchestration & Session contracts: this skill follows
agentic-dev-core/references/autonomous-gates.md (gate bypass policy) AND
agentic-dev-core/references/session-management.md (auto-resume, auto-archive).
```

---

## 7. User preference overrides

**OpenCode**: `~/.config/opencode/instructions/autonomous-preferences.md`
**Claude Code**: `~/.claude/CLAUDE.md` (section: "Autonomous mode defaults")

```markdown
## Gate overrides
- G-SD-06 (code review checkpoint): auto_approve
- G-CC-05 (push to main): keep_hard
```

Resolution order: User prefs > Gate table mode column > HARD with `keep_hard` stays HARD.
