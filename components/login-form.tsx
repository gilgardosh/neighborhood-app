"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const registered = searchParams.get("registered")
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const errorParam = searchParams.get("error")

  // Set error message based on URL parameter
  useState(() => {
    if (errorParam) {
      switch (errorParam) {
        case "CredentialsSignin":
          setError("פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה.")
          break
        default:
          setError("אירעה שגיאה בהתחברות. נסו שנית.")
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError("פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה.")
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("אירעה שגיאה בהתחברות. נסו שנית מאוחר יותר.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {registered && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>ההרשמה הושלמה בהצלחה! כעת תוכלו להתחבר.</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border bg-card p-4">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">חשבונות לדוגמה:</p>
          <div className="space-y-1 text-xs">
            <p>
              <strong>מנהל:</strong> admin@hadarim.com / admin123
            </p>
            <p>
              <strong>משתמש:</strong> user@hadarim.com / user123
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">אימייל</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">סיסמה</Label>
            <Button variant="link" className="h-auto p-0 text-sm" asChild>
              <Link href="/forgot-password">שכחתי סיסמה</Link>
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "מתחבר..." : "התחברות"}
        </Button>
      </form>
    </div>
  )
}
