import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { TradingChart } from "@/components/dashboard/trading-chart"
import { AISignals } from "@/components/dashboard/ai-signals"
import { Watchlist } from "@/components/dashboard/watchlist"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Market Overview */}
        <MarketOverview />

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Chart - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TradingChart />
          </div>

          {/* AI Signals */}
          <div className="space-y-6">
            <AISignals />
            <Watchlist userId={data.user.id} />
          </div>
        </div>

        {/* Portfolio and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PortfolioSummary />
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
