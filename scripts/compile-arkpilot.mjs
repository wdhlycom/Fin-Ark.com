#!/usr/bin/env node
// compile-arkpilot.mjs
// 把 方舟视点 系列源文件（C:\Users\Holive Hu\WorkBuddy\2026-07-05-21-50-05\方舟视点\*.md）
// 归一化为 content/zh/<id>.md，供 gen-articles.mjs 使用。
//
// 板块：arkPilot（方舟视点，博客式动态更新，默认按日期降序/新→旧）
// 子主题在 subtitle 中以「方舟视点 · XXX」标注（宏观望远镜/内地信号塔/离岸罗盘/方舟问答），
// 用于页面展示分类，不单独拆成 section。
//
// 归一化规则：
//  - 保留原 frontmatter（id/title/subtitle/date/section/lang），补充 summary（自动派生一句话摘要）。
//  - 正文原样保留（源文件已使用 ## 小节，无需归一化）。
// 用法：node scripts/compile-arkpilot.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'C:/Users/Holive Hu/WorkBuddy/2026-07-05-21-50-05/方舟视点';
const OUT = join(ROOT, 'content', 'zh');
mkdirSync(OUT, { recursive: true });

// ---------- frontmatter 解析（与 gen-articles 同款） ----------
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

// ---------- 自动派生一句话摘要 ----------
function deriveSummary(body) {
  const q = body.match(/^\s*>\s*(.+)$/m);
  let s = q ? q[1] : '';
  if (!s) {
    for (const raw of body.split('\n')) {
      const t = raw.trim();
      if (!t || t.startsWith('#') || t.startsWith('>') || t.startsWith('```')) continue;
      s = t;
      break;
    }
  }
  s = s.replace(/\*\*/g, '').replace(/`/g, '').trim();
  const m = s.match(/^[^。.!?！？]+[。.!?！？]?/);
  if (m) s = m[0].trim();
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
    `section: ${data.section || 'arkPilot'}\n` +
    `lang: ${data.lang || 'zh'}\n` +
    `summary: "${summary}"\n` +
    `---\n\n`;
  writeFileSync(join(OUT, `${id}.md`), front + body, 'utf8');
}

// ---------- 入口 ----------
const files = readdirSync(SRC)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .sort();

let ok = 0;
for (const f of files) {
  const raw = readFileSync(join(SRC, f), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  if (!data.section || data.section !== 'arkPilot') {
    console.warn(`  ⚠ 跳过 ${f}：section 非 arkPilot，实际为 "${data.section || '空'}"`);
    continue;
  }
  const id = data.id || f.replace(/\.md$/, '');
  emit(id, data, body);
  ok++;
  console.log(`  ✓ ${id}  (${data.date})  "${data.title}"`);
}
console.log(`\n方舟视点编译完成：${ok} 篇 → content/zh/。下一步运行 npm run gen:articles。`);
