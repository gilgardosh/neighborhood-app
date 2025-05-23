import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "התחברות | הדרים",
  description: "התחברות לאתר הקהילה של שכונת הדרים",
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">התחברות</h1>
        <p className="text-gray-500 dark:text-gray-400">הזינו את פרטי ההתחברות שלכם</p>
      </div>
      <LoginForm />
      <div className="text-center text-sm">
        <p>
          אין לכם חשבון?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            הרשמו כאן
          </Link>
        </p>
      </div>
    </div>
  )
}
