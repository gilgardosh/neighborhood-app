"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export default function AuthGuard({
  children,
  requireAuth = false,
  requireAdmin = false,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (requireAuth && status === "unauthenticated") {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    if (requireAdmin && session?.user?.role !== "admin") {
      router.push("/unauthorized")
      return
    }
  }, [status, session, requireAuth, requireAdmin, redirectTo, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>טוען...</span>
        </div>
      </div>
    )
  }

  if (requireAuth && status === "unauthenticated") {
    return null // Will redirect
  }

  if (requireAdmin && session?.user?.role !== "admin") {
    return null // Will redirect
  }

  return <>{children}</>
}
