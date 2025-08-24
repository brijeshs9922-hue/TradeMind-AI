"use client"

import type React from "react"

import { MarketingHeader } from "@/components/marketing/marketing-header"
import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Contact form submitted:", formData)
    alert("Thank you for your message! We'll get back to you within 24 hours.")

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6">
              <MessageSquare className="h-3 w-3 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">We're Here to Help</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about TradeMind AI? Need help with your account? Want to discuss enterprise solutions? Our
              team is ready to assist you.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">support@trademind.ai</p>
                        <p className="text-sm text-muted-foreground">We typically respond within 2-4 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM PST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Office</h3>
                        <p className="text-muted-foreground">
                          123 Market Street
                          <br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM PST
                          <br />
                          Saturday: 10:00 AM - 2:00 PM PST
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Options */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Other Ways to Get Help</h3>
                  <div className="space-y-3">
                    <Card className="border-border bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Headphones className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium text-foreground">Live Chat</h4>
                            <p className="text-sm text-muted-foreground">Available 24/7 for Pro users</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium text-foreground">Help Center</h4>
                            <p className="text-sm text-muted-foreground">Browse our knowledge base</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="bg-input border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="bg-input border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          className="bg-input border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="enterprise">Enterprise Sales</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          className="bg-input border-border resize-none"
                          placeholder="Please provide as much detail as possible..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
