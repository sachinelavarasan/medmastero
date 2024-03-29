'use server';

import { signIn } from '@/auth';
import { axiosInstance } from '@/lib/axios';
import { AuthError } from 'next-auth';
import { action } from '@/lib/safe-action';
import { ForgotPasswordSchema } from '@/utils/schema';

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

export const resetPassword = action(ForgotPasswordSchema, async ({ email }) => {
  const url = `${process.env.API_ENDPOINT}/api/auth/verification?email=${email}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});
