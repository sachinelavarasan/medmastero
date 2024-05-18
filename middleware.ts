import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

import { authMiddleware } from './middlewares/api/authMiddleware';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
const privateRoutes = ['/admin', '/profile'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const token = request ? request.cookies.get("token")?.value: null;
  console.log(request.url, nextUrl)
  if (!token) {
    const url = nextUrl.clone()
    url.pathname = '/login'
    // return NextResponse.rewrite(new URL('/login', nextUrl))
  }
  try {
    // const user = await jwt.verify(token, process.env.AUTH_SECRET!);

    // const isLoggedIn = !!user;
    // Determining if the user is currently on the dashboard
    // const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

    // if (!isLoggedIn && nextUrl.pathname === '/') {
    //   return NextResponse.redirect(new URL('/login', nextUrl));
    // }
    // // Handling authorization logic based on user status and location
    // else if (isPrivateRoute) {
    //   if (isLoggedIn) return true;
    //   return false;
    // } else if (isLoggedIn) {
    //   const isOnAuth = publicRoutes.includes(nextUrl.pathname);
    //   if (nextUrl.pathname === '/') return NextResponse.redirect(new URL('/admin', nextUrl));

    //   if (isOnAuth) return NextResponse.redirect(new URL('/admin', nextUrl));
    //   return true;
    // }
    // Allowing access for other scenarios
    return true;
  } catch (error) {
    return Response.redirect(new URL('/login', nextUrl));
  }
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/api/:path*', '/admin/:path*'],
// };

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// export function authMiddleware(request: Request) {
//   const token = request.headers.get('authorization')?.split(' ')[1];

//   if (token) {
//     return true;
//   }

//   return false;
// }
