"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Zap, Eye } from "lucide-react"

interface ActivityItem {
  id: string
  type: "trade" | "signal" | "watchlist" | "alert"
  action: string
  symbol?: string
  amount?: number
  timestamp: Date
  status: "completed" | "pending" | "failed"
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "trade",
      action: "Bought AAPL",
      symbol: "AAPL",
      amount: 1250.0,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: "completed",
    },
    {
      id: "2",
      type: "signal",
      action: "AI Signal Generated",
      symbol: "NVDA",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "completed",
    },
    {
      id: "3",
      type: "watchlist",
      action: "Added to Watchlist",
      symbol: "TSLA",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "completed",
    },
    {
      id: "4",
      type: "trade",
      action: "Sold MSFT",
      symbol: "MSFT",
      amount: 890.5,
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "completed",
    },
    {
      id: "5",
      type: "alert",
      action: "Price Alert Triggered",
      symbol: "BTC",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: "completed",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-4 w-4" />
      case "signal":
        return <Zap className="h-4 w-4" />
      case "watchlist":
        return <Eye className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "trade":
        return "text-green-400"
      case "signal":
        return "text-primary"
      case "watchlist":
        return "text-blue-400"
      default:
        return "text-muted-foreground"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border hover:bg-muted/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-muted/30 ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {activity.symbol && (
                      <Badge variant="outline" className="text-xs">
                        {activity.symbol}
                      </Badge>
                    )}
                    {activity.amount && (
                      <span className="text-xs text-muted-foreground">${activity.amount.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Badge
                  className={`text-xs ${
                    activity.status === "completed"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : activity.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {activity.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
