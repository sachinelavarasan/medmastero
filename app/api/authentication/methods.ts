import { eq } from "drizzle-orm";
import { verify } from "hono/jwt";
import { createFactory } from "hono/factory";
import { getCookie } from "hono/cookie";

import { db } from "@/database";
import { user } from "@/database/schema";


// Auth Middleware
const factory = createFactory()

export const middleware = factory.createMiddleware(async (c, next) => {
  const { token } = getCookie(c);
  if (!token) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    );
  }
  let result;
  try {
    result = await verify(token, process.env.AUTH_SECRET!);
    c.set('currentuser', result);
  } catch (error) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    );
  }
  await next();
})

export async function getUser(email: string) {
  try {
    // checking if user already exist
    const isUserExist = await db.query.user.findFirst({ where: eq(user.us_email, email) });
     if(!isUserExist){
        return null;
     }
    return isUserExist;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}