'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { MONTHS_LABELS, MONTHLY_BAR } from '@/lib/mockData'

Chart.register(...registerables)

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'
const TOOLTIP = { backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1, titleColor: '#00d4ff', bodyColor: '#94a3b8', titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 } }

export default function MonthlyReturnsChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const colors = MONTHLY_BAR.map(v => v >= 0 ? 'rgba(80,250,123,0.7)' : 'rgba(255,85,85,0.7)')
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: { labels: MONTHS_LABELS.slice(-12), datasets: [{ data: MONTHLY_BAR, backgroundColor: colors, borderRadius: 2, borderWidth: 0.5 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: TOOLTIP },
        scales: {
          x: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 } } },
          y: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 } } },
        },
      },
    })
    return () => chart.destroy()
  }, [])
  return <canvas ref={ref} aria-label="Monthly returns bar chart" />
}
