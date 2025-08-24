"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, TrendingDown, Clock, Target } from "lucide-react"
import { useState, useEffect } from "react"

interface AISignal {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  confidence: number
  priceTarget: number
  stopLoss: number
  timeframe: string
  analysis: string
  timestamp: Date
  isPremium: boolean
}

export function AISignals() {
  const [signals, setSignals] = useState<AISignal[]>([
    {
      id: "1",
      symbol: "AAPL",
      type: "BUY",
      confidence: 87,
      priceTarget: 195.5,
      stopLoss: 185.2,
      timeframe: "1D",
      analysis: "Strong momentum with bullish RSI divergence",
      timestamp: new Date(),
      isPremium: false,
    },
    {
      id: "2",
      symbol: "NVDA",
      type: "BUY",
      confidence: 92,
      priceTarget: 520.0,
      stopLoss: 480.0,
      timeframe: "4H",
      analysis: "AI sector momentum + technical breakout pattern",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isPremium: true,
    },
    {
      id: "3",
      symbol: "TSLA",
      type: "SELL",
      confidence: 78,
      priceTarget: 240.0,
      stopLoss: 255.0,
      timeframe: "1D",
      analysis: "Overbought conditions with bearish divergence",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isPremium: false,
    },
  ])

  // Simulate new signals
  useEffect(() => {
    const interval = setInterval(() => {
      const symbols = ["MSFT", "GOOGL", "AMZN", "META", "NFLX"]
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]

      const newSignal: AISignal = {
        id: Date.now().toString(),
        symbol: randomSymbol,
        type: Math.random() > 0.5 ? "BUY" : "SELL",
        confidence: Math.floor(Math.random() * 30) + 70,
        priceTarget: Math.random() * 100 + 200,
        stopLoss: Math.random() * 50 + 150,
        timeframe: ["1H", "4H", "1D"][Math.floor(Math.random() * 3)],
        analysis: "AI-generated signal based on technical analysis",
        timestamp: new Date(),
        isPremium: Math.random() > 0.7,
      }

      setSignals((prev) => [newSignal, ...prev.slice(0, 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Trading Signals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                signal.isPremium ? "bg-primary/5 border-primary/20 premium-glow" : "bg-muted/20 border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{signal.symbol}</span>
                  <Badge
                    className={`${
                      signal.type === "BUY"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {signal.type === "BUY" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {signal.type}
                  </Badge>
                  {signal.isPremium && <Badge className="bg-primary/20 text-primary border-primary/30">PRO</Badge>}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{signal.confidence}%</p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-medium text-foreground">${signal.priceTarget.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stop Loss</p>
                  <p className="font-medium text-foreground">${signal.stopLoss.toFixed(2)}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{signal.analysis}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTimeAgo(signal.timestamp)}
                  <span>•</span>
                  <Target className="h-3 w-3" />
                  {signal.timeframe}
                </div>
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
