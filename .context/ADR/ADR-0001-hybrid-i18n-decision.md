# ADR-0001: Hybrid i18n for Portfolio

**Date:** 2026-07-01
**Status:** Accepted

## Context

Portfolio nelthor.com.ar needed Spanish language support for local recruiters while keeping technical blog content in English for global reach.

## Decision

Adopt **Hybrid approach**:
- UI translated via JSON message files + React context (next-intl not needed)
- Language switcher in nav (EN/ES toggle, stored in localStorage)
- Blog stays in English (technical content, global audience)
- CV bilingual: `/cv` (EN), `/cv/es` (ES)
- No URL prefix restructuring — all existing URLs preserved

## Rationale

Researched via multi-agent debate (Tavily-sourced data):
- 76% prefer content in native language (CSA Research)
- Recruiters decide in ~6 seconds (UXFolio 2026) — UI in Spanish removes friction
- Blog in English has 3× reach vs Spanish for technical content
- next-intl routing adds complexity for static export without proportional benefit for 2 locales

## Status

- Messages: en.json + es.json ✅
- Language switcher in nav ✅
- All UI components translated ✅
- CV Spanish route (basic) ✅
- Blog: English only (per decision)
