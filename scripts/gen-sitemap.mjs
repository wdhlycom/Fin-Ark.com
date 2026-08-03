#!/usr/bin/env node
// gen-sitemap.mjs — 生成多语言 SEO sitemap.xml（/ <lang> / 前缀路由版本）
// 数据源：content/<lang>/*.md 的 frontmatter（section / id / slug / date）
// 输出：dist/sitemap.xml（部署后位于 https://<BASE>/sitemap.xml）
//
// 要点：
//   1) 每个语言拥有独立 URL（/<lang>/...），互不共用，利于各语言独立收录。
//   2) 每页带 <xhtml:link> hreflang 交替链接（含 x-default），按文章 id 跨语言配对，
//      仅在确有对应译文时才互链，避免把不存在的译文错误指向 404。
//
// 用法：node scripts/gen-sitemap.mjs  （构建时已自动在 vite build 之后执行）

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://fin-ark.com'; // ← 改成你的生产域名（与 robots.txt 中的 Sitemap 一致）
const CONTENT_DIR = join(ROOT, 'content');
const OUT = join(ROOT, 'dist', 'sitemap.xml');

const LANGS = ['zh', 'en', 'es', 'ar'];
const DEFAULT_LANG = 'zh';
const SECTIONS = ['insurance', 'trust', 'gold', 'emerging', 'arkPilot', 'guardian'];

// 顶层板块（与 src/nav.ts 的 CLEAN_SECTIONS 保持一致）：URL 不含 /s/ 层级。
// 港险学院 / 守护觉醒 / 方舟试点 使用 /<lang>/<section>；其余沿用 /<lang>/s/<section>。
const CLEAN_SECTIONS = new Set(['insurance', 'guardian', 'arkPilot']);
const sectionPath = (s) => (CLEAN_SECTIONS.has(s) ? `/${s}` : `/s/${s}`);

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

// ---- 收集每语言文章（按 id 跨语言配对） ----
// byId: id -> { lang -> { section, slug } }
const byId = new Map();
function addArticle(lang, id, section, slug, date) {
  if (!id || !section) return;
  const slugKey = slug || id;
  if (!byId.has(id)) byId.set(id, {});
  byId.get(id)[lang] = { section, slug: slugKey, date: date || '1970-01-01' };
}

for (const lang of LANGS) {
  const dir = join(CONTENT_DIR, lang);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter(
    (x) => x.endsWith('.md') && !x.startsWith('_') && x !== 'README.md'
  )) {
    const raw = readFileSync(join(dir, f), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm.section) continue;
    const id = fm.id || `gen-${fm.section}-${f.replace(/\.md$/, '')}`;
    addArticle(lang, id, fm.section, fm.slug, fm.date);
  }
}

// ---- 静态路由（每个语言都存在） ----
const staticDefs = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  ...SECTIONS.map((s) => ({ path: sectionPath(s), priority: '0.8', changefreq: 'weekly' })),
  { path: '/assetmap', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/cases', priority: '0.6', changefreq: 'monthly' },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hreflangLinks(langs) {
  // langs: [{ lang, loc }]
  return langs
    .map(
      (a) =>
        `      <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.loc}"/>`
    )
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

// 1) 静态路由：每个语言一条，并互链全部语言 + x-default
for (const lang of LANGS) {
  for (const def of staticDefs) {
    const loc = BASE + `/${lang}${def.path}`;
    const alts = [];
    for (const l2 of LANGS) {
      alts.push({ lang: l2, loc: BASE + `/${l2}${def.path}` });
    }
    alts.push({ lang: 'x-default', loc: BASE + `/${DEFAULT_LANG}${def.path}` });
    pushUrl(loc, today(), def.changefreq, def.priority, hreflangLinks(alts));
  }
}

// 2) 文章路由：按 id 跨语言配对，仅在有对应译文的语言间互链（避免 404 错误配对）
for (const [id, langMap] of byId) {
  const langs = Object.entries(langMap).map(([lang, v]) => ({
    lang,
    loc: BASE + `/${lang}/a/${v.section}/${encodeURIComponent(v.slug)}`,
    date: v.date,
  }));
  // x-default：默认语言优先，否则取第一个有译文的语言
  const xdEntry = langs.find((x) => x.lang === DEFAULT_LANG) || langs[0];
  const altLines = hreflangLinks([...langs, { lang: 'x-default', loc: xdEntry.loc }]);
  for (const e of langs) {
    pushUrl(
      e.loc,
      e.date && e.date !== '1970-01-01' ? e.date : today(),
      'monthly',
      '0.7',
      altLines
    );
  }
}

// ---- 输出 ----
const urlset = urls.join('\n');
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  `${urlset}\n` +
  `</urlset>\n`;

writeFileSync(OUT, xml, 'utf8');
console.log(
  `✓ sitemap.xml 已生成：${OUT}（共 ${urls.length} 条 URL；静态路由 ${LANGS.length * staticDefs.length} 条跨语言互链，文章 ${byId.size} 篇）`
);
