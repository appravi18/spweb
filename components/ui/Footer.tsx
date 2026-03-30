export default function Footer() {
  return (
    <footer className="border-t border-border-dim bg-bg-surface py-4 px-8 flex justify-between items-center text-[10px] font-mono text-text-muted">
      <span>© {new Date().getFullYear()} SECONDPROFITS.NET</span>
      <span>BUILT WITH NEXT.JS · DEPLOYED ON VERCEL</span>
    </footer>
  )
}
