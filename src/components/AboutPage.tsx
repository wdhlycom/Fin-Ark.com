import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Compass } from 'lucide-react';
import { useLang } from '../LangContext';
import NavLink from './NavLink';

export default function AboutPage({
  onConsult,
}: {
  onConsult: () => void;
}) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const a = t.about;

  return (
    <div className="relative min-h-screen bg-radial-navy pt-28 pb-24">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[900px] mx-auto px-6 lg:px-10">
        <NavLink
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.articlePage.backLabel}
        </NavLink>

        {/* 区块 A 品牌介绍 */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-navy-800/80 border border-gold-500/30">
            <Compass className="w-6 h-6 text-gold-500" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif-display text-3xl md:text-4xl text-white leading-tight">
            {a.introTitle}
          </h1>
        </div>
        <p className="mt-6 text-slate-300 text-base md:text-lg leading-[1.9] max-w-3xl">
          {a.introBody}
        </p>

        {/* 区块 B 服务流程 */}
        <h2 className="mt-16 font-serif-display text-2xl md:text-3xl text-gold-200">{t.about.processTitle}</h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {a.steps.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-800/70 bg-navy-900/40 hover:border-gold-500/40 transition-all backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/15 text-gold-300 text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="text-lg font-semibold text-white">{s.t}</div>
              </div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        {/* 区块 C FAQ */}
        <h2 className="mt-16 font-serif-display text-2xl md:text-3xl text-gold-200">{t.about.faqTitle}</h2>
        <div className="mt-8 space-y-3">
          {a.faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-800/70 bg-navy-900/40 overflow-hidden backdrop-blur-md"
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-base text-white font-medium">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ${
                    open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 区块 D CTA */}
        <div className="mt-14 p-7 rounded-2xl border border-gold-500/30 bg-navy-900/60 text-center backdrop-blur-md">
          <h3 className="font-serif-display text-xl md:text-2xl text-gold-200">{a.ctaTitle}</h3>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {a.ctaBody}
          </p>
          <button
            onClick={onConsult}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold hover:shadow-gold-glow transition-all"
          >
            {a.ctaBtn}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
