// 预渲染产物 SEO 审计：扫描 dist/ 下所有已预渲染的 HTML，验证页面级 SEO 元信息是否达标。
//
// 检查项：
//   1. <title> / <meta name="description"> 是否存在，且【各页唯一】（历史问题：全站共用同一句）
//   2. canonical 是否为自引用绝对地址；hreflang 交替链接是否成对存在
//   3. JSON-LD 是否存在且可被 JSON.parse（语法错误会让富媒体结果整块失效）
//   4. 正文是否已预渲染进 #root（空壳 = 爬虫拿不到内容）
//
// 用法：node scripts/audit-seo.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/** 递归收集所有 HTML 文件（跳过静态资源目录）。 */
function collectHtml(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      collectHtml(p, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(p);
    }
  }
  return out;
}

const firstMatch = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

/**
 * 还原 HTML 实体后再做长度 / 唯一性统计。
 * 一个引号在属性里写作 &quot;（6 个字符），直接数字符串会把 54 字的标题误判成 64 字，
 * 也会让「是否会被搜索结果截断」的结论失真。&amp; 必须最后还原，避免二次解码。
 */
const decodeEntities = (s) =>
  (s ?? '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');

const files = collectHtml(dist).sort();
const pages = files.map((file) => {
  const html = readFileSync(file, 'utf8');
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1]
  );
  const brokenLd = [];
  const ldTypes = [];
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block.replace(/\\u003c/g, '<'));
      for (const node of [].concat(parsed)) if (node?.['@type']) ldTypes.push(node['@type']);
    } catch (e) {
      brokenLd.push(String(e.message).slice(0, 80));
    }
  }
  const rootMarker = '<div id="root">';
  const rootAt = html.indexOf(rootMarker);
  let bodyChars = 0;
  if (rootAt >= 0) {
    const after = html.slice(rootAt + rootMarker.length);
    const scriptAt = after.search(/<script\b/);
    bodyChars = (scriptAt >= 0 ? after.slice(0, scriptAt) : after).length;
  }
  return {
    file: relative(dist, file).replace(/\\/g, '/'),
    title: decodeEntities(firstMatch(html, /<title>([\s\S]*?)<\/title>/)),
    description: decodeEntities(firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/)),
    canonical: firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]*)"/),
    hreflang: (html.match(/hreflang="/g) || []).length,
    noindex: /<meta\s+name="robots"\s+content="noindex/.test(html),
    ldTypes,
    brokenLd,
    bodyChars,
    ogTitle: decodeEntities(firstMatch(html, /<meta\s+property="og:title"\s+content="([^"]*)"/)),
  };
});

const count = (arr, keyFn) =>
  arr.reduce((map, item) => {
    const k = keyFn(item);
    map.set(k, (map.get(k) ?? 0) + 1);
    return map;
  }, new Map());

const groupDupes = (key, src) =>
  [...count(src, (p) => p[key]).entries()].filter(([k, n]) => n > 1 && k);

// noindex（薄内容）页不参与收录，豁免唯一性与 hreflang 统计
const indexable = pages.filter((p) => !p.noindex);
const noindexPages = pages.filter((p) => p.noindex);
const dupTitles = groupDupes('title', indexable);
const dupDescs = groupDupes('description', indexable);
const dupCanonicals = groupDupes('canonical', indexable);
const missingTitle = indexable.filter((p) => !p.title);
const missingDesc = indexable.filter((p) => !p.description);
const missingCanonical = indexable.filter((p) => !p.canonical);
const noHreflang = indexable.filter((p) => p.hreflang === 0);
const noLd = pages.filter((p) => p.ldTypes.length === 0);
const emptyBody = pages.filter((p) => p.bodyChars < 200);
const brokenLd = pages.filter((p) => p.brokenLd.length > 0);

const line = (label, value) => `${label.padEnd(34, ' ')} ${value}`;
const out = [];
out.push('===== 预渲染 SEO 审计 =====');
out.push(line('预渲染页面总数', pages.length));
out.push(line('noindex 薄内容页', noindexPages.length + (noindexPages.length ? `（${noindexPages.map((p) => p.file).join(', ')}）` : '')));
out.push('');
out.push('--- 唯一性 ---');
out.push(line('缺 <title>', missingTitle.length));
out.push(line('缺 meta description', missingDesc.length));
out.push(line('重复 <title> 组数', dupTitles.length));
out.push(line('重复 description 组数', dupDescs.length));
out.push('');
out.push('--- 规范化链接 ---');
out.push(line('缺 canonical', missingCanonical.length));
out.push(line('缺 hreflang', noHreflang.length));
out.push(line('重复 canonical 组数', dupCanonicals.length));
out.push('');
out.push('--- 结构化数据 ---');
out.push(line('无 JSON-LD 的页面', noLd.length));
out.push(line('JSON-LD 解析失败', brokenLd.length));
const typeHist = [...count(pages.flatMap((p) => p.ldTypes), (t) => t).entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([t, n]) => `${t}:${n}`)
  .join('  ');
out.push(line('JSON-LD 类型分布', typeHist || '(none)'));
out.push('');
out.push('--- 正文预渲染 ---');
out.push(line('正文疑似为空壳(<200字符)', emptyBody.length));
out.push(line('og:title 缺失', pages.filter((p) => !p.ogTitle).length));

out.push('');
out.push('--- 长度分布（SERP 截断参考）---');
const lens = (key) => pages.map((p) => (p[key] || '').length).sort((a, b) => a - b);
const median = (arr) => arr[Math.floor(arr.length / 2)] ?? 0;
const titleLens = lens('title');
const descLens = lens('description');
out.push(line('title 中位 / 最长', `${median(titleLens)} / ${titleLens[titleLens.length - 1]}`));
out.push(line('description 中位 / 最长', `${median(descLens)} / ${descLens[descLens.length - 1]}`));
const longTitles = pages.filter((p) => (p.title || '').length > 60);
const shortDescs = pages.filter((p) => (p.description || '').length < 80);
const longDescs = pages.filter((p) => (p.description || '').length > 160);
out.push(line('title 超 60 字符页数', longTitles.length));
out.push(line('description 短于 80 字符页数', shortDescs.length));
out.push(line('description 超 160 字符页数', longDescs.length));

// 只报数量没用，得能直接看到是哪个文件要改
if (longTitles.length || shortDescs.length || longDescs.length) {
  out.push('');
  out.push('--- 长度异常明细 ---');
  for (const [label, rows, key] of [
    ['title > 60', longTitles, 'title'],
    ['description < 80', shortDescs, 'description'],
    ['description > 160', longDescs, 'description'],
  ]) {
    if (!rows.length) continue;
    out.push(`[${label}] ${rows.length} 页`);
    for (const p of rows) out.push(`  ${(p[key] || '').length}\t${p.file}\t${(p[key] || '').slice(0, 70)}`);
  }
}

const rootPage = pages.find((p) => p.file === 'index.html');
if (rootPage) {
  out.push('');
  out.push(`根路径 index.html canonical = ${rootPage.canonical}`);
  out.push(`   （应指向 /zh：根路径渲染默认语言正文，但规范地址归到 /zh，避免重复收录）`);
}

if (dupTitles.length) {
  out.push('');
  out.push('--- 重复标题明细（前 15 组）---');
  for (const [title, n] of dupTitles.slice(0, 15)) {
    const where = pages.filter((p) => p.title === title).map((p) => p.file);
    out.push(`[x${n}] ${title}`);
    for (const w of where) out.push(`      ${w}`);
  }
}

if (brokenLd.length) {
  out.push('');
  out.push('--- JSON-LD 错误明细 ---');
  for (const p of brokenLd.slice(0, 10)) out.push(`${p.file}: ${p.brokenLd.join(' | ')}`);
}

out.push('');
out.push('--- 抽样（每类一个）---');
for (const f of ['index.html', 'zh/index.html', 'zh/insurance/index.html', 'en/index.html']) {
  const p = pages.find((x) => x.file === f);
  if (p) out.push(`${f}\n   title: ${p.title}\n   desc : ${(p.description || '').slice(0, 90)}…\n   ld   : ${p.ldTypes.join(', ')}`);
}
const aSample = pages.find((p) => p.file.startsWith('zh/a/'));
if (aSample) {
  out.push(`${aSample.file}\n   title: ${aSample.title}\n   desc : ${(aSample.description || '').slice(0, 90)}…\n   ld   : ${aSample.ldTypes.join(', ')}`);
}

// ---- sitemap 与预渲染产物交叉核对 ----
// 数据源不一致会导致「页面已上线却不在 sitemap」：预渲染合并了手写 TS 文章 + MD 管线文章，
// 而 gen-sitemap 目前只读 content/<lang>/*.md。此处把差异显式量化出来。
try {
  const xml = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  // 用 URL 解析取路径，不写死域名：站点曾从裸域迁到 www，写死 origin 会让全部条目误判。
  const locPath = (loc) => {
    try {
      const p = new URL(loc).pathname;
      return p === '/' ? '' : p.replace(/^\//, '');
    } catch {
      return null;
    }
  };
  const locPaths = new Set(locs.map(locPath).filter((p) => p !== null));
  // 预渲染是目录形式（xxx/index.html），sitemap 是无尾斜杠的干净路径；此处统一到同一形态。
  const pagePath = (file) =>
    file === 'index.html' ? '' : file.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  const filePaths = new Set(pages.map((p) => pagePath(p.file)));
  // 根路径渲染默认语言正文，规范地址归到 /zh，故不进 sitemap，属预期豁免。
  const missingFromSitemap = indexable.filter(
    (p) => pagePath(p.file) !== '' && !locPaths.has(pagePath(p.file))
  );
  const deadLocs = locs.filter((loc) => {
    const rel = locPath(loc);
    return rel !== null && !filePaths.has(rel);
  });

  out.push('');
  out.push('--- sitemap 交叉核对 ---');
  out.push(line('sitemap URL 数', locs.length));
  out.push(line('已预渲染但不在 sitemap', missingFromSitemap.length));
  out.push(line('sitemap 指向但无对应文件', deadLocs.length));
  if (missingFromSitemap.length) {
    out.push('  缺漏样例（应补进 sitemap）：');
    for (const p of missingFromSitemap.slice(0, 10)) out.push(`    ${p.file}`);
  }
  if (deadLocs.length) {
    out.push('  死链样例：');
    for (const l of deadLocs.slice(0, 10)) out.push(`    ${l}`);
  }
} catch (e) {
  out.push(`sitemap 交叉核对失败: ${e.message}`);
}

const report = out.join('\n');
console.log(report);
import { writeFileSync } from 'node:fs';
writeFileSync(join(root, 'seo-audit-result.txt'), report, 'utf8');
