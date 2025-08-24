-- Generate initial AI signals for popular symbols
-- This script creates sample signals for testing and demonstration

-- First, let's ensure we have some test signals
INSERT INTO ai_signals (
  symbol,
  signal_type,
  confidence_score,
  price_target,
  stop_loss,
  timeframe,
  analysis_data,
  is_premium,
  expires_at
) VALUES 
(
  'AAPL',
  'BUY',
  87,
  195.50,
  185.20,
  '1D',
  '{
    "indicators": {
      "rsi": 45.2,
      "macd": {"macd": 1.23, "signal": 0.89, "histogram": 0.34},
      "sma20": 190.45,
      "sma50": 188.20,
      "bollinger": {"upper": 195.0, "middle": 190.0, "lower": 185.0}
    },
    "patterns": ["Golden Cross Formation", "Bullish RSI Momentum"],
    "sentiment": "BULLISH",
    "risk_level": "MEDIUM",
    "reasoning": ["Strong momentum with bullish RSI divergence", "Short-term MA above long-term MA indicates uptrend"]
  }'::jsonb,
  false,
  NOW() + INTERVAL '24 hours'
),
(
  'NVDA',
  'BUY',
  92,
  520.00,
  480.00,
  '4H',
  '{
    "indicators": {
      "rsi": 62.8,
      "macd": {"macd": 2.45, "signal": 1.89, "histogram": 0.56},
      "sma20": 505.30,
      "sma50": 495.80,
      "bollinger": {"upper": 525.0, "middle": 505.0, "lower": 485.0}
    },
    "patterns": ["AI Sector Momentum", "Technical Breakout Pattern"],
    "sentiment": "BULLISH",
    "risk_level": "HIGH",
    "reasoning": ["AI sector momentum + technical breakout pattern", "High volume confirmation"]
  }'::jsonb,
  true,
  NOW() + INTERVAL '24 hours'
),
(
  'TSLA',
  'SELL',
  78,
  240.00,
  255.00,
  '1D',
  '{
    "indicators": {
      "rsi": 76.5,
      "macd": {"macd": -0.89, "signal": -0.45, "histogram": -0.44},
      "sma20": 248.90,
      "sma50": 252.10,
      "bollinger": {"upper": 260.0, "middle": 250.0, "lower": 240.0}
    },
    "patterns": ["Bearish RSI Momentum", "Overbought Conditions"],
    "sentiment": "BEARISH",
    "risk_level": "MEDIUM",
    "reasoning": ["Overbought conditions with bearish divergence", "RSI showing weakness"]
  }'::jsonb,
  false,
  NOW() + INTERVAL '24 hours'
),
(
  'SPY',
  'BUY',
  82,
  452.30,
  441.20,
  '1D',
  '{
    "indicators": {
      "rsi": 58.3,
      "macd": {"macd": 1.45, "signal": 1.12, "histogram": 0.33},
      "sma20": 446.80,
      "sma50": 444.20,
      "bollinger": {"upper": 450.0, "middle": 445.0, "lower": 440.0}
    },
    "patterns": ["Market Strength", "Bullish Momentum"],
    "sentiment": "BULLISH",
    "risk_level": "LOW",
    "reasoning": ["Broad market strength", "Consistent upward momentum"]
  }'::jsonb,
  false,
  NOW() + INTERVAL '24 hours'
),
(
  'MSFT',
  'HOLD',
  65,
  380.00,
  375.00,
  '1D',
  '{
    "indicators": {
      "rsi": 52.1,
      "macd": {"macd": 0.12, "signal": 0.08, "histogram": 0.04},
      "sma20": 378.50,
      "sma50": 377.80,
      "bollinger": {"upper": 385.0, "middle": 378.0, "lower": 371.0}
    },
    "patterns": ["Consolidation Pattern"],
    "sentiment": "NEUTRAL",
    "risk_level": "LOW",
    "reasoning": ["Mixed signals, no clear direction", "Consolidating in range"]
  }'::jsonb,
  false,
  NOW() + INTERVAL '24 hours'
);
