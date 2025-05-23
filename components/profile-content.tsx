"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import Link from "next/link"

export default function ProfileContent() {
  const { data: session } = useSession()

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-orange-100 p-6 dark:bg-orange-900/20">
            <User className="h-12 w-12 text-orange-500" />
          </div>
        </div>
        <CardTitle className="mt-4 text-2xl">{session?.user?.name}</CardTitle>
        <CardDescription>{session?.user?.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium">תפקיד:</span>
          <span className="rounded bg-orange-100 px-2 py-1 text-sm dark:bg-orange-900/20">
            {session?.user?.role === "admin" ? "מנהל" : "משתמש"}
          </span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-medium">מזהה משתמש:</span>
          <span className="text-sm text-muted-foreground">{session?.user?.id}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/">חזרה לדף הבית</Link>
        </Button>
        {session?.user?.role === "admin" && (
          <Button asChild>
            <Link href="/admin">לוח בקרה</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
