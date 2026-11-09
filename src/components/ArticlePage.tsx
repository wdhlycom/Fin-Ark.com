import type { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, FileText, Calendar, ArrowRight, ExternalLink, Layers } from 'lucide-react';
import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { SECTION_HEADER } from '../sectionHeaderText';
import { getTheme, themeVars } from '../sectionTheme';
import { articleToPath, viewToPath } from '../nav';
import { deriveCategory, CATEGORY_THEME, categoryLabel, CATEGORIZED_SECTIONS } from '../articleCategory';
import { SECTION_CITATIONS } from '../seo';
import { TOPIC_PAGES, topicCopy, topicToPath } from '../data/topicPages';
import { sectionIntro } from '../data/sectionIntros';
import NavLink from './NavLink';
import SectionHeader from './SectionHeader';
import FunnelCTA from './FunnelCTA';
import GuardianSeriesPage from './GuardianSeriesPage';
import { AUTHOR, authorCopy } from '../author';
import { SERIES_ORDER, formatSeriesNum, seriesCopy } from '../data/guardianSeries';

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
  // 板块正文导语：各语言各自撰写，随页面一起预渲染，补上原先过薄的列表页正文。
  const intro = sectionIntro(lang, section);

  const article = articleId
    ? articles.find((a) => (a.slug ?? a.id) === articleId) ??
      articles.find((a) => a.id === articleId)
    : undefined;

  // 守护者觉醒系列：列表视图升级为系列聚合页（hub：导读 + 四辑聚类 + CollectionPage JSON-LD）
  if (section === 'guardian' && !article) {
    return <GuardianSeriesPage onConsult={onConsult} />;
  }

  // Reader view（文章详情，支持深链 /a/<section>/<id>）
  if (article) {
    const c = authorCopy(lang);
    const isSeriesMember = section === 'guardian' && SERIES_ORDER.some((e) => e.id === article.id);
    const citations = SECTION_CITATIONS[section] ?? [];

    return (
      <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* 面包屑：首页 / 板块（只列到所在目录，不含文章名） */}
          <nav
            aria-label="breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
          >
            <NavLink
              href="/"
              style={vars}
              className="inline-flex items-center gap-1.5 hover:text-[color:var(--accent)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.nav.home}
            </NavLink>
            <span className="text-slate-600">/</span>
            <NavLink
              href={viewToPath(section)}
              style={vars}
              className="hover:text-[color:var(--accent)] transition-colors"
            >
              {t.nav[section]}
            </NavLink>
          </nav>

          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.nav[section]}</span>
            <span className="mx-1">·</span>
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </div>

          <h1 className="mt-4 font-serif-display text-xl md:text-2xl lg:text-3xl text-white leading-tight text-balance">
            {article.title}
          </h1>
          <div className="mt-3 text-sm tracking-[0.15em] uppercase" style={{ color: theme.accent }}>
            {article.subtitle}
          </div>

          {/* 作者 byline（E-E-A-T 可见署名） */}
          <div className="mt-8 flex items-center gap-3">
            <img
              src={AUTHOR.photo}
              alt={lang === 'zh' ? `${c.name}形象照` : `Portrait of ${c.name}`}
              className="w-11 h-11 rounded-full object-cover ring-1 ring-white/15"
              loading="lazy"
            />
            <div>
              <div className="text-sm text-slate-100">
                {c.name}
                <span className="text-slate-400"> · {c.jobTitle}</span>
              </div>
              <div className="text-xs text-slate-500">{c.org}</div>
            </div>
          </div>

          <div className="mt-10 h-px hairline" />

          <article className="mt-10 space-y-8">
            {article.body.map((sec, i) => (
              <section key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                {sec.h && <h2 className="font-serif-display text-xl md:text-2xl text-gold-200">{sec.h}</h2>}
                <div className={`mt-3 text-slate-300 leading-[1.85] text-base md:text-[17px] md-body ${sec.h ? '' : 'mt-0'}`}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sec.p}</ReactMarkdown>
                </div>
              </section>
            ))}
          </article>

          {/* 作者卡 + 合规披露（E-E-A-T） */}
          <aside className="mt-14 p-6 rounded-2xl border border-gold-500/20 bg-navy-900/60 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <img
                src={AUTHOR.photo}
                alt={lang === 'zh' ? `${c.name}形象照` : `Portrait of ${c.name}`}
                className="w-16 h-16 rounded-full object-cover ring-1 ring-white/15 shrink-0"
                loading="lazy"
              />
              <div>
                <div className="font-serif-display text-lg text-white">
                  {c.name}
                  <span className="ml-2 text-xs tracking-[0.15em] uppercase font-sans" style={{ color: theme.accent }}>
                    {c.jobTitle}
                  </span>
                </div>
                <div className="text-xs text-slate-500">{c.org}</div>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">{c.bio}</p>
              </div>
            </div>
            <p className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-500 leading-relaxed">
              {c.disclosure}
            </p>
          </aside>

          {/* 资料来源（E-E-A-T 可见引用）：复用 seo.ts 的板块监管来源，正文里让读者可见可点 */}
          {citations.length > 0 && (
            <section className="mt-8" aria-label={t.articlePage.sourcesTitle}>
              <h2 className="font-serif-display text-lg text-gold-200">
                {t.articlePage.sourcesTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {t.articlePage.sourcesHint}
              </p>
              <ul className="mt-4 space-y-2">
                {citations.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-[color:var(--accent)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                      <span>{s.name}</span>
                      <span className="text-slate-500 break-all">{s.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 专题延伸阅读：让专题页从它收录的文章获得内链，而非只靠 sitemap 被发现 */}
          {topicsForArticle(article.id).map((tp) => {
            const tc = topicCopy(tp.id, lang);
            return (
              <NavLink
                key={tp.id}
                href={topicToPath(tp.id)}
                style={vars}
                className="theme-card group block p-6 mt-8"
              >
                <div
                  className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase"
                  style={{ color: theme.accent }}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  {tc.subtitle}
                </div>
                <h2 className="mt-2 font-serif-display text-xl text-white leading-snug">
                  {tc.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {tc.intro}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm card-cta">
                  {t.articlePage.readMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            );
          })}

          {/* 系列篇间导航（守护者觉醒 36 篇） */}
          {isSeriesMember && <SeriesPrevNext section={section} currentId={article.id} />}

          <FunnelCTA t={t} onConsult={onConsult} />
        </div>
      </div>
    );
  }

  // List view（板块文章列表视图）
  return (
    <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
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

        {/* 板块正文导语：把本栏目覆盖的具体问题写清楚，解决列表页正文过薄 */}
        {intro && (
          <section className="mt-8">
            <p className="text-slate-300 leading-[1.9] text-[15px] md:text-base">{intro}</p>
          </section>
        )}

        {/* 专题入口（topic hub）：把同一搜索意图的文章聚成专题，精准命中长尾词 */}
        {topicsForSection(section).map((tp) => {
          const tc = topicCopy(tp.id, lang);
          return (
            <NavLink
              key={tp.id}
              href={topicToPath(tp.id)}
              style={vars}
              className="theme-card group block w-full text-left p-6 mt-8"
            >
              <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase" style={{ color: theme.accent }}>
                <Layers className="w-3.5 h-3.5" />
                {tc.subtitle}
              </div>
              <h2 className="mt-2 font-serif-display text-xl md:text-2xl text-white leading-snug">
                {tc.title}
              </h2>
              <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-2">{tc.intro}</p>
              <div className="mt-4 flex items-center gap-2 text-sm card-cta">
                {t.articlePage.readMore}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </NavLink>
          );
        })}

        <div className="mt-10 space-y-4">
          {articles.map((article) => {
            const catKey = CATEGORIZED_SECTIONS.has(section) ? deriveCategory(article) : null;
            const cat = catKey ? CATEGORY_THEME[catKey] : null;
            return (
              <NavLink
                key={article.id}
                href={articleToPath(section, article.slug || article.id)}
                style={{
                  ...vars,
                  // 分类卡片：四边描边采用该分类的语义色（淡化版），hover 时提亮到实色
                  ...(cat
                    ? {
                        ['--cat-border' as string]: cat.borderSoft,
                        ['--cat-hover' as string]: cat.border,
                      }
                    : null),
                }}
                className={`theme-card group block w-full text-left p-6 ${theme.frameClass}${cat ? ' cat-frame' : ''}`}
              >
                {cat && (
                  <span
                    className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{ background: cat.pillBg, color: cat.pillText, borderColor: cat.border }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.border }} />
                    {categoryLabel(catKey!, lang)}
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

/** 返回归属某板块的主题聚合页（topic hub）列表。 */
function topicsForSection(section: SectionId) {
  return TOPIC_PAGES.filter((tp) => tp.section === section);
}

/** 返回收录了指定文章 id 的专题页（文章页文末「延伸阅读」用）。 */
function topicsForArticle(articleId: string) {
  return TOPIC_PAGES.filter((tp) => tp.articleIds.includes(articleId));
}

/** 守护者觉醒系列篇间导航：按系列全集顺序（01→30 + 番外 01–06）渲染上一篇/下一篇。 */
function SeriesPrevNext({ section, currentId }: { section: SectionId; currentId: string }) {
  const { t, lang } = useLang();
  const s = seriesCopy(lang);
  const theme = getTheme(section);
  const vars = themeVars(theme);
  const articles = t.articles[section];

  const idx = SERIES_ORDER.findIndex((e) => e.id === currentId);
  if (idx < 0) return null;

  const resolve = (entry?: (typeof SERIES_ORDER)[number]) => {
    if (!entry) return null;
    const a = articles.find((x) => x.id === entry.id);
    return a ? { entry, a } : null;
  };
  const prev = resolve(SERIES_ORDER[idx - 1]);
  const next = resolve(SERIES_ORDER[idx + 1]);
  if (!prev && !next) return null;

  const cardClass =
    'theme-card group block p-4 hover:border-gold-500/40 transition-colors min-w-0';
  const labelClass = 'flex items-center gap-1.5 text-xs text-slate-500';

  return (
    <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label={s.name}>
      {prev ? (
        <NavLink
          href={articleToPath(section, prev.a.slug || prev.a.id)}
          style={vars}
          className={cardClass}
        >
          <span className={labelClass}>
            <ArrowLeft className="w-3.5 h-3.5" />
            {s.prevLabel}
            <span className="text-slate-600">·</span>
            {formatSeriesNum(prev.entry, lang)}
          </span>
          <div className="mt-2 text-sm text-slate-200 leading-snug line-clamp-2">
            {prev.a.title}
          </div>
        </NavLink>
      ) : (
        <span />
      )}
      {next && (
        <NavLink
          href={articleToPath(section, next.a.slug || next.a.id)}
          style={vars}
          className={`${cardClass} sm:text-right`}
        >
          <span className={`${labelClass} sm:justify-end`}>
            {formatSeriesNum(next.entry, lang)}
            <span className="text-slate-600">·</span>
            {s.nextLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="mt-2 text-sm text-slate-200 leading-snug line-clamp-2">
            {next.a.title}
          </div>
        </NavLink>
      )}
    </nav>
  );
}
