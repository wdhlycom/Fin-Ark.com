import { useState, useEffect } from 'react';
import { useLang } from '../LangContext';
import { Briefcase, ArrowRight, X, UserCircle, AlertTriangle, GitBranch, BarChart3 } from 'lucide-react';
import NavLink from './NavLink';

export default function CaseStudies() {
  const { t } = useLang();
  const items = t.cases.items;
  const featuredIdx = t.cases.featuredId
    ? Math.max(0, items.findIndex((i) => i.id === t.cases.featuredId))
    : 0;
  const c = items[featuredIdx];

  const [modalIdx, setModalIdx] = useState<number | null>(null);

  useEffect(() => {
    if (modalIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalIdx]);

  const closeModal = () => setModalIdx(null);

  return (
    <section id="archives" className="relative py-14 lg:py-20 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-gold-500 uppercase">
            {t.cases.eyebrow}
          </div>
          <h2 className="mt-4 font-serif-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {t.cases.title}
          </h2>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">{t.cases.subtitle}</p>
        </div>

        <article className="mt-10 relative grid md:grid-cols-2 gap-6 p-7 lg:p-9 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-navy-900/50 to-navy-950/50 hover:border-gold-500/30 transition-colors overflow-hidden backdrop-blur-md">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600" />
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] text-gold-400 uppercase">{c.tag}</span>
            <h3 className="mt-3 font-serif-display text-2xl text-white leading-snug">
              {c.title}
            </h3>
            <div className="mt-4 flex items-start gap-2 text-sm text-slate-400">
              <Briefcase className="w-4 h-4 mt-0.5 text-gold-500/70 shrink-0" />
              <span>{c.profile}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-slate-300 leading-relaxed">{c.outcome}</p>
            <button
              onClick={() => setModalIdx(featuredIdx)}
              className="mt-5 inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors group/btn self-start"
            >
              {t.cases.viewSolution}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </article>

        <div className="mt-6">
          <NavLink
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-gold-300 transition-colors group/btn"
          >
            查看全部 {items.length} 个真实案例
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </div>

      {modalIdx !== null && (
        <CaseModal idx={modalIdx} onClose={closeModal} />
      )}
    </section>
  );
}

function CaseModal({ idx, onClose }: { idx: number; onClose: () => void }) {
  const { t } = useLang();
  const c = t.cases.items[idx];
  const labels = t.cases.modalLabels;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/85 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full my-8 p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-500/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full bg-navy-800 border border-slate-700/60 text-slate-400 hover:text-white hover:border-gold-500/60 transition-colors"
          aria-label={t.cases.modalClose}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-10">
          <span className="text-xs tracking-[0.2em] text-gold-400 uppercase">{c.tag}</span>
          <h3 className="mt-3 font-serif-display text-2xl md:text-3xl text-white leading-snug">
            {c.title}
          </h3>
        </div>

        <div className="mt-8 space-y-6">
          <ModalSection icon={<UserCircle className="w-4 h-4" />} label={labels.profile} value={c.modalProfile} />
          <ModalSection icon={<AlertTriangle className="w-4 h-4" />} label={labels.risk} value={c.modalRisk} />
          <ModalSection icon={<GitBranch className="w-4 h-4" />} label={labels.architecture} value={c.modalArchitecture} />
          <ModalSection icon={<BarChart3 className="w-4 h-4" />} label={labels.outcome} value={c.modalOutcome} accent />
        </div>
      </div>
    </div>
  );
}

function ModalSection({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.15em] ${accent ? 'text-gold-400' : 'text-slate-500'}`}>
        {icon}
        {label}
      </div>
      <p className={`mt-2.5 text-sm leading-[1.85] ${accent ? 'text-gold-200/90' : 'text-slate-300'}`}>
        {value}
      </p>
    </div>
  );
}
