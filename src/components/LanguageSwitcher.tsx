import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLang } from '../LangContext';
import { LANGS } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/60 hover:border-gold-500/60 hover:bg-navy-800/60 transition-all text-sm text-slate-200"
        aria-label={t.nav.langLabel}
      >
        <Globe className="w-4 h-4 text-gold-500" />
        <span className="font-medium tracking-wide">{current.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-700/60 bg-navy-900/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? 'bg-gold-500/15 text-gold-300'
                  : 'text-slate-300 hover:bg-navy-700/60 hover:text-white'
              }`}
            >
              <span className="font-medium">{l.label}</span>
              <span className="text-xs text-slate-500">{l.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
