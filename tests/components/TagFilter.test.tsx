import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TagFilter from '@/components/blog/TagFilter'

describe('TagFilter', () => {
  it('renders ALL tag always', () => {
    render(<TagFilter tags={['risk', 'python']} active="ALL" onChange={() => {}} />)
    expect(screen.getByText('ALL')).toBeInTheDocument()
  })
  it('renders provided tags', () => {
    render(<TagFilter tags={['risk', 'python']} active="ALL" onChange={() => {}} />)
    expect(screen.getByText('risk')).toBeInTheDocument()
    expect(screen.getByText('python')).toBeInTheDocument()
  })
  it('calls onChange with tag name on click', () => {
    const onChange = vi.fn()
    render(<TagFilter tags={['risk']} active="ALL" onChange={onChange} />)
    fireEvent.click(screen.getByText('risk'))
    expect(onChange).toHaveBeenCalledWith('risk')
  })
  it('highlights the active tag', () => {
    render(<TagFilter tags={['risk']} active="risk" onChange={() => {}} />)
    const btn = screen.getByText('risk')
    expect(btn.className).toMatch(/text-bg-base|bg-accent/)
  })
})
