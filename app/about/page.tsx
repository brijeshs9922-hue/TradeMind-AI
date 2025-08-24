import { MarketingHeader } from "@/components/marketing/marketing-header"
import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Users, Target, Zap, Shield } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-founder",
      image: "/professional-woman-ceo-tech.png",
      bio: "Former Goldman Sachs quantitative analyst with 15+ years in algorithmic trading and machine learning.",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-founder",
      image: "/professional-cto-engineer.png",
      bio: "Ex-Google AI researcher specializing in neural networks and real-time data processing systems.",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      image: "/professional-ai-researcher.png",
      bio: "PhD in Machine Learning from Stanford, former Tesla Autopilot team lead with expertise in predictive modeling.",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "/professional-product-manager.png",
      bio: "Former Robinhood product manager who led the development of their algorithmic trading features.",
    },
  ]

  const values = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Innovation First",
      description: "We push the boundaries of AI and machine learning to create cutting-edge trading solutions.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Transparency",
      description: "We believe in transparent algorithms and honest communication about risks and limitations.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User-Centric",
      description: "Every feature we build is designed with our traders' success and experience in mind.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results Driven",
      description: "We measure our success by the trading performance and satisfaction of our users.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6">
              <TrendingUp className="h-3 w-3 mr-1" />
              About TradeMind AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Democratizing AI-Powered Trading</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to level the playing field in financial markets by making sophisticated AI trading
              tools accessible to everyone, from retail traders to institutional investors.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    TradeMind AI was born from a simple observation: while institutional investors had access to
                    sophisticated AI-powered trading tools, retail traders were left behind with outdated analysis
                    methods.
                  </p>
                  <p>
                    Founded in 2023 by a team of former Wall Street quants and Silicon Valley AI engineers, we set out
                    to democratize access to institutional-grade trading intelligence.
                  </p>
                  <p>
                    Today, we serve over 10,000 traders worldwide, from beginners learning the ropes to seasoned
                    professionals managing multi-million dollar portfolios.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img src="/ai-trading-team.png" alt="TradeMind AI Team" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-4 premium-glow">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-medium text-primary">AI-Powered Since Day One</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-border bg-card/50 backdrop-blur-sm text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto text-primary">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">World-class experts in AI, finance, and technology</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              To empower every trader with AI-driven insights that were once exclusive to Wall Street, democratizing
              access to sophisticated trading intelligence and leveling the playing field in financial markets.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-foreground font-medium">Active Users</div>
              </div>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">87%</div>
                <div className="text-foreground font-medium">Signal Accuracy</div>
              </div>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">$2.5B+</div>
                <div className="text-foreground font-medium">Assets Analyzed</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
