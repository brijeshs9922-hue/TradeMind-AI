"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Zap } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { useState, useEffect } from "react"

const generateChartData = () => {
  const data = []
  let price = 445.67

  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 5
    data.push({
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
      price: price,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })
  }
  return data
}

export function TradingChart() {
  const [chartData, setChartData] = useState(generateChartData())
  const [selectedSymbol, setSelectedSymbol] = useState("SPY")
  const [timeframe, setTimeframe] = useState("1D")
  const [aiSignal, setAiSignal] = useState({
    type: "BUY",
    confidence: 85,
    target: 452.3,
    stopLoss: 441.2,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev]
        const lastPrice = newData[newData.length - 1].price
        const newPrice = lastPrice + (Math.random() - 0.5) * 2

        newData.push({
          time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: newPrice,
          volume: Math.floor(Math.random() * 1000000) + 500000,
        })

        return newData.slice(-50) // Keep last 50 points
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Trading Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SPY">SPY</SelectItem>
                <SelectItem value="QQQ">QQQ</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="TSLA">TSLA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="5M">5M</SelectItem>
                <SelectItem value="1H">1H</SelectItem>
                <SelectItem value="1D">1D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* AI Signal Alert */}
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg premium-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">AI Signal</span>
                <Badge
                  className={`${aiSignal.type === "BUY" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                >
                  {aiSignal.type}
                </Badge>
              </div>
              <div className="text-right text-sm">
                <p className="text-muted-foreground">Confidence: {aiSignal.confidence}%</p>
                <p className="text-primary">Target: ${aiSignal.target}</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a574" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4a574" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 2", "dataMax + 2"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111111",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    color: "#f5f5f5",
                  }}
                />
                <Area type="monotone" dataKey="price" stroke="#d4a574" strokeWidth={2} fill="url(#priceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Trading Actions */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </Button>
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent">
              Sell
            </Button>
            <Button variant="outline">Add to Watchlist</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
