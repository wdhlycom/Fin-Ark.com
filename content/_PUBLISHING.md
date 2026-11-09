# 定时发布操作说明

> 记住一句话：**发布日期就是文章文件开头的那一行 `date:`，改它就行，其他什么都不用做。**

## 一、发布日在哪里设置

不是 Word，也不在网站代码里，而是每篇文章自己的 Markdown 文件开头（frontmatter）：

```markdown
---
id: "gold-5-percent"
title: "在信用货币体系松动的 2026，家庭资产为何必须保留 5% 的实物黄金？"
subtitle: "资产地图 · 黄金 · 守住底线"
date: 2027-01-04          ← 这一行就是发布日（香港时间）
section: gold
lang: zh
summary: "当所有纸面资产都在赌未来会更好，黄金赌的是万一更坏，我还在。"
---
```

文件位置：`content/zh/<文件名>.md`（英/西/阿语分别在 `content/en`、`content/es`、`content/ar`）。

## 二、以后写一篇新文章，完整流程

1. 新建 `content/zh/xxx.md`，把 `date:` 写成**你想让它上线的那天**（可以写未来的日子）。
2. 英文版写 `content/en/xxx.md`，`id` 保持一致（多语言靠 id 配对）。
3. `git commit` + `push` 一次，就完事了。

**不需要再上传第二次。** 到了那天，定时任务会自动重新构建，文章自己出现：

- 自动出现在板块列表、首页、主题聚合页
- 自动进 sitemap.xml 和 llms.txt
- 自动生成静态页面（爬虫拿到的就是完整 HTML）
- 没上线的文章不会出现在任何地方，连 URL 都打不开——不会出现"半成品被人看到"

## 三、几个常见操作

| 想干什么 | 怎么做 |
|---|---|
| 提前上线某篇 | 把它的 `date` 改成今天或更早，push |
| 临时撤下某篇 | 把 `date` 改到未来，push（下次构建即消失） |
| 改了已发布的旧文 | 内容照改，另外加一行 `updated: 2026-12-05`（会变成结构化数据里的"最后修改时间"） |
| 立刻补发（不想等定时器） | GitHub 仓库 → Actions → 「定时发布（每日重建）」→ Run workflow |

## 四、时间精度

- 定时任务每天 **香港时间 08:10 左右**跑一次（GitHub 排队可能延迟十几分钟）。
- 所以发布日期写「2027-01-04」，实际上线是那天上午 8 点多，不是零点。
- 发布日用**香港时间**判定（构建机是 UTC，代码里已做 +8 换算）。

## 五、两个前提（配一次，以后不用管）

1. **Vercel Deploy Hook**：Vercel 项目 → Settings → Git → Deploy Hooks，建一个 `main` 分支的 Hook，复制 URL。
2. **GitHub Secret**：仓库 → Settings → Secrets and variables → Actions → New repository secret，名字填 `VERCEL_DEPLOY_HOOK`，值粘贴上面的 URL。

⚠️ GitHub 会在仓库连续 60 天没有任何 commit 后**自动停用定时任务**。长期不写文章时，回站点前先去 Actions 页面点一次 Run workflow。

## 六、原理（一句话）

静态网站的产物在构建那一刻定型，"这篇在不在"是构建时决定的。所以定时发布 = 构建时按日期过滤（`src/publish.ts`）+ 每天定时重建（`.github/workflows/publish-daily.yml`）。
