import { ArrowLeft, Landmark, Coins, Binary, ArrowRight, Calendar, type LucideIcon } from 'lucide-react';
import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { getTheme, themeVars } from '../sectionTheme';
import { viewToPath, articleToPath } from '../nav';
import NavLink from './NavLink';
import SectionHeader from './SectionHeader';
import { SECTION_HEADER } from '../sectionHeaderText';

type CategoryMeta = {
  id: Extract<SectionId, 'trust' | 'gold' | 'emerging'>;
  icon: LucideIcon;
  name: string;
  /** 矩阵标题色——与子板块独立块配色同源（来自 theme.accent） */
  accent: string;
  desc: string;
};

const CATEGORIES: CategoryMeta[] = [
  { id: 'trust', icon: Landmark, name: '信托家办', accent: getTheme('trust').accent, desc: '财富风险隔离与家族传承' },
  { id: 'gold', icon: Coins, name: '黄金储备', accent: getTheme('gold').accent, desc: '绝对实物本位与最后避险资产' },
  { id: 'emerging', icon: Binary, name: '新型资产', accent: getTheme('emerging').accent, desc: '对抗法币贬值的数字黄金' },
];

// 各子板块"查看全部"按钮文案（中文，与全站基调一致）
const VIEW_ALL_LABEL: Record<string, string> = {
  trust: '查看全部信托洞察',
  gold: '查看全部黄金洞察',
  emerging: '查看全部新型资产洞察',
};

// 编辑性参考维度（非投资建议）：横向对比三大资产类别的关键特征。
const DIMENSIONS: { label: string; trust: string; gold: string; emerging: string }[] = [
  { label: '风险等级', trust: '低', gold: '中低', emerging: '高' },
  { label: '流动性', trust: '低 · 锁定期长', gold: '高', emerging: '高' },
  { label: '起投门槛', trust: '高', gold: '低', emerging: '低' },
  { label: '核心功能', trust: '传承隔离 · 债务防火墙', gold: '保值避险 · 实物本位', emerging: '增值对冲 · 数字黄金' },
  { label: '与港险互补', trust: '高维补充 · 拉满传承', gold: '静态防守 · 攻守兼备', emerging: '动态对冲 · 落袋锁利' },
  { label: '适合人群', trust: '高净值家族', gold: '所有家庭', emerging: '能承受波动者' },
];

export default function AssetMapPage({
  onConsult,
}: {
  onConsult: () => void;
}) {
  const { t, lang } = useLang();
  const theme = getTheme('assetmap');
  const sh = lang === 'zh' ? SECTION_HEADER['assetmap'] : undefined;

  return (
    <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[1000px] mx-auto px-6 lg:px-10">
        <NavLink
          href="/"
          style={themeVars(theme)}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[color:var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.articlePage.backLabel}
        </NavLink>

        <div className="mt-8">
          <SectionHeader
            section="assetmap"
            badge={sh?.badge ?? t.nav.assetmap}
            title={sh?.title ?? t.nav.assetmap}
            subtitle={sh?.subtitle}
          />
        </div>

        {/* === 全景对比矩阵（三栏浮动卡片 · 无外框） === */}
        <div className="mt-12">
          <div className="text-xs tracking-[0.3em] uppercase" style={{ color: theme.accent }}>
            全景对比矩阵 · Panorama Matrix
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const cTheme = getTheme(c.id);
              return (
                <div
                  key={c.id}
                  className="relative rounded-2xl p-5 lg:p-6 border border-white/[0.06] overflow-hidden shadow-[0_10px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md"
                  style={{ background: cTheme.subBg }}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.accent}99, transparent)` }}
                  />

                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-lg border"
                      style={{ background: c.accent + '22', color: c.accent, borderColor: c.accent + '66' }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                    <span
                      className="font-serif-display text-lg font-semibold"
                      style={{ color: c.accent, textShadow: `0 0 18px ${c.accent}55` }}
                    >
                      {c.name}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-slate-400">{c.desc}</div>

                  <div className="mt-5">
                    {DIMENSIONS.map((d, i) => (
                      <div
                        key={d.label}
                        className="flex items-start justify-between gap-3 py-3"
                        style={i !== 0 ? { borderTop: '1px solid rgba(255,255,255,0.08)' } : undefined}
                      >
                        <span className="text-xs text-slate-400 shrink-0 w-[84px]">{d.label}</span>
                        <span className="text-sm text-white/90 text-right font-medium leading-snug">
                          {d[c.id]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            以上为编辑性参考维度，用于横向理解三类资产的特征差异，不构成任何投资、税务或法律建议。
          </p>
        </div>

        {/* === 各资产类别文章下钻（三个独立块状布局，颜色与上方矩阵列一致） === */}
        <div className="mt-14 space-y-8">
          {CATEGORIES.map((c) => {
            const cTheme = getTheme(c.id);
            const card = t.cards.items.find((x) => x.id === c.id);
            const articles = t.articles[c.id];
            // 置顶优先，其次按日期倒序，取最相关/最新的 2 篇作为高管摘要
            const ranked = [...articles].sort((a, b) => {
              if (!!a.pin !== !!b.pin) return a.pin ? -1 : 1;
              return b.date < a.date ? -1 : b.date > a.date ? 1 : 0;
            });
            const displayed = ranked.slice(0, 2);
            const total = articles.length;
            return (
              <section
                key={c.id}
                className="relative isolate rounded-2xl p-6 lg:p-8 border-2 overflow-hidden backdrop-blur-md"
                style={{
                  background: cTheme.subBg,
                  borderColor: cTheme.subBorder,
                  boxShadow: `0 0 0 1px ${cTheme.subBorder}33, 0 12px 40px -12px ${cTheme.subBorder}55`,
                }}
              >
                {/* 板块级环境光晕：以对应类别强调色的大半径模糊光晕，营造"悬浮于深色背景"的层次感 */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -z-10 -top-24 left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full blur-[120px]"
                  style={{ background: `radial-gradient(circle, ${cTheme.accent}14 0%, transparent 70%)` }}
                />
                <div
                  aria-hidden
                  className="absolute -top-px -left-px w-24 h-1.5"
                  style={{ background: `linear-gradient(90deg, ${c.accent} 0%, transparent 100%)` }}
                />

                <NavLink
                  href={viewToPath(c.id)}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl border-2"
                    style={{
                      background: c.accent + '22',
                      color: c.accent,
                      borderColor: c.accent,
                    }}
                  >
                    <c.icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div
                      className="font-serif-display text-2xl font-semibold tracking-wide"
                      style={{ color: c.accent, textShadow: `0 0 18px ${c.accent}55` }}
                    >
                      {t.nav[c.id]}
                    </div>
                    <div className="text-sm text-slate-400 mt-0.5">{card?.subtitle}</div>
                  </div>
                  <div
                    className="hidden md:block text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
                    style={{ color: c.accent, borderColor: c.accent + '88', background: c.accent + '14' }}
                  >
                    {c.desc}
                  </div>
                </NavLink>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayed.map((article) => (
                    <NavLink
                      key={article.id}
                      href={articleToPath(c.id, article.id)}
                      style={themeVars(cTheme)}
                      className={`theme-card group block w-full text-left p-5 ${cTheme.frameClass}`}
                    >
                      <div
                        className="flex items-center gap-2 text-xs font-medium"
                        style={{ color: c.accent }}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                      <h2
                        className="mt-3 font-serif-display text-lg md:text-xl leading-snug text-white"
                      >
                        {article.title}
                      </h2>
                      <div className="mt-1.5 text-sm card-sub opacity-80 line-clamp-2">{article.subtitle}</div>
                      <div
                        className="mt-4 flex items-center gap-2 text-sm font-medium card-cta"
                        style={{ color: c.accent }}
                      >
                        {t.articlePage.readMore}
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          style={{ color: c.accent }}
                        />
                      </div>
                    </NavLink>
                  ))}
                </div>

                <div className="mt-5 flex justify-end">
                  <NavLink
                    href={viewToPath(c.id)}
                    className="group inline-flex items-center gap-2 text-sm font-semibold hover:brightness-125 transition"
                    style={{ color: c.accent }}
                  >
                    {VIEW_ALL_LABEL[c.id]} ({total})
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14 p-7 rounded-2xl border border-gold-500/30 bg-navy-900/60 text-center backdrop-blur-md">
          <h3 className="font-serif-display text-xl md:text-2xl text-gold-200">
            {t.articlePage.funnelTitle}
          </h3>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {t.articlePage.funnelBody}
          </p>
          <button
            onClick={onConsult}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all"
          >
            {t.articlePage.funnelCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
