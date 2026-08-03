import type { SectionId } from './i18n';

export type View = 'home' | SectionId | 'assetmap' | 'about' | 'cases';

/**
 * 顶层板块（URL 不含 /s/ 冗余层级，路径即 /<lang>/<section>）。
 * 港险学院 / 守护觉醒 / 方舟试点 作为站点一级栏目，使用简洁 URL；
 * 其余板块（trust/gold/emerging）仍沿用 /<lang>/s/<section> 结构。
 */
export const CLEAN_SECTIONS = new Set<SectionId>(['insurance', 'guardian', 'arkPilot']);

/** 支持的语言（顺序即优先级参考） */
export const LANGS = ['zh', 'en', 'es', 'ar'] as const;
export type LangCode = (typeof LANGS)[number];
export const DEFAULT_LANG: LangCode = 'zh';
const SUPPORTED = new Set<string>(LANGS);

export const isLang = (s: string | null | undefined): s is LangCode =>
  !!s && SUPPORTED.has(s);

/**
 * 拆分语言前缀与内部路径。
 * 返回 [lang | null, innerPath]；innerPath 永远以 `/` 开头（根 = '/'）。
 */
export function splitLang(path: string): [LangCode | null, string] {
  const clean = path.split('?')[0].replace(/\/+$/, '') || '/';
  const seg = clean.split('/').filter(Boolean);
  if (seg.length && isLang(seg[0])) {
    const inner = '/' + seg.slice(1).join('/');
    return [seg[0], inner === '' ? '/' : inner];
  }
  return [null, clean];
}

/** 给裸路径补上语言前缀（已带前缀则原样返回），保证每个语言拥有独立 URL。 */
export function withLang(lang: LangCode, path: string): string {
  const [existing] = splitLang(path);
  if (existing) return path; // 已带语言前缀
  const [, inner] = splitLang(path);
  return inner === '/' ? `/${lang}` : `/${lang}${inner}`;
}

/**
 * 始终将路径的语言段设为指定 lang（覆盖已有前缀，或缺失时补上）。
 * 用于 hreflang 互链与「切换语言后的目标 URL」——这类场景需要的是「改语言」而非「仅补前缀」，
 * 因此不能用 withLang（withLang 在已带前缀时会原样返回，导致互链指向错误语言）。
 */
export function setLangPrefix(lang: LangCode, path: string): string {
  const [, inner] = splitLang(path);
  return inner === '/' ? `/${lang}` : `/${lang}${inner}`;
}

/**
 * 视图（无语言）→ 裸路径。真实对外 URL 由 withLang(lang, ...) 补全语言前缀。
 * 利于 SEO：每个栏目 / 文章页都有 /<lang>/ 开头的独立、可抓取路径。
 */
export const viewToPath = (v: View): string => {
  if (v === 'home') return '/';
  if (v === 'assetmap') return '/assetmap';
  if (v === 'about') return '/about';
  if (v === 'cases') return '/cases';
  if (CLEAN_SECTIONS.has(v as SectionId)) return `/${v}`;
  return `/s/${v}`;
};

/** 文章详情 → 裸路径（深链 + 可被搜索引擎抓取）。slug 默认为文章 id。 */
export const articleToPath = (section: SectionId, slug: string): string =>
  `/a/${section}/${encodeURIComponent(slug)}`;

export type ParsedPath = {
  /** 语言前缀；null 表示旧链接 / 根路径（未带语言），需由 App 重定向补全 */
  lang: LangCode | null;
  view: View;
  /** 文章 URL slug（= 自定义 slug 或 id），用于匹配对应语言文档 */
  articleSlug?: string;
};

/**
 * URL 路径 → 视图（首屏加载 / popstate 时使用）。
 * 同时兼容「带语言前缀」与「旧裸路径」两种形态。
 */
export const parsePath = (raw: string): ParsedPath => {
  const [lang, p] = splitLang(raw);
  const h = p === '' ? '/' : p;
  if (h === '/') return { lang, view: 'home' };
  if (h === '/assetmap') return { lang, view: 'assetmap' };
  if (h === '/about') return { lang, view: 'about' };
  if (h === '/cases') return { lang, view: 'cases' };
  const section = h.match(/^\/s\/([\w-]+)$/);
  if (section) return { lang, view: section[1] as SectionId };
  // 顶层板块的简洁 URL：/<section>（无 /s/），如 /insurance、/guardian、/arkPilot
  const cleanSection = h.match(/^\/([\w-]+)$/);
  if (cleanSection && CLEAN_SECTIONS.has(cleanSection[1] as SectionId))
    return { lang, view: cleanSection[1] as SectionId };
  const article = h.match(/^\/a\/([\w-]+)\/(.+)$/);
  if (article)
    return { lang, view: article[1] as SectionId, articleSlug: decodeURIComponent(article[2]) };
  return { lang, view: 'home' };
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

/**
 * 自动语言偏好检测：优先已保存偏好，其次浏览器 Accept-Language（navigator.languages），
 * 最后回退默认语言。用于首访自动跳转至对应语言版本。
 */
export function detectLang(preferred?: readonly string[]): LangCode {
  try {
    const stored =
      typeof localStorage !== 'undefined' ? localStorage.getItem('finark-lang') : null;
    if (isLang(stored)) return stored;
  } catch {
    /* localStorage 不可用时忽略 */
  }
  const list =
    preferred && preferred.length
      ? preferred
      : typeof navigator !== 'undefined'
        ? navigator.languages
        : [];
  for (const l of list) {
    const code = String(l).toLowerCase().split('-')[0];
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}
