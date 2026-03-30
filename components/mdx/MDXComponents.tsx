import type { ReactNode } from 'react'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import JupyterCell from '@/components/blog/JupyterCell'
import MathBlock from '@/components/blog/MathBlock'
import PostChart from '@/components/blog/PostChart'

export const MDX_COMPONENTS: MDXRemoteProps['components'] = {
  JupyterCell,
  MathBlock,
  PostChart,
  // Override default HTML elements for dark terminal styling
  pre: ({ children }: { children: ReactNode }) => <>{children}</>,
  code: ({ children, className }: { children: ReactNode; className?: string }) => {
    const lang = className?.replace('language-', '') ?? 'text'
    const code = String(children).trimEnd()
    return (
      <div className="mb-6 rounded-md overflow-hidden border border-[#252d3d]">
        <div className="bg-[#141928] px-4 py-2 border-b border-[#252d3d] flex justify-between items-center">
          <span className="font-mono text-[9px] text-[#3d4f6e]">{lang}</span>
        </div>
        <pre className="bg-bg-code px-5 py-4 font-mono text-[13px] leading-[1.8] overflow-x-auto text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
    )
  },
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-xl font-bold text-slate-100 mt-10 mb-4 tracking-tight">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-base font-semibold text-slate-200 mt-7 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-[13.5px] text-text-dim leading-[1.9] mb-5">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a href={href} className="text-accent hover:underline">{children}</a>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-2 border-accent pl-4 my-5 text-text-dim italic">{children}</blockquote>
  ),
}
