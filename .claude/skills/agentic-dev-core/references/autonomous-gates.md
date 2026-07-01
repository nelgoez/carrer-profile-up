# Autonomous Gates — Gate bypass policy per mode

> Cited by: AGENTS.md (autonomous mode), CLAUDE.md §15. This table is the
> single source of truth for which human checkpoints fire or auto-resolve at
> each autonomous level. Every workflow skill checkpoint is listed here.

## Modes

| Level  | Behavior |
|--------|----------|
| `off`  | Default — all checkpoints fire, all WAITs block. Standard operation. |
| `semi` | User approves scope/pick/plan upfront via permission manifest. Per-phase WAIT points still fire. |
| `full` | Only hard failures surface. Everything else auto-resolves per this table. |

## Gate bypass table

Legend: **HARD** = NEVER auto-approved (surface to user regardless of mode).
**Block** = normal WAIT-for-OK behavior. **Auto** = skip, proceed silently.
**Ask** = always prompt (even in semi mode).

### Cross-cutting gates (ALL skills)

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-CC-01 | Pre | T4 skill load (external tool access) | **HARD** | **HARD** | **HARD** |
| G-CC-02 | Any | Subagent TOOL_FAILURE | **HARD** | **HARD** | **HARD** |
| G-CC-03 | Any | Environment dead / unreachable | **HARD** | **HARD** | **HARD** |
| G-CC-04 | Any | Security / auth finding recalibration | **HARD** | **HARD** | **HARD** |
| G-CC-05 | Post | Git push to main / force push | **HARD** | **HARD** | **HARD** |
| G-CC-06 | Pre | Credential missing (cannot proceed) | **HARD** | **HARD** | **HARD** |

### Sprint-Development gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-SD-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-SD-02 | Stage 0 | Story explanation WAIT | Block | Block | Auto-approve |
| G-SD-03 | Stage 0 | Epic precheck WAIT | Block | Block | Auto-approve |
| G-SD-04 | Stage 0 | Impl plan review WAIT | Block | Block | Auto-approve |
| G-SD-05 | Stage 1 | Architecture/design divergence | Block | Block | Auto: log+proceed |
| G-SD-06 | Stage 1 | Implementation checkpoint (code review) | Ask | Ask | Auto-approve |
| G-SD-07 | Stage 2 | Code review findings surface | Block | Block | Auto: log+proceed |
| G-SD-08 | Stage 2 | PR description review | Ask | Ask | Auto-approve |
| G-SD-09 | Stage 3 | Merge confirmation (staging) | Block | Block | Auto-merge if CI green |
| G-SD-10 | Stage 3 | Staging deploy health check | Block | Block | Auto: go if reachable |
| G-SD-11 | Stage 3 | Staging env dead | **HARD** | **HARD** | **HARD** |
| G-SD-12 | Stage 3 | Security / auth finding | **HARD** | **HARD** | **HARD** |
| G-SD-13 | Stage 3 | Production deploy gate | **HARD** | **HARD** | **HARD** |
| G-SD-14 | Stage 3 | Archive confirmation | Ask | Auto | Auto-archive |

### Project-Foundation gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-PF-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-PF-02 | Phase 1 | Constitution review WAIT | Block | Block | Auto-approve |
| G-PF-03 | Phase 2 | PRD review WAIT | Block | Block | Auto-approve |
| G-PF-04 | Phase 3 | Architecture approach selection | Block | Block | Auto: proceed with recommended |
| G-PF-05 | Phase 3 | SRS review WAIT | Block | Block | Auto-approve |
| G-PF-06 | Phase 4 | Domain glossary review | Ask | Ask | Auto-approve |
| G-PF-07 | Phase 4 | Archive confirmation | Ask | Auto | Auto-archive |

### Design-System gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-DS-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-DS-02 | Phase 1 | Path selection (A/B/C/D/E) | Block | Block | Auto: path A if no user input |
| G-DS-03 | Phase 2 | Theme/token review WAIT | Block | Block | Auto-approve |
| G-DS-04 | Phase 2 | Screen mapping approval | Block | Block | Auto-approve |
| G-DS-05 | Phase 3 | Archive confirmation | Ask | Auto | Auto-archive |

### Project-Bootstrap gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-PB-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-PB-02 | Phase 1 | Scaffold plan review | Block | Block | Auto-approve |
| G-PB-03 | Phase 2 | Generated code review checkpoint | Ask | Ask | Auto: log+proceed |
| G-PB-04 | Phase 3 | Migration / schema review (DB) | Block | Block | Auto-approve |
| G-PB-05 | Phase 4 | Env config validation WAIT | Block | Block | Auto: validate then proceed |
| G-PB-06 | Phase 4 | Archive confirmation | Ask | Auto | Auto-archive |

### Product-Management gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-PM-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-PM-02 | Phase 1 | Backlog seed review | Block | Block | Auto-approve |
| G-PM-03 | Phase 2 | Epic structure review | Block | Block | Auto-approve |
| G-PM-04 | Phase 3 | Story/AC draft review | Ask | Ask | Auto-approve |
| G-PM-05 | Phase 4 | Jira write confirmation (new issues) | **HARD** | **HARD** | **HARD** |
| G-PM-06 | Phase 4 | Archive confirmation | Ask | Auto | Auto-archive |

### Unit-Testing gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-UT-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-UT-02 | Plan | Test plan review | Block | Block | Auto-approve |
| G-UT-03 | Red | Red phase — test skeleton review | Ask | Ask | Auto-approve |
| G-UT-04 | Green | Implementation review | Block | Block | Auto: verify compile+pass |
| G-UT-05 | Refactor | Refactor proposal WAIT | Block | Block | Auto-approve |
| G-UT-06 | Verify | Test run result surface | Block | Block | Auto: log+proceed if passing |
| G-UT-07 | Close | Archive confirmation | Ask | Auto | Auto-archive |

### Testability-Guide gates

| Gate ID | Stage | Gate name | `off` | `semi` | `full` |
|---------|-------|-----------|-------|--------|--------|
| G-TG-01 | Phase 0 | Session resume prompt | Ask | Ask | Auto-resume |
| G-TG-02 | Plan | /qa page scope review | Block | Block | Auto-approve |
| G-TG-03 | Generate | Page preview WAIT | Ask | Ask | Auto-approve |
| G-TG-04 | Publish | Credentials artifact publish confirmation | **HARD** | **HARD** | **HARD** |
| G-TG-05 | Close | Archive confirmation | Ask | Auto | Auto-archive |

## User preference overrides

Users can customize gate behavior via config files:

- **OpenCode**: `~/.config/opencode/instructions/autonomous-preferences.md`
- **Claude Code**: `~/.claude/CLAUDE.md` (section: "Autonomous mode defaults" + "Gate overrides")

Override format:
```markdown
## Gate overrides
- G-SD-06 (ATP review): auto_approve  → skip WAIT even in semi mode
- G-CC-05 (push to main): keep_hard   → keep HARD even in full mode
```

Resolution order:
1. User preference file (if present) → decides gate behavior
2. Gate table's mode column → fallback if no user override
3. HARD gates with `keep_hard` → stay HARD regardless of mode

## Runtime gate resolution

At each checkpoint during execution, the orchestrator:
1. Looks up the gate ID in the gate table
2. Reads the mode column → gets the default decision
3. Applies user preference overrides if they exist (user prefs beat table defaults)
4. If **HARD** → STOP, surface to user, save progress to `progress.md`
5. If **Block** in current mode → WAIT for user OK
6. If **Auto** in current mode → proceed silently, log to `progress.md`

Subagents are **unchanged** — autonomous mode only affects the main-thread orchestrator, not dispatching or subagent behavior.

## Session management composition

| Feature | `off` | `semi` | `full` |
|---------|-------|--------|--------|
| Phase 0 resume check | Ask (resume/restart/abort) | Ask | Auto-resume (skip prompt, jump to next phase) |
| Archive on completion | Ask confirmation | Auto-archive | Auto-archive |
| Failed session | Leave in place | Leave in place | Leave in place |

## Safety invariants

1. **Bug/issue creation in Jira NEVER auto-approved** — always requires human confirmation.
2. **Security findings NEVER downgraded** — must always surface.
3. **Environment failure is always HARD** — no auto-retry loop.
4. **Manifest approval is mandatory** — even in `full` mode, the initial permission manifest requires explicit human OK.
5. **Progress is never lost** — if a HARD gate fires mid-execution, all progress up to that point is preserved in `progress.md`.
