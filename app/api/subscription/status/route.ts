import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile and subscription
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

    const { data: billingHistory } = await supabase
      .from("billing_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    // Calculate usage stats for free users
    let usageStats = null
    if (profile?.subscription_tier !== "pro") {
      // Get signals used today
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { count: signalsToday } = await supabase
        .from("ai_signals")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString())

      // Get watchlist count
      const { data: watchlists } = await supabase.from("watchlists").select("symbols").eq("user_id", user.id)

      const totalWatchlistSymbols =
        watchlists?.reduce((total, watchlist) => {
          return total + (watchlist.symbols?.length || 0)
        }, 0) || 0

      usageStats = {
        signalsUsed: signalsToday || 0,
        signalsLimit: 5,
        watchlistUsed: totalWatchlistSymbols,
        watchlistLimit: 10,
      }
    }

    return NextResponse.json({
      success: true,
      profile,
      subscription,
      billingHistory,
      usageStats,
    })
  } catch (error) {
    console.error("Error fetching subscription status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
