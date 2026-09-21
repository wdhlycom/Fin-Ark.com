import type { Lang } from '../i18n/types';

/**
 * 「守护者的觉醒」系列数据（单一来源）。
 * - SERIES_ORDER：篇间导航与 CollectionPage hasPart 的全集顺序（创作编号 01–30，番外 01–06 收尾）。
 * - seriesPartCopy()：聚合页四辑主题聚类（每辑标题统一五字），按语言取文案。
 * id 与 content/<lang>/*.md 的文件名（即文章 id）一致；zh/en 各 36 篇，一一对应。
 * es/ar 无 guardian 内容，文案层回退 en 即可。
 */

export type SeriesEntry = { id: string; kind: 'main' | 'extra'; num: number };

/** 全系列阅读顺序（篇间导航与 JSON-LD hasPart 共用）。 */
export const SERIES_ORDER: SeriesEntry[] = [
  { id: 'wealth-ark-uncertain-era', kind: 'main', num: 1 },
  { id: 'mass-extinction-survival-guide', kind: 'main', num: 2 },
  { id: 'wealth-foundation-is-force', kind: 'main', num: 3 },
  { id: 'banality-evil-wealth-shrink', kind: 'main', num: 4 },
  { id: 'civilization-bull-bear-cycle', kind: 'main', num: 5 },
  { id: 'offshore-mindset-primer', kind: 'main', num: 6 },
  { id: 'low-trust-defense-strategy', kind: 'main', num: 7 },
  { id: 'hongkong-antifragile-first-stop', kind: 'main', num: 8 },
  { id: 'rmb-rate-hidden-erosion', kind: 'main', num: 9 },
  { id: 'hk-linked-rate-stability', kind: 'main', num: 10 },
  { id: 'credit-money-endgame-gold-dollar', kind: 'main', num: 11 },
  { id: 'uk-gilt-safety-illusion', kind: 'main', num: 12 },
  { id: 'buy-borrow-die-policy-financing', kind: 'main', num: 13 },
  { id: 'family-office-core-logic', kind: 'main', num: 14 },
  { id: 'tax-planning-crs-era', kind: 'main', num: 15 },
  { id: 'certain-arbitrage-rate-spread', kind: 'main', num: 16 },
  { id: 'single-asset-death-trap', kind: 'main', num: 17 },
  { id: 'fund-industry-harvest-trap', kind: 'main', num: 18 },
  { id: 'cyclical-investing-iron-rule', kind: 'main', num: 19 },
  { id: 'wealth-inheritance-trust-solution', kind: 'main', num: 20 },
  { id: 'hongkong-bank-account-pass', kind: 'main', num: 21 },
  { id: 'usd-policy-legal-shield', kind: 'main', num: 22 },
  { id: 'talent-visa-asset-strategy', kind: 'main', num: 23 },
  { id: 'antifragile-portfolio-blueprint', kind: 'main', num: 24 },
  { id: 'offshore-account-lifecycle', kind: 'main', num: 25 },
  { id: 'fx-dividend-cross-hedge', kind: 'main', num: 26 },
  { id: 'cross-generational-firewall', kind: 'main', num: 27 },
  { id: 'asset-checkup-ten-metrics', kind: 'main', num: 28 },
  { id: 'fellow-travelers-expert-branding', kind: 'main', num: 29 },
  { id: 'next-decade-wealth-guard', kind: 'main', num: 30 },
  { id: 'cz-zhao-wealth-freedom', kind: 'extra', num: 1 },
  { id: 'justin-sun-survival-tactics', kind: 'extra', num: 2 },
  { id: 'li-ka-shing-wealth-migration', kind: 'extra', num: 3 },
  { id: 'zhang-yiming-borderless-architecture', kind: 'extra', num: 4 },
  { id: 'chen-tianqiao-brain-science', kind: 'extra', num: 5 },
  { id: 'duan-yongping-big-elephant', kind: 'extra', num: 6 },
];

/** 校验：顺序表无重复 id 且总数 36（构建期护栏，防 MD 增删后遗漏维护）。 */
{
  const ids = SERIES_ORDER.map((e) => e.id);
  if (new Set(ids).size !== ids.length) throw new Error('[guardianSeries] duplicate id in SERIES_ORDER');
}

export type SeriesPartCopy = {
  label: string;
  title: string;
  desc: string;
  ids: string[];
};

/** 四辑主题聚类（按语言取；es/ar 回退 en）。 */
export function seriesPartCopy(lang: Lang): SeriesPartCopy[] {
  const zh = lang === 'zh';
  const en = !zh;
  return [
    {
      label: zh ? '第一辑' : 'Vol. I',
      title: '财富观觉醒',
      titleEn: 'Awakening Mindset',
      desc: zh
        ? '不确定时代的财富底层逻辑：从反脆弱启蒙到低信任防御，重建守富的世界观。'
        : 'The underlying logic of wealth in uncertain times: from antifragility to low-trust defense.',
      ids: [
        'wealth-ark-uncertain-era',
        'mass-extinction-survival-guide',
        'wealth-foundation-is-force',
        'banality-evil-wealth-shrink',
        'civilization-bull-bear-cycle',
        'offshore-mindset-primer',
        'low-trust-defense-strategy',
      ],
    },
    {
      label: zh ? '第二辑' : 'Vol. II',
      title: '离岸与香港',
      titleEn: 'Offshore & Hong Kong',
      desc: zh
        ? '为什么香港是中国人对抗不确定性的第一站：汇率、货币终局与离岸落地的完整路径。'
        : 'Why Hong Kong is the first line of defense: FX regimes, monetary endgame, and the offshore landing path.',
      ids: [
        'hongkong-antifragile-first-stop',
        'rmb-rate-hidden-erosion',
        'hk-linked-rate-stability',
        'credit-money-endgame-gold-dollar',
        'uk-gilt-safety-illusion',
        'hongkong-bank-account-pass',
        'talent-visa-asset-strategy',
        'offshore-account-lifecycle',
      ],
    },
    {
      label: zh ? '第三辑' : 'Vol. III',
      title: '名人启示录',
      titleEn: 'Lessons from Titans',
      desc: zh
        ? '六位顶级财富样本：CZ、孙宇晨、李嘉诚、张一鸣、陈天桥、段永平的真实生存与配置策略。'
        : 'Six real-world wealth blueprints: CZ, Justin Sun, Li Ka-shing, Zhang Yiming, Chen Tianqiao, Duan Yongping.',
      ids: [
        'cz-zhao-wealth-freedom',
        'justin-sun-survival-tactics',
        'li-ka-shing-wealth-migration',
        'zhang-yiming-borderless-architecture',
        'chen-tianqiao-brain-science',
        'duan-yongping-big-elephant',
      ],
    },
    {
      label: zh ? '第四辑' : 'Vol. IV',
      title: '工具与架构',
      titleEn: 'Tools & Architecture',
      desc: zh
        ? '从保单融资、家族信托到 CRS 筹划与资产体检：把守护财富落成可执行的架构。'
        : 'From policy financing and trusts to CRS planning and asset checkups: executable architectures.',
      ids: [
        'buy-borrow-die-policy-financing',
        'family-office-core-logic',
        'tax-planning-crs-era',
        'certain-arbitrage-rate-spread',
        'single-asset-death-trap',
        'fund-industry-harvest-trap',
        'cyclical-investing-iron-rule',
        'wealth-inheritance-trust-solution',
        'usd-policy-legal-shield',
        'antifragile-portfolio-blueprint',
        'fx-dividend-cross-hedge',
        'cross-generational-firewall',
        'asset-checkup-ten-metrics',
        'fellow-travelers-expert-branding',
        'next-decade-wealth-guard',
      ],
    },
  ].map((p) => ({ label: p.label, title: en ? p.titleEn : p.title, desc: p.desc, ids: p.ids }));
}

/** 系列级多语言文案。 */
export function seriesCopy(lang: Lang) {
  const zh = lang === 'zh';
  return {
    name: zh ? '守护者的觉醒' : 'The Awakening of the Guardian',
    tag: zh ? '财富守护系列' : 'Wealth Guardian Series',
    subtitle: zh ? '不确定时代的财富守护' : 'Guarding family wealth in an uncertain era',
    intro: zh
      ? '不确定时代，如何守护家庭财富不缩水、不冻结、不被传承卡住？本系列 30 讲主线加 6 篇名人番外，从一位深耕保险业十余年的从业者视角，把「守富」这件事从世界观讲到可落地的架构。'
      : "How do you keep family wealth from shrinking, freezing, or getting stuck in succession? Thirty main chapters plus six profiles of wealthy titans — a practitioner's field guide to defending wealth, from worldview to executable architecture.",
    prevLabel: zh ? '上一篇' : 'Previous',
    nextLabel: zh ? '下一篇' : 'Next',
    backToSeries: zh ? '返回系列目录' : 'Back to series',
    moreLabel: zh ? '更多相关文章' : 'More articles',
    statsArticles: zh ? '篇文章' : 'articles',
    statsParts: zh ? '个分辑' : 'volumes',
  };
}

/** 编号显示：主线 01–30，番外按语言显示「番外05 / Extra 05」。 */
export function formatSeriesNum(entry: SeriesEntry, lang: Lang): string {
  const pad = String(entry.num).padStart(2, '0');
  if (entry.kind === 'extra') return lang === 'zh' ? `番外${pad}` : `Extra ${pad}`;
  return pad;
}
