'use server';

import { AuthError } from 'next-auth';
import { eq } from 'drizzle-orm';

import { signIn } from '@/auth';
import { axiosInstance } from '@/lib/axios';
import { action } from '@/lib/safe-action';

import { ForgotPasswordSchema, SignUpSchema } from '@/utils/schema';
import { hashPassword } from '@/utils/functions';

import { db } from '@/database';
import { user } from '@/database/schema';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
     await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
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
