"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface SubscriptionStatusProps {
  subscription: any
  profile: any
  onManageSubscription?: () => void
}

export function SubscriptionStatus({ subscription, profile, onManageSubscription }: SubscriptionStatusProps) {
  const [daysRemaining, setDaysRemaining] = useState(0)
  const [usageStats, setUsageStats] = useState({
    signalsUsed: 3,
    signalsLimit: 5,
    watchlistUsed: 7,
    watchlistLimit: 10,
  })

  const isPro = profile?.subscription_tier === "pro"
  const isTrialActive = subscription?.trial_end && new Date(subscription.trial_end) > new Date()

  useEffect(() => {
    if (subscription?.current_period_end) {
      const endDate = new Date(subscription.current_period_end)
      const now = new Date()
      const diffTime = endDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysRemaining(Math.max(0, diffDays))
    }
  }, [subscription])

  const getStatusColor = () => {
    if (subscription?.status === "active") return "text-green-400 bg-green-500/20 border-green-500/30"
    if (subscription?.status === "trialing") return "text-blue-400 bg-blue-500/20 border-blue-500/30"
    if (subscription?.status === "past_due") return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
    if (subscription?.status === "canceled") return "text-red-400 bg-red-500/20 border-red-500/30"
    return "text-muted-foreground bg-muted/20 border-border"
  }

  const getStatusText = () => {
    if (isTrialActive) return "Free Trial"
    if (subscription?.status === "active") return "Active"
    if (subscription?.status === "past_due") return "Payment Due"
    if (subscription?.status === "canceled") return "Canceled"
    return "Free Plan"
  }

  return (
    <div className="space-y-6">
      {/* Current Plan Status */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isPro ? <Crown className="h-5 w-5 text-primary" /> : <CreditCard className="h-5 w-5" />}
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">{isPro ? "TradeMind Pro" : "TradeMind Free"}</h3>
              <p className="text-muted-foreground">{isPro ? "$49/month" : "Free forever"}</p>
            </div>
            <Badge className={getStatusColor()}>{getStatusText()}</Badge>
          </div>

          {/* Trial or Subscription Info */}
          {subscription && (
            <div className="space-y-3">
              {isTrialActive && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Free Trial Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your trial ends on {new Date(subscription.trial_end).toLocaleDateString()}
                  </p>
                </div>
              )}

              {subscription.status === "past_due" && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Payment Required</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please update your payment method to continue using Pro features.
                  </p>
                </div>
              )}

              {subscription.cancel_at_period_end && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">Subscription Ending</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                </div>
              )}

              {subscription.current_period_end && !subscription.cancel_at_period_end && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {isPro ? "Next billing" : "Period ends"}:{" "}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                    {daysRemaining > 0 && ` (${daysRemaining} days)`}
                  </span>
                </div>
              )}
            </div>
          )}

          <Button onClick={onManageSubscription} variant="outline" className="w-full bg-transparent">
            Manage Subscription
          </Button>
        </CardContent>
      </Card>

      {/* Usage Statistics (for Free users) */}
      {!isPro && (
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Signals</span>
                <span>
                  {usageStats.signalsUsed}/{usageStats.signalsLimit}
                </span>
              </div>
              <Progress value={(usageStats.signalsUsed / usageStats.signalsLimit) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Watchlist Symbols</span>
                <span>
                  {usageStats.watchlistUsed}/{usageStats.watchlistLimit}
                </span>
              </div>
              <Progress value={(usageStats.watchlistUsed / usageStats.watchlistLimit) * 100} className="h-2" />
            </div>

            {usageStats.signalsUsed >= usageStats.signalsLimit && (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary font-medium">Daily limit reached</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Upgrade to Pro for unlimited signals and advanced features
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Pro Benefits */}
      {isPro && (
        <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm premium-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Crown className="h-5 w-5" />
              Pro Benefits Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Unlimited AI Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Premium Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Advanced Risk Metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Priority Support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
