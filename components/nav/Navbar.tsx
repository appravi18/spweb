'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/blog',      label: 'Blog'      },
  { href: '/research',  label: 'Research'  },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about',     label: 'About'     },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const isPost = pathname.startsWith('/blog/')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      if (isPost) {
        const h = document.documentElement
        setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isPost])

  return (
    <header className={`sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-[0_1px_0_#1e293b]' : ''} bg-bg-surface`}>
      <nav className="flex items-center justify-between px-8 py-3">
        <Link href="/" className="font-mono font-bold text-accent text-sm tracking-tight">
          SECONDPROFITS<span className="text-text-muted">.NET</span>
        </Link>
        <div className="flex items-center gap-6 text-xs text-text-dim">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname.startsWith(l.href) ? 'text-accent' : 'hover:text-slate-300 transition-colors'}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-accent text-accent px-3 py-1 rounded-sm font-mono text-[10px] hover:bg-accent hover:text-bg-base transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
      {isPost && (
        <div
          className="h-[2px] bg-gradient-to-r from-accent to-blue-400 origin-left transition-transform"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      )}
    </header>
  )
}
