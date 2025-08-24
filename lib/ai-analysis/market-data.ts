// Market Data Service for AI Analysis

import type { PriceData } from "./technical-indicators"

export class MarketDataService {
  // Simulate real market data (in production, this would connect to real APIs)
  public async fetchPriceData(symbol: string, timeframe = "1D", limit = 100): Promise<PriceData[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Generate realistic price data
    const data: PriceData[] = []
    let basePrice = this.getBasePrice(symbol)
    const now = Date.now()
    const timeInterval = this.getTimeInterval(timeframe)

    for (let i = limit - 1; i >= 0; i--) {
      const timestamp = now - i * timeInterval
      const volatility = 0.02 // 2% volatility
      const trend = Math.sin(i * 0.1) * 0.001 // Small trend component

      // Generate OHLC data
      const open = basePrice
      const change = (Math.random() - 0.5) * volatility + trend
      const close = open * (1 + change)

      const high = Math.max(open, close) * (1 + Math.random() * 0.01)
      const low = Math.min(open, close) * (1 - Math.random() * 0.01)
      const volume = Math.floor(Math.random() * 1000000) + 500000

      data.push({
        timestamp,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume,
      })

      basePrice = close
    }

    return data
  }

  private getBasePrice(symbol: string): number {
    const basePrices: { [key: string]: number } = {
      AAPL: 190.0,
      MSFT: 380.0,
      GOOGL: 140.0,
      TSLA: 250.0,
      NVDA: 500.0,
      AMZN: 150.0,
      META: 320.0,
      NFLX: 450.0,
      SPY: 445.0,
      QQQ: 375.0,
      BTC: 43000.0,
    }

    return basePrices[symbol] || 100.0
  }

  private getTimeInterval(timeframe: string): number {
    const intervals: { [key: string]: number } = {
      "1M": 60 * 1000, // 1 minute
      "5M": 5 * 60 * 1000, // 5 minutes
      "15M": 15 * 60 * 1000, // 15 minutes
      "1H": 60 * 60 * 1000, // 1 hour
      "4H": 4 * 60 * 60 * 1000, // 4 hours
      "1D": 24 * 60 * 60 * 1000, // 1 day
    }

    return intervals[timeframe] || intervals["1D"]
  }

  // Get multiple symbols data for batch processing
  public async fetchMultipleSymbols(symbols: string[], timeframe = "1D"): Promise<{ [symbol: string]: PriceData[] }> {
    const results: { [symbol: string]: PriceData[] } = {}

    // Fetch data for all symbols in parallel
    const promises = symbols.map(async (symbol) => {
      const data = await this.fetchPriceData(symbol, timeframe)
      results[symbol] = data
    })

    await Promise.all(promises)
    return results
  }

  // Get real-time price (simulated)
  public async getCurrentPrice(symbol: string): Promise<number> {
    const data = await this.fetchPriceData(symbol, "1M", 1)
    return data[0]?.close || 0
  }
}
