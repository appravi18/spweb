import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block bg-bg-surface border border-border-dim rounded p-5 hover:border-accent/40 transition-colors group">
      <div className="flex gap-2 mb-3">
        {post.tags.map(t => (
          <span key={t} className="text-[9px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm uppercase">
            {t}
          </span>
        ))}
        <span className="ml-auto text-[9px] font-mono text-text-muted">{post.readTime} min read</span>
      </div>
      <h3 className="text-sm font-bold text-slate-200 leading-snug group-hover:text-accent transition-colors">
        {post.title}
      </h3>
      <p className="text-xs text-text-dim mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
      <p className="text-[10px] font-mono text-text-muted mt-3">{formatDate(post.date)}</p>
    </Link>
  )
}
