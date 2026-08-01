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
import { parsePath, viewToPath, type View } from './nav';

function App() {
  const initial = parsePath(window.location.pathname);
  const [view, setView] = useState<View>(initial.view);
  const [articleId, setArticleId] = useState<string | undefined>(initial.articleId);

  // 浏览器前进/后退、手动改路径、跨页深链统一走这一条
  useEffect(() => {
    const onPop = () => {
      const p = parsePath(window.location.pathname);
      setView(p.view);
      setArticleId(p.articleId);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((v: View) => {
    const target = viewToPath(v);
    if (window.location.pathname === target) {
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.history.pushState({}, '', target);
      const p = parsePath(target);
      setView(p.view);
      setArticleId(p.articleId);
      window.scrollTo({ top: 0 });
    }
  }, []);

  const goConsult = useCallback(() => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setView('home');
      setArticleId(undefined);
    }
    setTimeout(() => {
      document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, [setView, setArticleId]);

  const goExplore = useCallback(() => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setView('home');
      setArticleId(undefined);
    }
    setTimeout(() => {
      document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, [setView, setArticleId]);

  return (
    <LangProvider>
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
            <ArticlePage section={view} articleId={articleId} onConsult={goConsult} />
          </main>
        )}

        <Footer onNavigate={navigate} />
        <Chatbot />
      </div>
    </LangProvider>
  );
}

export default App;
