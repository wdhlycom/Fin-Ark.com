#!/usr/bin/env node
// gen-sitemap.mjs — 生成多语言 SEO sitemap.xml
//
// 数据源：dist-server/entry-server.js 的 collectSitemapEntries()，与构建期预渲染
// （scripts/prerender.mjs）共用同一份合并后的内容（手写 TS 文章 + content/<lang> 的 MD 管线文章）。
//
// 为什么不再直接解析 content/*.md：
//   旧实现只读 Markdown，导致手写在 src/i18n/<lang>Articles.ts 里的文章虽已预渲染上线、
//   却完全不在 sitemap 中（实测 41 个页面缺漏）；同时 sitemap 的 hreflang 配对规则与
//   页面内 <link rel="alternate"> 的配对规则不一致，会向搜索引擎发出互相矛盾的信号。
//
// 要点：
//   1) 每个语言拥有独立 URL（/<lang>/...），利于各语言独立收录。
//   2) 同一内容按 id 跨语言配对，生成 hreflang 交替链接（含 x-default）。
//   3) 根路径 '/' 不收录：其 canonical 指向默认语言 /zh，避免与 /zh 重复收录。
//
// 用法：node scripts/gen-sitemap.mjs（构建时已自动在 prerender 之后执行）

import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.fin-ark.com'; // 与 robots.txt 中的 Sitemap 地址保持一致（www 为最终落点）
const SERVER_DIR = join(ROOT, 'dist-server');
const OUT = join(ROOT, 'dist', 'sitemap.xml');
const DEFAULT_LANG = 'zh';

// ---- 载入 SSR 产物中的 sitemap 条目 ----
if (!existsSync(SERVER_DIR)) {
  console.error('[gen-sitemap] 未找到 dist-server，请先运行 vite build --ssr');
  process.exit(1);
}
const serverFile = readdirSync(SERVER_DIR).find(
  (f) => f.startsWith('entry-server') && (f.endsWith('.js') || f.endsWith('.mjs'))
);
if (!serverFile) {
  console.error('[gen-sitemap] dist-server 中未找到 entry-server 产物');
  process.exit(1);
}
const { collectSitemapEntries } = await import(
  pathToFileURL(join(SERVER_DIR, serverFile)).href
);
const entries = collectSitemapEntries();

const langOf = (path) => path.split('/').filter(Boolean)[0] ?? DEFAULT_LANG;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hreflangLines(alts) {
  return alts
    .map((a) => `      <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.loc}"/>`)
    .join('\n');
}

const urls = [];
const seen = new Set();

function pushUrl(loc, lastmod, changefreq, priority, altLines) {
  if (seen.has(loc)) return;
  seen.add(loc);
  const alts = altLines ? `\n${altLines}` : '';
  urls.push(
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${alts}\n  </url>`
  );
}

// ---- 按 group 聚合多语言版本，生成互链 ----
const groups = new Map();
for (const entry of entries) {
  if (!groups.has(entry.group)) groups.set(entry.group, []);
  groups.get(entry.group).push(entry);
}

let articleCount = 0;
for (const [group, items] of groups) {
  const alts = items.map((i) => ({ lang: langOf(i.path), loc: BASE + i.path }));
  // x-default：优先默认语言，否则取第一个可用语言
  const xd = items.find((i) => langOf(i.path) === DEFAULT_LANG) ?? items[0];
  alts.push({ lang: 'x-default', loc: BASE + xd.path });
  const altLines = hreflangLines(alts);

  for (const item of items) {
    pushUrl(
      BASE + item.path,
      item.lastmod || today(),
      item.changefreq,
      item.priority,
      altLines
    );
    if (group.startsWith('article:')) articleCount++;
  }
}

// ---- 输出 ----
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  `${urls.join('\n')}\n` +
  `</urlset>\n`;

writeFileSync(OUT, xml, 'utf8');
console.log(
  `✓ sitemap.xml 已生成：${OUT}（共 ${urls.length} 条 URL；文章 ${articleCount} 条 / 内容组 ${groups.size} 组）`
);
