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
    const { symbols, timeframe = "1D" } = body

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json({ error: "Symbols array is required" }, { status: 400 })
    }

    // Initialize services
    const marketDataService = new MarketDataService()
    const signalGenerator = new AISignalGenerator()

    // Fetch market data for all symbols
    const marketData = await marketDataService.fetchMultipleSymbols(symbols, timeframe)

    const signals = []
    const errors = []

    // Generate signals for each symbol
    for (const symbol of symbols) {
      try {
        const priceData = marketData[symbol]
        if (!priceData || priceData.length === 0) {
          errors.push({ symbol, error: "No market data available" })
          continue
        }

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
          errors.push({ symbol, error: "Failed to save signal" })
          continue
        }

        signals.push(savedSignal)
      } catch (error) {
        errors.push({ symbol, error: "Failed to generate signal" })
      }
    }

    return NextResponse.json({
      success: true,
      signals,
      errors,
      processed: symbols.length,
      successful: signals.length,
      failed: errors.length,
    })
  } catch (error) {
    console.error("Error in batch signal generation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
