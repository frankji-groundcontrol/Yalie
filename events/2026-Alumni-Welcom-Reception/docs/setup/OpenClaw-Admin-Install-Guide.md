
# OpenClaw-Admin 安装指南

## 前置要求
- Node.js &gt;= 18.0.0
- npm &gt;= 9.0.0
- 已安装并运行的 OpenClaw Gateway

## 安装步骤

### 1. 获取公网 IP 地址
首先获取你的服务器公网 IP：
```bash
curl -s ifconfig.me
# 或者
curl -s ipinfo.io/ip
```

记录这个 IP 地址，稍后用于访问 OpenClaw-Admin。

### 2. 克隆仓库
```bash
cd /root/.openclaw/workspace
git clone https://github.com/itq5/OpenClaw-Admin.git
cd OpenClaw-Admin
```

### 3. 安装依赖
```bash
npm install
```

### 4. 配置环境变量
```bash
cp .env.example .env
```

### 5. 更新 OpenClaw Gateway Token
从你的 `~/.openclaw/openclaw.json` 文件中找到 `gateway.auth.token` 的值，然后更新 `.env` 文件中的 `OPENCLAW_AUTH_TOKEN`：

```env
OPENCLAW_AUTH_TOKEN=your-gateway-token-here
```

### 6. 确认网络监听配置
OpenClaw-Admin 的前端和后端默认已经配置为监听 `0.0.0.0`（所有网络接口），这样就可以通过公网 IP 访问了：
- 前端（Vite）：在 `vite.config.ts` 中已设置 `server.host: '0.0.0.0'`
- 后端（Express）：默认监听所有接口（`server.listen(PORT)`）

### 7. 启动服务
同时启动前端和后端：
```bash
npm run dev:all
```

或者分别启动：
- 前端：`npm run dev`
- 后端：`npm run dev:server`

## 访问
- 公网访问：`http://<your-public-ip>:3001/`（将 `<your-public-ip>` 替换为第 1 步获取的公网 IP）
- 本地访问：`http://localhost:3001/`

## 默认登录凭据
- 用户名：`admin`
- 密码：`admin`

## 配置说明
- `PORT`：后端服务端口（默认 3000）
- `DEV_PORT`：前端开发服务器端口（默认 3001）
- `OPENCLAW_WS_URL`：OpenClaw Gateway WebSocket 地址
- `AUTH_USERNAME` / `AUTH_PASSWORD`：OpenClaw-Admin 登录凭据

## 防火墙说明
如果无法通过公网 IP 访问，请确保服务器防火墙已开放 3001 端口（前端）和 3000 端口（后端，如需要）。
