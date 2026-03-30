export const TICKER_ITEMS = [
  { sym: 'SPY',       price: '512.34', change: '+0.82%', up: true  },
  { sym: 'BTC',       price: '68,241', change: '-1.14%', up: false },
  { sym: 'VIX',       price: '18.42',  change: '+3.20%', up: true  },
  { sym: 'QQQ',       price: '438.12', change: '+1.05%', up: true  },
  { sym: 'GLD',       price: '221.07', change: '-0.33%', up: false },
  { sym: 'MODEL·PNL', price: '+2.41%', change: 'MTD',    up: true  },
]

export const DASHBOARD_KPI = {
  totalReturn:  { value: '+184%',  label: 'TOTAL RETURN',  change: '▲ vs buy-hold +67pp', up: true  },
  sharpe:       { value: '2.41',   label: 'SHARPE RATIO',  change: 'annualised',           up: null  },
  maxDrawdown:  { value: '-8.3%',  label: 'MAX DRAWDOWN',  change: '▼ worst peak-to-trough', up: false },
  cvar95:       { value: '-2.87%', label: 'CVAR 95%',      change: 'daily expected shortfall', up: null },
  winRate:      { value: '63.4%',  label: 'WIN RATE',      change: '▲ 1,258 trading days', up: true  },
}

export const HOME_STATS = [
  { label: 'SHARPE RATIO',      value: 2.41  },
  { label: 'BACKTEST WIN RATE', value: 94.3, suffix: '%' },
  { label: 'PUBLISHED MODELS',  value: 12    },
  { label: 'VAR 95%',           value: -2.3, suffix: '%' },
]

// Generate deterministic monthly returns for charts (seeded)
function lcg(seed: number) {
  let s = seed
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
}

const rng = lcg(42)
const gauss = () => {
  const u = rng(), v = rng()
  return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v)
}

export const MONTHS_LABELS: string[] = []
const d = new Date(2020, 0, 1)
while (d <= new Date(2024, 11, 31)) {
  MONTHS_LABELS.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  d.setMonth(d.getMonth() + 1)
}

export const MARKET_RETURNS  = MONTHS_LABELS.map(() => gauss() * 0.032 + 0.003)
export const MODEL_RETURNS   = MARKET_RETURNS.map(r => r * 0.7 + gauss() * 0.018 + 0.005)

function cumsum(rets: number[]): number[] {
  let v = 100
  return rets.map(r => { v *= 1 + r; return +v.toFixed(2) })
}

export const MARKET_EQUITY = cumsum(MARKET_RETURNS)
export const MODEL_EQUITY  = cumsum(MODEL_RETURNS)

export const MONTHLY_BAR = MONTHS_LABELS.slice(-12).map(() => +(gauss() * 3 + 1.5).toFixed(2))

let peak = 100
export const DRAWDOWN = MODEL_EQUITY.map(v => {
  peak = Math.max(peak, v)
  return +((v - peak) / peak * 100).toFixed(2)
})

const dailyRng = lcg(99)
const dailyGauss = () => {
  const u = dailyRng(), v = dailyRng()
  return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v)
}
export const DAILY_RETURNS = Array.from({ length: 1258 }, () => +(dailyGauss() * 0.012 - 0.0003).toFixed(4))

export const ROLLING_SHARPE = MONTHS_LABELS.map(() => +(gauss() * 0.6 + 2.2).toFixed(2))
