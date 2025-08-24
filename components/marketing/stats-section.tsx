"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Zap, Target } from "lucide-react"

export function StatsSection() {
  const [counters, setCounters] = useState({
    users: 0,
    signals: 0,
    accuracy: 0,
    returns: 0,
  })

  const finalStats = {
    users: 10000,
    signals: 250000,
    accuracy: 87,
    returns: 28.7,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounters({
        users: Math.floor(finalStats.users * progress),
        signals: Math.floor(finalStats.signals * progress),
        accuracy: Math.floor(finalStats.accuracy * progress),
        returns: Math.floor(finalStats.returns * progress * 10) / 10,
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounters(finalStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: `${counters.users.toLocaleString()}+`,
      label: "Active Traders",
      description: "Trust TradeMind AI for their trading decisions",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      value: `${counters.signals.toLocaleString()}+`,
      label: "Signals Generated",
      description: "AI-powered trading signals delivered to date",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      value: `${counters.accuracy}%`,
      label: "Signal Accuracy",
      description: "Average accuracy rate of our AI predictions",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      value: `+${counters.returns}%`,
      label: "Average Returns",
      description: "Year-to-date performance of Pro users",
    },
  ]

  return (
    <section className="py-16 px-6 bg-primary/5 border-y border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">{stat.icon}</div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
