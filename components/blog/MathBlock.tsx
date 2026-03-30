import katex from 'katex'

interface Props { formula: string; caption?: string }

export default function MathBlock({ formula, caption }: Props) {
  const html = katex.renderToString(formula, { throwOnError: false, displayMode: true })
  return (
    <div className="bg-bg-surface border border-border-dim border-l-2 border-l-accent rounded-r-md px-6 py-4 my-6">
      <p className="font-mono text-[9px] text-text-muted tracking-[2px] uppercase mb-3">Equation</p>
      {/* KaTeX output is safe to inject: trust defaults to false,
          disabling \href and other commands that could produce live URLs. */}
      <div className="text-center" dangerouslySetInnerHTML={{ __html: html }} />
      {caption && <p className="font-mono text-[9px] text-text-muted text-center mt-3">{caption}</p>}
    </div>
  )
}
