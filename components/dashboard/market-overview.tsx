"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "SPY", price: 445.67, change: 2.34, changePercent: 0.53 },
    { symbol: "QQQ", price: 378.92, change: -1.45, changePercent: -0.38 },
    { symbol: "BTC", price: 43250.0, change: 1250.0, changePercent: 2.98 },
    { symbol: "TSLA", price: 248.5, change: -3.25, changePercent: -1.29 },
  ])

  const [marketSentiment, setMarketSentiment] = useState({
    sentiment: "Bullish",
    confidence: 78,
    vix: 18.45,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 2,
          change: item.change + (Math.random() - 0.5) * 0.5,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Market Sentiment */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge
                className={`${marketSentiment.sentiment === "Bullish" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
              >
                {marketSentiment.sentiment}
              </Badge>
              <span className="text-sm text-muted-foreground">Confidence: {marketSentiment.confidence}%</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">VIX</p>
              <p className="text-lg font-semibold">{marketSentiment.vix}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Data Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketData.map((item) => (
          <Card
            key={item.symbol}
            className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{item.symbol}</h3>
                {item.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-foreground">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(2)}
                  </span>
                  <span className={`text-xs ${item.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                    ({item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
