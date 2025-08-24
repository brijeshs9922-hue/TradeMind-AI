"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Brain, Shield, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 premium-glow">
                <Zap className="h-3 w-3 mr-1" />
                AI-Powered Trading Intelligence
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Trade Smarter with{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Precision
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Harness the power of advanced artificial intelligence to make informed trading decisions. Get real-time
                signals, risk analysis, and market insights that give you the edge.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-border">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-border">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium">Real-time Signals</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-border">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Risk Management</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground premium-glow">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-transparent" onClick={() => setIsVideoPlaying(true)}>
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-xs font-medium text-primary">{i}</span>
                    </div>
                  ))}
                </div>
                <span>Trusted by 10,000+ traders</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 premium-glow">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Live Trading Signals</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Live
                  </Badge>
                </div>

                {/* Mock Signals */}
                <div className="space-y-3">
                  {[
                    { symbol: "AAPL", type: "BUY", confidence: 87, change: "+2.34%" },
                    { symbol: "NVDA", type: "BUY", confidence: 92, change: "+5.67%" },
                    { symbol: "TSLA", type: "SELL", confidence: 78, change: "-1.23%" },
                  ].map((signal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{signal.symbol}</span>
                        <Badge
                          className={`${
                            signal.type === "BUY"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {signal.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{signal.confidence}%</div>
                        <div className={`text-xs ${signal.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {signal.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-3 premium-glow">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI Active</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">+28.7% YTD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
