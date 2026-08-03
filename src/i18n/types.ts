export type Lang = 'zh' | 'en' | 'es' | 'ar';

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'zh', label: '中文', short: 'ZH' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ar', label: 'العربية', short: 'AR' },
];

export type SectionId = 'insurance' | 'trust' | 'gold' | 'emerging' | 'arkPilot' | 'guardian';

export const SECTIONS: SectionId[] = [
  'insurance',
  'trust',
  'gold',
  'emerging',
  'arkPilot',
  'guardian',
];

export type Article = {
  id: string;
  /** 当前语言的 URL slug；缺省回退到 id。不同语言可设不同语义化 slug，使各语言 URL 独立 */
  slug?: string;
  /** 跨语言译文配对键；缺省回退到 id。hreflang 与语言切换据此找到对应译文 */
  translationKey?: string;
  title: string;
  subtitle: string;
  date: string;
  summary?: string;
  pin?: boolean;
  order?: number;
  category?: string;
  body: { h: string; p: string }[];
};

export type Dict = {
  nav: {
    home: string;
    insurance: string;
    trust: string;
    gold: string;
    emerging: string;
    arkPilot: string;
    guardian: string;
    assetmap: string;
    about: string;
    consult: string;
    langLabel: string;
  };
  brand: { name: string; tagline: string };
  assetmap: {
    matrixTitle: string;
    disclaimer: string;
    viewAll: Record<'trust' | 'gold' | 'emerging', string>;
    dimensions: {
      labels: {
        risk: string;
        liquidity: string;
        threshold: string;
        function: string;
        complement: string;
        audience: string;
      };
      values: {
        risk: Record<'trust' | 'gold' | 'emerging', string>;
        liquidity: Record<'trust' | 'gold' | 'emerging', string>;
        threshold: Record<'trust' | 'gold' | 'emerging', string>;
        function: Record<'trust' | 'gold' | 'emerging', string>;
        complement: Record<'trust' | 'gold' | 'emerging', string>;
        audience: Record<'trust' | 'gold' | 'emerging', string>;
      };
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    chartTitle: string;
    chartCaption: string;
  };
  cards: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: {
      id: SectionId;
      title: string;
      subtitle: string;
      role: string;
      summary: string;
      cta: string;
      icon: string;
      accent: string;
    }[];
  };
  calc: {
    eyebrow: string;
    title: string;
    subtitle: string;
    premiumLabel: string;
    premiumSuffix: string;
    termLabel: string;
    termOptions: { value: number; label: string }[];
    rateLabel: string;
    rateOptions: { value: number; label: string; desc: string }[];
    arkLine: string;
    tradLine: string;
    yearLabel: string;
    wealthLabel: string;
    milestone20: string;
    milestone30: string;
    gapLabel: string;
    arkValue: string;
    tradValue: string;
    note: string;
    interactiveHint: string;
    editableHint: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featuredId?: string;
    viewSolution: string;
    modalClose: string;
    modalLabels: { profile: string; risk: string; architecture: string; outcome: string };
    items: {
      id?: string;
      tag: string;
      title: string;
      profile: string;
      structure: string;
      goal: string;
      outcome: string;
      modalProfile: string;
      modalRisk: string;
      modalArchitecture: string;
      modalOutcome: string;
    }[];
  };
  threshold: { line1: string; line2: string; line3: string };
  consult: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    contactRequired: string;
    concerns: string;
    concernOptions: { id: string; label: string; desc: string }[];
    submit: string;
    founderTitle: string;
    founderName: string;
    founderBio: string;
    credential1: string;
    credential2: string;
    credential3: string;
    successTitle: string;
    successBody: string;
    successClose: string;
    emailInvalid: string;
    selectOne: string;
    submitError: string;
    submitting: string;
  };
  chatbot: {
    label: string;
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    greeting: string;
    suggestion1: string;
    suggestion2: string;
    suggestion3: string;
    reply: string;
  };
  footer: { disclaimer: string; rights: string; addr: string; links: string };
  about: {
    introTitle: string;
    introBody: string;
    steps: { t: string; d: string }[];
    faqs: { q: string; a: string }[];
    processTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
  };
  articlePage: {
    backLabel: string;
    listTitle: string;
    readMore: string;
    backToList: string;
    funnelTitle: string;
    funnelBody: string;
    funnelCta: string;
  };
  articles: Record<SectionId, Article[]>;
};
