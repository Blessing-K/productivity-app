import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Utility function to get a secret key
function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Email and password don't match" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use jose to generate the JWT
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(getSecretKey());

    return new Response(
      JSON.stringify({ message: "Logged in successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `productivity-app=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax; Secure`,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong during login" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(){
  
}