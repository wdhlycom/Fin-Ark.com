import { useMemo } from 'react';

type Series = { year: number; ark: number; trad: number };

export default function CompoundChart({
  series,
  arkLabel,
  tradLabel,
  yLabel,
  xLabel,
}: {
  series: Series[];
  arkLabel: string;
  tradLabel: string;
  yLabel: string;
  xLabel: string;
}) {
  const W = 720;
  const H = 360;
  const PAD = { l: 70, r: 24, t: 20, b: 40 };

  const { arkPath, tradPath, arkArea, yTicks, xTicks, maxY } = useMemo(() => {
    const max = Math.max(...series.map((s) => Math.max(s.ark, s.trad))) * 1.1 || 1;
    const xFor = (y: number) => PAD.l + (y / 30) * (W - PAD.l - PAD.r);
    const yFor = (v: number) => H - PAD.b - (v / max) * (H - PAD.t - PAD.b);

    const toPath = (key: 'ark' | 'trad') =>
      series
        .map((s, i) => `${i === 0 ? 'M' : 'L'}${xFor(s.year).toFixed(1)},${yFor(s[key]).toFixed(1)}`)
        .join(' ');

    const ark = toPath('ark');
    const trad = toPath('trad');
    const area =
      ark +
      ` L${xFor(30).toFixed(1)},${(H - PAD.b).toFixed(1)} L${xFor(0).toFixed(1)},${(H - PAD.b).toFixed(1)} Z`;

    const yT = Array.from({ length: 5 }, (_, i) => {
      const v = (max / 4) * i;
      return { v, y: yFor(v) };
    });
    const xT = [0, 5, 10, 15, 20, 25, 30].map((y) => ({ y, x: xFor(y) }));

    return { arkPath: ark, tradPath: trad, arkArea: area, yTicks: yT, xTicks: xT, maxY: max };
  }, [series]);

  const fmt = (n: number) => {
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-300">{yLabel}</div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-gold-400">
            <span className="w-4 h-0.5 bg-gold-500" /> {arkLabel}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-4 h-0.5 bg-slate-500" style={{ borderTop: '2px dashed' }} />{' '}
            {tradLabel}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="arkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* y grid + labels */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={PAD.l} y1={t.y} x2={W - PAD.r} y2={t.y} stroke="#1C2541" strokeWidth="1" />
            <text x={PAD.l - 10} y={t.y + 4} fontSize="10" fill="#64748B" textAnchor="end">
              {fmt(t.v)}
            </text>
          </g>
        ))}

        {/* x labels */}
        {xTicks.map((t, i) => (
          <text key={i} x={t.x} y={H - PAD.b + 18} fontSize="10" fill="#64748B" textAnchor="middle">
            {t.y}
          </text>
        ))}
        <text x={W / 2} y={H - 6} fontSize="10" fill="#475569" textAnchor="middle">
          {xLabel}
        </text>

        {/* area */}
        <path d={arkArea} fill="url(#arkArea)" />

        {/* trad line (dashed) */}
        <path d={tradPath} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="6,5" />

        {/* ark line */}
        <path d={arkPath} fill="none" stroke="#D97706" strokeWidth="2.5" />

        {/* milestone markers */}
        {[20, 30].map((y) => {
          const s = series[y];
          const x = PAD.l + (y / 30) * (W - PAD.l - PAD.r);
          const ya = H - PAD.b - (s.ark / maxY) * (H - PAD.t - PAD.b);
          const yt = H - PAD.b - (s.trad / maxY) * (H - PAD.t - PAD.b);
          return (
            <g key={y}>
              <line x1={x} y1={PAD.t} x2={x} y2={H - PAD.b} stroke="#D97706" strokeOpacity="0.15" strokeDasharray="3,3" />
              <circle cx={x} cy={ya} r="4" fill="#FCD34D" stroke="#0A132B" strokeWidth="2" />
              <circle cx={x} cy={yt} r="3" fill="#94A3B8" stroke="#0A132B" strokeWidth="2" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
