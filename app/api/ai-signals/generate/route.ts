import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { AISignalGenerator } from "@/lib/ai-analysis/signal-generator"
import { MarketDataService } from "@/lib/ai-analysis/market-data"

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { symbol, timeframe = "1D" } = body

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    // Initialize services
    const marketDataService = new MarketDataService()
    const signalGenerator = new AISignalGenerator()

    // Fetch market data
    const priceData = await marketDataService.fetchPriceData(symbol, timeframe, 100)

    if (priceData.length === 0) {
      return NextResponse.json({ error: "No market data available" }, { status: 404 })
    }

    // Generate AI signal
    const signal = signalGenerator.generateSignal(symbol, priceData, timeframe)

    // Save signal to database
    const { data: savedSignal, error: saveError } = await supabase
      .from("ai_signals")
      .insert({
        symbol: signal.symbol,
        signal_type: signal.signal_type,
        confidence_score: signal.confidence_score,
        price_target: signal.price_target,
        stop_loss: signal.stop_loss,
        timeframe: signal.timeframe,
        analysis_data: signal.analysis_data,
        is_premium: signal.is_premium,
        expires_at: signal.expires_at.toISOString(),
      })
      .select()
      .single()

    if (saveError) {
      console.error("Error saving signal:", saveError)
      return NextResponse.json({ error: "Failed to save signal" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      signal: savedSignal,
    })
  } catch (error) {
    console.error("Error generating AI signal:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
