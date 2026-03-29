'use client'

interface Props { tags: string[]; active: string; onChange: (tag: string) => void }

export default function TagFilter({ tags, active, onChange }: Props) {
  const all = ['ALL', ...tags]
  return (
    <div className="flex flex-wrap gap-2">
      {all.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`font-mono text-[10px] px-3 py-1.5 rounded-sm border transition-colors uppercase tracking-wide ${
            active === tag
              ? 'bg-accent text-bg-base border-accent'
              : 'border-border-dim text-text-dim hover:border-accent hover:text-accent'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
