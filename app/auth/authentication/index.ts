import { eq } from "drizzle-orm";

import { db } from "@/database";
import { user } from "@/database/schema";


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