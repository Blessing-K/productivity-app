import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  const cookieStore = await cookies(); 

  const token = cookieStore.get('productivity-app')?.value;

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ id: decoded.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(null, { status: 401 });
  }
}
