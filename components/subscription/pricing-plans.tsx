"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, TrendingUp, Shield, Eye, Brain } from "lucide-react"
import { useState } from "react"

interface PricingPlansProps {
  currentTier?: string
  onUpgrade?: (planId: string) => void
}

export function PricingPlans({ currentTier = "free", onUpgrade }: PricingPlansProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleUpgrade = async (planId: string) => {
    setIsLoading(planId)
    try {
      if (onUpgrade) {
        await onUpgrade(planId)
      }
    } finally {
      setIsLoading(null)
    }
  }

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      description: "Get started with basic trading insights",
      icon: <TrendingUp className="h-6 w-6" />,
      features: [
        "5 AI signals per day",
        "Basic technical analysis",
        "Market overview dashboard",
        "Watchlist (up to 10 symbols)",
        "Email support",
      ],
      limitations: ["No premium signals", "Limited historical data", "Basic risk analysis"],
      buttonText: currentTier === "free" ? "Current Plan" : "Downgrade",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 49,
      period: "month",
      description: "Advanced AI-powered trading intelligence",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Unlimited AI signals",
        "Premium high-confidence signals",
        "Advanced multi-layer analysis",
        "Real-time market alerts",
        "Unlimited watchlist",
        "Portfolio risk analysis",
        "Pattern recognition alerts",
        "Priority support",
        "API access",
        "Custom signal parameters",
      ],
      limitations: [],
      buttonText: currentTier === "pro" ? "Current Plan" : "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Trading Edge</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock the power of AI-driven trading insights. Upgrade to Pro for unlimited signals and advanced analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative border-border bg-card/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
              plan.popular ? "border-primary/50 premium-glow" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${plan.popular ? "bg-primary/20" : "bg-muted/20"}`}>{plan.icon}</div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  What's Included
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground">Limitations</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="h-4 w-4 mt-0.5 flex-shrink-0">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full mt-1" />
                        </div>
                        <span className="text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <Button
                className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90 premium-glow" : ""}`}
                variant={plan.buttonVariant}
                disabled={currentTier === plan.id || isLoading === plan.id}
                onClick={() => handleUpgrade(plan.id)}
              >
                {isLoading === plan.id ? "Processing..." : plan.buttonText}
              </Button>

              {plan.popular && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">7-day free trial • Cancel anytime • No setup fees</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="max-w-4xl mx-auto">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4">Pro</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      AI Signals per day
                    </td>
                    <td className="text-center py-3 px-4">5</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Crown className="h-4 w-4 text-primary" />
                      Premium Signals
                    </td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Watchlist Symbols
                    </td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      Advanced Analysis
                    </td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Risk Analysis
                    </td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">Advanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
