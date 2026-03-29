import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import MarketTicker from '@/components/ui/MarketTicker'

export const metadata: Metadata = {
  title: 'SecondProfits — Deep Learning for Trading',
  description: 'Research, code, and live models at the intersection of deep learning and quantitative finance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-base text-slate-200 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MarketTicker />
      </body>
    </html>
  )
}
