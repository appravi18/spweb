import { TICKER_ITEMS } from '@/lib/mockData'

export default function MarketTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // duplicate for seamless loop

  return (
    <div className="bg-[#06080f] border-t border-border-dim overflow-hidden py-1.5">
      <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 mr-10 font-mono text-[10px]">
            <span className="text-text-dim">{item.sym}</span>
            <span className={item.up ? 'text-up' : 'text-down'}>
              {item.up ? '▲' : '▼'} {item.price} {item.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
