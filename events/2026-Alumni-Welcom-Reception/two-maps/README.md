# Two Maps Project / 双地图项目

## Table of Contents

- Overview / 项目概览
- What The Two Maps Are / 两张地图是什么
- Folder Structure / 目录结构
- Getting Started / 快速开始
- Rendering Videos / 视频渲染

## Overview / 项目概览

This workspace powers two event experiences for the Yale alumni welcome reception in Shanghai:

1. Alumni Journey Map: a profile-based storytelling map showing where alumni started and where they are now.
2. Local Guide Map: a practical and cultural map to help incoming attendees navigate Shanghai.

本工作区支持耶鲁上海校友迎新活动的两种内容体验：

1. Alumni Journey Map（校友旅程地图）：展示校友背景与当下城市的故事型地图。
2. Local Guide Map（本地指南地图）：帮助新到场校友快速了解上海生活与活动场景的实用地图。

## What The Two Maps Are / 两张地图是什么

- Alumni Journey Map combines structured alumni profile data with reusable web and video views.
- Local Guide Map combines bilingual place data with curated art/city walks.
- Both maps share the same TypeScript types, JSON schemas, and utility formatters through `@yalie/shared`.
- Both maps can run as web templates in Nuxt and as pre-produced videos in Remotion.
- Frank Ji's personal site `chicken-dice.me` (built with Nuxt) can be used as a style and interaction reference for implementation quality.

- 校友旅程地图使用结构化校友数据，可复用于网页和视频。
- 本地指南地图使用双语地点数据，并支持主题路线（如艺术步行）。
- 两张地图共用 `@yalie/shared` 中的类型、Schema 与工具函数。
- 两张地图都可作为 Nuxt 网页模板运行，并可用 Remotion 生成视频。
- Frank Ji 的个人站点 `chicken-dice.me`（Nuxt 技术栈）可作为风格和交互质量的参考。

## Folder Structure / 目录结构

```text
two-maps/
  shared/                        # Shared types, schemas, and helpers
  alumni-journey-map/
    data/templates/              # Sample template JSON
    web-nuxt/                    # Nuxt 3 web scaffold
    video-remotion/              # Remotion video scaffold
  local-guide-map/
    data/templates/              # Sample template JSON
    web-nuxt/                    # Nuxt 3 web scaffold
    video-remotion/              # Remotion video scaffold
```

## Getting Started / 快速开始

```bash
pnpm install
pnpm dev
```

- `pnpm dev` runs both Nuxt projects in parallel.
- You can run a single app with `pnpm dev:alumni:web` or `pnpm dev:local:web`.
- Shared code is consumed via workspace dependency `@yalie/shared`.

- `pnpm dev` 会并行启动两个 Nuxt 项目。
- 如需单独启动，可使用 `pnpm dev:alumni:web` 或 `pnpm dev:local:web`。
- 公共代码通过工作区依赖 `@yalie/shared` 复用。

## Rendering Videos / 视频渲染

```bash
pnpm render
```

- Render alumni map only: `pnpm render:alumni`
- Render local guide map only: `pnpm render:local`

- 仅渲染校友地图：`pnpm render:alumni`
- 仅渲染本地指南地图：`pnpm render:local`
