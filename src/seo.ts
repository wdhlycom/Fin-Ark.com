import { parsePath, setLangPrefix, LANGS, DEFAULT_LANG, type View } from './nav';
import { I18N, SECTIONS, type Lang, type SectionId } from './i18n';

/** 视图是否为内容板块（用于判定文章页的 section 归属） */
const isSectionView = (v: View): v is SectionId => (SECTIONS as string[]).includes(v);

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
