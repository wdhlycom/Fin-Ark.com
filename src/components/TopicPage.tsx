import { ArrowLeft, ArrowRight, Calendar, FileText, Layers } from 'lucide-react';
import { useLang } from '../LangContext';
import { getTheme, themeVars } from '../sectionTheme';
import { articleToPath } from '../nav';
import NavLink from './NavLink';
import FunnelCTA from './FunnelCTA';
import { getTopicPage, topicCopy } from '../data/topicPages';
import { authorCopy, AUTHOR } from '../author';
import { SECTIONS } from '../i18n';

/**
 * 主题聚合页（Topic Hub）。
 * 把散落在多个板块、但共享同一搜索意图（如「黄金怎么存」）的文章聚成一张主题页，
 * 用精准 title + 聚合内链 + CollectionPage JSON-LD 命中长尾词，并把权重在集群内传递。
 * SEO：页面元信息与 CollectionPage JSON-LD 见 seo.ts 的 topic 分支。
 */
export default function TopicPage({
  topicId,
  onConsult,
}: {
  topicId: string;
  onConsult: () => void;
}) {
  const { t, lang } = useLang();
  const topic = getTopicPage(topicId);
  const copy = topicCopy(topicId, lang);
  const theme = getTheme(topic?.section ?? 'assetmap');
  const vars = themeVars(theme);
  const c = authorCopy(lang);

  // 聚合主题命中的文章（跨板块按 id 查找，保留主题页定义的顺序）
  const articles = (topic?.articleIds ?? []).flatMap((id) => {
    for (const sec of SECTIONS) {
      const a = (t.articles[sec] ?? []).find((x) => x.id === id);
      if (a) return [{ section: sec, a }];
    }
    return [];
  });

  if (!topic) {
    // 未知主题：兜底回首页列表（理论上不会走到，parsePath 已拦截）
    return (
      <div className="relative min-h-screen pt-28 pb-24" style={{ background: theme.pageBg }}>
        <div className="relative max-w-[900px] mx-auto px-6 text-slate-300">主题不存在</div>
      </div>
    );
  }

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

        {/* ── 专题导读 ─────────────────────────────────── */}
        <header className="mt-10">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest border"
            style={{ color: theme.accent, borderColor: `${theme.accent}55`, background: `${theme.accent}14` }}
          >
            <FileText className="w-3.5 h-3.5" />
            {copy.subtitle}
          </span>
          <h1 className="mt-5 font-serif-display text-3xl md:text-4xl text-white leading-tight text-balance">
            {copy.title}
          </h1>
          <p className="mt-6 text-slate-300 leading-[1.85] text-[15px] md:text-base max-w-3xl">
            {copy.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: theme.accent }} />
              {articles.length} {t.articlePage.listTitle}
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

        {/* ── 聚合文章卡 ───────────────────────────────── */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {articles.map(({ section, a }) => (
            <NavLink
              key={a.id}
              href={articleToPath(section, a.slug || a.id)}
              style={vars}
              className={`theme-card group block p-5 ${theme.frameClass}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Layers className="w-3.5 h-3.5" />
                  {t.nav[section]}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {a.date}
                </span>
              </div>
              <h2 className="mt-3 font-serif-display text-lg text-white leading-snug group-hover:text-gold-200 transition-colors">
                {a.title}
              </h2>
              {a.subtitle && <div className="mt-1.5 text-xs card-sub opacity-80">{a.subtitle}</div>}
              {a.summary && (
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-2">{a.summary}</p>
              )}
              <div className="mt-4 flex items-center gap-1.5 text-sm card-cta">
                {t.articlePage.readMore}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NavLink>
          ))}
        </div>

        <FunnelCTA t={t} onConsult={onConsult} />
      </div>
    </div>
  );
}
