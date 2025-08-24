import { calculateTechnicalIndicators, type PriceData, type TechnicalIndicators } from "./technical-indicators"

export interface AISignal {
  symbol: string
  signal_type: "BUY" | "SELL" | "HOLD"
  confidence_score: number
  price_target: number
  stop_loss: number
  timeframe: string
  analysis_data: {
    indicators: TechnicalIndicators
    patterns: string[]
    sentiment: "BULLISH" | "BEARISH" | "NEUTRAL"
    risk_level: "LOW" | "MEDIUM" | "HIGH"
    reasoning: string[]
  }
  is_premium: boolean
  expires_at: Date
}

export class AISignalGenerator {
  // Momentum Strategy Analysis
  private analyzeMomentum(indicators: TechnicalIndicators): {
    signal: "BUY" | "SELL" | "HOLD"
    confidence: number
    reasoning: string[]
  } {
    const reasoning: string[] = []
    let bullishSignals = 0
    let bearishSignals = 0
    let totalSignals = 0

    // RSI Analysis
    if (indicators.rsi < 30) {
      bullishSignals++
      reasoning.push("RSI oversold condition suggests potential upward reversal")
    } else if (indicators.rsi > 70) {
      bearishSignals++
      reasoning.push("RSI overbought condition indicates potential downward correction")
    }
    totalSignals++

    // MACD Analysis
    if (indicators.macd.histogram > 0 && indicators.macd.macd > indicators.macd.signal) {
      bullishSignals++
      reasoning.push("MACD bullish crossover with positive histogram")
    } else if (indicators.macd.histogram < 0 && indicators.macd.macd < indicators.macd.signal) {
      bearishSignals++
      reasoning.push("MACD bearish crossover with negative histogram")
    }
    totalSignals++

    // Moving Average Analysis
    if (indicators.sma20 > indicators.sma50) {
      bullishSignals++
      reasoning.push("Short-term MA above long-term MA indicates uptrend")
    } else if (indicators.sma20 < indicators.sma50) {
      bearishSignals++
      reasoning.push("Short-term MA below long-term MA indicates downtrend")
    }
    totalSignals++

    const bullishRatio = bullishSignals / totalSignals
    const bearishRatio = bearishSignals / totalSignals

    if (bullishRatio > 0.6) {
      return { signal: "BUY", confidence: Math.min(bullishRatio * 100, 95), reasoning }
    } else if (bearishRatio > 0.6) {
      return { signal: "SELL", confidence: Math.min(bearishRatio * 100, 95), reasoning }
    } else {
      return { signal: "HOLD", confidence: 50, reasoning: ["Mixed signals, no clear direction"] }
    }
  }

  // Mean Reversion Strategy Analysis
  private analyzeMeanReversion(
    indicators: TechnicalIndicators,
    currentPrice: number,
  ): {
    signal: "BUY" | "SELL" | "HOLD"
    confidence: number
    reasoning: string[]
  } {
    const reasoning: string[] = []
    let score = 0

    // Bollinger Bands Analysis
    if (currentPrice <= indicators.bollinger.lower) {
      score += 30
      reasoning.push("Price at lower Bollinger Band suggests oversold condition")
    } else if (currentPrice >= indicators.bollinger.upper) {
      score -= 30
      reasoning.push("Price at upper Bollinger Band suggests overbought condition")
    }

    // RSI Mean Reversion
    if (indicators.rsi < 25) {
      score += 25
      reasoning.push("Extremely oversold RSI indicates strong reversal potential")
    } else if (indicators.rsi > 75) {
      score -= 25
      reasoning.push("Extremely overbought RSI suggests imminent correction")
    }

    // Stochastic Analysis
    if (indicators.stochastic.k < 20 && indicators.stochastic.d < 20) {
      score += 20
      reasoning.push("Stochastic in oversold territory")
    } else if (indicators.stochastic.k > 80 && indicators.stochastic.d > 80) {
      score -= 20
      reasoning.push("Stochastic in overbought territory")
    }

    const confidence = Math.abs(score)

    if (score > 40) {
      return { signal: "BUY", confidence, reasoning }
    } else if (score < -40) {
      return { signal: "SELL", confidence, reasoning }
    } else {
      return { signal: "HOLD", confidence: 30, reasoning: ["No clear mean reversion signal"] }
    }
  }

  // Pattern Recognition
  private detectPatterns(priceData: PriceData[], indicators: TechnicalIndicators): string[] {
    const patterns: string[] = []
    const closes = priceData.map((d) => d.close)

    if (closes.length < 5) return patterns

    // Golden Cross Pattern
    if (indicators.sma20 > indicators.sma50) {
      patterns.push("Golden Cross Formation")
    }

    // Death Cross Pattern
    if (indicators.sma20 < indicators.sma50) {
      patterns.push("Death Cross Formation")
    }

    // Bollinger Squeeze
    const bandWidth = (indicators.bollinger.upper - indicators.bollinger.lower) / indicators.bollinger.middle
    if (bandWidth < 0.1) {
      patterns.push("Bollinger Band Squeeze")
    }

    // RSI Divergence (simplified)
    if (indicators.rsi > 50 && closes[closes.length - 1] > closes[closes.length - 5]) {
      patterns.push("Bullish RSI Momentum")
    } else if (indicators.rsi < 50 && closes[closes.length - 1] < closes[closes.length - 5]) {
      patterns.push("Bearish RSI Momentum")
    }

    return patterns
  }

  // Calculate Risk Level
  private calculateRiskLevel(indicators: TechnicalIndicators, volatility: number): "LOW" | "MEDIUM" | "HIGH" {
    let riskScore = 0

    // ATR-based volatility risk
    if (volatility > 0.05) riskScore += 2
    else if (volatility > 0.03) riskScore += 1

    // RSI extremes add risk
    if (indicators.rsi > 80 || indicators.rsi < 20) riskScore += 1

    // MACD volatility
    if (Math.abs(indicators.macd.histogram) > Math.abs(indicators.macd.macd) * 0.5) riskScore += 1

    if (riskScore >= 3) return "HIGH"
    if (riskScore >= 2) return "MEDIUM"
    return "LOW"
  }

  // Main signal generation method
  public generateSignal(symbol: string, priceData: PriceData[], timeframe = "1D"): AISignal {
    const indicators = calculateTechnicalIndicators(priceData)
    const currentPrice = priceData[priceData.length - 1].close
    const patterns = this.detectPatterns(priceData, indicators)

    // Calculate volatility
    const closes = priceData.map((d) => d.close)
    const returns = closes.slice(1).map((price, i) => (price - closes[i]) / closes[i])
    const volatility = Math.sqrt(returns.reduce((acc, ret) => acc + ret * ret, 0) / returns.length)

    // Run multiple analysis strategies
    const momentumAnalysis = this.analyzeMomentum(indicators)
    const meanReversionAnalysis = this.analyzeMeanReversion(indicators, currentPrice)

    // Combine strategies with weights
    const momentumWeight = 0.6
    const meanReversionWeight = 0.4

    let finalSignal: "BUY" | "SELL" | "HOLD" = "HOLD"
    let finalConfidence = 50
    let combinedReasoning: string[] = []

    // Weighted decision making
    if (momentumAnalysis.signal === meanReversionAnalysis.signal) {
      finalSignal = momentumAnalysis.signal
      finalConfidence = Math.min(
        momentumAnalysis.confidence * momentumWeight + meanReversionAnalysis.confidence * meanReversionWeight,
        95,
      )
      combinedReasoning = [...momentumAnalysis.reasoning, ...meanReversionAnalysis.reasoning]
    } else {
      // Conflicting signals - use momentum as primary
      if (momentumAnalysis.confidence > meanReversionAnalysis.confidence + 20) {
        finalSignal = momentumAnalysis.signal
        finalConfidence = momentumAnalysis.confidence * 0.8 // Reduce confidence due to conflict
        combinedReasoning = momentumAnalysis.reasoning
        combinedReasoning.push("Note: Mean reversion analysis shows conflicting signal")
      } else {
        finalSignal = "HOLD"
        finalConfidence = 40
        combinedReasoning = ["Conflicting signals between momentum and mean reversion strategies"]
      }
    }

    // Calculate price targets and stop loss
    const atrMultiplier = 2
    const priceTarget =
      finalSignal === "BUY"
        ? currentPrice + indicators.atr * atrMultiplier
        : finalSignal === "SELL"
          ? currentPrice - indicators.atr * atrMultiplier
          : currentPrice

    const stopLoss =
      finalSignal === "BUY"
        ? currentPrice - indicators.atr * 1.5
        : finalSignal === "SELL"
          ? currentPrice + indicators.atr * 1.5
          : currentPrice

    // Determine sentiment
    let sentiment: "BULLISH" | "BEARISH" | "NEUTRAL" = "NEUTRAL"
    if (finalSignal === "BUY") sentiment = "BULLISH"
    else if (finalSignal === "SELL") sentiment = "BEARISH"

    // Risk assessment
    const riskLevel = this.calculateRiskLevel(indicators, volatility)

    // Determine if signal is premium (high confidence + complex analysis)
    const isPremium = finalConfidence > 80 || patterns.length > 2 || riskLevel === "HIGH"

    return {
      symbol,
      signal_type: finalSignal,
      confidence_score: Math.round(finalConfidence),
      price_target: Math.round(priceTarget * 100) / 100,
      stop_loss: Math.round(stopLoss * 100) / 100,
      timeframe,
      analysis_data: {
        indicators,
        patterns,
        sentiment,
        risk_level: riskLevel,
        reasoning: combinedReasoning,
      },
      is_premium: isPremium,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    }
  }
}
