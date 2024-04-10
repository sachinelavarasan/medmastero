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
      const isLoggedIn = !auth?.user;

      // Determining if the user is currently on the dashboard
      const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

      if (!isLoggedIn && nextUrl.pathname === '/') {
        return Response.redirect(new URL('/login', nextUrl));
      }
      // Handling authorization logic based on user status and location
      else if (isPrivateRoute) {
        // Redirecting unauthenticated users to the login page when attempting to access dashboard-related pages
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        // Redirecting authenticated users to the dashboard if they attempt to access authentication-related pages like login/signup
        const isOnAuth = publicRoutes.includes(nextUrl.pathname);
        if (nextUrl.pathname === '/') return Response.redirect(new URL('/admin', nextUrl));

        if (isOnAuth) return Response.redirect(new URL('/admin', nextUrl));
        return true;
      }
      // Allowing access for other scenarios
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// callbacks: {
//   authorized({ auth, request: { nextUrl } }) {
//     let adminRoutes = ['/admin'],
//       publicRoute = ['/signup', '/login', '/forgot-password', '/reset-password'];
//     const isLoggedIn = !!auth?.user;
//    // const isOnDashboard = nextUrl.pathname.startsWith('/member');
//     const isAdminDashboard = adminRoutes.includes(nextUrl.pathname);
//     if (publicRoute.includes(nextUrl.pathname)) {
//       return true;
//     } else if (isAdminDashboard) {
//       if (isLoggedIn) return true;
//       return false; // Redirect unauthenticated users to login page
//     } else if (isLoggedIn) {
//       return Response.redirect(new URL(nextUrl));
//     } else if (!isLoggedIn) {
//       return false;
//     }
//     return true;
//   },
// },
