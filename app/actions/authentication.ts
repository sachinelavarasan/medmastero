'use server';

import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { axiosInstance } from '@/lib/axios';
import { action } from '@/lib/safe-action';

import { ForgotPasswordSchema, LoginSchema, SignUpSchema } from '@/utils/schema';
import { hashPassword } from '@/utils/functions';

import { db } from '@/database';
import { user } from '@/database/schema';

export async function login(credentials: z.infer<typeof LoginSchema>) {
  try {
    // await signIn('credentials', formData);
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const url = `/api/login`;
    console.log(formData, url);

    const { data } = await axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/formdata' },
    });
    return data;
  } catch (error: any) {
    console.log('Login Error', error.response);
    throw error.response.data.message;
  }
}

// sign up user
export const signUp = action(SignUpSchema, async (formData: Zod.infer<typeof SignUpSchema>) => {
  try {
    // checking if user already exist
    const isUserExist = await db.select().from(user).where(eq(user.us_email, formData.email));

    // if user already exist, return false
    if (isUserExist.length) {
      return { error: 'This user email is already exist in our database!' };
    }

    // password hashing
    const { salt, hashedPassword } = await hashPassword(formData.password);

    // setting data to store in user table as per the column name
    const data = {
      us_email: formData.email,
      us_fullname: formData.name,
      us_is_active: 1,
      // us_is_deleted: 0,
      us_type: formData.is_seller ? 3 : 4,
      us_phone_number: formData.phone,
      us_password: hashedPassword,
      us_password_salt: salt,
    };

    let newUser;
    // if user not exist , create new one
    if (!isUserExist.length) {
      // inserting the user data
      newUser = await db.insert(user).values(data).returning();
    }
    return { response: newUser };
  } catch (error: any) {
    return error.response.data;
  }
});

export const resetPassword = action(ForgotPasswordSchema, async ({ email }: { email: string }) => {
  const url = `${process.env.API_ENDPOINT}/api/auth/verification?email=${email}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});
