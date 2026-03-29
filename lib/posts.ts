import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calcReadTime } from './utils'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readTime: number
  draft: boolean
}

export interface Post extends PostMeta {
  content: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title:    data.title    ?? '',
        date:     data.date     ?? '',
        tags:     data.tags     ?? [],
        excerpt:  data.excerpt  ?? '',
        readTime: data.readTime ?? calcReadTime(content),
        draft:    data.draft    ?? false,
      }
    })
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title:    data.title    ?? '',
    date:     data.date     ?? '',
    tags:     data.tags     ?? [],
    excerpt:  data.excerpt  ?? '',
    readTime: data.readTime ?? calcReadTime(content),
    draft:    data.draft    ?? false,
    content,
  }
}
