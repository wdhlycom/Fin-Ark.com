import { ArrowRight, Shield, Landmark, Coins, Binary, Newspaper, type LucideIcon } from 'lucide-react';
import { useLang } from '../LangContext';
import { type SectionId } from '../i18n';
import { viewToPath } from '../nav';
import NavLink from './NavLink';

const ICONS: Record<string, LucideIcon> = {
  Shield,
  Landmark,
  Coins,
  Binary,
  Newspaper,
};

export default function CoreCards({
  onOpenSection,
}: {
  onOpenSection: (id: SectionId) => void;
}) {
  const { t } = useLang();

  return (
    <section id="pillars" className="relative pt-8 lg:pt-12 pb-16 lg:pb-24 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[360px] rounded-full bg-gold-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-gold-500 uppercase">
            {t.cards.items.length.toString().padStart(2, '0')} · {t.cards.sectionTitle}
          </div>
          <h2 className="mt-4 font-serif-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {t.cards.sectionTitle}
          </h2>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            {t.cards.sectionSubtitle}
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.cards.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Shield;
            const isFeature = i === 0;
            const cardStyle = {
              '--accent': item.accent,
              '--accent-soft': item.accent + '33',
              '--accent-glow': item.accent + '40',
            } as React.CSSProperties;
            return (
              <NavLink
                key={item.id}
                href={viewToPath(item.id)}
                className={`core-card group relative text-left p-7 rounded-2xl border block transition-all duration-500 overflow-hidden ${
                  isFeature
                    ? 'core-card--feature lg:col-span-2 lg:row-span-1'
                    : 'bg-navy-900/40 hover:bg-navy-800/50'
                }`}
                style={{ ...cardStyle, animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-px transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.55 }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full border transition-colors"
                    style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase border"
                    style={{ color: 'var(--accent)', borderColor: 'var(--accent-soft)', background: 'var(--accent-soft)' }}
                  >
                    {item.role}
                  </span>
                </div>

                <h3 className={`mt-6 text-white ${isFeature ? 'text-2xl md:text-3xl' : 'text-xl'} font-semibold`}>
                  {item.title}
                </h3>
                <div className="mt-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  {item.subtitle}
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{item.summary}</p>

                <div className="mt-6 flex items-center gap-2 text-sm transition-colors" style={{ color: 'var(--accent)' }}>
                  {item.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
