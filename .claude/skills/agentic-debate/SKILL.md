---
name: agentic-debate
description: Multi-agent role-play for structured decisions — dispatches 2-3 AI agents with Tavily/Context7 research, then synthesizes a recommendation with comparison table
---

# Agentic Debate — Multi-Agent Role-Play for Decisions

Triggers: `/agentic-debate`, `debate esto`, `role-play entre agentes`, `put several agents to debate`

## Purpose

Run a structured, research-backed debate between 2-3 AI agents, each defending a different approach to a decision. Each agent researches independently via Tavily/Context7, presents arguments, then converges on a recommendation.

## Workflow

### Phase 1 — Setup

1. Understand the decision scope from the user (1-2 clarifying questions max)
2. Define 2-3 distinct options (A, B, C)
3. Create one agent persona per option:

| Agent | Personality | Focus |
|-------|-------------|-------|
| **A — Pragmático** | Direct, efficient, hates overhead | Speed, simplicity, ROI |
| **B — Arquitecto** | Ambitious, scales-thinking | Correctness, future-proofing |
| **C — Estratega** | Balanced, value/effort optimizer | Sweet spot, pragmatism |

### Phase 2 — Research Round

Dispatch one subagent per option in parallel. Each receives:
- The full context (project, stack, options)
- 3-4 research queries specific to their argument
- Instructions to return arguments with sources in ≤350 words

Available research tools:
- **Tavily**: web search for news, blog posts, general information
- **Context7**: library documentation for frameworks, APIs, SDKs

Subagent prompt template (substitute OPTION_LABEL, OPTION_DESC, and QUERIES):

```
Eres el Agente {LABEL} — {PERSONALITY}.
Contexto: {full project context}
Tu postura: DEFENDER la Opción {LABEL} ({short desc}).
Herramientas de investigación disponibles:
  - Tavily (web): noticias, artículos, datos de mercado
  - Context7 (docs): documentación de librerías, frameworks, APIs
Consultas: {QUERIES}
Devolvé argumentario con fuentes en ≤350 palabras.
```

### Phase 3 — Synthesis

After all agents respond, present a comparison table:

| Criterion | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Effort | estimate | estimate | estimate |
| Key data | sourced fact | sourced fact | sourced fact |
| Risk | identified | identified | identified |

Highlight:
- Where all agents agree (common ground)
- Where they differ (key tradeoffs)
- The data points that tip the scale
- Your final recommendation

### Phase 4 — User Decision

Present options and wait for user choice before implementing.

## Rules

- Each agent MUST use at least 2 real research queries (Tavily web + Context7 docs) — no invented data
- Each agent returns sources (URLs) with their claims
- No agent may concede before the synthesis phase
- Final recommendation is YOURS (the orchestrator), not the agents'
- Total rounds: max 2 (research → debate → optional rebuttal → decision)

## Quick reference (this session's example)

Decision: Multilanguage support for portfolio (nelthor.qzz.io)
- Opción A: Solo español en UI, blog en inglés
- Opción B: next-intl completo, todo bilingüe
- Opción C: Híbrido (UI bilingüe, blog EN, CV bilingüe)
- Outcome: Opción C + next-intl
- Documented at: `.context/ADR/ADR-0001-i18n-decision.md`
