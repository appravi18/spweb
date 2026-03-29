'use client'
import { useState, type FormEvent } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="px-12 py-14 max-w-lg">
        <p className="font-mono text-[10px] text-accent tracking-[2px] mb-3">// CONTACT</p>
        <p className="font-mono text-sm text-up">✓ Message sent — we&apos;ll be in touch.</p>
      </div>
    )
  }

  const inputClass = "w-full bg-bg-surface border border-border-dim rounded px-4 py-2.5 text-sm text-slate-200 font-mono focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted"

  return (
    <div className="px-12 py-14 max-w-lg">
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-3">// CONTACT</p>
      <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-8">Get in Touch</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="font-mono text-[10px] text-text-muted block mb-2 uppercase tracking-wide">Name</label>
          <input id="name" name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[10px] text-text-muted block mb-2 uppercase tracking-wide">Email</label>
          <input id="email" name="email" type="email" required placeholder="jane@fund.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className="font-mono text-[10px] text-text-muted block mb-2 uppercase tracking-wide">Message</label>
          <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project..." className={inputClass + ' resize-none'} />
        </div>
        <div>
          <label htmlFor="newsletter" className="font-mono text-[10px] text-text-muted block mb-2 uppercase tracking-wide">Newsletter</label>
          <input id="newsletter" name="newsletter" type="email" placeholder="Subscribe to research updates..." className={inputClass} />
        </div>
        <button type="submit" className="font-mono text-xs bg-accent text-bg-base px-6 py-2.5 rounded-sm hover:bg-cyan-300 transition-colors font-bold">
          SEND MESSAGE →
        </button>
      </form>
    </div>
  )
}
