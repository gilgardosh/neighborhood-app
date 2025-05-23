import type React from "react"
import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/30 dark:to-background">
      <div className="container relative flex min-h-screen flex-col items-center justify-center">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
          <Image src="/icon.png" alt="הדרים" width={32} height={32} />
          <span className="font-bold text-xl text-primary">הדרים</span>
        </Link>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
