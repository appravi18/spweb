'use client'
import type { ReactNode } from 'react'
import KpiCard from '@/components/dashboard/KpiCard'
import EquityCurveChart from '@/components/dashboard/EquityCurveChart'
import MonthlyReturnsChart from '@/components/dashboard/MonthlyReturnsChart'
import DrawdownChart from '@/components/dashboard/DrawdownChart'
import DistributionChart from '@/components/dashboard/DistributionChart'
import RollingSharpChart from '@/components/dashboard/RollingSharpChart'
import { DASHBOARD_KPI } from '@/lib/mockData'

function ChartCard({ title, meta, children, tall }: { title: string; meta: string; children: ReactNode; tall?: boolean }) {
  return (
    <div className="bg-bg-surface border border-border-dim rounded-md overflow-hidden">
      <div className="px-4 py-3 border-b border-border-dim flex justify-between items-center">
        <span className="font-mono text-[10px] text-text-dim uppercase tracking-wide">{title}</span>
        <span className="font-mono text-[9px] text-text-muted">{meta}</span>
      </div>
      <div className={`p-4 ${tall ? 'h-52' : 'h-36'}`}>{children}</div>
    </div>
  )
}

export default function DashboardPage() {
  const kpis = Object.values(DASHBOARD_KPI)
  return (
    <div className="px-10 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="font-mono text-[10px] text-accent tracking-[2px] mb-1">// DASHBOARD</p>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Model Performance</h1>
          <p className="font-mono text-[10px] text-text-muted mt-1">LSTM-Attention · SPY · 2020–2024 backtest</p>
        </div>
        <div className="flex items-center gap-2 bg-bg-surface border border-border-dim rounded px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-up animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[10px] text-up">LIVE · updated 09:32 EST</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <ChartCard title="Equity Curve · Model vs Benchmark" meta="2020-01-01 → 2024-12-31" tall>
            <EquityCurveChart />
          </ChartCard>
        </div>
        <ChartCard title="Monthly Returns" meta="last 12 months" tall>
          <MonthlyReturnsChart />
        </ChartCard>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ChartCard title="Drawdown" meta="peak-to-trough">
          <DrawdownChart />
        </ChartCard>
        <ChartCard title="Return Distribution" meta="1,258 daily obs">
          <DistributionChart />
        </ChartCard>
        <ChartCard title="Rolling Sharpe" meta="60-day window">
          <RollingSharpChart />
        </ChartCard>
      </div>
    </div>
  )
}
