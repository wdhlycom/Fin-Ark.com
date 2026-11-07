import type { Lang } from './i18n/types';

/**
 * 作者实体（E-E-A-T 单一来源）。
 * 全站署名、作者卡、JSON-LD Person 均从此取数，勿在别处硬编码。
 *
 * 合规口径（已确认）：提及行业与资历，**不写具体公司名**——
 * worksFor / jobTitle 一律使用描述性表述「香港大型保险经纪公司」。
 */
export const AUTHOR = {
  /** 署名（按语言取 name） */
  nameZh: '行者',
  nameEn: 'Holive',
  /** 形象照（站内路径，400×400 JPG，约 17KB） */
  photo: '/author/holive.jpg',
  /** 作者实体页锚点（关于页） */
  aboutPath: '/about',
  /** 十余年从业的量化口径 */
  years: '10+',
  /** 跨平台身份（sameAs）：用于 E-E-A-T 实体关联，把作者在社媒的可信身份与站内 Person 打通 */
  sameAs: [
    'https://www.xiaohongshu.com/user/profile/753326111',
    'https://x.com/FinanceArk',
    'https://www.lumcog.com',
  ] as string[],
  /**
   * 站点本体（Organization 实体）的 sameAs。
   * 微信公众号（Fin-Ark）与 X（FinanceArk）是「网站」这个主体的对外账号，
   * lumcog.com 是关联站点；作者个人账号只挂在 Person.sameAs 上，避免实体混同。
   */
  orgSameAs: [
    'https://x.com/FinanceArk',
    'https://www.lumcog.com',
  ] as string[],
} as const;

export type AuthorCopy = {
  name: string;
  jobTitle: string;
  /** 所属机构（描述性，不写具体公司名） */
  org: string;
  /** 署名短版（放 byline / 作者卡） */
  bio: string;
  /** 合规披露（文末固定段落） */
  disclosure: string;
};

const COPY: Record<Lang, AuthorCopy> = {
  zh: {
    name: AUTHOR.nameZh,
    jobTitle: '销售顾问',
    org: '香港大型保险经纪公司',
    bio: '在内地多家保险公司拥有十余年一线销售与财富规划经验，现于香港大型保险经纪公司任销售顾问，专注香港储蓄险、家族信托与离岸资产配置。',
    disclosure:
      '本文为财富知识分享，不构成任何投资建议或保险产品要约。具体产品收益、条款与合规要求，请以持牌机构正式文件为准，并在做出决策前咨询合资格的专业顾问。',
  },
  en: {
    name: AUTHOR.nameEn,
    jobTitle: 'Sales Consultant',
    org: 'a major Hong Kong insurance brokerage',
    bio: 'Holive has over a decade of frontline sales and wealth-planning experience across multiple insurers in mainland China, and now serves as a sales consultant at a major Hong Kong insurance brokerage, focused on HK savings insurance, family trusts, and offshore asset allocation.',
    disclosure:
      'This article is for financial education only. It does not constitute investment advice or an offer of any insurance product. Refer to licensed institutions for product terms, and consult a qualified professional advisor before making decisions.',
  },
  es: {
    name: AUTHOR.nameEn,
    jobTitle: 'Consultor de ventas',
    org: 'una importante correduría de seguros de Hong Kong',
    bio: 'Holive cuenta con más de una década de experiencia en ventas y planificación patrimonial en varias aseguradoras de China continental, y actualmente es consultor de ventas en una importante correduría de seguros de Hong Kong.',
    disclosure:
      'Este artículo es solo divulgación de conocimientos financieros y no constituye asesoramiento de inversión ni oferta de productos de seguros. Consulte a un asesor profesional cualificado antes de tomar decisiones.',
  },
  ar: {
    name: AUTHOR.nameEn,
    jobTitle: 'مستشار مبيعات',
    org: 'شركة وساطة تأمين كبرى في هونغ كونغ',
    bio: 'يمتلك هوليف أكثر من عشر سنوات من الخبرة الميدانية في المبيعات والتخطيط المالي عبر شركات تأمين متعددة في الصين، ويعمل الآن مستشار مبيعات في شركة وساطة تأمين كبرى في هونغ كونغ.',
    disclosure:
      'هذه المقالة لمشاركة المعرفة المالية فقط، ولا تشكل نصيحة استثمارية أو عرضاً لمنتج تأميني. يرجى استشارة مستشار محترف مؤهل قبل اتخاذ القرارات.',
  },
};

export function authorCopy(lang: Lang): AuthorCopy {
  return COPY[lang];
}

/** JSON-LD Person 实体（供 seo.ts 组装，origin 为绝对前缀）。 */
export function authorPersonNode(origin: string, lang: Lang): Record<string, unknown> {
  const c = COPY[lang];
  return {
    '@type': 'Person',
    name: AUTHOR.nameZh,
    alternateName: AUTHOR.nameEn,
    jobTitle: c.jobTitle,
    worksFor: { '@type': 'Organization', name: c.org },
    description: c.bio,
    image: origin + AUTHOR.photo,
    url: origin + withLangPath(lang, AUTHOR.aboutPath),
    sameAs: AUTHOR.sameAs,
  };
}

/** 给路径加语言前缀（zh 为默认语言仍保留前缀，与全站路由约定一致）。 */
function withLangPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}
