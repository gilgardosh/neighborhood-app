"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-2xl text-primary">
            הדרים
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
            <Link href="/" className="font-bold text-2xl text-primary">
              הדרים
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
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
