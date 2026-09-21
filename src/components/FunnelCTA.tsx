import { ArrowRight } from 'lucide-react';
import { useLang } from '../LangContext';

/** 转化漏斗 CTA（文章页与系列聚合页共用，避免样式漂移）。 */
export default function FunnelCTA({
  t,
  onConsult,
}: {
  t: ReturnType<typeof useLang>['t'];
  onConsult: () => void;
}) {
  return (
    <div className="mt-14 p-7 rounded-2xl border border-gold-500/30 bg-navy-900/60 text-center backdrop-blur-md">
      <h3 className="font-serif-display text-xl md:text-2xl text-gold-200">
        {t.articlePage.funnelTitle}
      </h3>
      <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
        {t.articlePage.funnelBody}
      </p>
      <button
        onClick={onConsult}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all"
      >
        {t.articlePage.funnelCta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
