import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Email and password don't match" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return cookie in header
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
    return new Response(
      JSON.stringify({ error: "Something went wrong during login" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
