# AGENTS.md — OpenCode Agent Interface

> Slash commands and behavioral registers. Loaded by OpenCode at session start.
> For OpenCode (NOT Claude Code). Autonomous mode documented for both.

---

## Slash commands

| Command | Purpose |
|---------|---------|
| `/autonomous full\|semi\|off` | Set autonomous mode level. `off`=default, all checkpoints fire. `semi`=scope/plan approved upfront via permission manifest; per-phase WAITs still fire. `full`=only HARD gates surface. When `autonomous≠off`: BEFORE any skill execution, generate permission manifest, present, WAIT for OK. Then execute with gate bypass per `agentic-dev-core/references/autonomous-gates.md`. Auto-resume + auto-archive per `agentic-dev-core/references/session-management.md` §§4+8. |

## Behavioral registers

This project supports three behavioral registers that control **when** the AI blocks (autonomous), **how** the AI communicates (caveman/PM Voice/Butler), and **how** the AI reports (PM Voice resolution). They compose independently — any combination is valid.

| Register | File | Controls |
|----------|------|----------|
| Autonomous mode | CLAUDE.md §15, autonomous-gates.md | Checkpoint blocking at skill execution |
| Communication mode | CLAUDE.md §2 | Verbal style (caveman, PM Voice, Butler) |
| Visual mapping | CLAUDE.md §2 | Tables, diagrams vs prose |

## Autonomous mode quick reference

```
/autonomous off    → all checkpoints fire (default)
/autonomous semi   → upfront manifest approval, per-phase WAITs fire
/autonomous full   → only HARD gates surface
```

**When autonomous ≠ off:**
1. Load target scope (ticket, module, sprint)
2. Read user preference overrides (`~/.config/opencode/instructions/autonomous-preferences.md`)
3. Cross-reference every gate the session will hit in `autonomous-gates.md`
4. Generate permission manifest per `permission-manifest-template.md`
5. Present to user → WAIT for OK

**HARD gates NEVER auto-approve:**
- G-CC-01: T4 skill load
- G-CC-02: Subagent TOOL_FAILURE
- G-CC-03: Environment dead/unreachable
- G-CC-04: Security/auth finding recalibration
- G-CC-05: Git push to main / force push
- G-CC-06: Credential missing

**User preference overrides:**
`~/.config/opencode/instructions/autonomous-preferences.md` — loaded at session start. Format:
```markdown
## Gate overrides
- G-SD-06 (ATP review): auto_approve
- G-CC-05 (push to main): keep_hard
```
