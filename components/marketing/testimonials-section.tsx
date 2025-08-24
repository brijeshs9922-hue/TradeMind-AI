import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Day Trader",
      company: "Independent",
      image: "/professional-woman-trader.png",
      rating: 5,
      content:
        "TradeMind AI has completely transformed my trading strategy. The signal accuracy is incredible, and I've seen a 40% improvement in my returns since switching to Pro.",
      highlight: "40% improvement in returns",
    },
    {
      name: "Michael Rodriguez",
      role: "Portfolio Manager",
      company: "Apex Capital",
      image: "/professional-man-finance.png",
      rating: 5,
      content:
        "The AI analysis is spot-on. What used to take hours of manual research now happens in seconds. The risk management features alone are worth the subscription.",
      highlight: "Hours to seconds",
    },
    {
      name: "Emily Watson",
      role: "Swing Trader",
      company: "Watson Investments",
      image: "/professional-woman-investor.png",
      rating: 5,
      content:
        "I was skeptical about AI trading tools, but TradeMind proved me wrong. The multi-timeframe analysis and pattern recognition are game-changers.",
      highlight: "Game-changing analysis",
    },
    {
      name: "David Kim",
      role: "Quantitative Analyst",
      company: "TechTrade LLC",
      image: "/professional-analyst.png",
      rating: 5,
      content:
        "As a quant, I appreciate the technical depth. The AI models are sophisticated, and the backtesting results consistently match live performance.",
      highlight: "Consistent performance",
    },
    {
      name: "Lisa Thompson",
      role: "Retail Trader",
      company: "Self-employed",
      image: "/professional-woman-trader-casual.png",
      rating: 5,
      content:
        "Finally, a tool that levels the playing field. The educational aspects help me understand why signals are generated, making me a better trader overall.",
      highlight: "Better trader overall",
    },
    {
      name: "James Park",
      role: "Hedge Fund Manager",
      company: "Park Capital",
      image: "/professional-man-hedge-fund.png",
      rating: 5,
      content:
        "We've integrated TradeMind into our institutional workflow. The API access and custom parameters make it perfect for our algorithmic strategies.",
      highlight: "Perfect for algorithms",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Star className="h-3 w-3 mr-1" />
            Trusted by Traders
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful traders who have transformed their trading with TradeMind AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200 hover:scale-[1.02] relative"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30" />

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>

                {/* Highlight */}
                <Badge className="bg-primary/10 text-primary border-primary/20">{testimonial.highlight}</Badge>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center space-y-8">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">4.9/5</span>
              <span>Average Rating</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified</Badge>
              <span>All Reviews Verified</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold">500+</span>
              <span>5-Star Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
