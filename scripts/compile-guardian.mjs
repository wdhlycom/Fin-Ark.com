#!/usr/bin/env node
// compile-guardian.mjs
// 把《守护觉醒》系列源文件（C:\Users\Holive Hu\WorkBuddy\2026-06-11-13-27-54\guardian_series\*.md）
// 归一化为 content/zh/<id>.md，供 gen-articles.mjs 使用。
//
// 归一化规则：
//  - 保留 frontmatter（id/title/subtitle/date/section），并补充 summary（取篇首金句首句）。
//  - 章节标题统一为 `##` 形式：把「🔑 **一、标题**」这类独立粗体行 与 已有的 `## ...` 统一为 `## 标题`。
//  - 篇首 `>` 引文（金句）原样保留，由管线作为开篇小节呈现。
//  - <center> 装饰分隔原样保留。
// 用法：node scripts/compile-guardian.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'C:/Users/Holive Hu/WorkBuddy/2026-06-11-13-27-54/guardian_series';
const OUT = join(ROOT, 'content', 'zh');
mkdirSync(OUT, { recursive: true });

// ---------- frontmatter 解析（与 gen-articles 同款，仅取用） ----------
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const raw of m[1].split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: text.slice(m[0].length) };
}

// ---------- 归一化正文：统一章节标题为 ## ----------
function normalizeBody(body) {
  const out = [];
  for (let raw of body.split('\n')) {
    const line = raw.replace(/\r$/, '');
    // 已是 ## 标题：去掉内部 ** 粗体标记，保留 emoji/序号/标题
    const hm = line.match(/^#{1,6}\s+(.*?)\s*$/);
    if (hm) {
      out.push('## ' + hm[1].replace(/\*\*/g, '').trim());
      continue;
    }
    // 独立粗体行（如 🔑 **一、标题** 或 **一、标题**）：作为标题
    const bm = line.match(/^\s*\*\*(.+?)\*\*\s*$/);
    if (bm) {
      out.push('## ' + bm[1].replace(/\*\*/g, '').trim());
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

// ---------- 取篇首金句首句作为 summary ----------
function deriveSummary(body) {
  const m = body.match(/^[>\s]*(>.+)$/m);
  let s = m ? m[1].replace(/^>\s?/, '').replace(/\*\*/g, '').trim() : '';
  if (!s) return '';
  const dot = s.indexOf('。');
  if (dot > 0) s = s.slice(0, dot + 1);
  if (s.length > 50) s = s.slice(0, 49) + '…';
  return s;
}

// ---------- 写出单篇 ----------
function emit(id, data, body) {
  const summary = deriveSummary(body);
  const front =
    `---\n` +
    `id: "${data.id || id}"\n` +
    `title: "${data.title || id}"\n` +
    `subtitle: "${data.subtitle || ''}"\n` +
    `date: ${data.date || '1970-01-01'}\n` +
    `section: guardian\n` +
    `summary: "${summary}"\n` +
    `---\n\n`;
  writeFileSync(join(OUT, `${id}.md`), front + body, 'utf8');
}

// ---------- 入口 ----------
const files = readdirSync(SRC)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .sort();

// 删除上一轮手写的旧稿件，避免与编译产物重复
const stale = join(OUT, 'guardian-01-ark.md');
if (existsSync(stale)) rmSync(stale);

let ok = 0;
for (const f of files) {
  const raw = readFileSync(join(SRC, f), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  if (!data.section || data.section !== 'guardian') {
    console.warn(`  ⚠ 跳过 ${f}：section 非 guardian`);
    continue;
  }
  const id = data.id || f.replace(/\.md$/, '');
  emit(id, data, normalizeBody(body));
  ok++;
  console.log(`  ✓ ${id}  (${data.date})  "${data.title}"`);
}
console.log(`\n守护觉醒编译完成：${ok} 篇 → content/zh/。下一步运行 npm run gen:articles。`);
