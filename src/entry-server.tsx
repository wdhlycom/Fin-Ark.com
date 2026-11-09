import { renderToString } from 'react-dom/server';
import App from './App';
import { seoHeadTags } from './seo';
import { I18N, SECTIONS, type Lang, type SectionId } from './i18n';
import { SERIES_ORDER } from './data/guardianSeries';
import { TOPIC_PAGES, topicToPath, topicCopy } from './data/topicPages';
import {
  LANGS,
  DEFAULT_LANG,
  withLang,
  viewToPath,
  articleToPath,
  parsePath,
  type View,
} from './nav';

/** 预渲染时写入的绝对站点 origin（可通过环境变量覆盖，默认生产域名）。 */
const BASE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://www.fin-ark.com';

/**
 * 服务端子渲染：渲染指定 URL 对应的完整 HTML 片段，并生成该页的 SEO <head>。
 * SEO head 现由 seo.ts 的 seoHeadTags 统一产出（title / description / canonical /
 * hreflang / Open Graph / Twitter / JSON-LD），供 scripts/prerender.mjs 在构建期
 * 为每条路由产出静态 HTML（真预渲染 / SSG）。
 */
export function render(url: string): {
  appHtml: string;
  seoHead: string;
  lang: string;
  dir: string;
} {
  const appHtml = renderToString(<App serverUrl={url} />);
  const seoHead = seoHeadTags(url, BASE_ORIGIN);
  const { lang } = parsePath(url);
  const safeLang = lang ?? DEFAULT_LANG;
  return { appHtml, seoHead, lang: safeLang, dir: safeLang === 'ar' ? 'rtl' : 'ltr' };
}

/** 枚举所有需要预渲染的路由（zh/en 含文章全量；es/ar 暂无内容，仅 home + 栏目着陆页）。 */
export function collectRoutes(): string[] {
  const routes: string[] = [];
  // 根路径 '/'：构建期无法做语言检测，单独产出（渲染默认语言正文，canonical 指向默认语言 URL），
  // 避免线上根路径回退到无正文的空壳 index.html。
  routes.push('/');
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
    // 独立视图（非 SECTIONS 成员）：资产地图 / 关于 / 案例，均需纳入预渲染。
    // 此前只预渲染 assetmap，导致 sitemap 中收录的 /<lang>/about、/<lang>/cases 实为死链
    // （无对应静态文件，线上会回退到根 index.html，被判定为与首页重复）。
    for (const v of ['assetmap', 'about', 'cases'] as View[]) {
      routes.push(withLang(lang, viewToPath(v)));
    }
    // 主题聚合页（/gold-storage 等）：按语言纳入预渲染
    for (const tp of TOPIC_PAGES) {
      routes.push(withLang(lang, topicToPath(tp.id)));
    }
  }
  return routes;
}

export type SitemapEntry = {
  /** 站点内绝对路径（不含 origin），如 /zh/a/insurance/xxx */
  path: string;
  /** 跨语言配对键：同一篇内容的不同语言共享同一 group，用于生成 hreflang 互链 */
  group: string;
  /** 最后修改时间（文章取发布日期）；缺省由 sitemap 生成器回退为当天 */
  lastmod?: string;
  priority: string;
  changefreq: string;
};

/**
 * 生成 sitemap 全量条目。
 *
 * 关键点：与 prerender 共用同一份数据源（I18N 合并后的手写 TS + MD 管线文章）。
 * 此前 gen-sitemap.mjs 只读 content/<lang>/*.md，导致手写 TS 文章虽已上线却不在 sitemap 中
 * （实测 41 个页面缺漏），且 sitemap 的 hreflang 配对逻辑与页面内 hreflang 不一致。
 */
export function collectSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  const staticViews: { view: View; priority: string; changefreq: string }[] = [
    { view: 'home', priority: '1.0', changefreq: 'weekly' },
    ...SECTIONS.map((s) => ({
      view: s as View,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    { view: 'assetmap', priority: '0.6', changefreq: 'monthly' },
    { view: 'about', priority: '0.6', changefreq: 'monthly' },
    { view: 'cases', priority: '0.6', changefreq: 'monthly' },
  ];

  for (const lang of LANGS) {
    const articles = I18N[lang].articles;
    for (const s of staticViews) {
      // 板块页：该语言无实质内容（薄着陆页）不进 sitemap（与 noindex 一致）。
      // guardian 特殊：聚合页只渲染命中 SERIES_ORDER 的文章（es/ar 为独立翻译 id，聚合页为空壳）。
      const isSection = (SECTIONS as string[]).includes(s.view);
      const secList = isSection ? articles[s.view as SectionId] ?? [] : [];
      if (isSection && secList.length === 0) continue;
      if (s.view === 'guardian' && !secList.some((a) => SERIES_ORDER.some((e) => e.id === a.id))) {
        continue;
      }
      const path = viewToPath(s.view);
      entries.push({
        path: withLang(lang, path),
        group: `static:${path}`,
        priority: s.priority,
        changefreq: s.changefreq,
      });
    }

    for (const sec of SECTIONS) {
      for (const a of articles[sec] ?? []) {
        entries.push({
          path: withLang(lang, articleToPath(sec, a.slug ?? a.id)),
          // 与页内 hreflang 保持同一配对键（文章 id）
          group: `article:${a.id}`,
          lastmod: a.updated ?? a.date,
          priority: '0.7',
          changefreq: 'monthly',
        });
      }
    }

    // 主题聚合页：纳入 sitemap（优先级略高于普通文章，低于板块页）
    for (const tp of TOPIC_PAGES) {
      // 定时发布会造成「主题页暂时无文可聚」——排期中的文章还没到日子。
      // 一篇都没有就说明这页此刻是空壳，与板块页同规则：不进 sitemap。
      const hits = tp.articleIds.filter((id) =>
        SECTIONS.some((sec) => (articles[sec] ?? []).some((a) => a.id === id))
      ).length;
      if (hits === 0) continue;
      entries.push({
        path: withLang(lang, topicToPath(tp.id)),
        group: `topic:${tp.id}`,
        priority: '0.75',
        changefreq: 'weekly',
      });
    }
  }

  return entries;
}

/* ------------------------------------------------------------------ *
 * llms.txt 数据源（面向 AI 搜索 / 大模型抓取）
 *
 * 与 sitemap 共用同一份合并后的内容（手写 TS 文章 + content/<lang> 的 MD），
 * 保证「AI 看到的清单」与「搜索引擎看到的清单」不会漂移。
 * ------------------------------------------------------------------ */

export type LlmsSection = {
  id: string;
  label: string;
  /** 站点内绝对路径（不含 origin） */
  path: string;
  /** 该栏目收录的文章数；0 表示非文章型页面（资产地图/关于/案例） */
  count: number;
};

export type LlmsEntry = {
  path: string;
  title: string;
  summary: string;
  sectionId: string;
  sectionLabel: string;
  lang: string;
  date?: string;
};

/** 讲某语言的栏目清单（含资产地图/关于/案例三个独立页）。 */
export function collectLlmsSections(lang: Lang = DEFAULT_LANG as Lang): LlmsSection[] {
  const d = I18N[lang];
  const out: LlmsSection[] = [];
  for (const sec of SECTIONS) {
    const list = d.articles[sec] ?? [];
    // guardian 聚合页只渲染命中系列顺序的文章（与 sitemap / noindex 规则一致）
    const count =
      sec === 'guardian'
        ? list.filter((a) => SERIES_ORDER.some((e) => e.id === a.id)).length
        : list.length;
    if (count === 0) continue;
    out.push({ id: sec, label: d.nav[sec], path: withLang(lang, viewToPath(sec)), count });
  }
  out.push({
    id: 'assetmap',
    label: d.nav.assetmap,
    path: withLang(lang, viewToPath('assetmap' as View)),
    count: 0,
  });
  out.push({
    id: 'about',
    label: d.nav.about,
    path: withLang(lang, viewToPath('about' as View)),
    count: 0,
  });
  out.push({
    id: 'cases',
    label: d.cases.title,
    path: withLang(lang, viewToPath('cases' as View)),
    count: 0,
  });
  // 主题聚合页：作为独立入口列出，方便 AI 直接定位到主题集群
  for (const tp of TOPIC_PAGES) {
    out.push({
      id: `topic:${tp.id}`,
      label: topicCopy(tp.id, lang).nav,
      path: withLang(lang, topicToPath(tp.id)),
      count: tp.articleIds.length,
    });
  }
  return out;
}

/** 讲某语言的文章条目（标题 + 摘要），供 llms.txt 逐条列出。 */
export function collectLlmsEntries(lang: Lang = DEFAULT_LANG as Lang): LlmsEntry[] {
  const d = I18N[lang];
  const out: LlmsEntry[] = [];
  for (const sec of SECTIONS) {
    const list = d.articles[sec] ?? [];
    const filtered =
      sec === 'guardian' ? list.filter((a) => SERIES_ORDER.some((e) => e.id === a.id)) : list;
    for (const a of filtered) {
      const summary = String(a.summary || a.subtitle || '')
        .replace(/\s+/g, ' ')
        .trim();
      out.push({
        path: withLang(lang, articleToPath(sec, a.slug ?? a.id)),
        title: a.title,
        summary: summary.length > 110 ? summary.slice(0, 110) + '…' : summary,
        sectionId: sec,
        sectionLabel: d.nav[sec],
        lang,
        date: a.date,
      });
    }
  }
  return out;
}
