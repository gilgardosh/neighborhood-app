import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define admin-only paths
  const isAdminPath = path.startsWith("/admin")
  const isProfilePath = path.startsWith("/profile")

  // Skip middleware for API routes, static files, and auth pages
  if (
    path.startsWith("/api/") ||
    path.startsWith("/_next/") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/auth/") ||
    path === "/"
  ) {
    return NextResponse.next()
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Redirect unauthenticated users to login for protected routes
    if (!token && (isAdminPath || isProfilePath)) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(loginUrl)
    }

    // Check for admin access
    if (isAdminPath && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // If there's an error with token verification, redirect to login
    if (isAdminPath || isProfilePath) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", path)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
