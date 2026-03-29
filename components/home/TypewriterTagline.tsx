'use client'
import { useEffect, useState } from 'react'

const PHRASES = [
  'LSTM models',
  'transformer architectures',
  'CVaR risk metrics',
  'alpha generation',
  'Sharpe optimization',
]

export default function TypewriterTagline() {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[pi]
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = phrase.slice(0, text.length + 1)
        setText(next)
        if (next === phrase) setTimeout(() => setDeleting(true), 1800)
      } else {
        const next = text.slice(0, -1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setPi(p => (p + 1) % PHRASES.length)
        }
      }
    }, deleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [text, deleting, pi])

  return (
    <p className="font-mono text-sm text-text-dim mt-2">
      <span>// specialising in </span>
      <span className="text-accent">{text}</span>
      <span className="inline-block w-0.5 h-3.5 bg-accent align-middle ml-0.5 animate-blink" />
    </p>
  )
}
