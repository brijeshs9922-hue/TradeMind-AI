"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Target, Shield, Clock, Zap, Brain } from "lucide-react"

interface SignalDetailsModalProps {
  signal: any
  isOpen: boolean
  onClose: () => void
}

export function SignalDetailsModal({ signal, isOpen, onClose }: SignalDetailsModalProps) {
  if (!signal) return null

  const analysisData = signal.analysis_data || {}
  const indicators = analysisData.indicators || {}
  const patterns = analysisData.patterns || []
  const reasoning = analysisData.reasoning || []

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "HIGH":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-muted-foreground bg-muted/20 border-border"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Signal Analysis - {signal.symbol}
            {signal.is_premium && <Badge className="bg-primary/20 text-primary border-primary/30">PRO</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Signal Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {signal.signal_type === "BUY" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : signal.signal_type === "SELL" ? (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                ) : (
                  <Target className="h-4 w-4 text-muted-foreground" />
                )}
                <Badge
                  className={`${
                    signal.signal_type === "BUY"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : signal.signal_type === "SELL"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-muted/20 text-muted-foreground border-border"
                  }`}
                >
                  {signal.signal_type}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <div className="flex items-center gap-2">
                  <Progress value={signal.confidence_score} className="flex-1" />
                  <span className="text-sm font-medium">{signal.confidence_score}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <Badge className={getRiskColor(analysisData.risk_level)}>
                  {analysisData.risk_level || "UNKNOWN"} RISK
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Timeframe</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{signal.timeframe}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Targets */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Price Target</span>
              </div>
              <p className="text-2xl font-bold text-green-400">${signal.price_target}</p>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Stop Loss</span>
              </div>
              <p className="text-2xl font-bold text-red-400">${signal.stop_loss}</p>
            </div>
          </div>

          <Separator />

          {/* Technical Indicators */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Technical Indicators
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {indicators.rsi && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">RSI</p>
                  <p className="text-lg font-semibold">{indicators.rsi.toFixed(2)}</p>
                </div>
              )}
              {indicators.macd && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">MACD</p>
                  <p className="text-lg font-semibold">{indicators.macd.macd?.toFixed(2)}</p>
                </div>
              )}
              {indicators.sma20 && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">SMA 20</p>
                  <p className="text-lg font-semibold">${indicators.sma20.toFixed(2)}</p>
                </div>
              )}
              {indicators.sma50 && (
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">SMA 50</p>
                  <p className="text-lg font-semibold">${indicators.sma50.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Patterns Detected */}
          {patterns.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Patterns Detected</h3>
              <div className="flex flex-wrap gap-2">
                {patterns.map((pattern: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* AI Reasoning */}
          {reasoning.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Analysis Reasoning</h3>
              <div className="space-y-2">
                {reasoning.map((reason: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Signal Metadata */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Generated: {formatTimestamp(signal.created_at)}</p>
            <p>Expires: {formatTimestamp(signal.expires_at)}</p>
            <p>Signal ID: {signal.id}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-primary hover:bg-primary/90">Add to Watchlist</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Set Alert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
