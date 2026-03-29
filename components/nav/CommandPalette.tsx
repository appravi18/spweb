'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Item { label: string; href: string; category: string }

const ITEMS: Item[] = [
  { label: 'Home',                                        href: '/',                                          category: 'Page'     },
  { label: 'Blog',                                        href: '/blog',                                      category: 'Page'     },
  { label: 'Research',                                    href: '/research',                                  category: 'Page'     },
  { label: 'Dashboard',                                   href: '/dashboard',                                 category: 'Page'     },
  { label: 'About',                                       href: '/about',                                     category: 'Page'     },
  { label: 'Contact',                                     href: '/contact',                                   category: 'Page'     },
  { label: 'VaR, SVaR and CVaR: A Practical Python Implementation', href: '/blog/var-svar-cvar-python',      category: 'Blog'     },
  { label: 'LSTM Price Forecasting with Attention Mechanisms',       href: '/blog/lstm-attention-forecasting', category: 'Blog'    },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.length === 0
    ? ITEMS
    : ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-bg-surface border border-accent/30 rounded-lg shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-dim">
          <span className="text-text-muted font-mono text-xs">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages and posts..."
            className="flex-1 bg-transparent font-mono text-sm text-slate-200 placeholder:text-text-muted outline-none"
          />
          <kbd className="text-[9px] font-mono bg-border-dim text-text-dim px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent/5 transition-colors"
              >
                <span className="text-[9px] font-mono text-text-muted uppercase w-12 shrink-0">{item.category}</span>
                <span className="text-sm text-slate-300">{item.label}</span>
              </Link>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-4 text-xs font-mono text-text-muted text-center">No results</li>
          )}
        </ul>
      </div>
    </div>
  )
}
