'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { MONTHS_LABELS, MARKET_EQUITY, MODEL_EQUITY } from '@/lib/mockData'

Chart.register(...registerables)

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'
const TOOLTIP = { backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1, titleColor: '#00d4ff', bodyColor: '#94a3b8', titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 } }

export default function EquityCurveChart() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const mktGrad = ctx.createLinearGradient(0,0,0,180)
    mktGrad.addColorStop(0,'rgba(100,116,139,0.15)'); mktGrad.addColorStop(1,'rgba(100,116,139,0)')
    const modGrad = ctx.createLinearGradient(0,0,0,180)
    modGrad.addColorStop(0,'rgba(0,212,255,0.2)'); modGrad.addColorStop(1,'rgba(0,212,255,0)')

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: MONTHS_LABELS,
        datasets: [
          { label: 'Benchmark', data: MARKET_EQUITY, borderColor: '#475569', borderWidth: 1.5, pointRadius: 0, fill: true, backgroundColor: mktGrad, tension: 0.3 },
          { label: 'Model', data: MODEL_EQUITY, borderColor: '#00d4ff', borderWidth: 2, pointRadius: 0, fill: true, backgroundColor: modGrad, tension: 0.3 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 900 },
        plugins: {
          legend: { display: true, labels: { color: TICK, font: { family: MONO, size: 9 }, boxWidth: 12 } },
          tooltip: TOOLTIP,
        },
        scales: {
          x: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 }, maxTicksLimit: 8 } },
          y: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 } } },
        },
      },
    })
    return () => chart.destroy()
  }, [])
  return <canvas ref={ref} aria-label="Equity curve chart: model vs benchmark" />
}
