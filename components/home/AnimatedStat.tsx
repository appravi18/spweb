'use client'
import { useEffect, useState } from 'react'

interface AnimatedStatProps {
  value: string
  suffix?: string
  label: string
}

export default function AnimatedStat({ value, suffix, label }: AnimatedStatProps) {
  const numeric = parseFloat(value)
  const isNaN_ = isNaN(numeric)

  // Determine decimal places from the original value string
  const dotIndex = value.indexOf('.')
  const decimals = dotIndex === -1 ? 0 : value.length - dotIndex - 1

  const [display, setDisplay] = useState(isNaN_ ? value : (0).toFixed(decimals))

  useEffect(() => {
    if (isNaN_) return

    const duration = 1200
    const start = performance.now()

    let raf: number
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numeric * eased
      setDisplay(current.toFixed(decimals))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [numeric, decimals, isNaN_])

  return (
    <div>
      <div className="text-xl font-bold font-mono text-accent tracking-tight">
        {display}{suffix ?? ''}
      </div>
      <div className="text-[9px] font-mono text-text-muted tracking-widest mt-1">{label}</div>
    </div>
  )
}
