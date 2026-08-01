import { useLang } from '../LangContext';
import { ShieldCheck } from 'lucide-react';

export default function Threshold() {
  const { t } = useLang();
  return (
    <section className="relative py-16 lg:py-24 bg-navy-800 border-y border-slate-700/40 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-10 text-center">
        <ShieldCheck className="w-8 h-8 text-gold-500 mx-auto" strokeWidth={1.5} />
        <p className="mt-6 font-serif-display text-2xl md:text-3xl lg:text-4xl text-white leading-snug text-balance">
          {t.threshold.line1}
        </p>
        <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          {t.threshold.line2}
        </p>
        <p className="mt-4 text-sm tracking-[0.15em] text-gold-400/80 uppercase">
          {t.threshold.line3}
        </p>
      </div>
    </section>
  );
}
