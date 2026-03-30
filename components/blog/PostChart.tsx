'use client'
import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface Dataset {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string | string[]
  fill?: boolean
  tension?: number
  borderWidth?: number
  pointRadius?: number
}

interface Props {
  type: 'bar' | 'line'
  labels: string[]
  datasets: Dataset[]
  height?: number
  title?: string
}

const MONO = 'JetBrains Mono'
const GRID = '#1a2030'
const TICK = '#3d4f6e'

export default function PostChart({ type, labels, datasets, height = 220, title }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const chart = new Chart(canvas, {
      type,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: datasets.length > 1, labels: { color: TICK, font: { family: MONO, size: 9 }, boxWidth: 12 } },
          tooltip: {
            backgroundColor: '#141928', borderColor: '#252d3d', borderWidth: 1,
            titleColor: '#00d4ff', bodyColor: '#94a3b8',
            titleFont: { family: MONO, size: 10 }, bodyFont: { family: MONO, size: 10 },
          },
        },
        scales: {
          x: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 }, maxTicksLimit: 10 } },
          y: { grid: { color: GRID }, ticks: { color: TICK, font: { family: MONO, size: 9 } } },
        },
      },
    })
    return () => chart.destroy()
  }, [type, JSON.stringify(labels), JSON.stringify(datasets)])

  return (
    <div className="bg-bg-surface border border-[#252d3d] rounded-md overflow-hidden my-6">
      {title && (
        <div className="bg-[#141928] px-4 py-2 border-b border-[#252d3d]">
          <span className="font-mono text-[9px] text-[#3d4f6e] tracking-[2px] uppercase">{title}</span>
        </div>
      )}
      <div className="p-5" style={{ height }}>
        <canvas ref={canvasRef} aria-label={title ?? 'Chart'} />
      </div>
    </div>
  )
}
