"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  const sessionId = searchParams.get("session_id")
  const planId = searchParams.get("plan")

  useEffect(() => {
    if (!sessionId || !planId) {
      setStatus("error")
      setMessage("Invalid checkout session")
      return
    }

    // Simulate payment processing
    const processPayment = async () => {
      try {
        // In a real implementation, you would verify the payment with your payment processor
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (planId === "pro") {
          setStatus("success")
          setMessage("Welcome to TradeMind Pro! Your subscription is now active.")
        } else {
          setStatus("success")
          setMessage("Your plan has been updated successfully.")
        }

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      } catch (error) {
        setStatus("error")
        setMessage("Payment processing failed. Please try again.")
      }
    }

    processPayment()
  }, [sessionId, planId, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === "loading" && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
            {status === "success" && <CheckCircle className="h-6 w-6 text-green-400" />}
            {status === "error" && <AlertTriangle className="h-6 w-6 text-red-400" />}
            {status === "loading" && "Processing Payment"}
            {status === "success" && "Payment Successful"}
            {status === "error" && "Payment Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>

          {status === "success" && (
            <div className="space-y-2">
              <p className="text-sm text-green-400">Redirecting to dashboard...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "100%" }} />
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-2">
              <Button onClick={() => router.push("/subscription")} className="w-full">
                Back to Subscription
              </Button>
              <Button variant="outline" onClick={() => router.push("/dashboard")} className="w-full bg-transparent">
                Go to Dashboard
              </Button>
            </div>
          )}

          {status === "loading" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
