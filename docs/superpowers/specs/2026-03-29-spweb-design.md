# secondprofits.net — Website Design Spec

**Date:** 2026-03-29
**Project:** spweb
**Branch:** spweb_260329

---

## 1. Overview

A professional fintech website for **secondprofits.net** — a deep learning trading research company. The site targets **quant researchers and developers**: technically sophisticated, code-first, peer community. The design aesthetic is **Dark Terminal** (deep navy/black backgrounds, electric cyan accents, JetBrains Mono typography) — looks and feels like a trading terminal.

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG for blog/research, SSR for dashboard |
| Content | MDX + next-mdx-remote + gray-matter | MDX rendering, frontmatter parsing, blog posts |
| Styling | Tailwind CSS + custom tokens | Dark terminal design system |
| Syntax highlighting | Shiki (Dracula theme) | Server-side, zero client JS |
| Math | KaTeX | LaTeX equation rendering |
| Charts | Chart.js | Distribution plots, equity curves, dashboards |
| Fonts | JetBrains Mono + Inter | Code/UI monospace + prose |
| Deployment | Vercel | Git push → live, edge CDN |

---

## 3. Site Structure

```
secondprofits.net/
├── /                   Home — hero, stats strip, featured posts
├── /blog               Blog index — filterable by tag
│   └── /blog/[slug]    Article with Jupyter-cell MDX rendering
├── /research           Code, annotated notebooks, whitepapers
├── /dashboard          Live/demo model performance metrics
├── /about              Company story, team, mission
└── /contact            Contact form + newsletter signup
```

### Navigation

Sticky top navbar with: `SECONDPROFITS.NET` brand (JetBrains Mono, cyan) · `Blog` · `Research` · `Dashboard` · `About` · `Contact` (CTA button with cyan border). Active link highlighted in cyan. Mobile: hamburger menu.

---

## 4. Visual Design System

### Colour Tokens

| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#0a0e1a` | Page background |
| `bg-surface` | `#0d1117` | Cards, nav, sidebar |
| `bg-code` | `#12141f` | Code cell background |
| `accent-cyan` | `#00d4ff` | Links, borders, glows, CTAs |
| `text-primary` | `#f8fafc` | Headings |
| `text-secondary` | `#94a3b8` | Prose body |
| `text-muted` | `#475569` | Metadata, labels |
| `border` | `#1e293b` | Card/section borders |
| `up` | `#50fa7b` | Positive returns |
| `down` | `#ff5555` | Negative returns / losses |

### Typography

- **Headings:** Inter, weight 800, letter-spacing -0.5px
- **Body prose:** Inter, 13.5px, line-height 1.9
- **Code / UI labels / nav:** JetBrains Mono
- **Equation labels / metadata:** JetBrains Mono, 9px, letter-spacing 2px, uppercase

### Syntax Highlighting (Dracula Pro tokens)

| Token | Colour | Examples |
|---|---|---|
| Keywords | `#ff79c6` | `import`, `def`, `return`, `class` |
| Builtins | `#8be9fd` | `np`, `pd`, `float`, `dict` |
| Function names | `#50fa7b` | `compute_var`, `percentile` |
| Strings | `#f1fa8c` | `"var"`, `"cvar"` |
| Numbers | `#bd93f9` | `0.95`, `100`, `4` |
| Parameters / type hints | `#ffb86c` | `returns: np.ndarray` |
| Comments | `#6272a4` italic | `# Historical simulation` |
| Operators | `#ff79c6` | `=`, `+`, `->`, `<=` |

---

## 5. Pages

### 5.1 Home (`/`)

- **Particle canvas hero:** Animated neural-network particle mesh (canvas, 40 nodes, cyan connections). Full-width.
- **Typewriter tagline:** Cycles through phrases — `LSTM models`, `transformer architectures`, `CVaR risk metrics`, `alpha generation` — with blinking cursor.
- **Hero CTAs:** `READ RESEARCH →` (filled cyan) · `VIEW DASHBOARD` (outline).
- **Stats strip:** Sharpe Ratio · Backtest Win Rate · Published Models · VaR 95% — static values from backtest results, animated counter on mount.
- **Featured posts grid:** 3-column card grid of latest blog posts with tag, read time, title.
- **Live market ticker:** Scrolling strip — SPY, BTC, VIX, QQQ, GLD, MODEL·PNL. Uses static mock data initially; data source is configurable when a real API is added.

### 5.2 Blog Index (`/blog`)

- Tag filter bar: `ALL` · `DEEP LEARNING` · `RISK` · `BACKTESTING` · `PYTHON`
- Card grid: post title, excerpt, tags, date, read time.
- Search via ⌘K command palette (see §6).

### 5.3 Blog Post (`/blog/[slug]`)

Two-column layout: main content + sticky TOC sidebar.

**Main content elements:**
- Breadcrumb · title · meta (date, tags, read time)
- Prose sections (Inter)
- **LaTeX equations:** rendered via KaTeX, left-bordered cyan block
- **Jupyter-style code cells:** JetBrains Mono, Dracula Pro syntax, line numbers, traffic-light dots, language label, `In [n]:` prompt
- **Cell output:** dark `Out [n]:` block with coloured values + `✓` status line
- **Chart.js plots:** dark-themed, cyan/red/amber palette, animated on load, JetBrains Mono tooltips, glowing equity lines
- **Copy button:** top-right of every code block, flashes `Copied!` for 1.5s

**Sidebar:** Sticky TOC with active-section highlight · Tags.

**Reading progress bar:** Thin cyan gradient bar at bottom of navbar, tracks scroll position.

### 5.4 Research (`/research`)

Grid of cards: annotated notebooks (`.mdx`), whitepapers (PDF links), code repositories. Filter by topic. Same Jupyter-cell rendering as blog posts.

### 5.5 Dashboard (`/dashboard`)

Live/demo model performance for LSTM-Attention strategy on SPY, 2020–2024 backtest.

**KPI strip (5 cards):** Total Return · Sharpe Ratio · Max Drawdown · CVaR 95% · Win Rate. Live-pulsing green badge when data is fresh.

**Charts (Chart.js, all dark-themed):**
- Equity curve: model (cyan glow + fill) vs benchmark (grey) — full width
- Monthly returns bar chart: green/red by sign
- Drawdown chart: red bars, peak-to-trough
- Return distribution histogram: red CVaR tail, amber SVaR zone, blue body
- Rolling Sharpe (60d): purple line with gradient fill

### 5.6 About (`/about`)

Company story, mission, team section. Same dark terminal aesthetic. Timeline component for milestones.

### 5.7 Contact (`/contact`)

Contact form (name, email, message) + newsletter email capture. Styled as terminal input fields with cyan focus rings.

---

## 6. Stylistic Features

| Feature | Implementation |
|---|---|
| Particle canvas hero | `<canvas>` with 40-node particle mesh, requestAnimationFrame, cyan connections |
| Typewriter tagline | JS string rotation with 80ms type / 40ms delete cadence, blinking cursor |
| ⌘K Command palette | Floating modal, fuzzy search over all posts and pages, keyboard navigation |
| Reading progress bar | `scroll` event listener, `scaleX` transform on a 2px cyan bar |
| Live market ticker | CSS `translateX` marquee animation, configurable data source |
| Glowing equity curves | Chart.js `shadowBlur` + `shadowColor` on line datasets |
| Code copy button | `navigator.clipboard.writeText`, temporary `Copied!` state |

---

## 7. Demo Content (built as part of implementation)

Two full example articles created during the build:

1. **"VaR, SVaR and CVaR: A Practical Python Implementation"** (Risk tag)
   - Explains all three risk metrics from first principles
   - Python implementation with `numpy` / `scipy`
   - KaTeX equation: CVaR definition
   - Chart.js return distribution with threshold highlighting

2. **"LSTM Price Forecasting with Attention Mechanisms"** (Deep Learning tag)
   - LSTM architecture walkthrough
   - PyTorch implementation, cell-by-cell
   - Backtest equity curve chart
   - Walk-forward validation methodology

---

## 8. Content Architecture

```
/content
  /blog
    var-svar-cvar-python.mdx
    lstm-attention-forecasting.mdx
  /research
    (future papers / notebooks)
```

MDX frontmatter schema (gray-matter): `title`, `date`, `tags: string[]`, `excerpt`, `readTime`, `draft: boolean`.

---

## 9. Out of Scope

- User authentication / accounts
- Real-time market data API integration (dashboard uses mock/static data initially)
- CMS — all content is MDX files in the repo
- Runnable code cells (Pyodide) — read-only for now

---

## 10. Success Criteria

- Lighthouse performance score ≥ 90 (static pages)
- All blog posts render correctly with code highlighting, LaTeX, and charts
- Dashboard loads and renders all 5 Chart.js charts without errors
- ⌘K palette finds posts by title and tag
- Mobile-responsive navigation
- Deploys cleanly to Vercel on `git push`
