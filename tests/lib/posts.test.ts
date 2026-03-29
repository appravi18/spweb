import { describe, it, expect } from 'vitest'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

describe('getAllPosts', () => {
  it('returns an array', async () => {
    const posts = await getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
  })
  it('each post has required fields', async () => {
    const posts = await getAllPosts()
    if (posts.length === 0) return // no content yet — skip
    const p = posts[0]
    expect(p).toHaveProperty('slug')
    expect(p).toHaveProperty('title')
    expect(p).toHaveProperty('date')
    expect(p).toHaveProperty('tags')
    expect(p).toHaveProperty('excerpt')
    expect(p).toHaveProperty('readTime')
  })
})

describe('getPostBySlug', () => {
  it('returns null for unknown slug', async () => {
    const post = await getPostBySlug('nonexistent-slug')
    expect(post).toBeNull()
  })
})
