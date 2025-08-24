import { PricingPlans } from "@/components/subscription/pricing-plans"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <Crown className="h-3 w-3 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Choose Your Trading Edge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, no long-term contracts.
          </p>
        </div>

        <PricingPlans />
      </div>
    </section>
  )
}
