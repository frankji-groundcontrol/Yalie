# 2026 Alumni Welcome Reception

This folder groups the working materials for the Yale Shanghai alumni reception planned for late April 2026.

## Table of Contents

- [Structure](#Structure)
- [Working Notes](#Working%20Notes)
- [Two Maps Project](#Two%20Maps%20Project)

## Structure

- `planning/` contains internal planning and operations documents, split by language.
  - `planning/README.md` — reader guide: which document should I read?
  - `planning/cn/` — all Chinese planning documents (proposal, runbook, and 10 role plans).
    - `volcengine-workshop-brief_cn.md` — 火山引擎现场支持需求说明。
    - `participant-workshop-guide_cn.md` — 参与者现场参考文档。
    - `volunteer-willing-list_cn.md` — volunteer interest form and role selection guide.
  - `planning/en/` — all English planning documents (mirrors `cn/`).
    - `volcengine-workshop-brief_en.md` — Volcano Engine on-site support brief.
    - `participant-workshop-guide_en.md` — participant on-site guide.
    - `volunteer-willing-list_en.md` — volunteer interest form and role selection guide.
- `posts/` contains outward-facing recruitment copy by channel.
  - `post-official_en.md` and `post-official_cn.md` are the longer public posts.
  - `post-wechat_en.md` and `post-wechat_cn.md` are the shorter channel-specific posts.
- `artifacts/` contains rendered or distribution-ready outputs.
  - `耶鲁上海校友活动志愿者执行计划.pdf` is the Chinese PDF artifact.
- `two-maps/` contains the interactive map web apps and video generation projects.
  - `two-maps/README.md` — bilingual project overview and getting started guide.
  - `two-maps/shared/` — shared TypeScript types, JSON schemas, and utilities.
  - `two-maps/alumni-journey-map/` — Alumni Journey Map (Nuxt web + Remotion video).
  - `two-maps/local-guide-map/` — Local Guide Map (Nuxt web + Remotion video).
  - `two-maps/docs/` — implementation plans, skill templates, and OpenClaw facilitation prompts.

## Two Maps Project

The Two Maps are interactive showcase pieces produced for the event and rendered in multiple formats:

1. **Alumni Journey Map** — profile-based storytelling map showing where alumni started, what they studied at Yale, and where they are now. Emphasizes diversity of paths.
2. **Local Guide Map** — bilingual city map for our workshop cities (New Haven, Beijing, Shanghai) with practical/cultural resources and curated routes.

**Tech stack**: Nuxt 3 (Vue 3) for interactive web pages, Remotion (React) for video generation, pnpm workspaces for monorepo, shared TypeScript data contracts.

**Outputs**: static web pages (phones/screens), high-res still images (display/print), Remotion videos (social media / event wrap-up).

See `two-maps/README.md` for full setup and rendering instructions.

## Working Notes

- Keep bilingual pairs aligned when editing one side.
- Prefer updating source Markdown files over editing rendered artifacts.
- Add future planning docs under `planning/` and future channel copy under `posts/`.
- When adding, removing, or moving files in this event folder, update this `README.md` in the same change.
