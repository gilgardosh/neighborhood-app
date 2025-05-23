import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/30 dark:to-background">
      <div className="container flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-orange-100 p-4 dark:bg-orange-900/20">
                <ShieldAlert className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">אין הרשאה</CardTitle>
            <CardDescription>אין לך הרשאה לגשת לדף זה. רק מנהלים יכולים לגשת לאזור זה.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/">חזרה לדף הבית</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">התחברות</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
