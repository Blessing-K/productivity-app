import bcrypt from 'bcryptjs'
import validator from 'validator';
import jwt from 'jsonwebtoken'

export async function POST() {
    try {
        const body = await request.json()
        console.log(body)
        const { email, password } = body
        if (!validator.isEmail(email)) {
            throw createError({
                statusCode: 400,
                message: 'Invalid email, please change.',
            })
        }
        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            })
        ) {
            throw createError({
                statusCode: 400,
                message: 'Password is not minimum 8 characters, please change.',
            })
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email: email,
                password: passwordHash,
            }
        })

        const token = jwt.sign(
            { id: user.id }, process.env.JWT_SECRET,
        );
        // setCookie(event, 'NoteNestJWT', token)
        // console.log("token")
        // console.log(token)
        return { data: "success!" }
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