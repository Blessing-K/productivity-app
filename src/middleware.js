import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Helper to get the secret key for jose
function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

// Define public paths that don't require authentication
const PUBLIC_PATHS = ["/login", "/register", "/api"];

export async function middleware(request) {
  const token = request.cookies.get("productivity-app")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isLogin = pathname === "/login";

  // Logged in & accessing /login → redirect to home
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged in & trying to access protected route → redirect to login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists → verify with jose
  if (token) {
    try {
      await jwtVerify(token, getSecretKey());
      // You can access decoded payload if needed: const { payload } = await jwtVerify(...)
    } catch (err) {
      console.error("Invalid or expired token:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}