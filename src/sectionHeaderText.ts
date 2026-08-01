import type { SectionId } from './i18n';

export type SectionHeaderSpec = {
  /** 级别1：徽标胶囊（小号、克制的强调文字） */
  badge: string;
  /** 级别2：主 H1 标题 */
  title: string;
  /** 级别3：副标题 / 总括说明（一句式、面向客户、无内部术语） */
  subtitle: string;
};

// 四大主板块页头统一文案（中文）。
// 三级结构：徽标胶囊 → H1 主标题 → 副标题。已剔除内部草稿词：
// "板块文章 / 核心业务 / 重头戏 / 信任纽带 / 核心业务的衬托与辅助"。
// 非中文语言下由调用方回退到 i18n 数据，本表仅承载中文精确文案。
export const SECTION_HEADER: Record<string, SectionHeaderSpec> = {
  insurance: {
    badge: '离岸流动性 · 跨代传承',
    title: '港险学院',
    subtitle: '以低门槛、高确定的离岸保单垫，为家庭资产搭建全球多币种防线与流动性底座。',
  },
  guardian: {
    badge: '觉醒信号 · 生命之歌',
    title: '守护觉醒',
    subtitle: '系统性拆解大变局下的财富底层逻辑，构建不依赖单一体系的低信任式防御结构。',
  },
  arkPilot: {
    badge: '动态博客 · 持续更新',
    title: '方舟视点',
    subtitle: '用结构化视角穿透市场噪音，记录宏观趋势、离岸罗盘与私人架构的实战洞察。',
  },
  assetmap: {
    badge: '全景矩阵 · 架构映射',
    title: '资产地图',
    subtitle: '信托、黄金与新型资产，与香港保险这一普适性资产垫动静相济，共同构成完整的跨主权财富防御架构。',
  },
};

export const getSectionHeader = (section: SectionId | string): SectionHeaderSpec | undefined =>
  SECTION_HEADER[section];
