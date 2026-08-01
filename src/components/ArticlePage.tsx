import type { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { SECTION_HEADER } from '../sectionHeaderText';
import { getTheme, themeVars } from '../sectionTheme';
import { articleToPath, viewToPath } from '../nav';
import { deriveCategory, CATEGORY_THEME, CATEGORIZED_SECTIONS } from '../articleCategory';
import NavLink from './NavLink';
import SectionHeader from './SectionHeader';

export default function ArticlePage({
  section,
  articleId,
  onConsult,
}: {
  section: SectionId;
  articleId?: string;
  onConsult: () => void;
}) {
  const { t, lang } = useLang();
  const articles = t.articles[section];
  const theme = getTheme(section);
  const vars = themeVars(theme);

  // 四大主板块页头统一文案（中文精确版，已剔除内部草稿词）；非中文回退到 i18n。
  const sh = lang === 'zh' ? SECTION_HEADER[section] : undefined;

  const article = articleId ? articles.find((a) => a.id === articleId) : undefined;

  // Reader view（文章详情，支持深链 /a/<section>/<id>）
  if (article) {
    return (
      <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-[800px] mx-auto px-6 lg:px-10">
          <NavLink
            href={viewToPath(section)}
            style={vars}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[color:var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.articlePage.backToList}
          </NavLink>

          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav[section]}</span>
            <span className="mx-1">·</span>
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </div>

          <h1 className="mt-4 font-serif-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight text-balance">
            {article.title}
          </h1>
          <div className="mt-3 text-sm tracking-[0.15em] uppercase" style={{ color: theme.accent }}>
            {article.subtitle}
          </div>

          <div className="mt-10 h-px hairline" />

          <article className="mt-10 space-y-8">
            {article.body.map((sec, i) => (
              <section key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                {sec.h && <h2 className="font-serif-display text-xl md:text-2xl text-gold-200">{sec.h}</h2>}
                <div className={`mt-3 text-slate-300 leading-[1.85] text-[15px] md:text-base md-body ${sec.h ? '' : 'mt-0'}`}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sec.p}</ReactMarkdown>
                </div>
              </section>
            ))}
          </article>

          <FunnelCTA t={t} onConsult={onConsult} />
        </div>
      </div>
    );
  }

  // List view（板块文章列表视图）
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

        <div className="mt-8">
          <SectionHeader
            section={section}
            badge={sh?.badge ?? t.nav[section]}
            title={sh?.title ?? t.articlePage.listTitle}
            subtitle={sh?.subtitle}
          />
        </div>

        <div className="mt-10 space-y-4">
          {articles.map((article) => {
            const catKey = CATEGORIZED_SECTIONS.has(section) ? deriveCategory(article) : null;
            const cat = catKey ? CATEGORY_THEME[catKey] : null;
            return (
              <NavLink
                key={article.id}
                href={articleToPath(section, article.id)}
                style={{ ...vars, ...(cat ? { borderLeft: `4px solid ${cat.border}` } : null) }}
                className={`theme-card group block w-full text-left p-6 ${theme.frameClass}`}
              >
                {cat && (
                  <span
                    className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{ background: cat.pillBg, color: cat.pillText, borderColor: cat.border }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.border }} />
                    {cat.label}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <h2 className="mt-3 font-serif-display text-xl md:text-2xl text-white leading-snug">
                  {article.title}
                </h2>
                <div className="mt-1.5 text-sm card-sub opacity-80">{article.subtitle}</div>
                {article.summary && (
                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">{article.summary}</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-sm card-cta">
                  {t.articlePage.readMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            );
          })}
        </div>

        <FunnelCTA t={t} onConsult={onConsult} />
      </div>
    </div>
  );
}

function FunnelCTA({
  t,
  onConsult,
}: {
  t: ReturnType<typeof useLang>['t'];
  onConsult: () => void;
}) {
  return (
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
  );
}
