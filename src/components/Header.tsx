import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { viewToPath, type View } from '../nav';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';

type NavItem = { id: View; label: string; children?: SectionId[] };

export default function Header({
  onNavigate,
  onConsult,
}: {
  onNavigate: (v: View) => void;
  onConsult: () => void;
}) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV: NavItem[] = [
    { id: 'insurance', label: t.nav.insurance },
    { id: 'guardian', label: t.nav.guardian },
    { id: 'arkPilot', label: t.nav.arkPilot },
    { id: 'assetmap', label: t.nav.assetmap },
    { id: 'about', label: t.nav.about },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/85 backdrop-blur-xl border-b border-slate-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <NavLink href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold-500/30 blur-md group-hover:bg-gold-500/50 transition-all" />
              <img src="/Finark.png" alt="Finark" width={28} height={28} className="relative w-7 h-7 object-contain rounded-full" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-lg font-semibold tracking-[0.2em] text-white">
                {t.brand.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] text-slate-400 mt-0.5">
                {t.brand.tagline}
              </span>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.id}
                href={viewToPath(item.id)}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-gold-300 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-2/3 transition-all duration-300" />
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={onConsult}
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-sm font-semibold hover:shadow-gold-glow transition-all"
            >
              {t.nav.consult}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-slate-200"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.id}
                  href={viewToPath(item.id)}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-left text-sm text-slate-300 hover:text-gold-300 hover:bg-navy-800/50 rounded-lg transition-colors"
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  onConsult();
                  setMobileOpen(false);
                }}
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-sm font-semibold"
              >
                {t.nav.consult}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
