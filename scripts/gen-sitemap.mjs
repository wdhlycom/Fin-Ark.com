#!/usr/bin/env node
// gen-sitemap.mjs — 生成 SEO 用 sitemap.xml（干净路径路由版本）
// 数据源：
//   1) content/zh/*.md 的 frontmatter（id / section / date）
//   2) src/i18n/zhArticles.ts 中手写文章的 id / section
// 输出：dist/sitemap.xml（部署后位于 https://<BASE>/sitemap.xml）
//
// 用法：node scripts/gen-sitemap.mjs
// 构建时已自动在 vite build 之后执行。

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://fin-ark.com'; // ← 改成你的生产域名（与 robots.txt 中的 Sitemap 一致）
const CONTENT_DIR = join(ROOT, 'content', 'zh');
const ZH_ARTICLES = join(ROOT, 'src', 'i18n', 'zhArticles.ts');
const OUT = join(ROOT, 'dist', 'sitemap.xml');

// ---- 解析 md frontmatter（与 gen-articles.mjs 同款最小实现） ----
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return {};
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
  return data;
}

const articles = new Map(); // id -> { section, date }
function add(id, section, date) {
  if (!id || !section) return;
  if (!articles.has(id)) articles.set(id, { section, date: date || '1970-01-01' });
}

// 1) zhArticles.ts 中手写文章（按顶层 section 键分块，块内提取 id:'...'）
//    先处理手写源：手写是「覆盖层」，与生成源 id 相撞时手写胜出，
//    与线上 i18n.ts 的 mergeArticles(base=手写, extra=生成) 去重规则保持一致。
if (existsSync(ZH_ARTICLES)) {
  const src = readFileSync(ZH_ARTICLES, 'utf8');
  const sectionNames = ['insurance', 'trust', 'gold', 'emerging', 'arkPilot', 'guardian'];
  const re = new RegExp(`^\\s*(${sectionNames.join('|')}):\\s*\\[`, 'gm');
  const positions = [];
  let mm;
  while ((mm = re.exec(src))) positions.push({ section: mm[1], index: mm.index });
  positions.sort((a, b) => a.index - b.index);
  for (let i = 0; i < positions.length; i++) {
    const { section, index } = positions[i];
    const end = i + 1 < positions.length ? positions[i + 1].index : src.length;
    const block = src.slice(index, end);
    const idRe = /id:\s*'([^']+)'/g;
    let im;
    while ((im = idRe.exec(block))) add(im[1], section, undefined);
  }
}

// 2) content/zh/*.md（生成源，作为「兜底」：仅补充手写未覆盖的 id）
if (existsSync(CONTENT_DIR)) {
  for (const f of readdirSync(CONTENT_DIR).filter(
    (x) => x.endsWith('.md') && !x.startsWith('_') && x !== 'README.md'
  )) {
    const raw = readFileSync(join(CONTENT_DIR, f), 'utf8');
    const fm = parseFrontmatter(raw);
    if (fm.section) add(fm.id || `gen-${fm.section}-${f.replace(/\.md$/, '')}`, fm.section, fm.date);
  }
}

// ---- 静态路由 ----
const SECTIONS = ['insurance', 'trust', 'gold', 'emerging', 'arkPilot', 'guardian'];
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  ...SECTIONS.map((s) => ({ path: `/s/${s}`, priority: '0.8', changefreq: 'weekly' })),
  { path: '/assetmap', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/cases', priority: '0.6', changefreq: 'monthly' },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

const urls = [];
for (const r of staticRoutes) {
  urls.push({ loc: BASE + r.path, lastmod: today(), changefreq: r.changefreq, priority: r.priority });
}
for (const [id, { section, date }] of articles) {
  urls.push({
    loc: BASE + `/a/${section}/${encodeURIComponent(id)}`,
    lastmod: date && date !== '1970-01-01' ? date : today(),
    changefreq: 'monthly',
    priority: '0.7',
  });
}

// ---- 输出 ----
const urlset = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n');

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urlset}\n` +
  `</urlset>\n`;

writeFileSync(OUT, xml, 'utf8');
console.log(`✓ sitemap.xml 已生成：${OUT}（共 ${urls.length} 条 URL，其中文章 ${articles.size} 篇）`);
