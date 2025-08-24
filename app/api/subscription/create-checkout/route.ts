import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const { planId, successUrl, cancelUrl } = body

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // In a real implementation, this would integrate with Stripe or another payment processor
    // For now, we'll simulate the checkout process

    const checkoutSession = {
      id: `cs_${Date.now()}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/subscription/checkout?session_id=cs_${Date.now()}&plan=${planId}`,
      planId,
      userId: user.id,
      amount: planId === "pro" ? 4900 : 0, // $49.00 in cents
      currency: "usd",
    }

    // Log the checkout attempt
    console.log(`[v0] Creating checkout session for user ${user.id}, plan: ${planId}`)

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
