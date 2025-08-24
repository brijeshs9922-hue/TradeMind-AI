"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"

const portfolioData = [
  { name: "Stocks", value: 65, color: "#d4a574" },
  { name: "Crypto", value: 20, color: "#b8860b" },
  { name: "ETFs", value: 10, color: "#8b7355" },
  { name: "Cash", value: 5, color: "#6b5b47" },
]

export function PortfolioSummary() {
  const totalValue = 125430.67
  const dayChange = 2340.5
  const dayChangePercent = 1.9

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Value */}
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {dayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span className={`font-medium ${dayChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)} ({dayChangePercent >= 0 ? "+" : ""}
                {dayChangePercent.toFixed(2)}%)
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Today's Change</p>
          </div>

          {/* Portfolio Allocation Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111111",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    color: "#f5f5f5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Breakdown */}
          <div className="space-y-2">
            {portfolioData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-semibold text-green-400">+12.5%</p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">+28.7%</p>
              <p className="text-xs text-muted-foreground">This Year</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
