import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { I18N, type Lang } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof I18N)[Lang];
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const value: Ctx = { lang, setLang, t: I18N[lang] };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
