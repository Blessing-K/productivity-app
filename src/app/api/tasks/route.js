import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

function getSecretKey() {
    return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function POST(request) {
    //Post tasks to database
    const body = await request.json();
    const { name, dueDate, priority } = body;
    console.log(name, dueDate, priority)
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
              dueDate: new Date(dueDate),
              priority: priority.toUpperCase()
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

export async function PATCH(request) {
  const { id, name, dueDate, priority } = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        name,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority?.toUpperCase(),
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

// DELETE for removing task
export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await prisma.task.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}