import { jwtVerify } from "jose";
export async function GET(){
    return new Response(JSON.stringify({ message: "Logged out successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `productivity-app=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax; Secure`,
        },
      });
}