import type { NextAuthConfig } from 'next-auth';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
const privateRoutes = ['/admin', '/profile'];

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  // Configuring callbacks for handling authorization logic during authentication flow.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(auth);
      // Determining if the user is currently on the dashboard
      const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

      if (!isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/login', nextUrl));
      }
      // Handling authorization logic based on user status and location
      else if (isPrivateRoute) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        const isOnAuth = publicRoutes.includes(nextUrl.pathname);
        if (nextUrl.pathname === '/') return Response.redirect(new URL('/admin', nextUrl));

        if (isOnAuth) return Response.redirect(new URL('/admin', nextUrl));
        return true;
      }
      // Allowing access for other scenarios
      return true;
    },
    async jwt({ token }) {
      if (token.user) {
        return {
          ...token,
        };
      }
      return token;
    },
    async session({ session, user }) {
      if (user)
        return {
          ...session,
          user: {
            ...session.user,
          },
        };
      return session;
    },
  },

  debug: true,
  providers: [],
} satisfies NextAuthConfig;
