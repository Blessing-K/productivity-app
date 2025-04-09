import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

// Routes that do not require authentication
const PUBLIC_PATHS = ["/login", "/register", "/api"];

export async function middleware(request) {
  const token = request.cookies.get("productivity-app")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isLogin = pathname === "/login";

  // ✅ Redirect logged-in users away from login page
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ If no token and route is not public → redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ If token exists → verify it
  if (token) {
    try {
      await jwtVerify(token, getSecretKey());
    } catch (err) {
      console.error("Invalid or expired token:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // applies to everything except static files
};