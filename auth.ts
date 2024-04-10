import NextAuth from 'next-auth';
import { eq } from 'drizzle-orm';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { authConfig } from './auth.config';

import { LoginSchema } from './utils/schema';

import { user } from './database/schema';
import { db } from './database';



async function getUser(email: string) {
  try {
    // checking if user already exist
    const isUserExist = await db.query.user.findFirst({ where: eq(user.us_email, email) });

    return isUserExist;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user: any = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.us_password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
