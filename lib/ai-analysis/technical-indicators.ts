// Technical Analysis Indicators for AI Engine

export interface PriceData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface TechnicalIndicators {
  rsi: number
  macd: { macd: number; signal: number; histogram: number }
  sma20: number
  sma50: number
  bollinger: { upper: number; middle: number; lower: number }
  stochastic: { k: number; d: number }
  atr: number
  volume_sma: number
}

// RSI Calculation
export function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50

  const gains: number[] = []
  const losses: number[] = []

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1]
    gains.push(change > 0 ? change : 0)
    losses.push(change < 0 ? Math.abs(change) : 0)
  }

  const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period
  const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period

  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - 100 / (1 + rs)
}

// MACD Calculation
export function calculateMACD(
  prices: number[],
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9,
): { macd: number; signal: number; histogram: number } {
  if (prices.length < slowPeriod) return { macd: 0, signal: 0, histogram: 0 }

  const emaFast = calculateEMA(prices, fastPeriod)
  const emaSlow = calculateEMA(prices, slowPeriod)
  const macd = emaFast - emaSlow

  // For simplicity, using SMA for signal line (should be EMA in production)
  const macdLine = Array(Math.max(0, prices.length - slowPeriod + 1)).fill(macd)
  const signal = macdLine.slice(-signalPeriod).reduce((a, b) => a + b, 0) / Math.min(signalPeriod, macdLine.length)

  return {
    macd,
    signal,
    histogram: macd - signal,
  }
}

// EMA Calculation
export function calculateEMA(prices: number[], period: number): number {
  if (prices.length === 0) return 0
  if (prices.length < period) return prices.reduce((a, b) => a + b, 0) / prices.length

  const multiplier = 2 / (period + 1)
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema
  }

  return ema
}

// Simple Moving Average
export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices.reduce((a, b) => a + b, 0) / prices.length
  const recentPrices = prices.slice(-period)
  return recentPrices.reduce((a, b) => a + b, 0) / period
}

// Bollinger Bands
export function calculateBollingerBands(
  prices: number[],
  period = 20,
  stdDev = 2,
): { upper: number; middle: number; lower: number } {
  const sma = calculateSMA(prices, period)
  const recentPrices = prices.slice(-period)

  const variance = recentPrices.reduce((acc, price) => acc + Math.pow(price - sma, 2), 0) / period
  const standardDeviation = Math.sqrt(variance)

  return {
    upper: sma + standardDeviation * stdDev,
    middle: sma,
    lower: sma - standardDeviation * stdDev,
  }
}

// Stochastic Oscillator
export function calculateStochastic(
  highs: number[],
  lows: number[],
  closes: number[],
  kPeriod = 14,
  dPeriod = 3,
): { k: number; d: number } {
  if (highs.length < kPeriod) return { k: 50, d: 50 }

  const recentHighs = highs.slice(-kPeriod)
  const recentLows = lows.slice(-kPeriod)
  const currentClose = closes[closes.length - 1]

  const highestHigh = Math.max(...recentHighs)
  const lowestLow = Math.min(...recentLows)

  const k = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100

  // Simplified D calculation (should use SMA of K values)
  const d = k // In production, this should be SMA of recent K values

  return { k, d }
}

// Average True Range
export function calculateATR(highs: number[], lows: number[], closes: number[], period = 14): number {
  if (highs.length < 2) return 0

  const trueRanges: number[] = []

  for (let i = 1; i < highs.length; i++) {
    const tr1 = highs[i] - lows[i]
    const tr2 = Math.abs(highs[i] - closes[i - 1])
    const tr3 = Math.abs(lows[i] - closes[i - 1])
    trueRanges.push(Math.max(tr1, tr2, tr3))
  }

  return calculateSMA(trueRanges, Math.min(period, trueRanges.length))
}

// Calculate all technical indicators
export function calculateTechnicalIndicators(priceData: PriceData[]): TechnicalIndicators {
  const closes = priceData.map((d) => d.close)
  const highs = priceData.map((d) => d.high)
  const lows = priceData.map((d) => d.low)
  const volumes = priceData.map((d) => d.volume)

  return {
    rsi: calculateRSI(closes),
    macd: calculateMACD(closes),
    sma20: calculateSMA(closes, 20),
    sma50: calculateSMA(closes, 50),
    bollinger: calculateBollingerBands(closes),
    stochastic: calculateStochastic(highs, lows, closes),
    atr: calculateATR(highs, lows, closes),
    volume_sma: calculateSMA(volumes, 20),
  }
}
