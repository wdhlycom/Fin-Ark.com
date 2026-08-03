import { useLang } from '../LangContext';
import { SECTIONS, type SectionId } from '../i18n';
import { viewToPath } from '../nav';
import NavLink from './NavLink';

export default function Footer({ onNavigate }: { onNavigate: (id: SectionId | 'home') => void }) {
  const { t } = useLang();
  return (
    <footer className="relative bg-navy-950 border-t border-slate-800/60 pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <NavLink href="/" className="flex items-center gap-3">
              <img
                src="/Finark.png"
                alt="Finark"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-full"
              />
              <div>
                <div className="text-lg font-semibold tracking-[0.2em] text-white">
                  {t.brand.name}
                </div>
                <div className="text-[10px] tracking-[0.3em] text-slate-500">
                  {t.brand.tagline}
                </div>
              </div>
            </NavLink>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-md">
              {t.footer.disclaimer}
            </p>
            <div className="mt-5 text-xs tracking-[0.15em] text-gold-400/80 uppercase">
              {t.footer.addr}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8">
            <div className="text-xs tracking-[0.2em] text-slate-500 uppercase">
              {t.footer.links}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SECTIONS.map((s) => (
                <NavLink
                  key={s}
                  href={viewToPath(s)}
                  className="text-sm text-slate-300 hover:text-gold-300 transition-colors text-left"
                >
                  {t.nav[s]}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs">
          <span className="text-slate-600">© {new Date().getFullYear()} fin-ark.com</span>
          <span className="text-slate-500">{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
