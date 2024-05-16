import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string | null;
      us_phone_number: string | null;
      id: string | null;
      us_address: string | null;
      us_country: string | null;
      us_district: string | null;
      us_email: string | null;
      us_fullname: string | null;
      us_gender: number | null;
      us_id: number;
      us_is_active: boolean;
      us_is_deleted: boolean;
      us_password: string | null;
      us_password_salt: string | null;
      us_phone_number: string | null;
      us_pincode: string | null;
      us_state: string | null;
      us_type: number;
      us_username: string | null;
      us_verification_code: string | null;
    } & DefaultSession['user'];
  }
}
