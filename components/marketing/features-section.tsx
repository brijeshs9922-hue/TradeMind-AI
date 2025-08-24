import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  BarChart3,
  Clock,
  Target,
  Smartphone,
  Globe,
  Lock,
  Cpu,
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI Analysis",
      description:
        "Multi-layered neural networks analyze market patterns, sentiment, and technical indicators to generate high-confidence trading signals.",
      badge: "Core Feature",
      badgeColor: "bg-primary/20 text-primary border-primary/30",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-time Market Signals",
      description:
        "Get instant notifications when our AI identifies profitable trading opportunities with precise entry and exit points.",
      badge: "Real-time",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk Management",
      description:
        "Intelligent position sizing and stop-loss recommendations help protect your capital while maximizing potential returns.",
      badge: "Risk Control",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Technical Analysis",
      description:
        "Comprehensive technical indicators including RSI, MACD, Bollinger Bands, and custom proprietary metrics.",
      badge: "Analytics",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Smart Watchlists",
      description:
        "AI-powered watchlists that automatically track and alert you to significant movements in your favorite stocks.",
      badge: "Automation",
      badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision Targeting",
      description:
        "Machine learning algorithms identify optimal price targets and stop-loss levels based on historical patterns.",
      badge: "ML Powered",
      badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Multi-Timeframe Analysis",
      description:
        "Analyze market conditions across multiple timeframes from 1-minute to daily charts for comprehensive insights.",
      badge: "Flexible",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Execution",
      description:
        "Sub-second signal generation and delivery ensures you never miss a trading opportunity in volatile markets.",
      badge: "Performance",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Optimized",
      description:
        "Trade on the go with our responsive design that works perfectly on desktop, tablet, and mobile devices.",
      badge: "Cross-platform",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
  ]

  return (
    <section id="features" className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Cpu className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Everything You Need to Trade Smarter</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools gives you the edge in today's competitive markets. From signal
            generation to risk management, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 hover:scale-[1.02] group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge className={feature.badgeColor}>{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Global Markets</h3>
            <p className="text-muted-foreground">
              Trade stocks, ETFs, crypto, and forex across multiple global exchanges with unified analysis.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Bank-Grade Security</h3>
            <p className="text-muted-foreground">
              Your data and trading strategies are protected with enterprise-level encryption and security protocols.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
              <Cpu className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Continuous Learning</h3>
            <p className="text-muted-foreground">
              Our AI models continuously learn and adapt to changing market conditions for improved accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
