import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let adminRoutes = ['/admin'],
        publicRoute = ['/signup', '/login', '/forgot-password', '/reset-password'];
      const isLoggedIn = !!auth?.user;
      const isAdminDashboard = adminRoutes.includes(nextUrl.pathname);
      if (publicRoute.includes(nextUrl.pathname)) {
        return true;
      } else if (isAdminDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(nextUrl));
      } else if (!isLoggedIn) {
        return false;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
