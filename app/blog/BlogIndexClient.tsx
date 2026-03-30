'use client'
import { useState, useMemo } from 'react'
import type { PostMeta } from '@/lib/posts'
import BlogCard from '@/components/blog/BlogCard'
import TagFilter from '@/components/blog/TagFilter'

export default function BlogIndexClient({ posts }: { posts: PostMeta[] }) {
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap(p => p.tags))).sort(),
    [posts]
  )
  const [active, setActive] = useState('ALL')

  const filtered = active === 'ALL' ? posts : posts.filter(p => p.tags.includes(active))

  return (
    <div className="px-12 py-14">
      <p className="font-mono text-[10px] text-accent tracking-[2px] mb-3">// BLOG</p>
      <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-8">Research & Code</h1>
      <TagFilter tags={allTags} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {filtered.map(p => <BlogCard key={p.slug} post={p} />)}
        {filtered.length === 0 && (
          <p className="col-span-full font-mono text-xs text-text-muted py-12 text-center">
            No posts yet — check back soon.
          </p>
        )}
      </div>
    </div>
  )
}
