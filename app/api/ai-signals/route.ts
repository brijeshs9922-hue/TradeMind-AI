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

    // Get user profile to check subscription
    const { data: profile } = await supabase.from("profiles").select("subscription_tier").eq("id", user.id).single()

    const isPro = profile?.subscription_tier === "pro"

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")
    const timeframe = searchParams.get("timeframe")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Build query
    let query = supabase.from("ai_signals").select("*").order("created_at", { ascending: false }).limit(limit)

    // Filter by symbol if provided
    if (symbol) {
      query = query.eq("symbol", symbol.toUpperCase())
    }

    // Filter by timeframe if provided
    if (timeframe) {
      query = query.eq("timeframe", timeframe)
    }

    // Filter premium signals for non-pro users
    if (!isPro) {
      query = query.eq("is_premium", false)
    }

    // Only show non-expired signals
    query = query.gt("expires_at", new Date().toISOString())

    const { data: signals, error } = await query

    if (error) {
      console.error("Error fetching signals:", error)
      return NextResponse.json({ error: "Failed to fetch signals" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      signals,
      user_tier: isPro ? "pro" : "free",
    })
  } catch (error) {
    console.error("Error in signals API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
