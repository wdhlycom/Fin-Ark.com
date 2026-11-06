import {
  parsePath,
  setLangPrefix,
  withLang,
  viewToPath,
  articleToPath,
  LANGS,
  DEFAULT_LANG,
  type View,
} from './nav';
import { I18N, SECTIONS, type Article, type Lang, type SectionId } from './i18n';
import { AUTHOR, authorPersonNode } from './author';
import { SERIES_ORDER, seriesCopy } from './data/guardianSeries';

/** 视图是否为内容板块（用于判定文章页的 section 归属） */
const isSectionView = (v: View): v is SectionId => (SECTIONS as string[]).includes(v);

/**
 * 各板块的权威数据来源（citation 背书，E-E-A-T）。
 * 文章页 JSON-LD 挂 citation 指向这些官方机构，让搜索引擎知道内容有据可依。
 * 只列公开、稳定、非商业的监管/官方来源，不写具体公司名（与作者卡合规口径一致）。
 */
const SECTION_CITATIONS: Partial<Record<SectionId, { name: string; url: string }[]>> = {
  insurance: [{ name: '香港保险业监管局', url: 'https://www.ia.org.hk/' }],
  trust: [{ name: '香港金融管理局', url: 'https://www.hkma.gov.hk/' }],
  gold: [{ name: '香港金融管理局', url: 'https://www.hkma.gov.hk/' }],
  emerging: [{ name: '香港证监会', url: 'https://www.sfc.hk/' }],
  arkPilot: [{ name: '香港金融管理局', url: 'https://www.hkma.gov.hk/' }],
  guardian: [{ name: '香港保险业监管局', url: 'https://www.ia.org.hk/' }],
};

export type SeoLink = { rel: string; hreflang?: string; href: string };

/**
 * 计算某 URL 的 canonical + 各语言 hreflang alternate 描述符。
 * 纯函数，客户端（注入 <head>）与 SSR 预渲染（写入静态 HTML）共用同一套逻辑。
 *
 * 规则：
 * - canonical 指向自身（绝对 URL）。
 * - 文章页仅在该语言确有对应译文时才互链，避免把不存在的译文错误配对 / 产生死链。
 * - x-default 指向默认语言同页。
 */
export function seoLinkDescriptors(url: string, origin: string): SeoLink[] {
  const { lang, view, articleSlug } = parsePath(url);
  const safeLang: Lang = lang ?? DEFAULT_LANG;
  const links: SeoLink[] = [];

  links.push({ rel: 'canonical', href: origin + url });

  let currentId: string | undefined;
  if (articleSlug && isSectionView(view)) {
    const art = (I18N[safeLang].articles[view] ?? []).find(
      (a) => (a.slug ?? a.id) === articleSlug
    );
    currentId = art?.id;
  }

  for (const l of LANGS) {
    // 文章页：仅当目标语言确有该译文时才互链，否则跳过（不制造错误 alternate）
    if (articleSlug && isSectionView(view) && currentId) {
      const exists = (I18N[l].articles[view] ?? []).some((a) => a.id === currentId);
      if (!exists) continue;
    }
    // 板块页：目标语言该板块无实质内容（薄着陆页）不参与 hreflang 集群。
    // guardian 特殊：聚合页只渲染命中 SERIES_ORDER 的文章，es/ar 的独立翻译 id 不算内容。
    if (!articleSlug && isSectionView(view)) {
      const list = I18N[l].articles[view] ?? [];
      const empty =
        view === 'guardian'
          ? !list.some((a) => SERIES_ORDER.some((e) => e.id === a.id))
          : list.length === 0;
      if (empty) continue;
    }
    links.push({ rel: 'alternate', hreflang: l, href: origin + setLangPrefix(l, url) });
  }

  // x-default：默认语言同页（内容补齐后自然解析到对应语言）
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: origin + setLangPrefix(DEFAULT_LANG, url),
  });

  return links;
}

/** 将描述符序列化为 <link> 标签字符串（供 SSR 预渲染写入 <head>）。 */
export function seoLinkTags(url: string, origin: string): string {
  return seoLinkDescriptors(url, origin)
    .map((l) =>
      l.hreflang
        ? `<link rel="${l.rel}" hreflang="${l.hreflang}" href="${l.href}" />`
        : `<link rel="${l.rel}" href="${l.href}" />`
    )
    .join('\n');
}

/* ------------------------------------------------------------------ *
 * 页面级 SEO 元信息：title / description / Open Graph / Twitter / JSON-LD
 *
 * 背景：预渲染此前只注入 canonical + hreflang，<title> 与 <meta description>
 * 全站共用 index.html 模板中的同一句文案，导致 200+ 个页面标题、描述完全重复，
 * 搜索引擎无法区分各页主题，长尾词无法各自排名。
 *
 * 本模块按路由产出唯一元信息，客户端（App.tsx 动态写入 <head>）与构建期
 * 预渲染（scripts/prerender.mjs）共用同一套规则，避免两处逻辑漂移。
 * ------------------------------------------------------------------ */

/** 站点默认社交分享图（品牌 Logo）。当前为 720×720 透明背景方舟标记；建议后续另出 1200×630 分享图。 */
export const DEFAULT_OG_IMAGE = '/logo.png';

const OG_LOCALES: Record<Lang, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  es: 'es_ES',
  ar: 'ar_AR',
};

export type SeoMeta = {
  title: string;
  description: string;
  ogType: 'website' | 'article';
  image: string;
  jsonLd: Record<string, unknown>[];
  /** 薄内容页（如某语言某板块 0 篇文章的着陆页）：不收录，避免稀释站点质量信号 */
  noindex?: boolean;
};

/** 富文本安全截断：超长时尽量在句读处收尾，避免搜索结果出现半句话。 */
function clip(text: string, max = 155): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const boundaries = ['。', '！', '？', '；', '，', '、', '. ', '! ', '? ', '; ', ', '];
  const last = boundaries.reduce((acc, ch) => Math.max(acc, cut.lastIndexOf(ch)), -1);
  const body = last >= max * 0.6 ? cut.slice(0, last) : cut;
  return body.replace(/[，,、；;:：\s]+$/, '') + '…';
}

/** 按 slug（缺省回退 id）在当前语言的文章列表里查找译文。 */
const findArticle = (lang: Lang, section: SectionId, slug: string): Article | undefined =>
  (I18N[lang].articles[section] ?? []).find((a) => (a.slug ?? a.id) === slug);

/** 面包屑结构化数据：把「首页 → 板块 → 文章」层级显式告知搜索引擎。 */
function breadcrumbNode(
  origin: string,
  lang: Lang,
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: origin + withLang(lang, item.path),
    })),
  };
}

/**
 * 计算某 URL 的页面级 SEO 元信息（纯函数）。
 * 标题统一为「页面主题 | FIN-ARK」，主题取自该语言的数据层（文章标题 / 板块卡片 / 各页文案），
 * 因此每个语言、每个页面都得到独立且与内容一致的 title 与 description。
 */
export function seoMeta(url: string, origin: string): SeoMeta {
  const { lang, view, articleSlug } = parsePath(url);
  const safeLang: Lang = lang ?? DEFAULT_LANG;
  const d = I18N[safeLang];
  const brand = d.brand.name;
  const image = origin + DEFAULT_OG_IMAGE;
  const canonical = origin + url;
  const publisher = {
    '@type': 'Organization',
    name: brand,
    url: origin,
    logo: { '@type': 'ImageObject', url: image },
  };

  // ── 文章页 ────────────────────────────────────────────────────────
  if (articleSlug && isSectionView(view)) {
    const art = findArticle(safeLang, view, articleSlug);
    if (art) {
      const sectionLabel = d.nav[view];
      const description = clip(
        art.summary || [art.subtitle, art.body?.[0]?.p].filter(Boolean).join(' — ')
      );
      const isSeriesMember = view === 'guardian' && SERIES_ORDER.some((e) => e.id === art.id);
      const series = isSeriesMember ? seriesCopy(safeLang) : null;
      return {
        title: `${art.title} | ${brand}`,
        description,
        ogType: 'article',
        image,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: art.title,
            description,
            datePublished: art.date,
            dateModified: art.updated ?? art.date,
            inLanguage: safeLang,
            articleSection: sectionLabel,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            // 作者实体（E-E-A-T）：真名 Person，关联形象照与关于页
            author: authorPersonNode(origin, safeLang),
            publisher,
            image: [image],
            // 数据来源背书（citation 指向板块对应的官方监管机构）
            citation: (SECTION_CITATIONS[view] ?? []).map((s) => ({
              '@type': 'WebPage',
              name: s.name,
              url: s.url,
            })),
            ...(series
              ? {
                  isPartOf: {
                    '@type': 'CollectionPage',
                    name: series.name,
                    '@id': `${origin}${viewToPath(view)}`,
                  },
                }
              : {}),
          },
          breadcrumbNode(origin, safeLang, [
            { name: d.nav.home, path: '/' },
            { name: sectionLabel, path: viewToPath(view) },
            { name: art.title, path: articleToPath(view, art.slug ?? art.id) },
          ]),
        ],
      };
    }
  }

  // ── 板块页（港险学院 / 信托家办 / 黄金储备 / 新型资产 / 方舟视点 / 守护觉醒）──
  if (isSectionView(view)) {
    // 守护者觉醒：列表视图已是系列聚合页（hub），使用系列元信息 + CollectionPage JSON-LD
    if (view === 'guardian') {
      const s = seriesCopy(safeLang);
      // 仅统计真正属于系列的文章（id 命中 SERIES_ORDER）；es/ar 为独立翻译 id，聚合页实际渲染 0 卡
      const seriesArticles = (d.articles.guardian ?? []).filter((a) =>
        SERIES_ORDER.some((e) => e.id === a.id)
      );
      // 该语言无任何系列文章（es/ar）：薄着陆页 → noindex，不与 en 版抢同一关键词
      if (seriesArticles.length === 0) {
        return {
          title: `${s.name} · ${s.subtitle} | ${brand}`,
          description: clip(s.intro),
          ogType: 'website',
          image,
          noindex: true,
          jsonLd: [
            breadcrumbNode(origin, safeLang, [
              { name: d.nav.home, path: '/' },
              { name: d.nav.guardian, path: viewToPath(view) },
            ]),
          ],
        };
      }
      const hasPart = SERIES_ORDER.flatMap((e) => {
        const a = seriesArticles.find((x) => x.id === e.id);
        if (!a) return [];
        return [
          {
            '@type': 'Article',
            url: origin + articleToPath(view, a.slug ?? a.id),
            name: a.title,
            datePublished: a.date,
            author: { '@type': 'Person', name: AUTHOR.nameZh, alternateName: AUTHOR.nameEn },
          },
        ];
      });
      return {
        title: `${s.name} · ${s.subtitle} | ${brand}`,
        description: clip(s.intro),
        ogType: 'website',
        image,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: s.name,
            alternateName: safeLang === 'zh' ? 'The Awakening of the Guardian' : s.name,
            description: s.intro,
            url: canonical,
            inLanguage: safeLang,
            author: authorPersonNode(origin, safeLang),
            publisher,
            hasPart,
          },
          breadcrumbNode(origin, safeLang, [
            { name: d.nav.home, path: '/' },
            { name: d.nav.guardian, path: viewToPath(view) },
          ]),
        ],
      };
    }
    const card = d.cards.items.find((c) => c.id === view);
    const label = d.nav[view];
    const name = card?.title ?? label;
    const heading = card?.subtitle ? `${name}｜${card.subtitle}` : name;
    // 该板块的文章列表（供 CollectionPage + ItemList，让搜索引擎识别「这是文章集合」）
    const sectionArticles = d.articles[view] ?? [];
    const hasPart = sectionArticles.map((a) => ({
      '@type': 'Article',
      url: origin + articleToPath(view, a.slug ?? a.id),
      name: a.title,
      datePublished: a.date,
      author: { '@type': 'Person', name: AUTHOR.nameZh, alternateName: AUTHOR.nameEn },
    }));
    return {
      title: `${heading} | ${brand}`,
      description: clip(card?.summary ?? `${name} · ${d.brand.tagline}`),
      ogType: 'website',
      image,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: heading,
          description: clip(card?.summary ?? ''),
          url: canonical,
          inLanguage: safeLang,
          publisher,
          hasPart,
        },
        breadcrumbNode(origin, safeLang, [
          { name: d.nav.home, path: '/' },
          { name: label, path: viewToPath(view) },
        ]),
      ],
    };
  }

  // ── 资产地图 ──────────────────────────────────────────────────────
  if (view === 'assetmap') {
    return {
      title: `${d.nav.assetmap} | ${brand}`,
      description: clip(`${d.assetmap.matrixTitle} ${d.assetmap.disclaimer}`),
      ogType: 'website',
      image,
      jsonLd: [
        breadcrumbNode(origin, safeLang, [
          { name: d.nav.home, path: '/' },
          { name: d.nav.assetmap, path: viewToPath('assetmap') },
        ]),
      ],
    };
  }

  // ── 关于（含 FAQ 富媒体结果）───────────────────────────────────────
  if (view === 'about') {
    return {
      title: `${d.nav.about} | ${brand}`,
      description: clip(d.about.introBody),
      ogType: 'website',
      image,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: d.about.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        // 作者 Person 实体（E-E-A-T）：供 Google 跨页关联同一作者
        { '@context': 'https://schema.org', ...authorPersonNode(origin, safeLang) },
        breadcrumbNode(origin, safeLang, [
          { name: d.nav.home, path: '/' },
          { name: d.nav.about, path: viewToPath('about') },
        ]),
      ],
    };
  }

  // ── 案例 ──────────────────────────────────────────────────────────
  if (view === 'cases') {
    return {
      title: `${d.cases.title} | ${brand}`,
      description: clip(d.cases.subtitle),
      ogType: 'website',
      image,
      jsonLd: [
        breadcrumbNode(origin, safeLang, [
          { name: d.nav.home, path: '/' },
          { name: d.cases.title, path: viewToPath('cases') },
        ]),
      ],
    };
  }

  // ── 首页（其他未知视图也回退到首页元信息）─────────────────────────
  return {
    title: `${brand} ${d.brand.tagline}｜${d.hero.eyebrow}`,
    description: clip(d.hero.subtitle),
    ogType: 'website',
    image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand,
        alternateName: d.brand.tagline,
        url: origin,
        logo: { '@type': 'ImageObject', url: image },
        description: clip(d.hero.subtitle, 200),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: brand,
        url: origin,
        inLanguage: [...LANGS],
        publisher: { '@type': 'Organization', name: brand },
      },
    ],
  };
}

export type SeoHeadNode =
  | { tag: 'meta' | 'link'; attrs: Record<string, string> }
  | { tag: 'script'; attrs: Record<string, string>; text: string };

const escAttr = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * 页面级 <head> 节点描述（不含 <title>；标题由调用方用 seoMeta().title 设置）。
 * 同时供客户端（createElement 写入 head）与预渲染（序列化为字符串）消费。
 */
export function seoHeadNodes(url: string, origin: string): SeoHeadNode[] {
  const { title, description, ogType, image, jsonLd, noindex } = seoMeta(url, origin);
  const { lang } = parsePath(url);
  const safeLang: Lang = lang ?? DEFAULT_LANG;
  const canonical = origin + url;

  const nodes: SeoHeadNode[] = [
    { tag: 'meta', attrs: { name: 'description', content: description } },
  ];

  // 薄内容页：noindex + 不参与 hreflang 集群（canonical 保留，指向自身）
  if (noindex) {
    nodes.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } });
    nodes.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } });
  } else {
    nodes.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } });
    for (const l of seoLinkDescriptors(url, origin)) {
      if (l.rel !== 'canonical') {
        const attrs: Record<string, string> = { rel: l.rel, href: l.href };
        if (l.hreflang) attrs.hreflang = l.hreflang;
        nodes.push({ tag: 'link', attrs });
      }
    }
  }

  const openGraph: Record<string, string> = {
    'og:type': ogType,
    'og:site_name': I18N[safeLang].brand.name,
    'og:locale': OG_LOCALES[safeLang],
    'og:title': title,
    'og:description': description,
    'og:url': canonical,
    'og:image': image,
  };
  for (const [property, content] of Object.entries(openGraph)) {
    nodes.push({ tag: 'meta', attrs: { property, content } });
  }

  const twitter: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
  for (const [name, content] of Object.entries(twitter)) {
    nodes.push({ tag: 'meta', attrs: { name, content } });
  }

  for (const node of jsonLd) {
    nodes.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // 内联进 HTML 的 JSON 必须转义 `<`，否则可能被解析为标签闭合
      text: JSON.stringify(node).replace(/</g, '\\u003c'),
    });
  }

  return nodes;
}

/** 序列化为完整 <head> 片段字符串（构建期预渲染写入静态 HTML 用）。 */
export function seoHeadTags(url: string, origin: string): string {
  const { title } = seoMeta(url, origin);
  const lines = [`<title>${escAttr(title)}</title>`];
  for (const node of seoHeadNodes(url, origin)) {
    const attrs = Object.entries(node.attrs)
      .map(([k, v]) => `${k}="${escAttr(v)}"`)
      .join(' ');
    if (node.tag === 'script') {
      lines.push(`<script ${attrs}>${node.text}</script>`);
    } else {
      // data-seo 标记：客户端路由切换时可整批清除后重建，避免标签堆积
      lines.push(`<${node.tag} ${attrs} data-seo />`);
    }
  }
  return lines.join('\n');
}
