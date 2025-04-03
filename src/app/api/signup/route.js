import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Received signup request:", body);

        const { email, password, firstName, lastName } = body;

        // Check if all required fields are provided
        if (!email || !password || !firstName || !lastName) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return new Response(JSON.stringify({ error: "Invalid email format" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Validate password strength
        const passwordValidation = validator.isStrongPassword(password, 
            {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0
            }
        )

        if (!passwordValidation) {
            return new Response(JSON.stringify({ error: "Password must be at least 8 characters long and contain at least one number" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user in the database
        const user = await prisma.user.create({
            data: {
                email: email,
                passwordHash: passwordHash,
                firstName: firstName,
                lastName: lastName
            }
        });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set token in cookies
        const cookieStore = await cookies()
        cookieStore.set('productivity-app', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return new Response(JSON.stringify({ message: "Signup successful!" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Signup error:", error);

        // Handle duplicate email error (Prisma error code P2002)
        if (error.code === 'P2002') {
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