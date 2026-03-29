'use client'
import { useState, useEffect, useRef } from 'react'

interface Props {
  n: number
  code: string
  language?: string
  output?: string
  outputType?: 'text' | 'success'
}

export default function JupyterCell({ n, code, language = 'python', output, outputType = 'text' }: Props) {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current) }, [])

  const copy = () => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    copyTimerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mb-6 rounded-md overflow-hidden border border-[#252d3d] shadow-lg">
      {/* Header */}
      <div className="bg-[#141928] px-4 py-2 flex items-center gap-2 border-b border-[#252d3d]">
        <div className="flex gap-1.5">
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] text-[#3d4f6e] ml-1">In&nbsp;[{n}]</span>
        <span className="ml-auto font-mono text-[10px] text-[#3d4f6e]">{language}</span>
      </div>

      {/* Code */}
      <div className="bg-bg-code relative">
        <pre className="px-5 py-4 font-mono text-[13px] leading-[1.8] overflow-x-auto text-slate-200">
          <code>{code}</code>
        </pre>
        <button
          onClick={copy}
          aria-label={`Copy cell ${n}`}
          className="absolute top-2 right-2 font-mono text-[9px] bg-[#1e293b] border border-[#334155] text-text-dim px-2 py-1 rounded hover:border-accent hover:text-accent transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-[#0a0c14] border-t border-[#1a2030] px-5 py-3 font-mono text-xs leading-relaxed">
          <span className="text-[#3d4f6e] mr-2">Out [{n}]:</span>
          <span className={outputType === 'success' ? 'text-up' : 'text-[#73daca]'}>{output}</span>
        </div>
      )}
    </div>
  )
}
