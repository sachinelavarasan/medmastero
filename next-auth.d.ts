import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { UserI } from './lib/types';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserI & DefaultSession['user'];
  }
}
