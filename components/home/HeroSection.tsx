import Link from 'next/link'
import ParticleCanvas from './ParticleCanvas'
import TypewriterTagline from './TypewriterTagline'
import AnimatedStat from './AnimatedStat'
import { HOME_STATS } from '@/lib/mockData'

export default function HeroSection() {
  return (
    <section className="relative bg-[#06080f] border-b border-border-dim overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 px-12 py-20">
        <p className="font-mono text-[10px] text-accent tracking-[3px] mb-4">// DEEP LEARNING FOR SYSTEMATIC TRADING</p>
        <h1 className="text-4xl font-extrabold leading-tight text-slate-50 tracking-tight">
          Alpha Through<br />
          <span className="text-accent">Neural Architecture</span>
        </h1>
        <TypewriterTagline />
        <p className="mt-5 text-sm text-text-dim max-w-md leading-relaxed">
          Research, code, and live models at the intersection of deep learning and quantitative finance.
        </p>
        <div className="flex gap-4 mt-7">
          <Link href="/research" className="bg-accent text-bg-base px-5 py-2 rounded-sm text-xs font-bold font-mono hover:bg-cyan-300 transition-colors">
            READ RESEARCH →
          </Link>
          <Link href="/dashboard" className="border border-border-dim text-text-dim px-5 py-2 rounded-sm text-xs font-mono hover:border-accent hover:text-accent transition-colors">
            VIEW DASHBOARD
          </Link>
        </div>

        {/* Stats strip */}
        <div className="flex gap-10 mt-12 pt-8 border-t border-border-dim">
          {HOME_STATS.map(s => (
            <AnimatedStat key={s.label} value={String(s.value)} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
