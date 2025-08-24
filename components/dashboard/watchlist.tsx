"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Plus, TrendingUp, TrendingDown, X } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface WatchlistItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface WatchlistProps {
  userId: string
}

export function Watchlist({ userId }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { symbol: "AAPL", price: 192.53, change: 2.34, changePercent: 1.23 },
    { symbol: "MSFT", price: 378.85, change: -1.45, changePercent: -0.38 },
    { symbol: "GOOGL", price: 142.67, change: 3.21, changePercent: 2.3 },
  ])
  const [newSymbol, setNewSymbol] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const supabase = createClient()

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prev) =>
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

  const addToWatchlist = async () => {
    if (!newSymbol.trim()) return

    setIsAdding(true)
    try {
      // Simulate adding to database
      const newItem: WatchlistItem = {
        symbol: newSymbol.toUpperCase(),
        price: Math.random() * 500 + 100,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
      }

      setWatchlist((prev) => [...prev, newItem])
      setNewSymbol("")
    } catch (error) {
      console.error("Error adding to watchlist:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add Symbol */}
          <div className="flex gap-2">
            <Input
              placeholder="Add symbol (e.g., TSLA)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addToWatchlist()}
              className="bg-input border-border"
            />
            <Button
              onClick={addToWatchlist}
              disabled={isAdding || !newSymbol.trim()}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Watchlist Items */}
          <div className="space-y-2">
            {watchlist.map((item) => (
              <div
                key={item.symbol}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border hover:bg-muted/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{item.symbol}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {item.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {item.change >= 0 ? "+" : ""}
                        {item.change.toFixed(2)}
                      </span>
                    </div>
                    <p className={`text-xs ${item.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ({item.changePercent >= 0 ? "+" : ""}
                      {item.changePercent.toFixed(2)}%)
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWatchlist(item.symbol)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {watchlist.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No symbols in watchlist</p>
              <p className="text-sm">Add symbols to track their performance</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
