export default function AboutPage() {
  const milestones = [
    { year: '2022', label: 'Founded SecondProfits', desc: 'Started research into LSTM-based trading strategies.' },
    { year: '2023', label: 'First live model', desc: 'Deployed LSTM-Attention strategy on SPY futures.' },
    { year: '2024', label: 'Published research', desc: 'Open-sourced backtesting framework and risk metric toolkit.' },
    { year: '2026', label: 'This site', desc: 'Launched secondprofits.net to share research publicly.' },
  ]
  return (
    <div className="px-12 py-14 max-w-3xl">
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-3">// ABOUT</p>
      <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-6">About SecondProfits</h1>
      <p className="text-sm text-text-dim leading-relaxed mb-10">
        SecondProfits is a quantitative research company applying deep learning to systematic trading.
        We build, test, and publish models for equity, crypto, and derivatives markets —
        with a focus on rigorous backtesting and probabilistic risk management.
      </p>
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-6">// MILESTONES</p>
      <div className="relative border-l border-border-dim pl-8 space-y-8">
        {milestones.map(m => (
          <div key={m.year} className="relative">
            <span className="absolute -left-[33px] top-1 w-2 h-2 rounded-full bg-accent block" aria-hidden="true" />
            <p className="font-mono text-[10px] text-accent mb-1">{m.year}</p>
            <p className="font-semibold text-slate-200 text-sm mb-1">{m.label}</p>
            <p className="text-xs text-text-dim leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
