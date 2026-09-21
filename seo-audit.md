# FIN-ARK SEO 加固完成报告

---

# 第二阶段（2026-09-21）：作者实体 + 系列聚合 + 薄内容治理

> 本轮四项用户决策全部落地并实测：①形象照入站 ②署真名不写公司名 ③四辑聚合页（第三辑「名人启示录」）④36 篇篇间导航。
> 产物：244 页预渲染 / sitemap 241 条 / 审计全绿。

## 1. E-E-A-T 作者实体（全站 203 篇文章生效）

| 项 | 实现 |
|---|---|
| 作者 | 行者（中文）/ Holive（英文），内地多家保险公司十余年销售 + 香港大型保险经纪公司销售顾问 |
| 形象照 | `public/author/holive.jpg`（400×400 JPG，16.7KB，白底居中裁方） |
| 单一来源 | `src/author.ts`：zh/en/es/ar 四语的 name/jobTitle/org/bio/合规披露 + `authorPersonNode()` |
| JSON-LD | Article 的 author 由 Organization → **Person**（含形象照 URL、关于页锚点）；关于页新增独立 Person 块 |
| 可见署名 | 文章页标题下 byline（头像+名+头衔）；文末作者卡（大头像+bio+**合规披露**）；关于页主理人区块 |
| 边界 | **不写具体公司名**（用户明确要求），org 用描述性表述 |

## 2. 「守护者的觉醒」系列聚合页（/zh/guardian、/en/guardian）

- **数据层** `src/data/guardianSeries.ts`：`SERIES_ORDER` 全集顺序（主线 01–30 + 番外 01–06）；四辑：**财富观觉醒 / 离岸与香港 / 名人启示录 / 工具与架构**（全五字，第三辑按用户要求改定名）。重复 id 有构建期护栏。
- **聚合页** `GuardianSeriesPage`：系列导读（定位一句 + 简介 + 36 篇·4 辑·作者统计行）+ 四辑分节卡片网格。
- **结构化数据**：CollectionPage + `hasPart` 36 条（zh/en）；每篇系列文章 Article JSON-LD 加 `isPartOf` 反向关联。
- **篇间导航**：guardian 36 篇文章页底部「上一篇/下一篇」（按全集编号顺序；首篇无 prev、末篇无 next，已实测边界正确）。
- **en 全部同步生效**（36 篇一一对应）。

## 3. 全站复查新发现并已修复：es/ar 空壳聚合页

复查发现 es/ar 各有 3 篇 guardian 文章，但 id 是 `es-guardian-01` 系（系列外独立翻译），聚合页对它们渲染 **0 张卡 = 空壳页**，且与 en 版 title 完全相同（关键词自相残杀）。治理（判定口径统一为「命中系列的篇数」）：

1. **noindex**：es/ar 的 guardian 聚合页输出 `robots: noindex, follow`，不再输出 CollectionPage；
2. **sitemap**：空壳聚合页移出 sitemap（243 → 241 条，与 244 页完全对账：−根路径 −2 noindex）;
3. **hreflang**：zh/en 聚合页的 alternate 不再指向空壳页（zh hub 现在只列 zh/en/x-default）；
4. **可用性兜底**：聚合页新增「更多相关文章」区，系列外的 es/ar 3 篇仍可从站内到达。

## 4. 本轮实测审计（244 页）

| 指标 | 结果 |
|---|---|
| 缺 title / description / canonical | 0 / 0 / 0 |
| noindex 薄内容页 | 2（es/ar guardian hub，符合预期） |
| 重复 title 组数 | **1**（仅根路径↔/zh 设计性归并） |
| JSON-LD 解析失败 / 无 JSON-LD 页 | 0 / 0 |
| 类型分布 | Breadcrumb 239 · Article 203 · Person 4 · CollectionPage 2 · FAQ 4 · Org/WebSite 各 5 |
| 正文空壳 | 0 |
| sitemap 死链 | 0 |

**遗留优化项**（下阶段候选）：①title 中位 64 字符（126 页超 60，中文 SERP 截断风险）；②`dateModified` 目前=发布日期（frontmatter 无 `updated` 字段）；③es/ar 各仅 6 篇薄内容待扩充；④OG 默认图仍为 550×509（建议 1200×630）。

---

# 第一阶段（2026-09-13）：技术层 SEO 加固

> 执行日期：2026-09-13 · 站点：`https://fin-ark.com` · 产物：252 个预渲染页面 / sitemap 251 条 URL
> 你原本提的两个问题中，**技术层已全部完成并实测通过**；「网站架构 + 文章内容」的下一阶段计划见第五节。

---

## 一、结论先行：不需要改造成 Astro

你的站点**不是「纯 SPA」**。构建链（`package.json` 的 build 脚本）里已经有真预渲染：

```
gen-articles → vite build（客户端）→ vite build --ssr → prerender.mjs → gen-sitemap.mjs
                                     ↑ 产出 dist-server/entry-server.js
                                               ↑ 按路由渲染成完整静态 HTML 写入 dist/<lang>/.../index.html
```

**实测证据**：产物 `dist/zh/a/insurance/hk-dividend-sell-property/index.html` 正文 14KB+ 真实 HTML 已在
`<div id="root">` 内，`dist/zh/insurance/index.html` 44KB。爬虫（含 JS 渲染能力弱的 Bing/Baidu）无需执行 JS
即可读到全文。Astro 想给你的「可被爬虫直接读取的静态 HTML」，你早已拥有。

| 维度 | 现状 | 需要 Astro？ |
|---|---|---|
| 可抓取 / 可索引 | ✅ 构建期静态 HTML（SSG） | 否 |
| 结构化数据 / 元信息 | ✅ 本次已补齐 | 否 |
| Core Web Vitals | ⚠️ React 全量 hydrate，JS 偏重 | **仅当 Lighthouse 实测不达标时才值得考虑** |
| 迁移成本 | 需整体重写、有风险 | 不划算 |

**真正的瓶颈不是框架，是站内 SEO 缺陷。** 本次全部在现有架构内修掉，零框架迁移风险。

---

## 二、已完成的改动

### P0 — 全站标题与描述完全重复（最严重）
**问题**：`prerender.mjs` 原先只注入 canonical + hreflang，`<title>` 与 `<meta description>` 全站共用
`index.html` 模板里的同一句 —— 252 个页面标题一模一样，搜索引擎无法区分页面主题、长尾词无法各自排名。
源码里也完全没有任何 title / JSON-LD 管理。

**修复**：
- `src/seo.ts` 新增 `seoMeta()` / `seoHeadNodes()` / `seoHeadTags()` —— 按路由产出唯一 title 与 description。
  标题统一为「页面主题 | FIN-ARK」，主题取自该语言数据层（文章标题 / 板块卡片 / 各页文案）。
- `scripts/prerender.mjs` 先剥离模板的全局 `<title>`/`<meta description>`，再按路由注入。
- `src/App.tsx` 的 `updateSeoHead()` 改为调用同一套逻辑，**客户端路由切换后 head 与静态 HTML 保持一致**。

> 本次最高 ROI 的改动。**以后要改 SEO 元信息，只需改 `src/seo.ts` 一处。**

### P1 — 结构化数据（JSON-LD），此前全站为零
| Schema | 覆盖 | 作用 |
|---|---|---|
| `Article` | 211 个文章页 | headline / datePublished / dateModified / inLanguage / articleSection / mainEntityOfPage |
| `BreadcrumbList` | 247 页 | 显式告知「首页 → 板块 → 文章」层级 |
| `Organization` + `WebSite` | 首页 | 站点实体与多语言声明 |
| `FAQPage` | 关于页（4 个语言） | 争取 FAQ 折叠式富媒体结果 |

### P1 — Open Graph / Twitter Card
补齐 `og:type / site_name / locale / title / description / url / image` 与 `twitter:*`。
⚠️ 分享图暂用 `/Finark.png`（550×509），**建议后续替换为 1200×630 专用图**。

### 架构修复 A — 根路径 `/` 是空壳
`collectRoutes()` 原本只生成带语言前缀的路由，`/` 落到未预渲染的模板（784 字节、无正文）。
→ 把 `/` 纳入预渲染（按默认语言渲染正文），canonical 指向 `/zh` 以避免与 `/zh` 重复收录。
（这是全站唯一还残留「真 SPA」问题的地方，现已消除。）

### 架构修复 B — `/about`、`/cases` 未预渲染
sitemap 收录了这两个页面却**没有对应静态文件**（8 条死链；线上会回退到根 index.html，被判定为与首页重复）
→ 纳入 `collectRoutes()`。

### 架构修复 C — sitemap 与页面数据源不一致（藏得深、影响面大）
`gen-sitemap.mjs` 原先只解析 `content/<lang>/*.md`，**完全不含手写在 `src/i18n/<lang>Articles.ts` 的文章**——
实测 **41 个已上线页面完全不在 sitemap 中**；且 sitemap 的 hreflang 配对逻辑与页内 hreflang 不一致，
会向搜索引擎发出互相矛盾的信号。
→ `entry-server.tsx` 新增 `collectSitemapEntries()`，sitemap 改为**从 SSR 产物导入，与 prerender 共用同一数据源、
同一配对键**。sitemap 由 211 条 → **251 条**。

### 顺手修掉
BOLT 脚手架残留的 favicon `/vite.svg` → 改为 `/Finark.png`。

---

## 三、构建后实测验证

`scripts/audit-seo.mjs` 扫描全部 252 个产物 HTML 的结果：

| 检查项 | 修复前 | 修复后 |
|---|---|---|
| 缺 `<title>` | — | **0** |
| 缺 meta description | — | **0** |
| 缺 canonical | — | **0** |
| 缺 hreflang | — | **0** |
| 无 JSON-LD 的页面 | 全部 | **0** |
| JSON-LD 语法错误 | — | **0** |
| 正文空壳（爬虫拿不到内容） | 根路径 1 个 | **0** |
| **sitemap 死链** | **8** | **0** |
| **已上线但不在 sitemap** | **41** | **1**（仅根路径，故意排除） |
| 重复 `<title>` | 全站 1 组（252 页雷同） | **3 组**（1 组为根路径↔`/zh` 的设计性归并；2 组是真实重复内容，见第五节） |

构建 5 步全部退出码 0；数据可复跑 `scripts/audit-seo.mjs` 复核。

---

## 四、新增的可复用工具

| 文件 | 用途 |
|---|---|
| `scripts/audit-seo.mjs` | 扫描 `dist/` 全部 HTML：title/description 唯一性、canonical/hreflang、JSON-LD 可解析性、正文是否预渲染、**sitemap 与产物交叉核对（缺漏 / 死链）**。输出 `seo-audit-result.txt` |
| `scripts/build-safe.ps1` | 带超时看门狗的分步构建（本机 esbuild 偶发死锁，见第六节），失败自动清理重试 |

---

## 五、下一阶段计划：网站架构 + 文章内容（等你定方向）

### A. 需要你决策的两组重复文章（关键词自相残杀）
手写 TS 层与 MD 管线层用了**不同的 id**，`mergeArticles` 的「按 id 去重」拦不住，两篇都被发布、
标题完全相同、互相抢同一关键词：

| 手写层（`src/i18n/zhArticles.ts`） | MD 层（`content/zh/*.md`） |
|---|---|
| `hk-dividend-sell-property` | `hk-property-to-insurance` |
| `trust-threshold` | `when-trust-needed` |

标题分别为「为什么高净值家庭抛售国内房产后，第一站都在买香港储蓄险？」与「资产到什么量级，才真正需要家族信托？」。
**处理方式（合并留一篇 / 两篇差异化 / 旧文 301 到新文）涉及删改内容，需你定，我不擅自处置。**

### B. E-E-A-T（金融属 YMYL，Google 审核最严）
目前 `Article` schema 的 author 是 Organization，缺：真实作者实体与署名页、可见的「最后更新」日期、
引用来源、合规免责披露。金融/离岸/保险内容的 E-E-A-T 权重远高于普通内容，**这是下一步最高价值项**。
需要你定：作者身份如何呈现（真名 / 笔名 / 机构）。

### C. 「守护者的觉醒」系列缺聚合页（30 篇 + 番外 6 篇，占中文内容近半）
- 无系列 hub 页串联 36 篇，也没有篇间 prev/next 内链 → 主题权威性（Topical Authority）无法聚合。
- 标题带 `01`–`30`、`番外01` 等序号前缀，SERP 观感与检索价值偏弱。
- 内容混着两类：**搜索意图型**（如「香港保险理赔快吗？」「CRS 时代…税务申报义务」——有真实搜索需求）
  与**专栏观点型**（守护者系列多为抽象标题，几乎无搜索量）。建议按「搜索需求 × 内容类型」重新分层。

### D. 其余架构优化
- 页面**没有 HTML 面包屑导航**（当前只有 BreadcrumbList 结构化数据，用户看不见）。
- `title` 中位 63 字符偏长、129 页超 60，中文极易在 SERP 被截断 → 品牌后缀 `| FIN-ARK` 可改为**仅在不超长时附加**。
- 未知路径目前回退到根 index.html（展示 zh 首页内容），建议加真正的 404 页。
- 内链目前只在「同板块相关文章」内，缺跨板块上下文内链（如黄金文章 → 港险文章）。

---

## 六、本机环境注意事项（本次已影响构建）

1. **esbuild 服务间歇性死锁**：`vite build` 偶发卡在 `N modules transformed` 后无限挂起（CPU 秒数停止增长；
   本次会话发生 2 次，重试即通过）。已用 `scripts/build-safe.ps1` 固化「超时看门狗 + 自动重试」。
   判定方法：间隔 20 秒采样 `Get-Process node,esbuild` 的 CPU 秒数，不增长即死锁。
2. 清理卡死进程时**必须排除 WorkBuddy 自己的 MCP 子进程**（如 sheetagent 的 node），否则会连带杀掉宿主工具。
3. `.ps1` 脚本必须纯 ASCII（PowerShell 5.1 按 ANSI 读取，中文会乱码并破坏语法解析）。
4. 本机 Bash 工具不可用，一律走 PowerShell。
