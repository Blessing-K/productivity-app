import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

function getSecretKey() {
    return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function GET() {
    // Get the tasks from database

    // Get userId from coookies
    const cookieStore = await cookies(); // This is available inside App Router routes
    const token = cookieStore.get("productivity-app")?.value;
    const { payload } = await jwtVerify(token, getSecretKey());
    const userId = payload.id;
    console.log("UserId is", userId)

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
          });
        return new Response(JSON.stringify(user), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to load tasks" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
    // Use userId to find tasks
}