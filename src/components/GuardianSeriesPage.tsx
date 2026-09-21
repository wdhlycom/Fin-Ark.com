import { ArrowLeft, ArrowRight, Calendar, FileText, Layers } from 'lucide-react';
import { useLang } from '../LangContext';
import { getTheme, themeVars } from '../sectionTheme';
import { articleToPath } from '../nav';
import NavLink from './NavLink';
import FunnelCTA from './FunnelCTA';
import {
  SERIES_ORDER,
  seriesCopy,
  seriesPartCopy,
  formatSeriesNum,
} from '../data/guardianSeries';
import { authorCopy, AUTHOR } from '../author';

/**
 * 「守护者的觉醒」系列聚合页（hub）。
 * 替换 guardian 板块的纯时间流列表：系列导读 + 四辑聚类 + 每辑文章卡。
 * SEO：页面元信息与 CollectionPage JSON-LD 见 seo.ts 的 guardian 分支。
 */
export default function GuardianSeriesPage({ onConsult }: { onConsult: () => void }) {
  const { t, lang } = useLang();
  const theme = getTheme('guardian');
  const vars = themeVars(theme);
  const s = seriesCopy(lang);
  const parts = seriesPartCopy(lang);
  const c = authorCopy(lang);
  const articles = t.articles.guardian ?? [];
  const byId = new Map(articles.map((a) => [a.id, a]));

  const total = SERIES_ORDER.filter((e) => byId.has(e.id)).length;

  // 不属于系列的 guardian 文章（es/ar 的独立翻译 id）：追加展示，避免从站内导航消失
  const seriesIds = new Set(SERIES_ORDER.map((e) => e.id));
  const others = articles.filter((a) => !seriesIds.has(a.id));

  return (
    <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[900px] mx-auto px-6 lg:px-10">
        <NavLink
          href="/"
          style={vars}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[color:var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.articlePage.backLabel}
        </NavLink>

        {/* ── 系列导读区 ─────────────────────────────────── */}
        <header className="mt-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest border border-gold-500/40 text-gold-300 bg-gold-500/10"
          >
            <FileText className="w-3.5 h-3.5" />
            {s.tag}
          </span>
          <h1 className="mt-5 font-serif-display text-4xl md:text-5xl text-white leading-tight text-balance">
            {s.name}
          </h1>
          <div className="mt-4 text-base md:text-lg tracking-wide" style={{ color: theme.accent }}>
            {s.subtitle}
          </div>
          <p className="mt-6 text-slate-300 leading-[1.85] text-[15px] md:text-base max-w-3xl">
            {s.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: theme.accent }} />
              {total} {s.statsArticles}
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers className="w-4 h-4" style={{ color: theme.accent }} />
              {parts.length} {s.statsParts}
            </span>
            <span className="inline-flex items-center gap-2">
              <img
                src={AUTHOR.photo}
                alt={c.name}
                className="w-5 h-5 rounded-full object-cover"
                loading="lazy"
              />
              {c.name} · {c.jobTitle}
            </span>
          </div>
        </header>

        <div className="mt-10 h-px hairline" />

        {/* ── 四辑聚类 ───────────────────────────────────── */}
        {parts.map((part) => (
          <section key={part.label} className="mt-14">
            <div className="flex items-baseline gap-3">
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase shrink-0"
                style={{ color: theme.accent }}
              >
                {part.label}
              </span>
              <h2 className="font-serif-display text-2xl md:text-3xl text-white">{part.title}</h2>
              <span className="text-xs text-slate-500 shrink-0">{part.ids.length}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-3xl">{part.desc}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {part.ids.map((id) => {
                const entry = SERIES_ORDER.find((e) => e.id === id);
                const a = byId.get(id);
                if (!a || !entry) return null;
                return (
                  <NavLink
                    key={id}
                    href={articleToPath('guardian', a.slug || a.id)}
                    style={vars}
                    className={`theme-card group block p-5 ${theme.frameClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium border"
                        style={{ color: theme.accent, borderColor: `${theme.accent}55` }}
                      >
                        {formatSeriesNum(entry, lang)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {a.date}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif-display text-lg text-white leading-snug group-hover:text-gold-200 transition-colors">
                      {a.title}
                    </h3>
                    {a.subtitle && (
                      <div className="mt-1.5 text-xs card-sub opacity-80">{a.subtitle}</div>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-sm card-cta">
                      {t.articlePage.readMore}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </section>
        ))}

        {/* ── 非系列文章兜底（es/ar 的独立翻译篇目）───────────────── */}
        {others.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif-display text-2xl md:text-3xl text-white">
              {s.moreLabel}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {others.map((a) => (
                <NavLink
                  key={a.id}
                  href={articleToPath('guardian', a.slug || a.id)}
                  style={vars}
                  className={`theme-card group block p-5 ${theme.frameClass}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif-display text-lg text-white leading-snug group-hover:text-gold-200 transition-colors">
                    {a.title}
                  </h3>
                  {a.subtitle && (
                    <div className="mt-1.5 text-xs card-sub opacity-80">{a.subtitle}</div>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-sm card-cta">
                    {t.articlePage.readMore}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </NavLink>
              ))}
            </div>
          </section>
        )}

        <FunnelCTA t={t} onConsult={onConsult} />
      </div>
    </div>
  );
}
