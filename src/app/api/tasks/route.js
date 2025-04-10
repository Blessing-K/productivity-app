import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("productivity-app")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const userId = payload.id;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Invalid token payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { task, priority = "MEDIUM", completeBy } = body;

    if (!task || typeof task !== "string") {
      return new Response(JSON.stringify({ error: "Task content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newTask = await prisma.task.create({
      data: {
        task,
        priority,
        completeBy: completeBy ? new Date(completeBy) : null,
        userId: Number(userId),
      },
    });

    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error creating task:", err);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}