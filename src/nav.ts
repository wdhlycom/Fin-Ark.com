import type { SectionId } from './i18n';

export type View = 'home' | SectionId | 'assetmap' | 'about' | 'cases';

/**
 * 视图 → 真实路径（History API / 干净 URL）。
 * 利于 SEO：Google 可抓取每个栏目与文章页，sitemap 也能用绝对路径列出。
 */
export const viewToPath = (v: View): string => {
  if (v === 'home') return '/';
  if (v === 'assetmap') return '/assetmap';
  if (v === 'about') return '/about';
  if (v === 'cases') return '/cases';
  return `/s/${v}`;
};

/** 文章详情 → 真实路径（深链 + 可被搜索引擎抓取） */
export const articleToPath = (section: SectionId, id: string): string =>
  `/a/${section}/${encodeURIComponent(id)}`;

export type ParsedPath = { view: View; articleId?: string };

/**
 * URL 路径 → 视图（首屏加载 / popstate 时使用）。
 * 假设站点部署在域名根（Vite base 默认 '/'）。若部署在子路径，需要在此去掉 base 前缀。
 */
export const parsePath = (raw: string): ParsedPath => {
  const path = raw.split('?')[0].replace(/\/+$/, '');
  const h = path === '' ? '/' : path;
  if (h === '/') return { view: 'home' };
  if (h === '/assetmap') return { view: 'assetmap' };
  if (h === '/about') return { view: 'about' };
  if (h === '/cases') return { view: 'cases' };
  const section = h.match(/^\/s\/([\w-]+)$/);
  if (section) return { view: section[1] as SectionId };
  const article = h.match(/^\/a\/([\w-]+)\/(.+)$/);
  if (article) return { view: article[1] as SectionId, articleId: decodeURIComponent(article[2]) };
  return { view: 'home' };
};

/** 修饰键 / 非左键点击 → 放行浏览器默认行为（新标签页 / 中键等，真实路径可被原生打开） */
export const isModifiedClick = (e: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}): boolean =>
  e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
