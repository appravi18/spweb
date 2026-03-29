import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/blog/BlogCard'

export default async function FeaturedPosts() {
  const posts = await getAllPosts()
  const featured = posts.slice(0, 3)
  if (featured.length === 0) return null

  return (
    <section className="px-12 py-14 border-b border-border-dim">
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-6">// LATEST RESEARCH</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featured.map(p => <BlogCard key={p.slug} post={p} />)}
      </div>
    </section>
  )
}
