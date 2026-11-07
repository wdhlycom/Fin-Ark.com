import type { Lang } from '../i18n/types';

/**
 * 主题聚合页（Topic Hub）—— 单一数据来源。
 *
 * 为什么建这个：GSC 数据显示「黄金储存 / 信托传承」等具体意图词有高展示但排名靠后
 * （gold storage hong kong 排 23、保险信托 排 30、fiduciary services 排 72），
 * 根因是这些词的流量散落在单篇孤岛文章上，没有一张「主题页」把相关文章聚成一个主题集群，
 * Google 无法判断站内有系统性内容。专题页用精准 title + 聚合内链 + CollectionPage 结构化数据，
 * 命中长尾词的搜索意图，同时把权重在集群内传递。
 *
 * 与板块页（/s/gold 等泛分类）的区别：
 * 板块页是「泛分类」（黄金储备），匹配大词；专题页是「精准意图」（黄金怎么存/存哪），匹配长尾词。
 * 两者不冲突，专题页是板块页的细分增强。
 */

export type TopicPage = {
  /** 站点内唯一 id（= URL 路径段，如 'gold-storage'） */
  id: string;
  /** 归属板块（用于取主题色 / 卡片样式） */
  section: 'gold' | 'trust' | 'insurance' | 'emerging';
  /** 聚合的文章 id 列表（跨语言用同一 id 配对，与全站约定一致） */
  articleIds: string[];
};

export type TopicCopy = {
  /** 导航标签（短） */
  nav: string;
  /** H1 标题（含目标关键词） */
  title: string;
  /** 副标题 / 栏目标签 */
  subtitle: string;
  /** 导语（150–250 字，直接回答「这页讲什么、读者能得到什么」） */
  intro: string;
  /** meta description（独立成立，不回显标题） */
  description: string;
};

/** 全站已注册的主题页（后续加专题只在这里追加，无需改代码） */
export const TOPIC_PAGES: TopicPage[] = [
  {
    id: 'gold-storage',
    section: 'gold',
    articleIds: [
      'gold-where-to-store',
      'gold-paper-vs-physical',
      'gold-5-percent',
      'gold-is-insurance-not-investment',
      'hk-gold-hub-strategy',
      'hk-vs-shuibei-gold',
      'hk-tokenized-gold-market',
      'hk-tokenized-gold-what',
      'emerging-btc-digital-gold',
    ],
  },
  {
    id: 'trust-succession',
    section: 'trust',
    articleIds: [
      'trust-vs-insurance-vs-will',
      'trust-threshold',
      'trust-poor-man-version',
      'trust-china-family-office',
      'trust-vcc-cost',
      'hk-policy-split-inheritance',
      'wealth-inheritance-trust-solution',
      'cross-generational-firewall',
    ],
  },
];

/** 构建期护栏：主题 id 不重复、每个主题至少 1 篇文章。 */
{
  const ids = TOPIC_PAGES.map((t) => t.id);
  if (new Set(ids).size !== ids.length) throw new Error('[topicPages] duplicate topic id');
  for (const t of TOPIC_PAGES) {
    if (t.articleIds.length === 0) throw new Error(`[topicPages] topic "${t.id}" has no articles`);
  }
}

/** 按 id 查主题页。 */
export function getTopicPage(id: string): TopicPage | undefined {
  return TOPIC_PAGES.find((t) => t.id === id);
}

/** 主题页文案（按语言；es/ar 回退 en，与全站多语言约定一致）。 */
export function topicCopy(id: string, lang: Lang): TopicCopy {
  const zh = lang === 'zh';
  const table: Record<string, { zh: TopicCopy; en: TopicCopy }> = {
    'gold-storage': {
      zh: {
        nav: '黄金储存',
        title: '黄金怎么存才安全？香港 vs 新加坡 vs 家中，实物黄金储存全攻略',
        subtitle: '黄金专题 · 实物本位 · 地理分散',
        intro:
          '买了实物黄金，最后一步也是最关键的一步是「存哪儿」。放家里怕盗怕灾，放银行又牵扯到「这家银行、这个司法辖区是否稳定」。本专题把黄金储存拆成三个问题一次讲清：纸黄金和实物金条的风控差异、香港与新加坡两地存金的优劣、以及家庭该留多少实物黄金兜底。',
        description:
          '实物黄金储存全攻略：香港银行保险箱 vs 新加坡自由港金库怎么选，纸黄金与实物金条的风控差异，家庭该留多少黄金兜底。',
      },
      en: {
        nav: 'Gold Storage',
        title: 'Where to Store Physical Gold Safely: Hong Kong vs Singapore Vaults vs Home',
        subtitle: 'Gold Topic · Physical Standard · Geographic Diversification',
        intro:
          'The last mile of physical gold is storage. At home, you fear theft and disaster; in a bank safe, you question whether the bank and jurisdiction are stable. This topic breaks gold storage into three questions answered in one place: paper gold vs physical bullion risk, Hong Kong vs Singapore custody, and how much physical gold a family should hold as a floor.',
        description:
          'A complete guide to physical gold storage: Hong Kong bank vaults vs Singapore free-port vaults, paper gold vs physical bullion risk, and how much gold to hold.',
      },
    },
    'trust-succession': {
      zh: {
        nav: '信托传承',
        title: '信托、保险、遗嘱怎么选？家族财富传承工具对比与门槛',
        subtitle: '信托专题 · 传承隔离 · 债务防火墙',
        intro:
          '「要不要设信托」是离岸资产配置里最常被问、也最容易被话术带偏的问题。本专题把三种传承工具（信托 / 保险 / 遗嘱）放一起对比，讲清各自的效率、边界与适用门槛，并回答两个真问题：资产到多少才需要信托，以及港险凭什么被称为「穷人版家族信托」。',
        description:
          '家族财富传承工具对比：信托、保险、遗嘱各自的效率与边界，资产到多少才需要信托，港险如何实现传承隔离。',
      },
      en: {
        nav: 'Trust & Succession',
        title: 'Trust vs Insurance vs Will: Choosing the Right Wealth Succession Tool',
        subtitle: 'Trust Topic · Succession Isolation · Debt Firewall',
        intro:
          '"Do I need a trust?" is the most-asked and most-misled question in offshore asset planning. This topic compares the three succession tools—trust, insurance, and will—side by side, clarifies their efficiency, boundaries, and entry thresholds, and answers two real questions: at what asset level does a trust become necessary, and why a Hong Kong policy is called the "poor man\'s family trust."',
        description:
          'Comparing trust, insurance, and will for family wealth succession: efficiency, boundaries, entry thresholds, and how HK insurance enables succession isolation.',
      },
    },
  };
  const entry = table[id];
  if (!entry) {
    // 未配置文案的主题：回退到最接近的英文文案，避免构建崩溃
    const fallback = Object.values(table)[0].en;
    return fallback;
  }
  return zh ? entry.zh : entry.en;
}

/** 主题页 URL 路径（裸路径，由 withLang 补语言前缀），如 /gold-storage */
export const topicToPath = (id: string): string => `/${id}`;
