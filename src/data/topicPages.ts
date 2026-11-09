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

/** 主题页文案（按语言；es/ar 缺失时回退 en，与全站多语言约定一致）。 */
export function topicCopy(id: string, lang: Lang): TopicCopy {
  const table: Record<string, Partial<Record<Lang, TopicCopy>>> = {
    'gold-storage': {
      zh: {
        nav: '黄金储存',
        title: '黄金怎么存才安全？香港 vs 新加坡 vs 家中，实物黄金储存全攻略',
        subtitle: '黄金专题 · 实物本位 · 地理分散',
        intro:
          '买了实物黄金，最后一步也是最关键的一步是「存哪儿」。放家里怕盗怕灾，放银行又牵扯到「这家银行、这个司法辖区是否稳定」。本专题把黄金储存拆成三个问题一次讲清：纸黄金和实物金条的风控差异、香港与新加坡两地存金的优劣、以及家庭该留多少实物黄金兜底。',
        description:
          '实物黄金买完之后最关键是存哪儿：家里自存、银行保险箱、香港与新加坡金库各有什么风险？本专题对比纸黄金与实物金条的风控差异，讲清跨司法辖区分散保管的操作要点，以及家庭该留多少实物黄金兜底、取用与继承会受哪些限制。',
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
      es: {
        nav: 'Almacenamiento de Oro',
        title: '¿Dónde guardar el oro físico con seguridad? Hong Kong, Singapur o en casa',
        subtitle: 'Tema de Oro · Patrón Físico · Diversificación Geográfica',
        intro:
          'El último paso del oro físico es el más crítico: dónde guardarlo. En casa temes el robo y los desastres; en una caja bancaria te preguntas si ese banco y esa jurisdicción son estables. Este tema resuelve el almacenamiento de oro en tres preguntas: oro papel frente a lingotes físicos, custodia en Hong Kong frente a Singapur, y cuánto oro físico debería mantener una familia como colchón.',
        description:
          'Dónde guardar oro físico: cajas bancarias de Hong Kong vs bóvedas de Singapur, oro papel vs lingotes, y cuánto oro conviene mantener como colchón.',
      },
      ar: {
        nav: 'تخزين الذهب',
        title: 'أين تخزّن الذهب المادي بأمان؟ هونغ كونغ أم سنغافورة أم المنزل',
        subtitle: 'موضوع الذهب · المعيار المادي · التنويع الجغرافي',
        intro:
          'الخطوة الأخيرة في امتلاك الذهب المادي هي الأهم: أين تخزّنه. في المنزل تخشى السرقة والكوارث، وفي صندوق البنك تتساءل عن استقرار ذلك البنك وتلك الولاية القضائية. يتناول هذا الموضوع تخزين الذهب عبر ثلاثة أسئلة: الذهب الورقي مقابل السبائك المادية، الحفظ في هونغ كونغ مقابل سنغافورة، وكم ينبغي أن تحتفظ العائلة من ذهب مادي كقاعدة أساس.',
        description:
          'دليل شامل لتخزين الذهب المادي: خزائن بنوك هونغ كونغ مقابل خزائن سنغافورة، الذهب الورقي مقابل السبائك المادية، وكم ينبغي الاحتفاظ من الذهب.',
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
          '要不要设家族信托，是离岸配置里最常被问、也最容易被话术带偏的问题。本专题把信托、保险、遗嘱三种传承工具放在一起对比，讲清各自的效率、边界与设立门槛，回答资产到多少才值得设信托，以及港险的保单拆分与更换受保人如何实现传承隔离。',
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
      es: {
        nav: 'Fideicomiso y Sucesión',
        title: '¿Fideicomiso, seguro o testamento? Cómo elegir la herramienta de sucesión patrimonial',
        subtitle: 'Tema de Fideicomiso · Aislamiento Sucesorio · Cortafuegos de Deuda',
        intro:
          '«¿Necesito un fideicomiso?» es la pregunta más frecuente y la más manipulada en la planificación patrimonial offshore. Este tema compara las tres herramientas —fideicomiso, seguro y testamento—, aclara su eficiencia, sus límites y sus umbrales de entrada, y responde dos preguntas reales: a partir de qué nivel de patrimonio conviene un fideicomiso, y por qué un seguro de Hong Kong se conoce como «el fideicomiso familiar de los pobres».',
        description:
          'Comparativa de sucesión: fideicomiso, seguro y testamento — eficiencia, límites, umbral de patrimonio y cómo el seguro de Hong Kong aísla la herencia.',
      },
      ar: {
        nav: 'الصندوق والميراث',
        title: 'صندوق ائتماني أم تأمين أم وصية؟ اختيار أداة توريث الثروة المناسبة',
        subtitle: 'موضوع الصندوق · عزل الوراثة · جدار حماية الديون',
        intro:
          '«هل أحتاج صندوقاً ائتمانياً؟» هو السؤال الأكثر تكراراً والأسرع تضليلاً في التخطيط الخارجي للأصول. يقارن هذا الموضوع الأدوات الثلاث —الصندوق والتأمين والوصية— جنباً إلى جنب، ويوضح كفاءتها وحدودها وعتبات الدخول إليها، ويجيب عن سؤالين حقيقيين: عند أي مستوى من الأصول يصبح الصندوق ضرورياً، ولماذا يوصف تأمين هونغ كونغ بأنه «الصندوق العائلي للفقراء».',
        description:
          'مقارنة أدوات توريث الثروة: الصندوق والتأمين والوصية — الكفاءة والحدود وعتبات الدخول، وكيف يحقق تأمين هونغ كونغ عزل الوراثة.',
      },
    },
  };
  const entry = table[id];
  if (!entry) {
    // 未配置文案的主题：回退到最接近的英文文案，避免构建崩溃
    const fallback = Object.values(table)[0].en as TopicCopy;
    return fallback;
  }
  return entry[lang] ?? (entry.en as TopicCopy);
}

/** 主题页 URL 路径（裸路径，由 withLang 补语言前缀），如 /gold-storage */
export const topicToPath = (id: string): string => `/${id}`;
