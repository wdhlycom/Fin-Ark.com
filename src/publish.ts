/**
 * 定时发布（scheduled publishing）
 *
 * 原理：静态站的产物在「构建那一刻」就定型了——某篇稿子是否在线，是由构建决定的，
 * 不是由访问决定的。所以「还没到发布日期」必须在构建期就把它从数据源里剔掉。
 *
 * 判定依据：文章 frontmatter 的 `date` 字段（YYYY-MM-DD）。
 *   date <= 构建日 → 正常上线
 *   date >  构建日 → 本轮构建直接丢弃：不进列表、不生成页面、不进 sitemap / llms.txt
 *
 * 构建日由 vite.config.ts 的 `define` 注入成常量 __PUBLISH_CUTOFF__（按香港时间算）。
 * 客户端 bundle 与服务端预渲染拿到的是同一个字面量——这一点很关键：
 * 如果客户端用 new Date() 实时判断，会出现「静态 HTML 里没有这篇、浏览器 hydration
 * 后突然冒出来」的闪烁，且爬到的是空壳页。
 *
 * 到点自动上线靠外部定时器（.github/workflows/publish-daily.yml）每天触发一次
 * Vercel 重新构建，不需要人工再上传任何东西。
 */
declare const __PUBLISH_CUTOFF__: string;

/** 香港无夏令时，固定 +8 即可。构建机是 UTC，不换算会把早上 8 点前的稿子压后一天。 */
const SITE_TZ_OFFSET_MIN = 8 * 60;

/**
 * 兜底值：仅在 __PUBLISH_CUTOFF__ 未被注入时生效
 * （例如直接跑 tsc / vitest，没有经过 Vite 的 define 替换）。
 */
const FALLBACK_CUTOFF = new Date(Date.now() + SITE_TZ_OFFSET_MIN * 60_000)
  .toISOString()
  .slice(0, 10);

/** 本轮构建的「今天」（YYYY-MM-DD，香港时区）。 */
export const PUBLISH_CUTOFF: string =
  typeof __PUBLISH_CUTOFF__ === 'string' ? __PUBLISH_CUTOFF__ : FALLBACK_CUTOFF;

/** 该文章是否已到发布日期。缺日期的文章一律放行，避免内容凭空消失。 */
export function isPublished(a: { date?: string }): boolean {
  if (!a.date) return true;
  // 统一成 YYYY-MM-DD 再比，容忍 frontmatter 里写成完整时间戳（2027-01-04T09:00:00Z）
  return a.date.slice(0, 10) <= PUBLISH_CUTOFF;
}

/** 批量过滤（保持原顺序）。 */
export function publishedOnly<T extends { date?: string }>(list: T[]): T[] {
  return list.filter(isPublished);
}
