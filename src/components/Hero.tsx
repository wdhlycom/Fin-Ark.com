import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLang } from '../LangContext';
import HeroChart from './HeroChart';

export default function Hero({
  onExplore,
  onConsult,
}: {
  onExplore: () => void;
  onConsult: () => void;
}) {
  const { t } = useLang();

  return (
    <section className="relative min-h-[88vh] bg-radial-navy overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-navy-600/30 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-6 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-xs tracking-[0.2em] text-gold-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            {t.hero.eyebrow}
          </div>

          <h1 className="mt-8 mb-6 font-serif-display text-4xl md:text-5xl lg:text-6xl leading-[1.4] text-white text-balance">
            {t.hero.title}{' '}
            <span className="gold-gradient-text italic">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base md:text-lg text-slate-300 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onConsult}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-slate-600/60 text-slate-200 hover:border-gold-500/50 hover:text-gold-300 transition-all"
            >
              {t.hero.ctaSecondary}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-2xl">
            {[
              { label: t.hero.stat1Label, value: t.hero.stat1Value },
              { label: t.hero.stat2Label, value: t.hero.stat2Value },
              { label: t.hero.stat3Label, value: t.hero.stat3Value },
            ].map((s, i) => (
              <div key={i} className="border-l border-gold-500/30 pl-4">
                <div className="font-serif-display text-2xl md:text-3xl text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-slate-400 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 animate-fade-in">
          <HeroChart title={t.hero.chartTitle} caption={t.hero.chartCaption} />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px hairline" />
    </section>
  );
}
