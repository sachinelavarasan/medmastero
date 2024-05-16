import { eq } from "drizzle-orm";
import { Context } from "hono";

import { db } from "@/database";
import { user } from "@/database/schema";



export const fetchUser =  async (c: Context<any, any, {}>) => {
    const { us_id } = c.req.param();
    // const currentUser = c.get('currentuser');
    const [data] = await db
      .select()
      .from(user)
      .where(eq(user.us_id, Number(us_id)));
    return c.json(data);
  }