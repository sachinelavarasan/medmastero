import NextAuth from 'next-auth';
import { eq } from 'drizzle-orm';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { authConfig } from './auth.config';

import { LoginSchema } from './utils/schema';

import { user } from './database/schema';
import { db } from './database';

export async function getUser(email: string) {
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
          let user: any = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.us_password);
          let userData = { id: user.us_id, name: user.us_fullname, email: user.us_email };
          if (passwordsMatch) return userData;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
