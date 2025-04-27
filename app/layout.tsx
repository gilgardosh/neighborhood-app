import type React from "react"
import "./globals.css"
import { Rubik } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
})

export const metadata = {
  title: "הדרים",
  description: "אתר הקהילה של שכונת הדרים",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", type: "image/png" },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", rubik.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
