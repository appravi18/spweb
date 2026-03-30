'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { DAILY_RETURNS } from '@/lib/mockData'

Chart.register(...registerables)

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'
const TOOLTIP = { backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1, titleColor: '#00d4ff', bodyColor: '#94a3b8', titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 } }

const BINS = 30, MIN = -0.04, MAX = 0.04
const STEP = (MAX - MIN) / BINS
const counts = new Array(BINS).fill(0)
DAILY_RETURNS.forEach(r => { const i = Math.min(Math.floor((r - MIN) / STEP), BINS - 1); if (i >= 0) counts[i]++ })
const binLabels = Array.from({ length: BINS }, (_, i) => (MIN + i * STEP + STEP / 2).toFixed(3))
const VAR_95 = -0.0231

export default function DistributionChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const colors = binLabels.map(l => parseFloat(l) <= VAR_95 ? 'rgba(239,68,68,0.7)' : 'rgba(0,212,255,0.3)')
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: { labels: binLabels, datasets: [{ data: counts, backgroundColor: colors, borderWidth: 0.5, borderRadius: 1 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: TOOLTIP },
        scales: {
          x: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 }, maxTicksLimit: 8 } },
          y: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 } } },
        },
      },
    })
    return () => chart.destroy()
  }, [])
  return <canvas ref={ref} aria-label="Return distribution histogram" />
}
