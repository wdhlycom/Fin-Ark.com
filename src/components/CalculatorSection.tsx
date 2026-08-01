import { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, Calculator, Lightbulb, MousePointerClick } from 'lucide-react';
import { useLang } from '../LangContext';
import CompoundChart from './CompoundChart';

type Series = { year: number; ark: number; trad: number };

function compute(premium: number, term: number, arkRate: number, years = 30): Series[] {
  const tradRate = 0.02;
  const ark = arkRate / 100;
  const out: Series[] = [];
  let arkBalance = 0;
  let tradBalance = 0;
  for (let y = 0; y <= years; y++) {
    if (y > 0) {
      arkBalance *= 1 + ark;
      tradBalance *= 1 + tradRate;
    }
    if (y > 0 && y <= term) {
      arkBalance += premium;
      tradBalance += premium;
    }
    out.push({ year: y, ark: arkBalance, trad: tradBalance });
  }
  return out;
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CalculatorSection() {
  const { t } = useLang();
  const { premium, setPremium, term, setTerm, rate, setRate } = useCalcState();

  const series = useMemo(() => compute(premium, term, rate), [premium, term, rate]);
  const y20 = series[20];
  const y30 = series[30];
  const gap20 = y20.ark - y20.trad;
  const gap30 = y30.ark - y30.trad;

  return (
    <section id="calculator" className="relative py-16 lg:py-24 bg-navy-900">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-gold-500 uppercase">{t.calc.eyebrow}</div>
          <h2 className="mt-4 font-serif-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {t.calc.title}
          </h2>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">{t.calc.subtitle}</p>

          <div className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-lg border border-gold-500/30 bg-gold-500/5">
            <Lightbulb className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gold-200/90 leading-relaxed">{t.calc.interactiveHint}</p>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 p-7 rounded-2xl border border-slate-800/70 bg-navy-950/50 backdrop-blur-md">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              {t.calc.eyebrow}
            </div>

            <label className="block">
              <span className="text-sm text-slate-300 flex items-center gap-1.5">
                {t.calc.premiumLabel}
                <span className="inline-flex items-center gap-0.5 text-[10px] text-gold-400/70">
                  <MousePointerClick className="w-3 h-3" />
                  {t.calc.editableHint}
                </span>
              </span>
              <div className="mt-2 flex items-center rounded-lg border border-slate-700/60 bg-navy-900/60 hover:border-gold-500 focus-within:border-gold-500 transition-colors">
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={premium}
                  onChange={(e) => setPremium(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-transparent px-4 py-3 text-white outline-none"
                />
                <span className="px-4 text-xs text-slate-500 whitespace-nowrap">
                  {t.calc.premiumSuffix}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={Math.min(premium, 500000)}
                onChange={(e) => setPremium(Number(e.target.value))}
                className="w-full mt-3"
              />
            </label>

            <label className="block mt-7">
              <span className="text-sm text-slate-300">{t.calc.termLabel}</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {t.calc.termOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTerm(opt.value)}
                    className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                      term === opt.value
                        ? 'bg-gold-500/15 border border-gold-500/60 text-gold-300'
                        : 'bg-navy-900/60 border border-slate-700/60 text-slate-300 hover:border-gold-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </label>

            <div className="mt-7">
              <span className="text-sm text-slate-300">{t.calc.rateLabel}</span>
              <div className="mt-2 space-y-2">
                {t.calc.rateOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRate(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${
                      rate === opt.value
                        ? 'bg-gold-500/15 border border-gold-500/60 text-gold-300'
                        : 'bg-navy-900/60 border border-slate-700/60 text-slate-300 hover:border-gold-500'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="font-mono text-gold-400">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-7 rounded-2xl border border-slate-800/70 bg-navy-950/50 backdrop-blur-md">
            <CompoundChart series={series} arkLabel={t.calc.arkLine} tradLabel={t.calc.tradLine} yLabel={t.calc.wealthLabel} xLabel={t.calc.yearLabel} />

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <MilestoneCard
                label={t.calc.milestone20}
                ark={y20.ark}
                trad={y20.trad}
                gap={gap20}
                arkLabel={t.calc.arkValue}
                tradLabel={t.calc.tradValue}
                gapLabel={t.calc.gapLabel}
              />
              <MilestoneCard
                label={t.calc.milestone30}
                ark={y30.ark}
                trad={y30.trad}
                gap={gap30}
                arkLabel={t.calc.arkValue}
                tradLabel={t.calc.tradValue}
                gapLabel={t.calc.gapLabel}
              />
            </div>

            <p className="mt-5 text-xs text-slate-500 leading-relaxed">{t.calc.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  label,
  ark,
  trad,
  gap,
  arkLabel,
  tradLabel,
  gapLabel,
}: {
  label: string;
  ark: number;
  trad: number;
  gap: number;
  arkLabel: string;
  tradLabel: string;
  gapLabel: string;
}) {
  return (
    <div className="p-5 rounded-xl border border-slate-800/70 bg-gradient-to-br from-navy-900/80 to-navy-950/80">
      <div className="text-xs tracking-[0.15em] text-gold-400 uppercase">{label}</div>
      <div className="mt-3 font-serif-display text-3xl md:text-4xl gold-gradient-text">
        {fmt(gap)}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <div className="text-slate-500 text-xs">{arkLabel}</div>
          <div className="text-white font-medium">{fmt(ark)}</div>
        </div>
        <TrendingUp className="w-4 h-4 text-gold-500" />
        <div className="text-right">
          <div className="text-slate-500 text-xs">{tradLabel}</div>
          <div className="text-slate-300 font-medium">{fmt(trad)}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gold-400">
        <TrendingDown className="w-3 h-3 rotate-180" />
        <span>
          {gapLabel}: {fmt(gap)}
        </span>
      </div>
    </div>
  );
}

// local state hook (kept in same file for cohesion)
function useCalcState() {
  const [premium, setPremium] = useState(50000);
  const [term, setTerm] = useState(5);
  const [rate, setRate] = useState(6.0);
  return { premium, setPremium, term, setTerm, rate, setRate };
}
