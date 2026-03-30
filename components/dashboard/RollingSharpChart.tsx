'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { MONTHS_LABELS, ROLLING_SHARPE } from '@/lib/mockData'

Chart.register(...registerables)

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'
const TOOLTIP = { backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1, titleColor: '#bd93f9', bodyColor: '#94a3b8', titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 } }

export default function RollingSharpChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const grad = ctx.createLinearGradient(0,0,0,110)
    grad.addColorStop(0,'rgba(189,147,249,0.2)'); grad.addColorStop(1,'rgba(189,147,249,0)')
    const chart = new Chart(canvas, {
      type: 'line',
      data: { labels: MONTHS_LABELS, datasets: [{ data: ROLLING_SHARPE, borderColor: '#bd93f9', borderWidth: 2, pointRadius: 0, fill: true, backgroundColor: grad, tension: 0.4 }] },
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
  return <canvas ref={ref} aria-label="Rolling Sharpe ratio chart" />
}
