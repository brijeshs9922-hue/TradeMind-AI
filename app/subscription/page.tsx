import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PricingPlans } from "@/components/subscription/pricing-plans"
import { SubscriptionStatus } from "@/components/subscription/subscription-status"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown } from "lucide-react"

export default async function SubscriptionPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile and subscription
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", data.user.id).single()

  const handleUpgrade = async (planId: string) => {
    "use server"
    // This would integrate with payment processor
    console.log("Upgrading to plan:", planId)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Subscription Management</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your TradeMind AI subscription and unlock advanced trading intelligence features.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Status */}
            <div className="lg:col-span-1">
              <SubscriptionStatus
                subscription={subscription}
                profile={profile}
                onManageSubscription={() => {
                  // Handle subscription management
                  console.log("Manage subscription")
                }}
              />
            </div>

            {/* Pricing Plans */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <PricingPlans currentTier={profile?.subscription_tier || "free"} onUpgrade={handleUpgrade} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
