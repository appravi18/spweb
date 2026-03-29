import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/blog/BlogCard'

export default async function ResearchPage() {
  const posts = await getAllPosts()
  return (
    <div className="px-12 py-14">
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-3">// RESEARCH</p>
      <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-3">Code & Research</h1>
      <p className="text-sm text-text-dim mb-10 max-w-xl leading-relaxed">
        Annotated notebooks, model implementations, and whitepapers. All code is reproducible and available on GitHub.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map(p => <BlogCard key={p.slug} post={p} />)}
        {posts.length === 0 && (
          <p className="col-span-full font-mono text-xs text-text-muted py-12 text-center">Research papers coming soon.</p>
        )}
      </div>
    </div>
  )
}
