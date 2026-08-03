// articleCategory.ts
// 文章语义分类 → 专有主题色（仅用于《港险学院》insurance 与《方舟视点》arkPilot 卡片）
// 卡片主背景保持统一暗色；此模块只提供「分类标签 pill」与「左侧 accent 边框」的颜色。
//
// 分类可被 content/<lang>/*.md 的 frontmatter `category:` 显式覆盖；
// 未指定时按文件名/标题语义关键词自动归类（deriveCategory）。

import { type Lang } from './i18n/types';

export type CategoryKey = 'mainland' | 'offshore' | 'macro' | 'qa';

export const CATEGORY_THEME: Record<CategoryKey, {
  labels: Record<Lang, string>;
  border: string; // 左侧 accent 边框 + 圆点
  pillBg: string; // pill 徽章底色（半透明）
  pillText: string; // pill 文字色
  hint: string; // 语义说明（调试/未来用）
}> = {
  // 内地信号塔：政策与本土确定性 —— 琥珀金/暖棕
  mainland: {
    labels: { zh: '内地信号塔', en: 'Mainland Beacon', es: 'Faro Continental', ar: 'منارة برية' },
    border: '#f59e0b',
    pillBg: 'rgba(245,158,11,0.15)',
    pillText: '#fcd34d',
    hint: '政策与本土确定性',
  },
  // 离岸罗盘：离岸与全球视野 —— 深海蓝/冰蓝
  offshore: {
    labels: { zh: '离岸罗盘', en: 'Offshore Compass', es: 'Brújula Offshore', ar: 'بوصلة خارجية' },
    border: '#22d3ee',
    pillBg: 'rgba(34,211,238,0.15)',
    pillText: '#67e8f9',
    hint: '离岸与全球视野',
  },
  // 宏观望远镜：大周期与深远观察 —— 极光紫
  macro: {
    labels: { zh: '宏观望远镜', en: 'Macro Lens', es: 'Lente Macroeconómica', ar: 'عدسة كلية' },
    border: '#a855f7',
    pillBg: 'rgba(168,85,247,0.15)',
    pillText: '#c4b5fd',
    hint: '大周期与深远观察',
  },
  // 方舟问答：轻量解答与互动 —— 薄荷绿/青灰
  qa: {
    labels: { zh: '方舟问答', en: 'Ark Q&A', es: 'Ark Preguntas', ar: 'أسئلة آرك' },
    border: '#34d399',
    pillBg: 'rgba(52,211,153,0.15)',
    pillText: '#6ee7b7',
    hint: '轻量解答与互动',
  },
};

// 取当前语言的分类标签；缺失时回退中文。
export function categoryLabel(key: CategoryKey, lang: Lang): string {
  return CATEGORY_THEME[key].labels[lang] ?? CATEGORY_THEME[key].labels.zh;
}

// 仅这两个板块使用语义分类配色
export const CATEGORIZED_SECTIONS = new Set(['insurance', 'arkPilot']);

export function deriveCategory(article: {
  id: string;
  title?: string;
  category?: string;
}): CategoryKey | null {
  // 1) 显式覆盖优先
  if (article.category && (article.category in CATEGORY_THEME)) {
    return article.category as CategoryKey;
  }
  // 2) 关键词自动归类（顺序即优先级）
  const s = `${article.id} ${article.title ?? ''}`.toLowerCase();

  // 方舟问答：年度回顾 / 答疑 / 问答
  if (/year-review|年度回顾|问答|答疑|ask|question|faq|q&a/.test(s)) return 'qa';

  // 内地信号塔：内地 / 房产 / 人民币 / 存款 / 税 / 年金 / 增额寿 / 中国
  if (/mainland|内地|房产|property|rmb|人民币|存款|deposit|税|tax|年金|annuity|增额终身寿|wholelife|中国|china|\bcn\b/.test(s))
    return 'mainland';

  // 宏观望远镜：复利 / IRR / 利率 / 框架 / 金价 / 日本失去30年 / 周期 / 趋势
  // 注意：不含泛化 "rate"，避免 dividend-rate 等离岸文章被误归宏观
  if (/compound|irr|利率|框架|framework|config|金价|gold-high|日本|japan|周期|cycle|趋势|trend/.test(s))
    return 'macro';

  // 离岸罗盘：香港 / 新加坡 / 美国 / 离岸 / 多元货币 / 投保 / 理赔 / 保单融资 / 分红 / 信托 等
  if (/offshore|离岸|hk|香港|sg|新加坡|us|美国|多元货币|multi-currency|投保|application|理赔|claims|保单融资|premium-financ|拆分|split|市场|market|为什么|why-choose|分红|dividend|crs|信托|trust/.test(s))
    return 'offshore';

  // 未匹配 → 中性（不显示分类）
  return null;
}
