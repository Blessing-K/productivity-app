import bcrypt from "bcryptjs";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received signup request:", body);

    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!validator.isEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const passwordValidation = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    });

    if (!passwordValidation) {
      return new Response(
        JSON.stringify({
          error:
            "Password must be at least 8 characters long and contain at least one number",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        firstName: firstName,
        lastName: lastName,
      },
    });

 // Generate JWT with jose
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(getSecretKey());

    // Set token in cookies
    const cookieStore = cookies();
    cookieStore.set("productivity-app", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return new Response(JSON.stringify({ message: "Signup successful!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === "P2002") {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}