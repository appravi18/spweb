'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { MONTHS_LABELS, DRAWDOWN } from '@/lib/mockData'

Chart.register(...registerables)

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'
const TOOLTIP = { backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1, titleColor: '#ff5555', bodyColor: '#94a3b8', titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 } }

export default function DrawdownChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: { labels: MONTHS_LABELS, datasets: [{ data: DRAWDOWN, backgroundColor: 'rgba(255,85,85,0.5)', borderColor: 'rgba(255,85,85,0.8)', borderWidth: 0.5 }] },
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
  return <canvas ref={ref} aria-label="Drawdown chart" />
}
