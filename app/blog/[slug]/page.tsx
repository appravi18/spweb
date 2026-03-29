import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDX_COMPONENTS } from '@/components/mdx/MDXComponents'
import { formatDate } from '@/lib/utils'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} — SecondProfits` }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="flex">
      {/* Main */}
      <article className="flex-1 min-w-0 px-12 py-12 border-r border-border-dim">
        <p className="font-mono text-[9px] text-text-muted tracking-[2px] mb-5 uppercase">Blog / {post.tags[0]}</p>
        <h1 className="text-3xl font-extrabold text-slate-50 leading-tight tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2 items-center mb-8 pb-6 border-b border-border-dim">
          <span className="font-mono text-[10px] text-text-muted">{formatDate(post.date)}</span>
          {post.tags.map(t => (
            <span key={t} className="font-mono text-[9px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm uppercase">
              {t}
            </span>
          ))}
          <span className="font-mono text-[10px] text-text-muted ml-auto">// {post.readTime} min read</span>
        </div>
        <div className="prose-custom">
          <MDXRemote source={post.content} components={MDX_COMPONENTS as any} />
        </div>
      </article>

      {/* Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 px-6 py-12 bg-bg-surface">
        <p className="font-mono text-[9px] text-text-muted tracking-[2px] mb-5 uppercase">Tags</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(t => (
            <span key={t} className="font-mono text-[9px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm uppercase">
              {t}
            </span>
          ))}
        </div>
      </aside>
    </div>
  )
}
