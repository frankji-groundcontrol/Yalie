# AGENTS.md

**Generated:** 2026-04-12
**Commit:** c77061e
**Branch:** 2026-04-alumni-welcome-event

## Overview

Obsidian vault for the Yale (Yalie) alumni community in China. Contains event planning, bilingual content operations, and embedded code sub-projects. Licensed MPL 2.0.

## Structure

```
Yalie/
├── events/
│   └── 2026-Alumni-Welcom-Reception/   # Active event (sole working area)
│       ├── AGENTS.md                    # Event-level agent instructions
│       ├── planning/                    # 30 bilingual ops docs (cn/ + en/)
│       ├── posts/                       # Recruitment copy + poster web app
│       ├── artifacts/                   # Rendered outputs (PDF)
│       ├── docs/setup/                  # Admin install guides
│       └── two-maps/                    # pnpm monorepo (Nuxt 3 + Remotion)
├── .obsidian/                           # Vault config (gitignored)
├── .playwright-mcp/                     # Browser automation logs (ephemeral)
├── .sisyphus/                           # Agent plan state
└── LICENSE                              # MPL 2.0
```

## Where to Look

| Task | Location | Notes |
|------|----------|-------|
| Event planning & operations | `events/2026-Alumni-Welcom-Reception/planning/` | 15 cn + 15 en docs |
| Public recruitment posts | `events/2026-Alumni-Welcom-Reception/posts/volunteer/recruitment/` | 4 files (official + wechat, cn + en) |
| Interactive maps & videos | `events/2026-Alumni-Welcom-Reception/two-maps/` | pnpm monorepo, has own AGENTS.md |
| Poster web app | `events/2026-Alumni-Welcom-Reception/posts/posters/long/` | Standalone Next.js 16, has own AGENTS.md |
| Agent instructions | `events/2026-Alumni-Welcom-Reception/AGENTS.md` | Authoritative for this event |

## Anti-Patterns (This Project)

- Do not edit `.obsidian/` files — gitignored vault config
- Do not add tooling files (CI, Docker, linters) at root — this is a content vault
- Do not assume a unified build system — two code sub-projects are independent
- Root-level PNGs (`alumni-3000.png`, etc.) are Obsidian assets, not web assets
- `.playwright-mcp/` is ephemeral agent output — do not document or depend on it

## Commands

None at root level. See child AGENTS.md files for sub-project commands.

## Notes

- Only one event exists (`2026-Alumni-Welcom-Reception`). Future events follow the same `events/<slug>/` pattern.
- The event folder has its own detailed AGENTS.md — always read it before working in that area.
- Bilingual convention: `_cn.md` (Chinese) / `_en.md` (English) suffixes. Always update pairs together.
