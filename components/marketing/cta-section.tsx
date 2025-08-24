import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <Badge className="bg-primary/20 text-primary border-primary/30 premium-glow">
            <Zap className="h-3 w-3 mr-1" />
            Ready to Start?
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Join the Future of Trading Today</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't let another profitable opportunity slip away. Start your free trial and experience the power of
            AI-driven trading intelligence.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">7-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground premium-glow">
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent">
                Contact Sales
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Join 10,000+ traders already using TradeMind AI • No credit card required
          </p>
        </div>
      </div>
    </section>
  )
}
