---
name: agentic-debate
description: Multi-agent role-play for structured decisions — dispatches 2-3+ AI agents with Tavily/Context7 research, then synthesizes a recommendation with comparison table
---

# Agentic Debate — Multi-Agent Role-Play for Decisions

Triggers: `/agentic-debate`, `debate esto`, `put several agents to debate`, `research-backed decision`, `compare approaches`, `multi-agent debate`

## Purpose

Run a structured, research-backed debate between 2 or more AI agents, each defending a different approach to a decision. Choose between **binary mode** (2 agents, quick decisions) or **multi-agent mode** (3+ agents, complex/unclear choices needing more perspectives). Each agent researches independently via Tavily/Context7, presents arguments, optionally rebuts, then converges on a recommendation.

## Mode Selection

Ask the user which mode they want. If unclear, suggest based on decision complexity:

| Mode | Agents | Best for |
|------|--------|----------|
| **Binary** (default) | 2 (Pragmatic + Architect) | Clear yes/no, two-option choices, fast resolution |
| **Multi-agent** | 3+ (Pragmatic + Architect + Strategist + optional extras) | Complex tradeoffs, unclear path, high-risk decisions needing diverse perspectives |

## Workflow

### Phase 0 — Scope

1. Understand decision scope from user. Ask 1-2 clarifying questions max.
2. Define options (A, B, C...) based on chosen mode.
3. Confirm mode with user if not specified.

### Phase 1 — Persona Setup

Create one agent persona per option.

**Binary mode (2 agents):**

| Agent | Personality | Focus |
|-------|-------------|-------|
| **A — Pragmatic** | Direct, efficient, hates overhead | Speed, simplicity, ROI |
| **B — Architect** | Ambitious, scales-thinking | Correctness, future-proofing, maintainability |

**Multi-agent mode (3+ agents):**

| Agent | Personality | Focus |
|-------|-------------|-------|
| **A — Pragmatic** | Direct, efficient, hates overhead | Speed, simplicity, ROI |
| **B — Architect** | Ambitious, scales-thinking | Correctness, future-proofing, maintainability |
| **C — Strategist** | Balanced, value/effort optimizer | Sweet spot, risk-adjusted pragmatism |
| **D, E...** (optional) | Specialist per domain need | Niche expertise relevant to the decision |

Add extra agents only when the decision has clearly distinct dimensions (e.g., security + UX + cost each deserve a dedicated voice). Default to 3 for multi-agent; 4+ on explicit user request.

### Phase 2 — Research Round

Dispatch one subagent per option in parallel. Each receives:
- The full context (project, stack, options)
- 3-4 research queries tailored to their argument
- Instructions to return arguments with sources in ≤350 words

Available research tools:
- **Tavily**: web search for news, blog posts, real-world data, community discussions
- **Context7**: library documentation for frameworks, APIs, SDKs, CLI tools

**Fallback**: If Tavily returns no useful results, use built-in WebFetch on specific known URLs. If Context7 is unavailable, use Tavily for doc searches with site-restricted queries (e.g., `site:nextjs.org`).

Subagent prompt template:

```
You are Agent {LABEL} — {PERSONALITY}.
Context: {full project context}
Your stance: DEFEND Option {LABEL} ({short description}).

Research tools available:
  - Tavily (web search): news, articles, market data, community posts
  - Context7 (docs): library/framework/API/SDK documentation

Queries to research:
{QUERIES}

Return your argument with specific references and sources in ≤350 words.
Include URLs where possible.
```

### Phase 2.5 — Rebuttal Round (optional)

If Phase 2 reveals strong conflicts or obvious weaknesses, run one rebuttal round:
- Each agent receives the other agents' arguments
- Each addresses the strongest counter-argument to their position
- Each may concede specific points while holding their recommendation

Skip this phase if agents broadly agree or user wants fast resolution.

### Phase 3 — Synthesis

After all agents respond, present a structured comparison. Use this format:

```
## Decision: {title}

### Comparison

| Criterion | Option A ({label}) | Option B ({label}) | Option C ({label}) |
|-----------|-------------------|-------------------|-------------------|
| Effort | {estimate} | {estimate} | {estimate} |
| Timeline | {estimate} | {estimate} | {estimate} |
| Risk | {level}: {detail} | {level}: {detail} | {level}: {detail} |
| Key evidence | {sourced fact} | {sourced fact} | {sourced fact} |
| Maintenance | {assessment} | {assessment} | {assessment} |
| Scalability | {assessment} | {assessment} | {assessment} |

### Common Ground
Points where ALL agents agree:

### Key Tradeoffs
Where they differ and why it matters:

### Recommendation
Your (orchestrator's) final pick and rationale:
```

### Phase 4 — User Decision

Present findings. Wait for user choice before implementing.

## Rules

- Each agent MUST use at least 2 real research queries (Tavily + Context7) — no invented data
- Each agent MUST return sources (URLs) with their claims
- No agent may concede before the synthesis phase (Phase 3)
- In rebuttal round, agents address counter-arguments but maintain stance until Phase 3
- Final recommendation is YOURS (the orchestrator), not the agents' — you weigh tradeoffs
- Total rounds: max 3 (research → rebuttal → decision). Skip rebuttal if agents converge
- If a research tool fails (API error, timeout), note it explicitly — do not fabricate results
- Document outcome as an ADR in `.context/ADR/` if the decision is architectural

## Example

Decision: Multilanguage support for portfolio (nelthor.com.ar)
- Mode: Multi-agent (3 agents)
- Opción A: Solo español en UI, blog en inglés
- Opción B: next-intl completo, todo bilingüe
- Opción C: Híbrido (UI bilingüe, blog EN, CV bilingüe)
- Outcome: Opción C + next-intl
- Documented at: `.context/ADR/ADR-0001-i18n-decision.md`

## References

Templates and examples for subagent prompts can be added to a `references/` directory co-located with this SKILL.md.
