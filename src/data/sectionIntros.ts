import type { Lang, SectionId } from '../i18n';

/**
 * 板块页导语（正文，非页头副标题）。
 *
 * 背景：板块列表页此前只有「徽标 + 标题 + 一句副标题 + 卡片列表」，正文过薄，
 * 搜索引擎抓不到足够的主题信息，长尾板块词排名长期靠后（GSC 里 /en/s/trust 平均 49 位）。
 * 这里给每个板块补一段 150–200 字的实质说明，各语言各自撰写（不机翻、不共用中文），
 * 随静态 HTML 一起预渲染，让读者和爬虫都能看到这个板块到底覆盖哪些问题。
 */
export const SECTION_INTROS: Record<Lang, Partial<Record<SectionId, string>>> = {
  zh: {
    insurance:
      '香港储蓄险的核心不是收益率，而是把一部分家庭资产换成跨主权、跨币种、能长期持有的现金流容器。本栏目按认知、产品、功能、配置、落地五层展开：先讲清谁能买、找谁买、买什么，再拆开分红实现率、IRR 与保单货币的真实口径，最后讨论保费融资、保单拆分与跨境传承。文中判断以香港保险业监管局的公开规则为准，不写具体公司名，也不构成任何产品要约。',
    trust:
      '家族信托、保险金信托与遗嘱，解决的是同一件事的不同环节：谁持有、谁受益、什么时候给、按什么条件给。本栏目对比三者的设立门槛、每年成本与可执行性，重点说明资产量级不到门槛时更现实的替代做法，以及香港与新加坡在设立地、税务与合规要求上的差别。文中不推荐具体机构，判断依据放在香港金融管理局等公开资料。',
    gold:
      '实物黄金的价值不在涨幅，而在它不依赖任何发行人的兑付承诺。本栏目讨论家庭该留多少黄金兜底、纸黄金与实物金条在极端情境下的差别，以及香港银行保险箱、新加坡自由港金库与家中保管各自的保管风险、费用与取用限制。也覆盖代币化黄金的底层权属问题：持有人拿到的是金条，还是一纸对发行方的债权。',
    emerging:
      'Web3、比特币与数字人民币常被混为一谈，实际对应三套不同的信任机制：去中心化记账、不依赖发行人的稀缺资产，以及主权数字货币。本栏目用一张坐标系把它们分开，说明各自适用的场景、托管方式与合规边界，并解释为什么这类资产更适合作为小比例配置，而不是家庭资产的底座。',
    arkPilot:
      '宏观数据、利率变化与政策风声，最后都要落回一个具体问题：家庭资产里有多少绑在单一市场、单一货币上。本栏目用结构化视角记录存款利率、汇率、房产税与香港保险市场的阶段性观察，把噪音和真正会改变配置决策的信号分开。文章按日期排列，属于持续更新的观察笔记，不构成投资建议。',
    guardian:
      '从通胀、周期、认知偏差到代际传承，财富缩水很少来自一次暴跌，更多来自长期没有对冲的单一结构。本系列按四辑展开：财富观觉醒、离岸与香港、名人启示录、工具与架构，用具体人物与真实事件，拆开「低耦合资产」这个思路的来龙去脉，以及普通家庭能用到哪一层。',
  },
  en: {
    insurance:
      'Hong Kong savings insurance is not really about headline returns. It is about moving part of a family balance sheet into a long-duration cash-flow container that sits outside a single jurisdiction and a single currency. This section is organised in five layers: who can buy, who you actually buy from, what the contract contains, how it fits an allocation, and what settlement looks like in practice. We separate guaranteed cash value from non-guaranteed dividends, explain how fulfilment ratios and IRR are calculated, and cover premium financing, policy splitting and cross-border succession. Judgements follow public rules from the Hong Kong Insurance Authority. No company names, no product offers.',
    trust:
      'A family trust, an insurance trust and a will answer different parts of the same question: who holds the assets, who benefits, when they receive them, and under what conditions. This section compares setup thresholds, annual running costs and practical enforceability, then looks at what works for families below the usual minimum. It also sets out the differences between Hong Kong and Singapore on domicile, tax treatment and compliance obligations. We do not recommend specific providers. The reasoning is anchored to public material from the Hong Kong Monetary Authority.',
    gold:
      'The point of physical gold is not price appreciation. It is that the asset does not depend on any issuer keeping a promise. This section covers how much gold a household should hold as a final reserve, how paper gold differs from allocated bars when markets seize up, and what bank safe-deposit boxes in Hong Kong, free-port vaults in Singapore and home storage each cost and each risk. It also examines tokenised gold and the question that matters most: does the holder own a bar, or a claim on the issuer.',
    emerging:
      'Web3, Bitcoin and central-bank digital currencies are often discussed as one thing. They rest on three different trust models: decentralised record-keeping, scarcity without an issuer, and sovereign digital money. This section maps them onto one coordinate system, sets out the use cases, custody arrangements and compliance boundaries of each, and explains why they belong in a small satellite allocation rather than at the base of a family portfolio.',
    arkPilot:
      'Macro data, rate decisions and policy rumours only matter insofar as they answer one household question: how much of the family balance sheet is tied to a single market and a single currency. This section records structured observations on deposit rates, FX, property taxation and the Hong Kong insurance market, and separates noise from signals that would actually change an allocation. Entries are dated notes that are updated over time, not investment advice.',
    guardian:
      'Wealth rarely disappears in one crash. More often it erodes because a single structure was left unhedged for years. Across four parts - mindset, offshore and Hong Kong, case studies of well-known figures, and the tools and architecture - this series uses concrete people and real events to unpack what low-coupling assets mean, and how far an ordinary household can realistically take the idea.',
  },
  es: {
    insurance:
      'El seguro de ahorro de Hong Kong no trata principalmente de la rentabilidad anunciada, sino de trasladar una parte del patrimonio familiar a un instrumento de flujo de caja a largo plazo, fuera de una sola jurisdicción y de una sola moneda. Esta sección se organiza en cinco niveles: quién puede contratar, con quién se contrata, qué contiene la póliza, cómo encaja en una asignación y cómo se liquida en la práctica. Separamos el valor en efectivo garantizado de los dividendos no garantizados, explicamos el cálculo de las tasas de cumplimiento y de la TIR, y tratamos la financiación de primas, la división de pólizas y la sucesión transfronteriza. Los criterios siguen las normas públicas de la Autoridad de Seguros de Hong Kong, sin nombrar compañías ni ofrecer productos.',
    trust:
      'Un fideicomiso familiar, un fideicomiso de seguro y un testamento resuelven partes distintas de la misma pregunta: quién posee los bienes, quién se beneficia, cuándo los recibe y bajo qué condiciones. Esta sección compara umbrales de constitución, costes anuales y aplicabilidad real, y se detiene en las alternativas viables para patrimonios que no alcanzan el mínimo habitual. También expone las diferencias entre Hong Kong y Singapur en domicilio, fiscalidad y obligaciones de cumplimiento. No recomendamos proveedores concretos; el análisis se apoya en material público de la Autoridad Monetaria de Hong Kong.',
    gold:
      'El valor del oro físico no está en la subida de precio, sino en que no depende de que un emisor cumpla su promesa. Esta sección aborda cuánto oro conviene mantener como reserva final, en qué se diferencian el oro papel y los lingotes asignados cuando los mercados se bloquean, y qué costes y riesgos tienen las cajas de seguridad bancarias de Hong Kong, las bóvedas de puerto franco de Singapur y la custodia doméstica. También examina el oro tokenizado y la pregunta decisiva: el titular posee un lingote o un crédito contra el emisor.',
    emerging:
      'Web3, Bitcoin y las monedas digitales de los bancos centrales suelen presentarse como una sola cosa, pero descansan sobre tres modelos de confianza distintos: registro descentralizado, escasez sin emisor y dinero digital soberano. Esta sección los sitúa en un mismo sistema de coordenadas, describe sus usos, su custodia y sus límites normativos, y explica por qué encajan en una pequeña asignación satélite y no en la base del patrimonio familiar.',
    arkPilot:
      'Los datos macroeconómicos, las decisiones de tipos y los rumores regulatorios solo importan en la medida en que responden a una pregunta doméstica: cuánto del patrimonio familiar está atado a un único mercado y a una única moneda. Esta sección recoge observaciones estructuradas sobre tipos de depósito, divisas, fiscalidad inmobiliaria y el mercado asegurador de Hong Kong, y separa el ruido de las señales que realmente cambiarían una asignación. Son notas fechadas y actualizadas, no asesoramiento de inversión.',
    guardian:
      'El patrimonio rara vez desaparece en una sola caída. Con más frecuencia se erosiona porque una estructura única quedó sin cobertura durante años. En cuatro partes -mentalidad, offshore y Hong Kong, casos de figuras conocidas, y herramientas y arquitectura- esta serie usa personas concretas y hechos reales para explicar qué significa un activo de bajo acoplamiento y hasta dónde puede llegar una familia corriente.',
  },
  ar: {
    insurance:
      'لا يدور تأمين الادخار في هونغ كونغ أساساً حول العائد المعلن، بل حول نقل جزء من أصول الأسرة إلى وعاء تدفق نقدي طويل الأجل يقع خارج نطاق دولة واحدة وعملة واحدة. ينظّم هذا القسم المادة على خمس طبقات: من يحق له الشراء، ومن تتعامل معه فعلياً، وماذا يتضمن العقد، وكيف ينسجم مع التوزيع، وكيف تتم التسوية عملياً. نفصل بين القيمة النقدية المضمونة والأرباح غير المضمونة، ونشرح حساب نسب تحقيق الأرباح ومعدل العائد الداخلي، ثم نتناول تمويل الأقساط وتجزئة الوثيقة والتوارث عبر الحدود. تستند الأحكام إلى القواعد المنشورة لهيئة التأمين في هونغ كونغ، دون ذكر شركات بعينها أو تقديم عروض منتجات.',
    trust:
      'يجيب الصندوق الائتماني العائلي، والصندوق القائم على وثيقة تأمين، والوصية، كل منها عن جزء مختلف من السؤال نفسه: من يملك الأصول، ومن يستفيد، ومتى يتسلمها، وبأي شروط. يقارن هذا القسم حدود التأسيس والتكاليف السنوية وقابلية التنفيذ الفعلية، ثم يتوقف عند البدائل المتاحة للأسر التي لا تبلغ الحد الأدنى المعتاد. كما يوضح الفروق بين هونغ كونغ وسنغافورة في موطن الصندوق والمعاملة الضريبية ومتطلبات الامتثال. لا نوصي بمزوّدين محددين، ونستند في التحليل إلى مواد منشورة لسلطة النقد في هونغ كونغ.',
    gold:
      'قيمة الذهب المادي ليست في ارتفاع السعر، بل في أنه لا يعتمد على وفاء أي جهة مصدِرة بوعدها. يتناول هذا القسم كمّية الذهب المناسبة كاحتياط أخير، والفرق بين الذهب الورقي والسبائك المخصّصة عندما تتعطل الأسواق، وما تكلّفه وما ينطوي عليه من مخاطر كل من صناديق الأمانات البنكية في هونغ كونغ وخزائن الميناء الحر في سنغافورة والحفظ المنزلي. ويفحص كذلك الذهب المرمّز والسؤال الحاسم: هل يملك الحائز سبيكة أم مجرد مطالبة تجاه المُصدر؟',
    emerging:
      'كثيراً ما يُتعامل مع ويب 3 وبيتكوين والعملات الرقمية للبنوك المركزية بوصفها شيئاً واحداً، بينما تقوم على ثلاثة نماذج مختلفة للثقة: سجل لامركزي، وندرة بلا جهة مصدِرة، ونقد رقمي سيادي. يضع هذا القسم الثلاثة في نظام إحداثيات واحد، ويبيّن حالات الاستخدام وترتيبات الحفظ والحدود التنظيمية لكل منها، ويشرح لماذا تصلح لتخصيص هامشي صغير لا لقاعدة أصول الأسرة.',
    arkPilot:
      'لا تكتسب البيانات الكلية وقرارات الفائدة والشائعات التنظيمية أهميتها إلا بقدر ما تجيب عن سؤال منزلي واحد: كم من أصول الأسرة مرتبط بسوق واحدة وعملة واحدة. يسجّل هذا القسم ملاحظات منظّمة عن أسعار الفائدة على الودائع وأسعار الصرف والضرائب العقارية وسوق التأمين في هونغ كونغ، ويفصل بين الضجيج والإشارات التي قد تغيّر التوزيع فعلاً. هذه ملاحظات مؤرخة تُحدَّث دورياً، وليست نصيحة استثمارية.',
    guardian:
      'نادراً ما يختفي الثروة في انهيار واحد؛ بل تتآكل في الغالب لأن بنية واحدة بقيت بلا تحوّط لسنوات. عبر أربعة أجزاء -الوعي المالي، والأوفشور وهونغ كونغ، وحالات شخصيات معروفة، والأدوات والهيكل- تستخدم هذه السلسلة أشخاصاً بعينهم وأحداثاً واقعية لتفكيك معنى الأصول منخفضة الارتباط، وإلى أي مدى يمكن لأسرة عادية أن تطبّق الفكرة.',
  },
};

/** 取某语言某板块的导语；缺文案时返回 undefined，调用方跳过渲染。 */
export function sectionIntro(lang: Lang, section: SectionId): string | undefined {
  return SECTION_INTROS[lang][section];
}
