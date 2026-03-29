interface Props {
  label: string
  value: string
  change: string
  up: boolean | null
}

export default function KpiCard({ label, value, change, up }: Props) {
  return (
    <div className="bg-bg-surface border border-border-dim rounded-md px-5 py-4">
      <p className="font-mono text-[9px] text-text-muted tracking-[2px] uppercase mb-2">{label}</p>
      <p className={`text-2xl font-bold font-mono tracking-tight ${up === true ? 'text-up' : up === false ? 'text-down' : 'text-accent'}`}>
        {value}
      </p>
      <p className={`font-mono text-[10px] mt-1.5 ${up === true ? 'text-up' : up === false ? 'text-down' : 'text-text-muted'}`}>
        {change}
      </p>
    </div>
  )
}
