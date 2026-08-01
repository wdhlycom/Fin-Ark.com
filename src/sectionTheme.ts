import type { CSSProperties } from 'react';
import type { SectionId } from './i18n';

export type SectionTheme = {
  /** 主强调色（hex）——用于标题、CTA、关键文字 */
  accent: string;
  /** 半透明描边/底色（rgba）——软化使用 */
  accentSoft: string;
  /** 悬停辉光阴影 */
  accentGlow: string;
  /** 板块页面背景（完整 CSS 背景值） */
  pageBg: string;
  /** 标题配色 class */
  titleClass: string;
  /** 列表卡片框架 class（对应 index.css 中的 .frame-*） */
  frameClass: string;
  /** 子板块块状背景：独立块状布局用（深色+强调色双层叠加） */
  subBg: string;
  /** 子板块块状边框：实色描边 */
  subBorder: string;
};

// 四大板块 + 资产地图三个子类别各自独立的视觉身份。
// 资产地图三类别：信托=亮蓝、黄金=琥珀金、新型=鲜绿——三色饱和度均经加强，确保对比强烈且与全景矩阵列色一致。
export const SECTION_THEME: Record<string, SectionTheme> = {
  insurance: {
    accent: '#38BDF8',
    accentSoft: 'rgba(56,189,248,0.30)',
    accentGlow: 'rgba(56,189,248,0.35)',
    pageBg: 'radial-gradient(ellipse at top, #0B2545 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-sky-300',
    frameClass: 'frame-insurance',
    subBg: 'linear-gradient(135deg, rgba(56,189,248,0.10) 0%, rgba(10,19,43,0.55) 60%)',
    subBorder: 'rgba(56,189,248,0.45)',
  },
  guardian: {
    accent: '#FBBF24',
    accentSoft: 'rgba(251,191,36,0.30)',
    accentGlow: 'rgba(251,191,36,0.35)',
    pageBg: 'radial-gradient(ellipse at top, #2A2110 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-amber-300',
    frameClass: 'frame-guardian',
    subBg: 'linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(10,19,43,0.55) 60%)',
    subBorder: 'rgba(251,191,36,0.45)',
  },
  arkPilot: {
    accent: '#818CF8',
    accentSoft: 'rgba(129,140,248,0.30)',
    accentGlow: 'rgba(129,140,248,0.35)',
    pageBg: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-indigo-300',
    frameClass: 'frame-arkpilot',
    subBg: 'linear-gradient(135deg, rgba(129,140,248,0.10) 0%, rgba(10,19,43,0.55) 60%)',
    subBorder: 'rgba(129,140,248,0.45)',
  },
  assetmap: {
    accent: '#34D399',
    accentSoft: 'rgba(52,211,153,0.30)',
    accentGlow: 'rgba(52,211,153,0.35)',
    pageBg: 'radial-gradient(ellipse at top, #052E2B 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-emerald-300',
    frameClass: 'frame-assetmap',
    subBg: 'linear-gradient(135deg, rgba(52,211,153,0.10) 0%, rgba(10,19,43,0.55) 60%)',
    subBorder: 'rgba(52,211,153,0.45)',
  },
  trust: {
    accent: '#3B82F6',
    accentSoft: 'rgba(59,130,246,0.32)',
    accentGlow: 'rgba(59,130,246,0.38)',
    pageBg: 'radial-gradient(ellipse at top, #052E2B 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-blue-300',
    frameClass: 'frame-assetmap',
    subBg: 'linear-gradient(160deg, rgba(59,130,246,0.14) 0%, rgba(8,20,45,0.45) 100%)',
    subBorder: '#3B82F6',
  },
  gold: {
    accent: '#F5C518',
    accentSoft: 'rgba(245,197,24,0.32)',
    accentGlow: 'rgba(245,197,24,0.38)',
    pageBg: 'radial-gradient(ellipse at top, #052E2B 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-yellow-300',
    frameClass: 'frame-assetmap',
    subBg: 'linear-gradient(135deg, rgba(245,197,24,0.14) 0%, rgba(40,32,8,0.55) 100%)',
    subBorder: '#F5C518',
  },
  emerging: {
    accent: '#22C55E',
    accentSoft: 'rgba(34,197,94,0.32)',
    accentGlow: 'rgba(34,197,94,0.38)',
    pageBg: 'radial-gradient(ellipse at top, #052E2B 0%, #0A132B 45%, #05080F 100%)',
    titleClass: 'text-green-300',
    frameClass: 'frame-assetmap',
    subBg: 'linear-gradient(160deg, rgba(34,197,94,0.14) 0%, rgba(8,30,20,0.45) 100%)',
    subBorder: '#22C55E',
  },
};

export const getTheme = (section: SectionId | string): SectionTheme =>
  SECTION_THEME[section] ?? SECTION_THEME.assetmap;

export const themeVars = (theme: SectionTheme): CSSProperties => ({
  ['--accent' as string]: theme.accent,
  ['--accent-soft' as string]: theme.accentSoft,
  ['--accent-glow' as string]: theme.accentGlow,
});