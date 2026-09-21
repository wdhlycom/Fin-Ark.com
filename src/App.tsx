import { useState, useCallback, useEffect } from 'react';
import { LangProvider } from './LangContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreCards from './components/CoreCards';
import CalculatorSection from './components/CalculatorSection';
import CaseStudies from './components/CaseStudies';
import Threshold from './components/Threshold';
import Consultation from './components/Consultation';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import AssetMapPage from './components/AssetMapPage';
import AboutPage from './components/AboutPage';
import CasesPage from './components/CasesPage';
import { I18N, SECTIONS, type Lang, type SectionId } from './i18n';
import { seoHeadNodes, seoMeta } from './seo';
import {
  parsePath,
  viewToPath,
  withLang,
  setLangPrefix,
  splitLang,
  LANGS,
  DEFAULT_LANG,
  detectLang,
  type View,
} from './nav';

const isSection = (v: View): v is SectionId => (SECTIONS as string[]).includes(v);

/** 当前文章在指定语言是否存在（用于切换语言时避免跳到无译文的死链） */
function articleExistsInLang(lang: Lang, section: SectionId, id: string): boolean {
  return (I18N[lang].articles[section] ?? []).some((a) => a.id === id);
}

/** 维护 <head> 中的 title / description / canonical / hreflang / Open Graph / JSON-LD。
 *  逻辑统一由 seo.ts 的 seoMeta + seoHeadNodes 提供：客户端与服务端预渲染共用同一套规则，
 *  保证 SPA 路由切换后 head 与静态 HTML 完全一致（首屏由预渲染写死，切换时由此处重建）。 */
function updateSeoHead(url: string) {
  const origin = window.location.origin;
  const head = document.head;
  // 先清除上一轮注入（含首屏由预渲染写入）的 data-seo 标签，避免路由切换后标签堆积
  head.querySelectorAll('[data-seo]').forEach((n) => n.remove());

  document.title = seoMeta(url, origin).title;

  for (const node of seoHeadNodes(url, origin)) {
    const el = document.createElement(node.tag);
    for (const [k, v] of Object.entries(node.attrs)) el.setAttribute(k, v);
    if (node.tag === 'script') el.textContent = node.text;
    el.setAttribute('data-seo', '');
    head.appendChild(el);
  }
}

function App({ serverUrl }: { serverUrl?: string } = {}) {
  // 服务端预渲染时由 serverUrl 提供路径；客户端回退到 window.location。
  const pathname =
    serverUrl ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const initialParsed = parsePath(pathname);
  const [lang, setLangState] = useState<Lang>(initialParsed.lang ?? detectLang());
  const [view, setView] = useState<View>(initialParsed.view);
  const [articleSlug, setArticleSlug] = useState<string | undefined>(initialParsed.articleSlug);

  // 首访：若 URL 未带语言前缀（旧链接 / 根），用检测到的语言补全（replaceState 不污染历史）
  useEffect(() => {
    if (initialParsed.lang == null) {
      const target = withLang(lang, window.location.pathname);
      window.history.replaceState({}, '', target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 同步 SEO head
  useEffect(() => {
    updateSeoHead(window.location.pathname);
  }, [lang, view, articleSlug]);

  // 同步 <html> 的 lang 与 dir（阿拉伯语 RTL）：覆盖 SSR 预渲染后客户端切换语言的情况。
  // 直链打开 /ar/ 已由 prerender 注入 dir="rtl"；此处补上 SPA 跳转时的缺口，避免阿语以 LTR 渲染。
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // 浏览器前进/后退、手动改路径、跨页深链统一走这一条
  useEffect(() => {
    const onPop = () => {
      const p = parsePath(window.location.pathname);
      setLangState(p.lang ?? lang);
      setView(p.view);
      setArticleSlug(p.articleSlug);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [lang]);

  // 切换语言：重写当前 URL 的语言段 + 持久化偏好（地址栏同步，链接可分享 / 可抓取）
  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      try {
        localStorage.setItem('finark-lang', l);
      } catch {
        /* ignore */
      }
      let target = setLangPrefix(l, window.location.pathname);
      let nextView = parsePath(target).view;
      let nextSlug = parsePath(target).articleSlug;
      // 若当前是文章页且目标语言没有该译文，回退到该板块列表，避免死链
      if (nextSlug && isSection(nextView)) {
        const art = (I18N[lang].articles[nextView] ?? []).find(
          (a) => (a.slug ?? a.id) === nextSlug
        );
        if (art && !articleExistsInLang(l, nextView, art.id)) {
          target = withLang(l, viewToPath(nextView));
          nextView = nextView;
          nextSlug = undefined;
        }
      }
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
        setView(nextView);
        setArticleSlug(nextSlug);
      }
      setLangState(l);
    },
    [lang]
  );

  const navigate = useCallback(
    (v: View) => {
      const target = withLang(lang, viewToPath(v));
      if (window.location.pathname === target) {
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.history.pushState({}, '', target);
        const p = parsePath(target);
        setView(p.view);
        setArticleSlug(p.articleSlug);
        window.scrollTo({ top: 0 });
      }
    },
    [lang]
  );

  const goToHome = useCallback(() => {
    const target = withLang(lang, '/');
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      setView('home');
      setArticleSlug(undefined);
    }
  }, [lang]);

  const goConsult = useCallback(() => {
    if (window.location.pathname !== withLang(lang, '/')) goToHome();
    setTimeout(() => {
      document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, [lang, goToHome]);

  const goExplore = useCallback(() => {
    if (window.location.pathname !== withLang(lang, '/')) goToHome();
    setTimeout(() => {
      document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, [lang, goToHome]);

  return (
    <LangProvider lang={lang} setLang={setLang}>
      <div className="min-h-screen bg-[#0B0F17] text-slate-200">
        <Header onNavigate={navigate} onConsult={goConsult} />

        {view === 'home' ? (
          <main key={view} className="animate-page-in">
            <Hero onExplore={goExplore} onConsult={goConsult} />
            <CoreCards onOpenSection={navigate} />
            <div className="section-divider" />
            <CalculatorSection />
            <div className="section-divider" />
            <CaseStudies />
            <div className="section-divider" />
            <Threshold />
            <Consultation />
          </main>
        ) : view === 'assetmap' ? (
          <main key={view} className="animate-page-in">
            <AssetMapPage onConsult={goConsult} />
          </main>
        ) : view === 'about' ? (
          <main key={view} className="animate-page-in">
            <AboutPage onConsult={goConsult} />
          </main>
        ) : view === 'cases' ? (
          <main key={view} className="animate-page-in">
            <CasesPage />
          </main>
        ) : (
          <main key={view} className="animate-page-in">
            <ArticlePage section={view} articleId={articleSlug} onConsult={goConsult} />
          </main>
        )}

        <Footer onNavigate={navigate} />
        <Chatbot />
      </div>
    </LangProvider>
  );
}

export default App;
