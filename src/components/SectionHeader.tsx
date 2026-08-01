import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { getTheme, themeVars } from '../sectionTheme';

type Props = {
  section: SectionId | 'assetmap';
  /** 级别1：徽标胶囊文字 */
  badge: string;
  /** 级别2：主 H1 标题 */
  title: string;
  /** 级别3：副标题 / 总括说明 */
  subtitle?: string;
};

/**
 * 统一板块页头组件：严格三级结构——徽标胶囊(1) → H1 主标题(2) → 副标题(3)。
 * 全站四个主板块共用同一对齐、字号层级、间距与样式骨架，仅强调色随板块变化，
 * 保证视觉一致、面向客户、高级且克制。
 */
export default function SectionHeader({ section, badge, title, subtitle }: Props) {
  const { lang } = useLang();
  void lang;
  const theme = getTheme(section);
  const vars = themeVars(theme);
  return (
    <header style={vars} className="text-left">
      <div
        className="inline-flex items-center px-3 py-1 rounded-full border text-[11px] tracking-[0.22em] uppercase"
        style={{ color: theme.accent, borderColor: theme.accentSoft, background: 'rgba(255,255,255,0.03)' }}
      >
        {badge}
      </div>
      <h1 className={`mt-5 font-serif-display text-3xl md:text-4xl leading-tight ${theme.titleClass}`}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
