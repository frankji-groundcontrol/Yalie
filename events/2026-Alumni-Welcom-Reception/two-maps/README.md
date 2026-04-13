# Two Maps Project / 双地图项目

## Table of Contents

- Overview / 项目概览
- What The Two Maps Are / 两张地图是什么
- Folder Structure / 目录结构
- Getting Started / 快速开始
- Rendering Videos / 视频渲染
- OpenClaw Prompt Pack / OpenClaw 提示词包

## Overview / 项目概览

This workspace powers two event experiences for the Yale alumni welcome reception in Shanghai:

1. Alumni Journey Map: a life-path map showing each person's route from hometown, through Yale (New Haven), to where they are now.
2. Local Guide Map: a city map of practical and cultural places for "our cities" (New Haven, Beijing, Shanghai), built from city templates.

本工作区支持耶鲁上海校友迎新活动的两种内容体验：

1. Alumni Journey Map（校友旅程地图）：以“人生路径”为核心，展示每个人从家乡、到耶鲁（纽黑文）、再到当下城市的路径。
2. Local Guide Map（本地指南地图）：以“城市本身”为核心，沉淀纽黑文、北京、上海三城的在地资源与路线。

## What The Two Maps Are / 两张地图是什么

- Alumni Journey Map is person-centric: each profile contains ordered journey stops (`stops`) with city and year.
- Local Guide Map is place-centric: each location has category, coordinates, and route-level walk data.
- Both maps share the same TypeScript types, JSON schemas, and utility formatters through `@yalie/shared`.
- Both maps can run as web templates in Nuxt and as pre-produced videos in Remotion.
- Frank Ji's personal site `chicken-dice.me` (built with Nuxt) can be used as a style and interaction reference for implementation quality.

- 校友旅程地图使用结构化校友数据，可复用于网页和视频。
- 本地指南地图使用双语地点数据，并支持主题路线（如艺术步行）。
- 两张地图共用 `@yalie/shared` 中的类型、Schema 与工具函数。
- 两张地图都可作为 Nuxt 网页模板运行，并可用 Remotion 生成视频。
- Frank Ji 的个人站点 `chicken-dice.me`（Nuxt 技术栈）可作为风格和交互质量的参考。

Implementation note / 实现备注:
- Current city templates in repo: Shanghai and New Haven (`local-guide-map/data/templates/`).
- Beijing is part of the workshop's target city set and can be added with the same schema.

## Folder Structure / 目录结构

```text
two-maps/
  shared/                        # Shared types, schemas, and helpers
  docs/                          # Plans and facilitation prompt packs
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
- For a production-style run of the merged web app, use `pnpm --filter @yalie/two-maps-web build` and then `pnpm --filter @yalie/two-maps-web start`.
- Do not run `.nuxt/dist/server/server.mjs` directly; that file is an internal Nuxt build artifact, not the public server entry.

- `pnpm dev` 会并行启动两个 Nuxt 项目。
- 如需单独启动，可使用 `pnpm dev:alumni:web` 或 `pnpm dev:local:web`。
- 公共代码通过工作区依赖 `@yalie/shared` 复用。
- 如需以接近生产的方式运行合并版 Web 应用，请先执行 `pnpm --filter @yalie/two-maps-web build`，再执行 `pnpm --filter @yalie/two-maps-web start`。
- 不要直接运行 `.nuxt/dist/server/server.mjs`；它是 Nuxt 内部构建产物，不是对外可用的服务入口。

## Rendering Videos / 视频渲染

```bash
pnpm render
```

- Render alumni map only: `pnpm render:alumni`
- Render local guide map only: `pnpm render:local`

- 仅渲染校友地图：`pnpm render:alumni`
- 仅渲染本地指南地图：`pnpm render:local`

## OpenClaw Prompt Pack / OpenClaw 提示词包

- English: `docs/openclaw-starter-prompts_en.md`
- 中文：`docs/openclaw-starter-prompts_cn.md`
