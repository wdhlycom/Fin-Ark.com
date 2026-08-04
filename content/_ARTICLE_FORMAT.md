# 文章写作规范（AI 生成 content/<lang>/*.md 必读）

> 用途：用 AI 写多语言文章时遵守此规范，可避免"文章写好却静默消失 / 不显示 / 不被预渲染"的坑。
> 解析器：`scripts/gen-articles.mjs`（`parseFrontmatter` 只支持扁平 `key: value` 的 YAML frontmatter）。

---

## ⚠️ 致命坑：frontmatter 行内注释会被当成值的一部分

解析器逐行处理 frontmatter，**只跳过整行以 `#` 开头的注释，不会剥离值后面的行内 `#` 注释**。

❌ 错误写法（值被污染，文章会消失）：
```yaml
section: insurance # obligatorio: 必填
pin: true # 置顶显示
order: 3 # 排序
```
→ `data.section` 变成 `"insurance # obligatorio: 必填"` 这种脏字符串，文章被分到**不存在的栏目** → 不进任何栏目列表、不匹配 `SECTIONS`、不被预渲染。**无任何报错，只是静默消失。**

✅ 正确写法（注释放整行，或干脆不写）：
```yaml
# obligatorio: 必填（整行注释写在字段上方）
section: insurance
pin: true
order: 3
```

**要点：AI 很喜欢在值后面加 `# 解释`，必须禁止。** 要么整行注释，要么不写。

---

## Frontmatter 字段表

| 字段 | 必填 | 说明 |
|------|------|------|
| `section` | ✅ | 只能是以下 6 个之一，多一个字符 / 空格 / 注释都不行：<br>• `insurance`、`guardian`、`arkPilot`（清洁 URL，无 `/s/`） <br>• `trust`、`gold`、`emerging`（带 `/s/` 层级） |
| `id` | 否 | 同语言内唯一；省略则自动生成 `gen-<section>-<文件名>` |
| `slug` | 否 | URL 路径段，省略回退到 `id` |
| `translationKey` | 否 | 跨语言译文配对键，省略回退到 `id` |
| `title` | 否 | 标题，省略用文件名 |
| `subtitle` | 否 | 副标题 |
| `summary` | 否 | 摘要 |
| `date` | 否 | `YYYY-MM-DD`；缺省 `1970-01-01`（排最末） |
| `pin` | 否 | `true` 或 `1` 置顶 |
| `order` | 否 | 数字，用于同栏目内排序 |
| `category` | 否 | 仅 `insurance` / `arkPilot` 板块用于 pill 配色 |

- 仅支持**扁平** `key: value`，不支持嵌套对象 / 数组。
- 引号可选；若用则 `"` 或 `'` 成对（解析器只去最外层一对）。
- 同一语言内 `id` 重复会自动追加后缀，但最好显式给唯一 `id`。

---

## 正文（body）规则

- `#` ~ `######` 作为小节标题，其下文本为该小节正文。
- 第一个标题**之前**的段落会保留为开篇导语（金句 / lead）。
- 由 `react-markdown` + `rehype-raw` 渲染，支持：`<center>` 居中、emoji、列表、`**加粗**`、链接、引用块等原始 HTML。

---

## 文件名规则

- 必须以 `.md` 结尾。
- **不能**以 `_` 开头（下划线前缀文件会被构建器跳过）。
- **不能**命名为 `README.md`（会被跳过）。
- UTF-8 编码。

---

## 自检清单（写完必做）

1. `npm run build`（务必带 `NODE_OPTIONS="--use-system-ca"`，否则清空 dist 会被 safe-delete 垫片拦截导致构建残缺）。
2. 确认 `dist/<lang>/<section>/` 下出现了你的文章页；若没有 → 99% 是 `section` 字段被注释 / 拼写污染。
3. 切到该语言首页，确认文章出现在对应栏目列表里。
4. 阿拉伯语（`ar`）需确认页面 `<html dir="rtl">`（直链打开由预渲染注入；SPA 切换由 `App.tsx` 的 `useEffect` 同步）。
