# English Content (content/en)

每篇文章是一个独立的 Markdown 文件，对应 `/en/...` 下的一个语义化 URL。
构建时 `scripts/gen-articles.mjs` 会扫描本目录，生成 `src/i18n/generatedArticles.gen.en.ts`，
并与 `src/i18n/enArticles.ts`（手写译文）合并——MD 优先，缺失处由手写兜底。

## Frontmatter 字段
```yaml
---
section: insurance        # 必填：insurance | trust | gold | emerging | arkPilot | guardian
id: hk-market-landscape   # 可选：内部稳定主键；缺省用文件名。跨语言译文需共享同一 id 以配对 hreflang
slug: hong-kong-market    # 可选：本语言的 URL slug；缺省回退 id。不同语言可设不同语义化 slug
translationKey: hk-market # 可选：跨语言配对键；缺省回退 id
title: ...                # 必填
subtitle: ...             # 可选
date: 2026-01-15          # 可选：排序用
summary: ...              # 可选
pin: true                 # 可选：置顶
order: 1                  # 可选：置顶顺序
category: mainland        # 可选： mainland | offshore | macro | qa（决定文章 pill 标签）
---
```
正文用 `## 小节标题` 分节，每节下为 Markdown 原文（段落/列表/加粗/链接/引用均保留）。

## 与中文配对
要让英文文章与中文（`content/zh`）对应版本在语言切换 / hreflang 中互链，
两篇的 `id`（或 `translationKey`）必须相同。当前 en/es/ar 仍以 `enArticles.ts` 等手写译文为主，
逐步把译文搬进本目录即可让 MD 管线接管。
