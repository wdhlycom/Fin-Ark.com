import { renderToString } from 'react-dom/server';
import App from './App';
import { seoLinkTags } from './seo';
import { I18N, SECTIONS, type SectionId, type View } from './i18n';
import {
  LANGS,
  DEFAULT_LANG,
  withLang,
  viewToPath,
  articleToPath,
  parsePath,
} from './nav';

/** 预渲染时写入的绝对站点 origin（可通过环境变量覆盖，默认生产域名）。 */
const BASE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://fin-ark.com';

/**
 * 服务端子渲染：渲染指定 URL 对应的完整 HTML 片段，并生成该页的 SEO <head> 标签。
 * 供 scripts/prerender.mjs 在构建期为每条路由产出静态 HTML（真预渲染 / SSG）。
 */
export function render(url: string): {
  appHtml: string;
  seoHead: string;
  lang: string;
  dir: string;
} {
  const appHtml = renderToString(<App serverUrl={url} />);
  const seoHead = seoLinkTags(url, BASE_ORIGIN);
  const { lang } = parsePath(url);
  const safeLang = lang ?? DEFAULT_LANG;
  return { appHtml, seoHead, lang: safeLang, dir: safeLang === 'ar' ? 'rtl' : 'ltr' };
}

/** 枚举所有需要预渲染的路由（zh/en 含文章全量；es/ar 暂无内容，仅 home + 栏目着陆页）。 */
export function collectRoutes(): string[] {
  const routes: string[] = [];
  for (const lang of LANGS) {
    const articles = I18N[lang].articles;
    const hasContent = Object.values(articles).some((list) => list.length > 0);
    routes.push(withLang(lang, '/'));
    for (const sec of SECTIONS) {
      routes.push(withLang(lang, viewToPath(sec as SectionId)));
      if (hasContent) {
        for (const a of articles[sec as SectionId] ?? []) {
          routes.push(withLang(lang, articleToPath(sec as SectionId, a.slug ?? a.id)));
        }
      }
    }
    // 资产地图（独立视图，非 SECTIONS 成员，单独纳入预渲染）
    routes.push(withLang(lang, viewToPath('assetmap' as View)));
  }
  return routes;
}
