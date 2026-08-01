import { Shield, Landmark, Building2, Coins, Binary, Anchor, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Shield,
  Landmark,
  Building2,
  Coins,
  Binary,
  Anchor,
};

export default function HeroChart({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="relative rounded-2xl border border-slate-700/50 bg-navy-900/40 backdrop-blur-sm p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs tracking-[0.2em] text-gold-400 uppercase">{title}</div>
          <div className="mt-1 text-[11px] text-slate-500">{caption}</div>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1.5 text-gold-400">
            <span className="w-3 h-px bg-gold-500" /> Ark
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-px bg-slate-500 border-dashed" /> Fiat
          </span>
        </div>
      </div>

      <svg viewBox="0 0 400 280" className="w-full h-auto">
        <defs>
          <linearGradient id="arkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fiatFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[40, 100, 160, 220].map((y) => (
          <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="#1C2541" strokeWidth="1" />
        ))}
        {[30, 120, 210, 300, 380].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="250" stroke="#1C2541" strokeWidth="1" />
        ))}

        {/* fiat devaluation curve (declining) */}
        <path
          d="M30,60 Q120,80 200,140 T380,220"
          fill="none"
          stroke="#64748B"
          strokeWidth="2"
          strokeDasharray="5,4"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
        />

        {/* ark multi-asset curve (rising) */}
        <path
          d="M30,230 C100,210 160,150 220,110 S340,55 380,40 L380,250 L30,250 Z"
          fill="url(#arkFill)"
        />
        <path
          d="M30,230 C100,210 160,150 220,110 S340,55 380,40"
          fill="none"
          stroke="#D97706"
          strokeWidth="2.5"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
        />

        {/* hedging vectors */}
        {[
          { x: 100, y: 195 },
          { x: 180, y: 140 },
          { x: 260, y: 90 },
          { x: 340, y: 55 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#FCD34D" />
            <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#D97706" strokeOpacity="0.4">
              <animate attributeName="r" values="6;14;6" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* axis labels */}
        <text x="30" y="270" fontSize="9" fill="#475569">t₀</text>
        <text x="200" y="270" fontSize="9" fill="#475569" textAnchor="middle">cycle</text>
        <text x="380" y="270" fontSize="9" fill="#475569" textAnchor="end">tₙ</text>
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {['Shield', 'Coins', 'Binary'].map((name) => {
          const Icon = ICONS[name];
          return (
            <div
              key={name}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-navy-800/40 border border-slate-800/60"
            >
              <Icon className="w-3.5 h-3.5 text-gold-500" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
