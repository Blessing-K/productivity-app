import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import validator from 'validator';
import { cookies } from 'next/headers';

const prisma = new PrismaClient()

export async function POST() {

    try {
        const body = await request.json()
        console.log(body)
        const { email, password } = body

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        const isValid = await bcrypt.compare(password, user.passwordHash)
        console.log(isValid)
        
        // Validate here
        if (!isValid) {
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password',
            })
        }
        const token = jwt.sign(
            { id: user.id }, process.env.JWT_SECRET,
        );

        const cookieStore = await cookies()
        cookieStore.set('were-wolfJWT', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
        });
        
        const response = {
            message: "Logged in  succesfullly"
        }

        console.log(token)
        return new Response(JSON.stringify({ response }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch (error) {
        console.log(error)
        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                statusMessage: 'An email with this address already exists',
            })
        }
        throw error
    }
}
