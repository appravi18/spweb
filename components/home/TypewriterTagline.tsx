'use client'
import { useEffect, useRef, useState } from 'react'

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const phrase = PHRASES[pi]
    timeoutRef.current = setTimeout(() => {
      if (!deleting) {
        const next = phrase.slice(0, text.length + 1)
        setText(next)
        if (next === phrase) {
          pauseRef.current = setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        const next = text.slice(0, -1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setPi(p => (p + 1) % PHRASES.length)
        }
      }
    }, deleting ? 40 : 80)
    return () => {
      clearTimeout(timeoutRef.current ?? undefined)
      clearTimeout(pauseRef.current ?? undefined)
    }
  }, [text, deleting, pi])

  return (
    <p className="font-mono text-sm text-text-dim mt-2">
      <span>// specialising in </span>
      <span className="text-accent">{text}</span>
      <span className="inline-block w-0.5 h-3.5 bg-accent align-middle ml-0.5 animate-blink" />
    </p>
  )
}
