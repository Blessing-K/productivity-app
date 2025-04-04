import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client'

// Initiazlie Prisma Client
const prisma = new PrismaClient()

export async function POST(request) {

    try {
        const body = await request.json()
        console.log(body)
        const { email, password } = body

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        // Check if user exists
        if(!user){
            console.log("Invalid email")
            return new Response(JSON.stringify({ error: "Invalid email" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)
        console.log(isValid)
        // Validate here
        if (!isValid) {
            return new Response(JSON.stringify({ error: "Email and password doesn't match" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        const token = jwt.sign(
            { id: user.id }, process.env.JWT_SECRET,
        );

        const cookieStore = await cookies()
        cookieStore.set('productivity-app', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
        });
        
        const response = {
            message: "Logged in succesfullly"
        }

        console.log(token)
        return new Response(JSON.stringify({ response }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch (error) {
        console.log(error)
    }
}
