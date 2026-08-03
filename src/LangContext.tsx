import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { I18N, type Lang, type Dict } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LangContext = createContext<Ctx | null>(null);

/**
 * 受控语言上下文：lang 与 setLang 由 App 统一管理（App 负责把语言写进 URL 前缀）。
 * 此处仅负责把当前语言同步到 <html lang> 与 dir（阿拉伯语 RTL）。
 */
export function LangProvider({
  lang,
  setLang,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const value: Ctx = { lang, setLang, t: I18N[lang] };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
