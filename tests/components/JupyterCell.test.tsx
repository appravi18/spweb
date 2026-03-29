import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import JupyterCell from '@/components/blog/JupyterCell'

describe('JupyterCell', () => {
  it('renders In prompt with cell number', () => {
    render(<JupyterCell n={3} code="x = 1" language="python" />)
    expect(screen.getByText('In [3]')).toBeInTheDocument()
  })
  it('renders output when provided', () => {
    render(<JupyterCell n={1} code="x = 1" language="python" output="1" />)
    expect(screen.getByText(/Out \[1\]/)).toBeInTheDocument()
  })
  it('renders without output when not provided', () => {
    render(<JupyterCell n={1} code="x = 1" language="python" />)
    expect(screen.queryByText(/Out/)).toBeNull()
  })
})
