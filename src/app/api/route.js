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
        const tasks = await prisma.task.findMany({
            where: { userId: userId },
        });
        return new Response(JSON.stringify(tasks), {
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

export async function POST(request) {
    //Post tasks to database
    const body = await request.json();
    const { name } = body;

    const cookieStore = await cookies(); // This is available inside App Router routes
    const token = cookieStore.get("productivity-app")?.value;
    const { payload } = await jwtVerify(token, getSecretKey());
    const userId = payload.id;
    console.log("UserId is", userId)

    try {
        const tasks = await prisma.task.create({
            data: {
              name: name, 
              userId: userId,
              completed: false,
            },
        });

        return new Response(JSON.stringify(tasks), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Failed to create tasks" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}

export async function PATCH(request){
    const body = await request.json();
    const { id, completed } = body;
    const cookieStore = await cookies(); // This is available inside App Router routes
    const token = cookieStore.get("productivity-app")?.value;
    const { payload } = await jwtVerify(token, getSecretKey());
    const userId = payload.id;
    console.log("UserId is", userId)

    try {
        console.log("updating tasks")
        const updatedTask = await prisma.task.update({
          where: { 
            id: id,
            userId: userId
          },
          data: {
            completed: completed,
          },
        });
    
        return new Response(JSON.stringify(updatedTask), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("PATCH error:", error);
        return new Response(JSON.stringify({ error: "Failed to update task" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

}