import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">TradeMind AI</h1>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl text-card-foreground">Check Your Email</CardTitle>
            <CardDescription>We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please check your email and click the verification link to activate your account. Once verified, you'll be
              able to access your TradeMind AI dashboard.
            </p>
            <div className="pt-4">
              <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium text-sm">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
