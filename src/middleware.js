import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export function middleware(request) {
    console.log("Middleware is running...");

    // Get the token from cookies
    const token = request.cookies.get("productivity-app")?.value;

    if (!token) {
        console.log("No token found, authentication failed.");
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
    // try {
    //     // Verify JWT token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log("Token verified:", decoded);
    //     // Allow request to proceed
    //     return NextResponse.next();
    // } catch (error) {
    //     console.log("Invalid or expired token:", error.message);
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }
}

// Exclude `/api/login` and `/api/signup` from authentication
export const config = {
    matcher: "/", 
};