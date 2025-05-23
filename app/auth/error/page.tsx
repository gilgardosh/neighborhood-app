"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  const [errorMessage, setErrorMessage] = useState("אירעה שגיאה בהתחברות. נסו שנית.")

  useEffect(() => {
    // Get error message from URL if available
    const searchParams = new URLSearchParams(window.location.search)
    const error = searchParams.get("error")

    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("יש בעיה בהגדרות האתר. אנא פנו למנהל המערכת.")
          break
        case "AccessDenied":
          setErrorMessage("הגישה נדחתה. אין לכם הרשאה לגשת לאזור זה.")
          break
        case "Verification":
          setErrorMessage("הקישור לא תקין או שפג תוקפו.")
          break
        case "CredentialsSignin":
          setErrorMessage("פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה ונסו שנית.")
          break
        case "SessionRequired":
          setErrorMessage("נדרשת התחברות כדי לגשת לדף זה.")
          break
        default:
          setErrorMessage("אירעה שגיאה בהתחברות. נסו שנית.")
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/30 dark:to-background">
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">שגיאה בהתחברות</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  חזרה להתחברות
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">דף הבית</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
