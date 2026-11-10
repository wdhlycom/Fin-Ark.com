import type { Lang } from '../i18n/types';
import { TOPIC_BODY, type TopicBody } from './topicBody.gen';

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
  /** 专题正文（目前仅中文；其余语言补齐后自动显示） */
  body?: TopicBody;
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
  {
    // GSC：分红实现率 / 保險實現率 / 紅利實現率 / 壽險 IRR 词族 20 词 95 展示，
    // 加权排名 44.19（全站最差），是「有展示、无点击」里最值得用专题页承接的一组。
    id: 'dividend-fulfillment',
    section: 'insurance',
    articleIds: [
      'ark-dividend-rate',
      'hk-compound-irr',
      'sg-us-hk-insurance-compare',
      'hk-vs-mainland-annuity',
      'hk-vs-mainland-wholelife',
      'fund-industry-harvest-trap',
    ],
  },
  {
    // GSC：multi currency savings insurance(40) / premium financing(14) /
    // whole life insurance(4) / 保單融資(3) / 保單抵押(3)，9 词 72 展示、加权 43.73 名。
    id: 'multi-currency-savings',
    section: 'insurance',
    articleIds: [
      'hk-multi-currency-account',
      'hk-premium-financing',
      'buy-borrow-die-policy-financing',
      'us-iul-premium-financing',
      'fx-dividend-cross-hedge',
      'usd-policy-legal-shield',
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
    'dividend-fulfillment': {
      zh: {
        nav: '分红实现率',
        title: '分红实现率怎么算？香港储蓄险 IRR 与红利达成率一次讲清',
        subtitle: '收益专题 · 分红实现率 · 长期 IRR',
        intro:
          '「计划书上写 7%，最后到底能拿到多少」是买香港储蓄险最该先问、却最常被跳过的问题。香港保监局要求保险公司公布分红实现率（也叫红利实现率、分紅實現率），它才是检验演示数字的公开标尺。本专题把这件事拆成三层：实现率的计算口径与基准利率由谁设定、IRR 高 1% 是否等于最后多拿 1%、以及 6%-7% 长期复利成立的前提。同时把跨市场分红险与内地增额终身寿、年金险的长期收益差异放在同一张桌上比较。',
        description:
          '分红实现率是检验香港储蓄险计划书收益的公开标尺。本专题讲清实现率怎么算、基准利率由谁设定、IRR 与红利达成率的区别、6%-7% 长期复利的前提，以及香港分红险与内地增额终身寿、年金险的长期收益差异。',
      },
      en: {
        nav: 'Dividend Fulfillment',
        title: 'Dividend Fulfillment Ratio: HK Savings Insurance IRR Explained',
        subtitle: 'Returns Topic · Fulfillment Ratio · Long-Term IRR',
        intro:
          'The question most buyers skip is the one that matters: how much of the 7% illustrated in a Hong Kong savings policy actually arrives. The Insurance Authority requires insurers to publish a dividend fulfillment ratio — the only public yardstick for checking illustrated returns. This topic works through it in three layers: how the ratio is calculated and who sets the reference rate, whether a 1% higher IRR means 1% more money at maturity, and what must hold true for 6%-7% long-term compounding. It also places participating policies from Hong Kong, Singapore and the US alongside mainland increasing whole life and annuity products, so the long-run return gap can be compared on the same table.',
        description:
          'Dividend fulfillment ratio is the public yardstick for Hong Kong savings insurance illustrations. How it is calculated, who sets the reference rate, IRR vs bonus payouts, and when 6%-7% compounding holds.',
      },
      es: {
        nav: 'Cumplimiento de dividendos',
        title: '¿Cómo se calcula el ratio de cumplimiento de dividendos? TIR y bonificaciones del ahorro en Hong Kong',
        subtitle: 'Tema de rentabilidad · Ratio de cumplimiento · TIR a largo plazo',
        intro:
          '«La ilustración dice 7%; ¿cuánto se cobra al final?» es la pregunta que más conviene hacer antes de contratar un seguro de ahorro en Hong Kong y que más a menudo se salta. El regulador exige a las aseguradoras publicar el ratio de cumplimiento de dividendos, la única vara pública para comprobar las cifras ilustradas. Este tema lo aborda en tres capas: cómo se calcula y quién fija la base, si un 1% más de TIR equivale a cobrar un 1% más, y qué condiciones exige un 6%-7% compuesto a largo plazo. También pone sobre la misma mesa las diferencias de rentabilidad entre las pólizas con participación en beneficios y los seguros y rentas del continente.',
        description:
          'El ratio de cumplimiento de dividendos es la vara pública para revisar las proyecciones del ahorro asegurado en Hong Kong. Cómo se calcula, TIR frente a bonificaciones, y cuándo se sostiene el 6%-7% compuesto.',
      },
      ar: {
        nav: 'نسبة تحقق الأرباح',
        title: 'كيف تُحسب نسبة تحقق الأرباح؟ شرح العائد الداخلي وأرباح وثائق الادخار في هونغ كونغ',
        subtitle: 'موضوع العائد · نسبة التحقق · العائد الداخلي طويل الأجل',
        intro:
          '«جدول الإيضاحات يقول 7%، فكم يصل في النهاية؟» هذا هو السؤال الذي ينبغي طرحه أولاً عند شراء وثيقة ادخار في هونغ كونغ، والذي كثيراً ما يُتجاوز. وتُلزم هيئة التأمين الشركات بنشر نسبة تحقق توزيعات الأرباح، وهي المقياس العلني الوحيد لمراجعة الأرقام المُوضَّحة. يتناول هذا الموضوع المسألة على ثلاث طبقات: كيف تُحسب النسبة ومن يحدد الأساس، وهل ارتفاع العائد الداخلي بنقطة يعني قبض نقطة أكثر، وما الشروط التي يقوم عليها تراكم 6-7% طويل الأجل. كما يضع على الطاولة نفسها الفارق في العائد بين وثائق المشاركة في الأرباح ومنتجات البرّ الرئيسي والمعاشات السنوية.',
        description:
          'نسبة تحقق توزيعات الأرباح هي المقياس العلني لمراجعة إيضاحات وثائق الادخار في هونغ كونغ: كيف تُحسب، والفرق بين العائد الداخلي والأرباح المصروفة، ومتى يصمد تراكم 6-7%.',
      },
    },
    'multi-currency-savings': {
      zh: {
        nav: '多元货币保单',
        title: '多元货币储蓄保险怎么选？香港保单货币转换、汇率对冲与保费融资',
        subtitle: '产品专题 · 多币种 · 保费融资',
        intro:
          '同一张香港保单里能放美元、港币、人民币，几年后还能换币种——这是多元货币储蓄保险最核心、也最容易被销售话术带过的结构。本专题把「选币种」和「加杠杆」两件事分开讲：货币转换的规则与成本、汇率对冲到底对冲了什么，以及保费融资、保单抵押用银行的钱放大保额时，收益与成本分别怎么变。',
        description:
          '多元货币储蓄保险怎么选：一张香港保单内美元、港币、人民币的转换规则与成本，汇率对冲的真实作用，以及保费融资、保单抵押放大保额时的收益与成本边界。',
      },
      en: {
        nav: 'Multi-Currency Policies',
        title: 'Multi-Currency Savings Insurance: Currency Switching and Premium Financing',
        subtitle: 'Product Topic · Multi-Currency · Premium Financing',
        intro:
          'A single Hong Kong policy can hold US dollars, Hong Kong dollars and renminbi, and switch between them years later. That structure is the defining feature of multi-currency savings insurance, and the part sales material most often glosses over. This topic separates two decisions that are usually bundled together: choosing a currency, and adding leverage. It covers the rules and costs of currency conversion, what FX hedging actually hedges, and how premium financing and policy collateral change both the return and the cost when bank money is used to amplify coverage.',
        description:
          'How to choose multi-currency savings insurance: USD/HKD/CNY switching rules and costs, what FX hedging really does, and the return-cost boundary of premium financing and policy collateral.',
      },
      es: {
        nav: 'Pólizas multidivisa',
        title: 'Cómo elegir un seguro de ahorro multidivisa: conversión de moneda, cobertura cambiaria y financiación de primas',
        subtitle: 'Tema de producto · Multidivisa · Financiación de primas',
        intro:
          'Una misma póliza de Hong Kong puede mantener dólares, dólares de Hong Kong y renminbi, y cambiar de divisa años después: esa es la estructura central del ahorro asegurado multidivisa y la que el discurso comercial despacha con más ligereza. Este tema separa dos decisiones que suelen ir juntas: elegir divisa y añadir apalancamiento. Explica las reglas y el coste de la conversión, qué cubre realmente la cobertura cambiaria, y cómo cambian la rentabilidad y el coste cuando la financiación de primas y la prenda de la póliza amplían el capital con dinero del banco.',
        description:
          'Cómo elegir un seguro de ahorro multidivisa: reglas y costes de conversión entre USD, HKD y CNY, el alcance real de la cobertura cambiaria y los límites de la financiación de primas.',
      },
      ar: {
        nav: 'وثائق الادخار متعددة العملات',
        title: 'اختيار وثيقة ادخار متعددة العملات: تحويل العملة والتحوط الصرفي وتمويل الأقساط',
        subtitle: 'موضوع المنتج · تعدد العملات · تمويل الأقساط',
        intro:
          'أن تحتفظ وثيقة واحدة في هونغ كونغ بالدولار الأمريكي ودولار هونغ كونغ واليوان، ثم تبدّل عملتها بعد سنوات، هو جوهر بنية الادخار التأميني متعدد العملات، وهو أيضاً ما يمرّ عليه الخطاب البيعي مروراً خفيفاً. يفصل هذا الموضوع بين قرارين كثيراً ما يُجمعان: اختيار العملة، وإضافة الرافعة. ويشرح قواعد تحويل العملة وكلفته، وما الذي يحوطه التحوط الصرفي فعلاً، وكيف يتغيّر كل من العائد والكلفة حين يضخّم تمويل الأقساط ورهن الوثيقة مبلغ التأمين بأموال البنك.',
        description:
          'كيف تختار وثيقة ادخار متعددة العملات: قواعد التحويل بين الدولار الأمريكي ودولار هونغ كونغ واليوان وكلفته، والأثر الحقيقي للتحوط الصرفي، وحدود تمويل الأقساط ورهن الوثيقة.',
      },
    },
  };
  const entry = table[id];
  if (!entry) {
    // 未配置文案的主题：回退到首个已配置主题的文案，避免构建崩溃
    return (Object.values(table)[0].en ?? Object.values(table)[0].zh) as TopicCopy;
  }
  const resolved: Lang = entry[lang] ? lang : entry.en ? 'en' : 'zh';
  const copy = entry[lang] ?? entry.en ?? entry.zh ?? (Object.values(table)[0].en as TopicCopy);
  return {
    ...copy,
    body: TOPIC_BODY[id]?.[resolved] ?? TOPIC_BODY[id]?.en ?? TOPIC_BODY[id]?.zh,
  };
}

/** 主题页 URL 路径（裸路径，由 withLang 补语言前缀），如 /gold-storage */
export const topicToPath = (id: string): string => `/${id}`;
