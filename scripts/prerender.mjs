// 构建期真预渲染（SSG）：用 entry-server 的 render() 为每条路由产出完整静态 HTML，
// 写入 dist/<lang>/.../index.html，使各语言 URL 在构建期即包含正文与 SEO head（爬虫无需执行 JS）。
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const serverDir = join(root, 'dist-server');

// 定位 vite SSR 产物（文件名可能因 vite 版本略有差异，用 glob 兜底）
const serverFile = readdirSync(serverDir).find(
  (f) => f.startsWith('entry-server') && (f.endsWith('.js') || f.endsWith('.mjs'))
);
if (!serverFile) {
  console.error('[prerender] 未找到 dist-server/entry-server 产物，请先运行 vite build --ssr');
  process.exit(1);
}
const { render, collectRoutes } = await import(pathToFileURL(join(serverDir, serverFile)).href);

const template = readFileSync(join(distDir, 'index.html'), 'utf8');
const routes = collectRoutes();

let ok = 0;
for (const url of routes) {
  // 根路径 '/'：构建期无法做语言检测，按默认语言（zh）渲染正文与 SEO head，
  // 使 canonical/hreflang 指向 /zh（避免与 /zh 重复收录），同时让根路径不再是无正文空壳。
  const effectiveUrl = url === '/' ? '/zh' : url;
  const { appHtml, seoHead, lang, dir } = render(effectiveUrl);

  let html = template
    // 先移除模板中的 HTML 注释：注释里出现的 <title> 字样会让下方正则误匹配，
    // 从而吞掉注释尾段与真实 <title>，残留未闭合的 <!-- 把 Vite 注入的 JS/CSS 标签一并注释掉（全站无样式）。
    .replace(/<!--[\s\S]*?-->/g, '')
    // 移除模板中的全局 <title> 与 <meta description>：改由下方按路由注入。
    // 否则 200+ 个页面会共用同一句标题与描述，属重复元信息，严重削弱长尾词各自排名。
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    // 注入 SSR 正文到 #root（客户端 JS 加载后会整体重渲染，不影响抓取）
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    // 设置 <html lang/dir>（先去掉旧属性避免重复）
    .replace(/<html[^>]*>/i, (m) => {
      const cleaned = m
        .replace(/\s+lang="[^"]*"/i, '')
        .replace(/\s+dir="[^"]*"/i, '');
      return cleaned.replace(/^<html/i, `<html lang="${lang}" dir="${dir}"`);
    })
    // 注入页面级 SEO head：title / description / canonical / hreflang / OG / Twitter / JSON-LD
    .replace('</head>', `${seoHead}\n</head>`);

  const rel = url.replace(/^\//, '');
  const dir2 = rel.endsWith('/') ? rel.slice(0, -1) : rel; // '/zh/' -> 'zh'；'/' -> ''（写回 dist/index.html）
  const outFile = join(distDir, dir2, 'index.html');
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, 'utf8');
  ok++;
}

console.log(`[prerender] 已生成 ${ok} 个静态 HTML（含根路径 + zh/en 全量 + es/ar 着陆页）`);
