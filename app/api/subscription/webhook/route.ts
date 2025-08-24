import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // In a real implementation, you would verify the webhook signature here
    const { type, data } = body

    console.log(`[v0] Received webhook: ${type}`)

    switch (type) {
      case "checkout.session.completed": {
        const session = data.object
        const userId = session.client_reference_id
        const planId = session.metadata?.plan_id

        if (!userId || !planId) {
          console.error("Missing userId or planId in webhook data")
          return NextResponse.json({ error: "Invalid webhook data" }, { status: 400 })
        }

        // Create or update subscription
        const subscriptionData = {
          user_id: userId,
          plan_id: planId,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          trial_end: planId === "pro" ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null, // 7 day trial
          cancel_at_period_end: false,
        }

        const { error: subscriptionError } = await supabase
          .from("subscriptions")
          .upsert(subscriptionData, { onConflict: "user_id" })

        if (subscriptionError) {
          console.error("Error creating subscription:", subscriptionError)
          return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
        }

        // Update user profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            subscription_tier: planId,
            subscription_expires_at: subscriptionData.current_period_end,
          })
          .eq("id", userId)

        if (profileError) {
          console.error("Error updating profile:", profileError)
        }

        // Create billing history record
        const { error: billingError } = await supabase.from("billing_history").insert({
          user_id: userId,
          subscription_id: session.subscription,
          amount: session.amount_total / 100, // Convert from cents
          currency: session.currency,
          status: "paid",
          billing_reason: "subscription_create",
          invoice_url: session.invoice,
        })

        if (billingError) {
          console.error("Error creating billing record:", billingError)
        }

        console.log(`[v0] Successfully processed subscription for user ${userId}`)
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = data.object
        const subscriptionId = invoice.subscription
        const customerId = invoice.customer

        // Update subscription status
        const { error } = await supabase.from("subscriptions").update({ status: "active" }).eq("id", subscriptionId)

        if (error) {
          console.error("Error updating subscription status:", error)
        }

        console.log(`[v0] Payment succeeded for subscription ${subscriptionId}`)
        break
      }

      case "invoice.payment_failed": {
        const invoice = data.object
        const subscriptionId = invoice.subscription

        // Update subscription status
        const { error } = await supabase.from("subscriptions").update({ status: "past_due" }).eq("id", subscriptionId)

        if (error) {
          console.error("Error updating subscription status:", error)
        }

        console.log(`[v0] Payment failed for subscription ${subscriptionId}`)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = data.object
        const subscriptionId = subscription.id

        // Update subscription status
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            cancel_at_period_end: true,
          })
          .eq("id", subscriptionId)

        if (error) {
          console.error("Error canceling subscription:", error)
        }

        // Update user profile
        const { data: subscriptionData } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("id", subscriptionId)
          .single()

        if (subscriptionData) {
          await supabase.from("profiles").update({ subscription_tier: "free" }).eq("id", subscriptionData.user_id)
        }

        console.log(`[v0] Subscription canceled: ${subscriptionId}`)
        break
      }

      default:
        console.log(`[v0] Unhandled webhook type: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
