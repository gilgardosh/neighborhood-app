"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="הדרים" width={32} height={32} />
            <span className="font-bold text-2xl text-primary">הדרים</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#events" className="text-sm font-medium hover:text-primary">
            אירועים
          </Link>
          <Link href="#whatsapp-groups" className="text-sm font-medium hover:text-primary">
            וואטסאפ
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary">
            שירותים
          </Link>
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">תפריט משתמש</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">פרופיל</Link>
                </DropdownMenuItem>
                {session.user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">ניהול</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>התנתקות</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4 ml-2" />
                התחברות
              </Link>
            </Button>
          )}
        </nav>

        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">פתח תפריט</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icon.png" alt="הדרים" width={32} height={32} />
              <span className="font-bold text-2xl text-primary">הדרים</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">סגור תפריט</span>
            </Button>
          </div>
          <nav className="container grid gap-6 py-6">
            <Link
              href="#events"
              className="text-lg font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              אירועים
            </Link>
            <Link
              href="#whatsapp-groups"
              className="text-lg font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              וואטסאפ
            </Link>
            <Link
              href="#services"
              className="text-lg font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              שירותים
            </Link>
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  פרופיל
                </Link>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ניהול
                  </Link>
                )}
                <Button onClick={() => signOut({ callbackUrl: "/" })}>התנתקות</Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <LogIn className="h-4 w-4 ml-2" />
                  התחברות
                </Link>
              </Button>
            )}
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
