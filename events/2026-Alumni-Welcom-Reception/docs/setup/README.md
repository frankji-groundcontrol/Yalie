# Workshop Setup Guide / 工作坊环境搭建指南

This guide walks through setting up the two services needed for the workshop: **OpenClaw Admin** (the AI facilitation backend) and **Two Maps** (the interactive map web app).

本指南介绍工作坊所需两项服务的搭建流程：**OpenClaw Admin**（AI 引导后端）和 **Two Maps**（互动地图 Web 应用）。

## Prerequisites / 前置要求

- Node.js >= 18
- npm >= 9 (for OpenClaw Admin)
- pnpm (for Two Maps)
- A running OpenClaw Gateway instance

---

## Step 1 — OpenClaw Admin / 第一步 — OpenClaw Admin

OpenClaw Admin must be running first. Participants interact with OpenClaw during the workshop, and Two Maps reads data produced through it.

OpenClaw Admin 需要先启动。参与者在工作坊中通过 OpenClaw 进行互动，Two Maps 读取由此产生的数据。

Follow the full install guide:

详细安装步骤见：

> **[OpenClaw-Admin Install Guide / 安装指南](./OpenClaw-Admin-Install-Guide.md)**

Quick summary / 快速摘要:

```bash
cd /root/.openclaw/workspace
git clone https://github.com/itq5/OpenClaw-Admin.git
cd OpenClaw-Admin
npm install
cp .env.example .env
# Set OPENCLAW_AUTH_TOKEN from ~/.openclaw/openclaw.json → gateway.auth.token
npm run dev:all
```

Once running, OpenClaw Admin is available at:

启动后，OpenClaw Admin 可通过以下地址访问：

| Service / 服务 | Port / 端口 | URL |
|---|---|---|
| Frontend / 前端 | 3001 | `http://<server-ip>:3001/` |
| Backend / 后端 | 3000 | `http://<server-ip>:3000/` |

Default login / 默认登录: `admin` / `admin`

---

## Step 2 — Two Maps / 第二步 — Two Maps

Navigate to the Two Maps workspace and install dependencies:

进入 Two Maps 工作区并安装依赖：

```bash
cd events/2026-Alumni-Welcom-Reception/two-maps
pnpm install
```

Start the dev server:

启动开发服务器：

```bash
pnpm dev
```

This starts the combined web app on **port 1701**, accessible from any device on the local network.

这会在 **1701 端口** 启动合并版 Web 应用，局域网内的设备均可访问。

| Service / 服务 | Port / 端口 | URL |
|---|---|---|
| Two Maps Web | 1701 | `http://<server-ip>:1701/` |

No environment variables are needed for Two Maps.

Two Maps 无需配置环境变量。

---

## Port Summary / 端口汇总

| Service / 服务 | Port / 端口 |
|---|---|
| OpenClaw Admin Frontend / 前端 | 3001 |
| OpenClaw Admin Backend / 后端 | 3000 |
| Two Maps Web | 1701 |

All services bind to `0.0.0.0` so they are reachable from participants' devices on the same network.

所有服务均绑定 `0.0.0.0`，以便同一网络下的参与者设备可以访问。
