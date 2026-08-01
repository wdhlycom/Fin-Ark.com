#!/usr/bin/env node
// compile-insurance.mjs
// 把 17 篇保险系列源文件（C:\Users\Holive Hu\WorkBuddy\2026-07-05-21-50-05\insurance\*.md）
// 归一化为 content/zh/<id>.md，供 gen-articles.mjs 使用。
//
// 归一化规则：
//  - 保留原 frontmatter（id/title/subtitle/date/section），补充 summary（自动派生一句话摘要）。
//  - 置顶：hk-market-landscape、hk-why-choose-2026 加 pin: true 与 order（排在列表最前）。
//  - 正文原样保留（源文件已使用 ## 小节，无需归一化）。
// 用法：node scripts/compile-insurance.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'C:/Users/Holive Hu/WorkBuddy/2026-07-05-21-50-05/insurance';
const OUT = join(ROOT, 'content', 'zh');
mkdirSync(OUT, { recursive: true });

// 置顶文章（order 越小越靠前）
const PINNED = {
  'hk-market-landscape': 1,
  'hk-why-choose-2026': 2,
};

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
  // 优先取篇首 > 金句
  const q = body.match(/^\s*>\s*(.+)$/m);
  let s = q ? q[1] : '';
  if (!s) {
    // 否则取第一个非标题/非空段的首句
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
  const pinOrder = PINNED[id];
  const pinLine = pinOrder ? `pin: true\norder: ${pinOrder}\n` : '';
  const front =
    `---\n` +
    `id: "${data.id || id}"\n` +
    `title: "${data.title || id}"\n` +
    `subtitle: "${data.subtitle || ''}"\n` +
    `date: ${data.date || '1970-01-01'}\n` +
    `section: insurance\n` +
    `summary: "${summary}"\n` +
    pinLine +
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
  if (!data.section || data.section !== 'insurance') {
    console.warn(`  ⚠ 跳过 ${f}：section 非 insurance`);
    continue;
  }
  const id = data.id || f.replace(/\.md$/, '');
  emit(id, data, body);
  ok++;
  const pin = PINNED[id] ? ' [置顶]' : '';
  console.log(`  ✓ ${id}  (${data.date})${pin}  "${data.title}"`);
}
console.log(`\n保险系列编译完成：${ok} 篇 → content/zh/。下一步运行 npm run gen:articles。`);
