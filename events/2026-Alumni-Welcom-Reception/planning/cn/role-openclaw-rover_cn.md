# OpenClaw 流动排障志愿者岗位计划

## 目录

- [1. 岗位使命与成功结果](#1.%20岗位使命与成功结果)
- [2. 职责范围与边界](#2.%20职责范围与边界)
- [3. 全流程职责矩阵](#3.%20全流程职责矩阵)
- [4. 个人时间线与交付物](#4.%20个人时间线与交付物)
- [5. 协作对象](#5.%20协作对象)
- [6. 升级规则](#6.%20升级规则)
- [7. 异常场景, 2 个案例](#7.%20异常场景,%202%20个案例)
- [8. 当日速查卡](#8.%20当日速查卡)

## 1. 岗位使命与成功结果
使命：我是在 OpenClaw 共创环节中的流动问题解决者，在各组之间移动，及时解除卡点、修复设置问题，并保持协作节奏。
编制：1 名 rover。汇报对象：运营/技术负责人（Ops/Tech Lead）。
成功结果以 `plan_en.md` 第 9 节 degraded-mode 响应职责为准。
- 任一小组在共创阶段卡住不超过 5 分钟。
- 需要切换 degraded mode 时过程平稳、执行清晰。
- 我负责 degraded-mode 一线响应与小组状态回传。

## 2. 职责范围与边界
- 我负责：安装失败排障、Wi-Fi 问题处理、将受阻小组切到 shared-demo 模式、共创前测试全部技术路径、持续流动支援。
- 我不负责：整段时间固定跟一个组、决定 fallback mode、管理节目时间轴。
- 我向 Ops/Tech Lead 升级：同时有 3 组及以上受阻、出现超出我控制的基础设施故障、现场需要额外人手。

## 3. 全流程职责矩阵
| Event Phase | My Mode | What I Do |
|---|---|---|
| Setup | Support | 配合 Ops/Tech Lead 完成技术区搭建。 |
| T-60 min | Primary | 从各区域测试 Wi-Fi，确认 install path、demo path、fallback path 全部可用。 |
| Fishbowl T-10 min | Prep | 做最后一次 readiness 检查，确认 fallback demos 已加载。 |
| Transition | Primary | 第一时间处理首个受阻小组，然后继续流动支援。 |
| Co-Creation | Primary | 持续巡回，解除卡点，将受阻小组切到 shared-demo 或 guide-assisted 模式。 |
| Wrap-up | Support | 协助收集输出并完成快速技术收尾。 |
| Teardown | Off-duty | 默认下线，仅在 Ops/Tech Lead 指派时支援。 |

## 4. 个人时间线与交付物
| When | What I Need To Do | Done When |
|---|---|---|
| T-7 days | 完成 OpenClaw 安装与实测。 | 我能基于实操经验处理常见安装故障。 |
| T-5 days | 通过技术岗位 hard gate。 | 若未完成安装和测试，我转为非技术岗位。 |
| T-5 to T-3 days | 与 Ops/Tech Lead 联合演练。 | install path、demo path、fallback path、shared-screen demo setup 全部走通。 |
| T-5 days | 学习 Ops/Tech Lead 的排障清单。 | 我掌握前 5 个高频问题及对应修复动作。 |
| Day-of T-60 min | 测试每个区域 Wi-Fi 并验证所有路径。 | 我向 Ops/Tech Lead 确认技术 readiness。 |
| Fishbowl T-10 min | 完成最终 readiness 检查。 | fallback demos 已加载并可立即启动。 |

## 5. 协作对象
- 固定引导：3 名 static zone 引导员。小组卡住超过 5 分钟时呼叫我，我处理后继续移动。
- 直接负责人：Ops/Tech Lead。由其设定支援模式与 fallback 决策，我持续回报小组状态。
- 备援机制：若 rover 缺席，1 名 fixed guide 转为 mobile，1 名 floater 顶替该 guide 区域，由 Ops/Tech Lead 统一调度。

## 6. 升级规则
- 我自行处理：单组安装失败、Wi-Fi 切换、shared-demo 设置、快速排障。
- 我升级给 Ops/Tech Lead：3 组及以上受阻、我无法修复的基础设施故障、需要建议模式切换。
- Ops/Tech Lead 升级给 Event Lead：需要激活 fallback mode 时，我可按需向 Event Lead 口头汇报技术现状。

## 7. 异常场景, 2 个案例
1) 大范围 Wi-Fi 故障。动作：将受影响小组切到移动热点或 offline prep，并立刻上报 Ops/Tech Lead，因为这可能触发 degraded mode。优先级：即使无网络也要让小组持续推进。
2) OpenClaw 服务不可用。动作：将全部小组切到预加载 fallback demo，通知 Ops/Tech Lead，并配合 Event Lead 的 fallback 决策链路。优先级：持续流动，确保每组都有可执行任务。

## 8. 当日速查卡
- T-60 min：全区测试 Wi-Fi，验证 install、demo、fallback 路径。
- Fishbowl T-10 min：最终 readiness 检查，确认 fallback demos 已加载，进入 mobile 站位。
- Transition：第一时间接手首个受阻小组。
- Co-creation：持续巡回，fix, move, fix, move。单组停留不超过 10 分钟。
- 若 3 组及以上受阻：立刻回报 Ops/Tech Lead，触发 degraded-mode 决策。
- Wrap-up：协助收集输出并完成技术收尾。
