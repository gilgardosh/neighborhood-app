"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, LogOut } from "lucide-react"

export default function AdminHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-bold text-2xl text-primary">
            ניהול הדרים
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/admin"
              className={`text-sm font-medium ${
                pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              לוח בקרה
            </Link>
            <Link
              href="/admin/events"
              className={`text-sm font-medium ${
                pathname === "/admin/events" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              אירועים
            </Link>
            <Link
              href="/admin/groups"
              className={`text-sm font-medium ${
                pathname === "/admin/groups" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              קבוצות וואטסאפ
            </Link>
            <Link
              href="/admin/users"
              className={`text-sm font-medium ${
                pathname === "/admin/users" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              משתמשים
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">דף הבית</span>
            </Link>
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">התנתקות</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
