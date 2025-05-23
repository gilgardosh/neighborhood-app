import type { Metadata } from "next"
import Link from "next/link"
import SignupForm from "@/components/signup-form"

export const metadata: Metadata = {
  title: "הרשמה | הדרים",
  description: "הרשמה לאתר הקהילה של שכונת הדרים",
}

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">הרשמה</h1>
        <p className="text-gray-500 dark:text-gray-400">צרו חשבון חדש</p>
      </div>
      <SignupForm />
      <div className="text-center text-sm">
        <p>
          כבר יש לכם חשבון?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            התחברו כאן
          </Link>
        </p>
      </div>
    </div>
  )
}
