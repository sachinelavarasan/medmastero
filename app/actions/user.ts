'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/database';
import { gender, user } from '@/database/schema';
import { ProfileSchema } from '@/utils/schema';

export async function updateProfile(formData: Zod.infer<typeof ProfileSchema>, userId: number) {
  console.log(formData);
  try {
    // checking if user already exist
    const isUserExist = await db.select().from(user).where(eq(user.us_id, userId));

    // if user already exist, return false
    if (!isUserExist.length) {
      return { error: 'This user is not exist in our database!' };
    }
    const data: any = formData;
    if (data.us_gender == 'male') {
      data.us_gender = 1;
    }
    if (data.us_gender == 'female') {
      data.us_gender = 2;
    }
    if (data.us_gender == 'transgender') {
      data.us_gender = 3;
    } else {
      delete data.us_gender;
    }
    console.log('datat', data);
    let updateUser = await db.update(user).set(data).where(eq(user.us_id, userId)).returning();
    console.log(updateUser);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId:number) {
  try {
    console.log("isUserExist")
    // checking if user already exist
    const isUserExist = await db.query.user.findFirst({ where: eq(user.us_id, userId) });
console.log("isUserExist")
    return isUserExist;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getAllGender() {
  try {
    // fetch all genders
    const genders = await db.select().from(gender);
    return genders;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
