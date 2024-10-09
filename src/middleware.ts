import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the presence of the authentication token
  const token = request.cookies.get("idToken")?.value;

  // If the user is authenticated (has a token)
  if (token) {
    // Redirect authenticated users away from the signup and login pages
    if (
      request.nextUrl.pathname === "/auth/signup" ||
      request.nextUrl.pathname === "/auth/login"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If they are at the root path, redirect to dashboard
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow access to all other pages
    return NextResponse.next();
  } else {
    // If the user is not authenticated (no token)

    // Allow access to the signup and login pages
    if (
      request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/signup"
    ) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users trying to access protected routes to the signup page
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // If at root, redirect to signup
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Allow access to other public pages (if any)
    return NextResponse.next();
  }
}

// Configure the middleware to apply to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*", "/auth/:path*", "/"],
};
