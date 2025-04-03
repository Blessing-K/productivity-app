import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
    console.log("Middleware is running...");

    // Get the token from cookies
    const token = request.cookies.get("productivity-app")?.value;

    if (!token) {
        console.log("No token found, authentication failed.");
        return NextResponse.json(
            { success: false, message: "Authentication failed" },
            { status: 401 }
        );
    }
    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified:", decoded);

        // Allow request to proceed
        return NextResponse.next();
    } catch (error) {
        console.log("Invalid or expired token:", error.message);
        
        // If the token is expired, return 403 (Forbidden)
        if (error.name === "TokenExpiredError") {
            return NextResponse.json(
                { success: false, message: "Token expired, please log in again" },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Invalid token" },
            { status: 403 }
        );
    }
}

// Exclude `/api/login` and `/api/signup` from authentication
export const config = {
    matcher: "/api/:path((?!login|signup).*)", 
};